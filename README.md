# 🌮 Taco Tuesday HQ

**Live:** https://pizzaratops.github.io/Taco-Tuesday-HQ/

Fantasy-Basketball-Hub für eine 12-Team H2H 9-Category Dynasty-Liga auf ESPN Fantasy Basketball. Dynasty Rankings, Team-Rosters, Trade-Analyse, Draft-Tools, Standings-Historie, Live Scores und mehr — alles automatisiert über GitHub Pages + GitHub Actions.

---

## 📌 Zuletzt gemacht

- **Best Available komplett neu gebaut:** ein einziger gewichteter Score aus Dynasty-Rang, BBM-Redraft-Rang, letzter Saison (2025/26), Off-Season/Preseason und laufender Saison (schaltet sich automatisch scharf, sobald die reguläre Saison Daten liefert). Für Rookies zusätzlich Pre-Draft Big Board + echte Draft Capital + Sticky Score.
- **Post-Draft Board** für die komplette 2026er Draft-Klasse (56 Spieler), täglich neu berechnet.
- **ESPN-Roster-Sync automatisiert** — lief vorher nur über einen manuellen Admin-Knopf, jetzt Teil des täglichen Workflows (`data/rosters-live.js`).
- **Dynasty Live Nudge:** kleines Badge auf der Dynasty-Rankings-Seite, zeigt eine gedeckelte automatische Bewegung basierend auf aktueller Performance — verändert NICHT den manuellen Rang in `data/rankings.js`.
- **Alter für (fast) alle Spieler ergänzt:** BBM-Datei mit `age`-Spalte (letzte Saison) + Tankathon-Daten für die 2026er Rookies als Fallback.
- **Rookie/Sophomore/Every-Player-Filter** + saubere fortlaufende Nummerierung in Best Available (vorher Lücken, weil rostered Spieler rausgefiltert wurden).
- **Turnover aus "Beste/Schwächste Kategorie"** entfernt (auf Wunsch, da meist irrelevant für Waiver-Entscheidungen).
- **Sticky Score** aus [Pizzaratops/Summer-League-Modell](https://github.com/Pizzaratops/Summer-League-Modell) live eingebunden (gleiche Formel, kein Kopie-Drift).
- **Min.-Spiele-Slider (1–5)** bei Weekly/Monthly Live Scores, rein client-seitig.
- **Diverse Bugfixes:** falscher Require-Pfad in mehreren Scripts (stale Duplikat von `aggregate-core.js` ohne Off-Season-Regel → Weekly/Monthly zeigten zu wenig Spieler), Datums-Bug in `daily-9cat.js` (UTC statt Pacific-Zeit → Summer-League-Abfrage lief systematisch einen Tag zu früh), Cron-Zeiten von `:00` auf `:07` verschoben (GitHub-Lastspitzen), 22-Uhr-Lauf als echter Korrektur-Check umgebaut (fragt nochmal den gestrigen statt den heutigen Tag ab).
- **Draft Duel deaktiviert** (auskommentiert, nicht gelöscht) bis die 2027er Prospects da sind.

## 🔜 Als Nächstes (bis Saisonbeginn 2026/27)

1. **Liga-Wechsel im Workflow:** `LEAGUE_ARG`-Default von `nba-summer-las-vegas` auf `nba-preseason` (September) und dann `nba` (Oktober) umstellen.
2. **Tagesgrenze auf US-Eastern statt Pacific:** Der Pacific-Fix war Summer-League-spezifisch (nur Kalifornien/Utah/Vegas). Sobald die reguläre Saison über alle US-Zeitzonen läuft, ist Eastern die branchenübliche Referenz.
3. **BBM-Datei erneut hochladen**, sobald sie die 2026er-Rookies enthält (Alter + echte Season-Stats statt nur Tankathon-Fallback).
4. **Team Analytics automatisieren** — aktuell noch eine komplett statische Momentaufnahme (`js/analytics.js`, `AN_ROSTER` hardcoded).
5. **Draft Duel reaktivieren**, sobald 2027er Prospects verfügbar sind.
6. **Aufräumen:** doppelte `draft-capital-2026.js` (liegt sowohl in `scripts/` als auch `data/` — nur die Version in `data/` wird gebraucht) und eine verrutschte `daily-9cat.js` in `.github/workflows/` (gehört nach `scripts/`, liegt dort auch schon korrekt) entfernen.

---

## 🛠️ Tech-Stack

Reines Vanilla-JS + HTML/CSS, keine Build-Tools, kein Framework. Gehostet auf GitHub Pages, Datenpipeline läuft über GitHub Actions + Node.js-Scripts.

## 📁 Projektstruktur

```
index.html              Single-Page-App, alle Seiten als <div class="page">
css/                     Styles
js/                      Frontend-Logik (eine Datei pro Feature-Bereich)
data/                    Datendateien — teils statisch (von Hand gepflegt),
                         teils automatisch generiert (siehe unten)
scripts/                 Node-Scripts für die tägliche GitHub Action
scripts/lib/              └ stale Duplikat von aggregate-core.js, nicht mehr verwenden
scripts/data/            └ tägliche ESPN-Boxscore-CSVs (Rohdaten, per Workflow committed)
.github/workflows/       Die tägliche Automatisierung
```

### Wichtige Datendateien

| Datei | Quelle | Update |
|---|---|---|
| `data/rankings.js` (`DYNASTY_PLAYERS`) | manuell kuratiert (Beyaz + Matt Lawson, 60/40 gewichtet) | von Hand |
| `data/rosters-live.js` | ESPN API | täglich automatisch |
| `data/livescores-daily.js` / `-aggregate.js` | ESPN Boxscores | täglich automatisch |
| `data/offseason-rankings.js` | Summer League + Preseason CSVs | täglich automatisch |
| `data/postdraft-board.js` | Big Board + Draft Capital + Off-Season + Sticky Score | täglich automatisch |
| `data/best-available-board.js` | alle Signale kombiniert | täglich automatisch |
| `data/dynasty-live.js` | aktuelles Performance-Signal | täglich automatisch |
| `data/last-season-stats-2025-26.js` | BBM-Export | einmal pro Saison, manuell |
| `data/draft-class-2026.js` / `-2025.js` | Tankathon | einmalig pro Draft-Jahrgang, manuell |
| `data/rolling-rankings.js` | historisch (2025/26 EOS-Ränge) | statisch |
| `data/rolling-rankings-2026-27.js` | laufende Saison | täglich automatisch |
| `data/draft2026.js` / `draft2027.js` | Pre-Draft Big Boards | manuell |
| `data/hashtag.js` | Hashtag Basketball Rankings | manuell (externe Quelle) |

## ⚙️ Die tägliche Automatisierung

`.github/workflows/daily-9cat.yml` läuft 3× täglich (6/8/22 Uhr Berlin, DST-sicher über sechs Cron-Einträge + Zeit-Check-Step). Reihenfolge:

1. **ESPN Rosters synchronisieren** (`sync-espn-rosters.js`) — ersetzt den früheren manuellen Admin-Knopf
2. **Tagesdaten von ESPN holen** (`daily-9cat.js`) — der 22-Uhr-Lauf fragt bewusst den *gestrigen* statt heutigen Tag ab (Korrektur-Check für nachträgliche Boxscore-Änderungen)
3. **In `livescores-daily.js` konvertieren**
4. **Weekly/Monthly aktualisieren** (`update-all-aggregates.js`)
5. **Off-Season-Rankings fortschreiben**
6. **Post-Draft Board fortschreiben**
7. **Best Available Board fortschreiben**
8. **Dynasty Live Nudge fortschreiben**
9. **Rolling-Rankings-Archiv fortschreiben**
10. **Committen & pushen** (nur wenn sich tatsächlich was geändert hat)

Manueller Trigger jederzeit möglich über den "Run workflow"-Button (Actions-Tab → Daily 9cat Live Scores → Run workflow), optional mit eigenem Datum/Liga.

## 🧑‍💻 Lokal testen

```bash
node scripts/build-best-available-board.js   # z.B. einzelnes Script testen
node --check <datei>                          # Syntax-Check vor jedem Commit
```

Alle Build-Scripts sind idempotent und schreiben nur nach `data/` — kein Risiko, etwas kaputt zu machen, einfach nochmal laufen lassen.

## 📝 Konventionen

- Deutschsprachige UI, keine Bindestriche (Bindestriche) in deutschen UI-Texten
- Keine Emojis in Datentabellen
- Keine Inline-Kommentare in generiertem Code, aber ausführliche Header-Kommentare in jeder Datei
- `normalizeName()` (siehe `data/aliases.js`) für alle Namens-Abgleiche zwischen Datenquellen — ESPN/BBM/Tankathon schreiben Namen unterschiedlich
