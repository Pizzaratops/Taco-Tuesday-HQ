// ============================================================
//  PROJECTIONS BASELINE — Preseason (Beyaz' finale Projections)
// ============================================================
//  Manuell hochgeladen vor Saisonstart via
//    node scripts/import-projections-baseline.js <xlsx>
//  Wird ab dem ersten Spieltag von scripts/build-live-projections.js
//  mit den echten Boxscore-Stats geblendet (data/live-projections.js) —
//  siehe README, "Season-Start-Plan: Projections-Flow".
//
//  Noch leer — wird befüllt, sobald Beyaz seine finalen Preseason-
//  Projections hochlädt (siehe Import-Script oben).
//
//  Shape: PROJECTIONS_BASELINE["Spielername"] = {
//    min, pts, reb, ast, stl, blk, tpm, tov,   // Pro-Spiel-Schnitte
//    fgm, fga, ftm, fta                          // Pro-Spiel-Schnitte (Makes/Attempts, NICHT Prozent!)
//  }
// ============================================================

const PROJECTIONS_BASELINE = {};
