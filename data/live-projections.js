// ============================================================
//  LIVE PROJECTIONS
// ============================================================
//  AUTO-GENERIERT von scripts/build-live-projections.js. Nicht von
//  Hand editieren. Blend aus data/projections-baseline.js (Preseason)
//  + den echten Saison-Stats bisher. Siehe README "Season-Start-Plan:
//  Projections-Flow".
//
//  Noch leer — wird ab dem ersten Spieltag der Saison automatisch
//  befüllt, sobald scripts/build-live-projections.js Teil der
//  täglichen Pipeline ist (siehe README).
//
//  Shape: LIVE_PROJECTIONS["Spielername"] = {
//    min, pts, reb, ast, stl, blk, tpm, tov, fgm, fga, ftm, fta,  // Pro-Spiel-Schnitte, geblendet
//    fgPct, ftPct,        // aus geblendeten Makes/Attempts berechnet, NICHT gemittelt
//    gamesPlayed,          // echte Spiele bisher in dieser Liga
//    hasBaseline,          // false = kein Preseason-Wert vorhanden, reiner Saison-Schnitt
//  }
// ============================================================

const LIVE_PROJECTIONS = {};
