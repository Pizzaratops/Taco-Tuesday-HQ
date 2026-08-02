// ============================================================
//  MATCHUP PLANER
// ============================================================
//  Seite #matchupPage. Stellt zwei Liga-Kader ueber alle neun
//  Kategorien gegenueber und schaetzt, wie das H2H Duell ausgeht.
//
//  Datenquellen (beide liefern Pro-Spiel-Schnitte, deshalb laesst
//  sich direkt auf Rohwert-Ebene mischen statt auf Rang-Ebene):
//
//    Rankings    — tatsaechlich gespielte Stats. Prioritaet:
//                  LIVESCORES_AGGREGATE.month["nba"] (juengster
//                  Stichtag) → OFFSEASON_RANKINGS →
//                  LAST_SEASON_STATS_2025_26 als Rueckfall.
//    Projections — LIVE_PROJECTIONS (Baseline + Live Blend).
//
//  Der Basis-Regler mischt beide Quellen pro Kategorie linear:
//    wert = w × Projection + (1 − w) × Ranking
//  Hat ein Spieler nur eine der beiden Quellen, wird diese allein
//  genommen (und in der Kaderspalte entsprechend markiert).
//
//  BEWUSST NICHT ENTHALTEN (Phase 1):
//  Es gibt keinen echten NBA Spielplan. "Spiele je Spieler" ist ein
//  frei einstellbarer Pauschalwert, kein Abruf, welcher Spieler an
//  welchem Tag tatsaechlich antritt. Die Kategorie-Summen sind
//  entsprechend Erwartungswerte, keine Prognose eines konkreten
//  Spielkalenders. Ein echtes Games-Left kaeme in Phase 2 dazu.
//
//  Der ESPN Import betrifft NUR den Liga-Spielplan (welches Team
//  spielt in Woche N gegen welches), nicht den NBA Spielplan.
//  Genutzt wird _fetchEspnViaProxy() aus js/espn-trade-detect.js —
//  dieses Script muss deshalb vorher geladen sein.
// ============================================================

// ─── Kategorien ──────────────────────────────────────────────
//  cv = Variationskoeffizient, also die typische Streuung eines
//  Spielers von Spiel zu Spiel relativ zu seinem eigenen Schnitt.
//  Steals und Blocks schwanken bei kleinem Volumen prozentual am
//  staerksten, Punkte am wenigsten. Diese Werte steuern nur die
//  Win-Wahrscheinlichkeit, nicht die angezeigten Summen.
const MP_CATS = [
  { key:'pts',   label:'PTS', type:'count', cv:0.35, dec:0 },
  { key:'reb',   label:'REB', type:'count', cv:0.42, dec:0 },
  { key:'ast',   label:'AST', type:'count', cv:0.45, dec:0 },
  { key:'stl',   label:'STL', type:'count', cv:0.75, dec:1 },
  { key:'blk',   label:'BLK', type:'count', cv:0.85, dec:1 },
  { key:'tpm',   label:'3PM', type:'count', cv:0.60, dec:1 },
  { key:'to',    label:'TO',  type:'count', cv:0.55, dec:1, invert:true, note:'weniger ist besser' },
  { key:'fgPct', label:'FG%', type:'pct',   sd:2.2,  dec:1 },
  { key:'ftPct', label:'FT%', type:'pct',   sd:4.0,  dec:1 },
];

// Gewichte fuer die Kaderreihenfolge — identisch zu den Rolling
// Rankings, damit "meine besten Zehn" hier dasselbe heisst wie dort.
const MP_WEIGHTS = {
  pts:0.9, reb:1, ast:1, stl:0.75, blk:0.75, tpm:0.75,
  fgImpact:1, ftImpact:0.85, to:0.25,
};

// ─── Zustand ─────────────────────────────────────────────────
const MP_STATE = {
  teamA: null,
  teamB: null,
  projWeight: 0.5,   // 0 = nur Rankings, 1 = nur Projections
  rankSourceId: null,// null = Quelle mit der besten Kaderabdeckung
  gamesPerWeek: 3.5,
  lineupSize: 10,
  schedule: null,    // { season, ts, currentPeriod, matchups: [] }
  index: null,       // Ergebnis von _mpBuildIndex()
};

const MP_SCHED_KEY = 'tthqMpSchedule';
const MP_PREFS_KEY = 'tthqMpPrefs';

// ============================================================
//  1 — Statistik-Index aufbauen
// ============================================================

function _mpNum(v) { const n = Number(v); return Number.isFinite(n) ? n : 0; }

// Vereinheitlicht beide Quellformate auf dieselben Feldnamen.
// Rankings-Quellen nutzen "to", LIVE_PROJECTIONS nutzt "tov".
function _mpShape(o) {
  if (!o) return null;
  return {
    min:   _mpNum(o.min),
    pts:   _mpNum(o.pts),
    reb:   _mpNum(o.reb),
    ast:   _mpNum(o.ast),
    stl:   _mpNum(o.stl),
    blk:   _mpNum(o.blk),
    tpm:   _mpNum(o.tpm),
    to:    _mpNum(o.to !== undefined ? o.to : o.tov),
    fgPct: _mpNum(o.fgPct),
    ftPct: _mpNum(o.ftPct),
  };
}

// Juengster Stichtag im Monatsfenster der regulaeren Saison.
function _mpLatestRegSeason() {
  if (typeof LIVESCORES_AGGREGATE === 'undefined') return null;
  const byLeague = LIVESCORES_AGGREGATE.month && LIVESCORES_AGGREGATE.month['nba'];
  if (!byLeague) return null;
  const dates = Object.keys(byLeague).sort();
  if (!dates.length) return null;
  const snap = byLeague[dates[dates.length - 1]];
  if (!snap || !Array.isArray(snap.players) || !snap.players.length) return null;
  return { snap, date: dates[dates.length - 1] };
}

/**
 * Alle verfuegbaren Rankings-Quellen mit ihrer Abdeckung im Liga-Kader.
 *
 * Die Abdeckung ist der entscheidende Punkt: waehrend der Off-Season
 * ist die einzige "frische" Quelle die Summer League, in der fast nur
 * Rookies und Fringe-Spieler antreten. Ueber einen echten Liga-Kader
 * deckt sie kaum zehn Prozent ab, waehrend die Vorsaison praktisch
 * jeden Spieler kennt. Deshalb wird nicht stur nach Aktualitaet
 * sortiert, sondern die Quelle mit der besten Abdeckung vorgewaehlt
 * und die Abdeckung offen angezeigt.
 */
function _mpAvailableRankSources() {
  const rostered = new Set(_mpAllRostered().map(p => _mpKey(p.name)));
  const out = [];

  const reg = _mpLatestRegSeason();
  if (reg) {
    out.push({
      id: 'reg',
      label: `Reguläre Saison, Monatsfenster bis ${reg.date}`,
      short: 'Reg. Saison',
      players: reg.snap.players,
      leagueAvg: reg.snap.leagueAvg || { fg: 46, ft: 78 },
    });
  }
  if (typeof LAST_SEASON_STATS_2025_26 !== 'undefined' && LAST_SEASON_STATS_2025_26.length) {
    out.push({
      id: 'last',
      label: 'Vorsaison 2025/26, komplette Saison',
      short: 'Vorsaison',
      players: LAST_SEASON_STATS_2025_26,
      leagueAvg: { fg: 46.5, ft: 78 },
    });
  }
  if (typeof OFFSEASON_RANKINGS !== 'undefined' && OFFSEASON_RANKINGS.players && OFFSEASON_RANKINGS.players.length) {
    out.push({
      id: 'off',
      label: `Off Season, ${OFFSEASON_RANKINGS.windowStart} bis ${OFFSEASON_RANKINGS.windowEnd}`,
      short: 'Off Season',
      players: OFFSEASON_RANKINGS.players,
      leagueAvg: OFFSEASON_RANKINGS.leagueAvg || { fg: 43, ft: 71 },
    });
  }

  const total = rostered.size || 1;
  out.forEach(s => {
    const keys = new Set(s.players.map(p => _mpKey(p.name)));
    let hit = 0;
    rostered.forEach(k => { if (keys.has(k)) hit++; });
    s.covered = hit;
    s.coverage = hit / total;
  });
  return out;
}

// Aktuell gewaehlte Quelle, sonst die mit der besten Kaderabdeckung.
function _mpRankingSource() {
  const all = _mpAvailableRankSources();
  if (!all.length) return null;
  if (MP_STATE.rankSourceId) {
    const hit = all.find(s => s.id === MP_STATE.rankSourceId);
    if (hit) return hit;
  }
  return all.slice().sort((a, b) => b.coverage - a.coverage)[0];
}

// Alle Spieler, die irgendwo in der Liga gerostert sind. Dieser Pool
// ist die Grundgesamtheit fuer die Z-Score-Berechnung, damit die
// Kaderreihenfolge nicht davon abhaengt, wen man gerade vergleicht.
function _mpAllRostered() {
  const src = (typeof ROSTERS !== 'undefined' && ROSTERS) ? ROSTERS : (typeof ROSTERS_LIVE !== 'undefined' ? ROSTERS_LIVE : {});
  const out = [];
  Object.keys(src).forEach(tid => {
    (src[tid] || []).forEach(p => out.push({ ...p, teamId: parseInt(tid, 10) }));
  });
  return out;
}

function _mpRoster(teamId) {
  const src = (typeof ROSTERS !== 'undefined' && ROSTERS) ? ROSTERS : (typeof ROSTERS_LIVE !== 'undefined' ? ROSTERS_LIVE : {});
  return (src[teamId] || []).map(p => ({ ...p }));
}

function _mpKey(name) {
  return (typeof normalizeName === 'function') ? normalizeName(name) : String(name || '').toLowerCase().trim();
}

/**
 * Baut den kompletten Index fuer die aktuelle Basis-Gewichtung.
 * Muss neu laufen, wenn sich projWeight oder die Rosters aendern.
 */
function _mpBuildIndex() {
  const rankSrc = _mpRankingSource();
  const rankMap = new Map();
  if (rankSrc) {
    rankSrc.players.forEach(p => {
      const k = _mpKey(p.name);
      if (k && !rankMap.has(k)) rankMap.set(k, _mpShape(p));
    });
  }

  const projMap = new Map();
  if (typeof LIVE_PROJECTIONS !== 'undefined') {
    Object.keys(LIVE_PROJECTIONS).forEach(name => {
      const k = _mpKey(name);
      if (k && !projMap.has(k)) projMap.set(k, _mpShape(LIVE_PROJECTIONS[name]));
    });
  }

  const w = MP_STATE.projWeight;
  const leagueAvg = (rankSrc && rankSrc.leagueAvg) || { fg: 46, ft: 78 };

  // Blend je Spieler des Liga-Pools
  const pool = [];
  _mpAllRostered().forEach(p => {
    const k = _mpKey(p.name);
    const r = rankMap.get(k) || null;
    const j = projMap.get(k) || null;
    if (!r && !j) {
      pool.push({ ...p, key: k, stats: null, src: 'none' });
      return;
    }
    let stats, src;
    if (r && j) {
      stats = {};
      Object.keys(r).forEach(f => { stats[f] = w * j[f] + (1 - w) * r[f]; });
      src = 'both';
    } else if (j) { stats = { ...j }; src = 'proj'; }
    else          { stats = { ...r }; src = 'rank'; }
    pool.push({ ...p, key: k, stats, src });
  });

  // Z-Scores ueber den Liga-Pool. Nur Spieler mit Daten zaehlen in
  // Mittelwert und Streuung, sonst zieht jeder Spieler ohne Quelle
  // den Durchschnitt kuenstlich Richtung null.
  const withData = pool.filter(p => p.stats);
  const counting = ['pts','reb','ast','stl','blk','tpm','to'];
  const stat = {};
  counting.forEach(c => {
    const vals = withData.map(p => p.stats[c]);
    stat[c] = _mpMeanSd(vals);
  });
  // FG und FT als Impact: Prozentabweichung gewichtet mit Volumen
  // (hier Minuten als Naeherung, weil die Rankings-Quellen keine
  // Wurfversuche mitliefern).
  const fgImp = withData.map(p => (p.stats.fgPct - leagueAvg.fg) / 100 * p.stats.min);
  const ftImp = withData.map(p => (p.stats.ftPct - leagueAvg.ft) / 100 * p.stats.min);
  stat.fgImpact = _mpMeanSd(fgImp);
  stat.ftImpact = _mpMeanSd(ftImp);

  withData.forEach(p => {
    const z = {};
    counting.forEach(c => {
      z[c] = stat[c].sd ? (p.stats[c] - stat[c].mean) / stat[c].sd : 0;
    });
    z.to = -z.to; // Ballverluste sind negativ zu werten
    z.fgImpact = stat.fgImpact.sd ? (((p.stats.fgPct - leagueAvg.fg) / 100 * p.stats.min) - stat.fgImpact.mean) / stat.fgImpact.sd : 0;
    z.ftImpact = stat.ftImpact.sd ? (((p.stats.ftPct - leagueAvg.ft) / 100 * p.stats.min) - stat.ftImpact.mean) / stat.ftImpact.sd : 0;
    p.z = z;
    p.composite = Object.keys(MP_WEIGHTS).reduce((s, c) => s + (z[c] || 0) * MP_WEIGHTS[c], 0);
  });
  pool.filter(p => !p.stats).forEach(p => { p.z = null; p.composite = null; });

  const byKey = new Map();
  pool.forEach(p => { if (!byKey.has(p.key)) byKey.set(p.key, p); });

  const nBoth = pool.filter(p => p.src === 'both').length;
  const nProj = pool.filter(p => p.src === 'proj').length;
  const nRank = pool.filter(p => p.src === 'rank').length;
  const nNone = pool.filter(p => p.src === 'none').length;

  return {
    pool, byKey, leagueAvg,
    rankId: rankSrc ? rankSrc.id : null,
    rankLabel: rankSrc ? rankSrc.label : 'keine gespielten Stats verfügbar',
    rankShort: rankSrc ? rankSrc.short : 'keine',
    rankCount: rankMap.size,
    projCount: projMap.size,
    counts: { both: nBoth, proj: nProj, rank: nRank, none: nNone, total: pool.length },
  };
}

function _mpMeanSd(vals) {
  if (!vals.length) return { mean: 0, sd: 0 };
  const mean = vals.reduce((a, b) => a + b, 0) / vals.length;
  const varr = vals.reduce((a, b) => a + (b - mean) * (b - mean), 0) / vals.length;
  return { mean, sd: Math.sqrt(varr) };
}

// ============================================================
//  2 — Team-Auswertung
// ============================================================

function _mpTeamBreakdown(teamId, index) {
  const roster = _mpRoster(teamId);
  const players = roster.map(p => {
    const k = _mpKey(p.name);
    const hit = index.byKey.get(k);
    return {
      name: p.name, pos: p.pos, nbaTeam: p.team,
      stats: hit ? hit.stats : null,
      composite: hit ? hit.composite : null,
      src: hit ? hit.src : 'none',
    };
  });

  // Spieler ohne jede Datenquelle koennen nichts beitragen und
  // landen deshalb immer auf der Bank, egal wie gross das Lineup ist.
  const usable = players.filter(p => p.stats).sort((a, b) => b.composite - a.composite);
  const missing = players.filter(p => !p.stats);

  const starters = usable.slice(0, MP_STATE.lineupSize);
  const bench = usable.slice(MP_STATE.lineupSize).concat(missing);

  const g = MP_STATE.gamesPerWeek;
  const totals = {};
  const sds = {};

  MP_CATS.filter(c => c.type === 'count').forEach(c => {
    let sum = 0, varSum = 0;
    starters.forEach(p => {
      const per = p.stats[c.key];
      sum += per * g;
      // Varianz der Wochensumme eines Spielers: g Spiele, je mit
      // Standardabweichung cv × Schnitt.
      varSum += g * Math.pow(c.cv * per, 2);
    });
    totals[c.key] = sum;
    sds[c.key] = Math.sqrt(varSum);
  });

  // Prozente als minutengewichteter Schnitt der Starter. Das ist eine
  // Naeherung: exakt waere eine Gewichtung nach Wurfversuchen, die in
  // den Rankings-Quellen aber nicht enthalten sind.
  const minSum = starters.reduce((s, p) => s + p.stats.min, 0) || 1;
  ['fgPct','ftPct'].forEach(k => {
    totals[k] = starters.reduce((s, p) => s + p.stats[k] * p.stats.min, 0) / minSum;
  });
  sds.fgPct = MP_CATS.find(c => c.key === 'fgPct').sd;
  sds.ftPct = MP_CATS.find(c => c.key === 'ftPct').sd;

  return { teamId, players, starters, bench, totals, sds, missingCount: missing.length };
}

// Normalverteilung, Abramowitz und Stegun 7.1.26
function _mpNormCdf(x) {
  const s = x < 0 ? -1 : 1;
  const z = Math.abs(x) / Math.SQRT2;
  const t = 1 / (1 + 0.3275911 * z);
  const y = 1 - (((((1.061405429 * t - 1.453152027) * t) + 1.421413741) * t - 0.284496736) * t + 0.254829592) * t * Math.exp(-z * z);
  return 0.5 * (1 + s * y);
}

function _mpCompare(a, b) {
  const rows = MP_CATS.map(c => {
    const va = a.totals[c.key], vb = b.totals[c.key];
    const sd = Math.sqrt(a.sds[c.key] * a.sds[c.key] + b.sds[c.key] * b.sds[c.key]);
    let diff = va - vb;
    if (c.invert) diff = -diff;              // bei TO gewinnt der kleinere Wert
    const p = sd > 0 ? _mpNormCdf(diff / sd) : (diff > 0 ? 1 : diff < 0 ? 0 : 0.5);
    return { cat: c, va, vb, diff, prob: p };
  });
  const expA = rows.reduce((s, r) => s + r.prob, 0);
  return { rows, expA, expB: rows.length - expA };
}

// ============================================================
//  3 — ESPN Liga-Spielplan
// ============================================================

function _mpLoadCachedSchedule() {
  try {
    const raw = localStorage.getItem(MP_SCHED_KEY);
    if (!raw) return null;
    const obj = JSON.parse(raw);
    if (typeof ESPN_SEASON !== 'undefined' && obj.season !== ESPN_SEASON) return null;
    return obj;
  } catch (e) { return null; }
}

async function mpFetchSchedule() {
  const btn = document.getElementById('mpSchedBtn');
  const st = document.getElementById('mpSchedStatus');
  if (typeof _fetchEspnViaProxy !== 'function') {
    if (st) { st.className = 'mp-status err'; st.textContent = 'ESPN Anbindung nicht geladen. Seite neu laden und noch einmal versuchen.'; }
    return;
  }
  if (btn) { btn.disabled = true; btn.textContent = '⏳ Lade…'; }
  if (st) { st.className = 'mp-status'; st.textContent = 'Frage ESPN nach dem Liga-Spielplan…'; }

  try {
    const url = `https://lm-api-reads.fantasy.espn.com/apis/v3/games/fba/seasons/${ESPN_SEASON}/segments/0/leagues/${ESPN_LEAGUE_ID}?view=mMatchupScore`;
    const data = await _fetchEspnViaProxy(url);

    const matchups = [];
    (data.schedule || []).forEach(m => {
      const h = ESPN_TO_TT_TEAM[m.home && m.home.teamId];
      const a = ESPN_TO_TT_TEAM[m.away && m.away.teamId];
      // Kein Mapping heisst Taxi Squad oder Freilos — beides ueberspringen.
      if (!h || !a) return;
      matchups.push({ period: m.matchupPeriodId, home: h, away: a, winner: m.winner || 'UNDECIDED' });
    });

    if (!matchups.length) throw new Error('ESPN hat keinen verwertbaren Spielplan geliefert');

    const obj = {
      season: ESPN_SEASON,
      ts: Date.now(),
      currentPeriod: (data.status && data.status.currentMatchupPeriod) || 1,
      matchups,
    };
    try { localStorage.setItem(MP_SCHED_KEY, JSON.stringify(obj)); } catch (e) { /* Privatmodus */ }
    MP_STATE.schedule = obj;

    const weeks = new Set(matchups.map(m => m.period)).size;
    if (st) { st.className = 'mp-status ok'; st.textContent = `✓ ${weeks} Wochen geladen, aktuell läuft Woche ${obj.currentPeriod}.`; }
    mpRenderWeekSelect();
  } catch (err) {
    if (st) { st.className = 'mp-status err'; st.textContent = 'Konnte den Spielplan nicht laden: ' + err.message + '. Teams lassen sich weiterhin von Hand wählen.'; }
  } finally {
    if (btn) { btn.disabled = false; btn.textContent = '↻ ESPN Matchups laden'; }
  }
}

function mpRenderWeekSelect() {
  const sel = document.getElementById('mpWeekSelect');
  if (!sel) return;
  const sched = MP_STATE.schedule;
  const teamA = MP_STATE.teamA;

  if (!sched || !teamA) {
    sel.innerHTML = '<option value="">— Spielplan noch nicht geladen —</option>';
    sel.disabled = true;
    return;
  }

  const mine = sched.matchups
    .filter(m => m.home === teamA || m.away === teamA)
    .sort((a, b) => a.period - b.period);

  if (!mine.length) {
    sel.innerHTML = '<option value="">— keine Matchups für dieses Team —</option>';
    sel.disabled = true;
    return;
  }

  sel.disabled = false;
  sel.innerHTML = '<option value="">— Woche wählen —</option>' + mine.map(m => {
    const oppId = m.home === teamA ? m.away : m.home;
    const opp = teamMap[oppId];
    const cur = m.period === sched.currentPeriod ? ' ●' : '';
    return `<option value="${m.period}|${oppId}">Woche ${m.period} vs ${_mpEsc(opp ? opp.name : 'Team ' + oppId)}${cur}</option>`;
  }).join('');

  // Laufende Woche vorauswaehlen, wenn noch nichts gewaehlt wurde.
  if (!MP_STATE.teamB) {
    const cur = mine.find(m => m.period === sched.currentPeriod);
    if (cur) {
      const oppId = cur.home === teamA ? cur.away : cur.home;
      sel.value = `${cur.period}|${oppId}`;
      MP_STATE.teamB = oppId;
      const bSel = document.getElementById('mpTeamB');
      if (bSel) bSel.value = String(oppId);
    }
  }
}

function mpPickWeek() {
  const sel = document.getElementById('mpWeekSelect');
  if (!sel || !sel.value) return;
  const oppId = parseInt(sel.value.split('|')[1], 10);
  MP_STATE.teamB = oppId;
  const bSel = document.getElementById('mpTeamB');
  if (bSel) bSel.value = String(oppId);
  mpRender();
}

// ============================================================
//  4 — Rendering
// ============================================================

function _mpEsc(s) {
  return String(s == null ? '' : s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
}

function mpSetTeam(side) {
  const el = document.getElementById(side === 'a' ? 'mpTeamA' : 'mpTeamB');
  const v = el && el.value ? parseInt(el.value, 10) : null;
  if (side === 'a') { MP_STATE.teamA = v; mpRenderWeekSelect(); }
  else              { MP_STATE.teamB = v; }
  _mpSavePrefs();
  mpRender();
}

function mpSetBasis(v) {
  MP_STATE.projWeight = Math.max(0, Math.min(1, Number(v) / 100));
  const lbl = document.getElementById('mpBasisVal');
  if (lbl) lbl.textContent = `${Math.round((1 - MP_STATE.projWeight) * 100)} % Rankings · ${Math.round(MP_STATE.projWeight * 100)} % Projections`;
  const sl = document.getElementById('mpBasisSlider');
  if (sl && Number(sl.value) !== Number(v)) sl.value = v;
  MP_STATE.index = null;   // Blend hat sich geaendert, Index neu bauen
  _mpSavePrefs();
  mpRender();
}

function mpSetRankSource(v) {
  MP_STATE.rankSourceId = v || null;
  MP_STATE.index = null;
  _mpSavePrefs();
  mpRender();
}

function mpFillRankSourceSelect() {
  const el = document.getElementById('mpRankSource');
  if (!el) return;
  const all = _mpAvailableRankSources();
  if (!all.length) {
    el.innerHTML = '<option value="">— keine gespielten Stats verfügbar —</option>';
    el.disabled = true;
    return;
  }
  const best = all.slice().sort((a, b) => b.coverage - a.coverage)[0];
  el.disabled = false;
  el.innerHTML = all
    .slice()
    .sort((a, b) => b.coverage - a.coverage)
    .map(s => {
      const pct = Math.round(s.coverage * 100);
      const auto = s.id === best.id ? ' · Standard' : '';
      const sel = MP_STATE.rankSourceId === s.id ? ' selected' : '';
      return `<option value="${s.id}"${sel}>${_mpEsc(s.short)} · deckt ${pct} % der Kader ab${auto}</option>`;
    }).join('');
  if (!MP_STATE.rankSourceId) el.value = best.id;
}

function mpSetGames(v) {
  MP_STATE.gamesPerWeek = Number(v);
  const lbl = document.getElementById('mpGamesVal');
  if (lbl) lbl.textContent = `${MP_STATE.gamesPerWeek.toFixed(1)} Spiele`;
  _mpSavePrefs();
  mpRender();
}

function mpSetLineup(v) {
  MP_STATE.lineupSize = parseInt(v, 10);
  const lbl = document.getElementById('mpLineupVal');
  if (lbl) lbl.textContent = `${MP_STATE.lineupSize} Spieler`;
  _mpSavePrefs();
  mpRender();
}

function _mpSavePrefs() {
  try {
    localStorage.setItem(MP_PREFS_KEY, JSON.stringify({
      teamA: MP_STATE.teamA, teamB: MP_STATE.teamB,
      projWeight: MP_STATE.projWeight,
      rankSourceId: MP_STATE.rankSourceId,
      gamesPerWeek: MP_STATE.gamesPerWeek,
      lineupSize: MP_STATE.lineupSize,
    }));
  } catch (e) { /* Privatmodus */ }
}

function _mpLoadPrefs() {
  try {
    const raw = localStorage.getItem(MP_PREFS_KEY);
    if (!raw) return;
    const p = JSON.parse(raw);
    if (p.teamA) MP_STATE.teamA = p.teamA;
    if (p.teamB) MP_STATE.teamB = p.teamB;
    if (typeof p.projWeight === 'number') MP_STATE.projWeight = p.projWeight;
    if (p.rankSourceId) MP_STATE.rankSourceId = p.rankSourceId;
    if (typeof p.gamesPerWeek === 'number') MP_STATE.gamesPerWeek = p.gamesPerWeek;
    if (typeof p.lineupSize === 'number') MP_STATE.lineupSize = p.lineupSize;
  } catch (e) { /* Privatmodus */ }
}

function mpRender() {
  const host = document.getElementById('mpResult');
  if (!host) return;

  if (!MP_STATE.teamA || !MP_STATE.teamB) {
    host.innerHTML = `<div class="mp-empty">Wähle oben Dein Team und den Gegner, oder lade die Matchups aus ESPN und such Dir eine Woche aus.</div>`;
    return;
  }
  if (MP_STATE.teamA === MP_STATE.teamB) {
    host.innerHTML = `<div class="mp-empty">Beide Seiten zeigen auf dasselbe Team. Wähle einen anderen Gegner.</div>`;
    return;
  }

  if (!MP_STATE.index) MP_STATE.index = _mpBuildIndex();
  const index = MP_STATE.index;

  const A = _mpTeamBreakdown(MP_STATE.teamA, index);
  const B = _mpTeamBreakdown(MP_STATE.teamB, index);
  const cmp = _mpCompare(A, B);

  const tA = teamMap[MP_STATE.teamA], tB = teamMap[MP_STATE.teamB];
  const winsA = cmp.rows.filter(r => r.prob > 0.5).length;
  const winsB = cmp.rows.length - winsA;

  let verdict;
  if (Math.abs(cmp.expA - cmp.expB) < 0.7) verdict = 'Sehr eng';
  else if (cmp.expA > cmp.expB) verdict = `${tA.name} vorn`;
  else verdict = `${tB.name} vorn`;

  host.innerHTML = `
    <div class="mp-scoreboard">
      <div class="mp-sb-team">
        <div class="mp-sb-name">${_mpEsc(tA.name)}</div>
        <div class="mp-sb-owner">${_mpEsc(tA.owner)}</div>
        <div class="mp-sb-score" style="color:${getTeamColor(tA)}">${cmp.expA.toFixed(1)}</div>
      </div>
      <div class="mp-sb-mid">
        <div class="mp-sb-verdict">Erwartete Kategorien</div>
        <div class="mp-sb-dash">—</div>
        <div class="mp-sb-conf">${_mpEsc(verdict)}<br>Kategorien klar verteilt: ${winsA} zu ${winsB}</div>
      </div>
      <div class="mp-sb-team right">
        <div class="mp-sb-name">${_mpEsc(tB.name)}</div>
        <div class="mp-sb-owner">${_mpEsc(tB.owner)}</div>
        <div class="mp-sb-score" style="color:${getTeamColor(tB)}">${cmp.expB.toFixed(1)}</div>
      </div>
    </div>

    <div class="mp-table-wrap">
      <table class="mp-table">
        <thead><tr>
          <th style="text-align:left;">Kategorie</th>
          <th>${_mpEsc(tA.name)}</th>
          <th>Verhältnis</th>
          <th>${_mpEsc(tB.name)}</th>
          <th>Chance ${_mpEsc(tA.owner)}</th>
        </tr></thead>
        <tbody>${cmp.rows.map(r => _mpRow(r, tA, tB)).join('')}</tbody>
      </table>
    </div>

    <div class="mp-rosters">
      ${_mpRosterCol(A, tA)}
      ${_mpRosterCol(B, tB)}
    </div>

    <div class="mp-panel" style="margin-top:16px;">
      <div class="mp-panel-title">Wie diese Zahlen entstehen</div>
      <div class="mp-hint" style="margin-top:0;">
        <strong style="color:var(--text);">Rankings</strong> kommen aus ${_mpEsc(index.rankLabel)}.
        <strong style="color:var(--text);">Projections</strong> aus dem Baseline und Live Blend.
        Beide werden pro Kategorie linear gemischt, aktuell ${Math.round((1 - MP_STATE.projWeight) * 100)} zu ${Math.round(MP_STATE.projWeight * 100)}.<br><br>
        Von ${index.counts.total} gerosterten Spielern haben ${index.counts.both} beide Quellen, ${index.counts.proj} nur eine Projection, ${index.counts.rank} nur gespielte Stats und ${index.counts.none} gar keine Daten.
        ${_mpCoverageWarning(index)}<br><br>
        Aufgestellt werden die ${MP_STATE.lineupSize} Spieler mit dem höchsten gewichteten Z-Score, jeder mit ${MP_STATE.gamesPerWeek.toFixed(1)} angesetzten Spielen.
        Die Wahrscheinlichkeit je Kategorie folgt aus dem Abstand beider Summen im Verhältnis zur erwarteten Streuung, wobei Steals und Blocks bei kleinem Volumen deutlich stärker schwanken als Punkte.<br><br>
        <span style="color:var(--accent2);">Wichtig:</span> Es steckt kein echter NBA Spielplan dahinter. Die Spiele je Spieler sind ein Pauschalwert, keine Auswertung, wer an welchem Tag wirklich antritt. Für Back to Backs, Ruhetage und ungerade Wochen ist das entsprechend blind.
        Prozentwerte sind nach Minuten gewichtet, weil die Rankings-Quellen keine Wurfversuche mitliefern.
      </div>
    </div>
  `;
}

// Wenn kaum ein gerosterter Spieler in der Rankings-Quelle vorkommt,
// laeuft der Regler faktisch ins Leere: fuer die meisten Spieler gibt
// es dann nur die Projection, egal wo er steht. Das muss sichtbar
// sein, sonst wirken Reglerbewegungen ohne Effekt wie ein Fehler.
function _mpCoverageWarning(index) {
  const c = index.counts;
  const share = c.total ? c.both / c.total : 0;
  if (share >= 0.6) return '';
  return `<br><span style="color:var(--accent2);">Nur ${Math.round(share * 100)} % der Kader sind in beiden Quellen vertreten.</span>
    Für alle übrigen wird automatisch die einzige vorhandene Quelle genommen, der Regler bewegt bei ihnen also nichts.
    Eine andere Rankings-Quelle mit höherer Abdeckung lässt sich oben wählen.`;
}

function _mpRow(r, tA, tB) {
  const c = r.cat;
  const aWin = r.prob > 0.5;
  const total = Math.abs(r.va) + Math.abs(r.vb) || 1;
  let pctA = Math.abs(r.va) / total * 100;
  if (c.invert) pctA = 100 - pctA;   // beim Balken soll die bessere Seite laenger sein
  const pctB = 100 - pctA;

  let cls = 'toss';
  const edge = Math.abs(r.prob - 0.5);
  if (edge > 0.25) cls = 'strong';
  else if (edge > 0.1) cls = 'lean';

  const fmt = v => c.type === 'pct' ? v.toFixed(1) + ' %' : v.toFixed(c.dec);

  return `<tr>
    <td class="mp-cat-name">${c.label}${c.note ? `<span class="mp-cat-note">${c.note}</span>` : ''}</td>
    <td class="mp-val ${aWin ? 'win' : 'lose'}">${fmt(r.va)}</td>
    <td><div class="mp-bar">
      <div class="mp-bar-l" style="width:${pctA.toFixed(1)}%;background:${getTeamColor(tA)}"></div>
      <div class="mp-bar-r" style="width:${pctB.toFixed(1)}%;background:${getTeamColor(tB)}"></div>
    </div></td>
    <td class="mp-val ${aWin ? 'lose' : 'win'}">${fmt(r.vb)}</td>
    <td class="mp-prob ${cls}">${Math.round(r.prob * 100)} %</td>
  </tr>`;
}

function _mpRosterCol(T, team) {
  const srcTag = { both: '', proj: ' · nur Projection', rank: ' · nur Stats', none: ' · keine Daten' };
  const row = (p, i, bench) => {
    const z = p.composite;
    const zCls = z === null ? 'none' : (z < 0 ? 'neg' : '');
    const zTxt = z === null ? '—' : (z > 0 ? '+' : '') + z.toFixed(1);
    return `<div class="mp-prow${bench ? ' bench' : ''}">
      <span class="mp-prow-num">${bench ? '' : i + 1}</span>
      <span class="mp-prow-name">${_mpEsc(p.name)}
        <span class="mp-prow-meta">${_mpEsc(p.pos || '')} · ${_mpEsc(p.nbaTeam || '')}${srcTag[p.src] || ''}</span>
      </span>
      <span class="mp-prow-z ${zCls}">${zTxt}</span>
    </div>`;
  };

  return `<div class="mp-roster">
    <div class="mp-roster-head">
      <span class="mp-roster-name" style="color:${getTeamColor(team)}">${_mpEsc(team.name)}</span>
      <span class="mp-roster-count">${T.starters.length} auf, ${T.bench.length} Bank</span>
    </div>
    <div class="mp-plist">
      ${T.starters.map((p, i) => row(p, i, false)).join('')}
      ${T.bench.map((p, i) => row(p, i, true)).join('')}
    </div>
  </div>`;
}

// ============================================================
//  5 — Init
// ============================================================

function mpFillTeamSelects() {
  ['mpTeamA', 'mpTeamB'].forEach(id => {
    const el = document.getElementById(id);
    if (!el) return;
    const cur = id === 'mpTeamA' ? MP_STATE.teamA : MP_STATE.teamB;
    el.innerHTML = '<option value="">— Team wählen —</option>' +
      TEAMS.map(t => `<option value="${t.id}"${cur === t.id ? ' selected' : ''}>${_mpEsc(t.name)} · ${_mpEsc(t.owner)}</option>`).join('');
  });
}

let _mpInited = false;
function mpInit() {
  if (!_mpInited) {
    _mpLoadPrefs();
    MP_STATE.schedule = _mpLoadCachedSchedule();
    _mpInited = true;
  }
  mpFillTeamSelects();
  mpFillRankSourceSelect();

  const sl = document.getElementById('mpBasisSlider');
  if (sl) sl.value = String(Math.round(MP_STATE.projWeight * 100));
  const gs = document.getElementById('mpGamesSlider');
  if (gs) gs.value = String(MP_STATE.gamesPerWeek);
  const ls = document.getElementById('mpLineupSlider');
  if (ls) ls.value = String(MP_STATE.lineupSize);

  const bl = document.getElementById('mpBasisVal');
  if (bl) bl.textContent = `${Math.round((1 - MP_STATE.projWeight) * 100)} % Rankings · ${Math.round(MP_STATE.projWeight * 100)} % Projections`;
  const gl = document.getElementById('mpGamesVal');
  if (gl) gl.textContent = `${MP_STATE.gamesPerWeek.toFixed(1)} Spiele`;
  const ll = document.getElementById('mpLineupVal');
  if (ll) ll.textContent = `${MP_STATE.lineupSize} Spieler`;

  const st = document.getElementById('mpSchedStatus');
  if (st && MP_STATE.schedule) {
    const age = Math.round((Date.now() - MP_STATE.schedule.ts) / 3600000);
    st.className = 'mp-status';
    st.textContent = `Spielplan aus dem Zwischenspeicher, vor ${age} Stunden geladen. Aktuell läuft Woche ${MP_STATE.schedule.currentPeriod}.`;
  }

  // Rosters koennen sich seit dem letzten Aufruf geaendert haben.
  MP_STATE.index = null;
  mpRenderWeekSelect();
  mpRender();
}

// ============================================================
//  6 — Nachladen der Vorsaison-Stats
// ============================================================
//  data/last-season-stats-2025-26.js ist rund 190 KB und wird sonst
//  nirgends im Frontend gebraucht, deshalb steht es bewusst NICHT in
//  index.html. Ohne diese Datei bliebe waehrend der Off-Season nur die
//  Summer League als Rankings-Quelle uebrig, die kaum zehn Prozent
//  eines Liga-Kaders abdeckt. Sie wird daher beim ersten Aufruf dieser
//  Seite nachgeladen.
//
//  Genutzt wird _loadScriptOnce() aus js/player-rankings.js, falls
//  vorhanden — das dedupliziert global, sodass dieselbe Datei nie
//  zweimal im DOM landet. Sonst greift der eigene Rueckfall unten.

const MP_EXTRA_DATA = ['data/last-season-stats-2025-26.js?v=1'];
let _mpDataState = 'idle';   // idle | loading | ready

function _mpLoadScript(src) {
  if (typeof _loadScriptOnce === 'function') return _loadScriptOnce(src);
  return new Promise(resolve => {
    const s = document.createElement('script');
    s.src = src;
    // Fehlt die Datei, laeuft die Seite trotzdem weiter — dann eben
    // ohne die Vorsaison als waehlbare Quelle.
    s.onload = resolve;
    s.onerror = resolve;
    document.body.appendChild(s);
  });
}

const _mpPendingCbs = [];

function _mpEnsureData(onDone) {
  const cb = typeof onDone === 'function' ? onDone : function () {};

  if (_mpDataState === 'ready' || typeof LAST_SEASON_STATS_2025_26 !== 'undefined') {
    _mpDataState = 'ready';
    cb();
    return;
  }
  // Waehrend des Ladens weitere Aufrufe nicht verwerfen, sondern
  // anhaengen. Sonst bliebe die Seite leer, wenn jemand waehrend des
  // Ladens wegnavigiert und direkt wieder zurueckkommt.
  _mpPendingCbs.push(cb);
  if (_mpDataState === 'loading') return;
  _mpDataState = 'loading';

  const host = document.getElementById('mpResult');
  if (host) host.innerHTML = '<div class="mp-empty">Lade Vorsaison-Statistiken…</div>';

  let i = 0;
  const next = () => {
    if (i >= MP_EXTRA_DATA.length) {
      _mpDataState = 'ready';
      MP_STATE.index = null;
      while (_mpPendingCbs.length) {
        try { _mpPendingCbs.shift()(); }
        catch (e) { console.error('[Matchup] Init fehlgeschlagen:', e); }
      }
      return;
    }
    _mpLoadScript(MP_EXTRA_DATA[i++]).then(next);
  };
  next();
}

function showMatchupPlanner() {
  navigate('matchupPage');
  _mpEnsureData(() => mpInit());
}
