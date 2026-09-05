// ============================================================
//  FANTASY BOOTLEG POWER SCORE — automatisch generiert von
//  scripts/build-fantasy-power-score.js. NICHT MANUELL EDITIEREN.
//
//  9-Kategorien-Spinnennetz für die 12 TTHQ-Fantasy-Teams. Basis:
//  aktueller Kader (ROSTERS_LIVE) × echte Saison-2025/26-Boxscores
//  (LAST_SEASON_STATS_2025_26) -- siehe Kommentar im Sync-Script für
//  die Begründung dieser Datenquelle (kein ESPN-Netzwerkzugriff nötig).
//  FANTASY_POWER_SCORE.teams[i].values = Kader-Summe (PTS/REB/AST/
//  STL/BLK/3PM/TO) bzw. spielegewichteter Durchschnitt (FG%/FT%).
//  .rank = Liga-Rang (1-12) je Kategorie. Frontend berechnet daraus
//  den Radar-Plot-Wert per (N+1)-Rang-Trick.
// ============================================================
const FANTASY_POWER_SCORE = {
  "generatedAt": "2026-09-05T13:40:17.068Z",
  "sourceSeason": "2025-26 (letzte abgeschlossene Saison, BBM-Export — siehe data/last-season-stats-2025-26.js)",
  "categories": [
    {
      "key": "pts",
      "label": "Points",
      "lowerIsBetter": false
    },
    {
      "key": "reb",
      "label": "Rebounds",
      "lowerIsBetter": false
    },
    {
      "key": "ast",
      "label": "Assists",
      "lowerIsBetter": false
    },
    {
      "key": "stl",
      "label": "Steals",
      "lowerIsBetter": false
    },
    {
      "key": "blk",
      "label": "Blocks",
      "lowerIsBetter": false
    },
    {
      "key": "tpm",
      "label": "3-Pointers",
      "lowerIsBetter": false
    },
    {
      "key": "fgPct",
      "label": "FG%",
      "lowerIsBetter": false
    },
    {
      "key": "ftPct",
      "label": "FT%",
      "lowerIsBetter": false
    },
    {
      "key": "to",
      "label": "Turnovers",
      "lowerIsBetter": true
    }
  ],
  "teams": [
    {
      "id": 1,
      "name": "Fighting Illini",
      "owner": "Kong Power",
      "values": {
        "pts": 410,
        "reb": 154.8,
        "ast": 108.5,
        "stl": 28.31,
        "blk": 17.44,
        "tpm": 31.7,
        "to": 53,
        "fgPct": 51,
        "ftPct": 75.5
      },
      "rank": {
        "pts": 2,
        "reb": 2,
        "ast": 1,
        "stl": 2,
        "blk": 3,
        "tpm": 11,
        "fgPct": 1,
        "ftPct": 10,
        "to": 12
      },
      "includedCount": 25,
      "skippedCount": 0,
      "skippedPlayers": []
    },
    {
      "id": 2,
      "name": "Seagulls",
      "owner": "Möwe",
      "values": {
        "pts": 364.7,
        "reb": 128.4,
        "ast": 85.7,
        "stl": 23.53,
        "blk": 14.91,
        "tpm": 43.3,
        "to": 46,
        "fgPct": 47,
        "ftPct": 79.3
      },
      "rank": {
        "pts": 6,
        "reb": 9,
        "ast": 6,
        "stl": 10,
        "blk": 6,
        "tpm": 4,
        "fgPct": 9,
        "ftPct": 3,
        "to": 9
      },
      "includedCount": 30,
      "skippedCount": 0,
      "skippedPlayers": []
    },
    {
      "id": 3,
      "name": "Neukoelln Hustlers",
      "owner": "Timo Xtremo",
      "values": {
        "pts": 393.7,
        "reb": 140.9,
        "ast": 87.5,
        "stl": 24.59,
        "blk": 13.37,
        "tpm": 46.8,
        "to": 42.1,
        "fgPct": 46.8,
        "ftPct": 78.9
      },
      "rank": {
        "pts": 4,
        "reb": 4,
        "ast": 5,
        "stl": 5,
        "blk": 9,
        "tpm": 2,
        "fgPct": 11,
        "ftPct": 4,
        "to": 6
      },
      "includedCount": 31,
      "skippedCount": 0,
      "skippedPlayers": []
    },
    {
      "id": 4,
      "name": "Leaveland Cavaliers",
      "owner": "Sven",
      "values": {
        "pts": 414.4,
        "reb": 137.1,
        "ast": 89.8,
        "stl": 22.56,
        "blk": 14.01,
        "tpm": 49.5,
        "to": 46,
        "fgPct": 47.5,
        "ftPct": 77.9
      },
      "rank": {
        "pts": 1,
        "reb": 5,
        "ast": 3,
        "stl": 11,
        "blk": 7,
        "tpm": 1,
        "fgPct": 5,
        "ftPct": 5,
        "to": 10
      },
      "includedCount": 31,
      "skippedCount": 0,
      "skippedPlayers": []
    },
    {
      "id": 5,
      "name": "Anadolu Ballers",
      "owner": "Murat Oguz",
      "values": {
        "pts": 340.6,
        "reb": 130.2,
        "ast": 82.7,
        "stl": 23.7,
        "blk": 12.85,
        "tpm": 35.9,
        "to": 40.5,
        "fgPct": 47.3,
        "ftPct": 76.2
      },
      "rank": {
        "pts": 9,
        "reb": 8,
        "ast": 7,
        "stl": 9,
        "blk": 10,
        "tpm": 9,
        "fgPct": 7,
        "ftPct": 8,
        "to": 3
      },
      "includedCount": 28,
      "skippedCount": 2,
      "skippedPlayers": [
        "Malik Beasley",
        "Kyrie Irving"
      ]
    },
    {
      "id": 6,
      "name": "3-POINT MAFIA",
      "owner": "Patrick & Bennet",
      "values": {
        "pts": 343.8,
        "reb": 130.7,
        "ast": 74,
        "stl": 24.38,
        "blk": 17.15,
        "tpm": 42.8,
        "to": 41.9,
        "fgPct": 47.2,
        "ftPct": 76.7
      },
      "rank": {
        "pts": 8,
        "reb": 7,
        "ast": 8,
        "stl": 6,
        "blk": 4,
        "tpm": 5,
        "fgPct": 8,
        "ftPct": 7,
        "to": 5
      },
      "includedCount": 30,
      "skippedCount": 1,
      "skippedPlayers": [
        "Thomas Sorber"
      ]
    },
    {
      "id": 7,
      "name": "Always Money In The BananaStand",
      "owner": "KraftPaket Knödel",
      "values": {
        "pts": 365.2,
        "reb": 155,
        "ast": 89.8,
        "stl": 26.11,
        "blk": 18.47,
        "tpm": 36.3,
        "to": 45.4,
        "fgPct": 49.4,
        "ftPct": 76.8
      },
      "rank": {
        "pts": 5,
        "reb": 1,
        "ast": 4,
        "stl": 4,
        "blk": 1,
        "tpm": 8,
        "fgPct": 2,
        "ftPct": 6,
        "to": 8
      },
      "includedCount": 29,
      "skippedCount": 0,
      "skippedPlayers": []
    },
    {
      "id": 8,
      "name": "Kawhi So Serious",
      "owner": "Harald Peterson",
      "values": {
        "pts": 320.3,
        "reb": 153,
        "ast": 68.9,
        "stl": 24.12,
        "blk": 18.14,
        "tpm": 32.2,
        "to": 41.7,
        "fgPct": 48,
        "ftPct": 71.8
      },
      "rank": {
        "pts": 10,
        "reb": 3,
        "ast": 11,
        "stl": 7,
        "blk": 2,
        "tpm": 10,
        "fgPct": 4,
        "ftPct": 12,
        "to": 4
      },
      "includedCount": 29,
      "skippedCount": 1,
      "skippedPlayers": [
        "Fred VanVleet"
      ]
    },
    {
      "id": 9,
      "name": "Cooking Show",
      "owner": "Stefan Estepham",
      "values": {
        "pts": 316.5,
        "reb": 110.6,
        "ast": 71,
        "stl": 24.11,
        "blk": 9.53,
        "tpm": 38.9,
        "to": 36.5,
        "fgPct": 46.6,
        "ftPct": 79.9
      },
      "rank": {
        "pts": 11,
        "reb": 11,
        "ast": 10,
        "stl": 8,
        "blk": 12,
        "tpm": 7,
        "fgPct": 12,
        "ftPct": 1,
        "to": 2
      },
      "includedCount": 29,
      "skippedCount": 1,
      "skippedPlayers": [
        "Damian Lillard"
      ]
    },
    {
      "id": 10,
      "name": "S-Town Grizzlies",
      "owner": "Jan Schattschneider",
      "values": {
        "pts": 348.5,
        "reb": 136.4,
        "ast": 72.7,
        "stl": 26.54,
        "blk": 15.44,
        "tpm": 39,
        "to": 42.3,
        "fgPct": 47.5,
        "ftPct": 76.1
      },
      "rank": {
        "pts": 7,
        "reb": 6,
        "ast": 9,
        "stl": 3,
        "blk": 5,
        "tpm": 6,
        "fgPct": 6,
        "ftPct": 9,
        "to": 7
      },
      "includedCount": 30,
      "skippedCount": 0,
      "skippedPlayers": []
    },
    {
      "id": 11,
      "name": "Double Dribble Trouble",
      "owner": "Nils",
      "values": {
        "pts": 394.3,
        "reb": 126.6,
        "ast": 98.6,
        "stl": 29.33,
        "blk": 13.57,
        "tpm": 44.2,
        "to": 51,
        "fgPct": 47,
        "ftPct": 75.5
      },
      "rank": {
        "pts": 3,
        "reb": 10,
        "ast": 2,
        "stl": 1,
        "blk": 8,
        "tpm": 3,
        "fgPct": 10,
        "ftPct": 11,
        "to": 11
      },
      "includedCount": 30,
      "skippedCount": 0,
      "skippedPlayers": []
    },
    {
      "id": 12,
      "name": "Vancouver Curry-Wurst",
      "owner": "German Bratwurst",
      "values": {
        "pts": 273.7,
        "reb": 91.3,
        "ast": 66.7,
        "stl": 21.28,
        "blk": 11.61,
        "tpm": 31.1,
        "to": 35.2,
        "fgPct": 48.6,
        "ftPct": 79.9
      },
      "rank": {
        "pts": 12,
        "reb": 12,
        "ast": 12,
        "stl": 12,
        "blk": 11,
        "tpm": 12,
        "fgPct": 3,
        "ftPct": 2,
        "to": 1
      },
      "includedCount": 30,
      "skippedCount": 1,
      "skippedPlayers": [
        "Tyrese Haliburton"
      ]
    }
  ]
};
