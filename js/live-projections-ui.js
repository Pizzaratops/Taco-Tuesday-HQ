// ============================================================
//  LIVE PROJECTIONS — UI
// ============================================================
//  Zeigt data/live-projections.js (Blend aus Preseason-Baseline +
//  echten Saison-Stats, siehe scripts/build-live-projections.js) als
//  sortierbare/durchsuchbare Tabelle. Ersetzt ab Saisonstart den
//  aktuellen Iframe unter "Player" → "Projections" (siehe README,
//  "Season-Start-Plan: Projections-Flow"). Bis dahin nur intern zum
//  Testen erreichbar.
// ============================================================

const LP_COLS = [
  { key: 'pts', label: 'PTS' }, { key: 'reb', label: 'REB' }, { key: 'ast', label: 'AST' },
  { key: 'stl', label: 'STL' }, { key: 'blk', label: 'BLK' }, { key: 'tpm', label: '3PM' },
  { key: 'fgPct', label: 'FG%' }, { key: 'ftPct', label: 'FT%' }, { key: 'tov', label: 'TOV' },
];

let lpSortKey = 'pts';
let lpSortAsc = false;
let lpFiltered = [];

function _lpData() {
  if (typeof LIVE_PROJECTIONS === 'undefined') return [];
  const dynastyByName = new Map((typeof DYNASTY_PLAYERS !== 'undefined' ? DYNASTY_PLAYERS : []).map(p => [p[1], p]));
  return Object.entries(LIVE_PROJECTIONS).map(([name, s]) => {
    const dp = dynastyByName.get(name);
    return { name, team: dp ? dp[2] : '', pos: dp ? dp[3] : '', ...s };
  });
}

function showLiveProjections() {
  navigate('liveProjectionsPage');
  lpFiltered = _lpData();
  _lpSort();
  _lpRender();
  const meta = document.getElementById('lpMeta');
  if (meta) {
    const n = lpFiltered.length;
    const withGames = lpFiltered.filter(p => p.gamesPlayed > 0).length;
    meta.textContent = `${n} Spieler · ${withGames} mit echten Spielen in dieser Saison bisher`;
  }
}

function filterLiveProjections() {
  const q = (document.getElementById('lpSearch')?.value || '').toLowerCase().trim();
  const all = _lpData();
  lpFiltered = q ? all.filter(p => p.name.toLowerCase().includes(q) || p.team.toLowerCase().includes(q) || p.pos.toLowerCase().includes(q)) : all;
  _lpSort();
  _lpRender();
}

function sortLiveProjections(key) {
  if (lpSortKey === key) lpSortAsc = !lpSortAsc;
  else { lpSortKey = key; lpSortAsc = key === 'name'; }
  _lpSort();
  _lpRender();
}

function _lpSort() {
  const key = lpSortKey, asc = lpSortAsc;
  lpFiltered.sort((a, b) => {
    if (key === 'name' || key === 'team' || key === 'pos') {
      const c = String(a[key]).localeCompare(String(b[key]));
      return asc ? c : -c;
    }
    const c = (a[key] || 0) - (b[key] || 0);
    return asc ? c : -c;
  });
}

function _lpRender() {
  const tbody = document.getElementById('lpBody');
  const noR = document.getElementById('lpNoResults');
  if (!tbody) return;
  if (!lpFiltered.length) { tbody.innerHTML = ''; if (noR) noR.style.display = 'block'; return; }
  if (noR) noR.style.display = 'none';

  tbody.innerHTML = lpFiltered.map((p, i) => {
    const statCells = LP_COLS.map(c => {
      const v = p[c.key] || 0;
      const disp = c.key === 'fgPct' || c.key === 'ftPct' ? v.toFixed(1) + '%' : v.toFixed(1);
      return `<td style="text-align:center;">${disp}</td>`;
    }).join('');
    const badge = p.gamesPlayed > 0
      ? `<span style="font-size:9px;font-weight:800;padding:1px 6px;border-radius:5px;background:rgba(76,175,129,0.15);color:#6dddaa;" title="${p.gamesPlayed} echte Spiele eingerechnet, Baseline-Gewicht ${p.hasBaseline ? 'aktiv' : 'ohne Baseline'}">LIVE · ${p.gamesPlayed} GP</span>`
      : `<span style="font-size:9px;font-weight:800;padding:1px 6px;border-radius:5px;background:var(--surface2);color:var(--muted);" title="Noch keine echten Spiele, reine Preseason-Baseline">BASELINE</span>`;
    return `<tr>
      <td style="text-align:center;color:var(--muted);">${i + 1}</td>
      <td><span class="r-name">${p.name}</span></td>
      <td><span class="r-team">${p.team}</span></td>
      <td><span class="r-pos">${p.pos}</span></td>
      <td style="text-align:center;">${p.min ? p.min.toFixed(1) : '–'}</td>
      ${statCells}
      <td>${badge}</td>
    </tr>`;
  }).join('');
}
