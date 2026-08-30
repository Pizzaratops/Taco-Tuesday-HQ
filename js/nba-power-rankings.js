// ============================================================
//  NBA POWER RANKINGS — UI
// ============================================================
//  Rendert NBA_POWER_RANKINGS (data/nba-power-rankings.js, siehe
//  scripts/build-nba-power-rankings.js). Drei Bausteine:
//    - View-Toggle:   Liga / Conference / Division
//    - Sort-Toggle:   Win-Loss / Offense / Defense
//    - Wochenauswahl: Buttons pro abgeschlossener Matchup-Woche
//  Team-Dropdown ersetzt die Tabelle durch den Wochen-Verlauf
//  eines einzelnen Teams (Rang-Historie, wie bei Rolling Rankings).
//
//  Ranking innerhalb einer Gruppe (Liga/Conference/Division) wird
//  hier client-seitig nach dem gewählten Sort-Kriterium sortiert
//  (Position = Zeilennummer in der jeweils angezeigten Tabelle).
//  Die im Datenfile vorberechneten rank.league/conference/division/
//  off/def-Werte werden NUR in der Team-Verlaufsansicht angezeigt
//  (dort exakt das Format "Woche 1: 1. in der NBA, 1. in Offense,
//  2. in Defense").
// ============================================================

let nprView   = 'league';   // 'league' | 'conference' | 'division'
let nprSort   = 'record';   // 'record' | 'off' | 'def'
let nprWeekIx = null;       // Index in NBA_POWER_RANKINGS.weeks, null = letzte Woche
let nprTeam   = null;       // abbr | null

function showNbaPowerRankings() {
  navigate('nbaPowerRankingsPage');
  renderNbaPowerRankings();
}

function _nprWeeks() {
  return (typeof NBA_POWER_RANKINGS !== 'undefined' && NBA_POWER_RANKINGS.weeks) || [];
}

function _nprCurrentWeekIdx() {
  const weeks = _nprWeeks();
  if (!weeks.length) return -1;
  if (nprWeekIx == null || nprWeekIx >= weeks.length) return weeks.length - 1;
  return nprWeekIx;
}

function _nprSortValue(team, sort) {
  if (sort === 'off') return team.off;
  if (sort === 'def') return team.def == null ? null : -team.def; // niedriger DefRtg = besser -> negieren fuer "hoeher = besser"
  const gp = team.wins + team.losses;
  return gp > 0 ? team.winPct : -1;
}

function _nprSortTeams(teams, sort) {
  return [...teams].sort((a, b) => {
    const va = _nprSortValue(a, sort), vb = _nprSortValue(b, sort);
    if (va == null && vb == null) return 0;
    if (va == null) return 1;
    if (vb == null) return -1;
    return vb - va;
  });
}

function _nprTeamName(abbr) {
  return (typeof NBA_TEAM_NAMES !== 'undefined' && NBA_TEAM_NAMES[abbr]) || abbr;
}

function _nprNetCell(team) {
  if (team.net == null) return '<td class="npr-num">–</td>';
  const cls = team.net >= 0 ? 'npr-net-pos' : 'npr-net-neg';
  const sign = team.net > 0 ? '+' : '';
  return `<td class="npr-num ${cls}">${sign}${team.net.toFixed(1)}</td>`;
}

function _nprTableHtml(teams, sort) {
  const sorted = _nprSortTeams(teams, sort);
  const rows = sorted.map((t, i) => `
    <tr>
      <td class="npr-rank-cell">${i + 1}</td>
      <td class="npr-team-cell" onclick="nprShowTeam('${t.abbr}')">${_nprTeamName(t.abbr)} <span style="color:var(--muted);font-weight:600;">${t.abbr}</span></td>
      <td class="npr-num">${t.wins}-${t.losses}</td>
      <td class="npr-num">${(t.wins + t.losses) > 0 ? t.winPct.toFixed(3).replace(/^0/, '') : '–'}</td>
      <td class="npr-num">${t.off != null ? t.off.toFixed(1) : '–'}</td>
      <td class="npr-num">${t.def != null ? t.def.toFixed(1) : '–'}</td>
      ${_nprNetCell(t)}
    </tr>`).join('');
  return `
    <div class="npr-table-wrap">
      <table class="npr-table">
        <thead>
          <tr>
            <th></th><th>Team</th><th class="npr-num">W-L</th><th class="npr-num">%</th>
            <th class="npr-num">Off</th><th class="npr-num">Def</th><th class="npr-num">Net</th>
          </tr>
        </thead>
        <tbody>${rows}</tbody>
      </table>
    </div>`;
}

function _nprGroupedHtml(week) {
  if (nprView === 'league') return _nprTableHtml(week.teams, nprSort);
  if (nprView === 'conference') {
    return ['East', 'West'].map(conf => `
      <div class="npr-group-title">${conf === 'East' ? '🌅 Eastern Conference' : '🌇 Western Conference'}</div>
      ${_nprTableHtml(week.teams.filter(t => t.conference === conf), nprSort)}
    `).join('');
  }
  // division
  const divisions = [
    ['Atlantic', 'East'], ['Central', 'East'], ['Southeast', 'East'],
    ['Northwest', 'West'], ['Pacific', 'West'], ['Southwest', 'West'],
  ];
  return divisions.map(([div]) => `
    <div class="npr-group-title">${div}</div>
    ${_nprTableHtml(week.teams.filter(t => t.division === div), nprSort)}
  `).join('');
}

function _nprOrdinal(n) {
  if (n == null) return '–';
  return `${n}.`;
}

function nprShowTeam(abbr) {
  nprTeam = abbr;
  renderNbaPowerRankings();
}

function _nprHistoryHtml(abbr) {
  const weeks = _nprWeeks();
  const rows = weeks.map(w => {
    const t = w.teams.find(x => x.abbr === abbr);
    if (!t) return '';
    return `
      <tr>
        <td class="npr-team-cell" style="cursor:default;">${w.label}</td>
        <td class="npr-num">${t.wins}-${t.losses}</td>
        <td class="npr-num">${_nprOrdinal(t.rank.league)} NBA</td>
        <td class="npr-num">${_nprOrdinal(t.rank.conference)} ${t.conference}</td>
        <td class="npr-num">${_nprOrdinal(t.rank.division)} ${t.division}</td>
        <td class="npr-num">${_nprOrdinal(t.rank.off)} Off (${t.off != null ? t.off.toFixed(1) : '–'})</td>
        <td class="npr-num">${_nprOrdinal(t.rank.def)} Def (${t.def != null ? t.def.toFixed(1) : '–'})</td>
      </tr>`;
  }).join('');

  const latest = weeks[weeks.length - 1]?.teams.find(x => x.abbr === abbr);
  return `
    <div class="npr-history-header">
      <div class="npr-history-abbr">${abbr}</div>
      <div>
        <div style="font-weight:800;font-size:16px;color:var(--text);">${_nprTeamName(abbr)}</div>
        <div style="font-size:12px;color:var(--muted);">${latest ? `${latest.conference} · ${latest.division}` : ''}</div>
      </div>
      <button class="npr-tb-btn" style="margin-left:auto;background:var(--surface2);border:1px solid var(--border);" onclick="nprTeam=null;renderNbaPowerRankings()">✕ Zurück zur Tabelle</button>
    </div>
    <div class="npr-table-wrap">
      <table class="npr-table">
        <thead>
          <tr><th>Woche</th><th class="npr-num">W-L</th><th class="npr-num">Liga</th><th class="npr-num">Conf.</th><th class="npr-num">Div.</th><th class="npr-num">Offense</th><th class="npr-num">Defense</th></tr>
        </thead>
        <tbody>${rows}</tbody>
      </table>
    </div>`;
}

function _nprTeamOptions() {
  const weeks = _nprWeeks();
  if (!weeks.length) return [];
  return [...weeks[weeks.length - 1].teams].sort((a, b) => _nprTeamName(a.abbr).localeCompare(_nprTeamName(b.abbr)));
}

function renderNbaPowerRankings() {
  const host = document.getElementById('nprContent');
  if (!host) return;
  const weeks = _nprWeeks();

  if (!weeks.length) {
    host.innerHTML = `<div class="npr-empty">🏀 Noch keine abgeschlossene Matchup-Woche dieser Saison. Sobald die erste Woche vorbei ist, erscheinen hier die NBA Power Rankings automatisch.</div>`;
    return;
  }

  const teamOpts = _nprTeamOptions();
  const teamSelectHtml = `
    <select class="npr-team-select" onchange="nprTeam=this.value||null;renderNbaPowerRankings()">
      <option value="">🔍 Team auswählen…</option>
      ${teamOpts.map(t => `<option value="${t.abbr}" ${nprTeam === t.abbr ? 'selected' : ''}>${_nprTeamName(t.abbr)}</option>`).join('')}
    </select>`;

  if (nprTeam) {
    host.innerHTML = `
      <div class="npr-toolbar">${teamSelectHtml}</div>
      ${_nprHistoryHtml(nprTeam)}`;
    return;
  }

  const weekIdx = _nprCurrentWeekIdx();
  const week = weeks[weekIdx];

  const weekButtons = weeks.map((w, i) => `
    <button class="npr-week-btn ${i === weekIdx ? 'npr-week-active' : ''}" onclick="nprWeekIx=${i};renderNbaPowerRankings()">${w.label}</button>
  `).join('');

  const viewToggle = ['league', 'conference', 'division'].map(v => `
    <button class="npr-tb-btn ${nprView === v ? 'npr-tb-active' : ''}" onclick="nprView='${v}';renderNbaPowerRankings()">
      ${v === 'league' ? 'Liga' : v === 'conference' ? 'Conference' : 'Division'}
    </button>`).join('');

  const sortToggle = [
    ['record', 'Win-Loss'], ['off', 'Offense'], ['def', 'Defense'],
  ].map(([v, label]) => `
    <button class="npr-tb-btn ${nprSort === v ? 'npr-tb-active' : ''}" onclick="nprSort='${v}';renderNbaPowerRankings()">${label}</button>
  `).join('');

  host.innerHTML = `
    <div class="npr-toolbar">
      <div class="npr-tb-group">${viewToggle}</div>
      <div class="npr-tb-group">${sortToggle}</div>
      ${teamSelectHtml}
    </div>
    <div class="npr-week-row">${weekButtons}</div>
    <div style="font-size:11px;color:var(--muted);margin-bottom:10px;">Stand: ${week.label} · kumulativ bis ${week.throughDate}</div>
    ${_nprGroupedHtml(week)}`;
}
