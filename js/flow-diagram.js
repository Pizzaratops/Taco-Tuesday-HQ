// ============================================================
//  DATA FLOW DIAGRAM — Home-Seite, unterhalb des Team-Grids
// ============================================================
//  Rendert die komplette Stat-Pipeline als Stufen-Diagramm in
//  #flowDiagram. Rein deklarativ: die Pipeline steht als Daten in
//  FLOW_STAGES, das Rendering darunter ist generisch. Wenn sich am
//  Ablauf etwas aendert, reicht es, FLOW_STAGES anzupassen.
//
//  Styling: css/flow.css (nutzt die globalen Theme-Variablen, also
//  Dark und Light ohne Sonderfall).
//
//  Zwei Ansichten:
//    kompakt     — nur Karten mit Kurzbeschreibung
//    ausfuehrlich — zusaetzlich die .flow-detail-Bloecke (Zeitpunkte,
//                   Gewichtungen, Dateinamen im Detail)
// ============================================================

const FLOW_STAGES = [
  {
    num: '01',
    name: 'Quelle',
    note: 'Alles startet bei ESPN. Nichts davon wird von Hand gepflegt.',
    connector: 'Automatischer Abruf über GitHub Actions',
    cards: [
      {
        icon: '🏀', kind: 'source', title: 'NBA Boxscores',
        text: 'Jeden Spieltag werden die kompletten Boxscores aller Partien abgerufen, Spieler für Spieler.',
        files: ['scripts/daily-9cat.js'],
        badge: '3× täglich',
        detail: [
          ['Läufe', '06:00, 08:00 und 22:00 Uhr Berliner Zeit. Der späte Lauf holt Spiele nach, die zum Morgenlauf noch nicht beendet waren.'],
          ['Datum', 'ESPN katalogisiert Spieltage nach US-Zeit, nicht nach UTC. Der Abruf rechnet deshalb explizit um, sonst fehlt regelmäßig ein Tag.'],
          ['Ausfall', 'GitHub verwirft geplante Läufe unter Last. Ein externer Trigger stößt den Workflow zusätzlich an, alle Läufe sind wiederholbar ohne Doppelzählung.'],
        ],
      },
      {
        icon: '👥', kind: 'source', title: 'Fantasy Rosters',
        text: 'Wer aktuell wem gehört, kommt direkt aus der ESPN Liga. Trades werden automatisch erkannt.',
        files: ['scripts/sync-espn-rosters.js'],
        badge: 'täglich',
        detail: [
          ['Ziel', 'data/rosters-live.js. Manuelle Korrekturen im Admin bleiben erhalten und werden obendrauf gelegt.'],
          ['Schutz', 'Liefert ESPN eine unvollständige Antwort, bricht der Sync ab statt den letzten guten Stand zu überschreiben.'],
        ],
      },
    ],
  },
  {
    num: '02',
    name: 'Rohdaten',
    note: 'Der unveränderte Tagesstand, aus dem alles Weitere entsteht.',
    connector: 'Pro Spieler und Spieltag eine Zeile',
    cards: [
      {
        icon: '📥', kind: 'data', title: 'Tageswerte',
        text: 'Ein Eintrag je Spieler und Spieltag mit allen neun Kategorien plus Minuten und Spielen.',
        files: ['data/livescores-daily.js'],
        detail: [
          ['Kategorien', 'PTS, REB, AST, STL, BLK, 3PM, TO sowie FG und FT jeweils als Treffer und Versuche.'],
          ['Prozente', 'FG% und FT% werden immer aus Treffern und Versuchen neu berechnet, nie aus Tagesprozenten gemittelt.'],
        ],
      },
      {
        icon: '📋', kind: 'data', title: 'Aktuelle Kader',
        text: 'Der Stand aller zwölf Teams inklusive Position und NBA Team je Spieler.',
        files: ['data/rosters-live.js'],
      },
    ],
  },
  {
    num: '03',
    name: 'Aggregation',
    note: 'Aus Tageswerten werden rollierende Fenster mit Z-Scores.',
    connector: 'Zwei Fenster parallel, jeden Tag neu berechnet',
    cards: [
      {
        icon: '📆', kind: 'script', title: 'Weekly',
        text: 'Rollierendes Fenster über die letzten sieben Tage. Zeigt, wer gerade heiß läuft.',
        files: ['scripts/update-all-aggregates.js'],
        detail: [
          ['Fenster', 'Verschiebt sich täglich mit, umfasst immer die letzten sieben Kalendertage.'],
          ['Filter', 'Eine Mindestanzahl Spiele verhindert, dass ein einzelnes starkes Spiel die Liste anführt.'],
        ],
      },
      {
        icon: '🗓️', kind: 'script', title: 'Monthly',
        text: 'Rollierendes Fenster über dreißig Tage. Deutlich stabiler, gut für echte Formtrends.',
        files: ['scripts/update-all-aggregates.js'],
      },
      {
        icon: '🧮', kind: 'data', title: 'Z-Scores je Kategorie',
        text: 'Jede Kategorie wird gegen den Ligadurchschnitt normiert, sodass Punkte und Blocks vergleichbar werden.',
        files: ['data/livescores-aggregate.js'],
        detail: [
          ['Prinzip', 'Ein Z-Score sagt, wie viele Standardabweichungen ein Spieler über oder unter dem Durchschnitt liegt.'],
          ['FG und FT', 'Fließen als Impact ein, also Prozentsatz gewichtet mit dem Volumen. Ein Spieler mit 100% aus zwei Versuchen bewegt fast nichts.'],
          ['Composite', 'Die Summe aller neun Z-Scores. Das ist die Zahl, nach der sortiert wird.'],
        ],
      },
    ],
  },
  {
    num: '04',
    name: 'Archiv',
    note: 'Abgeschlossene Zeiträume werden dauerhaft festgeschrieben.',
    connector: 'Einmal geschrieben, nie wieder verändert',
    cards: [
      {
        icon: '🔒', kind: 'data', title: 'Rolling Rankings',
        text: 'Jede Kalenderwoche und jeder Monat bekommt genau einen dauerhaften Eintrag, sobald der Zeitraum vorbei ist.',
        files: ['data/rolling-rankings-2026-27.js'],
        detail: [
          ['Unterschied', 'Die Aggregate oben sind ein bewegliches Fenster und kappen alte Stichtage. Das Archiv wächst nur und wird nie gekürzt.'],
          ['Nutzen', 'Damit lässt sich der Verlauf über die Saison zeichnen, statt nur den Momentzustand zu sehen.'],
        ],
      },
      {
        icon: '☀️', kind: 'data', title: 'Off Season Rankings',
        text: 'Summer League und Preseason kumulativ über den gesamten Zeitraum, nicht rollierend.',
        files: ['data/offseason-rankings.js'],
      },
    ],
  },
  {
    num: '05',
    name: 'Projections',
    note: 'Erwartung und Realität werden gegeneinander verrechnet.',
    connector: 'Je mehr Spiele gespielt sind, desto stärker zählt die Realität',
    cards: [
      {
        icon: '🎯', kind: 'data', title: 'Preseason Baseline',
        text: 'Die vor Saisonstart einmal festgelegte Erwartung je Spieler. Der einzige Teil der Pipeline, der von Hand kommt.',
        files: ['data/projections-baseline.js'],
      },
      {
        icon: '🔮', kind: 'script', title: 'Live Blend',
        text: 'Baseline und tatsächliche Saisonstatistik werden gemischt. Am Saisonanfang dominiert die Baseline, später die echten Zahlen.',
        files: ['scripts/build-live-projections.js', 'data/live-projections.js'],
        detail: [
          ['Formel', 'Die Baseline zählt wie eine feste Anzahl fiktiver Spiele. Kommen echte Spiele dazu, verschiebt sich das Gewicht automatisch Richtung Realität.'],
          ['Effekt', 'Ein starker Saisonstart hebt die Projection sofort spürbar, aber nicht sprunghaft. Nach etwa zwanzig Spielen ist die Baseline weitgehend verdrängt.'],
        ],
      },
    ],
  },
  {
    num: '06',
    name: 'Gewichtung',
    note: 'Nicht jede Kategorie zählt gleich viel für den Gesamtwert.',
    connector: 'Gilt für Rolling Rankings und die abgeleiteten Boards',
    cards: [
      {
        icon: '⚖️', kind: 'script', title: 'Kategorie-Gewichte',
        text: 'Rebounds und Assists zählen voll, Punkte etwas weniger, Turnover fast gar nicht. Gespielte Spiele fließen bewusst nicht ein.',
        detail: [
          ['Voll', 'REB 1,0 · AST 1,0 · FG% 1,0'],
          ['Punkte', 'PTS 0,9 — Punkte sind in fast jedem Kader reichlich vorhanden und daher weniger knapp.'],
          ['FT%', 'FT% 0,85'],
          ['Knapp', 'STL 0,75 · BLK 0,75 · 3PM 0,75 — geringes Volumen, entsprechend hohe Zufallsschwankung.'],
          ['Turnover', 'TO 0,25 — Ballverluste korrelieren stark mit Ballbesitz und bestrafen sonst gute Spieler doppelt.'],
        ],
      },
      {
        icon: '🎚️', kind: 'view', title: 'Punt-Gewichtung',
        text: 'Auf der Live Scores Seite lässt sich jede Kategorie selbst von null bis doppelt drehen, um eine Punt-Strategie durchzurechnen.',
        page: 'showLiveScores',
      },
    ],
  },
  {
    num: '07',
    name: 'Ansichten',
    note: 'Was am Ende auf dieser Seite sichtbar wird.',
    connector: 'Alles hierunter greift auf dieselbe Datenbasis zu',
    cards: [
      {
        icon: '🔴', kind: 'view', title: 'Live Scores',
        text: 'Weekly und Monthly nebeneinander, mit Punt-Gewichtung, Mindestspielen und CSV Export.',
        page: 'showLiveScores',
      },
      {
        icon: '🏅', kind: 'view', title: '2026/27 Rankings',
        text: 'Die Z-Score Rangliste aller Spieler, getrennt nach Off Season und regulärer Saison.',
        page: 'showPlayerRankings',
      },
      {
        icon: '📈', kind: 'view', title: 'Rolling Rankings',
        text: 'Der Rangverlauf über die Saison hinweg, Woche für Woche aus dem Archiv gezeichnet.',
        page: 'showRollingRankings',
      },
      {
        icon: '🆓', kind: 'view', title: 'Best Available',
        text: 'Freie Spieler nach einem zusammengesetzten Wert aus Dynasty Rang, Vorsaison, aktueller Form und Draft Kapital.',
        page: 'showBestAvail',
      },
      {
        icon: '⚖️', kind: 'view', title: 'Trade Analyzer',
        text: 'Bewertet beide Seiten eines Trades über Dynasty Rang und Alter.',
        page: 'showTrade',
      },
      {
        icon: '⚔️', kind: 'new', title: 'Matchup Planer',
        text: 'Stellt zwei Kader über alle neun Kategorien gegenüber und schätzt, wie das direkte Duell ausgeht.',
        page: 'showMatchupPlanner',
        badge: 'neu',
        badgeHot: true,
      },
    ],
  },
];

function renderFlowDiagram() {
  const host = document.getElementById('flowDiagram');
  if (!host) return;

  const parts = [];

  FLOW_STAGES.forEach((stage, si) => {
    const cards = stage.cards.map(c => {
      const files = (c.files || [])
        .map(f => `<span class="flow-card-file">${_flowEsc(f)}</span>`).join('');

      const detail = (c.detail && c.detail.length)
        ? `<div class="flow-detail"><div class="flow-detail-list">${
            c.detail.map(([k, v]) =>
              `<div class="flow-detail-row"><span class="flow-detail-key">${_flowEsc(k)}</span><span>${_flowEsc(v)}</span></div>`
            ).join('')
          }</div></div>`
        : '';

      const badge = c.badge
        ? `<span class="flow-card-badge${c.badgeHot ? ' hot' : ''}">${_flowEsc(c.badge)}</span>`
        : '';

      // Nur verlinken, wenn die Zielfunktion wirklich existiert — sonst
      // waere die Karte klickbar, ohne dass etwas passiert.
      const linked = c.page && typeof window[c.page] === 'function';
      const click = linked ? ` onclick="${c.page}()"` : '';

      return `<div class="flow-card is-${c.kind}${linked ? ' clickable' : ''}"${click}>
        <div class="flow-card-top">
          <span class="flow-card-icon">${c.icon}</span>
          <span class="flow-card-title">${_flowEsc(c.title)}</span>
          ${badge}
        </div>
        <div class="flow-card-text">${_flowEsc(c.text)}</div>
        ${files}
        ${detail}
      </div>`;
    }).join('');

    parts.push(`<div class="flow-stage">
      <div class="flow-stage-side">
        <div class="flow-stage-num">STUFE ${stage.num}</div>
        <div class="flow-stage-name">${_flowEsc(stage.name)}</div>
        <div class="flow-stage-note">${_flowEsc(stage.note)}</div>
      </div>
      <div class="flow-cards">${cards}</div>
    </div>`);

    if (si < FLOW_STAGES.length - 1 && stage.connector) {
      parts.push(`<div class="flow-connector">
        <div class="flow-connector-line">
          <span class="flow-connector-arrow">▼</span>
          <span class="flow-connector-label">${_flowEsc(stage.connector)}</span>
        </div>
      </div>`);
    }
  });

  host.innerHTML = parts.join('');
}

function _flowEsc(s) {
  return String(s == null ? '' : s)
    .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
}

function flowSetMode(mode) {
  const sec = document.getElementById('flowSection');
  if (!sec) return;
  sec.classList.toggle('detailed', mode === 'detailed');
  document.querySelectorAll('.flow-toggle-btn').forEach(b =>
    b.classList.toggle('active', b.dataset.mode === mode));
  try { localStorage.setItem('tthqFlowMode', mode); } catch (e) { /* Privatmodus */ }
}

function initFlowDiagram() {
  renderFlowDiagram();
  let mode = 'compact';
  try { mode = localStorage.getItem('tthqFlowMode') || 'compact'; } catch (e) { /* Privatmodus */ }
  flowSetMode(mode);
}
