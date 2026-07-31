// ============================================================
//  PLAYER — Rankings (Off Season / Reg Season) & Projections
// ============================================================
//  Rankings liest zwei automatisch generierte Quellen, komplett ohne
//  eigene Berechnung im Frontend (ungewichtete Z-Score-Composite, exakt
//  wie die Monthly-Ansicht bei Live Scores):
//
//  - Reg Season: der jeweils neueste Monthly-Eintrag aus
//    LIVESCORES_AGGREGATE.month.nba (data/livescores-aggregate.js) —
//    rollierendes 30-Tage-Fenster, täglich fortgeschrieben.
//  - Off Season: OFFSEASON_RANKINGS (data/offseason-rankings.js) —
//    kumulativ über die gesamte Off-Season (Summer League Cali/Utah/
//    Vegas + Pre-Season) bisher, gebaut von
//    scripts/build-offseason-rankings.js.
//
//  Projections ist bewusst noch leer (Platzhalter für später).
// ============================================================

let prCurrentTab = 'regseason'; // 'offseason' | 'regseason'
let prSortCol = 'composite';
let prSortAsc = false;
let prRows = [];
let prSearch = '';

function _prTeamFullName(abbr) {
  return (typeof _lsTeamFullName === 'function') ? _lsTeamFullName(abbr) : abbr;
}
function _prFantasyOwner(name) {
  return (typeof _lsFantasyOwner === 'function') ? _lsFantasyOwner(name) : null;
}

function _prLatestRegSeasonEntry() {
  if (typeof LIVESCORES_AGGREGATE === 'undefined' || !LIVESCORES_AGGREGATE.month || !LIVESCORES_AGGREGATE.month.nba) {
    return null;
  }
  const dates = Object.keys(LIVESCORES_AGGREGATE.month.nba).sort();
  if (!dates.length) return null;
  const latest = dates[dates.length - 1];
  const entry = LIVESCORES_AGGREGATE.month.nba[latest];
  if (!entry || !entry.players || !entry.players.length) return null;
  return { ...entry, _stichtag: latest };
}

function _prOffSeasonEntry() {
  if (typeof OFFSEASON_RANKINGS === 'undefined' || !OFFSEASON_RANKINGS.players || !OFFSEASON_RANKINGS.players.length) {
    return null;
  }
  return OFFSEASON_RANKINGS;
}

const PR_LEAGUE_LABELS = {
  'nba-summer-california': 'Cali',
  'nba-summer-utah': 'Utah',
  'nba-summer-las-vegas': 'Vegas',
  'nba-preseason': 'Preseason',
};

function showPlayerRankings() {
  navigate('playerRankingsPage');
  prInit();
}

// War bis 2026-07-31 die externe GitHub-Pages-URL des eigenstaendigen
// MFHFBs-NBA-Projections-Repos. Jetzt lokal, weil der komplette Projections-
// Toolkit (Projections/Teams/Draft Board) als Unterordner projections/
// in dieses Repo uebernommen wurde — ein Projekt statt zwei, siehe README.
// Seit 2026-07-31 (2. Nachbesserung) 3 eigene Nav-Eintraege/Seiten statt
// einer einzelnen Seite mit nur interner Navigation — ein Eintrag pro
// Unterseite des Toolkits, gleiche Iframe-Mechanik fuer alle drei.
const LIVE_PROJ_EMBEDS = {
  liveProjectionsPage: { frameId: 'projectionsFrame', src: 'projections/index.html' },
  liveProjTeamsPage:   { frameId: 'projTeamsFrame',   src: 'projections/teams.html' },
  liveProjDraftPage:   { frameId: 'projDraftFrame',   src: 'projections/draft.html' },
};
const _prResizeObservers = {};

function _prCurrentTheme() {
  return document.body.classList.contains('light') ? 'light' : 'dark';
}

function showPlayerProjections() {
  // Bewusst leer — noch keine eigene Datenquelle, siehe index.html-Kommentar
  // bei playerProjectionsPage und README "Season-Start-Plan: Projections-Flow".
  navigate('playerProjectionsPage');
}

function _prShowEmbed(pageId) {
  navigate(pageId);
  const cfg = LIVE_PROJ_EMBEDS[pageId];
  const frame = document.getElementById(cfg.frameId);
  if (frame && !frame.src) {
    frame.addEventListener('load', () => _prOnFrameLoad(cfg.frameId));
    frame.src = cfg.src + '?theme=' + _prCurrentTheme();
  }
  _prSizeFrame(cfg.frameId);
}
function showLiveProjections() { _prShowEmbed('liveProjectionsPage'); }
function showLiveProjTeams()   { _prShowEmbed('liveProjTeamsPage'); }
function showLiveProjDraft()   { _prShowEmbed('liveProjDraftPage'); }

// Same-origin seit dem Merge von projections/ ins Repo (2026-07-31) — daher
// koennen wir die tatsaechliche Inhaltshoehe des Iframes auslesen und den
// Rahmen exakt darauf setzen. Vorher (externe Cross-Origin-URL) ging das
// nicht, deshalb wurde der Iframe auf Viewport-Hoehe gedeckelt und scrollte
// dann INTERN zusaetzlich zur aeusseren Seite — daher das doppelte Scrollen.
// Jetzt: Iframe waechst/schrumpft mit seinem Inhalt, nur die TTHQ-Seite
// scrollt, wie bei jeder anderen Seite auch.
function _prSizeFrame(frameId) {
  const frame = document.getElementById(frameId);
  if (!frame || !frame.offsetParent) return;
  let doc;
  try { doc = frame.contentDocument; } catch (e) { doc = null; }
  if (!doc || !doc.documentElement) {
    // Noch nicht geladen (erster Aufruf vor "load") — vorlaeufig grosszuegige
    // Mindesthoehe, wird beim "load"-Event bzw. ResizeObserver sofort korrigiert.
    frame.style.height = Math.max(600, window.innerHeight - frame.getBoundingClientRect().top - 24) + 'px';
    return;
  }
  const h = Math.max(doc.documentElement.scrollHeight, doc.body ? doc.body.scrollHeight : 0);
  frame.style.height = Math.max(500, h + 4) + 'px';
}

function _prOnFrameLoad(frameId) {
  _prSizeFrame(frameId);
  const frame = document.getElementById(frameId);
  let doc;
  try { doc = frame.contentDocument; } catch (e) { doc = null; }
  if (!doc) return;
  // Beobachtet Groessenaenderungen im eingebetteten Inhalt (z.B. Filter-Panel
  // auf-/zuklappen, Tabellensortierung, interne Navigation innerhalb der
  // eingebetteten Seite loest ohnehin ein neues "load" aus) und passt die
  // Iframe-Hoehe live an, statt einer internen Scrollbar.
  if (_prResizeObservers[frameId]) _prResizeObservers[frameId].disconnect();
  if (typeof ResizeObserver !== 'undefined' && doc.body) {
    _prResizeObservers[frameId] = new ResizeObserver(() => _prSizeFrame(frameId));
    _prResizeObservers[frameId].observe(doc.body);
  }
}
window.addEventListener('resize', () => {
  Object.values(LIVE_PROJ_EMBEDS).forEach(cfg => _prSizeFrame(cfg.frameId));
});


function prInit() {
  document.getElementById('prSubtabOffSeason').classList.toggle('active', prCurrentTab === 'offseason');
  document.getElementById('prSubtabRegSeason').classList.toggle('active', prCurrentTab === 'regseason');
  prLoadTab();
}

function prSwitchTab(tab) {
  prCurrentTab = tab;
  document.getElementById('prSubtabOffSeason').classList.toggle('active', tab === 'offseason');
  document.getElementById('prSubtabRegSeason').classList.toggle('active', tab === 'regseason');
  prLoadTab();
}

function prLoadTab() {
  const meta = document.getElementById('prMeta');
  const content = document.getElementById('prContent');
  const entry = prCurrentTab === 'offseason' ? _prOffSeasonEntry() : _prLatestRegSeasonEntry();

  if (!entry) {
    if (meta) meta.textContent = '';
    const msg = prCurrentTab === 'offseason'
      ? 'Noch keine Off-Season-Daten (Summer League/Pre-Season) verfügbar.'
      : 'Noch keine Reg-Season-Daten verfügbar — kommt automatisch, sobald die Saison läuft.';
    content.innerHTML = `<div class="ls-status">${msg}</div>`;
    return;
  }

  if (meta) {
    if (prCurrentTab === 'offseason') {
      const leagueLabels = (entry.leagues || []).map(l => PR_LEAGUE_LABELS[l] || l).join(', ');
      meta.innerHTML = `${_prFormatDateShort(entry.windowStart)} – ${_prFormatDateShort(entry.windowEnd)}`
        + ` &nbsp;·&nbsp; ${leagueLabels}`
        + ` &nbsp;·&nbsp; min. ${entry.minGames} Spiele`
        + ` &nbsp;·&nbsp; Liga-Ø FG% ${entry.leagueAvg.fg.toFixed(1)}% · FT% ${entry.leagueAvg.ft.toFixed(1)}%`;
    } else {
      meta.innerHTML = `Rollierender Monat bis ${_prFormatDateShort(entry._stichtag)}`
        + ` &nbsp;·&nbsp; ${entry.daysInWindow} Tag${entry.daysInWindow === 1 ? '' : 'e'} mit Daten`
        + ` &nbsp;·&nbsp; min. ${entry.minGames} Spiele`
        + ` &nbsp;·&nbsp; Liga-Ø FG% ${entry.leagueAvg.fg.toFixed(1)}% · FT% ${entry.leagueAvg.ft.toFixed(1)}%`;
    }
  }

  prRows = entry.players.slice();
  _prSort(prSortCol, true);
  _prRenderTable();
}

function _prFormatDateShort(dateStr) {
  if (!dateStr) return '';
  const [y, m, d] = dateStr.split('-');
  return `${d}.${m}.${y}`;
}

function _prSort(col, keepDirection) {
  if (!keepDirection) {
    if (prSortCol === col) prSortAsc = !prSortAsc;
    else { prSortCol = col; prSortAsc = (col === 'rank' || col === 'name' || col === 'team'); }
  }
  prRows.sort((a, b) => {
    const av = a[prSortCol], bv = b[prSortCol];
    const c = typeof av === 'number' ? av - bv : String(av).localeCompare(String(bv));
    return prSortAsc ? c : -c;
  });
}

function prSortBy(col) {
  _prSort(col, false);
  _prRenderTable();
}

function prFilter() {
  prSearch = (document.getElementById('prSearch').value || '').toLowerCase().trim();
  _prRenderTable();
}

const PR_COLUMNS = [
  { key: 'rank',      label: '#',      align: 'center' },
  { key: 'name',      label: 'Name',   align: 'left' },
  { key: 'team',      label: 'Team',   align: 'left' },
  { key: 'games',     label: 'GP' },
  { key: 'min',       label: 'MIN' },
  { key: 'pts',       label: 'PTS' },
  { key: 'reb',       label: 'REB' },
  { key: 'ast',       label: 'AST' },
  { key: 'stl',       label: 'STL' },
  { key: 'blk',       label: 'BLK' },
  { key: 'to',        label: 'TO' },
  { key: 'tpm',       label: '3PM' },
  { key: 'fgPct',     label: 'FG%' },
  { key: 'ftPct',     label: 'FT%' },
  { key: 'composite', label: 'Z-Score' },
];

function _prRenderTable() {
  const content = document.getElementById('prContent');
  if (!content) return;

  const rows = prSearch
    ? prRows.filter(p => p.name.toLowerCase().includes(prSearch) || p.team.toLowerCase().includes(prSearch))
    : prRows;

  if (!rows.length) {
    content.innerHTML = `<div class="ls-status">Keine Spieler gefunden.</div>`;
    return;
  }

  const thead = PR_COLUMNS.map(c =>
    `<th class="${c.key === prSortCol ? 'r-sorted' : ''}" onclick="prSortBy('${c.key}')">${c.label}<span class="r-sort-arrow">↕</span></th>`
  ).join('');

  const body = rows.map((p, i) => {
    const compClass = p.composite >= 0 ? 'pos' : 'neg';
    const compLabel = (p.composite >= 0 ? '+' : '') + p.composite.toFixed(2);
    const owner = _prFantasyOwner(p.name);
    const secondLine = owner
      ? `<span class="ls-team-full ls-fantasy-owner" onclick="event.stopPropagation();if(typeof showTeam==='function')showTeam(${owner.id})" title="Go to ${owner.name}">${owner.name}</span>`
      : `<span class="ls-team-full">${_prTeamFullName(p.team)}</span>`;
    const teamCell = `<td><div class="ls-team-cell"><span class="ls-team-abbr">${p.team}</span>${secondLine}</div></td>`;
    return `<tr>
      <td>${i + 1}</td>
      <td>${p.name}</td>
      ${teamCell}
      <td>${p.games}</td>
      <td>${p.min.toFixed(1)}</td>
      <td>${p.pts.toFixed(1)}</td>
      <td>${p.reb.toFixed(1)}</td>
      <td>${p.ast.toFixed(1)}</td>
      <td>${p.stl.toFixed(1)}</td>
      <td>${p.blk.toFixed(1)}</td>
      <td>${p.to.toFixed(1)}</td>
      <td>${p.tpm.toFixed(1)}</td>
      <td>${p.fgPct.toFixed(1)}%</td>
      <td>${p.ftPct.toFixed(1)}%</td>
      <td><span class="ls-composite ${compClass}">${compLabel}</span></td>
    </tr>`;
  }).join('');

  content.innerHTML = `
    <div class="ls-table-wrap">
      <table class="ls-table">
        <thead><tr>${thead}</tr></thead>
        <tbody>${body}</tbody>
      </table>
    </div>`;
}
