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
//    Zuletzt angewendet: 2026-08-12T04:45:18.488Z
//
//  Wird von js/admin.js beim Seitenstart als Basis über PICKS gelegt.
// ============================================================

const PICKS_LIVE = {
  ttYear: 2026,
  espnSeason: 2027,
  aktualisiert: "2026-08-12T04:45:18.488Z",
  automatisch: [{"year":2026,"round":2,"originalOwner":1,"currentOwner":12,"overallPickNumber":24},{"year":2026,"round":3,"originalOwner":1,"currentOwner":12,"overallPickNumber":36},{"year":2026,"round":3,"originalOwner":6,"currentOwner":12,"overallPickNumber":33},{"year":2026,"round":2,"originalOwner":11,"currentOwner":1,"overallPickNumber":13}],
  manuell: [{"datum":"2026-08-11","year":2027,"round":2,"originalOwner":12,"currentOwner":1,"notiz":"Vancouver Curry-Wurst (Andreas) 2027 R2 an Fighting Illini -- Gegenzug zum 11.08. Trade (2x 2026 R3 + 2026 R2 gingen im ESPN-Pick-Sync automatisch an Vancouver)"}],
  get updates() { return this.automatisch.concat(this.manuell); },
};
