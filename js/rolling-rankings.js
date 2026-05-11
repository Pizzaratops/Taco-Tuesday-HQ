// ============================================================
//  ROLLING RANKINGS — Saison 2025/26
// ============================================================
const RR_MONTHS = ['Oct','Nov','Dez','Jan','Feb','März'];
let rrFiltered  = [];
let rrActiveIdx = null;
let rrChart     = null;

function showRollingRankings(highlightName) {
  navigate('rollingRankingsPage');
  _rrInit();
  if (highlightName) {
    const idx = ROLLING_RANKINGS.findIndex(p =>
      p.name === highlightName || normalizeName(p.name) === normalizeName(highlightName)
    );
    if (idx !== -1) {
      rrSelectPlayer(idx);
      // Scroll the row into view
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
  _rrRenderList();
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

function _rrRenderList() {
  const body = document.getElementById('rrListBody');
  if (!body) return;
  body.innerHTML = rrFiltered.map(p => {
    const cells = RR_MONTHS.map(m => {
      const r = p.rankings[m];
      const c = _rrRankColor(r);
      return `<span class="rr-rank-cell" style="color:${c};background:${r ? c + '22' : 'transparent'}">${r ?? '–'}</span>`;
    }).join('');
    const active = p.origIdx === rrActiveIdx ? ' rr-active' : '';
    return `<div class="rr-row${active}" data-idx="${p.origIdx}" onclick="rrSelectPlayer(${p.origIdx})">
      <span class="rr-idx">${p.origIdx + 1}</span>
      <span class="rr-name" title="${p.name}">${p.name}</span>
      ${cells}
    </div>`;
  }).join('');
}

function rrSelectPlayer(origIdx) {
  rrActiveIdx = origIdx;
  _rrRenderList();
  _rrRenderChart(ROLLING_RANKINGS[origIdx]);
}

function _rrRenderChart(player) {
  const panel = document.getElementById('rrChartPanel');
  if (!panel) return;

  const data      = RR_MONTHS.map(m => player.rankings[m] ?? null);
  const valid     = data.filter(v => v !== null);
  const best      = valid.length ? Math.min(...valid) : null;
  const worst     = valid.length ? Math.max(...valid) : null;
  const avg       = valid.length ? Math.round(valid.reduce((a, b) => a + b, 0) / valid.length) : null;

  const pillsHtml = `
    <div class="rr-pills">
      <div class="rr-pill"><span class="rr-pill-val" style="color:#f5c842">${best ?? '–'}</span><span class="rr-pill-label">Bestes</span></div>
      <div class="rr-pill"><span class="rr-pill-val" style="color:#ff6584">${worst ?? '–'}</span><span class="rr-pill-label">Schlechtestes</span></div>
      <div class="rr-pill"><span class="rr-pill-val" style="color:#29b6f6">${avg ?? '–'}</span><span class="rr-pill-label">Schnitt</span></div>
      <div class="rr-pill"><span class="rr-pill-val" style="color:#4caf81">${valid.length}/6</span><span class="rr-pill-label">Monate</span></div>
    </div>`;

  const badgesHtml = RR_MONTHS.map((m, i) => {
    const r = data[i];
    const c = _rrRankColor(r);
    return `<div class="rr-month-badge">
      <span class="rr-badge-label">${m}</span>
      <span class="rr-badge-rank" style="color:${c}">${r ?? '—'}</span>
    </div>`;
  }).join('');

  panel.innerHTML = `
    <div class="rr-player-header">
      <div>
        <div class="rr-player-name">${player.name}</div>
        <div class="rr-player-sub">Dynasty Rolling Rankings · Saison 2025/26</div>
      </div>
      ${pillsHtml}
    </div>
    <div class="rr-chart-box">
      <canvas id="rrCanvas"></canvas>
    </div>
    <div class="rr-badges">${badgesHtml}</div>`;

  if (rrChart) { rrChart.destroy(); rrChart = null; }
  const ctx  = document.getElementById('rrCanvas').getContext('2d');
  const grad = ctx.createLinearGradient(0, 0, 0, 280);
  grad.addColorStop(0, 'rgba(245,200,66,0.22)');
  grad.addColorStop(1, 'rgba(245,200,66,0.00)');

  rrChart = new Chart(ctx, {
    type: 'line',
    data: {
      labels: RR_MONTHS,
      datasets: [{
        data,
        borderColor: '#f5c842',
        backgroundColor: grad,
        pointBackgroundColor: data.map(r => _rrRankColor(r)),
        pointBorderColor: 'var(--bg, #0f0f13)',
        pointBorderWidth: 2,
        pointRadius: 7,
        pointHoverRadius: 10,
        borderWidth: 2.5,
        fill: true,
        tension: 0.35,
        spanGaps: true,
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: true,
      aspectRatio: 2.6,
      plugins: {
        legend: { display: false },
        tooltip: {
          backgroundColor: 'var(--surface2, #222229)',
          borderColor: 'var(--border, #2e2e3a)',
          borderWidth: 1,
          titleColor: 'var(--text, #f0eff6)',
          bodyColor: '#f5c842',
          padding: 12,
          callbacks: { label: c => c.raw === null ? 'Kein Ranking' : `Rang #${c.raw}` }
        }
      },
      scales: {
        y: {
          reverse: true,
          min: 1,
          grid:   { color: 'var(--border, #2e2e3a)' },
          border: { color: 'var(--border, #2e2e3a)' },
          ticks:  { color: 'var(--muted, #7a7a8e)', font: { size: 11 }, callback: v => `#${v}`, stepSize: 10 },
          title:  { display: true, text: 'Ranking', color: 'var(--muted, #7a7a8e)', font: { size: 11 } }
        },
        x: {
          grid:   { color: 'var(--border, #2e2e3a)' },
          border: { color: 'var(--border, #2e2e3a)' },
          ticks:  { color: 'var(--text, #f0eff6)', font: { size: 12, weight: '700' } }
        }
      }
    }
  });
}
