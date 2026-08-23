#!/usr/bin/env node
// ============================================================
//  Games-JSON  →  data/livescores-boxscores.js
// ============================================================
//  Liest die von daily-9cat.js erzeugte Tages-Games-JSON
//  (daily-9cat_<league>_<date>.games.json — pro Spiel gruppierte
//  Spieler inkl. FGM/FGA/FTM/FTA + Z-Scores) und merged sie in
//  data/livescores-boxscores.js unter
//  LIVESCORES_BOXSCORES[league][datum].
//
//  Bestehende Einträge (andere Ligen/Daten) bleiben erhalten —
//  es wird nur der eine Tag/Liga-Schlüssel überschrieben/ergänzt.
//  Analog zu scripts/convert-to-livescores.js, nur pro Spiel statt
//  über den gesamten Tages-Pool gemergt.
//
//  Usage:
//    node scripts/convert-to-boxscores.js
//      → heutiges Datum, Liga nba-summer-las-vegas
//    node scripts/convert-to-boxscores.js --date=2026-07-14 --league=nba
//    node scripts/convert-to-boxscores.js --dir=scripts/data --out=data/livescores-boxscores.js
//    node scripts/convert-to-boxscores.js --keep-days=60
// ============================================================

const fs = require('fs');
const path = require('path');
const vm = require('vm');
const { assertNoConflictMarkers } = require('./conflict-guard');

const args = process.argv.slice(2);
const arg = (name, fallback) => {
  const found = args.find(a => a.startsWith(`--${name}=`));
  return found ? found.split('=').slice(1).join('=') : fallback;
};

const dateStr = arg('date', new Date().toISOString().slice(0, 10));
const LEAGUE = arg('league', 'nba-summer-las-vegas');
const DIR = arg('dir', path.join(__dirname, 'data'));
const OUT = arg('out', path.join(__dirname, '..', 'data', 'livescores-boxscores.js'));
const keepDaysArg = arg('keep-days', null);

const jsonPath = path.join(DIR, `daily-9cat_${LEAGUE}_${dateStr}.games.json`);

if (!fs.existsSync(jsonPath)) {
  console.log(`Keine Games-JSON gefunden (${jsonPath}) — vermutlich keine Spiele am ${dateStr}. Überspringe, livescores-boxscores.js bleibt unverändert.`);
  process.exit(0);
}

const raw = JSON.parse(fs.readFileSync(jsonPath, 'utf8'));
const dayEntry = { games: raw.games || [] };

// ------------------------------------------------------------
// 1) Bestehende livescores-boxscores.js laden (falls vorhanden)
// ------------------------------------------------------------
let existing = {};
if (fs.existsSync(OUT)) {
  const code = fs.readFileSync(OUT, 'utf8');
  // FATAL bei liegen gebliebenen Merge-Konfliktmarkern (siehe conflict-guard.js) --
  // ohne diesen Check wuerde der catch-Block unten das als generischen Parse-
  // Fehler auffangen und die komplette Historie dieser Datei klaglos loeschen.
  assertNoConflictMarkers(OUT, code);
  const sandbox = {};
  vm.createContext(sandbox);
  try {
    vm.runInContext(`${code}\nthis.__RESULT__ = typeof LIVESCORES_BOXSCORES !== "undefined" ? LIVESCORES_BOXSCORES : {};`, sandbox);
    existing = sandbox.__RESULT__ || {};
  } catch (err) {
    console.error(`Konnte bestehende ${OUT} nicht parsen (${err.message}) — sie wird komplett neu geschrieben.`);
    existing = {};
  }
}

existing[LEAGUE] = existing[LEAGUE] || {};
existing[LEAGUE][dateStr] = dayEntry;

// ------------------------------------------------------------
// 2) Optional: alte Tage rauswerfen
// ------------------------------------------------------------
if (keepDaysArg) {
  const keepDays = parseInt(keepDaysArg, 10);
  const [y, m, d] = dateStr.split('-').map(Number);
  const cutoff = new Date(Date.UTC(y, m - 1, d));
  cutoff.setUTCDate(cutoff.getUTCDate() - keepDays);
  for (const lg of Object.keys(existing)) {
    for (const dt of Object.keys(existing[lg])) {
      const [dy, dm, dd] = dt.split('-').map(Number);
      if (new Date(Date.UTC(dy, dm - 1, dd)) < cutoff) delete existing[lg][dt];
    }
  }
}

// ------------------------------------------------------------
// 3) Zurück in JS serialisieren
// ------------------------------------------------------------
function fmtPlayer(p) {
  const z = p.zScores || {};
  const zStr = Object.keys(z).map(k => `${k}: ${z[k]}`).join(', ');
  return `{ name: ${JSON.stringify(p.name)}, min: ${p.min}, pts: ${p.pts}, reb: ${p.reb}, ast: ${p.ast}, stl: ${p.stl}, blk: ${p.blk}, to: ${p.to}, tpm: ${p.tpm}, fgm: ${p.fgm}, fga: ${p.fga}, ftm: ${p.ftm}, fta: ${p.fta}, composite: ${p.composite}, zScores: { ${zStr} } }`;
}

function fmtTeam(t) {
  if (!t) return 'null';
  const players = (t.players || []).map(p => '          ' + fmtPlayer(p)).join(',\n');
  return `{
        abbr: ${JSON.stringify(t.abbr)}, name: ${JSON.stringify(t.name)}, score: ${t.score},
        players: [
${players}
        ]
      }`;
}

function fmtGame(g) {
  // completed=false -> noch nicht gestartetes Spiel, players ist dann leer
  // und statusText traegt die Tip-off-Zeit statt "Final" (siehe daily-9cat.js).
  return `{
      id: ${JSON.stringify(g.id)},
      line: ${JSON.stringify(g.line)},
      completed: ${g.completed ? 'true' : 'false'},
      statusText: ${JSON.stringify(g.statusText || '')},
      away: ${fmtTeam(g.away)},
      home: ${fmtTeam(g.home)}
    }`;
}

function fmtDay(day) {
  const games = (day.games || []).map(g => '      ' + fmtGame(g)).join(',\n');
  return `{
    games: [
${games}
    ]
  }`;
}

const leagueBlocks = Object.keys(existing).sort().map(lg => {
  const dates = Object.keys(existing[lg]).sort();
  const dayBlocks = dates.map(d => `    ${JSON.stringify(d)}: ${fmtDay(existing[lg][d])}`).join(',\n');
  return `  ${JSON.stringify(lg)}: {\n${dayBlocks}\n  }`;
}).join(',\n');

const header = `// ============================================================
//  LIVE SCORES — Box Scores (pro Spiel, inkl. FGM/FGA/FTM/FTA)
// ============================================================
//  AUTO-GENERIERT von scripts/convert-to-boxscores.js über die
//  "Daily 9cat Live Scores" GitHub Action. Nicht von Hand editieren
//  — Änderungen werden beim nächsten Lauf überschrieben.
//
//  Shape:
//  LIVESCORES_BOXSCORES[league][date] = {
//    games: [
//      {
//        id, line,  // abgeschlossen: "Memphis Grizzlies 84 @ Portland Trail Blazers 91 (Final)"
//                    // noch ausstehend: "Miami Heat @ Toronto Raptors (7:00 PM ET)" (kein Punktestand)
//        completed,  // false = Spiel noch nicht gestartet -- players ist dann [] auf beiden Seiten
//        statusText, // Tip-off-Zeit ("7:00 PM ET") wenn !completed, sonst "Final"/Live-Status
//        away: { abbr, name, score, players: [ {...} ] },  // score ist null wenn !completed
//        home: { abbr, name, score, players: [ {...} ] },
//      },
//      ...
//    ]
//  }
//
//  Jeder Spieler-Eintrag: { name, min, pts, reb, ast, stl, blk, to, tpm,
//    fgm, fga, ftm, fta, composite, zScores }
//  zScores/composite sind aus dem Tages-Pool des Spiels berechnet (identisch
//  zu data/livescores-daily.js für denselben Tag) — dienen hier nur der
//  Farbkodierung einzelner Statzeilen, nicht als eigener Ranking-Pool.
//
//  date format: "YYYY-MM-DD"
//  league keys match the ESPN league slugs used in daily-9cat.js:
//    "nba-summer-las-vegas" | "nba-preseason" | "nba"
// ============================================================

const LIVESCORES_BOXSCORES = {
${leagueBlocks}
};
`;

fs.mkdirSync(path.dirname(OUT), { recursive: true });
fs.writeFileSync(OUT, header, 'utf8');
console.log(`${OUT} aktualisiert: ${LEAGUE} / ${dateStr} (${dayEntry.games.length} Spiel(e)).`);
