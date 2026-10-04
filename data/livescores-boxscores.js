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
      line: "Miami Heat @ Toronto Raptors (10/3 - 7:00 PM EDT)",
      completed: false,
      statusText: "10/3 - 7:00 PM EDT",
      away: {
        abbr: "MIA", name: "Miami Heat", score: null,
        players: [

        ]
      },
      home: {
        abbr: "TOR", name: "Toronto Raptors", score: null,
        players: [

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
  }
  }
};
