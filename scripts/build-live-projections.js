#!/usr/bin/env node
// ============================================================
//  BUILD LIVE PROJECTIONS
// ============================================================
//  Blendet Beyaz' Preseason-Baseline (data/projections-baseline.js)
//  mit den echten Boxscore-Stats der bisherigen Saison und schreibt
//  data/live-projections.js. Läuft ab Saisonstart als Teil der
//  täglichen Pipeline (nach daily-9cat.js), siehe README
//  "Season-Start-Plan: Projections-Flow".
//
//  Quelle für die echten Stats: die taeglichen CSVs, die daily-9cat.js
//  ohnehin schon pro Spieltag unter scripts/data/ ablegt
//  (daily-9cat_<league>_<date>.csv) — hier werden sie season-weit
//  aufsummiert (nicht die kompakten LIVESCORES_DAILY-Prozentwerte, weil
//  die keine rohen Makes/Attempts mehr enthalten).
//
//  Blend-Formel je Counting-Stat (PTS, REB, AST, STL, BLK, 3PM, TOV,
//  FGM, FGA, FTM, FTA):
//    geblendeter Wert = (Baseline × BASELINE_WEIGHT + Σ echte Spiele)
//                        / (BASELINE_WEIGHT + Anzahl echter Spiele)
//  FG%/FT% werden NICHT direkt gemittelt (Verhältniszahlen!), sondern
//  aus den geblendeten FGM/FGA bzw. FTM/FTA berechnet — die Baseline
//  bringt dafür ihre eigenen Makes/Attempts mit (siehe
//  import-projections-baseline.js), kein Prozent-Mittelwert nötig.
//
//  BASELINE_WEIGHT = 2: die Baseline zählt wie 2 "virtuelle" Spiele.
//  Bewusste Wahl (siehe Chat-Diskussion): Gewicht 1 macht die Baseline
//  schon nach 3-4 Spielen fast bedeutungslos (sehr reaktionsschnell auf
//  Breakouts/Bruchbuden, aber wackelig in den ersten Wochen); Gewicht 2
//  gibt ihr etwas mehr Bestand gegen Kleine-Stichprobe-Ausreißer, ohne
//  träge zu werden. Leicht anpassbar, falls sich das nicht bewährt.
//
//  Usage:
//    node scripts/build-live-projections.js [--league=nba] [--weight=2]
// ============================================================

const fs = require('fs');
const path = require('path');
const vm = require('vm');

const ROOT = path.join(__dirname, '..');
const BASELINE_PATH = path.join(ROOT, 'data', 'projections-baseline.js');
const RANKINGS_PATH = path.join(ROOT, 'data', 'rankings.js');
const CSV_DIR = path.join(__dirname, 'data');
const OUT = path.join(ROOT, 'data', 'live-projections.js');

const args = process.argv.slice(2);
const leagueArg = (args.find(a => a.startsWith('--league=')) || '').split('=')[1] || 'nba';
const BASELINE_WEIGHT = parseFloat((args.find(a => a.startsWith('--weight=')) || '').split('=')[1]) || 2;

function extractBalanced(code, marker, openCh, closeCh) {
  const start = code.indexOf(marker);
  if (start === -1) return null;
  let depth = 0, end = -1;
  for (let i = start + marker.length - 1; i < code.length; i++) {
    if (code[i] === openCh) depth++;
    else if (code[i] === closeCh) { depth--; if (depth === 0) { end = i + 1; break; } }
  }
  if (end === -1) return null;
  return code.slice(start, end) + ';';
}
function loadVmArray(filePath, varName) {
  const code = fs.readFileSync(filePath, 'utf8');
  const snippet = extractBalanced(code, `const ${varName} = [`, '[', ']');
  if (!snippet) return null;
  const sandbox = {}; vm.createContext(sandbox);
  vm.runInContext(`${snippet}\nthis.__RESULT__ = ${varName};`, sandbox);
  return sandbox.__RESULT__;
}
function loadVmObject(filePath, varName) {
  if (!fs.existsSync(filePath)) return null;
  const code = fs.readFileSync(filePath, 'utf8');
  const snippet = extractBalanced(code, `const ${varName} = {`, '{', '}');
  if (!snippet) return null;
  const sandbox = {}; vm.createContext(sandbox);
  vm.runInContext(`${snippet}\nthis.__RESULT__ = ${varName};`, sandbox);
  return sandbox.__RESULT__;
}

const PROJECTIONS_BASELINE = loadVmObject(BASELINE_PATH, 'PROJECTIONS_BASELINE') || {};
const DYNASTY_PLAYERS = loadVmArray(RANKINGS_PATH, 'DYNASTY_PLAYERS') || [];
const dynastyByName = new Map(DYNASTY_PLAYERS.map(p => [p[1], p]));

// ── Name-Normalisierung wie in den anderen Scripts (fuer CSV-Namen,
//    die evtl. leicht anders geschrieben sind als in der Baseline) ──
const NAME_ALIASES = loadVmObject(path.join(ROOT, 'data', 'aliases.js'), 'NAME_ALIASES') || {};
const NAME_FIRST_ALIASES = {
  'nicolas claxton': 'nic claxton', 'alexandre sarr': 'alex sarr',
  'cameron johnson': 'cam johnson', 'cameron boozer': 'cam boozer',
  'ronald holland ii': 'ron holland', 'ronald holland': 'ron holland',
};
function stripDiacritics(s) { return s.normalize('NFKD').replace(/[\u0300-\u036f]/g, ''); }
function baseNormalize(raw) { return stripDiacritics(raw || '').toLowerCase().trim().replace(/\./g, '').replace(/['\u2019\u2018`]/g, ''); }
function normalizeName(raw) {
  let s = baseNormalize(raw).replace(/\b(jr|sr|iii|ii)\b/g, '').replace(/\s+/g, ' ').trim();
  return NAME_FIRST_ALIASES[s] || s;
}
function aliasCanonical(raw) {
  const base = baseNormalize(raw).replace(/\s+/g, ' ').trim();
  return NAME_ALIASES[base] || null;
}
const dynastyByNorm = new Map(DYNASTY_PLAYERS.map(p => [normalizeName(p[1]), p]));
function canonicalName(rawName) {
  const aliasName = aliasCanonical(rawName);
  if (aliasName) { const m = dynastyByNorm.get(normalizeName(aliasName)); if (m) return m[1]; }
  const m = dynastyByNorm.get(normalizeName(rawName));
  return m ? m[1] : rawName;
}

// ── Alle Tages-CSVs der gewaehlten Liga einlesen und aufsummieren ──
function parseCsvLine(line) {
  // simpler CSV-Parser, reicht für dieses feste Format (ein quoted Feld: Name)
  const out = [];
  let cur = '', inQuotes = false;
  for (let i = 0; i < line.length; i++) {
    const c = line[i];
    if (c === '"') inQuotes = !inQuotes;
    else if (c === ',' && !inQuotes) { out.push(cur); cur = ''; }
    else cur += c;
  }
  out.push(cur);
  return out;
}

const totals = new Map(); // canonicalName -> { games, pts, reb, ast, stl, blk, tpm, tov, fgm, fga, ftm, fta }
let filesRead = 0;
if (fs.existsSync(CSV_DIR)) {
  const files = fs.readdirSync(CSV_DIR).filter(f => f.startsWith(`daily-9cat_${leagueArg}_`) && f.endsWith('.csv'));
  files.forEach(f => {
    const lines = fs.readFileSync(path.join(CSV_DIR, f), 'utf8').split('\n').filter(Boolean);
    const header = parseCsvLine(lines[0]).map(h => h.trim());
    const col = name => header.indexOf(name);
    const c = {
      name: col('Name'), pts: col('PTS'), reb: col('REB'), ast: col('AST'),
      stl: col('STL'), blk: col('BLK'), to: col('TO'), tpm: col('3PM'),
      fgm: col('FGM'), fga: col('FGA'), ftm: col('FTM'), fta: col('FTA'),
    };
    if (c.name === -1) return;
    filesRead++;
    for (let i = 1; i < lines.length; i++) {
      const r = parseCsvLine(lines[i]);
      if (!r[c.name]) continue;
      const name = canonicalName(r[c.name].trim());
      const t = totals.get(name) || { games: 0, pts: 0, reb: 0, ast: 0, stl: 0, blk: 0, tpm: 0, tov: 0, fgm: 0, fga: 0, ftm: 0, fta: 0 };
      t.games += 1;
      t.pts += parseFloat(r[c.pts]) || 0;
      t.reb += parseFloat(r[c.reb]) || 0;
      t.ast += parseFloat(r[c.ast]) || 0;
      t.stl += parseFloat(r[c.stl]) || 0;
      t.blk += parseFloat(r[c.blk]) || 0;
      t.tpm += parseFloat(r[c.tpm]) || 0;
      t.tov += parseFloat(r[c.to]) || 0;
      t.fgm += parseFloat(r[c.fgm]) || 0;
      t.fga += parseFloat(r[c.fga]) || 0;
      t.ftm += parseFloat(r[c.ftm]) || 0;
      t.fta += parseFloat(r[c.fta]) || 0;
      totals.set(name, t);
    }
  });
}
console.log(`${filesRead} Tages-CSV(s) für Liga "${leagueArg}" eingelesen, ${totals.size} Spieler mit echten Stats.`);

// ── Blenden ──────────────────────────────────────────────────
const STAT_KEYS = ['pts', 'reb', 'ast', 'stl', 'blk', 'tpm', 'tov', 'fgm', 'fga', 'ftm', 'fta'];
const allNames = new Set([...Object.keys(PROJECTIONS_BASELINE), ...totals.keys()]);

const live = {};
allNames.forEach(name => {
  const base = PROJECTIONS_BASELINE[name] || null;
  const actual = totals.get(name) || null;
  const games = actual ? actual.games : 0;

  const blended = {};
  STAT_KEYS.forEach(k => {
    const baseVal = base ? (base[k] || 0) : 0;
    const actualSum = actual ? (actual[k] || 0) : 0;
    const w = base ? BASELINE_WEIGHT : 0; // kein Baseline-Eintrag -> reiner Saison-Schnitt
    const denom = w + games;
    blended[k] = denom > 0 ? (baseVal * w + actualSum) / denom : 0;
  });
  blended.min = base ? base.min : 0; // MIN wird nicht season-live geblendet, reine Baseline-Info
  blended.fgPct = blended.fga > 0 ? (blended.fgm / blended.fga) * 100 : 0;
  blended.ftPct = blended.fta > 0 ? (blended.ftm / blended.fta) * 100 : 0;
  blended.gamesPlayed = games;
  blended.hasBaseline = !!base;

  live[name] = blended;
});

function serialize(obj) {
  const lines = Object.entries(obj).map(([name, s]) => {
    const escaped = name.replace(/\\/g, '\\\\').replace(/"/g, '\\"');
    const round = n => Math.round(n * 100) / 100;
    return `  "${escaped}": { min:${round(s.min)}, pts:${round(s.pts)}, reb:${round(s.reb)}, ast:${round(s.ast)}, stl:${round(s.stl)}, blk:${round(s.blk)}, tpm:${round(s.tpm)}, tov:${round(s.tov)}, fgm:${round(s.fgm)}, fga:${round(s.fga)}, ftm:${round(s.ftm)}, fta:${round(s.fta)}, fgPct:${round(s.fgPct)}, ftPct:${round(s.ftPct)}, gamesPlayed:${s.gamesPlayed}, hasBaseline:${s.hasBaseline} }`;
  });
  return lines.join(',\n');
}

const today = new Date().toISOString().slice(0, 10);
const out = `// ============================================================
//  LIVE PROJECTIONS
// ============================================================
//  AUTO-GENERIERT von scripts/build-live-projections.js. Nicht von
//  Hand editieren. Blend aus data/projections-baseline.js (Preseason)
//  + den echten Saison-Stats bisher (BASELINE_WEIGHT=${BASELINE_WEIGHT}, siehe
//  Script-Kommentar für die Formel). Siehe README "Season-Start-Plan:
//  Projections-Flow".
//  Zuletzt gebaut: ${today} · Liga: ${leagueArg} · ${filesRead} Spieltag(e) eingerechnet
//
//  Shape: LIVE_PROJECTIONS["Spielername"] = {
//    min, pts, reb, ast, stl, blk, tpm, tov, fgm, fga, ftm, fta,  // Pro-Spiel-Schnitte, geblendet
//    fgPct, ftPct,        // aus geblendeten Makes/Attempts berechnet, NICHT gemittelt
//    gamesPlayed,          // echte Spiele bisher in dieser Liga
//    hasBaseline,          // false = kein Preseason-Wert vorhanden, reiner Saison-Schnitt
//  }
// ============================================================

const LIVE_PROJECTIONS = {
${serialize(live)}
};
`;
fs.writeFileSync(OUT, out, 'utf8');
console.log(`${OUT} geschrieben: ${allNames.size} Spieler total.`);
