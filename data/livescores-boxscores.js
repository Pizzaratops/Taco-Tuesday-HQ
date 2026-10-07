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
      line: "Minnesota Timberwolves @ Indiana Pacers (10/7 - 7:00 PM EDT)",
      completed: false,
      statusText: "10/7 - 7:00 PM EDT",
      away: {
        abbr: "MIN", name: "Minnesota Timberwolves", score: null,
        players: [

        ]
      },
      home: {
        abbr: "IND", name: "Indiana Pacers", score: null,
        players: [

        ]
      }
    },
      {
      id: "401898391",
      line: "Orlando Magic @ Memphis Grizzlies (10/7 - 8:00 PM EDT)",
      completed: false,
      statusText: "10/7 - 8:00 PM EDT",
      away: {
        abbr: "ORL", name: "Orlando Magic", score: null,
        players: [

        ]
      },
      home: {
        abbr: "MEM", name: "Memphis Grizzlies", score: null,
        players: [

        ]
      }
    },
      {
      id: "401908620",
      line: "Milwaukee Bucks @ Oklahoma City Thunder (10/7 - 8:00 PM EDT)",
      completed: false,
      statusText: "10/7 - 8:00 PM EDT",
      away: {
        abbr: "MIL", name: "Milwaukee Bucks", score: null,
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
      id: "401908939",
      line: "Phoenix Suns @ Chicago Bulls (10/7 - 8:00 PM EDT)",
      completed: false,
      statusText: "10/7 - 8:00 PM EDT",
      away: {
        abbr: "PHX", name: "Phoenix Suns", score: null,
        players: [

        ]
      },
      home: {
        abbr: "CHI", name: "Chicago Bulls", score: null,
        players: [

        ]
      }
    },
      {
      id: "401914129",
      line: "Golden State Warriors @ Portland Trail Blazers (10/7 - 10:00 PM EDT)",
      completed: false,
      statusText: "10/7 - 10:00 PM EDT",
      away: {
        abbr: "GS", name: "Golden State Warriors", score: null,
        players: [

        ]
      },
      home: {
        abbr: "POR", name: "Portland Trail Blazers", score: null,
        players: [

        ]
      }
    }
    ]
  }
  }
};
