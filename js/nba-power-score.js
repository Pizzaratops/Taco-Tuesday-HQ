// ============================================================
//  NBA BOOTLEG POWER SCORE — UI
// ============================================================
//  Rendert NBA_POWER_SCORE (data/nba-power-score.js, siehe
//  scripts/build-nba-power-score.js). Spinnennetz-Diagramm (SVG-Polygon)
//  über 6 Kategorien für jedes der 30 NBA-Teams.
//
//  Zwei Modi pro Woche (analog zum NFL-Original):
//    - "cumulative": kumulativer Stand bis einschließlich dieser Woche
//    - "isolated":   nur die Spiele DIESER Woche isoliert
//
//  Radar-Darstellungstrick: nicht den Liga-Rang direkt plotten, sondern
//  (N+1) - Rang -- Rang 1 (bester Wert) landet dadurch immer außen am
//  Rand, unabhängig davon ob "höher=besser" oder "niedriger=besser" bei
//  der Rohmetrik gilt (z.B. Defensive Rating: niedriger ist besser, aber
//  Rang 1 = beste Defense liegt trotzdem außen).
// ============================================================

let npsMode   = 'cumulative'; // 'cumulative' | 'isolated'
let npsWeekIx = null;         // Index in NBA_POWER_SCORE.weeks, null = letzte Woche
let npsTeam   = null;         // abbr | null

function showNbaPowerScore() {
  navigate('nbaPowerScorePage');
  renderNbaPowerScore();
}

function _npsWeeks() {
  return (typeof NBA_POWER_SCORE !== 'undefined' && NBA_POWER_SCORE.weeks) || [];
}

function _npsCategories() {
  return (typeof NBA_POWER_SCORE !== 'undefined' && NBA_POWER_SCORE.categories) || [];
}

function _npsCurrentWeekIdx() {
  const weeks = _npsWeeks();
  if (!weeks.length) return -1;
  if (npsWeekIx == null || npsWeekIx >= weeks.length) return weeks.length - 1;
  return npsWeekIx;
}

function _npsTeamName(abbr) {
  return (typeof NBA_TEAM_NAMES !== 'undefined' && NBA_TEAM_NAMES[abbr]) || abbr;
}

// Rang 1 = außen, unabhängig von asc/desc der Rohmetrik. teamCount = 30.
function _npsFlipRank(rank, teamCount) {
  if (rank == null) return null;
  return (teamCount + 1) - rank;
}

function _npsPolygonPoints(cx, cy, maxR, values /* 0..1 pro Achse, gleiche Reihenfolge wie Kategorien */) {
  const n = values.length;
  return values.map((v, i) => {
    const angle = -Math.PI / 2 + (i * 2 * Math.PI / n); // erste Achse oben, im Uhrzeigersinn
    const r = maxR * Math.max(0, Math.min(1, v == null ? 0 : v));
    const x = cx + r * Math.cos(angle);
    const y = cy + r * Math.sin(angle);
    return `${x.toFixed(1)},${y.toFixed(1)}`;
  }).join(' ');
}

function _npsAxisLines(cx, cy, maxR, n) {
  let lines = '';
  for (let i = 0; i < n; i++) {
    const angle = -Math.PI / 2 + (i * 2 * Math.PI / n);
    const x = cx + maxR * Math.cos(angle);
    const y = cy + maxR * Math.sin(angle);
    lines += `<line x1="${cx}" y1="${cy}" x2="${x.toFixed(1)}" y2="${y.toFixed(1)}" stroke="var(--border)" stroke-width="1"/>`;
  }
  return lines;
}

function _npsGridRings(cx, cy, maxR, n, steps = 4) {
  let rings = '';
  for (let s = 1; s <= steps; s++) {
    const r = maxR * (s / steps);
    const pts = Array.from({ length: n }, (_, i) => {
      const angle = -Math.PI / 2 + (i * 2 * Math.PI / n);
      return `${(cx + r * Math.cos(angle)).toFixed(1)},${(cy + r * Math.sin(angle)).toFixed(1)}`;
    }).join(' ');
    rings += `<polygon points="${pts}" fill="none" stroke="var(--border)" stroke-width="1" opacity="${s === steps ? 0.8 : 0.35}"/>`;
  }
  return rings;
}

function _npsAxisLabels(cx, cy, maxR, cats, fontSize = 9) {
  const n = cats.length;
  return cats.map((c, i) => {
    const angle = -Math.PI / 2 + (i * 2 * Math.PI / n);
    const lx = cx + (maxR + 14) * Math.cos(angle);
    const ly = cy + (maxR + 14) * Math.sin(angle);
    const anchor = Math.abs(Math.cos(angle)) < 0.2 ? 'middle' : (Math.cos(angle) > 0 ? 'start' : 'end');
    return `<text x="${lx.toFixed(1)}" y="${ly.toFixed(1)}" text-anchor="${anchor}" dominant-baseline="middle" font-size="${fontSize}" fill="var(--muted)" font-family="DM Sans,sans-serif" font-weight="700">${c.label}</text>`;
  }).join('');
}

// Baut die 0..1-skalierten Radar-Werte für ein Team aus seinen Rängen.
function _npsTeamRadarValues(team, teamCount, categories) {
  if (!team || !team.rank) return categories.map(() => 0);
  return categories.map(c => {
    const flipped = _npsFlipRank(team.rank[c.key], teamCount);
    return flipped == null ? 0 : flipped / teamCount;
  });
}

function _npsMiniRadarSvg(team, teamCount, categories) {
  const size = 130, cx = size / 2, cy = size / 2, maxR = 46;
  const values = _npsTeamRadarValues(team, teamCount, categories);
  const pts = _npsPolygonPoints(cx, cy, maxR, values);
  return `
    <svg viewBox="0 0 ${size} ${size}" style="width:100%;overflow:visible;">
      ${_npsGridRings(cx, cy, maxR, categories.length, 3)}
      ${_npsAxisLines(cx, cy, maxR, categories.length)}
      <polygon points="${pts}" fill="rgba(255,101,132,0.28)" stroke="#ff6584" stroke-width="1.5"/>
    </svg>`;
}

function _npsBigRadarSvg(team, teamCount, categories) {
  const size = 320, cx = size / 2, cy = size / 2, maxR = 110;
  const values = _npsTeamRadarValues(team, teamCount, categories);
  const pts = _npsPolygonPoints(cx, cy, maxR, values);
  return `
    <svg viewBox="0 0 ${size} ${size}" style="width:100%;max-width:340px;overflow:visible;display:block;margin:0 auto;">
      ${_npsGridRings(cx, cy, maxR, categories.length, 4)}
      ${_npsAxisLines(cx, cy, maxR, categories.length)}
      <polygon points="${pts}" fill="rgba(255,101,132,0.28)" stroke="#ff6584" stroke-width="2"/>
      ${_npsAxisLabels(cx, cy, maxR, categories, 10)}
    </svg>`;
}

function npsShowTeam(abbr) {
  npsTeam = abbr;
  renderNbaPowerScore();
}

function _npsOrdinal(n) {
  return n == null ? '–' : `${n}.`;
}

function _npsFmtValue(key, v) {
  if (v == null) return '–';
  if (key === 'ortg' || key === 'drtg' || key === 'ptsPg' || key === 'oppPtsPg' || key === 'tovPg' || key === 'drebPg') {
    return v.toFixed(1);
  }
  return v;
}

function _npsDetailHtml(teams, categories, week) {
  const team = teams.find(t => t.abbr === npsTeam);
  if (!team) return '<div class="npr-empty">Team nicht gefunden.</div>';
  const statBoxes = team.values ? categories.map(c => `
    <div class="nps-stat-box">
      <div class="nps-stat-label">${c.label}</div>
      <div class="nps-stat-value">${_npsFmtValue(c.key, team.values[c.key])}<span class="nps-stat-rank">${_npsOrdinal(team.rank[c.key])} in NBA</span></div>
    </div>`).join('') : '<div class="npr-empty">Noch keine Spiele in diesem Zeitraum.</div>';

  return `
    <div class="nps-detail-header">
      <div class="nps-detail-abbr">${team.abbr}</div>
      <div>
        <div style="font-weight:800;font-size:16px;color:var(--text);">${_npsTeamName(team.abbr)}</div>
        <div style="font-size:12px;color:var(--muted);">${team.conference} · ${team.division} · ${team.gamesPlayed} Spiele${npsMode === 'isolated' ? ' (nur diese Woche)' : ' (Saison bis ' + week.throughDate + ')'}</div>
      </div>
      <button class="npr-tb-btn" style="margin-left:auto;background:var(--surface2);border:1px solid var(--border);" onclick="npsTeam=null;renderNbaPowerScore()">✕ Zurück zur Übersicht</button>
    </div>
    ${_npsBigRadarSvg(team, teams.length, categories)}
    <div class="nps-detail-grid">${statBoxes}</div>`;
}

function renderNbaPowerScore() {
  const host = document.getElementById('npsContent');
  if (!host) return;
  const weeks = _npsWeeks();
  const categories = _npsCategories();

  if (!weeks.length) {
    host.innerHTML = `<div class="npr-empty">🕸️ Noch keine abgeschlossene Matchup-Woche dieser Saison. Sobald die erste Woche vorbei ist, erscheint hier der Bootleg Power Score automatisch.</div>`;
    return;
  }

  const weekIdx = _npsCurrentWeekIdx();
  const week = weeks[weekIdx];
  const teams = npsMode === 'isolated' ? week.isolated : week.cumulative;

  const modeToggle = [
    ['cumulative', 'Kumulativ bis Woche X'], ['isolated', 'Nur Woche X isoliert'],
  ].map(([v, label]) => `
    <button class="npr-tb-btn ${npsMode === v ? 'npr-tb-active' : ''}" onclick="npsMode='${v}';renderNbaPowerScore()">${label}</button>
  `).join('');

  const weekButtons = weeks.map((w, i) => `
    <button class="npr-week-btn ${i === weekIdx ? 'npr-week-active' : ''}" onclick="npsWeekIx=${i};renderNbaPowerScore()">${w.label}</button>
  `).join('');

  if (npsTeam) {
    host.innerHTML = `
      <div class="npr-toolbar"><div class="npr-tb-group">${modeToggle}</div></div>
      <div class="npr-week-row">${weekButtons}</div>
      ${_npsDetailHtml(teams, categories, week)}`;
    return;
  }

  const sorted = [...teams].sort((a, b) => _npsTeamName(a.abbr).localeCompare(_npsTeamName(b.abbr)));
  const cards = sorted.map(t => {
    const avgRank = t.rank ? (categories.reduce((sum, c) => sum + (t.rank[c.key] || teams.length), 0) / categories.length) : teams.length;
    return `
    <div class="nps-card" onclick="npsShowTeam('${t.abbr}')">
      <div class="nps-card-head">
        <div>
          <div class="nps-card-team">${_npsTeamName(t.abbr)}</div>
          <div class="nps-card-abbr">${t.abbr} · ${t.gamesPlayed} Sp.</div>
        </div>
        <div class="nps-card-rank">Ø${avgRank.toFixed(1)}</div>
      </div>
      ${_npsMiniRadarSvg(t, teams.length, categories)}
    </div>`;
  }).join('');

  host.innerHTML = `
    <div class="npr-toolbar"><div class="npr-tb-group">${modeToggle}</div></div>
    <div class="npr-week-row">${weekButtons}</div>
    <div class="nps-mode-note">Stand: ${week.label} · ${npsMode === 'isolated' ? 'nur diese Woche' : 'kumulativ bis ' + week.throughDate} · Team anklicken für Detailansicht</div>
    <div class="nps-grid">${cards}</div>`;
}
