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
  },
    "2026-10-06": {
    games: [
      {
      id: "401901820",
      line: "Brooklyn Nets @ Charlotte Hornets (10/6 - 7:00 PM EDT)",
      completed: false,
      statusText: "10/6 - 7:00 PM EDT",
      away: {
        abbr: "BKN", name: "Brooklyn Nets", score: null,
        players: [

        ]
      },
      home: {
        abbr: "CHA", name: "Charlotte Hornets", score: null,
        players: [

        ]
      }
    },
      {
      id: "401898389",
      line: "New Orleans Pelicans @ Oklahoma City Thunder (10/6 - 8:00 PM EDT)",
      completed: false,
      statusText: "10/6 - 8:00 PM EDT",
      away: {
        abbr: "NO", name: "New Orleans Pelicans", score: null,
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
      id: "401914128",
      line: "Denver Nuggets @ Utah Jazz (10/6 - 9:00 PM EDT)",
      completed: false,
      statusText: "10/6 - 9:00 PM EDT",
      away: {
        abbr: "DEN", name: "Denver Nuggets", score: null,
        players: [

        ]
      },
      home: {
        abbr: "UTAH", name: "Utah Jazz", score: null,
        players: [

        ]
      }
    },
      {
      id: "401898390",
      line: "Los Angeles Lakers @ Golden State Warriors (10/6 - 10:00 PM EDT)",
      completed: false,
      statusText: "10/6 - 10:00 PM EDT",
      away: {
        abbr: "LAL", name: "Los Angeles Lakers", score: null,
        players: [

        ]
      },
      home: {
        abbr: "GS", name: "Golden State Warriors", score: null,
        players: [

        ]
      }
    }
    ]
  }
  }
};
