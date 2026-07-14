#!/usr/bin/env node
// ============================================================
//  Aggregierte 9cat Z-Score Rankings (Woche / Monat)
//  Liest die von daily-9cat.js erzeugten CSVs im selben Ordner
//  und aggregiert sie zu einem stabileren Composite-Score.
//
//  Usage:
//    node aggregate-9cat.js week                        → letzte 7 Tage bis heute
//    node aggregate-9cat.js month                        → letzte 30 Tage bis heute
//    node aggregate-9cat.js week --end=2026-07-14        → 7 Tage bis zu einem Stichtag
//    node aggregate-9cat.js month --min-games=5          → Mindestanzahl Spiele (Default: week=2, month=4)
//    node aggregate-9cat.js week --league=nba-summer-las-vegas
// ============================================================

const fs = require('fs');
const path = require('path');

const args = process.argv.slice(2);
const period = args.find(a => a === 'week' || a === 'month') || 'week';
const endArg = args.find(a => a.startsWith('--end='));
const leagueArg = args.find(a => a.startsWith('--league='));
const minGamesArg = args.find(a => a.startsWith('--min-games='));

const LEAGUE = leagueArg ? leagueArg.split('=')[1] : 'nba-summer-las-vegas';
const dirArg = args.find(a => a.startsWith('--dir='));
const WINDOW_DAYS = period === 'month' ? 30 : 7;
const MIN_GAMES = minGamesArg
  ? parseInt(minGamesArg.split('=')[1], 10)
  : (period === 'month' ? 4 : 2);

function toDate(str) {
  const [y, m, d] = str.split('-').map(Number);
  return new Date(Date.UTC(y, m - 1, d));
}
function toDateStr(d) {
  return d.toISOString().slice(0, 10);
}

const endDate = endArg ? toDate(endArg.split('=')[1]) : toDate(new Date().toISOString().slice(0, 10));
const startDate = new Date(endDate);
startDate.setUTCDate(startDate.getUTCDate() - (WINDOW_DAYS - 1));

const CATEGORIES = [
  { key: 'pts', label: 'PTS' },
  { key: 'reb', label: 'REB' },
  { key: 'ast', label: 'AST' },
  { key: 'stl', label: 'STL' },
  { key: 'blk', label: 'BLK' },
  { key: 'tpm', label: '3PM' },
  { key: 'fgImpact', label: 'FG%' },
  { key: 'ftImpact', label: 'FT%' },
  { key: 'to', label: 'TO', invert: true },
];

// ------------------------------------------------------------
// Minimaler CSV-Parser (behandelt gequotete Felder mit "" als Escape)
// ------------------------------------------------------------
function parseCsv(text) {
  const lines = text.split(/\r?\n/).filter(l => l.length > 0);
  const header = splitCsvLine(lines[0]);
  return lines.slice(1).map(line => {
    const fields = splitCsvLine(line);
    const row = {};
    header.forEach((h, i) => { row[h] = fields[i]; });
    return row;
  });
}
function splitCsvLine(line) {
  const fields = [];
  let cur = '';
  let inQuotes = false;
  for (let i = 0; i < line.length; i++) {
    const c = line[i];
    if (inQuotes) {
      if (c === '"' && line[i + 1] === '"') { cur += '"'; i++; }
      else if (c === '"') { inQuotes = false; }
      else { cur += c; }
    } else {
      if (c === '"') inQuotes = true;
      else if (c === ',') { fields.push(cur); cur = ''; }
      else cur += c;
    }
  }
  fields.push(cur);
  return fields;
}

// ------------------------------------------------------------
// 1) Passende Tages-CSVs im Zeitfenster finden
// ------------------------------------------------------------
const dir = dirArg ? dirArg.split('=')[1] : path.join(__dirname, 'data');
const filePattern = new RegExp(`^daily-9cat_${LEAGUE}_(\\d{4}-\\d{2}-\\d{2})\\.csv$`);

const filesInWindow = fs.readdirSync(dir)
  .map(f => {
    const m = f.match(filePattern);
    if (!m) return null;
    const fileDate = toDate(m[1]);
    if (fileDate < startDate || fileDate > endDate) return null;
    return { file: f, date: m[1] };
  })
  .filter(Boolean)
  .sort((a, b) => a.date.localeCompare(b.date));

if (!filesInWindow.length) {
  console.log(`Keine Tages-CSVs im Zeitraum ${toDateStr(startDate)} bis ${toDateStr(endDate)} gefunden (Liga: ${LEAGUE}).`);
  console.log('Läuft daily-9cat.js schon lange genug automatisiert, um Daten für diesen Zeitraum zu haben?');
  process.exit(0);
}

// ------------------------------------------------------------
// 2) Pro Spieler aggregieren (Summen über alle Tage im Fenster)
// ------------------------------------------------------------
const players = new Map(); // key: name -> aggregate object

for (const { file, date } of filesInWindow) {
  const text = fs.readFileSync(path.join(dir, file), 'utf8');
  const rows = parseCsv(text);
  for (const row of rows) {
    const name = row.Name;
    if (!players.has(name)) {
      players.set(name, {
        name,
        team: row.Team,
        games: 0,
        min: 0, pts: 0, reb: 0, ast: 0, stl: 0, blk: 0, to: 0, tpm: 0,
        fgm: 0, fga: 0, ftm: 0, fta: 0,
      });
    }
    const p = players.get(name);
    p.team = row.Team; // letztbekanntes Team
    p.games += 1;
    p.min += Number(row.MIN) || 0;
    p.pts += Number(row.PTS) || 0;
    p.reb += Number(row.REB) || 0;
    p.ast += Number(row.AST) || 0;
    p.stl += Number(row.STL) || 0;
    p.blk += Number(row.BLK) || 0;
    p.to += Number(row.TO) || 0;
    p.tpm += Number(row['3PM']) || 0;
    p.fgm += Number(row.FGM) || 0;
    p.fga += Number(row.FGA) || 0;
    p.ftm += Number(row.FTM) || 0;
    p.fta += Number(row.FTA) || 0;
  }
}

const allPlayers = Array.from(players.values());
const eligible = allPlayers.filter(p => p.games >= MIN_GAMES);

if (!eligible.length) {
  console.log(`Keine Spieler mit mindestens ${MIN_GAMES} Spielen im Zeitraum gefunden. --min-games=N zum Anpassen.`);
  process.exit(0);
}

// Pro-Spiel-Durchschnitte für die Counting-Stat-Kategorien (fairer Vergleich
// zwischen Spielern mit unterschiedlicher Anzahl Spiele im Fenster)
for (const p of eligible) {
  p.ptsPg = p.pts / p.games;
  p.rebPg = p.reb / p.games;
  p.astPg = p.ast / p.games;
  p.stlPg = p.stl / p.games;
  p.blkPg = p.blk / p.games;
  p.toPg = p.to / p.games;
  p.tpmPg = p.tpm / p.games;
}

// ------------------------------------------------------------
// 3) FG%/FT%-Impact über aggregiertes Volumen (stabiler als am einzelnen Tag,
//    da FGA/FTA über mehrere Spiele summiert werden)
// ------------------------------------------------------------
const totalFGM = eligible.reduce((s, p) => s + p.fgm, 0);
const totalFGA = eligible.reduce((s, p) => s + p.fga, 0);
const totalFTM = eligible.reduce((s, p) => s + p.ftm, 0);
const totalFTA = eligible.reduce((s, p) => s + p.fta, 0);
const leagueFGpct = totalFGA > 0 ? totalFGM / totalFGA : 0;
const leagueFTpct = totalFTA > 0 ? totalFTM / totalFTA : 0;

for (const p of eligible) {
  const playerFGpct = p.fga > 0 ? p.fgm / p.fga : 0;
  const playerFTpct = p.fta > 0 ? p.ftm / p.fta : 0;
  // Pro-Spiel normiert, damit Spieler mit mehr Spielen nicht automatisch einen
  // größeren Impact-Betrag anhäufen als Spieler mit weniger, aber effizienteren Spielen
  p.fgImpact = p.fga > 0 ? (playerFGpct - leagueFGpct) * (p.fga / p.games) : 0;
  p.ftImpact = p.fta > 0 ? (playerFTpct - leagueFTpct) * (p.fta / p.games) : 0;
}

// ------------------------------------------------------------
// 4) Z-Scores über den aggregierten Pool
// ------------------------------------------------------------
function mean(arr) { return arr.reduce((s, v) => s + v, 0) / arr.length; }
function stdDev(arr, m) {
  const variance = arr.reduce((s, v) => s + (v - m) ** 2, 0) / arr.length;
  return Math.sqrt(variance);
}

const FIELD_MAP = {
  pts: 'ptsPg', reb: 'rebPg', ast: 'astPg', stl: 'stlPg', blk: 'blkPg',
  tpm: 'tpmPg', to: 'toPg', fgImpact: 'fgImpact', ftImpact: 'ftImpact',
};

const stats = {};
for (const cat of CATEGORIES) {
  const field = FIELD_MAP[cat.key];
  const values = eligible.map(p => p[field]);
  const m = mean(values);
  const sd = stdDev(values, m);
  stats[cat.key] = { mean: m, sd };
}

for (const p of eligible) {
  let composite = 0;
  p.zScores = {};
  for (const cat of CATEGORIES) {
    const field = FIELD_MAP[cat.key];
    const { mean: m, sd } = stats[cat.key];
    let z = sd > 0 ? (p[field] - m) / sd : 0;
    if (cat.invert) z = -z;
    p.zScores[cat.key] = z;
    composite += z;
  }
  p.composite = composite;
}

eligible.sort((a, b) => b.composite - a.composite);

// ------------------------------------------------------------
// 5) Ausgabe: Konsole + CSV
// ------------------------------------------------------------
console.log(`\n=== ${period === 'month' ? 'Monats' : 'Wochen'}-9cat Ranking — ${toDateStr(startDate)} bis ${toDateStr(endDate)} (Liga: ${LEAGUE}) ===\n`);
console.log(`${filesInWindow.length} Tages-CSV(s) im Fenster, ${eligible.length} Spieler mit >= ${MIN_GAMES} Spielen (von ${allPlayers.length} insgesamt).\n`);
console.log(`Liga-Durchschnitt im Fenster: FG% ${(leagueFGpct * 100).toFixed(1)}%  FT% ${(leagueFTpct * 100).toFixed(1)}%\n`);

const consoleRows = eligible.map((p, i) => ({
  Rank: i + 1,
  Name: p.name,
  Team: p.team,
  GP: p.games,
  'MIN/G': (p.min / p.games).toFixed(1),
  'PTS/G': p.ptsPg.toFixed(1),
  'REB/G': p.rebPg.toFixed(1),
  'AST/G': p.astPg.toFixed(1),
  'STL/G': p.stlPg.toFixed(1),
  'BLK/G': p.blkPg.toFixed(1),
  'TO/G': p.toPg.toFixed(1),
  '3PM/G': p.tpmPg.toFixed(1),
  'FG%': p.fga > 0 ? ((p.fgm / p.fga) * 100).toFixed(1) : '-',
  'FT%': p.fta > 0 ? ((p.ftm / p.fta) * 100).toFixed(1) : '-',
  Composite: p.composite.toFixed(2),
}));
console.table(consoleRows);

const csvHeader = [
  'Rank', 'Name', 'Team', 'GP', 'MIN_per_G', 'PTS_per_G', 'REB_per_G', 'AST_per_G',
  'STL_per_G', 'BLK_per_G', 'TO_per_G', '3PM_per_G', 'FG%', 'FT%', 'FGImpact', 'FTImpact', 'Composite',
];
const csvLines = [csvHeader.join(',')];
eligible.forEach((p, i) => {
  csvLines.push([
    i + 1,
    `"${p.name.replace(/"/g, '""')}"`,
    p.team,
    p.games,
    (p.min / p.games).toFixed(1),
    p.ptsPg.toFixed(2),
    p.rebPg.toFixed(2),
    p.astPg.toFixed(2),
    p.stlPg.toFixed(2),
    p.blkPg.toFixed(2),
    p.toPg.toFixed(2),
    p.tpmPg.toFixed(2),
    p.fga > 0 ? ((p.fgm / p.fga) * 100).toFixed(1) : '',
    p.fta > 0 ? ((p.ftm / p.fta) * 100).toFixed(1) : '',
    p.fgImpact.toFixed(2),
    p.ftImpact.toFixed(2),
    p.composite.toFixed(2),
  ].join(','));
});

const fileName = `${period}-9cat_${LEAGUE}_${toDateStr(startDate)}_to_${toDateStr(endDate)}.csv`;
const filePath = path.join(dir, fileName);
fs.writeFileSync(filePath, csvLines.join('\n'), 'utf8');
console.log(`\nCSV gespeichert: ${filePath}\n`);
