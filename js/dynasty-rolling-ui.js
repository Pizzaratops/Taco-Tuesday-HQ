// ============================================================
//  DYNASTY ROLLING RANKINGS — UI
// ============================================================
//  Zeigt die Historie aus data/dynasty-rolling.js (DYNASTY_ROLLING,
//  NUR MFHFBs DR) als Tabelle: eine Spalte pro Snapshot plus Δ
//  (letzter vs. vorletzter Snapshot). Wächst automatisch, sobald
//  scripts/build-dynasty-rolling.js einen neuen Snapshot anhängt —
//  keine Code-Änderung nötig.
// ============================================================

var _dynRollAllRows = [];
var _dynRollFiltered = [];
var _dynRollSnaps = [];
var _dynRollSortKey = null;   // 'name' | 'team' | 'pos' | <snapshot-date> | 'delta'
var _dynRollSortAsc = true;

function renderDynastyRolling() {
  const snaps = (typeof DYNASTY_ROLLING !== 'undefined') ? DYNASTY_ROLLING : [];
  const wrap = document.getElementById('dynRollTableWrap');
  const empty = document.getElementById('dynRollEmpty');
  if (!snaps.length) {
    if (wrap) wrap.style.display = 'none';
    if (empty) empty.style.display = 'block';
    return;
  }
  if (wrap) wrap.style.display = '';
  if (empty) empty.style.display = 'none';

  const latest = snaps[snaps.length - 1];
  const prev = snaps.length > 1 ? snaps[snaps.length - 2] : null;
  _dynRollSnaps = snaps;
  if (!_dynRollSortKey) _dynRollSortKey = latest.date;

  // Header dynamisch aufbauen (eine Spalte pro Snapshot)
  const headerRow = document.getElementById('dynRollHeaderRow');
  if (headerRow) {
    let cols = `
      <th onclick="sortDynastyRolling('name')">Name<span class="r-sort-arrow">↕</span></th>
      <th onclick="sortDynastyRolling('team')">Team<span class="r-sort-arrow">↕</span></th>
      <th onclick="sortDynastyRolling('pos')">Position<span class="r-sort-arrow">↕</span></th>`;
    snaps.forEach(s => {
      cols += `<th style="text-align:center;white-space:nowrap;" onclick="sortDynastyRolling('${s.date}')" title="${s.date}">${s.label}<span class="r-sort-arrow">↕</span></th>`;
    });
    cols += `<th style="text-align:center;white-space:nowrap;" onclick="sortDynastyRolling('delta')" title="Letzter vs. vorletzter Snapshot">Δ<span class="r-sort-arrow">↕</span></th>`;
    headerRow.innerHTML = cols;
  }

  // Zeilen aus der Vereinigung aller Namen über alle Snapshots bauen
  const nameSet = new Set();
  snaps.forEach(s => Object.keys(s.ranks).forEach(n => nameSet.add(n)));
  const dynastyByName = new Map((typeof DYNASTY_PLAYERS !== 'undefined' ? DYNASTY_PLAYERS : []).map(p => [p[1], p]));

  _dynRollAllRows = [...nameSet].map(name => {
    const dp = dynastyByName.get(name);
    const latestRank = (name in latest.ranks) ? latest.ranks[name] : null;
    const prevRank = prev && (name in prev.ranks) ? prev.ranks[name] : null;
    const delta = (latestRank != null && prevRank != null) ? (prevRank - latestRank) : null; // >0 = Rang verbessert (nach oben)
    return {
      name,
      team: dp ? dp[2] : '',
      pos: dp ? dp[3] : '',
      latestRank,
      delta,
      snapRanks: snaps.map(s => (name in s.ranks) ? s.ranks[name] : null),
    };
  });

  filterDynastyRolling();
}

function filterDynastyRolling() {
  const el = document.getElementById('dynRollSearch');
  const q = el ? el.value.toLowerCase().trim() : '';
  _dynRollFiltered = q
    ? _dynRollAllRows.filter(r => r.name.toLowerCase().includes(q) || r.team.toLowerCase().includes(q) || r.pos.toLowerCase().includes(q))
    : [..._dynRollAllRows];
  _dynRollApplySort();
  _renderDynRollRows(_dynRollFiltered);
}

function sortDynastyRolling(key) {
  if (_dynRollSortKey === key) _dynRollSortAsc = !_dynRollSortAsc;
  else { _dynRollSortKey = key; _dynRollSortAsc = key !== 'delta'; } // Δ default: größte Verbesserung zuerst
  _dynRollApplySort();
  _renderDynRollRows(_dynRollFiltered);
}

function _dynRollApplySort() {
  const key = _dynRollSortKey;
  const asc = _dynRollSortAsc;
  const snapIdx = _dynRollSnaps.findIndex(s => s.date === key);

  _dynRollFiltered.sort((a, b) => {
    let av, bv;
    if (key === 'name' || key === 'team' || key === 'pos') {
      av = a[key]; bv = b[key];
      const c = String(av).localeCompare(String(bv));
      return asc ? c : -c;
    }
    if (key === 'delta') {
      av = a.delta; bv = b.delta;
    } else if (snapIdx !== -1) {
      av = a.snapRanks[snapIdx]; bv = b.snapRanks[snapIdx];
    } else {
      av = a.latestRank; bv = b.latestRank;
    }
    // null/fehlende Werte immer ans Ende, unabhängig von der Sortierrichtung
    if (av == null && bv == null) return 0;
    if (av == null) return 1;
    if (bv == null) return -1;
    const c = av - bv;
    return asc ? c : -c;
  });

  document.querySelectorAll('#dynastyRollingPage .rankings-table thead th').forEach(th => {
    th.classList.toggle('r-sorted', th.getAttribute('onclick') === `sortDynastyRolling('${key}')`);
  });
}

function _dynRollRankBadge(rank) {
  if (rank == null) return `<span style="color:var(--border);font-size:11px;">—</span>`;
  return `<span style="font-size:11px;font-weight:800;padding:2px 8px;border-radius:6px;background:${dynastyRankBg(rank)};color:${dynastyRankColor(rank)};">#${rank}</span>`;
}

function _dynRollDeltaBadge(delta) {
  if (delta == null) return `<span style="color:var(--border);font-size:11px;">—</span>`;
  if (delta === 0) return `<span style="color:var(--muted);font-size:11px;">±0</span>`;
  return delta > 0
    ? `<span style="font-size:11px;font-weight:800;padding:2px 8px;border-radius:6px;background:rgba(76,175,129,0.15);color:#6dddaa;" title="Rang um ${delta} verbessert">▲${delta}</span>`
    : `<span style="font-size:11px;font-weight:800;padding:2px 8px;border-radius:6px;background:rgba(255,101,132,0.15);color:#ff8fa3;" title="Rang um ${Math.abs(delta)} verschlechtert">▼${Math.abs(delta)}</span>`;
}

function _renderDynRollRows(rows) {
  const tbody = document.getElementById('dynRollBody');
  const noR = document.getElementById('dynRollNoResults');
  if (!tbody) return;
  if (!rows.length) { tbody.innerHTML = ''; if (noR) noR.style.display = 'block'; return; }
  if (noR) noR.style.display = 'none';

  tbody.innerHTML = rows.map(r => {
    const snapCols = r.snapRanks.map(rk => `<td style="text-align:center;">${_dynRollRankBadge(rk)}</td>`).join('');
    return `<tr>
      <td><span class="r-name">${r.name}</span></td>
      <td><span class="r-team">${r.team}</span></td>
      <td><span class="r-pos">${r.pos}</span></td>
      ${snapCols}
      <td style="text-align:center;">${_dynRollDeltaBadge(r.delta)}</td>
    </tr>`;
  }).join('');
}

function showDynastyRolling() {
  renderDynastyRolling();
  navigate('dynastyRollingPage');
}
