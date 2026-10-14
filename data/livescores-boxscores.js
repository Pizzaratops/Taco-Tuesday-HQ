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
      line: "Utah Jazz 109 @ Denver Nuggets 97 (Final)",
      completed: true,
      statusText: "Final",
      away: {
        abbr: "UTAH", name: "Utah Jazz", score: 109,
        players: [
          { name: "Lauri Markkanen", min: 14, pts: 17, reb: 2, ast: 0, stl: 1, blk: 0, to: 1, tpm: 3, fgm: 5, fga: 12, ftm: 4, fta: 4, composite: 5.72, zScores: { pts: 2.357, reb: -0.436, ast: -0.87, stl: 0.917, blk: -0.549, tpm: 2.391, fgImpact: 0.145, ftImpact: 1.925, to: -0.161 } },
          { name: "Jaren Jackson Jr.", min: 18, pts: 11, reb: 4, ast: 2, stl: 0, blk: 0, to: 1, tpm: 1, fgm: 4, fga: 7, ftm: 2, fta: 3, composite: 1.79, zScores: { pts: 1.076, reb: 0.504, ast: 0.381, stl: -0.589, blk: -0.549, tpm: 0.379, fgImpact: 1.068, ftImpact: -0.321, to: -0.161 } },
          { name: "Jusuf Nurkic", min: 11, pts: 4, reb: 5, ast: 4, stl: 1, blk: 1, to: 0, tpm: 0, fgm: 1, fga: 5, ftm: 2, fta: 2, composite: 4.4, zScores: { pts: -0.418, reb: 0.974, ast: 1.631, stl: 0.917, blk: 1.03, tpm: -0.627, fgImpact: -0.923, ftImpact: 0.963, to: 0.851 } },
          { name: "Keyonte George", min: 21, pts: 15, reb: 4, ast: 3, stl: 0, blk: 0, to: 1, tpm: 1, fgm: 5, fga: 8, ftm: 4, fta: 5, composite: 4.77, zScores: { pts: 1.93, reb: 0.504, ast: 1.006, stl: -0.589, blk: -0.549, tpm: 0.379, fgImpact: 1.61, ftImpact: 0.642, to: -0.161 } },
          { name: "Darryn Peterson", min: 19, pts: 3, reb: 6, ast: 2, stl: 1, blk: 0, to: 2, tpm: 0, fgm: 1, fga: 5, ftm: 1, fta: 2, composite: -1.97, zScores: { pts: -0.631, reb: 1.443, ast: 0.381, stl: 0.917, blk: -0.549, tpm: -0.627, fgImpact: -0.923, ftImpact: -0.802, to: -1.174 } },
          { name: "Blake Hinson", min: 17, pts: 14, reb: 6, ast: 0, stl: 0, blk: 0, to: 0, tpm: 4, fgm: 5, fga: 8, ftm: 0, fta: 0, composite: 7.01, zScores: { pts: 1.717, reb: 1.443, ast: -0.87, stl: -0.589, blk: -0.549, tpm: 3.396, fgImpact: 1.61, ftImpact: 0, to: 0.851 } },
          { name: "Harrison Ingram", min: 12, pts: 6, reb: 1, ast: 0, stl: 0, blk: 0, to: 1, tpm: 0, fgm: 3, fga: 7, ftm: 0, fta: 0, composite: -3.53, zScores: { pts: 0.009, reb: -0.906, ast: -0.87, stl: -0.589, blk: -0.549, tpm: -0.627, fgImpact: 0.16, ftImpact: 0, to: -0.161 } },
          { name: "Mo Bamba", min: 12, pts: 6, reb: 7, ast: 2, stl: 0, blk: 0, to: 0, tpm: 0, fgm: 2, fga: 4, ftm: 2, fta: 2, composite: 2.7, zScores: { pts: 0.009, reb: 1.913, ast: 0.381, stl: -0.589, blk: -0.549, tpm: -0.627, fgImpact: 0.351, ftImpact: 0.963, to: 0.851 } },
          { name: "Jaxson Hayes", min: 19, pts: 2, reb: 3, ast: 4, stl: 0, blk: 3, to: 1, tpm: 0, fgm: 1, fga: 2, ftm: 0, fta: 1, composite: 2.52, zScores: { pts: -0.844, reb: 0.034, ast: 1.631, stl: -0.589, blk: 4.189, tpm: -0.627, fgImpact: 0.175, ftImpact: -1.284, to: -0.161 } },
          { name: "Jonas Aidoo", min: 3, pts: 0, reb: 2, ast: 0, stl: 0, blk: 0, to: 0, tpm: 0, fgm: 0, fga: 1, ftm: 0, fta: 0, composite: -3.86, zScores: { pts: -1.271, reb: -0.436, ast: -0.87, stl: -0.589, blk: -0.549, tpm: -0.627, fgImpact: -0.366, ftImpact: 0, to: 0.851 } },
          { name: "Svi Mykhailiuk", min: 17, pts: 9, reb: 0, ast: 3, stl: 0, blk: 0, to: 0, tpm: 3, fgm: 3, fga: 9, ftm: 0, fta: 0, composite: 1.81, zScores: { pts: 0.65, reb: -1.375, ast: 1.006, stl: -0.589, blk: -0.549, tpm: 2.391, fgImpact: -0.572, ftImpact: 0, to: 0.851 } },
          { name: "Josh Okogie", min: 14, pts: 3, reb: 1, ast: 1, stl: 0, blk: 0, to: 0, tpm: 1, fgm: 1, fga: 3, ftm: 0, fta: 0, composite: -1.88, zScores: { pts: -0.631, reb: -0.906, ast: -0.245, stl: -0.589, blk: -0.549, tpm: 0.379, fgImpact: -0.191, ftImpact: 0, to: 0.851 } },
          { name: "Trey Alexander", min: 12, pts: 0, reb: 2, ast: 2, stl: 0, blk: 0, to: 1, tpm: 0, fgm: 0, fga: 5, ftm: 0, fta: 0, composite: -5.08, zScores: { pts: -1.271, reb: -0.436, ast: 0.381, stl: -0.589, blk: -0.549, tpm: -0.627, fgImpact: -1.831, ftImpact: 0, to: -0.161 } },
          { name: "Isaiah Collier", min: 15, pts: 9, reb: 4, ast: 4, stl: 0, blk: 0, to: 0, tpm: 2, fgm: 3, fga: 4, ftm: 1, fta: 1, composite: 5.62, zScores: { pts: 0.65, reb: 0.504, ast: 1.631, stl: -0.589, blk: -0.549, tpm: 1.385, fgImpact: 1.259, ftImpact: 0.481, to: 0.851 } },
          { name: "Tamar Bates", min: 15, pts: 0, reb: 2, ast: 1, stl: 0, blk: 0, to: 1, tpm: 0, fgm: 0, fga: 3, ftm: 0, fta: 0, composite: -4.98, zScores: { pts: -1.271, reb: -0.436, ast: -0.245, stl: -0.589, blk: -0.549, tpm: -0.627, fgImpact: -1.099, ftImpact: 0, to: -0.161 } },
          { name: "Ace Bailey", min: 20, pts: 10, reb: 5, ast: 0, stl: 1, blk: 1, to: 1, tpm: 0, fgm: 5, fga: 10, ftm: 0, fta: 0, composite: 3, zScores: { pts: 0.863, reb: 0.974, ast: -0.87, stl: 0.917, blk: 1.03, tpm: -0.627, fgImpact: 0.877, ftImpact: 0, to: -0.161 } }
        ]
      },
      home: {
        abbr: "DEN", name: "Denver Nuggets", score: 97,
        players: [
          { name: "Aaron Gordon", min: 10, pts: 12, reb: 4, ast: 0, stl: 0, blk: 0, to: 2, tpm: 1, fgm: 4, fga: 8, ftm: 3, fta: 3, composite: 1.14, zScores: { pts: 1.29, reb: 0.504, ast: -0.87, stl: -0.589, blk: -0.549, tpm: 0.379, fgImpact: 0.702, ftImpact: 1.444, to: -1.174 } },
          { name: "Cameron Johnson", min: 15, pts: 8, reb: 2, ast: 0, stl: 1, blk: 1, to: 0, tpm: 2, fgm: 3, fga: 7, ftm: 0, fta: 0, composite: 3.47, zScores: { pts: 0.436, reb: -0.436, ast: -0.87, stl: 0.917, blk: 1.03, tpm: 1.385, fgImpact: 0.16, ftImpact: 0, to: 0.851 } },
          { name: "Nikola Jokic", min: 15, pts: 3, reb: 3, ast: 7, stl: 1, blk: 1, to: 0, tpm: 0, fgm: 1, fga: 1, ftm: 1, fta: 2, composite: 4.82, zScores: { pts: -0.631, reb: 0.034, ast: 3.507, stl: 0.917, blk: 1.03, tpm: -0.627, fgImpact: 0.542, ftImpact: -0.802, to: 0.851 } },
          { name: "Tyus Jones", min: 19, pts: 8, reb: 2, ast: 6, stl: 0, blk: 0, to: 2, tpm: 2, fgm: 3, fga: 6, ftm: 0, fta: 0, composite: 2.48, zScores: { pts: 0.436, reb: -0.436, ast: 2.882, stl: -0.589, blk: -0.549, tpm: 1.385, fgImpact: 0.526, ftImpact: 0, to: -1.174 } },
          { name: "Christian Braun", min: 15, pts: 6, reb: 3, ast: 1, stl: 0, blk: 0, to: 0, tpm: 0, fgm: 3, fga: 5, ftm: 0, fta: 2, composite: -2.79, zScores: { pts: 0.009, reb: 0.034, ast: -0.245, stl: -0.589, blk: -0.549, tpm: -0.627, fgImpact: 0.893, ftImpact: -2.567, to: 0.851 } },
          { name: "Alpha Diallo", min: 13, pts: 2, reb: 3, ast: 2, stl: 0, blk: 0, to: 1, tpm: 0, fgm: 0, fga: 2, ftm: 2, fta: 2, composite: -2.13, zScores: { pts: -0.844, reb: 0.034, ast: 0.381, stl: -0.589, blk: -0.549, tpm: -0.627, fgImpact: -0.732, ftImpact: 0.963, to: -0.161 } },
          { name: "Marvin Bagley III", min: 14, pts: 5, reb: 7, ast: 0, stl: 0, blk: 0, to: 2, tpm: 0, fgm: 2, fga: 7, ftm: 1, fta: 2, composite: -3.65, zScores: { pts: -0.204, reb: 1.913, ast: -0.87, stl: -0.589, blk: -0.549, tpm: -0.627, fgImpact: -0.748, ftImpact: -0.802, to: -1.174 } },
          { name: "Zeke Nnaji", min: 15, pts: 3, reb: 3, ast: 1, stl: 0, blk: 1, to: 2, tpm: 0, fgm: 0, fga: 4, ftm: 3, fta: 4, composite: -3.51, zScores: { pts: -0.631, reb: 0.034, ast: -0.245, stl: -0.589, blk: 1.03, tpm: -0.627, fgImpact: -1.465, ftImpact: 0.16, to: -1.174 } },
          { name: "Emanuel Miller", min: 3, pts: 5, reb: 1, ast: 0, stl: 0, blk: 0, to: 0, tpm: 0, fgm: 2, fga: 3, ftm: 1, fta: 1, composite: -1.7, zScores: { pts: -0.204, reb: -0.906, ast: -0.87, stl: -0.589, blk: -0.549, tpm: -0.627, fgImpact: 0.717, ftImpact: 0.481, to: 0.851 } },
          { name: "Coleman Hawkins", min: 3, pts: 0, reb: 0, ast: 0, stl: 0, blk: 0, to: 0, tpm: 0, fgm: 0, fga: 1, ftm: 0, fta: 0, composite: -4.8, zScores: { pts: -1.271, reb: -1.375, ast: -0.87, stl: -0.589, blk: -0.549, tpm: -0.627, fgImpact: -0.366, ftImpact: 0, to: 0.851 } },
          { name: "DaRon Holmes II", min: 12, pts: 4, reb: 1, ast: 1, stl: 0, blk: 1, to: 0, tpm: 0, fgm: 2, fga: 6, ftm: 0, fta: 0, composite: -1.28, zScores: { pts: -0.418, reb: -0.906, ast: -0.245, stl: -0.589, blk: 1.03, tpm: -0.627, fgImpact: -0.381, ftImpact: 0, to: 0.851 } },
          { name: "Bryce Hopkins", min: 12, pts: 1, reb: 2, ast: 0, stl: 1, blk: 0, to: 0, tpm: 0, fgm: 0, fga: 2, ftm: 1, fta: 2, composite: -3.31, zScores: { pts: -1.058, reb: -0.436, ast: -0.87, stl: 0.917, blk: -0.549, tpm: -0.627, fgImpact: -0.732, ftImpact: -0.802, to: 0.851 } },
          { name: "Trevon Brazile", min: 20, pts: 7, reb: 3, ast: 0, stl: 0, blk: 2, to: 0, tpm: 1, fgm: 3, fga: 4, ftm: 0, fta: 0, composite: 3.9, zScores: { pts: 0.223, reb: 0.034, ast: -0.87, stl: -0.589, blk: 2.61, tpm: 0.379, fgImpact: 1.259, ftImpact: 0, to: 0.851 } },
          { name: "Cam Whitmore", min: 15, pts: 6, reb: 2, ast: 1, stl: 0, blk: 0, to: 0, tpm: 2, fgm: 2, fga: 7, ftm: 0, fta: 0, composite: -0.32, zScores: { pts: 0.009, reb: -0.436, ast: -0.245, stl: -0.589, blk: -0.549, tpm: 1.385, fgImpact: -0.748, ftImpact: 0, to: 0.851 } },
          { name: "DeMar DeRozan", min: 10, pts: 5, reb: 1, ast: 1, stl: 0, blk: 1, to: 0, tpm: 0, fgm: 2, fga: 5, ftm: 1, fta: 1, composite: -0.22, zScores: { pts: -0.204, reb: -0.906, ast: -0.245, stl: -0.589, blk: 1.03, tpm: -0.627, fgImpact: -0.015, ftImpact: 0.481, to: 0.851 } },
          { name: "Lonnie Walker IV", min: 9, pts: 3, reb: 3, ast: 2, stl: 1, blk: 1, to: 0, tpm: 1, fgm: 1, fga: 4, ftm: 0, fta: 0, composite: 2.4, zScores: { pts: -0.631, reb: 0.034, ast: 0.381, stl: 0.917, blk: 1.03, tpm: 0.379, fgImpact: -0.557, ftImpact: 0, to: 0.851 } },
          { name: "Dane Goodwin", min: 3, pts: 0, reb: 1, ast: 0, stl: 0, blk: 0, to: 0, tpm: 0, fgm: 0, fga: 0, ftm: 0, fta: 0, composite: -3.96, zScores: { pts: -1.271, reb: -0.906, ast: -0.87, stl: -0.589, blk: -0.549, tpm: -0.627, fgImpact: 0, ftImpact: 0, to: 0.851 } },
          { name: "Julian Strawther", min: 20, pts: 14, reb: 3, ast: 1, stl: 0, blk: 0, to: 1, tpm: 1, fgm: 6, fga: 13, ftm: 1, fta: 2, composite: 0.47, zScores: { pts: 1.717, reb: 0.034, ast: -0.245, stl: -0.589, blk: -0.549, tpm: 0.379, fgImpact: 0.687, ftImpact: -0.802, to: -0.161 } },
          { name: "Ryan Nembhard", min: 17, pts: 5, reb: 3, ast: 4, stl: 0, blk: 0, to: 1, tpm: 1, fgm: 2, fga: 4, ftm: 0, fta: 0, composite: 0.89, zScores: { pts: -0.204, reb: 0.034, ast: 1.631, stl: -0.589, blk: -0.549, tpm: 0.379, fgImpact: 0.351, ftImpact: 0, to: -0.161 } }
        ]
      }
    },
      {
      id: "401918010",
      line: "Golden State Warriors 101 @ LA Clippers 104 (Final)",
      completed: true,
      statusText: "Final",
      away: {
        abbr: "GS", name: "Golden State Warriors", score: 101,
        players: [
          { name: "Draymond Green", min: 14, pts: 2, reb: 2, ast: 2, stl: 3, blk: 0, to: 0, tpm: 0, fgm: 0, fga: 1, ftm: 2, fta: 2, composite: 3.3, zScores: { pts: -0.844, reb: -0.436, ast: 0.381, stl: 3.928, blk: -0.549, tpm: -0.627, fgImpact: -0.366, ftImpact: 0.963, to: 0.851 } },
          { name: "Yaxel Lendeborg", min: 19, pts: 4, reb: 9, ast: 3, stl: 0, blk: 1, to: 0, tpm: 1, fgm: 1, fga: 6, ftm: 1, fta: 2, composite: 3.02, zScores: { pts: -0.418, reb: 2.853, ast: 1.006, stl: -0.589, blk: 1.03, tpm: 0.379, fgImpact: -1.289, ftImpact: -0.802, to: 0.851 } },
          { name: "Al Horford", min: 16, pts: 3, reb: 3, ast: 1, stl: 1, blk: 0, to: 2, tpm: 1, fgm: 1, fga: 5, ftm: 0, fta: 0, composite: -2.19, zScores: { pts: -0.631, reb: 0.034, ast: -0.245, stl: 0.917, blk: -0.549, tpm: 0.379, fgImpact: -0.923, ftImpact: 0, to: -1.174 } },
          { name: "Stephen Curry", min: 13, pts: 10, reb: 2, ast: 2, stl: 1, blk: 0, to: 2, tpm: 2, fgm: 3, fga: 4, ftm: 2, fta: 2, composite: 3.61, zScores: { pts: 0.863, reb: -0.436, ast: 0.381, stl: 0.917, blk: -0.549, tpm: 1.385, fgImpact: 1.259, ftImpact: 0.963, to: -1.174 } },
          { name: "Brandin Podziemski", min: 18, pts: 7, reb: 2, ast: 2, stl: 1, blk: 0, to: 1, tpm: 1, fgm: 2, fga: 10, ftm: 2, fta: 4, composite: -2.7, zScores: { pts: 0.223, reb: -0.436, ast: 0.381, stl: 0.917, blk: -0.549, tpm: 0.379, fgImpact: -1.846, ftImpact: -1.605, to: -0.161 } },
          { name: "Georges Niang", min: 12, pts: 4, reb: 2, ast: 0, stl: 0, blk: 0, to: 0, tpm: 0, fgm: 2, fga: 6, ftm: 0, fta: 0, composite: -3.02, zScores: { pts: -0.418, reb: -0.436, ast: -0.87, stl: -0.589, blk: -0.549, tpm: -0.627, fgImpact: -0.381, ftImpact: 0, to: 0.851 } },
          { name: "Graham Ike", min: 16, pts: 11, reb: 5, ast: 1, stl: 2, blk: 1, to: 2, tpm: 0, fgm: 3, fga: 7, ftm: 5, fta: 5, composite: 6.02, zScores: { pts: 1.076, reb: 0.974, ast: -0.245, stl: 2.422, blk: 1.03, tpm: -0.627, fgImpact: 0.16, ftImpact: 2.407, to: -1.174 } },
          { name: "Malevy Leons", min: 10, pts: 8, reb: 2, ast: 1, stl: 1, blk: 0, to: 1, tpm: 0, fgm: 3, fga: 5, ftm: 2, fta: 3, composite: -0.09, zScores: { pts: 0.436, reb: -0.436, ast: -0.245, stl: 0.917, blk: -0.549, tpm: -0.627, fgImpact: 0.893, ftImpact: -0.321, to: -0.161 } },
          { name: "Gui Santos", min: 17, pts: 9, reb: 4, ast: 0, stl: 0, blk: 0, to: 2, tpm: 1, fgm: 3, fga: 7, ftm: 2, fta: 2, composite: -0.53, zScores: { pts: 0.65, reb: 0.504, ast: -0.87, stl: -0.589, blk: -0.549, tpm: 0.379, fgImpact: 0.16, ftImpact: 0.963, to: -1.174 } },
          { name: "Alex Toohey", min: 8, pts: 2, reb: 0, ast: 1, stl: 1, blk: 2, to: 0, tpm: 0, fgm: 1, fga: 2, ftm: 0, fta: 0, composite: 1.46, zScores: { pts: -0.844, reb: -1.375, ast: -0.245, stl: 0.917, blk: 2.61, tpm: -0.627, fgImpact: 0.175, ftImpact: 0, to: 0.851 } },
          { name: "Charles Bassey", min: 16, pts: 12, reb: 8, ast: 1, stl: 2, blk: 0, to: 3, tpm: 0, fgm: 6, fga: 10, ftm: 0, fta: 2, composite: 1.7, zScores: { pts: 1.29, reb: 2.383, ast: -0.245, stl: 2.422, blk: -0.549, tpm: -0.627, fgImpact: 1.785, ftImpact: -2.567, to: -2.187 } },
          { name: "Gary Payton II", min: 12, pts: 6, reb: 0, ast: 1, stl: 2, blk: 0, to: 0, tpm: 0, fgm: 3, fga: 5, ftm: 0, fta: 2, composite: -1.19, zScores: { pts: 0.009, reb: -1.375, ast: -0.245, stl: 2.422, blk: -0.549, tpm: -0.627, fgImpact: 0.893, ftImpact: -2.567, to: 0.851 } },
          { name: "De'Anthony Melton", min: 16, pts: 2, reb: 1, ast: 2, stl: 0, blk: 0, to: 1, tpm: 0, fgm: 1, fga: 4, ftm: 0, fta: 0, composite: -3.85, zScores: { pts: -0.844, reb: -0.906, ast: 0.381, stl: -0.589, blk: -0.549, tpm: -0.627, fgImpact: -0.557, ftImpact: 0, to: -0.161 } },
          { name: "Brandon Williams", min: 16, pts: 11, reb: 2, ast: 3, stl: 1, blk: 0, to: 1, tpm: 0, fgm: 4, fga: 9, ftm: 3, fta: 3, composite: 3.01, zScores: { pts: 1.076, reb: -0.436, ast: 1.006, stl: 0.917, blk: -0.549, tpm: -0.627, fgImpact: 0.336, ftImpact: 1.444, to: -0.161 } },
          { name: "LJ Cryer", min: 3, pts: 1, reb: 0, ast: 0, stl: 0, blk: 0, to: 0, tpm: 0, fgm: 0, fga: 3, ftm: 1, fta: 2, composite: -6.12, zScores: { pts: -1.058, reb: -1.375, ast: -0.87, stl: -0.589, blk: -0.549, tpm: -0.627, fgImpact: -1.099, ftImpact: -0.802, to: 0.851 } },
          { name: "Dalen Terry", min: 11, pts: 5, reb: 5, ast: 2, stl: 0, blk: 0, to: 0, tpm: 0, fgm: 2, fga: 4, ftm: 1, fta: 2, composite: -0.22, zScores: { pts: -0.204, reb: 0.974, ast: 0.381, stl: -0.589, blk: -0.549, tpm: -0.627, fgImpact: 0.351, ftImpact: -0.802, to: 0.851 } },
          { name: "Miles Kelly", min: 7, pts: 2, reb: 0, ast: 1, stl: 0, blk: 0, to: 1, tpm: 0, fgm: 1, fga: 4, ftm: 0, fta: 0, composite: -4.95, zScores: { pts: -0.844, reb: -1.375, ast: -0.245, stl: -0.589, blk: -0.549, tpm: -0.627, fgImpact: -0.557, ftImpact: 0, to: -0.161 } },
          { name: "Will Richard", min: 17, pts: 2, reb: 2, ast: 0, stl: 0, blk: 0, to: 0, tpm: 0, fgm: 1, fga: 3, ftm: 0, fta: 0, composite: -3.25, zScores: { pts: -0.844, reb: -0.436, ast: -0.87, stl: -0.589, blk: -0.549, tpm: -0.627, fgImpact: -0.191, ftImpact: 0, to: 0.851 } }
        ]
      },
      home: {
        abbr: "LAC", name: "LA Clippers", score: 104,
        players: [
          { name: "Derrick Jones Jr.", min: 15, pts: 6, reb: 1, ast: 0, stl: 0, blk: 1, to: 0, tpm: 1, fgm: 2, fga: 6, ftm: 1, fta: 3, composite: -2.56, zScores: { pts: 0.009, reb: -0.906, ast: -0.87, stl: -0.589, blk: 1.03, tpm: 0.379, fgImpact: -0.381, ftImpact: -2.086, to: 0.851 } },
          { name: "Rui Hachimura", min: 15, pts: 21, reb: 5, ast: 0, stl: 0, blk: 1, to: 2, tpm: 4, fgm: 8, fga: 11, ftm: 1, fta: 2, composite: 8.41, zScores: { pts: 3.211, reb: 0.974, ast: -0.87, stl: -0.589, blk: 1.03, tpm: 3.396, fgImpact: 3.235, ftImpact: -0.802, to: -1.174 } },
          { name: "Isaiah Jackson", min: 17, pts: 4, reb: 4, ast: 3, stl: 1, blk: 2, to: 3, tpm: 0, fgm: 2, fga: 3, ftm: 0, fta: 0, composite: 2.52, zScores: { pts: -0.418, reb: 0.504, ast: 1.006, stl: 0.917, blk: 2.61, tpm: -0.627, fgImpact: 0.717, ftImpact: 0, to: -2.187 } },
          { name: "Max Strus", min: 5, pts: 0, reb: 1, ast: 0, stl: 0, blk: 0, to: 0, tpm: 0, fgm: 0, fga: 1, ftm: 0, fta: 0, composite: -4.33, zScores: { pts: -1.271, reb: -0.906, ast: -0.87, stl: -0.589, blk: -0.549, tpm: -0.627, fgImpact: -0.366, ftImpact: 0, to: 0.851 } },
          { name: "Darius Garland", min: 15, pts: 15, reb: 3, ast: 6, stl: 0, blk: 0, to: 1, tpm: 3, fgm: 4, fga: 4, ftm: 4, fta: 5, composite: 8.75, zScores: { pts: 1.93, reb: 0.034, ast: 2.882, stl: -0.589, blk: -0.549, tpm: 2.391, fgImpact: 2.167, ftImpact: 0.642, to: -0.161 } },
          { name: "Baba Miller", min: 20, pts: 9, reb: 6, ast: 0, stl: 0, blk: 0, to: 1, tpm: 0, fgm: 2, fga: 5, ftm: 5, fta: 6, composite: 0.4, zScores: { pts: 0.65, reb: 1.443, ast: -0.87, stl: -0.589, blk: -0.549, tpm: -0.627, fgImpact: -0.015, ftImpact: 1.123, to: -0.161 } },
          { name: "Nick Martinelli", min: 24, pts: 5, reb: 2, ast: 1, stl: 0, blk: 0, to: 2, tpm: 1, fgm: 2, fga: 6, ftm: 0, fta: 0, composite: -3.2, zScores: { pts: -0.204, reb: -0.436, ast: -0.245, stl: -0.589, blk: -0.549, tpm: 0.379, fgImpact: -0.381, ftImpact: 0, to: -1.174 } },
          { name: "Brook Lopez", min: 7, pts: 1, reb: 3, ast: 0, stl: 0, blk: 0, to: 1, tpm: 0, fgm: 0, fga: 4, ftm: 1, fta: 2, composite: -6.09, zScores: { pts: -1.058, reb: 0.034, ast: -0.87, stl: -0.589, blk: -0.549, tpm: -0.627, fgImpact: -1.465, ftImpact: -0.802, to: -0.161 } },
          { name: "Kris Dunn", min: 6, pts: 3, reb: 1, ast: 0, stl: 0, blk: 1, to: 0, tpm: 1, fgm: 1, fga: 2, ftm: 0, fta: 0, composite: -0.56, zScores: { pts: -0.631, reb: -0.906, ast: -0.87, stl: -0.589, blk: 1.03, tpm: 0.379, fgImpact: 0.175, ftImpact: 0, to: 0.851 } },
          { name: "Jalen Pickett", min: 14, pts: 4, reb: 2, ast: 0, stl: 0, blk: 0, to: 2, tpm: 0, fgm: 2, fga: 4, ftm: 0, fta: 0, composite: -4.31, zScores: { pts: -0.418, reb: -0.436, ast: -0.87, stl: -0.589, blk: -0.549, tpm: -0.627, fgImpact: 0.351, ftImpact: 0, to: -1.174 } },
          { name: "Blake Wesley", min: 18, pts: 8, reb: 3, ast: 1, stl: 1, blk: 1, to: 1, tpm: 0, fgm: 3, fga: 5, ftm: 2, fta: 3, composite: 1.96, zScores: { pts: 0.436, reb: 0.034, ast: -0.245, stl: 0.917, blk: 1.03, tpm: -0.627, fgImpact: 0.893, ftImpact: -0.321, to: -0.161 } },
          { name: "Cam Christie", min: 28, pts: 8, reb: 8, ast: 3, stl: 0, blk: 0, to: 5, tpm: 0, fgm: 2, fga: 8, ftm: 4, fta: 4, composite: -1.34, zScores: { pts: 0.436, reb: 2.383, ast: 1.006, stl: -0.589, blk: -0.549, tpm: -0.627, fgImpact: -1.114, ftImpact: 1.925, to: -4.213 } },
          { name: "Fletcher Loyer", min: 7, pts: 0, reb: 1, ast: 0, stl: 0, blk: 0, to: 0, tpm: 0, fgm: 0, fga: 1, ftm: 0, fta: 0, composite: -4.33, zScores: { pts: -1.271, reb: -0.906, ast: -0.87, stl: -0.589, blk: -0.549, tpm: -0.627, fgImpact: -0.366, ftImpact: 0, to: 0.851 } },
          { name: "Gradey Dick", min: 16, pts: 4, reb: 6, ast: 1, stl: 0, blk: 0, to: 1, tpm: 0, fgm: 1, fga: 5, ftm: 2, fta: 2, composite: -1.11, zScores: { pts: -0.418, reb: 1.443, ast: -0.245, stl: -0.589, blk: -0.549, tpm: -0.627, fgImpact: -0.923, ftImpact: 0.963, to: -0.161 } },
          { name: "Yuki Kawamura", min: 4, pts: 1, reb: 0, ast: 0, stl: 0, blk: 0, to: 2, tpm: 0, fgm: 0, fga: 0, ftm: 1, fta: 2, composite: -7.05, zScores: { pts: -1.058, reb: -1.375, ast: -0.87, stl: -0.589, blk: -0.549, tpm: -0.627, fgImpact: 0, ftImpact: -0.802, to: -1.174 } },
          { name: "Keaton Wagler", min: 30, pts: 15, reb: 6, ast: 3, stl: 2, blk: 1, to: 0, tpm: 1, fgm: 3, fga: 15, ftm: 8, fta: 9, composite: 8.86, zScores: { pts: 1.93, reb: 1.443, ast: 1.006, stl: 2.422, blk: 1.03, tpm: 0.379, fgImpact: -2.77, ftImpact: 2.567, to: 0.851 } }
        ]
      }
    }
    ]
  },
    "2026-10-05": {
    games: [
      {
      id: "401898388",
      line: "Memphis Grizzlies 132 @ Atlanta Hawks 123 (Final)",
      completed: true,
      statusText: "Final",
      away: {
        abbr: "MEM", name: "Memphis Grizzlies", score: 132,
        players: [
          { name: "Cedric Coward", min: 18, pts: 9, reb: 5, ast: 4, stl: 1, blk: 0, to: 2, tpm: 1, fgm: 3, fga: 6, ftm: 2, fta: 2, composite: 3.65, zScores: { pts: 0.421, reb: 0.898, ast: 1.797, stl: 0.429, blk: -0.486, tpm: 0.196, fgImpact: 0.325, ftImpact: 0.789, to: -0.721 } },
          { name: "Cameron Boozer", min: 18, pts: 11, reb: 5, ast: 4, stl: 2, blk: 0, to: 1, tpm: 0, fgm: 5, fga: 9, ftm: 1, fta: 3, composite: 3.4, zScores: { pts: 0.83, reb: 0.898, ast: 1.797, stl: 1.595, blk: -0.486, tpm: -0.836, fgImpact: 0.965, ftImpact: -1.444, to: 0.084 } },
          { name: "Jaylen Wells", min: 17, pts: 12, reb: 0, ast: 0, stl: 1, blk: 0, to: 0, tpm: 4, fgm: 4, fga: 7, ftm: 0, fta: 0, composite: 3.87, zScores: { pts: 1.035, reb: -1.136, ast: -1.013, stl: 0.429, blk: -0.486, tpm: 3.292, fgImpact: 0.857, ftImpact: 0, to: 0.889 } },
          { name: "Quinten Post", min: 12, pts: 8, reb: 4, ast: 0, stl: 0, blk: 0, to: 0, tpm: 2, fgm: 3, fga: 6, ftm: 0, fta: 0, composite: 0.92, zScores: { pts: 0.217, reb: 0.492, ast: -1.013, stl: -0.737, blk: -0.486, tpm: 1.228, fgImpact: 0.325, ftImpact: 0, to: 0.889 } },
          { name: "Ty Jerome", min: 15, pts: 12, reb: 0, ast: 5, stl: 0, blk: 1, to: 3, tpm: 1, fgm: 4, fga: 8, ftm: 3, fta: 3, composite: 3.22, zScores: { pts: 1.035, reb: -1.136, ast: 2.5, stl: -0.737, blk: 1.275, tpm: 0.196, fgImpact: 0.433, ftImpact: 1.183, to: -1.527 } },
          { name: "Jerami Grant", min: 14, pts: 10, reb: 4, ast: 2, stl: 0, blk: 0, to: 0, tpm: 1, fgm: 2, fga: 3, ftm: 5, fta: 6, composite: 3.07, zScores: { pts: 0.626, reb: 0.492, ast: 0.392, stl: -0.737, blk: -0.486, tpm: 0.196, fgImpact: 0.64, ftImpact: 1.053, to: 0.889 } },
          { name: "Kris Murray", min: 13, pts: 3, reb: 1, ast: 0, stl: 0, blk: 0, to: 0, tpm: 0, fgm: 1, fga: 3, ftm: 1, fta: 2, composite: -4.56, zScores: { pts: -0.805, reb: -0.729, ast: -1.013, stl: -0.737, blk: -0.486, tpm: -0.836, fgImpact: -0.315, ftImpact: -0.525, to: 0.889 } },
          { name: "Olivier-Maxence Prosper", min: 11, pts: 1, reb: 1, ast: 1, stl: 2, blk: 0, to: 1, tpm: 0, fgm: 0, fga: 1, ftm: 1, fta: 2, composite: -2.84, zScores: { pts: -1.214, reb: -0.729, ast: -0.31, stl: 1.595, blk: -0.486, tpm: -0.836, fgImpact: -0.424, ftImpact: -0.525, to: 0.084 } },
          { name: "Taylor Hendricks", min: 19, pts: 7, reb: 6, ast: 1, stl: 3, blk: 1, to: 2, tpm: 0, fgm: 3, fga: 5, ftm: 1, fta: 2, composite: 3.71, zScores: { pts: 0.013, reb: 1.305, ast: -0.31, stl: 2.761, blk: 1.275, tpm: -0.836, fgImpact: 0.749, ftImpact: -0.525, to: -0.721 } },
          { name: "GG Jackson", min: 16, pts: 14, reb: 2, ast: 1, stl: 1, blk: 0, to: 0, tpm: 2, fgm: 5, fga: 7, ftm: 2, fta: 3, composite: 4.55, zScores: { pts: 1.443, reb: -0.322, ast: -0.31, stl: 0.429, blk: -0.486, tpm: 1.228, fgImpact: 1.812, ftImpact: -0.13, to: 0.889 } },
          { name: "Karim Lopez", min: 8, pts: 2, reb: 1, ast: 0, stl: 2, blk: 1, to: 0, tpm: 0, fgm: 1, fga: 2, ftm: 0, fta: 0, composite: 0.28, zScores: { pts: -1.009, reb: -0.729, ast: -1.013, stl: 1.595, blk: 1.275, tpm: -0.836, fgImpact: 0.108, ftImpact: 0, to: 0.889 } },
          { name: "Isaiah Stewart", min: 2, pts: 0, reb: 1, ast: 0, stl: 0, blk: 0, to: 0, tpm: 0, fgm: 0, fga: 0, ftm: 0, fta: 0, composite: -4.33, zScores: { pts: -1.418, reb: -0.729, ast: -1.013, stl: -0.737, blk: -0.486, tpm: -0.836, fgImpact: 0, ftImpact: 0, to: 0.889 } },
          { name: "Carson Cooper", min: 15, pts: 8, reb: 4, ast: 1, stl: 0, blk: 0, to: 0, tpm: 1, fgm: 2, fga: 3, ftm: 3, fta: 4, composite: 1.17, zScores: { pts: 0.217, reb: 0.492, ast: -0.31, stl: -0.737, blk: -0.486, tpm: 0.196, fgImpact: 0.64, ftImpact: 0.264, to: 0.889 } },
          { name: "Scotty Pippen Jr.", min: 16, pts: 10, reb: 0, ast: 4, stl: 1, blk: 0, to: 2, tpm: 2, fgm: 3, fga: 5, ftm: 2, fta: 2, composite: 3.27, zScores: { pts: 0.626, reb: -1.136, ast: 1.797, stl: 0.429, blk: -0.486, tpm: 1.228, fgImpact: 0.749, ftImpact: 0.789, to: -0.721 } },
          { name: "Cam Spencer", min: 14, pts: 8, reb: 4, ast: 2, stl: 0, blk: 0, to: 3, tpm: 2, fgm: 2, fga: 3, ftm: 2, fta: 2, composite: 1.01, zScores: { pts: 0.217, reb: 0.492, ast: 0.392, stl: -0.737, blk: -0.486, tpm: 1.228, fgImpact: 0.64, ftImpact: 0.789, to: -1.527 } },
          { name: "Jahmai Mashack", min: 8, pts: 2, reb: 1, ast: 1, stl: 0, blk: 0, to: 1, tpm: 0, fgm: 1, fga: 1, ftm: 0, fta: 0, composite: -3.49, zScores: { pts: -1.009, reb: -0.729, ast: -0.31, stl: -0.737, blk: -0.486, tpm: -0.836, fgImpact: 0.532, ftImpact: 0, to: 0.084 } },
          { name: "Javon Small", min: 13, pts: 8, reb: 1, ast: 4, stl: 0, blk: 0, to: 1, tpm: 1, fgm: 2, fga: 9, ftm: 3, fta: 4, composite: -1.29, zScores: { pts: 0.217, reb: -0.729, ast: 1.797, stl: -0.737, blk: -0.486, tpm: 0.196, fgImpact: -1.901, ftImpact: 0.264, to: 0.084 } },
          { name: "Walter Clayton Jr.", min: 13, pts: 7, reb: 1, ast: 2, stl: 0, blk: 0, to: 2, tpm: 1, fgm: 2, fga: 5, ftm: 2, fta: 2, composite: -1.49, zScores: { pts: 0.013, reb: -0.729, ast: 0.392, stl: -0.737, blk: -0.486, tpm: 0.196, fgImpact: -0.207, ftImpact: 0.789, to: -0.721 } }
        ]
      },
      home: {
        abbr: "ATL", name: "Atlanta Hawks", score: 123,
        players: [
          { name: "Onyeka Okongwu", min: 14, pts: 8, reb: 4, ast: 2, stl: 0, blk: 1, to: 1, tpm: 1, fgm: 3, fga: 4, ftm: 1, fta: 2, composite: 2.57, zScores: { pts: 0.217, reb: 0.492, ast: 0.392, stl: -0.737, blk: 1.275, tpm: 0.196, fgImpact: 1.172, ftImpact: -0.525, to: 0.084 } },
          { name: "Jalen Johnson", min: 18, pts: 8, reb: 5, ast: 3, stl: 1, blk: 0, to: 2, tpm: 0, fgm: 1, fga: 7, ftm: 6, fta: 6, composite: 0.95, zScores: { pts: 0.217, reb: 0.898, ast: 1.095, stl: 0.429, blk: -0.486, tpm: -0.836, fgImpact: -2.009, ftImpact: 2.367, to: -0.721 } },
          { name: "Nickeil Alexander-Walker", min: 16, pts: 14, reb: 1, ast: 0, stl: 1, blk: 0, to: 0, tpm: 1, fgm: 6, fga: 9, ftm: 1, fta: 1, composite: 3.05, zScores: { pts: 1.443, reb: -0.729, ast: -1.013, stl: 0.429, blk: -0.486, tpm: 0.196, fgImpact: 1.921, ftImpact: 0.394, to: 0.889 } },
          { name: "Dyson Daniels", min: 18, pts: 6, reb: 4, ast: 2, stl: 0, blk: 0, to: 1, tpm: 0, fgm: 2, fga: 6, ftm: 2, fta: 5, composite: -3.88, zScores: { pts: -0.192, reb: 0.492, ast: 0.392, stl: -0.737, blk: -0.486, tpm: -0.836, fgImpact: -0.63, ftImpact: -1.969, to: 0.084 } },
          { name: "Kingston Flemings", min: 25, pts: 11, reb: 0, ast: 2, stl: 0, blk: 0, to: 3, tpm: 2, fgm: 4, fga: 11, ftm: 1, fta: 4, composite: -4.64, zScores: { pts: 0.83, reb: -1.136, ast: 0.392, stl: -0.737, blk: -0.486, tpm: 1.228, fgImpact: -0.837, ftImpact: -2.363, to: -1.527 } },
          { name: "Dorian Finney-Smith", min: 8, pts: 3, reb: 0, ast: 1, stl: 1, blk: 0, to: 1, tpm: 1, fgm: 1, fga: 3, ftm: 0, fta: 0, composite: -2.34, zScores: { pts: -0.805, reb: -1.136, ast: -0.31, stl: 0.429, blk: -0.486, tpm: 0.196, fgImpact: -0.315, ftImpact: 0, to: 0.084 } },
          { name: "Corey Kispert", min: 20, pts: 19, reb: 4, ast: 2, stl: 1, blk: 0, to: 1, tpm: 4, fgm: 7, fga: 11, ftm: 1, fta: 2, composite: 8.17, zScores: { pts: 2.465, reb: 0.492, ast: 0.392, stl: 0.429, blk: -0.486, tpm: 3.292, fgImpact: 2.029, ftImpact: -0.525, to: 0.084 } },
          { name: "Jalen Wilson", min: 15, pts: 12, reb: 0, ast: 0, stl: 1, blk: 0, to: 0, tpm: 2, fgm: 3, fga: 6, ftm: 4, fta: 5, composite: 1.93, zScores: { pts: 1.035, reb: -1.136, ast: -1.013, stl: 0.429, blk: -0.486, tpm: 1.228, fgImpact: 0.325, ftImpact: 0.659, to: 0.889 } },
          { name: "Cameron Corhen", min: 3, pts: 0, reb: 2, ast: 0, stl: 0, blk: 0, to: 0, tpm: 0, fgm: 0, fga: 1, ftm: 0, fta: 0, composite: -4.35, zScores: { pts: -1.418, reb: -0.322, ast: -1.013, stl: -0.737, blk: -0.486, tpm: -0.836, fgImpact: -0.424, ftImpact: 0, to: 0.889 } },
          { name: "Asa Newell", min: 22, pts: 12, reb: 12, ast: 2, stl: 2, blk: 0, to: 2, tpm: 0, fgm: 5, fga: 9, ftm: 2, fta: 2, composite: 6.48, zScores: { pts: 1.035, reb: 3.746, ast: 0.392, stl: 1.595, blk: -0.486, tpm: -0.836, fgImpact: 0.965, ftImpact: 0.789, to: -0.721 } },
          { name: "Zuby Ejiofor", min: 14, pts: 5, reb: 3, ast: 2, stl: 0, blk: 0, to: 0, tpm: 0, fgm: 2, fga: 5, ftm: 1, fta: 2, composite: -1.82, zScores: { pts: -0.396, reb: 0.085, ast: 0.392, stl: -0.737, blk: -0.486, tpm: -0.836, fgImpact: -0.207, ftImpact: -0.525, to: 0.889 } },
          { name: "Jock Landale", min: 16, pts: 4, reb: 6, ast: 3, stl: 0, blk: 0, to: 0, tpm: 0, fgm: 1, fga: 5, ftm: 2, fta: 2, composite: 0.26, zScores: { pts: -0.601, reb: 1.305, ast: 1.095, stl: -0.737, blk: -0.486, tpm: -0.836, fgImpact: -1.162, ftImpact: 0.789, to: 0.889 } },
          { name: "Aaron Wiggins", min: 11, pts: 7, reb: 0, ast: 0, stl: 0, blk: 0, to: 0, tpm: 1, fgm: 2, fga: 4, ftm: 2, fta: 2, composite: -1.27, zScores: { pts: 0.013, reb: -1.136, ast: -1.013, stl: -0.737, blk: -0.486, tpm: 0.196, fgImpact: 0.217, ftImpact: 0.789, to: 0.889 } },
          { name: "RayJ Dennis", min: 18, pts: 12, reb: 3, ast: 3, stl: 2, blk: 0, to: 3, tpm: 2, fgm: 5, fga: 10, ftm: 0, fta: 0, composite: 3.57, zScores: { pts: 1.035, reb: 0.085, ast: 1.095, stl: 1.595, blk: -0.486, tpm: 1.228, fgImpact: 0.542, ftImpact: 0, to: -1.527 } },
          { name: "Keshon Gilbert", min: 15, pts: 2, reb: 1, ast: 2, stl: 1, blk: 0, to: 3, tpm: 0, fgm: 1, fga: 3, ftm: 0, fta: 0, composite: -4.08, zScores: { pts: -1.009, reb: -0.729, ast: 0.392, stl: 0.429, blk: -0.486, tpm: -0.836, fgImpact: -0.315, ftImpact: 0, to: -1.527 } },
          { name: "Kobe Johnson", min: 8, pts: 0, reb: 0, ast: 1, stl: 1, blk: 0, to: 0, tpm: 0, fgm: 0, fga: 0, ftm: 0, fta: 0, composite: -2.87, zScores: { pts: -1.418, reb: -1.136, ast: -0.31, stl: 0.429, blk: -0.486, tpm: -0.836, fgImpact: 0, ftImpact: 0, to: 0.889 } }
        ]
      }
    },
      {
      id: "401908947",
      line: "Phoenix Suns 107 @ Detroit Pistons 109 (Final)",
      completed: true,
      statusText: "Final",
      away: {
        abbr: "PHX", name: "Phoenix Suns", score: 107,
        players: [
          { name: "Dillon Brooks", min: 16, pts: 11, reb: 2, ast: 0, stl: 0, blk: 0, to: 0, tpm: 2, fgm: 4, fga: 7, ftm: 1, fta: 2, composite: 0.72, zScores: { pts: 0.83, reb: -0.322, ast: -1.013, stl: -0.737, blk: -0.486, tpm: 1.228, fgImpact: 0.857, ftImpact: -0.525, to: 0.889 } },
          { name: "Miles Bridges", min: 14, pts: 8, reb: 5, ast: 4, stl: 1, blk: 0, to: 1, tpm: 1, fgm: 3, fga: 8, ftm: 1, fta: 1, composite: 3.01, zScores: { pts: 0.217, reb: 0.898, ast: 1.797, stl: 0.429, blk: -0.486, tpm: 0.196, fgImpact: -0.522, ftImpact: 0.394, to: 0.084 } },
          { name: "Oso Ighodaro", min: 14, pts: 3, reb: 5, ast: 2, stl: 1, blk: 0, to: 1, tpm: 0, fgm: 1, fga: 1, ftm: 1, fta: 2, composite: -0.32, zScores: { pts: -0.805, reb: 0.898, ast: 0.392, stl: 0.429, blk: -0.486, tpm: -0.836, fgImpact: 0.532, ftImpact: -0.525, to: 0.084 } },
          { name: "Devin Booker", min: 16, pts: 13, reb: 3, ast: 3, stl: 0, blk: 0, to: 2, tpm: 1, fgm: 4, fga: 7, ftm: 4, fta: 4, composite: 3.11, zScores: { pts: 1.239, reb: 0.085, ast: 1.095, stl: -0.737, blk: -0.486, tpm: 0.196, fgImpact: 0.857, ftImpact: 1.578, to: -0.721 } },
          { name: "Jalen Green", min: 15, pts: 11, reb: 2, ast: 1, stl: 0, blk: 0, to: 1, tpm: 1, fgm: 3, fga: 6, ftm: 4, fta: 6, composite: -0.68, zScores: { pts: 0.83, reb: -0.322, ast: -0.31, stl: -0.737, blk: -0.486, tpm: 0.196, fgImpact: 0.325, ftImpact: -0.26, to: 0.084 } },
          { name: "Haywood Highsmith", min: 16, pts: 2, reb: 4, ast: 0, stl: 0, blk: 0, to: 5, tpm: 0, fgm: 1, fga: 1, ftm: 0, fta: 0, composite: -6.2, zScores: { pts: -1.009, reb: 0.492, ast: -1.013, stl: -0.737, blk: -0.486, tpm: -0.836, fgImpact: 0.532, ftImpact: 0, to: -3.138 } },
          { name: "Ryan Dunn", min: 16, pts: 2, reb: 2, ast: 1, stl: 1, blk: 0, to: 3, tpm: 0, fgm: 1, fga: 3, ftm: 0, fta: 0, composite: -4.38, zScores: { pts: -1.009, reb: -0.322, ast: -0.31, stl: 0.429, blk: -0.486, tpm: -0.836, fgImpact: -0.315, ftImpact: 0, to: -1.527 } },
          { name: "Koa Peat", min: 12, pts: 4, reb: 4, ast: 0, stl: 0, blk: 0, to: 2, tpm: 0, fgm: 2, fga: 5, ftm: 0, fta: 3, composite: -6.87, zScores: { pts: -0.601, reb: 0.492, ast: -1.013, stl: -0.737, blk: -0.486, tpm: -0.836, fgImpact: -0.207, ftImpact: -2.758, to: -0.721 } },
          { name: "Rasheer Fleming", min: 19, pts: 3, reb: 5, ast: 1, stl: 2, blk: 0, to: 1, tpm: 1, fgm: 1, fga: 4, ftm: 0, fta: 2, composite: -1.4, zScores: { pts: -0.805, reb: 0.898, ast: -0.31, stl: 1.595, blk: -0.486, tpm: 0.196, fgImpact: -0.739, ftImpact: -1.838, to: 0.084 } },
          { name: "Duop Reath", min: 9, pts: 2, reb: 1, ast: 0, stl: 0, blk: 0, to: 1, tpm: 0, fgm: 0, fga: 1, ftm: 2, fta: 2, composite: -4.36, zScores: { pts: -1.009, reb: -0.729, ast: -1.013, stl: -0.737, blk: -0.486, tpm: -0.836, fgImpact: -0.424, ftImpact: 0.789, to: 0.084 } },
          { name: "Khaman Maluach", min: 17, pts: 6, reb: 2, ast: 0, stl: 0, blk: 1, to: 0, tpm: 0, fgm: 3, fga: 5, ftm: 0, fta: 3, composite: -2.94, zScores: { pts: -0.192, reb: -0.322, ast: -1.013, stl: -0.737, blk: 1.275, tpm: -0.836, fgImpact: 0.749, ftImpact: -2.758, to: 0.889 } },
          { name: "Luke Kennard", min: 15, pts: 9, reb: 2, ast: 2, stl: 0, blk: 0, to: 2, tpm: 1, fgm: 3, fga: 5, ftm: 2, fta: 2, composite: 0.28, zScores: { pts: 0.421, reb: -0.322, ast: 0.392, stl: -0.737, blk: -0.486, tpm: 0.196, fgImpact: 0.749, ftImpact: 0.789, to: -0.721 } },
          { name: "Jordan Goodwin", min: 11, pts: 7, reb: 6, ast: 1, stl: 3, blk: 0, to: 1, tpm: 1, fgm: 3, fga: 6, ftm: 0, fta: 1, composite: 2.97, zScores: { pts: 0.013, reb: 1.305, ast: -0.31, stl: 2.761, blk: -0.486, tpm: 0.196, fgImpact: 0.325, ftImpact: -0.919, to: 0.084 } },
          { name: "Collin Gillespie", min: 17, pts: 8, reb: 1, ast: 1, stl: 1, blk: 1, to: 3, tpm: 2, fgm: 3, fga: 3, ftm: 0, fta: 0, composite: 2.18, zScores: { pts: 0.217, reb: -0.729, ast: -0.31, stl: 0.429, blk: 1.275, tpm: 1.228, fgImpact: 1.596, ftImpact: 0, to: -1.527 } },
          { name: "Jamaree Bouyea", min: 17, pts: 9, reb: 2, ast: 2, stl: 1, blk: 0, to: 4, tpm: 2, fgm: 3, fga: 9, ftm: 1, fta: 3, composite: -3.06, zScores: { pts: 0.421, reb: -0.322, ast: 0.392, stl: 0.429, blk: -0.486, tpm: 1.228, fgImpact: -0.945, ftImpact: -1.444, to: -2.332 } },
          { name: "Kennedy Chandler", min: 9, pts: 8, reb: 1, ast: 0, stl: 1, blk: 0, to: 0, tpm: 2, fgm: 3, fga: 5, ftm: 0, fta: 0, composite: 1.28, zScores: { pts: 0.217, reb: -0.729, ast: -1.013, stl: 0.429, blk: -0.486, tpm: 1.228, fgImpact: 0.749, ftImpact: 0, to: 0.889 } },
          { name: "Pat Spencer", min: 7, pts: 1, reb: 0, ast: 1, stl: 1, blk: 0, to: 2, tpm: 0, fgm: 0, fga: 2, ftm: 1, fta: 2, composite: -5.65, zScores: { pts: -1.214, reb: -1.136, ast: -0.31, stl: 0.429, blk: -0.486, tpm: -0.836, fgImpact: -0.847, ftImpact: -0.525, to: -0.721 } }
        ]
      },
      home: {
        abbr: "DET", name: "Detroit Pistons", score: 109,
        players: [
          { name: "Duncan Robinson", min: 13, pts: 9, reb: 0, ast: 1, stl: 0, blk: 0, to: 3, tpm: 3, fgm: 3, fga: 4, ftm: 0, fta: 0, composite: -0.34, zScores: { pts: 0.421, reb: -1.136, ast: -0.31, stl: -0.737, blk: -0.486, tpm: 2.26, fgImpact: 1.172, ftImpact: 0, to: -1.527 } },
          { name: "John Collins", min: 17, pts: 10, reb: 3, ast: 0, stl: 2, blk: 0, to: 2, tpm: 0, fgm: 5, fga: 7, ftm: 0, fta: 0, composite: 1.06, zScores: { pts: 0.626, reb: 0.085, ast: -1.013, stl: 1.595, blk: -0.486, tpm: -0.836, fgImpact: 1.812, ftImpact: 0, to: -0.721 } },
          { name: "Paul Reed", min: 21, pts: 10, reb: 7, ast: 3, stl: 1, blk: 1, to: 1, tpm: 0, fgm: 2, fga: 6, ftm: 6, fta: 6, composite: 6.12, zScores: { pts: 0.626, reb: 1.712, ast: 1.095, stl: 0.429, blk: 1.275, tpm: -0.836, fgImpact: -0.63, ftImpact: 2.367, to: 0.084 } },
          { name: "Cade Cunningham", min: 16, pts: 10, reb: 2, ast: 1, stl: 1, blk: 0, to: 1, tpm: 2, fgm: 3, fga: 8, ftm: 2, fta: 3, composite: 0.6, zScores: { pts: 0.626, reb: -0.322, ast: -0.31, stl: 0.429, blk: -0.486, tpm: 1.228, fgImpact: -0.522, ftImpact: -0.13, to: 0.084 } },
          { name: "Ausar Thompson", min: 18, pts: 10, reb: 2, ast: 2, stl: 3, blk: 1, to: 1, tpm: 0, fgm: 5, fga: 8, ftm: 0, fta: 1, composite: 4.45, zScores: { pts: 0.626, reb: -0.322, ast: 0.392, stl: 2.761, blk: 1.275, tpm: -0.836, fgImpact: 1.389, ftImpact: -0.919, to: 0.084 } },
          { name: "Taurean Prince", min: 11, pts: 3, reb: 1, ast: 0, stl: 1, blk: 0, to: 1, tpm: 1, fgm: 1, fga: 3, ftm: 0, fta: 0, composite: -2.64, zScores: { pts: -0.805, reb: -0.729, ast: -1.013, stl: 0.429, blk: -0.486, tpm: 0.196, fgImpact: -0.315, ftImpact: 0, to: 0.084 } },
          { name: "Tolu Smith", min: 16, pts: 1, reb: 5, ast: 1, stl: 0, blk: 0, to: 0, tpm: 0, fgm: 0, fga: 0, ftm: 1, fta: 6, composite: -6, zScores: { pts: -1.214, reb: 0.898, ast: -0.31, stl: -0.737, blk: -0.486, tpm: -0.836, fgImpact: 0, ftImpact: -4.201, to: 0.889 } },
          { name: "Brice Williams", min: 6, pts: 3, reb: 0, ast: 1, stl: 0, blk: 0, to: 0, tpm: 0, fgm: 0, fga: 1, ftm: 3, fta: 3, composite: -2.66, zScores: { pts: -0.805, reb: -1.136, ast: -0.31, stl: -0.737, blk: -0.486, tpm: -0.836, fgImpact: -0.424, ftImpact: 1.183, to: 0.889 } },
          { name: "Ronald Holland II", min: 24, pts: 14, reb: 4, ast: 1, stl: 5, blk: 2, to: 3, tpm: 1, fgm: 4, fga: 12, ftm: 5, fta: 8, composite: 6.38, zScores: { pts: 1.443, reb: 0.492, ast: -0.31, stl: 5.093, blk: 3.035, tpm: 0.196, fgImpact: -1.261, ftImpact: -0.785, to: -1.527 } },
          { name: "Isaac Jones", min: 7, pts: 5, reb: 2, ast: 0, stl: 1, blk: 2, to: 2, tpm: 0, fgm: 2, fga: 2, ftm: 1, fta: 2, composite: 0.72, zScores: { pts: -0.396, reb: -0.322, ast: -1.013, stl: 0.429, blk: 3.035, tpm: -0.836, fgImpact: 1.064, ftImpact: -0.525, to: -0.721 } },
          { name: "Javonte Green", min: 13, pts: 6, reb: 1, ast: 1, stl: 1, blk: 1, to: 1, tpm: 2, fgm: 2, fga: 3, ftm: 0, fta: 0, composite: 2.43, zScores: { pts: -0.192, reb: -0.729, ast: -0.31, stl: 0.429, blk: 1.275, tpm: 1.228, fgImpact: 0.64, ftImpact: 0, to: 0.084 } },
          { name: "Kevin Huerter", min: 18, pts: 4, reb: 0, ast: 0, stl: 2, blk: 1, to: 1, tpm: 0, fgm: 0, fga: 2, ftm: 4, fta: 5, composite: -0.82, zScores: { pts: -0.601, reb: -1.136, ast: -1.013, stl: 1.595, blk: 1.275, tpm: -0.836, fgImpact: -0.847, ftImpact: 0.659, to: 0.084 } },
          { name: "Isaiah Joe", min: 18, pts: 7, reb: 2, ast: 1, stl: 1, blk: 0, to: 1, tpm: 1, fgm: 2, fga: 8, ftm: 2, fta: 3, composite: -2, zScores: { pts: 0.013, reb: -0.322, ast: -0.31, stl: 0.429, blk: -0.486, tpm: 0.196, fgImpact: -1.477, ftImpact: -0.13, to: 0.084 } },
          { name: "Chaz Lanier", min: 14, pts: 5, reb: 3, ast: 0, stl: 2, blk: 0, to: 2, tpm: 1, fgm: 1, fga: 4, ftm: 2, fta: 4, composite: -2.53, zScores: { pts: -0.396, reb: 0.085, ast: -1.013, stl: 1.595, blk: -0.486, tpm: 0.196, fgImpact: -0.739, ftImpact: -1.049, to: -0.721 } },
          { name: "Daniss Jenkins", min: 18, pts: 5, reb: 2, ast: 4, stl: 0, blk: 0, to: 1, tpm: 1, fgm: 2, fga: 7, ftm: 0, fta: 0, composite: -0.92, zScores: { pts: -0.396, reb: -0.322, ast: 1.797, stl: -0.737, blk: -0.486, tpm: 0.196, fgImpact: -1.054, ftImpact: 0, to: 0.084 } },
          { name: "Ebuka Okorie", min: 10, pts: 7, reb: 1, ast: 1, stl: 1, blk: 0, to: 0, tpm: 1, fgm: 3, fga: 4, ftm: 0, fta: 0, composite: 1.17, zScores: { pts: 0.013, reb: -0.729, ast: -0.31, stl: 0.429, blk: -0.486, tpm: 0.196, fgImpact: 1.172, ftImpact: 0, to: 0.889 } }
        ]
      }
    },
      {
      id: "401914101",
      line: "New York Knicks 97 @ Philadelphia 76ers 120 (Final)",
      completed: true,
      statusText: "Final",
      away: {
        abbr: "NY", name: "New York Knicks", score: 97,
        players: [
          { name: "OG Anunoby", min: 14, pts: 12, reb: 6, ast: 0, stl: 0, blk: 0, to: 0, tpm: 0, fgm: 3, fga: 7, ftm: 6, fta: 6, composite: 2.43, zScores: { pts: 1.035, reb: 1.305, ast: -1.013, stl: -0.737, blk: -0.486, tpm: -0.836, fgImpact: -0.098, ftImpact: 2.367, to: 0.889 } },
          { name: "Karl-Anthony Towns", min: 15, pts: 5, reb: 5, ast: 2, stl: 0, blk: 0, to: 2, tpm: 1, fgm: 2, fga: 4, ftm: 0, fta: 0, composite: -0.64, zScores: { pts: -0.396, reb: 0.898, ast: 0.392, stl: -0.737, blk: -0.486, tpm: 0.196, fgImpact: 0.217, ftImpact: 0, to: -0.721 } },
          { name: "Josh Hart", min: 13, pts: 2, reb: 1, ast: 0, stl: 0, blk: 0, to: 1, tpm: 0, fgm: 1, fga: 1, ftm: 0, fta: 0, composite: -4.19, zScores: { pts: -1.009, reb: -0.729, ast: -1.013, stl: -0.737, blk: -0.486, tpm: -0.836, fgImpact: 0.532, ftImpact: 0, to: 0.084 } },
          { name: "Mikal Bridges", min: 15, pts: 3, reb: 3, ast: 3, stl: 0, blk: 0, to: 0, tpm: 0, fgm: 1, fga: 5, ftm: 1, fta: 2, composite: -2.48, zScores: { pts: -0.805, reb: 0.085, ast: 1.095, stl: -0.737, blk: -0.486, tpm: -0.836, fgImpact: -1.162, ftImpact: -0.525, to: 0.889 } },
          { name: "Jalen Brunson", min: 15, pts: 12, reb: 4, ast: 3, stl: 0, blk: 0, to: 0, tpm: 2, fgm: 4, fga: 8, ftm: 2, fta: 2, composite: 4.74, zScores: { pts: 1.035, reb: 0.492, ast: 1.095, stl: -0.737, blk: -0.486, tpm: 1.228, fgImpact: 0.433, ftImpact: 0.789, to: 0.889 } },
          { name: "Drew Eubanks", min: 6, pts: 1, reb: 1, ast: 0, stl: 0, blk: 0, to: 1, tpm: 0, fgm: 0, fga: 0, ftm: 1, fta: 2, composite: -5.45, zScores: { pts: -1.214, reb: -0.729, ast: -1.013, stl: -0.737, blk: -0.486, tpm: -0.836, fgImpact: 0, ftImpact: -0.525, to: 0.084 } },
          { name: "Tyler Nickel", min: 8, pts: 0, reb: 1, ast: 1, stl: 0, blk: 1, to: 0, tpm: 0, fgm: 0, fga: 4, ftm: 0, fta: 0, composite: -3.56, zScores: { pts: -1.418, reb: -0.729, ast: -0.31, stl: -0.737, blk: 1.275, tpm: -0.836, fgImpact: -1.694, ftImpact: 0, to: 0.889 } },
          { name: "Pacome Dadiet", min: 18, pts: 5, reb: 3, ast: 0, stl: 0, blk: 0, to: 0, tpm: 1, fgm: 2, fga: 6, ftm: 0, fta: 0, composite: -2.09, zScores: { pts: -0.396, reb: 0.085, ast: -1.013, stl: -0.737, blk: -0.486, tpm: 0.196, fgImpact: -0.63, ftImpact: 0, to: 0.889 } },
          { name: "Mohamed Diawara", min: 17, pts: 8, reb: 5, ast: 0, stl: 1, blk: 1, to: 2, tpm: 0, fgm: 4, fga: 8, ftm: 0, fta: 0, composite: 0.68, zScores: { pts: 0.217, reb: 0.898, ast: -1.013, stl: 0.429, blk: 1.275, tpm: -0.836, fgImpact: 0.433, ftImpact: 0, to: -0.721 } },
          { name: "Andre Drummond", min: 12, pts: 6, reb: 5, ast: 1, stl: 0, blk: 3, to: 0, tpm: 0, fgm: 2, fga: 5, ftm: 2, fta: 5, composite: 2.33, zScores: { pts: -0.192, reb: 0.898, ast: -0.31, stl: -0.737, blk: 4.796, tpm: -0.836, fgImpact: -0.207, ftImpact: -1.969, to: 0.889 } },
          { name: "Tony Bradley", min: 6, pts: 2, reb: 0, ast: 0, stl: 0, blk: 0, to: 0, tpm: 0, fgm: 1, fga: 1, ftm: 0, fta: 0, composite: -3.8, zScores: { pts: -1.009, reb: -1.136, ast: -1.013, stl: -0.737, blk: -0.486, tpm: -0.836, fgImpact: 0.532, ftImpact: 0, to: 0.889 } },
          { name: "James Wiseman", min: 9, pts: 8, reb: 5, ast: 0, stl: 0, blk: 1, to: 1, tpm: 0, fgm: 3, fga: 4, ftm: 2, fta: 6, composite: -1.83, zScores: { pts: 0.217, reb: 0.898, ast: -1.013, stl: -0.737, blk: 1.275, tpm: -0.836, fgImpact: 1.172, ftImpact: -2.888, to: 0.084 } },
          { name: "Jordan Clarkson", min: 14, pts: 6, reb: 4, ast: 1, stl: 0, blk: 0, to: 2, tpm: 0, fgm: 2, fga: 8, ftm: 2, fta: 4, composite: -5.32, zScores: { pts: -0.192, reb: 0.492, ast: -0.31, stl: -0.737, blk: -0.486, tpm: -0.836, fgImpact: -1.477, ftImpact: -1.049, to: -0.721 } },
          { name: "Landry Shamet", min: 11, pts: 10, reb: 0, ast: 0, stl: 0, blk: 0, to: 0, tpm: 2, fgm: 4, fga: 8, ftm: 0, fta: 0, composite: -0.19, zScores: { pts: 0.626, reb: -1.136, ast: -1.013, stl: -0.737, blk: -0.486, tpm: 1.228, fgImpact: 0.433, ftImpact: 0, to: 0.889 } },
          { name: "Bruce Brown", min: 10, pts: 2, reb: 0, ast: 0, stl: 0, blk: 0, to: 1, tpm: 0, fgm: 1, fga: 3, ftm: 0, fta: 0, composite: -5.45, zScores: { pts: -1.009, reb: -1.136, ast: -1.013, stl: -0.737, blk: -0.486, tpm: -0.836, fgImpact: -0.315, ftImpact: 0, to: 0.084 } },
          { name: "Ochai Agbaji", min: 8, pts: 1, reb: 1, ast: 0, stl: 0, blk: 0, to: 0, tpm: 0, fgm: 0, fga: 3, ftm: 1, fta: 2, composite: -5.92, zScores: { pts: -1.214, reb: -0.729, ast: -1.013, stl: -0.737, blk: -0.486, tpm: -0.836, fgImpact: -1.271, ftImpact: -0.525, to: 0.889 } },
          { name: "Kevin McCullar Jr.", min: 10, pts: 6, reb: 4, ast: 1, stl: 0, blk: 1, to: 2, tpm: 0, fgm: 2, fga: 5, ftm: 2, fta: 2, composite: -0.45, zScores: { pts: -0.192, reb: 0.492, ast: -0.31, stl: -0.737, blk: 1.275, tpm: -0.836, fgImpact: -0.207, ftImpact: 0.789, to: -0.721 } },
          { name: "Miles McBride", min: 12, pts: 0, reb: 1, ast: 3, stl: 0, blk: 0, to: 0, tpm: 0, fgm: 0, fga: 4, ftm: 0, fta: 0, composite: -3.92, zScores: { pts: -1.418, reb: -0.729, ast: 1.095, stl: -0.737, blk: -0.486, tpm: -0.836, fgImpact: -1.694, ftImpact: 0, to: 0.889 } },
          { name: "Tyler Kolek", min: 17, pts: 5, reb: 2, ast: 5, stl: 0, blk: 1, to: 0, tpm: 1, fgm: 2, fga: 5, ftm: 0, fta: 1, composite: 2.28, zScores: { pts: -0.396, reb: -0.322, ast: 2.5, stl: -0.737, blk: 1.275, tpm: 0.196, fgImpact: -0.207, ftImpact: -0.919, to: 0.889 } },
          { name: "Jaden Akins", min: 8, pts: 3, reb: 0, ast: 3, stl: 0, blk: 0, to: 1, tpm: 1, fgm: 1, fga: 2, ftm: 0, fta: 0, composite: -1.68, zScores: { pts: -0.805, reb: -1.136, ast: 1.095, stl: -0.737, blk: -0.486, tpm: 0.196, fgImpact: 0.108, ftImpact: 0, to: 0.084 } }
        ]
      },
      home: {
        abbr: "PHI", name: "Philadelphia 76ers", score: 120,
        players: [
          { name: "Dean Wade", min: 13, pts: 2, reb: 5, ast: 0, stl: 1, blk: 0, to: 0, tpm: 0, fgm: 1, fga: 3, ftm: 0, fta: 0, composite: -1.44, zScores: { pts: -1.009, reb: 0.898, ast: -1.013, stl: 0.429, blk: -0.486, tpm: -0.836, fgImpact: -0.315, ftImpact: 0, to: 0.889 } },
          { name: "Ariel Hukporti", min: 5, pts: 0, reb: 0, ast: 1, stl: 0, blk: 0, to: 0, tpm: 0, fgm: 0, fga: 1, ftm: 0, fta: 0, composite: -4.46, zScores: { pts: -1.418, reb: -1.136, ast: -0.31, stl: -0.737, blk: -0.486, tpm: -0.836, fgImpact: -0.424, ftImpact: 0, to: 0.889 } },
          { name: "Kentavious Caldwell-Pope", min: 13, pts: 7, reb: 2, ast: 2, stl: 1, blk: 0, to: 0, tpm: 1, fgm: 3, fga: 6, ftm: 0, fta: 0, composite: 1.44, zScores: { pts: 0.013, reb: -0.322, ast: 0.392, stl: 0.429, blk: -0.486, tpm: 0.196, fgImpact: 0.325, ftImpact: 0, to: 0.889 } },
          { name: "Jaylen Brown", min: 17, pts: 22, reb: 2, ast: 2, stl: 0, blk: 1, to: 0, tpm: 3, fgm: 8, fga: 13, ftm: 3, fta: 5, composite: 8.32, zScores: { pts: 3.079, reb: -0.322, ast: 0.392, stl: -0.737, blk: 1.275, tpm: 2.26, fgImpact: 2.137, ftImpact: -0.655, to: 0.889 } },
          { name: "VJ Edgecombe", min: 20, pts: 12, reb: 4, ast: 7, stl: 0, blk: 0, to: 0, tpm: 0, fgm: 4, fga: 9, ftm: 4, fta: 5, composite: 4.93, zScores: { pts: 1.035, reb: 0.492, ast: 3.905, stl: -0.737, blk: -0.486, tpm: -0.836, fgImpact: 0.01, ftImpact: 0.659, to: 0.889 } },
          { name: "Jabari Walker", min: 19, pts: 11, reb: 11, ast: 1, stl: 1, blk: 1, to: 1, tpm: 3, fgm: 4, fga: 9, ftm: 0, fta: 0, composite: 7.92, zScores: { pts: 0.83, reb: 3.339, ast: -0.31, stl: 0.429, blk: 1.275, tpm: 2.26, fgImpact: 0.01, ftImpact: 0, to: 0.084 } },
          { name: "Dillon Jones", min: 18, pts: 11, reb: 6, ast: 2, stl: 0, blk: 0, to: 1, tpm: 1, fgm: 3, fga: 6, ftm: 4, fta: 4, composite: 3.49, zScores: { pts: 0.83, reb: 1.305, ast: 0.392, stl: -0.737, blk: -0.486, tpm: 0.196, fgImpact: 0.325, ftImpact: 1.578, to: 0.084 } },
          { name: "Justin Edwards", min: 24, pts: 6, reb: 1, ast: 1, stl: 1, blk: 1, to: 2, tpm: 2, fgm: 2, fga: 5, ftm: 0, fta: 0, composite: 0.77, zScores: { pts: -0.192, reb: -0.729, ast: -0.31, stl: 0.429, blk: 1.275, tpm: 1.228, fgImpact: -0.207, ftImpact: 0, to: -0.721 } },
          { name: "Saint Thomas", min: 15, pts: 11, reb: 10, ast: 1, stl: 1, blk: 0, to: 1, tpm: 0, fgm: 5, fga: 8, ftm: 1, fta: 1, composite: 4.43, zScores: { pts: 0.83, reb: 2.933, ast: -0.31, stl: 0.429, blk: -0.486, tpm: -0.836, fgImpact: 1.389, ftImpact: 0.394, to: 0.084 } },
          { name: "Caleb Love", min: 24, pts: 15, reb: 3, ast: 6, stl: 0, blk: 2, to: 0, tpm: 3, fgm: 4, fga: 10, ftm: 4, fta: 6, composite: 9.71, zScores: { pts: 1.648, reb: 0.085, ast: 3.203, stl: -0.737, blk: 3.035, tpm: 2.26, fgImpact: -0.414, ftImpact: -0.26, to: 0.889 } },
          { name: "Jameer Nelson Jr.", min: 15, pts: 7, reb: 2, ast: 0, stl: 1, blk: 2, to: 2, tpm: 0, fgm: 2, fga: 5, ftm: 3, fta: 3, composite: 1.56, zScores: { pts: 0.013, reb: -0.322, ast: -1.013, stl: 0.429, blk: 3.035, tpm: -0.836, fgImpact: -0.207, ftImpact: 1.183, to: -0.721 } },
          { name: "Duke Miles", min: 9, pts: 4, reb: 1, ast: 1, stl: 0, blk: 0, to: 0, tpm: 1, fgm: 1, fga: 5, ftm: 1, fta: 2, composite: -3.46, zScores: { pts: -0.601, reb: -0.729, ast: -0.31, stl: -0.737, blk: -0.486, tpm: 0.196, fgImpact: -1.162, ftImpact: -0.525, to: 0.889 } },
          { name: "Labaron Philon Jr.", min: 25, pts: 6, reb: 2, ast: 4, stl: 0, blk: 0, to: 0, tpm: 0, fgm: 2, fga: 9, ftm: 2, fta: 2, composite: -1, zScores: { pts: -0.192, reb: -0.322, ast: 1.797, stl: -0.737, blk: -0.486, tpm: -0.836, fgImpact: -1.901, ftImpact: 0.789, to: 0.889 } },
          { name: "Rayan Rupert", min: 25, pts: 6, reb: 4, ast: 1, stl: 0, blk: 0, to: 1, tpm: 2, fgm: 2, fga: 8, ftm: 0, fta: 0, composite: -1.4, zScores: { pts: -0.192, reb: 0.492, ast: -0.31, stl: -0.737, blk: -0.486, tpm: 1.228, fgImpact: -1.477, ftImpact: 0, to: 0.084 } }
        ]
      }
    },
      {
      id: "401914102",
      line: "Minnesota Timberwolves 116 @ Milwaukee Bucks 97 (Final)",
      completed: true,
      statusText: "Final",
      away: {
        abbr: "MIN", name: "Minnesota Timberwolves", score: 116,
        players: [
          { name: "Jaden McDaniels", min: 15, pts: 9, reb: 3, ast: 1, stl: 0, blk: 0, to: 0, tpm: 1, fgm: 4, fga: 5, ftm: 0, fta: 0, composite: 1.76, zScores: { pts: 0.421, reb: 0.085, ast: -0.31, stl: -0.737, blk: -0.486, tpm: 0.196, fgImpact: 1.704, ftImpact: 0, to: 0.889 } },
          { name: "Jonathan Kuminga", min: 14, pts: 8, reb: 2, ast: 0, stl: 0, blk: 0, to: 0, tpm: 0, fgm: 2, fga: 4, ftm: 4, fta: 4, composite: -0.49, zScores: { pts: 0.217, reb: -0.322, ast: -1.013, stl: -0.737, blk: -0.486, tpm: -0.836, fgImpact: 0.217, ftImpact: 1.578, to: 0.889 } },
          { name: "Rudy Gobert", min: 17, pts: 6, reb: 7, ast: 0, stl: 0, blk: 0, to: 1, tpm: 0, fgm: 3, fga: 4, ftm: 0, fta: 0, composite: -0.29, zScores: { pts: -0.192, reb: 1.712, ast: -1.013, stl: -0.737, blk: -0.486, tpm: -0.836, fgImpact: 1.172, ftImpact: 0, to: 0.084 } },
          { name: "LaMelo Ball", min: 17, pts: 11, reb: 4, ast: 3, stl: 1, blk: 0, to: 1, tpm: 2, fgm: 3, fga: 6, ftm: 3, fta: 3, composite: 5.18, zScores: { pts: 0.83, reb: 0.492, ast: 1.095, stl: 0.429, blk: -0.486, tpm: 1.228, fgImpact: 0.325, ftImpact: 1.183, to: 0.084 } },
          { name: "Anthony Edwards", min: 18, pts: 14, reb: 4, ast: 2, stl: 0, blk: 2, to: 2, tpm: 1, fgm: 4, fga: 13, ftm: 5, fta: 5, composite: 4.39, zScores: { pts: 1.443, reb: 0.492, ast: 0.392, stl: -0.737, blk: 3.035, tpm: 0.196, fgImpact: -1.684, ftImpact: 1.972, to: -0.721 } },
          { name: "Trey Lyles", min: 12, pts: 3, reb: 2, ast: 0, stl: 0, blk: 0, to: 0, tpm: 1, fgm: 1, fga: 4, ftm: 0, fta: 0, composite: -3.02, zScores: { pts: -0.805, reb: -0.322, ast: -1.013, stl: -0.737, blk: -0.486, tpm: 0.196, fgImpact: -0.739, ftImpact: 0, to: 0.889 } },
          { name: "Drew Timme", min: 6, pts: 3, reb: 0, ast: 1, stl: 2, blk: 0, to: 0, tpm: 1, fgm: 1, fga: 1, ftm: 0, fta: 0, composite: 0.48, zScores: { pts: -0.805, reb: -1.136, ast: -0.31, stl: 1.595, blk: -0.486, tpm: 0.196, fgImpact: 0.532, ftImpact: 0, to: 0.889 } },
          { name: "KJ Martin", min: 9, pts: 4, reb: 1, ast: 0, stl: 0, blk: 0, to: 0, tpm: 0, fgm: 2, fga: 3, ftm: 0, fta: 0, composite: -2.87, zScores: { pts: -0.601, reb: -0.729, ast: -1.013, stl: -0.737, blk: -0.486, tpm: -0.836, fgImpact: 0.64, ftImpact: 0, to: 0.889 } },
          { name: "Enrique Freeman", min: 6, pts: 4, reb: 2, ast: 0, stl: 0, blk: 0, to: 0, tpm: 0, fgm: 1, fga: 3, ftm: 2, fta: 2, composite: -2.63, zScores: { pts: -0.601, reb: -0.322, ast: -1.013, stl: -0.737, blk: -0.486, tpm: -0.836, fgImpact: -0.315, ftImpact: 0.789, to: 0.889 } },
          { name: "Norchad Omier", min: 9, pts: 2, reb: 2, ast: 1, stl: 1, blk: 0, to: 2, tpm: 0, fgm: 1, fga: 2, ftm: 0, fta: 0, composite: -3.15, zScores: { pts: -1.009, reb: -0.322, ast: -0.31, stl: 0.429, blk: -0.486, tpm: -0.836, fgImpact: 0.108, ftImpact: 0, to: -0.721 } },
          { name: "Cody Williams", min: 10, pts: 5, reb: 2, ast: 4, stl: 0, blk: 0, to: 0, tpm: 0, fgm: 1, fga: 3, ftm: 3, fta: 4, composite: -0.14, zScores: { pts: -0.396, reb: -0.322, ast: 1.797, stl: -0.737, blk: -0.486, tpm: -0.836, fgImpact: -0.315, ftImpact: 0.264, to: 0.889 } },
          { name: "Isaiah Evans", min: 8, pts: 2, reb: 3, ast: 0, stl: 1, blk: 0, to: 1, tpm: 0, fgm: 0, fga: 6, ftm: 2, fta: 2, composite: -4.5, zScores: { pts: -1.009, reb: 0.085, ast: -1.013, stl: 0.429, blk: -0.486, tpm: -0.836, fgImpact: -2.541, ftImpact: 0.789, to: 0.084 } },
          { name: "Joan Beringer", min: 15, pts: 12, reb: 7, ast: 0, stl: 0, blk: 1, to: 2, tpm: 0, fgm: 5, fga: 8, ftm: 2, fta: 4, composite: 1.05, zScores: { pts: 1.035, reb: 1.712, ast: -1.013, stl: -0.737, blk: 1.275, tpm: -0.836, fgImpact: 1.389, ftImpact: -1.049, to: -0.721 } },
          { name: "Rocco Zikarsky", min: 8, pts: 0, reb: 1, ast: 0, stl: 0, blk: 1, to: 0, tpm: 0, fgm: 0, fga: 1, ftm: 0, fta: 0, composite: -2.99, zScores: { pts: -1.418, reb: -0.729, ast: -1.013, stl: -0.737, blk: 1.275, tpm: -0.836, fgImpact: -0.424, ftImpact: 0, to: 0.889 } },
          { name: "Ayo Dosunmu", min: 13, pts: 5, reb: 3, ast: 0, stl: 0, blk: 0, to: 0, tpm: 1, fgm: 2, fga: 5, ftm: 0, fta: 0, composite: -1.67, zScores: { pts: -0.396, reb: 0.085, ast: -1.013, stl: -0.737, blk: -0.486, tpm: 0.196, fgImpact: -0.207, ftImpact: 0, to: 0.889 } },
          { name: "Jaylen Clark", min: 10, pts: 0, reb: 0, ast: 1, stl: 1, blk: 2, to: 0, tpm: 0, fgm: 0, fga: 2, ftm: 0, fta: 0, composite: -0.19, zScores: { pts: -1.418, reb: -1.136, ast: -0.31, stl: 0.429, blk: 3.035, tpm: -0.836, fgImpact: -0.847, ftImpact: 0, to: 0.889 } },
          { name: "Terrence Shannon Jr.", min: 16, pts: 6, reb: 1, ast: 4, stl: 1, blk: 1, to: 0, tpm: 0, fgm: 1, fga: 5, ftm: 4, fta: 6, composite: 1.21, zScores: { pts: -0.192, reb: -0.729, ast: 1.797, stl: 0.429, blk: 1.275, tpm: -0.836, fgImpact: -1.162, ftImpact: -0.26, to: 0.889 } },
          { name: "Bones Hyland", min: 9, pts: 0, reb: 2, ast: 2, stl: 1, blk: 0, to: 1, tpm: 0, fgm: 0, fga: 2, ftm: 0, fta: 0, composite: -3, zScores: { pts: -1.418, reb: -0.322, ast: 0.392, stl: 0.429, blk: -0.486, tpm: -0.836, fgImpact: -0.847, ftImpact: 0, to: 0.084 } },
          { name: "Antonio Reeves", min: 12, pts: 12, reb: 3, ast: 2, stl: 1, blk: 0, to: 0, tpm: 2, fgm: 5, fga: 5, ftm: 0, fta: 0, composite: 6.23, zScores: { pts: 1.035, reb: 0.085, ast: 0.392, stl: 0.429, blk: -0.486, tpm: 1.228, fgImpact: 2.659, ftImpact: 0, to: 0.889 } },
          { name: "Zyon Pullin", min: 16, pts: 10, reb: 2, ast: 1, stl: 0, blk: 0, to: 1, tpm: 0, fgm: 4, fga: 5, ftm: 2, fta: 4, composite: -1.33, zScores: { pts: 0.626, reb: -0.322, ast: -0.31, stl: -0.737, blk: -0.486, tpm: -0.836, fgImpact: 1.704, ftImpact: -1.049, to: 0.084 } }
        ]
      },
      home: {
        abbr: "MIL", name: "Milwaukee Bucks", score: 97,
        players: [
          { name: "Kyle Kuzma", min: 20, pts: 1, reb: 5, ast: 1, stl: 0, blk: 0, to: 0, tpm: 0, fgm: 0, fga: 6, ftm: 1, fta: 2, composite: -4.86, zScores: { pts: -1.214, reb: 0.898, ast: -0.31, stl: -0.737, blk: -0.486, tpm: -0.836, fgImpact: -2.541, ftImpact: -0.525, to: 0.889 } },
          { name: "Jaime Jaquez Jr.", min: 18, pts: 5, reb: 1, ast: 1, stl: 0, blk: 0, to: 2, tpm: 1, fgm: 2, fga: 7, ftm: 0, fta: 0, composite: -4.24, zScores: { pts: -0.396, reb: -0.729, ast: -0.31, stl: -0.737, blk: -0.486, tpm: 0.196, fgImpact: -1.054, ftImpact: 0, to: -0.721 } },
          { name: "Myles Turner", min: 19, pts: 7, reb: 5, ast: 1, stl: 1, blk: 1, to: 1, tpm: 1, fgm: 1, fga: 5, ftm: 4, fta: 4, composite: 3, zScores: { pts: 0.013, reb: 0.898, ast: -0.31, stl: 0.429, blk: 1.275, tpm: 0.196, fgImpact: -1.162, ftImpact: 1.578, to: 0.084 } },
          { name: "Tyler Herro", min: 19, pts: 11, reb: 3, ast: 3, stl: 0, blk: 0, to: 4, tpm: 2, fgm: 3, fga: 9, ftm: 3, fta: 3, composite: -0.08, zScores: { pts: 0.83, reb: 0.085, ast: 1.095, stl: -0.737, blk: -0.486, tpm: 1.228, fgImpact: -0.945, ftImpact: 1.183, to: -2.332 } },
          { name: "Ryan Rollins", min: 14, pts: 15, reb: 4, ast: 1, stl: 1, blk: 1, to: 0, tpm: 2, fgm: 6, fga: 12, ftm: 1, fta: 1, composite: 6.7, zScores: { pts: 1.648, reb: 0.492, ast: -0.31, stl: 0.429, blk: 1.275, tpm: 1.228, fgImpact: 0.65, ftImpact: 0.394, to: 0.889 } },
          { name: "Pete Nance", min: 7, pts: 3, reb: 1, ast: 0, stl: 0, blk: 0, to: 0, tpm: 1, fgm: 1, fga: 1, ftm: 0, fta: 0, composite: -2.15, zScores: { pts: -0.805, reb: -0.729, ast: -1.013, stl: -0.737, blk: -0.486, tpm: 0.196, fgImpact: 0.532, ftImpact: 0, to: 0.889 } },
          { name: "Nate Ament", min: 14, pts: 8, reb: 2, ast: 0, stl: 0, blk: 0, to: 0, tpm: 1, fgm: 2, fga: 4, ftm: 3, fta: 3, composite: 0.15, zScores: { pts: 0.217, reb: -0.322, ast: -1.013, stl: -0.737, blk: -0.486, tpm: 0.196, fgImpact: 0.217, ftImpact: 1.183, to: 0.889 } },
          { name: "Jericho Sims", min: 19, pts: 2, reb: 3, ast: 1, stl: 0, blk: 0, to: 0, tpm: 0, fgm: 1, fga: 1, ftm: 0, fta: 2, composite: -3.71, zScores: { pts: -1.009, reb: 0.085, ast: -0.31, stl: -0.737, blk: -0.486, tpm: -0.836, fgImpact: 0.532, ftImpact: -1.838, to: 0.889 } },
          { name: "Kel'el Ware", min: 24, pts: 14, reb: 12, ast: 0, stl: 1, blk: 1, to: 0, tpm: 2, fgm: 5, fga: 11, ftm: 2, fta: 2, composite: 8.91, zScores: { pts: 1.443, reb: 3.746, ast: -1.013, stl: 0.429, blk: 1.275, tpm: 1.228, fgImpact: 0.118, ftImpact: 0.789, to: 0.889 } },
          { name: "Caris LeVert", min: 11, pts: 0, reb: 0, ast: 1, stl: 0, blk: 0, to: 4, tpm: 0, fgm: 0, fga: 2, ftm: 0, fta: 0, composite: -8.1, zScores: { pts: -1.418, reb: -1.136, ast: -0.31, stl: -0.737, blk: -0.486, tpm: -0.836, fgImpact: -0.847, ftImpact: 0, to: -2.332 } },
          { name: "Gary Trent Jr.", min: 18, pts: 11, reb: 1, ast: 1, stl: 0, blk: 0, to: 0, tpm: 3, fgm: 3, fga: 9, ftm: 2, fta: 2, composite: 1.56, zScores: { pts: 0.83, reb: -0.729, ast: -0.31, stl: -0.737, blk: -0.486, tpm: 2.26, fgImpact: -0.945, ftImpact: 0.789, to: 0.889 } },
          { name: "Kevin Porter Jr.", min: 19, pts: 7, reb: 3, ast: 2, stl: 0, blk: 0, to: 1, tpm: 0, fgm: 1, fga: 6, ftm: 5, fta: 9, composite: -4.77, zScores: { pts: 0.013, reb: 0.085, ast: 0.392, stl: -0.737, blk: -0.486, tpm: -0.836, fgImpact: -1.586, ftImpact: -1.704, to: 0.084 } },
          { name: "AJ Green", min: 22, pts: 6, reb: 5, ast: 2, stl: 0, blk: 0, to: 2, tpm: 2, fgm: 2, fga: 8, ftm: 0, fta: 0, composite: -1.09, zScores: { pts: -0.192, reb: 0.898, ast: 0.392, stl: -0.737, blk: -0.486, tpm: 1.228, fgImpact: -1.477, ftImpact: 0, to: -0.721 } },
          { name: "Brayden Burries", min: 16, pts: 7, reb: 2, ast: 5, stl: 2, blk: 0, to: 3, tpm: 1, fgm: 3, fga: 10, ftm: 0, fta: 0, composite: 0.6, zScores: { pts: 0.013, reb: -0.322, ast: 2.5, stl: 1.595, blk: -0.486, tpm: 0.196, fgImpact: -1.369, ftImpact: 0, to: -1.527 } }
        ]
      }
    },
      {
      id: "401898716",
      line: "Los Angeles Lakers 127 @ Sacramento Kings 103 (Final)",
      completed: true,
      statusText: "Final",
      away: {
        abbr: "LAL", name: "Los Angeles Lakers", score: 127,
        players: [
          { name: "Kevon Looney", min: 18, pts: 2, reb: 9, ast: 3, stl: 1, blk: 0, to: 1, tpm: 0, fgm: 1, fga: 3, ftm: 0, fta: 0, composite: 1.49, zScores: { pts: -1.009, reb: 2.526, ast: 1.095, stl: 0.429, blk: -0.486, tpm: -0.836, fgImpact: -0.315, ftImpact: 0, to: 0.084 } },
          { name: "Ziaire Williams", min: 21, pts: 13, reb: 1, ast: 1, stl: 1, blk: 0, to: 0, tpm: 3, fgm: 4, fga: 6, ftm: 2, fta: 2, composite: 5.36, zScores: { pts: 1.239, reb: -0.729, ast: -0.31, stl: 0.429, blk: -0.486, tpm: 2.26, fgImpact: 1.28, ftImpact: 0.789, to: 0.889 } },
          { name: "Matisse Thybulle", min: 18, pts: 6, reb: 0, ast: 1, stl: 2, blk: 0, to: 0, tpm: 2, fgm: 2, fga: 6, ftm: 0, fta: 0, composite: 0.96, zScores: { pts: -0.192, reb: -1.136, ast: -0.31, stl: 1.595, blk: -0.486, tpm: 1.228, fgImpact: -0.63, ftImpact: 0, to: 0.889 } },
          { name: "Luka Doncic", min: 16, pts: 21, reb: 2, ast: 3, stl: 2, blk: 0, to: 5, tpm: 3, fgm: 5, fga: 12, ftm: 8, fta: 9, composite: 5.81, zScores: { pts: 2.874, reb: -0.322, ast: 1.095, stl: 1.595, blk: -0.486, tpm: 2.26, fgImpact: -0.305, ftImpact: 2.237, to: -3.138 } },
          { name: "Quentin Grimes", min: 19, pts: 16, reb: 0, ast: 1, stl: 0, blk: 0, to: 0, tpm: 2, fgm: 5, fga: 7, ftm: 4, fta: 4, composite: 4.69, zScores: { pts: 1.852, reb: -1.136, ast: -0.31, stl: -0.737, blk: -0.486, tpm: 1.228, fgImpact: 1.812, ftImpact: 1.578, to: 0.889 } },
          { name: "Jarred Vanderbilt", min: 11, pts: 4, reb: 2, ast: 1, stl: 0, blk: 0, to: 2, tpm: 0, fgm: 2, fga: 4, ftm: 0, fta: 0, composite: -3.8, zScores: { pts: -0.601, reb: -0.322, ast: -0.31, stl: -0.737, blk: -0.486, tpm: -0.836, fgImpact: 0.217, ftImpact: 0, to: -0.721 } },
          { name: "Sandro Mamukelashvili", min: 19, pts: 8, reb: 1, ast: 5, stl: 2, blk: 0, to: 3, tpm: 2, fgm: 3, fga: 8, ftm: 0, fta: 0, composite: 2.28, zScores: { pts: 0.217, reb: -0.729, ast: 2.5, stl: 1.595, blk: -0.486, tpm: 1.228, fgImpact: -0.522, ftImpact: 0, to: -1.527 } },
          { name: "Jake LaRavia", min: 21, pts: 12, reb: 3, ast: 2, stl: 2, blk: 2, to: 1, tpm: 2, fgm: 5, fga: 6, ftm: 0, fta: 3, composite: 6.93, zScores: { pts: 1.035, reb: 0.085, ast: 0.392, stl: 1.595, blk: 3.035, tpm: 1.228, fgImpact: 2.236, ftImpact: -2.758, to: 0.084 } },
          { name: "Dalton Knecht", min: 12, pts: 0, reb: 2, ast: 1, stl: 0, blk: 0, to: 1, tpm: 0, fgm: 0, fga: 1, ftm: 0, fta: 0, composite: -4.45, zScores: { pts: -1.418, reb: -0.322, ast: -0.31, stl: -0.737, blk: -0.486, tpm: -0.836, fgImpact: -0.424, ftImpact: 0, to: 0.084 } },
          { name: "Adou Thiero", min: 17, pts: 3, reb: 4, ast: 4, stl: 2, blk: 0, to: 1, tpm: 0, fgm: 1, fga: 2, ftm: 1, fta: 2, composite: 1.43, zScores: { pts: -0.805, reb: 0.492, ast: 1.797, stl: 1.595, blk: -0.486, tpm: -0.836, fgImpact: 0.108, ftImpact: -0.525, to: 0.084 } },
          { name: "William Kyle III", min: 5, pts: 0, reb: 1, ast: 1, stl: 0, blk: 0, to: 0, tpm: 0, fgm: 0, fga: 0, ftm: 0, fta: 0, composite: -3.63, zScores: { pts: -1.418, reb: -0.729, ast: -0.31, stl: -0.737, blk: -0.486, tpm: -0.836, fgImpact: 0, ftImpact: 0, to: 0.889 } },
          { name: "Bronny James", min: 16, pts: 3, reb: 5, ast: 2, stl: 0, blk: 1, to: 1, tpm: 1, fgm: 1, fga: 5, ftm: 0, fta: 0, composite: 0.14, zScores: { pts: -0.805, reb: 0.898, ast: 0.392, stl: -0.737, blk: 1.275, tpm: 0.196, fgImpact: -1.162, ftImpact: 0, to: 0.084 } },
          { name: "Chris Manon", min: 12, pts: 12, reb: 5, ast: 1, stl: 1, blk: 1, to: 3, tpm: 0, fgm: 2, fga: 3, ftm: 8, fta: 10, composite: 2.92, zScores: { pts: 1.035, reb: 0.898, ast: -0.31, stl: 0.429, blk: 1.275, tpm: -0.836, fgImpact: 0.64, ftImpact: 1.318, to: -1.527 } },
          { name: "Jaden Hardy", min: 14, pts: 8, reb: 1, ast: 1, stl: 0, blk: 0, to: 3, tpm: 2, fgm: 3, fga: 6, ftm: 0, fta: 1, composite: -2.94, zScores: { pts: 0.217, reb: -0.729, ast: -0.31, stl: -0.737, blk: -0.486, tpm: 1.228, fgImpact: 0.325, ftImpact: -0.919, to: -1.527 } },
          { name: "Cameron Carr", min: 23, pts: 19, reb: 3, ast: 2, stl: 2, blk: 0, to: 0, tpm: 3, fgm: 7, fga: 13, ftm: 2, fta: 2, composite: 9.17, zScores: { pts: 2.465, reb: 0.085, ast: 0.392, stl: 1.595, blk: -0.486, tpm: 2.26, fgImpact: 1.182, ftImpact: 0.789, to: 0.889 } }
        ]
      },
      home: {
        abbr: "SAC", name: "Sacramento Kings", score: 103,
        players: [
          { name: "Domantas Sabonis", min: 10, pts: 4, reb: 3, ast: 3, stl: 0, blk: 0, to: 3, tpm: 0, fgm: 1, fga: 2, ftm: 2, fta: 2, composite: -2.11, zScores: { pts: -0.601, reb: 0.085, ast: 1.095, stl: -0.737, blk: -0.486, tpm: -0.836, fgImpact: 0.108, ftImpact: 0.789, to: -1.527 } },
          { name: "De'Andre Hunter", min: 13, pts: 3, reb: 0, ast: 0, stl: 0, blk: 0, to: 0, tpm: 0, fgm: 0, fga: 0, ftm: 3, fta: 3, composite: -2.94, zScores: { pts: -0.805, reb: -1.136, ast: -1.013, stl: -0.737, blk: -0.486, tpm: -0.836, fgImpact: 0, ftImpact: 1.183, to: 0.889 } },
          { name: "Precious Achiuwa", min: 13, pts: 2, reb: 1, ast: 1, stl: 1, blk: 0, to: 0, tpm: 0, fgm: 1, fga: 2, ftm: 0, fta: 2, composite: -3.78, zScores: { pts: -1.009, reb: -0.729, ast: -0.31, stl: 0.429, blk: -0.486, tpm: -0.836, fgImpact: 0.108, ftImpact: -1.838, to: 0.889 } },
          { name: "Zach LaVine", min: 15, pts: 9, reb: 1, ast: 0, stl: 0, blk: 0, to: 2, tpm: 0, fgm: 4, fga: 6, ftm: 1, fta: 2, composite: -3.34, zScores: { pts: 0.421, reb: -0.729, ast: -1.013, stl: -0.737, blk: -0.486, tpm: -0.836, fgImpact: 1.28, ftImpact: -0.525, to: -0.721 } },
          { name: "Darius Acuff Jr.", min: 27, pts: 19, reb: 2, ast: 4, stl: 1, blk: 1, to: 5, tpm: 1, fgm: 8, fga: 17, ftm: 2, fta: 2, composite: 3.94, zScores: { pts: 2.465, reb: -0.322, ast: 1.797, stl: 0.429, blk: 1.275, tpm: 0.196, fgImpact: 0.443, ftImpact: 0.789, to: -3.138 } },
          { name: "Alex Karaban", min: 16, pts: 3, reb: 3, ast: 2, stl: 2, blk: 0, to: 1, tpm: 0, fgm: 1, fga: 3, ftm: 1, fta: 1, composite: 0.11, zScores: { pts: -0.805, reb: 0.085, ast: 0.392, stl: 1.595, blk: -0.486, tpm: -0.836, fgImpact: -0.315, ftImpact: 0.394, to: 0.084 } },
          { name: "Dylan Cardwell", min: 29, pts: 9, reb: 10, ast: 3, stl: 3, blk: 1, to: 3, tpm: 0, fgm: 4, fga: 7, ftm: 1, fta: 2, composite: 6.45, zScores: { pts: 0.421, reb: 2.933, ast: 1.095, stl: 2.761, blk: 1.275, tpm: -0.836, fgImpact: 0.857, ftImpact: -0.525, to: -1.527 } },
          { name: "Maxime Raynaud", min: 24, pts: 12, reb: 8, ast: 2, stl: 0, blk: 0, to: 5, tpm: 0, fgm: 5, fga: 11, ftm: 2, fta: 2, composite: -0.74, zScores: { pts: 1.035, reb: 2.119, ast: 0.392, stl: -0.737, blk: -0.486, tpm: -0.836, fgImpact: 0.118, ftImpact: 0.789, to: -3.138 } },
          { name: "Elfrid Payton", min: 7, pts: 0, reb: 3, ast: 0, stl: 0, blk: 0, to: 0, tpm: 0, fgm: 0, fga: 1, ftm: 0, fta: 0, composite: -3.94, zScores: { pts: -1.418, reb: 0.085, ast: -1.013, stl: -0.737, blk: -0.486, tpm: -0.836, fgImpact: -0.424, ftImpact: 0, to: 0.889 } },
          { name: "Daeqwon Plowden", min: 25, pts: 12, reb: 5, ast: 1, stl: 1, blk: 0, to: 3, tpm: 1, fgm: 3, fga: 9, ftm: 5, fta: 6, composite: 0.34, zScores: { pts: 1.035, reb: 0.898, ast: -0.31, stl: 0.429, blk: -0.486, tpm: 0.196, fgImpact: -0.945, ftImpact: 1.053, to: -1.527 } },
          { name: "Adam Flagler", min: 1, pts: 0, reb: 0, ast: 0, stl: 0, blk: 0, to: 0, tpm: 0, fgm: 0, fga: 0, ftm: 0, fta: 0, composite: -4.74, zScores: { pts: -1.418, reb: -1.136, ast: -1.013, stl: -0.737, blk: -0.486, tpm: -0.836, fgImpact: 0, ftImpact: 0, to: 0.889 } },
          { name: "Nique Clifford", min: 28, pts: 23, reb: 9, ast: 2, stl: 0, blk: 0, to: 1, tpm: 1, fgm: 8, fga: 13, ftm: 6, fta: 10, composite: 6.09, zScores: { pts: 3.283, reb: 2.526, ast: 0.392, stl: -0.737, blk: -0.486, tpm: 0.196, fgImpact: 2.137, ftImpact: -1.31, to: 0.084 } },
          { name: "Emanuel Sharp", min: 30, pts: 7, reb: 1, ast: 2, stl: 2, blk: 0, to: 3, tpm: 1, fgm: 2, fga: 11, ftm: 2, fta: 2, composite: -2.5, zScores: { pts: 0.013, reb: -0.729, ast: 0.392, stl: 1.595, blk: -0.486, tpm: 0.196, fgImpact: -2.748, ftImpact: 0.789, to: -1.527 } }
        ]
      }
    }
    ]
  },
    "2026-10-06": {
    games: [
      {
      id: "401901820",
      line: "Brooklyn Nets 124 @ Charlotte Hornets 90 (Final)",
      completed: true,
      statusText: "Final",
      away: {
        abbr: "BKN", name: "Brooklyn Nets", score: 124,
        players: [
          { name: "Julius Randle", min: 18, pts: 13, reb: 2, ast: 3, stl: 1, blk: 0, to: 0, tpm: 2, fgm: 4, fga: 7, ftm: 3, fta: 4, composite: 4.58, zScores: { pts: 1.326, reb: -0.303, ast: 0.778, stl: 0.472, blk: -0.591, tpm: 1.054, fgImpact: 0.712, ftImpact: 0.152, to: 0.984 } },
          { name: "Michael Porter Jr.", min: 17, pts: 16, reb: 5, ast: 2, stl: 1, blk: 0, to: 1, tpm: 4, fgm: 6, fga: 9, ftm: 0, fta: 0, composite: 8.05, zScores: { pts: 2.005, reb: 1.039, ast: 0.207, stl: 0.472, blk: -0.591, tpm: 3.02, fgImpact: 1.758, ftImpact: 0, to: 0.137 } },
          { name: "Day'Ron Sharpe", min: 18, pts: 8, reb: 7, ast: 3, stl: 0, blk: 2, to: 1, tpm: 0, fgm: 4, fga: 9, ftm: 0, fta: 0, composite: 3.77, zScores: { pts: 0.195, reb: 1.935, ast: 0.778, stl: -0.747, blk: 2.593, tpm: -0.912, fgImpact: -0.209, ftImpact: 0, to: 0.137 } },
          { name: "Keon Ellis", min: 12, pts: 5, reb: 0, ast: 0, stl: 0, blk: 0, to: 1, tpm: 1, fgm: 2, fga: 3, ftm: 0, fta: 0, composite: -3.16, zScores: { pts: -0.483, reb: -1.198, ast: -0.934, stl: -0.747, blk: -0.591, tpm: 0.071, fgImpact: 0.586, ftImpact: 0, to: 0.137 } },
          { name: "Egor Demin", min: 18, pts: 6, reb: 1, ast: 5, stl: 0, blk: 0, to: 2, tpm: 2, fgm: 2, fga: 5, ftm: 0, fta: 0, composite: -0.42, zScores: { pts: -0.257, reb: -0.751, ast: 1.919, stl: -0.747, blk: -0.591, tpm: 1.054, fgImpact: -0.334, ftImpact: 0, to: -0.711 } },
          { name: "Dain Dainja", min: 4, pts: 0, reb: 0, ast: 0, stl: 0, blk: 0, to: 0, tpm: 0, fgm: 0, fga: 0, ftm: 0, fta: 0, composite: -5.01, zScores: { pts: -1.615, reb: -1.198, ast: -0.934, stl: -0.747, blk: -0.591, tpm: -0.912, fgImpact: 0, ftImpact: 0, to: 0.984 } },
          { name: "Josh Minott", min: 9, pts: 6, reb: 1, ast: 0, stl: 2, blk: 0, to: 0, tpm: 1, fgm: 2, fga: 3, ftm: 1, fta: 2, composite: 0.16, zScores: { pts: -0.257, reb: -0.751, ast: -0.934, stl: 1.691, blk: -0.591, tpm: 0.071, fgImpact: 0.586, ftImpact: -0.639, to: 0.984 } },
          { name: "Grant Nelson", min: 6, pts: 5, reb: 2, ast: 1, stl: 0, blk: 0, to: 0, tpm: 1, fgm: 2, fga: 4, ftm: 0, fta: 1, composite: -2.34, zScores: { pts: -0.483, reb: -0.303, ast: -0.364, stl: -0.747, blk: -0.591, tpm: 0.071, fgImpact: 0.126, ftImpact: -1.034, to: 0.984 } },
          { name: "Noah Clowney", min: 19, pts: 7, reb: 1, ast: 1, stl: 2, blk: 0, to: 1, tpm: 1, fgm: 2, fga: 6, ftm: 2, fta: 2, composite: 0.16, zScores: { pts: -0.031, reb: -0.751, ast: -0.364, stl: 1.691, blk: -0.591, tpm: 0.071, fgImpact: -0.794, ftImpact: 0.791, to: 0.137 } },
          { name: "Tyler Bilodeau", min: 8, pts: 5, reb: 3, ast: 0, stl: 0, blk: 0, to: 0, tpm: 1, fgm: 1, fga: 1, ftm: 2, fta: 3, composite: -1.28, zScores: { pts: -0.483, reb: 0.144, ast: -0.934, stl: -0.747, blk: -0.591, tpm: 0.071, fgImpact: 0.523, ftImpact: -0.243, to: 0.984 } },
          { name: "Danny Wolf", min: 15, pts: 9, reb: 3, ast: 5, stl: 0, blk: 0, to: 1, tpm: 1, fgm: 3, fga: 4, ftm: 2, fta: 4, composite: 1.19, zScores: { pts: 0.421, reb: 0.144, ast: 1.919, stl: -0.747, blk: -0.591, tpm: 0.071, fgImpact: 1.109, ftImpact: -1.277, to: 0.137 } },
          { name: "Chaney Johnson", min: 17, pts: 6, reb: 2, ast: 0, stl: 1, blk: 0, to: 0, tpm: 0, fgm: 3, fga: 3, ftm: 0, fta: 0, composite: 0.03, zScores: { pts: -0.257, reb: -0.303, ast: -0.934, stl: 0.472, blk: -0.591, tpm: -0.912, fgImpact: 1.569, ftImpact: 0, to: 0.984 } },
          { name: "Moritz Wagner", min: 18, pts: 5, reb: 4, ast: 5, stl: 1, blk: 0, to: 2, tpm: 1, fgm: 1, fga: 4, ftm: 2, fta: 2, composite: 1.2, zScores: { pts: -0.483, reb: 0.592, ast: 1.919, stl: 0.472, blk: -0.591, tpm: 0.071, fgImpact: -0.857, ftImpact: 0.791, to: -0.711 } },
          { name: "Terance Mann", min: 20, pts: 6, reb: 2, ast: 1, stl: 2, blk: 0, to: 1, tpm: 2, fgm: 2, fga: 4, ftm: 0, fta: 0, composite: 1.49, zScores: { pts: -0.257, reb: -0.303, ast: -0.364, stl: 1.691, blk: -0.591, tpm: 1.054, fgImpact: 0.126, ftImpact: 0, to: 0.137 } },
          { name: "Drake Powell", min: 13, pts: 9, reb: 2, ast: 1, stl: 1, blk: 0, to: 0, tpm: 1, fgm: 4, fga: 6, ftm: 0, fta: 0, composite: 1.86, zScores: { pts: 0.421, reb: -0.303, ast: -0.364, stl: 0.472, blk: -0.591, tpm: 0.071, fgImpact: 1.172, ftImpact: 0, to: 0.984 } },
          { name: "Ben Saraf", min: 15, pts: 8, reb: 2, ast: 2, stl: 0, blk: 0, to: 1, tpm: 2, fgm: 3, fga: 7, ftm: 0, fta: 0, composite: -0.32, zScores: { pts: 0.195, reb: -0.303, ast: 0.207, stl: -0.747, blk: -0.591, tpm: 1.054, fgImpact: -0.271, ftImpact: 0, to: 0.137 } },
          { name: "Nolan Traore", min: 10, pts: 10, reb: 1, ast: 2, stl: 1, blk: 0, to: 1, tpm: 0, fgm: 3, fga: 4, ftm: 4, fta: 4, composite: 1.9, zScores: { pts: 0.648, reb: -0.751, ast: 0.207, stl: 0.472, blk: -0.591, tpm: -0.912, fgImpact: 1.109, ftImpact: 1.581, to: 0.137 } },
          { name: "Ben Humrichous", min: 4, pts: 0, reb: 0, ast: 0, stl: 0, blk: 0, to: 0, tpm: 0, fgm: 0, fga: 1, ftm: 0, fta: 0, composite: -5.47, zScores: { pts: -1.615, reb: -1.198, ast: -0.934, stl: -0.747, blk: -0.591, tpm: -0.912, fgImpact: -0.46, ftImpact: 0, to: 0.984 } }
        ]
      },
      home: {
        abbr: "CHA", name: "Charlotte Hornets", score: 90,
        players: [
          { name: "Moussa Diabate", min: 20, pts: 4, reb: 4, ast: 1, stl: 2, blk: 2, to: 4, tpm: 0, fgm: 1, fga: 1, ftm: 2, fta: 4, composite: -0.27, zScores: { pts: -0.71, reb: 0.592, ast: -0.364, stl: 1.691, blk: 2.593, tpm: -0.912, fgImpact: 0.523, ftImpact: -1.277, to: -2.405 } },
          { name: "Naz Reid", min: 16, pts: 13, reb: 4, ast: 0, stl: 0, blk: 0, to: 3, tpm: 1, fgm: 3, fga: 9, ftm: 6, fta: 7, composite: -1.69, zScores: { pts: 1.326, reb: 0.592, ast: -0.934, stl: -0.747, blk: -0.591, tpm: 0.071, fgImpact: -1.192, ftImpact: 1.338, to: -1.558 } },
          { name: "Dennis Schroder", min: 15, pts: 5, reb: 0, ast: 2, stl: 1, blk: 0, to: 0, tpm: 1, fgm: 2, fga: 5, ftm: 0, fta: 0, composite: -0.87, zScores: { pts: -0.483, reb: -1.198, ast: 0.207, stl: 0.472, blk: -0.591, tpm: 0.071, fgImpact: -0.334, ftImpact: 0, to: 0.984 } },
          { name: "Grayson Allen", min: 14, pts: 13, reb: 1, ast: 1, stl: 0, blk: 0, to: 1, tpm: 3, fgm: 4, fga: 6, ftm: 2, fta: 2, composite: 3.01, zScores: { pts: 1.326, reb: -0.751, ast: -0.364, stl: -0.747, blk: -0.591, tpm: 2.037, fgImpact: 1.172, ftImpact: 0.791, to: 0.137 } },
          { name: "Liam McNeeley", min: 19, pts: 14, reb: 1, ast: 0, stl: 0, blk: 0, to: 6, tpm: 4, fgm: 5, fga: 8, ftm: 0, fta: 0, composite: -1.31, zScores: { pts: 1.553, reb: -0.751, ast: -0.934, stl: -0.747, blk: -0.591, tpm: 3.02, fgImpact: 1.235, ftImpact: 0, to: -4.099 } },
          { name: "Royce O'Neale", min: 17, pts: 3, reb: 2, ast: 5, stl: 1, blk: 2, to: 1, tpm: 1, fgm: 1, fga: 4, ftm: 0, fta: 0, composite: 3.1, zScores: { pts: -0.936, reb: -0.303, ast: 1.919, stl: 0.472, blk: 2.593, tpm: 0.071, fgImpact: -0.857, ftImpact: 0, to: 0.137 } },
          { name: "Wyatt Fricks", min: 13, pts: 2, reb: 3, ast: 0, stl: 0, blk: 1, to: 0, tpm: 0, fgm: 1, fga: 3, ftm: 0, fta: 0, composite: -2.02, zScores: { pts: -1.162, reb: 0.144, ast: -0.934, stl: -0.747, blk: 1.001, tpm: -0.912, fgImpact: -0.397, ftImpact: 0, to: 0.984 } },
          { name: "Tidjane Salaun", min: 28, pts: 6, reb: 2, ast: 1, stl: 2, blk: 0, to: 3, tpm: 1, fgm: 2, fga: 7, ftm: 1, fta: 3, composite: -4.24, zScores: { pts: -0.257, reb: -0.303, ast: -0.364, stl: 1.691, blk: -0.591, tpm: 0.071, fgImpact: -1.255, ftImpact: -1.673, to: -1.558 } },
          { name: "Hannes Steinbach", min: 14, pts: 7, reb: 4, ast: 0, stl: 0, blk: 0, to: 0, tpm: 0, fgm: 2, fga: 4, ftm: 3, fta: 4, composite: -1.36, zScores: { pts: -0.031, reb: 0.592, ast: -0.934, stl: -0.747, blk: -0.591, tpm: -0.912, fgImpact: 0.126, ftImpact: 0.152, to: 0.984 } },
          { name: "Ryan Kalkbrenner", min: 15, pts: 2, reb: 2, ast: 0, stl: 0, blk: 0, to: 0, tpm: 0, fgm: 0, fga: 1, ftm: 2, fta: 2, composite: -3.33, zScores: { pts: -1.162, reb: -0.303, ast: -0.934, stl: -0.747, blk: -0.591, tpm: -0.912, fgImpact: -0.46, ftImpact: 0.791, to: 0.984 } },
          { name: "PJ Hall", min: 8, pts: 4, reb: 3, ast: 0, stl: 0, blk: 0, to: 3, tpm: 1, fgm: 1, fga: 3, ftm: 1, fta: 2, composite: -5.36, zScores: { pts: -0.71, reb: 0.144, ast: -0.934, stl: -0.747, blk: -0.591, tpm: 0.071, fgImpact: -0.397, ftImpact: -0.639, to: -1.558 } },
          { name: "Pat Connaughton", min: 9, pts: 1, reb: 0, ast: 3, stl: 0, blk: 0, to: 1, tpm: 0, fgm: 0, fga: 3, ftm: 1, fta: 2, composite: -5.94, zScores: { pts: -1.388, reb: -1.198, ast: 0.778, stl: -0.747, blk: -0.591, tpm: -0.912, fgImpact: -1.38, ftImpact: -0.639, to: 0.137 } },
          { name: "Jarkel Joiner", min: 14, pts: 5, reb: 0, ast: 3, stl: 1, blk: 0, to: 0, tpm: 1, fgm: 2, fga: 4, ftm: 0, fta: 0, composite: 0.16, zScores: { pts: -0.483, reb: -1.198, ast: 0.778, stl: 0.472, blk: -0.591, tpm: 0.071, fgImpact: 0.126, ftImpact: 0, to: 0.984 } },
          { name: "Sion James", min: 17, pts: 8, reb: 4, ast: 0, stl: 0, blk: 0, to: 1, tpm: 2, fgm: 3, fga: 7, ftm: 0, fta: 0, composite: -0.57, zScores: { pts: 0.195, reb: 0.592, ast: -0.934, stl: -0.747, blk: -0.591, tpm: 1.054, fgImpact: -0.271, ftImpact: 0, to: 0.137 } },
          { name: "Michael Ajayi", min: 19, pts: 3, reb: 4, ast: 3, stl: 0, blk: 1, to: 2, tpm: 1, fgm: 1, fga: 5, ftm: 0, fta: 0, composite: -1.27, zScores: { pts: -0.936, reb: 0.592, ast: 0.778, stl: -0.747, blk: 1.001, tpm: 0.071, fgImpact: -1.317, ftImpact: 0, to: -0.711 } }
        ]
      }
    },
      {
      id: "401898389",
      line: "New Orleans Pelicans 116 @ Oklahoma City Thunder 110 (Final)",
      completed: true,
      statusText: "Final",
      away: {
        abbr: "NO", name: "New Orleans Pelicans", score: 116,
        players: [
          { name: "Herbert Jones", min: 20, pts: 7, reb: 2, ast: 1, stl: 0, blk: 0, to: 0, tpm: 1, fgm: 3, fga: 6, ftm: 0, fta: 1, composite: -1.83, zScores: { pts: -0.031, reb: -0.303, ast: -0.364, stl: -0.747, blk: -0.591, tpm: 0.071, fgImpact: 0.189, ftImpact: -1.034, to: 0.984 } },
          { name: "Zion Williamson", min: 16, pts: 11, reb: 4, ast: 1, stl: 0, blk: 0, to: 1, tpm: 1, fgm: 4, fga: 6, ftm: 2, fta: 3, composite: 0.9, zScores: { pts: 0.874, reb: 0.592, ast: -0.364, stl: -0.747, blk: -0.591, tpm: 0.071, fgImpact: 1.172, ftImpact: -0.243, to: 0.137 } },
          { name: "Trey Murphy III", min: 19, pts: 11, reb: 3, ast: 2, stl: 2, blk: 0, to: 0, tpm: 2, fgm: 4, fga: 11, ftm: 1, fta: 2, composite: 2.6, zScores: { pts: 0.874, reb: 0.144, ast: 0.207, stl: 1.691, blk: -0.591, tpm: 1.054, fgImpact: -1.129, ftImpact: -0.639, to: 0.984 } },
          { name: "Yves Missi", min: 19, pts: 6, reb: 7, ast: 1, stl: 1, blk: 1, to: 0, tpm: 0, fgm: 1, fga: 7, ftm: 4, fta: 4, composite: 2.2, zScores: { pts: -0.257, reb: 1.935, ast: -0.364, stl: 0.472, blk: 1.001, tpm: -0.912, fgImpact: -2.238, ftImpact: 1.581, to: 0.984 } },
          { name: "Dejounte Murray", min: 19, pts: 6, reb: 4, ast: 6, stl: 0, blk: 0, to: 1, tpm: 1, fgm: 2, fga: 8, ftm: 1, fta: 2, composite: -0.66, zScores: { pts: -0.257, reb: 0.592, ast: 2.49, stl: -0.747, blk: -0.591, tpm: 0.071, fgImpact: -1.715, ftImpact: -0.639, to: 0.137 } },
          { name: "Trendon Watford", min: 12, pts: 7, reb: 6, ast: 1, stl: 2, blk: 0, to: 1, tpm: 0, fgm: 3, fga: 5, ftm: 1, fta: 2, composite: 1.43, zScores: { pts: -0.031, reb: 1.487, ast: -0.364, stl: 1.691, blk: -0.591, tpm: -0.912, fgImpact: 0.649, ftImpact: -0.639, to: 0.137 } },
          { name: "Caleb Houstan", min: 6, pts: 0, reb: 0, ast: 0, stl: 0, blk: 0, to: 1, tpm: 0, fgm: 0, fga: 1, ftm: 0, fta: 0, composite: -6.32, zScores: { pts: -1.615, reb: -1.198, ast: -0.934, stl: -0.747, blk: -0.591, tpm: -0.912, fgImpact: -0.46, ftImpact: 0, to: 0.137 } },
          { name: "Karlo Matkovic", min: 12, pts: 3, reb: 3, ast: 1, stl: 2, blk: 1, to: 0, tpm: 0, fgm: 1, fga: 3, ftm: 1, fta: 2, composite: 0.57, zScores: { pts: -0.936, reb: 0.144, ast: -0.364, stl: 1.691, blk: 1.001, tpm: -0.912, fgImpact: -0.397, ftImpact: -0.639, to: 0.984 } },
          { name: "Derik Queen", min: 17, pts: 10, reb: 9, ast: 1, stl: 3, blk: 0, to: 2, tpm: 1, fgm: 3, fga: 6, ftm: 3, fta: 7, composite: 2.03, zScores: { pts: 0.648, reb: 2.83, ast: -0.364, stl: 2.91, blk: -0.591, tpm: 0.071, fgImpact: 0.189, ftImpact: -2.95, to: -0.711 } },
          { name: "Jordan Poole", min: 16, pts: 9, reb: 1, ast: 0, stl: 1, blk: 0, to: 0, tpm: 0, fgm: 2, fga: 3, ftm: 5, fta: 6, composite: 0.22, zScores: { pts: 0.421, reb: -0.751, ast: -0.934, stl: 0.472, blk: -0.591, tpm: -0.912, fgImpact: 0.586, ftImpact: 0.943, to: 0.984 } },
          { name: "Saddiq Bey", min: 20, pts: 5, reb: 2, ast: 0, stl: 1, blk: 0, to: 1, tpm: 0, fgm: 1, fga: 6, ftm: 3, fta: 3, composite: -3.21, zScores: { pts: -0.483, reb: -0.303, ast: -0.934, stl: 0.472, blk: -0.591, tpm: -0.912, fgImpact: -1.778, ftImpact: 1.186, to: 0.137 } },
          { name: "Bryce McGowens", min: 12, pts: 7, reb: 1, ast: 1, stl: 2, blk: 1, to: 1, tpm: 1, fgm: 2, fga: 6, ftm: 2, fta: 2, composite: 1.75, zScores: { pts: -0.031, reb: -0.751, ast: -0.364, stl: 1.691, blk: 1.001, tpm: 0.071, fgImpact: -0.794, ftImpact: 0.791, to: 0.137 } },
          { name: "Bennedict Mathurin", min: 17, pts: 13, reb: 2, ast: 5, stl: 0, blk: 0, to: 1, tpm: 2, fgm: 3, fga: 5, ftm: 5, fta: 5, composite: 5.42, zScores: { pts: 1.326, reb: -0.303, ast: 1.919, stl: -0.747, blk: -0.591, tpm: 1.054, fgImpact: 0.649, ftImpact: 1.977, to: 0.137 } },
          { name: "Kobe Bufkin", min: 6, pts: 6, reb: 1, ast: 0, stl: 0, blk: 0, to: 0, tpm: 0, fgm: 2, fga: 4, ftm: 2, fta: 2, composite: -2.29, zScores: { pts: -0.257, reb: -0.751, ast: -0.934, stl: -0.747, blk: -0.591, tpm: -0.912, fgImpact: 0.126, ftImpact: 0.791, to: 0.984 } },
          { name: "Jaron Pierre Jr.", min: 12, pts: 3, reb: 4, ast: 3, stl: 0, blk: 1, to: 1, tpm: 1, fgm: 1, fga: 4, ftm: 0, fta: 0, composite: 0.04, zScores: { pts: -0.936, reb: 0.592, ast: 0.778, stl: -0.747, blk: 1.001, tpm: 0.071, fgImpact: -0.857, ftImpact: 0, to: 0.137 } },
          { name: "Jeremiah Fears", min: 17, pts: 12, reb: 2, ast: 1, stl: 0, blk: 0, to: 1, tpm: 2, fgm: 3, fga: 6, ftm: 4, fta: 6, composite: -0.01, zScores: { pts: 1.1, reb: -0.303, ast: -0.364, stl: -0.747, blk: -0.591, tpm: 1.054, fgImpact: 0.189, ftImpact: -0.487, to: 0.137 } }
        ]
      },
      home: {
        abbr: "OKC", name: "Oklahoma City Thunder", score: 110,
        players: [
          { name: "Aday Mara", min: 18, pts: 12, reb: 9, ast: 3, stl: 0, blk: 3, to: 2, tpm: 0, fgm: 5, fga: 5, ftm: 2, fta: 2, composite: 9.93, zScores: { pts: 1.1, reb: 2.83, ast: 0.778, stl: -0.747, blk: 4.185, tpm: -0.912, fgImpact: 2.615, ftImpact: 0.791, to: -0.711 } },
          { name: "Kenrich Williams", min: 18, pts: 9, reb: 8, ast: 2, stl: 1, blk: 1, to: 1, tpm: 3, fgm: 3, fga: 6, ftm: 0, fta: 0, composite: 6.85, zScores: { pts: 0.421, reb: 2.382, ast: 0.207, stl: 0.472, blk: 1.001, tpm: 2.037, fgImpact: 0.189, ftImpact: 0, to: 0.137 } },
          { name: "Jared McCain", min: 16, pts: 12, reb: 1, ast: 5, stl: 1, blk: 0, to: 1, tpm: 4, fgm: 4, fga: 10, ftm: 0, fta: 0, composite: 4.64, zScores: { pts: 1.1, reb: -0.751, ast: 1.919, stl: 0.472, blk: -0.591, tpm: 3.02, fgImpact: -0.669, ftImpact: 0, to: 0.137 } },
          { name: "Ajay Mitchell", min: 18, pts: 11, reb: 1, ast: 4, stl: 0, blk: 0, to: 2, tpm: 1, fgm: 2, fga: 7, ftm: 6, fta: 6, composite: 0.61, zScores: { pts: 0.874, reb: -0.751, ast: 1.349, stl: -0.747, blk: -0.591, tpm: 0.071, fgImpact: -1.255, ftImpact: 2.372, to: -0.711 } },
          { name: "Bennett Stirtz", min: 31, pts: 15, reb: 5, ast: 6, stl: 0, blk: 0, to: 4, tpm: 3, fgm: 6, fga: 9, ftm: 0, fta: 0, composite: 5.36, zScores: { pts: 1.779, reb: 1.039, ast: 2.49, stl: -0.747, blk: -0.591, tpm: 2.037, fgImpact: 1.758, ftImpact: 0, to: -2.405 } },
          { name: "Brooks Barnhizer", min: 26, pts: 12, reb: 7, ast: 3, stl: 0, blk: 1, to: 2, tpm: 1, fgm: 4, fga: 5, ftm: 3, fta: 5, composite: 4.18, zScores: { pts: 1.1, reb: 1.935, ast: 0.778, stl: -0.747, blk: 1.001, tpm: 0.071, fgImpact: 1.632, ftImpact: -0.882, to: -0.711 } },
          { name: "Andrew Holifield", min: 7, pts: 4, reb: 0, ast: 0, stl: 0, blk: 0, to: 0, tpm: 0, fgm: 1, fga: 4, ftm: 2, fta: 2, composite: -4.17, zScores: { pts: -0.71, reb: -1.198, ast: -0.934, stl: -0.747, blk: -0.591, tpm: -0.912, fgImpact: -0.857, ftImpact: 0.791, to: 0.984 } },
          { name: "Christoph Tilly", min: 25, pts: 9, reb: 4, ast: 2, stl: 0, blk: 1, to: 3, tpm: 0, fgm: 4, fga: 7, ftm: 1, fta: 2, composite: -0.92, zScores: { pts: 0.421, reb: 0.592, ast: 0.207, stl: -0.747, blk: 1.001, tpm: -0.912, fgImpact: 0.712, ftImpact: -0.639, to: -1.558 } },
          { name: "Zhaire Smith", min: 14, pts: 2, reb: 1, ast: 0, stl: 0, blk: 1, to: 1, tpm: 0, fgm: 1, fga: 4, ftm: 0, fta: 0, composite: -4.23, zScores: { pts: -1.162, reb: -0.751, ast: -0.934, stl: -0.747, blk: 1.001, tpm: -0.912, fgImpact: -0.857, ftImpact: 0, to: 0.137 } },
          { name: "Anthony Pritchard", min: 10, pts: 7, reb: 2, ast: 1, stl: 2, blk: 0, to: 2, tpm: 1, fgm: 3, fga: 3, ftm: 0, fta: 0, composite: 1.33, zScores: { pts: -0.031, reb: -0.303, ast: -0.364, stl: 1.691, blk: -0.591, tpm: 0.071, fgImpact: 1.569, ftImpact: 0, to: -0.711 } },
          { name: "Josh Dix", min: 30, pts: 11, reb: 2, ast: 2, stl: 0, blk: 0, to: 2, tpm: 3, fgm: 4, fga: 7, ftm: 0, fta: 0, composite: 1.48, zScores: { pts: 0.874, reb: -0.303, ast: 0.207, stl: -0.747, blk: -0.591, tpm: 2.037, fgImpact: 0.712, ftImpact: 0, to: -0.711 } },
          { name: "Otega Oweh", min: 28, pts: 6, reb: 6, ast: 1, stl: 2, blk: 1, to: 2, tpm: 0, fgm: 3, fga: 9, ftm: 0, fta: 4, composite: -3.39, zScores: { pts: -0.257, reb: 1.487, ast: -0.364, stl: 1.691, blk: 1.001, tpm: -0.912, fgImpact: -1.192, ftImpact: -4.136, to: -0.711 } }
        ]
      }
    },
      {
      id: "401914128",
      line: "Denver Nuggets 117 @ Utah Jazz 106 (Final)",
      completed: true,
      statusText: "Final",
      away: {
        abbr: "DEN", name: "Denver Nuggets", score: 117,
        players: [
          { name: "Aaron Gordon", min: 15, pts: 18, reb: 5, ast: 0, stl: 0, blk: 0, to: 0, tpm: 2, fgm: 5, fga: 7, ftm: 6, fta: 7, composite: 6.3, zScores: { pts: 2.458, reb: 1.039, ast: -0.934, stl: -0.747, blk: -0.591, tpm: 1.054, fgImpact: 1.695, ftImpact: 1.338, to: 0.984 } },
          { name: "Cameron Johnson", min: 15, pts: 10, reb: 1, ast: 1, stl: 0, blk: 0, to: 0, tpm: 2, fgm: 4, fga: 7, ftm: 0, fta: 0, composite: 0.95, zScores: { pts: 0.648, reb: -0.751, ast: -0.364, stl: -0.747, blk: -0.591, tpm: 1.054, fgImpact: 0.712, ftImpact: 0, to: 0.984 } },
          { name: "Nikola Jokic", min: 16, pts: 6, reb: 4, ast: 5, stl: 1, blk: 0, to: 2, tpm: 0, fgm: 2, fga: 4, ftm: 2, fta: 4, composite: -0.64, zScores: { pts: -0.257, reb: 0.592, ast: 1.919, stl: 0.472, blk: -0.591, tpm: -0.912, fgImpact: 0.126, ftImpact: -1.277, to: -0.711 } },
          { name: "Jamal Murray", min: 16, pts: 4, reb: 2, ast: 3, stl: 0, blk: 1, to: 0, tpm: 0, fgm: 1, fga: 4, ftm: 2, fta: 2, composite: 0.02, zScores: { pts: -0.71, reb: -0.303, ast: 0.778, stl: -0.747, blk: 1.001, tpm: -0.912, fgImpact: -0.857, ftImpact: 0.791, to: 0.984 } },
          { name: "Christian Braun", min: 14, pts: 5, reb: 4, ast: 0, stl: 0, blk: 1, to: 1, tpm: 1, fgm: 2, fga: 6, ftm: 0, fta: 0, composite: -1.16, zScores: { pts: -0.483, reb: 0.592, ast: -0.934, stl: -0.747, blk: 1.001, tpm: 0.071, fgImpact: -0.794, ftImpact: 0, to: 0.137 } },
          { name: "Alpha Diallo", min: 21, pts: 8, reb: 2, ast: 0, stl: 2, blk: 0, to: 3, tpm: 2, fgm: 3, fga: 3, ftm: 0, fta: 4, composite: -3.01, zScores: { pts: 0.195, reb: -0.303, ast: -0.934, stl: 1.691, blk: -0.591, tpm: 1.054, fgImpact: 1.569, ftImpact: -4.136, to: -1.558 } },
          { name: "Marvin Bagley III", min: 15, pts: 10, reb: 5, ast: 0, stl: 1, blk: 1, to: 1, tpm: 0, fgm: 4, fga: 5, ftm: 2, fta: 2, composite: 3.87, zScores: { pts: 0.648, reb: 1.039, ast: -0.934, stl: 0.472, blk: 1.001, tpm: -0.912, fgImpact: 1.632, ftImpact: 0.791, to: 0.137 } },
          { name: "Zeke Nnaji", min: 9, pts: 6, reb: 4, ast: 0, stl: 0, blk: 1, to: 2, tpm: 0, fgm: 2, fga: 4, ftm: 2, fta: 2, composite: -1.05, zScores: { pts: -0.257, reb: 0.592, ast: -0.934, stl: -0.747, blk: 1.001, tpm: -0.912, fgImpact: 0.126, ftImpact: 0.791, to: -0.711 } },
          { name: "DaRon Holmes II", min: 8, pts: 4, reb: 3, ast: 1, stl: 0, blk: 2, to: 0, tpm: 0, fgm: 1, fga: 3, ftm: 2, fta: 2, composite: 1.38, zScores: { pts: -0.71, reb: 0.144, ast: -0.364, stl: -0.747, blk: 2.593, tpm: -0.912, fgImpact: -0.397, ftImpact: 0.791, to: 0.984 } },
          { name: "Bryce Hopkins", min: 11, pts: 1, reb: 1, ast: 1, stl: 0, blk: 0, to: 1, tpm: 0, fgm: 0, fga: 0, ftm: 1, fta: 2, composite: -5.25, zScores: { pts: -1.388, reb: -0.751, ast: -0.364, stl: -0.747, blk: -0.591, tpm: -0.912, fgImpact: 0, ftImpact: -0.639, to: 0.137 } },
          { name: "Trevon Brazile", min: 17, pts: 4, reb: 2, ast: 0, stl: 0, blk: 1, to: 1, tpm: 0, fgm: 2, fga: 2, ftm: 0, fta: 2, composite: -3.49, zScores: { pts: -0.71, reb: -0.303, ast: -0.934, stl: -0.747, blk: 1.001, tpm: -0.912, fgImpact: 1.046, ftImpact: -2.068, to: 0.137 } },
          { name: "Cam Whitmore", min: 15, pts: 14, reb: 1, ast: 0, stl: 0, blk: 0, to: 0, tpm: 0, fgm: 4, fga: 7, ftm: 6, fta: 7, composite: 0.65, zScores: { pts: 1.553, reb: -0.751, ast: -0.934, stl: -0.747, blk: -0.591, tpm: -0.912, fgImpact: 0.712, ftImpact: 1.338, to: 0.984 } },
          { name: "DeMar DeRozan", min: 11, pts: 7, reb: 1, ast: 1, stl: 0, blk: 0, to: 0, tpm: 1, fgm: 2, fga: 5, ftm: 2, fta: 2, composite: -0.97, zScores: { pts: -0.031, reb: -0.751, ast: -0.364, stl: -0.747, blk: -0.591, tpm: 0.071, fgImpact: -0.334, ftImpact: 0.791, to: 0.984 } },
          { name: "Tyus Jones", min: 15, pts: 2, reb: 2, ast: 6, stl: 2, blk: 0, to: 1, tpm: 0, fgm: 1, fga: 2, ftm: 0, fta: 0, composite: 1.41, zScores: { pts: -1.162, reb: -0.303, ast: 2.49, stl: 1.691, blk: -0.591, tpm: -0.912, fgImpact: 0.063, ftImpact: 0, to: 0.137 } },
          { name: "Lonnie Walker IV", min: 8, pts: 1, reb: 0, ast: 0, stl: 0, blk: 0, to: 0, tpm: 0, fgm: 0, fga: 1, ftm: 1, fta: 2, composite: -5.89, zScores: { pts: -1.388, reb: -1.198, ast: -0.934, stl: -0.747, blk: -0.591, tpm: -0.912, fgImpact: -0.46, ftImpact: -0.639, to: 0.984 } },
          { name: "Julian Strawther", min: 18, pts: 15, reb: 4, ast: 3, stl: 1, blk: 0, to: 2, tpm: 3, fgm: 4, fga: 7, ftm: 4, fta: 4, composite: 6.65, zScores: { pts: 1.779, reb: 0.592, ast: 0.778, stl: 0.472, blk: -0.591, tpm: 2.037, fgImpact: 0.712, ftImpact: 1.581, to: -0.711 } },
          { name: "Ryan Nembhard", min: 16, pts: 2, reb: 0, ast: 5, stl: 1, blk: 0, to: 1, tpm: 0, fgm: 1, fga: 5, ftm: 0, fta: 0, composite: -2.65, zScores: { pts: -1.162, reb: -1.198, ast: 1.919, stl: 0.472, blk: -0.591, tpm: -0.912, fgImpact: -1.317, ftImpact: 0, to: 0.137 } }
        ]
      },
      home: {
        abbr: "UTAH", name: "Utah Jazz", score: 106,
        players: [
          { name: "Jaren Jackson Jr.", min: 16, pts: 7, reb: 1, ast: 0, stl: 0, blk: 1, to: 1, tpm: 1, fgm: 2, fga: 3, ftm: 2, fta: 3, composite: -0.91, zScores: { pts: -0.031, reb: -0.751, ast: -0.934, stl: -0.747, blk: 1.001, tpm: 0.071, fgImpact: 0.586, ftImpact: -0.243, to: 0.137 } },
          { name: "Jaxson Hayes", min: 14, pts: 7, reb: 4, ast: 0, stl: 0, blk: 1, to: 0, tpm: 0, fgm: 3, fga: 7, ftm: 1, fta: 2, composite: -0.96, zScores: { pts: -0.031, reb: 0.592, ast: -0.934, stl: -0.747, blk: 1.001, tpm: -0.912, fgImpact: -0.271, ftImpact: -0.639, to: 0.984 } },
          { name: "Keyonte George", min: 13, pts: 6, reb: 0, ast: 4, stl: 0, blk: 0, to: 2, tpm: 2, fgm: 2, fga: 4, ftm: 0, fta: 1, composite: -2.01, zScores: { pts: -0.257, reb: -1.198, ast: 1.349, stl: -0.747, blk: -0.591, tpm: 1.054, fgImpact: 0.126, ftImpact: -1.034, to: -0.711 } },
          { name: "Ace Bailey", min: 27, pts: 10, reb: 7, ast: 3, stl: 1, blk: 1, to: 2, tpm: 2, fgm: 4, fga: 12, ftm: 0, fta: 0, composite: 3.59, zScores: { pts: 0.648, reb: 1.935, ast: 0.778, stl: 0.472, blk: 1.001, tpm: 1.054, fgImpact: -1.589, ftImpact: 0, to: -0.711 } },
          { name: "Darryn Peterson", min: 30, pts: 23, reb: 3, ast: 3, stl: 0, blk: 0, to: 2, tpm: 1, fgm: 10, fga: 18, ftm: 2, fta: 4, composite: 2.81, zScores: { pts: 3.589, reb: 0.144, ast: 0.778, stl: -0.747, blk: -0.591, tpm: 0.071, fgImpact: 1.549, ftImpact: -1.277, to: -0.711 } },
          { name: "Blake Hinson", min: 12, pts: 0, reb: 0, ast: 1, stl: 0, blk: 0, to: 1, tpm: 0, fgm: 0, fga: 3, ftm: 0, fta: 0, composite: -6.67, zScores: { pts: -1.615, reb: -1.198, ast: -0.364, stl: -0.747, blk: -0.591, tpm: -0.912, fgImpact: -1.38, ftImpact: 0, to: 0.137 } },
          { name: "Harrison Ingram", min: 8, pts: 9, reb: 5, ast: 2, stl: 0, blk: 0, to: 0, tpm: 1, fgm: 3, fga: 5, ftm: 2, fta: 2, composite: 2.82, zScores: { pts: 0.421, reb: 1.039, ast: 0.207, stl: -0.747, blk: -0.591, tpm: 0.071, fgImpact: 0.649, ftImpact: 0.791, to: 0.984 } },
          { name: "Mo Bamba", min: 20, pts: 8, reb: 10, ast: 0, stl: 0, blk: 0, to: 2, tpm: 0, fgm: 4, fga: 6, ftm: 0, fta: 0, composite: 0.75, zScores: { pts: 0.195, reb: 3.277, ast: -0.934, stl: -0.747, blk: -0.591, tpm: -0.912, fgImpact: 1.172, ftImpact: 0, to: -0.711 } },
          { name: "Jonas Aidoo", min: 8, pts: 6, reb: 5, ast: 0, stl: 0, blk: 1, to: 0, tpm: 0, fgm: 2, fga: 3, ftm: 2, fta: 4, composite: -0.52, zScores: { pts: -0.257, reb: 1.039, ast: -0.934, stl: -0.747, blk: 1.001, tpm: -0.912, fgImpact: 0.586, ftImpact: -1.277, to: 0.984 } },
          { name: "Svi Mykhailiuk", min: 22, pts: 9, reb: 3, ast: 0, stl: 2, blk: 1, to: 1, tpm: 2, fgm: 3, fga: 14, ftm: 1, fta: 2, composite: -0.62, zScores: { pts: 0.421, reb: 0.144, ast: -0.934, stl: 1.691, blk: 1.001, tpm: 1.054, fgImpact: -3.492, ftImpact: -0.639, to: 0.137 } },
          { name: "Josh Okogie", min: 25, pts: 8, reb: 3, ast: 3, stl: 1, blk: 0, to: 0, tpm: 2, fgm: 3, fga: 6, ftm: 0, fta: 1, composite: 2.19, zScores: { pts: 0.195, reb: 0.144, ast: 0.778, stl: 0.472, blk: -0.591, tpm: 1.054, fgImpact: 0.189, ftImpact: -1.034, to: 0.984 } },
          { name: "Josh Green", min: 11, pts: 0, reb: 2, ast: 2, stl: 2, blk: 0, to: 0, tpm: 0, fgm: 0, fga: 2, ftm: 0, fta: 0, composite: -1.46, zScores: { pts: -1.615, reb: -0.303, ast: 0.207, stl: 1.691, blk: -0.591, tpm: -0.912, fgImpact: -0.92, ftImpact: 0, to: 0.984 } },
          { name: "Trey Alexander", min: 8, pts: 7, reb: 0, ast: 1, stl: 0, blk: 0, to: 0, tpm: 1, fgm: 2, fga: 3, ftm: 2, fta: 2, composite: -0.5, zScores: { pts: -0.031, reb: -1.198, ast: -0.364, stl: -0.747, blk: -0.591, tpm: 0.071, fgImpact: 0.586, ftImpact: 0.791, to: 0.984 } },
          { name: "Isaiah Collier", min: 17, pts: 6, reb: 0, ast: 3, stl: 0, blk: 0, to: 2, tpm: 0, fgm: 3, fga: 6, ftm: 0, fta: 1, composite: -4.48, zScores: { pts: -0.257, reb: -1.198, ast: 0.778, stl: -0.747, blk: -0.591, tpm: -0.912, fgImpact: 0.189, ftImpact: -1.034, to: -0.711 } },
          { name: "Tamar Bates", min: 12, pts: 0, reb: 0, ast: 0, stl: 0, blk: 0, to: 1, tpm: 0, fgm: 0, fga: 1, ftm: 0, fta: 0, composite: -6.32, zScores: { pts: -1.615, reb: -1.198, ast: -0.934, stl: -0.747, blk: -0.591, tpm: -0.912, fgImpact: -0.46, ftImpact: 0, to: 0.137 } }
        ]
      }
    },
      {
      id: "401898390",
      line: "Los Angeles Lakers 98 @ Golden State Warriors 124 (Final)",
      completed: true,
      statusText: "Final",
      away: {
        abbr: "LAL", name: "Los Angeles Lakers", score: 98,
        players: [
          { name: "Sandro Mamukelashvili", min: 18, pts: 15, reb: 2, ast: 2, stl: 0, blk: 1, to: 1, tpm: 3, fgm: 6, fga: 10, ftm: 0, fta: 0, composite: 5.41, zScores: { pts: 1.779, reb: -0.303, ast: 0.207, stl: -0.747, blk: 1.001, tpm: 2.037, fgImpact: 1.298, ftImpact: 0, to: 0.137 } },
          { name: "Jake LaRavia", min: 22, pts: 9, reb: 3, ast: 1, stl: 3, blk: 1, to: 1, tpm: 1, fgm: 3, fga: 7, ftm: 2, fta: 3, composite: 3.81, zScores: { pts: 0.421, reb: 0.144, ast: -0.364, stl: 2.91, blk: 1.001, tpm: 0.071, fgImpact: -0.271, ftImpact: -0.243, to: 0.137 } },
          { name: "Adou Thiero", min: 17, pts: 7, reb: 4, ast: 0, stl: 0, blk: 0, to: 2, tpm: 0, fgm: 3, fga: 6, ftm: 1, fta: 3, composite: -4.82, zScores: { pts: -0.031, reb: 0.592, ast: -0.934, stl: -0.747, blk: -0.591, tpm: -0.912, fgImpact: 0.189, ftImpact: -1.673, to: -0.711 } },
          { name: "Quentin Grimes", min: 23, pts: 12, reb: 1, ast: 3, stl: 1, blk: 0, to: 3, tpm: 2, fgm: 3, fga: 8, ftm: 4, fta: 5, composite: 0.32, zScores: { pts: 1.1, reb: -0.751, ast: 0.778, stl: 0.472, blk: -0.591, tpm: 1.054, fgImpact: -0.732, ftImpact: 0.547, to: -1.558 } },
          { name: "Bronny James", min: 21, pts: 4, reb: 1, ast: 5, stl: 0, blk: 0, to: 3, tpm: 0, fgm: 2, fga: 5, ftm: 0, fta: 0, composite: -3.68, zScores: { pts: -0.71, reb: -0.751, ast: 1.919, stl: -0.747, blk: -0.591, tpm: -0.912, fgImpact: -0.334, ftImpact: 0, to: -1.558 } },
          { name: "Kevon Looney", min: 13, pts: 0, reb: 3, ast: 2, stl: 0, blk: 1, to: 0, tpm: 0, fgm: 0, fga: 1, ftm: 0, fta: 0, composite: -1.4, zScores: { pts: -1.615, reb: 0.144, ast: 0.207, stl: -0.747, blk: 1.001, tpm: -0.912, fgImpact: -0.46, ftImpact: 0, to: 0.984 } },
          { name: "Jarred Vanderbilt", min: 16, pts: 2, reb: 5, ast: 1, stl: 3, blk: 1, to: 1, tpm: 0, fgm: 1, fga: 2, ftm: 0, fta: 0, composite: 2.71, zScores: { pts: -1.162, reb: 1.039, ast: -0.364, stl: 2.91, blk: 1.001, tpm: -0.912, fgImpact: 0.063, ftImpact: 0, to: 0.137 } },
          { name: "Cole Swider", min: 12, pts: 9, reb: 2, ast: 0, stl: 0, blk: 0, to: 0, tpm: 3, fgm: 3, fga: 7, ftm: 0, fta: 0, composite: 0.6, zScores: { pts: 0.421, reb: -0.303, ast: -0.934, stl: -0.747, blk: -0.591, tpm: 2.037, fgImpact: -0.271, ftImpact: 0, to: 0.984 } },
          { name: "Dalton Knecht", min: 22, pts: 11, reb: 1, ast: 1, stl: 0, blk: 0, to: 3, tpm: 1, fgm: 3, fga: 8, ftm: 4, fta: 4, composite: -2.21, zScores: { pts: 0.874, reb: -0.751, ast: -0.364, stl: -0.747, blk: -0.591, tpm: 0.071, fgImpact: -0.732, ftImpact: 1.581, to: -1.558 } },
          { name: "William Kyle III", min: 10, pts: 0, reb: 2, ast: 0, stl: 0, blk: 0, to: 0, tpm: 0, fgm: 0, fga: 2, ftm: 0, fta: 0, composite: -5.04, zScores: { pts: -1.615, reb: -0.303, ast: -0.934, stl: -0.747, blk: -0.591, tpm: -0.912, fgImpact: -0.92, ftImpact: 0, to: 0.984 } },
          { name: "AK Okereke", min: 13, pts: 4, reb: 3, ast: 2, stl: 0, blk: 0, to: 0, tpm: 0, fgm: 1, fga: 3, ftm: 2, fta: 2, composite: -1.23, zScores: { pts: -0.71, reb: 0.144, ast: 0.207, stl: -0.747, blk: -0.591, tpm: -0.912, fgImpact: -0.397, ftImpact: 0.791, to: 0.984 } },
          { name: "Chris Manon", min: 22, pts: 7, reb: 4, ast: 0, stl: 2, blk: 1, to: 1, tpm: 1, fgm: 3, fga: 8, ftm: 0, fta: 0, composite: 1.8, zScores: { pts: -0.031, reb: 0.592, ast: -0.934, stl: 1.691, blk: 1.001, tpm: 0.071, fgImpact: -0.732, ftImpact: 0, to: 0.137 } },
          { name: "Jaden Hardy", min: 19, pts: 13, reb: 4, ast: 3, stl: 2, blk: 0, to: 5, tpm: 1, fgm: 4, fga: 12, ftm: 4, fta: 4, composite: 0.61, zScores: { pts: 1.326, reb: 0.592, ast: 0.778, stl: 1.691, blk: -0.591, tpm: 0.071, fgImpact: -1.589, ftImpact: 1.581, to: -3.252 } },
          { name: "Cameron Carr", min: 12, pts: 5, reb: 0, ast: 0, stl: 2, blk: 0, to: 2, tpm: 1, fgm: 1, fga: 4, ftm: 2, fta: 2, composite: -2.22, zScores: { pts: -0.483, reb: -1.198, ast: -0.934, stl: 1.691, blk: -0.591, tpm: 0.071, fgImpact: -0.857, ftImpact: 0.791, to: -0.711 } }
        ]
      },
      home: {
        abbr: "GS", name: "Golden State Warriors", score: 124,
        players: [
          { name: "Draymond Green", min: 15, pts: 3, reb: 2, ast: 8, stl: 1, blk: 0, to: 2, tpm: 1, fgm: 1, fga: 1, ftm: 0, fta: 0, composite: 2.16, zScores: { pts: -0.936, reb: -0.303, ast: 3.632, stl: 0.472, blk: -0.591, tpm: 0.071, fgImpact: 0.523, ftImpact: 0, to: -0.711 } },
          { name: "Gui Santos", min: 21, pts: 7, reb: 3, ast: 2, stl: 1, blk: 1, to: 1, tpm: 0, fgm: 2, fga: 3, ftm: 3, fta: 4, composite: 1.76, zScores: { pts: -0.031, reb: 0.144, ast: 0.207, stl: 0.472, blk: 1.001, tpm: -0.912, fgImpact: 0.586, ftImpact: 0.152, to: 0.137 } },
          { name: "Yaxel Lendeborg", min: 21, pts: 17, reb: 9, ast: 2, stl: 0, blk: 1, to: 2, tpm: 2, fgm: 7, fga: 11, ftm: 1, fta: 2, composite: 7.05, zScores: { pts: 2.231, reb: 2.83, ast: 0.207, stl: -0.747, blk: 1.001, tpm: 1.054, fgImpact: 1.821, ftImpact: -0.639, to: -0.711 } },
          { name: "Stephen Curry", min: 14, pts: 16, reb: 2, ast: 5, stl: 0, blk: 0, to: 0, tpm: 3, fgm: 4, fga: 7, ftm: 5, fta: 6, composite: 6.96, zScores: { pts: 2.005, reb: -0.303, ast: 1.919, stl: -0.747, blk: -0.591, tpm: 2.037, fgImpact: 0.712, ftImpact: 0.943, to: 0.984 } },
          { name: "Brandin Podziemski", min: 19, pts: 16, reb: 2, ast: 1, stl: 1, blk: 1, to: 2, tpm: 1, fgm: 7, fga: 11, ftm: 1, fta: 2, composite: 3.35, zScores: { pts: 2.005, reb: -0.303, ast: -0.364, stl: 0.472, blk: 1.001, tpm: 0.071, fgImpact: 1.821, ftImpact: -0.639, to: -0.711 } },
          { name: "Georges Niang", min: 19, pts: 7, reb: 1, ast: 0, stl: 1, blk: 0, to: 0, tpm: 1, fgm: 2, fga: 8, ftm: 2, fta: 2, composite: -1.7, zScores: { pts: -0.031, reb: -0.751, ast: -0.934, stl: 0.472, blk: -0.591, tpm: 0.071, fgImpact: -1.715, ftImpact: 0.791, to: 0.984 } },
          { name: "Graham Ike", min: 12, pts: 6, reb: 7, ast: 3, stl: 0, blk: 0, to: 2, tpm: 0, fgm: 1, fga: 4, ftm: 4, fta: 4, composite: 0.22, zScores: { pts: -0.257, reb: 1.935, ast: 0.778, stl: -0.747, blk: -0.591, tpm: -0.912, fgImpact: -0.857, ftImpact: 1.581, to: -0.711 } },
          { name: "Malevy Leons", min: 10, pts: 5, reb: 1, ast: 1, stl: 0, blk: 0, to: 1, tpm: 1, fgm: 2, fga: 3, ftm: 0, fta: 0, composite: -2.14, zScores: { pts: -0.483, reb: -0.751, ast: -0.364, stl: -0.747, blk: -0.591, tpm: 0.071, fgImpact: 0.586, ftImpact: 0, to: 0.137 } },
          { name: "Alex Toohey", min: 3, pts: 3, reb: 1, ast: 0, stl: 0, blk: 0, to: 0, tpm: 1, fgm: 1, fga: 1, ftm: 0, fta: 0, composite: -2.38, zScores: { pts: -0.936, reb: -0.751, ast: -0.934, stl: -0.747, blk: -0.591, tpm: 0.071, fgImpact: 0.523, ftImpact: 0, to: 0.984 } },
          { name: "Charles Bassey", min: 14, pts: 4, reb: 6, ast: 2, stl: 1, blk: 3, to: 0, tpm: 0, fgm: 2, fga: 4, ftm: 0, fta: 0, composite: 5.84, zScores: { pts: -0.71, reb: 1.487, ast: 0.207, stl: 0.472, blk: 4.185, tpm: -0.912, fgImpact: 0.126, ftImpact: 0, to: 0.984 } },
          { name: "Gary Payton II", min: 16, pts: 4, reb: 5, ast: 1, stl: 1, blk: 0, to: 2, tpm: 1, fgm: 1, fga: 2, ftm: 1, fta: 2, composite: -1.37, zScores: { pts: -0.71, reb: 1.039, ast: -0.364, stl: 0.472, blk: -0.591, tpm: 0.071, fgImpact: 0.063, ftImpact: -0.639, to: -0.711 } },
          { name: "De'Anthony Melton", min: 18, pts: 9, reb: 1, ast: 3, stl: 1, blk: 0, to: 2, tpm: 1, fgm: 2, fga: 7, ftm: 4, fta: 4, composite: 0.02, zScores: { pts: 0.421, reb: -0.751, ast: 0.778, stl: 0.472, blk: -0.591, tpm: 0.071, fgImpact: -1.255, ftImpact: 1.581, to: -0.711 } },
          { name: "Brandon Williams", min: 18, pts: 10, reb: 2, ast: 1, stl: 1, blk: 1, to: 5, tpm: 0, fgm: 3, fga: 6, ftm: 4, fta: 4, composite: -0.94, zScores: { pts: 0.648, reb: -0.303, ast: -0.364, stl: 0.472, blk: 1.001, tpm: -0.912, fgImpact: 0.189, ftImpact: 1.581, to: -3.252 } },
          { name: "LJ Cryer", min: 9, pts: 2, reb: 0, ast: 1, stl: 1, blk: 0, to: 2, tpm: 0, fgm: 1, fga: 5, ftm: 0, fta: 0, composite: -5.78, zScores: { pts: -1.162, reb: -1.198, ast: -0.364, stl: 0.472, blk: -0.591, tpm: -0.912, fgImpact: -1.317, ftImpact: 0, to: -0.711 } },
          { name: "Dalen Terry", min: 8, pts: 4, reb: 1, ast: 1, stl: 1, blk: 0, to: 1, tpm: 0, fgm: 1, fga: 2, ftm: 2, fta: 2, composite: -1.86, zScores: { pts: -0.71, reb: -0.751, ast: -0.364, stl: 0.472, blk: -0.591, tpm: -0.912, fgImpact: 0.063, ftImpact: 0.791, to: 0.137 } },
          { name: "Miles Kelly", min: 6, pts: 6, reb: 0, ast: 0, stl: 0, blk: 1, to: 1, tpm: 2, fgm: 2, fga: 2, ftm: 0, fta: 0, composite: 0.1, zScores: { pts: -0.257, reb: -1.198, ast: -0.934, stl: -0.747, blk: 1.001, tpm: 1.054, fgImpact: 1.046, ftImpact: 0, to: 0.137 } },
          { name: "Will Richard", min: 15, pts: 5, reb: 1, ast: 1, stl: 0, blk: 1, to: 0, tpm: 1, fgm: 2, fga: 3, ftm: 0, fta: 0, composite: 0.3, zScores: { pts: -0.483, reb: -0.751, ast: -0.364, stl: -0.747, blk: 1.001, tpm: 0.071, fgImpact: 0.586, ftImpact: 0, to: 0.984 } }
        ]
      }
    }
    ]
  },
    "2026-10-07": {
    games: [
      {
      id: "401914123",
      line: "Minnesota Timberwolves 112 @ Indiana Pacers 123 (Final)",
      completed: true,
      statusText: "Final",
      away: {
        abbr: "MIN", name: "Minnesota Timberwolves", score: 112,
        players: [
          { name: "Jaden McDaniels", min: 21, pts: 16, reb: 3, ast: 0, stl: 1, blk: 1, to: 1, tpm: 4, fgm: 6, fga: 10, ftm: 0, fta: 0, composite: 4.9, zScores: { pts: 1.341, reb: 0.022, ast: -1.01, stl: 0.346, blk: 0.831, tpm: 2.26, fgImpact: 0.931, ftImpact: 0, to: 0.177 } },
          { name: "Jonathan Kuminga", min: 19, pts: 2, reb: 1, ast: 3, stl: 1, blk: 0, to: 0, tpm: 0, fgm: 1, fga: 9, ftm: 0, fta: 0, composite: -3.89, zScores: { pts: -1.06, reb: -0.801, ast: 0.451, stl: 0.346, blk: -0.551, tpm: -0.859, fgImpact: -2.464, ftImpact: 0, to: 1.051 } },
          { name: "Rudy Gobert", min: 19, pts: 7, reb: 9, ast: 2, stl: 1, blk: 0, to: 2, tpm: 0, fgm: 2, fga: 3, ftm: 3, fta: 3, composite: 2.16, zScores: { pts: -0.203, reb: 2.492, ast: -0.036, stl: 0.346, blk: -0.551, tpm: -0.859, fgImpact: 0.429, ftImpact: 1.242, to: -0.697 } },
          { name: "LaMelo Ball", min: 20, pts: 14, reb: 4, ast: 7, stl: 0, blk: 0, to: 5, tpm: 4, fgm: 5, fga: 9, ftm: 0, fta: 0, composite: 1.99, zScores: { pts: 0.998, reb: 0.434, ast: 2.399, stl: -0.766, blk: -0.551, tpm: 2.26, fgImpact: 0.537, ftImpact: 0, to: -3.317 } },
          { name: "Anthony Edwards", min: 20, pts: 19, reb: 1, ast: 1, stl: 0, blk: 0, to: 0, tpm: 4, fgm: 5, fga: 10, ftm: 5, fta: 6, composite: 3.55, zScores: { pts: 1.855, reb: -0.801, ast: -0.523, stl: -0.766, blk: -0.551, tpm: 2.26, fgImpact: 0.18, ftImpact: 0.84, to: 1.051 } },
          { name: "Trey Lyles", min: 12, pts: 8, reb: 4, ast: 2, stl: 0, blk: 0, to: 0, tpm: 2, fgm: 3, fga: 4, ftm: 0, fta: 0, composite: 1.62, zScores: { pts: -0.031, reb: 0.434, ast: -0.036, stl: -0.766, blk: -0.551, tpm: 0.701, fgImpact: 0.822, ftImpact: 0, to: 1.051 } },
          { name: "Enrique Freeman", min: 8, pts: 0, reb: 1, ast: 0, stl: 1, blk: 2, to: 1, tpm: 0, fgm: 0, fga: 2, ftm: 0, fta: 0, composite: -2.05, zScores: { pts: -1.403, reb: -0.801, ast: -1.01, stl: 0.346, blk: 2.213, tpm: -0.859, fgImpact: -0.714, ftImpact: 0, to: 0.177 } },
          { name: "Norchad Omier", min: 6, pts: 0, reb: 0, ast: 0, stl: 1, blk: 0, to: 0, tpm: 0, fgm: 0, fga: 0, ftm: 0, fta: 0, composite: -3.64, zScores: { pts: -1.403, reb: -1.213, ast: -1.01, stl: 0.346, blk: -0.551, tpm: -0.859, fgImpact: 0, ftImpact: 0, to: 1.051 } },
          { name: "Cody Williams", min: 18, pts: 6, reb: 3, ast: 1, stl: 0, blk: 1, to: 1, tpm: 0, fgm: 2, fga: 7, ftm: 2, fta: 2, composite: -1.66, zScores: { pts: -0.374, reb: 0.022, ast: -0.523, stl: -0.766, blk: 0.831, tpm: -0.859, fgImpact: -0.999, ftImpact: 0.828, to: 0.177 } },
          { name: "Isaiah Evans", min: 7, pts: 2, reb: 0, ast: 0, stl: 0, blk: 1, to: 0, tpm: 0, fgm: 1, fga: 5, ftm: 0, fta: 0, composite: -4.06, zScores: { pts: -1.06, reb: -1.213, ast: -1.01, stl: -0.766, blk: 0.831, tpm: -0.859, fgImpact: -1.035, ftImpact: 0, to: 1.051 } },
          { name: "Joan Beringer", min: 19, pts: 2, reb: 8, ast: 0, stl: 0, blk: 1, to: 2, tpm: 0, fgm: 1, fga: 3, ftm: 0, fta: 0, composite: -1.8, zScores: { pts: -1.06, reb: 2.08, ast: -1.01, stl: -0.766, blk: 0.831, tpm: -0.859, fgImpact: -0.321, ftImpact: 0, to: -0.697 } },
          { name: "Ayo Dosunmu", min: 17, pts: 10, reb: 1, ast: 3, stl: 1, blk: 0, to: 1, tpm: 1, fgm: 3, fga: 7, ftm: 3, fta: 4, composite: -0.38, zScores: { pts: 0.312, reb: -0.801, ast: 0.451, stl: 0.346, blk: -0.551, tpm: -0.079, fgImpact: -0.249, ftImpact: 0.013, to: 0.177 } },
          { name: "Jaylen Clark", min: 11, pts: 0, reb: 1, ast: 0, stl: 2, blk: 0, to: 2, tpm: 0, fgm: 0, fga: 0, ftm: 0, fta: 0, composite: -3.86, zScores: { pts: -1.403, reb: -0.801, ast: -1.01, stl: 1.458, blk: -0.551, tpm: -0.859, fgImpact: 0, ftImpact: 0, to: -0.697 } },
          { name: "Terrence Shannon Jr.", min: 17, pts: 9, reb: 1, ast: 2, stl: 1, blk: 0, to: 1, tpm: 1, fgm: 2, fga: 4, ftm: 4, fta: 5, composite: -0.31, zScores: { pts: 0.14, reb: -0.801, ast: -0.036, stl: 0.346, blk: -0.551, tpm: -0.079, fgImpact: 0.072, ftImpact: 0.426, to: 0.177 } },
          { name: "Bones Hyland", min: 11, pts: 10, reb: 0, ast: 1, stl: 1, blk: 1, to: 1, tpm: 3, fgm: 3, fga: 7, ftm: 1, fta: 1, composite: 1.58, zScores: { pts: 0.312, reb: -1.213, ast: -0.523, stl: 0.346, blk: 0.831, tpm: 1.48, fgImpact: -0.249, ftImpact: 0.414, to: 0.177 } },
          { name: "Zyon Pullin", min: 14, pts: 7, reb: 3, ast: 0, stl: 0, blk: 0, to: 2, tpm: 0, fgm: 3, fga: 5, ftm: 1, fta: 2, composite: -4.41, zScores: { pts: -0.203, reb: 0.022, ast: -1.01, stl: -0.766, blk: -0.551, tpm: -0.859, fgImpact: 0.465, ftImpact: -0.815, to: -0.697 } }
        ]
      },
      home: {
        abbr: "IND", name: "Indiana Pacers", score: 123,
        players: [
          { name: "Pascal Siakam", min: 19, pts: 10, reb: 2, ast: 3, stl: 1, blk: 2, to: 1, tpm: 0, fgm: 5, fga: 8, ftm: 0, fta: 0, composite: 3.14, zScores: { pts: 0.312, reb: -0.389, ast: 0.451, stl: 0.346, blk: 2.213, tpm: -0.859, fgImpact: 0.895, ftImpact: 0, to: 0.177 } },
          { name: "Ivica Zubac", min: 18, pts: 6, reb: 3, ast: 2, stl: 1, blk: 0, to: 3, tpm: 0, fgm: 3, fga: 7, ftm: 0, fta: 0, composite: -3.27, zScores: { pts: -0.374, reb: 0.022, ast: -0.036, stl: 0.346, blk: -0.551, tpm: -0.859, fgImpact: -0.249, ftImpact: 0, to: -1.57 } },
          { name: "Andrew Nembhard", min: 16, pts: 4, reb: 1, ast: 2, stl: 1, blk: 0, to: 1, tpm: 0, fgm: 2, fga: 5, ftm: 0, fta: 0, composite: -2.73, zScores: { pts: -0.717, reb: -0.801, ast: -0.036, stl: 0.346, blk: -0.551, tpm: -0.859, fgImpact: -0.285, ftImpact: 0, to: 0.177 } },
          { name: "Aaron Nesmith", min: 16, pts: 19, reb: 0, ast: 0, stl: 0, blk: 0, to: 0, tpm: 4, fgm: 7, fga: 9, ftm: 1, fta: 1, composite: 4.08, zScores: { pts: 1.855, reb: -1.213, ast: -1.01, stl: -0.766, blk: -0.551, tpm: 2.26, fgImpact: 2.038, ftImpact: 0.414, to: 1.051 } },
          { name: "Tyrese Haliburton", min: 16, pts: 7, reb: 0, ast: 6, stl: 1, blk: 2, to: 1, tpm: 1, fgm: 3, fga: 8, ftm: 0, fta: 0, composite: 2.55, zScores: { pts: -0.203, reb: -1.213, ast: 1.912, stl: 0.346, blk: 2.213, tpm: -0.079, fgImpact: -0.606, ftImpact: 0, to: 0.177 } },
          { name: "Obi Toppin", min: 11, pts: 10, reb: 2, ast: 1, stl: 1, blk: 1, to: 2, tpm: 1, fgm: 4, fga: 5, ftm: 1, fta: 1, composite: 1.43, zScores: { pts: 0.312, reb: -0.389, ast: -0.523, stl: 0.346, blk: 0.831, tpm: -0.079, fgImpact: 1.216, ftImpact: 0.414, to: -0.697 } },
          { name: "Jalen Slawson", min: 18, pts: 4, reb: 5, ast: 1, stl: 2, blk: 2, to: 2, tpm: 0, fgm: 1, fga: 4, ftm: 2, fta: 2, composite: 1.87, zScores: { pts: -0.717, reb: 0.845, ast: -0.523, stl: 1.458, blk: 2.213, tpm: -0.859, fgImpact: -0.678, ftImpact: 0.828, to: -0.697 } },
          { name: "Jarace Walker", min: 28, pts: 7, reb: 5, ast: 10, stl: 0, blk: 0, to: 1, tpm: 1, fgm: 3, fga: 6, ftm: 0, fta: 1, composite: 2.16, zScores: { pts: -0.203, reb: 0.845, ast: 3.859, stl: -0.766, blk: -0.551, tpm: -0.079, fgImpact: 0.108, ftImpact: -1.229, to: 0.177 } },
          { name: "Jay Huff", min: 17, pts: 16, reb: 4, ast: 4, stl: 1, blk: 1, to: 2, tpm: 2, fgm: 6, fga: 11, ftm: 2, fta: 2, composite: 5.29, zScores: { pts: 1.341, reb: 0.434, ast: 0.938, stl: 0.346, blk: 0.831, tpm: 0.701, fgImpact: 0.573, ftImpact: 0.828, to: -0.697 } },
          { name: "Kelly Oubre Jr.", min: 10, pts: 5, reb: 1, ast: 2, stl: 2, blk: 0, to: 2, tpm: 1, fgm: 1, fga: 1, ftm: 2, fta: 2, composite: -0.03, zScores: { pts: -0.546, reb: -0.801, ast: -0.036, stl: 1.458, blk: -0.551, tpm: -0.079, fgImpact: 0.393, ftImpact: 0.828, to: -0.697 } },
          { name: "Kobe Brown", min: 17, pts: 5, reb: 5, ast: 1, stl: 0, blk: 0, to: 2, tpm: 1, fgm: 2, fga: 5, ftm: 0, fta: 0, composite: -2.6, zScores: { pts: -0.546, reb: 0.845, ast: -0.523, stl: -0.766, blk: -0.551, tpm: -0.079, fgImpact: -0.285, ftImpact: 0, to: -0.697 } },
          { name: "Ben Sheppard", min: 22, pts: 13, reb: 5, ast: 0, stl: 2, blk: 0, to: 1, tpm: 3, fgm: 4, fga: 9, ftm: 2, fta: 2, composite: 3.84, zScores: { pts: 0.826, reb: 0.845, ast: -1.01, stl: 1.458, blk: -0.551, tpm: 1.48, fgImpact: -0.213, ftImpact: 0.828, to: 0.177 } },
          { name: "Quenton Jackson", min: 10, pts: 5, reb: 1, ast: 1, stl: 0, blk: 0, to: 1, tpm: 1, fgm: 2, fga: 2, ftm: 0, fta: 0, composite: -2.3, zScores: { pts: -0.546, reb: -0.801, ast: -0.523, stl: -0.766, blk: -0.551, tpm: -0.079, fgImpact: 0.786, ftImpact: 0, to: 0.177 } },
          { name: "Braden Smith", min: 14, pts: 3, reb: 5, ast: 5, stl: 0, blk: 0, to: 1, tpm: 1, fgm: 1, fga: 4, ftm: 0, fta: 0, composite: -0.52, zScores: { pts: -0.889, reb: 0.845, ast: 1.425, stl: -0.766, blk: -0.551, tpm: -0.079, fgImpact: -0.678, ftImpact: 0, to: 0.177 } },
          { name: "Rienk Mast", min: 5, pts: 5, reb: 3, ast: 1, stl: 0, blk: 0, to: 0, tpm: 1, fgm: 2, fga: 4, ftm: 0, fta: 0, composite: -1.32, zScores: { pts: -0.546, reb: 0.022, ast: -0.523, stl: -0.766, blk: -0.551, tpm: -0.079, fgImpact: 0.072, ftImpact: 0, to: 1.051 } },
          { name: "Keba Keita", min: 2, pts: 4, reb: 1, ast: 0, stl: 0, blk: 0, to: 0, tpm: 0, fgm: 2, fga: 2, ftm: 0, fta: 0, composite: -2.87, zScores: { pts: -0.717, reb: -0.801, ast: -1.01, stl: -0.766, blk: -0.551, tpm: -0.859, fgImpact: 0.786, ftImpact: 0, to: 1.051 } }
        ]
      }
    },
      {
      id: "401898391",
      line: "Orlando Magic 122 @ Memphis Grizzlies 118 (Final)",
      completed: true,
      statusText: "Final",
      away: {
        abbr: "ORL", name: "Orlando Magic", score: 122,
        players: [
          { name: "Paolo Banchero", min: 15, pts: 11, reb: 1, ast: 5, stl: 0, blk: 0, to: 2, tpm: 0, fgm: 2, fga: 7, ftm: 7, fta: 10, composite: -3.56, zScores: { pts: 0.483, reb: -0.801, ast: 1.425, stl: -0.766, blk: -0.551, tpm: -0.859, fgImpact: -0.999, ftImpact: -0.79, to: -0.697 } },
          { name: "Franz Wagner", min: 14, pts: 6, reb: 2, ast: 7, stl: 2, blk: 0, to: 1, tpm: 0, fgm: 2, fga: 7, ftm: 2, fta: 2, composite: 1.69, zScores: { pts: -0.374, reb: -0.389, ast: 2.399, stl: 1.458, blk: -0.551, tpm: -0.859, fgImpact: -0.999, ftImpact: 0.828, to: 0.177 } },
          { name: "Wendell Carter Jr.", min: 15, pts: 13, reb: 4, ast: 2, stl: 0, blk: 0, to: 0, tpm: 3, fgm: 5, fga: 7, ftm: 0, fta: 0, composite: 3.69, zScores: { pts: 0.826, reb: 0.434, ast: -0.036, stl: -0.766, blk: -0.551, tpm: 1.48, fgImpact: 1.252, ftImpact: 0, to: 1.051 } },
          { name: "Desmond Bane", min: 13, pts: 9, reb: 1, ast: 1, stl: 0, blk: 0, to: 1, tpm: 3, fgm: 3, fga: 3, ftm: 0, fta: 0, composite: 0.34, zScores: { pts: 0.14, reb: -0.801, ast: -0.523, stl: -0.766, blk: -0.551, tpm: 1.48, fgImpact: 1.18, ftImpact: 0, to: 0.177 } },
          { name: "Jase Richardson", min: 23, pts: 3, reb: 3, ast: 3, stl: 0, blk: 0, to: 0, tpm: 1, fgm: 1, fga: 2, ftm: 0, fta: 0, composite: -0.73, zScores: { pts: -0.889, reb: 0.022, ast: 0.451, stl: -0.766, blk: -0.551, tpm: -0.079, fgImpact: 0.036, ftImpact: 0, to: 1.051 } },
          { name: "Kevin Knox II", min: 13, pts: 11, reb: 6, ast: 0, stl: 0, blk: 0, to: 0, tpm: 1, fgm: 3, fga: 8, ftm: 4, fta: 4, composite: 1.43, zScores: { pts: 0.483, reb: 1.257, ast: -1.01, stl: -0.766, blk: -0.551, tpm: -0.079, fgImpact: -0.606, ftImpact: 1.656, to: 1.051 } },
          { name: "Jamal Cain", min: 22, pts: 15, reb: 2, ast: 1, stl: 0, blk: 0, to: 1, tpm: 3, fgm: 6, fga: 9, ftm: 0, fta: 0, composite: 1.88, zScores: { pts: 1.169, reb: -0.389, ast: -0.523, stl: -0.766, blk: -0.551, tpm: 1.48, fgImpact: 1.288, ftImpact: 0, to: 0.177 } },
          { name: "Malaki Branham", min: 13, pts: 5, reb: 5, ast: 0, stl: 0, blk: 0, to: 3, tpm: 1, fgm: 2, fga: 7, ftm: 0, fta: 0, composite: -4.68, zScores: { pts: -0.546, reb: 0.845, ast: -1.01, stl: -0.766, blk: -0.551, tpm: -0.079, fgImpact: -0.999, ftImpact: 0, to: -1.57 } },
          { name: "Tristan da Silva", min: 25, pts: 19, reb: 5, ast: 2, stl: 1, blk: 0, to: 0, tpm: 4, fgm: 6, fga: 16, ftm: 3, fta: 4, composite: 4.57, zScores: { pts: 1.855, reb: 0.845, ast: -0.036, stl: 0.346, blk: -0.551, tpm: 2.26, fgImpact: -1.212, ftImpact: 0.013, to: 1.051 } },
          { name: "Nikola Vucevic", min: 12, pts: 9, reb: 3, ast: 1, stl: 1, blk: 1, to: 0, tpm: 3, fgm: 3, fga: 3, ftm: 0, fta: 0, composite: 4.53, zScores: { pts: 0.14, reb: 0.022, ast: -0.523, stl: 0.346, blk: 0.831, tpm: 1.48, fgImpact: 1.18, ftImpact: 0, to: 1.051 } },
          { name: "Goga Bitadze", min: 13, pts: 7, reb: 2, ast: 0, stl: 0, blk: 1, to: 1, tpm: 0, fgm: 3, fga: 4, ftm: 1, fta: 2, composite: -2.21, zScores: { pts: -0.203, reb: -0.389, ast: -1.01, stl: -0.766, blk: 0.831, tpm: -0.859, fgImpact: 0.822, ftImpact: -0.815, to: 0.177 } },
          { name: "Colin Castleton", min: 8, pts: 4, reb: 2, ast: 0, stl: 0, blk: 1, to: 2, tpm: 0, fgm: 2, fga: 2, ftm: 0, fta: 0, composite: -2.82, zScores: { pts: -0.717, reb: -0.389, ast: -1.01, stl: -0.766, blk: 0.831, tpm: -0.859, fgImpact: 0.786, ftImpact: 0, to: -0.697 } },
          { name: "Jevon Carter", min: 19, pts: 5, reb: 4, ast: 6, stl: 0, blk: 0, to: 2, tpm: 1, fgm: 1, fga: 3, ftm: 2, fta: 2, composite: 0.21, zScores: { pts: -0.546, reb: 0.434, ast: 1.912, stl: -0.766, blk: -0.551, tpm: -0.079, fgImpact: -0.321, ftImpact: 0.828, to: -0.697 } },
          { name: "JD Davison", min: 10, pts: 1, reb: 2, ast: 5, stl: 1, blk: 0, to: 0, tpm: 0, fgm: 0, fga: 4, ftm: 1, fta: 2, composite: -2.45, zScores: { pts: -1.232, reb: -0.389, ast: 1.425, stl: 0.346, blk: -0.551, tpm: -0.859, fgImpact: -1.429, ftImpact: -0.815, to: 1.051 } },
          { name: "Alex Morales", min: 24, pts: 4, reb: 10, ast: 2, stl: 1, blk: 1, to: 1, tpm: 0, fgm: 2, fga: 5, ftm: 0, fta: 2, composite: -0.1, zScores: { pts: -0.717, reb: 2.903, ast: -0.036, stl: 0.346, blk: 0.831, tpm: -0.859, fgImpact: -0.285, ftImpact: -2.459, to: 0.177 } }
        ]
      },
      home: {
        abbr: "MEM", name: "Memphis Grizzlies", score: 118,
        players: [
          { name: "Cedric Coward", min: 22, pts: 8, reb: 4, ast: 3, stl: 0, blk: 0, to: 0, tpm: 2, fgm: 3, fga: 9, ftm: 0, fta: 0, composite: 0.32, zScores: { pts: -0.031, reb: 0.434, ast: 0.451, stl: -0.766, blk: -0.551, tpm: 0.701, fgImpact: -0.963, ftImpact: 0, to: 1.051 } },
          { name: "Cameron Boozer", min: 22, pts: 16, reb: 6, ast: 2, stl: 0, blk: 0, to: 2, tpm: 2, fgm: 4, fga: 7, ftm: 6, fta: 7, composite: 3, zScores: { pts: 1.341, reb: 1.257, ast: -0.036, stl: -0.766, blk: -0.551, tpm: 0.701, fgImpact: 0.501, ftImpact: 1.254, to: -0.697 } },
          { name: "Jaylen Wells", min: 22, pts: 6, reb: 5, ast: 0, stl: 0, blk: 0, to: 0, tpm: 1, fgm: 2, fga: 10, ftm: 1, fta: 2, composite: -3.77, zScores: { pts: -0.374, reb: 0.845, ast: -1.01, stl: -0.766, blk: -0.551, tpm: -0.079, fgImpact: -2.071, ftImpact: -0.815, to: 1.051 } },
          { name: "Zach Edey", min: 10, pts: 2, reb: 4, ast: 1, stl: 1, blk: 1, to: 0, tpm: 0, fgm: 1, fga: 1, ftm: 0, fta: 0, composite: 0.61, zScores: { pts: -1.06, reb: 0.434, ast: -0.523, stl: 0.346, blk: 0.831, tpm: -0.859, fgImpact: 0.393, ftImpact: 0, to: 1.051 } },
          { name: "Ty Jerome", min: 19, pts: 17, reb: 1, ast: 4, stl: 0, blk: 0, to: 0, tpm: 1, fgm: 7, fga: 14, ftm: 2, fta: 2, composite: 2.38, zScores: { pts: 1.512, reb: -0.801, ast: 0.938, stl: -0.766, blk: -0.551, tpm: -0.079, fgImpact: 0.252, ftImpact: 0.828, to: 1.051 } },
          { name: "Jerami Grant", min: 20, pts: 3, reb: 3, ast: 1, stl: 0, blk: 0, to: 0, tpm: 1, fgm: 1, fga: 4, ftm: 0, fta: 0, composite: -2.41, zScores: { pts: -0.889, reb: 0.022, ast: -0.523, stl: -0.766, blk: -0.551, tpm: -0.079, fgImpact: -0.678, ftImpact: 0, to: 1.051 } },
          { name: "Kris Murray", min: 10, pts: 5, reb: 1, ast: 1, stl: 1, blk: 0, to: 0, tpm: 1, fgm: 2, fga: 4, ftm: 0, fta: 0, composite: -1.03, zScores: { pts: -0.546, reb: -0.801, ast: -0.523, stl: 0.346, blk: -0.551, tpm: -0.079, fgImpact: 0.072, ftImpact: 0, to: 1.051 } },
          { name: "Olivier-Maxence Prosper", min: 12, pts: 9, reb: 0, ast: 1, stl: 0, blk: 1, to: 0, tpm: 1, fgm: 4, fga: 7, ftm: 0, fta: 0, composite: -0.06, zScores: { pts: 0.14, reb: -1.213, ast: -0.523, stl: -0.766, blk: 0.831, tpm: -0.079, fgImpact: 0.501, ftImpact: 0, to: 1.051 } },
          { name: "Taylor Hendricks", min: 11, pts: 12, reb: 2, ast: 1, stl: 0, blk: 1, to: 0, tpm: 2, fgm: 5, fga: 7, ftm: 0, fta: 0, composite: 2.81, zScores: { pts: 0.655, reb: -0.389, ast: -0.523, stl: -0.766, blk: 0.831, tpm: 0.701, fgImpact: 1.252, ftImpact: 0, to: 1.051 } },
          { name: "GG Jackson", min: 14, pts: 15, reb: 6, ast: 0, stl: 1, blk: 0, to: 0, tpm: 3, fgm: 5, fga: 13, ftm: 2, fta: 2, composite: 3.68, zScores: { pts: 1.169, reb: 1.257, ast: -1.01, stl: 0.346, blk: -0.551, tpm: 1.48, fgImpact: -0.891, ftImpact: 0.828, to: 1.051 } },
          { name: "Karim Lopez", min: 6, pts: 0, reb: 0, ast: 1, stl: 0, blk: 0, to: 0, tpm: 0, fgm: 0, fga: 0, ftm: 0, fta: 0, composite: -4.26, zScores: { pts: -1.403, reb: -1.213, ast: -0.523, stl: -0.766, blk: -0.551, tpm: -0.859, fgImpact: 0, ftImpact: 0, to: 1.051 } },
          { name: "Quinten Post", min: 15, pts: 5, reb: 1, ast: 4, stl: 0, blk: 0, to: 0, tpm: 0, fgm: 2, fga: 4, ftm: 1, fta: 3, composite: -3.51, zScores: { pts: -0.546, reb: -0.801, ast: 0.938, stl: -0.766, blk: -0.551, tpm: -0.859, fgImpact: 0.072, ftImpact: -2.045, to: 1.051 } },
          { name: "Carson Cooper", min: 5, pts: 0, reb: 2, ast: 0, stl: 0, blk: 0, to: 0, tpm: 0, fgm: 0, fga: 1, ftm: 0, fta: 0, composite: -4.29, zScores: { pts: -1.403, reb: -0.389, ast: -1.01, stl: -0.766, blk: -0.551, tpm: -0.859, fgImpact: -0.357, ftImpact: 0, to: 1.051 } },
          { name: "Scotty Pippen Jr.", min: 14, pts: 1, reb: 0, ast: 2, stl: 3, blk: 0, to: 1, tpm: 0, fgm: 0, fga: 2, ftm: 1, fta: 4, composite: -5.13, zScores: { pts: -1.232, reb: -1.213, ast: -0.036, stl: 2.569, blk: -0.551, tpm: -0.859, fgImpact: -0.714, ftImpact: -3.274, to: 0.177 } },
          { name: "Cam Spencer", min: 16, pts: 7, reb: 1, ast: 5, stl: 1, blk: 0, to: 2, tpm: 1, fgm: 1, fga: 4, ftm: 4, fta: 4, composite: 0.42, zScores: { pts: -0.203, reb: -0.801, ast: 1.425, stl: 0.346, blk: -0.551, tpm: -0.079, fgImpact: -0.678, ftImpact: 1.656, to: -0.697 } },
          { name: "Javon Small", min: 8, pts: 3, reb: 0, ast: 2, stl: 0, blk: 0, to: 0, tpm: 1, fgm: 1, fga: 1, ftm: 0, fta: 0, composite: -2.09, zScores: { pts: -0.889, reb: -1.213, ast: -0.036, stl: -0.766, blk: -0.551, tpm: -0.079, fgImpact: 0.393, ftImpact: 0, to: 1.051 } },
          { name: "Walter Clayton Jr.", min: 13, pts: 9, reb: 4, ast: 3, stl: 0, blk: 1, to: 2, tpm: 1, fgm: 3, fga: 8, ftm: 2, fta: 4, composite: -1.92, zScores: { pts: 0.14, reb: 0.434, ast: 0.451, stl: -0.766, blk: 0.831, tpm: -0.079, fgImpact: -0.606, ftImpact: -1.631, to: -0.697 } }
        ]
      }
    },
      {
      id: "401908620",
      line: "Milwaukee Bucks 128 @ Oklahoma City Thunder 126 (Final)",
      completed: true,
      statusText: "Final",
      away: {
        abbr: "MIL", name: "Milwaukee Bucks", score: 128,
        players: [
          { name: "Jaime Jaquez Jr.", min: 22, pts: 13, reb: 1, ast: 3, stl: 2, blk: 0, to: 2, tpm: 3, fgm: 4, fga: 12, ftm: 2, fta: 2, composite: 1.71, zScores: { pts: 0.826, reb: -0.801, ast: 0.451, stl: 1.458, blk: -0.551, tpm: 1.48, fgImpact: -1.284, ftImpact: 0.828, to: -0.697 } },
          { name: "Myles Turner", min: 22, pts: 19, reb: 5, ast: 0, stl: 1, blk: 2, to: 1, tpm: 2, fgm: 5, fga: 8, ftm: 7, fta: 8, composite: 7.69, zScores: { pts: 1.855, reb: 0.845, ast: -1.01, stl: 0.346, blk: 2.213, tpm: 0.701, fgImpact: 0.895, ftImpact: 1.668, to: 0.177 } },
          { name: "Kel'el Ware", min: 25, pts: 18, reb: 12, ast: 1, stl: 0, blk: 1, to: 1, tpm: 0, fgm: 7, fga: 13, ftm: 4, fta: 6, composite: 4.08, zScores: { pts: 1.684, reb: 3.727, ast: -0.523, stl: -0.766, blk: 0.831, tpm: -0.859, fgImpact: 0.609, ftImpact: -0.803, to: 0.177 } },
          { name: "Tyler Herro", min: 23, pts: 13, reb: 3, ast: 3, stl: 0, blk: 1, to: 2, tpm: 3, fgm: 5, fga: 9, ftm: 0, fta: 0, composite: 2.69, zScores: { pts: 0.826, reb: 0.022, ast: 0.451, stl: -0.766, blk: 0.831, tpm: 1.48, fgImpact: 0.537, ftImpact: 0, to: -0.697 } },
          { name: "Ryan Rollins", min: 21, pts: 12, reb: 3, ast: 7, stl: 1, blk: 1, to: 1, tpm: 2, fgm: 5, fga: 7, ftm: 0, fta: 1, composite: 5.15, zScores: { pts: 0.655, reb: 0.022, ast: 2.399, stl: 0.346, blk: 0.831, tpm: 0.701, fgImpact: 1.252, ftImpact: -1.229, to: 0.177 } },
          { name: "Pete Nance", min: 13, pts: 6, reb: 5, ast: 0, stl: 0, blk: 0, to: 1, tpm: 2, fgm: 2, fga: 5, ftm: 0, fta: 0, composite: -1.26, zScores: { pts: -0.374, reb: 0.845, ast: -1.01, stl: -0.766, blk: -0.551, tpm: 0.701, fgImpact: -0.285, ftImpact: 0, to: 0.177 } },
          { name: "Ousmane Dieng", min: 23, pts: 8, reb: 5, ast: 7, stl: 0, blk: 0, to: 1, tpm: 0, fgm: 3, fga: 7, ftm: 2, fta: 2, composite: 1.79, zScores: { pts: -0.031, reb: 0.845, ast: 2.399, stl: -0.766, blk: -0.551, tpm: -0.859, fgImpact: -0.249, ftImpact: 0.828, to: 0.177 } },
          { name: "Nate Ament", min: 10, pts: 3, reb: 4, ast: 1, stl: 1, blk: 0, to: 0, tpm: 0, fgm: 1, fga: 7, ftm: 1, fta: 4, composite: -6.02, zScores: { pts: -0.889, reb: 0.434, ast: -0.523, stl: 0.346, blk: -0.551, tpm: -0.859, fgImpact: -1.75, ftImpact: -3.274, to: 1.051 } },
          { name: "Bogoljub Markovic", min: 6, pts: 2, reb: 2, ast: 0, stl: 0, blk: 0, to: 1, tpm: 0, fgm: 0, fga: 0, ftm: 2, fta: 2, composite: -3.63, zScores: { pts: -1.06, reb: -0.389, ast: -1.01, stl: -0.766, blk: -0.551, tpm: -0.859, fgImpact: 0, ftImpact: 0.828, to: 0.177 } },
          { name: "Jericho Sims", min: 18, pts: 6, reb: 6, ast: 2, stl: 0, blk: 0, to: 2, tpm: 0, fgm: 3, fga: 3, ftm: 0, fta: 0, composite: -0.85, zScores: { pts: -0.374, reb: 1.257, ast: -0.036, stl: -0.766, blk: -0.551, tpm: -0.859, fgImpact: 1.18, ftImpact: 0, to: -0.697 } },
          { name: "Cormac Ryan", min: 11, pts: 2, reb: 2, ast: 0, stl: 1, blk: 1, to: 1, tpm: 0, fgm: 1, fga: 3, ftm: 0, fta: 0, composite: -2.29, zScores: { pts: -1.06, reb: -0.389, ast: -1.01, stl: 0.346, blk: 0.831, tpm: -0.859, fgImpact: -0.321, ftImpact: 0, to: 0.177 } },
          { name: "Kam Jones", min: 10, pts: 0, reb: 2, ast: 2, stl: 0, blk: 0, to: 2, tpm: 0, fgm: 0, fga: 1, ftm: 0, fta: 0, composite: -5.06, zScores: { pts: -1.403, reb: -0.389, ast: -0.036, stl: -0.766, blk: -0.551, tpm: -0.859, fgImpact: -0.357, ftImpact: 0, to: -0.697 } },
          { name: "Brayden Burries", min: 21, pts: 16, reb: 5, ast: 1, stl: 2, blk: 0, to: 1, tpm: 0, fgm: 5, fga: 13, ftm: 6, fta: 8, composite: 1.02, zScores: { pts: 1.341, reb: 0.845, ast: -0.523, stl: 1.458, blk: -0.551, tpm: -0.859, fgImpact: -0.891, ftImpact: 0.025, to: 0.177 } },
          { name: "Kasparas Jakucionis", min: 18, pts: 10, reb: 4, ast: 4, stl: 0, blk: 1, to: 1, tpm: 2, fgm: 3, fga: 7, ftm: 2, fta: 2, composite: 3.2, zScores: { pts: 0.312, reb: 0.434, ast: 0.938, stl: -0.766, blk: 0.831, tpm: 0.701, fgImpact: -0.249, ftImpact: 0.828, to: 0.177 } }
        ]
      },
      home: {
        abbr: "OKC", name: "Oklahoma City Thunder", score: 126,
        players: [
          { name: "Aday Mara", min: 25, pts: 22, reb: 6, ast: 2, stl: 0, blk: 1, to: 0, tpm: 0, fgm: 10, fga: 10, ftm: 2, fta: 3, composite: 7.38, zScores: { pts: 2.37, reb: 1.257, ast: -0.036, stl: -0.766, blk: 0.831, tpm: -0.859, fgImpact: 3.932, ftImpact: -0.401, to: 1.051 } },
          { name: "Alex Caruso", min: 17, pts: 12, reb: 4, ast: 2, stl: 0, blk: 1, to: 0, tpm: 4, fgm: 4, fga: 6, ftm: 0, fta: 2, composite: 2.83, zScores: { pts: 0.655, reb: 0.434, ast: -0.036, stl: -0.766, blk: 0.831, tpm: 2.26, fgImpact: 0.858, ftImpact: -2.459, to: 1.051 } },
          { name: "Shai Gilgeous-Alexander", min: 18, pts: 17, reb: 3, ast: 5, stl: 0, blk: 1, to: 0, tpm: 3, fgm: 5, fga: 5, ftm: 4, fta: 4, composite: 9.18, zScores: { pts: 1.512, reb: 0.022, ast: 1.425, stl: -0.766, blk: 0.831, tpm: 1.48, fgImpact: 1.966, ftImpact: 1.656, to: 1.051 } },
          { name: "Jalen Williams", min: 19, pts: 16, reb: 3, ast: 6, stl: 2, blk: 0, to: 1, tpm: 0, fgm: 8, fga: 11, ftm: 0, fta: 0, composite: 5.57, zScores: { pts: 1.341, reb: 0.022, ast: 1.912, stl: 1.458, blk: -0.551, tpm: -0.859, fgImpact: 2.074, ftImpact: 0, to: 0.177 } },
          { name: "Cason Wallace", min: 18, pts: 7, reb: 3, ast: 6, stl: 1, blk: 1, to: 0, tpm: 1, fgm: 2, fga: 8, ftm: 2, fta: 2, composite: 3.35, zScores: { pts: -0.203, reb: 0.022, ast: 1.912, stl: 0.346, blk: 0.831, tpm: -0.079, fgImpact: -1.356, ftImpact: 0.828, to: 1.051 } },
          { name: "Brooks Barnhizer", min: 19, pts: 6, reb: 3, ast: 1, stl: 0, blk: 0, to: 2, tpm: 0, fgm: 3, fga: 6, ftm: 0, fta: 0, composite: -3.64, zScores: { pts: -0.374, reb: 0.022, ast: -0.523, stl: -0.766, blk: -0.551, tpm: -0.859, fgImpact: 0.108, ftImpact: 0, to: -0.697 } },
          { name: "Andrew Holifield", min: 6, pts: 2, reb: 1, ast: 1, stl: 0, blk: 0, to: 0, tpm: 0, fgm: 0, fga: 0, ftm: 2, fta: 2, composite: -2.68, zScores: { pts: -1.06, reb: -0.801, ast: -0.523, stl: -0.766, blk: -0.551, tpm: -0.859, fgImpact: 0, ftImpact: 0.828, to: 1.051 } },
          { name: "Christoph Tilly", min: 8, pts: 0, reb: 2, ast: 0, stl: 1, blk: 0, to: 1, tpm: 0, fgm: 0, fga: 1, ftm: 0, fta: 2, composite: -6.51, zScores: { pts: -1.403, reb: -0.389, ast: -1.01, stl: 0.346, blk: -0.551, tpm: -0.859, fgImpact: -0.357, ftImpact: -2.459, to: 0.177 } },
          { name: "Kenrich Williams", min: 14, pts: 3, reb: 4, ast: 0, stl: 2, blk: 0, to: 1, tpm: 1, fgm: 1, fga: 9, ftm: 0, fta: 0, composite: -2.92, zScores: { pts: -0.889, reb: 0.434, ast: -1.01, stl: 1.458, blk: -0.551, tpm: -0.079, fgImpact: -2.464, ftImpact: 0, to: 0.177 } },
          { name: "Jared McCain", min: 17, pts: 11, reb: 1, ast: 2, stl: 0, blk: 0, to: 1, tpm: 3, fgm: 4, fga: 11, ftm: 0, fta: 0, composite: -0.94, zScores: { pts: 0.483, reb: -0.801, ast: -0.036, stl: -0.766, blk: -0.551, tpm: 1.48, fgImpact: -0.927, ftImpact: 0, to: 0.177 } },
          { name: "Anthony Pritchard", min: 10, pts: 2, reb: 1, ast: 2, stl: 1, blk: 0, to: 1, tpm: 0, fgm: 0, fga: 2, ftm: 2, fta: 4, composite: -5.13, zScores: { pts: -1.06, reb: -0.801, ast: -0.036, stl: 0.346, blk: -0.551, tpm: -0.859, fgImpact: -0.714, ftImpact: -1.631, to: 0.177 } },
          { name: "Ajay Mitchell", min: 17, pts: 3, reb: 2, ast: 5, stl: 0, blk: 1, to: 4, tpm: 0, fgm: 1, fga: 5, ftm: 1, fta: 1, composite: -3.71, zScores: { pts: -0.889, reb: -0.389, ast: 1.425, stl: -0.766, blk: 0.831, tpm: -0.859, fgImpact: -1.035, ftImpact: 0.414, to: -2.444 } },
          { name: "Josh Dix", min: 14, pts: 3, reb: 0, ast: 0, stl: 0, blk: 0, to: 1, tpm: 1, fgm: 1, fga: 5, ftm: 0, fta: 0, composite: -5.37, zScores: { pts: -0.889, reb: -1.213, ast: -1.01, stl: -0.766, blk: -0.551, tpm: -0.079, fgImpact: -1.035, ftImpact: 0, to: 0.177 } },
          { name: "Otega Oweh", min: 16, pts: 2, reb: 1, ast: 0, stl: 0, blk: 1, to: 1, tpm: 0, fgm: 1, fga: 3, ftm: 0, fta: 0, composite: -3.81, zScores: { pts: -1.06, reb: -0.801, ast: -1.01, stl: -0.766, blk: 0.831, tpm: -0.859, fgImpact: -0.321, ftImpact: 0, to: 0.177 } },
          { name: "Bennett Stirtz", min: 22, pts: 20, reb: 5, ast: 2, stl: 1, blk: 0, to: 1, tpm: 4, fgm: 6, fga: 11, ftm: 4, fta: 6, composite: 4.84, zScores: { pts: 2.027, reb: 0.845, ast: -0.036, stl: 0.346, blk: -0.551, tpm: 2.26, fgImpact: 0.573, ftImpact: -0.803, to: 0.177 } }
        ]
      }
    },
      {
      id: "401908939",
      line: "Phoenix Suns 117 @ Chicago Bulls 124 (Final)",
      completed: true,
      statusText: "Final",
      away: {
        abbr: "PHX", name: "Phoenix Suns", score: 117,
        players: [
          { name: "Dillon Brooks", min: 23, pts: 24, reb: 4, ast: 2, stl: 1, blk: 0, to: 5, tpm: 3, fgm: 7, fga: 9, ftm: 7, fta: 8, composite: 4.77, zScores: { pts: 2.713, reb: 0.434, ast: -0.036, stl: 0.346, blk: -0.551, tpm: 1.48, fgImpact: 2.038, ftImpact: 1.668, to: -3.317 } },
          { name: "Miles Bridges", min: 8, pts: 3, reb: 1, ast: 1, stl: 0, blk: 0, to: 0, tpm: 0, fgm: 1, fga: 1, ftm: 1, fta: 1, composite: -2.53, zScores: { pts: -0.889, reb: -0.801, ast: -0.523, stl: -0.766, blk: -0.551, tpm: -0.859, fgImpact: 0.393, ftImpact: 0.414, to: 1.051 } },
          { name: "Oso Ighodaro", min: 18, pts: 8, reb: 2, ast: 2, stl: 1, blk: 0, to: 2, tpm: 0, fgm: 4, fga: 6, ftm: 0, fta: 2, composite: -3.82, zScores: { pts: -0.031, reb: -0.389, ast: -0.036, stl: 0.346, blk: -0.551, tpm: -0.859, fgImpact: 0.858, ftImpact: -2.459, to: -0.697 } },
          { name: "Devin Booker", min: 23, pts: 11, reb: 0, ast: 1, stl: 0, blk: 0, to: 2, tpm: 0, fgm: 3, fga: 14, ftm: 5, fta: 6, composite: -6.03, zScores: { pts: 0.483, reb: -1.213, ast: -0.523, stl: -0.766, blk: -0.551, tpm: -0.859, fgImpact: -2.749, ftImpact: 0.84, to: -0.697 } },
          { name: "Jalen Green", min: 22, pts: 12, reb: 4, ast: 2, stl: 2, blk: 1, to: 4, tpm: 1, fgm: 4, fga: 10, ftm: 3, fta: 4, composite: 0.26, zScores: { pts: 0.655, reb: 0.434, ast: -0.036, stl: 1.458, blk: 0.831, tpm: -0.079, fgImpact: -0.57, ftImpact: 0.013, to: -2.444 } },
          { name: "Haywood Highsmith", min: 7, pts: 0, reb: 1, ast: 0, stl: 0, blk: 0, to: 1, tpm: 0, fgm: 0, fga: 2, ftm: 0, fta: 0, composite: -5.93, zScores: { pts: -1.403, reb: -0.801, ast: -1.01, stl: -0.766, blk: -0.551, tpm: -0.859, fgImpact: -0.714, ftImpact: 0, to: 0.177 } },
          { name: "Ryan Dunn", min: 23, pts: 4, reb: 5, ast: 2, stl: 2, blk: 1, to: 2, tpm: 0, fgm: 2, fga: 4, ftm: 0, fta: 0, composite: 0.9, zScores: { pts: -0.717, reb: 0.845, ast: -0.036, stl: 1.458, blk: 0.831, tpm: -0.859, fgImpact: 0.072, ftImpact: 0, to: -0.697 } },
          { name: "Koa Peat", min: 5, pts: 2, reb: 3, ast: 0, stl: 0, blk: 0, to: 1, tpm: 0, fgm: 1, fga: 3, ftm: 0, fta: 0, composite: -4.37, zScores: { pts: -1.06, reb: 0.022, ast: -1.01, stl: -0.766, blk: -0.551, tpm: -0.859, fgImpact: -0.321, ftImpact: 0, to: 0.177 } },
          { name: "Rasheer Fleming", min: 20, pts: 3, reb: 3, ast: 0, stl: 0, blk: 0, to: 0, tpm: 0, fgm: 1, fga: 4, ftm: 1, fta: 2, composite: -4.5, zScores: { pts: -0.889, reb: 0.022, ast: -1.01, stl: -0.766, blk: -0.551, tpm: -0.859, fgImpact: -0.678, ftImpact: -0.815, to: 1.051 } },
          { name: "Khaman Maluach", min: 25, pts: 8, reb: 7, ast: 4, stl: 0, blk: 0, to: 2, tpm: 0, fgm: 2, fga: 3, ftm: 4, fta: 5, composite: 0.56, zScores: { pts: -0.031, reb: 1.669, ast: 0.938, stl: -0.766, blk: -0.551, tpm: -0.859, fgImpact: 0.429, ftImpact: 0.426, to: -0.697 } },
          { name: "Luke Kennard", min: 13, pts: 8, reb: 2, ast: 4, stl: 1, blk: 0, to: 0, tpm: 0, fgm: 3, fga: 5, ftm: 2, fta: 2, composite: 1.8, zScores: { pts: -0.031, reb: -0.389, ast: 0.938, stl: 0.346, blk: -0.551, tpm: -0.859, fgImpact: 0.465, ftImpact: 0.828, to: 1.051 } },
          { name: "Jordan Goodwin", min: 16, pts: 5, reb: 3, ast: 2, stl: 6, blk: 0, to: 2, tpm: 1, fgm: 2, fga: 4, ftm: 0, fta: 0, composite: 4.09, zScores: { pts: -0.546, reb: 0.022, ast: -0.036, stl: 5.905, blk: -0.551, tpm: -0.079, fgImpact: 0.072, ftImpact: 0, to: -0.697 } },
          { name: "Collin Gillespie", min: 14, pts: 12, reb: 3, ast: 2, stl: 0, blk: 0, to: 2, tpm: 3, fgm: 4, fga: 8, ftm: 1, fta: 2, composite: -0.56, zScores: { pts: 0.655, reb: 0.022, ast: -0.036, stl: -0.766, blk: -0.551, tpm: 1.48, fgImpact: 0.144, ftImpact: -0.815, to: -0.697 } },
          { name: "Jamaree Bouyea", min: 12, pts: 9, reb: 0, ast: 2, stl: 1, blk: 0, to: 3, tpm: 1, fgm: 4, fga: 6, ftm: 0, fta: 0, composite: -2.1, zScores: { pts: 0.14, reb: -1.213, ast: -0.036, stl: 0.346, blk: -0.551, tpm: -0.079, fgImpact: 0.858, ftImpact: 0, to: -1.57 } },
          { name: "Pat Spencer", min: 12, pts: 8, reb: 0, ast: 1, stl: 0, blk: 0, to: 0, tpm: 2, fgm: 2, fga: 5, ftm: 2, fta: 2, composite: -0.79, zScores: { pts: -0.031, reb: -1.213, ast: -0.523, stl: -0.766, blk: -0.551, tpm: 0.701, fgImpact: -0.285, ftImpact: 0.828, to: 1.051 } }
        ]
      },
      home: {
        abbr: "CHI", name: "Chicago Bulls", score: 124,
        players: [
          { name: "Jalen Smith", min: 20, pts: 13, reb: 8, ast: 1, stl: 2, blk: 0, to: 3, tpm: 2, fgm: 5, fga: 8, ftm: 1, fta: 2, composite: 2.5, zScores: { pts: 0.826, reb: 2.08, ast: -0.523, stl: 1.458, blk: -0.551, tpm: 0.701, fgImpact: 0.895, ftImpact: -0.815, to: -1.57 } },
          { name: "Matas Buzelis", min: 26, pts: 14, reb: 3, ast: 1, stl: 2, blk: 2, to: 1, tpm: 0, fgm: 6, fga: 15, ftm: 2, fta: 2, composite: 3.46, zScores: { pts: 0.998, reb: 0.022, ast: -0.523, stl: 1.458, blk: 2.213, tpm: -0.859, fgImpact: -0.855, ftImpact: 0.828, to: 0.177 } },
          { name: "Caleb Wilson", min: 29, pts: 15, reb: 3, ast: 2, stl: 1, blk: 0, to: 2, tpm: 0, fgm: 6, fga: 15, ftm: 3, fta: 3, composite: -0.22, zScores: { pts: 1.169, reb: 0.022, ast: -0.036, stl: 0.346, blk: -0.551, tpm: -0.859, fgImpact: -0.855, ftImpact: 1.242, to: -0.697 } },
          { name: "Norman Powell", min: 14, pts: 14, reb: 0, ast: 1, stl: 1, blk: 0, to: 2, tpm: 3, fgm: 3, fga: 4, ftm: 5, fta: 6, composite: 1.5, zScores: { pts: 0.998, reb: -1.213, ast: -0.523, stl: 0.346, blk: -0.551, tpm: 1.48, fgImpact: 0.822, ftImpact: 0.84, to: -0.697 } },
          { name: "Josh Giddey", min: 23, pts: 7, reb: 3, ast: 7, stl: 0, blk: 1, to: 2, tpm: 1, fgm: 1, fga: 6, ftm: 4, fta: 4, composite: 1.77, zScores: { pts: -0.203, reb: 0.022, ast: 2.399, stl: -0.766, blk: 0.831, tpm: -0.079, fgImpact: -1.393, ftImpact: 1.656, to: -0.697 } },
          { name: "Drew Peterson", min: 7, pts: 3, reb: 0, ast: 3, stl: 0, blk: 1, to: 2, tpm: 1, fgm: 1, fga: 1, ftm: 0, fta: 0, composite: -1.97, zScores: { pts: -0.889, reb: -1.213, ast: 0.451, stl: -0.766, blk: 0.831, tpm: -0.079, fgImpact: 0.393, ftImpact: 0, to: -0.697 } },
          { name: "Patrick Williams", min: 11, pts: 6, reb: 1, ast: 0, stl: 1, blk: 0, to: 0, tpm: 2, fgm: 2, fga: 3, ftm: 0, fta: 0, composite: -0.21, zScores: { pts: -0.374, reb: -0.801, ast: -1.01, stl: 0.346, blk: -0.551, tpm: 0.701, fgImpact: 0.429, ftImpact: 0, to: 1.051 } },
          { name: "Isaac Okoro", min: 17, pts: 2, reb: 1, ast: 2, stl: 0, blk: 0, to: 0, tpm: 0, fgm: 1, fga: 2, ftm: 0, fta: 0, composite: -2.99, zScores: { pts: -1.06, reb: -0.801, ast: -0.036, stl: -0.766, blk: -0.551, tpm: -0.859, fgImpact: 0.036, ftImpact: 0, to: 1.051 } },
          { name: "Leonard Miller", min: 14, pts: 14, reb: 1, ast: 2, stl: 2, blk: 0, to: 0, tpm: 1, fgm: 5, fga: 7, ftm: 3, fta: 3, composite: 4.53, zScores: { pts: 0.998, reb: -0.801, ast: -0.036, stl: 1.458, blk: -0.551, tpm: -0.079, fgImpact: 1.252, ftImpact: 1.242, to: 1.051 } },
          { name: "Tobe Awaka", min: 21, pts: 14, reb: 11, ast: 0, stl: 1, blk: 1, to: 3, tpm: 1, fgm: 6, fga: 8, ftm: 1, fta: 3, composite: 2.43, zScores: { pts: 0.998, reb: 3.315, ast: -1.01, stl: 0.346, blk: 0.831, tpm: -0.079, fgImpact: 1.645, ftImpact: -2.045, to: -1.57 } },
          { name: "Noa Essengue", min: 15, pts: 2, reb: 0, ast: 2, stl: 0, blk: 0, to: 1, tpm: 0, fgm: 0, fga: 4, ftm: 2, fta: 2, composite: -4.91, zScores: { pts: -1.06, reb: -1.213, ast: -0.036, stl: -0.766, blk: -0.551, tpm: -0.859, fgImpact: -1.429, ftImpact: 0.828, to: 0.177 } },
          { name: "Buddy Hield", min: 15, pts: 8, reb: 2, ast: 3, stl: 1, blk: 0, to: 2, tpm: 1, fgm: 2, fga: 6, ftm: 3, fta: 3, composite: -0.35, zScores: { pts: -0.031, reb: -0.389, ast: 0.451, stl: 0.346, blk: -0.551, tpm: -0.079, fgImpact: -0.642, ftImpact: 1.242, to: -0.697 } },
          { name: "Brandon Boston Jr.", min: 5, pts: 2, reb: 0, ast: 0, stl: 0, blk: 0, to: 0, tpm: 0, fgm: 1, fga: 1, ftm: 0, fta: 0, composite: -4.01, zScores: { pts: -1.06, reb: -1.213, ast: -1.01, stl: -0.766, blk: -0.551, tpm: -0.859, fgImpact: 0.393, ftImpact: 0, to: 1.051 } },
          { name: "Dailyn Swain", min: 22, pts: 10, reb: 2, ast: 6, stl: 2, blk: 0, to: 3, tpm: 0, fgm: 3, fga: 3, ftm: 4, fta: 4, composite: 3.15, zScores: { pts: 0.312, reb: -0.389, ast: 1.912, stl: 1.458, blk: -0.551, tpm: -0.859, fgImpact: 1.18, ftImpact: 1.656, to: -1.57 } }
        ]
      }
    },
      {
      id: "401914129",
      line: "Golden State Warriors 118 @ Portland Trail Blazers 123 (Final)",
      completed: true,
      statusText: "Final",
      away: {
        abbr: "GS", name: "Golden State Warriors", score: 118,
        players: [
          { name: "Malevy Leons", min: 33, pts: 5, reb: 5, ast: 0, stl: 1, blk: 1, to: 2, tpm: 1, fgm: 2, fga: 11, ftm: 0, fta: 0, composite: -2.74, zScores: { pts: -0.546, reb: 0.845, ast: -1.01, stl: 0.346, blk: 0.831, tpm: -0.079, fgImpact: -2.428, ftImpact: 0, to: -0.697 } },
          { name: "Charles Bassey", min: 24, pts: 13, reb: 6, ast: 1, stl: 3, blk: 3, to: 3, tpm: 0, fgm: 6, fga: 7, ftm: 1, fta: 2, composite: 6.48, zScores: { pts: 0.826, reb: 1.257, ast: -0.523, stl: 2.569, blk: 3.595, tpm: -0.859, fgImpact: 2.002, ftImpact: -0.815, to: -1.57 } },
          { name: "Brandon Williams", min: 18, pts: 17, reb: 3, ast: 4, stl: 1, blk: 0, to: 3, tpm: 1, fgm: 7, fga: 11, ftm: 2, fta: 4, composite: 0.31, zScores: { pts: 1.512, reb: 0.022, ast: 0.938, stl: 0.346, blk: -0.551, tpm: -0.079, fgImpact: 1.324, ftImpact: -1.631, to: -1.57 } },
          { name: "Dalen Terry", min: 43, pts: 23, reb: 8, ast: 9, stl: 4, blk: 0, to: 4, tpm: 4, fgm: 9, fga: 18, ftm: 1, fta: 2, composite: 10.45, zScores: { pts: 2.541, reb: 2.08, ast: 3.372, stl: 3.681, blk: -0.551, tpm: 2.26, fgImpact: 0.324, ftImpact: -0.815, to: -2.444 } },
          { name: "Will Richard", min: 33, pts: 15, reb: 3, ast: 1, stl: 0, blk: 0, to: 2, tpm: 3, fgm: 3, fga: 7, ftm: 6, fta: 6, composite: 2.37, zScores: { pts: 1.169, reb: 0.022, ast: -0.523, stl: -0.766, blk: -0.551, tpm: 1.48, fgImpact: -0.249, ftImpact: 2.484, to: -0.697 } },
          { name: "Graham Ike", min: 24, pts: 10, reb: 6, ast: 2, stl: 1, blk: 0, to: 2, tpm: 2, fgm: 4, fga: 9, ftm: 0, fta: 2, composite: -1.34, zScores: { pts: 0.312, reb: 1.257, ast: -0.036, stl: 0.346, blk: -0.551, tpm: 0.701, fgImpact: -0.213, ftImpact: -2.459, to: -0.697 } },
          { name: "Alex Toohey", min: 19, pts: 5, reb: 1, ast: 2, stl: 0, blk: 2, to: 0, tpm: 1, fgm: 1, fga: 3, ftm: 2, fta: 2, composite: 1.54, zScores: { pts: -0.546, reb: -0.801, ast: -0.036, stl: -0.766, blk: 2.213, tpm: -0.079, fgImpact: -0.321, ftImpact: 0.828, to: 1.051 } },
          { name: "LJ Cryer", min: 18, pts: 6, reb: 1, ast: 1, stl: 0, blk: 0, to: 2, tpm: 1, fgm: 2, fga: 5, ftm: 1, fta: 2, composite: -4.89, zScores: { pts: -0.374, reb: -0.801, ast: -0.523, stl: -0.766, blk: -0.551, tpm: -0.079, fgImpact: -0.285, ftImpact: -0.815, to: -0.697 } },
          { name: "Miles Kelly", min: 28, pts: 24, reb: 7, ast: 6, stl: 1, blk: 1, to: 1, tpm: 6, fgm: 8, fga: 16, ftm: 2, fta: 4, composite: 10.12, zScores: { pts: 2.713, reb: 1.669, ast: 1.912, stl: 0.346, blk: 0.831, tpm: 3.819, fgImpact: 0.288, ftImpact: -1.631, to: 0.177 } }
        ]
      },
      home: {
        abbr: "POR", name: "Portland Trail Blazers", score: 123,
        players: [
          { name: "Toumani Camara", min: 19, pts: 5, reb: 1, ast: 1, stl: 1, blk: 0, to: 0, tpm: 1, fgm: 1, fga: 3, ftm: 2, fta: 2, composite: -0.6, zScores: { pts: -0.546, reb: -0.801, ast: -0.523, stl: 0.346, blk: -0.551, tpm: -0.079, fgImpact: -0.321, ftImpact: 0.828, to: 1.051 } },
          { name: "Deni Avdija", min: 21, pts: 23, reb: 2, ast: 2, stl: 0, blk: 0, to: 2, tpm: 3, fgm: 9, fga: 13, ftm: 2, fta: 4, composite: 2.06, zScores: { pts: 2.541, reb: -0.389, ast: -0.036, stl: -0.766, blk: -0.551, tpm: 1.48, fgImpact: 2.11, ftImpact: -1.631, to: -0.697 } },
          { name: "Donovan Clingan", min: 20, pts: 3, reb: 10, ast: 2, stl: 1, blk: 1, to: 0, tpm: 0, fgm: 1, fga: 7, ftm: 1, fta: 1, composite: 2.01, zScores: { pts: -0.889, reb: 2.903, ast: -0.036, stl: 0.346, blk: 0.831, tpm: -0.859, fgImpact: -1.75, ftImpact: 0.414, to: 1.051 } },
          { name: "Damian Lillard", min: 19, pts: 15, reb: 1, ast: 1, stl: 2, blk: 0, to: 1, tpm: 3, fgm: 5, fga: 11, ftm: 2, fta: 2, composite: 3.06, zScores: { pts: 1.169, reb: -0.801, ast: -0.523, stl: 1.458, blk: -0.551, tpm: 1.48, fgImpact: -0.177, ftImpact: 0.828, to: 0.177 } },
          { name: "Ja Morant", min: 19, pts: 8, reb: 2, ast: 5, stl: 2, blk: 0, to: 4, tpm: 0, fgm: 3, fga: 8, ftm: 2, fta: 2, composite: -1.17, zScores: { pts: -0.031, reb: -0.389, ast: 1.425, stl: 1.458, blk: -0.551, tpm: -0.859, fgImpact: -0.606, ftImpact: 0.828, to: -2.444 } },
          { name: "John Tonje", min: 3, pts: 0, reb: 0, ast: 1, stl: 1, blk: 0, to: 0, tpm: 0, fgm: 0, fga: 0, ftm: 0, fta: 0, composite: -3.15, zScores: { pts: -1.403, reb: -1.213, ast: -0.523, stl: 0.346, blk: -0.551, tpm: -0.859, fgImpact: 0, ftImpact: 0, to: 1.051 } },
          { name: "Jeremy Sochan", min: 9, pts: 10, reb: 0, ast: 0, stl: 0, blk: 0, to: 0, tpm: 2, fgm: 4, fga: 6, ftm: 0, fta: 0, composite: -0.62, zScores: { pts: 0.312, reb: -1.213, ast: -1.01, stl: -0.766, blk: -0.551, tpm: 0.701, fgImpact: 0.858, ftImpact: 0, to: 1.051 } },
          { name: "Robert Williams III", min: 14, pts: 8, reb: 5, ast: 1, stl: 1, blk: 5, to: 1, tpm: 0, fgm: 4, fga: 5, ftm: 0, fta: 0, composite: 7.53, zScores: { pts: -0.031, reb: 0.845, ast: -0.523, stl: 0.346, blk: 6.359, tpm: -0.859, fgImpact: 1.216, ftImpact: 0, to: 0.177 } },
          { name: "Micah Potter", min: 13, pts: 13, reb: 6, ast: 1, stl: 0, blk: 0, to: 0, tpm: 2, fgm: 4, fga: 6, ftm: 3, fta: 3, composite: 4.09, zScores: { pts: 0.826, reb: 1.257, ast: -0.523, stl: -0.766, blk: -0.551, tpm: 0.701, fgImpact: 0.858, ftImpact: 1.242, to: 1.051 } },
          { name: "Branden Carlson", min: 9, pts: 4, reb: 3, ast: 0, stl: 0, blk: 0, to: 0, tpm: 0, fgm: 2, fga: 4, ftm: 0, fta: 0, composite: -2.76, zScores: { pts: -0.717, reb: 0.022, ast: -1.01, stl: -0.766, blk: -0.551, tpm: -0.859, fgImpact: 0.072, ftImpact: 0, to: 1.051 } },
          { name: "Yang Hansen", min: 12, pts: 6, reb: 2, ast: 4, stl: 1, blk: 0, to: 2, tpm: 0, fgm: 2, fga: 3, ftm: 2, fta: 2, composite: -0.33, zScores: { pts: -0.374, reb: -0.389, ast: 0.938, stl: 0.346, blk: -0.551, tpm: -0.859, fgImpact: 0.429, ftImpact: 0.828, to: -0.697 } },
          { name: "Jrue Holiday", min: 19, pts: 5, reb: 7, ast: 5, stl: 1, blk: 0, to: 3, tpm: 1, fgm: 2, fga: 8, ftm: 0, fta: 0, composite: -0.66, zScores: { pts: -0.546, reb: 1.669, ast: 1.425, stl: 0.346, blk: -0.551, tpm: -0.079, fgImpact: -1.356, ftImpact: 0, to: -1.57 } },
          { name: "Vit Krejci", min: 14, pts: 3, reb: 4, ast: 3, stl: 0, blk: 0, to: 0, tpm: 1, fgm: 1, fga: 5, ftm: 0, fta: 0, composite: -1.39, zScores: { pts: -0.889, reb: 0.434, ast: 0.451, stl: -0.766, blk: -0.551, tpm: -0.079, fgImpact: -1.035, ftImpact: 0, to: 1.051 } },
          { name: "Scoot Henderson", min: 17, pts: 9, reb: 3, ast: 3, stl: 0, blk: 1, to: 3, tpm: 1, fgm: 3, fga: 8, ftm: 2, fta: 2, composite: -0.75, zScores: { pts: 0.14, reb: 0.022, ast: 0.451, stl: -0.766, blk: 0.831, tpm: -0.079, fgImpact: -0.606, ftImpact: 0.828, to: -1.57 } },
          { name: "Jayson Kent", min: 3, pts: 3, reb: 1, ast: 1, stl: 1, blk: 0, to: 0, tpm: 1, fgm: 1, fga: 2, ftm: 0, fta: 0, composite: -1.41, zScores: { pts: -0.889, reb: -0.801, ast: -0.523, stl: 0.346, blk: -0.551, tpm: -0.079, fgImpact: 0.036, ftImpact: 0, to: 1.051 } },
          { name: "Chris Youngblood", min: 12, pts: 8, reb: 2, ast: 3, stl: 1, blk: 0, to: 3, tpm: 2, fgm: 3, fga: 5, ftm: 0, fta: 2, composite: -3.04, zScores: { pts: -0.031, reb: -0.389, ast: 0.451, stl: 0.346, blk: -0.551, tpm: 0.701, fgImpact: 0.465, ftImpact: -2.459, to: -1.57 } },
          { name: "Sidy Cissoko", min: 16, pts: 0, reb: 1, ast: 1, stl: 1, blk: 2, to: 2, tpm: 0, fgm: 0, fga: 1, ftm: 0, fta: 1, composite: -3.31, zScores: { pts: -1.403, reb: -0.801, ast: -0.523, stl: 0.346, blk: 2.213, tpm: -0.859, fgImpact: -0.357, ftImpact: -1.229, to: -0.697 } }
        ]
      }
    }
    ]
  },
    "2026-10-08": {
    games: [
      {
      id: "401898392",
      line: "Boston Celtics 124 @ Cleveland Cavaliers 113 (Final)",
      completed: true,
      statusText: "Final",
      away: {
        abbr: "BOS", name: "Boston Celtics", score: 124,
        players: [
          { name: "Luka Garza", min: 27, pts: 22, reb: 10, ast: 2, stl: 0, blk: 3, to: 0, tpm: 3, fgm: 6, fga: 17, ftm: 7, fta: 8, composite: 11.94, zScores: { pts: 2.844, reb: 2.86, ast: 0.142, stl: -0.811, blk: 3.794, tpm: 2.109, fgImpact: -1.541, ftImpact: 1.66, to: 0.878 } },
          { name: "Mike Conley", min: 18, pts: 3, reb: 1, ast: 4, stl: 1, blk: 0, to: 2, tpm: 0, fgm: 1, fga: 3, ftm: 1, fta: 1, composite: -2.04, zScores: { pts: -0.883, reb: -0.817, ast: 1.28, stl: 0.317, blk: -0.503, tpm: -0.854, fgImpact: -0.326, ftImpact: 0.402, to: -0.654 } },
          { name: "Baylor Scheierman", min: 23, pts: 16, reb: 5, ast: 3, stl: 0, blk: 0, to: 1, tpm: 4, fgm: 5, fga: 12, ftm: 2, fta: 2, composite: 5.51, zScores: { pts: 1.667, reb: 0.817, ast: 0.711, stl: -0.811, blk: -0.503, tpm: 3.097, fgImpact: -0.379, ftImpact: 0.803, to: 0.112 } },
          { name: "Jordan Walsh", min: 26, pts: 16, reb: 2, ast: 1, stl: 0, blk: 1, to: 1, tpm: 2, fgm: 6, fga: 14, ftm: 2, fta: 4, composite: 0.39, zScores: { pts: 1.667, reb: -0.409, ast: -0.428, stl: -0.811, blk: 0.929, tpm: 1.121, fgImpact: -0.288, ftImpact: -1.5, to: 0.112 } },
          { name: "Hugo Gonzalez", min: 26, pts: 15, reb: 4, ast: 5, stl: 0, blk: 0, to: 2, tpm: 3, fgm: 5, fga: 9, ftm: 2, fta: 2, composite: 5.55, zScores: { pts: 1.471, reb: 0.409, ast: 1.85, stl: -0.811, blk: -0.503, tpm: 2.109, fgImpact: 0.874, ftImpact: 0.803, to: -0.654 } },
          { name: "Gabe McGlothan", min: 5, pts: 0, reb: 2, ast: 0, stl: 1, blk: 0, to: 1, tpm: 0, fgm: 0, fga: 0, ftm: 0, fta: 0, composite: -3.81, zScores: { pts: -1.472, reb: -0.409, ast: -0.997, stl: 0.317, blk: -0.503, tpm: -0.854, fgImpact: 0, ftImpact: 0, to: 0.112 } },
          { name: "Amari Williams", min: 5, pts: 0, reb: 4, ast: 1, stl: 0, blk: 0, to: 2, tpm: 0, fgm: 0, fga: 0, ftm: 0, fta: 0, composite: -4.31, zScores: { pts: -1.472, reb: 0.409, ast: -0.428, stl: -0.811, blk: -0.503, tpm: -0.854, fgImpact: 0, ftImpact: 0, to: -0.654 } },
          { name: "Tucker DeVries", min: 11, pts: 6, reb: 2, ast: 1, stl: 0, blk: 0, to: 0, tpm: 2, fgm: 2, fga: 6, ftm: 0, fta: 0, composite: -1.1, zScores: { pts: -0.295, reb: -0.409, ast: -0.428, stl: -0.811, blk: -0.503, tpm: 1.121, fgImpact: -0.653, ftImpact: 0, to: 0.878 } },
          { name: "Dillon Mitchell", min: 28, pts: 10, reb: 9, ast: 4, stl: 2, blk: 0, to: 2, tpm: 0, fgm: 4, fga: 7, ftm: 2, fta: 4, composite: 2.94, zScores: { pts: 0.49, reb: 2.452, ast: 1.28, stl: 1.445, blk: -0.503, tpm: -0.854, fgImpact: 0.783, ftImpact: -1.5, to: -0.654 } },
          { name: "Chris Cenac Jr.", min: 24, pts: 7, reb: 8, ast: 1, stl: 0, blk: 4, to: 0, tpm: 0, fgm: 3, fga: 13, ftm: 1, fta: 4, composite: 0.25, zScores: { pts: -0.099, reb: 2.043, ast: -0.428, stl: -0.811, blk: 5.226, tpm: -0.854, fgImpact: -2.65, ftImpact: -3.053, to: 0.878 } },
          { name: "Devin Carter", min: 25, pts: 17, reb: 5, ast: 3, stl: 2, blk: 0, to: 5, tpm: 1, fgm: 5, fga: 9, ftm: 6, fta: 6, composite: 4.8, zScores: { pts: 1.863, reb: 0.817, ast: 0.711, stl: 1.445, blk: -0.503, tpm: 0.133, fgImpact: 0.874, ftImpact: 2.41, to: -2.953 } },
          { name: "Milos Uzan", min: 15, pts: 6, reb: 3, ast: 3, stl: 0, blk: 0, to: 0, tpm: 1, fgm: 2, fga: 7, ftm: 1, fta: 2, composite: -1.71, zScores: { pts: -0.295, reb: 0, ast: 0.711, stl: -0.811, blk: -0.503, tpm: 0.133, fgImpact: -1.071, ftImpact: -0.75, to: 0.878 } },
          { name: "Hayden Gray", min: 8, pts: 6, reb: 1, ast: 1, stl: 0, blk: 0, to: 0, tpm: 1, fgm: 2, fga: 2, ftm: 1, fta: 2, composite: -1.57, zScores: { pts: -0.295, reb: -0.817, ast: -0.428, stl: -0.811, blk: -0.503, tpm: 0.133, fgImpact: 1.018, ftImpact: -0.75, to: 0.878 } }
        ]
      },
      home: {
        abbr: "CLE", name: "Cleveland Cavaliers", score: 113,
        players: [
          { name: "Jarrett Allen", min: 17, pts: 6, reb: 4, ast: 0, stl: 2, blk: 0, to: 1, tpm: 0, fgm: 3, fga: 5, ftm: 0, fta: 0, composite: 0.01, zScores: { pts: -0.295, reb: 0.409, ast: -0.997, stl: 1.445, blk: -0.503, tpm: -0.854, fgImpact: 0.692, ftImpact: 0, to: 0.112 } },
          { name: "Evan Mobley", min: 17, pts: 8, reb: 1, ast: 1, stl: 0, blk: 0, to: 2, tpm: 0, fgm: 3, fga: 5, ftm: 2, fta: 3, composite: -3.63, zScores: { pts: 0.098, reb: -0.817, ast: -0.428, stl: -0.811, blk: -0.503, tpm: -0.854, fgImpact: 0.692, ftImpact: -0.348, to: -0.654 } },
          { name: "Donovan Mitchell", min: 17, pts: 11, reb: 0, ast: 3, stl: 0, blk: 0, to: 2, tpm: 0, fgm: 4, fga: 8, ftm: 3, fta: 3, composite: -1.08, zScores: { pts: 0.686, reb: -1.226, ast: 0.711, stl: -0.811, blk: -0.503, tpm: -0.854, fgImpact: 0.365, ftImpact: 1.205, to: -0.654 } },
          { name: "Peyton Watson", min: 17, pts: 7, reb: 4, ast: 4, stl: 0, blk: 2, to: 1, tpm: 1, fgm: 2, fga: 5, ftm: 2, fta: 2, composite: 3.95, zScores: { pts: -0.099, reb: 0.409, ast: 1.28, stl: -0.811, blk: 2.362, tpm: 0.133, fgImpact: -0.235, ftImpact: 0.803, to: 0.112 } },
          { name: "Jaylon Tyson", min: 17, pts: 14, reb: 3, ast: 2, stl: 0, blk: 0, to: 0, tpm: 1, fgm: 6, fga: 8, ftm: 1, fta: 1, composite: 3.73, zScores: { pts: 1.274, reb: 0, ast: 0.142, stl: -0.811, blk: -0.503, tpm: 0.133, fgImpact: 2.219, ftImpact: 0.402, to: 0.878 } },
          { name: "Mario Hezonja", min: 17, pts: 5, reb: 5, ast: 3, stl: 0, blk: 0, to: 1, tpm: 1, fgm: 2, fga: 7, ftm: 0, fta: 0, composite: -1.1, zScores: { pts: -0.491, reb: 0.817, ast: 0.711, stl: -0.811, blk: -0.503, tpm: 0.133, fgImpact: -1.071, ftImpact: 0, to: 0.112 } },
          { name: "Tristan Enaruna", min: 17, pts: 13, reb: 3, ast: 1, stl: 1, blk: 0, to: 1, tpm: 2, fgm: 5, fga: 7, ftm: 1, fta: 1, composite: 3.81, zScores: { pts: 1.078, reb: 0, ast: -0.428, stl: 0.317, blk: -0.503, tpm: 1.121, fgImpact: 1.71, ftImpact: 0.402, to: 0.112 } },
          { name: "Rashaun Agee", min: 11, pts: 6, reb: 2, ast: 0, stl: 0, blk: 0, to: 0, tpm: 1, fgm: 1, fga: 3, ftm: 3, fta: 4, composite: -2.28, zScores: { pts: -0.295, reb: -0.409, ast: -0.997, stl: -0.811, blk: -0.503, tpm: 0.133, fgImpact: -0.326, ftImpact: 0.054, to: 0.878 } },
          { name: "Zack Austin", min: 1, pts: 0, reb: 0, ast: 0, stl: 0, blk: 0, to: 0, tpm: 0, fgm: 0, fga: 1, ftm: 0, fta: 0, composite: -5.4, zScores: { pts: -1.472, reb: -1.226, ast: -0.997, stl: -0.811, blk: -0.503, tpm: -0.854, fgImpact: -0.418, ftImpact: 0, to: 0.878 } },
          { name: "Riley Minix", min: 15, pts: 4, reb: 4, ast: 3, stl: 0, blk: 1, to: 0, tpm: 0, fgm: 2, fga: 10, ftm: 0, fta: 0, composite: -1.75, zScores: { pts: -0.687, reb: 0.409, ast: 0.711, stl: -0.811, blk: 0.929, tpm: -0.854, fgImpact: -2.324, ftImpact: 0, to: 0.878 } },
          { name: "Thomas Bryant", min: 9, pts: 8, reb: 2, ast: 1, stl: 0, blk: 2, to: 1, tpm: 1, fgm: 3, fga: 4, ftm: 1, fta: 2, composite: 1.42, zScores: { pts: 0.098, reb: -0.409, ast: -0.428, stl: -0.811, blk: 2.362, tpm: 0.133, fgImpact: 1.109, ftImpact: -0.75, to: 0.112 } },
          { name: "Ernest Udeh Jr.", min: 15, pts: 2, reb: 4, ast: 0, stl: 1, blk: 0, to: 0, tpm: 0, fgm: 1, fga: 2, ftm: 0, fta: 0, composite: -1.74, zScores: { pts: -1.079, reb: 0.409, ast: -0.997, stl: 0.317, blk: -0.503, tpm: -0.854, fgImpact: 0.091, ftImpact: 0, to: 0.878 } },
          { name: "Sam Merrill", min: 10, pts: 8, reb: 0, ast: 1, stl: 0, blk: 0, to: 0, tpm: 2, fgm: 3, fga: 4, ftm: 0, fta: 0, composite: 0.24, zScores: { pts: 0.098, reb: -1.226, ast: -0.428, stl: -0.811, blk: -0.503, tpm: 1.121, fgImpact: 1.109, ftImpact: 0, to: 0.878 } },
          { name: "Craig Porter Jr.", min: 16, pts: 5, reb: 3, ast: 10, stl: 2, blk: 1, to: 0, tpm: 1, fgm: 2, fga: 3, ftm: 0, fta: 0, composite: 8.19, zScores: { pts: -0.491, reb: 0, ast: 4.697, stl: 1.445, blk: 0.929, tpm: 0.133, fgImpact: 0.6, ftImpact: 0, to: 0.878 } },
          { name: "Curtis Jones", min: 1, pts: 0, reb: 0, ast: 0, stl: 0, blk: 0, to: 0, tpm: 0, fgm: 0, fga: 1, ftm: 0, fta: 0, composite: -5.4, zScores: { pts: -1.472, reb: -1.226, ast: -0.997, stl: -0.811, blk: -0.503, tpm: -0.854, fgImpact: -0.418, ftImpact: 0, to: 0.878 } },
          { name: "Tyrese Proctor", min: 21, pts: 5, reb: 2, ast: 1, stl: 1, blk: 0, to: 1, tpm: 1, fgm: 2, fga: 6, ftm: 0, fta: 0, composite: -1.92, zScores: { pts: -0.491, reb: -0.409, ast: -0.428, stl: 0.317, blk: -0.503, tpm: 0.133, fgImpact: -0.653, ftImpact: 0, to: 0.112 } },
          { name: "Meleek Thomas", min: 23, pts: 11, reb: 2, ast: 2, stl: 3, blk: 0, to: 1, tpm: 1, fgm: 5, fga: 13, ftm: 0, fta: 0, composite: 1.94, zScores: { pts: 0.686, reb: -0.409, ast: 0.142, stl: 2.573, blk: -0.503, tpm: 0.133, fgImpact: -0.797, ftImpact: 0, to: 0.112 } }
        ]
      }
    },
      {
      id: "401898393",
      line: "New Orleans Pelicans 118 @ Miami Heat 128 (Final)",
      completed: true,
      statusText: "Final",
      away: {
        abbr: "NO", name: "New Orleans Pelicans", score: 118,
        players: [
          { name: "Zion Williamson", min: 16, pts: 8, reb: 1, ast: 1, stl: 1, blk: 0, to: 1, tpm: 0, fgm: 3, fga: 9, ftm: 2, fta: 2, composite: -2.25, zScores: { pts: 0.098, reb: -0.817, ast: -0.428, stl: 0.317, blk: -0.503, tpm: -0.854, fgImpact: -0.979, ftImpact: 0.803, to: 0.112 } },
          { name: "Trey Murphy III", min: 14, pts: 11, reb: 1, ast: 2, stl: 1, blk: 0, to: 1, tpm: 2, fgm: 3, fga: 8, ftm: 3, fta: 4, composite: 0.55, zScores: { pts: 0.686, reb: -0.817, ast: 0.142, stl: 0.317, blk: -0.503, tpm: 1.121, fgImpact: -0.562, ftImpact: 0.054, to: 0.112 } },
          { name: "Yves Missi", min: 19, pts: 11, reb: 9, ast: 0, stl: 0, blk: 0, to: 0, tpm: 0, fgm: 4, fga: 6, ftm: 3, fta: 5, composite: 0.95, zScores: { pts: 0.686, reb: 2.452, ast: -0.997, stl: -0.811, blk: -0.503, tpm: -0.854, fgImpact: 1.201, ftImpact: -1.098, to: 0.878 } },
          { name: "Bennedict Mathurin", min: 14, pts: 8, reb: 4, ast: 1, stl: 0, blk: 0, to: 2, tpm: 1, fgm: 3, fga: 7, ftm: 1, fta: 2, composite: -2.65, zScores: { pts: 0.098, reb: 0.409, ast: -0.428, stl: -0.811, blk: -0.503, tpm: 0.133, fgImpact: -0.144, ftImpact: -0.75, to: -0.654 } },
          { name: "Jeremiah Fears", min: 19, pts: 11, reb: 2, ast: 2, stl: 0, blk: 0, to: 3, tpm: 2, fgm: 4, fga: 8, ftm: 1, fta: 1, composite: -0.43, zScores: { pts: 0.686, reb: -0.409, ast: 0.142, stl: -0.811, blk: -0.503, tpm: 1.121, fgImpact: 0.365, ftImpact: 0.402, to: -1.421 } },
          { name: "Herbert Jones", min: 10, pts: 0, reb: 3, ast: 2, stl: 2, blk: 0, to: 0, tpm: 0, fgm: 0, fga: 0, ftm: 0, fta: 0, composite: -0.36, zScores: { pts: -1.472, reb: 0, ast: 0.142, stl: 1.445, blk: -0.503, tpm: -0.854, fgImpact: 0, ftImpact: 0, to: 0.878 } },
          { name: "Trendon Watford", min: 15, pts: 2, reb: 7, ast: 2, stl: 0, blk: 1, to: 0, tpm: 0, fgm: 1, fga: 5, ftm: 0, fta: 0, composite: -0.32, zScores: { pts: -1.079, reb: 1.634, ast: 0.142, stl: -0.811, blk: 0.929, tpm: -0.854, fgImpact: -1.162, ftImpact: 0, to: 0.878 } },
          { name: "Caleb Houstan", min: 15, pts: 3, reb: 2, ast: 0, stl: 1, blk: 0, to: 0, tpm: 1, fgm: 1, fga: 4, ftm: 0, fta: 0, composite: -2.21, zScores: { pts: -0.883, reb: -0.409, ast: -0.997, stl: 0.317, blk: -0.503, tpm: 0.133, fgImpact: -0.744, ftImpact: 0, to: 0.878 } },
          { name: "Julian Reese", min: 3, pts: 2, reb: 1, ast: 0, stl: 0, blk: 0, to: 1, tpm: 0, fgm: 1, fga: 1, ftm: 0, fta: 0, composite: -4.44, zScores: { pts: -1.079, reb: -0.817, ast: -0.997, stl: -0.811, blk: -0.503, tpm: -0.854, fgImpact: 0.509, ftImpact: 0, to: 0.112 } },
          { name: "Malik Dia", min: 6, pts: 0, reb: 0, ast: 0, stl: 1, blk: 0, to: 1, tpm: 0, fgm: 0, fga: 3, ftm: 0, fta: 0, composite: -5.88, zScores: { pts: -1.472, reb: -1.226, ast: -0.997, stl: 0.317, blk: -0.503, tpm: -0.854, fgImpact: -1.253, ftImpact: 0, to: 0.112 } },
          { name: "Karlo Matkovic", min: 12, pts: 9, reb: 3, ast: 0, stl: 0, blk: 0, to: 2, tpm: 1, fgm: 4, fga: 7, ftm: 0, fta: 0, composite: -1.76, zScores: { pts: 0.294, reb: 0, ast: -0.997, stl: -0.811, blk: -0.503, tpm: 0.133, fgImpact: 0.783, ftImpact: 0, to: -0.654 } },
          { name: "Christian Koloko", min: 4, pts: 0, reb: 2, ast: 1, stl: 1, blk: 2, to: 0, tpm: 0, fgm: 0, fga: 1, ftm: 0, fta: 0, composite: -0.02, zScores: { pts: -1.472, reb: -0.409, ast: -0.428, stl: 0.317, blk: 2.362, tpm: -0.854, fgImpact: -0.418, ftImpact: 0, to: 0.878 } },
          { name: "Derik Queen", min: 16, pts: 5, reb: 8, ast: 1, stl: 0, blk: 1, to: 5, tpm: 0, fgm: 2, fga: 3, ftm: 1, fta: 2, composite: -2.71, zScores: { pts: -0.491, reb: 2.043, ast: -0.428, stl: -0.811, blk: 0.929, tpm: -0.854, fgImpact: 0.6, ftImpact: -0.75, to: -2.953 } },
          { name: "Jordan Poole", min: 13, pts: 14, reb: 1, ast: 2, stl: 0, blk: 0, to: 1, tpm: 3, fgm: 4, fga: 5, ftm: 3, fta: 4, composite: 3.18, zScores: { pts: 1.274, reb: -0.817, ast: 0.142, stl: -0.811, blk: -0.503, tpm: 2.109, fgImpact: 1.618, ftImpact: 0.054, to: 0.112 } },
          { name: "Saddiq Bey", min: 17, pts: 12, reb: 5, ast: 0, stl: 0, blk: 0, to: 1, tpm: 2, fgm: 3, fga: 7, ftm: 4, fta: 4, composite: 2.08, zScores: { pts: 0.882, reb: 0.817, ast: -0.997, stl: -0.811, blk: -0.503, tpm: 1.121, fgImpact: -0.144, ftImpact: 1.607, to: 0.112 } },
          { name: "Bryce McGowens", min: 20, pts: 1, reb: 3, ast: 7, stl: 3, blk: 0, to: 2, tpm: 0, fgm: 0, fga: 5, ftm: 1, fta: 1, composite: 0.59, zScores: { pts: -1.276, reb: 0, ast: 2.989, stl: 2.573, blk: -0.503, tpm: -0.854, fgImpact: -2.089, ftImpact: 0.402, to: -0.654 } },
          { name: "Kobe Bufkin", min: 12, pts: 9, reb: 1, ast: 1, stl: 0, blk: 0, to: 0, tpm: 3, fgm: 3, fga: 6, ftm: 0, fta: 0, composite: 1, zScores: { pts: 0.294, reb: -0.817, ast: -0.428, stl: -0.811, blk: -0.503, tpm: 2.109, fgImpact: 0.274, ftImpact: 0, to: 0.878 } },
          { name: "Jaron Pierre Jr.", min: 13, pts: 12, reb: 1, ast: 0, stl: 0, blk: 1, to: 2, tpm: 4, fgm: 4, fga: 6, ftm: 0, fta: 0, composite: 2.83, zScores: { pts: 0.882, reb: -0.817, ast: -0.997, stl: -0.811, blk: 0.929, tpm: 3.097, fgImpact: 1.201, ftImpact: 0, to: -0.654 } }
        ]
      },
      home: {
        abbr: "MIA", name: "Miami Heat", score: 128,
        players: [
          { name: "Giannis Antetokounmpo", min: 18, pts: 18, reb: 4, ast: 4, stl: 1, blk: 0, to: 2, tpm: 0, fgm: 8, fga: 13, ftm: 2, fta: 5, composite: 1.39, zScores: { pts: 2.059, reb: 0.409, ast: 1.28, stl: 0.317, blk: -0.503, tpm: -0.854, fgImpact: 1.984, ftImpact: -2.651, to: -0.654 } },
          { name: "Andrew Wiggins", min: 15, pts: 13, reb: 2, ast: 0, stl: 1, blk: 0, to: 0, tpm: 1, fgm: 4, fga: 5, ftm: 4, fta: 5, composite: 2.57, zScores: { pts: 1.078, reb: -0.409, ast: -0.997, stl: 0.317, blk: -0.503, tpm: 0.133, fgImpact: 1.618, ftImpact: 0.455, to: 0.878 } },
          { name: "Bam Adebayo", min: 16, pts: 9, reb: 4, ast: 2, stl: 1, blk: 0, to: 0, tpm: 1, fgm: 3, fga: 5, ftm: 2, fta: 3, composite: 2.01, zScores: { pts: 0.294, reb: 0.409, ast: 0.142, stl: 0.317, blk: -0.503, tpm: 0.133, fgImpact: 0.692, ftImpact: -0.348, to: 0.878 } },
          { name: "Klay Thompson", min: 14, pts: 5, reb: 1, ast: 3, stl: 1, blk: 3, to: 0, tpm: 1, fgm: 2, fga: 7, ftm: 0, fta: 0, composite: 3.45, zScores: { pts: -0.491, reb: -0.817, ast: 0.711, stl: 0.317, blk: 3.794, tpm: 0.133, fgImpact: -1.071, ftImpact: 0, to: 0.878 } },
          { name: "Davion Mitchell", min: 20, pts: 9, reb: 1, ast: 7, stl: 0, blk: 0, to: 1, tpm: 1, fgm: 4, fga: 6, ftm: 0, fta: 0, composite: 2.6, zScores: { pts: 0.294, reb: -0.817, ast: 2.989, stl: -0.811, blk: -0.503, tpm: 0.133, fgImpact: 1.201, ftImpact: 0, to: 0.112 } },
          { name: "Bobby Portis", min: 20, pts: 11, reb: 6, ast: 2, stl: 2, blk: 1, to: 2, tpm: 1, fgm: 4, fga: 13, ftm: 2, fta: 3, composite: 1.84, zScores: { pts: 0.686, reb: 1.226, ast: 0.142, stl: 1.445, blk: 0.929, tpm: 0.133, fgImpact: -1.723, ftImpact: -0.348, to: -0.654 } },
          { name: "Simone Fontecchio", min: 14, pts: 6, reb: 3, ast: 1, stl: 0, blk: 0, to: 1, tpm: 1, fgm: 2, fga: 6, ftm: 1, fta: 1, composite: -2.04, zScores: { pts: -0.295, reb: 0, ast: -0.428, stl: -0.811, blk: -0.503, tpm: 0.133, fgImpact: -0.653, ftImpact: 0.402, to: 0.112 } },
          { name: "Myron Gardner", min: 15, pts: 11, reb: 4, ast: 4, stl: 3, blk: 1, to: 0, tpm: 3, fgm: 3, fga: 6, ftm: 2, fta: 2, composite: 9.94, zScores: { pts: 0.686, reb: 0.409, ast: 1.28, stl: 2.573, blk: 0.929, tpm: 2.109, fgImpact: 0.274, ftImpact: 0.803, to: 0.878 } },
          { name: "Ian Schieffelin", min: 12, pts: 2, reb: 2, ast: 2, stl: 0, blk: 0, to: 1, tpm: 0, fgm: 1, fga: 3, ftm: 0, fta: 0, composite: -3.73, zScores: { pts: -1.079, reb: -0.409, ast: 0.142, stl: -0.811, blk: -0.503, tpm: -0.854, fgImpact: -0.326, ftImpact: 0, to: 0.112 } },
          { name: "J'Vonne Hadley", min: 12, pts: 5, reb: 2, ast: 1, stl: 0, blk: 0, to: 0, tpm: 1, fgm: 2, fga: 5, ftm: 0, fta: 0, composite: -1.87, zScores: { pts: -0.491, reb: -0.409, ast: -0.428, stl: -0.811, blk: -0.503, tpm: 0.133, fgImpact: -0.235, ftImpact: 0, to: 0.878 } },
          { name: "Nikola Jovic", min: 21, pts: 8, reb: 4, ast: 2, stl: 2, blk: 2, to: 0, tpm: 2, fgm: 3, fga: 8, ftm: 0, fta: 0, composite: 5.89, zScores: { pts: 0.098, reb: 0.409, ast: 0.142, stl: 1.445, blk: 2.362, tpm: 1.121, fgImpact: -0.562, ftImpact: 0, to: 0.878 } },
          { name: "Nick Richards", min: 15, pts: 5, reb: 9, ast: 0, stl: 1, blk: 1, to: 3, tpm: 0, fgm: 2, fga: 3, ftm: 1, fta: 2, composite: -0.21, zScores: { pts: -0.491, reb: 2.452, ast: -0.997, stl: 0.317, blk: 0.929, tpm: -0.854, fgImpact: 0.6, ftImpact: -0.75, to: -1.421 } },
          { name: "Tim Hardaway Jr.", min: 19, pts: 11, reb: 3, ast: 2, stl: 0, blk: 0, to: 0, tpm: 2, fgm: 4, fga: 8, ftm: 1, fta: 3, composite: -0.02, zScores: { pts: 0.686, reb: 0, ast: 0.142, stl: -0.811, blk: -0.503, tpm: 1.121, fgImpact: 0.365, ftImpact: -1.901, to: 0.878 } },
          { name: "Tre Donaldson", min: 15, pts: 12, reb: 1, ast: 2, stl: 0, blk: 0, to: 1, tpm: 2, fgm: 5, fga: 8, ftm: 0, fta: 0, composite: 1.42, zScores: { pts: 0.882, reb: -0.817, ast: 0.142, stl: -0.811, blk: -0.503, tpm: 1.121, fgImpact: 1.292, ftImpact: 0, to: 0.112 } },
          { name: "Ryan Conwell", min: 14, pts: 3, reb: 1, ast: 4, stl: 0, blk: 0, to: 0, tpm: 0, fgm: 0, fga: 4, ftm: 3, fta: 4, composite: -3.33, zScores: { pts: -0.883, reb: -0.817, ast: 1.28, stl: -0.811, blk: -0.503, tpm: -0.854, fgImpact: -1.671, ftImpact: 0.054, to: 0.878 } }
        ]
      }
    },
      {
      id: "401901823",
      line: "Philadelphia 76ers 108 @ Brooklyn Nets 114 (Final)",
      completed: true,
      statusText: "Final",
      away: {
        abbr: "PHI", name: "Philadelphia 76ers", score: 108,
        players: [
          { name: "LeBron James", min: 18, pts: 10, reb: 4, ast: 5, stl: 1, blk: 0, to: 2, tpm: 0, fgm: 1, fga: 1, ftm: 8, fta: 8, composite: 4.78, zScores: { pts: 0.49, reb: 0.409, ast: 1.85, stl: 0.317, blk: -0.503, tpm: -0.854, fgImpact: 0.509, ftImpact: 3.213, to: -0.654 } },
          { name: "Joel Embiid", min: 24, pts: 6, reb: 3, ast: 3, stl: 1, blk: 1, to: 8, tpm: 0, fgm: 1, fga: 5, ftm: 4, fta: 4, composite: -4, zScores: { pts: -0.295, reb: 0, ast: 0.711, stl: 0.317, blk: 0.929, tpm: -0.854, fgImpact: -1.162, ftImpact: 1.607, to: -5.252 } },
          { name: "Jaylen Brown", min: 24, pts: 18, reb: 2, ast: 2, stl: 0, blk: 0, to: 0, tpm: 1, fgm: 5, fga: 9, ftm: 7, fta: 7, composite: 5.18, zScores: { pts: 2.059, reb: -0.409, ast: 0.142, stl: -0.811, blk: -0.503, tpm: 0.133, fgImpact: 0.874, ftImpact: 2.812, to: 0.878 } },
          { name: "Tyrese Maxey", min: 19, pts: 14, reb: 2, ast: 2, stl: 1, blk: 0, to: 2, tpm: 2, fgm: 5, fga: 8, ftm: 2, fta: 2, composite: 3.38, zScores: { pts: 1.274, reb: -0.409, ast: 0.142, stl: 0.317, blk: -0.503, tpm: 1.121, fgImpact: 1.292, ftImpact: 0.803, to: -0.654 } },
          { name: "VJ Edgecombe", min: 23, pts: 11, reb: 5, ast: 1, stl: 0, blk: 1, to: 1, tpm: 0, fgm: 3, fga: 6, ftm: 5, fta: 6, composite: 1.58, zScores: { pts: 0.686, reb: 0.817, ast: -0.428, stl: -0.811, blk: 0.929, tpm: -0.854, fgImpact: 0.274, ftImpact: 0.857, to: 0.112 } },
          { name: "Dean Wade", min: 16, pts: 7, reb: 4, ast: 0, stl: 0, blk: 0, to: 2, tpm: 2, fgm: 2, fga: 2, ftm: 1, fta: 2, composite: -1.27, zScores: { pts: -0.099, reb: 0.409, ast: -0.997, stl: -0.811, blk: -0.503, tpm: 1.121, fgImpact: 1.018, ftImpact: -0.75, to: -0.654 } },
          { name: "Jabari Walker", min: 15, pts: 8, reb: 7, ast: 0, stl: 0, blk: 0, to: 0, tpm: 0, fgm: 2, fga: 5, ftm: 4, fta: 4, composite: 0.82, zScores: { pts: 0.098, reb: 1.634, ast: -0.997, stl: -0.811, blk: -0.503, tpm: -0.854, fgImpact: -0.235, ftImpact: 1.607, to: 0.878 } },
          { name: "Dillon Jones", min: 11, pts: 0, reb: 2, ast: 3, stl: 1, blk: 0, to: 1, tpm: 0, fgm: 0, fga: 1, ftm: 0, fta: 0, composite: -2.52, zScores: { pts: -1.472, reb: -0.409, ast: 0.711, stl: 0.317, blk: -0.503, tpm: -0.854, fgImpact: -0.418, ftImpact: 0, to: 0.112 } },
          { name: "Justin Edwards", min: 17, pts: 7, reb: 5, ast: 0, stl: 0, blk: 1, to: 2, tpm: 1, fgm: 3, fga: 7, ftm: 0, fta: 0, composite: -0.83, zScores: { pts: -0.099, reb: 0.817, ast: -0.997, stl: -0.811, blk: 0.929, tpm: 0.133, fgImpact: -0.144, ftImpact: 0, to: -0.654 } },
          { name: "Saint Thomas", min: 5, pts: 4, reb: 1, ast: 1, stl: 0, blk: 0, to: 0, tpm: 0, fgm: 2, fga: 3, ftm: 0, fta: 1, composite: -3.77, zScores: { pts: -0.687, reb: -0.817, ast: -0.428, stl: -0.811, blk: -0.503, tpm: -0.854, fgImpact: 0.6, ftImpact: -1.151, to: 0.878 } },
          { name: "Kentavious Caldwell-Pope", min: 12, pts: 2, reb: 1, ast: 1, stl: 0, blk: 1, to: 0, tpm: 0, fgm: 1, fga: 3, ftm: 0, fta: 0, composite: -2.51, zScores: { pts: -1.079, reb: -0.817, ast: -0.428, stl: -0.811, blk: 0.929, tpm: -0.854, fgImpact: -0.326, ftImpact: 0, to: 0.878 } },
          { name: "Caleb Love", min: 14, pts: 4, reb: 0, ast: 5, stl: 0, blk: 0, to: 0, tpm: 0, fgm: 2, fga: 5, ftm: 0, fta: 0, composite: -1.59, zScores: { pts: -0.687, reb: -1.226, ast: 1.85, stl: -0.811, blk: -0.503, tpm: -0.854, fgImpact: -0.235, ftImpact: 0, to: 0.878 } },
          { name: "Jameer Nelson Jr.", min: 7, pts: 6, reb: 1, ast: 1, stl: 1, blk: 0, to: 2, tpm: 0, fgm: 2, fga: 3, ftm: 2, fta: 3, composite: -2.98, zScores: { pts: -0.295, reb: -0.817, ast: -0.428, stl: 0.317, blk: -0.503, tpm: -0.854, fgImpact: 0.6, ftImpact: -0.348, to: -0.654 } },
          { name: "Labaron Philon Jr.", min: 21, pts: 6, reb: 3, ast: 2, stl: 2, blk: 0, to: 0, tpm: 1, fgm: 2, fga: 8, ftm: 1, fta: 2, composite: -0.44, zScores: { pts: -0.295, reb: 0, ast: 0.142, stl: 1.445, blk: -0.503, tpm: 0.133, fgImpact: -1.488, ftImpact: -0.75, to: 0.878 } },
          { name: "Rayan Rupert", min: 15, pts: 5, reb: 3, ast: 0, stl: 1, blk: 0, to: 1, tpm: 1, fgm: 2, fga: 4, ftm: 0, fta: 0, composite: -1.25, zScores: { pts: -0.491, reb: 0, ast: -0.997, stl: 0.317, blk: -0.503, tpm: 0.133, fgImpact: 0.183, ftImpact: 0, to: 0.112 } }
        ]
      },
      home: {
        abbr: "BKN", name: "Brooklyn Nets", score: 114,
        players: [
          { name: "Julius Randle", min: 22, pts: 14, reb: 6, ast: 2, stl: 2, blk: 0, to: 1, tpm: 0, fgm: 4, fga: 11, ftm: 6, fta: 7, composite: 3.21, zScores: { pts: 1.274, reb: 1.226, ast: 0.142, stl: 1.445, blk: -0.503, tpm: -0.854, fgImpact: -0.888, ftImpact: 1.259, to: 0.112 } },
          { name: "Noah Clowney", min: 20, pts: 11, reb: 1, ast: 0, stl: 1, blk: 1, to: 0, tpm: 2, fgm: 3, fga: 4, ftm: 3, fta: 4, composite: 3.28, zScores: { pts: 0.686, reb: -0.817, ast: -0.997, stl: 0.317, blk: 0.929, tpm: 1.121, fgImpact: 1.109, ftImpact: 0.054, to: 0.878 } },
          { name: "Moritz Wagner", min: 18, pts: 6, reb: 3, ast: 1, stl: 4, blk: 0, to: 0, tpm: 0, fgm: 2, fga: 3, ftm: 2, fta: 2, composite: 3.9, zScores: { pts: -0.295, reb: 0, ast: -0.428, stl: 3.701, blk: -0.503, tpm: -0.854, fgImpact: 0.6, ftImpact: 0.803, to: 0.878 } },
          { name: "Keon Ellis", min: 21, pts: 12, reb: 2, ast: 0, stl: 1, blk: 0, to: 0, tpm: 2, fgm: 5, fga: 8, ftm: 0, fta: 0, composite: 2.58, zScores: { pts: 0.882, reb: -0.409, ast: -0.997, stl: 0.317, blk: -0.503, tpm: 1.121, fgImpact: 1.292, ftImpact: 0, to: 0.878 } },
          { name: "Egor Demin", min: 22, pts: 13, reb: 1, ast: 5, stl: 0, blk: 0, to: 1, tpm: 1, fgm: 5, fga: 13, ftm: 2, fta: 3, composite: -0.1, zScores: { pts: 1.078, reb: -0.817, ast: 1.85, stl: -0.811, blk: -0.503, tpm: 0.133, fgImpact: -0.797, ftImpact: -0.348, to: 0.112 } },
          { name: "Josh Minott", min: 18, pts: 4, reb: 3, ast: 1, stl: 0, blk: 0, to: 2, tpm: 1, fgm: 1, fga: 5, ftm: 1, fta: 5, composite: -8.32, zScores: { pts: -0.687, reb: 0, ast: -0.428, stl: -0.811, blk: -0.503, tpm: 0.133, fgImpact: -1.162, ftImpact: -4.204, to: -0.654 } },
          { name: "Grant Nelson", min: 12, pts: 8, reb: 2, ast: 1, stl: 0, blk: 0, to: 2, tpm: 0, fgm: 3, fga: 4, ftm: 2, fta: 5, composite: -5.1, zScores: { pts: 0.098, reb: -0.409, ast: -0.428, stl: -0.811, blk: -0.503, tpm: -0.854, fgImpact: 1.109, ftImpact: -2.651, to: -0.654 } },
          { name: "Tyler Bilodeau", min: 12, pts: 5, reb: 5, ast: 0, stl: 0, blk: 0, to: 0, tpm: 0, fgm: 2, fga: 4, ftm: 1, fta: 2, composite: -2.53, zScores: { pts: -0.491, reb: 0.817, ast: -0.997, stl: -0.811, blk: -0.503, tpm: -0.854, fgImpact: 0.183, ftImpact: -0.75, to: 0.878 } },
          { name: "Danny Wolf", min: 16, pts: 9, reb: 6, ast: 4, stl: 0, blk: 0, to: 2, tpm: 1, fgm: 4, fga: 7, ftm: 0, fta: 0, composite: 1.75, zScores: { pts: 0.294, reb: 1.226, ast: 1.28, stl: -0.811, blk: -0.503, tpm: 0.133, fgImpact: 0.783, ftImpact: 0, to: -0.654 } },
          { name: "Chaney Johnson", min: 18, pts: 9, reb: 4, ast: 2, stl: 2, blk: 2, to: 2, tpm: 1, fgm: 3, fga: 7, ftm: 2, fta: 4, composite: 2.49, zScores: { pts: 0.294, reb: 0.409, ast: 0.142, stl: 1.445, blk: 2.362, tpm: 0.133, fgImpact: -0.144, ftImpact: -1.5, to: -0.654 } },
          { name: "Terance Mann", min: 12, pts: 0, reb: 2, ast: 1, stl: 1, blk: 0, to: 0, tpm: 0, fgm: 0, fga: 4, ftm: 0, fta: 0, composite: -4.14, zScores: { pts: -1.472, reb: -0.409, ast: -0.428, stl: 0.317, blk: -0.503, tpm: -0.854, fgImpact: -1.671, ftImpact: 0, to: 0.878 } },
          { name: "Drake Powell", min: 14, pts: 4, reb: 0, ast: 1, stl: 1, blk: 0, to: 0, tpm: 0, fgm: 1, fga: 4, ftm: 2, fta: 2, composite: -2.44, zScores: { pts: -0.687, reb: -1.226, ast: -0.428, stl: 0.317, blk: -0.503, tpm: -0.854, fgImpact: -0.744, ftImpact: 0.803, to: 0.878 } },
          { name: "Ben Saraf", min: 12, pts: 5, reb: 1, ast: 3, stl: 1, blk: 0, to: 2, tpm: 1, fgm: 1, fga: 4, ftm: 2, fta: 6, composite: -5.85, zScores: { pts: -0.491, reb: -0.817, ast: 0.711, stl: 0.317, blk: -0.503, tpm: 0.133, fgImpact: -0.744, ftImpact: -3.802, to: -0.654 } },
          { name: "Nolan Traore", min: 16, pts: 12, reb: 1, ast: 2, stl: 1, blk: 0, to: 2, tpm: 2, fgm: 4, fga: 8, ftm: 2, fta: 2, composite: 1.66, zScores: { pts: 0.882, reb: -0.817, ast: 0.142, stl: 0.317, blk: -0.503, tpm: 1.121, fgImpact: 0.365, ftImpact: 0.803, to: -0.654 } },
          { name: "Ben Humrichous", min: 7, pts: 2, reb: 2, ast: 0, stl: 0, blk: 0, to: 0, tpm: 0, fgm: 1, fga: 2, ftm: 0, fta: 0, composite: -3.68, zScores: { pts: -1.079, reb: -0.409, ast: -0.997, stl: -0.811, blk: -0.503, tpm: -0.854, fgImpact: 0.091, ftImpact: 0, to: 0.878 } }
        ]
      }
    },
      {
      id: "401906508",
      line: "Washington Wizards 111 @ New York Knicks 109 (Final)",
      completed: true,
      statusText: "Final",
      away: {
        abbr: "WSH", name: "Washington Wizards", score: 111,
        players: [
          { name: "Anthony Davis", min: 17, pts: 16, reb: 7, ast: 2, stl: 0, blk: 1, to: 2, tpm: 2, fgm: 6, fga: 11, ftm: 2, fta: 2, composite: 5.8, zScores: { pts: 1.667, reb: 1.634, ast: 0.142, stl: -0.811, blk: 0.929, tpm: 1.121, fgImpact: 0.966, ftImpact: 0.803, to: -0.654 } },
          { name: "AJ Dybantsa", min: 23, pts: 11, reb: 2, ast: 2, stl: 4, blk: 0, to: 0, tpm: 0, fgm: 5, fga: 11, ftm: 1, fta: 3, composite: 1.78, zScores: { pts: 0.686, reb: -0.409, ast: 0.142, stl: 3.701, blk: -0.503, tpm: -0.854, fgImpact: 0.039, ftImpact: -1.901, to: 0.878 } },
          { name: "Kyshawn George", min: 22, pts: 12, reb: 7, ast: 5, stl: 0, blk: 1, to: 4, tpm: 2, fgm: 5, fga: 11, ftm: 0, fta: 0, composite: 3.46, zScores: { pts: 0.882, reb: 1.634, ast: 1.85, stl: -0.811, blk: 0.929, tpm: 1.121, fgImpact: 0.039, ftImpact: 0, to: -2.187 } },
          { name: "Deandre Ayton", min: 17, pts: 4, reb: 10, ast: 1, stl: 1, blk: 0, to: 0, tpm: 0, fgm: 2, fga: 2, ftm: 0, fta: 0, composite: 2.6, zScores: { pts: -0.687, reb: 2.86, ast: -0.428, stl: 0.317, blk: -0.503, tpm: -0.854, fgImpact: 1.018, ftImpact: 0, to: 0.878 } },
          { name: "Trae Young", min: 17, pts: 15, reb: 0, ast: 4, stl: 2, blk: 0, to: 2, tpm: 3, fgm: 4, fga: 7, ftm: 4, fta: 6, composite: 4.01, zScores: { pts: 1.471, reb: -1.226, ast: 1.28, stl: 1.445, blk: -0.503, tpm: 2.109, fgImpact: 0.783, ftImpact: -0.696, to: -0.654 } },
          { name: "Anthony Gill", min: 4, pts: 3, reb: 0, ast: 0, stl: 0, blk: 0, to: 0, tpm: 0, fgm: 1, fga: 1, ftm: 1, fta: 2, composite: -4.64, zScores: { pts: -0.883, reb: -1.226, ast: -0.997, stl: -0.811, blk: -0.503, tpm: -0.854, fgImpact: 0.509, ftImpact: -0.75, to: 0.878 } },
          { name: "Justin Champagnie", min: 19, pts: 12, reb: 3, ast: 0, stl: 2, blk: 2, to: 1, tpm: 1, fgm: 3, fga: 5, ftm: 5, fta: 6, composite: 5.49, zScores: { pts: 0.882, reb: 0, ast: -0.997, stl: 1.445, blk: 2.362, tpm: 0.133, fgImpact: 0.692, ftImpact: 0.857, to: 0.112 } },
          { name: "Chris Livingston", min: 6, pts: 5, reb: 0, ast: 0, stl: 0, blk: 0, to: 0, tpm: 1, fgm: 2, fga: 2, ftm: 0, fta: 0, composite: -2, zScores: { pts: -0.491, reb: -1.226, ast: -0.997, stl: -0.811, blk: -0.503, tpm: 0.133, fgImpact: 1.018, ftImpact: 0, to: 0.878 } },
          { name: "Felix Okpara", min: 20, pts: 7, reb: 6, ast: 1, stl: 0, blk: 0, to: 1, tpm: 0, fgm: 3, fga: 7, ftm: 1, fta: 2, composite: -2.25, zScores: { pts: -0.099, reb: 1.226, ast: -0.428, stl: -0.811, blk: -0.503, tpm: -0.854, fgImpact: -0.144, ftImpact: -0.75, to: 0.112 } },
          { name: "Reece Beekman", min: 6, pts: 0, reb: 0, ast: 0, stl: 0, blk: 0, to: 1, tpm: 0, fgm: 0, fga: 0, ftm: 0, fta: 0, composite: -5.75, zScores: { pts: -1.472, reb: -1.226, ast: -0.997, stl: -0.811, blk: -0.503, tpm: -0.854, fgImpact: 0, ftImpact: 0, to: 0.112 } },
          { name: "Tre Mann", min: 16, pts: 6, reb: 5, ast: 4, stl: 0, blk: 0, to: 3, tpm: 1, fgm: 2, fga: 6, ftm: 1, fta: 2, composite: -2.2, zScores: { pts: -0.295, reb: 0.817, ast: 1.28, stl: -0.811, blk: -0.503, tpm: 0.133, fgImpact: -0.653, ftImpact: -0.75, to: -1.421 } },
          { name: "Bub Carrington", min: 17, pts: 11, reb: 3, ast: 1, stl: 1, blk: 0, to: 4, tpm: 2, fgm: 3, fga: 6, ftm: 3, fta: 4, composite: -0.67, zScores: { pts: 0.686, reb: 0, ast: -0.428, stl: 0.317, blk: -0.503, tpm: 1.121, fgImpact: 0.274, ftImpact: 0.054, to: -2.187 } },
          { name: "Bilal Coulibaly", min: 19, pts: 2, reb: 5, ast: 1, stl: 0, blk: 0, to: 2, tpm: 0, fgm: 1, fga: 7, ftm: 0, fta: 0, composite: -5.51, zScores: { pts: -1.079, reb: 0.817, ast: -0.428, stl: -0.811, blk: -0.503, tpm: -0.854, fgImpact: -1.997, ftImpact: 0, to: -0.654 } },
          { name: "Will Riley", min: 19, pts: 2, reb: 4, ast: 1, stl: 1, blk: 0, to: 1, tpm: 0, fgm: 1, fga: 4, ftm: 0, fta: 0, composite: -2.77, zScores: { pts: -1.079, reb: 0.409, ast: -0.428, stl: 0.317, blk: -0.503, tpm: -0.854, fgImpact: -0.744, ftImpact: 0, to: 0.112 } },
          { name: "Tre Johnson", min: 18, pts: 5, reb: 1, ast: 0, stl: 0, blk: 0, to: 1, tpm: 1, fgm: 2, fga: 6, ftm: 0, fta: 0, composite: -4.03, zScores: { pts: -0.491, reb: -0.817, ast: -0.997, stl: -0.811, blk: -0.503, tpm: 0.133, fgImpact: -0.653, ftImpact: 0, to: 0.112 } }
        ]
      },
      home: {
        abbr: "NY", name: "New York Knicks", score: 109,
        players: [
          { name: "OG Anunoby", min: 19, pts: 10, reb: 5, ast: 1, stl: 1, blk: 1, to: 1, tpm: 0, fgm: 3, fga: 6, ftm: 4, fta: 5, composite: 2.11, zScores: { pts: 0.49, reb: 0.817, ast: -0.428, stl: 0.317, blk: 0.929, tpm: -0.854, fgImpact: 0.274, ftImpact: 0.455, to: 0.112 } },
          { name: "Karl-Anthony Towns", min: 19, pts: 8, reb: 7, ast: 3, stl: 1, blk: 0, to: 3, tpm: 1, fgm: 2, fga: 7, ftm: 3, fta: 4, composite: -0.05, zScores: { pts: 0.098, reb: 1.634, ast: 0.711, stl: 0.317, blk: -0.503, tpm: 0.133, fgImpact: -1.071, ftImpact: 0.054, to: -1.421 } },
          { name: "Josh Hart", min: 21, pts: 13, reb: 6, ast: 3, stl: 1, blk: 1, to: 0, tpm: 1, fgm: 5, fga: 8, ftm: 2, fta: 2, composite: 7.37, zScores: { pts: 1.078, reb: 1.226, ast: 0.711, stl: 0.317, blk: 0.929, tpm: 0.133, fgImpact: 1.292, ftImpact: 0.803, to: 0.878 } },
          { name: "Mikal Bridges", min: 20, pts: 2, reb: 1, ast: 3, stl: 0, blk: 1, to: 1, tpm: 0, fgm: 1, fga: 6, ftm: 0, fta: 0, composite: -3.39, zScores: { pts: -1.079, reb: -0.817, ast: 0.711, stl: -0.811, blk: 0.929, tpm: -0.854, fgImpact: -1.58, ftImpact: 0, to: 0.112 } },
          { name: "Jalen Brunson", min: 20, pts: 13, reb: 0, ast: 3, stl: 1, blk: 0, to: 2, tpm: 1, fgm: 6, fga: 12, ftm: 0, fta: 1, composite: -0.75, zScores: { pts: 1.078, reb: -1.226, ast: 0.711, stl: 0.317, blk: -0.503, tpm: 0.133, fgImpact: 0.548, ftImpact: -1.151, to: -0.654 } },
          { name: "Tyler Nickel", min: 6, pts: 3, reb: 0, ast: 2, stl: 1, blk: 0, to: 0, tpm: 1, fgm: 1, fga: 2, ftm: 0, fta: 0, composite: -1.05, zScores: { pts: -0.883, reb: -1.226, ast: 0.142, stl: 0.317, blk: -0.503, tpm: 0.133, fgImpact: 0.091, ftImpact: 0, to: 0.878 } },
          { name: "Pacome Dadiet", min: 12, pts: 5, reb: 5, ast: 0, stl: 1, blk: 0, to: 1, tpm: 1, fgm: 2, fga: 8, ftm: 0, fta: 0, composite: -2.1, zScores: { pts: -0.491, reb: 0.817, ast: -0.997, stl: 0.317, blk: -0.503, tpm: 0.133, fgImpact: -1.488, ftImpact: 0, to: 0.112 } },
          { name: "Mohamed Diawara", min: 13, pts: 0, reb: 2, ast: 3, stl: 0, blk: 0, to: 1, tpm: 0, fgm: 0, fga: 1, ftm: 0, fta: 0, composite: -3.64, zScores: { pts: -1.472, reb: -0.409, ast: 0.711, stl: -0.811, blk: -0.503, tpm: -0.854, fgImpact: -0.418, ftImpact: 0, to: 0.112 } },
          { name: "Andre Drummond", min: 20, pts: 8, reb: 9, ast: 4, stl: 2, blk: 0, to: 2, tpm: 0, fgm: 2, fga: 6, ftm: 4, fta: 6, composite: 1.91, zScores: { pts: 0.098, reb: 2.452, ast: 1.28, stl: 1.445, blk: -0.503, tpm: -0.854, fgImpact: -0.653, ftImpact: -0.696, to: -0.654 } },
          { name: "James Wiseman", min: 9, pts: 4, reb: 1, ast: 0, stl: 0, blk: 2, to: 1, tpm: 0, fgm: 2, fga: 3, ftm: 0, fta: 0, composite: -1.09, zScores: { pts: -0.687, reb: -0.817, ast: -0.997, stl: -0.811, blk: 2.362, tpm: -0.854, fgImpact: 0.6, ftImpact: 0, to: 0.112 } },
          { name: "Jordan Clarkson", min: 9, pts: 7, reb: 0, ast: 0, stl: 0, blk: 0, to: 0, tpm: 1, fgm: 3, fga: 5, ftm: 0, fta: 0, composite: -1.93, zScores: { pts: -0.099, reb: -1.226, ast: -0.997, stl: -0.811, blk: -0.503, tpm: 0.133, fgImpact: 0.692, ftImpact: 0, to: 0.878 } },
          { name: "Landry Shamet", min: 16, pts: 13, reb: 4, ast: 0, stl: 0, blk: 0, to: 1, tpm: 3, fgm: 4, fga: 7, ftm: 2, fta: 2, composite: 2.98, zScores: { pts: 1.078, reb: 0.409, ast: -0.997, stl: -0.811, blk: -0.503, tpm: 2.109, fgImpact: 0.783, ftImpact: 0.803, to: 0.112 } },
          { name: "Bruce Brown", min: 10, pts: 4, reb: 1, ast: 1, stl: 0, blk: 0, to: 1, tpm: 0, fgm: 2, fga: 3, ftm: 0, fta: 0, composite: -3.39, zScores: { pts: -0.687, reb: -0.817, ast: -0.428, stl: -0.811, blk: -0.503, tpm: -0.854, fgImpact: 0.6, ftImpact: 0, to: 0.112 } },
          { name: "Jose Alvarado", min: 14, pts: 6, reb: 2, ast: 1, stl: 1, blk: 0, to: 1, tpm: 0, fgm: 2, fga: 7, ftm: 2, fta: 2, composite: -2.33, zScores: { pts: -0.295, reb: -0.409, ast: -0.428, stl: 0.317, blk: -0.503, tpm: -0.854, fgImpact: -1.071, ftImpact: 0.803, to: 0.112 } },
          { name: "Miles McBride", min: 16, pts: 6, reb: 2, ast: 0, stl: 0, blk: 0, to: 0, tpm: 1, fgm: 2, fga: 7, ftm: 1, fta: 1, composite: -2.67, zScores: { pts: -0.295, reb: -0.409, ast: -0.997, stl: -0.811, blk: -0.503, tpm: 0.133, fgImpact: -1.071, ftImpact: 0.402, to: 0.878 } },
          { name: "Tyler Kolek", min: 10, pts: 2, reb: 1, ast: 3, stl: 1, blk: 0, to: 0, tpm: 0, fgm: 1, fga: 4, ftm: 0, fta: 0, composite: -2.09, zScores: { pts: -1.079, reb: -0.817, ast: 0.711, stl: 0.317, blk: -0.503, tpm: -0.854, fgImpact: -0.744, ftImpact: 0, to: 0.878 } },
          { name: "Jaden Akins", min: 6, pts: 5, reb: 1, ast: 1, stl: 0, blk: 0, to: 0, tpm: 1, fgm: 2, fga: 3, ftm: 0, fta: 0, composite: -1.44, zScores: { pts: -0.491, reb: -0.817, ast: -0.428, stl: -0.811, blk: -0.503, tpm: 0.133, fgImpact: 0.6, ftImpact: 0, to: 0.878 } }
        ]
      }
    },
      {
      id: "401898394",
      line: "Atlanta Hawks 123 @ San Antonio Spurs 116 (Final)",
      completed: true,
      statusText: "Final",
      away: {
        abbr: "ATL", name: "Atlanta Hawks", score: 123,
        players: [
          { name: "Onyeka Okongwu", min: 22, pts: 13, reb: 4, ast: 5, stl: 0, blk: 0, to: 1, tpm: 2, fgm: 5, fga: 11, ftm: 1, fta: 2, composite: 2.54, zScores: { pts: 1.078, reb: 0.409, ast: 1.85, stl: -0.811, blk: -0.503, tpm: 1.121, fgImpact: 0.039, ftImpact: -0.75, to: 0.112 } },
          { name: "CJ McCollum", min: 19, pts: 14, reb: 5, ast: 4, stl: 0, blk: 0, to: 1, tpm: 4, fgm: 5, fga: 11, ftm: 0, fta: 0, composite: 5.31, zScores: { pts: 1.274, reb: 0.817, ast: 1.28, stl: -0.811, blk: -0.503, tpm: 3.097, fgImpact: 0.039, ftImpact: 0, to: 0.112 } },
          { name: "Nickeil Alexander-Walker", min: 23, pts: 7, reb: 3, ast: 2, stl: 0, blk: 0, to: 1, tpm: 1, fgm: 2, fga: 8, ftm: 2, fta: 2, composite: -1.71, zScores: { pts: -0.099, reb: 0, ast: 0.142, stl: -0.811, blk: -0.503, tpm: 0.133, fgImpact: -1.488, ftImpact: 0.803, to: 0.112 } },
          { name: "Aaron Wiggins", min: 24, pts: 10, reb: 2, ast: 4, stl: 1, blk: 2, to: 2, tpm: 2, fgm: 2, fga: 8, ftm: 4, fta: 4, composite: 4.63, zScores: { pts: 0.49, reb: -0.409, ast: 1.28, stl: 0.317, blk: 2.362, tpm: 1.121, fgImpact: -1.488, ftImpact: 1.607, to: -0.654 } },
          { name: "Dyson Daniels", min: 21, pts: 13, reb: 11, ast: 1, stl: 1, blk: 0, to: 0, tpm: 1, fgm: 6, fga: 16, ftm: 0, fta: 0, composite: 3.62, zScores: { pts: 1.078, reb: 3.269, ast: -0.428, stl: 0.317, blk: -0.503, tpm: 0.133, fgImpact: -1.123, ftImpact: 0, to: 0.878 } },
          { name: "Dorian Finney-Smith", min: 8, pts: 2, reb: 1, ast: 0, stl: 1, blk: 0, to: 1, tpm: 0, fgm: 1, fga: 2, ftm: 0, fta: 0, composite: -3.73, zScores: { pts: -1.079, reb: -0.817, ast: -0.997, stl: 0.317, blk: -0.503, tpm: -0.854, fgImpact: 0.091, ftImpact: 0, to: 0.112 } },
          { name: "Corey Kispert", min: 21, pts: 10, reb: 0, ast: 2, stl: 0, blk: 0, to: 0, tpm: 2, fgm: 4, fga: 11, ftm: 0, fta: 0, composite: -0.8, zScores: { pts: 0.49, reb: -1.226, ast: 0.142, stl: -0.811, blk: -0.503, tpm: 1.121, fgImpact: -0.888, ftImpact: 0, to: 0.878 } },
          { name: "Jalen Wilson", min: 14, pts: 2, reb: 1, ast: 1, stl: 0, blk: 0, to: 0, tpm: 0, fgm: 1, fga: 3, ftm: 0, fta: 0, composite: -3.94, zScores: { pts: -1.079, reb: -0.817, ast: -0.428, stl: -0.811, blk: -0.503, tpm: -0.854, fgImpact: -0.326, ftImpact: 0, to: 0.878 } },
          { name: "Cameron Corhen", min: 4, pts: 0, reb: 1, ast: 0, stl: 0, blk: 0, to: 0, tpm: 0, fgm: 0, fga: 0, ftm: 0, fta: 0, composite: -4.58, zScores: { pts: -1.472, reb: -0.817, ast: -0.997, stl: -0.811, blk: -0.503, tpm: -0.854, fgImpact: 0, ftImpact: 0, to: 0.878 } },
          { name: "Asa Newell", min: 14, pts: 16, reb: 1, ast: 0, stl: 0, blk: 0, to: 0, tpm: 1, fgm: 5, fga: 8, ftm: 5, fta: 6, composite: 1.7, zScores: { pts: 1.667, reb: -0.817, ast: -0.997, stl: -0.811, blk: -0.503, tpm: 0.133, fgImpact: 1.292, ftImpact: 0.857, to: 0.878 } },
          { name: "Zuby Ejiofor", min: 14, pts: 7, reb: 4, ast: 0, stl: 1, blk: 0, to: 1, tpm: 1, fgm: 3, fga: 4, ftm: 0, fta: 0, composite: 0.48, zScores: { pts: -0.099, reb: 0.409, ast: -0.997, stl: 0.317, blk: -0.503, tpm: 0.133, fgImpact: 1.109, ftImpact: 0, to: 0.112 } },
          { name: "Jock Landale", min: 14, pts: 10, reb: 5, ast: 2, stl: 1, blk: 2, to: 1, tpm: 2, fgm: 4, fga: 6, ftm: 0, fta: 0, composite: 6.56, zScores: { pts: 0.49, reb: 0.817, ast: 0.142, stl: 0.317, blk: 2.362, tpm: 1.121, fgImpact: 1.201, ftImpact: 0, to: 0.112 } },
          { name: "RayJ Dennis", min: 12, pts: 4, reb: 2, ast: 4, stl: 1, blk: 1, to: 0, tpm: 0, fgm: 2, fga: 6, ftm: 0, fta: 0, composite: 0.8, zScores: { pts: -0.687, reb: -0.409, ast: 1.28, stl: 0.317, blk: 0.929, tpm: -0.854, fgImpact: -0.653, ftImpact: 0, to: 0.878 } },
          { name: "Kobe Johnson", min: 9, pts: 0, reb: 0, ast: 0, stl: 3, blk: 0, to: 1, tpm: 0, fgm: 0, fga: 1, ftm: 0, fta: 0, composite: -2.79, zScores: { pts: -1.472, reb: -1.226, ast: -0.997, stl: 2.573, blk: -0.503, tpm: -0.854, fgImpact: -0.418, ftImpact: 0, to: 0.112 } },
          { name: "Kingston Flemings", min: 20, pts: 15, reb: 3, ast: 5, stl: 3, blk: 0, to: 1, tpm: 2, fgm: 6, fga: 8, ftm: 1, fta: 2, composite: 8.09, zScores: { pts: 1.471, reb: 0, ast: 1.85, stl: 2.573, blk: -0.503, tpm: 1.121, fgImpact: 2.219, ftImpact: -0.75, to: 0.112 } }
        ]
      },
      home: {
        abbr: "SA", name: "San Antonio Spurs", score: 116,
        players: [
          { name: "Julian Champagnie", min: 18, pts: 10, reb: 0, ast: 1, stl: 0, blk: 0, to: 2, tpm: 2, fgm: 4, fga: 6, ftm: 0, fta: 0, composite: -0.81, zScores: { pts: 0.49, reb: -1.226, ast: -0.428, stl: -0.811, blk: -0.503, tpm: 1.121, fgImpact: 1.201, ftImpact: 0, to: -0.654 } },
          { name: "Victor Wembanyama", min: 17, pts: 9, reb: 6, ast: 1, stl: 0, blk: 1, to: 2, tpm: 1, fgm: 3, fga: 6, ftm: 2, fta: 4, composite: -0.54, zScores: { pts: 0.294, reb: 1.226, ast: -0.428, stl: -0.811, blk: 0.929, tpm: 0.133, fgImpact: 0.274, ftImpact: -1.5, to: -0.654 } },
          { name: "Devin Vassell", min: 18, pts: 12, reb: 3, ast: 1, stl: 1, blk: 1, to: 0, tpm: 2, fgm: 4, fga: 8, ftm: 2, fta: 2, composite: 4.87, zScores: { pts: 0.882, reb: 0, ast: -0.428, stl: 0.317, blk: 0.929, tpm: 1.121, fgImpact: 0.365, ftImpact: 0.803, to: 0.878 } },
          { name: "Stephon Castle", min: 18, pts: 14, reb: 4, ast: 3, stl: 1, blk: 0, to: 2, tpm: 1, fgm: 5, fga: 8, ftm: 3, fta: 4, composite: 3.03, zScores: { pts: 1.274, reb: 0.409, ast: 0.711, stl: 0.317, blk: -0.503, tpm: 0.133, fgImpact: 1.292, ftImpact: 0.054, to: -0.654 } },
          { name: "Dylan Harper", min: 19, pts: 16, reb: 4, ast: 4, stl: 1, blk: 0, to: 0, tpm: 3, fgm: 5, fga: 7, ftm: 3, fta: 4, composite: 7.92, zScores: { pts: 1.667, reb: 0.409, ast: 1.28, stl: 0.317, blk: -0.503, tpm: 2.109, fgImpact: 1.71, ftImpact: 0.054, to: 0.878 } },
          { name: "Harrison Barnes", min: 17, pts: 7, reb: 2, ast: 2, stl: 1, blk: 1, to: 1, tpm: 1, fgm: 2, fga: 5, ftm: 2, fta: 2, composite: 1.69, zScores: { pts: -0.099, reb: -0.409, ast: 0.142, stl: 0.317, blk: 0.929, tpm: 0.133, fgImpact: -0.235, ftImpact: 0.803, to: 0.112 } },
          { name: "Keldon Johnson", min: 19, pts: 3, reb: 7, ast: 2, stl: 1, blk: 0, to: 2, tpm: 0, fgm: 0, fga: 2, ftm: 3, fta: 4, composite: -1.58, zScores: { pts: -0.883, reb: 1.634, ast: 0.142, stl: 0.317, blk: -0.503, tpm: -0.854, fgImpact: -0.835, ftImpact: 0.054, to: -0.654 } },
          { name: "David Jones Garcia", min: 15, pts: 14, reb: 4, ast: 0, stl: 0, blk: 0, to: 2, tpm: 1, fgm: 4, fga: 9, ftm: 5, fta: 6, composite: -0.35, zScores: { pts: 1.274, reb: 0.409, ast: -0.997, stl: -0.811, blk: -0.503, tpm: 0.133, fgImpact: -0.053, ftImpact: 0.857, to: -0.654 } },
          { name: "Carter Bryant", min: 23, pts: 11, reb: 5, ast: 0, stl: 1, blk: 1, to: 4, tpm: 2, fgm: 3, fga: 8, ftm: 3, fta: 4, composite: 0.18, zScores: { pts: 0.686, reb: 0.817, ast: -0.997, stl: 0.317, blk: 0.929, tpm: 1.121, fgImpact: -0.562, ftImpact: 0.054, to: -2.187 } },
          { name: "Luke Kornet", min: 15, pts: 6, reb: 4, ast: 2, stl: 0, blk: 1, to: 0, tpm: 0, fgm: 2, fga: 5, ftm: 2, fta: 2, composite: 0.97, zScores: { pts: -0.295, reb: 0.409, ast: 0.142, stl: -0.811, blk: 0.929, tpm: -0.854, fgImpact: -0.235, ftImpact: 0.803, to: 0.878 } },
          { name: "Tarris Reed Jr.", min: 17, pts: 2, reb: 6, ast: 1, stl: 0, blk: 0, to: 0, tpm: 0, fgm: 0, fga: 2, ftm: 2, fta: 2, composite: -1.6, zScores: { pts: -1.079, reb: 1.226, ast: -0.428, stl: -0.811, blk: -0.503, tpm: -0.854, fgImpact: -0.835, ftImpact: 0.803, to: 0.878 } },
          { name: "Jordan McLaughlin", min: 13, pts: 2, reb: 1, ast: 1, stl: 0, blk: 0, to: 2, tpm: 0, fgm: 1, fga: 2, ftm: 0, fta: 0, composite: -5.06, zScores: { pts: -1.079, reb: -0.817, ast: -0.428, stl: -0.811, blk: -0.503, tpm: -0.854, fgImpact: 0.091, ftImpact: 0, to: -0.654 } },
          { name: "Jon Elmore", min: 6, pts: 0, reb: 0, ast: 0, stl: 0, blk: 1, to: 1, tpm: 0, fgm: 0, fga: 2, ftm: 0, fta: 0, composite: -5.15, zScores: { pts: -1.472, reb: -1.226, ast: -0.997, stl: -0.811, blk: 0.929, tpm: -0.854, fgImpact: -0.835, ftImpact: 0, to: 0.112 } },
          { name: "RJ Davis", min: 7, pts: 2, reb: 2, ast: 1, stl: 0, blk: 0, to: 1, tpm: 0, fgm: 1, fga: 2, ftm: 0, fta: 0, composite: -3.88, zScores: { pts: -1.079, reb: -0.409, ast: -0.428, stl: -0.811, blk: -0.503, tpm: -0.854, fgImpact: 0.091, ftImpact: 0, to: 0.112 } },
          { name: "Taelon Peter", min: 9, pts: 0, reb: 1, ast: 1, stl: 0, blk: 0, to: 0, tpm: 0, fgm: 0, fga: 2, ftm: 0, fta: 0, composite: -4.84, zScores: { pts: -1.472, reb: -0.817, ast: -0.428, stl: -0.811, blk: -0.503, tpm: -0.854, fgImpact: -0.835, ftImpact: 0, to: 0.878 } },
          { name: "Ja'Kobi Gillespie", min: 9, pts: 8, reb: 0, ast: 0, stl: 1, blk: 0, to: 2, tpm: 1, fgm: 3, fga: 6, ftm: 1, fta: 1, composite: -2.16, zScores: { pts: 0.098, reb: -1.226, ast: -0.997, stl: 0.317, blk: -0.503, tpm: 0.133, fgImpact: 0.274, ftImpact: 0.402, to: -0.654 } }
        ]
      }
    },
      {
      id: "401898717",
      line: "Sacramento Kings 110 @ Los Angeles Lakers 114 (Final)",
      completed: true,
      statusText: "Final",
      away: {
        abbr: "SAC", name: "Sacramento Kings", score: 110,
        players: [
          { name: "De'Andre Hunter", min: 18, pts: 3, reb: 4, ast: 0, stl: 2, blk: 0, to: 5, tpm: 0, fgm: 1, fga: 6, ftm: 1, fta: 1, composite: -5.52, zScores: { pts: -0.883, reb: 0.409, ast: -0.997, stl: 1.445, blk: -0.503, tpm: -0.854, fgImpact: -1.58, ftImpact: 0.402, to: -2.953 } },
          { name: "Precious Achiuwa", min: 24, pts: 18, reb: 5, ast: 3, stl: 1, blk: 0, to: 1, tpm: 0, fgm: 9, fga: 13, ftm: 0, fta: 0, composite: 5.57, zScores: { pts: 2.059, reb: 0.817, ast: 0.711, stl: 0.317, blk: -0.503, tpm: -0.854, fgImpact: 2.91, ftImpact: 0, to: 0.112 } },
          { name: "Maxime Raynaud", min: 24, pts: 13, reb: 10, ast: 2, stl: 0, blk: 2, to: 4, tpm: 0, fgm: 5, fga: 8, ftm: 3, fta: 4, composite: 3.94, zScores: { pts: 1.078, reb: 2.86, ast: 0.142, stl: -0.811, blk: 2.362, tpm: -0.854, fgImpact: 1.292, ftImpact: 0.054, to: -2.187 } },
          { name: "Zach LaVine", min: 23, pts: 11, reb: 1, ast: 4, stl: 4, blk: 0, to: 0, tpm: 0, fgm: 3, fga: 8, ftm: 5, fta: 5, composite: 5.82, zScores: { pts: 0.686, reb: -0.817, ast: 1.28, stl: 3.701, blk: -0.503, tpm: -0.854, fgImpact: -0.562, ftImpact: 2.008, to: 0.878 } },
          { name: "Darius Acuff Jr.", min: 23, pts: 12, reb: 0, ast: 1, stl: 2, blk: 1, to: 3, tpm: 2, fgm: 4, fga: 15, ftm: 2, fta: 2, composite: -0.45, zScores: { pts: 0.882, reb: -1.226, ast: -0.428, stl: 1.445, blk: 0.929, tpm: 1.121, fgImpact: -2.559, ftImpact: 0.803, to: -1.421 } },
          { name: "Leaky Black", min: 11, pts: 4, reb: 1, ast: 1, stl: 1, blk: 0, to: 0, tpm: 0, fgm: 2, fga: 2, ftm: 0, fta: 0, composite: -1.08, zScores: { pts: -0.687, reb: -0.817, ast: -0.428, stl: 0.317, blk: -0.503, tpm: -0.854, fgImpact: 1.018, ftImpact: 0, to: 0.878 } },
          { name: "Alex Karaban", min: 20, pts: 7, reb: 3, ast: 2, stl: 1, blk: 0, to: 2, tpm: 2, fgm: 2, fga: 3, ftm: 1, fta: 1, composite: 1.33, zScores: { pts: -0.099, reb: 0, ast: 0.142, stl: 0.317, blk: -0.503, tpm: 1.121, fgImpact: 0.6, ftImpact: 0.402, to: -0.654 } },
          { name: "Jonathan Mogbo", min: 22, pts: 12, reb: 7, ast: 3, stl: 2, blk: 0, to: 2, tpm: 0, fgm: 5, fga: 7, ftm: 2, fta: 4, composite: 2.87, zScores: { pts: 0.882, reb: 1.634, ast: 0.711, stl: 1.445, blk: -0.503, tpm: -0.854, fgImpact: 1.71, ftImpact: -1.5, to: -0.654 } },
          { name: "Dylan Cardwell", min: 12, pts: 0, reb: 7, ast: 2, stl: 0, blk: 0, to: 2, tpm: 0, fgm: 0, fga: 0, ftm: 0, fta: 2, composite: -4.82, zScores: { pts: -1.472, reb: 1.634, ast: 0.142, stl: -0.811, blk: -0.503, tpm: -0.854, fgImpact: 0, ftImpact: -2.303, to: -0.654 } },
          { name: "Elfrid Payton", min: 10, pts: 0, reb: 3, ast: 2, stl: 2, blk: 0, to: 2, tpm: 0, fgm: 0, fga: 2, ftm: 0, fta: 0, composite: -2.73, zScores: { pts: -1.472, reb: 0, ast: 0.142, stl: 1.445, blk: -0.503, tpm: -0.854, fgImpact: -0.835, ftImpact: 0, to: -0.654 } },
          { name: "Daeqwon Plowden", min: 11, pts: 15, reb: 0, ast: 1, stl: 1, blk: 2, to: 1, tpm: 3, fgm: 6, fga: 10, ftm: 0, fta: 0, composite: 6.1, zScores: { pts: 1.471, reb: -1.226, ast: -0.428, stl: 0.317, blk: 2.362, tpm: 2.109, fgImpact: 1.383, ftImpact: 0, to: 0.112 } },
          { name: "Adam Flagler", min: 8, pts: 0, reb: 0, ast: 1, stl: 0, blk: 0, to: 2, tpm: 0, fgm: 0, fga: 4, ftm: 0, fta: 0, composite: -7.62, zScores: { pts: -1.472, reb: -1.226, ast: -0.428, stl: -0.811, blk: -0.503, tpm: -0.854, fgImpact: -1.671, ftImpact: 0, to: -0.654 } },
          { name: "Nique Clifford", min: 12, pts: 4, reb: 2, ast: 6, stl: 2, blk: 0, to: 1, tpm: 0, fgm: 2, fga: 7, ftm: 0, fta: 0, composite: 0.45, zScores: { pts: -0.687, reb: -0.409, ast: 2.419, stl: 1.445, blk: -0.503, tpm: -0.854, fgImpact: -1.071, ftImpact: 0, to: 0.112 } },
          { name: "Emanuel Sharp", min: 21, pts: 11, reb: 3, ast: 1, stl: 2, blk: 0, to: 0, tpm: 3, fgm: 3, fga: 9, ftm: 2, fta: 5, composite: 0.56, zScores: { pts: 0.686, reb: 0, ast: -0.428, stl: 1.445, blk: -0.503, tpm: 2.109, fgImpact: -0.979, ftImpact: -2.651, to: 0.878 } }
        ]
      },
      home: {
        abbr: "LAL", name: "Los Angeles Lakers", score: 114,
        players: [
          { name: "Kevon Looney", min: 17, pts: 4, reb: 5, ast: 1, stl: 0, blk: 1, to: 0, tpm: 0, fgm: 1, fga: 2, ftm: 2, fta: 4, composite: -1.56, zScores: { pts: -0.687, reb: 0.817, ast: -0.428, stl: -0.811, blk: 0.929, tpm: -0.854, fgImpact: 0.091, ftImpact: -1.5, to: 0.878 } },
          { name: "Adou Thiero", min: 21, pts: 6, reb: 3, ast: 1, stl: 2, blk: 2, to: 0, tpm: 0, fgm: 3, fga: 7, ftm: 0, fta: 0, composite: 2.96, zScores: { pts: -0.295, reb: 0, ast: -0.428, stl: 1.445, blk: 2.362, tpm: -0.854, fgImpact: -0.144, ftImpact: 0, to: 0.878 } },
          { name: "Luka Doncic", min: 25, pts: 23, reb: 3, ast: 3, stl: 1, blk: 0, to: 5, tpm: 2, fgm: 6, fga: 16, ftm: 9, fta: 9, composite: 4.22, zScores: { pts: 3.04, reb: 0, ast: 0.711, stl: 0.317, blk: -0.503, tpm: 1.121, fgImpact: -1.123, ftImpact: 3.615, to: -2.953 } },
          { name: "Austin Reaves", min: 25, pts: 8, reb: 5, ast: 8, stl: 1, blk: 0, to: 3, tpm: 0, fgm: 2, fga: 7, ftm: 4, fta: 4, composite: 2.55, zScores: { pts: 0.098, reb: 0.817, ast: 3.558, stl: 0.317, blk: -0.503, tpm: -0.854, fgImpact: -1.071, ftImpact: 1.607, to: -1.421 } },
          { name: "Quentin Grimes", min: 29, pts: 12, reb: 0, ast: 0, stl: 2, blk: 0, to: 6, tpm: 2, fgm: 4, fga: 8, ftm: 2, fta: 2, composite: -1.83, zScores: { pts: 0.882, reb: -1.226, ast: -0.997, stl: 1.445, blk: -0.503, tpm: 1.121, fgImpact: 0.365, ftImpact: 0.803, to: -3.72 } },
          { name: "Jarred Vanderbilt", min: 9, pts: 4, reb: 6, ast: 0, stl: 1, blk: 0, to: 1, tpm: 0, fgm: 2, fga: 2, ftm: 0, fta: 0, composite: -0.37, zScores: { pts: -0.687, reb: 1.226, ast: -0.997, stl: 0.317, blk: -0.503, tpm: -0.854, fgImpact: 1.018, ftImpact: 0, to: 0.112 } },
          { name: "Sandro Mamukelashvili", min: 21, pts: 19, reb: 3, ast: 4, stl: 1, blk: 1, to: 2, tpm: 3, fgm: 7, fga: 10, ftm: 2, fta: 2, composite: 9.35, zScores: { pts: 2.255, reb: 0, ast: 1.28, stl: 0.317, blk: 0.929, tpm: 2.109, fgImpact: 2.31, ftImpact: 0.803, to: -0.654 } },
          { name: "Cole Swider", min: 4, pts: 1, reb: 0, ast: 0, stl: 0, blk: 0, to: 0, tpm: 0, fgm: 0, fga: 2, ftm: 1, fta: 1, composite: -5.22, zScores: { pts: -1.276, reb: -1.226, ast: -0.997, stl: -0.811, blk: -0.503, tpm: -0.854, fgImpact: -0.835, ftImpact: 0.402, to: 0.878 } },
          { name: "Jake LaRavia", min: 24, pts: 17, reb: 4, ast: 3, stl: 1, blk: 1, to: 1, tpm: 3, fgm: 6, fga: 9, ftm: 2, fta: 4, composite: 6.75, zScores: { pts: 1.863, reb: 0.409, ast: 0.711, stl: 0.317, blk: 0.929, tpm: 2.109, fgImpact: 1.801, ftImpact: -1.5, to: 0.112 } },
          { name: "William Kyle III", min: 3, pts: 2, reb: 0, ast: 0, stl: 0, blk: 1, to: 1, tpm: 0, fgm: 1, fga: 2, ftm: 0, fta: 0, composite: -3.84, zScores: { pts: -1.079, reb: -1.226, ast: -0.997, stl: -0.811, blk: 0.929, tpm: -0.854, fgImpact: 0.091, ftImpact: 0, to: 0.112 } },
          { name: "AK Okereke", min: 5, pts: 3, reb: 2, ast: 0, stl: 0, blk: 0, to: 0, tpm: 0, fgm: 1, fga: 1, ftm: 1, fta: 2, composite: -3.82, zScores: { pts: -0.883, reb: -0.409, ast: -0.997, stl: -0.811, blk: -0.503, tpm: -0.854, fgImpact: 0.509, ftImpact: -0.75, to: 0.878 } },
          { name: "Matisse Thybulle", min: 21, pts: 3, reb: 4, ast: 1, stl: 1, blk: 0, to: 0, tpm: 1, fgm: 1, fga: 4, ftm: 0, fta: 0, composite: -0.82, zScores: { pts: -0.883, reb: 0.409, ast: -0.428, stl: 0.317, blk: -0.503, tpm: 0.133, fgImpact: -0.744, ftImpact: 0, to: 0.878 } },
          { name: "Bronny James", min: 22, pts: 4, reb: 4, ast: 6, stl: 1, blk: 0, to: 4, tpm: 0, fgm: 1, fga: 3, ftm: 2, fta: 2, composite: -0.61, zScores: { pts: -0.687, reb: 0.409, ast: 2.419, stl: 0.317, blk: -0.503, tpm: -0.854, fgImpact: -0.326, ftImpact: 0.803, to: -2.187 } },
          { name: "Chris Manon", min: 6, pts: 2, reb: 0, ast: 0, stl: 1, blk: 0, to: 0, tpm: 0, fgm: 0, fga: 2, ftm: 2, fta: 2, composite: -3.5, zScores: { pts: -1.079, reb: -1.226, ast: -0.997, stl: 0.317, blk: -0.503, tpm: -0.854, fgImpact: -0.835, ftImpact: 0.803, to: 0.878 } },
          { name: "Jaden Hardy", min: 9, pts: 6, reb: 0, ast: 0, stl: 1, blk: 0, to: 1, tpm: 0, fgm: 1, fga: 3, ftm: 4, fta: 6, composite: -4.47, zScores: { pts: -0.295, reb: -1.226, ast: -0.997, stl: 0.317, blk: -0.503, tpm: -0.854, fgImpact: -0.326, ftImpact: -0.696, to: 0.112 } }
        ]
      }
    }
    ]
  },
    "2026-10-09": {
    games: [
      {
      id: "401898395",
      line: "Houston Rockets 135 @ Dallas Mavericks 117 (Final)",
      completed: true,
      statusText: "Final",
      away: {
        abbr: "HOU", name: "Houston Rockets", score: 135,
        players: [
          { name: "Kevin Durant", min: 23, pts: 15, reb: 0, ast: 2, stl: 0, blk: 1, to: 1, tpm: 1, fgm: 7, fga: 12, ftm: 0, fta: 1, composite: 1.95, zScores: { pts: 1.289, reb: -1.056, ast: 0.064, stl: -0.851, blk: 2.021, tpm: 0.038, fgImpact: 1.481, ftImpact: -1.236, to: 0.199 } },
          { name: "Jabari Smith Jr.", min: 22, pts: 12, reb: 4, ast: 1, stl: 1, blk: 0, to: 0, tpm: 2, fgm: 4, fga: 8, ftm: 2, fta: 4, composite: 1.21, zScores: { pts: 0.775, reb: 0.515, ast: -0.427, stl: 0.303, blk: -0.495, tpm: 0.808, fgImpact: 0.278, ftImpact: -1.56, to: 1.007 } },
          { name: "Alperen Sengun", min: 22, pts: 16, reb: 10, ast: 10, stl: 1, blk: 0, to: 3, tpm: 0, fgm: 6, fga: 9, ftm: 4, fta: 5, composite: 8.48, zScores: { pts: 1.461, reb: 2.873, ast: 3.993, stl: 0.303, blk: -0.495, tpm: -0.732, fgImpact: 1.908, ftImpact: 0.589, to: -1.418 } },
          { name: "Fred VanVleet", min: 24, pts: 17, reb: 2, ast: 7, stl: 2, blk: 0, to: 1, tpm: 5, fgm: 5, fga: 12, ftm: 2, fta: 3, composite: 7.19, zScores: { pts: 1.632, reb: -0.271, ast: 2.52, stl: 1.457, blk: -0.495, tpm: 3.118, fgImpact: -0.645, ftImpact: -0.324, to: 0.199 } },
          { name: "Amen Thompson", min: 24, pts: 8, reb: 7, ast: 2, stl: 1, blk: 1, to: 6, tpm: 0, fgm: 4, fga: 8, ftm: 0, fta: 0, composite: -0.13, zScores: { pts: 0.09, reb: 1.694, ast: 0.064, stl: 0.303, blk: 2.021, tpm: -0.732, fgImpact: 0.278, ftImpact: 0, to: -3.844 } },
          { name: "Tari Eason", min: 24, pts: 20, reb: 9, ast: 2, stl: 2, blk: 0, to: 0, tpm: 2, fgm: 6, fga: 10, ftm: 6, fta: 7, composite: 10.38, zScores: { pts: 2.146, reb: 2.48, ast: 0.064, stl: 1.457, blk: -0.495, tpm: 0.808, fgImpact: 1.411, ftImpact: 1.501, to: 1.007 } },
          { name: "Isaiah Crawford", min: 12, pts: 4, reb: 1, ast: 0, stl: 1, blk: 1, to: 1, tpm: 1, fgm: 1, fga: 3, ftm: 1, fta: 2, composite: -0.82, zScores: { pts: -0.596, reb: -0.663, ast: -0.918, stl: 0.303, blk: 2.021, tpm: 0.038, fgImpact: -0.427, ftImpact: -0.78, to: 0.199 } },
          { name: "Julian Phillips", min: 7, pts: 0, reb: 0, ast: 0, stl: 0, blk: 0, to: 0, tpm: 0, fgm: 0, fga: 0, ftm: 0, fta: 0, composite: -4.33, zScores: { pts: -1.281, reb: -1.056, ast: -0.918, stl: -0.851, blk: -0.495, tpm: -0.732, fgImpact: 0, ftImpact: 0, to: 1.007 } },
          { name: "Steven Adams", min: 14, pts: 2, reb: 3, ast: 1, stl: 1, blk: 0, to: 1, tpm: 0, fgm: 1, fga: 1, ftm: 0, fta: 0, composite: -1.4, zScores: { pts: -0.938, reb: 0.122, ast: -0.427, stl: 0.303, blk: -0.495, tpm: -0.732, fgImpact: 0.566, ftImpact: 0, to: 0.199 } },
          { name: "Oscar Tshiebwe", min: 12, pts: 5, reb: 3, ast: 1, stl: 0, blk: 0, to: 2, tpm: 0, fgm: 2, fga: 2, ftm: 1, fta: 2, composite: -3.06, zScores: { pts: -0.424, reb: 0.122, ast: -0.427, stl: -0.851, blk: -0.495, tpm: -0.732, fgImpact: 1.133, ftImpact: -0.78, to: -0.61 } },
          { name: "Bogdan Bogdanovic", min: 16, pts: 4, reb: 2, ast: 4, stl: 0, blk: 0, to: 1, tpm: 0, fgm: 1, fga: 4, ftm: 2, fta: 2, composite: -1.71, zScores: { pts: -0.596, reb: -0.271, ast: 1.047, stl: -0.851, blk: -0.495, tpm: -0.732, fgImpact: -0.924, ftImpact: 0.912, to: 0.199 } },
          { name: "Quadir Copeland", min: 9, pts: 3, reb: 1, ast: 1, stl: 1, blk: 0, to: 2, tpm: 0, fgm: 0, fga: 0, ftm: 3, fta: 4, composite: -3.26, zScores: { pts: -0.767, reb: -0.663, ast: -0.427, stl: 0.303, blk: -0.495, tpm: -0.732, fgImpact: 0, ftImpact: 0.132, to: -0.61 } },
          { name: "Sean Pedulla", min: 4, pts: 0, reb: 0, ast: 2, stl: 0, blk: 0, to: 0, tpm: 0, fgm: 0, fga: 1, ftm: 0, fta: 0, composite: -3.84, zScores: { pts: -1.281, reb: -1.056, ast: 0.064, stl: -0.851, blk: -0.495, tpm: -0.732, fgImpact: -0.497, ftImpact: 0, to: 1.007 } },
          { name: "Reed Sheppard", min: 19, pts: 16, reb: 1, ast: 1, stl: 1, blk: 0, to: 1, tpm: 4, fgm: 6, fga: 10, ftm: 0, fta: 0, composite: 4.14, zScores: { pts: 1.461, reb: -0.663, ast: -0.427, stl: 0.303, blk: -0.495, tpm: 2.348, fgImpact: 1.411, ftImpact: 0, to: 0.199 } },
          { name: "Bruce Thornton", min: 9, pts: 13, reb: 0, ast: 2, stl: 0, blk: 1, to: 2, tpm: 3, fgm: 4, fga: 6, ftm: 2, fta: 2, composite: 4.28, zScores: { pts: 0.947, reb: -1.056, ast: 0.064, stl: -0.851, blk: 2.021, tpm: 1.578, fgImpact: 1.272, ftImpact: 0.912, to: -0.61 } }
        ]
      },
      home: {
        abbr: "DAL", name: "Dallas Mavericks", score: 117,
        players: [
          { name: "Naji Marshall", min: 24, pts: 16, reb: 2, ast: 3, stl: 0, blk: 0, to: 2, tpm: 1, fgm: 7, fga: 14, ftm: 1, fta: 2, composite: -0.47, zScores: { pts: 1.461, reb: -0.271, ast: 0.555, stl: -0.851, blk: -0.495, tpm: 0.038, fgImpact: 0.487, ftImpact: -0.78, to: -0.61 } },
          { name: "Morez Johnson Jr.", min: 12, pts: 4, reb: 2, ast: 1, stl: 1, blk: 0, to: 0, tpm: 1, fgm: 1, fga: 3, ftm: 1, fta: 2, composite: -1.65, zScores: { pts: -0.596, reb: -0.271, ast: -0.427, stl: 0.303, blk: -0.495, tpm: 0.038, fgImpact: -0.427, ftImpact: -0.78, to: 1.007 } },
          { name: "Cooper Flagg", min: 19, pts: 19, reb: 6, ast: 3, stl: 1, blk: 1, to: 2, tpm: 1, fgm: 7, fga: 14, ftm: 4, fta: 4, composite: 7.9, zScores: { pts: 1.975, reb: 1.301, ast: 0.555, stl: 0.303, blk: 2.021, tpm: 0.038, fgImpact: 0.487, ftImpact: 1.825, to: -0.61 } },
          { name: "Zaccharie Risacher", min: 24, pts: 9, reb: 8, ast: 1, stl: 1, blk: 0, to: 1, tpm: 1, fgm: 4, fga: 9, ftm: 0, fta: 0, composite: 1.75, zScores: { pts: 0.261, reb: 2.087, ast: -0.427, stl: 0.303, blk: -0.495, tpm: 0.038, fgImpact: -0.218, ftImpact: 0, to: 0.199 } },
          { name: "Max Christie", min: 24, pts: 14, reb: 2, ast: 2, stl: 1, blk: 0, to: 0, tpm: 4, fgm: 5, fga: 12, ftm: 0, fta: 0, composite: 3.43, zScores: { pts: 1.118, reb: -0.271, ast: 0.064, stl: 0.303, blk: -0.495, tpm: 2.348, fgImpact: -0.645, ftImpact: 0, to: 1.007 } },
          { name: "Dwight Powell", min: 13, pts: 1, reb: 1, ast: 8, stl: 0, blk: 1, to: 1, tpm: 0, fgm: 0, fga: 1, ftm: 1, fta: 2, composite: 0.6, zScores: { pts: -1.11, reb: -0.663, ast: 3.011, stl: -0.851, blk: 2.021, tpm: -0.732, fgImpact: -0.497, ftImpact: -0.78, to: 0.199 } },
          { name: "Daniel Gafford", min: 8, pts: 7, reb: 3, ast: 0, stl: 1, blk: 0, to: 1, tpm: 1, fgm: 3, fga: 4, ftm: 0, fta: 0, composite: 0.37, zScores: { pts: -0.081, reb: 0.122, ast: -0.918, stl: 0.303, blk: -0.495, tpm: 0.038, fgImpact: 1.202, ftImpact: 0, to: 0.199 } },
          { name: "Tobi Lawal", min: 15, pts: 13, reb: 1, ast: 0, stl: 2, blk: 0, to: 2, tpm: 0, fgm: 5, fga: 6, ftm: 3, fta: 3, composite: 2.69, zScores: { pts: 0.947, reb: -0.663, ast: -0.918, stl: 1.457, blk: -0.495, tpm: -0.732, fgImpact: 2.335, ftImpact: 1.369, to: -0.61 } },
          { name: "Tarik Biberovic", min: 19, pts: 9, reb: 3, ast: 2, stl: 0, blk: 0, to: 0, tpm: 3, fgm: 3, fga: 9, ftm: 0, fta: 0, composite: 0.41, zScores: { pts: 0.261, reb: 0.122, ast: 0.064, stl: -0.851, blk: -0.495, tpm: 1.578, fgImpact: -1.281, ftImpact: 0, to: 1.007 } },
          { name: "Sergio de Larrea", min: 24, pts: 11, reb: 2, ast: 6, stl: 1, blk: 0, to: 4, tpm: 3, fgm: 4, fga: 6, ftm: 0, fta: 0, composite: 2.79, zScores: { pts: 0.604, reb: -0.271, ast: 2.029, stl: 0.303, blk: -0.495, tpm: 1.578, fgImpact: 1.272, ftImpact: 0, to: -2.227 } },
          { name: "Moussa Cisse", min: 14, pts: 0, reb: 6, ast: 3, stl: 2, blk: 0, to: 2, tpm: 0, fgm: 0, fga: 3, ftm: 0, fta: 0, composite: -1.29, zScores: { pts: -1.281, reb: 1.301, ast: 0.555, stl: 1.457, blk: -0.495, tpm: -0.732, fgImpact: -1.49, ftImpact: 0, to: -0.61 } },
          { name: "Seth Lundy", min: 14, pts: 3, reb: 1, ast: 0, stl: 0, blk: 0, to: 1, tpm: 1, fgm: 1, fga: 4, ftm: 0, fta: 2, composite: -6.85, zScores: { pts: -0.767, reb: -0.663, ast: -0.918, stl: -0.851, blk: -0.495, tpm: 0.038, fgImpact: -0.924, ftImpact: -2.472, to: 0.199 } },
          { name: "John Poulakidas", min: 14, pts: 3, reb: 0, ast: 2, stl: 0, blk: 0, to: 1, tpm: 1, fgm: 1, fga: 3, ftm: 0, fta: 0, composite: -3.3, zScores: { pts: -0.767, reb: -1.056, ast: 0.064, stl: -0.851, blk: -0.495, tpm: 0.038, fgImpact: -0.427, ftImpact: 0, to: 0.199 } },
          { name: "Jett Howard", min: 16, pts: 8, reb: 1, ast: 3, stl: 2, blk: 0, to: 1, tpm: 1, fgm: 3, fga: 6, ftm: 1, fta: 2, composite: 0.61, zScores: { pts: 0.09, reb: -0.663, ast: 0.555, stl: 1.457, blk: -0.495, tpm: 0.038, fgImpact: 0.209, ftImpact: -0.78, to: 0.199 } }
        ]
      }
    },
      {
      id: "401908940",
      line: "Memphis Grizzlies 104 @ Chicago Bulls 100 (Final)",
      completed: true,
      statusText: "Final",
      away: {
        abbr: "MEM", name: "Memphis Grizzlies", score: 104,
        players: [
          { name: "Cedric Coward", min: 12, pts: 2, reb: 2, ast: 0, stl: 0, blk: 0, to: 0, tpm: 0, fgm: 1, fga: 4, ftm: 0, fta: 0, composite: -4.12, zScores: { pts: -0.938, reb: -0.271, ast: -0.918, stl: -0.851, blk: -0.495, tpm: -0.732, fgImpact: -0.924, ftImpact: 0, to: 1.007 } },
          { name: "Cameron Boozer", min: 12, pts: 10, reb: 4, ast: 3, stl: 0, blk: 0, to: 0, tpm: 0, fgm: 3, fga: 5, ftm: 4, fta: 4, composite: 2.96, zScores: { pts: 0.433, reb: 0.515, ast: 0.555, stl: -0.851, blk: -0.495, tpm: -0.732, fgImpact: 0.706, ftImpact: 1.825, to: 1.007 } },
          { name: "Jaylen Wells", min: 14, pts: 8, reb: 2, ast: 1, stl: 1, blk: 0, to: 1, tpm: 2, fgm: 3, fga: 5, ftm: 0, fta: 0, composite: 0.91, zScores: { pts: 0.09, reb: -0.271, ast: -0.427, stl: 0.303, blk: -0.495, tpm: 0.808, fgImpact: 0.706, ftImpact: 0, to: 0.199 } },
          { name: "Zach Edey", min: 16, pts: 10, reb: 5, ast: 0, stl: 2, blk: 1, to: 3, tpm: 0, fgm: 3, fga: 3, ftm: 4, fta: 6, composite: 2.8, zScores: { pts: 0.433, reb: 0.908, ast: -0.918, stl: 1.457, blk: 2.021, tpm: -0.732, fgImpact: 1.699, ftImpact: -0.648, to: -1.418 } },
          { name: "Ty Jerome", min: 14, pts: 16, reb: 1, ast: 4, stl: 0, blk: 0, to: 0, tpm: 4, fgm: 5, fga: 8, ftm: 2, fta: 2, composite: 6.11, zScores: { pts: 1.461, reb: -0.663, ast: 1.047, stl: -0.851, blk: -0.495, tpm: 2.348, fgImpact: 1.341, ftImpact: 0.912, to: 1.007 } },
          { name: "Jerami Grant", min: 12, pts: 9, reb: 1, ast: 0, stl: 0, blk: 0, to: 0, tpm: 0, fgm: 1, fga: 1, ftm: 7, fta: 8, composite: 0.13, zScores: { pts: 0.261, reb: -0.663, ast: -0.918, stl: -0.851, blk: -0.495, tpm: -0.732, fgImpact: 0.566, ftImpact: 1.957, to: 1.007 } },
          { name: "Kris Murray", min: 16, pts: 3, reb: 3, ast: 3, stl: 0, blk: 0, to: 0, tpm: 1, fgm: 1, fga: 1, ftm: 0, fta: 0, composite: 0.18, zScores: { pts: -0.767, reb: 0.122, ast: 0.555, stl: -0.851, blk: -0.495, tpm: 0.038, fgImpact: 0.566, ftImpact: 0, to: 1.007 } },
          { name: "Olivier-Maxence Prosper", min: 16, pts: 2, reb: 1, ast: 0, stl: 1, blk: 0, to: 4, tpm: 0, fgm: 1, fga: 5, ftm: 0, fta: 0, composite: -7.09, zScores: { pts: -0.938, reb: -0.663, ast: -0.918, stl: 0.303, blk: -0.495, tpm: -0.732, fgImpact: -1.421, ftImpact: 0, to: -2.227 } },
          { name: "Taylor Hendricks", min: 11, pts: 5, reb: 2, ast: 1, stl: 0, blk: 0, to: 1, tpm: 1, fgm: 2, fga: 2, ftm: 0, fta: 0, composite: -1.1, zScores: { pts: -0.424, reb: -0.271, ast: -0.427, stl: -0.851, blk: -0.495, tpm: 0.038, fgImpact: 1.133, ftImpact: 0, to: 0.199 } },
          { name: "GG Jackson", min: 17, pts: 14, reb: 4, ast: 1, stl: 0, blk: 1, to: 1, tpm: 1, fgm: 5, fga: 9, ftm: 3, fta: 4, composite: 3.59, zScores: { pts: 1.118, reb: 0.515, ast: -0.427, stl: -0.851, blk: 2.021, tpm: 0.038, fgImpact: 0.845, ftImpact: 0.132, to: 0.199 } },
          { name: "Karim Lopez", min: 14, pts: 4, reb: 6, ast: 0, stl: 0, blk: 0, to: 1, tpm: 0, fgm: 2, fga: 3, ftm: 0, fta: 0, composite: -1.46, zScores: { pts: -0.596, reb: 1.301, ast: -0.918, stl: -0.851, blk: -0.495, tpm: -0.732, fgImpact: 0.636, ftImpact: 0, to: 0.199 } },
          { name: "Quinten Post", min: 17, pts: 4, reb: 1, ast: 0, stl: 1, blk: 0, to: 0, tpm: 0, fgm: 2, fga: 3, ftm: 0, fta: 0, composite: -1.46, zScores: { pts: -0.596, reb: -0.663, ast: -0.918, stl: 0.303, blk: -0.495, tpm: -0.732, fgImpact: 0.636, ftImpact: 0, to: 1.007 } },
          { name: "Carson Cooper", min: 4, pts: 0, reb: 0, ast: 0, stl: 0, blk: 0, to: 1, tpm: 0, fgm: 0, fga: 0, ftm: 0, fta: 0, composite: -5.13, zScores: { pts: -1.281, reb: -1.056, ast: -0.918, stl: -0.851, blk: -0.495, tpm: -0.732, fgImpact: 0, ftImpact: 0, to: 0.199 } },
          { name: "Scotty Pippen Jr.", min: 12, pts: 2, reb: 0, ast: 0, stl: 3, blk: 0, to: 1, tpm: 0, fgm: 1, fga: 6, ftm: 0, fta: 0, composite: -3.25, zScores: { pts: -0.938, reb: -1.056, ast: -0.918, stl: 2.611, blk: -0.495, tpm: -0.732, fgImpact: -1.917, ftImpact: 0, to: 0.199 } },
          { name: "Cam Spencer", min: 16, pts: 4, reb: 2, ast: 4, stl: 0, blk: 0, to: 1, tpm: 0, fgm: 2, fga: 5, ftm: 0, fta: 0, composite: -2.06, zScores: { pts: -0.596, reb: -0.271, ast: 1.047, stl: -0.851, blk: -0.495, tpm: -0.732, fgImpact: -0.358, ftImpact: 0, to: 0.199 } },
          { name: "Jahmai Mashack", min: 7, pts: 0, reb: 0, ast: 2, stl: 1, blk: 0, to: 1, tpm: 0, fgm: 0, fga: 2, ftm: 0, fta: 0, composite: -3.99, zScores: { pts: -1.281, reb: -1.056, ast: 0.064, stl: 0.303, blk: -0.495, tpm: -0.732, fgImpact: -0.993, ftImpact: 0, to: 0.199 } },
          { name: "Javon Small", min: 14, pts: 9, reb: 5, ast: 3, stl: 4, blk: 0, to: 3, tpm: 1, fgm: 3, fga: 8, ftm: 2, fta: 2, composite: 3.74, zScores: { pts: 0.261, reb: 0.908, ast: 0.555, stl: 3.765, blk: -0.495, tpm: 0.038, fgImpact: -0.785, ftImpact: 0.912, to: -1.418 } },
          { name: "Walter Clayton Jr.", min: 15, pts: 2, reb: 1, ast: 3, stl: 0, blk: 0, to: 3, tpm: 0, fgm: 1, fga: 6, ftm: 0, fta: 0, composite: -6.46, zScores: { pts: -0.938, reb: -0.663, ast: 0.555, stl: -0.851, blk: -0.495, tpm: -0.732, fgImpact: -1.917, ftImpact: 0, to: -1.418 } }
        ]
      },
      home: {
        abbr: "CHI", name: "Chicago Bulls", score: 100,
        players: [
          { name: "Matas Buzelis", min: 12, pts: 6, reb: 0, ast: 0, stl: 0, blk: 1, to: 1, tpm: 0, fgm: 3, fga: 6, ftm: 0, fta: 0, composite: -1.38, zScores: { pts: -0.253, reb: -1.056, ast: -0.918, stl: -0.851, blk: 2.021, tpm: -0.732, fgImpact: 0.209, ftImpact: 0, to: 0.199 } },
          { name: "Caleb Wilson", min: 32, pts: 21, reb: 4, ast: 0, stl: 1, blk: 0, to: 4, tpm: 5, fgm: 7, fga: 17, ftm: 2, fta: 6, composite: -2.42, zScores: { pts: 2.318, reb: 0.515, ast: -0.918, stl: 0.303, blk: -0.495, tpm: 3.118, fgImpact: -1.003, ftImpact: -4.032, to: -2.227 } },
          { name: "Tobe Awaka", min: 24, pts: 0, reb: 7, ast: 2, stl: 0, blk: 0, to: 2, tpm: 0, fgm: 0, fga: 2, ftm: 0, fta: 0, composite: -3.2, zScores: { pts: -1.281, reb: 1.694, ast: 0.064, stl: -0.851, blk: -0.495, tpm: -0.732, fgImpact: -0.993, ftImpact: 0, to: -0.61 } },
          { name: "Norman Powell", min: 19, pts: 17, reb: 3, ast: 2, stl: 1, blk: 0, to: 0, tpm: 1, fgm: 3, fga: 6, ftm: 10, fta: 12, composite: 4.97, zScores: { pts: 1.632, reb: 0.122, ast: 0.064, stl: 0.303, blk: -0.495, tpm: 0.038, fgImpact: 0.209, ftImpact: 2.09, to: 1.007 } },
          { name: "Josh Giddey", min: 23, pts: 13, reb: 3, ast: 3, stl: 0, blk: 1, to: 2, tpm: 1, fgm: 3, fga: 7, ftm: 6, fta: 7, composite: 3.44, zScores: { pts: 0.947, reb: 0.122, ast: 0.555, stl: -0.851, blk: 2.021, tpm: 0.038, fgImpact: -0.288, ftImpact: 1.501, to: -0.61 } },
          { name: "Drew Peterson", min: 7, pts: 3, reb: 2, ast: 0, stl: 2, blk: 1, to: 1, tpm: 1, fgm: 1, fga: 3, ftm: 0, fta: 0, composite: 1.33, zScores: { pts: -0.767, reb: -0.271, ast: -0.918, stl: 1.457, blk: 2.021, tpm: 0.038, fgImpact: -0.427, ftImpact: 0, to: 0.199 } },
          { name: "Patrick Williams", min: 10, pts: 3, reb: 3, ast: 0, stl: 0, blk: 0, to: 0, tpm: 1, fgm: 1, fga: 3, ftm: 0, fta: 0, composite: -2.29, zScores: { pts: -0.767, reb: 0.122, ast: -0.918, stl: -0.851, blk: -0.495, tpm: 0.038, fgImpact: -0.427, ftImpact: 0, to: 1.007 } },
          { name: "Isaac Okoro", min: 23, pts: 5, reb: 3, ast: 3, stl: 1, blk: 0, to: 1, tpm: 0, fgm: 1, fga: 4, ftm: 3, fta: 4, composite: -1.26, zScores: { pts: -0.424, reb: 0.122, ast: 0.555, stl: 0.303, blk: -0.495, tpm: -0.732, fgImpact: -0.924, ftImpact: 0.132, to: 0.199 } },
          { name: "Jalen Bridges", min: 8, pts: 4, reb: 0, ast: 0, stl: 1, blk: 1, to: 0, tpm: 1, fgm: 1, fga: 1, ftm: 1, fta: 2, composite: 0.59, zScores: { pts: -0.596, reb: -1.056, ast: -0.918, stl: 0.303, blk: 2.021, tpm: 0.038, fgImpact: 0.566, ftImpact: -0.78, to: 1.007 } },
          { name: "Leonard Miller", min: 23, pts: 12, reb: 11, ast: 2, stl: 1, blk: 0, to: 2, tpm: 1, fgm: 5, fga: 11, ftm: 1, fta: 3, composite: 1.18, zScores: { pts: 0.775, reb: 3.266, ast: 0.064, stl: 0.303, blk: -0.495, tpm: 0.038, fgImpact: -0.149, ftImpact: -2.016, to: -0.61 } },
          { name: "Noa Essengue", min: 19, pts: 5, reb: 2, ast: 0, stl: 0, blk: 0, to: 0, tpm: 0, fgm: 1, fga: 6, ftm: 3, fta: 4, composite: -4.47, zScores: { pts: -0.424, reb: -0.271, ast: -0.918, stl: -0.851, blk: -0.495, tpm: -0.732, fgImpact: -1.917, ftImpact: 0.132, to: 1.007 } },
          { name: "Buddy Hield", min: 17, pts: 5, reb: 2, ast: 2, stl: 0, blk: 0, to: 1, tpm: 1, fgm: 2, fga: 7, ftm: 0, fta: 0, composite: -3.09, zScores: { pts: -0.424, reb: -0.271, ast: 0.064, stl: -0.851, blk: -0.495, tpm: 0.038, fgImpact: -1.351, ftImpact: 0, to: 0.199 } },
          { name: "Brandon Boston Jr.", min: 4, pts: 0, reb: 1, ast: 1, stl: 0, blk: 0, to: 0, tpm: 0, fgm: 0, fga: 1, ftm: 0, fta: 0, composite: -3.94, zScores: { pts: -1.281, reb: -0.663, ast: -0.427, stl: -0.851, blk: -0.495, tpm: -0.732, fgImpact: -0.497, ftImpact: 0, to: 1.007 } },
          { name: "Dailyn Swain", min: 18, pts: 6, reb: 2, ast: 4, stl: 2, blk: 0, to: 2, tpm: 0, fgm: 2, fga: 6, ftm: 2, fta: 2, composite: 0.2, zScores: { pts: -0.253, reb: -0.271, ast: 1.047, stl: 1.457, blk: -0.495, tpm: -0.732, fgImpact: -0.854, ftImpact: 0.912, to: -0.61 } }
        ]
      }
    }
    ]
  },
    "2026-10-10": {
    games: [
      {
      id: "401902645",
      line: "LA Clippers 106 @ Toronto Raptors 114 (Final)",
      completed: true,
      statusText: "Final",
      away: {
        abbr: "LAC", name: "LA Clippers", score: 106,
        players: [
          { name: "Derrick Jones Jr.", min: 17, pts: 5, reb: 2, ast: 0, stl: 0, blk: 0, to: 0, tpm: 1, fgm: 2, fga: 3, ftm: 0, fta: 2, composite: -3.86, zScores: { pts: -0.491, reb: -0.403, ast: -0.965, stl: -0.731, blk: -0.452, tpm: 0.078, fgImpact: 0.533, ftImpact: -2.443, to: 1.011 } },
          { name: "Rui Hachimura", min: 19, pts: 14, reb: 3, ast: 1, stl: 1, blk: 0, to: 3, tpm: 1, fgm: 3, fga: 8, ftm: 7, fta: 7, composite: 0.84, zScores: { pts: 1.037, reb: -0.046, ast: -0.444, stl: 0.274, blk: -0.452, tpm: 0.078, fgImpact: -0.482, ftImpact: 2.273, to: -1.401 } },
          { name: "Brook Lopez", min: 15, pts: 6, reb: 7, ast: 1, stl: 0, blk: 1, to: 0, tpm: 0, fgm: 3, fga: 6, ftm: 0, fta: 0, composite: 1.52, zScores: { pts: -0.321, reb: 1.383, ast: -0.444, stl: -0.731, blk: 1.123, tpm: -0.747, fgImpact: 0.25, ftImpact: 0, to: 1.011 } },
          { name: "Darius Garland", min: 19, pts: 11, reb: 0, ast: 4, stl: 0, blk: 0, to: 1, tpm: 1, fgm: 4, fga: 11, ftm: 2, fta: 2, composite: -0.49, zScores: { pts: 0.528, reb: -1.118, ast: 1.12, stl: -0.731, blk: -0.452, tpm: 0.078, fgImpact: -0.765, ftImpact: 0.649, to: 0.207 } },
          { name: "Cam Christie", min: 21, pts: 8, reb: 3, ast: 0, stl: 1, blk: 0, to: 1, tpm: 0, fgm: 2, fga: 3, ftm: 4, fta: 4, composite: 0.12, zScores: { pts: 0.018, reb: -0.046, ast: -0.965, stl: 0.274, blk: -0.452, tpm: -0.747, fgImpact: 0.533, ftImpact: 1.299, to: 0.207 } },
          { name: "Isaiah Jackson", min: 15, pts: 8, reb: 4, ast: 0, stl: 0, blk: 0, to: 5, tpm: 0, fgm: 2, fga: 4, ftm: 4, fta: 4, composite: -4.11, zScores: { pts: 0.018, reb: 0.311, ast: -0.965, stl: -0.731, blk: -0.452, tpm: -0.747, fgImpact: 0.167, ftImpact: 1.299, to: -3.008 } },
          { name: "Jahmyl Telfort", min: 10, pts: 2, reb: 5, ast: 1, stl: 1, blk: 0, to: 0, tpm: 0, fgm: 1, fga: 5, ftm: 0, fta: 1, composite: -2.93, zScores: { pts: -1, reb: 0.669, ast: -0.444, stl: 0.274, blk: -0.452, tpm: -0.747, fgImpact: -1.015, ftImpact: -1.221, to: 1.011 } },
          { name: "Baba Miller", min: 16, pts: 10, reb: 4, ast: 0, stl: 2, blk: 1, to: 0, tpm: 1, fgm: 3, fga: 7, ftm: 3, fta: 4, composite: 2.83, zScores: { pts: 0.358, reb: 0.311, ast: -0.965, stl: 1.279, blk: 1.123, tpm: 0.078, fgImpact: -0.116, ftImpact: -0.247, to: 1.011 } },
          { name: "Nick Martinelli", min: 16, pts: 9, reb: 0, ast: 1, stl: 0, blk: 0, to: 0, tpm: 1, fgm: 2, fga: 6, ftm: 4, fta: 4, composite: -0.74, zScores: { pts: 0.188, reb: -1.118, ast: -0.444, stl: -0.731, blk: -0.452, tpm: 0.078, fgImpact: -0.566, ftImpact: 1.299, to: 1.011 } },
          { name: "Kris Dunn", min: 15, pts: 1, reb: 1, ast: 6, stl: 2, blk: 1, to: 1, tpm: 0, fgm: 0, fga: 1, ftm: 1, fta: 2, composite: 0.83, zScores: { pts: -1.17, reb: -0.761, ast: 2.162, stl: 1.279, blk: 1.123, tpm: -0.747, fgImpact: -0.366, ftImpact: -0.897, to: 0.207 } },
          { name: "Jalen Pickett", min: 10, pts: 3, reb: 0, ast: 1, stl: 0, blk: 0, to: 1, tpm: 1, fgm: 1, fga: 2, ftm: 0, fta: 0, composite: -3.21, zScores: { pts: -0.83, reb: -1.118, ast: -0.444, stl: -0.731, blk: -0.452, tpm: 0.078, fgImpact: 0.083, ftImpact: 0, to: 0.207 } },
          { name: "Blake Wesley", min: 16, pts: 6, reb: 1, ast: 2, stl: 0, blk: 0, to: 1, tpm: 0, fgm: 3, fga: 5, ftm: 0, fta: 2, composite: -4.55, zScores: { pts: -0.321, reb: -0.761, ast: 0.077, stl: -0.731, blk: -0.452, tpm: -0.747, fgImpact: 0.617, ftImpact: -2.443, to: 0.207 } },
          { name: "Gradey Dick", min: 13, pts: 4, reb: 1, ast: 0, stl: 0, blk: 0, to: 0, tpm: 0, fgm: 1, fga: 3, ftm: 2, fta: 2, composite: -2.94, zScores: { pts: -0.661, reb: -0.761, ast: -0.965, stl: -0.731, blk: -0.452, tpm: -0.747, fgImpact: -0.283, ftImpact: 0.649, to: 1.011 } },
          { name: "Yuki Kawamura", min: 14, pts: 10, reb: 0, ast: 4, stl: 2, blk: 0, to: 1, tpm: 1, fgm: 3, fga: 4, ftm: 3, fta: 3, composite: 3.43, zScores: { pts: 0.358, reb: -1.118, ast: 1.12, stl: 1.279, blk: -0.452, tpm: 0.078, fgImpact: 0.983, ftImpact: 0.974, to: 0.207 } },
          { name: "Keaton Wagler", min: 23, pts: 9, reb: 1, ast: 2, stl: 0, blk: 0, to: 1, tpm: 2, fgm: 3, fga: 9, ftm: 1, fta: 2, composite: -2.31, zScores: { pts: 0.188, reb: -0.761, ast: 0.077, stl: -0.731, blk: -0.452, tpm: 0.902, fgImpact: -0.849, ftImpact: -0.897, to: 0.207 } }
        ]
      },
      home: {
        abbr: "TOR", name: "Toronto Raptors", score: 114,
        players: [
          { name: "RJ Barrett", min: 23, pts: 20, reb: 5, ast: 5, stl: 1, blk: 0, to: 1, tpm: 3, fgm: 7, fga: 11, ftm: 3, fta: 5, composite: 6.33, zScores: { pts: 2.056, reb: 0.669, ast: 1.641, stl: 0.274, blk: -0.452, tpm: 1.726, fgImpact: 1.683, ftImpact: -1.469, to: 0.207 } },
          { name: "Scottie Barnes", min: 22, pts: 12, reb: 10, ast: 3, stl: 0, blk: 0, to: 2, tpm: 1, fgm: 4, fga: 10, ftm: 3, fta: 4, composite: 1.4, zScores: { pts: 0.698, reb: 2.455, ast: 0.599, stl: -0.731, blk: -0.452, tpm: 0.078, fgImpact: -0.399, ftImpact: -0.247, to: -0.597 } },
          { name: "Jakob Poeltl", min: 22, pts: 9, reb: 4, ast: 1, stl: 2, blk: 0, to: 1, tpm: 0, fgm: 3, fga: 4, ftm: 3, fta: 6, composite: -1.37, zScores: { pts: 0.188, reb: 0.311, ast: -0.444, stl: 1.279, blk: -0.452, tpm: -0.747, fgImpact: 0.983, ftImpact: -2.69, to: 0.207 } },
          { name: "Immanuel Quickley", min: 19, pts: 18, reb: 4, ast: 4, stl: 1, blk: 0, to: 0, tpm: 5, fgm: 6, fga: 8, ftm: 1, fta: 2, composite: 8.42, zScores: { pts: 1.716, reb: 0.311, ast: 1.12, stl: 0.274, blk: -0.452, tpm: 3.375, fgImpact: 1.966, ftImpact: -0.897, to: 1.011 } },
          { name: "Ja'Kobe Walter", min: 19, pts: 3, reb: 0, ast: 1, stl: 1, blk: 0, to: 1, tpm: 1, fgm: 1, fga: 4, ftm: 0, fta: 0, composite: -2.94, zScores: { pts: -0.83, reb: -1.118, ast: -0.444, stl: 0.274, blk: -0.452, tpm: 0.078, fgImpact: -0.649, ftImpact: 0, to: 0.207 } },
          { name: "Kyle Anderson", min: 16, pts: 0, reb: 2, ast: 1, stl: 1, blk: 0, to: 1, tpm: 0, fgm: 0, fga: 4, ftm: 0, fta: 2, composite: -6.81, zScores: { pts: -1.34, reb: -0.403, ast: -0.444, stl: 0.274, blk: -0.452, tpm: -0.747, fgImpact: -1.465, ftImpact: -2.443, to: 0.207 } },
          { name: "Tyson Degenhart", min: 12, pts: 2, reb: 1, ast: 0, stl: 0, blk: 0, to: 0, tpm: 0, fgm: 0, fga: 2, ftm: 2, fta: 2, composite: -3.73, zScores: { pts: -1, reb: -0.761, ast: -0.965, stl: -0.731, blk: -0.452, tpm: -0.747, fgImpact: -0.733, ftImpact: 0.649, to: 1.011 } },
          { name: "Collin Murray-Boyles", min: 22, pts: 13, reb: 9, ast: 3, stl: 0, blk: 2, to: 4, tpm: 0, fgm: 4, fga: 9, ftm: 5, fta: 7, composite: 1.73, zScores: { pts: 0.867, reb: 2.098, ast: 0.599, stl: -0.731, blk: 2.699, tpm: -0.747, fgImpact: -0.033, ftImpact: -0.819, to: -2.205 } },
          { name: "Trey Jemison III", min: 8, pts: 0, reb: 6, ast: 1, stl: 0, blk: 0, to: 1, tpm: 0, fgm: 0, fga: 2, ftm: 0, fta: 0, composite: -3.21, zScores: { pts: -1.34, reb: 1.026, ast: -0.444, stl: -0.731, blk: -0.452, tpm: -0.747, fgImpact: -0.733, ftImpact: 0, to: 0.207 } },
          { name: "Tyreke Key", min: 7, pts: 2, reb: 1, ast: 0, stl: 0, blk: 0, to: 0, tpm: 0, fgm: 1, fga: 1, ftm: 0, fta: 0, composite: -3.2, zScores: { pts: -1, reb: -0.761, ast: -0.965, stl: -0.731, blk: -0.452, tpm: -0.747, fgImpact: 0.45, ftImpact: 0, to: 1.011 } },
          { name: "Malachi Smith", min: 13, pts: 4, reb: 1, ast: 4, stl: 0, blk: 0, to: 0, tpm: 0, fgm: 2, fga: 5, ftm: 0, fta: 0, composite: -1.42, zScores: { pts: -0.661, reb: -0.761, ast: 1.12, stl: -0.731, blk: -0.452, tpm: -0.747, fgImpact: -0.199, ftImpact: 0, to: 1.011 } },
          { name: "Jamal Shead", min: 19, pts: 13, reb: 1, ast: 2, stl: 2, blk: 0, to: 4, tpm: 0, fgm: 5, fga: 9, ftm: 3, fta: 3, composite: -0.18, zScores: { pts: 0.867, reb: -0.761, ast: 0.077, stl: 1.279, blk: -0.452, tpm: -0.747, fgImpact: 0.783, ftImpact: 0.974, to: -2.205 } },
          { name: "Jaden Bradley", min: 21, pts: 8, reb: 3, ast: 0, stl: 0, blk: 1, to: 4, tpm: 0, fgm: 3, fga: 4, ftm: 2, fta: 2, composite: -1.92, zScores: { pts: 0.018, reb: -0.046, ast: -0.965, stl: -0.731, blk: 1.123, tpm: -0.747, fgImpact: 0.983, ftImpact: 0.649, to: -2.205 } },
          { name: "Nimari Burnett", min: 16, pts: 10, reb: 1, ast: 0, stl: 1, blk: 0, to: 1, tpm: 2, fgm: 4, fga: 6, ftm: 0, fta: 0, composite: 0.63, zScores: { pts: 0.358, reb: -0.761, ast: -0.965, stl: 0.274, blk: -0.452, tpm: 0.902, fgImpact: 1.066, ftImpact: 0, to: 0.207 } },
          { name: "Chucky Hepburn", min: 1, pts: 0, reb: 0, ast: 0, stl: 0, blk: 0, to: 0, tpm: 0, fgm: 0, fga: 0, ftm: 0, fta: 0, composite: -4.34, zScores: { pts: -1.34, reb: -1.118, ast: -0.965, stl: -0.731, blk: -0.452, tpm: -0.747, fgImpact: 0, ftImpact: 0, to: 1.011 } }
        ]
      }
    },
      {
      id: "401898396",
      line: "Atlanta Hawks 119 @ Indiana Pacers 117 (Final)",
      completed: true,
      statusText: "Final",
      away: {
        abbr: "ATL", name: "Atlanta Hawks", score: 119,
        players: [
          { name: "Onyeka Okongwu", min: 23, pts: 18, reb: 3, ast: 3, stl: 0, blk: 0, to: 1, tpm: 2, fgm: 5, fga: 10, ftm: 6, fta: 6, composite: 4.56, zScores: { pts: 1.716, reb: -0.046, ast: 0.599, stl: -0.731, blk: -0.452, tpm: 0.902, fgImpact: 0.417, ftImpact: 1.948, to: 0.207 } },
          { name: "Jalen Johnson", min: 25, pts: 20, reb: 7, ast: 3, stl: 0, blk: 0, to: 3, tpm: 2, fgm: 8, fga: 12, ftm: 2, fta: 3, composite: 3.92, zScores: { pts: 2.056, reb: 1.383, ast: 0.599, stl: -0.731, blk: -0.452, tpm: 0.902, fgImpact: 2.133, ftImpact: -0.572, to: -1.401 } },
          { name: "CJ McCollum", min: 19, pts: 12, reb: 5, ast: 0, stl: 0, blk: 0, to: 2, tpm: 1, fgm: 2, fga: 4, ftm: 7, fta: 7, composite: 1.14, zScores: { pts: 0.698, reb: 0.669, ast: -0.965, stl: -0.731, blk: -0.452, tpm: 0.078, fgImpact: 0.167, ftImpact: 2.273, to: -0.597 } },
          { name: "Luguentz Dort", min: 24, pts: 7, reb: 6, ast: 2, stl: 0, blk: 0, to: 0, tpm: 1, fgm: 2, fga: 7, ftm: 2, fta: 2, composite: 0.57, zScores: { pts: -0.151, reb: 1.026, ast: 0.077, stl: -0.731, blk: -0.452, tpm: 0.078, fgImpact: -0.932, ftImpact: 0.649, to: 1.011 } },
          { name: "Dyson Daniels", min: 24, pts: 7, reb: 4, ast: 4, stl: 2, blk: 0, to: 3, tpm: 1, fgm: 3, fga: 8, ftm: 0, fta: 0, composite: 0.3, zScores: { pts: -0.151, reb: 0.311, ast: 1.12, stl: 1.279, blk: -0.452, tpm: 0.078, fgImpact: -0.482, ftImpact: 0, to: -1.401 } },
          { name: "Corey Kispert", min: 18, pts: 5, reb: 3, ast: 3, stl: 0, blk: 0, to: 0, tpm: 1, fgm: 2, fga: 6, ftm: 0, fta: 0, composite: -0.6, zScores: { pts: -0.491, reb: -0.046, ast: 0.599, stl: -0.731, blk: -0.452, tpm: 0.078, fgImpact: -0.566, ftImpact: 0, to: 1.011 } },
          { name: "Jalen Wilson", min: 9, pts: 8, reb: 3, ast: 0, stl: 0, blk: 0, to: 0, tpm: 2, fgm: 2, fga: 3, ftm: 2, fta: 2, composite: 0.92, zScores: { pts: 0.018, reb: -0.046, ast: -0.965, stl: -0.731, blk: -0.452, tpm: 0.902, fgImpact: 0.533, ftImpact: 0.649, to: 1.011 } },
          { name: "Asa Newell", min: 16, pts: 8, reb: 3, ast: 2, stl: 0, blk: 2, to: 1, tpm: 0, fgm: 4, fga: 8, ftm: 0, fta: 0, composite: 1.81, zScores: { pts: 0.018, reb: -0.046, ast: 0.077, stl: -0.731, blk: 2.699, tpm: -0.747, fgImpact: 0.334, ftImpact: 0, to: 0.207 } },
          { name: "Zuby Ejiofor", min: 12, pts: 4, reb: 4, ast: 0, stl: 2, blk: 1, to: 1, tpm: 0, fgm: 1, fga: 4, ftm: 2, fta: 2, composite: 0.55, zScores: { pts: -0.661, reb: 0.311, ast: -0.965, stl: 1.279, blk: 1.123, tpm: -0.747, fgImpact: -0.649, ftImpact: 0.649, to: 0.207 } },
          { name: "Jock Landale", min: 9, pts: 2, reb: 3, ast: 1, stl: 1, blk: 0, to: 1, tpm: 0, fgm: 0, fga: 3, ftm: 2, fta: 2, composite: -2.66, zScores: { pts: -1, reb: -0.046, ast: -0.444, stl: 0.274, blk: -0.452, tpm: -0.747, fgImpact: -1.099, ftImpact: 0.649, to: 0.207 } },
          { name: "Aaron Wiggins", min: 20, pts: 13, reb: 2, ast: 1, stl: 2, blk: 0, to: 0, tpm: 3, fgm: 4, fga: 9, ftm: 2, fta: 2, composite: 4.2, zScores: { pts: 0.867, reb: -0.403, ast: -0.444, stl: 1.279, blk: -0.452, tpm: 1.726, fgImpact: -0.033, ftImpact: 0.649, to: 1.011 } },
          { name: "RayJ Dennis", min: 15, pts: 7, reb: 3, ast: 4, stl: 0, blk: 0, to: 0, tpm: 0, fgm: 2, fga: 5, ftm: 3, fta: 4, composite: -0.44, zScores: { pts: -0.151, reb: -0.046, ast: 1.12, stl: -0.731, blk: -0.452, tpm: -0.747, fgImpact: -0.199, ftImpact: -0.247, to: 1.011 } },
          { name: "Kobe Johnson", min: 9, pts: 0, reb: 2, ast: 0, stl: 0, blk: 0, to: 1, tpm: 0, fgm: 0, fga: 4, ftm: 0, fta: 0, composite: -5.9, zScores: { pts: -1.34, reb: -0.403, ast: -0.965, stl: -0.731, blk: -0.452, tpm: -0.747, fgImpact: -1.465, ftImpact: 0, to: 0.207 } },
          { name: "Kingston Flemings", min: 18, pts: 8, reb: 1, ast: 1, stl: 1, blk: 0, to: 1, tpm: 0, fgm: 4, fga: 7, ftm: 0, fta: 0, composite: -1.2, zScores: { pts: 0.018, reb: -0.761, ast: -0.444, stl: 0.274, blk: -0.452, tpm: -0.747, fgImpact: 0.7, ftImpact: 0, to: 0.207 } }
        ]
      },
      home: {
        abbr: "IND", name: "Indiana Pacers", score: 117,
        players: [
          { name: "Pascal Siakam", min: 22, pts: 13, reb: 2, ast: 4, stl: 0, blk: 2, to: 0, tpm: 1, fgm: 3, fga: 7, ftm: 6, fta: 6, composite: 6.47, zScores: { pts: 0.867, reb: -0.403, ast: 1.12, stl: -0.731, blk: 2.699, tpm: 0.078, fgImpact: -0.116, ftImpact: 1.948, to: 1.011 } },
          { name: "Ivica Zubac", min: 21, pts: 11, reb: 5, ast: 2, stl: 1, blk: 1, to: 1, tpm: 0, fgm: 4, fga: 6, ftm: 3, fta: 6, composite: 0.51, zScores: { pts: 0.528, reb: 0.669, ast: 0.077, stl: 0.274, blk: 1.123, tpm: -0.747, fgImpact: 1.066, ftImpact: -2.69, to: 0.207 } },
          { name: "Kelly Oubre Jr.", min: 20, pts: 13, reb: 1, ast: 0, stl: 0, blk: 0, to: 2, tpm: 3, fgm: 5, fga: 8, ftm: 0, fta: 0, composite: 0.24, zScores: { pts: 0.867, reb: -0.761, ast: -0.965, stl: -0.731, blk: -0.452, tpm: 1.726, fgImpact: 1.15, ftImpact: 0, to: -0.597 } },
          { name: "Andrew Nembhard", min: 22, pts: 10, reb: 1, ast: 3, stl: 0, blk: 0, to: 2, tpm: 2, fgm: 3, fga: 5, ftm: 2, fta: 2, composite: 0.58, zScores: { pts: 0.358, reb: -0.761, ast: 0.599, stl: -0.731, blk: -0.452, tpm: 0.902, fgImpact: 0.617, ftImpact: 0.649, to: -0.597 } },
          { name: "Aaron Nesmith", min: 20, pts: 7, reb: 1, ast: 5, stl: 1, blk: 0, to: 1, tpm: 1, fgm: 2, fga: 6, ftm: 2, fta: 2, composite: 0.92, zScores: { pts: -0.151, reb: -0.761, ast: 1.641, stl: 0.274, blk: -0.452, tpm: 0.078, fgImpact: -0.566, ftImpact: 0.649, to: 0.207 } },
          { name: "James Johnson", min: 5, pts: 0, reb: 1, ast: 1, stl: 0, blk: 0, to: 0, tpm: 0, fgm: 0, fga: 1, ftm: 0, fta: 0, composite: -3.83, zScores: { pts: -1.34, reb: -0.761, ast: -0.444, stl: -0.731, blk: -0.452, tpm: -0.747, fgImpact: -0.366, ftImpact: 0, to: 1.011 } },
          { name: "Larry Nance Jr.", min: 12, pts: 6, reb: 5, ast: 3, stl: 0, blk: 0, to: 0, tpm: 1, fgm: 2, fga: 4, ftm: 1, fta: 2, composite: 0.12, zScores: { pts: -0.321, reb: 0.669, ast: 0.599, stl: -0.731, blk: -0.452, tpm: 0.078, fgImpact: 0.167, ftImpact: -0.897, to: 1.011 } },
          { name: "Obi Toppin", min: 15, pts: 11, reb: 3, ast: 1, stl: 1, blk: 0, to: 2, tpm: 1, fgm: 5, fga: 8, ftm: 0, fta: 0, composite: 0.49, zScores: { pts: 0.528, reb: -0.046, ast: -0.444, stl: 0.274, blk: -0.452, tpm: 0.078, fgImpact: 1.15, ftImpact: 0, to: -0.597 } },
          { name: "Jalen Slawson", min: 13, pts: 12, reb: 2, ast: 0, stl: 0, blk: 0, to: 1, tpm: 1, fgm: 4, fga: 5, ftm: 3, fta: 6, composite: -2.83, zScores: { pts: 0.698, reb: -0.403, ast: -0.965, stl: -0.731, blk: -0.452, tpm: 0.078, fgImpact: 1.433, ftImpact: -2.69, to: 0.207 } },
          { name: "Jarace Walker", min: 20, pts: 10, reb: 7, ast: 3, stl: 0, blk: 0, to: 2, tpm: 2, fgm: 3, fga: 7, ftm: 2, fta: 2, composite: 1.99, zScores: { pts: 0.358, reb: 1.383, ast: 0.599, stl: -0.731, blk: -0.452, tpm: 0.902, fgImpact: -0.116, ftImpact: 0.649, to: -0.597 } },
          { name: "Jay Huff", min: 10, pts: 5, reb: 0, ast: 1, stl: 0, blk: 0, to: 0, tpm: 1, fgm: 2, fga: 6, ftm: 0, fta: 0, composite: -2.71, zScores: { pts: -0.491, reb: -1.118, ast: -0.444, stl: -0.731, blk: -0.452, tpm: 0.078, fgImpact: -0.566, ftImpact: 0, to: 1.011 } },
          { name: "Kobe Brown", min: 12, pts: 6, reb: 4, ast: 0, stl: 0, blk: 1, to: 0, tpm: 1, fgm: 1, fga: 2, ftm: 3, fta: 4, composite: 0.34, zScores: { pts: -0.321, reb: 0.311, ast: -0.965, stl: -0.731, blk: 1.123, tpm: 0.078, fgImpact: 0.083, ftImpact: -0.247, to: 1.011 } },
          { name: "Ben Sheppard", min: 16, pts: 2, reb: 1, ast: 1, stl: 1, blk: 0, to: 2, tpm: 0, fgm: 1, fga: 3, ftm: 0, fta: 0, composite: -4.01, zScores: { pts: -1, reb: -0.761, ast: -0.444, stl: 0.274, blk: -0.452, tpm: -0.747, fgImpact: -0.283, ftImpact: 0, to: -0.597 } },
          { name: "Quenton Jackson", min: 12, pts: 6, reb: 0, ast: 2, stl: 1, blk: 0, to: 2, tpm: 0, fgm: 2, fga: 4, ftm: 2, fta: 2, composite: -2.07, zScores: { pts: -0.321, reb: -1.118, ast: 0.077, stl: 0.274, blk: -0.452, tpm: -0.747, fgImpact: 0.167, ftImpact: 0.649, to: -0.597 } },
          { name: "Braden Smith", min: 14, pts: 2, reb: 2, ast: 5, stl: 2, blk: 0, to: 2, tpm: 0, fgm: 1, fga: 3, ftm: 0, fta: 0, composite: -0.56, zScores: { pts: -1, reb: -0.403, ast: 1.641, stl: 1.279, blk: -0.452, tpm: -0.747, fgImpact: -0.283, ftImpact: 0, to: -0.597 } },
          { name: "Rienk Mast", min: 3, pts: 3, reb: 0, ast: 0, stl: 0, blk: 0, to: 0, tpm: 1, fgm: 1, fga: 1, ftm: 0, fta: 0, composite: -2.56, zScores: { pts: -0.83, reb: -1.118, ast: -0.965, stl: -0.731, blk: -0.452, tpm: 0.078, fgImpact: 0.45, ftImpact: 0, to: 1.011 } },
          { name: "Keba Keita", min: 2, pts: 0, reb: 0, ast: 0, stl: 0, blk: 1, to: 0, tpm: 0, fgm: 0, fga: 0, ftm: 0, fta: 0, composite: -2.77, zScores: { pts: -1.34, reb: -1.118, ast: -0.965, stl: -0.731, blk: 1.123, tpm: -0.747, fgImpact: 0, ftImpact: 0, to: 1.011 } }
        ]
      }
    },
      {
      id: "401906510",
      line: "Detroit Pistons 108 @ Washington Wizards 114 (Final/OT)",
      completed: true,
      statusText: "Final/OT",
      away: {
        abbr: "DET", name: "Detroit Pistons", score: 108,
        players: [
          { name: "Duncan Robinson", min: 19, pts: 12, reb: 2, ast: 4, stl: 0, blk: 0, to: 1, tpm: 2, fgm: 4, fga: 9, ftm: 2, fta: 3, composite: 0.73, zScores: { pts: 0.698, reb: -0.403, ast: 1.12, stl: -0.731, blk: -0.452, tpm: 0.902, fgImpact: -0.033, ftImpact: -0.572, to: 0.207 } },
          { name: "John Collins", min: 17, pts: 2, reb: 2, ast: 0, stl: 0, blk: 0, to: 2, tpm: 0, fgm: 1, fga: 5, ftm: 0, fta: 0, composite: -5.91, zScores: { pts: -1, reb: -0.403, ast: -0.965, stl: -0.731, blk: -0.452, tpm: -0.747, fgImpact: -1.015, ftImpact: 0, to: -0.597 } },
          { name: "Paul Reed", min: 21, pts: 11, reb: 9, ast: 3, stl: 2, blk: 0, to: 2, tpm: 0, fgm: 4, fga: 8, ftm: 3, fta: 4, composite: 2.79, zScores: { pts: 0.528, reb: 2.098, ast: 0.599, stl: 1.279, blk: -0.452, tpm: -0.747, fgImpact: 0.334, ftImpact: -0.247, to: -0.597 } },
          { name: "Ausar Thompson", min: 15, pts: 2, reb: 1, ast: 2, stl: 3, blk: 1, to: 1, tpm: 0, fgm: 1, fga: 7, ftm: 0, fta: 0, composite: -0.56, zScores: { pts: -1, reb: -0.761, ast: 0.077, stl: 2.283, blk: 1.123, tpm: -0.747, fgImpact: -1.748, ftImpact: 0, to: 0.207 } },
          { name: "Daniss Jenkins", min: 18, pts: 12, reb: 0, ast: 4, stl: 0, blk: 0, to: 1, tpm: 3, fgm: 4, fga: 6, ftm: 1, fta: 2, composite: 1.62, zScores: { pts: 0.698, reb: -1.118, ast: 1.12, stl: -0.731, blk: -0.452, tpm: 1.726, fgImpact: 1.066, ftImpact: -0.897, to: 0.207 } },
          { name: "Taurean Prince", min: 8, pts: 0, reb: 1, ast: 0, stl: 0, blk: 0, to: 1, tpm: 0, fgm: 0, fga: 3, ftm: 0, fta: 0, composite: -5.89, zScores: { pts: -1.34, reb: -0.761, ast: -0.965, stl: -0.731, blk: -0.452, tpm: -0.747, fgImpact: -1.099, ftImpact: 0, to: 0.207 } },
          { name: "Tolu Smith", min: 16, pts: 6, reb: 13, ast: 2, stl: 1, blk: 0, to: 0, tpm: 0, fgm: 2, fga: 5, ftm: 2, fta: 2, composite: 3.82, zScores: { pts: -0.321, reb: 3.527, ast: 0.077, stl: 0.274, blk: -0.452, tpm: -0.747, fgImpact: -0.199, ftImpact: 0.649, to: 1.011 } },
          { name: "Brice Williams", min: 11, pts: 0, reb: 2, ast: 1, stl: 2, blk: 0, to: 2, tpm: 0, fgm: 0, fga: 1, ftm: 0, fta: 0, composite: -3.07, zScores: { pts: -1.34, reb: -0.403, ast: -0.444, stl: 1.279, blk: -0.452, tpm: -0.747, fgImpact: -0.366, ftImpact: 0, to: -0.597 } },
          { name: "Ronald Holland II", min: 13, pts: 8, reb: 3, ast: 0, stl: 0, blk: 0, to: 1, tpm: 0, fgm: 3, fga: 7, ftm: 2, fta: 4, composite: -4.63, zScores: { pts: 0.018, reb: -0.046, ast: -0.965, stl: -0.731, blk: -0.452, tpm: -0.747, fgImpact: -0.116, ftImpact: -1.793, to: 0.207 } },
          { name: "Isaac Jones", min: 15, pts: 8, reb: 2, ast: 0, stl: 1, blk: 0, to: 0, tpm: 0, fgm: 4, fga: 6, ftm: 0, fta: 1, composite: -1.42, zScores: { pts: 0.018, reb: -0.403, ast: -0.965, stl: 0.274, blk: -0.452, tpm: -0.747, fgImpact: 1.066, ftImpact: -1.221, to: 1.011 } },
          { name: "Javonte Green", min: 14, pts: 7, reb: 6, ast: 1, stl: 2, blk: 0, to: 0, tpm: 1, fgm: 2, fga: 4, ftm: 2, fta: 2, composite: 3.16, zScores: { pts: -0.151, reb: 1.026, ast: -0.444, stl: 1.279, blk: -0.452, tpm: 0.078, fgImpact: 0.167, ftImpact: 0.649, to: 1.011 } },
          { name: "Kevin Huerter", min: 18, pts: 11, reb: 2, ast: 3, stl: 1, blk: 0, to: 0, tpm: 3, fgm: 3, fga: 7, ftm: 2, fta: 2, composite: 3.81, zScores: { pts: 0.528, reb: -0.403, ast: 0.599, stl: 0.274, blk: -0.452, tpm: 1.726, fgImpact: -0.116, ftImpact: 0.649, to: 1.011 } },
          { name: "Isaiah Joe", min: 17, pts: 5, reb: 2, ast: 1, stl: 0, blk: 1, to: 3, tpm: 0, fgm: 2, fga: 11, ftm: 1, fta: 1, composite: -5.17, zScores: { pts: -0.491, reb: -0.403, ast: -0.444, stl: -0.731, blk: 1.123, tpm: -0.747, fgImpact: -2.397, ftImpact: 0.325, to: -1.401 } },
          { name: "Elijah Harkless", min: 13, pts: 1, reb: 4, ast: 3, stl: 3, blk: 0, to: 1, tpm: 0, fgm: 0, fga: 3, ftm: 1, fta: 2, composite: -0.96, zScores: { pts: -1.17, reb: 0.311, ast: 0.599, stl: 2.283, blk: -0.452, tpm: -0.747, fgImpact: -1.099, ftImpact: -0.897, to: 0.207 } },
          { name: "Chaz Lanier", min: 17, pts: 9, reb: 0, ast: 0, stl: 0, blk: 0, to: 2, tpm: 3, fgm: 3, fga: 8, ftm: 0, fta: 0, composite: -2.43, zScores: { pts: 0.188, reb: -1.118, ast: -0.965, stl: -0.731, blk: -0.452, tpm: 1.726, fgImpact: -0.482, ftImpact: 0, to: -0.597 } },
          { name: "Ebuka Okorie", min: 27, pts: 14, reb: 1, ast: 6, stl: 1, blk: 0, to: 3, tpm: 0, fgm: 6, fga: 15, ftm: 2, fta: 2, composite: 0.16, zScores: { pts: 1.037, reb: -0.761, ast: 2.162, stl: 0.274, blk: -0.452, tpm: -0.747, fgImpact: -0.598, ftImpact: 0.649, to: -1.401 } },
          { name: "John Ukomadu", min: 6, pts: 0, reb: 0, ast: 0, stl: 0, blk: 0, to: 0, tpm: 0, fgm: 0, fga: 1, ftm: 0, fta: 0, composite: -4.71, zScores: { pts: -1.34, reb: -1.118, ast: -0.965, stl: -0.731, blk: -0.452, tpm: -0.747, fgImpact: -0.366, ftImpact: 0, to: 1.011 } }
        ]
      },
      home: {
        abbr: "WSH", name: "Washington Wizards", score: 114,
        players: [
          { name: "Anthony Davis", min: 22, pts: 10, reb: 11, ast: 4, stl: 1, blk: 2, to: 5, tpm: 0, fgm: 3, fga: 8, ftm: 4, fta: 6, composite: 1.88, zScores: { pts: 0.358, reb: 2.812, ast: 1.12, stl: 0.274, blk: 2.699, tpm: -0.747, fgImpact: -0.482, ftImpact: -1.144, to: -3.008 } },
          { name: "AJ Dybantsa", min: 23, pts: 14, reb: 7, ast: 2, stl: 1, blk: 0, to: 0, tpm: 0, fgm: 4, fga: 10, ftm: 6, fta: 10, composite: -0.75, zScores: { pts: 1.037, reb: 1.383, ast: 0.077, stl: 0.274, blk: -0.452, tpm: -0.747, fgImpact: -0.399, ftImpact: -2.937, to: 1.011 } },
          { name: "Kyshawn George", min: 23, pts: 14, reb: 3, ast: 0, stl: 1, blk: 3, to: 3, tpm: 0, fgm: 3, fga: 4, ftm: 8, fta: 8, composite: 6.01, zScores: { pts: 1.037, reb: -0.046, ast: -0.965, stl: 0.274, blk: 4.275, tpm: -0.747, fgImpact: 0.983, ftImpact: 2.598, to: -1.401 } },
          { name: "Alex Sarr", min: 20, pts: 8, reb: 1, ast: 0, stl: 0, blk: 1, to: 2, tpm: 1, fgm: 3, fga: 5, ftm: 1, fta: 2, composite: -2.11, zScores: { pts: 0.018, reb: -0.761, ast: -0.965, stl: -0.731, blk: 1.123, tpm: 0.078, fgImpact: 0.617, ftImpact: -0.897, to: -0.597 } },
          { name: "Trae Young", min: 23, pts: 2, reb: 2, ast: 8, stl: 0, blk: 0, to: 5, tpm: 0, fgm: 1, fga: 4, ftm: 0, fta: 0, composite: -3.79, zScores: { pts: -1, reb: -0.403, ast: 3.205, stl: -0.731, blk: -0.452, tpm: -0.747, fgImpact: -0.649, ftImpact: 0, to: -3.008 } },
          { name: "Justin Champagnie", min: 17, pts: 12, reb: 3, ast: 1, stl: 3, blk: 0, to: 3, tpm: 2, fgm: 4, fga: 8, ftm: 2, fta: 4, composite: 0.08, zScores: { pts: 0.698, reb: -0.046, ast: -0.444, stl: 2.283, blk: -0.452, tpm: 0.902, fgImpact: 0.334, ftImpact: -1.793, to: -1.401 } },
          { name: "Chris Livingston", min: 11, pts: 4, reb: 1, ast: 0, stl: 0, blk: 0, to: 0, tpm: 0, fgm: 2, fga: 3, ftm: 0, fta: 0, composite: -2.77, zScores: { pts: -0.661, reb: -0.761, ast: -0.965, stl: -0.731, blk: -0.452, tpm: -0.747, fgImpact: 0.533, ftImpact: 0, to: 1.011 } },
          { name: "Felix Okpara", min: 17, pts: 8, reb: 5, ast: 1, stl: 2, blk: 2, to: 1, tpm: 1, fgm: 3, fga: 3, ftm: 1, fta: 2, composite: 4.96, zScores: { pts: 0.018, reb: 0.669, ast: -0.444, stl: 1.279, blk: 2.699, tpm: 0.078, fgImpact: 1.349, ftImpact: -0.897, to: 0.207 } },
          { name: "Deandre Ayton", min: 15, pts: 4, reb: 6, ast: 1, stl: 0, blk: 0, to: 2, tpm: 0, fgm: 0, fga: 1, ftm: 4, fta: 6, composite: -4.12, zScores: { pts: -0.661, reb: 1.026, ast: -0.444, stl: -0.731, blk: -0.452, tpm: -0.747, fgImpact: -0.366, ftImpact: -1.144, to: -0.597 } },
          { name: "Reece Beekman", min: 11, pts: 0, reb: 0, ast: 2, stl: 0, blk: 0, to: 1, tpm: 0, fgm: 0, fga: 1, ftm: 0, fta: 0, composite: -4.47, zScores: { pts: -1.34, reb: -1.118, ast: 0.077, stl: -0.731, blk: -0.452, tpm: -0.747, fgImpact: -0.366, ftImpact: 0, to: 0.207 } },
          { name: "Bub Carrington", min: 18, pts: 5, reb: 0, ast: 1, stl: 0, blk: 1, to: 2, tpm: 1, fgm: 2, fga: 8, ftm: 0, fta: 0, composite: -3.48, zScores: { pts: -0.491, reb: -1.118, ast: -0.444, stl: -0.731, blk: 1.123, tpm: 0.078, fgImpact: -1.298, ftImpact: 0, to: -0.597 } },
          { name: "Bilal Coulibaly", min: 20, pts: 3, reb: 4, ast: 1, stl: 1, blk: 0, to: 2, tpm: 0, fgm: 0, fga: 0, ftm: 3, fta: 4, composite: -2.73, zScores: { pts: -0.83, reb: 0.311, ast: -0.444, stl: 0.274, blk: -0.452, tpm: -0.747, fgImpact: 0, ftImpact: -0.247, to: -0.597 } },
          { name: "Will Riley", min: 24, pts: 15, reb: 4, ast: 3, stl: 1, blk: 1, to: 1, tpm: 1, fgm: 3, fga: 7, ftm: 8, fta: 8, composite: 6.28, zScores: { pts: 1.207, reb: 0.311, ast: 0.599, stl: 0.274, blk: 1.123, tpm: 0.078, fgImpact: -0.116, ftImpact: 2.598, to: 0.207 } },
          { name: "Tre Johnson", min: 19, pts: 15, reb: 2, ast: 1, stl: 0, blk: 0, to: 0, tpm: 4, fgm: 5, fga: 9, ftm: 1, fta: 1, composite: 3.85, zScores: { pts: 1.207, reb: -0.403, ast: -0.444, stl: -0.731, blk: -0.452, tpm: 2.551, fgImpact: 0.783, ftImpact: 0.325, to: 1.011 } }
        ]
      }
    },
      {
      id: "401898397",
      line: "Minnesota Timberwolves 125 @ Miami Heat 124 (Final)",
      completed: true,
      statusText: "Final",
      away: {
        abbr: "MIN", name: "Minnesota Timberwolves", score: 125,
        players: [
          { name: "Trey Lyles", min: 22, pts: 4, reb: 8, ast: 3, stl: 1, blk: 1, to: 0, tpm: 1, fgm: 1, fga: 8, ftm: 1, fta: 2, composite: 1.15, zScores: { pts: -0.661, reb: 1.74, ast: 0.599, stl: 0.274, blk: 1.123, tpm: 0.078, fgImpact: -2.114, ftImpact: -0.897, to: 1.011 } },
          { name: "Joan Beringer", min: 24, pts: 10, reb: 7, ast: 1, stl: 1, blk: 4, to: 1, tpm: 0, fgm: 5, fga: 6, ftm: 0, fta: 0, composite: 8.76, zScores: { pts: 0.358, reb: 1.383, ast: -0.444, stl: 0.274, blk: 5.851, tpm: -0.747, fgImpact: 1.882, ftImpact: 0, to: 0.207 } },
          { name: "Jaylen Clark", min: 19, pts: 6, reb: 2, ast: 5, stl: 2, blk: 0, to: 0, tpm: 0, fgm: 2, fga: 6, ftm: 2, fta: 2, composite: 2.09, zScores: { pts: -0.321, reb: -0.403, ast: 1.641, stl: 1.279, blk: -0.452, tpm: -0.747, fgImpact: -0.566, ftImpact: 0.649, to: 1.011 } },
          { name: "Terrence Shannon Jr.", min: 22, pts: 19, reb: 6, ast: 4, stl: 0, blk: 0, to: 1, tpm: 3, fgm: 8, fga: 16, ftm: 0, fta: 0, composite: 5.45, zScores: { pts: 1.886, reb: 1.026, ast: 1.12, stl: -0.731, blk: -0.452, tpm: 1.726, fgImpact: 0.667, ftImpact: 0, to: 0.207 } },
          { name: "Bones Hyland", min: 21, pts: 23, reb: 4, ast: 4, stl: 3, blk: 0, to: 0, tpm: 5, fgm: 6, fga: 9, ftm: 6, fta: 6, composite: 13.76, zScores: { pts: 2.565, reb: 0.311, ast: 1.12, stl: 2.283, blk: -0.452, tpm: 3.375, fgImpact: 1.599, ftImpact: 1.948, to: 1.011 } },
          { name: "Drew Timme", min: 4, pts: 0, reb: 0, ast: 0, stl: 0, blk: 0, to: 0, tpm: 0, fgm: 0, fga: 1, ftm: 0, fta: 0, composite: -4.71, zScores: { pts: -1.34, reb: -1.118, ast: -0.965, stl: -0.731, blk: -0.452, tpm: -0.747, fgImpact: -0.366, ftImpact: 0, to: 1.011 } },
          { name: "KJ Martin", min: 17, pts: 12, reb: 1, ast: 0, stl: 0, blk: 0, to: 0, tpm: 0, fgm: 4, fga: 7, ftm: 4, fta: 7, composite: -3.61, zScores: { pts: 0.698, reb: -0.761, ast: -0.965, stl: -0.731, blk: -0.452, tpm: -0.747, fgImpact: 0.7, ftImpact: -2.365, to: 1.011 } },
          { name: "Enrique Freeman", min: 3, pts: 0, reb: 1, ast: 0, stl: 0, blk: 0, to: 1, tpm: 0, fgm: 0, fga: 1, ftm: 0, fta: 0, composite: -5.16, zScores: { pts: -1.34, reb: -0.761, ast: -0.965, stl: -0.731, blk: -0.452, tpm: -0.747, fgImpact: -0.366, ftImpact: 0, to: 0.207 } },
          { name: "Norchad Omier", min: 10, pts: 7, reb: 4, ast: 3, stl: 0, blk: 0, to: 0, tpm: 1, fgm: 1, fga: 3, ftm: 4, fta: 4, composite: 1.68, zScores: { pts: -0.151, reb: 0.311, ast: 0.599, stl: -0.731, blk: -0.452, tpm: 0.078, fgImpact: -0.283, ftImpact: 1.299, to: 1.011 } },
          { name: "Cody Williams", min: 20, pts: 4, reb: 1, ast: 1, stl: 1, blk: 0, to: 2, tpm: 0, fgm: 1, fga: 7, ftm: 2, fta: 2, composite: -4.49, zScores: { pts: -0.661, reb: -0.761, ast: -0.444, stl: 0.274, blk: -0.452, tpm: -0.747, fgImpact: -1.748, ftImpact: 0.649, to: -0.597 } },
          { name: "Isaiah Evans", min: 22, pts: 9, reb: 3, ast: 1, stl: 0, blk: 1, to: 1, tpm: 3, fgm: 3, fga: 7, ftm: 0, fta: 0, composite: 1.91, zScores: { pts: 0.188, reb: -0.046, ast: -0.444, stl: -0.731, blk: 1.123, tpm: 1.726, fgImpact: -0.116, ftImpact: 0, to: 0.207 } },
          { name: "Rocco Zikarsky", min: 17, pts: 4, reb: 3, ast: 2, stl: 0, blk: 0, to: 2, tpm: 0, fgm: 1, fga: 3, ftm: 2, fta: 2, composite: -2.79, zScores: { pts: -0.661, reb: -0.046, ast: 0.077, stl: -0.731, blk: -0.452, tpm: -0.747, fgImpact: -0.283, ftImpact: 0.649, to: -0.597 } },
          { name: "Antonio Reeves", min: 12, pts: 5, reb: 2, ast: 1, stl: 1, blk: 1, to: 1, tpm: 1, fgm: 2, fga: 4, ftm: 0, fta: 0, composite: 0.51, zScores: { pts: -0.491, reb: -0.403, ast: -0.444, stl: 0.274, blk: 1.123, tpm: 0.078, fgImpact: 0.167, ftImpact: 0, to: 0.207 } },
          { name: "Zyon Pullin", min: 28, pts: 22, reb: 4, ast: 1, stl: 1, blk: 0, to: 4, tpm: 0, fgm: 7, fga: 9, ftm: 8, fta: 8, composite: 4.15, zScores: { pts: 2.395, reb: 0.311, ast: -0.444, stl: 0.274, blk: -0.452, tpm: -0.747, fgImpact: 2.415, ftImpact: 2.598, to: -2.205 } }
        ]
      },
      home: {
        abbr: "MIA", name: "Miami Heat", score: 124,
        players: [
          { name: "Simone Fontecchio", min: 24, pts: 14, reb: 1, ast: 0, stl: 0, blk: 0, to: 0, tpm: 4, fgm: 4, fga: 12, ftm: 2, fta: 2, composite: 1.21, zScores: { pts: 1.037, reb: -0.761, ast: -0.965, stl: -0.731, blk: -0.452, tpm: 2.551, fgImpact: -1.131, ftImpact: 0.649, to: 1.011 } },
          { name: "Nikola Jovic", min: 25, pts: 16, reb: 6, ast: 3, stl: 3, blk: 0, to: 3, tpm: 2, fgm: 7, fga: 11, ftm: 0, fta: 1, composite: 4.79, zScores: { pts: 1.377, reb: 1.026, ast: 0.599, stl: 2.283, blk: -0.452, tpm: 0.902, fgImpact: 1.683, ftImpact: -1.221, to: -1.401 } },
          { name: "Nick Richards", min: 25, pts: 7, reb: 10, ast: 0, stl: 1, blk: 1, to: 1, tpm: 0, fgm: 2, fga: 2, ftm: 3, fta: 4, composite: 2.85, zScores: { pts: -0.151, reb: 2.455, ast: -0.965, stl: 0.274, blk: 1.123, tpm: -0.747, fgImpact: 0.899, ftImpact: -0.247, to: 0.207 } },
          { name: "Pelle Larsson", min: 25, pts: 14, reb: 3, ast: 5, stl: 0, blk: 0, to: 4, tpm: 0, fgm: 4, fga: 15, ftm: 6, fta: 7, composite: -3.01, zScores: { pts: 1.037, reb: -0.046, ast: 1.641, stl: -0.731, blk: -0.452, tpm: -0.747, fgImpact: -2.23, ftImpact: 0.727, to: -2.205 } },
          { name: "Tre Donaldson", min: 15, pts: 2, reb: 0, ast: 2, stl: 1, blk: 0, to: 2, tpm: 0, fgm: 1, fga: 4, ftm: 0, fta: 0, composite: -4.21, zScores: { pts: -1, reb: -1.118, ast: 0.077, stl: 0.274, blk: -0.452, tpm: -0.747, fgImpact: -0.649, ftImpact: 0, to: -0.597 } },
          { name: "Myron Gardner", min: 27, pts: 12, reb: 7, ast: 5, stl: 2, blk: 0, to: 2, tpm: 3, fgm: 4, fga: 11, ftm: 1, fta: 1, composite: 5.24, zScores: { pts: 0.698, reb: 1.383, ast: 1.641, stl: 1.279, blk: -0.452, tpm: 1.726, fgImpact: -0.765, ftImpact: 0.325, to: -0.597 } },
          { name: "Ian Schieffelin", min: 23, pts: 10, reb: 7, ast: 0, stl: 0, blk: 0, to: 0, tpm: 2, fgm: 4, fga: 5, ftm: 0, fta: 0, composite: 2.94, zScores: { pts: 0.358, reb: 1.383, ast: -0.965, stl: -0.731, blk: -0.452, tpm: 0.902, fgImpact: 1.433, ftImpact: 0, to: 1.011 } },
          { name: "Vladislav Goldin", min: 23, pts: 18, reb: 6, ast: 2, stl: 0, blk: 1, to: 0, tpm: 1, fgm: 7, fga: 10, ftm: 3, fta: 3, composite: 7.32, zScores: { pts: 1.716, reb: 1.026, ast: 0.077, stl: -0.731, blk: 1.123, tpm: 0.078, fgImpact: 2.049, ftImpact: 0.974, to: 1.011 } },
          { name: "Bez Mbeng", min: 21, pts: 9, reb: 0, ast: 1, stl: 0, blk: 0, to: 2, tpm: 2, fgm: 3, fga: 6, ftm: 1, fta: 2, composite: -2.9, zScores: { pts: 0.188, reb: -1.118, ast: -0.444, stl: -0.731, blk: -0.452, tpm: 0.902, fgImpact: 0.25, ftImpact: -0.897, to: -0.597 } },
          { name: "Ryan Conwell", min: 32, pts: 22, reb: 5, ast: 9, stl: 2, blk: 0, to: 0, tpm: 2, fgm: 7, fga: 18, ftm: 6, fta: 7, composite: 9.37, zScores: { pts: 2.395, reb: 0.669, ast: 3.726, stl: 1.279, blk: -0.452, tpm: 0.902, fgImpact: -0.881, ftImpact: 0.727, to: 1.011 } }
        ]
      }
    },
      {
      id: "401898398",
      line: "Philadelphia 76ers 106 @ Boston Celtics 144 (Final)",
      completed: true,
      statusText: "Final",
      away: {
        abbr: "PHI", name: "Philadelphia 76ers", score: 106,
        players: [
          { name: "Dean Wade", min: 20, pts: 5, reb: 3, ast: 1, stl: 0, blk: 0, to: 1, tpm: 1, fgm: 2, fga: 4, ftm: 0, fta: 0, composite: -1.71, zScores: { pts: -0.491, reb: -0.046, ast: -0.444, stl: -0.731, blk: -0.452, tpm: 0.078, fgImpact: 0.167, ftImpact: 0, to: 0.207 } },
          { name: "Jabari Walker", min: 27, pts: 14, reb: 6, ast: 2, stl: 0, blk: 0, to: 1, tpm: 2, fgm: 6, fga: 11, ftm: 0, fta: 1, composite: 1.71, zScores: { pts: 1.037, reb: 1.026, ast: 0.077, stl: -0.731, blk: -0.452, tpm: 0.902, fgImpact: 0.867, ftImpact: -1.221, to: 0.207 } },
          { name: "Justin Edwards", min: 31, pts: 12, reb: 5, ast: 2, stl: 2, blk: 0, to: 4, tpm: 3, fgm: 3, fga: 7, ftm: 3, fta: 3, composite: 2.65, zScores: { pts: 0.698, reb: 0.669, ast: 0.077, stl: 1.279, blk: -0.452, tpm: 1.726, fgImpact: -0.116, ftImpact: 0.974, to: -2.205 } },
          { name: "Tyrese Maxey", min: 18, pts: 8, reb: 3, ast: 4, stl: 1, blk: 1, to: 2, tpm: 1, fgm: 2, fga: 10, ftm: 3, fta: 3, composite: 0.91, zScores: { pts: 0.018, reb: -0.046, ast: 1.12, stl: 0.274, blk: 1.123, tpm: 0.078, fgImpact: -2.031, ftImpact: 0.974, to: -0.597 } },
          { name: "VJ Edgecombe", min: 26, pts: 19, reb: 3, ast: 4, stl: 4, blk: 0, to: 3, tpm: 2, fgm: 6, fga: 11, ftm: 5, fta: 6, composite: 6.57, zScores: { pts: 1.886, reb: -0.046, ast: 1.12, stl: 3.288, blk: -0.452, tpm: 0.902, fgImpact: 0.867, ftImpact: 0.402, to: -1.401 } },
          { name: "Dillon Jones", min: 16, pts: 2, reb: 1, ast: 0, stl: 1, blk: 1, to: 1, tpm: 0, fgm: 1, fga: 4, ftm: 0, fta: 0, composite: -2.52, zScores: { pts: -1, reb: -0.761, ast: -0.965, stl: 0.274, blk: 1.123, tpm: -0.747, fgImpact: -0.649, ftImpact: 0, to: 0.207 } },
          { name: "Saint Thomas", min: 15, pts: 6, reb: 2, ast: 2, stl: 1, blk: 0, to: 3, tpm: 1, fgm: 2, fga: 4, ftm: 1, fta: 2, composite: -2.88, zScores: { pts: -0.321, reb: -0.403, ast: 0.077, stl: 0.274, blk: -0.452, tpm: 0.078, fgImpact: 0.167, ftImpact: -0.897, to: -1.401 } },
          { name: "Caleb Love", min: 14, pts: 3, reb: 1, ast: 1, stl: 0, blk: 0, to: 2, tpm: 0, fgm: 1, fga: 7, ftm: 1, fta: 3, composite: -8.43, zScores: { pts: -0.83, reb: -0.761, ast: -0.444, stl: -0.731, blk: -0.452, tpm: -0.747, fgImpact: -1.748, ftImpact: -2.118, to: -0.597 } },
          { name: "Jameer Nelson Jr.", min: 18, pts: 10, reb: 3, ast: 2, stl: 1, blk: 0, to: 1, tpm: 0, fgm: 1, fga: 3, ftm: 8, fta: 9, composite: 0.76, zScores: { pts: 0.358, reb: -0.046, ast: 0.077, stl: 0.274, blk: -0.452, tpm: -0.747, fgImpact: -0.283, ftImpact: 1.376, to: 0.207 } },
          { name: "Duke Miles", min: 7, pts: 4, reb: 0, ast: 0, stl: 0, blk: 1, to: 0, tpm: 0, fgm: 1, fga: 1, ftm: 2, fta: 2, composite: -0.99, zScores: { pts: -0.661, reb: -1.118, ast: -0.965, stl: -0.731, blk: 1.123, tpm: -0.747, fgImpact: 0.45, ftImpact: 0.649, to: 1.011 } },
          { name: "Labaron Philon Jr.", min: 25, pts: 14, reb: 2, ast: 7, stl: 1, blk: 0, to: 2, tpm: 4, fgm: 5, fga: 13, ftm: 0, fta: 0, composite: 4.41, zScores: { pts: 1.037, reb: -0.403, ast: 2.684, stl: 0.274, blk: -0.452, tpm: 2.551, fgImpact: -0.682, ftImpact: 0, to: -0.597 } },
          { name: "Rayan Rupert", min: 23, pts: 9, reb: 5, ast: 2, stl: 0, blk: 0, to: 2, tpm: 1, fgm: 2, fga: 8, ftm: 4, fta: 4, composite: -0.77, zScores: { pts: 0.188, reb: 0.669, ast: 0.077, stl: -0.731, blk: -0.452, tpm: 0.078, fgImpact: -1.298, ftImpact: 1.299, to: -0.597 } }
        ]
      },
      home: {
        abbr: "BOS", name: "Boston Celtics", score: 144,
        players: [
          { name: "Paul George", min: 25, pts: 13, reb: 5, ast: 4, stl: 5, blk: 0, to: 3, tpm: 2, fgm: 3, fga: 10, ftm: 5, fta: 6, composite: 5.19, zScores: { pts: 0.867, reb: 0.669, ast: 1.12, stl: 4.293, blk: -0.452, tpm: 0.902, fgImpact: -1.215, ftImpact: 0.402, to: -1.401 } },
          { name: "Jayson Tatum", min: 27, pts: 23, reb: 5, ast: 4, stl: 1, blk: 0, to: 1, tpm: 4, fgm: 9, fga: 19, ftm: 1, fta: 1, composite: 7.64, zScores: { pts: 2.565, reb: 0.669, ast: 1.12, stl: 0.274, blk: -0.452, tpm: 2.551, fgImpact: 0.385, ftImpact: 0.325, to: 0.207 } },
          { name: "Mitchell Robinson", min: 14, pts: 6, reb: 5, ast: 1, stl: 0, blk: 0, to: 0, tpm: 0, fgm: 3, fga: 5, ftm: 0, fta: 3, composite: -4.06, zScores: { pts: -0.321, reb: 0.669, ast: -0.444, stl: -0.731, blk: -0.452, tpm: -0.747, fgImpact: 0.617, ftImpact: -3.664, to: 1.011 } },
          { name: "Derrick White", min: 26, pts: 15, reb: 4, ast: 2, stl: 1, blk: 0, to: 2, tpm: 1, fgm: 5, fga: 11, ftm: 4, fta: 4, composite: 2.25, zScores: { pts: 1.207, reb: 0.311, ast: 0.077, stl: 0.274, blk: -0.452, tpm: 0.078, fgImpact: 0.051, ftImpact: 1.299, to: -0.597 } },
          { name: "Jordan Walsh", min: 11, pts: 6, reb: 5, ast: 0, stl: 1, blk: 1, to: 0, tpm: 2, fgm: 2, fga: 3, ftm: 0, fta: 0, composite: 3.23, zScores: { pts: -0.321, reb: 0.669, ast: -0.965, stl: 0.274, blk: 1.123, tpm: 0.902, fgImpact: 0.533, ftImpact: 0, to: 1.011 } },
          { name: "Sam Hauser", min: 21, pts: 11, reb: 1, ast: 2, stl: 1, blk: 0, to: 0, tpm: 3, fgm: 4, fga: 6, ftm: 0, fta: 0, composite: 3.47, zScores: { pts: 0.528, reb: -0.761, ast: 0.077, stl: 0.274, blk: -0.452, tpm: 1.726, fgImpact: 1.066, ftImpact: 0, to: 1.011 } },
          { name: "Amari Williams", min: 4, pts: 0, reb: 0, ast: 1, stl: 0, blk: 0, to: 1, tpm: 0, fgm: 0, fga: 0, ftm: 0, fta: 0, composite: -4.62, zScores: { pts: -1.34, reb: -1.118, ast: -0.444, stl: -0.731, blk: -0.452, tpm: -0.747, fgImpact: 0, ftImpact: 0, to: 0.207 } },
          { name: "Dillon Mitchell", min: 7, pts: 2, reb: 3, ast: 2, stl: 1, blk: 0, to: 1, tpm: 0, fgm: 1, fga: 1, ftm: 0, fta: 0, composite: -1.24, zScores: { pts: -1, reb: -0.046, ast: 0.077, stl: 0.274, blk: -0.452, tpm: -0.747, fgImpact: 0.45, ftImpact: 0, to: 0.207 } },
          { name: "Chris Cenac Jr.", min: 7, pts: 5, reb: 5, ast: 0, stl: 0, blk: 0, to: 1, tpm: 0, fgm: 2, fga: 5, ftm: 1, fta: 3, composite: -4.83, zScores: { pts: -0.491, reb: 0.669, ast: -0.965, stl: -0.731, blk: -0.452, tpm: -0.747, fgImpact: -0.199, ftImpact: -2.118, to: 0.207 } },
          { name: "Luka Garza", min: 11, pts: 8, reb: 7, ast: 0, stl: 1, blk: 1, to: 1, tpm: 0, fgm: 4, fga: 8, ftm: 0, fta: 0, composite: 1.63, zScores: { pts: 0.018, reb: 1.383, ast: -0.965, stl: 0.274, blk: 1.123, tpm: -0.747, fgImpact: 0.334, ftImpact: 0, to: 0.207 } },
          { name: "Neemias Queta", min: 19, pts: 6, reb: 10, ast: 1, stl: 0, blk: 0, to: 1, tpm: 0, fgm: 2, fga: 5, ftm: 2, fta: 4, composite: -2.03, zScores: { pts: -0.321, reb: 2.455, ast: -0.444, stl: -0.731, blk: -0.452, tpm: -0.747, fgImpact: -0.199, ftImpact: -1.793, to: 0.207 } },
          { name: "Payton Pritchard", min: 24, pts: 25, reb: 4, ast: 7, stl: 0, blk: 0, to: 4, tpm: 5, fgm: 7, fga: 12, ftm: 6, fta: 6, composite: 9.15, zScores: { pts: 2.904, reb: 0.311, ast: 2.684, stl: -0.731, blk: -0.452, tpm: 3.375, fgImpact: 1.317, ftImpact: 1.948, to: -2.205 } },
          { name: "Baylor Scheierman", min: 19, pts: 3, reb: 3, ast: 8, stl: 5, blk: 0, to: 3, tpm: 1, fgm: 1, fga: 3, ftm: 0, fta: 0, composite: 4.56, zScores: { pts: -0.83, reb: -0.046, ast: 3.205, stl: 4.293, blk: -0.452, tpm: 0.078, fgImpact: -0.283, ftImpact: 0, to: -1.401 } },
          { name: "Milos Uzan", min: 4, pts: 4, reb: 0, ast: 1, stl: 0, blk: 0, to: 1, tpm: 0, fgm: 1, fga: 1, ftm: 2, fta: 2, composite: -2.85, zScores: { pts: -0.661, reb: -1.118, ast: -0.444, stl: -0.731, blk: -0.452, tpm: -0.747, fgImpact: 0.45, ftImpact: 0.649, to: 0.207 } },
          { name: "Hugo Gonzalez", min: 21, pts: 17, reb: 6, ast: 2, stl: 0, blk: 0, to: 1, tpm: 4, fgm: 6, fga: 7, ftm: 1, fta: 2, composite: 5.66, zScores: { pts: 1.546, reb: 1.026, ast: 0.077, stl: -0.731, blk: -0.452, tpm: 2.551, fgImpact: 2.332, ftImpact: -0.897, to: 0.207 } }
        ]
      }
    },
      {
      id: "401898399",
      line: "Sacramento Kings 106 @ Golden State Warriors 111 (Final)",
      completed: true,
      statusText: "Final",
      away: {
        abbr: "SAC", name: "Sacramento Kings", score: 106,
        players: [
          { name: "Precious Achiuwa", min: 27, pts: 8, reb: 8, ast: 1, stl: 0, blk: 0, to: 1, tpm: 0, fgm: 3, fga: 8, ftm: 2, fta: 2, composite: -0.24, zScores: { pts: 0.018, reb: 1.74, ast: -0.444, stl: -0.731, blk: -0.452, tpm: -0.747, fgImpact: -0.482, ftImpact: 0.649, to: 0.207 } },
          { name: "Keegan Murray", min: 8, pts: 5, reb: 0, ast: 0, stl: 0, blk: 0, to: 0, tpm: 0, fgm: 2, fga: 3, ftm: 1, fta: 2, composite: -3.86, zScores: { pts: -0.491, reb: -1.118, ast: -0.965, stl: -0.731, blk: -0.452, tpm: -0.747, fgImpact: 0.533, ftImpact: -0.897, to: 1.011 } },
          { name: "Zach LaVine", min: 23, pts: 11, reb: 1, ast: 2, stl: 3, blk: 0, to: 0, tpm: 1, fgm: 5, fga: 13, ftm: 0, fta: 0, composite: 2.08, zScores: { pts: 0.528, reb: -0.761, ast: 0.077, stl: 2.283, blk: -0.452, tpm: 0.078, fgImpact: -0.682, ftImpact: 0, to: 1.011 } },
          { name: "Ben Simmons", min: 9, pts: 7, reb: 0, ast: 1, stl: 0, blk: 0, to: 2, tpm: 0, fgm: 2, fga: 4, ftm: 3, fta: 4, composite: -4.32, zScores: { pts: -0.151, reb: -1.118, ast: -0.444, stl: -0.731, blk: -0.452, tpm: -0.747, fgImpact: 0.167, ftImpact: -0.247, to: -0.597 } },
          { name: "Darius Acuff Jr.", min: 27, pts: 25, reb: 4, ast: 8, stl: 0, blk: 0, to: 4, tpm: 4, fgm: 8, fga: 15, ftm: 5, fta: 5, composite: 8.24, zScores: { pts: 2.904, reb: 0.311, ast: 3.205, stl: -0.731, blk: -0.452, tpm: 2.551, fgImpact: 1.034, ftImpact: 1.624, to: -2.205 } },
          { name: "De'Andre Hunter", min: 19, pts: 4, reb: 3, ast: 1, stl: 0, blk: 0, to: 2, tpm: 0, fgm: 2, fga: 8, ftm: 0, fta: 0, composite: -4.98, zScores: { pts: -0.661, reb: -0.046, ast: -0.444, stl: -0.731, blk: -0.452, tpm: -0.747, fgImpact: -1.298, ftImpact: 0, to: -0.597 } },
          { name: "Leaky Black", min: 17, pts: 9, reb: 3, ast: 0, stl: 2, blk: 0, to: 1, tpm: 3, fgm: 3, fga: 4, ftm: 0, fta: 0, composite: 2.92, zScores: { pts: 0.188, reb: -0.046, ast: -0.965, stl: 1.279, blk: -0.452, tpm: 1.726, fgImpact: 0.983, ftImpact: 0, to: 0.207 } },
          { name: "Alex Karaban", min: 12, pts: 2, reb: 1, ast: 1, stl: 0, blk: 0, to: 0, tpm: 0, fgm: 1, fga: 1, ftm: 0, fta: 0, composite: -2.67, zScores: { pts: -1, reb: -0.761, ast: -0.444, stl: -0.731, blk: -0.452, tpm: -0.747, fgImpact: 0.45, ftImpact: 0, to: 1.011 } },
          { name: "Jonathan Mogbo", min: 24, pts: 12, reb: 8, ast: 1, stl: 5, blk: 0, to: 1, tpm: 0, fgm: 4, fga: 8, ftm: 4, fta: 5, composite: 5.71, zScores: { pts: 0.698, reb: 1.74, ast: -0.444, stl: 4.293, blk: -0.452, tpm: -0.747, fgImpact: 0.334, ftImpact: 0.077, to: 0.207 } },
          { name: "Maxime Raynaud", min: 9, pts: 10, reb: 5, ast: 1, stl: 0, blk: 1, to: 0, tpm: 1, fgm: 3, fga: 3, ftm: 3, fta: 4, composite: 3.17, zScores: { pts: 0.358, reb: 0.669, ast: -0.444, stl: -0.731, blk: 1.123, tpm: 0.078, fgImpact: 1.349, ftImpact: -0.247, to: 1.011 } },
          { name: "Daeqwon Plowden", min: 16, pts: 0, reb: 4, ast: 1, stl: 0, blk: 0, to: 1, tpm: 0, fgm: 0, fga: 5, ftm: 0, fta: 0, composite: -5.03, zScores: { pts: -1.34, reb: 0.311, ast: -0.444, stl: -0.731, blk: -0.452, tpm: -0.747, fgImpact: -1.831, ftImpact: 0, to: 0.207 } },
          { name: "Tristen Newton", min: 5, pts: 3, reb: 0, ast: 0, stl: 2, blk: 0, to: 1, tpm: 0, fgm: 1, fga: 1, ftm: 1, fta: 1, composite: -1.85, zScores: { pts: -0.83, reb: -1.118, ast: -0.965, stl: 1.279, blk: -0.452, tpm: -0.747, fgImpact: 0.45, ftImpact: 0.325, to: 0.207 } },
          { name: "Nique Clifford", min: 23, pts: 3, reb: 1, ast: 3, stl: 2, blk: 0, to: 4, tpm: 0, fgm: 1, fga: 10, ftm: 1, fta: 2, composite: -6.86, zScores: { pts: -0.83, reb: -0.761, ast: 0.599, stl: 1.279, blk: -0.452, tpm: -0.747, fgImpact: -2.847, ftImpact: -0.897, to: -2.205 } },
          { name: "Emanuel Sharp", min: 21, pts: 7, reb: 3, ast: 0, stl: 1, blk: 0, to: 0, tpm: 1, fgm: 3, fga: 8, ftm: 0, fta: 0, composite: -0.74, zScores: { pts: -0.151, reb: -0.046, ast: -0.965, stl: 0.274, blk: -0.452, tpm: 0.078, fgImpact: -0.482, ftImpact: 0, to: 1.011 } }
        ]
      },
      home: {
        abbr: "GS", name: "Golden State Warriors", score: 111,
        players: [
          { name: "Draymond Green", min: 23, pts: 3, reb: 7, ast: 5, stl: 1, blk: 0, to: 1, tpm: 0, fgm: 1, fga: 1, ftm: 1, fta: 3, composite: -0.19, zScores: { pts: -0.83, reb: 1.383, ast: 1.641, stl: 0.274, blk: -0.452, tpm: -0.747, fgImpact: 0.45, ftImpact: -2.118, to: 0.207 } },
          { name: "Gui Santos", min: 24, pts: 15, reb: 6, ast: 1, stl: 0, blk: 0, to: 5, tpm: 0, fgm: 6, fga: 9, ftm: 3, fta: 4, composite: -1.8, zScores: { pts: 1.207, reb: 1.026, ast: -0.444, stl: -0.731, blk: -0.452, tpm: -0.747, fgImpact: 1.599, ftImpact: -0.247, to: -3.008 } },
          { name: "Yaxel Lendeborg", min: 24, pts: 23, reb: 10, ast: 6, stl: 2, blk: 1, to: 2, tpm: 1, fgm: 10, fga: 14, ftm: 2, fta: 2, composite: 12.75, zScores: { pts: 2.565, reb: 2.455, ast: 2.162, stl: 1.279, blk: 1.123, tpm: 0.078, fgImpact: 3.032, ftImpact: 0.649, to: -0.597 } },
          { name: "Stephen Curry", min: 14, pts: 8, reb: 0, ast: 2, stl: 0, blk: 0, to: 1, tpm: 2, fgm: 3, fga: 6, ftm: 0, fta: 0, composite: -0.85, zScores: { pts: 0.018, reb: -1.118, ast: 0.077, stl: -0.731, blk: -0.452, tpm: 0.902, fgImpact: 0.25, ftImpact: 0, to: 0.207 } },
          { name: "Brandin Podziemski", min: 26, pts: 14, reb: 7, ast: 4, stl: 1, blk: 0, to: 1, tpm: 3, fgm: 4, fga: 9, ftm: 3, fta: 4, composite: 5.01, zScores: { pts: 1.037, reb: 1.383, ast: 1.12, stl: 0.274, blk: -0.452, tpm: 1.726, fgImpact: -0.033, ftImpact: -0.247, to: 0.207 } },
          { name: "Georges Niang", min: 19, pts: 13, reb: 1, ast: 0, stl: 0, blk: 0, to: 2, tpm: 3, fgm: 4, fga: 6, ftm: 2, fta: 2, composite: 0.8, zScores: { pts: 0.867, reb: -0.761, ast: -0.965, stl: -0.731, blk: -0.452, tpm: 1.726, fgImpact: 1.066, ftImpact: 0.649, to: -0.597 } },
          { name: "Malevy Leons", min: 4, pts: 0, reb: 0, ast: 0, stl: 0, blk: 0, to: 0, tpm: 0, fgm: 0, fga: 2, ftm: 0, fta: 0, composite: -5.07, zScores: { pts: -1.34, reb: -1.118, ast: -0.965, stl: -0.731, blk: -0.452, tpm: -0.747, fgImpact: -0.733, ftImpact: 0, to: 1.011 } },
          { name: "Al Horford", min: 21, pts: 4, reb: 5, ast: 3, stl: 0, blk: 1, to: 2, tpm: 0, fgm: 1, fga: 9, ftm: 2, fta: 2, composite: -2.18, zScores: { pts: -0.661, reb: 0.669, ast: 0.599, stl: -0.731, blk: 1.123, tpm: -0.747, fgImpact: -2.481, ftImpact: 0.649, to: -0.597 } },
          { name: "Charles Bassey", min: 8, pts: 5, reb: 3, ast: 1, stl: 1, blk: 0, to: 1, tpm: 0, fgm: 1, fga: 1, ftm: 3, fta: 4, composite: -1.5, zScores: { pts: -0.491, reb: -0.046, ast: -0.444, stl: 0.274, blk: -0.452, tpm: -0.747, fgImpact: 0.45, ftImpact: -0.247, to: 0.207 } },
          { name: "Gary Payton II", min: 19, pts: 0, reb: 2, ast: 0, stl: 1, blk: 0, to: 0, tpm: 0, fgm: 0, fga: 1, ftm: 0, fta: 0, composite: -2.99, zScores: { pts: -1.34, reb: -0.403, ast: -0.965, stl: 0.274, blk: -0.452, tpm: -0.747, fgImpact: -0.366, ftImpact: 0, to: 1.011 } },
          { name: "De'Anthony Melton", min: 18, pts: 0, reb: 2, ast: 1, stl: 1, blk: 3, to: 1, tpm: 0, fgm: 0, fga: 6, ftm: 0, fta: 0, composite: -0.38, zScores: { pts: -1.34, reb: -0.403, ast: -0.444, stl: 0.274, blk: 4.275, tpm: -0.747, fgImpact: -2.198, ftImpact: 0, to: 0.207 } },
          { name: "Brandon Williams", min: 17, pts: 19, reb: 0, ast: 1, stl: 1, blk: 0, to: 5, tpm: 2, fgm: 7, fga: 8, ftm: 3, fta: 4, composite: 0.57, zScores: { pts: 1.886, reb: -1.118, ast: -0.444, stl: 0.274, blk: -0.452, tpm: 0.902, fgImpact: 2.782, ftImpact: -0.247, to: -3.008 } },
          { name: "LJ Cryer", min: 6, pts: 0, reb: 0, ast: 0, stl: 0, blk: 0, to: 0, tpm: 0, fgm: 0, fga: 2, ftm: 0, fta: 0, composite: -5.07, zScores: { pts: -1.34, reb: -1.118, ast: -0.965, stl: -0.731, blk: -0.452, tpm: -0.747, fgImpact: -0.733, ftImpact: 0, to: 1.011 } },
          { name: "Dalen Terry", min: 4, pts: 0, reb: 3, ast: 1, stl: 0, blk: 0, to: 0, tpm: 0, fgm: 0, fga: 0, ftm: 0, fta: 0, composite: -2.75, zScores: { pts: -1.34, reb: -0.046, ast: -0.444, stl: -0.731, blk: -0.452, tpm: -0.747, fgImpact: 0, ftImpact: 0, to: 1.011 } },
          { name: "Will Richard", min: 14, pts: 7, reb: 3, ast: 1, stl: 2, blk: 0, to: 0, tpm: 1, fgm: 1, fga: 5, ftm: 4, fta: 4, composite: 1.56, zScores: { pts: -0.151, reb: -0.046, ast: -0.444, stl: 1.279, blk: -0.452, tpm: 0.078, fgImpact: -1.015, ftImpact: 1.299, to: 1.011 } }
        ]
      }
    },
      {
      id: "401898720",
      line: "San Antonio Spurs 98 @ Phoenix Suns 102 (Final)",
      completed: true,
      statusText: "Final",
      away: {
        abbr: "SA", name: "San Antonio Spurs", score: 98,
        players: [
          { name: "Julian Champagnie", min: 25, pts: 10, reb: 1, ast: 2, stl: 0, blk: 0, to: 0, tpm: 2, fgm: 2, fga: 7, ftm: 4, fta: 4, composite: 0.77, zScores: { pts: 0.358, reb: -0.761, ast: 0.077, stl: -0.731, blk: -0.452, tpm: 0.902, fgImpact: -0.932, ftImpact: 1.299, to: 1.011 } },
          { name: "Victor Wembanyama", min: 22, pts: 13, reb: 7, ast: 6, stl: 1, blk: 2, to: 2, tpm: 0, fgm: 6, fga: 14, ftm: 1, fta: 2, composite: 4.91, zScores: { pts: 0.867, reb: 1.383, ast: 2.162, stl: 0.274, blk: 2.699, tpm: -0.747, fgImpact: -0.232, ftImpact: -0.897, to: -0.597 } },
          { name: "Devin Vassell", min: 23, pts: 6, reb: 2, ast: 1, stl: 0, blk: 0, to: 2, tpm: 1, fgm: 2, fga: 9, ftm: 1, fta: 1, composite: -4.21, zScores: { pts: -0.321, reb: -0.403, ast: -0.444, stl: -0.731, blk: -0.452, tpm: 0.078, fgImpact: -1.665, ftImpact: 0.325, to: -0.597 } },
          { name: "Stephon Castle", min: 21, pts: 13, reb: 7, ast: 5, stl: 1, blk: 0, to: 2, tpm: 1, fgm: 5, fga: 10, ftm: 2, fta: 2, composite: 4.26, zScores: { pts: 0.867, reb: 1.383, ast: 1.641, stl: 0.274, blk: -0.452, tpm: 0.078, fgImpact: 0.417, ftImpact: 0.649, to: -0.597 } },
          { name: "Dylan Harper", min: 24, pts: 15, reb: 3, ast: 4, stl: 1, blk: 1, to: 1, tpm: 1, fgm: 6, fga: 9, ftm: 2, fta: 2, composite: 6.21, zScores: { pts: 1.207, reb: -0.046, ast: 1.12, stl: 0.274, blk: 1.123, tpm: 0.078, fgImpact: 1.599, ftImpact: 0.649, to: 0.207 } },
          { name: "Harrison Barnes", min: 17, pts: 6, reb: 0, ast: 0, stl: 1, blk: 0, to: 1, tpm: 2, fgm: 2, fga: 5, ftm: 0, fta: 0, composite: -1.67, zScores: { pts: -0.321, reb: -1.118, ast: -0.965, stl: 0.274, blk: -0.452, tpm: 0.902, fgImpact: -0.199, ftImpact: 0, to: 0.207 } },
          { name: "Keldon Johnson", min: 16, pts: 6, reb: 3, ast: 1, stl: 0, blk: 0, to: 1, tpm: 0, fgm: 3, fga: 4, ftm: 0, fta: 0, composite: -1.55, zScores: { pts: -0.321, reb: -0.046, ast: -0.444, stl: -0.731, blk: -0.452, tpm: -0.747, fgImpact: 0.983, ftImpact: 0, to: 0.207 } },
          { name: "David Jones Garcia", min: 14, pts: 0, reb: 6, ast: 3, stl: 0, blk: 0, to: 1, tpm: 0, fgm: 0, fga: 6, ftm: 0, fta: 0, composite: -3.64, zScores: { pts: -1.34, reb: 1.026, ast: 0.599, stl: -0.731, blk: -0.452, tpm: -0.747, fgImpact: -2.198, ftImpact: 0, to: 0.207 } },
          { name: "Carter Bryant", min: 10, pts: 0, reb: 0, ast: 0, stl: 0, blk: 1, to: 0, tpm: 0, fgm: 0, fga: 0, ftm: 0, fta: 0, composite: -2.77, zScores: { pts: -1.34, reb: -1.118, ast: -0.965, stl: -0.731, blk: 1.123, tpm: -0.747, fgImpact: 0, ftImpact: 0, to: 1.011 } },
          { name: "Maliq Brown", min: 10, pts: 8, reb: 1, ast: 0, stl: 0, blk: 0, to: 0, tpm: 2, fgm: 3, fga: 3, ftm: 0, fta: 0, composite: 0.37, zScores: { pts: 0.018, reb: -0.761, ast: -0.965, stl: -0.731, blk: -0.452, tpm: 0.902, fgImpact: 1.349, ftImpact: 0, to: 1.011 } },
          { name: "Luke Kornet", min: 17, pts: 4, reb: 10, ast: 2, stl: 0, blk: 2, to: 1, tpm: 0, fgm: 2, fga: 7, ftm: 0, fta: 0, composite: 2.37, zScores: { pts: -0.661, reb: 2.455, ast: 0.077, stl: -0.731, blk: 2.699, tpm: -0.747, fgImpact: -0.932, ftImpact: 0, to: 0.207 } },
          { name: "Tarris Reed Jr.", min: 9, pts: 10, reb: 6, ast: 0, stl: 1, blk: 0, to: 3, tpm: 0, fgm: 4, fga: 4, ftm: 2, fta: 2, composite: 0.54, zScores: { pts: 0.358, reb: 1.026, ast: -0.965, stl: 0.274, blk: -0.452, tpm: -0.747, fgImpact: 1.799, ftImpact: 0.649, to: -1.401 } },
          { name: "Jordan McLaughlin", min: 9, pts: 4, reb: 0, ast: 3, stl: 1, blk: 0, to: 3, tpm: 1, fgm: 1, fga: 3, ftm: 1, fta: 2, composite: -3.86, zScores: { pts: -0.661, reb: -1.118, ast: 0.599, stl: 0.274, blk: -0.452, tpm: 0.078, fgImpact: -0.283, ftImpact: -0.897, to: -1.401 } },
          { name: "Jon Elmore", min: 8, pts: 0, reb: 0, ast: 1, stl: 0, blk: 0, to: 0, tpm: 0, fgm: 0, fga: 1, ftm: 0, fta: 0, composite: -4.19, zScores: { pts: -1.34, reb: -1.118, ast: -0.444, stl: -0.731, blk: -0.452, tpm: -0.747, fgImpact: -0.366, ftImpact: 0, to: 1.011 } },
          { name: "RJ Davis", min: 4, pts: 0, reb: 0, ast: 0, stl: 0, blk: 0, to: 2, tpm: 0, fgm: 0, fga: 1, ftm: 0, fta: 0, composite: -6.32, zScores: { pts: -1.34, reb: -1.118, ast: -0.965, stl: -0.731, blk: -0.452, tpm: -0.747, fgImpact: -0.366, ftImpact: 0, to: -0.597 } },
          { name: "Ja'Kobi Gillespie", min: 11, pts: 3, reb: 2, ast: 4, stl: 0, blk: 0, to: 0, tpm: 1, fgm: 1, fga: 4, ftm: 0, fta: 0, composite: -0.86, zScores: { pts: -0.83, reb: -0.403, ast: 1.12, stl: -0.731, blk: -0.452, tpm: 0.078, fgImpact: -0.649, ftImpact: 0, to: 1.011 } }
        ]
      },
      home: {
        abbr: "PHX", name: "Phoenix Suns", score: 102,
        players: [
          { name: "Dillon Brooks", min: 24, pts: 15, reb: 2, ast: 2, stl: 1, blk: 0, to: 2, tpm: 1, fgm: 4, fga: 11, ftm: 6, fta: 7, composite: 0.14, zScores: { pts: 1.207, reb: -0.403, ast: 0.077, stl: 0.274, blk: -0.452, tpm: 0.078, fgImpact: -0.765, ftImpact: 0.727, to: -0.597 } },
          { name: "Ryan Dunn", min: 19, pts: 6, reb: 4, ast: 1, stl: 1, blk: 1, to: 1, tpm: 0, fgm: 2, fga: 5, ftm: 2, fta: 2, composite: 0.85, zScores: { pts: -0.321, reb: 0.311, ast: -0.444, stl: 0.274, blk: 1.123, tpm: -0.747, fgImpact: -0.199, ftImpact: 0.649, to: 0.207 } },
          { name: "Khaman Maluach", min: 23, pts: 10, reb: 15, ast: 3, stl: 1, blk: 1, to: 2, tpm: 1, fgm: 4, fga: 9, ftm: 1, fta: 1, composite: 6.37, zScores: { pts: 0.358, reb: 4.241, ast: 0.599, stl: 0.274, blk: 1.123, tpm: 0.078, fgImpact: -0.033, ftImpact: 0.325, to: -0.597 } },
          { name: "Luke Kennard", min: 25, pts: 20, reb: 5, ast: 4, stl: 0, blk: 0, to: 1, tpm: 4, fgm: 8, fga: 15, ftm: 0, fta: 0, composite: 6.45, zScores: { pts: 2.056, reb: 0.669, ast: 1.12, stl: -0.731, blk: -0.452, tpm: 2.551, fgImpact: 1.034, ftImpact: 0, to: 0.207 } },
          { name: "Jalen Green", min: 29, pts: 18, reb: 3, ast: 5, stl: 1, blk: 0, to: 3, tpm: 3, fgm: 7, fga: 12, ftm: 1, fta: 2, composite: 3.88, zScores: { pts: 1.716, reb: -0.046, ast: 1.641, stl: 0.274, blk: -0.452, tpm: 1.726, fgImpact: 1.317, ftImpact: -0.897, to: -1.401 } },
          { name: "Haywood Highsmith", min: 12, pts: 3, reb: 0, ast: 0, stl: 0, blk: 0, to: 1, tpm: 1, fgm: 1, fga: 1, ftm: 0, fta: 0, composite: -3.36, zScores: { pts: -0.83, reb: -1.118, ast: -0.965, stl: -0.731, blk: -0.452, tpm: 0.078, fgImpact: 0.45, ftImpact: 0, to: 0.207 } },
          { name: "Oso Ighodaro", min: 21, pts: 8, reb: 5, ast: 5, stl: 2, blk: 2, to: 0, tpm: 0, fgm: 4, fga: 7, ftm: 0, fta: 0, composite: 7.27, zScores: { pts: 0.018, reb: 0.669, ast: 1.641, stl: 1.279, blk: 2.699, tpm: -0.747, fgImpact: 0.7, ftImpact: 0, to: 1.011 } },
          { name: "Koa Peat", min: 6, pts: 2, reb: 0, ast: 0, stl: 0, blk: 0, to: 0, tpm: 0, fgm: 1, fga: 1, ftm: 0, fta: 0, composite: -3.55, zScores: { pts: -1, reb: -1.118, ast: -0.965, stl: -0.731, blk: -0.452, tpm: -0.747, fgImpact: 0.45, ftImpact: 0, to: 1.011 } },
          { name: "Rasheer Fleming", min: 19, pts: 0, reb: 4, ast: 0, stl: 1, blk: 0, to: 2, tpm: 0, fgm: 0, fga: 3, ftm: 0, fta: 0, composite: -4.61, zScores: { pts: -1.34, reb: 0.311, ast: -0.965, stl: 0.274, blk: -0.452, tpm: -0.747, fgImpact: -1.099, ftImpact: 0, to: -0.597 } },
          { name: "Duop Reath", min: 4, pts: 4, reb: 0, ast: 0, stl: 0, blk: 1, to: 0, tpm: 0, fgm: 1, fga: 3, ftm: 2, fta: 2, composite: -1.72, zScores: { pts: -0.661, reb: -1.118, ast: -0.965, stl: -0.731, blk: 1.123, tpm: -0.747, fgImpact: -0.283, ftImpact: 0.649, to: 1.011 } },
          { name: "Jordan Goodwin", min: 17, pts: 8, reb: 2, ast: 0, stl: 0, blk: 1, to: 0, tpm: 2, fgm: 3, fga: 7, ftm: 0, fta: 0, composite: 0.84, zScores: { pts: 0.018, reb: -0.403, ast: -0.965, stl: -0.731, blk: 1.123, tpm: 0.902, fgImpact: -0.116, ftImpact: 0, to: 1.011 } },
          { name: "Collin Gillespie", min: 20, pts: 2, reb: 2, ast: 0, stl: 3, blk: 0, to: 2, tpm: 0, fgm: 1, fga: 5, ftm: 0, fta: 0, composite: -2.9, zScores: { pts: -1, reb: -0.403, ast: -0.965, stl: 2.283, blk: -0.452, tpm: -0.747, fgImpact: -1.015, ftImpact: 0, to: -0.597 } },
          { name: "Jamaree Bouyea", min: 12, pts: 4, reb: 0, ast: 2, stl: 0, blk: 0, to: 1, tpm: 0, fgm: 1, fga: 4, ftm: 2, fta: 2, composite: -3.42, zScores: { pts: -0.661, reb: -1.118, ast: 0.077, stl: -0.731, blk: -0.452, tpm: -0.747, fgImpact: -0.649, ftImpact: 0.649, to: 0.207 } },
          { name: "Koby Brea", min: 9, pts: 2, reb: 1, ast: 1, stl: 1, blk: 0, to: 0, tpm: 0, fgm: 1, fga: 4, ftm: 0, fta: 0, composite: -2.77, zScores: { pts: -1, reb: -0.761, ast: -0.444, stl: 0.274, blk: -0.452, tpm: -0.747, fgImpact: -0.649, ftImpact: 0, to: 1.011 } }
        ]
      }
    }
    ]
  },
    "2026-10-11": {
    games: [
      {
      id: "401898400",
      line: "Dallas Mavericks 132 @ Houston Rockets 115 (Final)",
      completed: true,
      statusText: "Final",
      away: {
        abbr: "DAL", name: "Dallas Mavericks", score: 132,
        players: [
          { name: "Daniel Gafford", min: 15, pts: 9, reb: 4, ast: 0, stl: 0, blk: 0, to: 1, tpm: 0, fgm: 3, fga: 3, ftm: 3, fta: 3, composite: 0.18, zScores: { pts: 0.172, reb: 0.286, ast: -0.964, stl: -0.832, blk: -0.55, tpm: -0.896, fgImpact: 1.323, ftImpact: 1.492, to: 0.145 } },
          { name: "P.J. Washington", min: 16, pts: 10, reb: 2, ast: 1, stl: 0, blk: 2, to: 1, tpm: 2, fgm: 3, fga: 7, ftm: 2, fta: 2, composite: 2.43, zScores: { pts: 0.342, reb: -0.554, ast: -0.434, stl: -0.832, blk: 2.056, tpm: 0.794, fgImpact: -0.081, ftImpact: 0.995, to: 0.145 } },
          { name: "Cooper Flagg", min: 25, pts: 14, reb: 4, ast: 7, stl: 2, blk: 1, to: 2, tpm: 1, fgm: 3, fga: 10, ftm: 7, fta: 8, composite: 6.48, zScores: { pts: 1.022, reb: 0.286, ast: 2.745, stl: 1.674, blk: 0.753, tpm: -0.051, fgImpact: -1.134, ftImpact: 1.926, to: -0.741 } },
          { name: "Zaccharie Risacher", min: 24, pts: 16, reb: 3, ast: 2, stl: 1, blk: 1, to: 3, tpm: 2, fgm: 7, fga: 13, ftm: 0, fta: 0, composite: 2.65, zScores: { pts: 1.363, reb: -0.134, ast: 0.096, stl: 0.421, blk: 0.753, tpm: 0.794, fgImpact: 0.981, ftImpact: 0, to: -1.626 } },
          { name: "Kyrie Irving", min: 22, pts: 17, reb: 2, ast: 3, stl: 0, blk: 0, to: 0, tpm: 2, fgm: 6, fga: 13, ftm: 3, fta: 3, composite: 3.73, zScores: { pts: 1.533, reb: -0.554, ast: 0.626, stl: -0.832, blk: -0.55, tpm: 0.794, fgImpact: 0.189, ftImpact: 1.492, to: 1.031 } },
          { name: "Dwight Powell", min: 15, pts: 3, reb: 5, ast: 2, stl: 1, blk: 0, to: 0, tpm: 0, fgm: 1, fga: 1, ftm: 1, fta: 1, composite: 0.9, zScores: { pts: -0.849, reb: 0.706, ast: 0.096, stl: 0.421, blk: -0.55, tpm: -0.896, fgImpact: 0.441, ftImpact: 0.497, to: 1.031 } },
          { name: "Caleb Martin", min: 15, pts: 3, reb: 4, ast: 3, stl: 2, blk: 0, to: 2, tpm: 1, fgm: 1, fga: 2, ftm: 0, fta: 0, composite: 0.48, zScores: { pts: -0.849, reb: 0.286, ast: 0.626, stl: 1.674, blk: -0.55, tpm: -0.051, fgImpact: 0.09, ftImpact: 0, to: -0.741 } },
          { name: "Naji Marshall", min: 18, pts: 14, reb: 2, ast: 0, stl: 3, blk: 2, to: 1, tpm: 1, fgm: 4, fga: 8, ftm: 5, fta: 6, composite: 5.87, zScores: { pts: 1.022, reb: -0.554, ast: -0.964, stl: 2.927, blk: 2.056, tpm: -0.051, fgImpact: 0.36, ftImpact: 0.931, to: 0.145 } },
          { name: "Tobi Lawal", min: 9, pts: 5, reb: 5, ast: 1, stl: 0, blk: 1, to: 0, tpm: 0, fgm: 1, fga: 1, ftm: 3, fta: 4, composite: 0.2, zScores: { pts: -0.509, reb: 0.706, ast: -0.434, stl: -0.832, blk: 0.753, tpm: -0.896, fgImpact: 0.441, ftImpact: -0.063, to: 1.031 } },
          { name: "Tarik Biberovic", min: 13, pts: 8, reb: 2, ast: 1, stl: 0, blk: 2, to: 1, tpm: 2, fgm: 3, fga: 7, ftm: 0, fta: 0, composite: 1.1, zScores: { pts: 0.001, reb: -0.554, ast: -0.434, stl: -0.832, blk: 2.056, tpm: 0.794, fgImpact: -0.081, ftImpact: 0, to: 0.145 } },
          { name: "Sergio de Larrea", min: 22, pts: 9, reb: 7, ast: 4, stl: 2, blk: 0, to: 2, tpm: 1, fgm: 3, fga: 7, ftm: 2, fta: 2, composite: 4.12, zScores: { pts: 0.172, reb: 1.547, ast: 1.156, stl: 1.674, blk: -0.55, tpm: -0.051, fgImpact: -0.081, ftImpact: 0.995, to: -0.741 } },
          { name: "Moussa Cisse", min: 7, pts: 3, reb: 1, ast: 1, stl: 0, blk: 1, to: 0, tpm: 0, fgm: 0, fga: 0, ftm: 3, fta: 4, composite: -2.26, zScores: { pts: -0.849, reb: -0.974, ast: -0.434, stl: -0.832, blk: 0.753, tpm: -0.896, fgImpact: 0, ftImpact: -0.063, to: 1.031 } },
          { name: "Seth Lundy", min: 8, pts: 3, reb: 0, ast: 1, stl: 0, blk: 0, to: 0, tpm: 1, fgm: 1, fga: 1, ftm: 0, fta: 0, composite: -2.64, zScores: { pts: -0.849, reb: -1.394, ast: -0.434, stl: -0.832, blk: -0.55, tpm: -0.051, fgImpact: 0.441, ftImpact: 0, to: 1.031 } },
          { name: "Max Christie", min: 22, pts: 14, reb: 4, ast: 1, stl: 1, blk: 0, to: 2, tpm: 2, fgm: 4, fga: 7, ftm: 4, fta: 4, composite: 3.5, zScores: { pts: 1.022, reb: 0.286, ast: -0.434, stl: 0.421, blk: -0.55, tpm: 0.794, fgImpact: 0.711, ftImpact: 1.99, to: -0.741 } },
          { name: "Jett Howard", min: 9, pts: 4, reb: 1, ast: 1, stl: 0, blk: 0, to: 1, tpm: 0, fgm: 1, fga: 5, ftm: 2, fta: 2, composite: -4.19, zScores: { pts: -0.679, reb: -0.974, ast: -0.434, stl: -0.832, blk: -0.55, tpm: -0.896, fgImpact: -0.963, ftImpact: 0.995, to: 0.145 } }
        ]
      },
      home: {
        abbr: "HOU", name: "Houston Rockets", score: 115,
        players: [
          { name: "Jabari Smith Jr.", min: 28, pts: 14, reb: 9, ast: 4, stl: 1, blk: 0, to: 2, tpm: 2, fgm: 6, fga: 10, ftm: 0, fta: 0, composite: 5.73, zScores: { pts: 1.022, reb: 2.387, ast: 1.156, stl: 0.421, blk: -0.55, tpm: 0.794, fgImpact: 1.242, ftImpact: 0, to: -0.741 } },
          { name: "Clint Capela", min: 24, pts: 5, reb: 9, ast: 0, stl: 0, blk: 1, to: 3, tpm: 0, fgm: 2, fga: 3, ftm: 1, fta: 2, composite: -2.21, zScores: { pts: -0.509, reb: 2.387, ast: -0.964, stl: -0.832, blk: 0.753, tpm: -0.896, fgImpact: 0.531, ftImpact: -1.058, to: -1.626 } },
          { name: "Marcus Smart", min: 24, pts: 20, reb: 5, ast: 4, stl: 0, blk: 1, to: 1, tpm: 4, fgm: 7, fga: 13, ftm: 2, fta: 3, composite: 6.87, zScores: { pts: 2.043, reb: 0.706, ast: 1.156, stl: -0.832, blk: 0.753, tpm: 2.483, fgImpact: 0.981, ftImpact: -0.561, to: 0.145 } },
          { name: "Amen Thompson", min: 30, pts: 14, reb: 7, ast: 6, stl: 1, blk: 1, to: 2, tpm: 1, fgm: 4, fga: 12, ftm: 5, fta: 6, composite: 5.05, zScores: { pts: 1.022, reb: 1.547, ast: 2.215, stl: 0.421, blk: 0.753, tpm: -0.051, fgImpact: -1.044, ftImpact: 0.931, to: -0.741 } },
          { name: "Reed Sheppard", min: 25, pts: 17, reb: 1, ast: 1, stl: 1, blk: 2, to: 5, tpm: 4, fgm: 5, fga: 12, ftm: 3, fta: 4, composite: 1.37, zScores: { pts: 1.533, reb: -0.974, ast: -0.434, stl: 0.421, blk: 2.056, tpm: 2.483, fgImpact: -0.252, ftImpact: -0.063, to: -3.398 } },
          { name: "Tari Eason", min: 22, pts: 9, reb: 6, ast: 0, stl: 1, blk: 1, to: 1, tpm: 0, fgm: 3, fga: 8, ftm: 3, fta: 3, composite: 1.82, zScores: { pts: 0.172, reb: 1.126, ast: -0.964, stl: 0.421, blk: 0.753, tpm: -0.896, fgImpact: -0.432, ftImpact: 1.492, to: 0.145 } },
          { name: "Isaiah Crawford", min: 17, pts: 6, reb: 1, ast: 0, stl: 2, blk: 0, to: 1, tpm: 1, fgm: 1, fga: 3, ftm: 3, fta: 4, composite: -1.38, zScores: { pts: -0.339, reb: -0.974, ast: -0.964, stl: 1.674, blk: -0.55, tpm: -0.051, fgImpact: -0.261, ftImpact: -0.063, to: 0.145 } },
          { name: "Julian Phillips", min: 8, pts: 0, reb: 3, ast: 0, stl: 0, blk: 0, to: 0, tpm: 0, fgm: 0, fga: 2, ftm: 0, fta: 0, composite: -4.41, zScores: { pts: -1.36, reb: -0.134, ast: -0.964, stl: -0.832, blk: -0.55, tpm: -0.896, fgImpact: -0.702, ftImpact: 0, to: 1.031 } },
          { name: "Oscar Tshiebwe", min: 12, pts: 12, reb: 4, ast: 1, stl: 1, blk: 1, to: 1, tpm: 0, fgm: 4, fga: 5, ftm: 4, fta: 6, composite: 1.25, zScores: { pts: 0.682, reb: 0.286, ast: -0.434, stl: 0.421, blk: 0.753, tpm: -0.896, fgImpact: 1.413, ftImpact: -1.121, to: 0.145 } },
          { name: "Bogdan Bogdanovic", min: 14, pts: 7, reb: 4, ast: 0, stl: 1, blk: 0, to: 4, tpm: 2, fgm: 2, fga: 7, ftm: 1, fta: 1, composite: -3.07, zScores: { pts: -0.169, reb: 0.286, ast: -0.964, stl: 0.421, blk: -0.55, tpm: 0.794, fgImpact: -0.873, ftImpact: 0.497, to: -2.512 } },
          { name: "Quadir Copeland", min: 12, pts: 2, reb: 1, ast: 2, stl: 0, blk: 0, to: 0, tpm: 0, fgm: 1, fga: 4, ftm: 0, fta: 0, composite: -3.76, zScores: { pts: -1.019, reb: -0.974, ast: 0.096, stl: -0.832, blk: -0.55, tpm: -0.896, fgImpact: -0.612, ftImpact: 0, to: 1.031 } },
          { name: "Sean Pedulla", min: 7, pts: 0, reb: 0, ast: 1, stl: 1, blk: 0, to: 0, tpm: 0, fgm: 0, fga: 5, ftm: 0, fta: 0, composite: -4.94, zScores: { pts: -1.36, reb: -1.394, ast: -0.434, stl: 0.421, blk: -0.55, tpm: -0.896, fgImpact: -1.755, ftImpact: 0, to: 1.031 } },
          { name: "Bruce Thornton", min: 18, pts: 9, reb: 0, ast: 0, stl: 1, blk: 0, to: 1, tpm: 0, fgm: 2, fga: 6, ftm: 5, fta: 7, composite: -4.21, zScores: { pts: 0.172, reb: -1.394, ast: -0.964, stl: 0.421, blk: -0.55, tpm: -0.896, fgImpact: -0.522, ftImpact: -0.624, to: 0.145 } }
        ]
      }
    },
      {
      id: "401898401",
      line: "Orlando Magic 105 @ Cleveland Cavaliers 119 (Final)",
      completed: true,
      statusText: "Final",
      away: {
        abbr: "ORL", name: "Orlando Magic", score: 105,
        players: [
          { name: "Paolo Banchero", min: 18, pts: 10, reb: 7, ast: 2, stl: 0, blk: 1, to: 3, tpm: 1, fgm: 1, fga: 10, ftm: 7, fta: 10, composite: -3.68, zScores: { pts: 0.342, reb: 1.547, ast: 0.096, stl: -0.832, blk: 0.753, tpm: -0.051, fgImpact: -2.719, ftImpact: -1.185, to: -1.626 } },
          { name: "Franz Wagner", min: 15, pts: 10, reb: 5, ast: 3, stl: 0, blk: 0, to: 4, tpm: 1, fgm: 4, fga: 7, ftm: 1, fta: 1, composite: -1.06, zScores: { pts: 0.342, reb: 0.706, ast: 0.626, stl: -0.832, blk: -0.55, tpm: -0.051, fgImpact: 0.711, ftImpact: 0.497, to: -2.512 } },
          { name: "Tristan da Silva", min: 24, pts: 17, reb: 3, ast: 2, stl: 2, blk: 0, to: 1, tpm: 4, fgm: 6, fga: 14, ftm: 1, fta: 2, composite: 4.03, zScores: { pts: 1.533, reb: -0.134, ast: 0.096, stl: 1.674, blk: -0.55, tpm: 2.483, fgImpact: -0.162, ftImpact: -1.058, to: 0.145 } },
          { name: "Wendell Carter Jr.", min: 19, pts: 4, reb: 5, ast: 2, stl: 1, blk: 1, to: 1, tpm: 0, fgm: 2, fga: 4, ftm: 0, fta: 0, composite: 0.73, zScores: { pts: -0.679, reb: 0.706, ast: 0.096, stl: 0.421, blk: 0.753, tpm: -0.896, fgImpact: 0.18, ftImpact: 0, to: 0.145 } },
          { name: "Jase Richardson", min: 26, pts: 12, reb: 3, ast: 4, stl: 1, blk: 0, to: 2, tpm: 0, fgm: 5, fga: 9, ftm: 2, fta: 3, composite: 0.18, zScores: { pts: 0.682, reb: -0.134, ast: 1.156, stl: 0.421, blk: -0.55, tpm: -0.896, fgImpact: 0.801, ftImpact: -0.561, to: -0.741 } },
          { name: "Kevin Knox II", min: 12, pts: 7, reb: 1, ast: 0, stl: 0, blk: 0, to: 2, tpm: 1, fgm: 2, fga: 6, ftm: 2, fta: 3, composite: -5.36, zScores: { pts: -0.169, reb: -0.974, ast: -0.964, stl: -0.832, blk: -0.55, tpm: -0.051, fgImpact: -0.522, ftImpact: -0.561, to: -0.741 } },
          { name: "Jamal Cain", min: 19, pts: 11, reb: 3, ast: 1, stl: 1, blk: 0, to: 0, tpm: 1, fgm: 4, fga: 7, ftm: 2, fta: 2, composite: 2.5, zScores: { pts: 0.512, reb: -0.134, ast: -0.434, stl: 0.421, blk: -0.55, tpm: -0.051, fgImpact: 0.711, ftImpact: 0.995, to: 1.031 } },
          { name: "Malaki Branham", min: 11, pts: 7, reb: 3, ast: 1, stl: 1, blk: 0, to: 2, tpm: 1, fgm: 2, fga: 4, ftm: 2, fta: 2, composite: -0.48, zScores: { pts: -0.169, reb: -0.134, ast: -0.434, stl: 0.421, blk: -0.55, tpm: -0.051, fgImpact: 0.18, ftImpact: 0.995, to: -0.741 } },
          { name: "Noah Penda", min: 22, pts: 8, reb: 5, ast: 5, stl: 1, blk: 1, to: 1, tpm: 2, fgm: 3, fga: 8, ftm: 0, fta: 0, composite: 4.07, zScores: { pts: 0.001, reb: 0.706, ast: 1.685, stl: 0.421, blk: 0.753, tpm: 0.794, fgImpact: -0.432, ftImpact: 0, to: 0.145 } },
          { name: "Nikola Vucevic", min: 11, pts: 2, reb: 3, ast: 0, stl: 2, blk: 0, to: 0, tpm: 0, fgm: 1, fga: 6, ftm: 0, fta: 0, composite: -2.17, zScores: { pts: -1.019, reb: -0.134, ast: -0.964, stl: 1.674, blk: -0.55, tpm: -0.896, fgImpact: -1.314, ftImpact: 0, to: 1.031 } },
          { name: "Goga Bitadze", min: 12, pts: 7, reb: 2, ast: 0, stl: 1, blk: 0, to: 1, tpm: 0, fgm: 3, fga: 3, ftm: 1, fta: 2, composite: -2.3, zScores: { pts: -0.169, reb: -0.554, ast: -0.964, stl: 0.421, blk: -0.55, tpm: -0.896, fgImpact: 1.323, ftImpact: -1.058, to: 0.145 } },
          { name: "Colin Castleton", min: 6, pts: 2, reb: 2, ast: 0, stl: 0, blk: 0, to: 0, tpm: 0, fgm: 1, fga: 2, ftm: 0, fta: 0, composite: -3.69, zScores: { pts: -1.019, reb: -0.554, ast: -0.964, stl: -0.832, blk: -0.55, tpm: -0.896, fgImpact: 0.09, ftImpact: 0, to: 1.031 } },
          { name: "Jevon Carter", min: 19, pts: 2, reb: 2, ast: 4, stl: 1, blk: 0, to: 0, tpm: 0, fgm: 1, fga: 5, ftm: 0, fta: 0, composite: -1.38, zScores: { pts: -1.019, reb: -0.554, ast: 1.156, stl: 0.421, blk: -0.55, tpm: -0.896, fgImpact: -0.963, ftImpact: 0, to: 1.031 } },
          { name: "JD Davison", min: 12, pts: 6, reb: 1, ast: 3, stl: 1, blk: 0, to: 0, tpm: 2, fgm: 2, fga: 3, ftm: 0, fta: 0, composite: 1.54, zScores: { pts: -0.339, reb: -0.974, ast: 0.626, stl: 0.421, blk: -0.55, tpm: 0.794, fgImpact: 0.531, ftImpact: 0, to: 1.031 } },
          { name: "Alex Morales", min: 16, pts: 0, reb: 0, ast: 1, stl: 1, blk: 0, to: 1, tpm: 0, fgm: 0, fga: 3, ftm: 0, fta: 0, composite: -5.12, zScores: { pts: -1.36, reb: -1.394, ast: -0.434, stl: 0.421, blk: -0.55, tpm: -0.896, fgImpact: -1.053, ftImpact: 0, to: 0.145 } }
        ]
      },
      home: {
        abbr: "CLE", name: "Cleveland Cavaliers", score: 119,
        players: [
          { name: "Jarrett Allen", min: 25, pts: 7, reb: 7, ast: 1, stl: 0, blk: 2, to: 0, tpm: 1, fgm: 3, fga: 8, ftm: 0, fta: 0, composite: 2.72, zScores: { pts: -0.169, reb: 1.547, ast: -0.434, stl: -0.832, blk: 2.056, tpm: -0.051, fgImpact: -0.432, ftImpact: 0, to: 1.031 } },
          { name: "Evan Mobley", min: 27, pts: 14, reb: 7, ast: 2, stl: 0, blk: 2, to: 2, tpm: 0, fgm: 3, fga: 10, ftm: 8, fta: 9, composite: 3.54, zScores: { pts: 1.022, reb: 1.547, ast: 0.096, stl: -0.832, blk: 2.056, tpm: -0.896, fgImpact: -1.134, ftImpact: 2.424, to: -0.741 } },
          { name: "James Harden", min: 26, pts: 24, reb: 4, ast: 2, stl: 1, blk: 0, to: 2, tpm: 3, fgm: 7, fga: 10, ftm: 7, fta: 9, composite: 6.28, zScores: { pts: 2.724, reb: 0.286, ast: 0.096, stl: 0.421, blk: -0.55, tpm: 1.638, fgImpact: 2.034, ftImpact: 0.371, to: -0.741 } },
          { name: "Donovan Mitchell", min: 26, pts: 11, reb: 5, ast: 6, stl: 1, blk: 0, to: 3, tpm: 1, fgm: 3, fga: 9, ftm: 4, fta: 5, composite: 1.28, zScores: { pts: 0.512, reb: 0.706, ast: 2.215, stl: 0.421, blk: -0.55, tpm: -0.051, fgImpact: -0.783, ftImpact: 0.434, to: -1.626 } },
          { name: "Peyton Watson", min: 22, pts: 6, reb: 4, ast: 1, stl: 2, blk: 0, to: 1, tpm: 0, fgm: 3, fga: 10, ftm: 0, fta: 0, composite: -1.25, zScores: { pts: -0.339, reb: 0.286, ast: -0.434, stl: 1.674, blk: -0.55, tpm: -0.896, fgImpact: -1.134, ftImpact: 0, to: 0.145 } },
          { name: "Mario Hezonja", min: 17, pts: 13, reb: 5, ast: 2, stl: 2, blk: 2, to: 3, tpm: 2, fgm: 5, fga: 9, ftm: 1, fta: 1, composite: 5.85, zScores: { pts: 0.852, reb: 0.706, ast: 0.096, stl: 1.674, blk: 2.056, tpm: 0.794, fgImpact: 0.801, ftImpact: 0.497, to: -1.626 } },
          { name: "Tristan Enaruna", min: 8, pts: 5, reb: 3, ast: 0, stl: 0, blk: 0, to: 1, tpm: 1, fgm: 1, fga: 1, ftm: 2, fta: 2, composite: -1.46, zScores: { pts: -0.509, reb: -0.134, ast: -0.964, stl: -0.832, blk: -0.55, tpm: -0.051, fgImpact: 0.441, ftImpact: 0.995, to: 0.145 } },
          { name: "Thomas Bryant", min: 7, pts: 12, reb: 4, ast: 0, stl: 0, blk: 0, to: 1, tpm: 2, fgm: 5, fga: 6, ftm: 0, fta: 0, composite: 1.42, zScores: { pts: 0.682, reb: 0.286, ast: -0.964, stl: -0.832, blk: -0.55, tpm: 0.794, fgImpact: 1.854, ftImpact: 0, to: 0.145 } },
          { name: "Ernest Udeh Jr.", min: 5, pts: 2, reb: 1, ast: 0, stl: 0, blk: 0, to: 1, tpm: 0, fgm: 1, fga: 1, ftm: 0, fta: 0, composite: -4.65, zScores: { pts: -1.019, reb: -0.974, ast: -0.964, stl: -0.832, blk: -0.55, tpm: -0.896, fgImpact: 0.441, ftImpact: 0, to: 0.145 } },
          { name: "Sam Merrill", min: 18, pts: 5, reb: 4, ast: 3, stl: 0, blk: 0, to: 2, tpm: 1, fgm: 1, fga: 2, ftm: 2, fta: 2, composite: -0.69, zScores: { pts: -0.509, reb: 0.286, ast: 0.626, stl: -0.832, blk: -0.55, tpm: -0.051, fgImpact: 0.09, ftImpact: 0.995, to: -0.741 } },
          { name: "Jaylon Tyson", min: 21, pts: 13, reb: 2, ast: 1, stl: 0, blk: 0, to: 1, tpm: 3, fgm: 4, fga: 8, ftm: 2, fta: 2, composite: 1.62, zScores: { pts: 0.852, reb: -0.554, ast: -0.434, stl: -0.832, blk: -0.55, tpm: 1.638, fgImpact: 0.36, ftImpact: 0.995, to: 0.145 } },
          { name: "Craig Porter Jr.", min: 13, pts: 0, reb: 1, ast: 4, stl: 1, blk: 0, to: 1, tpm: 0, fgm: 0, fga: 2, ftm: 0, fta: 0, composite: -2.76, zScores: { pts: -1.36, reb: -0.974, ast: 1.156, stl: 0.421, blk: -0.55, tpm: -0.896, fgImpact: -0.702, ftImpact: 0, to: 0.145 } },
          { name: "Tyrese Proctor", min: 8, pts: 3, reb: 1, ast: 0, stl: 1, blk: 0, to: 1, tpm: 1, fgm: 1, fga: 3, ftm: 0, fta: 0, composite: -3.08, zScores: { pts: -0.849, reb: -0.974, ast: -0.964, stl: 0.421, blk: -0.55, tpm: -0.051, fgImpact: -0.261, ftImpact: 0, to: 0.145 } },
          { name: "Meleek Thomas", min: 18, pts: 4, reb: 1, ast: 2, stl: 2, blk: 1, to: 1, tpm: 0, fgm: 2, fga: 7, ftm: 0, fta: 0, composite: -0.75, zScores: { pts: -0.679, reb: -0.974, ast: 0.096, stl: 1.674, blk: 0.753, tpm: -0.896, fgImpact: -0.873, ftImpact: 0, to: 0.145 } }
        ]
      }
    },
      {
      id: "401901821",
      line: "Milwaukee Bucks 90 @ Charlotte Hornets 105 (Final)",
      completed: true,
      statusText: "Final",
      away: {
        abbr: "MIL", name: "Milwaukee Bucks", score: 90,
        players: [
          { name: "Kyle Kuzma", min: 22, pts: 12, reb: 4, ast: 2, stl: 2, blk: 0, to: 2, tpm: 2, fgm: 4, fga: 8, ftm: 2, fta: 4, composite: 0.48, zScores: { pts: 0.682, reb: 0.286, ast: 0.096, stl: 1.674, blk: -0.55, tpm: 0.794, fgImpact: 0.36, ftImpact: -2.116, to: -0.741 } },
          { name: "Jaime Jaquez Jr.", min: 20, pts: 9, reb: 7, ast: 4, stl: 0, blk: 0, to: 0, tpm: 2, fgm: 3, fga: 6, ftm: 1, fta: 2, composite: 2.53, zScores: { pts: 0.172, reb: 1.547, ast: 1.156, stl: -0.832, blk: -0.55, tpm: 0.794, fgImpact: 0.27, ftImpact: -1.058, to: 1.031 } },
          { name: "Myles Turner", min: 24, pts: 5, reb: 2, ast: 0, stl: 1, blk: 5, to: 4, tpm: 1, fgm: 2, fga: 7, ftm: 0, fta: 0, composite: 0.92, zScores: { pts: -0.509, reb: -0.554, ast: -0.964, stl: 0.421, blk: 5.966, tpm: -0.051, fgImpact: -0.873, ftImpact: 0, to: -2.512 } },
          { name: "Tyler Herro", min: 23, pts: 18, reb: 7, ast: 2, stl: 0, blk: 0, to: 1, tpm: 3, fgm: 6, fga: 13, ftm: 3, fta: 3, composite: 5.43, zScores: { pts: 1.703, reb: 1.547, ast: 0.096, stl: -0.832, blk: -0.55, tpm: 1.638, fgImpact: 0.189, ftImpact: 1.492, to: 0.145 } },
          { name: "Ryan Rollins", min: 23, pts: 12, reb: 4, ast: 2, stl: 3, blk: 2, to: 0, tpm: 2, fgm: 5, fga: 15, ftm: 0, fta: 0, composite: 6.57, zScores: { pts: 0.682, reb: 0.286, ast: 0.096, stl: 2.927, blk: 2.056, tpm: 0.794, fgImpact: -1.305, ftImpact: 0, to: 1.031 } },
          { name: "Pete Nance", min: 7, pts: 3, reb: 4, ast: 1, stl: 0, blk: 1, to: 0, tpm: 0, fgm: 1, fga: 2, ftm: 1, fta: 2, composite: -1.91, zScores: { pts: -0.849, reb: 0.286, ast: -0.434, stl: -0.832, blk: 0.753, tpm: -0.896, fgImpact: 0.09, ftImpact: -1.058, to: 1.031 } },
          { name: "Jericho Sims", min: 15, pts: 6, reb: 6, ast: 1, stl: 0, blk: 0, to: 1, tpm: 0, fgm: 3, fga: 3, ftm: 0, fta: 0, composite: -0.46, zScores: { pts: -0.339, reb: 1.126, ast: -0.434, stl: -0.832, blk: -0.55, tpm: -0.896, fgImpact: 1.323, ftImpact: 0, to: 0.145 } },
          { name: "Jake Stephens", min: 3, pts: 3, reb: 2, ast: 0, stl: 0, blk: 0, to: 0, tpm: 1, fgm: 1, fga: 2, ftm: 0, fta: 0, composite: -2.68, zScores: { pts: -0.849, reb: -0.554, ast: -0.964, stl: -0.832, blk: -0.55, tpm: -0.051, fgImpact: 0.09, ftImpact: 0, to: 1.031 } },
          { name: "Kel'el Ware", min: 24, pts: 10, reb: 2, ast: 1, stl: 0, blk: 0, to: 1, tpm: 2, fgm: 4, fga: 9, ftm: 0, fta: 0, composite: -1.08, zScores: { pts: 0.342, reb: -0.554, ast: -0.434, stl: -0.832, blk: -0.55, tpm: 0.794, fgImpact: 0.009, ftImpact: 0, to: 0.145 } },
          { name: "Caris LeVert", min: 18, pts: 0, reb: 1, ast: 2, stl: 1, blk: 0, to: 1, tpm: 0, fgm: 0, fga: 3, ftm: 0, fta: 2, composite: -7.28, zScores: { pts: -1.36, reb: -0.974, ast: 0.096, stl: 0.421, blk: -0.55, tpm: -0.896, fgImpact: -1.053, ftImpact: -3.111, to: 0.145 } },
          { name: "Gary Trent Jr.", min: 14, pts: 0, reb: 2, ast: 0, stl: 1, blk: 0, to: 1, tpm: 0, fgm: 0, fga: 8, ftm: 0, fta: 0, composite: -6.57, zScores: { pts: -1.36, reb: -0.554, ast: -0.964, stl: 0.421, blk: -0.55, tpm: -0.896, fgImpact: -2.809, ftImpact: 0, to: 0.145 } },
          { name: "Kevin Porter Jr.", min: 18, pts: 6, reb: 4, ast: 4, stl: 2, blk: 0, to: 1, tpm: 0, fgm: 1, fga: 6, ftm: 4, fta: 6, composite: -0.96, zScores: { pts: -0.339, reb: 0.286, ast: 1.156, stl: 1.674, blk: -0.55, tpm: -0.896, fgImpact: -1.314, ftImpact: -1.121, to: 0.145 } },
          { name: "AJ Green", min: 22, pts: 6, reb: 2, ast: 4, stl: 0, blk: 0, to: 1, tpm: 2, fgm: 2, fga: 5, ftm: 0, fta: 0, composite: -0.35, zScores: { pts: -0.339, reb: -0.554, ast: 1.156, stl: -0.832, blk: -0.55, tpm: 0.794, fgImpact: -0.171, ftImpact: 0, to: 0.145 } },
          { name: "Kam Jones", min: 7, pts: 0, reb: 1, ast: 0, stl: 0, blk: 0, to: 0, tpm: 0, fgm: 0, fga: 2, ftm: 0, fta: 0, composite: -5.25, zScores: { pts: -1.36, reb: -0.974, ast: -0.964, stl: -0.832, blk: -0.55, tpm: -0.896, fgImpact: -0.702, ftImpact: 0, to: 1.031 } }
        ]
      },
      home: {
        abbr: "CHA", name: "Charlotte Hornets", score: 105,
        players: [
          { name: "Moussa Diabate", min: 20, pts: 8, reb: 11, ast: 2, stl: 1, blk: 2, to: 1, tpm: 0, fgm: 3, fga: 5, ftm: 2, fta: 4, composite: 3.56, zScores: { pts: 0.001, reb: 3.227, ast: 0.096, stl: 0.421, blk: 2.056, tpm: -0.896, fgImpact: 0.621, ftImpact: -2.116, to: 0.145 } },
          { name: "Brandon Miller", min: 23, pts: 18, reb: 3, ast: 4, stl: 0, blk: 1, to: 4, tpm: 4, fgm: 6, fga: 15, ftm: 2, fta: 2, composite: 3.1, zScores: { pts: 1.703, reb: -0.134, ast: 1.156, stl: -0.832, blk: 0.753, tpm: 2.483, fgImpact: -0.513, ftImpact: 0.995, to: -2.512 } },
          { name: "Naz Reid", min: 20, pts: 16, reb: 2, ast: 1, stl: 0, blk: 1, to: 0, tpm: 2, fgm: 7, fga: 14, ftm: 0, fta: 0, composite: 2.75, zScores: { pts: 1.363, reb: -0.554, ast: -0.434, stl: -0.832, blk: 0.753, tpm: 0.794, fgImpact: 0.63, ftImpact: 0, to: 1.031 } },
          { name: "Dennis Schroder", min: 17, pts: 3, reb: 3, ast: 4, stl: 0, blk: 0, to: 1, tpm: 1, fgm: 1, fga: 2, ftm: 0, fta: 0, composite: -1.03, zScores: { pts: -0.849, reb: -0.134, ast: 1.156, stl: -0.832, blk: -0.55, tpm: -0.051, fgImpact: 0.09, ftImpact: 0, to: 0.145 } },
          { name: "Liam McNeeley", min: 27, pts: 11, reb: 0, ast: 5, stl: 2, blk: 0, to: 0, tpm: 3, fgm: 4, fga: 11, ftm: 0, fta: 0, composite: 3.9, zScores: { pts: 0.512, reb: -1.394, ast: 1.685, stl: 1.674, blk: -0.55, tpm: 1.638, fgImpact: -0.693, ftImpact: 0, to: 1.031 } },
          { name: "Royce O'Neale", min: 17, pts: 9, reb: 1, ast: 1, stl: 1, blk: 0, to: 1, tpm: 1, fgm: 4, fga: 7, ftm: 0, fta: 0, composite: -0.56, zScores: { pts: 0.172, reb: -0.974, ast: -0.434, stl: 0.421, blk: -0.55, tpm: -0.051, fgImpact: 0.711, ftImpact: 0, to: 0.145 } },
          { name: "Wyatt Fricks", min: 3, pts: 0, reb: 0, ast: 0, stl: 0, blk: 0, to: 1, tpm: 0, fgm: 0, fga: 1, ftm: 0, fta: 0, composite: -6.2, zScores: { pts: -1.36, reb: -1.394, ast: -0.964, stl: -0.832, blk: -0.55, tpm: -0.896, fgImpact: -0.351, ftImpact: 0, to: 0.145 } },
          { name: "Tidjane Salaun", min: 23, pts: 5, reb: 7, ast: 1, stl: 0, blk: 0, to: 0, tpm: 1, fgm: 1, fga: 8, ftm: 2, fta: 2, composite: -0.82, zScores: { pts: -0.509, reb: 1.547, ast: -0.434, stl: -0.832, blk: -0.55, tpm: -0.051, fgImpact: -2.016, ftImpact: 0.995, to: 1.031 } },
          { name: "Hannes Steinbach", min: 12, pts: 8, reb: 5, ast: 1, stl: 0, blk: 0, to: 1, tpm: 0, fgm: 4, fga: 10, ftm: 0, fta: 0, composite: -2.2, zScores: { pts: 0.001, reb: 0.706, ast: -0.434, stl: -0.832, blk: -0.55, tpm: -0.896, fgImpact: -0.342, ftImpact: 0, to: 0.145 } },
          { name: "Ryan Kalkbrenner", min: 12, pts: 4, reb: 5, ast: 0, stl: 0, blk: 0, to: 0, tpm: 0, fgm: 2, fga: 2, ftm: 0, fta: 0, composite: -1.3, zScores: { pts: -0.679, reb: 0.706, ast: -0.964, stl: -0.832, blk: -0.55, tpm: -0.896, fgImpact: 0.882, ftImpact: 0, to: 1.031 } },
          { name: "PJ Hall", min: 9, pts: 4, reb: 4, ast: 0, stl: 0, blk: 1, to: 0, tpm: 0, fgm: 2, fga: 6, ftm: 0, fta: 0, composite: -1.82, zScores: { pts: -0.679, reb: 0.286, ast: -0.964, stl: -0.832, blk: 0.753, tpm: -0.896, fgImpact: -0.522, ftImpact: 0, to: 1.031 } },
          { name: "Pat Connaughton", min: 12, pts: 1, reb: 3, ast: 1, stl: 0, blk: 0, to: 2, tpm: 0, fgm: 0, fga: 2, ftm: 1, fta: 2, composite: -6.54, zScores: { pts: -1.19, reb: -0.134, ast: -0.434, stl: -0.832, blk: -0.55, tpm: -0.896, fgImpact: -0.702, ftImpact: -1.058, to: -0.741 } },
          { name: "Jarkel Joiner", min: 12, pts: 4, reb: 2, ast: 2, stl: 0, blk: 0, to: 1, tpm: 1, fgm: 1, fga: 2, ftm: 1, fta: 2, composite: -3.39, zScores: { pts: -0.679, reb: -0.554, ast: 0.096, stl: -0.832, blk: -0.55, tpm: -0.051, fgImpact: 0.09, ftImpact: -1.058, to: 0.145 } },
          { name: "Sion James", min: 21, pts: 11, reb: 5, ast: 4, stl: 0, blk: 0, to: 2, tpm: 3, fgm: 3, fga: 4, ftm: 2, fta: 2, composite: 3.86, zScores: { pts: 0.512, reb: 0.706, ast: 1.156, stl: -0.832, blk: -0.55, tpm: 1.638, fgImpact: 0.972, ftImpact: 0.995, to: -0.741 } },
          { name: "Michael Ajayi", min: 12, pts: 3, reb: 3, ast: 3, stl: 1, blk: 0, to: 0, tpm: 1, fgm: 1, fga: 3, ftm: 0, fta: 0, composite: 0.23, zScores: { pts: -0.849, reb: -0.134, ast: 0.626, stl: 0.421, blk: -0.55, tpm: -0.051, fgImpact: -0.261, ftImpact: 0, to: 1.031 } }
        ]
      }
    },
      {
      id: "401908941",
      line: "Chicago Bulls 128 @ Denver Nuggets 133 (Final)",
      completed: true,
      statusText: "Final",
      away: {
        abbr: "CHI", name: "Chicago Bulls", score: 128,
        players: [
          { name: "Jalen Smith", min: 14, pts: 11, reb: 3, ast: 0, stl: 1, blk: 0, to: 1, tpm: 3, fgm: 4, fga: 6, ftm: 0, fta: 0, composite: 2.13, zScores: { pts: 0.512, reb: -0.134, ast: -0.964, stl: 0.421, blk: -0.55, tpm: 1.638, fgImpact: 1.062, ftImpact: 0, to: 0.145 } },
          { name: "Isaac Okoro", min: 13, pts: 5, reb: 1, ast: 0, stl: 1, blk: 0, to: 1, tpm: 1, fgm: 2, fga: 2, ftm: 0, fta: 0, composite: -1.6, zScores: { pts: -0.509, reb: -0.974, ast: -0.964, stl: 0.421, blk: -0.55, tpm: -0.051, fgImpact: 0.882, ftImpact: 0, to: 0.145 } },
          { name: "Matas Buzelis", min: 23, pts: 13, reb: 6, ast: 3, stl: 0, blk: 1, to: 2, tpm: 2, fgm: 5, fga: 10, ftm: 1, fta: 2, composite: 1.97, zScores: { pts: 0.852, reb: 1.126, ast: 0.626, stl: -0.832, blk: 0.753, tpm: 0.794, fgImpact: 0.45, ftImpact: -1.058, to: -0.741 } },
          { name: "Caleb Wilson", min: 25, pts: 17, reb: 4, ast: 5, stl: 0, blk: 1, to: 5, tpm: 1, fgm: 6, fga: 10, ftm: 4, fta: 7, composite: -1.46, zScores: { pts: 1.533, reb: 0.286, ast: 1.685, stl: -0.832, blk: 0.753, tpm: -0.051, fgImpact: 1.242, ftImpact: -2.677, to: -3.398 } },
          { name: "Josh Giddey", min: 24, pts: 7, reb: 1, ast: 8, stl: 1, blk: 1, to: 1, tpm: 1, fgm: 1, fga: 3, ftm: 4, fta: 4, composite: 5.13, zScores: { pts: -0.169, reb: -0.974, ast: 3.275, stl: 0.421, blk: 0.753, tpm: -0.051, fgImpact: -0.261, ftImpact: 1.99, to: 0.145 } },
          { name: "Drew Peterson", min: 7, pts: 3, reb: 0, ast: 1, stl: 0, blk: 0, to: 1, tpm: 1, fgm: 1, fga: 2, ftm: 0, fta: 0, composite: -3.88, zScores: { pts: -0.849, reb: -1.394, ast: -0.434, stl: -0.832, blk: -0.55, tpm: -0.051, fgImpact: 0.09, ftImpact: 0, to: 0.145 } },
          { name: "Patrick Williams", min: 16, pts: 6, reb: 4, ast: 3, stl: 0, blk: 0, to: 0, tpm: 0, fgm: 3, fga: 8, ftm: 0, fta: 0, composite: -1.11, zScores: { pts: -0.339, reb: 0.286, ast: 0.626, stl: -0.832, blk: -0.55, tpm: -0.896, fgImpact: -0.432, ftImpact: 0, to: 1.031 } },
          { name: "Jalen Bridges", min: 7, pts: 3, reb: 2, ast: 0, stl: 0, blk: 0, to: 0, tpm: 1, fgm: 1, fga: 5, ftm: 0, fta: 0, composite: -3.73, zScores: { pts: -0.849, reb: -0.554, ast: -0.964, stl: -0.832, blk: -0.55, tpm: -0.051, fgImpact: -0.963, ftImpact: 0, to: 1.031 } },
          { name: "Leonard Miller", min: 22, pts: 26, reb: 7, ast: 2, stl: 0, blk: 0, to: 1, tpm: 4, fgm: 11, fga: 14, ftm: 0, fta: 0, composite: 9.75, zScores: { pts: 3.064, reb: 1.547, ast: 0.096, stl: -0.832, blk: -0.55, tpm: 2.483, fgImpact: 3.799, ftImpact: 0, to: 0.145 } },
          { name: "Noa Essengue", min: 23, pts: 8, reb: 6, ast: 2, stl: 1, blk: 0, to: 1, tpm: 0, fgm: 4, fga: 9, ftm: 0, fta: 0, composite: 0.35, zScores: { pts: 0.001, reb: 1.126, ast: 0.096, stl: 0.421, blk: -0.55, tpm: -0.896, fgImpact: 0.009, ftImpact: 0, to: 0.145 } },
          { name: "Orlando Robinson", min: 12, pts: 8, reb: 6, ast: 2, stl: 0, blk: 1, to: 1, tpm: 1, fgm: 3, fga: 5, ftm: 1, fta: 2, composite: 0.8, zScores: { pts: 0.001, reb: 1.126, ast: 0.096, stl: -0.832, blk: 0.753, tpm: -0.051, fgImpact: 0.621, ftImpact: -1.058, to: 0.145 } },
          { name: "Buddy Hield", min: 19, pts: 15, reb: 3, ast: 1, stl: 2, blk: 0, to: 1, tpm: 4, fgm: 4, fga: 7, ftm: 3, fta: 3, composite: 6.58, zScores: { pts: 1.192, reb: -0.134, ast: -0.434, stl: 1.674, blk: -0.55, tpm: 2.483, fgImpact: 0.711, ftImpact: 1.492, to: 0.145 } },
          { name: "Tre Jones", min: 10, pts: 0, reb: 1, ast: 5, stl: 1, blk: 0, to: 0, tpm: 0, fgm: 0, fga: 3, ftm: 0, fta: 0, composite: -1.7, zScores: { pts: -1.36, reb: -0.974, ast: 1.685, stl: 0.421, blk: -0.55, tpm: -0.896, fgImpact: -1.053, ftImpact: 0, to: 1.031 } },
          { name: "Jordan Hawkins", min: 10, pts: 6, reb: 0, ast: 0, stl: 0, blk: 0, to: 1, tpm: 2, fgm: 2, fga: 5, ftm: 0, fta: 0, composite: -3.31, zScores: { pts: -0.339, reb: -1.394, ast: -0.964, stl: -0.832, blk: -0.55, tpm: 0.794, fgImpact: -0.171, ftImpact: 0, to: 0.145 } },
          { name: "Dailyn Swain", min: 15, pts: 0, reb: 1, ast: 2, stl: 1, blk: 1, to: 2, tpm: 0, fgm: 0, fga: 4, ftm: 0, fta: 0, composite: -4.1, zScores: { pts: -1.36, reb: -0.974, ast: 0.096, stl: 0.421, blk: 0.753, tpm: -0.896, fgImpact: -1.404, ftImpact: 0, to: -0.741 } }
        ]
      },
      home: {
        abbr: "DEN", name: "Denver Nuggets", score: 133,
        players: [
          { name: "Aaron Gordon", min: 23, pts: 25, reb: 6, ast: 0, stl: 0, blk: 0, to: 2, tpm: 3, fgm: 9, fga: 12, ftm: 4, fta: 5, composite: 5.92, zScores: { pts: 2.894, reb: 1.126, ast: -0.964, stl: -0.832, blk: -0.55, tpm: 1.638, fgImpact: 2.916, ftImpact: 0.434, to: -0.741 } },
          { name: "Cameron Johnson", min: 25, pts: 15, reb: 3, ast: 1, stl: 2, blk: 0, to: 1, tpm: 4, fgm: 5, fga: 7, ftm: 1, fta: 2, composite: 4.82, zScores: { pts: 1.192, reb: -0.134, ast: -0.434, stl: 1.674, blk: -0.55, tpm: 2.483, fgImpact: 1.503, ftImpact: -1.058, to: 0.145 } },
          { name: "Nikola Jokic", min: 26, pts: 22, reb: 11, ast: 10, stl: 0, blk: 1, to: 4, tpm: 1, fgm: 8, fga: 12, ftm: 5, fta: 7, composite: 8.8, zScores: { pts: 2.384, reb: 3.227, ast: 4.335, stl: -0.832, blk: 0.753, tpm: -0.051, fgImpact: 2.124, ftImpact: -0.624, to: -2.512 } },
          { name: "Jamal Murray", min: 26, pts: 13, reb: 3, ast: 5, stl: 0, blk: 0, to: 2, tpm: 1, fgm: 4, fga: 11, ftm: 4, fta: 4, composite: 1.53, zScores: { pts: 0.852, reb: -0.134, ast: 1.685, stl: -0.832, blk: -0.55, tpm: -0.051, fgImpact: -0.693, ftImpact: 1.99, to: -0.741 } },
          { name: "Christian Braun", min: 23, pts: 2, reb: 5, ast: 1, stl: 1, blk: 2, to: 0, tpm: 0, fgm: 1, fga: 6, ftm: 0, fta: 0, composite: 0.55, zScores: { pts: -1.019, reb: 0.706, ast: -0.434, stl: 0.421, blk: 2.056, tpm: -0.896, fgImpact: -1.314, ftImpact: 0, to: 1.031 } },
          { name: "Alpha Diallo", min: 13, pts: 2, reb: 4, ast: 0, stl: 3, blk: 0, to: 0, tpm: 0, fgm: 1, fga: 5, ftm: 0, fta: 0, composite: -0.15, zScores: { pts: -1.019, reb: 0.286, ast: -0.964, stl: 2.927, blk: -0.55, tpm: -0.896, fgImpact: -0.963, ftImpact: 0, to: 1.031 } },
          { name: "Zeke Nnaji", min: 7, pts: 4, reb: 1, ast: 0, stl: 0, blk: 0, to: 1, tpm: 0, fgm: 1, fga: 3, ftm: 2, fta: 4, composite: -7.13, zScores: { pts: -0.679, reb: -0.974, ast: -0.964, stl: -0.832, blk: -0.55, tpm: -0.896, fgImpact: -0.261, ftImpact: -2.116, to: 0.145 } },
          { name: "DaRon Holmes II", min: 15, pts: 11, reb: 5, ast: 1, stl: 0, blk: 0, to: 1, tpm: 1, fgm: 3, fga: 5, ftm: 4, fta: 8, composite: -4.12, zScores: { pts: 0.512, reb: 0.706, ast: -0.434, stl: -0.832, blk: -0.55, tpm: -0.051, fgImpact: 0.621, ftImpact: -4.232, to: 0.145 } },
          { name: "Bryce Hopkins", min: 16, pts: 10, reb: 1, ast: 1, stl: 0, blk: 0, to: 1, tpm: 0, fgm: 2, fga: 3, ftm: 6, fta: 8, composite: -2.79, zScores: { pts: 0.342, reb: -0.974, ast: -0.434, stl: -0.832, blk: -0.55, tpm: -0.896, fgImpact: 0.531, ftImpact: -0.127, to: 0.145 } },
          { name: "Trevon Brazile", min: 9, pts: 3, reb: 5, ast: 0, stl: 0, blk: 1, to: 0, tpm: 0, fgm: 1, fga: 1, ftm: 1, fta: 2, composite: -1.67, zScores: { pts: -0.849, reb: 0.706, ast: -0.964, stl: -0.832, blk: 0.753, tpm: -0.896, fgImpact: 0.441, ftImpact: -1.058, to: 1.031 } },
          { name: "Cam Whitmore", min: 9, pts: 4, reb: 0, ast: 1, stl: 0, blk: 0, to: 0, tpm: 0, fgm: 1, fga: 2, ftm: 2, fta: 2, composite: -2.67, zScores: { pts: -0.679, reb: -1.394, ast: -0.434, stl: -0.832, blk: -0.55, tpm: -0.896, fgImpact: 0.09, ftImpact: 0.995, to: 1.031 } },
          { name: "DeMar DeRozan", min: 9, pts: 2, reb: 2, ast: 2, stl: 0, blk: 0, to: 0, tpm: 0, fgm: 0, fga: 4, ftm: 2, fta: 2, composite: -3.13, zScores: { pts: -1.019, reb: -0.554, ast: 0.096, stl: -0.832, blk: -0.55, tpm: -0.896, fgImpact: -1.404, ftImpact: 0.995, to: 1.031 } },
          { name: "Tyus Jones", min: 13, pts: 4, reb: 0, ast: 2, stl: 2, blk: 0, to: 0, tpm: 0, fgm: 2, fga: 3, ftm: 0, fta: 0, composite: -0.19, zScores: { pts: -0.679, reb: -1.394, ast: 0.096, stl: 1.674, blk: -0.55, tpm: -0.896, fgImpact: 0.531, ftImpact: 0, to: 1.031 } },
          { name: "Julian Strawther", min: 17, pts: 13, reb: 2, ast: 0, stl: 1, blk: 0, to: 2, tpm: 3, fgm: 5, fga: 12, ftm: 0, fta: 0, composite: -0.15, zScores: { pts: 0.852, reb: -0.554, ast: -0.964, stl: 0.421, blk: -0.55, tpm: 1.638, fgImpact: -0.252, ftImpact: 0, to: -0.741 } },
          { name: "Ryan Nembhard", min: 9, pts: 3, reb: 0, ast: 2, stl: 0, blk: 0, to: 1, tpm: 0, fgm: 1, fga: 1, ftm: 1, fta: 2, composite: -4.9, zScores: { pts: -0.849, reb: -1.394, ast: 0.096, stl: -0.832, blk: -0.55, tpm: -0.896, fgImpact: 0.441, ftImpact: -1.058, to: 0.145 } }
        ]
      }
    }
    ]
  },
    "2026-10-12": {
    games: [
      {
      id: "401914130",
      line: "London Lions 66 @ Portland Trail Blazers 119 (Final)",
      completed: true,
      statusText: "Final",
      away: {
        abbr: "LON", name: "London Lions", score: 66,
        players: [
          { name: "Maxwell Lewis", min: 22, pts: 13, reb: 5, ast: 0, stl: 4, blk: 1, to: 4, tpm: 2, fgm: 4, fga: 8, ftm: 3, fta: 4, composite: 3.33, zScores: { pts: 0.81, reb: 0.763, ast: -0.914, stl: 2.775, blk: 0.978, tpm: 0.796, fgImpact: 0.208, ftImpact: -0.275, to: -1.808 } },
          { name: "Joel Scott", min: 26, pts: 8, reb: 1, ast: 1, stl: 0, blk: 1, to: 1, tpm: 0, fgm: 3, fga: 10, ftm: 2, fta: 4, composite: -4.97, zScores: { pts: -0.013, reb: -0.71, ast: -0.429, stl: -0.771, blk: 0.978, tpm: -0.796, fgImpact: -1.321, ftImpact: -2.168, to: 0.254 } },
          { name: "Keenan Evans", min: 20, pts: 7, reb: 3, ast: 1, stl: 0, blk: 0, to: 1, tpm: 1, fgm: 3, fga: 5, ftm: 0, fta: 0, composite: -1.09, zScores: { pts: -0.178, reb: 0.027, ast: -0.429, stl: -0.771, blk: -0.522, tpm: 0, fgImpact: 0.525, ftImpact: 0, to: 0.254 } },
          { name: "Tarik Phillip", min: 18, pts: 3, reb: 0, ast: 2, stl: 2, blk: 0, to: 4, tpm: 0, fgm: 0, fga: 8, ftm: 3, fta: 4, composite: -7.21, zScores: { pts: -0.836, reb: -1.078, ast: 0.056, stl: 1.002, blk: -0.522, tpm: -0.796, fgImpact: -2.954, ftImpact: -0.275, to: -1.808 } },
          { name: "Thomas Kennedy", min: 20, pts: 4, reb: 6, ast: 3, stl: 1, blk: 0, to: 3, tpm: 0, fgm: 2, fga: 7, ftm: 0, fta: 0, composite: -2.32, zScores: { pts: -0.671, reb: 1.132, ast: 0.541, stl: 0.116, blk: -0.522, tpm: -0.796, fgImpact: -1.004, ftImpact: 0, to: -1.121 } },
          { name: "Mo Soluade", min: 24, pts: 2, reb: 3, ast: 0, stl: 0, blk: 0, to: 1, tpm: 0, fgm: 1, fga: 4, ftm: 0, fta: 1, composite: -5.9, zScores: { pts: -1, reb: 0.027, ast: -0.914, stl: -0.771, blk: -0.522, tpm: -0.796, fgImpact: -0.687, ftImpact: -1.489, to: 0.254 } },
          { name: "Deane Williams", min: 21, pts: 4, reb: 3, ast: 0, stl: 2, blk: 0, to: 1, tpm: 0, fgm: 1, fga: 6, ftm: 2, fta: 2, composite: -2.24, zScores: { pts: -0.671, reb: 0.027, ast: -0.914, stl: 1.002, blk: -0.522, tpm: -0.796, fgImpact: -1.425, ftImpact: 0.809, to: 0.254 } },
          { name: "Devante Adams", min: 24, pts: 12, reb: 2, ast: 4, stl: 2, blk: 1, to: 5, tpm: 2, fgm: 5, fga: 12, ftm: 0, fta: 0, composite: 1.13, zScores: { pts: 0.645, reb: -0.342, ast: 1.027, stl: 1.002, blk: 0.978, tpm: 0.796, fgImpact: -0.479, ftImpact: 0, to: -2.495 } },
          { name: "Ethan Price", min: 23, pts: 8, reb: 2, ast: 2, stl: 0, blk: 0, to: 2, tpm: 2, fgm: 3, fga: 4, ftm: 0, fta: 0, composite: -0.33, zScores: { pts: -0.013, reb: -0.342, ast: 0.056, stl: -0.771, blk: -0.522, tpm: 0.796, fgImpact: 0.894, ftImpact: 0, to: -0.433 } },
          { name: "Joshua O'Garro", min: 11, pts: 0, reb: 2, ast: 0, stl: 0, blk: 0, to: 0, tpm: 0, fgm: 0, fga: 1, ftm: 0, fta: 0, composite: -4.1, zScores: { pts: -1.33, reb: -0.342, ast: -0.914, stl: -0.771, blk: -0.522, tpm: -0.796, fgImpact: -0.369, ftImpact: 0, to: 0.941 } },
          { name: "Emilis Zibuda", min: 6, pts: 0, reb: 1, ast: 0, stl: 0, blk: 0, to: 0, tpm: 0, fgm: 0, fga: 4, ftm: 0, fta: 0, composite: -5.58, zScores: { pts: -1.33, reb: -0.71, ast: -0.914, stl: -0.771, blk: -0.522, tpm: -0.796, fgImpact: -1.477, ftImpact: 0, to: 0.941 } },
          { name: "Landrius Horton", min: 25, pts: 5, reb: 4, ast: 2, stl: 2, blk: 0, to: 0, tpm: 0, fgm: 1, fga: 7, ftm: 3, fta: 3, composite: -0.01, zScores: { pts: -0.507, reb: 0.395, ast: 0.056, stl: 1.002, blk: -0.522, tpm: -0.796, fgImpact: -1.794, ftImpact: 1.214, to: 0.941 } }
        ]
      },
      home: {
        abbr: "POR", name: "Portland Trail Blazers", score: 119,
        players: [
          { name: "Toumani Camara", min: 15, pts: 14, reb: 2, ast: 3, stl: 1, blk: 0, to: 1, tpm: 2, fgm: 4, fga: 7, ftm: 4, fta: 4, composite: 4.01, zScores: { pts: 0.974, reb: -0.342, ast: 0.541, stl: 0.116, blk: -0.522, tpm: 0.796, fgImpact: 0.577, ftImpact: 1.618, to: 0.254 } },
          { name: "Deni Avdija", min: 17, pts: 9, reb: 5, ast: 4, stl: 0, blk: 0, to: 2, tpm: 1, fgm: 3, fga: 4, ftm: 2, fta: 3, composite: 0.43, zScores: { pts: 0.151, reb: 0.763, ast: 1.027, stl: -0.771, blk: -0.522, tpm: 0, fgImpact: 0.894, ftImpact: -0.679, to: -0.433 } },
          { name: "Donovan Clingan", min: 15, pts: 11, reb: 6, ast: 1, stl: 0, blk: 1, to: 3, tpm: 0, fgm: 5, fga: 7, ftm: 1, fta: 1, composite: 1.25, zScores: { pts: 0.481, reb: 1.132, ast: -0.429, stl: -0.771, blk: 0.978, tpm: -0.796, fgImpact: 1.367, ftImpact: 0.405, to: -1.121 } },
          { name: "Jrue Holiday", min: 15, pts: 6, reb: 5, ast: 3, stl: 0, blk: 0, to: 0, tpm: 0, fgm: 3, fga: 5, ftm: 0, fta: 0, composite: 0.34, zScores: { pts: -0.342, reb: 0.763, ast: 0.541, stl: -0.771, blk: -0.522, tpm: -0.796, fgImpact: 0.525, ftImpact: 0, to: 0.941 } },
          { name: "Ja Morant", min: 14, pts: 5, reb: 0, ast: 5, stl: 3, blk: 0, to: 1, tpm: 1, fgm: 2, fga: 6, ftm: 0, fta: 0, composite: 0.91, zScores: { pts: -0.507, reb: -1.078, ast: 1.512, stl: 1.888, blk: -0.522, tpm: 0, fgImpact: -0.635, ftImpact: 0, to: 0.254 } },
          { name: "John Tonje", min: 19, pts: 1, reb: 2, ast: 1, stl: 0, blk: 0, to: 1, tpm: 0, fgm: 0, fga: 3, ftm: 1, fta: 2, composite: -5.96, zScores: { pts: -1.165, reb: -0.342, ast: -0.429, stl: -0.771, blk: -0.522, tpm: -0.796, fgImpact: -1.108, ftImpact: -1.084, to: 0.254 } },
          { name: "Jeremy Sochan", min: 21, pts: 8, reb: 8, ast: 2, stl: 1, blk: 0, to: 1, tpm: 0, fgm: 4, fga: 6, ftm: 0, fta: 0, composite: 1.91, zScores: { pts: -0.013, reb: 1.868, ast: 0.056, stl: 0.116, blk: -0.522, tpm: -0.796, fgImpact: 0.946, ftImpact: 0, to: 0.254 } },
          { name: "Micah Potter", min: 17, pts: 7, reb: 2, ast: 0, stl: 0, blk: 0, to: 0, tpm: 0, fgm: 3, fga: 8, ftm: 1, fta: 1, composite: -2.76, zScores: { pts: -0.178, reb: -0.342, ast: -0.914, stl: -0.771, blk: -0.522, tpm: -0.796, fgImpact: -0.583, ftImpact: 0.405, to: 0.941 } },
          { name: "Branden Carlson", min: 14, pts: 3, reb: 4, ast: 0, stl: 0, blk: 1, to: 4, tpm: 1, fgm: 1, fga: 2, ftm: 0, fta: 0, composite: -2.9, zScores: { pts: -0.836, reb: 0.395, ast: -0.914, stl: -0.771, blk: 0.978, tpm: 0, fgImpact: 0.052, ftImpact: 0, to: -1.808 } },
          { name: "Yang Hansen", min: 21, pts: 13, reb: 4, ast: 4, stl: 0, blk: 0, to: 2, tpm: 1, fgm: 6, fga: 8, ftm: 0, fta: 0, composite: 2.29, zScores: { pts: 0.81, reb: 0.395, ast: 1.027, stl: -0.771, blk: -0.522, tpm: 0, fgImpact: 1.789, ftImpact: 0, to: -0.433 } },
          { name: "Vit Krejci", min: 21, pts: 10, reb: 5, ast: 2, stl: 3, blk: 0, to: 1, tpm: 2, fgm: 3, fga: 6, ftm: 2, fta: 2, composite: 4.52, zScores: { pts: 0.316, reb: 0.763, ast: 0.056, stl: 1.888, blk: -0.522, tpm: 0.796, fgImpact: 0.156, ftImpact: 0.809, to: 0.254 } },
          { name: "Scoot Henderson", min: 16, pts: 14, reb: 0, ast: 3, stl: 2, blk: 0, to: 1, tpm: 4, fgm: 4, fga: 7, ftm: 2, fta: 3, composite: 3.46, zScores: { pts: 0.974, reb: -1.078, ast: 0.541, stl: 1.002, blk: -0.522, tpm: 2.387, fgImpact: 0.577, ftImpact: -0.679, to: 0.254 } },
          { name: "Jayson Kent", min: 21, pts: 5, reb: 6, ast: 1, stl: 1, blk: 0, to: 0, tpm: 1, fgm: 2, fga: 6, ftm: 0, fta: 0, composite: 0.1, zScores: { pts: -0.507, reb: 1.132, ast: -0.429, stl: 0.116, blk: -0.522, tpm: 0, fgImpact: -0.635, ftImpact: 0, to: 0.941 } },
          { name: "Sidy Cissoko", min: 15, pts: 13, reb: 2, ast: 3, stl: 2, blk: 0, to: 2, tpm: 3, fgm: 5, fga: 5, ftm: 0, fta: 0, composite: 4.75, zScores: { pts: 0.81, reb: -0.342, ast: 0.541, stl: 1.002, blk: -0.522, tpm: 1.591, fgImpact: 2.106, ftImpact: 0, to: -0.433 } }
        ]
      }
    },
      {
      id: "401898402",
      line: "Oklahoma City Thunder 110 @ Atlanta Hawks 113 (Final)",
      completed: true,
      statusText: "Final",
      away: {
        abbr: "OKC", name: "Oklahoma City Thunder", score: 110,
        players: [
          { name: "Brooks Barnhizer", min: 40, pts: 20, reb: 8, ast: 2, stl: 0, blk: 2, to: 2, tpm: 2, fgm: 8, fga: 23, ftm: 2, fta: 2, composite: 4.6, zScores: { pts: 1.962, reb: 1.868, ast: 0.056, stl: -0.771, blk: 2.479, tpm: 0.796, fgImpact: -2.169, ftImpact: 0.809, to: -0.433 } },
          { name: "Aday Mara", min: 33, pts: 17, reb: 10, ast: 6, stl: 0, blk: 4, to: 5, tpm: 0, fgm: 4, fga: 9, ftm: 9, fta: 12, composite: 6.5, zScores: { pts: 1.468, reb: 2.605, ast: 1.997, stl: -0.771, blk: 5.48, tpm: -0.796, fgImpact: -0.161, ftImpact: -0.824, to: -2.495 } },
          { name: "Josh Dix", min: 37, pts: 16, reb: 3, ast: 7, stl: 2, blk: 1, to: 1, tpm: 4, fgm: 6, fga: 15, ftm: 0, fta: 0, composite: 7.64, zScores: { pts: 1.303, reb: 0.027, ast: 2.482, stl: 1.002, blk: 0.978, tpm: 2.387, fgImpact: -0.796, ftImpact: 0, to: 0.254 } },
          { name: "Otega Oweh", min: 35, pts: 11, reb: 10, ast: 1, stl: 2, blk: 1, to: 2, tpm: 0, fgm: 5, fga: 13, ftm: 1, fta: 2, composite: 1.48, zScores: { pts: 0.481, reb: 2.605, ast: -0.429, stl: 1.002, blk: 0.978, tpm: -0.796, fgImpact: -0.848, ftImpact: -1.084, to: -0.433 } },
          { name: "Bennett Stirtz", min: 38, pts: 26, reb: 4, ast: 5, stl: 0, blk: 0, to: 5, tpm: 6, fgm: 9, fga: 16, ftm: 2, fta: 3, composite: 5.57, zScores: { pts: 2.949, reb: 0.395, ast: 1.512, stl: -0.771, blk: -0.522, tpm: 3.978, fgImpact: 1.206, ftImpact: -0.679, to: -2.495 } },
          { name: "Andrew Holifield", min: 17, pts: 4, reb: 6, ast: 0, stl: 1, blk: 2, to: 0, tpm: 0, fgm: 1, fga: 2, ftm: 2, fta: 2, composite: 3.15, zScores: { pts: -0.671, reb: 1.132, ast: -0.914, stl: 0.116, blk: 2.479, tpm: -0.796, fgImpact: 0.052, ftImpact: 0.809, to: 0.941 } },
          { name: "Christoph Tilly", min: 10, pts: 5, reb: 2, ast: 0, stl: 0, blk: 1, to: 1, tpm: 1, fgm: 2, fga: 2, ftm: 0, fta: 0, composite: -0.46, zScores: { pts: -0.507, reb: -0.342, ast: -0.914, stl: -0.771, blk: 0.978, tpm: 0, fgImpact: 0.842, ftImpact: 0, to: 0.254 } },
          { name: "Zhaire Smith", min: 11, pts: 5, reb: 1, ast: 0, stl: 0, blk: 0, to: 0, tpm: 0, fgm: 2, fga: 5, ftm: 1, fta: 1, composite: -3.14, zScores: { pts: -0.507, reb: -0.71, ast: -0.914, stl: -0.771, blk: -0.522, tpm: -0.796, fgImpact: -0.265, ftImpact: 0.405, to: 0.941 } },
          { name: "Anthony Pritchard", min: 19, pts: 6, reb: 7, ast: 5, stl: 0, blk: 2, to: 0, tpm: 0, fgm: 2, fga: 5, ftm: 2, fta: 2, composite: 5.07, zScores: { pts: -0.342, reb: 1.5, ast: 1.512, stl: -0.771, blk: 2.479, tpm: -0.796, fgImpact: -0.265, ftImpact: 0.809, to: 0.941 } }
        ]
      },
      home: {
        abbr: "ATL", name: "Atlanta Hawks", score: 113,
        players: [
          { name: "Corey Kispert", min: 26, pts: 6, reb: 1, ast: 2, stl: 0, blk: 2, to: 0, tpm: 2, fgm: 2, fga: 11, ftm: 0, fta: 0, composite: -0.03, zScores: { pts: -0.342, reb: -0.71, ast: 0.056, stl: -0.771, blk: 2.479, tpm: 0.796, fgImpact: -2.481, ftImpact: 0, to: 0.941 } },
          { name: "Asa Newell", min: 27, pts: 7, reb: 10, ast: 1, stl: 0, blk: 2, to: 0, tpm: 1, fgm: 3, fga: 14, ftm: 0, fta: 0, composite: 1.85, zScores: { pts: -0.178, reb: 2.605, ast: -0.429, stl: -0.771, blk: 2.479, tpm: 0, fgImpact: -2.798, ftImpact: 0, to: 0.941 } },
          { name: "Jock Landale", min: 21, pts: 17, reb: 6, ast: 5, stl: 3, blk: 2, to: 0, tpm: 1, fgm: 7, fga: 11, ftm: 2, fta: 2, composite: 11.7, zScores: { pts: 1.468, reb: 1.132, ast: 1.512, stl: 1.888, blk: 2.479, tpm: 0, fgImpact: 1.471, ftImpact: 0.809, to: 0.941 } },
          { name: "Nickeil Alexander-Walker", min: 25, pts: 16, reb: 6, ast: 5, stl: 1, blk: 0, to: 3, tpm: 4, fgm: 4, fga: 10, ftm: 4, fta: 4, composite: 5.89, zScores: { pts: 1.303, reb: 1.132, ast: 1.512, stl: 0.116, blk: -0.522, tpm: 2.387, fgImpact: -0.531, ftImpact: 1.618, to: -1.121 } },
          { name: "Kingston Flemings", min: 28, pts: 7, reb: 2, ast: 7, stl: 1, blk: 0, to: 0, tpm: 0, fgm: 3, fga: 11, ftm: 1, fta: 2, composite: -1.07, zScores: { pts: -0.178, reb: -0.342, ast: 2.482, stl: 0.116, blk: -0.522, tpm: -0.796, fgImpact: -1.69, ftImpact: -1.084, to: 0.941 } },
          { name: "Dorian Finney-Smith", min: 17, pts: 8, reb: 1, ast: 0, stl: 0, blk: 0, to: 0, tpm: 2, fgm: 3, fga: 6, ftm: 0, fta: 0, composite: -1.04, zScores: { pts: -0.013, reb: -0.71, ast: -0.914, stl: -0.771, blk: -0.522, tpm: 0.796, fgImpact: 0.156, ftImpact: 0, to: 0.941 } },
          { name: "Jalen Wilson", min: 30, pts: 12, reb: 8, ast: 1, stl: 1, blk: 0, to: 2, tpm: 4, fgm: 4, fga: 13, ftm: 0, fta: 0, composite: 1.99, zScores: { pts: 0.645, reb: 1.868, ast: -0.429, stl: 0.116, blk: -0.522, tpm: 2.387, fgImpact: -1.638, ftImpact: 0, to: -0.433 } },
          { name: "Cameron Corhen", min: 3, pts: 2, reb: 0, ast: 0, stl: 0, blk: 0, to: 0, tpm: 0, fgm: 1, fga: 1, ftm: 0, fta: 0, composite: -3.72, zScores: { pts: -1, reb: -1.078, ast: -0.914, stl: -0.771, blk: -0.522, tpm: -0.796, fgImpact: 0.421, ftImpact: 0, to: 0.941 } },
          { name: "Zuby Ejiofor", min: 23, pts: 15, reb: 9, ast: 3, stl: 0, blk: 1, to: 3, tpm: 1, fgm: 5, fga: 9, ftm: 4, fta: 4, composite: 5.25, zScores: { pts: 1.139, reb: 2.237, ast: 0.541, stl: -0.771, blk: 0.978, tpm: 0, fgImpact: 0.629, ftImpact: 1.618, to: -1.121 } },
          { name: "RayJ Dennis", min: 24, pts: 13, reb: 4, ast: 7, stl: 3, blk: 0, to: 3, tpm: 1, fgm: 6, fga: 11, ftm: 0, fta: 1, composite: 3.13, zScores: { pts: 0.81, reb: 0.395, ast: 2.482, stl: 1.888, blk: -0.522, tpm: 0, fgImpact: 0.681, ftImpact: -1.489, to: -1.121 } },
          { name: "Kobe Johnson", min: 10, pts: 10, reb: 3, ast: 0, stl: 2, blk: 0, to: 1, tpm: 2, fgm: 4, fga: 4, ftm: 0, fta: 0, composite: 2.64, zScores: { pts: 0.316, reb: 0.027, ast: -0.914, stl: 1.002, blk: -0.522, tpm: 0.796, fgImpact: 1.685, ftImpact: 0, to: 0.254 } },
          { name: "Isaac McKneely", min: 4, pts: 0, reb: 0, ast: 0, stl: 0, blk: 0, to: 0, tpm: 0, fgm: 0, fga: 1, ftm: 0, fta: 0, composite: -4.84, zScores: { pts: -1.33, reb: -1.078, ast: -0.914, stl: -0.771, blk: -0.522, tpm: -0.796, fgImpact: -0.369, ftImpact: 0, to: 0.941 } }
        ]
      }
    },
      {
      id: "401901824",
      line: "Brooklyn Nets 131 @ Washington Wizards 122 (Final)",
      completed: true,
      statusText: "Final",
      away: {
        abbr: "BKN", name: "Brooklyn Nets", score: 131,
        players: [
          { name: "Julius Randle", min: 23, pts: 14, reb: 4, ast: 9, stl: 1, blk: 0, to: 3, tpm: 2, fgm: 5, fga: 8, ftm: 2, fta: 4, composite: 2.92, zScores: { pts: 0.974, reb: 0.395, ast: 3.453, stl: 0.116, blk: -0.522, tpm: 0.796, fgImpact: 0.998, ftImpact: -2.168, to: -1.121 } },
          { name: "Michael Porter Jr.", min: 24, pts: 22, reb: 4, ast: 0, stl: 2, blk: 1, to: 3, tpm: 2, fgm: 8, fga: 13, ftm: 4, fta: 5, composite: 5.08, zScores: { pts: 2.291, reb: 0.395, ast: -0.914, stl: 1.002, blk: 0.978, tpm: 0.796, fgImpact: 1.523, ftImpact: 0.13, to: -1.121 } },
          { name: "Day'Ron Sharpe", min: 21, pts: 4, reb: 2, ast: 3, stl: 3, blk: 1, to: 1, tpm: 1, fgm: 1, fga: 1, ftm: 1, fta: 4, composite: -0.99, zScores: { pts: -0.671, reb: -0.342, ast: 0.541, stl: 1.888, blk: 0.978, tpm: 0, fgImpact: 0.421, ftImpact: -4.061, to: 0.254 } },
          { name: "Keon Ellis", min: 21, pts: 15, reb: 1, ast: 0, stl: 0, blk: 0, to: 0, tpm: 3, fgm: 4, fga: 7, ftm: 4, fta: 5, composite: 1.46, zScores: { pts: 1.139, reb: -0.71, ast: -0.914, stl: -0.771, blk: -0.522, tpm: 1.591, fgImpact: 0.577, ftImpact: 0.13, to: 0.941 } },
          { name: "Egor Demin", min: 22, pts: 4, reb: 0, ast: 3, stl: 1, blk: 0, to: 1, tpm: 0, fgm: 2, fga: 8, ftm: 0, fta: 0, composite: -3.53, zScores: { pts: -0.671, reb: -1.078, ast: 0.541, stl: 0.116, blk: -0.522, tpm: -0.796, fgImpact: -1.373, ftImpact: 0, to: 0.254 } },
          { name: "Josh Minott", min: 7, pts: 6, reb: 2, ast: 0, stl: 0, blk: 1, to: 0, tpm: 0, fgm: 2, fga: 4, ftm: 2, fta: 2, composite: -0.33, zScores: { pts: -0.342, reb: -0.342, ast: -0.914, stl: -0.771, blk: 0.978, tpm: -0.796, fgImpact: 0.104, ftImpact: 0.809, to: 0.941 } },
          { name: "Grant Nelson", min: 9, pts: 9, reb: 4, ast: 1, stl: 0, blk: 0, to: 3, tpm: 1, fgm: 4, fga: 5, ftm: 0, fta: 0, composite: -0.98, zScores: { pts: 0.151, reb: 0.395, ast: -0.429, stl: -0.771, blk: -0.522, tpm: 0, fgImpact: 1.315, ftImpact: 0, to: -1.121 } },
          { name: "Noah Clowney", min: 22, pts: 15, reb: 3, ast: 4, stl: 1, blk: 0, to: 0, tpm: 4, fgm: 5, fga: 8, ftm: 1, fta: 1, composite: 6.52, zScores: { pts: 1.139, reb: 0.027, ast: 1.027, stl: 0.116, blk: -0.522, tpm: 2.387, fgImpact: 0.998, ftImpact: 0.405, to: 0.941 } },
          { name: "Danny Wolf", min: 9, pts: 2, reb: 1, ast: 1, stl: 0, blk: 0, to: 0, tpm: 0, fgm: 1, fga: 4, ftm: 0, fta: 0, composite: -3.97, zScores: { pts: -1, reb: -0.71, ast: -0.429, stl: -0.771, blk: -0.522, tpm: -0.796, fgImpact: -0.687, ftImpact: 0, to: 0.941 } },
          { name: "Chaney Johnson", min: 16, pts: 4, reb: 1, ast: 1, stl: 1, blk: 0, to: 1, tpm: 0, fgm: 2, fga: 3, ftm: 0, fta: 0, composite: -2.29, zScores: { pts: -0.671, reb: -0.71, ast: -0.429, stl: 0.116, blk: -0.522, tpm: -0.796, fgImpact: 0.473, ftImpact: 0, to: 0.254 } },
          { name: "Moritz Wagner", min: 18, pts: 13, reb: 5, ast: 1, stl: 2, blk: 0, to: 1, tpm: 0, fgm: 4, fga: 8, ftm: 5, fta: 6, composite: 1.82, zScores: { pts: 0.81, reb: 0.763, ast: -0.429, stl: 1.002, blk: -0.522, tpm: -0.796, fgImpact: 0.208, ftImpact: 0.534, to: 0.254 } },
          { name: "Terance Mann", min: 9, pts: 3, reb: 2, ast: 0, stl: 0, blk: 0, to: 1, tpm: 1, fgm: 1, fga: 2, ftm: 0, fta: 0, composite: -3.08, zScores: { pts: -0.836, reb: -0.342, ast: -0.914, stl: -0.771, blk: -0.522, tpm: 0, fgImpact: 0.052, ftImpact: 0, to: 0.254 } },
          { name: "Drake Powell", min: 10, pts: 3, reb: 1, ast: 0, stl: 0, blk: 0, to: 0, tpm: 1, fgm: 1, fga: 2, ftm: 0, fta: 0, composite: -2.76, zScores: { pts: -0.836, reb: -0.71, ast: -0.914, stl: -0.771, blk: -0.522, tpm: 0, fgImpact: 0.052, ftImpact: 0, to: 0.941 } },
          { name: "Ben Saraf", min: 8, pts: 0, reb: 0, ast: 4, stl: 0, blk: 0, to: 1, tpm: 0, fgm: 0, fga: 0, ftm: 0, fta: 0, composite: -3.22, zScores: { pts: -1.33, reb: -1.078, ast: 1.027, stl: -0.771, blk: -0.522, tpm: -0.796, fgImpact: 0, ftImpact: 0, to: 0.254 } },
          { name: "Nolan Traore", min: 20, pts: 17, reb: 1, ast: 2, stl: 0, blk: 0, to: 3, tpm: 2, fgm: 6, fga: 8, ftm: 3, fta: 3, composite: 2.2, zScores: { pts: 1.468, reb: -0.71, ast: 0.056, stl: -0.771, blk: -0.522, tpm: 0.796, fgImpact: 1.789, ftImpact: 1.214, to: -1.121 } }
        ]
      },
      home: {
        abbr: "WSH", name: "Washington Wizards", score: 122,
        players: [
          { name: "AJ Dybantsa", min: 25, pts: 14, reb: 4, ast: 3, stl: 1, blk: 1, to: 3, tpm: 1, fgm: 5, fga: 12, ftm: 3, fta: 4, composite: 1.13, zScores: { pts: 0.974, reb: 0.395, ast: 0.541, stl: 0.116, blk: 0.978, tpm: 0, fgImpact: -0.479, ftImpact: -0.275, to: -1.121 } },
          { name: "Kyshawn George", min: 25, pts: 21, reb: 1, ast: 4, stl: 3, blk: 0, to: 0, tpm: 3, fgm: 6, fga: 7, ftm: 6, fta: 6, composite: 10.93, zScores: { pts: 2.126, reb: -0.71, ast: 1.027, stl: 1.888, blk: -0.522, tpm: 1.591, fgImpact: 2.158, ftImpact: 2.428, to: 0.941 } },
          { name: "Deandre Ayton", min: 25, pts: 4, reb: 7, ast: 4, stl: 0, blk: 0, to: 1, tpm: 0, fgm: 2, fga: 4, ftm: 0, fta: 0, composite: 0.12, zScores: { pts: -0.671, reb: 1.5, ast: 1.027, stl: -0.771, blk: -0.522, tpm: -0.796, fgImpact: 0.104, ftImpact: 0, to: 0.254 } },
          { name: "Alex Sarr", min: 23, pts: 6, reb: 9, ast: 0, stl: 0, blk: 0, to: 3, tpm: 0, fgm: 3, fga: 10, ftm: 0, fta: 0, composite: -3.55, zScores: { pts: -0.342, reb: 2.237, ast: -0.914, stl: -0.771, blk: -0.522, tpm: -0.796, fgImpact: -1.321, ftImpact: 0, to: -1.121 } },
          { name: "Trae Young", min: 28, pts: 11, reb: 3, ast: 11, stl: 1, blk: 0, to: 8, tpm: 1, fgm: 1, fga: 5, ftm: 8, fta: 8, composite: 2.15, zScores: { pts: 0.481, reb: 0.027, ast: 4.423, stl: 0.116, blk: -0.522, tpm: 0, fgImpact: -1.056, ftImpact: 3.237, to: -4.557 } },
          { name: "Justin Champagnie", min: 16, pts: 7, reb: 3, ast: 0, stl: 1, blk: 0, to: 0, tpm: 1, fgm: 3, fga: 7, ftm: 0, fta: 0, composite: -0.74, zScores: { pts: -0.178, reb: 0.027, ast: -0.914, stl: 0.116, blk: -0.522, tpm: 0, fgImpact: -0.213, ftImpact: 0, to: 0.941 } },
          { name: "Felix Okpara", min: 12, pts: 2, reb: 2, ast: 0, stl: 0, blk: 1, to: 0, tpm: 0, fgm: 1, fga: 1, ftm: 0, fta: 0, composite: -1.48, zScores: { pts: -1, reb: -0.342, ast: -0.914, stl: -0.771, blk: 0.978, tpm: -0.796, fgImpact: 0.421, ftImpact: 0, to: 0.941 } },
          { name: "Reece Beekman", min: 7, pts: 5, reb: 0, ast: 1, stl: 1, blk: 0, to: 1, tpm: 0, fgm: 1, fga: 1, ftm: 3, fta: 3, composite: -1.33, zScores: { pts: -0.507, reb: -1.078, ast: -0.429, stl: 0.116, blk: -0.522, tpm: -0.796, fgImpact: 0.421, ftImpact: 1.214, to: 0.254 } },
          { name: "Trevor Keels", min: 3, pts: 0, reb: 1, ast: 0, stl: 0, blk: 0, to: 0, tpm: 0, fgm: 0, fga: 1, ftm: 0, fta: 0, composite: -4.47, zScores: { pts: -1.33, reb: -0.71, ast: -0.914, stl: -0.771, blk: -0.522, tpm: -0.796, fgImpact: -0.369, ftImpact: 0, to: 0.941 } },
          { name: "Tre Mann", min: 12, pts: 3, reb: 0, ast: 1, stl: 0, blk: 0, to: 0, tpm: 1, fgm: 1, fga: 3, ftm: 0, fta: 0, composite: -3.01, zScores: { pts: -0.836, reb: -1.078, ast: -0.429, stl: -0.771, blk: -0.522, tpm: 0, fgImpact: -0.317, ftImpact: 0, to: 0.941 } },
          { name: "Bub Carrington", min: 13, pts: 14, reb: 0, ast: 1, stl: 0, blk: 0, to: 2, tpm: 3, fgm: 3, fga: 5, ftm: 5, fta: 6, composite: 0.39, zScores: { pts: 0.974, reb: -1.078, ast: -0.429, stl: -0.771, blk: -0.522, tpm: 1.591, fgImpact: 0.525, ftImpact: 0.534, to: -0.433 } },
          { name: "Bilal Coulibaly", min: 24, pts: 19, reb: 2, ast: 1, stl: 3, blk: 1, to: 0, tpm: 3, fgm: 7, fga: 11, ftm: 2, fta: 2, composite: 8.71, zScores: { pts: 1.797, reb: -0.342, ast: -0.429, stl: 1.888, blk: 0.978, tpm: 1.591, fgImpact: 1.471, ftImpact: 0.809, to: 0.941 } },
          { name: "Will Riley", min: 7, pts: 3, reb: 1, ast: 1, stl: 0, blk: 0, to: 1, tpm: 1, fgm: 1, fga: 1, ftm: 0, fta: 0, composite: -2.59, zScores: { pts: -0.836, reb: -0.71, ast: -0.429, stl: -0.771, blk: -0.522, tpm: 0, fgImpact: 0.421, ftImpact: 0, to: 0.254 } },
          { name: "Tre Johnson", min: 20, pts: 13, reb: 0, ast: 3, stl: 2, blk: 0, to: 1, tpm: 3, fgm: 5, fga: 9, ftm: 0, fta: 0, composite: 3.23, zScores: { pts: 0.81, reb: -1.078, ast: 0.541, stl: 1.002, blk: -0.522, tpm: 1.591, fgImpact: 0.629, ftImpact: 0, to: 0.254 } }
        ]
      }
    },
      {
      id: "401914124",
      line: "Minnesota Timberwolves 122 @ New York Knicks 104 (Final)",
      completed: true,
      statusText: "Final",
      away: {
        abbr: "MIN", name: "Minnesota Timberwolves", score: 122,
        players: [
          { name: "Jaden McDaniels", min: 24, pts: 22, reb: 5, ast: 2, stl: 0, blk: 0, to: 4, tpm: 4, fgm: 8, fga: 12, ftm: 2, fta: 2, composite: 5.1, zScores: { pts: 2.291, reb: 0.763, ast: 0.056, stl: -0.771, blk: -0.522, tpm: 2.387, fgImpact: 1.892, ftImpact: 0.809, to: -1.808 } },
          { name: "Cody Williams", min: 15, pts: 6, reb: 1, ast: 0, stl: 0, blk: 1, to: 1, tpm: 2, fgm: 2, fga: 3, ftm: 0, fta: 0, composite: -0.24, zScores: { pts: -0.342, reb: -0.71, ast: -0.914, stl: -0.771, blk: 0.978, tpm: 0.796, fgImpact: 0.473, ftImpact: 0, to: 0.254 } },
          { name: "Rudy Gobert", min: 22, pts: 2, reb: 3, ast: 3, stl: 1, blk: 1, to: 1, tpm: 0, fgm: 1, fga: 2, ftm: 0, fta: 0, composite: 0.17, zScores: { pts: -1, reb: 0.027, ast: 0.541, stl: 0.116, blk: 0.978, tpm: -0.796, fgImpact: 0.052, ftImpact: 0, to: 0.254 } },
          { name: "LaMelo Ball", min: 22, pts: 10, reb: 3, ast: 7, stl: 0, blk: 1, to: 5, tpm: 1, fgm: 3, fga: 7, ftm: 3, fta: 3, composite: 1.54, zScores: { pts: 0.316, reb: 0.027, ast: 2.482, stl: -0.771, blk: 0.978, tpm: 0, fgImpact: -0.213, ftImpact: 1.214, to: -2.495 } },
          { name: "Anthony Edwards", min: 25, pts: 26, reb: 3, ast: 3, stl: 1, blk: 0, to: 2, tpm: 5, fgm: 8, fga: 16, ftm: 5, fta: 7, composite: 5.32, zScores: { pts: 2.949, reb: 0.027, ast: 0.541, stl: 0.116, blk: -0.522, tpm: 3.183, fgImpact: 0.416, ftImpact: -0.954, to: -0.433 } },
          { name: "Trey Lyles", min: 16, pts: 3, reb: 3, ast: 1, stl: 0, blk: 0, to: 1, tpm: 1, fgm: 1, fga: 2, ftm: 0, fta: 0, composite: -2.22, zScores: { pts: -0.836, reb: 0.027, ast: -0.429, stl: -0.771, blk: -0.522, tpm: 0, fgImpact: 0.052, ftImpact: 0, to: 0.254 } },
          { name: "Drew Timme", min: 6, pts: 3, reb: 0, ast: 1, stl: 0, blk: 0, to: 1, tpm: 0, fgm: 1, fga: 1, ftm: 1, fta: 2, composite: -4.84, zScores: { pts: -0.836, reb: -1.078, ast: -0.429, stl: -0.771, blk: -0.522, tpm: -0.796, fgImpact: 0.421, ftImpact: -1.084, to: 0.254 } },
          { name: "KJ Martin", min: 12, pts: 6, reb: 0, ast: 0, stl: 0, blk: 0, to: 0, tpm: 1, fgm: 2, fga: 3, ftm: 1, fta: 2, composite: -3.3, zScores: { pts: -0.342, reb: -1.078, ast: -0.914, stl: -0.771, blk: -0.522, tpm: 0, fgImpact: 0.473, ftImpact: -1.084, to: 0.941 } },
          { name: "Norchad Omier", min: 6, pts: 2, reb: 4, ast: 1, stl: 0, blk: 0, to: 0, tpm: 0, fgm: 1, fga: 2, ftm: 0, fta: 0, composite: -2.13, zScores: { pts: -1, reb: 0.395, ast: -0.429, stl: -0.771, blk: -0.522, tpm: -0.796, fgImpact: 0.052, ftImpact: 0, to: 0.941 } },
          { name: "Isaiah Evans", min: 12, pts: 4, reb: 2, ast: 1, stl: 0, blk: 0, to: 1, tpm: 1, fgm: 1, fga: 3, ftm: 1, fta: 2, composite: -3.88, zScores: { pts: -0.671, reb: -0.342, ast: -0.429, stl: -0.771, blk: -0.522, tpm: 0, fgImpact: -0.317, ftImpact: -1.084, to: 0.254 } },
          { name: "Joan Beringer", min: 14, pts: 5, reb: 4, ast: 0, stl: 1, blk: 1, to: 0, tpm: 0, fgm: 1, fga: 3, ftm: 3, fta: 6, composite: -3.36, zScores: { pts: -0.507, reb: 0.395, ast: -0.914, stl: 0.116, blk: 0.978, tpm: -0.796, fgImpact: -0.317, ftImpact: -3.252, to: 0.941 } },
          { name: "Ayo Dosunmu", min: 20, pts: 11, reb: 4, ast: 2, stl: 3, blk: 1, to: 2, tpm: 3, fgm: 3, fga: 6, ftm: 2, fta: 2, composite: 5.92, zScores: { pts: 0.481, reb: 0.395, ast: 0.056, stl: 1.888, blk: 0.978, tpm: 1.591, fgImpact: 0.156, ftImpact: 0.809, to: -0.433 } },
          { name: "Jaylen Clark", min: 10, pts: 2, reb: 2, ast: 0, stl: 0, blk: 0, to: 0, tpm: 0, fgm: 1, fga: 1, ftm: 0, fta: 0, composite: -2.98, zScores: { pts: -1, reb: -0.342, ast: -0.914, stl: -0.771, blk: -0.522, tpm: -0.796, fgImpact: 0.421, ftImpact: 0, to: 0.941 } },
          { name: "Bones Hyland", min: 14, pts: 6, reb: 2, ast: 2, stl: 0, blk: 0, to: 1, tpm: 0, fgm: 3, fga: 9, ftm: 0, fta: 0, composite: -3.41, zScores: { pts: -0.342, reb: -0.342, ast: 0.056, stl: -0.771, blk: -0.522, tpm: -0.796, fgImpact: -0.952, ftImpact: 0, to: 0.254 } },
          { name: "Antonio Reeves", min: 11, pts: 6, reb: 0, ast: 0, stl: 2, blk: 0, to: 0, tpm: 0, fgm: 3, fga: 4, ftm: 0, fta: 0, composite: -0.81, zScores: { pts: -0.342, reb: -1.078, ast: -0.914, stl: 1.002, blk: -0.522, tpm: -0.796, fgImpact: 0.894, ftImpact: 0, to: 0.941 } },
          { name: "Zyon Pullin", min: 12, pts: 8, reb: 3, ast: 3, stl: 3, blk: 0, to: 0, tpm: 0, fgm: 3, fga: 4, ftm: 2, fta: 4, composite: 0.79, zScores: { pts: -0.013, reb: 0.027, ast: 0.541, stl: 1.888, blk: -0.522, tpm: -0.796, fgImpact: 0.894, ftImpact: -2.168, to: 0.941 } }
        ]
      },
      home: {
        abbr: "NY", name: "New York Knicks", score: 104,
        players: [
          { name: "OG Anunoby", min: 22, pts: 15, reb: 2, ast: 1, stl: 3, blk: 0, to: 0, tpm: 1, fgm: 4, fga: 8, ftm: 6, fta: 6, composite: 5.31, zScores: { pts: 1.139, reb: -0.342, ast: -0.429, stl: 1.888, blk: -0.522, tpm: 0, fgImpact: 0.208, ftImpact: 2.428, to: 0.941 } },
          { name: "Karl-Anthony Towns", min: 22, pts: 11, reb: 2, ast: 4, stl: 1, blk: 0, to: 3, tpm: 1, fgm: 3, fga: 6, ftm: 4, fta: 4, composite: 1.41, zScores: { pts: 0.481, reb: -0.342, ast: 1.027, stl: 0.116, blk: -0.522, tpm: 0, fgImpact: 0.156, ftImpact: 1.618, to: -1.121 } },
          { name: "Josh Hart", min: 22, pts: 2, reb: 3, ast: 3, stl: 1, blk: 0, to: 2, tpm: 0, fgm: 1, fga: 2, ftm: 0, fta: 0, composite: -2.02, zScores: { pts: -1, reb: 0.027, ast: 0.541, stl: 0.116, blk: -0.522, tpm: -0.796, fgImpact: 0.052, ftImpact: 0, to: -0.433 } },
          { name: "Mikal Bridges", min: 22, pts: 9, reb: 2, ast: 2, stl: 0, blk: 0, to: 1, tpm: 1, fgm: 3, fga: 6, ftm: 2, fta: 2, composite: -0.21, zScores: { pts: 0.151, reb: -0.342, ast: 0.056, stl: -0.771, blk: -0.522, tpm: 0, fgImpact: 0.156, ftImpact: 0.809, to: 0.254 } },
          { name: "Jalen Brunson", min: 22, pts: 20, reb: 5, ast: 3, stl: 3, blk: 0, to: 2, tpm: 1, fgm: 6, fga: 13, ftm: 7, fta: 8, composite: 5.49, zScores: { pts: 1.962, reb: 0.763, ast: 0.541, stl: 1.888, blk: -0.522, tpm: 0, fgImpact: -0.058, ftImpact: 1.344, to: -0.433 } },
          { name: "Drew Eubanks", min: 7, pts: 4, reb: 0, ast: 0, stl: 1, blk: 1, to: 0, tpm: 0, fgm: 2, fga: 3, ftm: 0, fta: 0, composite: -0.95, zScores: { pts: -0.671, reb: -1.078, ast: -0.914, stl: 0.116, blk: 0.978, tpm: -0.796, fgImpact: 0.473, ftImpact: 0, to: 0.941 } },
          { name: "Pacome Dadiet", min: 14, pts: 7, reb: 1, ast: 1, stl: 0, blk: 0, to: 0, tpm: 2, fgm: 2, fga: 3, ftm: 1, fta: 2, composite: -1.48, zScores: { pts: -0.178, reb: -0.71, ast: -0.429, stl: -0.771, blk: -0.522, tpm: 0.796, fgImpact: 0.473, ftImpact: -1.084, to: 0.941 } },
          { name: "Mohamed Diawara", min: 13, pts: 0, reb: 3, ast: 0, stl: 0, blk: 0, to: 3, tpm: 0, fgm: 0, fga: 1, ftm: 0, fta: 0, composite: -5.8, zScores: { pts: -1.33, reb: 0.027, ast: -0.914, stl: -0.771, blk: -0.522, tpm: -0.796, fgImpact: -0.369, ftImpact: 0, to: -1.121 } },
          { name: "Andre Drummond", min: 12, pts: 4, reb: 4, ast: 0, stl: 1, blk: 3, to: 0, tpm: 0, fgm: 1, fga: 2, ftm: 2, fta: 2, composite: 3.91, zScores: { pts: -0.671, reb: 0.395, ast: -0.914, stl: 0.116, blk: 3.979, tpm: -0.796, fgImpact: 0.052, ftImpact: 0.809, to: 0.941 } },
          { name: "Tony Bradley", min: 7, pts: 10, reb: 2, ast: 0, stl: 0, blk: 0, to: 0, tpm: 0, fgm: 5, fga: 5, ftm: 0, fta: 0, composite: 0.02, zScores: { pts: 0.316, reb: -0.342, ast: -0.914, stl: -0.771, blk: -0.522, tpm: -0.796, fgImpact: 2.106, ftImpact: 0, to: 0.941 } },
          { name: "Jordan Clarkson", min: 10, pts: 5, reb: 0, ast: 0, stl: 0, blk: 1, to: 1, tpm: 1, fgm: 2, fga: 3, ftm: 0, fta: 0, composite: -1.56, zScores: { pts: -0.507, reb: -1.078, ast: -0.914, stl: -0.771, blk: 0.978, tpm: 0, fgImpact: 0.473, ftImpact: 0, to: 0.254 } },
          { name: "Landry Shamet", min: 12, pts: 2, reb: 0, ast: 1, stl: 0, blk: 0, to: 1, tpm: 0, fgm: 0, fga: 2, ftm: 2, fta: 2, composite: -4.27, zScores: { pts: -1, reb: -1.078, ast: -0.429, stl: -0.771, blk: -0.522, tpm: -0.796, fgImpact: -0.738, ftImpact: 0.809, to: 0.254 } },
          { name: "Jose Alvarado", min: 15, pts: 4, reb: 2, ast: 2, stl: 1, blk: 0, to: 3, tpm: 0, fgm: 2, fga: 8, ftm: 0, fta: 0, composite: -4.65, zScores: { pts: -0.671, reb: -0.342, ast: 0.056, stl: 0.116, blk: -0.522, tpm: -0.796, fgImpact: -1.373, ftImpact: 0, to: -1.121 } },
          { name: "Ochai Agbaji", min: 10, pts: 2, reb: 2, ast: 1, stl: 0, blk: 0, to: 0, tpm: 0, fgm: 0, fga: 3, ftm: 2, fta: 2, composite: -3.22, zScores: { pts: -1, reb: -0.342, ast: -0.429, stl: -0.771, blk: -0.522, tpm: -0.796, fgImpact: -1.108, ftImpact: 0.809, to: 0.941 } },
          { name: "Kevin McCullar Jr.", min: 7, pts: 2, reb: 0, ast: 2, stl: 0, blk: 0, to: 0, tpm: 0, fgm: 1, fga: 2, ftm: 0, fta: 0, composite: -3.12, zScores: { pts: -1, reb: -1.078, ast: 0.056, stl: -0.771, blk: -0.522, tpm: -0.796, fgImpact: 0.052, ftImpact: 0, to: 0.941 } },
          { name: "Miles McBride", min: 13, pts: 3, reb: 0, ast: 0, stl: 1, blk: 0, to: 1, tpm: 1, fgm: 1, fga: 5, ftm: 0, fta: 0, composite: -4.04, zScores: { pts: -0.836, reb: -1.078, ast: -0.914, stl: 0.116, blk: -0.522, tpm: 0, fgImpact: -1.056, ftImpact: 0, to: 0.254 } },
          { name: "Tyler Kolek", min: 12, pts: 4, reb: 0, ast: 4, stl: 0, blk: 0, to: 2, tpm: 0, fgm: 2, fga: 5, ftm: 0, fta: 1, composite: -5, zScores: { pts: -0.671, reb: -1.078, ast: 1.027, stl: -0.771, blk: -0.522, tpm: -0.796, fgImpact: -0.265, ftImpact: -1.489, to: -0.433 } }
        ]
      }
    },
      {
      id: "401898721",
      line: "San Antonio Spurs 109 @ Utah Jazz 119 (Final)",
      completed: true,
      statusText: "Final",
      away: {
        abbr: "SA", name: "San Antonio Spurs", score: 109,
        players: [
          { name: "Harrison Barnes", min: 23, pts: 19, reb: 2, ast: 1, stl: 0, blk: 0, to: 3, tpm: 3, fgm: 3, fga: 8, ftm: 10, fta: 12, composite: 0.69, zScores: { pts: 1.797, reb: -0.342, ast: -0.429, stl: -0.771, blk: -0.522, tpm: 1.591, fgImpact: -0.583, ftImpact: 1.069, to: -1.121 } },
          { name: "Keldon Johnson", min: 24, pts: 15, reb: 4, ast: 4, stl: 2, blk: 0, to: 1, tpm: 0, fgm: 4, fga: 10, ftm: 7, fta: 9, composite: 1.82, zScores: { pts: 1.139, reb: 0.395, ast: 1.027, stl: 1.002, blk: -0.522, tpm: -0.796, fgImpact: -0.531, ftImpact: -0.145, to: 0.254 } },
          { name: "Julian Champagnie", min: 26, pts: 14, reb: 4, ast: 0, stl: 1, blk: 1, to: 5, tpm: 3, fgm: 5, fga: 13, ftm: 1, fta: 1, composite: 0.2, zScores: { pts: 0.974, reb: 0.395, ast: -0.914, stl: 0.116, blk: 0.978, tpm: 1.591, fgImpact: -0.848, ftImpact: 0.405, to: -2.495 } },
          { name: "Luke Kornet", min: 22, pts: 0, reb: 3, ast: 1, stl: 0, blk: 1, to: 3, tpm: 0, fgm: 0, fga: 2, ftm: 0, fta: 0, composite: -4.18, zScores: { pts: -1.33, reb: 0.027, ast: -0.429, stl: -0.771, blk: 0.978, tpm: -0.796, fgImpact: -0.738, ftImpact: 0, to: -1.121 } },
          { name: "Jordan McLaughlin", min: 22, pts: 14, reb: 1, ast: 6, stl: 1, blk: 0, to: 2, tpm: 1, fgm: 6, fga: 10, ftm: 1, fta: 2, composite: 1.39, zScores: { pts: 0.974, reb: -0.71, ast: 1.997, stl: 0.116, blk: -0.522, tpm: 0, fgImpact: 1.05, ftImpact: -1.084, to: -0.433 } },
          { name: "David Jones Garcia", min: 14, pts: 4, reb: 5, ast: 1, stl: 0, blk: 0, to: 4, tpm: 0, fgm: 2, fga: 8, ftm: 0, fta: 0, composite: -5.61, zScores: { pts: -0.671, reb: 0.763, ast: -0.429, stl: -0.771, blk: -0.522, tpm: -0.796, fgImpact: -1.373, ftImpact: 0, to: -1.808 } },
          { name: "Maliq Brown", min: 14, pts: 3, reb: 3, ast: 0, stl: 0, blk: 0, to: 1, tpm: 1, fgm: 1, fga: 3, ftm: 0, fta: 0, composite: -3.08, zScores: { pts: -0.836, reb: 0.027, ast: -0.914, stl: -0.771, blk: -0.522, tpm: 0, fgImpact: -0.317, ftImpact: 0, to: 0.254 } },
          { name: "Tarris Reed Jr.", min: 24, pts: 4, reb: 17, ast: 1, stl: 4, blk: 1, to: 1, tpm: 0, fgm: 1, fga: 6, ftm: 2, fta: 4, composite: 3.7, zScores: { pts: -0.671, reb: 5.183, ast: -0.429, stl: 2.775, blk: 0.978, tpm: -0.796, fgImpact: -1.425, ftImpact: -2.168, to: 0.254 } },
          { name: "Jon Elmore", min: 14, pts: 3, reb: 1, ast: 3, stl: 2, blk: 1, to: 1, tpm: 1, fgm: 1, fga: 4, ftm: 0, fta: 0, composite: 0.54, zScores: { pts: -0.836, reb: -0.71, ast: 0.541, stl: 1.002, blk: 0.978, tpm: 0, fgImpact: -0.687, ftImpact: 0, to: 0.254 } },
          { name: "RJ Davis", min: 15, pts: 5, reb: 1, ast: 2, stl: 0, blk: 0, to: 0, tpm: 1, fgm: 2, fga: 8, ftm: 0, fta: 2, composite: -5.86, zScores: { pts: -0.507, reb: -0.71, ast: 0.056, stl: -0.771, blk: -0.522, tpm: 0, fgImpact: -1.373, ftImpact: -2.977, to: 0.941 } },
          { name: "Taelon Peter", min: 17, pts: 3, reb: 0, ast: 0, stl: 1, blk: 0, to: 0, tpm: 1, fgm: 1, fga: 3, ftm: 0, fta: 0, composite: -2.61, zScores: { pts: -0.836, reb: -1.078, ast: -0.914, stl: 0.116, blk: -0.522, tpm: 0, fgImpact: -0.317, ftImpact: 0, to: 0.941 } },
          { name: "Ja'Kobi Gillespie", min: 25, pts: 25, reb: 1, ast: 3, stl: 3, blk: 0, to: 1, tpm: 4, fgm: 9, fga: 14, ftm: 3, fta: 3, composite: 9.78, zScores: { pts: 2.784, reb: -0.71, ast: 0.541, stl: 1.888, blk: -0.522, tpm: 2.387, fgImpact: 1.944, ftImpact: 1.214, to: 0.254 } }
        ]
      },
      home: {
        abbr: "UTAH", name: "Utah Jazz", score: 119,
        players: [
          { name: "Lauri Markkanen", min: 19, pts: 11, reb: 1, ast: 2, stl: 2, blk: 0, to: 3, tpm: 1, fgm: 3, fga: 7, ftm: 4, fta: 4, composite: 0.59, zScores: { pts: 0.481, reb: -0.71, ast: 0.056, stl: 1.002, blk: -0.522, tpm: 0, fgImpact: -0.213, ftImpact: 1.618, to: -1.121 } },
          { name: "Jaren Jackson Jr.", min: 18, pts: 13, reb: 3, ast: 1, stl: 1, blk: 0, to: 2, tpm: 1, fgm: 6, fga: 8, ftm: 0, fta: 0, composite: 1.36, zScores: { pts: 0.81, reb: 0.027, ast: -0.429, stl: 0.116, blk: -0.522, tpm: 0, fgImpact: 1.789, ftImpact: 0, to: -0.433 } },
          { name: "Jaxson Hayes", min: 15, pts: 11, reb: 2, ast: 0, stl: 0, blk: 0, to: 1, tpm: 0, fgm: 4, fga: 5, ftm: 3, fta: 4, composite: -1.57, zScores: { pts: 0.481, reb: -0.342, ast: -0.914, stl: -0.771, blk: -0.522, tpm: -0.796, fgImpact: 1.315, ftImpact: -0.275, to: 0.254 } },
          { name: "Keyonte George", min: 16, pts: 13, reb: 2, ast: 1, stl: 3, blk: 0, to: 0, tpm: 0, fgm: 5, fga: 7, ftm: 3, fta: 4, composite: 2.64, zScores: { pts: 0.81, reb: -0.342, ast: -0.429, stl: 1.888, blk: -0.522, tpm: -0.796, fgImpact: 1.367, ftImpact: -0.275, to: 0.941 } },
          { name: "Darryn Peterson", min: 24, pts: 14, reb: 2, ast: 5, stl: 1, blk: 0, to: 1, tpm: 1, fgm: 5, fga: 10, ftm: 3, fta: 3, composite: 3.47, zScores: { pts: 0.974, reb: -0.342, ast: 1.512, stl: 0.116, blk: -0.522, tpm: 0, fgImpact: 0.26, ftImpact: 1.214, to: 0.254 } },
          { name: "Taylor Funk", min: 7, pts: 0, reb: 2, ast: 0, stl: 0, blk: 0, to: 1, tpm: 0, fgm: 0, fga: 0, ftm: 0, fta: 0, composite: -4.42, zScores: { pts: -1.33, reb: -0.342, ast: -0.914, stl: -0.771, blk: -0.522, tpm: -0.796, fgImpact: 0, ftImpact: 0, to: 0.254 } },
          { name: "Harrison Ingram", min: 7, pts: 2, reb: 2, ast: 1, stl: 0, blk: 1, to: 1, tpm: 0, fgm: 1, fga: 2, ftm: 0, fta: 0, composite: -2.05, zScores: { pts: -1, reb: -0.342, ast: -0.429, stl: -0.771, blk: 0.978, tpm: -0.796, fgImpact: 0.052, ftImpact: 0, to: 0.254 } },
          { name: "Brice Sensabaugh", min: 15, pts: 11, reb: 2, ast: 2, stl: 1, blk: 0, to: 3, tpm: 2, fgm: 3, fga: 7, ftm: 3, fta: 4, composite: -1.02, zScores: { pts: 0.481, reb: -0.342, ast: 0.056, stl: 0.116, blk: -0.522, tpm: 0.796, fgImpact: -0.213, ftImpact: -0.275, to: -1.121 } },
          { name: "Mo Bamba", min: 12, pts: 9, reb: 9, ast: 2, stl: 0, blk: 1, to: 1, tpm: 0, fgm: 4, fga: 4, ftm: 1, fta: 1, composite: 4.2, zScores: { pts: 0.151, reb: 2.237, ast: 0.056, stl: -0.771, blk: 0.978, tpm: -0.796, fgImpact: 1.685, ftImpact: 0.405, to: 0.254 } },
          { name: "Jonas Aidoo", min: 7, pts: 3, reb: 5, ast: 0, stl: 0, blk: 0, to: 2, tpm: 0, fgm: 1, fga: 4, ftm: 1, fta: 2, composite: -5.28, zScores: { pts: -0.836, reb: 0.763, ast: -0.914, stl: -0.771, blk: -0.522, tpm: -0.796, fgImpact: -0.687, ftImpact: -1.084, to: -0.433 } },
          { name: "Svi Mykhailiuk", min: 19, pts: 7, reb: 7, ast: 2, stl: 0, blk: 0, to: 1, tpm: 1, fgm: 3, fga: 6, ftm: 0, fta: 0, composite: 0.5, zScores: { pts: -0.178, reb: 1.5, ast: 0.056, stl: -0.771, blk: -0.522, tpm: 0, fgImpact: 0.156, ftImpact: 0, to: 0.254 } },
          { name: "Josh Okogie", min: 11, pts: 5, reb: 0, ast: 1, stl: 0, blk: 1, to: 0, tpm: 1, fgm: 2, fga: 4, ftm: 0, fta: 0, composite: -0.76, zScores: { pts: -0.507, reb: -1.078, ast: -0.429, stl: -0.771, blk: 0.978, tpm: 0, fgImpact: 0.104, ftImpact: 0, to: 0.941 } },
          { name: "Josh Green", min: 11, pts: 0, reb: 0, ast: 0, stl: 1, blk: 0, to: 0, tpm: 0, fgm: 0, fga: 0, ftm: 0, fta: 0, composite: -3.58, zScores: { pts: -1.33, reb: -1.078, ast: -0.914, stl: 0.116, blk: -0.522, tpm: -0.796, fgImpact: 0, ftImpact: 0, to: 0.941 } },
          { name: "Trey Alexander", min: 7, pts: 0, reb: 0, ast: 0, stl: 1, blk: 0, to: 1, tpm: 0, fgm: 0, fga: 4, ftm: 0, fta: 0, composite: -5.75, zScores: { pts: -1.33, reb: -1.078, ast: -0.914, stl: 0.116, blk: -0.522, tpm: -0.796, fgImpact: -1.477, ftImpact: 0, to: 0.254 } },
          { name: "Isaiah Collier", min: 22, pts: 11, reb: 3, ast: 5, stl: 5, blk: 0, to: 3, tpm: 1, fgm: 4, fga: 7, ftm: 2, fta: 4, composite: 2.45, zScores: { pts: 0.481, reb: 0.027, ast: 1.512, stl: 3.661, blk: -0.522, tpm: 0, fgImpact: 0.577, ftImpact: -2.168, to: -1.121 } },
          { name: "Tamar Bates", min: 7, pts: 3, reb: 1, ast: 0, stl: 0, blk: 0, to: 1, tpm: 1, fgm: 1, fga: 4, ftm: 0, fta: 0, composite: -4.19, zScores: { pts: -0.836, reb: -0.71, ast: -0.914, stl: -0.771, blk: -0.522, tpm: 0, fgImpact: -0.687, ftImpact: 0, to: 0.254 } },
          { name: "Ace Bailey", min: 24, pts: 6, reb: 6, ast: 3, stl: 3, blk: 0, to: 1, tpm: 0, fgm: 3, fga: 8, ftm: 0, fta: 0, composite: 1.57, zScores: { pts: -0.342, reb: 1.132, ast: 0.541, stl: 1.888, blk: -0.522, tpm: -0.796, fgImpact: -0.583, ftImpact: 0, to: 0.254 } }
        ]
      }
    }
    ]
  },
    "2026-10-13": {
    games: [
      {
      id: "401898403",
      line: "Cleveland Cavaliers @ Orlando Magic (10/13 - 7:00 PM EDT)",
      completed: false,
      statusText: "10/13 - 7:00 PM EDT",
      away: {
        abbr: "CLE", name: "Cleveland Cavaliers", score: null,
        players: [

        ]
      },
      home: {
        abbr: "ORL", name: "Orlando Magic", score: null,
        players: [

        ]
      }
    },
      {
      id: "401908944",
      line: "New York Knicks @ Toronto Raptors (10/13 - 7:00 PM EDT)",
      completed: false,
      statusText: "10/13 - 7:00 PM EDT",
      away: {
        abbr: "NY", name: "New York Knicks", score: null,
        players: [

        ]
      },
      home: {
        abbr: "TOR", name: "Toronto Raptors", score: null,
        players: [

        ]
      }
    },
      {
      id: "401908621",
      line: "Indiana Pacers @ Oklahoma City Thunder (10/13 - 8:00 PM EDT)",
      completed: false,
      statusText: "10/13 - 8:00 PM EDT",
      away: {
        abbr: "IND", name: "Indiana Pacers", score: null,
        players: [

        ]
      },
      home: {
        abbr: "OKC", name: "Oklahoma City Thunder", score: null,
        players: [

        ]
      }
    },
      {
      id: "401898718",
      line: "Golden State Warriors @ Los Angeles Lakers (10/13 - 10:00 PM EDT)",
      completed: false,
      statusText: "10/13 - 10:00 PM EDT",
      away: {
        abbr: "GS", name: "Golden State Warriors", score: null,
        players: [

        ]
      },
      home: {
        abbr: "LAL", name: "Los Angeles Lakers", score: null,
        players: [

        ]
      }
    },
      {
      id: "401901826",
      line: "Portland Trail Blazers @ Sacramento Kings (10/13 - 10:00 PM EDT)",
      completed: false,
      statusText: "10/13 - 10:00 PM EDT",
      away: {
        abbr: "POR", name: "Portland Trail Blazers", score: null,
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
  },
    "2026-10-14": {
    games: [
      {
      id: "401898404",
      line: "Brooklyn Nets @ Miami Heat (10/14 - 7:30 PM EDT)",
      completed: false,
      statusText: "10/14 - 7:30 PM EDT",
      away: {
        abbr: "BKN", name: "Brooklyn Nets", score: null,
        players: [

        ]
      },
      home: {
        abbr: "MIA", name: "Miami Heat", score: null,
        players: [

        ]
      }
    },
      {
      id: "401898405",
      line: "Charlotte Hornets @ Boston Celtics (10/14 - 7:30 PM EDT)",
      completed: false,
      statusText: "10/14 - 7:30 PM EDT",
      away: {
        abbr: "CHA", name: "Charlotte Hornets", score: null,
        players: [

        ]
      },
      home: {
        abbr: "BOS", name: "Boston Celtics", score: null,
        players: [

        ]
      }
    },
      {
      id: "401898722",
      line: "Phoenix Suns @ San Antonio Spurs (10/14 - 8:00 PM EDT)",
      completed: false,
      statusText: "10/14 - 8:00 PM EDT",
      away: {
        abbr: "PHX", name: "Phoenix Suns", score: null,
        players: [

        ]
      },
      home: {
        abbr: "SA", name: "San Antonio Spurs", score: null,
        players: [

        ]
      }
    },
      {
      id: "401901825",
      line: "New Orleans Pelicans @ Dallas Mavericks (10/14 - 8:00 PM EDT)",
      completed: false,
      statusText: "10/14 - 8:00 PM EDT",
      away: {
        abbr: "NO", name: "New Orleans Pelicans", score: null,
        players: [

        ]
      },
      home: {
        abbr: "DAL", name: "Dallas Mavericks", score: null,
        players: [

        ]
      }
    },
      {
      id: "401908942",
      line: "Chicago Bulls @ Milwaukee Bucks (10/14 - 8:00 PM EDT)",
      completed: false,
      statusText: "10/14 - 8:00 PM EDT",
      away: {
        abbr: "CHI", name: "Chicago Bulls", score: null,
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
      id: "401914125",
      line: "Detroit Pistons @ Minnesota Timberwolves (10/14 - 8:00 PM EDT)",
      completed: false,
      statusText: "10/14 - 8:00 PM EDT",
      away: {
        abbr: "DET", name: "Detroit Pistons", score: null,
        players: [

        ]
      },
      home: {
        abbr: "MIN", name: "Minnesota Timberwolves", score: null,
        players: [

        ]
      }
    },
      {
      id: "401918011",
      line: "Denver Nuggets @ LA Clippers (10/14 - 10:30 PM EDT)",
      completed: false,
      statusText: "10/14 - 10:30 PM EDT",
      away: {
        abbr: "DEN", name: "Denver Nuggets", score: null,
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
  }
  }
};
