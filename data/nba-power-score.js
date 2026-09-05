// ============================================================
//  NBA BOOTLEG POWER SCORE — automatisch generiert von
//  scripts/build-nba-power-score.js. NICHT MANUELL EDITIEREN.
//
//  Platzhalter bis zum ersten Lauf der GitHub Action
//  (.github/workflows/workflow-nba-power-score.yml) bzw. bis die neue
//  Saison genug Spiele + eine abgeschlossene Matchup-Woche hat.
//  js/nba-power-score.js zeigt bei leerem weeks-Array einen
//  Hinweistext statt eines leeren Radars.
// ============================================================
const NBA_POWER_SCORE = {
  season: null,
  generatedAt: null,
  categories: [
    { key: 'ortg', label: 'Offensive Rating', lowerIsBetter: false },
    { key: 'drtg', label: 'Defensive Rating', lowerIsBetter: true },
    { key: 'ptsPg', label: 'Points Scored', lowerIsBetter: false },
    { key: 'oppPtsPg', label: 'Points Allowed', lowerIsBetter: true },
    { key: 'tovPg', label: 'Turnovers', lowerIsBetter: true },
    { key: 'drebPg', label: 'Def. Rebounds', lowerIsBetter: false },
  ],
  weeks: [],
};
