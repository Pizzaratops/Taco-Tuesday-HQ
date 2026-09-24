// ============================================================
//  data/picks-live.js -- Override-Basis fuer PICKS aus data/picks.js.
//  Zwei Quellen, zwei Abschnitte:
//
//    "automatisch" -- AUTO-GENERIERT von scripts/sync-espn-picks.js
//    über die "Daily 9cat Live Scores" GitHub Action. Nicht von Hand
//    editieren, wird bei jedem Lauf komplett neu geschrieben. Deckt
//    AUSSCHLIESSLICH den bevorstehenden ESPN-Draft ab (TTHQ-Jahr
//    2026 = ESPN-Saison 2027).
//    Zuletzt synchronisiert: 2026-09-24T12:39:24.491Z
//
//    "manuell" -- von scripts/apply-pick-journal.js aus
//    scripts/data/pick-trades-manual.txt geschrieben. Deckt Picks fuer
//    spaetere Drafts ab, die ESPN nie sieht. Bleibt bei einem Lauf
//    dieses Scripts unangetastet stehen.
//
//  Wird von js/admin.js beim Seitenstart als Basis über PICKS gelegt
//  (_hydratePicksFromLiveFile), bevor ein manueller Admin-Override
//  (falls vorhanden) das letzte Wort behält. Legt NIE einen neuen Pick
//  an -- nur (year,round,originalOwner)-Tripel, die data/picks.js
//  bereits kennt, werden aktualisiert.
// ============================================================

const PICKS_LIVE = {
  ttYear: 2026,
  espnSeason: 2027,
  aktualisiert: "2026-09-24T12:39:24.491Z",
  automatisch: [{"year":2026,"round":1,"originalOwner":11,"currentOwner":1,"overallPickNumber":1},{"year":2026,"round":1,"originalOwner":9,"currentOwner":1,"overallPickNumber":2},{"year":2026,"round":1,"originalOwner":7,"currentOwner":1,"overallPickNumber":3},{"year":2026,"round":1,"originalOwner":4,"currentOwner":1,"overallPickNumber":4},{"year":2026,"round":1,"originalOwner":12,"currentOwner":7,"overallPickNumber":5},{"year":2026,"round":1,"originalOwner":10,"currentOwner":1,"overallPickNumber":6},{"year":2026,"round":1,"originalOwner":6,"currentOwner":6,"overallPickNumber":9},{"year":2026,"round":1,"originalOwner":3,"currentOwner":1,"overallPickNumber":10},{"year":2026,"round":1,"originalOwner":2,"currentOwner":11,"overallPickNumber":11},{"year":2026,"round":2,"originalOwner":11,"currentOwner":1,"overallPickNumber":13},{"year":2026,"round":2,"originalOwner":1,"currentOwner":12,"overallPickNumber":24},{"year":2026,"round":3,"originalOwner":7,"currentOwner":12,"overallPickNumber":27},{"year":2026,"round":3,"originalOwner":12,"currentOwner":7,"overallPickNumber":29},{"year":2026,"round":3,"originalOwner":6,"currentOwner":12,"overallPickNumber":33},{"year":2026,"round":3,"originalOwner":2,"currentOwner":9,"overallPickNumber":35},{"year":2026,"round":3,"originalOwner":1,"currentOwner":12,"overallPickNumber":36},{"year":2026,"round":4,"originalOwner":2,"currentOwner":9,"overallPickNumber":47},{"year":2026,"round":4,"originalOwner":1,"currentOwner":2,"overallPickNumber":48}],
  manuell: [{"datum":"2026-08-11","year":2027,"round":2,"originalOwner":12,"currentOwner":1,"notiz":"Vancouver Curry-Wurst (Andreas) 2027 R2 an Fighting Illini -- Gegenzug zum 11.08. Trade (2x 2026 R3 + 2026 R2 gingen im ESPN-Pick-Sync automatisch an Vancouver)"},{"datum":"2026-08-12","year":2028,"round":1,"originalOwner":6,"currentOwner":1,"notiz":"3-Point Mafia 2028 R1 an Fighting Illini -- Gegenzug: FI gibt 2026 R1 Slot 9 (originalOwner 6, urspruenglich von 3PM erworben) zurueck an 3-Point Mafia. Diese Seite laeuft automatisch ueber den ESPN Pick-Sync (Trade ist bereits in ESPN eingetragen), hier nur der weit-voraus-Leg."},{"datum":"2026-09-22","year":2027,"round":2,"originalOwner":6,"currentOwner":11,"notiz":"3-Point Mafia 2027 R2 an Double Dribble Trouble -- Gegenzug fuer Zaccharie Risacher (Trade September 2026). Nachgetragen 23.09.: stand bisher nur direkt in data/picks-live.js"},{"datum":"2026-09-22","year":2027,"round":3,"originalOwner":11,"currentOwner":12,"notiz":"Double Dribble Trouble 2027 R3 an Vancouver Curry-Wurst -- Teil des Haliburton-Trades (Young/Garland/McBride/Pick fuer Haliburton, September 2026). Nachgetragen 23.09.: stand bisher nur direkt in data/picks-live.js"},{"datum":"2026-09-23","year":2027,"round":2,"originalOwner":3,"currentOwner":12,"notiz":"Neukoelln Hustlers 2027 R2 an Vancouver Curry-Wurst -- Teil des Trae-Young-Trades (Banchero/Aldama/Pick fuer Young/Pick)"},{"datum":"2026-09-23","year":2027,"round":3,"originalOwner":11,"currentOwner":3,"notiz":"Double Dribble Trouble 2027 R3 (via Vancouver Curry-Wurst aus dem Haliburton-Trade) an Neukoelln Hustlers -- Teil des Trae-Young-Trades"}],
  // Fuer die Hydrierung in js/admin.js zaehlt die Summe beider Listen.
  get updates() { return this.automatisch.concat(this.manuell); },
};
