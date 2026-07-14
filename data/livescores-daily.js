// ============================================================
//  LIVE SCORES — Daily 9cat Z-Score Data
// ============================================================
//  This file is a PLACEHOLDER with sample data so the Live
//  Scores UI has something to render.
//
//  Once the daily-9cat.js automation runs as a GitHub Action
//  (like the Summer League model), this file gets overwritten
//  automatically with real data, committed straight to the repo.
//
//  Shape:
//  LIVESCORES_DAILY[league][date] = {
//    games: [ "Team A 88 @ Team B 91 (Final)", ... ],
//    leagueAvg: { fg: 47.3, ft: 76.1 },
//    players: [
//      { rank, name, team, min, pts, reb, ast, stl, blk, to, tpm,
//        fgPct, ftPct, composite },
//      ...
//    ]
//  }
//
//  date format: "YYYY-MM-DD"
//  league keys match the ESPN league slugs used in daily-9cat.js:
//    "nba-summer-las-vegas" | "nba-preseason" | "nba"
// ============================================================

const LIVESCORES_DAILY = {
  "nba-summer-las-vegas": {
    "2026-07-11": {
      games: [
        "Memphis Grizzlies 84 @ Portland Trail Blazers 91 (Final)",
        "Miami Heat 96 @ New York Knicks 89 (Final)"
      ],
      leagueAvg: { fg: 46.8, ft: 75.2 },
      players: [
        { rank: 1,  name: "Rob Dillingham",   team: "MIN", min: 29, pts: 27, reb: 4, ast: 8, stl: 3, blk: 0, to: 2, tpm: 4, fgPct: 51.9, ftPct: 87.5, composite: 6.84 },
        { rank: 2,  name: "Trevor Keels",     team: "DAL", min: 26, pts: 24, reb: 5, ast: 2, stl: 1, blk: 0, to: 3, tpm: 2, fgPct: 55.0, ftPct: 66.7, composite: 4.12 },
        { rank: 3,  name: "Kel'el Ware",      team: "MIA", min: 24, pts: 18, reb: 11, ast: 1, stl: 1, blk: 3, to: 1, tpm: 0, fgPct: 58.3, ftPct: 60.0, composite: 3.97 },
        { rank: 4,  name: "Ron Holland",      team: "DET", min: 27, pts: 16, reb: 7, ast: 3, stl: 2, blk: 1, to: 2, tpm: 1, fgPct: 47.4, ftPct: 71.4, composite: 2.55 },
        { rank: 5,  name: "Cody Williams",    team: "UTA", min: 22, pts: 14, reb: 5, ast: 4, stl: 1, blk: 0, to: 1, tpm: 2, fgPct: 46.2, ftPct: 100.0, composite: 2.03 },
        { rank: 6,  name: "Reed Sheppard",    team: "HOU", min: 25, pts: 13, reb: 3, ast: 6, stl: 2, blk: 0, to: 2, tpm: 3, fgPct: 40.0, ftPct: 100.0, composite: 1.61 },
        { rank: 7,  name: "Jared McCain",     team: "PHI", min: 21, pts: 15, reb: 2, ast: 3, stl: 0, blk: 0, to: 3, tpm: 2, fgPct: 44.4, ftPct: 75.0, composite: 0.42 },
        { rank: 8,  name: "Jaylen Wells",     team: "MEM", min: 23, pts: 9,  reb: 6, ast: 2, stl: 1, blk: 1, to: 1, tpm: 1, fgPct: 38.5, ftPct: 50.0, composite: -0.35 },
        { rank: 9,  name: "Bronny James",     team: "LAL", min: 19, pts: 8,  reb: 3, ast: 4, stl: 1, blk: 0, to: 3, tpm: 0, fgPct: 33.3, ftPct: 100.0, composite: -1.18 },
        { rank: 10, name: "Ja'Kobe Walter",   team: "TOR", min: 20, pts: 6,  reb: 2, ast: 1, stl: 0, blk: 0, to: 2, tpm: 1, fgPct: 28.6, ftPct: 0.0,  composite: -2.44 }
      ]
    },
    "2026-07-12": {
      games: [
        "Dallas Mavericks 89 @ Miami Heat 82 (Final)",
        "Toronto Raptors 97 @ Chicago Bulls 90 (Final)"
      ],
      leagueAvg: { fg: 45.9, ft: 77.6 },
      players: [
        { rank: 1,  name: "Trevor Keels",     team: "DAL", min: 28, pts: 25, reb: 6, ast: 3, stl: 2, blk: 0, to: 1, tpm: 3, fgPct: 57.1, ftPct: 85.7, composite: 6.21 },
        { rank: 2,  name: "Ja'Kobe Walter",   team: "TOR", min: 27, pts: 21, reb: 5, ast: 4, stl: 2, blk: 0, to: 2, tpm: 3, fgPct: 50.0, ftPct: 75.0, composite: 4.30 },
        { rank: 3,  name: "Kel'el Ware",      team: "MIA", min: 25, pts: 13, reb: 12, ast: 1, stl: 0, blk: 2, to: 2, tpm: 0, fgPct: 46.7, ftPct: 50.0, composite: 1.98 },
        { rank: 4,  name: "Ron Holland",      team: "DET", min: 24, pts: 12, reb: 5, ast: 5, stl: 1, blk: 0, to: 3, tpm: 0, fgPct: 41.7, ftPct: 66.7, composite: 0.55 },
        { rank: 5,  name: "Jared McCain",     team: "PHI", min: 22, pts: 17, reb: 2, ast: 2, stl: 1, blk: 0, to: 2, tpm: 3, fgPct: 47.1, ftPct: 100.0, composite: 0.44 },
        { rank: 6,  name: "Cody Williams",    team: "UTA", min: 20, pts: 9,  reb: 4, ast: 3, stl: 1, blk: 1, to: 1, tpm: 1, fgPct: 37.5, ftPct: 100.0, composite: -0.62 },
        { rank: 7,  name: "Rob Dillingham",   team: "MIN", min: 24, pts: 11, reb: 2, ast: 5, stl: 0, blk: 0, to: 4, tpm: 1, fgPct: 33.3, ftPct: 60.0, composite: -1.10 },
        { rank: 8,  name: "Reed Sheppard",    team: "HOU", min: 20, pts: 6,  reb: 2, ast: 3, stl: 1, blk: 0, to: 2, tpm: 1, fgPct: 25.0, ftPct: 50.0, composite: -2.90 },
        { rank: 9,  name: "Jaylen Wells",     team: "MEM", min: 18, pts: 5,  reb: 3, ast: 1, stl: 0, blk: 0, to: 1, tpm: 0, fgPct: 28.6, ftPct: 0.0,  composite: -3.35 },
        { rank: 10, name: "Bronny James",     team: "LAL", min: 16, pts: 4,  reb: 1, ast: 2, stl: 0, blk: 0, to: 2, tpm: 0, fgPct: 20.0, ftPct: 0.0,  composite: -5.51 }
      ]
    }
  }
};
