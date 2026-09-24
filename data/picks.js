// ============================================================
//  Ligaweit fixe Kadergroesse (Picks + Keeper zusammen). Daraus errechnet
//  sich pro Team "maximal moegliche Keeper" = MAX_ROSTER_SIZE - Picks im
//  bevorstehenden Draft (siehe getMaxKeepers() in js/navigation.js).
const MAX_ROSTER_SIZE = 26;

// Keeper Lock Date = Draft Day (laut ESPN identisch: "Linear Draft" ohne
// Live-Teilnahme, startet automatisch -- kein separates Keeper-Lock-Event
// noetig). Uhrzeit in Europe/Berlin. Aendert sich das Datum, reicht diese
// eine Stelle -- js/navigation.js (renderDraftCountdown) rendert daraus
// beide Karten auf der Startseite.
const DRAFT_EVENT_DATE = "2026-10-01T08:00:00+02:00";

// Keeper Lock laut ESPN "League Keepers" (Export 24.09.2026): "Keeper Lock
// Date: Oct 1, 2026 @ 2:00 AM GMT+2", "Keeper Designated Round: End of
// Draft". Separat von DRAFT_EVENT_DATE, damit die Startseite beide Termine
// korrekt zeigt. Fehlt die Konstante, faellt renderDraftCountdown() auf
// DRAFT_EVENT_DATE zurueck.
const KEEPER_LOCK_DATE = "2026-10-01T02:00:00+02:00";

// ============================================================
//  KEEPERS -- Keeper-Auswahl je Team laut ESPN "League Keepers"
// ============================================================
//  Quelle: ESPN LM Tools -> League Keepers ("Edit Players"), von Beyaz als
//  PDF/Text exportiert. ESPN laesst jedes Team bis zu 26 Keeper waehlen
//  ("Keepers to Select: 26"), die LIGA-Regel ist strenger: Kader 26 =
//  Picks im bevorstehenden Draft + Keeper (siehe getMaxKeepers() in
//  js/navigation.js). Die Picks & Keeper Uebersicht vergleicht beides und
//  markiert Teams mit zu vielen Keepern bzw. freien Slots.
//  Bei einem neuen ESPN-Export einfach die Listen hier ersetzen und
//  "stand" anpassen. Namen wie in ESPN geschrieben.
const KEEPERS = {
  stand: "2026-09-24",
  quelle: "ESPN League Keepers",
  teams: {
    1: ["Ausar Thompson", "Alperen Sengun", "Amen Thompson", "Josh Giddey", "Cade Cunningham", "Jalen Johnson", "VJ Edgecombe", "Joan Beringer", "Desmond Bane", "Reed Sheppard", "LaMelo Ball", "Jalen Duren", "Matas Buzelis", "Anthony Edwards", "Evan Mobley", "Tyrese Maxey", "Lauri Markkanen", "Cooper Flagg"],
    2: ["Onyeka Okongwu", "Jaren Jackson Jr.", "Malik Monk", "Kon Knueppel", "Ryan Rollins", "Aaron Gordon", "Leonard Miller", "Tristan Vukcevic", "Tyler Herro", "Sion James", "Peyton Watson", "Daniss Jenkins", "Jaime Jaquez Jr.", "Jaden McDaniels", "Bradley Beal", "Dylan Cardwell", "Bub Carrington", "Collin Gillespie", "Cam Spencer", "Javon Small", "Jaylen Brown", "Jabari Smith Jr.", "Derik Queen", "Collin Murray-Boyles"],
    3: ["Kevin Durant", "Andrew Nembhard", "Jordan Goodwin", "Guerschon Yabusele", "RJ Barrett", "Dean Wade", "Kristaps Porzingis", "Max Strus", "Pat Spencer", "De'Aaron Fox", "Scottie Barnes", "Nikola Vucevic", "Deandre Ayton", "Khris Middleton", "Jordan Miller", "Brandin Podziemski", "Shai Gilgeous-Alexander", "Julian Champagnie", "Paul George", "Aaron Wiggins", "Luguentz Dort"],
    4: ["Brandon Ingram", "Jalen Smith", "Jarrett Allen", "Rui Hachimura", "Duncan Robinson", "Julius Randle", "Aaron Nesmith", "Donovan Clingan", "Keegan Murray", "Jerami Grant", "Christian Braun", "Yanic Konan Niederhauser", "Dillon Brooks", "Zach LaVine", "Jamal Murray", "James Harden", "Mouhamed Gueye", "Cedric Coward", "Josh Hart", "De'Andre Hunter", "Ty Jerome", "Jrue Holiday", "Dennis Schroder"],
    5: ["AJ Green", "Nikola Jokic", "Zach Collins", "Austin Reaves", "Kyrie Irving", "Payton Pritchard", "Caris LeVert", "Dru Smith", "Sam Hauser", "Saddiq Bey", "Jakob Poeltl", "Jaylin Williams", "Terance Mann", "Bennedict Mathurin", "Ajay Mitchell", "Bilal Coulibaly", "Joel Embiid", "Andrew Wiggins", "Pascal Siakam", "Ousmane Dieng", "Goga Bitadze", "Jalen Green"],
    6: ["Jarace Walker", "Moussa Diabate", "GG Jackson", "Davion Mitchell", "Pelle Larsson", "Naz Reid", "Zaccharie Risacher", "Tristan da Silva", "Shaedon Sharpe", "Gui Santos", "Donte DiVincenzo", "Thomas Sorber", "Dereck Lively II", "Victor Wembanyama", "Rasheer Fleming", "Quentin Grimes", "Cam Whitmore", "Keyonte George", "Tre Johnson", "Toumani Camara", "Jay Huff", "Kyle Filipowski", "Walter Clayton Jr."],
    7: ["Naji Marshall", "Keon Ellis", "Jalen Suggs", "Tobias Harris", "Kelly Oubre Jr.", "Jalen Brunson", "Karl-Anthony Towns", "Dorian Finney-Smith", "Ivica Zubac", "Ja Morant", "Miles Bridges", "Myles Turner", "Wendell Carter Jr.", "Anthony Davis", "Andre Drummond", "Mikal Bridges", "Kevin Huerter", "Robert Williams III", "Stephon Castle", "Rudy Gobert", "Derrick White", "Derrick Jones Jr."],
    8: ["Dylan Harper", "Jaylon Tyson", "Chet Holmgren", "Luka Doncic", "Devin Carter", "Isaiah Stewart", "Deni Avdija", "Tari Eason", "Bam Adebayo", "Isaiah Hartenstein", "Mitchell Robinson", "Zach Edey", "Nic Claxton", "Fred VanVleet", "Nickeil Alexander-Walker", "Domantas Sabonis", "Royce O'Neale", "Yves Missi", "Jaylen Wells", "De'Anthony Melton", "Alex Caruso", "Cody Martin"],
    9: ["Tre Jones", "Khaman Maluach", "Bones Hyland", "Cason Wallace", "Devin Vassell", "Kris Dunn", "Devin Booker", "Damian Lillard", "Zion Williamson", "Obi Toppin", "Donovan Mitchell", "Neemias Queta", "Dyson Daniels", "Julian Strawther", "Michael Porter Jr.", "Nikola Topic", "Cameron Johnson", "Jonathan Kuminga", "Ronald Holland II", "Luke Kornet", "P.J. Washington"],
    10: ["OG Anunoby", "Cody Williams", "Jared McCain", "Max Christie", "Noah Clowney", "Maxime Raynaud", "Carter Bryant", "Jalen Williams", "Immanuel Quickley", "Jeremiah Fears", "Scoot Henderson", "Kel'el Ware", "Ryan Dunn", "Daniel Gafford", "Franz Wagner", "Kyshawn George", "Jusuf Nurkic", "Alex Sarr", "Will Riley", "Rob Dillingham", "Ja'Kobe Walter", "Mark Williams", "Ace Bailey", "Oso Ighodaro", "Trey Murphy III", "Kasparas Jakucionis"],
    11: ["Taylor Hendricks", "Tyrese Haliburton", "Paul Reed", "Brandon Miller", "Patrick Williams", "Jordan Poole", "Jase Richardson", "Stephen Curry", "Anfernee Simons", "Nolan Traore", "LeBron James", "Jayson Tatum", "Isaiah Collier", "Kawhi Leonard", "Dejounte Murray", "Walker Kessler", "Herbert Jones", "Sandro Mamukelashvili", "Anthony Black", "Craig Porter Jr.", "Kevin Porter Jr.", "Jimmy Butler III", "Giannis Antetokounmpo"],
    12: ["CJ McCollum", "Coby White", "Josh Minott", "Will Richard", "Darius Garland", "Ben Saraf", "Ayo Dosunmu", "DeMar DeRozan", "Scotty Pippen Jr.", "Terrence Shannon Jr.", "Noa Essengue", "Collin Sexton", "Egor Demin", "John Collins", "Nique Clifford", "Brook Lopez", "Ryan Kalkbrenner", "Norman Powell", "Quinten Post", "Paolo Banchero"]
  },
};

const PICKS = [
  {year:2026,round:1,originalOwner:1,currentOwner:1,slot:12,note:"Champ-Regel"},{year:2026,round:1,originalOwner:2,currentOwner:2,slot:11},
  {year:2026,round:1,originalOwner:3,currentOwner:1,slot:10},{year:2026,round:1,originalOwner:4,currentOwner:1,slot:4},
  {year:2026,round:1,originalOwner:5,currentOwner:5,slot:8},{year:2026,round:1,originalOwner:6,currentOwner:1,slot:9},
  {year:2026,round:1,originalOwner:7,currentOwner:1,slot:3},{year:2026,round:1,originalOwner:8,currentOwner:8,slot:7},
  {year:2026,round:1,originalOwner:9,currentOwner:1,slot:2},{year:2026,round:1,originalOwner:10,currentOwner:1,slot:6},
  {year:2026,round:1,originalOwner:11,currentOwner:1,slot:1},{year:2026,round:1,originalOwner:12,currentOwner:7,slot:5},
  {year:2026,round:2,originalOwner:1,currentOwner:1},{year:2026,round:2,originalOwner:2,currentOwner:2},
  {year:2026,round:2,originalOwner:3,currentOwner:3},{year:2026,round:2,originalOwner:4,currentOwner:4},
  {year:2026,round:2,originalOwner:5,currentOwner:5},{year:2026,round:2,originalOwner:6,currentOwner:6},
  {year:2026,round:2,originalOwner:7,currentOwner:7},{year:2026,round:2,originalOwner:8,currentOwner:8},
  {year:2026,round:2,originalOwner:9,currentOwner:9},{year:2026,round:2,originalOwner:10,currentOwner:10},
  {year:2026,round:2,originalOwner:11,currentOwner:11},{year:2026,round:2,originalOwner:12,currentOwner:12},
  {year:2026,round:3,originalOwner:1,currentOwner:1},{year:2026,round:3,originalOwner:2,currentOwner:9},
  {year:2026,round:3,originalOwner:3,currentOwner:3},{year:2026,round:3,originalOwner:4,currentOwner:4},
  {year:2026,round:3,originalOwner:5,currentOwner:5},{year:2026,round:3,originalOwner:6,currentOwner:1},
  {year:2026,round:3,originalOwner:7,currentOwner:12},{year:2026,round:3,originalOwner:8,currentOwner:8},
  {year:2026,round:3,originalOwner:9,currentOwner:9},{year:2026,round:3,originalOwner:10,currentOwner:10},
  {year:2026,round:3,originalOwner:11,currentOwner:11},{year:2026,round:3,originalOwner:12,currentOwner:7},
  {year:2026,round:4,originalOwner:1,currentOwner:2},{year:2026,round:4,originalOwner:2,currentOwner:9},
  {year:2026,round:4,originalOwner:3,currentOwner:3},{year:2026,round:4,originalOwner:4,currentOwner:4},
  {year:2026,round:4,originalOwner:5,currentOwner:5},{year:2026,round:4,originalOwner:6,currentOwner:6},
  {year:2026,round:4,originalOwner:7,currentOwner:7},{year:2026,round:4,originalOwner:8,currentOwner:8},
  {year:2026,round:4,originalOwner:9,currentOwner:9},{year:2026,round:4,originalOwner:10,currentOwner:10},
  {year:2026,round:4,originalOwner:11,currentOwner:11},{year:2026,round:4,originalOwner:12,currentOwner:12},
  {year:2027,round:1,originalOwner:1,currentOwner:7},{year:2027,round:1,originalOwner:2,currentOwner:2},
  {year:2027,round:1,originalOwner:3,currentOwner:6},{year:2027,round:1,originalOwner:4,currentOwner:4},
  {year:2027,round:1,originalOwner:5,currentOwner:5},{year:2027,round:1,originalOwner:6,currentOwner:6},
  {year:2027,round:1,originalOwner:7,currentOwner:7},{year:2027,round:1,originalOwner:8,currentOwner:8},
  {year:2027,round:1,originalOwner:9,currentOwner:10},{year:2027,round:1,originalOwner:10,currentOwner:10},
  {year:2027,round:1,originalOwner:11,currentOwner:11},{year:2027,round:1,originalOwner:12,currentOwner:12},
  {year:2027,round:2,originalOwner:1,currentOwner:1},{year:2027,round:2,originalOwner:2,currentOwner:2},
  {year:2027,round:2,originalOwner:3,currentOwner:3},{year:2027,round:2,originalOwner:4,currentOwner:4},
  {year:2027,round:2,originalOwner:5,currentOwner:5},{year:2027,round:2,originalOwner:6,currentOwner:6},
  {year:2027,round:2,originalOwner:7,currentOwner:7},{year:2027,round:2,originalOwner:8,currentOwner:8},
  {year:2027,round:2,originalOwner:9,currentOwner:9},{year:2027,round:2,originalOwner:10,currentOwner:10},
  {year:2027,round:2,originalOwner:11,currentOwner:11},{year:2027,round:2,originalOwner:12,currentOwner:12},
  {year:2027,round:3,originalOwner:1,currentOwner:1},{year:2027,round:3,originalOwner:2,currentOwner:9},
  {year:2027,round:3,originalOwner:3,currentOwner:3},{year:2027,round:3,originalOwner:4,currentOwner:4},
  {year:2027,round:3,originalOwner:5,currentOwner:5},{year:2027,round:3,originalOwner:6,currentOwner:3},
  {year:2027,round:3,originalOwner:7,currentOwner:7},{year:2027,round:3,originalOwner:8,currentOwner:8},
  {year:2027,round:3,originalOwner:9,currentOwner:9},{year:2027,round:3,originalOwner:10,currentOwner:10},
  {year:2027,round:3,originalOwner:11,currentOwner:11},{year:2027,round:3,originalOwner:12,currentOwner:12},
  {year:2027,round:4,originalOwner:1,currentOwner:1},{year:2027,round:4,originalOwner:2,currentOwner:2},
  {year:2027,round:4,originalOwner:3,currentOwner:3},{year:2027,round:4,originalOwner:4,currentOwner:4},
  {year:2027,round:4,originalOwner:5,currentOwner:5},{year:2027,round:4,originalOwner:6,currentOwner:6},
  {year:2027,round:4,originalOwner:7,currentOwner:7},{year:2027,round:4,originalOwner:8,currentOwner:8},
  {year:2027,round:4,originalOwner:9,currentOwner:9},{year:2027,round:4,originalOwner:10,currentOwner:10},
  {year:2027,round:4,originalOwner:11,currentOwner:11},{year:2027,round:4,originalOwner:12,currentOwner:12},
  {year:2028,round:1,originalOwner:1,currentOwner:1},{year:2028,round:1,originalOwner:2,currentOwner:2},
  {year:2028,round:1,originalOwner:3,currentOwner:6},{year:2028,round:1,originalOwner:4,currentOwner:4},
  {year:2028,round:1,originalOwner:5,currentOwner:5},{year:2028,round:1,originalOwner:6,currentOwner:6},
  {year:2028,round:1,originalOwner:7,currentOwner:7},{year:2028,round:1,originalOwner:8,currentOwner:8},
  {year:2028,round:1,originalOwner:9,currentOwner:9},{year:2028,round:1,originalOwner:10,currentOwner:10},
  {year:2028,round:1,originalOwner:11,currentOwner:1,note:"via Double Dribble Trouble (Trae Young Trade)"},{year:2028,round:1,originalOwner:12,currentOwner:12},
  {year:2028,round:2,originalOwner:1,currentOwner:1},{year:2028,round:2,originalOwner:2,currentOwner:2},
  {year:2028,round:2,originalOwner:3,currentOwner:3},{year:2028,round:2,originalOwner:4,currentOwner:4},
  {year:2028,round:2,originalOwner:5,currentOwner:5},{year:2028,round:2,originalOwner:6,currentOwner:1},
  {year:2028,round:2,originalOwner:7,currentOwner:7},{year:2028,round:2,originalOwner:8,currentOwner:8},
  {year:2028,round:2,originalOwner:9,currentOwner:9},{year:2028,round:2,originalOwner:10,currentOwner:10},
  {year:2028,round:2,originalOwner:11,currentOwner:11},{year:2028,round:2,originalOwner:12,currentOwner:12},
  {year:2028,round:3,originalOwner:1,currentOwner:1},{year:2028,round:3,originalOwner:2,currentOwner:2},
  {year:2028,round:3,originalOwner:3,currentOwner:3},{year:2028,round:3,originalOwner:4,currentOwner:4},
  {year:2028,round:3,originalOwner:5,currentOwner:5},{year:2028,round:3,originalOwner:6,currentOwner:6},
  {year:2028,round:3,originalOwner:7,currentOwner:7},{year:2028,round:3,originalOwner:8,currentOwner:8},
  {year:2028,round:3,originalOwner:9,currentOwner:9},{year:2028,round:3,originalOwner:10,currentOwner:10},
  {year:2028,round:3,originalOwner:11,currentOwner:11},{year:2028,round:3,originalOwner:12,currentOwner:12},
  {year:2028,round:4,originalOwner:1,currentOwner:1},{year:2028,round:4,originalOwner:2,currentOwner:2},
  {year:2028,round:4,originalOwner:3,currentOwner:3},{year:2028,round:4,originalOwner:4,currentOwner:4},
  {year:2028,round:4,originalOwner:5,currentOwner:5},{year:2028,round:4,originalOwner:6,currentOwner:6},
  {year:2028,round:4,originalOwner:7,currentOwner:7},{year:2028,round:4,originalOwner:8,currentOwner:8},
  {year:2028,round:4,originalOwner:9,currentOwner:9},{year:2028,round:4,originalOwner:10,currentOwner:10},
  {year:2028,round:4,originalOwner:11,currentOwner:11},{year:2028,round:4,originalOwner:12,currentOwner:12},
  {year:2029,round:1,originalOwner:1,currentOwner:1},{year:2029,round:1,originalOwner:2,currentOwner:2},
  {year:2029,round:1,originalOwner:3,currentOwner:3},{year:2029,round:1,originalOwner:4,currentOwner:4},
  {year:2029,round:1,originalOwner:5,currentOwner:5},{year:2029,round:1,originalOwner:6,currentOwner:6},
  {year:2029,round:1,originalOwner:7,currentOwner:7},{year:2029,round:1,originalOwner:8,currentOwner:8},
  {year:2029,round:1,originalOwner:9,currentOwner:9},{year:2029,round:1,originalOwner:10,currentOwner:10},
  {year:2029,round:1,originalOwner:11,currentOwner:11},{year:2029,round:1,originalOwner:12,currentOwner:12},
  {year:2029,round:2,originalOwner:1,currentOwner:1},{year:2029,round:2,originalOwner:2,currentOwner:2},
  {year:2029,round:2,originalOwner:3,currentOwner:3},{year:2029,round:2,originalOwner:4,currentOwner:4},
  {year:2029,round:2,originalOwner:5,currentOwner:5},{year:2029,round:2,originalOwner:6,currentOwner:6},
  {year:2029,round:2,originalOwner:7,currentOwner:7},{year:2029,round:2,originalOwner:8,currentOwner:8},
  {year:2029,round:2,originalOwner:9,currentOwner:9},{year:2029,round:2,originalOwner:10,currentOwner:10},
  {year:2029,round:2,originalOwner:11,currentOwner:11},{year:2029,round:2,originalOwner:12,currentOwner:12},
  {year:2029,round:3,originalOwner:1,currentOwner:1},{year:2029,round:3,originalOwner:2,currentOwner:2},
  {year:2029,round:3,originalOwner:3,currentOwner:3},{year:2029,round:3,originalOwner:4,currentOwner:4},
  {year:2029,round:3,originalOwner:5,currentOwner:5},{year:2029,round:3,originalOwner:6,currentOwner:6},
  {year:2029,round:3,originalOwner:7,currentOwner:7},{year:2029,round:3,originalOwner:8,currentOwner:8},
  {year:2029,round:3,originalOwner:9,currentOwner:9},{year:2029,round:3,originalOwner:10,currentOwner:10},
  {year:2029,round:3,originalOwner:11,currentOwner:11},{year:2029,round:3,originalOwner:12,currentOwner:12},
  {year:2029,round:4,originalOwner:1,currentOwner:1},{year:2029,round:4,originalOwner:2,currentOwner:2},
  {year:2029,round:4,originalOwner:3,currentOwner:3},{year:2029,round:4,originalOwner:4,currentOwner:4},
  {year:2029,round:4,originalOwner:5,currentOwner:5},{year:2029,round:4,originalOwner:6,currentOwner:6},
  {year:2029,round:4,originalOwner:7,currentOwner:7},{year:2029,round:4,originalOwner:8,currentOwner:8},
  {year:2029,round:4,originalOwner:9,currentOwner:9},{year:2029,round:4,originalOwner:10,currentOwner:10},
  {year:2029,round:4,originalOwner:11,currentOwner:11},{year:2029,round:4,originalOwner:12,currentOwner:12},
];

const DRAFT_NOTES = {
  2026:"Do not trade a 1st to Fighting Illini. He has enough. Draft order TBD based on final standings. Seagulls' R3/R4 2026 und R3 2027 gehen an Cooking Show (Murray-Boyles Trade). Vancouver's R1 slot5 + R3 2026 gehen an Always Money; Always Money's R3 2026 geht an Vancouver (Ayo/Essengue Trade).",
  2027:"Fighting Illini's R1 goes to Always Money. Neukoelln's R1 goes to 3-POINT MAFIA. 3PM's R3 goes to Neukoelln. Cooking Show sends 2027 R1 & KJ for Vassell/ Ron Holland II. 3-Point Mafia's R2 goes to Double Dribble Trouble (Risacher Trade, September 2026). Double Dribble Trouble's R3 goes to Vancouver Curry-Wurst (Haliburton Trade, September 2026). Neukoelln Hustlers' R2 goes to Vancouver Curry-Wurst, Double Dribble Trouble's R3 moves on from Vancouver to Neukoelln Hustlers (Trae Young Trade, September 2026).",
  2028:"Neukoelln's R1 goes to 3-POINT MAFIA in Banchero-Trade. 3PM's R2 goes to Bear Down (Moussa Diabate Trade). Double Dribble Trouble's R1 goes to Fighting Illini (Trae Young Trade, September 2026).",
  2029:"All teams hold their own picks. No trades recorded yet.",
};

// 2026 Draft Lottery Order — maps draft slot to fantasy pick ownership
// slot = actual draft position after lottery
const DRAFT_2026_SLOT_ORDER = [
  // R1: slot, originalOwner (fantasy team), currentOwner, note
  {round:1, slot:1,  originalOwner:11, currentOwner:1,  nbaTeam:'WAS', note:'via Double Dribble Trouble'},
  {round:1, slot:2,  originalOwner:9,  currentOwner:1,  nbaTeam:'UTA', note:'via Cooking Show'},
  {round:1, slot:3,  originalOwner:7,  currentOwner:1,  nbaTeam:'MEM', note:'via Always Money'},
  {round:1, slot:4,  originalOwner:4,  currentOwner:1,  nbaTeam:'CHI', note:'via Leaveland'},
  {round:1, slot:5,  originalOwner:12, currentOwner:7,  nbaTeam:'LAC', note:'via Vancouver Curry-Wurst'},
  {round:1, slot:6,  originalOwner:10, currentOwner:1,  nbaTeam:'BKN', note:'via S-Town'},
  {round:1, slot:7,  originalOwner:8,  currentOwner:8,  nbaTeam:'SAC', note:''},
  {round:1, slot:8,  originalOwner:5,  currentOwner:5,  nbaTeam:'NOP', note:''},
  {round:1, slot:9,  originalOwner:6,  currentOwner:1,  nbaTeam:'DAL', note:'via 3-Point Mafia'},
  {round:1, slot:10, originalOwner:3,  currentOwner:1,  nbaTeam:'MIL', note:'via Neukoelln'},
  {round:1, slot:11, originalOwner:2,  currentOwner:2,  nbaTeam:'GSW', note:''},
  {round:1, slot:12, originalOwner:1,  currentOwner:1,  nbaTeam:'OKC', note:'Champ-Regel'},
];
