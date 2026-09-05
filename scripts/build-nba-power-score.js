#!/usr/bin/env node
// ============================================================
//  BOOTLEG POWER SCORE — NBA-Spinnennetz (6 Kategorien) für alle 30
//  echten NBA-Teams, analog zum "Bootleg Power Score"-Feature auf
//  Bear Witch Project HQ (NFL-Version). Zwei Modi pro Woche:
//  "kumulativ bis Woche X" und "nur Woche X isoliert".
//
//  Kategorien wurden NICHT geraten, sondern empirisch geprüft: Korrelation
//  von 19 Kandidaten-Metriken gegen echte Season-Siege, 150 Team-Saisons
//  (5 Saisons 2020/21–2024/25 × 30 Teams) aus echten espn_nba_team_boxscores-
//  Daten. Ergebnis (r = Korrelationskoeffizient mit Team-Saison-Siegen):
//
//    Metrik                          r
//    Net Rating (Off - Def)      +0.951   <- ausgeschlossen: reine
//                                            Linearkombination aus Off/Def
//                                            Rating unten, keine eigene
//                                            Information (genau wie beim
//                                            NFL-Radar "Wins" selbst nie
//                                            eine Achse ist)
//    Offensive Rating            +0.815   <- Kategorie 1
//    eFG%                        +0.700   (redundant mit Off Rating, siehe unten)
//    3P%                         +0.644   (redundant mit Off Rating)
//    Defensive Rating            -0.639   <- Kategorie 2
//    FG%                         +0.633   (redundant mit Off Rating)
//    Opponent eFG%               -0.624   (redundant mit Def Rating)
//    Points Scored/Game          +0.604   <- Kategorie 3
//    Assist/Turnover-Ratio       +0.581
//    Points Allowed/Game         -0.562   <- Kategorie 4
//    Turnovers/Game (eigene)     -0.502   <- Kategorie 5
//    Def. Rebounds/Game          +0.355   <- Kategorie 6
//    Free-Throw%                 +0.304
//    Assists/Game                +0.273
//    Rebounds/Game (gesamt)      +0.247
//    Steals+Blocks/Game          +0.183
//    Steals/Game                 +0.168
//    Blocks/Game                 +0.115
//    Off. Rebounds/Game          -0.069   <- praktisch bedeutungslos (!)
//    Forced Turnovers/Game       +0.059   <- praktisch bedeutungslos (!)
//
//  Zwei Learnings, die die Kategorienwahl leiten (Muster wie beim NFL-Radar):
//  1. Nicht alles mit hoher Korrelation nehmen, wenn es nur eine
//     Nachkommastelle von etwas anderem in der Liste ist -- eFG%/3P%/FG%/
//     Opponent-eFG% korrelieren stark, sind aber im Kern derselbe Fakt wie
//     Offensive/Defensive Rating (dieselbe Schuss-Effizienz, nur anders
//     ausgedrückt). Kategorien 1+2 (Off/Def Rating) decken das schon ab --
//     ein Radar mit sechsmal "wer trifft besser" wäre uninformativ.
//  2. Der naheliegende Gegenpart zu "Defensive Rebounds" -- "Offensive
//     Rebounds" -- ist mit r=-0.069 praktisch nutzlos: viele Offensive
//     Rebounds sind oft nur ein Symptom von vielen verworfenen eigenen
//     Würfen, nicht von Stärke. Und "erzwungene Ballverluste" (Steals+Blocks
//     des Gegners) sagt mit r=+0.059 so gut wie nichts über Siege aus --
//     genau wie "Passing Yards Allowed" beim NFL-Radar. Beide bewusst NICHT
//     als Kategorie übernommen, obwohl sie die "naheliegende" Wahl gewesen
//     wären.
//
//  Finale 6 Kategorien: Offensive Rating · Defensive Rating · Points Scored
//  · Points Allowed · Turnovers (eigene, niedriger=besser) · Defensive
//  Rebounds.
//
//  Datenquelle: espn_nba_team_boxscores (team_box_{season}.csv) --
//  dieselbe live-verifizierte Quelle wie build-nba-power-rankings.js
//  (siehe dort für die Historie, warum NICHT nba_stats_team_boxscores).
//  Geteilte Helfer: scripts/lib/nba-sportsdataverse.js.
//
//  Radar-Darstellungstrick: Rang 1 immer außen, Formel (N+1)-Rang statt
//  Rang direkt zu plotten (siehe flipRankForRadar in der Lib) --
//  funktioniert unabhängig davon ob "höher=besser" oder "niedriger=besser"
//  bei der Rohmetrik gilt.
//
//  Usage:
//    node scripts/build-nba-power-score.js
//    node scripts/build-nba-power-score.js --season=2027
//    node scripts/build-nba-power-score.js --anchor-date=2026-11-03 --anchor-period=34
//
//  Output: data/nba-power-score.js — NBA_POWER_SCORE
// ============================================================

const fs = require('fs');
const path = require('path');
const vm = require('vm');
const {
  fetchCsv, httpsGetJson, REPO_TRICODES, CONF_DIV,
  createTeamNormalizer, rankBy,
} = require('./lib/nba-sportsdataverse');

const ROOT = path.join(__dirname, '..');
const OUT = path.join(ROOT, 'data', 'nba-power-score.js');

const args = process.argv.slice(2);
const arg = name => {
  const a = args.find(a => a.startsWith(`--${name}=`));
  return a ? a.split('=').slice(1).join('=') : null;
};

function loadEspnConfig() {
  const code = fs.readFileSync(path.join(ROOT, 'js', 'espn-sync.js'), 'utf8');
  const sandbox = {};
  vm.createContext(sandbox);
  vm.runInContext(`${code}\nthis.__CFG__ = { ESPN_LEAGUE_ID, ESPN_SEASON };`, sandbox);
  return sandbox.__CFG__;
}

const cfg = loadEspnConfig();
const SEASON = parseInt(arg('season') || cfg.ESPN_SEASON, 10);

const CATEGORIES = [
  { key: 'ortg', label: 'Offensive Rating', asc: false },
  { key: 'drtg', label: 'Defensive Rating', asc: true },
  { key: 'ptsPg', label: 'Points Scored', asc: false },
  { key: 'oppPtsPg', label: 'Points Allowed', asc: true },
  { key: 'tovPg', label: 'Turnovers', asc: true },
  { key: 'drebPg', label: 'Def. Rebounds', asc: false },
];

// ------------------------------------------------------------
// ESPN-Liga-Matchup-Wochen (identisches Muster wie build-nba-power-rankings.js)
// ------------------------------------------------------------
function todayET() {
  const fmt = new Intl.DateTimeFormat('en-CA', {
    timeZone: 'America/New_York', year: 'numeric', month: '2-digit', day: '2-digit',
  });
  return fmt.format(new Date());
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

  const anchorDate = arg('anchor-date') || todayET();
  const anchorPeriod = parseInt(arg('anchor-period') || data.status?.latestScoringPeriod || data.status?.currentMatchupPeriod, 10);
  if (!anchorPeriod) throw new Error('Kein anchorPeriod ermittelbar -- bitte --anchor-period manuell setzen.');

  const scoringPeriodToDate = spId => addDaysToDateStr(anchorDate, spId - anchorPeriod);
  const today = todayET();

  const weeks = Object.entries(matchupPeriods)
    .map(([id, scoringPeriods]) => {
      const spList = (scoringPeriods || []).map(Number);
      return {
        matchupPeriodId: parseInt(id, 10),
        fromDate: scoringPeriodToDate(Math.min(...spList)),
        throughDate: scoringPeriodToDate(Math.max(...spList)),
      };
    })
    .filter(w => w.throughDate < today)
    .sort((a, b) => a.matchupPeriodId - b.matchupPeriodId);

  return weeks;
}

// ------------------------------------------------------------
// Team-Boxscores laden (siehe build-nba-power-rankings.js für die
// Historie der Datenquellen-Entscheidung -- identische Quelle hier).
// ------------------------------------------------------------
async function fetchTeamBoxGames() {
  const url = `https://github.com/sportsdataverse/sportsdataverse-data/releases/download/espn_nba_team_boxscores/team_box_${SEASON}.csv`;
  let rows;
  try {
    rows = await fetchCsv(url);
  } catch (e) {
    throw new Error(`team_box_${SEASON}.csv nicht ladbar (${e.message}) -- vermutlich hat die Saison noch keine gespielten Spiele.`);
  }
  if (!rows.length) throw new Error(`team_box_${SEASON}.csv ist leer.`);

  const normalizeTeam = createTeamNormalizer();

  // Für Defensive Rating brauchen wir zusätzlich die Possessions des
  // GEGNERS im selben Spiel (dieselbe Zeile hat nur die eigenen Possessions
  // + den Gegner-Score, nicht dessen volle Boxscore) -- dafür erst pro
  // Spiel (game_id) die eigenen Possessions jedes Teams sammeln, danach
  // im zweiten Durchlauf für jede Zeile die des GEGNERS nachschlagen.
  const byGame = new Map();
  for (const r of rows) {
    if (r.season_type !== '2') continue;
    const team = normalizeTeam(r.team_abbreviation);
    if (!team) continue;
    const fga = Number(r.field_goals_attempted);
    const oreb = Number(r.offensive_rebounds);
    const tov = Number(r.turnovers);
    const fta = Number(r.free_throws_attempted);
    if (![fga, oreb, tov, fta].every(Number.isFinite)) continue;
    if (!byGame.has(r.game_id)) byGame.set(r.game_id, {});
    byGame.get(r.game_id)[team] = fga - oreb + tov + 0.44 * fta;
  }
  // game_id wurde oben nicht mit durchgereicht -- daher zweiter Durchlauf
  // über `rows` statt über `games`, um pro Boxscore-Zeile das passende
  // Gegner-Team + Possessions-Paar zu bilden.
  const gamesWithOppPoss = [];
  for (const r of rows) {
    if (r.season_type !== '2') continue;
    const team = normalizeTeam(r.team_abbreviation);
    const opp = normalizeTeam(r.opponent_team_abbreviation);
    if (!team || !opp) continue;
    const fga = Number(r.field_goals_attempted);
    const oreb = Number(r.offensive_rebounds);
    const dreb = Number(r.defensive_rebounds);
    const tov = Number(r.turnovers);
    const fta = Number(r.free_throws_attempted);
    const pts = Number(r.team_score);
    const oppPts = Number(r.opponent_team_score);
    if (![fga, oreb, dreb, tov, fta, pts, oppPts].every(Number.isFinite)) continue;
    const gamePoss = byGame.get(r.game_id) || {};
    const oppPoss = gamePoss[opp];
    if (!Number.isFinite(oppPoss)) continue;
    gamesWithOppPoss.push({
      date: String(r.game_date).slice(0, 10),
      team, pts, oppPts, oreb, dreb, tov,
      poss: fga - oreb + tov + 0.44 * fta,
      oppPoss,
    });
  }
  if (!gamesWithOppPoss.length) throw new Error(`Konnte keine Gegner-Possessions zuordnen (team_box_${SEASON}.csv) -- Datenformat prüfen.`);
  return gamesWithOppPoss;
}

// ------------------------------------------------------------
// Kategorie-Werte + Ränge für ein Zeitfenster (fromDate..throughDate,
// inklusive) berechnen.
// ------------------------------------------------------------
function computeCategoryValues(games, fromDate, throughDate) {
  const agg = {};
  REPO_TRICODES.forEach(t => { agg[t] = { g: 0, pts: 0, oppPts: 0, poss: 0, oppPoss: 0, dreb: 0, tov: 0 }; });
  games.forEach(g => {
    if (g.date < fromDate || g.date > throughDate) return;
    const a = agg[g.team];
    a.g += 1;
    a.pts += g.pts; a.oppPts += g.oppPts;
    a.poss += g.poss; a.oppPoss += g.oppPoss;
    a.dreb += g.dreb; a.tov += g.tov;
  });

  const values = {};
  REPO_TRICODES.forEach(t => {
    const a = agg[t];
    if (a.g === 0) { values[t] = null; return; }
    values[t] = {
      gamesPlayed: a.g,
      ortg: a.poss > 0 ? +(100 * a.pts / a.poss).toFixed(1) : null,
      drtg: a.oppPoss > 0 ? +(100 * a.oppPts / a.oppPoss).toFixed(1) : null,
      ptsPg: +(a.pts / a.g).toFixed(1),
      oppPtsPg: +(a.oppPts / a.g).toFixed(1),
      tovPg: +(a.tov / a.g).toFixed(1),
      drebPg: +(a.dreb / a.g).toFixed(1),
    };
  });
  return values;
}

function buildTeamsPayload(values) {
  const ranks = {};
  CATEGORIES.forEach(cat => {
    ranks[cat.key] = rankBy(REPO_TRICODES, t => values[t] ? values[t][cat.key] : null, { asc: cat.asc });
  });

  return REPO_TRICODES.map(t => {
    const v = values[t];
    if (!v) return { abbr: t, conference: CONF_DIV[t][0], division: CONF_DIV[t][1], gamesPlayed: 0, values: null, rank: null };
    const rank = {};
    CATEGORIES.forEach(cat => { rank[cat.key] = ranks[cat.key][t] || null; });
    return {
      abbr: t,
      conference: CONF_DIV[t][0],
      division: CONF_DIV[t][1],
      gamesPlayed: v.gamesPlayed,
      values: {
        ortg: v.ortg, drtg: v.drtg, ptsPg: v.ptsPg, oppPtsPg: v.oppPtsPg, tovPg: v.tovPg, drebPg: v.drebPg,
      },
      rank,
    };
  });
}

// ------------------------------------------------------------
// Main
// ------------------------------------------------------------
async function main() {
  console.log(`NBA Bootleg Power Score Sync — Saison ${SEASON}, ESPN-Liga ${cfg.ESPN_LEAGUE_ID}`);

  const weekMetas = await fetchMatchupWeeks();
  if (!weekMetas.length) {
    console.log('Noch keine abgeschlossene Matchup-Woche dieser Saison -- bewusst nichts geschrieben.');
    return;
  }

  const games = await fetchTeamBoxGames();
  console.log(`${games.length} Team-Boxscore-Zeilen (Regular Season) geladen.`);

  const firstGameDate = games.reduce((min, g) => g.date < min ? g.date : min, games[0].date);
  const weeksWithData = weekMetas.filter(w => w.throughDate >= firstGameDate);
  if (!weeksWithData.length) {
    console.log('Saison hat noch nicht begonnen -- bewusst nichts geschrieben.');
    return;
  }

  const seasonStart = '0000-00-00'; // "kumulativ ab Saisonbeginn" braucht keine echte Untergrenze
  const weeks = weeksWithData.map((w, i) => {
    const prevThrough = i > 0 ? weeksWithData[i - 1].throughDate : seasonStart;
    const cumulativeValues = computeCategoryValues(games, seasonStart, w.throughDate);
    const isolatedValues = computeCategoryValues(games, addDaysToDateStr(prevThrough, prevThrough === seasonStart ? 0 : 1), w.throughDate);
    return {
      matchupPeriodId: w.matchupPeriodId,
      label: `Woche ${w.matchupPeriodId}`,
      throughDate: w.throughDate,
      cumulative: buildTeamsPayload(cumulativeValues),
      isolated: buildTeamsPayload(isolatedValues),
    };
  });

  const payload = {
    season: SEASON,
    generatedAt: new Date().toISOString(),
    categories: CATEGORIES.map(c => ({ key: c.key, label: c.label, lowerIsBetter: c.asc })),
    weeks,
  };

  const out = `// ============================================================
//  NBA BOOTLEG POWER SCORE — automatisch generiert von
//  scripts/build-nba-power-score.js. NICHT MANUELL EDITIEREN.
//
//  NBA_POWER_SCORE.weeks[i].cumulative / .isolated = je 30 Teams mit
//  Rohwerten (values) + Liga-Rang (rank) je Kategorie (siehe categories).
//  Frontend berechnet daraus den Radar-Plot-Wert per (N+1)-Rang-Trick
//  (flipRankForRadar in scripts/lib/nba-sportsdataverse.js / js/nba-power-score.js).
//  Volle Team-Namen: NBA_TEAM_NAMES (js/nba-teams.js).
// ============================================================
const NBA_POWER_SCORE = ${JSON.stringify(payload, null, 2)};
`;
  fs.writeFileSync(OUT, out);
  console.log(`Geschrieben: ${path.relative(ROOT, OUT)} (${weeks.length} Woche(n)).`);
}

main().then(() => process.exit(0)).catch(err => {
  console.error('❌ NBA Bootleg Power Score Sync fehlgeschlagen:', err.message);
  process.exit(1);
});
