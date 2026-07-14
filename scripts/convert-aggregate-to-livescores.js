#!/usr/bin/env node
// ============================================================
//  Aggregation (Woche/Monat)  →  data/livescores-aggregate.js
// ============================================================
//  Rechnet direkt über scripts/lib/aggregate-core.js (kein CSV-
//  Umweg wie bei aggregate-9cat.js) und merged das Ergebnis in
//  data/livescores-aggregate.js unter
//  LIVESCORES_AGGREGATE[period][league][endDate].
//
//  Bestehende Einträge (andere Perioden/Ligen/Stichtage) bleiben
//  erhalten — es wird nur der eine Schlüssel überschrieben/ergänzt.
//
//  Usage:
//    node scripts/convert-aggregate-to-livescores.js --period=week --league=all
//      → Fenster endet heute, kombiniert alle Standorte (empfohlen/Standardfall)
//    node scripts/convert-aggregate-to-livescores.js --period=month --league=all --end=2026-11-01
//    node scripts/convert-aggregate-to-livescores.js --period=week --league=all --keep=90
//      → wirft Einträge raus, wenn mehr als 90 Stichtage gespeichert sind
//    node scripts/convert-aggregate-to-livescores.js --period=week --league=nba-summer-las-vegas
//      → nur zu Debug-/Vergleichszwecken: EIN Standort statt kombiniert
//
//  Wird auch von scripts/update-all-aggregates.js als Modul benutzt
//  (buildEntry/mergeEntry/trimKeep/loadExisting/serialize) — das ist der
//  eigentliche Weg, wie Weekly/Monthly in der Praxis aktualisiert werden
//  (ein kombinierter "all"-Eintrag pro Periode, statt pro Liga).
// ============================================================

const fs = require('fs');
const path = require('path');
const vm = require('vm');
const { computeAggregate, toDateStr, CATEGORIES } = require('./lib/aggregate-core');

const DEFAULT_OUT = path.join(__dirname, '..', 'data', 'livescores-aggregate.js');
const DEFAULT_DIR = path.join(__dirname, 'data');
const DEFAULT_KEEP = 90; // Stichtage pro Liga/Periode

const round1 = (n) => Math.round(n * 10) / 10;
const round2 = (n) => Math.round(n * 100) / 100;

/**
 * Rundet die Per-Category-Z-Scores eines Spielers auf 2 Nachkommastellen,
 * in derselben Reihenfolge wie CATEGORIES (pts, reb, ast, stl, blk, tpm,
 * fgImpact, ftImpact, to). Blocker für die Punt-Gewichtungs-UI (Punkt 2).
 */
function roundZScores(zScores) {
  const out = {};
  for (const cat of CATEGORIES) {
    out[cat.key] = round2(zScores[cat.key]);
  }
  return out;
}

/**
 * Berechnet einen einzelnen Eintrag für data/livescores-aggregate.js.
 * @returns {Object|null} Eintrag (players etc.) oder null, wenn keine
 *   Daten/nicht genug Spiele im Fenster vorhanden sind.
 */
function buildEntry({ period, league, endDate, dir, minGames }) {
  const result = computeAggregate({ league, period, endDate, dir, minGames });

  if (result.status === 'no-files' || result.status === 'no-eligible') {
    return null;
  }

  const { windowStart, windowEnd, windowDays, datesInWindow, leaguesInWindow, eligible, leagueFGpct, leagueFTpct } = result;

  const players = eligible.map((p, i) => ({
    rank: i + 1,
    name: p.name,
    team: p.team,
    games: p.games,
    leagues: p.leagues, // Standorte, an denen der Spieler im Fenster aufgelaufen ist
    min: round1(p.min / p.games),
    pts: round1(p.ptsPg),
    reb: round1(p.rebPg),
    ast: round1(p.astPg),
    stl: round1(p.stlPg),
    blk: round1(p.blkPg),
    to: round1(p.toPg),
    tpm: round1(p.tpmPg),
    fgPct: p.fga > 0 ? round1((p.fgm / p.fga) * 100) : 0,
    ftPct: p.fta > 0 ? round1((p.ftm / p.fta) * 100) : 0,
    composite: round2(p.composite),
    zScores: roundZScores(p.zScores),
  }));

  return {
    windowStart: toDateStr(windowStart),
    windowEnd: toDateStr(windowEnd),
    windowDays,
    // Anzahl Kalendertage mit Daten im Fenster (nicht Dateien — bei
    // kombinierten Ligen können mehrere Dateien denselben Tag betreffen).
    daysInWindow: datesInWindow.length,
    leaguesInWindow, // z.B. ["nba-summer-las-vegas","nba-summer-utah"]
    minGames: result.minGames,
    leagueAvg: { fg: round1(leagueFGpct * 100), ft: round1(leagueFTpct * 100) },
    players,
  };
}

function loadExisting(outPath) {
  if (!fs.existsSync(outPath)) return {};
  const code = fs.readFileSync(outPath, 'utf8');
  const sandbox = {};
  vm.createContext(sandbox);
  try {
    vm.runInContext(`${code}\nthis.__RESULT__ = typeof LIVESCORES_AGGREGATE !== "undefined" ? LIVESCORES_AGGREGATE : {};`, sandbox);
    return sandbox.__RESULT__ || {};
  } catch (err) {
    console.error(`Konnte bestehende ${outPath} nicht parsen (${err.message}) — sie wird komplett neu geschrieben.`);
    return {};
  }
}

function mergeEntry(existing, period, league, endDate, entry) {
  existing[period] = existing[period] || {};
  existing[period][league] = existing[period][league] || {};
  existing[period][league][endDate] = entry;
}

function trimKeep(existing, keep) {
  for (const period of Object.keys(existing)) {
    for (const league of Object.keys(existing[period])) {
      const dates = Object.keys(existing[period][league]).sort();
      while (dates.length > keep) {
        const oldest = dates.shift();
        delete existing[period][league][oldest];
      }
    }
  }
}

function fmtZScores(z) {
  return `{ ${CATEGORIES.map(cat => `${cat.key}: ${z[cat.key]}`).join(', ')} }`;
}

function fmtPlayer(p) {
  return `{ rank: ${p.rank}, name: ${JSON.stringify(p.name)}, team: ${JSON.stringify(p.team)}, games: ${p.games}, leagues: ${JSON.stringify(p.leagues || [])}, min: ${p.min}, pts: ${p.pts}, reb: ${p.reb}, ast: ${p.ast}, stl: ${p.stl}, blk: ${p.blk}, to: ${p.to}, tpm: ${p.tpm}, fgPct: ${p.fgPct}, ftPct: ${p.ftPct}, composite: ${p.composite}, zScores: ${fmtZScores(p.zScores)} }`;
}

function fmtEntry(entry) {
  const players = (entry.players || []).map(p => '          ' + fmtPlayer(p)).join(',\n');
  return `{
        windowStart: ${JSON.stringify(entry.windowStart)},
        windowEnd: ${JSON.stringify(entry.windowEnd)},
        windowDays: ${entry.windowDays},
        daysInWindow: ${entry.daysInWindow},
        leaguesInWindow: ${JSON.stringify(entry.leaguesInWindow || [])},
        minGames: ${entry.minGames},
        leagueAvg: { fg: ${entry.leagueAvg.fg}, ft: ${entry.leagueAvg.ft} },
        players: [
${players}
        ]
      }`;
}

function serialize(existing) {
  const periodBlocks = Object.keys(existing).sort().map(period => {
    const leagueBlocks = Object.keys(existing[period]).sort().map(league => {
      const dates = Object.keys(existing[period][league]).sort();
      const dayBlocks = dates.map(d => `      ${JSON.stringify(d)}: ${fmtEntry(existing[period][league][d])}`).join(',\n');
      return `    ${JSON.stringify(league)}: {\n${dayBlocks}\n    }`;
    }).join(',\n');
    return `  ${JSON.stringify(period)}: {\n${leagueBlocks}\n  }`;
  }).join(',\n');

  return `// ============================================================
//  LIVE SCORES — Aggregierte 9cat Z-Score Rankings (Woche/Monat)
// ============================================================
//  AUTO-GENERIERT von scripts/convert-aggregate-to-livescores.js
//  (bzw. scripts/update-all-aggregates.js) über die "Daily 9cat
//  Live Scores" GitHub Action. Nicht von Hand editieren —
//  Änderungen werden beim nächsten Lauf überschrieben.
//
//  Shape:
//  LIVESCORES_AGGREGATE[period]["all"][endDate] = {
//    windowStart, windowEnd,   // "YYYY-MM-DD" — Rand des rollierenden Fensters
//    windowDays,                // 7 (week) oder 30 (month)
//    daysInWindow,              // Anzahl Kalendertage mit Daten im Fenster
//    leaguesInWindow,           // Standorte, die irgendwo im Fenster CSVs hatten
//                                // (z.B. ["nba-summer-las-vegas","nba-summer-utah"])
//    minGames,                  // Mindestspiele, um in "players" zu erscheinen
//    leagueAvg: { fg, ft },
//    players: [
//      { rank, name, team, games, leagues, min, pts, reb, ast, stl, blk, to, tpm,
//        fgPct, ftPct, composite,     // Werte sind Pro-Spiel-Schnitte im Fenster
//        zScores: { pts, reb, ast, stl, blk, tpm, fgImpact, ftImpact, to } },
//        // ^ "leagues" = Standorte, an denen DIESER Spieler im Fenster gespielt hat.
//        //   Per-Category-Z-Scores auf 2 Nachkommastellen gerundet, TO-Vorzeichen
//        //   bereits invertiert — hoher Wert = gut. Blocker für Punt-Gewichtungs-UI.
//      ...
//    ]
//  }
//
//  period: "week" | "month"
//  Weekly/Monthly werden IMMER standortübergreifend berechnet — "all" ist der
//  einzige League-Key, der hier vorkommt. Das Fenster sind immer die letzten
//  7 bzw. 30 Tage vor "endDate", egal ob ein Spieler in Cali, Utah und/oder
//  Vegas aufgelaufen ist. (Daily bleibt weiterhin pro Standort in
//  data/livescores-daily.js — dort macht die Trennung Sinn, weil an einem
//  Tag ohnehin nur an einem Standort gespielt wird.)
//  endDate: Stichtag, an dem das Fenster endet ("YYYY-MM-DD")
// ============================================================

const LIVESCORES_AGGREGATE = {
${periodBlocks}
};
`;
}

function writeOut(existing, outPath) {
  fs.mkdirSync(path.dirname(outPath), { recursive: true });
  fs.writeFileSync(outPath, serialize(existing), 'utf8');
}

module.exports = { buildEntry, loadExisting, mergeEntry, trimKeep, serialize, writeOut, DEFAULT_OUT, DEFAULT_DIR, DEFAULT_KEEP };

// ------------------------------------------------------------
// CLI
// ------------------------------------------------------------
if (require.main === module) {
  const args = process.argv.slice(2);
  const arg = (name, fallback) => {
    const found = args.find(a => a.startsWith(`--${name}=`));
    return found ? found.split('=').slice(1).join('=') : fallback;
  };

  const period = arg('period');
  const league = arg('league');
  if (!period || !['week', 'month'].includes(period)) {
    console.error('Fehlt oder ungültig: --period=week|month');
    process.exit(1);
  }
  if (!league) {
    console.error('Fehlt: --league=<espn-league-slug>');
    process.exit(1);
  }

  const endDate = arg('end', new Date().toISOString().slice(0, 10));
  const dir = arg('dir', DEFAULT_DIR);
  const out = arg('out', DEFAULT_OUT);
  const keep = parseInt(arg('keep', String(DEFAULT_KEEP)), 10);
  const minGamesArg = arg('min-games', null);
  const minGames = minGamesArg != null ? parseInt(minGamesArg, 10) : undefined;

  const entry = buildEntry({ period, league, endDate, dir, minGames });
  if (!entry) {
    console.log(`Keine ausreichenden Daten für ${period}/${league} bis ${endDate} — livescores-aggregate.js bleibt für diesen Schlüssel unverändert.`);
    process.exit(0);
  }

  const existing = loadExisting(out);
  mergeEntry(existing, period, league, endDate, entry);
  trimKeep(existing, keep);
  writeOut(existing, out);

  console.log(`${out} aktualisiert: ${period}/${league}/${endDate} (${entry.players.length} Spieler, Fenster ${entry.windowStart}–${entry.windowEnd}, ${entry.daysInWindow} Tag(e) mit Daten).`);
}
