//  ESPN SYNC — AUTO TRADE DETECTION
// ============================================================
function _detectAndSaveEspnTrades(newRosters) {
  // Build old ownership map: playerName → fantasyTeamId
  const oldOwnership = {};
  Object.keys(ROSTERS).forEach(tid => {
    (ROSTERS[parseInt(tid)] || []).forEach(p => { oldOwnership[p.name] = parseInt(tid); });
  });

  // Build new ownership map
  const newOwnership = {};
  Object.keys(newRosters).forEach(tid => {
    (newRosters[parseInt(tid)] || []).forEach(p => { newOwnership[p.name] = parseInt(tid); });
  });

  // Find players who changed fantasy teams
  // Group by (fromTeam, toTeam) pair to bundle multi-player trades
  const tradeMap = {}; // key: "fromId-toId" → {fromId, toId, players[]}
  Object.keys(newOwnership).forEach(name => {
    const oldTid = oldOwnership[name];
    const newTid = newOwnership[name];
    if (oldTid === undefined || newTid === undefined) return;
    if (oldTid === newTid) return; // no change

    // Both sides of the swap
    const key = [Math.min(oldTid, newTid), Math.max(oldTid, newTid)].join('-');
    if (!tradeMap[key]) tradeMap[key] = { teamA: null, teamB: null, playersA: [], playersB: [] };
    const entry = tradeMap[key];
    const [tA, tB] = key.split('-').map(Number);
    entry.teamA = tA; entry.teamB = tB;
    if (oldTid === tA) {
      entry.playersA.push(name); // went from A to B
    } else {
      entry.playersB.push(name); // went from B to A
    }
  });

  if (!Object.keys(tradeMap).length) return;

  // Helper: build serialized player object for trade history
  function makePlayerObj(name, ownerTid) {
    const dp = DYNASTY_PLAYERS.find(p => p[1] === name || normalizeName(p[1]) === normalizeName(name));
    const rank = dp ? dp[0] : null;
    const dob  = dp ? dp[4] : null;
    const team = TEAMS.find(t => t.id === ownerTid);
    return {
      isPick: false,
      rank,
      name,
      nba:  (newRosters[ownerTid] || []).find(p => p.name === name)?.team || '',
      pos:  (newRosters[ownerTid] || []).find(p => p.name === name)?.pos || '',
      dob,
      ownerName: team?.name || 'Team ' + ownerTid,
    };
  }

  // Compute values for all three modes
  function computeForMode(players, mode) {
    const orig = TRADE_MODE; TRADE_MODE = mode;
    const val  = tradeSideValue(players);
    TRADE_MODE = orig;
    return val;
  }

  function computeFrozen(playersA, playersB) {
    const modes = ['dynasty', 'raw', 'winnow'];
    const frozen = {};
    modes.forEach(mode => {
      const vA = computeForMode(playersA, mode);
      const vB = computeForMode(playersB, mode);
      const tot = vA + vB; const pA = tot > 0 ? vA / tot * 100 : 50;
      const d = Math.abs(pA - 50);
      let verdict, cls;
      if (d < 5)       { verdict = 'Fair Trade';              cls = 'fair'; }
      else if (d < 12) { verdict = vA > vB ? 'Slight Edge: Side A' : 'Slight Edge: Side B'; cls = 'slight'; }
      else             { verdict = vA > vB ? 'Side A Wins Big' : 'Side B Wins Big'; cls = 'lopsided'; }
      frozen[mode] = { valA: vA, valB: vB, verdict, cls, pctA: pA.toFixed(1), pctB: (100 - pA).toFixed(1) };
    });
    return frozen;
  }

  const existingTrades = loadTradeHistory();
  const now = new Date();
  const dateStr = now.toLocaleDateString('de-DE', { month: 'long', year: 'numeric' });

  Object.values(tradeMap).forEach(({ teamA, teamB, playersA, playersB }) => {
    if (!playersA.length && !playersB.length) return;

    // Side A = team A's outgoing players (going to B), Side B = team B's outgoing (going to A)
    const sideAObjs = playersA.map(name => makePlayerObj(name, teamA));
    const sideBObjs = playersB.map(name => makePlayerObj(name, teamB));

    // Need at least one player on each side for a real trade entry
    if (!sideAObjs.length || !sideBObjs.length) return;

    const frozen = computeFrozen(sideAObjs, sideBObjs);
    const teamAName = TEAMS.find(t => t.id === teamA)?.name || 'Team ' + teamA;
    const teamBName = TEAMS.find(t => t.id === teamB)?.name || 'Team ' + teamB;

    const trade = {
      id:        Date.now() + Math.random(),
      date:      dateStr,
      savedMode: 'dynasty',
      source:    'espn-sync', // mark as auto-detected
      teamAName,
      teamBName,
      sideA:     sideAObjs,
      sideB:     sideBObjs,
      frozen,
      hasMissingPicks: true, // Admin can add picks manually
    };

    // Avoid duplicates: skip if same players already in recent trade (within 7 days)
    const recentNames = new Set(
      existingTrades
        .filter(t => {
          const d = new Date(t.id);
          return (now - d) < 7 * 24 * 60 * 60 * 1000;
        })
        .flatMap(t => [...(t.sideA||[]), ...(t.sideB||[])].map(p => p.name))
    );
    const allNewNames = [...sideAObjs, ...sideBObjs].map(p => p.name);
    if (allNewNames.every(n => recentNames.has(n))) return; // already logged

    existingTrades.unshift(trade);
  });

  saveTradeHistory(existingTrades);
  if (typeof renderTradeHistory === 'function') renderTradeHistory();
}

const SYNC_INTERVAL_MS = 6 * 60 * 60 * 1000;

// ── CORS-Proxy: ESPN API direkt blockt CORS, also über eigenen Cloudflare Worker
// Eigener Worker als primäre Quelle, öffentliche Proxies als Fallback.
const ESPN_WORKER_URL = 'https://pizzaratops.buniliga.workers.dev/';

async function _fetchEspnViaProxy(espnUrl) {
  const proxies = [
    { name: 'cf-worker',    build: u => `${ESPN_WORKER_URL}?url=${encodeURIComponent(u)}` },
    { name: 'codetabs',     build: u => `https://api.codetabs.com/v1/proxy/?quest=${encodeURIComponent(u)}` },
    { name: 'corsproxy.io', build: u => `https://corsproxy.io/?${encodeURIComponent(u)}` },
    { name: 'allorigins',   build: u => `https://api.allorigins.win/raw?url=${encodeURIComponent(u)}` },
  ];
  const errors = [];
  for (const { name, build } of proxies) {
    try {
      const proxyUrl = build(espnUrl);
      console.log('[ESPN Sync] Trying', name, '…');
      const res = await fetch(proxyUrl, { credentials: 'omit' });
      if (!res.ok) {
        errors.push(`${name}: HTTP ${res.status}`);
        continue;
      }
      const text = await res.text();
      let parsed;
      try {
        parsed = JSON.parse(text);
      } catch {
        errors.push(`${name}: nicht-JSON Antwort`);
        continue;
      }
      // allorigins wraps in {contents: "..."} when /get is used; unwrap if seen
      if (parsed && typeof parsed === 'object' && 'contents' in parsed && typeof parsed.contents === 'string') {
        parsed = JSON.parse(parsed.contents);
      }
      console.log('[ESPN Sync] Success via', name);
      return parsed;
    } catch (err) {
      errors.push(`${name}: ${err.message}`);
    }
  }
  throw new Error('Alle Proxies tot. Letzte Fehler: ' + errors.join(' | '));
}

async function espnSync(auto = false) {
  const btn = document.getElementById('espnSyncBtn');
  if (auto) {
    const last = parseInt(localStorage.getItem('espnLastSyncTs') || '0');
    if (Date.now() - last < SYNC_INTERVAL_MS) return;
  }
  if (btn) { btn.textContent = '⏳ Syncing…'; btn.disabled = true; }
  try {
    const espnUrl = `https://lm-api-reads.fantasy.espn.com/apis/v3/games/fba/seasons/${ESPN_SEASON}/segments/0/leagues/${ESPN_LEAGUE_ID}?view=mRoster&view=mTeam`;
    const data = await _fetchEspnViaProxy(espnUrl);
    // ESPN nutzt eigene Team-IDs (1-14, inkl. 2 Taxi Squads). Nur Teams behalten,
    // die im ESPN_TO_TT_TEAM-Mapping stehen, und auf interne TT-IDs umsetzen.
    const teams = (data.teams || []).filter(t => ESPN_TO_TT_TEAM[t.id] !== undefined);
    if (!teams.length) throw new Error('Keine Teams in ESPN-Antwort');

    const newRosters = {};
    teams.forEach(espnTeam => {
      const ttId    = ESPN_TO_TT_TEAM[espnTeam.id];  // ESPN-ID → TT-ID
      if (!ttId) return;
      const entries = espnTeam.roster?.entries || [];
      newRosters[ttId] = entries.map(entry => {
        const pi     = entry.playerPoolEntry || {};
        const p      = pi.player || {};
        const name   = p.fullName || null;
        const posId  = (p.eligibleSlots || [])[0] ?? 0;
        const pos    = ESPN_POS_MAP[posId] || 'SF';
        const nbaTeam = ESPN_NBA_MAP[p.proTeamId] || 'FA';
        return name ? { name, pos, team: nbaTeam } : null;
      }).filter(Boolean);
    });

    Object.keys(newRosters).forEach(tid => {
      const t = parseInt(tid);
      ROSTERS[t] = newRosters[tid];
      _ORIGINAL_ROSTERS[t] = newRosters[tid].map(p => ({...p}));
    });

    // ── Detect trades by comparing old vs new roster ownership ──────────────
    const isFirstSync = !localStorage.getItem('espnLastSyncTs');
    if (!isFirstSync) {
      _detectAndSaveEspnTrades(newRosters);
    }

    saveRosterOverrides({});
    const total = Object.values(newRosters).reduce((s,r) => s + r.length, 0);
    const now   = new Date().toLocaleString('de-DE', {dateStyle:'short', timeStyle:'short'});

    _applyRosterOverrides();
    if (typeof renderHome === 'function') renderHome();
    if (typeof renderTab  === 'function') renderTab();

    localStorage.setItem('espnLastSync', now);
    localStorage.setItem('espnLastSyncTs', String(Date.now()));

    if (btn) { btn.textContent = '✅ ' + now; btn.disabled = false; }
    if (!auto && typeof toast === 'function') toast('✅ Sync: ' + total + ' Spieler (' + now + ')');
    fetchNbaTrades().catch(e => console.warn('NBA trades:', e));
  } catch(err) {
    console.error('ESPN Sync:', err);
    if (btn) { btn.textContent = '🔄 ESPN Sync'; btn.disabled = false; }
    if (!auto && typeof toast === 'function') toast('❌ Sync: ' + err.message);
  }
}

async function fetchNbaTrades() {
  // Der /trades-Endpoint existiert in der balldontlie v1-API nicht mehr
  // (neue URL-Struktur: /nba/v1/... — aber kein Trades-Endpoint verfügbar).
  // Funktion deaktiviert bis ein Ersatz gefunden wird.
  return;
}

function initEspnSyncBtn() {
  const last = localStorage.getItem('espnLastSync');
  const btn  = document.getElementById('espnSyncBtn');
  if (btn && last) btn.textContent = '🔄 ESPN (' + last + ')';
}

// Apply on page load so home screen team strength badges are correct
_applyRosterOverrides();
