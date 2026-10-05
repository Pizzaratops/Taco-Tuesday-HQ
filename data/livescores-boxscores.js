// ============================================================
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
  "nba": {
    "2026-10-03": {
    games: [
      {
      id: "401902644",
      line: "Miami Heat 129 @ Toronto Raptors 105 (Final)",
      completed: true,
      statusText: "Final",
      away: {
        abbr: "MIA", name: "Miami Heat", score: 129,
        players: [
          { name: "Giannis Antetokounmpo", min: 14, pts: 9, reb: 4, ast: 7, stl: 0, blk: 0, to: 2, tpm: 0, fgm: 3, fga: 3, ftm: 3, fta: 4, composite: 2.1, zScores: { pts: 0.341, reb: 0.376, ast: 2.851, stl: -0.85, blk: -0.502, tpm: -0.756, fgImpact: 1.311, ftImpact: -0.055, to: -0.616 } },
          { name: "Andrew Wiggins", min: 13, pts: 12, reb: 1, ast: 0, stl: 1, blk: 0, to: 0, tpm: 4, fgm: 4, fga: 6, ftm: 0, fta: 0, composite: 4.16, zScores: { pts: 1.046, reb: -0.969, ast: -0.992, stl: 0.163, blk: -0.502, tpm: 2.848, fgImpact: 1.064, ftImpact: 0, to: 1.506 } },
          { name: "Bam Adebayo", min: 13, pts: 10, reb: 6, ast: 0, stl: 0, blk: 0, to: 2, tpm: 1, fgm: 2, fga: 7, ftm: 5, fta: 6, composite: -0.98, zScores: { pts: 0.576, reb: 1.273, ast: -0.992, stl: -0.85, blk: -0.502, tpm: 0.145, fgImpact: -0.835, ftImpact: 0.821, to: -0.616 } },
          { name: "Klay Thompson", min: 13, pts: 0, reb: 2, ast: 0, stl: 0, blk: 0, to: 1, tpm: 0, fgm: 0, fga: 2, ftm: 0, fta: 0, composite: -5.63, zScores: { pts: -1.773, reb: -0.521, ast: -0.992, stl: -0.85, blk: -0.502, tpm: -0.756, fgImpact: -0.684, ftImpact: 0, to: 0.445 } },
          { name: "Davion Mitchell", min: 13, pts: 3, reb: 1, ast: 4, stl: 1, blk: 0, to: 2, tpm: 1, fgm: 1, fga: 5, ftm: 0, fta: 0, composite: -2.57, zScores: { pts: -1.069, reb: -0.969, ast: 1.204, stl: 0.163, blk: -0.502, tpm: 0.145, fgImpact: -0.93, ftImpact: 0, to: -0.616 } },
          { name: "Bobby Portis", min: 11, pts: 4, reb: 3, ast: 2, stl: 0, blk: 0, to: 1, tpm: 1, fgm: 1, fga: 4, ftm: 1, fta: 2, composite: -3.08, zScores: { pts: -0.834, reb: -0.072, ast: 0.106, stl: -0.85, blk: -0.502, tpm: 0.145, fgImpact: -0.588, ftImpact: -0.93, to: 0.445 } },
          { name: "Simone Fontecchio", min: 11, pts: 4, reb: 2, ast: 1, stl: 0, blk: 1, to: 2, tpm: 0, fgm: 2, fga: 4, ftm: 0, fta: 0, composite: -2.6, zScores: { pts: -0.834, reb: -0.521, ast: -0.443, stl: -0.85, blk: 1.226, tpm: -0.756, fgImpact: 0.19, ftImpact: 0, to: -0.616 } },
          { name: "Myron Gardner", min: 14, pts: 7, reb: 5, ast: 2, stl: 2, blk: 1, to: 2, tpm: 1, fgm: 2, fga: 4, ftm: 2, fta: 2, composite: 3.8, zScores: { pts: -0.129, reb: 0.824, ast: 0.106, stl: 1.177, blk: 1.226, tpm: 0.145, fgImpact: 0.19, ftImpact: 0.875, to: -0.616 } },
          { name: "Ian Schieffelin", min: 10, pts: 11, reb: 3, ast: 1, stl: 0, blk: 0, to: 0, tpm: 1, fgm: 4, fga: 4, ftm: 2, fta: 2, composite: 3.22, zScores: { pts: 0.811, reb: -0.072, ast: -0.443, stl: -0.85, blk: -0.502, tpm: 0.145, fgImpact: 1.748, ftImpact: 0.875, to: 1.506 } },
          { name: "J'Vonne Hadley", min: 10, pts: 2, reb: 6, ast: 0, stl: 1, blk: 0, to: 0, tpm: 0, fgm: 1, fga: 1, ftm: 0, fta: 0, composite: -0.17, zScores: { pts: -1.303, reb: 1.273, ast: -0.992, stl: 0.163, blk: -0.502, tpm: -0.756, fgImpact: 0.437, ftImpact: 0, to: 1.506 } },
          { name: "Nikola Jovic", min: 17, pts: 11, reb: 7, ast: 4, stl: 0, blk: 2, to: 2, tpm: 1, fgm: 3, fga: 9, ftm: 4, fta: 4, composite: 6.38, zScores: { pts: 0.811, reb: 1.721, ast: 1.204, stl: -0.85, blk: 2.954, tpm: 0.145, fgImpact: -0.74, ftImpact: 1.751, to: -0.616 } },
          { name: "Nick Richards", min: 10, pts: 0, reb: 7, ast: 0, stl: 0, blk: 2, to: 2, tpm: 0, fgm: 0, fga: 0, ftm: 0, fta: 0, composite: -0.31, zScores: { pts: -1.773, reb: 1.721, ast: -0.992, stl: -0.85, blk: 2.954, tpm: -0.756, fgImpact: 0, ftImpact: 0, to: -0.616 } },
          { name: "Vladislav Goldin", min: 7, pts: 6, reb: 1, ast: 0, stl: 0, blk: 0, to: 1, tpm: 0, fgm: 3, fga: 4, ftm: 0, fta: 0, composite: -3.02, zScores: { pts: -0.364, reb: -0.969, ast: -0.992, stl: -0.85, blk: -0.502, tpm: -0.756, fgImpact: 0.969, ftImpact: 0, to: 0.445 } },
          { name: "Tim Hardaway Jr.", min: 11, pts: 14, reb: 0, ast: 0, stl: 0, blk: 0, to: 1, tpm: 3, fgm: 4, fga: 4, ftm: 3, fta: 3, composite: 3.21, zScores: { pts: 1.516, reb: -1.417, ast: -0.992, stl: -0.85, blk: -0.502, tpm: 1.947, fgImpact: 1.748, ftImpact: 1.313, to: 0.445 } },
          { name: "Lester Quinones", min: 9, pts: 0, reb: 1, ast: 0, stl: 0, blk: 0, to: 1, tpm: 0, fgm: 0, fga: 2, ftm: 0, fta: 0, composite: -6.08, zScores: { pts: -1.773, reb: -0.969, ast: -0.992, stl: -0.85, blk: -0.502, tpm: -0.756, fgImpact: -0.684, ftImpact: 0, to: 0.445 } },
          { name: "Pelle Larsson", min: 11, pts: 13, reb: 2, ast: 2, stl: 2, blk: 0, to: 1, tpm: 0, fgm: 3, fga: 3, ftm: 7, fta: 7, composite: 5.61, zScores: { pts: 1.281, reb: -0.521, ast: 0.106, stl: 1.177, blk: -0.502, tpm: -0.756, fgImpact: 1.311, ftImpact: 3.064, to: 0.445 } },
          { name: "Tre Donaldson", min: 16, pts: 6, reb: 0, ast: 3, stl: 1, blk: 1, to: 2, tpm: 0, fgm: 1, fga: 5, ftm: 4, fta: 6, composite: -3.02, zScores: { pts: -0.364, reb: -1.417, ast: 0.655, stl: 0.163, blk: 1.226, tpm: -0.756, fgImpact: -0.93, ftImpact: -0.985, to: -0.616 } },
          { name: "Bez Mbeng", min: 18, pts: 11, reb: 3, ast: 3, stl: 1, blk: 0, to: 2, tpm: 1, fgm: 5, fga: 11, ftm: 0, fta: 0, composite: 0.72, zScores: { pts: 0.811, reb: -0.072, ast: 0.655, stl: 0.163, blk: -0.502, tpm: 0.145, fgImpact: 0.134, ftImpact: 0, to: -0.616 } },
          { name: "Ryan Conwell", min: 18, pts: 6, reb: 1, ast: 2, stl: 0, blk: 0, to: 1, tpm: 0, fgm: 3, fga: 8, ftm: 0, fta: 0, composite: -3.29, zScores: { pts: -0.364, reb: -0.969, ast: 0.106, stl: -0.85, blk: -0.502, tpm: -0.756, fgImpact: -0.398, ftImpact: 0, to: 0.445 } }
        ]
      },
      home: {
        abbr: "TOR", name: "Toronto Raptors", score: 105,
        players: [
          { name: "RJ Barrett", min: 17, pts: 15, reb: 3, ast: 1, stl: 1, blk: 0, to: 1, tpm: 2, fgm: 3, fga: 9, ftm: 7, fta: 8, composite: 3.34, zScores: { pts: 1.751, reb: -0.072, ast: -0.443, stl: 0.163, blk: -0.502, tpm: 1.046, fgImpact: -0.74, ftImpact: 1.696, to: 0.445 } },
          { name: "Scottie Barnes", min: 12, pts: 11, reb: 2, ast: 2, stl: 3, blk: 0, to: 3, tpm: 0, fgm: 5, fga: 11, ftm: 1, fta: 2, composite: -1.14, zScores: { pts: 0.811, reb: -0.521, ast: 0.106, stl: 2.19, blk: -0.502, tpm: -0.756, fgImpact: 0.134, ftImpact: -0.93, to: -1.677 } },
          { name: "Jakob Poeltl", min: 18, pts: 9, reb: 1, ast: 1, stl: 2, blk: 1, to: 1, tpm: 0, fgm: 3, fga: 3, ftm: 3, fta: 4, composite: 2.28, zScores: { pts: 0.341, reb: -0.969, ast: -0.443, stl: 1.177, blk: 1.226, tpm: -0.756, fgImpact: 1.311, ftImpact: -0.055, to: 0.445 } },
          { name: "Immanuel Quickley", min: 12, pts: 5, reb: 2, ast: 3, stl: 1, blk: 0, to: 1, tpm: 1, fgm: 2, fga: 6, ftm: 0, fta: 0, composite: -0.71, zScores: { pts: -0.599, reb: -0.521, ast: 0.655, stl: 0.163, blk: -0.502, tpm: 0.145, fgImpact: -0.493, ftImpact: 0, to: 0.445 } },
          { name: "Ja'Kobe Walter", min: 18, pts: 8, reb: 5, ast: 1, stl: 0, blk: 0, to: 1, tpm: 2, fgm: 3, fga: 8, ftm: 0, fta: 0, composite: 0.23, zScores: { pts: 0.106, reb: 0.824, ast: -0.443, stl: -0.85, blk: -0.502, tpm: 1.046, fgImpact: -0.398, ftImpact: 0, to: 0.445 } },
          { name: "Collin Murray-Boyles", min: 20, pts: 6, reb: 9, ast: 1, stl: 0, blk: 0, to: 0, tpm: 0, fgm: 3, fga: 10, ftm: 0, fta: 1, composite: -1.24, zScores: { pts: -0.364, reb: 2.618, ast: -0.443, stl: -0.85, blk: -0.502, tpm: -0.756, fgImpact: -1.082, ftImpact: -1.368, to: 1.506 } },
          { name: "Tyreke Key", min: 16, pts: 15, reb: 1, ast: 0, stl: 0, blk: 0, to: 1, tpm: 4, fgm: 5, fga: 9, ftm: 1, fta: 2, composite: 1.62, zScores: { pts: 1.751, reb: -0.969, ast: -0.992, stl: -0.85, blk: -0.502, tpm: 2.848, fgImpact: 0.818, ftImpact: -0.93, to: 0.445 } },
          { name: "Malachi Smith", min: 31, pts: 7, reb: 5, ast: 2, stl: 2, blk: 0, to: 3, tpm: 0, fgm: 3, fga: 11, ftm: 1, fta: 2, composite: -3.31, zScores: { pts: -0.129, reb: 0.824, ast: 0.106, stl: 1.177, blk: -0.502, tpm: -0.756, fgImpact: -1.423, ftImpact: -0.93, to: -1.677 } },
          { name: "Jamal Shead", min: 28, pts: 3, reb: 5, ast: 7, stl: 3, blk: 1, to: 2, tpm: 0, fgm: 1, fga: 7, ftm: 1, fta: 2, composite: 2.11, zScores: { pts: -1.069, reb: 0.824, ast: 2.851, stl: 2.19, blk: 1.226, tpm: -0.756, fgImpact: -1.614, ftImpact: -0.93, to: -0.616 } },
          { name: "Jaden Bradley", min: 20, pts: 9, reb: 3, ast: 2, stl: 1, blk: 0, to: 0, tpm: 1, fgm: 3, fga: 4, ftm: 2, fta: 4, composite: 0.8, zScores: { pts: 0.341, reb: -0.072, ast: 0.106, stl: 0.163, blk: -0.502, tpm: 0.145, fgImpact: 0.969, ftImpact: -1.86, to: 1.506 } },
          { name: "Nimari Burnett", min: 24, pts: 6, reb: 3, ast: 3, stl: 1, blk: 0, to: 4, tpm: 1, fgm: 2, fga: 10, ftm: 1, fta: 2, composite: -5.5, zScores: { pts: -0.364, reb: -0.072, ast: 0.655, stl: 0.163, blk: -0.502, tpm: 0.145, fgImpact: -1.86, ftImpact: -0.93, to: -2.738 } },
          { name: "Chucky Hepburn", min: 25, pts: 11, reb: 4, ast: 2, stl: 3, blk: 0, to: 2, tpm: 1, fgm: 4, fga: 6, ftm: 2, fta: 3, composite: 3.08, zScores: { pts: 0.811, reb: 0.376, ast: 0.106, stl: 2.19, blk: -0.502, tpm: 0.145, fgImpact: 1.064, ftImpact: -0.492, to: -0.616 } }
        ]
      }
    }
    ]
  },
    "2026-10-04": {
    games: [
      {
      id: "401914127",
      line: "Utah Jazz @ Denver Nuggets (10/4 - 7:00 PM EDT)",
      completed: false,
      statusText: "10/4 - 7:00 PM EDT",
      away: {
        abbr: "UTAH", name: "Utah Jazz", score: null,
        players: [

        ]
      },
      home: {
        abbr: "DEN", name: "Denver Nuggets", score: null,
        players: [

        ]
      }
    },
      {
      id: "401918010",
      line: "Golden State Warriors @ LA Clippers (10/4 - 7:00 PM EDT)",
      completed: false,
      statusText: "10/4 - 7:00 PM EDT",
      away: {
        abbr: "GS", name: "Golden State Warriors", score: null,
        players: [

        ]
      },
      home: {
        abbr: "LAC", name: "LA Clippers", score: null,
        players: [

        ]
      }
    }
    ]
  },
    "2026-10-05": {
    games: [
      {
      id: "401898388",
      line: "Memphis Grizzlies @ Atlanta Hawks (10/5 - 7:00 PM EDT)",
      completed: false,
      statusText: "10/5 - 7:00 PM EDT",
      away: {
        abbr: "MEM", name: "Memphis Grizzlies", score: null,
        players: [

        ]
      },
      home: {
        abbr: "ATL", name: "Atlanta Hawks", score: null,
        players: [

        ]
      }
    },
      {
      id: "401908947",
      line: "Phoenix Suns @ Detroit Pistons (10/5 - 7:00 PM EDT)",
      completed: false,
      statusText: "10/5 - 7:00 PM EDT",
      away: {
        abbr: "PHX", name: "Phoenix Suns", score: null,
        players: [

        ]
      },
      home: {
        abbr: "DET", name: "Detroit Pistons", score: null,
        players: [

        ]
      }
    },
      {
      id: "401914101",
      line: "New York Knicks @ Philadelphia 76ers (10/5 - 7:00 PM EDT)",
      completed: false,
      statusText: "10/5 - 7:00 PM EDT",
      away: {
        abbr: "NY", name: "New York Knicks", score: null,
        players: [

        ]
      },
      home: {
        abbr: "PHI", name: "Philadelphia 76ers", score: null,
        players: [

        ]
      }
    },
      {
      id: "401914102",
      line: "Minnesota Timberwolves @ Milwaukee Bucks (10/5 - 8:00 PM EDT)",
      completed: false,
      statusText: "10/5 - 8:00 PM EDT",
      away: {
        abbr: "MIN", name: "Minnesota Timberwolves", score: null,
        players: [

        ]
      },
      home: {
        abbr: "MIL", name: "Milwaukee Bucks", score: null,
        players: [

        ]
      }
    },
      {
      id: "401898716",
      line: "Los Angeles Lakers @ Sacramento Kings (10/5 - 10:00 PM EDT)",
      completed: false,
      statusText: "10/5 - 10:00 PM EDT",
      away: {
        abbr: "LAL", name: "Los Angeles Lakers", score: null,
        players: [

        ]
      },
      home: {
        abbr: "SAC", name: "Sacramento Kings", score: null,
        players: [

        ]
      }
    }
    ]
  }
  }
};
