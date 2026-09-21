// ============================================================
//  CAT WEB (vormals "Player Shape Studio")
// ============================================================
//  9-Cat-Perzentil-Radar fuer jeden Spieler, der aktuell in einem
//  TTHQ-Kader steht (Quelle: ROSTERS, von js/admin.js beim Start aus
//  data/rosters-live.js hydriert -- siehe js/fantasy-owner.js fuer
//  dieselbe Konvention). Die Perzentile selbst werden HIER berechnet,
//  nicht aus vorgerechneten Z-Scores uebernommen (LIVE_PROJECTIONS.z
//  ist vor Saisonstart noch 0, siehe Kommentar dort).
//
//  SAISON-AUSWAHL: PS_SEASONS listet, welche Saisons zur Auswahl
//  stehen. Pro Saison braucht es eine echte Pro-Spiel-Statzeile je
//  Spieler (pts/reb/ast/stl/blk/3pm/to/fg%/ft%) -- ein blosser
//  End-Rang (wie in data/season-rankings.js fuer 2023/24 & 2024/25)
//  reicht NICHT fuer einen Kategorie-Radar. Aktuell verfuegbar:
//    - "current"  data/live-projections.js   (LIVE_PROJECTIONS, dict)
//    - "2025-26"  data/last-season-stats-2025-26.js (Array, BBM-Export)
//  Sobald echte Stats fuer 2024/25 / 2023/24 vorliegen (Beyaz liefert
//  sie nach): PS_SEASONS um einen Eintrag erweitern + in
//  _psSeasonRawIndex() einen weiteren "else if" analog zu "2025-26"
//  ergaenzen. Der Rest (Pool, Perzentile, Radar, Compare) braucht
//  KEINE Aenderung, er haengt nur an dieser einen Funktion.
//
//  Pool je Saison = alle gerosterten Spieler (heutiger Kaderstand)
//  mit einem Treffer in der jeweiligen Saison-Statdatei (per
//  normalizeName()+NAME_ALIASES abgeglichen, dieselbe zentrale
//  Normalisierung wie ueberall sonst im Projekt). Spieler ohne
//  Treffer (Rookies ohne Vorjahresstats o.ae.) fallen fuer DIESE
//  Saison raus -- wird im Footer transparent ausgewiesen statt sie
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

const PS_SEASONS = [
  { key: 'current', label: '2026/27 (Projection)' },
  { key: '2025-26', label: '2025/26 (Saison-Ist-Werte)' },
  // { key: '2024-25', label: '2024/25 (Saison-Ist-Werte)' },  // TODO sobald Stats vorliegen
  // { key: '2023-24', label: '2023/24 (Saison-Ist-Werte)' },  // TODO sobald Stats vorliegen
];

let _psSeasonIdxCache = {};
let _psPoolCache = {};
let _psState = { name: null, mode: 'solo', teamFilter: '', season: 'current', compareA: null, compareB: null };

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

// Liefert Map(normalizedName -> {pts,tpm,reb,ast,stl,blk,tov,fgPct,ftPct})
// fuer die gewaehlte Saison. Jede Saison hat ihre eigene Rohdaten-Form
// (Dict vs. Array, Feldname "to" vs. "tov") -- wird hier vereinheitlicht,
// damit der Rest des Moduls nur noch eine einzige Form kennen muss.
function _psSeasonRawIndex(seasonKey) {
  if (_psSeasonIdxCache[seasonKey]) return _psSeasonIdxCache[seasonKey];
  const map = new Map();

  if (seasonKey === 'current') {
    if (typeof LIVE_PROJECTIONS !== 'undefined') {
      Object.keys(LIVE_PROJECTIONS).forEach(nm => {
        const s = LIVE_PROJECTIONS[nm];
        map.set(_psNorm(nm), { pts: s.pts, tpm: s.tpm, reb: s.reb, ast: s.ast, stl: s.stl, blk: s.blk, tov: s.tov, fgPct: s.fgPct, ftPct: s.ftPct });
      });
    }
  } else if (seasonKey === '2025-26') {
    if (typeof LAST_SEASON_STATS_2025_26 !== 'undefined') {
      LAST_SEASON_STATS_2025_26.forEach(s => {
        map.set(_psNorm(s.name), { pts: s.pts, tpm: s.tpm, reb: s.reb, ast: s.ast, stl: s.stl, blk: s.blk, tov: s.to, fgPct: s.fgPct, ftPct: s.ftPct });
      });
    }
  }
  // Weitere Saisons: hier einen weiteren "else if" ergaenzen, sobald
  // echte Stats vorliegen (siehe Kommentar am Dateikopf).

  _psSeasonIdxCache[seasonKey] = map;
  return map;
}

function _psBuildPool(seasonKey) {
  seasonKey = seasonKey || _psState.season || 'current';
  if (_psPoolCache[seasonKey]) return _psPoolCache[seasonKey];

  const pool = { players: [], rosteredCount: 0, matchedCount: 0 };
  _psPoolCache[seasonKey] = pool;
  if (typeof ROSTERS === 'undefined') return pool;

  const seasonIdx = _psSeasonRawIndex(seasonKey);
  const rows = [];
  Object.keys(ROSTERS).forEach(tid => {
    (ROSTERS[tid] || []).forEach(p => {
      pool.rosteredCount++;
      const norm = _psNorm(p.name);
      const canon = (typeof NAME_ALIASES !== 'undefined' && NAME_ALIASES[norm]) || null;
      const s = seasonIdx.get(norm) || (canon ? seasonIdx.get(_psNorm(canon)) : null);
      if (!s) return;
      rows.push({
        name: p.name, pos: p.pos, nbaTeam: p.team, teamId: parseInt(tid, 10),
        raw: { pts: s.pts, tpm: s.tpm, reb: s.reb, ast: s.ast, stl: s.stl, blk: s.blk, tov: s.tov, fgPct: s.fgPct, ftPct: s.ftPct },
      });
    });
  });
  pool.matchedCount = rows.length;

  // Perzentile je Kategorie ueber den kompletten Matched-Pool DIESER Saison
  const sortedByRaw = {};
  PS_CATS.forEach(c => {
    sortedByRaw[c.raw] = rows.map(r => r.raw[c.raw]).filter(v => typeof v === 'number' && !isNaN(v)).sort((a, b) => a - b);
  });
  rows.forEach(r => {
    r.pctl = {};
    PS_CATS.forEach(c => {
      const v = r.raw[c.raw];
      if (typeof v !== 'number' || isNaN(v)) { r.pctl[c.k] = 50; return; }
      const pctl = _psPercentileOf(sortedByRaw[c.raw], v);
      r.pctl[c.k] = c.invert ? (100 - pctl) : pctl;
    });
  });

  pool.players = rows.sort((a, b) => a.name.localeCompare(b.name));
  return pool;
}

function _psPlayerByName(name, seasonKey) {
  if (!name) return null;
  return _psBuildPool(seasonKey).players.find(p => p.name === name) || null;
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
function _psBestMatch(player, seasonKey) {
  const pool = _psBuildPool(seasonKey).players;
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

// seriesList: [{ vals: number[], color: '<css color/var>', fill: bool }, ...]
// Erste Serie mit fill:true bekommt den Gradient-Fuellton, alle weiteren
// werden als reine Konturlinie gezeichnet (sonst verdeckt eine gefuellte
// Flaeche die andere(n) im Vergleichs-Modus komplett).
function _psRadarSVG(seriesList) {
  const n = PS_CATS.length;
  const rings = [0.25, 0.5, 0.75, 1].map(f => `<polygon points="${_psRingPoly(n, f)}" fill="none" stroke="var(--border)" stroke-width="1"></polygon>`).join('');
  const spokes = PS_CATS.map((c, i) => { const p = _psPoint(i, n, 100); return `<line x1="${PS_CX}" y1="${PS_CY}" x2="${p[0].toFixed(1)}" y2="${p[1].toFixed(1)}" stroke="var(--border)" stroke-width="1"></line>`; }).join('');

  const primaryVals = seriesList[0].vals;
  const labels = PS_CATS.map((c, i) => {
    const lp = _psLabelPoint(i, n, PS_R + 28);
    let anchor = 'middle';
    if (lp[0] > PS_CX + 6) anchor = 'start'; else if (lp[0] < PS_CX - 6) anchor = 'end';
    return `<text x="${lp[0].toFixed(1)}" y="${(lp[1] - 3).toFixed(1)}" text-anchor="${anchor}" class="ps-cat-label">${c.label}</text>` +
           `<text x="${lp[0].toFixed(1)}" y="${(lp[1] + 11).toFixed(1)}" text-anchor="${anchor}" class="ps-cat-pctl">${Math.round(primaryVals[i])}. PCTL</text>`;
  }).join('');

  const gradId = 'psGrad' + Math.random().toString(36).slice(2, 8);
  let defs = '';
  const polys = seriesList.map((s, idx) => {
    const dots = s.vals.map((v, i) => { const p = _psPoint(i, n, v); return `<circle cx="${p[0].toFixed(1)}" cy="${p[1].toFixed(1)}" r="${idx === 0 ? 4 : 3.5}" fill="${s.color}"></circle>`; }).join('');
    if (idx === 0 && s.fill !== false) {
      defs = `<defs><radialGradient id="${gradId}" cx="50%" cy="50%" r="65%">
        <stop offset="0%" stop-color="${s.color}" stop-opacity="0.5"></stop>
        <stop offset="100%" stop-color="${s.color}" stop-opacity="0.1"></stop>
      </radialGradient></defs>`;
      return `<polygon points="${_psPolyStr(s.vals, n)}" fill="url(#${gradId})" stroke="${s.color}" stroke-width="2.5"></polygon>${dots}`;
    }
    return `<polygon points="${_psPolyStr(s.vals, n)}" fill="none" stroke="${s.color}" stroke-width="2.5"></polygon>${dots}`;
  }).join('');

  return `<svg class="ps-radar" viewBox="0 0 ${PS_VIEW_W} ${PS_VIEW_H}" width="100%" role="img" aria-label="Perzentil-Radar">
    ${defs}
    ${rings}${spokes}${polys}${labels}
  </svg>`;
}

// ── Steuerung / Rendering ──────────────────────────────────
function showPlayerShape() {
  navigate('playerShapePage');
  _psFillSeasonSelect();
  _psBuildPool(_psState.season);
  _psFillControls();
  _psRenderCard();
}

function _psFillSeasonSelect() {
  const sel = document.getElementById('psSeasonSelect');
  if (!sel || sel.dataset.filled) return;
  sel.innerHTML = PS_SEASONS.map(s => `<option value="${s.key}">${s.label}</option>`).join('');
  sel.value = _psState.season;
  sel.dataset.filled = '1';
  sel.addEventListener('change', () => {
    _psState.season = sel.value;
    // Aktueller Spieler / Vergleichsspieler koennten in dieser Saison
    // keine Stats haben -- Auswahl unten wird beim Neubefuellen validiert.
    _psFillControls();
    _psRenderCard();
  });
}

function _psFillControls() {
  const pool = _psBuildPool(_psState.season);
  const teamSel = document.getElementById('psTeamFilter');
  const playerSel = document.getElementById('psPlayerSelect');
  if (!teamSel || !playerSel) return;
  if (!teamSel.dataset.filled) {
    const teams = (typeof TEAMS !== 'undefined' ? TEAMS : []).slice().sort((a, b) => a.name.localeCompare(b.name));
    teamSel.innerHTML = '<option value="">Alle Teams</option>' + teams.map(t => `<option value="${t.id}">${t.name}</option>`).join('');
    teamSel.dataset.filled = '1';
    teamSel.addEventListener('change', () => { _psState.teamFilter = teamSel.value; _psFillPlayerOptions(); _psRenderCard(); });
  }
  if (!playerSel.dataset.filled) {
    playerSel.dataset.filled = '1';
    playerSel.addEventListener('change', () => { _psState.name = playerSel.value; _psRenderCard(); });
  }
  _psFillPlayerOptions();

  const seasonLabel = (PS_SEASONS.find(s => s.key === _psState.season) || {}).label || _psState.season;
  document.getElementById('psPoolNote').textContent =
    `${pool.matchedCount} von ${pool.rosteredCount} gerosterten Spielern haben Stats für ${seasonLabel}`;
}

// Baut die optgroup-Liste (nach Fantasy-Team gruppiert) fuer ein
// beliebiges <select> -- genutzt vom Haupt-Spieler-Select UND von den
// zwei Vergleichs-Selects im Compare-Modus.
function _psOptionsHTML(players, teamFilterId) {
  const teamMapLocal = (typeof teamMap !== 'undefined') ? teamMap : {};
  const filtered = teamFilterId ? players.filter(p => p.teamId === parseInt(teamFilterId, 10)) : players;
  const byTeam = new Map();
  filtered.forEach(p => {
    const tName = teamMapLocal[p.teamId] ? teamMapLocal[p.teamId].name : ('Team ' + p.teamId);
    if (!byTeam.has(tName)) byTeam.set(tName, []);
    byTeam.get(tName).push(p);
  });
  const teamNames = [...byTeam.keys()].sort();
  return teamNames.map(tName =>
    `<optgroup label="${tName}">` +
    byTeam.get(tName).map(p => `<option value="${p.name.replace(/"/g, '&quot;')}">${p.name} (${p.nbaTeam} ${p.pos})</option>`).join('') +
    '</optgroup>'
  ).join('');
}

function _psFillPlayerOptions() {
  const playerSel = document.getElementById('psPlayerSelect');
  const pool = _psBuildPool(_psState.season).players;
  const filtered = _psState.teamFilter ? pool.filter(p => p.teamId === parseInt(_psState.teamFilter, 10)) : pool;
  playerSel.innerHTML = _psOptionsHTML(pool, _psState.teamFilter);
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

// Wird von den zwei dynamisch in der Card gerenderten Compare-Selects
// aufgerufen (inline onchange, siehe _psRenderCard).
function psSetCompare(slot, value) {
  if (slot === 'A') _psState.compareA = value || null;
  else _psState.compareB = value || null;
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
  const season = _psState.season;
  const p = _psState.name ? _psPlayerByName(_psState.name, season) : null;
  if (!p) {
    card.innerHTML = '<p class="ps-empty">Keine Spieler mit Stats für diese Saison gefunden. Bitte prüfen, ob die passende Datenquelle geladen ist.</p>';
    return;
  }
  const bw = _psBestWorst(p);

  if (_psState.mode === 'solo') {
    const radar = _psRadarSVG([{ vals: _psVec(p), color: 'var(--accent)', fill: true }]);
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
          <p class="ps-meta">Perzentil-Profil über ${PS_CATS.length} 9-Cat-Kategorien, relativ zu allen gerosterten Spielern mit Stats für diese Saison.</p>
          <div class="ps-kv-list">
            <div class="ps-kv-row"><span class="ps-kv-k">Stärkste Kategorie</span><span class="ps-kv-v ps-good">${bw.best.label} · ${Math.round(p.pctl[bw.best.k])}</span></div>
            <div class="ps-kv-row"><span class="ps-kv-k">Schwächste Kategorie</span><span class="ps-kv-v ps-warn">${bw.worst.label} · ${Math.round(p.pctl[bw.worst.k])}</span></div>
          </div>
        </div>
      </div>`;

  } else if (_psState.mode === 'match') {
    const match = _psBestMatch(p, season);
    const alt = match.player;
    const radar = _psRadarSVG([
      { vals: _psVec(p), color: 'var(--accent)', fill: true },
      ...(alt ? [{ vals: _psVec(alt), color: 'var(--accent2)' }] : []),
    ]);
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
          ` : '<p class="ps-note">Kein weiterer Spieler mit Stats für diese Saison im Pool gefunden.</p>'}
          <div class="ps-kv-list">
            <div class="ps-kv-row"><span class="ps-kv-k">Stärke ${p.name.split(' ')[0]}</span><span class="ps-kv-v ps-good">${bw.best.label} · ${Math.round(p.pctl[bw.best.k])}</span></div>
            <div class="ps-kv-row"><span class="ps-kv-k">Schwäche ${p.name.split(' ')[0]}</span><span class="ps-kv-v ps-warn">${bw.worst.label} · ${Math.round(p.pctl[bw.worst.k])}</span></div>
          </div>
        </div>
      </div>`;

  } else {
    // Vergleichs-Modus: Hauptspieler + bis zu 2 manuell gewaehlte Spieler.
    const pool = _psBuildPool(season).players;
    if (!_psState.compareA && !_psState.compareB) {
      const others = pool.filter(x => x.name !== p.name);
      _psState.compareA = others[0] ? others[0].name : null;
      _psState.compareB = others[1] ? others[1].name : null;
    }
    const pA = _psState.compareA ? _psPlayerByName(_psState.compareA, season) : null;
    const pB = _psState.compareB ? _psPlayerByName(_psState.compareB, season) : null;

    const series = [{ vals: _psVec(p), color: 'var(--accent)', fill: true }];
    if (pA) series.push({ vals: _psVec(pA), color: 'var(--accent2)' });
    if (pB) series.push({ vals: _psVec(pB), color: 'var(--accent3)' });
    const radar = _psRadarSVG(series);

    const optsFor = (excludeName) => _psOptionsHTML(pool.filter(x => x.name !== excludeName && x.name !== p.name));

    card.innerHTML = `
      <div class="ps-top">
        <div>
          <p class="ps-id-tag">${p.nbaTeam} &middot; ${p.pos} &middot; <b>Vergleich</b></p>
          <h2 class="ps-name">${p.name}</h2>
        </div>
        ${_psTeamTag(p.teamId)}
      </div>

      <div class="ps-compare-picks">
        <div class="ps-compare-row">
          <span class="ps-compare-swatch" style="background:var(--accent2);"></span>
          <select onchange="psSetCompare('A', this.value)" aria-label="Vergleichsspieler 1">
            <option value="">— Vergleichsspieler wählen —</option>
            ${optsFor(_psState.compareB)}
          </select>
        </div>
        <div class="ps-compare-row">
          <span class="ps-compare-swatch" style="background:var(--accent3);"></span>
          <select onchange="psSetCompare('B', this.value)" aria-label="Vergleichsspieler 2">
            <option value="">— Vergleichsspieler wählen —</option>
            ${optsFor(_psState.compareA)}
          </select>
        </div>
      </div>

      <div class="ps-body">
        <div class="ps-radar-box">${radar}
          <div class="ps-legend">
            <span><i style="background:var(--accent);"></i>${p.name}</span>
            ${pA ? `<span><i style="background:var(--accent2);"></i>${pA.name}</span>` : ''}
            ${pB ? `<span><i style="background:var(--accent3);"></i>${pB.name}</span>` : ''}
          </div>
        </div>
        <div class="ps-side">
          <p class="ps-hero-label">Direktvergleich</p>
          <p class="ps-meta">Perzentile aller ausgewählten Spieler relativ zum selben Saison-Pool — direkt vergleichbar, unabhängig vom Fantasy-Team.</p>
          <div class="ps-kv-list">
            <div class="ps-kv-row"><span class="ps-kv-k">${p.name}: Stärke</span><span class="ps-kv-v ps-good">${bw.best.label} · ${Math.round(p.pctl[bw.best.k])}</span></div>
            ${pA ? `<div class="ps-kv-row"><span class="ps-kv-k">${pA.name}: Stärke</span><span class="ps-kv-v ps-good">${_psBestWorst(pA).best.label} · ${Math.round(pA.pctl[_psBestWorst(pA).best.k])}</span></div>` : ''}
            ${pB ? `<div class="ps-kv-row"><span class="ps-kv-k">${pB.name}: Stärke</span><span class="ps-kv-v ps-good">${_psBestWorst(pB).best.label} · ${Math.round(pB.pctl[_psBestWorst(pB).best.k])}</span></div>` : ''}
          </div>
        </div>
      </div>`;

    // Selects auf den aktuell gespeicherten Zustand setzen (innerHTML-Neubau
    // verliert sonst die Auswahl beim Re-Render durch andere Aktionen).
    const selects = card.querySelectorAll('.ps-compare-row select');
    if (selects[0]) selects[0].value = _psState.compareA || '';
    if (selects[1]) selects[1].value = _psState.compareB || '';
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
    link.download = `taco-catweb-${slug}-${stamp}.png`;
    link.click();
    if (btn) { btn.textContent = '✓ Gespeichert!'; }
    setTimeout(() => { if (btn) { btn.textContent = orig; btn.disabled = false; } }, 1500);
  } catch (err) {
    console.error('Cat Web Screenshot failed:', err);
    alert('Fehler beim Erstellen: ' + err.message);
    if (btn) { btn.textContent = orig; btn.disabled = false; }
  }
}
