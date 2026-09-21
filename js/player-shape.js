// ============================================================
//  PLAYER SHAPE STUDIO
// ============================================================
//  9-Cat-Perzentil-Radar fuer jeden Spieler, der aktuell in einem
//  TTHQ-Kader steht (Quelle: ROSTERS, von js/admin.js beim Start aus
//  data/rosters-live.js hydriert -- siehe js/fantasy-owner.js fuer
//  dieselbe Konvention). Die Perzentile selbst werden HIER berechnet,
//  direkt aus den Pro-Spiel-Projektionen in data/live-projections.js
//  (Feld "z" ist vor Saisonstart noch 0, siehe Kommentar dort -- daher
//  eigene, einfache Rank-Perzentil-Berechnung statt auf "z" zu warten).
//
//  Pool = alle gerosterten Spieler mit einem Treffer in
//  LIVE_PROJECTIONS (per normalizeName()+NAME_ALIASES abgeglichen,
//  dieselbe zentrale Normalisierung wie ueberall sonst im Projekt).
//  Ein paar Tiefenkader-/Zweiweg-Spieler ohne Projection fallen dabei
//  raus -- das wird unten im Footer transparent gezaeigt statt sie
//  stillschweigend mit Perzentil 50 aufzufuellen.
// ============================================================

const PS_CATS = [
  { k: 'PTS', label: 'PTS',      raw: 'pts',  invert: false },
  { k: '3PM', label: '3PM',      raw: 'tpm',  invert: false },
  { k: 'REB', label: 'REB',      raw: 'reb',  invert: false },
  { k: 'AST', label: 'AST',      raw: 'ast',  invert: false },
  { k: 'STL', label: 'STL',      raw: 'stl',  invert: false },
  { k: 'BLK', label: 'BLK',      raw: 'blk',  invert: false },
  { k: 'TOC', label: 'TO CTRL',  raw: 'tov',  invert: true  },
  { k: 'FGP', label: 'FG%',      raw: 'fgPct',invert: false },
  { k: 'FTP', label: 'FT%',      raw: 'ftPct',invert: false },
];

let _psPool = null;
let _psState = { name: null, mode: 'solo', teamFilter: '' };

function _psNorm(name) {
  return (typeof normalizeName === 'function') ? normalizeName(name) : String(name || '').toLowerCase().trim();
}

// Rank-Perzentil ueber ein sortiertes Array (aufsteigend). Gleiche Werte
// teilen sich den mittleren Rang, statt dass Ties zufaellig auseinander-
// fallen (Standard-Vorgehen fuer Perzentile bei diskreten Datensaetzen).
function _psPercentileOf(sortedAsc, v) {
  const n = sortedAsc.length;
  if (n <= 1) return 100;
  let lo = 0, hi = n;
  while (lo < hi) { const mid = (lo + hi) >> 1; if (sortedAsc[mid] < v) lo = mid + 1; else hi = mid; }
  const firstGE = lo;
  lo = 0; hi = n;
  while (lo < hi) { const mid = (lo + hi) >> 1; if (sortedAsc[mid] <= v) lo = mid + 1; else hi = mid; }
  const firstGT = lo;
  const numLess = firstGE, numEqual = firstGT - firstGE;
  return ((numLess + 0.5 * numEqual) / n) * 100;
}

function _psBuildPool() {
  if (_psPool) return _psPool;
  _psPool = { players: [], rosteredCount: 0, matchedCount: 0 };
  if (typeof ROSTERS === 'undefined' || typeof LIVE_PROJECTIONS === 'undefined') return _psPool;

  const lpNorm = new Map();
  Object.keys(LIVE_PROJECTIONS).forEach(nm => lpNorm.set(_psNorm(nm), nm));

  const rows = [];
  Object.keys(ROSTERS).forEach(tid => {
    (ROSTERS[tid] || []).forEach(p => {
      _psPool.rosteredCount++;
      const norm = _psNorm(p.name);
      const canon = (typeof NAME_ALIASES !== 'undefined' && NAME_ALIASES[norm]) || null;
      const lpKey = lpNorm.get(norm) || (canon ? lpNorm.get(_psNorm(canon)) : null);
      if (!lpKey) return;
      const s = LIVE_PROJECTIONS[lpKey];
      if (!s) return;
      rows.push({
        name: p.name, pos: p.pos, nbaTeam: p.team, teamId: parseInt(tid, 10),
        raw: { pts: s.pts, tpm: s.tpm, reb: s.reb, ast: s.ast, stl: s.stl, blk: s.blk, tov: s.tov, fgPct: s.fgPct, ftPct: s.ftPct },
      });
    });
  });
  _psPool.matchedCount = rows.length;

  // Perzentile je Kategorie ueber den kompletten Matched-Pool
  const sortedByRaw = {};
  PS_CATS.forEach(c => {
    sortedByRaw[c.raw] = rows.map(r => r.raw[c.raw]).filter(v => typeof v === 'number' && !isNaN(v)).sort((a, b) => a - b);
  });
  rows.forEach(r => {
    r.pctl = {};
    PS_CATS.forEach(c => {
      const v = r.raw[c.raw];
      if (typeof v !== 'number' || isNaN(v)) { r.pctl[c.k] = 50; return; }
      const p = _psPercentileOf(sortedByRaw[c.raw], v);
      r.pctl[c.k] = c.invert ? (100 - p) : p;
    });
  });

  _psPool.players = rows.sort((a, b) => a.name.localeCompare(b.name));
  return _psPool;
}

function _psPlayerByName(name) {
  return _psBuildPool().players.find(p => p.name === name) || null;
}

function _psVec(p) { return PS_CATS.map(c => p.pctl[c.k]); }

function _psBestWorst(p) {
  let best = PS_CATS[0], worst = PS_CATS[0];
  PS_CATS.forEach(c => {
    if (p.pctl[c.k] > p.pctl[best.k]) best = c;
    if (p.pctl[c.k] < p.pctl[worst.k]) worst = c;
  });
  return { best, worst };
}

// Bestes Profil-Match im Pool. Ein Match auf einem ANDEREN Fantasy-Team
// wird bevorzugt (fuer Trade-Ideen relevanter als der eigene Kader) --
// nur wenn dort niemand annaehernd passt, wird auch das eigene Team
// durchsucht.
function _psBestMatch(player) {
  const pool = _psBuildPool().players;
  const v1 = _psVec(player);
  function scoreOf(p2) {
    const v2 = _psVec(p2);
    let sum = 0;
    for (let i = 0; i < v1.length; i++) sum += Math.abs(v1[i] - v2[i]);
    return 100 - (sum / v1.length);
  }
  let bestOther = null, bestOtherScore = -1;
  let bestAny = null, bestAnyScore = -1;
  pool.forEach(p2 => {
    if (p2.name === player.name) return;
    const score = scoreOf(p2);
    if (score > bestAnyScore) { bestAnyScore = score; bestAny = p2; }
    if (p2.teamId !== player.teamId && score > bestOtherScore) { bestOtherScore = score; bestOther = p2; }
  });
  return bestOther ? { player: bestOther, score: Math.round(bestOtherScore) } : { player: bestAny, score: Math.round(bestAnyScore) };
}

// ── SVG-Radar ──────────────────────────────────────────────
// ViewBox ist bewusst breiter als hoch: die Seiten-Labels ("100. PCTL",
// "TO CTRL") ragen mit anchor start/end deutlich ueber den Ring hinaus,
// und ein root-<svg> clippt per Spec alles ausserhalb seiner viewBox.
// Zu schmale Breite hat genau das abgeschnitten (siehe Fix 2026-09-21).
const PS_VIEW_W = 460, PS_VIEW_H = 400, PS_CX = PS_VIEW_W / 2, PS_CY = PS_VIEW_H / 2, PS_R = 118;

function _psPoint(i, n, value) {
  const angle = -Math.PI / 2 + i * (2 * Math.PI / n);
  const r = PS_R * (Math.max(0, Math.min(100, value)) / 100);
  return [PS_CX + r * Math.cos(angle), PS_CY + r * Math.sin(angle)];
}
function _psLabelPoint(i, n, offset) {
  const angle = -Math.PI / 2 + i * (2 * Math.PI / n);
  return [PS_CX + offset * Math.cos(angle), PS_CY + offset * Math.sin(angle)];
}
function _psPolyStr(values, n) {
  return values.map((v, i) => { const p = _psPoint(i, n, v); return p[0].toFixed(1) + ',' + p[1].toFixed(1); }).join(' ');
}
function _psRingPoly(n, frac) {
  const pts = [];
  for (let i = 0; i < n; i++) { const a = -Math.PI / 2 + i * (2 * Math.PI / n); pts.push((PS_CX + PS_R * frac * Math.cos(a)).toFixed(1) + ',' + (PS_CY + PS_R * frac * Math.sin(a)).toFixed(1)); }
  return pts.join(' ');
}

function _psRadarSVG(primaryVals, altVals) {
  const n = PS_CATS.length;
  const rings = [0.25, 0.5, 0.75, 1].map(f => `<polygon points="${_psRingPoly(n, f)}" fill="none" stroke="var(--border)" stroke-width="1"></polygon>`).join('');
  const spokes = PS_CATS.map((c, i) => { const p = _psPoint(i, n, 100); return `<line x1="${PS_CX}" y1="${PS_CY}" x2="${p[0].toFixed(1)}" y2="${p[1].toFixed(1)}" stroke="var(--border)" stroke-width="1"></line>`; }).join('');
  const labels = PS_CATS.map((c, i) => {
    const lp = _psLabelPoint(i, n, PS_R + 28);
    let anchor = 'middle';
    if (lp[0] > PS_CX + 6) anchor = 'start'; else if (lp[0] < PS_CX - 6) anchor = 'end';
    return `<text x="${lp[0].toFixed(1)}" y="${(lp[1] - 3).toFixed(1)}" text-anchor="${anchor}" class="ps-cat-label">${c.label}</text>` +
           `<text x="${lp[0].toFixed(1)}" y="${(lp[1] + 11).toFixed(1)}" text-anchor="${anchor}" class="ps-cat-pctl">${Math.round(primaryVals[i])}. PCTL</text>`;
  }).join('');

  const altPoly = altVals
    ? `<polygon points="${_psPolyStr(altVals, n)}" fill="none" stroke="var(--accent2)" stroke-width="2.5"></polygon>` +
      altVals.map((v, i) => { const p = _psPoint(i, n, v); return `<circle cx="${p[0].toFixed(1)}" cy="${p[1].toFixed(1)}" r="3.5" fill="var(--accent2)"></circle>`; }).join('')
    : '';

  const gradId = 'psGrad' + Math.random().toString(36).slice(2, 8);
  const mainPoly = `<polygon points="${_psPolyStr(primaryVals, n)}" fill="url(#${gradId})" stroke="var(--accent)" stroke-width="2.5"></polygon>` +
    primaryVals.map((v, i) => { const p = _psPoint(i, n, v); return `<circle cx="${p[0].toFixed(1)}" cy="${p[1].toFixed(1)}" r="4" fill="var(--accent)"></circle>`; }).join('');

  return `<svg class="ps-radar" viewBox="0 0 ${PS_VIEW_W} ${PS_VIEW_H}" width="100%" role="img" aria-label="Perzentil-Radar">
    <defs><radialGradient id="${gradId}" cx="50%" cy="50%" r="65%">
      <stop offset="0%" stop-color="var(--accent)" stop-opacity="0.5"></stop>
      <stop offset="100%" stop-color="var(--accent)" stop-opacity="0.1"></stop>
    </radialGradient></defs>
    ${rings}${spokes}${altPoly}${mainPoly}${labels}
  </svg>`;
}

// ── Steuerung / Rendering ──────────────────────────────────
function showPlayerShape() {
  navigate('playerShapePage');
  _psBuildPool();
  _psFillControls();
  _psRenderCard();
}

function _psFillControls() {
  const pool = _psBuildPool();
  const teamSel = document.getElementById('psTeamFilter');
  const playerSel = document.getElementById('psPlayerSelect');
  if (!teamSel || !playerSel) return;
  if (!teamSel.dataset.filled) {
    const teams = (typeof TEAMS !== 'undefined' ? TEAMS : []).slice().sort((a, b) => a.name.localeCompare(b.name));
    teamSel.innerHTML = '<option value="">Alle Teams</option>' + teams.map(t => `<option value="${t.id}">${t.name}</option>`).join('');
    teamSel.dataset.filled = '1';
    teamSel.addEventListener('change', () => { _psState.teamFilter = teamSel.value; _psFillPlayerOptions(); });
  }
  if (!playerSel.dataset.filled) {
    playerSel.dataset.filled = '1';
    playerSel.addEventListener('change', () => { _psState.name = playerSel.value; _psRenderCard(); });
  }
  _psFillPlayerOptions();

  document.getElementById('psPoolNote').textContent =
    `${pool.matchedCount} von ${pool.rosteredCount} gerosterten Spielern haben eine Live-Projection`;
}

function _psFillPlayerOptions() {
  const playerSel = document.getElementById('psPlayerSelect');
  const pool = _psBuildPool().players;
  const teamMapLocal = (typeof teamMap !== 'undefined') ? teamMap : {};
  const filtered = _psState.teamFilter ? pool.filter(p => p.teamId === parseInt(_psState.teamFilter, 10)) : pool;
  const byTeam = new Map();
  filtered.forEach(p => {
    const tName = teamMapLocal[p.teamId] ? teamMapLocal[p.teamId].name : ('Team ' + p.teamId);
    if (!byTeam.has(tName)) byTeam.set(tName, []);
    byTeam.get(tName).push(p);
  });
  const teamNames = [...byTeam.keys()].sort();
  playerSel.innerHTML = teamNames.map(tName =>
    `<optgroup label="${tName}">` +
    byTeam.get(tName).map(p => `<option value="${p.name.replace(/"/g, '&quot;')}">${p.name} (${p.nbaTeam} ${p.pos})</option>`).join('') +
    '</optgroup>'
  ).join('');
  if (!filtered.some(p => p.name === _psState.name)) {
    _psState.name = filtered.length ? filtered[0].name : null;
  }
  if (_psState.name) playerSel.value = _psState.name;
}

function psSetMode(mode) {
  _psState.mode = mode;
  document.querySelectorAll('#psModeSeg button').forEach(b => b.setAttribute('aria-pressed', String(b.dataset.mode === mode)));
  _psRenderCard();
}

function _psTeamTag(teamId) {
  const t = (typeof teamMap !== 'undefined') ? teamMap[teamId] : null;
  if (!t) return '';
  const c = (typeof getTeamColor === 'function') ? getTeamColor(t) : 'var(--border)';
  return `<span class="ps-team-tag" style="border-color:${c};color:${c}">${t.name}</span>`;
}

function _psRenderCard() {
  const card = document.getElementById('psCard');
  if (!card) return;
  const p = _psState.name ? _psPlayerByName(_psState.name) : null;
  if (!p) {
    card.innerHTML = '<p class="ps-empty">Keine Spieler mit Projection-Daten gefunden. Bitte prüfen, ob data/live-projections.js und data/rosters-live.js geladen sind.</p>';
    return;
  }
  const bw = _psBestWorst(p);

  if (_psState.mode === 'solo') {
    const radar = _psRadarSVG(_psVec(p), null);
    card.innerHTML = `
      <div class="ps-top">
        <div>
          <p class="ps-id-tag">${p.nbaTeam} &middot; ${p.pos} &middot; <b>Solo Shape</b></p>
          <h2 class="ps-name">${p.name}</h2>
        </div>
        ${_psTeamTag(p.teamId)}
      </div>
      <div class="ps-body">
        <div class="ps-radar-box">${radar}</div>
        <div class="ps-side">
          <p class="ps-hero-label">Shape Read</p>
          <p class="ps-meta">Perzentil-Profil über ${PS_CATS.length} 9-Cat-Kategorien, relativ zu allen gerosterten Spielern mit Projection.</p>
          <div class="ps-kv-list">
            <div class="ps-kv-row"><span class="ps-kv-k">Stärkste Kategorie</span><span class="ps-kv-v ps-good">${bw.best.label} · ${Math.round(p.pctl[bw.best.k])}</span></div>
            <div class="ps-kv-row"><span class="ps-kv-k">Schwächste Kategorie</span><span class="ps-kv-v ps-warn">${bw.worst.label} · ${Math.round(p.pctl[bw.worst.k])}</span></div>
          </div>
        </div>
      </div>`;
  } else {
    const match = _psBestMatch(p);
    const alt = match.player;
    const radar = _psRadarSVG(_psVec(p), alt ? _psVec(alt) : null);
    card.innerHTML = `
      <div class="ps-top">
        <div>
          <p class="ps-id-tag">${p.nbaTeam} &middot; ${p.pos} &middot; <b>Shape Match</b></p>
          <h2 class="ps-name">${p.name}</h2>
        </div>
        ${_psTeamTag(p.teamId)}
      </div>
      <div class="ps-body">
        <div class="ps-radar-box">${radar}
          <div class="ps-legend">
            <span><i style="background:var(--accent);"></i>${p.name}</span>
            ${alt ? `<span><i style="background:var(--accent2);"></i>${alt.name}</span>` : ''}
          </div>
        </div>
        <div class="ps-side">
          ${alt ? `
          <p class="ps-hero"><span class="ps-num">${match.score}%</span><span class="ps-hero-label">Shape Match</span></p>
          <div>
            <p class="ps-alt-name">${alt.name}</p>
            <p class="ps-meta">${alt.nbaTeam} &middot; ${alt.pos} ${_psTeamTag(alt.teamId)}</p>
          </div>
          <p class="ps-note">${alt.teamId === p.teamId
            ? 'Ähnlichstes Profil steht im selben Kader — für Trade-Ideen sonst nicht direkt nutzbar.'
            : 'Ähnlichstes 9-Cat-Profil im gesamten Liga-Pool, in einem anderen Kader — als Ausgangspunkt für Trade-Gespräche.'}</p>
          ` : '<p class="ps-note">Kein weiterer Spieler mit Projection im Pool gefunden.</p>'}
          <div class="ps-kv-list">
            <div class="ps-kv-row"><span class="ps-kv-k">Stärke ${p.name.split(' ')[0]}</span><span class="ps-kv-v ps-good">${bw.best.label} · ${Math.round(p.pctl[bw.best.k])}</span></div>
            <div class="ps-kv-row"><span class="ps-kv-k">Schwäche ${p.name.split(' ')[0]}</span><span class="ps-kv-v ps-warn">${bw.worst.label} · ${Math.round(p.pctl[bw.worst.k])}</span></div>
          </div>
        </div>
      </div>`;
  }
}

async function psDownloadShape() {
  const card = document.getElementById('psCard');
  if (!card) return;
  if (typeof html2canvas !== 'function') { alert('html2canvas Library nicht geladen.'); return; }
  const btn = document.getElementById('psExportBtn');
  const orig = btn ? btn.textContent : '';
  if (btn) { btn.textContent = '⏳ Erstelle...'; btn.disabled = true; }
  try {
    const isLight = document.body.classList.contains('light');
    const canvas = await html2canvas(card, {
      backgroundColor: isLight ? '#fff5ee' : '#0f1117',
      scale: 2,
      logging: false,
      useCORS: true,
      ignoreElements: (el) => el.tagName === 'BUTTON',
    });
    const link = document.createElement('a');
    link.href = canvas.toDataURL('image/png');
    const stamp = new Date().toISOString().split('T')[0];
    const slug = (_psState.name || 'player').toLowerCase().replace(/[^a-z0-9]+/g, '-');
    link.download = `taco-player-shape-${slug}-${stamp}.png`;
    link.click();
    if (btn) { btn.textContent = '✓ Gespeichert!'; }
    setTimeout(() => { if (btn) { btn.textContent = orig; btn.disabled = false; } }, 1500);
  } catch (err) {
    console.error('Player Shape Screenshot failed:', err);
    alert('Fehler beim Erstellen: ' + err.message);
    if (btn) { btn.textContent = orig; btn.disabled = false; }
  }
}
