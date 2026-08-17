// ============================================================
//  POST-DRAFT BEST AVAILABLE BOARD — 2026 Draft Class
// ============================================================
//  AUTO-GENERIERT von scripts/build-postdraft-board.js über die
//  "Daily 9cat Live Scores" GitHub Action. Nicht von Hand editieren.
//  Zuletzt aktualisiert: 2026-08-17
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
  { rank: 1, name: "AJ Dybantsa", pos: "SF", nbaTeam: "WAS", drafted: true, draftPick: 1, preDraftPick: 3, tier: "Tier 1", offseasonComposite: 10.82, stickyScore: null, compositeScore: 1.58, signalsUsed: ["preDraft","draftCap","offseason"] },
  { rank: 2, name: "Morez Johnson Jr.", pos: "PF", nbaTeam: "DAL", drafted: true, draftPick: 9, preDraftPick: 13, tier: "Tier 3", offseasonComposite: 13.29, stickyScore: null, compositeScore: 1.54, signalsUsed: ["preDraft","draftCap","offseason"] },
  { rank: 3, name: "Cameron Boozer", pos: "PF", nbaTeam: "MEM", drafted: true, draftPick: 3, preDraftPick: 1, tier: "Tier 1", offseasonComposite: 6.49, stickyScore: null, compositeScore: 1.2, signalsUsed: ["preDraft","draftCap","offseason"] },
  { rank: 4, name: "Allen Graves", pos: "PF", nbaTeam: "TOR", drafted: true, draftPick: 19, preDraftPick: 19, tier: "Tier 4", offseasonComposite: 11.14, stickyScore: null, compositeScore: 1.15, signalsUsed: ["preDraft","draftCap","offseason"] },
  { rank: 5, name: "Brayden Burries", pos: "SG", nbaTeam: "MIL", drafted: true, draftPick: 10, preDraftPick: 11, tier: "Tier 3", offseasonComposite: 8.37, stickyScore: null, compositeScore: 1.12, signalsUsed: ["preDraft","draftCap","offseason"] },
  { rank: 6, name: "Yaxel Lendeborg", pos: "PF", nbaTeam: "GSW", drafted: true, draftPick: 11, preDraftPick: 8, tier: "Tier 2", offseasonComposite: 7.31, stickyScore: null, compositeScore: 1.07, signalsUsed: ["preDraft","draftCap","offseason"] },
  { rank: 7, name: "Darryn Peterson", pos: "SG/PG", nbaTeam: "UTA", drafted: true, draftPick: 2, preDraftPick: 2, tier: "Tier 1", offseasonComposite: 4.8, stickyScore: null, compositeScore: 1.03, signalsUsed: ["preDraft","draftCap","offseason"] },
  { rank: 8, name: "Meleek Thomas", pos: "SG", nbaTeam: "CLE", drafted: true, draftPick: 34, preDraftPick: 29, tier: "Tier 6", offseasonComposite: 13.12, stickyScore: null, compositeScore: 1.01, signalsUsed: ["preDraft","draftCap","offseason"] },
  { rank: 9, name: "Caleb Wilson", pos: "SF/PF", nbaTeam: "CHI", drafted: true, draftPick: 4, preDraftPick: 4, tier: "Tier 1.5", offseasonComposite: 3.94, stickyScore: null, compositeScore: 0.9, signalsUsed: ["preDraft","draftCap","offseason"] },
  { rank: 10, name: "Jayden Quaintance", pos: "C", nbaTeam: "SAS", drafted: true, draftPick: 20, preDraftPick: 17, tier: "Tier 4", offseasonComposite: null, stickyScore: null, compositeScore: 0.78, signalsUsed: ["preDraft","draftCap"] },
  { rank: 11, name: "Keaton Wagler", pos: "SG/PG", nbaTeam: "LAC", drafted: true, draftPick: 5, preDraftPick: 5, tier: "Tier 1.5", offseasonComposite: 2.4, stickyScore: null, compositeScore: 0.73, signalsUsed: ["preDraft","draftCap","offseason"] },
  { rank: 12, name: "Mikel Brown Jr.", pos: "SG", nbaTeam: "BKN", drafted: true, draftPick: 6, preDraftPick: 12, tier: "Tier 3", offseasonComposite: 3.76, stickyScore: null, compositeScore: 0.72, signalsUsed: ["preDraft","draftCap","offseason"] },
  { rank: 13, name: "Hannes Steinbach", pos: "PF", nbaTeam: "CHA", drafted: true, draftPick: 14, preDraftPick: 10, tier: "Tier 3", offseasonComposite: 3.88, stickyScore: null, compositeScore: 0.69, signalsUsed: ["preDraft","draftCap","offseason"] },
  { rank: 14, name: "Kingston Flemings", pos: "PG", nbaTeam: "ATL", drafted: true, draftPick: 8, preDraftPick: 6, tier: "Tier 2", offseasonComposite: 2.04, stickyScore: null, compositeScore: 0.65, signalsUsed: ["preDraft","draftCap","offseason"] },
  { rank: 15, name: "Labaron Philon Jr.", pos: "PG", nbaTeam: "PHI", drafted: true, draftPick: 22, preDraftPick: 9, tier: "Tier 3", offseasonComposite: 3.91, stickyScore: null, compositeScore: 0.64, signalsUsed: ["preDraft","draftCap","offseason"] },
  { rank: 16, name: "Darius Acuff Jr.", pos: "PG", nbaTeam: "SAC", drafted: true, draftPick: 7, preDraftPick: 7, tier: "Tier 2", offseasonComposite: 1.13, stickyScore: null, compositeScore: 0.56, signalsUsed: ["preDraft","draftCap","offseason"] },
  { rank: 17, name: "Cameron Carr", pos: "SG", nbaTeam: "LAL", drafted: true, draftPick: 24, preDraftPick: 21, tier: "Tier 5", offseasonComposite: 3.17, stickyScore: null, compositeScore: 0.33, signalsUsed: ["preDraft","draftCap","offseason"] },
  { rank: 18, name: "Nate Ament", pos: "PF", nbaTeam: "MIL", drafted: true, draftPick: 13, preDraftPick: 14, tier: "Tier 4", offseasonComposite: -0.04, stickyScore: null, compositeScore: 0.27, signalsUsed: ["preDraft","draftCap","offseason"] },
  { rank: 19, name: "Aday Mara", pos: "C", nbaTeam: "OKC", drafted: true, draftPick: 12, preDraftPick: 15, tier: "Tier 4", offseasonComposite: -0.55, stickyScore: null, compositeScore: 0.21, signalsUsed: ["preDraft","draftCap","offseason"] },
  { rank: 20, name: "Chris Cenac Jr.", pos: "PF/C", nbaTeam: "BOS", drafted: true, draftPick: 27, preDraftPick: 24, tier: "Tier 5", offseasonComposite: 2.33, stickyScore: null, compositeScore: 0.17, signalsUsed: ["preDraft","draftCap","offseason"] },
  { rank: 21, name: "Bennett Stirtz", pos: "PG", nbaTeam: "OKC", drafted: true, draftPick: 16, preDraftPick: 32, tier: "Mystery", offseasonComposite: 2.8, stickyScore: null, compositeScore: 0.16, signalsUsed: ["preDraft","draftCap","offseason"] },
  { rank: 22, name: "Sergio De Larrea", pos: "PG", nbaTeam: "DAL", drafted: true, draftPick: 25, preDraftPick: 41, tier: "Mystery", offseasonComposite: 4.25, stickyScore: null, compositeScore: 0.05, signalsUsed: ["preDraft","draftCap","offseason"] },
  { rank: 23, name: "Tyler Tanner", pos: "PG", nbaTeam: null, drafted: false, draftPick: null, preDraftPick: 18, tier: "Tier 4", offseasonComposite: null, stickyScore: null, compositeScore: -0.06, signalsUsed: ["preDraft","draftCap"] },
  { rank: 24, name: "Koa Peat", pos: "PF", nbaTeam: "PHO", drafted: true, draftPick: 30, preDraftPick: 31, tier: "Mystery", offseasonComposite: 1.23, stickyScore: null, compositeScore: -0.09, signalsUsed: ["preDraft","draftCap","offseason"] },
  { rank: 25, name: "Karim Lopez", pos: "SF/PF", nbaTeam: "MEM", drafted: true, draftPick: 21, preDraftPick: 25, tier: "Tier 5", offseasonComposite: -1.83, stickyScore: null, compositeScore: -0.17, signalsUsed: ["preDraft","draftCap","offseason"] },
  { rank: 26, name: "Amari Allen", pos: "SF", nbaTeam: null, drafted: false, draftPick: null, preDraftPick: 22, tier: "Tier 5", offseasonComposite: null, stickyScore: null, compositeScore: -0.18, signalsUsed: ["preDraft","draftCap"] },
  { rank: 27, name: "Isiah Evans", pos: "PG/SG", nbaTeam: null, drafted: false, draftPick: null, preDraftPick: 23, tier: "Tier 5", offseasonComposite: null, stickyScore: null, compositeScore: -0.22, signalsUsed: ["preDraft","draftCap"] },
  { rank: 28, name: "Dailyn Swain", pos: "SF", nbaTeam: "CHI", drafted: true, draftPick: 15, preDraftPick: 16, tier: "Tier 4", offseasonComposite: -4.89, stickyScore: null, compositeScore: -0.23, signalsUsed: ["preDraft","draftCap","offseason"] },
  { rank: 29, name: "Christian Anderson", pos: "PG", nbaTeam: "CHA", drafted: true, draftPick: 18, preDraftPick: 38, tier: "Mystery", offseasonComposite: -0.09, stickyScore: null, compositeScore: -0.23, signalsUsed: ["preDraft","draftCap","offseason"] },
  { rank: 30, name: "Henri Veesaar", pos: "C", nbaTeam: "ATL", drafted: true, draftPick: 52, preDraftPick: 27, tier: "Tier 5", offseasonComposite: 0.15, stickyScore: null, compositeScore: -0.3, signalsUsed: ["preDraft","draftCap","offseason"] },
  { rank: 31, name: "Tounde Yessoufou", pos: "SF", nbaTeam: null, drafted: false, draftPick: null, preDraftPick: 26, tier: "Tier 5", offseasonComposite: null, stickyScore: null, compositeScore: -0.31, signalsUsed: ["preDraft","draftCap"] },
  { rank: 32, name: "Braden Smith", pos: "PG", nbaTeam: "IND", drafted: true, draftPick: 38, preDraftPick: 45, tier: "Mystery", offseasonComposite: 1.85, stickyScore: null, compositeScore: -0.36, signalsUsed: ["preDraft","draftCap","offseason"] },
  { rank: 33, name: "Flory Bidunga", pos: "C", nbaTeam: null, drafted: false, draftPick: null, preDraftPick: 28, tier: "Tier 6", offseasonComposite: null, stickyScore: null, compositeScore: -0.37, signalsUsed: ["preDraft","draftCap"] },
  { rank: 34, name: "Motiejus Krivas", pos: "C", nbaTeam: null, drafted: false, draftPick: null, preDraftPick: 30, tier: "Tier 6", offseasonComposite: null, stickyScore: null, compositeScore: -0.43, signalsUsed: ["preDraft","draftCap"] },
  { rank: 35, name: "Alex Karaban", pos: "PF", nbaTeam: "SAS", drafted: true, draftPick: 29, preDraftPick: 44, tier: "Mystery", offseasonComposite: -1.02, stickyScore: null, compositeScore: -0.53, signalsUsed: ["preDraft","draftCap","offseason"] },
  { rank: 36, name: "Neoklis Avdalas", pos: "PG", nbaTeam: null, drafted: false, draftPick: null, preDraftPick: 34, tier: "Mystery", offseasonComposite: null, stickyScore: null, compositeScore: -0.56, signalsUsed: ["preDraft","draftCap"] },
  { rank: 37, name: "Dame Sarr", pos: "SF", nbaTeam: null, drafted: false, draftPick: null, preDraftPick: 35, tier: "Mystery", offseasonComposite: null, stickyScore: null, compositeScore: -0.59, signalsUsed: ["preDraft","draftCap"] },
  { rank: 38, name: "Dash Daniels", pos: "SG", nbaTeam: null, drafted: false, draftPick: null, preDraftPick: 37, tier: "Mystery", offseasonComposite: null, stickyScore: null, compositeScore: -0.65, signalsUsed: ["preDraft","draftCap"] },
  { rank: 39, name: "JT Toppin", pos: "PF", nbaTeam: null, drafted: false, draftPick: null, preDraftPick: 39, tier: "Mystery", offseasonComposite: null, stickyScore: null, compositeScore: -0.72, signalsUsed: ["preDraft","draftCap"] },
  { rank: 40, name: "Tahaad Pettiford", pos: "PG", nbaTeam: null, drafted: false, draftPick: null, preDraftPick: 40, tier: "Mystery", offseasonComposite: null, stickyScore: null, compositeScore: -0.75, signalsUsed: ["preDraft","draftCap"] },
  { rank: 41, name: "Alex Condon", pos: "C", nbaTeam: null, drafted: false, draftPick: null, preDraftPick: 42, tier: "Mystery", offseasonComposite: null, stickyScore: null, compositeScore: -0.81, signalsUsed: ["preDraft","draftCap"] },
  { rank: 42, name: "Miles Byrd", pos: "SF", nbaTeam: null, drafted: false, draftPick: null, preDraftPick: 43, tier: "Mystery", offseasonComposite: null, stickyScore: null, compositeScore: -0.84, signalsUsed: ["preDraft","draftCap"] },
  { rank: 43, name: "Milos Uzan", pos: "PG", nbaTeam: null, drafted: false, draftPick: null, preDraftPick: 55, tier: "Mystery", offseasonComposite: 1.26, stickyScore: null, compositeScore: -0.93, signalsUsed: ["preDraft","draftCap","offseason"] },
  { rank: 44, name: "Andrej Stojakovic", pos: "SG", nbaTeam: null, drafted: false, draftPick: null, preDraftPick: 46, tier: "Mystery", offseasonComposite: null, stickyScore: null, compositeScore: -0.94, signalsUsed: ["preDraft","draftCap"] },
  { rank: 45, name: "JoJo Tugler", pos: "PF", nbaTeam: null, drafted: false, draftPick: null, preDraftPick: 47, tier: "Mystery", offseasonComposite: null, stickyScore: null, compositeScore: -0.97, signalsUsed: ["preDraft","draftCap"] },
  { rank: 46, name: "Boogie Fland", pos: "PG", nbaTeam: null, drafted: false, draftPick: null, preDraftPick: 48, tier: "Mystery", offseasonComposite: null, stickyScore: null, compositeScore: -1, signalsUsed: ["preDraft","draftCap"] },
  { rank: 47, name: "Tomislav Ivisic", pos: "C", nbaTeam: null, drafted: false, draftPick: null, preDraftPick: 49, tier: "Mystery", offseasonComposite: null, stickyScore: null, compositeScore: -1.03, signalsUsed: ["preDraft","draftCap"] },
  { rank: 48, name: "Ian Jackson", pos: "SG", nbaTeam: null, drafted: false, draftPick: null, preDraftPick: 50, tier: "Mystery", offseasonComposite: null, stickyScore: null, compositeScore: -1.06, signalsUsed: ["preDraft","draftCap"] },
  { rank: 49, name: "Daniel Jacobsen", pos: "C", nbaTeam: null, drafted: false, draftPick: null, preDraftPick: 51, tier: "Mystery", offseasonComposite: null, stickyScore: null, compositeScore: -1.09, signalsUsed: ["preDraft","draftCap"] },
  { rank: 50, name: "Adam Atamna", pos: "SG", nbaTeam: null, drafted: false, draftPick: null, preDraftPick: 52, tier: "Mystery", offseasonComposite: null, stickyScore: null, compositeScore: -1.12, signalsUsed: ["preDraft","draftCap"] },
  { rank: 51, name: "David Mirkovic", pos: "PF", nbaTeam: null, drafted: false, draftPick: null, preDraftPick: 53, tier: "Mystery", offseasonComposite: null, stickyScore: null, compositeScore: -1.15, signalsUsed: ["preDraft","draftCap"] },
  { rank: 52, name: "Kylan Boswell", pos: "PG", nbaTeam: null, drafted: false, draftPick: null, preDraftPick: 59, tier: "Mystery", offseasonComposite: -1.31, stickyScore: null, compositeScore: -1.24, signalsUsed: ["preDraft","draftCap","offseason"] },
  { rank: 53, name: "Johann Grünloh", pos: "SF", nbaTeam: null, drafted: false, draftPick: null, preDraftPick: 57, tier: "Mystery", offseasonComposite: null, stickyScore: null, compositeScore: -1.28, signalsUsed: ["preDraft","draftCap"] },
  { rank: 54, name: "Eric Reibe", pos: "PF", nbaTeam: null, drafted: false, draftPick: null, preDraftPick: 58, tier: "Mystery", offseasonComposite: null, stickyScore: null, compositeScore: -1.31, signalsUsed: ["preDraft","draftCap"] },
  { rank: 55, name: "Zvonimir Ivisic", pos: "C", nbaTeam: null, drafted: false, draftPick: null, preDraftPick: 60, tier: "Mystery", offseasonComposite: null, stickyScore: null, compositeScore: -1.37, signalsUsed: ["preDraft","draftCap"] },
  { rank: 56, name: "Shon Abaev", pos: "C", nbaTeam: null, drafted: false, draftPick: null, preDraftPick: 62, tier: "Mystery", offseasonComposite: null, stickyScore: null, compositeScore: -1.44, signalsUsed: ["preDraft","draftCap"] }
];
