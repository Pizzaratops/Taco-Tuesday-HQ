// ============================================================
//  data/picks-live.js -- Override-Basis für PICKS aus data/picks.js.
//  Zwei Quellen, zwei Abschnitte:
//
//    "automatisch" -- von scripts/sync-espn-picks.js, deckt nur den
//    bevorstehenden ESPN-Draft ab. Unangetastet von diesem Lauf.
//
//    "manuell" -- AUTO-GENERIERT von scripts/apply-pick-journal.js aus
//    scripts/data/pick-trades-manual.txt. Nicht direkt editieren,
//    stattdessen eine Zeile im Journal ergänzen und dieses Script
//    erneut laufen lassen.
//    Zuletzt angewendet: 2026-10-03T08:39:26.523Z
//
//  Wird von js/admin.js beim Seitenstart als Basis über PICKS gelegt.
// ============================================================

const PICKS_LIVE = {
  ttYear: 2026,
  espnSeason: 2027,
  aktualisiert: "2026-10-03T08:39:26.532Z",
  automatisch: [],
  manuell: [{"datum":"2026-08-11","year":2027,"round":2,"originalOwner":12,"currentOwner":1,"notiz":"Vancouver Curry-Wurst (Andreas) 2027 R2 an Fighting Illini -- Gegenzug zum 11.08. Trade (2x 2026 R3 + 2026 R2 gingen im ESPN-Pick-Sync automatisch an Vancouver)"},{"datum":"2026-08-12","year":2028,"round":1,"originalOwner":6,"currentOwner":1,"notiz":"3-Point Mafia 2028 R1 an Fighting Illini -- Gegenzug: FI gibt 2026 R1 Slot 9 (originalOwner 6, urspruenglich von 3PM erworben) zurueck an 3-Point Mafia. Diese Seite laeuft automatisch ueber den ESPN Pick-Sync (Trade ist bereits in ESPN eingetragen), hier nur der weit-voraus-Leg."},{"datum":"2026-09-22","year":2027,"round":2,"originalOwner":6,"currentOwner":11,"notiz":"3-Point Mafia 2027 R2 an Double Dribble Trouble -- Gegenzug fuer Zaccharie Risacher (Trade September 2026). Nachgetragen 23.09.: stand bisher nur direkt in data/picks-live.js"},{"datum":"2026-09-22","year":2027,"round":3,"originalOwner":11,"currentOwner":12,"notiz":"Double Dribble Trouble 2027 R3 an Vancouver Curry-Wurst -- Teil des Haliburton-Trades (Young/Garland/McBride/Pick fuer Haliburton, September 2026). Nachgetragen 23.09.: stand bisher nur direkt in data/picks-live.js"},{"datum":"2026-09-23","year":2027,"round":2,"originalOwner":3,"currentOwner":12,"notiz":"Neukoelln Hustlers 2027 R2 an Vancouver Curry-Wurst -- Teil des Trae-Young-Trades (Banchero/Aldama/Pick fuer Young/Pick)"},{"datum":"2026-09-23","year":2027,"round":3,"originalOwner":11,"currentOwner":3,"notiz":"Double Dribble Trouble 2027 R3 (via Vancouver Curry-Wurst aus dem Haliburton-Trade) an Neukoelln Hustlers -- Teil des Trae-Young-Trades"},{"datum":"2026-09-30","year":2028,"round":3,"originalOwner":12,"currentOwner":1,"notiz":"Vancouver Curry-Wurst 2028 R3 an Fighting Illini (Bear Down) -- Gegenzug fuer Day'Ron Sharpe"},{"datum":"2026-09-30","year":2029,"round":3,"originalOwner":12,"currentOwner":1,"notiz":"Vancouver Curry-Wurst 2029 R3 an Fighting Illini (Bear Down) -- Gegenzug fuer Day'Ron Sharpe"},{"datum":"2026-10-03","year":2028,"round":3,"originalOwner":2,"currentOwner":9,"notiz":"Seagulls 2028 R3 an Cooking Show -- Teil des R2-Swaps im Live Draft (Seagulls 2026 R2 + 2028 R3 fuer Cooking Shows 2026 R2 / Pick 2.02)"}],
  get updates() { return this.automatisch.concat(this.manuell); },
};
