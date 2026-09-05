// ============================================================
//  scripts/lib/nba-sportsdataverse.js
//  Geteilte Helfer für alle NBA-Sync-Scripts, die sportsdataverse-
//  Daten (github.com/sportsdataverse/sportsdataverse-data) nutzen --
//  analog zum Muster von scripts/lib/nflverse.js auf Bear Witch
//  Project HQ. Extrahiert aus scripts/build-nba-power-rankings.js
//  (2026-09-05), damit build-nba-power-score.js dieselbe, bereits
//  live verifizierte Team-Code-Normalisierung/CSV-Parsing nutzt statt
//  einer zweiten, separat driftenden Kopie.
//
//  Bewusst ohne externe npm-Dependency (kein "npm install" nötig in
//  GitHub Actions) -- reiner Node-Bordmittel-Code.
// ============================================================

const https = require('https');

// ------------------------------------------------------------
// HTTP-Helfer (folgt Redirects rekursiv -- GitHub-Release-Downloads
// sind praktisch immer ein 302 auf release-assets.githubusercontent.com).
// ------------------------------------------------------------
function httpsGetText(url) {
  return new Promise((resolve, reject) => {
    https.get(url, {
      headers: { 'User-Agent': 'taco-tuesday-hq-bot', 'Accept': '*/*' },
    }, res => {
      if (res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
        res.resume();
        return httpsGetText(res.headers.location).then(resolve, reject);
      }
      if (res.statusCode !== 200) {
        res.resume();
        return reject(new Error(`HTTP ${res.statusCode} für ${url}`));
      }
      let data = '';
      res.setEncoding('utf8');
      res.on('data', chunk => { data += chunk; });
      res.on('end', () => resolve(data));
    }).on('error', reject);
  });
}

async function httpsGetJson(url) {
  const text = await httpsGetText(url);
  try { return JSON.parse(text); }
  catch (e) { throw new Error(`Keine gültige JSON-Antwort von ${url}: ${e.message}`); }
}

// Handgerollter RFC4180-CSV-Parser (Kommas/Anführungszeichen in Feldern
// korrekt behandelt) -- bewusst ohne npm-Package.
function parseCsv(text) {
  const rows = [];
  let row = [];
  let field = '';
  let inQuotes = false;
  for (let i = 0; i < text.length; i++) {
    const c = text[i];
    if (inQuotes) {
      if (c === '"') {
        if (text[i + 1] === '"') { field += '"'; i++; }
        else { inQuotes = false; }
      } else { field += c; }
    } else if (c === '"') {
      inQuotes = true;
    } else if (c === ',') {
      row.push(field); field = '';
    } else if (c === '\r') {
      // ignorieren, \n unten übernimmt den Zeilenabschluss
    } else if (c === '\n') {
      row.push(field); field = '';
      rows.push(row); row = [];
    } else {
      field += c;
    }
  }
  if (field.length || row.length) { row.push(field); rows.push(row); }
  if (!rows.length) return [];
  const header = rows[0].map(h => h.trim());
  return rows.slice(1)
    .filter(r => r.length > 1 || (r.length === 1 && r[0] !== ''))
    .map(r => Object.fromEntries(header.map((h, idx) => [h, (r[idx] ?? '').trim()])));
}

async function fetchCsv(url) {
  const text = await httpsGetText(url);
  return parseCsv(text);
}

// ------------------------------------------------------------
// Team-Codes -- Ziel-Standard: dieselben Tricodes, die dieses Repo
// bereits in NBA_TEAM_NAMES (js/nba-teams.js) verwendet.
// ------------------------------------------------------------
const REPO_TRICODES = [
  'ATL','BOS','BKN','CHA','CHI','CLE','DAL','DEN','DET','GSW','HOU','IND',
  'LAC','LAL','MEM','MIA','MIL','MIN','NOP','NYK','OKC','ORL','PHI','PHO',
  'POR','SAC','SAS','TOR','UTA','WAS',
];

// Alias-Tabelle für ESPN-eigene, abweichende Kürzel -- gilt sowohl für
// die Schedule-Datei (espn_nba_schedules) als auch für die Team-Boxscore-
// Datei (espn_nba_team_boxscores/team_box_{season}.csv): beide sind
// ESPN-Quellen mit denselben Kürzel-Eigenheiten (live verifiziert,
// 2026-09-05 -- team_box nutzt exakt dieselben Sonderfälle wie die
// Schedule-Datei, deshalb EINE gemeinsame Tabelle statt zwei separaten).
const ESPN_ALIAS = {
  GS: 'GSW', NO: 'NOP', NY: 'NYK', SA: 'SAS', UTAH: 'UTA', WSH: 'WAS', PHX: 'PHO',
};

// Nicht-Team-Codes, die in ESPN-Datensätzen zusätzlich zu den 30 echten
// Teams auftauchen (All-Star-Weekend-"Teams") -- kein Alias, sondern
// bewusst NIE auf ein echtes Team gemappt, damit sie nirgends versehentlich
// als Team-30-Ergebnis landen.
const NON_TEAM_CODES = new Set(['WORLD', 'STARS', 'STRIPES', 'USA', 'INTERNATIONAL']);

// Konferenz/Division-Zuordnung (seit Jahren stabil, hart hinterlegt --
// ändert sich nur bei Liga-Realignment, dann hier zentral pflegen).
const CONF_DIV = {
  BOS:['East','Atlantic'], BKN:['East','Atlantic'], NYK:['East','Atlantic'], PHI:['East','Atlantic'], TOR:['East','Atlantic'],
  CHI:['East','Central'], CLE:['East','Central'], DET:['East','Central'], IND:['East','Central'], MIL:['East','Central'],
  ATL:['East','Southeast'], CHA:['East','Southeast'], MIA:['East','Southeast'], ORL:['East','Southeast'], WAS:['East','Southeast'],
  DEN:['West','Northwest'], MIN:['West','Northwest'], OKC:['West','Northwest'], POR:['West','Northwest'], UTA:['West','Northwest'],
  GSW:['West','Pacific'], LAC:['West','Pacific'], LAL:['West','Pacific'], PHO:['West','Pacific'], SAC:['West','Pacific'],
  DAL:['West','Southwest'], HOU:['West','Southwest'], MEM:['West','Southwest'], NOP:['West','Southwest'], SAS:['West','Southwest'],
};

// ------------------------------------------------------------
// Team-Code-Normalisierung. WICHTIG (Bug live gefunden & gefixt am
// 2026-09-05 in build-nba-power-rankings.js): Warnung-Dedup und
// Verwerfen-Entscheidung MÜSSEN entkoppelt sein. Eine frühere Version
// hatte beides an dieselbe Bedingung gekoppelt -- ab dem zweiten
// Auftreten eines unbekannten Codes (z.B. All-Star-Teams) wurde der
// Code dann fälschlich als "gültig" durchgereicht, weil nur die
// Warnung, nicht aber das Verwerfen, per Set gedrosselt werden sollte.
// Separates Set pro require() dieses Moduls (also pro Script-Lauf).
// ------------------------------------------------------------
function createTeamNormalizer(alias = ESPN_ALIAS) {
  const warned = new Set();
  return function normalizeTeam(code) {
    const c = (code || '').trim().toUpperCase();
    if (NON_TEAM_CODES.has(c)) return null; // nie warnen, das ist erwartet
    const mapped = alias[c] || c;
    if (!REPO_TRICODES.includes(mapped)) {
      if (!warned.has(c)) {
        warned.add(c);
        console.warn(`⚠️  Unbekannter Team-Code "${code}" (aufgelöst zu "${mapped}") -- Zeilen mit diesem Code werden übersprungen.`);
      }
      return null;
    }
    return mapped;
  };
}

// ------------------------------------------------------------
// Generischer Rang-Helfer: 1 = bester Wert (per Default absteigend
// sortiert; opts.asc=true für "kleiner ist besser", z.B. DefRtg).
// ------------------------------------------------------------
function rankBy(teams, valueFn, opts = {}) {
  const asc = !!opts.asc;
  const sorted = [...teams]
    .filter(t => valueFn(t) != null)
    .sort((x, y) => asc ? valueFn(x) - valueFn(y) : valueFn(y) - valueFn(x));
  const ranks = {};
  sorted.forEach((t, i) => { ranks[t] = i + 1; });
  return ranks;
}

// Radar-Darstellungstrick: Rang 1 soll immer außen liegen, unabhängig
// davon ob "höher=besser" oder "niedriger=besser" bei der Rohmetrik gilt.
// (N+1) - Rang statt Rang direkt plotten. Funktioniert für jede Team-Anzahl.
function flipRankForRadar(rank, teamCount) {
  return rank == null ? null : (teamCount + 1) - rank;
}

module.exports = {
  httpsGetText, httpsGetJson, parseCsv, fetchCsv,
  REPO_TRICODES, ESPN_ALIAS, NON_TEAM_CODES, CONF_DIV,
  createTeamNormalizer, rankBy, flipRankForRadar,
};
