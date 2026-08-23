#!/usr/bin/env node
// ============================================================
//  Daily 9cat Z-Score Ranking (Basketball-Monster-Style)
//  Reine Logik, Konsolen-Output + CSV-Export. Node 18+ (natives fetch).
//
//  Usage:
//    node daily-9cat.js               → heutiges Datum
//    node daily-9cat.js 2026-04-12    → bestimmtes Datum
//    node daily-9cat.js 2026-04-12 -v → verbose (alle Kategorien + Z-Scores)
//    node daily-9cat.js --league=nba  → reguläre Saison statt Summer League
//
//  Speichert zusätzlich eine CSV im selben Ordner wie das Script:
//    daily-9cat_<liga>_<datum>.csv
// ============================================================

const fs = require('fs');
const path = require('path');

const args = process.argv.slice(2);
const verbose = args.includes('-v') || args.includes('--verbose');
const dateArg = args.find(a => /^\d{4}-\d{2}-\d{2}$/.test(a));

// ESPN führt Summer League unter eigenen League-Slugs, getrennt von der reguären
// Saison ('nba'). Verifizierte Slugs (Stand Juli 2026, via ESPN-Boxscore-URLs):
//   nba-summer-california   -> California Classic (San Francisco/Sacramento, 3.–6. Juli)
//   nba-summer-utah         -> Salt Lake City Summer League (4.–7. Juli)
//   nba-summer-las-vegas    -> NBA Summer League Las Vegas (Hauptevent, 9.–19. Juli)
//   nba-preseason           -> NBA Pre-Season (Termine variieren jährlich, manuell per --league setzen)
//
// WICHTIG (23.08.2026): Der Default war bis hierhin 'nba-summer-las-vegas'
// fest einprogrammiert. Die Summer League endete am 19. Juli — seitdem lief
// jeder automatische (nicht manuell mit --league gestartete) Lauf gegen einen
// leeren Spielplan ("keine Spiele"-Abbruch), zeigte aber trotzdem grün. Ohne
// Default-Wechsel hätte das unbemerkt bis in die echte Saison hinein so
// weitergelaufen. Default ist deshalb jetzt 'nba' (reguläre Saison) — läuft
// bis Saisonstart weiterhin harmlos leer, greift aber automatisch, sobald
// echte Spiele kommen. Für die Pre-Season-Phase davor (Termine variieren
// jährlich, hier nicht hart codiert) --league=nba-preseason manuell per
// workflow_dispatch-Eingabe setzen, bis die reguläre Saison beginnt.
const leagueArg = args.find(a => a.startsWith('--league='));
const LEAGUE = leagueArg ? leagueArg.split('=')[1] : 'nba';

// Wo CSV + Meta-JSON landen. Default: scripts/data/ (das ist der Ordner, den
// aggregate-9cat.js und convert-to-livescores.js ebenfalls per Default lesen,
// und der von der GitHub Action committet wird — so bleibt die Tages-Historie
// im Repo erhalten, die aggregate-9cat.js später für Weekly/Monthly braucht).
const dirArg = args.find(a => a.startsWith('--dir='));
const OUT_DIR = dirArg ? dirArg.split('=')[1] : path.join(__dirname, 'data');
if (!fs.existsSync(OUT_DIR)) fs.mkdirSync(OUT_DIR, { recursive: true });

function todayYYYYMMDD() {
  // WICHTIG: Nicht das UTC-Kalenderdatum nehmen. ESPN datiert NBA-Spiele
  // (Preseason wie reguläre Saison) nach US-Ostküstenzeit, und unsere
  // GitHub-Action-Läufe passieren früh morgens UTC (z.B. 04:07/06:07 UTC) —
  // das ist in Eastern Time noch der VORABEND. Mit UTC-Kalenderdatum würde
  // deshalb systematisch "morgen" abgefragt, Spiele die in Eastern Time
  // noch gar nicht stattgefunden haben.
  const fmt = new Intl.DateTimeFormat('en-CA', {
    timeZone: 'America/New_York',
    year: 'numeric', month: '2-digit', day: '2-digit',
  });
  return fmt.format(new Date()); // en-CA liefert direkt YYYY-MM-DD
}

function toEspnDate(dateStr) {
  // "2026-04-12" -> "20260412"
  return dateStr.replaceAll('-', '');
}

const dateStr = dateArg || todayYYYYMMDD();
const espnDate = toEspnDate(dateStr);

const SCOREBOARD_URL = `https://site.api.espn.com/apis/site/v2/sports/basketball/${LEAGUE}/scoreboard?dates=${espnDate}`;
const SUMMARY_URL = eventId => `https://site.api.espn.com/apis/site/v2/sports/basketball/${LEAGUE}/summary?event=${eventId}`;

// 9cat Kategorien, in der Reihenfolge wie sie im Composite gewichtet werden.
// 'invert: true' bedeutet: niedriger ist besser (Turnovers).
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
// 1) Spiele des Tages holen
// ------------------------------------------------------------
// Liefert ALLE Spiele des Tages, abgeschlossen UND noch ausstehend (nicht nur
// abgeschlossene wie ursprünglich) -- die 9cat-Z-Score-Baseline unten
// (allPlayers/computeZScores) nutzt weiterhin ausschließlich abgeschlossene
// Spiele, aber die Box-Scores-Ansicht soll schon vor Tip-off zeigen, wer
// gegen wen spielt und wann, statt "keine Daten" (23.08.2026, auf Wunsch:
// ESPN zeigt den Spielplan ja auch schon vorher an).
async function fetchGames(dateStr) {
  const res = await fetch(SCOREBOARD_URL);
  if (!res.ok) throw new Error(`Scoreboard fetch fehlgeschlagen: HTTP ${res.status}`);
  const data = await res.json();
  const events = data.events || [];
  return events.map(e => {
    const competitors = e.competitions?.[0]?.competitors || [];
    const home = competitors.find(c => c.homeAway === 'home');
    const away = competitors.find(c => c.homeAway === 'away');
    const completed = !!e.status?.type?.completed;
    // Bei noch nicht gestarteten Spielen liefert shortDetail die Tip-off-Zeit
    // (z.B. "7:00 PM ET"), bei laufenden/abgeschlossenen Spielen den Status.
    const statusText = e.status?.type?.shortDetail || e.status?.type?.description || (completed ? 'Final' : '');
    const teamLabel = c => c?.team?.displayName || c?.team?.name || c?.team?.shortDisplayName || c?.team?.abbreviation || '???';
    // Für die Games-Zeile in der UI: bei abgeschlossenen Spielen mit Endstand
    // ("Memphis Grizzlies 84 @ Portland Trail Blazers 91 (Final)"), bei noch
    // nicht gestarteten ohne Punktestand, dafür mit Tip-off-Zeit.
    const line = (home && away)
      ? (completed
          ? `${teamLabel(away)} ${away.score ?? '?'} @ ${teamLabel(home)} ${home.score ?? '?'} (${statusText})`
          : `${teamLabel(away)} @ ${teamLabel(home)} (${statusText})`)
      : (e.shortName || e.name);
    // Strukturierte Home/Away-Infos für die Box-Scores-Ansicht (Team-Zuordnung
    // der Spieler-Boxscore-Zeilen zu den beiden Teams dieses Spiels). Die
    // Abkürzung hier kommt aus der Scoreboard-API — dieselbe Quelle, die
    // fetchGamePlayers() für die Boxscore-API benutzt, daher konsistent.
    const teamInfo = c => c ? {
      abbr: c.team?.abbreviation || '???',
      name: teamLabel(c),
      score: completed ? (Number(c.score) || 0) : null,
    } : null;
    return {
      id: e.id, name: e.shortName || e.name, line,
      completed, statusText,
      home: teamInfo(home), away: teamInfo(away),
    };
  });
}

// ------------------------------------------------------------
// 2) Boxscore eines Spiels parsen
// ------------------------------------------------------------
function parseMadeAttempt(str) {
  // "8-15" -> { made: 8, att: 15 }
  if (!str || typeof str !== 'string' || !str.includes('-')) return { made: 0, att: 0 };
  const [made, att] = str.split('-').map(Number);
  return { made: made || 0, att: att || 0 };
}

function parseMinutes(str) {
  const n = parseInt(str, 10);
  return Number.isFinite(n) ? n : 0;
}

// ESPN benutzt in Scoreboard- und Boxscore/Summary-API teils unterschiedliche
// Team-Kurzcodes für dasselbe Team (siehe identische Beobachtung/Map in
// js/livescores.js: GS/GSW, NO/NOR, NY/NYK, PHX/PHO, SA/SAS, UTAH/UTA,
// WSH/WAS). fetchGames() liest den Scoreboard-Code, fetchGamePlayers() den
// Boxscore-Code — beide müssen auf denselben kanonischen Code normalisiert
// werden, damit die Box-Scores-Zuordnung Spieler->Team nicht leer ausgeht.
const TEAM_ABBR_CANON = {
  GSW: 'GS', NOR: 'NO', NYK: 'NY', PHO: 'PHX', SAS: 'SA', UTA: 'UTAH', WAS: 'WSH',
};
function canonAbbr(a) {
  return TEAM_ABBR_CANON[a] || a;
}

async function fetchGamePlayers(gameId) {
  const res = await fetch(SUMMARY_URL(gameId));
  if (!res.ok) {
    console.warn(`  ! Boxscore fehlgeschlagen für Spiel ${gameId}: HTTP ${res.status}`);
    return [];
  }
  const data = await res.json();
  const teams = data.boxscore?.players || [];
  const players = [];

  for (const team of teams) {
    const teamAbbr = team.team?.abbreviation || '???';
    for (const statGroup of team.statistics || []) {
      const labels = statGroup.labels || statGroup.names || [];
      const idx = name => labels.indexOf(name);

      const iMin = idx('MIN');
      const iFG = idx('FG');
      const i3PT = idx('3PT');
      const iFT = idx('FT');
      const iREB = idx('REB');
      const iAST = idx('AST');
      const iSTL = idx('STL');
      const iBLK = idx('BLK');
      const iTO = idx('TO');
      const iPTS = idx('PTS');

      for (const athlete of statGroup.athletes || []) {
        const stats = athlete.stats || [];
        if (!stats.length || stats[0] === 'DNP' || stats.join('') === '') continue;

        const min = parseMinutes(stats[iMin]);
        if (!min) continue; // DNP / 0 Minuten raus

        const fg = parseMadeAttempt(stats[iFG]);
        const tpt = parseMadeAttempt(stats[i3PT]);
        const ft = parseMadeAttempt(stats[iFT]);

        players.push({
          name: athlete.athlete?.displayName || 'Unknown',
          team: teamAbbr,
          min,
          pts: Number(stats[iPTS]) || 0,
          reb: Number(stats[iREB]) || 0,
          ast: Number(stats[iAST]) || 0,
          stl: Number(stats[iSTL]) || 0,
          blk: Number(stats[iBLK]) || 0,
          to: Number(stats[iTO]) || 0,
          tpm: tpt.made,
          fgm: fg.made,
          fga: fg.att,
          ftm: ft.made,
          fta: ft.att,
        });
      }
    }
  }
  return players;
}

// ------------------------------------------------------------
// 3) FG%/FT% Impact (Volumen-gewichtet ggü. Liga-Durchschnitt des Tages)
// ------------------------------------------------------------
function attachImpactStats(players) {
  const totalFGM = players.reduce((s, p) => s + p.fgm, 0);
  const totalFGA = players.reduce((s, p) => s + p.fga, 0);
  const totalFTM = players.reduce((s, p) => s + p.ftm, 0);
  const totalFTA = players.reduce((s, p) => s + p.fta, 0);

  const leagueFGpct = totalFGA > 0 ? totalFGM / totalFGA : 0;
  const leagueFTpct = totalFTA > 0 ? totalFTM / totalFTA : 0;

  for (const p of players) {
    const playerFGpct = p.fga > 0 ? p.fgm / p.fga : 0;
    const playerFTpct = p.fta > 0 ? p.ftm / p.fta : 0;
    p.fgImpact = p.fga > 0 ? (playerFGpct - leagueFGpct) * p.fga : 0;
    p.ftImpact = p.fta > 0 ? (playerFTpct - leagueFTpct) * p.fta : 0;
  }

  return { leagueFGpct, leagueFTpct };
}

// ------------------------------------------------------------
// 4) Z-Scores über den Tages-Pool
// ------------------------------------------------------------
function mean(arr) {
  return arr.reduce((s, v) => s + v, 0) / arr.length;
}
function stdDev(arr, m) {
  const variance = arr.reduce((s, v) => s + (v - m) ** 2, 0) / arr.length;
  return Math.sqrt(variance);
}

function computeZScores(players) {
  const stats = {};
  for (const cat of CATEGORIES) {
    const values = players.map(p => p[cat.key]);
    const m = mean(values);
    const sd = stdDev(values, m);
    stats[cat.key] = { mean: m, sd };
  }

  for (const p of players) {
    let composite = 0;
    p.zScores = {};
    for (const cat of CATEGORIES) {
      const { mean: m, sd } = stats[cat.key];
      let z = sd > 0 ? (p[cat.key] - m) / sd : 0;
      if (cat.invert) z = -z;
      p.zScores[cat.key] = z;
      composite += z;
    }
    p.composite = composite;
  }

  return stats;
}

// ------------------------------------------------------------
// 5) Main
// ------------------------------------------------------------
async function main() {
  console.log(`\n=== Daily 9cat Ranking — ${dateStr} (Liga: ${LEAGUE}) ===\n`);

  console.log('Lade Spielplan...');
  const games = await fetchGames(dateStr); // abgeschlossene UND noch ausstehende Spiele
  if (!games.length) {
    console.log('Keine Spiele für dieses Datum gefunden.');
    return;
  }
  const completedGames = games.filter(g => g.completed);
  const scheduledGames = games.filter(g => !g.completed);
  console.log(`${games.length} Spiel(e) gefunden (${completedGames.length} abgeschlossen, ${scheduledGames.length} noch ausstehend): ${games.map(g => g.name).join(', ')}\n`);

  console.log('Lade Boxscores für abgeschlossene Spiele...');
  let allPlayers = [];
  // Pro Spiel wird die Spielerliste zusätzlich separat gehalten (gleiche
  // Objekt-Referenzen wie in allPlayers) — so tragen sie nach
  // attachImpactStats()/computeZScores() unten automatisch fgImpact/
  // ftImpact/zScores/composite mit, ohne die Tages-Pool-Berechnung (über
  // ALLE Spiele des Tages) für die Box-Scores-Ansicht zu duplizieren. Nur
  // abgeschlossene Spiele haben überhaupt eine Boxscore zum Abrufen.
  const gamesWithPlayers = [];
  for (const game of completedGames) {
    const players = await fetchGamePlayers(game.id);
    gamesWithPlayers.push({ game, players });
    allPlayers = allPlayers.concat(players);
  }
  console.log(`${allPlayers.length} Spieler mit Einsatzzeit gefunden.\n`);

  // CSV/Meta/9cat-Ranking brauchen echte Stats — ohne mindestens ein
  // abgeschlossenes Spiel mit Boxscore wird dieser Teil übersprungen. Die
  // Box-Scores-Ansicht (games.json weiter unten) wird davon unabhängig immer
  // geschrieben, sobald es überhaupt Spiele gibt (auch nur geplante) — sonst
  // zeigt sie "keine Daten", obwohl schon feststeht wer wann gegen wen
  // spielt (23.08.2026, auf Wunsch: ESPN zeigt den Spielplan ja auch schon
  // vor Tip-off an).
  let leagueFGpct = 0, leagueFTpct = 0;
  if (allPlayers.length) {
    ({ leagueFGpct, leagueFTpct } = attachImpactStats(allPlayers));
    console.log(`Liga-Tages-Durchschnitt: FG% ${(leagueFGpct * 100).toFixed(1)}%  FT% ${(leagueFTpct * 100).toFixed(1)}%\n`);

    computeZScores(allPlayers);
    allPlayers.sort((a, b) => b.composite - a.composite);

    // Zeilen für Konsole (kompakt) und CSV (immer alle Kategorien inkl. Z-Scores) getrennt aufbauen
    const consoleRows = allPlayers.map((p, i) => ({
      Rank: i + 1,
      Name: p.name,
      Team: p.team,
      MIN: p.min,
      PTS: p.pts,
      REB: p.reb,
      AST: p.ast,
      STL: p.stl,
      BLK: p.blk,
      TO: p.to,
      '3PM': p.tpm,
      'FG%': p.fga > 0 ? ((p.fgm / p.fga) * 100).toFixed(1) : '-',
      'FT%': p.fta > 0 ? ((p.ftm / p.fta) * 100).toFixed(1) : '-',
      Composite: p.composite.toFixed(2),
    }));

    if (verbose) {
      const rows = allPlayers.map((p, i) => {
        const row = { Rank: i + 1, Name: p.name, Team: p.team, MIN: p.min, Composite: p.composite.toFixed(2) };
        for (const cat of CATEGORIES) {
          row[cat.label + 'z'] = p.zScores[cat.key].toFixed(2);
        }
        return row;
      });
      console.table(rows);
    } else {
      console.table(consoleRows);
    }

    // ------------------------------------------------------------
    // CSV-Export — landet im selben Ordner wie dieses Script
    // ------------------------------------------------------------
    const csvHeader = [
      'Rank', 'Name', 'Team', 'MIN', 'PTS', 'REB', 'AST', 'STL', 'BLK', 'TO', '3PM',
      'FGM', 'FGA', 'FTM', 'FTA', 'FG%', 'FT%', 'FGImpact', 'FTImpact', 'Composite',
    ];
    const csvLines = [csvHeader.join(',')];
    allPlayers.forEach((p, i) => {
      const line = [
        i + 1,
        `"${p.name.replace(/"/g, '""')}"`,
        p.team,
        p.min,
        p.pts,
        p.reb,
        p.ast,
        p.stl,
        p.blk,
        p.to,
        p.tpm,
        p.fgm,
        p.fga,
        p.ftm,
        p.fta,
        p.fga > 0 ? ((p.fgm / p.fga) * 100).toFixed(1) : '',
        p.fta > 0 ? ((p.ftm / p.fta) * 100).toFixed(1) : '',
        p.fgImpact.toFixed(2),
        p.ftImpact.toFixed(2),
        p.composite.toFixed(2),
      ];
      csvLines.push(line.join(','));
    });

    const fileName = `daily-9cat_${LEAGUE}_${dateStr}.csv`;
    const filePath = path.join(OUT_DIR, fileName);
    fs.writeFileSync(filePath, csvLines.join('\n'), 'utf8');
    console.log(`\nCSV gespeichert: ${filePath}\n`);

    // ------------------------------------------------------------
    // Meta-JSON — Games-Zeile & Liga-Durchschnitt, die die CSV selbst nicht
    // enthält. convert-to-livescores.js liest beide Dateien zusammen.
    // ------------------------------------------------------------
    const metaFileName = `daily-9cat_${LEAGUE}_${dateStr}.meta.json`;
    const metaPath = path.join(OUT_DIR, metaFileName);
    const meta = {
      league: LEAGUE,
      date: dateStr,
      games: games.map(g => g.line),
      leagueAvg: {
        fg: Number((leagueFGpct * 100).toFixed(1)),
        ft: Number((leagueFTpct * 100).toFixed(1)),
      },
    };
    fs.writeFileSync(metaPath, JSON.stringify(meta, null, 2), 'utf8');
    console.log(`Meta gespeichert: ${metaPath}\n`);
  } else {
    console.log('Noch keine abgeschlossenen Spiele mit Boxscore-Daten — CSV/Meta/9cat-Ranking werden übersprungen. Spielplan (Box Scores) wird trotzdem geschrieben.\n');
  }

  // ------------------------------------------------------------
  // Games-JSON — pro Spiel gruppierte Spieler (inkl. FGM/FGA/FTM/FTA und den
  // bereits berechneten Z-Scores) für die Box-Scores-Ansicht. Deckt sowohl
  // abgeschlossene Spiele (mit Spielern) als auch noch ausstehende (nur
  // Team-Namen + Tip-off-Zeit, players: []) ab -- in der ursprünglichen
  // Spielplan-Reihenfolge, nicht "erst alle abgeschlossenen". convert-to-
  // boxscores.js liest diese Datei und merged sie in
  // data/livescores-boxscores.js.
  // ------------------------------------------------------------
  const playersByGameId = new Map(gamesWithPlayers.map(gp => [gp.game.id, gp.players]));
  const boxscoreGames = games.map(game => {
    const players = playersByGameId.get(game.id) || [];
    const byTeam = (abbr) => players
      .filter(p => canonAbbr(p.team) === canonAbbr(abbr))
      .map(p => ({
        name: p.name, min: p.min,
        pts: p.pts, reb: p.reb, ast: p.ast, stl: p.stl, blk: p.blk, to: p.to, tpm: p.tpm,
        fgm: p.fgm, fga: p.fga, ftm: p.ftm, fta: p.fta,
        composite: Number((p.composite ?? 0).toFixed(2)),
        zScores: Object.fromEntries(CATEGORIES.map(c => [c.key, Number((p.zScores?.[c.key] ?? 0).toFixed(3))])),
      }));
    return {
      id: game.id,
      line: game.line,
      completed: game.completed,
      statusText: game.statusText,
      away: game.away ? { ...game.away, players: byTeam(game.away.abbr) } : null,
      home: game.home ? { ...game.home, players: byTeam(game.home.abbr) } : null,
    };
  }).filter(g => g.completed ? ((g.away?.players?.length || 0) + (g.home?.players?.length || 0) > 0) : true);

  const gamesJsonFileName = `daily-9cat_${LEAGUE}_${dateStr}.games.json`;
  const gamesJsonPath = path.join(OUT_DIR, gamesJsonFileName);
  fs.writeFileSync(gamesJsonPath, JSON.stringify({ league: LEAGUE, date: dateStr, games: boxscoreGames }, null, 2), 'utf8');
  console.log(`Games-JSON (Box Scores) gespeichert: ${gamesJsonPath}\n`);
}

main().catch(err => {
  console.error('Fehler:', err.message);
  process.exit(1);
});
