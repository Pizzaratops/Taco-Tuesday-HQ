// ============================================================
//  CONSENSUS PROJECTIONS 2026/27 — Seite "Player → Projections"
// ============================================================
//  Zeigt data/projections-consensus.js: den Mittelwert aus Beyaz'
//  eigenen Projections und denen von Josh Lloyd (Basketball Monster).
//
//  Erzeugt von scripts/build-consensus-projections.js. Die Datei ist
//  ~360 KB und wird deshalb erst beim ERSTEN Aufruf dieser Seite
//  nachgeladen, nicht statisch in index.html eingebunden -- gleiche
//  Begruendung wie bei den nativen Projections (siehe
//  js/player-rankings.js): sonst zahlt jeder TTHQ-Besuch die Ladezeit,
//  auch wer die Seite nie oeffnet.
//
//  Die Spalte "Quelle" ist bewusst sichtbar und nicht versteckt:
//    ✓✓  beide Quellen (echter Konsens)
//    BBM nur Basketball Monster
//    B   nur Beyaz
//    ⚠   Baseline-Wert war unplausibel (>1.05 Punkte pro Minute,
//        vermutlich Per-36-Daten), deshalb BBM allein genutzt
//  Ohne diese Kennzeichnung saehe eine Ein-Quellen-Zeile genauso
//  verlaesslich aus wie ein echter Konsens, was sie nicht ist.
// ============================================================

let _cpLoaded = false;
let _cpSort = { key: 'pts', dir: -1 };
let _cpQuery = '';
let _cpPosFilter = '';
let _cpSourceFilter = '';

const CP_COLS = [
  { key: 'min',   label: 'MIN', dec: 1 },
  { key: 'pts',   label: 'PTS', dec: 1 },
  { key: 'reb',   label: 'REB', dec: 1 },
  { key: 'ast',   label: 'AST', dec: 1 },
  { key: 'stl',   label: 'STL', dec: 2 },
  { key: 'blk',   label: 'BLK', dec: 2 },
  { key: 'tpm',   label: '3PM', dec: 2 },
  { key: 'fgPct', label: 'FG%', dec: 1, pct: true },
  { key: 'ftPct', label: 'FT%', dec: 1, pct: true },
  { key: 'tov',   label: 'TO',  dec: 2, invert: true },
];

function cpSourceBadge(src) {
  if (src === 'both') return '<span class="cp-src cp-src-both" title="Konsens aus beiden Quellen">✓✓</span>';
  if (src === 'bbm') return '<span class="cp-src cp-src-one" title="Nur Basketball Monster (Josh Lloyd)">BBM</span>';
  if (src === 'beyaz') return '<span class="cp-src cp-src-one" title="Nur Beyaz\' eigene Projections">B</span>';
  if (src === 'bbm-baseline-implausible') return '<span class="cp-src cp-src-warn" title="Eigener Baseline-Wert war unplausibel (>1.05 Punkte pro Minute) — nur BBM genutzt">⚠ BBM</span>';
  if (src === 'beyaz-implausible') return '<span class="cp-src cp-src-warn" title="Unplausibler Wert und keine zweite Quelle zum Gegenprüfen — mit Vorsicht behandeln">⚠ B</span>';
  return '';
}

function cpSortBy(key) {
  if (_cpSort.key === key) _cpSort.dir *= -1;
  else _cpSort = { key, dir: key === 'name' ? 1 : -1 };
  cpRender();
}

function cpSetQuery(v) { _cpQuery = String(v || '').toLowerCase().trim(); cpRender(); }
function cpSetPos(v) { _cpPosFilter = v || ''; cpRender(); }
function cpSetSource(v) { _cpSourceFilter = v || ''; cpRender(); }

function cpRender() {
  const host = document.getElementById('cpTableWrap');
  const info = document.getElementById('cpInfo');
  if (!host) return;

  if (typeof PROJECTIONS_CONSENSUS === 'undefined') {
    host.innerHTML = '<div class="cp-empty">Projections werden geladen…</div>';
    return;
  }

  let rows = Object.entries(PROJECTIONS_CONSENSUS).map(([name, p]) => ({ name, ...p }));

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

  const dir = _cpSort.dir;
  rows.sort((a, b) => {
    if (_cpSort.key === 'name') return a.name.localeCompare(b.name) * dir;
    if (_cpSort.key === 'spread') {
      // Zeilen ohne Spread (Ein-Quellen-Eintraege) immer ans Ende,
      // egal in welche Richtung sortiert wird.
      const av = a.spreadPts, bv = b.spreadPts;
      if ((av === null) !== (bv === null)) return av === null ? 1 : -1;
      if (av === null) return a.name.localeCompare(b.name);
      return (av - bv) * dir;
    }
    const av = a[_cpSort.key] ?? 0, bv = b[_cpSort.key] ?? 0;
    if (av !== bv) return (av - bv) * dir;
    return a.name.localeCompare(b.name);
  });

  if (info) {
    const total = Object.keys(PROJECTIONS_CONSENSUS).length;
    const both = Object.values(PROJECTIONS_CONSENSUS).filter(p => p.sources === 'both').length;
    info.textContent = `${rows.length} von ${total} Spielern · ${both} mit echtem Konsens aus beiden Quellen`;
  }

  const arrow = k => _cpSort.key === k ? (_cpSort.dir === 1 ? ' ▲' : ' ▼') : '';
  const th = (k, label, extra) =>
    `<th class="cp-th${_cpSort.key === k ? ' sorted' : ''}${extra || ''}" onclick="cpSortBy('${k}')">${label}${arrow(k)}</th>`;

  let html = '<table class="cp-table"><thead><tr>' +
    '<th class="cp-th cp-rank">#</th>' +
    th('name', 'Spieler', ' cp-name') +
    '<th>Team</th><th>Pos</th>' +
    '<th title="Fantasy Team in der Taco Tuesday League">Fantasy</th>' +
    CP_COLS.map(c => th(c.key, c.label)).join('') +
    th('spread', 'Δ', ' cp-spread') +
    '<th>Quelle</th>' +
    '</tr></thead><tbody>';

  rows.forEach((r, i) => {
    html += `<tr>
      <td class="cp-rank">${i + 1}</td>
      <td class="cp-name">${r.name.replace(/</g, '&lt;')}</td>
      <td class="cp-team">${r.team || '—'}</td>
      <td class="cp-team">${r.pos || '—'}</td>
      <td>${typeof ttOwnerTag === 'function' ? ttOwnerTag(r.name) : ''}</td>
      ${CP_COLS.map(c => `<td class="cp-num">${(r[c.key] ?? 0).toFixed(c.dec)}${c.pct ? '' : ''}</td>`).join('')}
      <td class="cp-num cp-spread">${r.spreadPts === null || r.spreadPts === undefined ? '—' : '±' + r.spreadPts.toFixed(1)}</td>
      <td class="cp-srccell">${cpSourceBadge(r.sources)}</td>
    </tr>`;
  });

  html += '</tbody></table>';
  host.innerHTML = html;
}

function showPlayerProjections() {
  navigate('playerProjectionsPage');

  if (_cpLoaded || typeof PROJECTIONS_CONSENSUS !== 'undefined') {
    _cpLoaded = true;
    cpRender();
    return;
  }

  const host = document.getElementById('cpTableWrap');
  if (host) host.innerHTML = '<div class="cp-empty">Lade Consensus-Projections…</div>';

  const load = (typeof _loadScriptOnce === 'function')
    ? _loadScriptOnce('data/projections-consensus.js?v=1')
    : new Promise(res => {
        const sc = document.createElement('script');
        sc.src = 'data/projections-consensus.js?v=1';
        sc.onload = res; sc.onerror = res;
        document.body.appendChild(sc);
      });

  load.then(() => {
    _cpLoaded = true;
    if (typeof ttOwnerInvalidate === 'function') ttOwnerInvalidate();
    cpRender();
  });
}
