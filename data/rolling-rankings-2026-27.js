// ============================================================
//  ROLLING RANKINGS — Saison 2026/27 (permanentes Archiv)
// ============================================================
//  AUTO-GENERIERT von scripts/build-rolling-archive.js über die
//  "Daily 9cat Live Scores" GitHub Action. Nicht von Hand editieren
//  — Änderungen werden beim nächsten Lauf überschrieben.
//
//  Anders als data/livescores-aggregate.js (dort werden alte Stichtage
//  gekappt) wird diese Datei NIE gekürzt — jede Kalenderwoche/jeder
//  Kalendermonat bekommt genau einen dauerhaften Eintrag, sobald der
//  Zeitraum vorbei ist, wird er nie wieder verändert.
//
//  composite wird mit fester Kategorie-Gewichtung berechnet:
//  PTS 0.9 · REB 1 · AST 1 · STL 0.75 · BLK 0.75 · 3PM 0.75 ·
//  FG% 1 · FT% 0.85 · TO 0.25 (Games-Played fließt bewusst nicht ein).
//
//  Gleiches Shape wie data/rolling-rankings.js (Saison 2025/26), damit
//  js/rolling-rankings.js beide Saisons identisch behandeln kann:
//  { name, rankings:{Monat:Rang}, weeklyRanks:{Woche:Rang}, eosRank }
//
//  RR2026_WEEK_ORDER (ISO-Wochenstart -> Wochen-Nummer) wird nur intern
//  von diesem Script benutzt, um die Wochen-Nummerierung über mehrere
//  Läufe hinweg stabil zu halten — das Frontend braucht nur
//  RR2026_MONTHS / RR2026_WEEKS / ROLLING_RANKINGS_2026.
// ============================================================

const RR2026_MONTHS = ["Oct"];
const RR2026_WEEKS = [1];
const RR2026_WEEK_ORDER = {"2026-10-05":1};
const ROLLING_RANKINGS_2026 = [
  { name: "Charles Bassey", rankings: { "Oct": 1 }, weeklyRanks: { "1": 7 }, eosRank: 1 },
  { name: "Dalen Terry", rankings: { "Oct": 2 }, weeklyRanks: { "1": 12 }, eosRank: 2 },
  { name: "Brandon Williams", rankings: { "Oct": 3 }, weeklyRanks: { "1": 29 }, eosRank: 3 },
  { name: "Miles Kelly", rankings: { "Oct": 4 }, weeklyRanks: { "1": 28 }, eosRank: 4 },
  { name: "Graham Ike", rankings: { "Oct": 5 }, weeklyRanks: { "1": 30 }, eosRank: 5 },
  { name: "Will Richard", rankings: { "Oct": 6 }, weeklyRanks: { "1": 60 }, eosRank: 6 },
  { name: "Alex Toohey", rankings: { "Oct": 7 }, weeklyRanks: { "1": 63 }, eosRank: 7 },
  { name: "Malevy Leons", rankings: { "Oct": 8 }, weeklyRanks: { "1": 93 }, eosRank: 8 },
  { name: "LJ Cryer", rankings: { "Oct": 9 }, weeklyRanks: { "1": 124 }, eosRank: 9 },
  { name: "Aday Mara", rankings: {  }, weeklyRanks: { "1": 1 }, eosRank: null },
  { name: "Bennett Stirtz", rankings: {  }, weeklyRanks: { "1": 2 }, eosRank: null },
  { name: "Kel'el Ware", rankings: {  }, weeklyRanks: { "1": 3 }, eosRank: null },
  { name: "Ryan Rollins", rankings: {  }, weeklyRanks: { "1": 4 }, eosRank: null },
  { name: "Myles Turner", rankings: {  }, weeklyRanks: { "1": 5 }, eosRank: null },
  { name: "LaMelo Ball", rankings: {  }, weeklyRanks: { "1": 6 }, eosRank: null },
  { name: "Stephen Curry", rankings: {  }, weeklyRanks: { "1": 8 }, eosRank: null },
  { name: "Dillon Brooks", rankings: {  }, weeklyRanks: { "1": 9 }, eosRank: null },
  { name: "Yaxel Lendeborg", rankings: {  }, weeklyRanks: { "1": 10 }, eosRank: null },
  { name: "Cameron Boozer", rankings: {  }, weeklyRanks: { "1": 11 }, eosRank: null },
  { name: "Jake LaRavia", rankings: {  }, weeklyRanks: { "1": 13 }, eosRank: null },
  { name: "Anthony Edwards", rankings: {  }, weeklyRanks: { "1": 14 }, eosRank: null },
  { name: "Jaden McDaniels", rankings: {  }, weeklyRanks: { "1": 15 }, eosRank: null },
  { name: "Taylor Hendricks", rankings: {  }, weeklyRanks: { "1": 16 }, eosRank: null },
  { name: "Sandro Mamukelashvili", rankings: {  }, weeklyRanks: { "1": 17 }, eosRank: null },
  { name: "Ty Jerome", rankings: {  }, weeklyRanks: { "1": 18 }, eosRank: null },
  { name: "Jordan Goodwin", rankings: {  }, weeklyRanks: { "1": 19 }, eosRank: null },
  { name: "GG Jackson", rankings: {  }, weeklyRanks: { "1": 20 }, eosRank: null },
  { name: "Aaron Gordon", rankings: {  }, weeklyRanks: { "1": 21 }, eosRank: null },
  { name: "Julian Strawther", rankings: {  }, weeklyRanks: { "1": 22 }, eosRank: null },
  { name: "Tyler Herro", rankings: {  }, weeklyRanks: { "1": 23 }, eosRank: null },
  { name: "Cameron Carr", rankings: {  }, weeklyRanks: { "1": 24 }, eosRank: null },
  { name: "Ace Bailey", rankings: {  }, weeklyRanks: { "1": 25 }, eosRank: null },
  { name: "Quentin Grimes", rankings: {  }, weeklyRanks: { "1": 26 }, eosRank: null },
  { name: "Chris Manon", rankings: {  }, weeklyRanks: { "1": 27 }, eosRank: null },
  { name: "Tyus Jones", rankings: {  }, weeklyRanks: { "1": 31 }, eosRank: null },
  { name: "Cedric Coward", rankings: {  }, weeklyRanks: { "1": 32 }, eosRank: null },
  { name: "Nikola Jokic", rankings: {  }, weeklyRanks: { "1": 33 }, eosRank: null },
  { name: "Draymond Green", rankings: {  }, weeklyRanks: { "1": 34 }, eosRank: null },
  { name: "Rudy Gobert", rankings: {  }, weeklyRanks: { "1": 35 }, eosRank: null },
  { name: "Cam Spencer", rankings: {  }, weeklyRanks: { "1": 36 }, eosRank: null },
  { name: "Jared McCain", rankings: {  }, weeklyRanks: { "1": 37 }, eosRank: null },
  { name: "Collin Gillespie", rankings: {  }, weeklyRanks: { "1": 38 }, eosRank: null },
  { name: "Luke Kennard", rankings: {  }, weeklyRanks: { "1": 39 }, eosRank: null },
  { name: "Mo Bamba", rankings: {  }, weeklyRanks: { "1": 40 }, eosRank: null },
  { name: "Keyonte George", rankings: {  }, weeklyRanks: { "1": 41 }, eosRank: null },
  { name: "Brooks Barnhizer", rankings: {  }, weeklyRanks: { "1": 42 }, eosRank: null },
  { name: "Brayden Burries", rankings: {  }, weeklyRanks: { "1": 43 }, eosRank: null },
  { name: "Kenrich Williams", rankings: {  }, weeklyRanks: { "1": 44 }, eosRank: null },
  { name: "Jalen Green", rankings: {  }, weeklyRanks: { "1": 45 }, eosRank: null },
  { name: "Darryn Peterson", rankings: {  }, weeklyRanks: { "1": 46 }, eosRank: null },
  { name: "Cameron Johnson", rankings: {  }, weeklyRanks: { "1": 47 }, eosRank: null },
  { name: "Gui Santos", rankings: {  }, weeklyRanks: { "1": 48 }, eosRank: null },
  { name: "Isaiah Collier", rankings: {  }, weeklyRanks: { "1": 49 }, eosRank: null },
  { name: "Ajay Mitchell", rankings: {  }, weeklyRanks: { "1": 50 }, eosRank: null },
  { name: "Jaxson Hayes", rankings: {  }, weeklyRanks: { "1": 51 }, eosRank: null },
  { name: "Joan Beringer", rankings: {  }, weeklyRanks: { "1": 52 }, eosRank: null },
  { name: "Terrence Shannon Jr.", rankings: {  }, weeklyRanks: { "1": 53 }, eosRank: null },
  { name: "Marvin Bagley III", rankings: {  }, weeklyRanks: { "1": 54 }, eosRank: null },
  { name: "Jaren Jackson Jr.", rankings: {  }, weeklyRanks: { "1": 55 }, eosRank: null },
  { name: "Jaden Hardy", rankings: {  }, weeklyRanks: { "1": 56 }, eosRank: null },
  { name: "Miles Bridges", rankings: {  }, weeklyRanks: { "1": 57 }, eosRank: null },
  { name: "Kevon Looney", rankings: {  }, weeklyRanks: { "1": 58 }, eosRank: null },
  { name: "Jerami Grant", rankings: {  }, weeklyRanks: { "1": 59 }, eosRank: null },
  { name: "Brandin Podziemski", rankings: {  }, weeklyRanks: { "1": 61 }, eosRank: null },
  { name: "Jarred Vanderbilt", rankings: {  }, weeklyRanks: { "1": 62 }, eosRank: null },
  { name: "Trevon Brazile", rankings: {  }, weeklyRanks: { "1": 64 }, eosRank: null },
  { name: "Khaman Maluach", rankings: {  }, weeklyRanks: { "1": 65 }, eosRank: null },
  { name: "Bones Hyland", rankings: {  }, weeklyRanks: { "1": 66 }, eosRank: null },
  { name: "Walter Clayton Jr.", rankings: {  }, weeklyRanks: { "1": 67 }, eosRank: null },
  { name: "Ryan Dunn", rankings: {  }, weeklyRanks: { "1": 68 }, eosRank: null },
  { name: "Jaime Jaquez Jr.", rankings: {  }, weeklyRanks: { "1": 69 }, eosRank: null },
  { name: "Harrison Ingram", rankings: {  }, weeklyRanks: { "1": 70 }, eosRank: null },
  { name: "Blake Hinson", rankings: {  }, weeklyRanks: { "1": 71 }, eosRank: null },
  { name: "Trey Lyles", rankings: {  }, weeklyRanks: { "1": 72 }, eosRank: null },
  { name: "Scotty Pippen Jr.", rankings: {  }, weeklyRanks: { "1": 73 }, eosRank: null },
  { name: "Ryan Nembhard", rankings: {  }, weeklyRanks: { "1": 74 }, eosRank: null },
  { name: "Ayo Dosunmu", rankings: {  }, weeklyRanks: { "1": 75 }, eosRank: null },
  { name: "Josh Okogie", rankings: {  }, weeklyRanks: { "1": 76 }, eosRank: null },
  { name: "Cam Whitmore", rankings: {  }, weeklyRanks: { "1": 77 }, eosRank: null },
  { name: "DaRon Holmes II", rankings: {  }, weeklyRanks: { "1": 78 }, eosRank: null },
  { name: "Devin Booker", rankings: {  }, weeklyRanks: { "1": 79 }, eosRank: null },
  { name: "Oso Ighodaro", rankings: {  }, weeklyRanks: { "1": 80 }, eosRank: null },
  { name: "Cody Williams", rankings: {  }, weeklyRanks: { "1": 81 }, eosRank: null },
  { name: "Svi Mykhailiuk", rankings: {  }, weeklyRanks: { "1": 82 }, eosRank: null },
  { name: "Bronny James", rankings: {  }, weeklyRanks: { "1": 83 }, eosRank: null },
  { name: "Jaylen Wells", rankings: {  }, weeklyRanks: { "1": 84 }, eosRank: null },
  { name: "Jamaree Bouyea", rankings: {  }, weeklyRanks: { "1": 85 }, eosRank: null },
  { name: "Quinten Post", rankings: {  }, weeklyRanks: { "1": 86 }, eosRank: null },
  { name: "Anthony Pritchard", rankings: {  }, weeklyRanks: { "1": 87 }, eosRank: null },
  { name: "DeMar DeRozan", rankings: {  }, weeklyRanks: { "1": 88 }, eosRank: null },
  { name: "Adou Thiero", rankings: {  }, weeklyRanks: { "1": 89 }, eosRank: null },
  { name: "Olivier-Maxence Prosper", rankings: {  }, weeklyRanks: { "1": 90 }, eosRank: null },
  { name: "Jericho Sims", rankings: {  }, weeklyRanks: { "1": 91 }, eosRank: null },
  { name: "De'Anthony Melton", rankings: {  }, weeklyRanks: { "1": 92 }, eosRank: null },
  { name: "Gary Payton II", rankings: {  }, weeklyRanks: { "1": 94 }, eosRank: null },
  { name: "Pete Nance", rankings: {  }, weeklyRanks: { "1": 95 }, eosRank: null },
  { name: "Josh Dix", rankings: {  }, weeklyRanks: { "1": 96 }, eosRank: null },
  { name: "Zeke Nnaji", rankings: {  }, weeklyRanks: { "1": 97 }, eosRank: null },
  { name: "Javon Small", rankings: {  }, weeklyRanks: { "1": 98 }, eosRank: null },
  { name: "Zyon Pullin", rankings: {  }, weeklyRanks: { "1": 99 }, eosRank: null },
  { name: "Carson Cooper", rankings: {  }, weeklyRanks: { "1": 100 }, eosRank: null },
  { name: "Christian Braun", rankings: {  }, weeklyRanks: { "1": 101 }, eosRank: null },
  { name: "Alpha Diallo", rankings: {  }, weeklyRanks: { "1": 102 }, eosRank: null },
  { name: "Jaylen Clark", rankings: {  }, weeklyRanks: { "1": 103 }, eosRank: null },
  { name: "Enrique Freeman", rankings: {  }, weeklyRanks: { "1": 104 }, eosRank: null },
  { name: "Dalton Knecht", rankings: {  }, weeklyRanks: { "1": 105 }, eosRank: null },
  { name: "Karim Lopez", rankings: {  }, weeklyRanks: { "1": 106 }, eosRank: null },
  { name: "Jonathan Kuminga", rankings: {  }, weeklyRanks: { "1": 107 }, eosRank: null },
  { name: "Christoph Tilly", rankings: {  }, weeklyRanks: { "1": 108 }, eosRank: null },
  { name: "Jonas Aidoo", rankings: {  }, weeklyRanks: { "1": 109 }, eosRank: null },
  { name: "Lonnie Walker IV", rankings: {  }, weeklyRanks: { "1": 110 }, eosRank: null },
  { name: "Kris Murray", rankings: {  }, weeklyRanks: { "1": 111 }, eosRank: null },
  { name: "Pat Spencer", rankings: {  }, weeklyRanks: { "1": 112 }, eosRank: null },
  { name: "Trey Alexander", rankings: {  }, weeklyRanks: { "1": 113 }, eosRank: null },
  { name: "Nate Ament", rankings: {  }, weeklyRanks: { "1": 114 }, eosRank: null },
  { name: "Georges Niang", rankings: {  }, weeklyRanks: { "1": 115 }, eosRank: null },
  { name: "Norchad Omier", rankings: {  }, weeklyRanks: { "1": 116 }, eosRank: null },
  { name: "Otega Oweh", rankings: {  }, weeklyRanks: { "1": 117 }, eosRank: null },
  { name: "Rasheer Fleming", rankings: {  }, weeklyRanks: { "1": 118 }, eosRank: null },
  { name: "Andrew Holifield", rankings: {  }, weeklyRanks: { "1": 119 }, eosRank: null },
  { name: "William Kyle III", rankings: {  }, weeklyRanks: { "1": 120 }, eosRank: null },
  { name: "Bryce Hopkins", rankings: {  }, weeklyRanks: { "1": 121 }, eosRank: null },
  { name: "Isaiah Evans", rankings: {  }, weeklyRanks: { "1": 122 }, eosRank: null },
  { name: "Haywood Highsmith", rankings: {  }, weeklyRanks: { "1": 123 }, eosRank: null },
  { name: "Koa Peat", rankings: {  }, weeklyRanks: { "1": 125 }, eosRank: null },
  { name: "Tamar Bates", rankings: {  }, weeklyRanks: { "1": 126 }, eosRank: null }
];
