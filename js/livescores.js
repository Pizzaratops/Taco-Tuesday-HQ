// ============================================================
//  LIVE SCORES — UI logic (Daily tab)
//  Weekly/Monthly tabs are stubbed for now (data pipeline TBD).
// ============================================================

const LS_COLUMNS = [
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

let lsCurrentLeague = 'nba-summer-las-vegas';
let lsCurrentDate   = null;   // "YYYY-MM-DD"
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

function _lsAvailableDates(league) {
  const data = LIVESCORES_DAILY[league] || {};
  return Object.keys(data).sort();
}

function lsInit() {
  const select = document.getElementById('lsLeagueSelect');
  if (select) select.value = lsCurrentLeague;

  const dates = _lsAvailableDates(lsCurrentLeague);
  const startDate = lsCurrentDate && dates.includes(lsCurrentDate)
    ? lsCurrentDate
    : (dates.length ? dates[dates.length - 1] : _lsToDateStr(new Date()));

  lsLoadDate(startDate);
}

function lsSwitchPeriod(period) {
  // Only 'daily' is wired up right now — Weekly/Monthly land once
  // aggregate-9cat.js output is being published to the repo.
  if (period !== 'daily') return;
  document.querySelectorAll('.ls-subtab').forEach(el => el.classList.remove('active'));
  document.getElementById('lsSubtabDaily').classList.add('active');
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

function _lsFormatDateLabel(dateStr) {
  const d = _lsToDateObj(dateStr);
  return d.toLocaleDateString('de-DE', { weekday: 'short', day: '2-digit', month: '2-digit', year: 'numeric', timeZone: 'UTC' });
}

function _lsRender() {
  const meta = document.getElementById('lsMeta');
  const gamesLine = document.getElementById('lsGamesLine');
  const content = document.getElementById('lsContent');
  if (!content) return;

  const dayData = (LIVESCORES_DAILY[lsCurrentLeague] || {})[lsCurrentDate];

  if (meta) meta.textContent = _lsFormatDateLabel(lsCurrentDate);

  if (!dayData || !dayData.players || !dayData.players.length) {
    if (gamesLine) gamesLine.textContent = '';
    content.innerHTML = `<div class="ls-status">Keine Daten für dieses Datum. Entweder wurden keine Spiele ausgetragen, oder die Automatisierung hat diesen Tag noch nicht erfasst.</div>`;
    return;
  }

  if (gamesLine) {
    const avg = dayData.leagueAvg
      ? ` · Liga-Ø FG% ${dayData.leagueAvg.fg.toFixed(1)}% · FT% ${dayData.leagueAvg.ft.toFixed(1)}%`
      : '';
    gamesLine.innerHTML = (dayData.games || []).join(' &nbsp;·&nbsp; ') + avg;
  }

  lsRows = dayData.players.slice();
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

  const thead = LS_COLUMNS.map(c =>
    `<th class="${c.key === lsSortCol ? 'r-sorted' : ''}" onclick="lsSortBy('${c.key}')">${c.label}<span class="r-sort-arrow">↕</span></th>`
  ).join('');

  const rows = lsRows.map(p => {
    const compClass = p.composite >= 0 ? 'pos' : 'neg';
    const compLabel = (p.composite >= 0 ? '+' : '') + p.composite.toFixed(2);
    return `<tr>
      <td>${p.rank}</td>
      <td>${p.name}</td>
      <td>${p.team}</td>
      <td>${p.min}</td>
      <td>${p.pts}</td>
      <td>${p.reb}</td>
      <td>${p.ast}</td>
      <td>${p.stl}</td>
      <td>${p.blk}</td>
      <td>${p.to}</td>
      <td>${p.tpm}</td>
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
