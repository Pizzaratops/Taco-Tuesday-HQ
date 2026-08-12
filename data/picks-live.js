// ============================================================
//  data/picks-live.js -- Override-Basis fuer PICKS aus data/picks.js.
//  Zwei Quellen, zwei Abschnitte:
//
//    "automatisch" -- AUTO-GENERIERT von scripts/sync-espn-picks.js
//    über die "Daily 9cat Live Scores" GitHub Action. Nicht von Hand
//    editieren, wird bei jedem Lauf komplett neu geschrieben. Deckt
//    AUSSCHLIESSLICH den bevorstehenden ESPN-Draft ab (TTHQ-Jahr 2026
//    = ESPN-Saison 2027).
//    Initial-Stand (Hand-Eintrag vor dem ersten automatischen Lauf),
//    aus dem verifizierten ESPN-Pick-Trade-Bericht vom 11.08.2026.
//
//    "manuell" -- von scripts/apply-pick-journal.js aus
//    scripts/data/pick-trades-manual.txt geschrieben. Deckt Picks für
//    spätere Drafts ab, die ESPN nie sieht.
//
//  Wird von js/admin.js beim Seitenstart als Basis über PICKS gelegt
//  (_hydratePicksFromLiveFile), bevor ein manueller Admin-Override
//  (falls vorhanden) das letzte Wort behält.
// ============================================================

const PICKS_LIVE = {
  ttYear: 2026,
  espnSeason: 2027,
  aktualisiert: "2026-08-11T21:03:10.417Z",
  automatisch: [
    // Fighting Illini (1) -> Vancouver Curry-Wurst (12): 2 R3 + 1 R2,
    // aus mTransactions2 (transaktionId 457b49b6..., 11.08.2026 09:28 UTC)
    { year: 2026, round: 2, originalOwner: 1, currentOwner: 12, overallPickNumber: 24 },
    { year: 2026, round: 3, originalOwner: 1, currentOwner: 12, overallPickNumber: 36 },
    { year: 2026, round: 3, originalOwner: 6, currentOwner: 12, overallPickNumber: 33 },
    // Double Dribble Trouble (11) -> Fighting Illini (1): R2
    // (Kawhi/Murray/Poole/Hendricks/Butler <-> Beringer Trade)
    { year: 2026, round: 2, originalOwner: 11, currentOwner: 1, overallPickNumber: 13 },
  ],
  manuell: [],
  // Fuer die Hydrierung in js/admin.js zaehlt die Summe beider Listen.
  get updates() { return this.automatisch.concat(this.manuell); },
};
