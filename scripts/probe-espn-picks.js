#!/usr/bin/env node
// ============================================================
//  ESPN-PROBE: Liefert ESPN Draft-Pick-Trades?
// ============================================================
//  HINTERGRUND
//  Die Trade-Erkennung vergleicht den Kader von gestern mit dem von
//  heute. Ein Trade, bei dem nur Picks den Besitzer wechseln, aendert
//  an keinem Kader ein Zeichen und ist damit strukturell unsichtbar.
//  Genau so ist am 11.08.2026 ein Trade komplett durchgerutscht.
//
//  Bevor wir Picks dauerhaft von Hand pflegen, soll geklaert sein, ob
//  ESPN sie ueberhaupt irgendwo herausgibt. Fuer 2027 und spaeter ist
//  die Antwort sicher nein -- diese Jahre existieren in ESPNs
//  Datenmodell nicht. Fuer 2026 ist es offen: ESPN kennt in manchen
//  Keeper-Formaten die Picks des kommenden Drafts.
//
//  WAS DAS SCRIPT TUT
//  Fragt mehrere ESPN-Views ab und berichtet, was zurueckkommt. Es
//  aendert NICHTS im Repo ausser einer Berichtsdatei, und es schlaegt
//  bei keinem Fehler fehl -- ein Diagnoseschritt darf den taeglichen
//  Workflow nicht stoppen.
//
//  Abgefragt werden:
//    mDraftDetail        -- Draftreihenfolge samt Besitzer je Pick.
//                           Weicht der Besitzer eines Picks vom Team
//                           ab, dem der Slot urspruenglich gehoert,
//                           ist das ein gehandelter Pick.
//    mTransactions2      -- Transaktionsprotokoll. Interessant ist,
//                           ob Eintraege vom Typ TRADE Positionen
//                           enthalten, die kein Spieler sind.
//    mTeam + mSettings   -- Enthaelt draftDetail und die Einstellung,
//                           ob Pick-Handel in dieser Liga ueberhaupt
//                           aktiviert ist.
//    mPendingTransactions
//
//  AUSGABE
//    Konsole: lesbare Zusammenfassung
//    scripts/data/espn-pick-probe.json: kompakter Bericht
//  Bewusst KEIN Rohdump: die Antworten sind mehrere Megabyte gross
//  und enthalten nichts, was ins Repo gehoert.
//
//  Usage:
//    node scripts/probe-espn-picks.js
//    node scripts/probe-espn-picks.js --season 2027
// ============================================================

const fs = require('fs');
const path = require('path');
const https = require('https');
const vm = require('vm');

const ROOT = path.join(__dirname, '..');
const OUT_DIR = path.join(ROOT, 'scripts', 'data');
const OUT_FILE = path.join(OUT_DIR, 'espn-pick-probe.json');

function loadConfig() {
  const code = fs.readFileSync(path.join(ROOT, 'js', 'espn-sync.js'), 'utf8');
  const sandbox = {};
  vm.createContext(sandbox);
  vm.runInContext(
    `${code}\nthis.__CFG__ = { ESPN_LEAGUE_ID, ESPN_SEASON, ESPN_TO_TT_TEAM };`,
    sandbox
  );
  return sandbox.__CFG__;
}

function httpsGetJson(url, extraHeaders) {
  return new Promise((resolve, reject) => {
    const headers = Object.assign({
      'User-Agent': 'taco-tuesday-hq-bot',
      'Accept': 'application/json',
    }, extraHeaders || {});
    https.get(url, { headers }, res => {
      if (res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
        return httpsGetJson(res.headers.location, extraHeaders).then(resolve, reject);
      }
      if (res.statusCode !== 200) {
        res.resume();
        return reject(new Error(`HTTP ${res.statusCode}`));
      }
      let data = '';
      res.on('data', c => { data += c; });
      res.on('end', () => {
        try { resolve(JSON.parse(data)); }
        catch (e) { reject(new Error('keine gültige JSON-Antwort')); }
      });
    }).on('error', reject);
  });
}

function base(cfg, season) {
  return `https://lm-api-reads.fantasy.espn.com/apis/v3/games/fba/seasons/${season}/segments/0/leagues/${cfg.ESPN_LEAGUE_ID}`;
}

// ── Auswertung: Draftreihenfolge ─────────────────────────────
//  draftDetail.picks hat je Eintrag teamId (wer zieht) und meist
//  auch die Info, aus wessen Slot der Pick stammt. Stimmen die
//  nicht ueberein, wurde der Pick gehandelt -- und das waere die
//  Information, die wir brauchen.
function analyzeDraftDetail(data, cfg) {
  const dd = data && data.draftDetail;
  if (!dd) return { vorhanden: false, hinweis: 'Kein draftDetail in der Antwort.' };

  const picks = Array.isArray(dd.picks) ? dd.picks : [];
  const felder = picks.length ? Object.keys(picks[0]) : [];

  // Welche Felder koennten den urspruenglichen Besitzer tragen?
  const ownerFelder = felder.filter(f => /owner|team|origin|from/i.test(f));

  let gehandelt = 0, pruefbar = 0;
  const beispiele = [];
  picks.forEach(p => {
    const zieher = p.teamId;
    const herkunft = p.originalTeamId !== undefined ? p.originalTeamId
                   : (p.owningTeamId !== undefined ? p.owningTeamId : undefined);
    if (herkunft === undefined || zieher === undefined) return;
    pruefbar++;
    if (herkunft !== zieher) {
      gehandelt++;
      if (beispiele.length < 5) {
        beispiele.push({
          runde: p.roundId, pickImDurchgang: p.roundPickNumber,
          vonTeamEspn: herkunft, anTeamEspn: zieher,
          vonTeamTT: cfg.ESPN_TO_TT_TEAM[herkunft] || null,
          anTeamTT: cfg.ESPN_TO_TT_TEAM[zieher] || null,
        });
      }
    }
  });

  return {
    vorhanden: true,
    draftAbgeschlossen: !!dd.drafted,
    anzahlPicks: picks.length,
    felderJePick: felder,
    moeglicheBesitzerFelder: ownerFelder,
    aufHandelPruefbar: pruefbar,
    erkannteGehandeltePicks: gehandelt,
    beispiele,
  };
}

// ── Auswertung: Transaktionsprotokoll ────────────────────────
function analyzeTransactions(data) {
  const tx = (data && (data.transactions || data.topics)) || null;
  if (!tx) return { vorhanden: false, hinweis: 'Keine transactions in der Antwort.' };

  const typen = {};
  let mitItems = 0;
  const nichtSpielerItems = [];

  tx.forEach(t => {
    const typ = t.type || 'unbekannt';
    typen[typ] = (typen[typ] || 0) + 1;
    const items = Array.isArray(t.items) ? t.items : [];
    if (items.length) mitItems++;
    items.forEach(it => {
      // Ein Item ohne playerId ist der interessante Fall: dann geht es
      // um etwas anderes als einen Spieler, moeglicherweise um einen Pick.
      if (it.playerId === undefined || it.playerId === null) {
        if (nichtSpielerItems.length < 8) {
          nichtSpielerItems.push({ transaktionstyp: typ, itemFelder: Object.keys(it), item: it });
        }
      }
    });
  });

  return {
    vorhanden: true,
    anzahl: tx.length,
    typen,
    mitItems,
    itemsOhneSpielerId: nichtSpielerItems.length,
    beispieleOhneSpielerId: nichtSpielerItems,
  };
}

function analyzeSettings(data) {
  const s = data && data.settings;
  if (!s) return { vorhanden: false };
  const tr = s.tradeSettings || {};
  const dr = s.draftSettings || {};
  return {
    vorhanden: true,
    ligaName: s.name || null,
    // Diese Felder sagen, ob ESPN in dieser Liga ueberhaupt Pick-Handel kennt.
    tradeSettingsFelder: Object.keys(tr),
    draftSettingsFelder: Object.keys(dr),
    keeperCount: s.rosterSettings ? s.rosterSettings.keeperCount : undefined,
    draftType: dr.type,
    pickHandelHinweis: Object.keys(dr).filter(k => /pick|trade/i.test(k)),
  };
}

async function probe(cfg, season) {
  const b = base(cfg, season);
  const ergebnis = { saison: season, abgefragt: {} };

  const versuche = [
    ['mDraftDetail', `${b}?view=mDraftDetail`, analyzeDraftDetail],
    ['mSettings', `${b}?view=mSettings`, analyzeSettings],
    ['mTransactions2', `${b}?view=mTransactions2`, analyzeTransactions],
    ['mPendingTransactions', `${b}?view=mPendingTransactions`, analyzeTransactions],
  ];

  for (const [name, url, auswerten] of versuche) {
    try {
      const data = await httpsGetJson(url);
      ergebnis.abgefragt[name] = { ok: true, ...auswerten(data, cfg) };
      console.log(`  ✓ ${name}`);
    } catch (err) {
      ergebnis.abgefragt[name] = { ok: false, fehler: err.message };
      console.log(`  ✗ ${name}: ${err.message}`);
    }
  }
  return ergebnis;
}

function bewerten(ergebnis) {
  const dd = ergebnis.abgefragt.mDraftDetail || {};
  const tx = ergebnis.abgefragt.mTransactions2 || {};

  // ZUERST pruefen, ob ueberhaupt etwas abgefragt werden konnte.
  // "Nichts gefunden" und "nicht nachgesehen" sind zwei verschiedene
  // Aussagen, und die zweite als die erste auszugeben waere schlimmer
  // als gar kein Ergebnis -- man wuerde eine Automatisierung
  // ausschliessen, die vielleicht moeglich ist.
  const alle = Object.values(ergebnis.abgefragt);
  const erreichbar = alle.filter(a => a.ok);
  if (!erreichbar.length) {
    const fehler = [...new Set(alle.map(a => a.fehler))].join(', ');
    return `UNKLAR: Keine der Abfragen kam durch (${fehler}). Das sagt nichts darüber aus, `
         + `ob ESPN Pick-Trades kennt -- nur, dass wir von hier aus nicht nachsehen konnten. `
         + `Häufigste Ursachen: Liga nicht öffentlich einsehbar, oder ausgehende Verbindungen gesperrt.`;
  }

  if (dd.ok && dd.erkannteGehandeltePicks > 0) {
    return `JA: ESPN kennt gehandelte Picks für ${ergebnis.saison}: ${dd.erkannteGehandeltePicks} Stück in draftDetail. `
         + `Ein automatischer Abgleich für dieses Jahr wäre möglich.`;
  }
  if (dd.ok && dd.anzahlPicks > 0 && dd.aufHandelPruefbar === 0) {
    return `NEIN: draftDetail enthält ${dd.anzahlPicks} Picks, aber kein Feld für den ursprünglichen Besitzer `
         + `(vorhandene Felder: ${(dd.felderJePick || []).join(', ')}). Gehandelte Picks sind daraus nicht ableitbar.`;
  }
  if (tx.ok && tx.itemsOhneSpielerId > 0) {
    return `MÖGLICH: Im Transaktionsprotokoll stehen ${tx.itemsOhneSpielerId} Positionen ohne Spieler-ID. `
         + `Die Beispiele im Bericht zeigen, ob es sich um Picks handelt.`;
  }
  if (dd.ok && dd.anzahlPicks === 0 && tx.ok && tx.anzahl === 0) {
    return `NEIN: Abfragen kamen durch, ESPN liefert für ${ergebnis.saison} aber weder Draftreihenfolge `
         + `noch Transaktionen. Für diese Saison ist dort nichts zu holen.`;
  }
  return `NEIN: Abfragen kamen durch (${erreichbar.length} von ${alle.length}), aber kein Hinweis auf Pick-Trades. `
       + `Picks müssen für ${ergebnis.saison} von Hand gepflegt werden.`;
}

async function main() {
  const cfg = loadConfig();
  const arg = process.argv.indexOf('--season');
  const seasons = arg > -1
    ? [parseInt(process.argv[arg + 1], 10)]
    : [cfg.ESPN_SEASON, cfg.ESPN_SEASON - 1];

  console.log(`ESPN-Probe für Liga ${cfg.ESPN_LEAGUE_ID}, Saisons: ${seasons.join(', ')}\n`);

  const bericht = { erstellt: new Date().toISOString(), liga: cfg.ESPN_LEAGUE_ID, saisons: [] };

  for (const s of seasons) {
    console.log(`Saison ${s}:`);
    const e = await probe(cfg, s);
    e.bewertung = bewerten(e);
    bericht.saisons.push(e);
    console.log(`  → ${e.bewertung}\n`);
  }

  fs.mkdirSync(OUT_DIR, { recursive: true });
  fs.writeFileSync(OUT_FILE, JSON.stringify(bericht, null, 2), 'utf8');
  console.log(`Bericht: ${path.relative(ROOT, OUT_FILE)}`);
}

main().catch(err => {
  // Diagnose darf nie den Workflow stoppen.
  console.error('Probe fehlgeschlagen (nicht kritisch):', err.message);
  process.exit(0);
});
