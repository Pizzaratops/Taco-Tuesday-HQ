// ============================================================
//  NAVIGATION
// ============================================================
let currentTeamId=null, currentTab='roster';
const teamMap={};
TEAMS.forEach(t=>teamMap[t.id]=t);

function getInitials(name){return name.split(' ').map(w=>w[0]).join('').slice(0,2).toUpperCase();}

function teamStrengthBadge(teamId) {
  const roster = ROSTERS[teamId] || [];
  const ranks = roster
    .map(p => getDynastyRank(p.name))
    .filter(r => r !== null)
    .sort((a, b) => a - b)
    .slice(0, 10);
  if (!ranks.length) return '';
  const avg = Math.round(ranks.reduce((a, b) => a + b, 0) / ranks.length);
  // Farbe nach Stärke
  let color, bg;
  if (avg <= 30)       { color = '#f5c842'; bg = 'rgba(245,200,66,0.15)'; }
  else if (avg <= 60)  { color = '#a89bff'; bg = 'rgba(108,99,255,0.15)'; }
  else if (avg <= 100) { color = '#6dddaa'; bg = 'rgba(76,175,129,0.15)'; }
  else if (avg <= 150) { color = '#4fc3f7'; bg = 'rgba(41,182,246,0.15)'; }
  else                 { color = 'var(--muted)'; bg = 'rgba(123,127,158,0.12)'; }
  const isLight = document.body.classList.contains('light');
  if (isLight) {
    if (avg <= 30)       { color = '#9a6e10'; bg = 'rgba(154,110,16,0.15)'; }
    else if (avg <= 60)  { color = '#c0622f'; bg = 'rgba(192,98,47,0.15)'; }
    else if (avg <= 100) { color = '#2d7a50'; bg = 'rgba(61,138,92,0.15)'; }
    else if (avg <= 150) { color = '#2a7ab8'; bg = 'rgba(42,122,184,0.15)'; }
    else                 { color = 'var(--muted)'; bg = 'rgba(123,127,158,0.12)'; }
  }
  return `<div style="margin-top:10px;display:flex;align-items:center;justify-content:space-between;">
    <span style="font-size:10px;color:var(--muted);font-weight:600;">Ø Top-10 Rank</span>
    <span style="font-size:11px;font-weight:800;padding:2px 9px;border-radius:20px;background:${bg};color:${color};">#${avg}</span>
  </div>`;
}

function renderHome() {
  document.getElementById('teamGrid').innerHTML = TEAMS.map(t => {
    const c = getTeamColor(t);
    return `<div class="team-card" onclick="showTeam(${t.id})">
      <div class="team-avatar" style="background:${c}18;color:${c};">${getInitials(t.name)}</div>
      <div class="team-name">${t.name}</div>
      <div class="team-owner">${t.owner}</div>
      <div class="team-record">📊 ${t.record}</div>
      ${teamStrengthBadge(t.id)}
    </div>`;
  }).join('');
}

function showTeam(id){
  currentTeamId=id; currentTab='roster';
  // Apply localStorage roster overrides
  _applyRosterOverrides();
  currentRosterSort = 'pos';
  const sortBtn = document.getElementById('rosterSortBtn');
  if (sortBtn) {
    sortBtn.style.display = 'block';
    const btn = document.getElementById('sortToggleBtn');
    if (btn) { btn.textContent = '📊 Sort by Rank'; btn.style.background='var(--surface)'; btn.style.borderColor='var(--border)'; btn.style.color='var(--muted)'; }
  }
	const t=teamMap[id]; const c=getTeamColor(t);
  document.getElementById('teamHeader').innerHTML=`
    <div class="team-page-avatar" style="background:${c}18;color:${c};">${getInitials(t.name)}</div>
    <div>
      <div class="team-page-name">${t.name}</div>
      <div class="team-page-owner">${t.owner} &nbsp;·&nbsp; <span style="color:var(--green);">📊 ${t.record}</span></div>
    </div>`;
  document.querySelectorAll('.tab').forEach((el,i)=>el.classList.toggle('active',i===0));
  renderTab(); navigate('teamPage');
}

function switchTab(tab) {
  currentTab = tab;
  document.querySelectorAll('.tab').forEach((el, i) =>
    el.classList.toggle('active', (i===0&&tab==='roster')||(i===1&&tab==='picks')));
  // Sort-Button nur bei Roster anzeigen
  const sortBtn = document.getElementById('rosterSortBtn');
  if (sortBtn) sortBtn.style.display = tab === 'roster' ? 'block' : 'none';
  renderTab();
}

function toggleRosterSort() {
  currentRosterSort = currentRosterSort === 'pos' ? 'rank' : 'pos';
  const btn = document.getElementById('sortToggleBtn');
  if (btn) {
    btn.textContent = currentRosterSort === 'rank' ? '📋 Sort by Position' : '📊 Sort by Rank';
    btn.style.background = currentRosterSort === 'rank' ? 'var(--accent-light)' : 'var(--surface)';
    btn.style.borderColor = currentRosterSort === 'rank' ? 'var(--accent)' : 'var(--border)';
    btn.style.color = currentRosterSort === 'rank' ? 'var(--accent)' : 'var(--muted)';
  }
  renderTab();
}
function renderTab(){
  document.getElementById('tabContent').innerHTML=currentTab==='roster'?renderRoster(currentTeamId):renderPicks(currentTeamId);
}

function getDynastyRank(name) {
  const canonical = normalizeName(name).toLowerCase();
  const entry = DYNASTY_PLAYERS.find(p =>
    normalizeName(p[1]).toLowerCase() === canonical
  );
  return entry ? entry[0] : null;
}
function getHashtagRank(name) {
  const canonical = normalizeName(name).toLowerCase()
    .normalize('NFD').replace(/[\u0300-\u036f]/g, '');
  return HASHTAG_RANKINGS.find(p =>
    normalizeName(p[1]).toLowerCase()
      .normalize('NFD').replace(/[\u0300-\u036f]/g, '') === canonical
  )?.[0] ?? null;
}
function dynastyRankBg(rank) {
  if (rank === 1)      return 'rgba(245,200,66,0.15)';
  if (rank <= 5)       return 'rgba(108,99,255,0.15)';
  if (rank <= 15)      return 'rgba(76,175,129,0.15)';
  if (rank <= 30)      return 'rgba(41,182,246,0.15)';
  if (rank <= 75)      return 'rgba(255,101,132,0.12)';
  return 'rgba(123,127,158,0.12)';
}
function dynastyRankColor(rank) {
  if (rank === 1)      return '#f5c842';
  if (rank <= 5)       return '#a89bff';
  if (rank <= 15)      return '#6dddaa';
  if (rank <= 30)      return '#4fc3f7';
  if (rank <= 75)      return '#ff8fa3';
  return 'var(--muted)';
}
function dynastyRankBadge(rank) {
  if (rank === null) return '<span style="font-size:11px;color:var(--border);font-weight:600;width:48px;text-align:right;padding:3px 8px;display:inline-block;">—</span>';
  return `<span onclick="showRankings()" style="font-size:11px;font-weight:800;width:48px;text-align:center;padding:3px 8px;border-radius:6px;background:${dynastyRankBg(rank)};color:${dynastyRankColor(rank)};cursor:pointer;transition:opacity 0.15s;display:inline-block;" onmouseenter="this.style.opacity='0.75'" onmouseleave="this.style.opacity='1'">#${rank}</span>`;
}
function playerAge(dob) {
  if (!dob) return null;
  const d = new Date(dob);
  const today = new Date();
  let age = today.getFullYear() - d.getFullYear();
  const m = today.getMonth() - d.getMonth();
  if (m < 0 || (m === 0 && today.getDate() < d.getDate())) age--;
  return age;
}
	
let currentRosterSort = 'pos'; // 'pos' | 'rank'

function renderRoster(id) {
  const roster = ROSTERS[id] || [];
  let html = '';

  // Desktop header (hidden on mobile)
  html += `<div class="roster-header-row">
    <div style="width:32px;flex-shrink:0;"></div>
    <div style="flex:1;font-size:10px;font-weight:700;letter-spacing:1.2px;text-transform:uppercase;color:var(--muted);">Name</div>
    <div class="roster-col-nba" style="font-size:10px;font-weight:700;letter-spacing:1.2px;text-transform:uppercase;color:var(--muted);">NBA</div>
    <div class="roster-col-rank" style="font-size:10px;font-weight:700;letter-spacing:1.2px;text-transform:uppercase;color:var(--muted);">MFHFBs</div>
    <div class="roster-col-rank" style="font-size:10px;font-weight:700;letter-spacing:1.2px;text-transform:uppercase;color:var(--muted);">Matt</div>
    <div class="roster-col-rank" style="font-size:10px;font-weight:700;letter-spacing:1.2px;text-transform:uppercase;color:var(--muted);">#️⃣</div>
  </div>`;

  const sorted = currentRosterSort === 'rank'
    ? [...roster].sort((a, b) => {
        const ra = getDynastyRank(a.name) ?? 9999;
        const rb = getDynastyRank(b.name) ?? 9999;
        return ra - rb;
      })
    : roster;

  const knownPos = ['PG','SG','SF','PF','C'];
  const posGroups = currentRosterSort === 'rank'
    ? [{ pos: null, players: sorted }]
    : [
        ...knownPos.map(pos => ({ pos, players: sorted.filter(p => p.pos && p.pos.split('/')[0] === pos) })),
        { pos: '?', players: sorted.filter(p => !p.pos || !knownPos.includes(p.pos.split('/')[0])) }
      ];

  posGroups.forEach(({ pos, players }) => {
    if (!players.length) return;
    players.forEach(p => {
      const rank   = getDynastyRank(p.name);
      const mattRk = MATT_RANKS[p.name] || null;
      const hashRk = getHashtagRank(p.name);
      const dpEntry = DYNASTY_PLAYERS.find(dp => dp[1] === p.name || normalizeName(dp[1]) === normalizeName(p.name));
      const age    = dpEntry ? playerAge(dpEntry[4]) : null;
      const ageStr = age !== null
        ? `<span style="font-size:10px;font-weight:600;color:var(--muted);background:var(--surface2);border:1px solid var(--border);padding:1px 5px;border-radius:10px;margin-left:4px;">${age}y</span>`
        : '';

      const mattBadge = mattRk
        ? `<span onclick="showRankings()" style="font-size:11px;font-weight:800;width:48px;text-align:center;padding:3px 8px;border-radius:6px;background:${dynastyRankBg(mattRk)};color:${dynastyRankColor(mattRk)};cursor:pointer;display:inline-block;" onmouseenter="this.style.opacity='.75'" onmouseleave="this.style.opacity='1'">#${mattRk}</span>`
        : '<span style="font-size:11px;color:var(--border);font-weight:600;width:48px;text-align:right;padding:3px 8px;display:inline-block;">—</span>';
      const hashBadge = hashRk
        ? `<span onclick="showHashtagRankings()" style="font-size:11px;font-weight:800;width:48px;text-align:center;padding:3px 8px;border-radius:6px;background:${dynastyRankBg(hashRk)};color:${dynastyRankColor(hashRk)};cursor:pointer;display:inline-block;" onmouseenter="this.style.opacity='.75'" onmouseleave="this.style.opacity='1'">#${hashRk}</span>`
        : '<span style="font-size:11px;color:var(--border);font-weight:600;width:48px;text-align:right;padding:3px 8px;display:inline-block;">—</span>';
      const dynBadge = dynastyRankBadge(rank);

      const _isAdm = typeof isAdmin !== 'undefined' && isAdmin;
      const _posKey = p.pos ? p.pos.split('/')[0] : 'PG';
      const _posStyle = _isAdm ? 'cursor:pointer;outline:2px dashed var(--accent);outline-offset:2px;border-radius:4px;' : '';
      const _teamStyle = _isAdm ? 'font-size:12px;width:42px;text-align:center;cursor:pointer;text-decoration:underline dotted var(--accent);' : 'font-size:12px;width:42px;text-align:center;';
      html += `<div class="player-row">
        <div class="pos-badge pos-${_posKey}"
          onclick="if(window.isAdmin)adminEditPlayerField(event,this,'${p.name}',${id},'pos','${_posKey}')"
          style="${_posStyle}"
        >${_posKey}</div>
        <div style="flex:1;min-width:0;">
          <!-- Desktop: single line -->
          <div class="roster-desktop-row">
            <div class="player-name" style="flex:1;">${p.name}${ageStr}</div>
            <span class="roster-col-nba player-team r-team-link"
              onclick="window.isAdmin?adminEditPlayerField(event,this,'${p.name}',${id},'team','${p.team}'):showNBATeam('${p.team}')"
              style="${_teamStyle}"
            >${p.team}</span>
            <span class="roster-col-rank">${dynBadge}</span>
            <span class="roster-col-rank">${mattBadge}</span>
            <span class="roster-col-rank">${hashBadge}</span>
          </div>
          <!-- Mobile: two lines -->
          <div class="roster-mobile-row">
            <div style="display:flex;align-items:center;gap:6px;margin-bottom:4px;">
              <span class="player-name" style="font-size:13px;">${p.name}${ageStr}</span>
              <span class="player-team r-team-link" onclick="showNBATeam('${p.team}')" style="font-size:11px;">${p.team}</span>
            </div>
            <div style="display:flex;gap:4px;flex-wrap:wrap;">
              <span style="font-size:9px;font-weight:700;color:var(--muted);padding:2px 6px;background:var(--surface2);border-radius:4px;">MFH</span>${dynBadge}
              <span style="font-size:9px;font-weight:700;color:var(--muted);padding:2px 6px;background:var(--surface2);border-radius:4px;">Matt</span>${mattBadge}
              <span style="font-size:9px;font-weight:700;color:var(--muted);padding:2px 6px;background:var(--surface2);border-radius:4px;">#️⃣</span>${hashBadge}
            </div>
          </div>
        </div>
      </div>`;
    });
  });
  return html;
}

function renderPicks(id){
  const myPicks=PICKS.filter(p=>p.currentOwner===id);
  if(!myPicks.length) return '<p style="color:var(--muted);padding:20px 0;">No picks held.</p>';
  const isLight=document.body.classList.contains('light');
  const yearStyles=isLight?{
    2026:{header:'rgba(192,98,47,0.1)',dot:'#c0622f',label:'#8a3a10',own:'rgba(192,98,47,0.08)',ownBorder:'rgba(192,98,47,0.3)',traded:'rgba(192,98,47,0.04)',tradedBorder:'rgba(192,98,47,0.15)'},
    2027:{header:'rgba(45,122,80,0.1)',dot:'#2d7a50',label:'#1a5c35',own:'rgba(45,122,80,0.08)',ownBorder:'rgba(45,122,80,0.3)',traded:'rgba(45,122,80,0.04)',tradedBorder:'rgba(45,122,80,0.15)'},
    2028:{header:'rgba(154,110,16,0.1)',dot:'#9a6e10',label:'#6e4c08',own:'rgba(154,110,16,0.08)',ownBorder:'rgba(154,110,16,0.3)',traded:'rgba(154,110,16,0.04)',tradedBorder:'rgba(154,110,16,0.15)'},
    2029:{header:'rgba(42,122,184,0.1)',dot:'#2a7ab8',label:'#1a5a8a',own:'rgba(42,122,184,0.08)',ownBorder:'rgba(42,122,184,0.3)',traded:'rgba(42,122,184,0.04)',tradedBorder:'rgba(42,122,184,0.15)'},
  }:{
    2026:{header:'rgba(108,99,255,0.25)',dot:'#6c63ff',label:'#a89bff',own:'rgba(108,99,255,0.12)',ownBorder:'rgba(108,99,255,0.35)',traded:'rgba(108,99,255,0.06)',tradedBorder:'rgba(108,99,255,0.2)'},
    2027:{header:'rgba(76,175,129,0.25)',dot:'#4caf81',label:'#6dddaa',own:'rgba(76,175,129,0.12)',ownBorder:'rgba(76,175,129,0.35)',traded:'rgba(76,175,129,0.06)',tradedBorder:'rgba(76,175,129,0.2)'},
    2028:{header:'rgba(245,200,66,0.25)',dot:'#f5c842',label:'#f5d97a',own:'rgba(245,200,66,0.12)',ownBorder:'rgba(245,200,66,0.35)',traded:'rgba(245,200,66,0.06)',tradedBorder:'rgba(245,200,66,0.2)'},
    2029:{header:'rgba(41,182,246,0.25)',dot:'#29b6f6',label:'#7dd8f8',own:'rgba(41,182,246,0.12)',ownBorder:'rgba(41,182,246,0.35)',traded:'rgba(41,182,246,0.06)',tradedBorder:'rgba(41,182,246,0.2)'},
  };
  const allRounds=[...new Set(PICKS.map(p=>p.round))].sort();
  const years=[...new Set(myPicks.map(p=>p.year))].sort();
  let html='';
  years.forEach(year=>{
    const s=yearStyles[year]||yearStyles[2026];
    const yearPicks=myPicks.filter(p=>p.year===year);
    html+=`<div style="margin-bottom:28px;border:1px solid ${s.ownBorder};border-radius:14px;overflow:hidden;">
      <div style="background:${s.header};padding:12px 16px;display:flex;align-items:center;gap:10px;border-bottom:1px solid ${s.ownBorder};">
        <div style="width:10px;height:10px;border-radius:50%;background:${s.dot};"></div>
        <div style="font-size:14px;font-weight:800;color:${s.label};font-family:'Playfair Display',serif;">${year}</div>
        <div style="font-size:11px;color:var(--muted);background:var(--surface2);padding:2px 8px;border-radius:20px;margin-left:4px;font-weight:600;">${yearPicks.length} pick${yearPicks.length!==1?'s':''}</div>
      </div>
      <table style="width:100%;border-collapse:collapse;">
        <thead><tr>
          <th style="padding:8px 12px;text-align:left;font-size:10px;font-weight:700;letter-spacing:1px;color:var(--muted);border-bottom:1px solid var(--border);background:var(--surface2);">ROUND</th>
          <th style="padding:8px 12px;text-align:left;font-size:10px;font-weight:700;letter-spacing:1px;color:var(--muted);border-bottom:1px solid var(--border);background:var(--surface2);">ORIGIN</th>
          <th style="padding:8px 12px;text-align:left;font-size:10px;font-weight:700;letter-spacing:1px;color:var(--muted);border-bottom:1px solid var(--border);background:var(--surface2);">STATUS</th>
        </tr></thead><tbody>`;
    allRounds.forEach(round=>{
      const roundPicks=yearPicks.filter(p=>p.round===round).sort((a,b)=>a.originalOwner-b.originalOwner);
      roundPicks.forEach((pick,i)=>{
        const traded=pick.originalOwner!==pick.currentOwner;
        const orig=teamMap[pick.originalOwner];
        html+=`<tr style="border-bottom:1px solid var(--border);">
          <td style="padding:10px 12px;font-size:12px;font-weight:700;color:${s.label};white-space:nowrap;background:var(--surface);">${i===0?`R${round}`:''}</td>
          <td style="padding:10px 12px;font-size:13px;color:var(--text);background:var(--surface);">${orig.name}</td>
          <td style="padding:10px 12px;background:var(--surface);">
            <span style="font-size:11px;font-weight:700;padding:3px 10px;border-radius:20px;background:${traded?s.traded:s.own};border:1px solid ${traded?s.tradedBorder:s.ownBorder};color:${s.label};">
              ${traded?'Traded'+(pick.note?' ('+pick.note+')':''):'Own'}
            </span>
          </td>
        </tr>`;
      });
    });
    html+='</tbody></table></div>';
  });
  return html;
}

function showDraftboard(){
  const years=[...new Set(PICKS.map(p=>p.year))].sort();
  const rounds=[...new Set(PICKS.map(p=>p.round))].sort();
  let html='';
  years.forEach(year=>{
    html+=`<h3 style="margin:24px 0 12px;font-size:16px;font-family:'Playfair Display',serif;color:var(--text);">${year} Draft</h3>`;
    if(DRAFT_NOTES[year]) html+=`<div style="background:var(--accent-light);border:1px solid var(--border);border-left:3px solid var(--accent);border-radius:8px;padding:12px 16px;margin-bottom:14px;font-size:13px;color:var(--muted);">${DRAFT_NOTES[year]}</div>`;
    html+=`<table><thead><tr><th class="round-label">Rnd</th>`;
    TEAMS.forEach(t=>{html+=`<th title="${t.owner}">${t.name.split(' ')[0]}</th>`;});
    html+='</tr></thead><tbody>';
    rounds.forEach(round=>{
      html+=`<tr><td style="font-weight:700;color:var(--muted);white-space:nowrap;background:var(--surface);">R${round}</td>`;
      TEAMS.forEach(t=>{
        const pick=PICKS.find(p=>p.year===year&&p.round===round&&p.originalOwner===t.id);
        if(!pick){html+=`<td><span class="pick-empty">—</span></td>`;return;}
        const traded=pick.currentOwner!==pick.originalOwner;
        const holder=teamMap[pick.currentOwner];
        html+=`<td><div class="pick-cell ${traded?'pick-traded-cell':'pick-own-cell'}">${traded?'→ '+holder.name.split(' ')[0]:'Keep'}</div></td>`;
      });
      html+='</tr>';
    });
    html+='</tbody></table>';
  });
  document.getElementById('draftboardContent').innerHTML=html;
  navigate('draftboardPage');
}

// Which group each page belongs to (for group-button highlighting)
const SUBNAV_PAGES = {
  homePage:'home', draftboardPage:'draftboard', draft26Page:'draft26',
  duelPage:'duel', duelBoardPage:'duelboard', duelSettingsPage:'duelsettings',
  lotteryPage:'lottery', rankingsPage:'rankings', hashtagRankingsPage:'rankings',
  bestAvailPage:'bestavail', analyticsPage:'analytics', tradePage:'trade',
  tradeFinderPage:'tradefinder', tradeHistoryPage:'tradehistory', nbaTradesPage:'nbatrades', adminSettingsPage:'adminsettings', standingsPage:'standings', rulesPage:'rules',
};

const SNAV_GROUP = {
  draftboard: 'snavDraft', draft26: 'snavDraft', lottery: 'snavDraft',
  duel: 'snavDuel', duelboard: 'snavDuel', duelsettings: 'snavDuel',
  rankings:   'snavAnalytics', bestavail: 'snavAnalytics', analytics: 'snavAnalytics',
  trade:      'snavTrade', tradefinder: 'snavTrade', tradehistory: 'snavTrade',
};

// Reverse map: hash value → pageId
const HASH_TO_PAGE = Object.fromEntries(
  Object.entries(SUBNAV_PAGES).map(([pageId, hash]) => [hash, pageId])
);
// Pages not in SUBNAV_PAGES that still need hash routing
const EXTRA_HASH_TO_PAGE = {
  'home': 'homePage',
  'adminsettings': 'adminSettingsPage',
  'nbatrades': 'nbaTradesPage',
};

function _applyPage(pageId) {
  document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
  const el = document.getElementById(pageId);
  if (!el) { document.getElementById('homePage').classList.add('active'); return; }
  el.classList.add('active');
  document.getElementById('backBtn').style.display = pageId !== 'homePage' ? 'flex' : 'none';
  const pageKey = SUBNAV_PAGES[pageId] || '';
  document.querySelectorAll('.snav-single').forEach(el =>
    el.classList.toggle('active', el.dataset.page === pageKey));
  document.querySelectorAll('.snav-group-btn').forEach(el => el.classList.remove('active'));
  document.querySelectorAll('.snav-dropdown-item').forEach(el =>
    el.classList.toggle('active', el.dataset.page === pageKey));
  const groupId = SNAV_GROUP[pageKey];
  if (groupId) { const g = document.getElementById(groupId); if (g) g.classList.add('active'); }
  const activeBtn = document.querySelector('.subnav-mobile-btn[data-page="'+pageKey+'"]');
  const label = document.getElementById('mobileNavLabel');
  if (label) label.textContent = activeBtn ? activeBtn.textContent : '🌮 League Tools';
  window.scrollTo(0, 0);
}

function navigate(pageId, opts = {}) {
  const hash = SUBNAV_PAGES[pageId] || pageId.replace('Page','').toLowerCase();
  try {
    if (window.location.hash !== '#' + hash) {
      if (opts.replace) {
        history.replaceState({ pageId }, '', '#' + hash);
      } else {
        history.pushState({ pageId }, '', '#' + hash);
      }
    }
  } catch(e) { /* iframe preview — history API blocked, no-op */ }
  _applyPage(pageId);
}

function _pageIdFromHash(hash) {
  const key = (hash || '').replace('#', '');
  if (!key || key === 'home') return 'homePage';
  return HASH_TO_PAGE[key] || EXTRA_HASH_TO_PAGE[key] || 'homePage';
}

// Browser back/forward
window.addEventListener('popstate', (e) => {
  const pageId = e.state?.pageId || _pageIdFromHash(window.location.hash);
  _applyPage(pageId);
  // Re-run page-specific renderers
  if (pageId === 'standingsPage') setTimeout(renderStandingsChart, 50);
  if (pageId === 'nbaTradesPage') renderNbaTrades();
  if (pageId === 'adminSettingsPage') _asInit();
  if (pageId === 'tradeHistoryPage') renderTradeHistory();
});

function toggleMobileNav() {
  const dd = document.getElementById('mobileNavDropdown');
  const arrow = document.getElementById('mobileNavArrow');
  const open = dd.classList.toggle('open');
  arrow.style.transform = open ? 'rotate(180deg)' : '';
}

function closeMobileNav() {
  document.getElementById('mobileNavDropdown').classList.remove('open');
  document.getElementById('mobileNavArrow').style.transform = '';
}
function goHome(){navigate('homePage');}
function showRules(){navigate('rulesPage');}
function showStandings(){navigate('standingsPage');setTimeout(renderStandingsChart,50);}
function toggleRule(header){header.parentElement.classList.toggle('collapsed');}
