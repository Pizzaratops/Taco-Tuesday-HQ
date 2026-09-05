#!/usr/bin/env node
// ============================================================
//  NBA POWER RANKINGS — wöchentliches Rolling Ranking aller 30
//  echten NBA-Teams (Win-Loss + Offense-/Defense-Rating), analog
//  zum "NFL Power Rankings"-Feature auf Bear Witch Project HQ.
//
//  WICHTIG — Datenquelle bewusst NICHT site.api.espn.com für die
//  ligaweiten Team-Daten: dieser öffentliche ESPN-Sport-API-
//  Endpoint blockt zuverlässig Anfragen aus GitHub Actions (HTTP
//  403, IP-Sperre gegen Cloud-CI — getestet mit Browser-Headern
//  UND CORS-Proxy-Fallback, beides gescheitert). Stattdessen:
//  sportsdataverse-data (GitHub-gehostet, gleiche Analytics-
//  Community wie nflverse) — läuft über normalen GitHub-Traffic,
//  kein Cross-Cloud-IP-Block. CSV-Variante statt Parquet: kein
//  externes Parse-Package nötig (wie beim NFL-Sync-Script).
//
//  Die private ESPN-Fantasy-Liga-API (lm-api-reads.fantasy.espn.com,
//  siehe js/espn-sync.js / scripts/sync-espn-rosters.js) ist NICHT
//  betroffen -- die nutzen wir hier weiterhin, aber NUR um die
//  Matchup-Wochen-Grenzen dieser Liga zu lesen (view=mSettings),
//  nicht für NBA-Team-Daten.
//
//  Wochen-Definition: exakt die Matchup-Perioden dieser ESPN-Liga
//  (scheduleSettings.matchupPeriods), NICHT ISO-Kalenderwochen --
//  damit die Power-Rankings-Wochen 1:1 mit den Fantasy-Wochen der
//  Liga übereinstimmen. Jede Woche = kumulativer Stand aller
//  Spiele bis einschließlich des letzten Spieltags dieser Woche
//  (kein "nur aktuelle Woche"-Ansatz -- bei jedem Lauf werden alle
//  bisher abgeschlossenen Wochen komplett neu durchgerechnet).
//
//  Usage:
//    node scripts/build-nba-power-rankings.js
//    node scripts/build-nba-power-rankings.js --season=2027
//    node scripts/build-nba-power-rankings.js --anchor-date=2026-11-03 --anchor-period=34
//        (manueller Override falls der Auto-Anchor unten mal daneben liegt)
//
//  Output: data/nba-power-rankings.js — NBA_POWER_RANKINGS
//  (von js/nba-power-rankings.js gerendert; NBA_TEAM_NAMES für die
//  vollen Team-Namen kommt bereits aus js/nba-teams.js, wird hier
//  nicht dupliziert).
// ============================================================

const fs = require('fs');
const path = require('path');
const vm = require('vm');
const https = require('https');

const ROOT = path.join(__dirname, '..');
const OUT = path.join(ROOT, 'data', 'nba-power-rankings.js');

const args = process.argv.slice(2);
const arg = name => {
  const a = args.find(a => a.startsWith(`--${name}=`));
  return a ? a.split('=').slice(1).join('=') : null;
};

// ------------------------------------------------------------
// 0) Konfiguration
// ------------------------------------------------------------
function loadEspnConfig() {
  const code = fs.readFileSync(path.join(ROOT, 'js', 'espn-sync.js'), 'utf8');
  const sandbox = {};
  vm.createContext(sandbox);
  vm.runInContext(`${code}\nthis.__CFG__ = { ESPN_LEAGUE_ID, ESPN_SEASON };`, sandbox);
  return sandbox.__CFG__;
}

const cfg = loadEspnConfig();
const SEASON = parseInt(arg('season') || cfg.ESPN_SEASON, 10); // Ende-Jahr der Saison, z.B. 2027 = Saison 2026/27

// ------------------------------------------------------------
// 1) HTTP-Helfer (kein npm-Package -- gleiches Muster wie
//    scripts/sync-espn-rosters.js: folgt Redirects rekursiv,
//    einmal für JSON, einmal für rohen Text/CSV).
// ------------------------------------------------------------
function httpsGet(url) {
  return new Promise((resolve, reject) => {
    https.get(url, {
      headers: { 'User-Agent': 'taco-tuesday-hq-bot', 'Accept': '*/*' },
    }, res => {
      if (res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
        res.resume();
        return httpsGet(res.headers.location).then(resolve, reject);
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
  const text = await httpsGet(url);
  try { return JSON.parse(text); }
  catch (e) { throw new Error(`Keine gültige JSON-Antwort von ${url}: ${e.message}`); }
}

// Simpler RFC4180-CSV-Parser (Anführungszeichen mit eingebetteten
// Kommas/Zeilenumbrüchen/escaped-Quotes "" -- reicht für die hier
// verwendeten sportsdataverse-Dateien, kein npm-Package nötig).
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
  const text = await httpsGet(url);
  return parseCsv(text);
}

// ------------------------------------------------------------
// 2) Team-Codes normalisieren
// ------------------------------------------------------------
// Ziel-Standard: dieselben Tricodes, die diese Repo bereits in
// NBA_TEAM_NAMES (js/nba-teams.js) verwendet -- u.a. "PHO" statt
// "PHX" für Phoenix, "NOP" für New Orleans. Andere Repo-Datei
// bewusst nicht dupliziert, nur die Codes hier hart hinterlegt
// (ändert sich nie unabhängig von NBA_TEAM_NAMES).
const REPO_TRICODES = [
  'ATL','BOS','BKN','CHA','CHI','CLE','DAL','DEN','DET','GSW','HOU','IND',
  'LAC','LAL','MEM','MIA','MIL','MIN','NOP','NYK','OKC','ORL','PHI','PHO',
  'POR','SAC','SAS','TOR','UTA','WAS',
];

// sportsdataverse-Schedule-Datei (espn_nba_schedules) nutzt ESPNs
// eigene, abweichende Kürzel -- live gegen die 2024-25-Saison
// verifiziert.
const SCHEDULE_ALIAS = {
  GS: 'GSW', NO: 'NOP', NY: 'NYK', SA: 'SAS', UTAH: 'UTA', WSH: 'WAS', PHX: 'PHO',
};
// sportsdataverse-Boxscore-Datei (jetzt: espn_nba_team_boxscores, siehe
// fetchTeamBoxscores) nutzt dieselben ESPN-Kürzel wie die Schedule-Datei --
// gleiche Alias-Tabelle wiederverwenden statt einer zweiten, separat
// gepflegten Liste.
const BOXSCORE_ALIAS = SCHEDULE_ALIAS;

// KORREKTUR (2026-09-05, live gegen echte Daten gefunden): Die ursprüngliche
// Bedingung "&& !unmappedWarned.has(c)" hat nicht nur die WIEDERHOLTE Warnung
// unterdrückt, sondern beim zweiten Auftreten desselben unbekannten Codes
// (z.B. All-Star-Teams "WORLD"/"STARS"/"STRIPES", die mehrfach im Boxscore-
// Datensatz vorkommen) auch das "return null" übersprungen -- der Code wurde
// dann fälschlich als gültiges Team durchgereicht und hat später beim
// agg[team]-Lookup (nur für REPO_TRICODES initialisiert) einen Crash
// ausgelöst. Warnung und Verwerfen jetzt entkoppelt: verwerfen IMMER, nur
// die Konsolen-Meldung selbst höchstens einmal pro Code.
const unmappedWarned = new Set();
function normalizeTeam(code, alias) {
  const c = (code || '').trim().toUpperCase();
  const mapped = alias[c] || c;
  if (!REPO_TRICODES.includes(mapped)) {
    if (!unmappedWarned.has(c)) {
      unmappedWarned.add(c);
      console.warn(`⚠️  Unbekannter Team-Code "${code}" (aufgelöst zu "${mapped}") -- Zeilen mit diesem Code werden übersprungen. Bitte SCHEDULE_ALIAS/BOXSCORE_ALIAS in scripts/build-nba-power-rankings.js prüfen.`);
    }
    return null;
  }
  return mapped;
}

// ------------------------------------------------------------
// 3) Conference/Division (seit Jahren stabil, hart hinterlegt)
// ------------------------------------------------------------
const CONF_DIV = {
  BOS:['East','Atlantic'], BKN:['East','Atlantic'], NYK:['East','Atlantic'], PHI:['East','Atlantic'], TOR:['East','Atlantic'],
  CHI:['East','Central'], CLE:['East','Central'], DET:['East','Central'], IND:['East','Central'], MIL:['East','Central'],
  ATL:['East','Southeast'], CHA:['East','Southeast'], MIA:['East','Southeast'], ORL:['East','Southeast'], WAS:['East','Southeast'],
  DEN:['West','Northwest'], MIN:['West','Northwest'], OKC:['West','Northwest'], POR:['West','Northwest'], UTA:['West','Northwest'],
  GSW:['West','Pacific'], LAC:['West','Pacific'], LAL:['West','Pacific'], PHO:['West','Pacific'], SAC:['West','Pacific'],
  DAL:['West','Southwest'], HOU:['West','Southwest'], MEM:['West','Southwest'], NOP:['West','Southwest'], SAS:['West','Southwest'],
};

// ------------------------------------------------------------
// 4) ESPN-Liga-Matchup-Wochen lesen (nur Struktur, keine NBA-
//    Team-Daten -- deshalb lm-api-reads, nicht site.api.espn.com)
// ------------------------------------------------------------
function todayET() {
  const fmt = new Intl.DateTimeFormat('en-CA', {
    timeZone: 'America/New_York', year: 'numeric', month: '2-digit', day: '2-digit',
  });
  return fmt.format(new Date()); // YYYY-MM-DD
}

function addDaysToDateStr(dateStr, days) {
  const [y, m, d] = dateStr.split('-').map(Number);
  const dt = new Date(Date.UTC(y, m - 1, d));
  dt.setUTCDate(dt.getUTCDate() + days);
  return dt.toISOString().slice(0, 10);
}

async function fetchMatchupWeeks() {
  const url = `https://lm-api-reads.fantasy.espn.com/apis/v3/games/fba/seasons/${cfg.ESPN_SEASON}/segments/0/leagues/${cfg.ESPN_LEAGUE_ID}?view=mSettings&view=mStatus`;
  const data = await httpsGetJson(url);
  const matchupPeriods = data.settings?.scheduleSettings?.matchupPeriods || {};
  if (!Object.keys(matchupPeriods).length) {
    throw new Error('Keine scheduleSettings.matchupPeriods in der ESPN-Antwort -- Liga-ID/Saison prüfen.');
  }

  // Anker: welches scoringPeriodId entspricht welchem Kalendertag?
  // NBA-Fantasy zählt scoringPeriodId als fortlaufenden Spieltag der
  // Saison (jeder Kalendertag = 1 Periode, anders als NFL-Wochen).
  // ESPN liefert dafür kein direktes Kalenderdatum -- als Anker nutzen
  // wir status.latestScoringPeriod (die zuletzt abgerechnete Periode)
  // zusammen mit dem heutigen ET-Datum. Falls das mal einen Tag daneben
  // liegt (z.B. kurz nach Mitternacht ET, bevor ESPN die Periode
  // hochzählt), per --anchor-date/--anchor-period manuell übersteuern.
  const anchorDate = arg('anchor-date') || todayET();
  const anchorPeriod = parseInt(arg('anchor-period') || data.status?.latestScoringPeriod || data.status?.currentMatchupPeriod, 10);
  if (!anchorPeriod) throw new Error('Kein anchorPeriod ermittelbar (status.latestScoringPeriod fehlt) -- bitte --anchor-period manuell setzen.');

  const scoringPeriodToDate = spId => addDaysToDateStr(anchorDate, spId - anchorPeriod);
  const today = todayET();

  const weeks = Object.entries(matchupPeriods)
    .map(([id, scoringPeriods]) => {
      const spList = (scoringPeriods || []).map(Number);
      const lastSp = Math.max(...spList);
      return { matchupPeriodId: parseInt(id, 10), throughDate: scoringPeriodToDate(lastSp) };
    })
    .filter(w => w.throughDate < today) // nur vollständig abgeschlossene Wochen
    .sort((a, b) => a.matchupPeriodId - b.matchupPeriodId);

  return weeks;
}

// ------------------------------------------------------------
// 5) NBA-Spielplan (Win-Loss) + Team-Boxscores (Off/Def) laden
// ------------------------------------------------------------
async function fetchScheduleGames() {
  const url = `https://github.com/sportsdataverse/sportsdataverse-data/releases/download/espn_nba_schedules/nba_schedule_${SEASON}.csv`;
  const rows = await fetchCsv(url);
  const games = [];
  for (const r of rows) {
    if (r.season_type !== '2' || r.type_abbreviation !== 'STD') continue; // nur echte Regular-Season (kein All-Star/NBA-Cup)
    const home = normalizeTeam(r.home_abbreviation, SCHEDULE_ALIAS);
    const away = normalizeTeam(r.away_abbreviation, SCHEDULE_ALIAS);
    const homeScore = Number(r.home_score);
    const awayScore = Number(r.away_score);
    if (!home || !away || !r.date || !Number.isFinite(homeScore) || !Number.isFinite(awayScore)) continue;
    if (homeScore === 0 && awayScore === 0) continue; // noch nicht gespielt
    games.push({ date: r.date.slice(0, 10), home, away, homeScore, awayScore });
  }
  if (!games.length) throw new Error(`Keine gültigen Regular-Season-Spiele in nba_schedule_${SEASON}.csv gefunden -- Saison-Parameter/Datei prüfen.`);
  return games;
}

// KORREKTUR (2026-09-05, live gegen echte Daten verifiziert): Die
// ursprünglich vorgesehene Quelle "nba_stats_team_boxscores" (stats.nba.com-
// Format, game_id z.B. "0022500001") hat GAR KEINE Datumsspalte -- und ihre
// game_id passt nicht zum game_id-Format von "espn_nba_schedules" (ESPN-
// Event-IDs wie "401910945"), ein Join über game_id wäre also so oder so
// nicht möglich gewesen. Stattdessen: "espn_nba_team_boxscores" (Release-Tag)
// / Datei "team_box_{season}.csv" -- selbe ESPN-Event-IDs wie die Schedule-
// Datei, hat `game_date` direkt eingebaut, UND liefert pro Zeile bereits
// `opponent_team_abbreviation` + `opponent_team_score` mit (spart den
// früheren Zwei-Zeilen-Merge für die reine Punktzahl -- für die vollen
// Gegner-Boxscore-Stats, die für dessen EIGENE Possessions nötig sind,
// wird trotzdem pro Spiel die Zeile des Gegner-Teams dazugezogen).
async function fetchTeamBoxscores() {
  const url = `https://github.com/sportsdataverse/sportsdataverse-data/releases/download/espn_nba_team_boxscores/team_box_${SEASON}.csv`;
  let rows;
  try {
    rows = await fetchCsv(url);
  } catch (e) {
    throw new Error(`team_box_${SEASON}.csv nicht ladbar (${e.message}) -- vermutlich hat die Saison noch keine gespielten Spiele.`);
  }
  if (!rows.length) throw new Error(`team_box_${SEASON}.csv ist leer -- Saison-Parameter/Datei prüfen.`);

  // Pro Spiel (game_id) beide Team-Zeilen sammeln, um für JEDES Team die
  // vollen Boxscore-Werte des Gegners (für dessen eigene Possessions in
  // genau diesem Spiel) zur Hand zu haben.
  const byGame = new Map();
  for (const r of rows) {
    if (r.season_type !== '2') continue; // nur echte Regular-Season (kein Preseason/Playoffs/All-Star)
    const team = normalizeTeam(r.team_abbreviation, BOXSCORE_ALIAS);
    if (!team) continue;
    const fga = Number(r.field_goals_attempted);
    const oreb = Number(r.offensive_rebounds);
    const tov = Number(r.turnovers);
    const fta = Number(r.free_throws_attempted);
    const pts = Number(r.team_score);
    if (![fga, oreb, tov, fta, pts].every(Number.isFinite)) continue;
    const gid = r.game_id;
    if (!byGame.has(gid)) byGame.set(gid, { date: String(r.game_date).slice(0, 10), teams: [] });
    byGame.get(gid).teams.push({ team, pts, poss: fga - oreb + tov + 0.44 * fta });
  }

  // Nur Spiele mit genau 2 vollständigen Team-Zeilen behalten (beide Seiten
  // gültig geparst), Gegner-Zuordnung direkt daraus auflösen.
  const games = [];
  for (const { date, teams } of byGame.values()) {
    if (teams.length !== 2) continue;
    const [a, b] = teams;
    games.push({ date, team: a.team, pts: a.pts, poss: a.poss, oppPts: b.pts, oppPoss: b.poss });
    games.push({ date, team: b.team, pts: b.pts, poss: b.poss, oppPts: a.pts, oppPoss: a.poss });
  }
  if (!games.length) throw new Error(`Keine vollständigen Regular-Season-Boxscores in team_box_${SEASON}.csv gefunden.`);
  return games;
}

// ------------------------------------------------------------
// 6) Kumulative Standings + Off/Def-Ratings pro Woche berechnen
// ------------------------------------------------------------
function computeStandingsThrough(scheduleGames, throughDate) {
  const rec = {}; // team -> {wins, losses}
  REPO_TRICODES.forEach(t => { rec[t] = { wins: 0, losses: 0 }; });
  scheduleGames.forEach(g => {
    if (g.date > throughDate) return;
    if (g.homeScore > g.awayScore) { rec[g.home].wins++; rec[g.away].losses++; }
    else { rec[g.away].wins++; rec[g.home].losses++; }
  });
  return rec;
}

function computeOffDefThrough(boxGames, throughDate) {
  const agg = {}; // team -> {pts, poss, oppPts, oppPoss}
  REPO_TRICODES.forEach(t => { agg[t] = { pts: 0, poss: 0, oppPts: 0, oppPoss: 0 }; });
  boxGames.forEach(g => {
    if (g.date > throughDate) return;
    const a = agg[g.team];
    a.pts += g.pts; a.poss += g.poss; a.oppPts += g.oppPts; a.oppPoss += g.oppPoss;
  });
  const out = {};
  REPO_TRICODES.forEach(t => {
    const a = agg[t];
    out[t] = {
      off: a.poss > 0 ? (100 * a.pts / a.poss) : null,
      def: a.oppPoss > 0 ? (100 * a.oppPts / a.oppPoss) : null,
    };
  });
  return out;
}

function rankBy(teams, valueFn, opts = {}) {
  const asc = !!opts.asc; // asc=true: kleinerer Wert = besserer Rang (z.B. DefRtg)
  const sorted = [...teams].filter(t => valueFn(t) != null).sort((x, y) => asc ? valueFn(x) - valueFn(y) : valueFn(y) - valueFn(x));
  const ranks = {};
  sorted.forEach((t, i) => { ranks[t] = i + 1; });
  return ranks;
}

function buildWeekPayload(weekMeta, scheduleGames, boxGames) {
  const standings = computeStandingsThrough(scheduleGames, weekMeta.throughDate);
  const offDef = computeOffDefThrough(boxGames, weekMeta.throughDate);

  const leagueRank = rankBy(REPO_TRICODES, t => {
    const r = standings[t]; const gp = r.wins + r.losses;
    return gp > 0 ? r.wins / gp : null;
  });
  const offRank = rankBy(REPO_TRICODES, t => offDef[t].off);
  const defRank = rankBy(REPO_TRICODES, t => offDef[t].def, { asc: true });

  const confRank = {}, divRank = {};
  ['East', 'West'].forEach(conf => {
    const teams = REPO_TRICODES.filter(t => CONF_DIV[t][0] === conf);
    Object.assign(confRank, rankBy(teams, t => { const r = standings[t]; const gp = r.wins + r.losses; return gp > 0 ? r.wins / gp : null; }));
  });
  const divisions = [...new Set(REPO_TRICODES.map(t => CONF_DIV[t][1]))];
  divisions.forEach(div => {
    const teams = REPO_TRICODES.filter(t => CONF_DIV[t][1] === div);
    Object.assign(divRank, rankBy(teams, t => { const r = standings[t]; const gp = r.wins + r.losses; return gp > 0 ? r.wins / gp : null; }));
  });

  const teams = REPO_TRICODES.map(t => {
    const r = standings[t];
    const gp = r.wins + r.losses;
    const off = offDef[t].off, def = offDef[t].def;
    return {
      abbr: t,
      conference: CONF_DIV[t][0],
      division: CONF_DIV[t][1],
      wins: r.wins,
      losses: r.losses,
      winPct: gp > 0 ? +(r.wins / gp).toFixed(3) : 0,
      off: off != null ? +off.toFixed(1) : null,
      def: def != null ? +def.toFixed(1) : null,
      net: (off != null && def != null) ? +(off - def).toFixed(1) : null,
      rank: {
        league: leagueRank[t] || null,
        conference: confRank[t] || null,
        division: divRank[t] || null,
        off: offRank[t] || null,
        def: defRank[t] || null,
      },
    };
  });

  return {
    matchupPeriodId: weekMeta.matchupPeriodId,
    label: `Woche ${weekMeta.matchupPeriodId}`,
    throughDate: weekMeta.throughDate,
    teams,
  };
}

// ------------------------------------------------------------
// 7) Main
// ------------------------------------------------------------
async function main() {
  console.log(`NBA Power Rankings Sync — Saison ${SEASON}, ESPN-Liga ${cfg.ESPN_LEAGUE_ID}`);

  const weekMetas = await fetchMatchupWeeks();
  if (!weekMetas.length) {
    console.log('Noch keine abgeschlossene Matchup-Woche dieser Saison -- bewusst nichts geschrieben (Empty State auf der Seite).');
    return;
  }
  console.log(`${weekMetas.length} abgeschlossene Matchup-Woche(n) gefunden (bis ${weekMetas[weekMetas.length - 1].throughDate}).`);

  // Schedule zuerst laden (existiert schon vor Saisonstart) und prüfen, ob
  // überhaupt schon gespielte Spiele vorliegen -- ERST DANACH die
  // Boxscore-Datei anfragen. Die (team_box_{season}.csv) wird von der
  // sportsdataverse-Pipeline nämlich erst nach dem ersten echten Spieltag
  // der Saison überhaupt angelegt (404 davor) -- ein blinder Parallel-Fetch
  // würde die ganze Saison-noch-nicht-gestartet-Erkennung crashen lassen,
  // statt sauber den Empty State zu schreiben.
  const scheduleGames = await fetchScheduleGames();
  console.log(`${scheduleGames.length} Regular-Season-Spiele (Schedule) geladen.`);

  // Nur Wochen behalten, für die tatsächlich schon (mindestens ein
  // paar) Spiele vorliegen -- vor Saisonstart bewusst nichts schreiben.
  const firstGameDate = scheduleGames.reduce((min, g) => g.date < min ? g.date : min, scheduleGames[0].date);
  const weeksWithData = weekMetas.filter(w => w.throughDate >= firstGameDate);
  if (!weeksWithData.length) {
    console.log('Saison hat laut Schedule-Datei noch nicht begonnen -- bewusst nichts geschrieben.');
    return;
  }

  const boxGames = await fetchTeamBoxscores();
  console.log(`${boxGames.length / 2} Boxscore-Spiele geladen.`);

  const weeks = weeksWithData.map(w => buildWeekPayload(w, scheduleGames, boxGames));

  const payload = {
    season: SEASON,
    generatedAt: new Date().toISOString(),
    weeks,
  };

  const out = `// ============================================================
//  NBA POWER RANKINGS — automatisch generiert von
//  scripts/build-nba-power-rankings.js. NICHT MANUELL EDITIEREN.
//
//  NBA_POWER_RANKINGS.weeks[i] = kumulativer Stand aller 30 Teams
//  bis einschließlich der jeweiligen ESPN-Liga-Matchup-Woche
//  (throughDate = letzter Spieltag dieser Woche).
//  Volle Team-Namen: NBA_TEAM_NAMES (js/nba-teams.js).
// ============================================================
const NBA_POWER_RANKINGS = ${JSON.stringify(payload, null, 2)};
`;
  fs.writeFileSync(OUT, out);
  console.log(`Geschrieben: ${path.relative(ROOT, OUT)} (${weeks.length} Woche(n)).`);
}

main().then(() => process.exit(0)).catch(err => {
  console.error('❌ NBA Power Rankings Sync fehlgeschlagen:', err.message);
  process.exit(1);
});
