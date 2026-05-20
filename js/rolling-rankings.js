// ============================================================
//  ROLLING RANKINGS — Saison 2025/26
//  Features:
//    - Monthly (Oct..März) und Weekly (1..22) Toggle
//    - Vergleichsmodus für bis zu 3 Spieler
//    - Instagram-Screenshot (4:5) in 2 Styles (warm / dark)
// ============================================================

const RR_MONTHS  = ['Oct','Nov','Dez','Jan','Feb','März'];
// RR_WEEKS und ROLLING_RANKINGS werden in data/rolling-rankings.js gesetzt (lädt davor).

let rrView          = 'monthly';   // 'monthly' | 'weekly'
let rrCompareMode   = false;
let rrSelected      = [];          // Array von origIdx (max 3 wenn compare, sonst max 1)
let rrFiltered      = [];
let rrChart         = null;

// Farben für Vergleichslinien
const RR_COMPARE_COLORS = ['#f5c842', '#29b6f6', '#ff6584'];

function showRollingRankings(highlightName) {
  navigate('rollingRankingsPage');
  _rrInit();
  if (highlightName) {
    const idx = ROLLING_RANKINGS.findIndex(p =>
      p.name === highlightName || normalizeName(p.name) === normalizeName(highlightName)
    );
    if (idx !== -1) {
      rrSelected = [idx];
      rrCompareMode = false;
      _rrRenderAll();
      setTimeout(() => {
        const row = document.querySelector('.rr-row[data-idx="' + idx + '"]');
        if (row) row.scrollIntoView({ block: 'center', behavior: 'smooth' });
      }, 100);
    }
  }
}

function _rrInit() {
  rrFiltered = ROLLING_RANKINGS.map((p, i) => ({ ...p, origIdx: i }));
  const inp = document.getElementById('rrSearch');
  if (inp) inp.value = '';
  _rrRenderAll();
}

function _rrRenderAll() {
  _rrRenderToolbar();
  _rrRenderListHeader();
  _rrRenderList();
  _rrRenderMain();
}

// ── TOOLBAR (View Toggle + Compare Toggle) ──────────────────────────────────
function _rrRenderToolbar() {
  const host = document.getElementById('rrToolbar');
  if (!host) return;
  const monthlyActive = rrView === 'monthly' ? ' rr-tb-active' : '';
  const weeklyActive  = rrView === 'weekly'  ? ' rr-tb-active' : '';
  const compareActive = rrCompareMode ? ' rr-tb-active' : '';
  host.innerHTML = `
    <div class="rr-tb-group">
      <button class="rr-tb-btn${monthlyActive}" onclick="rrSetView('monthly')">📅 Monate</button>
      <button class="rr-tb-btn${weeklyActive}" onclick="rrSetView('weekly')">📊 Wochen</button>
    </div>
    <div class="rr-tb-group">
      <button class="rr-tb-btn${compareActive}" onclick="rrToggleCompare()">⚖️ Vergleichen ${rrCompareMode ? '(' + rrSelected.length + '/3)' : ''}</button>
    </div>
  `;
}

function rrSetView(v) {
  if (v !== 'monthly' && v !== 'weekly') return;
  rrView = v;
  _rrRenderAll();
}

function rrToggleCompare() {
  rrCompareMode = !rrCompareMode;
  if (!rrCompareMode && rrSelected.length > 1) {
    rrSelected = rrSelected.slice(0, 1);
  }
  _rrRenderAll();
}

// ── LIST HEADER (cols change with view) ─────────────────────────────────────
function _rrRenderListHeader() {
  const host = document.getElementById('rrListCols');
  if (!host) return;
  if (rrView === 'monthly') {
    host.style.gridTemplateColumns = '32px 1fr repeat(6, 30px)';
    host.innerHTML = '<span></span><span>Name</span>' +
      '<span>Oct</span><span>Nov</span><span>Dez</span><span>Jan</span><span>Feb</span><span>Mrz</span>';
  } else {
    const colCount = RR_WEEKS.length;
    host.style.gridTemplateColumns = `32px minmax(120px, 1fr) repeat(${colCount}, 26px)`;
    const weekHeaders = RR_WEEKS.map(w => `<span>W${w}</span>`).join('');
    host.innerHTML = '<span></span><span>Name</span>' + weekHeaders;
  }
}

function rrFilter() {
  const q = (document.getElementById('rrSearch')?.value || '').toLowerCase().trim();
  rrFiltered = q
    ? ROLLING_RANKINGS.map((p, i) => ({ ...p, origIdx: i })).filter(p => p.name.toLowerCase().includes(q))
    : ROLLING_RANKINGS.map((p, i) => ({ ...p, origIdx: i }));
  _rrRenderList();
}

function _rrRankColor(r) {
  if (r === null || r === undefined) return 'var(--border)';
  if (r <= 5)   return '#f5c842';
  if (r <= 15)  return '#4caf81';
  if (r <= 30)  return '#29b6f6';
  if (r <= 60)  return '#9e78ff';
  if (r <= 100) return '#ff9800';
  return '#ff6584';
}

function _rrGetValues(player) {
  // Returns { labels, values } for the active view
  if (rrView === 'weekly') {
    const ranks = player.weeklyRanks || {};
    return {
      labels: RR_WEEKS.map(w => 'W' + w),
      values: RR_WEEKS.map(w => ranks[String(w)] ?? null),
      keys:   RR_WEEKS.map(w => String(w)),
    };
  }
  const ranks = player.rankings || {};
  return {
    labels: RR_MONTHS,
    values: RR_MONTHS.map(m => ranks[m] ?? null),
    keys:   RR_MONTHS.slice(),
  };
}

function _rrRenderList() {
  const body = document.getElementById('rrListBody');
  if (!body) return;
  const cols = rrView === 'monthly' ? RR_MONTHS : RR_WEEKS.map(w => String(w));
  const colWidth = rrView === 'monthly' ? 30 : 26;
  const gridTpl = rrView === 'monthly'
    ? `32px 1fr repeat(${cols.length}, ${colWidth}px)`
    : `32px minmax(120px, 1fr) repeat(${cols.length}, ${colWidth}px)`;

  body.innerHTML = rrFiltered.map(p => {
    const cells = cols.map(k => {
      const r = rrView === 'monthly' ? (p.rankings || {})[k] : (p.weeklyRanks || {})[k];
      const c = _rrRankColor(r);
      return `<span class="rr-rank-cell" style="color:${c};background:${r ? c + '22' : 'transparent'}">${r ?? '–'}</span>`;
    }).join('');
    const isSelected = rrSelected.indexOf(p.origIdx) !== -1;
    const active = isSelected ? ' rr-active' : '';
    const selIdx = rrSelected.indexOf(p.origIdx);
    const colorDot = (rrCompareMode && isSelected)
      ? `<span style="display:inline-block;width:8px;height:8px;border-radius:50%;background:${RR_COMPARE_COLORS[selIdx]};margin-right:4px;vertical-align:middle;"></span>`
      : '';
    return `<div class="rr-row${active}" data-idx="${p.origIdx}" onclick="rrSelectPlayer(${p.origIdx})" style="grid-template-columns:${gridTpl};">
      <span class="rr-idx">${p.origIdx + 1}</span>
      <span class="rr-name" title="${p.name}">${colorDot}${p.name}</span>
      ${cells}
    </div>`;
  }).join('');
}

function rrSelectPlayer(origIdx) {
  if (rrCompareMode) {
    const i = rrSelected.indexOf(origIdx);
    if (i !== -1) {
      // Deselect
      rrSelected.splice(i, 1);
    } else if (rrSelected.length < 3) {
      rrSelected.push(origIdx);
    } else {
      // Already 3 selected — replace last
      rrSelected[2] = origIdx;
    }
  } else {
    rrSelected = [origIdx];
  }
  _rrRenderAll();
}

// ── MAIN PANEL ──────────────────────────────────────────────────────────────
function _rrRenderMain() {
  const panel = document.getElementById('rrChartPanel');
  if (!panel) return;
  if (!rrSelected.length) {
    panel.innerHTML = `
      <div style="margin:auto;text-align:center;color:var(--muted);">
        <div style="font-size:40px;margin-bottom:12px;">📈</div>
        <div style="font-size:15px;font-weight:700;color:var(--text);margin-bottom:6px;">Spieler auswählen</div>
        <div style="font-size:13px;">${rrCompareMode ? 'Wähle bis zu 3 Spieler links zum Vergleich' : 'Klicke links auf einen Spieler um seinen Ranking-Verlauf zu sehen'}</div>
      </div>`;
    return;
  }

  if (rrCompareMode && rrSelected.length > 1) {
    _rrRenderCompare(panel);
  } else {
    _rrRenderSingle(panel, ROLLING_RANKINGS[rrSelected[0]]);
  }
}

function _rrRenderSingle(panel, player) {
  const v       = _rrGetValues(player);
  const valid   = v.values.filter(x => x !== null);
  const best    = valid.length ? Math.min(...valid) : null;
  const worst   = valid.length ? Math.max(...valid) : null;
  const avg     = valid.length ? Math.round(valid.reduce((a, b) => a + b, 0) / valid.length) : null;
  const total   = v.values.length;
  const unit    = rrView === 'weekly' ? 'Wochen' : 'Monate';

  const pillsHtml = `
    <div class="rr-pills">
      <div class="rr-pill"><span class="rr-pill-val" style="color:#f5c842">${best ?? '–'}</span><span class="rr-pill-label">Bestes</span></div>
      <div class="rr-pill"><span class="rr-pill-val" style="color:#ff6584">${worst ?? '–'}</span><span class="rr-pill-label">Schlechtestes</span></div>
      <div class="rr-pill"><span class="rr-pill-val" style="color:#29b6f6">${avg ?? '–'}</span><span class="rr-pill-label">Schnitt</span></div>
      <div class="rr-pill"><span class="rr-pill-val" style="color:#4caf81">${valid.length}/${total}</span><span class="rr-pill-label">${unit}</span></div>
    </div>`;

  // Compact badges — only for monthly (weekly would be too many)
  let badgesHtml = '';
  if (rrView === 'monthly') {
    badgesHtml = '<div class="rr-badges">' + RR_MONTHS.map((m, i) => {
      const r = v.values[i];
      const c = _rrRankColor(r);
      return `<div class="rr-month-badge">
        <span class="rr-badge-label">${m}</span>
        <span class="rr-badge-rank" style="color:${c}">${r ?? '—'}</span>
      </div>`;
    }).join('') + '</div>';
  }

  panel.innerHTML = `
    <div class="rr-player-header">
      <div>
        <div class="rr-player-name">${player.name}</div>
        <div class="rr-player-sub">Dynasty Rolling Rankings · Saison 2025/26 · ${rrView === 'weekly' ? 'Wöchentlich' : 'Monatlich'}</div>
      </div>
      ${pillsHtml}
    </div>
    <div class="rr-chart-box">
      <canvas id="rrCanvas"></canvas>
    </div>
    ${badgesHtml}
    <div class="rr-share-row">
      <button class="rr-share-btn" onclick="rrOpenShareModal()">📸 Instagram Screenshot</button>
    </div>`;

  _rrDrawChart([{ player, values: v.values, color: RR_COMPARE_COLORS[0] }], v.labels);
}

function _rrRenderCompare(panel) {
  const players = rrSelected.map(i => ROLLING_RANKINGS[i]);
  const datasets = players.map((p, i) => {
    const v = _rrGetValues(p);
    return { player: p, values: v.values, color: RR_COMPARE_COLORS[i] };
  });
  const labels = _rrGetValues(players[0]).labels;

  // Mini-Stats für jeden Spieler
  const cardsHtml = datasets.map(d => {
    const valid = d.values.filter(x => x !== null);
    const best  = valid.length ? Math.min(...valid) : null;
    const avg   = valid.length ? Math.round(valid.reduce((a, b) => a + b, 0) / valid.length) : null;
    return `<div class="rr-compare-card" style="border-color:${d.color}55;">
      <div style="display:flex;align-items:center;gap:8px;margin-bottom:8px;">
        <span style="width:12px;height:12px;border-radius:50%;background:${d.color};"></span>
        <span style="font-weight:800;font-size:15px;">${d.player.name}</span>
      </div>
      <div style="display:flex;gap:14px;font-size:11px;color:var(--muted);">
        <span>Bestes: <strong style="color:${d.color};font-size:14px;">#${best ?? '–'}</strong></span>
        <span>Schnitt: <strong style="color:${d.color};font-size:14px;">#${avg ?? '–'}</strong></span>
      </div>
    </div>`;
  }).join('');

  panel.innerHTML = `
    <div class="rr-player-header">
      <div>
        <div class="rr-player-name">Vergleich</div>
        <div class="rr-player-sub">Dynasty Rolling Rankings · Saison 2025/26 · ${rrView === 'weekly' ? 'Wöchentlich' : 'Monatlich'}</div>
      </div>
    </div>
    <div class="rr-compare-cards">${cardsHtml}</div>
    <div class="rr-chart-box">
      <canvas id="rrCanvas"></canvas>
    </div>
    <div class="rr-share-row">
      <button class="rr-share-btn" onclick="rrOpenShareModal()">📸 Instagram Screenshot</button>
    </div>`;

  _rrDrawChart(datasets, labels);
}

// ── CHART (handles 1-3 lines) ───────────────────────────────────────────────
function _rrDrawChart(datasets, labels) {
  if (rrChart) { rrChart.destroy(); rrChart = null; }
  const canvas = document.getElementById('rrCanvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');

  const chartDatasets = datasets.map((d, i) => {
    const grad = ctx.createLinearGradient(0, 0, 0, 280);
    const rgba = _rrHexToRgba(d.color, 0.22);
    grad.addColorStop(0, rgba);
    grad.addColorStop(1, _rrHexToRgba(d.color, 0));
    return {
      label: d.player.name,
      data: d.values,
      borderColor: d.color,
      backgroundColor: datasets.length === 1 ? grad : 'transparent',
      pointBackgroundColor: d.values.map(r => datasets.length === 1 ? _rrRankColor(r) : d.color),
      pointBorderColor: 'var(--bg, #0f0f13)',
      pointBorderWidth: 2,
      pointRadius: rrView === 'weekly' ? 4 : 7,
      pointHoverRadius: rrView === 'weekly' ? 6 : 10,
      borderWidth: 2.5,
      fill: datasets.length === 1,
      tension: 0.35,
      spanGaps: true,
    };
  });

  rrChart = new Chart(ctx, {
    type: 'line',
    data: { labels, datasets: chartDatasets },
    options: {
      responsive: true,
      maintainAspectRatio: true,
      aspectRatio: rrView === 'weekly' ? 2.0 : 2.6,
      plugins: {
        legend: {
          display: datasets.length > 1,
          labels: { color: 'var(--text, #f0eff6)', font: { size: 12, weight: '700' } }
        },
        tooltip: {
          backgroundColor: 'var(--surface2, #222229)',
          borderColor: 'var(--border, #2e2e3a)',
          borderWidth: 1,
          titleColor: 'var(--text, #f0eff6)',
          bodyColor: '#f5c842',
          padding: 12,
          callbacks: {
            label: c => c.raw === null ? `${c.dataset.label}: kein Ranking` : `${c.dataset.label}: #${c.raw}`
          }
        }
      },
      scales: {
        y: {
          reverse: true,
          min: 1,
          grid:   { color: 'var(--border, #2e2e3a)' },
          border: { color: 'var(--border, #2e2e3a)' },
          ticks:  { color: 'var(--muted, #7a7a8e)', font: { size: 11 }, callback: v => `#${v}`, stepSize: rrView === 'weekly' ? 25 : 10 },
          title:  { display: true, text: 'Ranking', color: 'var(--muted, #7a7a8e)', font: { size: 11 } }
        },
        x: {
          grid:   { color: 'var(--border, #2e2e3a)' },
          border: { color: 'var(--border, #2e2e3a)' },
          ticks:  {
            color: 'var(--text, #f0eff6)',
            font: { size: rrView === 'weekly' ? 9 : 12, weight: '700' },
            maxRotation: rrView === 'weekly' ? 0 : 0,
            autoSkip: rrView === 'weekly',
            autoSkipPadding: 8,
          }
        }
      }
    }
  });
}

function _rrHexToRgba(hex, alpha) {
  const m = hex.match(/^#([0-9a-f]{6})$/i);
  if (!m) return `rgba(245,200,66,${alpha})`;
  const n = parseInt(m[1], 16);
  return `rgba(${(n>>16)&255},${(n>>8)&255},${n&255},${alpha})`;
}

// ============================================================
//  INSTAGRAM SCREENSHOT (4:5)
// ============================================================
let rrShareStyle = 'warm';  // 'warm' | 'dark'

function rrOpenShareModal() {
  const overlay = document.getElementById('rrShareModalOverlay');
  if (!overlay) return;
  rrShareStyle = 'warm';
  _rrRenderShareCard();
  overlay.style.display = 'flex';
}

function rrCloseShareModal() {
  const overlay = document.getElementById('rrShareModalOverlay');
  if (overlay) overlay.style.display = 'none';
}

function rrSetShareStyle(style) {
  rrShareStyle = style;
  _rrRenderShareCard();
}

function _rrRenderShareCard() {
  const host = document.getElementById('rrShareCardContent');
  if (!host) return;

  // Update style toggle buttons
  document.querySelectorAll('.rr-style-btn').forEach(btn => {
    btn.classList.toggle('rr-style-active', btn.dataset.style === rrShareStyle);
  });

  const isCompare = rrCompareMode && rrSelected.length > 1;
  const players   = rrSelected.map(i => ROLLING_RANKINGS[i]);
  const labels    = _rrGetValues(players[0]).labels;
  const datasets  = players.map((p, i) => {
    const v = _rrGetValues(p);
    return { player: p, values: v.values, color: RR_COMPARE_COLORS[i] };
  });

  const th = rrShareStyle === 'warm' ? {
    bg: '#fff5ee', surface: '#ffffff', text: '#1a1410', muted: '#8a6d5a',
    accent: '#c58f32', border: '#e8d5c2', shadow: 'rgba(197,143,50,0.08)',
  } : {
    bg: '#0f1117', surface: '#1a1d27', text: '#f0eff6', muted: '#8e8e9e',
    accent: '#f5c842', border: '#2e2e3a', shadow: 'rgba(0,0,0,0.3)',
  };

  const titleText = isCompare ? 'Rolling Rankings · Vergleich' : players[0].name;
  const subText   = isCompare ? 'Saison 2025/26' : `Dynasty Rolling Rankings · 2025/26`;

  // Stats section
  let statsHtml = '';
  if (isCompare) {
    statsHtml = datasets.map(d => {
      const valid = d.values.filter(x => x !== null);
      const best  = valid.length ? Math.min(...valid) : null;
      const avg   = valid.length ? Math.round(valid.reduce((a,b)=>a+b,0)/valid.length) : null;
      return `<div style="display:flex;align-items:center;gap:10px;padding:10px 14px;background:${th.surface};border-radius:10px;border:1px solid ${th.border};">
        <span style="width:14px;height:14px;border-radius:50%;background:${d.color};flex-shrink:0;"></span>
        <div style="flex:1;min-width:0;">
          <div style="font-size:14px;font-weight:800;color:${th.text};white-space:nowrap;overflow:hidden;text-overflow:ellipsis;">${d.player.name}</div>
          <div style="font-size:10px;color:${th.muted};margin-top:2px;">Bestes #${best ?? '–'} · Schnitt #${avg ?? '–'}</div>
        </div>
      </div>`;
    }).join('');
    statsHtml = `<div style="display:flex;flex-direction:column;gap:8px;margin-bottom:18px;">${statsHtml}</div>`;
  } else {
    const v = datasets[0].values;
    const valid = v.filter(x => x !== null);
    const best  = valid.length ? Math.min(...valid) : null;
    const worst = valid.length ? Math.max(...valid) : null;
    const avg   = valid.length ? Math.round(valid.reduce((a,b)=>a+b,0)/valid.length) : null;
    const pill = (val, label, color) => `
      <div style="flex:1;background:${th.surface};border:1px solid ${th.border};border-radius:10px;padding:12px 8px;text-align:center;">
        <div style="font-size:24px;font-weight:800;color:${color};line-height:1;">${val ?? '–'}</div>
        <div style="font-size:9px;color:${th.muted};margin-top:6px;letter-spacing:1px;text-transform:uppercase;">${label}</div>
      </div>`;
    statsHtml = `<div style="display:flex;gap:8px;margin-bottom:18px;">
      ${pill(best, 'Bestes', '#f5c842')}
      ${pill(worst, 'Schlechtestes', '#ff6584')}
      ${pill(avg, 'Schnitt', '#29b6f6')}
    </div>`;
  }

  host.innerHTML = `
    <div id="rrShareCardInner" style="width:480px;aspect-ratio:4/5;background:${th.bg};padding:32px 28px;font-family:'DM Sans',system-ui,sans-serif;color:${th.text};display:flex;flex-direction:column;border-radius:18px;box-shadow:0 8px 32px ${th.shadow};">
      <div style="font-size:10px;font-weight:800;letter-spacing:2px;text-transform:uppercase;color:${th.muted};text-align:center;margin-bottom:6px;">🌮 Taco Tuesday HQ · Rolling Rankings</div>
      <div style="font-size:${isCompare ? '28px' : '32px'};font-family:'Playfair Display',serif;font-weight:800;text-align:center;line-height:1.1;color:${th.accent};margin-bottom:4px;">${titleText}</div>
      <div style="font-size:11px;color:${th.muted};text-align:center;margin-bottom:18px;">${subText} · ${rrView === 'weekly' ? 'Wöchentlich' : 'Monatlich'}</div>
      ${statsHtml}
      <div style="flex:1;background:${th.surface};border:1px solid ${th.border};border-radius:14px;padding:14px;display:flex;align-items:center;justify-content:center;min-height:0;">
        <canvas id="rrShareCanvas" style="max-width:100%;max-height:100%;"></canvas>
      </div>
      <div style="text-align:center;font-size:10px;color:${th.muted};margin-top:14px;letter-spacing:1px;">taco-tuesday-league.com</div>
    </div>`;

  // Draw chart
  setTimeout(() => _rrDrawShareChart(datasets, labels, th), 30);
}

function _rrDrawShareChart(datasets, labels, th) {
  const canvas = document.getElementById('rrShareCanvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');

  const chartDatasets = datasets.map(d => {
    const grad = ctx.createLinearGradient(0, 0, 0, 240);
    grad.addColorStop(0, _rrHexToRgba(d.color, 0.25));
    grad.addColorStop(1, _rrHexToRgba(d.color, 0));
    return {
      label: d.player.name,
      data: d.values,
      borderColor: d.color,
      backgroundColor: datasets.length === 1 ? grad : 'transparent',
      pointBackgroundColor: d.color,
      pointBorderColor: th.bg,
      pointBorderWidth: 2,
      pointRadius: rrView === 'weekly' ? 3 : 5,
      borderWidth: 2.5,
      fill: datasets.length === 1,
      tension: 0.35,
      spanGaps: true,
    };
  });

  new Chart(ctx, {
    type: 'line',
    data: { labels, datasets: chartDatasets },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      animation: false,
      plugins: {
        legend: { display: false },
        tooltip: { enabled: false },
      },
      scales: {
        y: {
          reverse: true,
          min: 1,
          grid:   { color: th.border },
          border: { color: th.border },
          ticks:  { color: th.muted, font: { size: 10 }, callback: v => `#${v}` }
        },
        x: {
          grid:   { color: th.border },
          border: { color: th.border },
          ticks:  {
            color: th.text,
            font: { size: rrView === 'weekly' ? 8 : 11, weight: '700' },
            autoSkip: rrView === 'weekly',
            autoSkipPadding: 6,
          }
        }
      }
    }
  });
}

async function rrDownloadShareImage() {
  const card = document.getElementById('rrShareCardInner');
  if (!card) return;
  if (typeof html2canvas !== 'function') { alert('html2canvas Library nicht geladen.'); return; }
  const btn = document.getElementById('rrDownloadBtn');
  const orig = btn ? btn.textContent : '';
  if (btn) { btn.textContent = '⏳ Erstelle...'; btn.disabled = true; }
  try {
    const bg = rrShareStyle === 'warm' ? '#fff5ee' : '#0f1117';
    const canvas = await html2canvas(card, {
      backgroundColor: bg,
      scale: 2,
      logging: false,
      useCORS: true,
    });
    const link = document.createElement('a');
    link.href = canvas.toDataURL('image/png');
    const stamp = new Date().toISOString().split('T')[0];
    const isCompare = rrCompareMode && rrSelected.length > 1;
    const slug = isCompare
      ? 'vergleich'
      : (ROLLING_RANKINGS[rrSelected[0]]?.name || 'spieler').toLowerCase().replace(/[^a-z0-9]+/g,'-');
    link.download = `taco-rolling-${slug}-${stamp}.png`;
    link.click();
    if (btn) { btn.textContent = '✓ Gespeichert!'; }
    setTimeout(() => { if (btn) { btn.textContent = orig; btn.disabled = false; } }, 1500);
  } catch (err) {
    console.error('Screenshot failed:', err);
    alert('Fehler beim Erstellen: ' + err.message);
    if (btn) { btn.textContent = orig; btn.disabled = false; }
  }
}
