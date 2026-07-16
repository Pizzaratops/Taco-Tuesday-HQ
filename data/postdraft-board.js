// ============================================================
//  POST-DRAFT BEST AVAILABLE BOARD — 2026 Draft Class
// ============================================================
//  AUTO-GENERIERT von scripts/build-postdraft-board.js über die
//  "Daily 9cat Live Scores" GitHub Action. Nicht von Hand editieren.
//  Zuletzt aktualisiert: 2026-07-16
//
//  Kombiniert (gewichtet, mit anteiliger Umverteilung bei fehlenden
//  Signalen): Pre-Draft Big Board (25%) + echte Draft Capital (20%)
//  + Off-Season-Performance aus Summer League/Preseason (30%) +
//  Sticky Score aus Pizzaratops/Summer-League-Modell (25%).
//
//  Shape: POSTDRAFT_BOARD = [ { rank, name, pos, nbaTeam, drafted,
//    draftPick, preDraftPick, tier, offseasonComposite, stickyScore,
//    compositeScore, signalsUsed }, ... ]
// ============================================================

const POSTDRAFT_BOARD = [
  { rank: 1, name: "AJ Dybantsa", pos: "SF", nbaTeam: "WAS", drafted: true, draftPick: 1, preDraftPick: 3, tier: "Tier 1", offseasonComposite: 10.61, stickyScore: 12.01, compositeScore: 1.62, signalsUsed: ["preDraft","draftCap","offseason","sticky"] },
  { rank: 2, name: "Brayden Burries", pos: "SG", nbaTeam: "MIL", drafted: true, draftPick: 10, preDraftPick: 11, tier: "Tier 3", offseasonComposite: 8.62, stickyScore: 16.23, compositeScore: 1.53, signalsUsed: ["preDraft","draftCap","offseason","sticky"] },
  { rank: 3, name: "Morez Johnson Jr.", pos: "PF", nbaTeam: "DAL", drafted: true, draftPick: 9, preDraftPick: 13, tier: "Tier 3", offseasonComposite: 12.92, stickyScore: 5.03, compositeScore: 1.23, signalsUsed: ["preDraft","draftCap","offseason","sticky"] },
  { rank: 4, name: "Meleek Thomas", pos: "SG", nbaTeam: "CLE", drafted: true, draftPick: 34, preDraftPick: 29, tier: "Tier 6", offseasonComposite: 14.48, stickyScore: 9.23, compositeScore: 1.16, signalsUsed: ["preDraft","draftCap","offseason","sticky"] },
  { rank: 5, name: "Caleb Wilson", pos: "SF/PF", nbaTeam: "CHI", drafted: true, draftPick: 4, preDraftPick: 4, tier: "Tier 1.5", offseasonComposite: 6.07, stickyScore: 9.06, compositeScore: 1.12, signalsUsed: ["preDraft","draftCap","offseason","sticky"] },
  { rank: 6, name: "Cameron Boozer", pos: "PF", nbaTeam: "MEM", drafted: true, draftPick: 3, preDraftPick: 1, tier: "Tier 1", offseasonComposite: 6.97, stickyScore: 5.66, compositeScore: 1.05, signalsUsed: ["preDraft","draftCap","offseason","sticky"] },
  { rank: 7, name: "Yaxel Lendeborg", pos: "PF", nbaTeam: "GSW", drafted: true, draftPick: 11, preDraftPick: 8, tier: "Tier 2", offseasonComposite: 7.25, stickyScore: 7.32, compositeScore: 1.01, signalsUsed: ["preDraft","draftCap","offseason","sticky"] },
  { rank: 8, name: "Darryn Peterson", pos: "SG/PG", nbaTeam: "UTA", drafted: true, draftPick: 2, preDraftPick: 2, tier: "Tier 1", offseasonComposite: 5.03, stickyScore: 5.6, compositeScore: 0.91, signalsUsed: ["preDraft","draftCap","offseason","sticky"] },
  { rank: 9, name: "Jayden Quaintance", pos: "C", nbaTeam: "SAS", drafted: true, draftPick: 20, preDraftPick: 17, tier: "Tier 4", offseasonComposite: null, stickyScore: null, compositeScore: 0.78, signalsUsed: ["preDraft","draftCap"] },
  { rank: 10, name: "Allen Graves", pos: "PF", nbaTeam: "TOR", drafted: true, draftPick: 19, preDraftPick: 19, tier: "Tier 4", offseasonComposite: 9.08, stickyScore: 3.55, compositeScore: 0.73, signalsUsed: ["preDraft","draftCap","offseason","sticky"] },
  { rank: 11, name: "Mikel Brown Jr.", pos: "SG", nbaTeam: "BKN", drafted: true, draftPick: 6, preDraftPick: 12, tier: "Tier 3", offseasonComposite: 4.71, stickyScore: 4.86, compositeScore: 0.68, signalsUsed: ["preDraft","draftCap","offseason","sticky"] },
  { rank: 12, name: "Karim Lopez", pos: "SF/PF", nbaTeam: "MEM", drafted: true, draftPick: 21, preDraftPick: 25, tier: "Tier 5", offseasonComposite: null, stickyScore: null, compositeScore: 0.52, signalsUsed: ["preDraft","draftCap"] },
  { rank: 13, name: "Labaron Philon Jr.", pos: "PG", nbaTeam: "PHI", drafted: true, draftPick: 22, preDraftPick: 9, tier: "Tier 3", offseasonComposite: 4.24, stickyScore: 3.12, compositeScore: 0.49, signalsUsed: ["preDraft","draftCap","offseason","sticky"] },
  { rank: 14, name: "Kingston Flemings", pos: "PG", nbaTeam: "ATL", drafted: true, draftPick: 8, preDraftPick: 6, tier: "Tier 2", offseasonComposite: 2.52, stickyScore: 1.99, compositeScore: 0.45, signalsUsed: ["preDraft","draftCap","offseason","sticky"] },
  { rank: 15, name: "Hannes Steinbach", pos: "PF", nbaTeam: "CHA", drafted: true, draftPick: 14, preDraftPick: 10, tier: "Tier 3", offseasonComposite: 3.85, stickyScore: 2.04, compositeScore: 0.45, signalsUsed: ["preDraft","draftCap","offseason","sticky"] },
  { rank: 16, name: "Darius Acuff Jr.", pos: "PG", nbaTeam: "SAC", drafted: true, draftPick: 7, preDraftPick: 7, tier: "Tier 2", offseasonComposite: 1.59, stickyScore: 3.14, compositeScore: 0.43, signalsUsed: ["preDraft","draftCap","offseason","sticky"] },
  { rank: 17, name: "Cameron Carr", pos: "SG", nbaTeam: "LAL", drafted: true, draftPick: 24, preDraftPick: 21, tier: "Tier 5", offseasonComposite: 4.31, stickyScore: 5.27, compositeScore: 0.42, signalsUsed: ["preDraft","draftCap","offseason","sticky"] },
  { rank: 18, name: "Keaton Wagler", pos: "SG/PG", nbaTeam: "LAC", drafted: true, draftPick: 5, preDraftPick: 5, tier: "Tier 1.5", offseasonComposite: 1.42, stickyScore: -0.6, compositeScore: 0.27, signalsUsed: ["preDraft","draftCap","offseason","sticky"] },
  { rank: 19, name: "Aday Mara", pos: "C", nbaTeam: "OKC", drafted: true, draftPick: 12, preDraftPick: 15, tier: "Tier 4", offseasonComposite: -0.06, stickyScore: 2.02, compositeScore: 0.12, signalsUsed: ["preDraft","draftCap","offseason","sticky"] },
  { rank: 20, name: "Nate Ament", pos: "PF", nbaTeam: "MIL", drafted: true, draftPick: 13, preDraftPick: 14, tier: "Tier 4", offseasonComposite: 0.99, stickyScore: -0.35, compositeScore: 0.07, signalsUsed: ["preDraft","draftCap","offseason","sticky"] },
  { rank: 21, name: "Chris Cenac Jr.", pos: "PF/C", nbaTeam: "BOS", drafted: true, draftPick: 27, preDraftPick: 24, tier: "Tier 5", offseasonComposite: 2.6, stickyScore: 1.8, compositeScore: 0.06, signalsUsed: ["preDraft","draftCap","offseason","sticky"] },
  { rank: 22, name: "Sergio De Larrea", pos: "PG", nbaTeam: "DAL", drafted: true, draftPick: 25, preDraftPick: 41, tier: "Mystery", offseasonComposite: 4.34, stickyScore: 2.84, compositeScore: 0.01, signalsUsed: ["preDraft","draftCap","offseason","sticky"] },
  { rank: 23, name: "Tyler Tanner", pos: "PG", nbaTeam: null, drafted: false, draftPick: null, preDraftPick: 18, tier: "Tier 4", offseasonComposite: null, stickyScore: null, compositeScore: -0.06, signalsUsed: ["preDraft","draftCap"] },
  { rank: 24, name: "Bennett Stirtz", pos: "PG", nbaTeam: "OKC", drafted: true, draftPick: 16, preDraftPick: 32, tier: "Mystery", offseasonComposite: 2.96, stickyScore: -0.49, compositeScore: -0.07, signalsUsed: ["preDraft","draftCap","offseason","sticky"] },
  { rank: 25, name: "Amari Allen", pos: "SF", nbaTeam: null, drafted: false, draftPick: null, preDraftPick: 22, tier: "Tier 5", offseasonComposite: null, stickyScore: null, compositeScore: -0.18, signalsUsed: ["preDraft","draftCap"] },
  { rank: 26, name: "Isiah Evans", pos: "PG/SG", nbaTeam: null, drafted: false, draftPick: null, preDraftPick: 23, tier: "Tier 5", offseasonComposite: null, stickyScore: null, compositeScore: -0.22, signalsUsed: ["preDraft","draftCap"] },
  { rank: 27, name: "Henri Veesaar", pos: "C", nbaTeam: "ATL", drafted: true, draftPick: 52, preDraftPick: 27, tier: "Tier 5", offseasonComposite: 1.23, stickyScore: 1.63, compositeScore: -0.25, signalsUsed: ["preDraft","draftCap","offseason","sticky"] },
  { rank: 28, name: "Koa Peat", pos: "PF", nbaTeam: "PHO", drafted: true, draftPick: 30, preDraftPick: 31, tier: "Mystery", offseasonComposite: 1.47, stickyScore: -1.36, compositeScore: -0.3, signalsUsed: ["preDraft","draftCap","offseason","sticky"] },
  { rank: 29, name: "Tounde Yessoufou", pos: "SF", nbaTeam: null, drafted: false, draftPick: null, preDraftPick: 26, tier: "Tier 5", offseasonComposite: null, stickyScore: null, compositeScore: -0.31, signalsUsed: ["preDraft","draftCap"] },
  { rank: 30, name: "Flory Bidunga", pos: "C", nbaTeam: null, drafted: false, draftPick: null, preDraftPick: 28, tier: "Tier 6", offseasonComposite: null, stickyScore: null, compositeScore: -0.37, signalsUsed: ["preDraft","draftCap"] },
  { rank: 31, name: "Braden Smith", pos: "PG", nbaTeam: "IND", drafted: true, draftPick: 38, preDraftPick: 45, tier: "Mystery", offseasonComposite: 2.45, stickyScore: 0.82, compositeScore: -0.37, signalsUsed: ["preDraft","draftCap","offseason","sticky"] },
  { rank: 32, name: "Motiejus Krivas", pos: "C", nbaTeam: null, drafted: false, draftPick: null, preDraftPick: 30, tier: "Tier 6", offseasonComposite: null, stickyScore: null, compositeScore: -0.43, signalsUsed: ["preDraft","draftCap"] },
  { rank: 33, name: "Neoklis Avdalas", pos: "PG", nbaTeam: null, drafted: false, draftPick: null, preDraftPick: 34, tier: "Mystery", offseasonComposite: null, stickyScore: null, compositeScore: -0.56, signalsUsed: ["preDraft","draftCap"] },
  { rank: 34, name: "Dame Sarr", pos: "SF", nbaTeam: null, drafted: false, draftPick: null, preDraftPick: 35, tier: "Mystery", offseasonComposite: null, stickyScore: null, compositeScore: -0.59, signalsUsed: ["preDraft","draftCap"] },
  { rank: 35, name: "Dash Daniels", pos: "SG", nbaTeam: null, drafted: false, draftPick: null, preDraftPick: 37, tier: "Mystery", offseasonComposite: null, stickyScore: null, compositeScore: -0.65, signalsUsed: ["preDraft","draftCap"] },
  { rank: 36, name: "JT Toppin", pos: "PF", nbaTeam: null, drafted: false, draftPick: null, preDraftPick: 39, tier: "Mystery", offseasonComposite: null, stickyScore: 0.18, compositeScore: -0.65, signalsUsed: ["preDraft","draftCap","sticky"] },
  { rank: 37, name: "Dailyn Swain", pos: "SF", nbaTeam: "CHI", drafted: true, draftPick: 15, preDraftPick: 16, tier: "Tier 4", offseasonComposite: -4.68, stickyScore: -7.39, compositeScore: -0.73, signalsUsed: ["preDraft","draftCap","offseason","sticky"] },
  { rank: 38, name: "Tahaad Pettiford", pos: "PG", nbaTeam: null, drafted: false, draftPick: null, preDraftPick: 40, tier: "Mystery", offseasonComposite: null, stickyScore: null, compositeScore: -0.75, signalsUsed: ["preDraft","draftCap"] },
  { rank: 39, name: "Christian Anderson", pos: "PG", nbaTeam: "CHA", drafted: true, draftPick: 18, preDraftPick: 38, tier: "Mystery", offseasonComposite: -2.42, stickyScore: -5.2, compositeScore: -0.79, signalsUsed: ["preDraft","draftCap","offseason","sticky"] },
  { rank: 40, name: "Alex Condon", pos: "C", nbaTeam: null, drafted: false, draftPick: null, preDraftPick: 42, tier: "Mystery", offseasonComposite: null, stickyScore: null, compositeScore: -0.81, signalsUsed: ["preDraft","draftCap"] },
  { rank: 41, name: "Miles Byrd", pos: "SF", nbaTeam: null, drafted: false, draftPick: null, preDraftPick: 43, tier: "Mystery", offseasonComposite: null, stickyScore: null, compositeScore: -0.84, signalsUsed: ["preDraft","draftCap"] },
  { rank: 42, name: "Alex Karaban", pos: "PF", nbaTeam: "SAS", drafted: true, draftPick: 29, preDraftPick: 44, tier: "Mystery", offseasonComposite: -1.26, stickyScore: -5.36, compositeScore: -0.87, signalsUsed: ["preDraft","draftCap","offseason","sticky"] },
  { rank: 43, name: "Milos Uzan", pos: "PG", nbaTeam: null, drafted: false, draftPick: null, preDraftPick: 55, tier: "Mystery", offseasonComposite: 1.53, stickyScore: -0.28, compositeScore: -0.87, signalsUsed: ["preDraft","draftCap","offseason","sticky"] },
  { rank: 44, name: "Kylan Boswell", pos: "PG", nbaTeam: null, drafted: false, draftPick: null, preDraftPick: 59, tier: "Mystery", offseasonComposite: 0.04, stickyScore: 2.19, compositeScore: -0.91, signalsUsed: ["preDraft","draftCap","offseason","sticky"] },
  { rank: 45, name: "Andrej Stojakovic", pos: "SG", nbaTeam: null, drafted: false, draftPick: null, preDraftPick: 46, tier: "Mystery", offseasonComposite: null, stickyScore: null, compositeScore: -0.94, signalsUsed: ["preDraft","draftCap"] },
  { rank: 46, name: "JoJo Tugler", pos: "PF", nbaTeam: null, drafted: false, draftPick: null, preDraftPick: 47, tier: "Mystery", offseasonComposite: null, stickyScore: null, compositeScore: -0.97, signalsUsed: ["preDraft","draftCap"] },
  { rank: 47, name: "Boogie Fland", pos: "PG", nbaTeam: null, drafted: false, draftPick: null, preDraftPick: 48, tier: "Mystery", offseasonComposite: null, stickyScore: null, compositeScore: -1, signalsUsed: ["preDraft","draftCap"] },
  { rank: 48, name: "Tomislav Ivisic", pos: "C", nbaTeam: null, drafted: false, draftPick: null, preDraftPick: 49, tier: "Mystery", offseasonComposite: null, stickyScore: null, compositeScore: -1.03, signalsUsed: ["preDraft","draftCap"] },
  { rank: 49, name: "Ian Jackson", pos: "SG", nbaTeam: null, drafted: false, draftPick: null, preDraftPick: 50, tier: "Mystery", offseasonComposite: null, stickyScore: null, compositeScore: -1.06, signalsUsed: ["preDraft","draftCap"] },
  { rank: 50, name: "Daniel Jacobsen", pos: "C", nbaTeam: null, drafted: false, draftPick: null, preDraftPick: 51, tier: "Mystery", offseasonComposite: null, stickyScore: null, compositeScore: -1.09, signalsUsed: ["preDraft","draftCap"] },
  { rank: 51, name: "Adam Atamna", pos: "SG", nbaTeam: null, drafted: false, draftPick: null, preDraftPick: 52, tier: "Mystery", offseasonComposite: null, stickyScore: null, compositeScore: -1.12, signalsUsed: ["preDraft","draftCap"] },
  { rank: 52, name: "David Mirkovic", pos: "PF", nbaTeam: null, drafted: false, draftPick: null, preDraftPick: 53, tier: "Mystery", offseasonComposite: null, stickyScore: null, compositeScore: -1.15, signalsUsed: ["preDraft","draftCap"] },
  { rank: 53, name: "Johann Grünloh", pos: "SF", nbaTeam: null, drafted: false, draftPick: null, preDraftPick: 57, tier: "Mystery", offseasonComposite: null, stickyScore: null, compositeScore: -1.28, signalsUsed: ["preDraft","draftCap"] },
  { rank: 54, name: "Eric Reibe", pos: "PF", nbaTeam: null, drafted: false, draftPick: null, preDraftPick: 58, tier: "Mystery", offseasonComposite: null, stickyScore: null, compositeScore: -1.31, signalsUsed: ["preDraft","draftCap"] },
  { rank: 55, name: "Zvonimir Ivisic", pos: "C", nbaTeam: null, drafted: false, draftPick: null, preDraftPick: 60, tier: "Mystery", offseasonComposite: null, stickyScore: null, compositeScore: -1.37, signalsUsed: ["preDraft","draftCap"] },
  { rank: 56, name: "Shon Abaev", pos: "C", nbaTeam: null, drafted: false, draftPick: null, preDraftPick: 62, tier: "Mystery", offseasonComposite: null, stickyScore: null, compositeScore: -1.44, signalsUsed: ["preDraft","draftCap"] }
];
