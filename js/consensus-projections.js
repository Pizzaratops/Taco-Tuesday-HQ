// ============================================================
//  CONSENSUS PROJECTIONS 2026/27 — Seite "Player → Projections"
// ============================================================
//  Zeigt data/projections-consensus.js: den Mittelwert aus Beyaz'
//  eigenen Projections und denen von Josh Lloyd (Basketball Monster),
//  erzeugt von scripts/build-consensus-projections.js.
//
//  Die Datei ist ~700 KB und wird erst beim ERSTEN Aufruf dieser Seite
//  nachgeladen, nicht statisch in index.html eingebunden -- sonst zahlt
//  jeder TTHQ-Besuch die Ladezeit, auch wer die Seite nie oeffnet.
//
//  ── Z-SCORE ──────────────────────────────────────────────────
//  Wird komplett im Browser berechnet, nicht aus der Datei gelesen.
//  Grund: er haengt von Dingen ab, die hier eingestellt werden
//  (Pool-Groesse, Kategorie-Gewichte) -- ein vorberechneter Wert waere
//  sofort falsch, sobald etwas davon geaendert wird.
//
//  FG% und FT% gehen als IMPACT ein, nicht als roher Prozentsatz:
//      Impact = (Spieler-Prozent − Pool-Prozent) × Versuche
//  60 % aus 20 Wuerfen bewegt die Team-Quote massiv, 60 % aus 2 Wuerfen
//  fast gar nicht. Ein Z-Score ueber die nackten Prozente wuerde beide
//  gleich bewerten und dadurch Rollenspieler mit winzigem Volumen
//  systematisch ueberschaetzen. Der Pool-Prozentsatz ist dabei
//  volumengewichtet (Summe Makes / Summe Attempts), nicht der
//  Mittelwert der Einzelprozente.
//
//  POOL-GROESSE: Ein Z-Score ist immer relativ zu einer
//  Vergleichsgruppe. "Top 150" heisst: Mittelwert und Streuung werden
//  nur aus den besten 150 Spielern gebildet. Das ist naeher an einer
//  12-Team-Liga als der Durchschnitt ueber 1000 Spieler, von denen die
//  meisten nie gedraftet werden.
//  Weil die Auswahl der Top N selbst schon einen Z-Score braucht, laeuft
//  es zweistufig: erst Z ueber alle, danach die besten N nehmen und Z
//  darueber neu berechnen. So macht es auch Basketball Monster.
//
//  ── RANGDIFFERENZ ────────────────────────────────────────────
//  Fuer die Spalte "Δ Rang" werden die Rohwerte beider Quellen (Felder
//  a und b in der Datei) einzeln durch dieselbe Z-Score-Rechnung
//  geschickt und die beiden Raenge verglichen:
//      Δ = Rang bei Josh Lloyd − Rang bei Beyaz
//  Positiv heisst: Beyaz sieht den Spieler weiter vorn. Die Differenz
//  reagiert auf Gewichte und Pool-Groesse mit, weil sie aus denselben
//  Einstellungen entsteht -- ein statischer Wert waere nach der ersten
//  Aenderung nicht mehr stimmig.
// ============================================================

let _cpLoaded = false;
let _cpSort = { key: 'z', dir: -1 };
let _cpQuery = '';
let _cpPosFilter = '';
let _cpSourceFilter = '';
let _cpPool = 'all';
let _cpComputed = null;   // Ergebnis der letzten Berechnung

const CP_CATS = [
  { key: 'pts',      label: 'PTS', dec: 1 },
  { key: 'reb',      label: 'REB', dec: 1 },
  { key: 'ast',      label: 'AST', dec: 1 },
  { key: 'stl',      label: 'STL', dec: 2 },
  { key: 'blk',      label: 'BLK', dec: 2 },
  { key: 'tpm',      label: '3PM', dec: 2 },
  { key: 'tov',      label: 'TO',  dec: 2, invert: true },
  { key: 'fgImpact', label: 'FG%', dec: 1, pct: 'fgPct' },
  { key: 'ftImpact', label: 'FT%', dec: 1, pct: 'ftPct' },
];

// Schluessel, unter denen die Rohwerte im Eintrag stehen (fuer Filter)
const CP_FILTER_FIELDS = {
  pts: 'pts', reb: 'reb', ast: 'ast', stl: 'stl', blk: 'blk',
  tpm: 'tpm', tov: 'tov', fgImpact: 'fgPct', ftImpact: 'ftPct', min: 'min',
};

const CP_WEIGHT_KEY = 'tthq_cp_weights_v1';
const CP_FILTER_KEY = 'tthq_cp_filters_v1';
const CP_POOL_KEY   = 'tthq_cp_pool_v1';

function cpDefaultWeights() {
  const w = {};
  CP_CATS.forEach(c => { w[c.key] = 1; });
  return w;
}

let _cpWeights = cpDefaultWeights();
let _cpFilters = {};

function cpLoadPrefs() {
  try {
    const w = JSON.parse(localStorage.getItem(CP_WEIGHT_KEY) || 'null');
    if (w && typeof w === 'object') {
      CP_CATS.forEach(c => { if (typeof w[c.key] === 'number') _cpWeights[c.key] = w[c.key]; });
    }
    const f = JSON.parse(localStorage.getItem(CP_FILTER_KEY) || 'null');
    if (f && typeof f === 'object') _cpFilters = f;
    const p = localStorage.getItem(CP_POOL_KEY);
    if (p) _cpPool = p;
  } catch (e) { /* Privatmodus */ }
}
function cpSavePrefs() {
  try {
    localStorage.setItem(CP_WEIGHT_KEY, JSON.stringify(_cpWeights));
    localStorage.setItem(CP_FILTER_KEY, JSON.stringify(_cpFilters));
    localStorage.setItem(CP_POOL_KEY, _cpPool);
  } catch (e) { /* Privatmodus */ }
}

// ── Z-Score-Kern ─────────────────────────────────────────────

function _cpMeanSd(vals) {
  if (!vals.length) return { mean: 0, sd: 0 };
  const mean = vals.reduce((a, b) => a + b, 0) / vals.length;
  const varr = vals.reduce((a, b) => a + (b - mean) * (b - mean), 0) / vals.length;
  return { mean, sd: Math.sqrt(varr) };
}

function cpComputeZ(rows, poolIdx, weights) {
  const pool = poolIdx.map(i => rows[i]);
  if (!pool.length) return rows.map(() => ({ z: 0, cats: {} }));

  const counting = ['pts', 'reb', 'ast', 'stl', 'blk', 'tpm', 'tov'];
  const stat = {};
  counting.forEach(k => { stat[k] = _cpMeanSd(pool.map(r => r.v[k] || 0)); });

  const sum = (arr, f) => arr.reduce((a, r) => a + (f(r) || 0), 0);
  const poolFgPct = sum(pool, r => r.v.fgm) / (sum(pool, r => r.v.fga) || 1) * 100;
  const poolFtPct = sum(pool, r => r.v.ftm) / (sum(pool, r => r.v.fta) || 1) * 100;

  const fgImpactOf = v => ((v.fga > 0 ? (v.fgm / v.fga * 100) : poolFgPct) - poolFgPct) * v.fga;
  const ftImpactOf = v => ((v.fta > 0 ? (v.ftm / v.fta * 100) : poolFtPct) - poolFtPct) * v.fta;

  stat.fgImpact = _cpMeanSd(pool.map(r => fgImpactOf(r.v)));
  stat.ftImpact = _cpMeanSd(pool.map(r => ftImpactOf(r.v)));

  return rows.map(r => {
    const cats = {};
    counting.forEach(k => {
      cats[k] = stat[k].sd ? ((r.v[k] || 0) - stat[k].mean) / stat[k].sd : 0;
    });
    cats.tov = -cats.tov;   // weniger Ballverluste ist besser
    cats.fgImpact = stat.fgImpact.sd ? (fgImpactOf(r.v) - stat.fgImpact.mean) / stat.fgImpact.sd : 0;
    cats.ftImpact = stat.ftImpact.sd ? (ftImpactOf(r.v) - stat.ftImpact.mean) / stat.ftImpact.sd : 0;

    let z = 0;
    CP_CATS.forEach(c => { z += (cats[c.key] || 0) * (weights[c.key] === undefined ? 1 : weights[c.key]); });
    return { z, cats, poolFgPct, poolFtPct };
  });
}

function cpZWithPool(rows, poolSize, weights) {
  if (!rows.length) return [];
  const firstPass = cpComputeZ(rows, rows.map((_, i) => i), weights);
  if (poolSize === 'all' || rows.length <= poolSize) return firstPass;

  const order = firstPass
    .map((r, i) => ({ i, z: r.z }))
    .sort((a, b) => b.z - a.z)
    .slice(0, poolSize)
    .map(x => x.i);
  return cpComputeZ(rows, order, weights);
}

function _cpVals(c) {
  return {
    min: c.min || 0, pts: c.pts || 0, reb: c.reb || 0, ast: c.ast || 0,
    stl: c.stl || 0, blk: c.blk || 0, tpm: c.tpm || 0, tov: c.tov || 0,
    fgm: c.fgm || 0, fga: c.fga || 0, ftm: c.ftm || 0, fta: c.fta || 0,
  };
}

// Zugriff auf das zuletzt berechnete Ergebnis (Tests, andere Seiten).
function cpGetComputed() { return _cpComputed; }

function cpRecompute() {
  if (typeof PROJECTIONS_CONSENSUS === 'undefined') return null;
  const poolSize = _cpPool === 'all' ? 'all' : parseInt(_cpPool, 10);

  const names = Object.keys(PROJECTIONS_CONSENSUS);
  const rows = names.map(n => ({ name: n, v: _cpVals(PROJECTIONS_CONSENSUS[n]) }));
  const z = cpZWithPool(rows, poolSize, _cpWeights);

  // Raenge je Einzelquelle -- BEIDE ueber EXAKT dieselbe Spielergruppe,
  // naemlich die, die beide Quellen kennen.
  //
  // Das ist der entscheidende Punkt: Beyaz' Projections umfassen ~1014
  // Spieler, die von Josh Lloyd nur 532. Wuerde man je Quelle ueber die
  // eigene Gesamtliste ranken, waere Rang 230 bei Lloyd (von 532) das
  // Mittelfeld, Rang 1011 bei Beyaz (von 1014) das Schlusslicht -- die
  // Differenz "-781" saehe nach heftiger Uneinigkeit aus, obwohl sie
  // groesstenteils nur die unterschiedliche Listenlaenge abbildet.
  // Ueber die gemeinsame Schnittmenge sind die Raenge direkt
  // vergleichbar und "+5" heisst wirklich: fuenf Plaetze hoeher.
  const commonNames = names.filter(n => {
    const c = PROJECTIONS_CONSENSUS[n];
    return c.a && c.b;
  });

  const rankOf = (field) => {
    const sub = commonNames.map(n => ({ name: n, v: _cpVals(PROJECTIONS_CONSENSUS[n][field]) }));
    if (!sub.length) return new Map();
    const zz = cpZWithPool(sub, poolSize, _cpWeights);
    const order = zz.map((r, i) => ({ name: sub[i].name, z: r.z })).sort((a, b) => b.z - a.z);
    const m = new Map();
    order.forEach((o, i) => m.set(o.name, i + 1));
    return m;
  };
  const rankA = rankOf('a');   // Beyaz
  const rankB = rankOf('b');   // Josh Lloyd / BBM

  const out = names.map((n, i) => {
    const c = PROJECTIONS_CONSENSUS[n];
    const ra = rankA.has(n) ? rankA.get(n) : null;
    const rb = rankB.has(n) ? rankB.get(n) : null;
    return {
      name: n, ...c,
      z: z[i].z, cats: z[i].cats,
      rankBeyaz: ra, rankLloyd: rb,
      rankDiff: (ra !== null && rb !== null) ? (rb - ra) : null,
    };
  });

  out.sort((a, b) => b.z - a.z);
  out.forEach((r, i) => { r.overallRank = i + 1; });
  _cpComputed = out;
  return out;
}

// ── Steuerung ────────────────────────────────────────────────

function cpSetPool(v) { _cpPool = v; _cpComputed = null; cpSavePrefs(); cpRender(); }

function cpSetWeight(cat, val) {
  const n = parseFloat(val);
  _cpWeights[cat] = Number.isFinite(n) ? n : 1;
  _cpComputed = null;
  cpSavePrefs();
  cpRender();
}

function cpResetWeights() {
  _cpWeights = cpDefaultWeights();
  _cpComputed = null;
  cpSavePrefs();
  cpRenderWeightInputs();
  cpRender();
}

function cpSetFilter(cat, bound, val) {
  const n = parseFloat(val);
  if (!_cpFilters[cat]) _cpFilters[cat] = { min: null, max: null };
  _cpFilters[cat][bound] = Number.isFinite(n) ? n : null;
  if (_cpFilters[cat].min === null && _cpFilters[cat].max === null) delete _cpFilters[cat];
  cpSavePrefs();
  cpRender();
}

function cpResetFilters() {
  _cpFilters = {};
  cpSavePrefs();
  cpRenderFilterInputs();
  cpRender();
}

function cpSortBy(key) {
  if (_cpSort.key === key) _cpSort.dir *= -1;
  else _cpSort = { key, dir: key === 'name' ? 1 : -1 };
  cpRender();
}

function cpSetQuery(v) { _cpQuery = String(v || '').toLowerCase().trim(); cpRender(); }
function cpSetPos(v) { _cpPosFilter = v || ''; cpRender(); }
function cpSetSource(v) { _cpSourceFilter = v || ''; cpRender(); }

// ── Eingabefelder ────────────────────────────────────────────

function cpRenderWeightInputs() {
  const host = document.getElementById('cpWeights');
  if (!host) return;
  host.innerHTML = CP_CATS.map(c => `
    <label class="cp-w">
      <span>${c.label}</span>
      <input type="number" step="0.05" min="0" max="5"
             value="${_cpWeights[c.key]}"
             onchange="cpSetWeight('${c.key}', this.value)">
    </label>`).join('');
}

function cpRenderFilterInputs() {
  const host = document.getElementById('cpFilters');
  if (!host) return;
  const row = (key, label) => {
    const f = _cpFilters[key] || {};
    return `
    <div class="cp-f">
      <span class="cp-f-lab">${label}</span>
      <input type="number" step="any" placeholder="min" value="${f.min === null || f.min === undefined ? '' : f.min}"
             onchange="cpSetFilter('${key}','min',this.value)">
      <input type="number" step="any" placeholder="max" value="${f.max === null || f.max === undefined ? '' : f.max}"
             onchange="cpSetFilter('${key}','max',this.value)">
    </div>`;
  };
  host.innerHTML = row('min', 'MIN') + CP_CATS.map(c => row(c.key, c.label)).join('');
}

function cpTogglePanel(id) {
  const el = document.getElementById(id);
  if (el) el.classList.toggle('open');
}

// ── Tabelle ──────────────────────────────────────────────────

function cpSourceBadge(src) {
  if (src === 'both') return '<span class="cp-src cp-src-both" title="Konsens aus beiden Quellen">✓✓</span>';
  if (src === 'bbm') return '<span class="cp-src cp-src-one" title="Nur Basketball Monster (Josh Lloyd)">BBM</span>';
  if (src === 'beyaz') return '<span class="cp-src cp-src-one" title="Nur Beyaz\' eigene Projections">B</span>';
  if (src === 'bbm-baseline-implausible') return '<span class="cp-src cp-src-warn" title="Eigener Baseline-Wert war unplausibel (>1.05 Punkte pro Minute) — nur BBM genutzt">⚠ BBM</span>';
  if (src === 'beyaz-implausible') return '<span class="cp-src cp-src-warn" title="Unplausibler Wert und keine zweite Quelle zum Gegenprüfen">⚠ B</span>';
  return '';
}

function cpPassesFilters(r) {
  for (const cat in _cpFilters) {
    const f = _cpFilters[cat];
    const field = CP_FILTER_FIELDS[cat] || cat;
    const val = r[field] === undefined || r[field] === null ? 0 : r[field];
    if (f.min !== null && f.min !== undefined && val < f.min) return false;
    if (f.max !== null && f.max !== undefined && val > f.max) return false;
  }
  return true;
}

function _cpHeat(z) {
  if (!Number.isFinite(z)) return '';
  const a = Math.min(Math.abs(z) / 2.5, 1) * 0.5;
  if (a < 0.06) return '';
  return z > 0
    ? `background:rgba(76,175,129,${a.toFixed(2)});`
    : `background:rgba(255,101,132,${a.toFixed(2)});`;
}

function cpRender() {
  const host = document.getElementById('cpTableWrap');
  const info = document.getElementById('cpInfo');
  if (!host) return;

  if (typeof PROJECTIONS_CONSENSUS === 'undefined') {
    host.innerHTML = '<div class="cp-empty">Projections werden geladen…</div>';
    return;
  }

  const all = _cpComputed || cpRecompute();
  if (!all) return;

  let rows = all.slice();
  if (_cpQuery) {
    rows = rows.filter(r =>
      r.name.toLowerCase().includes(_cpQuery) ||
      (r.team || '').toLowerCase().includes(_cpQuery) ||
      (r.pos || '').toLowerCase().includes(_cpQuery));
  }
  if (_cpPosFilter) rows = rows.filter(r => (r.pos || '').split('/').includes(_cpPosFilter));
  if (_cpSourceFilter === 'both') rows = rows.filter(r => r.sources === 'both');
  else if (_cpSourceFilter === 'single') rows = rows.filter(r => r.sources === 'bbm' || r.sources === 'beyaz');
  else if (_cpSourceFilter === 'warn') rows = rows.filter(r => String(r.sources).includes('implausible'));
  rows = rows.filter(cpPassesFilters);

  const dir = _cpSort.dir;
  rows.sort((a, b) => {
    if (_cpSort.key === 'name') return a.name.localeCompare(b.name) * dir;
    if (_cpSort.key === 'rankDiff') {
      // Ohne beide Quellen gibt es keine Differenz -- solche Zeilen
      // bleiben in jeder Richtung unten statt die Spitze zu belegen.
      const av = a.rankDiff, bv = b.rankDiff;
      if ((av === null) !== (bv === null)) return av === null ? 1 : -1;
      if (av === null) return a.name.localeCompare(b.name);
      return (av - bv) * dir;
    }
    const av = a[_cpSort.key] === undefined || a[_cpSort.key] === null ? 0 : a[_cpSort.key];
    const bv = b[_cpSort.key] === undefined || b[_cpSort.key] === null ? 0 : b[_cpSort.key];
    if (av !== bv) return (av - bv) * dir;
    return a.name.localeCompare(b.name);
  });

  if (info) {
    const poolTxt = _cpPool === 'all' ? 'allen Spielern' : `den Top ${_cpPool}`;
    const wChanged = CP_CATS.filter(c => _cpWeights[c.key] !== 1).length;
    const fCount = Object.keys(_cpFilters).length;
    info.textContent = `${rows.length} von ${all.length} Spielern · Z-Score relativ zu ${poolTxt}`
      + (wChanged ? ` · ${wChanged} Gewicht(e) angepasst` : '')
      + (fCount ? ` · ${fCount} Filter aktiv` : '');
  }

  const arrow = k => _cpSort.key === k ? (_cpSort.dir === 1 ? ' ▲' : ' ▼') : '';
  const th = (k, label, cls, title) =>
    `<th class="cp-th${_cpSort.key === k ? ' sorted' : ''}${cls || ''}"${title ? ` title="${title}"` : ''} onclick="cpSortBy('${k}')">${label}${arrow(k)}</th>`;

  let html = '<table class="cp-table"><thead><tr>' +
    '<th class="cp-rank">#</th>' +
    th('name', 'Spieler', ' cp-name') +
    '<th>Team</th><th>Pos</th><th title="Fantasy Team in der Taco Tuesday League">Fant.</th>' +
    th('z', 'Z', ' cp-zcol', 'Gewichteter 9-Cat-Z-Score, relativ zur gewählten Pool-Größe') +
    th('min', 'MIN') +
    CP_CATS.map(c => th(c.pct ? c.pct : c.key, c.label)).join('') +
    '<th title="Feldwürfe: getroffen / versucht">FGM-FGA</th>' +
    '<th title="Freiwürfe: getroffen / versucht">FTM-FTA</th>' +
    th('rankDiff', 'Δ Rang', ' cp-diff', 'Rang bei Josh Lloyd minus Rang bei Beyaz. Positiv = Beyaz sieht ihn weiter vorn.') +
    '<th>Quelle</th>' +
    '</tr></thead><tbody>';

  rows.forEach(r => {
    const dz = r.rankDiff;
    const diffCls = dz === null ? '' : (dz > 0 ? ' cp-up' : (dz < 0 ? ' cp-down' : ''));
    const diffTxt = dz === null ? '—' : (dz > 0 ? '+' + dz : String(dz));
    const diffTitle = (r.rankBeyaz !== null && r.rankLloyd !== null)
      ? `Beyaz: #${r.rankBeyaz} · Josh Lloyd: #${r.rankLloyd}` : 'Nur eine Quelle';

    html += `<tr>
      <td class="cp-rank">${r.overallRank}</td>
      <td class="cp-name">${r.name.replace(/</g, '&lt;')}</td>
      <td class="cp-team">${r.team || '—'}</td>
      <td class="cp-team">${r.pos || '—'}</td>
      <td>${typeof ttOwnerTag === 'function' ? ttOwnerTag(r.name) : ''}</td>
      <td class="cp-num cp-zcol">${r.z.toFixed(2)}</td>
      <td class="cp-num">${(r.min || 0).toFixed(1)}</td>
      ${CP_CATS.map(c => {
        const shown = c.pct ? (r[c.pct] || 0) : (r[c.key] || 0);
        const zc = r.cats ? (r.cats[c.key] || 0) : 0;
        return `<td class="cp-num" style="${_cpHeat(zc)}" title="Z ${zc.toFixed(2)}">${shown.toFixed(c.dec)}</td>`;
      }).join('')}
      <td class="cp-num cp-att">${(r.fgm || 0).toFixed(1)}-${(r.fga || 0).toFixed(1)}</td>
      <td class="cp-num cp-att">${(r.ftm || 0).toFixed(1)}-${(r.fta || 0).toFixed(1)}</td>
      <td class="cp-num cp-diff${diffCls}" title="${diffTitle}">${diffTxt}</td>
      <td class="cp-srccell">${cpSourceBadge(r.sources)}</td>
    </tr>`;
  });

  html += '</tbody></table>';
  host.innerHTML = html;
}

// ── Init ─────────────────────────────────────────────────────

function showPlayerProjections() {
  navigate('playerProjectionsPage');

  const finish = () => {
    _cpLoaded = true;
    if (typeof ttOwnerInvalidate === 'function') ttOwnerInvalidate();
    const poolSel = document.getElementById('cpPool');
    if (poolSel) poolSel.value = _cpPool;
    cpRenderWeightInputs();
    cpRenderFilterInputs();
    _cpComputed = null;
    cpRender();
  };

  if (_cpLoaded || typeof PROJECTIONS_CONSENSUS !== 'undefined') { finish(); return; }

  cpLoadPrefs();
  const host = document.getElementById('cpTableWrap');
  if (host) host.innerHTML = '<div class="cp-empty">Lade Consensus-Projections…</div>';

  const load = (typeof _loadScriptOnce === 'function')
    ? _loadScriptOnce('data/projections-consensus.js?v=2')
    : new Promise(res => {
        const sc = document.createElement('script');
        sc.src = 'data/projections-consensus.js?v=2';
        sc.onload = res; sc.onerror = res;
        document.body.appendChild(sc);
      });

  load.then(finish);
}
