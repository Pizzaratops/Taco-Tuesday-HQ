// ============================================================
//  LIVE SCORES — UI logic (Daily / Weekly / Monthly)
// ============================================================
//  Daily liest LIVESCORES_DAILY[league][date] (data/livescores-daily.js).
//  Weekly/Monthly lesen LIVESCORES_AGGREGATE[period][league][endDate]
//  (data/livescores-aggregate.js), erzeugt von
//  scripts/update-all-aggregates.js über die "Daily 9cat Live
//  Scores" GitHub Action.
// ============================================================

const LS_COLUMNS_DAILY = [
  { key: 'rank',      label: '#',      align: 'center' },
  { key: 'name',      label: 'Name',   align: 'left' },
  { key: 'team',      label: 'Team',   align: 'left' },
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

// Wie LS_COLUMNS_DAILY, aber mit "GP" (Spiele im Fenster) nach Team —
// bei Weekly/Monthly sind MIN/PTS/etc. Pro-Spiel-Schnitte, keine Rohwerte.
const LS_COLUMNS_AGGREGATE = [
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

const LS_PERIOD_LABEL = { week: 'Woche', month: 'Monat' };

let lsCurrentPeriod = 'daily';  // "daily" | "week" | "month"
let lsCurrentLeague = 'nba-summer-las-vegas';
let lsCurrentDate   = null;     // "YYYY-MM-DD" — Tag (daily) oder Fenster-Stichtag (week/month)
let lsSortCol = 'composite';
let lsSortAsc = false;
let lsRows = [];

function _lsToDateObj(str) {
  const [y, m, d] = str.split('-').map(Number);
  return new Date(Date.UTC(y, m - 1, d));
}
function _lsToDateStr(d) {
  return d.toISOString().slice(0, 10);
}
function _lsFormatDateLabel(dateStr) {
  const d = _lsToDateObj(dateStr);
  return d.toLocaleDateString('de-DE', { weekday: 'short', day: '2-digit', month: '2-digit', year: 'numeric', timeZone: 'UTC' });
}
function _lsFormatDateShort(dateStr) {
  const d = _lsToDateObj(dateStr);
  return d.toLocaleDateString('de-DE', { day: '2-digit', month: '2-digit', year: 'numeric', timeZone: 'UTC' });
}

// ------------------------------------------------------------
// Datenzugriff — je nach Periode aus einer anderen globalen Quelle
// ------------------------------------------------------------
function _lsAvailableDates(period, league) {
  if (period === 'daily') {
    const data = (typeof LIVESCORES_DAILY !== 'undefined' ? LIVESCORES_DAILY[league] : null) || {};
    return Object.keys(data).sort();
  }
  const data = (typeof LIVESCORES_AGGREGATE !== 'undefined' ? (LIVESCORES_AGGREGATE[period] || {})[league] : null) || {};
  return Object.keys(data).sort();
}

function _lsEntry(period, league, dateStr) {
  if (period === 'daily') {
    const data = (typeof LIVESCORES_DAILY !== 'undefined' ? LIVESCORES_DAILY[league] : null) || {};
    return data[dateStr];
  }
  const data = (typeof LIVESCORES_AGGREGATE !== 'undefined' ? (LIVESCORES_AGGREGATE[period] || {})[league] : null) || {};
  return data[dateStr];
}

// ------------------------------------------------------------
// Navigation
// ------------------------------------------------------------
function lsInit() {
  const select = document.getElementById('lsLeagueSelect');
  if (select) select.value = lsCurrentLeague;

  const dates = _lsAvailableDates(lsCurrentPeriod, lsCurrentLeague);
  const startDate = lsCurrentDate && dates.includes(lsCurrentDate)
    ? lsCurrentDate
    : (dates.length ? dates[dates.length - 1] : _lsToDateStr(new Date()));

  lsLoadDate(startDate);
}

function lsSwitchPeriod(period) {
  if (period === lsCurrentPeriod) return;
  lsCurrentPeriod = period;

  document.querySelectorAll('.ls-subtab').forEach(el => el.classList.remove('active'));
  const idByPeriod = { daily: 'lsSubtabDaily', week: 'lsSubtabWeekly', month: 'lsSubtabMonthly' };
  document.getElementById(idByPeriod[period])?.classList.add('active');

  // Beim Wechsel auf den zuletzt verfügbaren Stichtag für die neue Periode springen —
  // ein Datum, das bei Daily existiert, muss bei Weekly/Monthly nicht existieren.
  const dates = _lsAvailableDates(lsCurrentPeriod, lsCurrentLeague);
  const nextDate = dates.length ? dates[dates.length - 1] : lsCurrentDate;
  lsLoadDate(nextDate);
}

function lsLoadDate(dateStr) {
  if (!dateStr) return;
  lsCurrentLeague = document.getElementById('lsLeagueSelect')?.value || lsCurrentLeague;
  lsCurrentDate = dateStr;

  const dateInput = document.getElementById('lsDateInput');
  if (dateInput) dateInput.value = dateStr;

  _lsRender();
}

function lsShiftDate(delta) {
  if (!lsCurrentDate) return;
  const d = _lsToDateObj(lsCurrentDate);
  d.setUTCDate(d.getUTCDate() + delta);
  lsLoadDate(_lsToDateStr(d));
}

// ------------------------------------------------------------
// Rendering
// ------------------------------------------------------------
function _lsRender() {
  const meta = document.getElementById('lsMeta');
  const gamesLine = document.getElementById('lsGamesLine');
  const content = document.getElementById('lsContent');
  if (!content) return;

  const entry = _lsEntry(lsCurrentPeriod, lsCurrentLeague, lsCurrentDate);

  if (lsCurrentPeriod === 'daily') {
    if (meta) meta.textContent = _lsFormatDateLabel(lsCurrentDate);
  } else {
    const label = LS_PERIOD_LABEL[lsCurrentPeriod];
    if (meta) meta.textContent = `${label} bis ${_lsFormatDateShort(lsCurrentDate)}`;
  }

  if (!entry || !entry.players || !entry.players.length) {
    if (gamesLine) {
      gamesLine.textContent = lsCurrentPeriod === 'daily'
        ? ''
        : `Kein ${LS_PERIOD_LABEL[lsCurrentPeriod]}-Ranking für diesen Stichtag verfügbar.`;
    }
    content.innerHTML = `<div class="ls-status">Keine Daten für diesen Zeitraum. Entweder wurden keine Spiele ausgetragen, oder die Automatisierung hat das noch nicht erfasst.</div>`;
    return;
  }

  if (gamesLine) {
    if (lsCurrentPeriod === 'daily') {
      const avg = entry.leagueAvg
        ? ` · Liga-Ø FG% ${entry.leagueAvg.fg.toFixed(1)}% · FT% ${entry.leagueAvg.ft.toFixed(1)}%`
        : '';
      gamesLine.innerHTML = (entry.games || []).join(' &nbsp;·&nbsp; ') + avg;
    } else {
      const avg = entry.leagueAvg
        ? ` · Liga-Ø FG% ${entry.leagueAvg.fg.toFixed(1)}% · FT% ${entry.leagueAvg.ft.toFixed(1)}%`
        : '';
      gamesLine.innerHTML = `Fenster ${_lsFormatDateShort(entry.windowStart)} – ${_lsFormatDateShort(entry.windowEnd)}`
        + ` &nbsp;·&nbsp; ${entry.daysInWindow} Tag${entry.daysInWindow === 1 ? '' : 'e'} mit Daten`
        + ` &nbsp;·&nbsp; min. ${entry.minGames} Spiele für Aufnahme`
        + avg;
    }
  }

  lsRows = entry.players.slice();
  _lsSort(lsSortCol, true);
  _lsRenderTable();
}

function _lsSort(col, keepDirection) {
  if (!keepDirection) {
    if (lsSortCol === col) lsSortAsc = !lsSortAsc;
    else { lsSortCol = col; lsSortAsc = (col === 'rank' || col === 'name' || col === 'team'); }
  }
  lsRows.sort((a, b) => {
    const av = a[lsSortCol], bv = b[lsSortCol];
    const c = typeof av === 'number' ? av - bv : String(av).localeCompare(String(bv));
    return lsSortAsc ? c : -c;
  });
}

function lsSortBy(col) {
  _lsSort(col, false);
  _lsRenderTable();
}

function _lsRenderTable() {
  const content = document.getElementById('lsContent');
  if (!content) return;

  const isDaily = lsCurrentPeriod === 'daily';
  const columns = isDaily ? LS_COLUMNS_DAILY : LS_COLUMNS_AGGREGATE;

  const thead = columns.map(c =>
    `<th class="${c.key === lsSortCol ? 'r-sorted' : ''}" onclick="lsSortBy('${c.key}')">${c.label}<span class="r-sort-arrow">↕</span></th>`
  ).join('');

  // Bei Daily sind min/pts/reb/... Rohwerte eines einzelnen Tages (Integers).
  // Bei Weekly/Monthly sind es Pro-Spiel-Schnitte über mehrere Tage (1 Dezimalstelle).
  const fmtCount = (n) => isDaily ? n : n.toFixed(1);

  const rows = lsRows.map(p => {
    const compClass = p.composite >= 0 ? 'pos' : 'neg';
    const compLabel = (p.composite >= 0 ? '+' : '') + p.composite.toFixed(2);
    const gpCell = isDaily ? '' : `<td>${p.games}</td>`;
    return `<tr>
      <td>${p.rank}</td>
      <td>${p.name}</td>
      <td>${p.team}</td>
      ${gpCell}
      <td>${fmtCount(p.min)}</td>
      <td>${fmtCount(p.pts)}</td>
      <td>${fmtCount(p.reb)}</td>
      <td>${fmtCount(p.ast)}</td>
      <td>${fmtCount(p.stl)}</td>
      <td>${fmtCount(p.blk)}</td>
      <td>${fmtCount(p.to)}</td>
      <td>${fmtCount(p.tpm)}</td>
      <td>${p.fgPct.toFixed(1)}%</td>
      <td>${p.ftPct.toFixed(1)}%</td>
      <td><span class="ls-composite ${compClass}">${compLabel}</span></td>
    </tr>`;
  }).join('');

  content.innerHTML = `
    <div class="ls-table-wrap">
      <table class="ls-table">
        <thead><tr>${thead}</tr></thead>
        <tbody>${rows}</tbody>
      </table>
    </div>`;
}
