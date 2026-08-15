#!/usr/bin/env node
// ============================================================
//  CONSENSUS PROJECTIONS — Beyaz × Josh Lloyd (BBM)
// ============================================================
//  Bildet den Mittelwert aus zwei unabhaengigen Projections-Quellen:
//    A) data/projections-baseline.js  — Beyaz' eigene Projections
//    B) BBM_Projections_August.xls    — Josh Lloyd / Basketball Monster
//
//  METHODIK, und warum sie so ist:
//
//  1. ZAEHLSTATS (min, pts, reb, ast, stl, blk, tpm, tov)
//     Einfacher arithmetischer Mittelwert beider Quellen. Beide liefern
//     Pro-Spiel-Schnitte, sind also direkt vergleichbar.
//
//  2. PROZENTE (FG%, FT%) — hier liegt die eigentliche Sorgfalt
//     Beyaz' Baseline enthaelt NUR Prozente (pctOnly:true, fgm/fga = 0).
//     BBM liefert zusaetzlich Attempts und Makes pro Spiel.
//     Zwei Prozentwerte einfach zu mitteln waere ungenau, weil ein
//     Spieler mit 20 Wurfversuchen die Team-Prozente staerker praegt als
//     einer mit 3. Deshalb:
//       - Attempts (fga, fta) kommen aus BBM (einzige Quelle dafuer)
//       - Der gemittelte Prozentwert wird mit diesen Attempts in echte
//         Makes zurueckgerechnet: fgm = fgPct/100 * fga
//     Ergebnis: die Consensus-Datei hat echte Makes/Attempts statt
//     pctOnly, was auch build-live-projections.js spaeter praeziser
//     blenden laesst (siehe README, Season-Start-Plan).
//
//  3. SPIELER NUR IN EINER QUELLE
//     Werden 1:1 uebernommen, NICHT halbiert oder verworfen. Ein
//     Spieler, den nur eine Quelle kennt, ist keine "halbe Projection".
//     Das Feld `sources` haelt fest, worauf ein Eintrag beruht:
//       "both" | "beyaz" | "bbm"
//     Damit bleibt auf der Seite sichtbar, welche Zeilen echter
//     Konsens sind und welche nur eine Meinung abbilden.
//
//  4. GAMES (g)
//     Nur BBM liefert eine Spielprognose. Wird uebernommen wo vorhanden,
//     sonst null — NICHT geschaetzt.
//
//  Usage: node scripts/build-consensus-projections.js <bbm.json>
// ============================================================

const fs = require('fs');
const path = require('path');
const vm = require('vm');

const ROOT = path.join(__dirname, '..');
const OUT = path.join(ROOT, 'data', 'projections-consensus.js');

function loadBaseline() {
  const sandbox = {};
  vm.createContext(sandbox);
  vm.runInContext(fs.readFileSync(path.join(ROOT, 'data', 'projections-baseline.js'), 'utf8'), sandbox);
  vm.runInContext(fs.readFileSync(path.join(ROOT, 'data', 'aliases.js'), 'utf8'), sandbox);
  vm.runInContext('this.__B__ = PROJECTIONS_BASELINE; this.__N__ = normalizeName;', sandbox);
  return { baseline: sandbox.__B__, normalizeName: sandbox.__N__ };
}

// Explizite Aliase fuer Faelle, die normalizeName() nicht abdeckt.
// Bewusst kurz gehalten: nur Eintraege, die durch Werte-Abgleich
// (Minuten + Punkte) bestaetigt wurden. Bei Zweifelsfaellen lieber
// ungematcht lassen als falsch zusammenfuehren.
const EXTRA_ALIASES = {
  'lu dort': 'Luguentz Dort',
};

const round = (v, d = 2) => Math.round(v * Math.pow(10, d)) / Math.pow(10, d);

// Kompakter Wertesatz einer einzelnen Quelle -- reicht aus, um daraus
// spaeter einen vollstaendigen 9-Cat-Z-Score zu rechnen.
// Beyaz' Baseline hat keine eigenen Wurfversuche (nur Prozente), deshalb
// werden dort die BBM-Versuche als Volumen-Naeherung mitgegeben. Ohne
// Volumen liesse sich der FG%/FT%-Impact gar nicht bestimmen -- der
// Prozentwert allein sagt nichts darueber, wie stark er ins Gewicht faellt.
function srcVals(o, fgaFallback, ftaFallback) {
  if (!o) return null;
  const fga = (o.fga > 0 ? o.fga : (fgaFallback || 0));
  const fta = (o.fta > 0 ? o.fta : (ftaFallback || 0));
  const fgPct = o.fgPct || 0, ftPct = o.ftPct || 0;
  return {
    min: round(o.min || 0, 1),
    pts: round(o.pts || 0, 1),
    reb: round(o.reb || 0, 1),
    ast: round(o.ast || 0, 1),
    stl: round(o.stl || 0, 2),
    blk: round(o.blk || 0, 2),
    tpm: round(o.tpm || 0, 2),
    tov: round((o.tov !== undefined ? o.tov : o.to) || 0, 2),
    fga: round(fga, 2),
    fgm: round(o.fgm > 0 ? o.fgm : fgPct / 100 * fga, 2),
    fta: round(fta, 2),
    ftm: round(o.ftm > 0 ? o.ftm : ftPct / 100 * fta, 2),
    fgPct: round(fgPct, 1),
    ftPct: round(ftPct, 1),
  };
}
const avg = (a, b) => (a + b) / 2;

// PLAUSIBILITAETSPRUEFUNG
// In Beyaz' Baseline stehen fuer ~38 Spieler (fast alle Rookies oder
// Tiefbank) Werte, die pro Spiel unmoeglich sind -- z.B. 6 Minuten bei
// 15 Punkten, also >2 Punkte pro Minute. Das sind mutmasslich Per-36-
// oder College-Werte, die beim Import nicht umgerechnet wurden.
// Ein Mittelwert daraus wuerde den Konsens systematisch nach oben
// verzerren, ausgerechnet bei den Spielern am Ende der Rotation.
// Deshalb: solche Eintraege werden erkannt, protokolliert und fuer die
// betroffene Seite NICHT gemittelt -- stattdessen zaehlt BBM allein.
// Schwelle 1.05 P/Min, hergeleitet aus den BBM-Daten selbst: dort
// liegt der Spitzenwert der gesamten Liga bei Luka Doncic mit 0.977
// (36 Min / 35.2 Pkt), gefolgt von Giannis mit 0.967. Eine Schwelle
// von 0.9 haette Giannis faelschlich aussortiert. 1.05 laesst also
// die real moeglichen Extremwerte durch und faengt trotzdem alle
// tatsaechlichen Fehleintraege (der niedrigste davon liegt bei 1.01,
// die meisten deutlich ueber 1.3).
const MAX_PTS_PER_MIN = 1.05;
function isImplausible(p) {
  return p && p.min > 0 && (p.pts / p.min) > MAX_PTS_PER_MIN;
}

function main() {
  const bbmPath = process.argv[2];
  if (!bbmPath) throw new Error('Aufruf: node build-consensus-projections.js <bbm.json>');
  const bbm = JSON.parse(fs.readFileSync(bbmPath, 'utf8'));
  const { baseline, normalizeName } = loadBaseline();

  // Index: normalisierter Name -> Originalname in der Baseline
  const mineByNorm = new Map();
  Object.keys(baseline).forEach(n => {
    const k = normalizeName(n);
    if (k && !mineByNorm.has(k)) mineByNorm.set(k, n);
  });

  const result = {};
  const stats = { both: 0, beyazOnly: 0, bbmOnly: 0, implausible: 0, beyazOnlyImplausible: 0 };
  const implausibleList = [];
  const usedBaselineNames = new Set();
  const perTeam = {};

  // ── Durchgang 1: alle BBM-Spieler ────────────────────────
  Object.keys(bbm).forEach(bbmName => {
    const b = bbm[bbmName];
    const key = normalizeName(bbmName);
    const mineName = EXTRA_ALIASES[key] || mineByNorm.get(key);
    const m = mineName ? baseline[mineName] : null;

    const team = b.team || '?';
    if (!perTeam[team]) perTeam[team] = { both: 0, bbmOnly: 0 };

    let entry;
    if (m && isImplausible(m)) {
      // Baseline-Wert unbrauchbar (siehe isImplausible) -> BBM allein
      usedBaselineNames.add(mineName);
      stats.implausible++;
      implausibleList.push({ name: mineName, min: m.min, pts: m.pts, ppm: round(m.pts / m.min, 2) });
      entry = {
        team, pos: b.pos || '', g: b.g || null,
        min: round(b.min, 1), pts: round(b.pts, 1), reb: round(b.reb, 1),
        ast: round(b.ast, 1), stl: round(b.stl, 2), blk: round(b.blk, 2),
        tpm: round(b.tpm, 2), tov: round(b.tov, 2),
        fgPct: round(b.fgPct, 1), ftPct: round(b.ftPct, 1),
        fga: round(b.fga, 2), fgm: round(b.fgm, 2),
        fta: round(b.fta, 2), ftm: round(b.ftm, 2),
        sources: 'bbm-baseline-implausible', spreadPts: null, spreadMin: null,
        a: null, b: srcVals(b, b.fga, b.fta),
      };
    } else if (m) {
      usedBaselineNames.add(mineName);
      stats.both++;
      perTeam[team].both++;

      // Prozente mitteln, dann ueber BBM-Attempts in Makes zurueckrechnen
      const fgPct = avg(m.fgPct || 0, b.fgPct || 0);
      const ftPct = avg(m.ftPct || 0, b.ftPct || 0);
      const fga = b.fga || 0;
      const fta = b.fta || 0;

      entry = {
        team, pos: b.pos || '',
        g: b.g || null,
        min: round(avg(m.min || 0, b.min || 0), 1),
        pts: round(avg(m.pts || 0, b.pts || 0), 1),
        reb: round(avg(m.reb || 0, b.reb || 0), 1),
        ast: round(avg(m.ast || 0, b.ast || 0), 1),
        stl: round(avg(m.stl || 0, b.stl || 0), 2),
        blk: round(avg(m.blk || 0, b.blk || 0), 2),
        tpm: round(avg(m.tpm || 0, b.tpm || 0), 2),
        tov: round(avg(m.tov || 0, b.tov || 0), 2),
        fgPct: round(fgPct, 1),
        ftPct: round(ftPct, 1),
        fga: round(fga, 2),
        fgm: round(fgPct / 100 * fga, 2),
        fta: round(fta, 2),
        ftm: round(ftPct / 100 * fta, 2),
        sources: 'both',
        // Zur Nachvollziehbarkeit: wie weit lagen die Quellen auseinander?
        // Groesse Abweichungen sind interessant, nicht verdaechtig --
        // genau dafuer ist ein Konsens da.
        spreadPts: round(Math.abs((m.pts || 0) - (b.pts || 0)), 1),
        spreadMin: round(Math.abs((m.min || 0) - (b.min || 0)), 1),
        // ROHWERTE BEIDER QUELLEN, getrennt aufbewahrt.
        // Nur so kann die Seite fuer jede Quelle einen EIGENEN Rang
        // berechnen und die Rangdifferenz zeigen ("Josh hat ihn auf 10,
        // ich auf 5"). Wuerde man nur den Mittelwert speichern, waere
        // diese Frage nachtraeglich nicht mehr beantwortbar.
        // a = Beyaz, b = Basketball Monster.
        a: srcVals(m, fga, fta),
        b: srcVals(b, b.fga, b.fta),
      };
    } else {
      stats.bbmOnly++;
      perTeam[team].bbmOnly++;
      entry = {
        team, pos: b.pos || '',
        g: b.g || null,
        min: round(b.min, 1), pts: round(b.pts, 1), reb: round(b.reb, 1),
        ast: round(b.ast, 1), stl: round(b.stl, 2), blk: round(b.blk, 2),
        tpm: round(b.tpm, 2), tov: round(b.tov, 2),
        fgPct: round(b.fgPct, 1), ftPct: round(b.ftPct, 1),
        fga: round(b.fga, 2), fgm: round(b.fgm, 2),
        fta: round(b.fta, 2), ftm: round(b.ftm, 2),
        sources: 'bbm', spreadPts: null, spreadMin: null,
        a: null, b: srcVals(b, b.fga, b.fta),
      };
    }
    result[mineName || bbmName] = entry;
  });

  // ── Durchgang 2: Spieler nur in Beyaz' Baseline ──────────
  Object.keys(baseline).forEach(n => {
    if (usedBaselineNames.has(n)) return;
    const m = baseline[n];
    if (isImplausible(m)) {
      // Nur in Beyaz' Baseline UND unplausibel -> es gibt keine zweite
      // Quelle zum Gegenpruefen. Eintrag wird uebernommen, aber klar
      // markiert, damit er auf der Seite auffaellt statt still zu wirken.
      stats.beyazOnlyImplausible++;
      implausibleList.push({ name: n, min: m.min, pts: m.pts, ppm: round(m.pts / m.min, 2), noSecondSource: true });
    }
    stats.beyazOnly++;
    result[n] = {
      team: '', pos: '', g: null,
      min: round(m.min || 0, 1), pts: round(m.pts || 0, 1), reb: round(m.reb || 0, 1),
      ast: round(m.ast || 0, 1), stl: round(m.stl || 0, 2), blk: round(m.blk || 0, 2),
      tpm: round(m.tpm || 0, 2), tov: round(m.tov || 0, 2),
      fgPct: round(m.fgPct || 0, 1), ftPct: round(m.ftPct || 0, 1),
      // Keine Attempts-Quelle vorhanden -> pctOnly beibehalten,
      // damit build-live-projections.js weiss, dass es hier nur
      // Prozente gibt (siehe Kommentar in projections-baseline.js).
      fga: 0, fgm: 0, fta: 0, ftm: 0, pctOnly: true,
      sources: isImplausible(m) ? 'beyaz-implausible' : 'beyaz', spreadPts: null, spreadMin: null,
      a: srcVals(m, 0, 0), b: null,
    };
  });

  const header = `// ============================================================
//  CONSENSUS PROJECTIONS 2026/27 — Beyaz × Josh Lloyd (BBM)
// ============================================================
//  AUTO-GENERIERT von scripts/build-consensus-projections.js.
//  Erzeugt am: ${new Date().toISOString()}
//
//  Mittelwert aus zwei unabhängigen Projections-Quellen:
//    A) data/projections-baseline.js (Beyaz)
//    B) Basketball Monster / Josh Lloyd (August-Stand)
//
//  Zählstats werden arithmetisch gemittelt. FG%/FT% werden gemittelt
//  und anschließend über BBMs Wurfversuche in echte Makes/Attempts
//  zurückgerechnet — dadurch hat diese Datei echte fgm/fga/ftm/fta
//  statt reiner Prozente (präziser für den späteren Live-Blend).
//
//  Spieler, die nur eine Quelle kennt, werden 1:1 übernommen, nicht
//  halbiert. Das Feld "sources" hält fest, worauf jeder Eintrag beruht:
//    "both"  = echter Konsens aus beiden Quellen (${stats.both} Spieler)
//    "bbm"   = nur Basketball Monster (${stats.bbmOnly} Spieler)
//    "beyaz" = nur Beyaz' Baseline (${stats.beyazOnly} Spieler)
//
//  "spreadPts"/"spreadMin" zeigen bei Konsens-Einträgen, wie weit die
//  beiden Quellen auseinanderlagen — nützlich, um strittige
//  Einschätzungen schnell zu finden.
// ============================================================

const PROJECTIONS_CONSENSUS = ${JSON.stringify(result, null, 1)};
`;

  fs.writeFileSync(OUT, header, 'utf8');

  console.log(`${path.relative(ROOT, OUT)} geschrieben.`);
  console.log(`  Konsens (beide Quellen): ${stats.both}`);
  console.log(`  Nur BBM:                 ${stats.bbmOnly}`);
  console.log(`  Nur Beyaz:               ${stats.beyazOnly}`);
  console.log(`  Baseline unplausibel, BBM genutzt: ${stats.implausible}`);
  console.log(`  Nur Beyaz UND unplausibel (nicht korrigierbar): ${stats.beyazOnlyImplausible}`);
  console.log(`  Gesamt:                  ${Object.keys(result).length}`);
  console.log('');
  if (implausibleList.length) {
    console.log('');
    console.log('  Unplausible Baseline-Werte (>0.9 Punkte pro Minute):');
    implausibleList.sort((a, b) => b.ppm - a.ppm).forEach(x => {
      console.log(`    ${x.name.padEnd(22)} min=${String(x.min).padStart(5)} pts=${String(x.pts).padStart(5)} = ${x.ppm} P/Min${x.noSecondSource ? '   << keine zweite Quelle!' : '   -> BBM genutzt'}`);
    });
  }
  console.log('');
  console.log('  Pro NBA-Team (Konsens / nur BBM):');
  Object.keys(perTeam).sort().forEach(t => {
    console.log(`    ${t.padEnd(4)} ${String(perTeam[t].both).padStart(3)} / ${perTeam[t].bbmOnly}`);
  });
}

main();
