// ============================================================
//  FANTASY BOOTLEG POWER SCORE — UI
// ============================================================
//  Rendert FANTASY_POWER_SCORE (data/fantasy-power-score.js, siehe
//  scripts/build-fantasy-power-score.js). Spinnennetz-Diagramm über
//  alle 9 Cat-Kategorien für jedes der 12 TTHQ-Teams.
//
//  Anders als js/nba-power-score.js gibt es hier KEINE Wochen/Modi --
//  einmalige Momentaufnahme des aktuellen Kaders. Radar-Darstellungs-
//  trick identisch: (N+1)-Rang statt Rang direkt plotten (N=12 Teams),
//  Rang 1 landet dadurch immer außen.
// ============================================================

let fpsTeam = null; // id | null

function showFantasyPowerScore() {
  navigate('fantasyPowerScorePage');
  renderFantasyPowerScore();
}

function _fpsTeams() {
  return (typeof FANTASY_POWER_SCORE !== 'undefined' && FANTASY_POWER_SCORE.teams) || [];
}

function _fpsCategories() {
  return (typeof FANTASY_POWER_SCORE !== 'undefined' && FANTASY_POWER_SCORE.categories) || [];
}

function _fpsFlipRank(rank, teamCount) {
  if (rank == null) return null;
  return (teamCount + 1) - rank;
}

function _fpsPolygonPoints(cx, cy, maxR, values) {
  const n = values.length;
  return values.map((v, i) => {
    const angle = -Math.PI / 2 + (i * 2 * Math.PI / n);
    const r = maxR * Math.max(0, Math.min(1, v == null ? 0 : v));
    return `${(cx + r * Math.cos(angle)).toFixed(1)},${(cy + r * Math.sin(angle)).toFixed(1)}`;
  }).join(' ');
}

function _fpsAxisLines(cx, cy, maxR, n) {
  let lines = '';
  for (let i = 0; i < n; i++) {
    const angle = -Math.PI / 2 + (i * 2 * Math.PI / n);
    const x = cx + maxR * Math.cos(angle), y = cy + maxR * Math.sin(angle);
    lines += `<line x1="${cx}" y1="${cy}" x2="${x.toFixed(1)}" y2="${y.toFixed(1)}" stroke="var(--border)" stroke-width="1"/>`;
  }
  return lines;
}

function _fpsGridRings(cx, cy, maxR, n, steps = 4) {
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

function _fpsAxisLabels(cx, cy, maxR, cats, fontSize = 9) {
  const n = cats.length;
  return cats.map((c, i) => {
    const angle = -Math.PI / 2 + (i * 2 * Math.PI / n);
    const lx = cx + (maxR + 16) * Math.cos(angle);
    const ly = cy + (maxR + 16) * Math.sin(angle);
    const anchor = Math.abs(Math.cos(angle)) < 0.15 ? 'middle' : (Math.cos(angle) > 0 ? 'start' : 'end');
    return `<text x="${lx.toFixed(1)}" y="${ly.toFixed(1)}" text-anchor="${anchor}" dominant-baseline="middle" font-size="${fontSize}" fill="var(--muted)" font-family="DM Sans,sans-serif" font-weight="700">${c.label}</text>`;
  }).join('');
}

function _fpsTeamRadarValues(team, teamCount, categories) {
  if (!team || !team.rank) return categories.map(() => 0);
  return categories.map(c => {
    const flipped = _fpsFlipRank(team.rank[c.key], teamCount);
    return flipped == null ? 0 : flipped / teamCount;
  });
}

function _fpsMiniRadarSvg(team, teamCount, categories) {
  const size = 140, cx = size / 2, cy = size / 2, maxR = 48;
  const values = _fpsTeamRadarValues(team, teamCount, categories);
  const pts = _fpsPolygonPoints(cx, cy, maxR, values);
  return `
    <svg viewBox="0 0 ${size} ${size}" style="width:100%;overflow:visible;">
      ${_fpsGridRings(cx, cy, maxR, categories.length, 3)}
      ${_fpsAxisLines(cx, cy, maxR, categories.length)}
      <polygon points="${pts}" fill="rgba(224,64,251,0.28)" stroke="#e040fb" stroke-width="1.5"/>
    </svg>`;
}

function _fpsBigRadarSvg(team, teamCount, categories) {
  const size = 340, cx = size / 2, cy = size / 2, maxR = 115;
  const values = _fpsTeamRadarValues(team, teamCount, categories);
  const pts = _fpsPolygonPoints(cx, cy, maxR, values);
  return `
    <svg viewBox="0 0 ${size} ${size}" style="width:100%;max-width:360px;overflow:visible;display:block;margin:0 auto;">
      ${_fpsGridRings(cx, cy, maxR, categories.length, 4)}
      ${_fpsAxisLines(cx, cy, maxR, categories.length)}
      <polygon points="${pts}" fill="rgba(224,64,251,0.28)" stroke="#e040fb" stroke-width="2"/>
      ${_fpsAxisLabels(cx, cy, maxR, categories, 10)}
    </svg>`;
}

function fpsShowTeam(id) {
  fpsTeam = id;
  renderFantasyPowerScore();
}

function _fpsOrdinal(n) { return n == null ? '–' : `${n}.`; }

function _fpsFmtValue(key, v) {
  if (v == null) return '–';
  if (key === 'fgPct' || key === 'ftPct') return v.toFixed(1) + '%';
  return v;
}

function _fpsDetailHtml(teams, categories) {
  const team = teams.find(t => t.id === fpsTeam);
  if (!team) return '<div class="npr-empty">Team nicht gefunden.</div>';
  const statBoxes = team.values ? categories.map(c => `
    <div class="nps-stat-box">
      <div class="nps-stat-label">${c.label}</div>
      <div class="nps-stat-value">${_fpsFmtValue(c.key, team.values[c.key])}<span class="nps-stat-rank">${_fpsOrdinal(team.rank[c.key])} in TTHQ</span></div>
    </div>`).join('') : '<div class="npr-empty">Keine Daten (zu wenige gematchte Spieler).</div>';

  const skipNote = team.skippedCount ? `
    <div class="nps-mode-note">${team.skippedCount} Spieler ohne 2025/26-Saisonstatzeile ausgeschlossen (Rookie oder saisonlange Verletzung): ${team.skippedPlayers.join(', ')}</div>` : '';

  return `
    <div class="nps-detail-header">
      <div class="nps-detail-abbr" style="background:${getTeamColor ? getTeamColor(team) : 'var(--surface2)'};color:#fff;">${team.id}</div>
      <div>
        <div style="font-weight:800;font-size:16px;color:var(--text);">${team.name}</div>
        <div style="font-size:12px;color:var(--muted);">${team.owner} · ${team.includedCount} Spieler im Kader berücksichtigt</div>
      </div>
      <button class="npr-tb-btn" style="margin-left:auto;background:var(--surface2);border:1px solid var(--border);" onclick="fpsTeam=null;renderFantasyPowerScore()">✕ Zurück zur Übersicht</button>
    </div>
    ${_fpsBigRadarSvg(team, teams.length, categories)}
    <div class="nps-detail-grid">${statBoxes}</div>
    ${skipNote}`;
}

function renderFantasyPowerScore() {
  const host = document.getElementById('fpsContent');
  if (!host) return;
  const teams = _fpsTeams();
  const categories = _fpsCategories();

  if (!teams.length) {
    host.innerHTML = `<div class="npr-empty">🕸️ Noch keine Daten. scripts/build-fantasy-power-score.js einmal laufen lassen.</div>`;
    return;
  }

  if (fpsTeam != null) {
    host.innerHTML = _fpsDetailHtml(teams, categories);
    return;
  }

  const sorted = [...teams].sort((a, b) => a.name.localeCompare(b.name));
  const cards = sorted.map(t => {
    const avgRank = t.rank ? (categories.reduce((sum, c) => sum + (t.rank[c.key] || teams.length), 0) / categories.length) : teams.length;
    return `
    <div class="nps-card" onclick="fpsShowTeam(${t.id})">
      <div class="nps-card-head">
        <div>
          <div class="nps-card-team">${t.name}</div>
          <div class="nps-card-abbr">${t.owner}</div>
        </div>
        <div class="nps-card-rank">Ø${avgRank.toFixed(1)}</div>
      </div>
      ${_fpsMiniRadarSvg(t, teams.length, categories)}
    </div>`;
  }).join('');

  host.innerHTML = `
    <div class="nps-mode-note">Basis: aktueller Kader × echte Saison-2025/26-Boxscores · Team anklicken für Detailansicht</div>
    <div class="nps-grid">${cards}</div>`;
}
