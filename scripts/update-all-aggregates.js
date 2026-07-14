#!/usr/bin/env node
// ============================================================
//  Aktualisiert Weekly + Monthly in einem einzigen Lese-/
//  Schreibvorgang von data/livescores-aggregate.js.
// ============================================================
//  Weekly/Monthly werden IMMER standortübergreifend berechnet: die
//  letzten 7 bzw. 30 Tage vor dem Stichtag, egal ob ein Spieler in
//  Cali, Utah und/oder Vegas (oder später Pre-Season/Regular Season)
//  aufgelaufen ist. Es entsteht pro Periode genau EIN Eintrag unter
//  dem Liga-Key "all" (LIVESCORES_AGGREGATE[period]["all"][endDate]).
//  Daily bleibt bewusst pro Standort getrennt (data/livescores-daily.js) —
//  dort ist die Trennung sinnvoll, weil an einem Tag ohnehin nur an
//  einem Standort gespielt wird.
//
//  Kein Hardcoding der Liga-Slugs: die Standorte, die im Fenster
//  auftauchen, werden aus den vorhandenen
//  daily-9cat_<league>_<datum>.csv-Dateien abgeleitet und landen
//  informativ in entry.leaguesInWindow / players[].leagues.
//
//  Usage:
//    node scripts/update-all-aggregates.js
//      → Fenster enden jeweils heute, Default-Keep (90 Stichtage)
//    node scripts/update-all-aggregates.js --end=2026-07-14 --keep=180
//    node scripts/update-all-aggregates.js --dir=scripts/data --out=data/livescores-aggregate.js
// ============================================================

const fs = require('fs');
const path = require('path');
const {
  buildEntry, loadExisting, mergeEntry, trimKeep, writeOut,
  DEFAULT_OUT, DEFAULT_DIR, DEFAULT_KEEP,
} = require('./convert-aggregate-to-livescores');

const args = process.argv.slice(2);
const arg = (name, fallback) => {
  const found = args.find(a => a.startsWith(`--${name}=`));
  return found ? found.split('=').slice(1).join('=') : fallback;
};

const dir = arg('dir', DEFAULT_DIR);
const out = arg('out', DEFAULT_OUT);
const endDate = arg('end', new Date().toISOString().slice(0, 10));
const keep = parseInt(arg('keep', String(DEFAULT_KEEP)), 10);

// ------------------------------------------------------------
// 1) Alle Tages-CSV-Daten (über alle Standorte) ermitteln, damit wir
//    wissen, ob es überhaupt etwas zu tun gibt und wo das Fenster
//    verankert werden muss.
// ------------------------------------------------------------
const filePattern = /^daily-9cat_(.+)_(\d{4}-\d{2}-\d{2})\.csv$/;
const allFiles = fs.readdirSync(dir)
  .map(f => {
    const m = f.match(filePattern);
    return m ? { league: m[1], date: m[2] } : null;
  })
  .filter(Boolean);

if (!allFiles.length) {
  console.log(`Keine Tages-CSVs in ${dir} gefunden — nichts zu aggregieren.`);
  process.exit(0);
}

const leaguesSeen = [...new Set(allFiles.map(f => f.league))].sort();
console.log(`Gefundene Standorte: ${leaguesSeen.join(', ')}`);

// ------------------------------------------------------------
// 1b) Letztes verfügbares Datum ÜBER ALLE Standorte ermitteln. Liegt
//     der jüngste Spieltag (egal an welchem Standort) vor --end,
//     verankern wir das Fenster dort statt bei --end — sonst würde
//     Week/Month leer bleiben, sobald --end (heute) weiter als
//     7/30 Tage vom letzten Spiel entfernt ist (z.B. zwischen zwei
//     Summer-League-Standorten oder nach Saisonende).
// ------------------------------------------------------------
const latestOverall = [...new Set(allFiles.map(f => f.date))].sort().pop();
const effectiveEnd = latestOverall < endDate ? latestOverall : endDate;
const anchorNote = effectiveEnd !== endDate ? ` (Fenster verankert auf letzten verfügbaren Spieltag ${effectiveEnd})` : '';

// ------------------------------------------------------------
// 2) Pro Periode EINEN kombinierten Eintrag aktualisieren
// ------------------------------------------------------------
const existing = loadExisting(out);
let updated = 0;
let skipped = 0;

for (const period of ['week', 'month']) {
  const entry = buildEntry({ period, league: 'all', endDate: effectiveEnd, dir });
  if (!entry) {
    console.log(`  – ${period}: keine ausreichenden Daten bis ${effectiveEnd}, übersprungen.`);
    skipped++;
    continue;
  }
  mergeEntry(existing, period, 'all', effectiveEnd, entry);
  console.log(`  ✓ ${period}: ${entry.players.length} Spieler, Fenster ${entry.windowStart}–${entry.windowEnd} (${entry.daysInWindow} Tag(e), Standorte: ${entry.leaguesInWindow.join(', ')})${anchorNote}.`);
  updated++;
}

if (!updated) {
  console.log('Keine Änderungen — livescores-aggregate.js bleibt unverändert.');
  process.exit(0);
}

trimKeep(existing, keep);
writeOut(existing, out);
console.log(`\n${out} geschrieben: ${updated} Eintrag/Einträge aktualisiert, ${skipped} übersprungen.`);
