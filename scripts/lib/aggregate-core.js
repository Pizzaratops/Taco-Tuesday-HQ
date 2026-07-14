// ============================================================
//  Geteilte Aggregations-Logik (Woche / Monat)
// ============================================================
//  Extrahiert aus aggregate-9cat.js, damit sowohl das manuelle
//  CLI-Tool (Konsole + CSV) als auch der Live-Scores-Converter
//  (data/livescores-aggregate.js) exakt dieselbe Z-Score-Mathe
//  benutzen und nicht auseinanderlaufen können.
// ============================================================

const fs = require('fs');
const path = require('path');

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

const FIELD_MAP = {
  pts: 'ptsPg', reb: 'rebPg', ast: 'astPg', stl: 'stlPg', blk: 'blkPg',
  tpm: 'tpmPg', to: 'toPg', fgImpact: 'fgImpact', ftImpact: 'ftImpact',
};

function toDate(str) {
  const [y, m, d] = str.split('-').map(Number);
  return new Date(Date.UTC(y, m - 1, d));
}
function toDateStr(d) {
  return d.toISOString().slice(0, 10);
}

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

function mean(arr) { return arr.reduce((s, v) => s + v, 0) / arr.length; }
function stdDev(arr, m) {
  const variance = arr.reduce((s, v) => s + (v - m) ** 2, 0) / arr.length;
  return Math.sqrt(variance);
}

/**
 * Berechnet das aggregierte 9cat-Ranking für ein Zeitfenster.
 *
 * @param {Object} opts
 * @param {string} opts.league    ESPN League-Slug (z.B. "nba-summer-las-vegas"),
 *   oder "all" / null, um ALLE Ligen zu kombinieren, für die Tages-CSVs im
 *   Ordner liegen (rollierendes Fenster über Standort-Grenzen hinweg — ein
 *   Spieler, der z.B. in Salt Lake UND Las Vegas gespielt hat, wird über
 *   beide Standorte hinweg für dieselben letzten 7/30 Tage zusammengezählt).
 * @param {string} opts.period    "week" | "month"
 * @param {string} opts.endDate   "YYYY-MM-DD" — Stichtag, Fenster endet hier
 * @param {string} opts.dir       Ordner mit den Tages-CSVs
 * @param {number} [opts.minGames] Mindestanzahl Spiele (Default: week=2, month=4)
 * @returns {Object} Discriminated result:
 *   { status: 'no-files', windowStart, windowEnd }
 *   { status: 'no-eligible', windowStart, windowEnd, allPlayersCount, minGames }
 *   { status: 'ok', windowStart, windowEnd, windowDays, filesInWindow, datesInWindow,
 *     leaguesInWindow, allPlayers, eligible, leagueFGpct, leagueFTpct, minGames }
 */
function computeAggregate({ league, period, endDate, dir, minGames }) {
  const WINDOW_DAYS = period === 'month' ? 30 : 7;
  const MIN_GAMES = minGames != null ? minGames : (period === 'month' ? 4 : 2);

  const end = toDate(endDate);
  const start = new Date(end);
  start.setUTCDate(start.getUTCDate() - (WINDOW_DAYS - 1));

  // "all"/null kombiniert ALLE Standorte (Cali/Utah/Vegas/...) — das Fenster
  // ist immer "die letzten 7/30 Tage", unabhängig davon, an welchem Standort
  // ein Spieler tatsächlich aufgelaufen ist.
  const combineAll = league === 'all' || league == null;
  const filePattern = combineAll
    ? /^daily-9cat_(.+)_(\d{4}-\d{2}-\d{2})\.csv$/
    : new RegExp(`^daily-9cat_${league}_(\\d{4}-\\d{2}-\\d{2})\\.csv$`);

  const filesInWindow = fs.readdirSync(dir)
    .map(f => {
      const m = f.match(filePattern);
      if (!m) return null;
      const fileLeague = combineAll ? m[1] : league;
      const fileDateStr = combineAll ? m[2] : m[1];
      const fileDate = toDate(fileDateStr);
      if (fileDate < start || fileDate > end) return null;
      return { file: f, date: fileDateStr, league: fileLeague };
    })
    .filter(Boolean)
    .sort((a, b) => a.date.localeCompare(b.date) || a.league.localeCompare(b.league));

  if (!filesInWindow.length) {
    return { status: 'no-files', windowStart: start, windowEnd: end };
  }

  const datesInWindow = [...new Set(filesInWindow.map(f => f.date))].sort();
  const leaguesInWindow = [...new Set(filesInWindow.map(f => f.league))].sort();

  const players = new Map(); // key: name -> aggregate object
  for (const { file, date, league: fileLeague } of filesInWindow) {
    const text = fs.readFileSync(path.join(dir, file), 'utf8');
    const rows = parseCsv(text);
    for (const row of rows) {
      const name = row.Name;
      if (!players.has(name)) {
        players.set(name, {
          name,
          team: row.Team,
          games: 0,
          leagues: new Set(),
          min: 0, pts: 0, reb: 0, ast: 0, stl: 0, blk: 0, to: 0, tpm: 0,
          fgm: 0, fga: 0, ftm: 0, fta: 0,
        });
      }
      const p = players.get(name);
      p.team = row.Team; // letztbekanntes Team (Dateien sind chronologisch sortiert)
      p.leagues.add(fileLeague);
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

  const allPlayers = Array.from(players.values()).map(p => {
    p.leagues = Array.from(p.leagues).sort();
    return p;
  });
  const eligible = allPlayers.filter(p => p.games >= MIN_GAMES);

  if (!eligible.length) {
    return { status: 'no-eligible', windowStart: start, windowEnd: end, allPlayersCount: allPlayers.length, minGames: MIN_GAMES };
  }

  for (const p of eligible) {
    p.ptsPg = p.pts / p.games;
    p.rebPg = p.reb / p.games;
    p.astPg = p.ast / p.games;
    p.stlPg = p.stl / p.games;
    p.blkPg = p.blk / p.games;
    p.toPg = p.to / p.games;
    p.tpmPg = p.tpm / p.games;
  }

  const totalFGM = eligible.reduce((s, p) => s + p.fgm, 0);
  const totalFGA = eligible.reduce((s, p) => s + p.fga, 0);
  const totalFTM = eligible.reduce((s, p) => s + p.ftm, 0);
  const totalFTA = eligible.reduce((s, p) => s + p.fta, 0);
  const leagueFGpct = totalFGA > 0 ? totalFGM / totalFGA : 0;
  const leagueFTpct = totalFTA > 0 ? totalFTM / totalFTA : 0;

  for (const p of eligible) {
    const playerFGpct = p.fga > 0 ? p.fgm / p.fga : 0;
    const playerFTpct = p.fta > 0 ? p.ftm / p.fta : 0;
    p.fgImpact = p.fga > 0 ? (playerFGpct - leagueFGpct) * (p.fga / p.games) : 0;
    p.ftImpact = p.fta > 0 ? (playerFTpct - leagueFTpct) * (p.fta / p.games) : 0;
  }

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

  return {
    status: 'ok',
    windowStart: start,
    windowEnd: end,
    windowDays: WINDOW_DAYS,
    filesInWindow,
    datesInWindow,
    leaguesInWindow,
    allPlayers,
    eligible,
    leagueFGpct,
    leagueFTpct,
    minGames: MIN_GAMES,
  };
}

module.exports = {
  CATEGORIES, FIELD_MAP,
  toDate, toDateStr,
  parseCsv, splitCsvLine,
  mean, stdDev,
  computeAggregate,
};
