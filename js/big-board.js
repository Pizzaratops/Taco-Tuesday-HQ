// ============================================================
//  MFHFBs BIG BOARD — Stat-Sheet Style (Option D)
//
//  Quelle:       data/draft2026.js (DRAFT_2026)
//  Persistenz:   localStorage (lokal pro Browser)
//  Export:       window.print() + @media print (A4 landscape)
//  Interaktion:  Drag & Drop, contenteditable Felder,
//                Tier-Pills klickbar, Notes editierbar
// ============================================================

const BB_STORAGE_KEY = 'mfhfbs_bigBoard_v2';   // v2 wegen Layout-Wechsel
const BB_MAX_TOP     = 30;
const BB_MAX_TIERS   = 7;

// Tier-Farben (Fighting Illini Akzente + ergänzend)
const BB_TIER_COLORS = [
  '#E84A27',  // T1 — Illini Orange
  '#f5b942',  // T2 — Gold
  '#4caf81',  // T3 — Green
  '#29b6f6',  // T4 — Blue
  '#a89bff',  // T5 — Purple
  '#ff6584',  // T6 — Pink (Reserve)
  '#7bdcb5',  // T7 — Mint (Reserve)
];

function bbDefaultState() {
  const src = (typeof DRAFT_2026 !== 'undefined') ? DRAFT_2026 : [];
  const items = src.map(p => ({
    type:   'player',
    name:   p.name,
    pos:    p.pos || '',
    school: p.school || '',
    notes:  '',                  // Field Notes vom Commish
    tier:   p.tier || '',        // initial-Tier aus draft2026.js (z.B. "Tier 1")
  }));
  return {
    title:     'THE 2026 BIG BOARD',
    classified:'▪ Internal Scouting Document · Eyes Only',
    subtitle:  'MFHFBs Front-Office · Top-30 Prospects · Round One Projection',
    author:    'The Commish',
    revision:  '04',
    top:       items.slice(0, BB_MAX_TOP),
    hm:        items.slice(BB_MAX_TOP),
    tiers:     [
      { after: 2,  label: 'T1', name: 'Generational' },
      { after: 6,  label: 'T2', name: 'Cornerstone'  },
      { after: 13, label: 'T3', name: 'Starter Lock' },
      { after: 21, label: 'T4', name: 'High-Upside'  },
    ],
  };
}

function bbLoad() {
  try {
    const raw = localStorage.getItem(BB_STORAGE_KEY);
    if (!raw) return bbDefaultState();
    const obj = JSON.parse(raw);
    // Wenn DRAFT_2026 deutlich gewachsen/geschrumpft ist, Default neu laden
    if (typeof DRAFT_2026 !== 'undefined') {
      const expected = DRAFT_2026.length;
      const got      = (obj.top || []).length + (obj.hm || []).length;
      if (Math.abs(expected - got) > 3) {
        console.warn('[Big Board] DRAFT_2026 hat sich geändert — lade Default.');
        return bbDefaultState();
      }
    }
    return obj;
  } catch (e) {
    console.error('[Big Board] localStorage corrupted, using default:', e);
    return bbDefaultState();
  }
}

function bbSave(state) {
  try { localStorage.setItem(BB_STORAGE_KEY, JSON.stringify(state)); }
  catch (e) { console.error('[Big Board] save failed:', e); }
}

// Globaler State
let BB_STATE   = bbLoad();
let BB_DRAG    = null;
let BB_EDITING = true;

// ============================================================
//  TIER HELPER
// ============================================================
// Bestimme den Tier-Index (0-basiert) für einen Spieler an Position `idx` (0-basiert)
function bbTierIndexAt(idx) {
  let t = 0;
  for (const tier of BB_STATE.tiers || []) {
    if (idx > tier.after) t++;
  }
  return t;
}

function bbTierColor(idx) {
  return BB_TIER_COLORS[bbTierIndexAt(idx) % BB_TIER_COLORS.length];
}

function bbTierLabel(idx) {
  const tIdx = bbTierIndexAt(idx);
  // Wir labeln als "T1", "T2" — Anzahl der durchschrittenen Tier-Breaks +1
  return `T${tIdx + 1}`;
}

// ============================================================
//  RENDER
// ============================================================
function showBigBoard() {
  navigate('bigBoardPage');
  renderBigBoard();
}

function renderBigBoard() {
  const root = document.getElementById('bigBoardPage');
  if (!root) return;

  const editClass = BB_EDITING ? 'bb-edit' : 'bb-view';
  const today = new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });

  root.innerHTML = `
    <div class="bb-toolbar">
      <div class="bb-toolbar-left">
        <h2 style="margin:0;font-family:'Bebas Neue',sans-serif;letter-spacing:2px;font-size:26px;">🗂️ Big Board · Stat Sheet</h2>
        <span class="bb-toolbar-hint">${BB_EDITING ? 'Drag & Drop sortieren · Felder klicken zum Editieren' : 'View-Mode'}</span>
      </div>
      <div class="bb-toolbar-right">
        <button class="bb-btn bb-btn-mode ${BB_EDITING ? 'active' : ''}" onclick="bbToggleEdit()">${BB_EDITING ? '✏️ Edit-Mode' : '👁️ View-Mode'}</button>
        <button class="bb-btn" onclick="bbResetState()" title="Zurück zu Default aus draft2026.js">🔄 Reset</button>
        <button class="bb-btn" onclick="bbExportJSON()" title="Aktuelles Board als JSON exportieren">💾 JSON</button>
        <button class="bb-btn bb-btn-primary" onclick="bbPrintA4()" title="A4 Querformat — über Druckdialog als PDF speichern">🖨️ A4 Drucken</button>
      </div>
    </div>

    <div class="sh-page ${editClass}" id="bbSheet">
      <!-- HEADER -->
      <div class="sh-header">
        <div class="sh-title-block">
          <div class="sh-classified" ${BB_EDITING ? 'contenteditable="true" onblur="bbField(\'classified\',this.innerText)"' : ''}>${BB_STATE.classified}</div>
          <h1 class="sh-title" ${BB_EDITING ? 'contenteditable="true" onblur="bbField(\'title\',this.innerText)"' : ''}>${BB_STATE.title}</h1>
          <div class="sh-sub" ${BB_EDITING ? 'contenteditable="true" onblur="bbField(\'subtitle\',this.innerText)"' : ''}>${BB_STATE.subtitle}</div>
        </div>
        <div class="sh-stamp-block">
          <div class="sh-stamp">COMMISH<br>APPROVED</div>
          <div class="sh-stamp-sub">REV. <span ${BB_EDITING ? 'contenteditable="true" onblur="bbField(\'revision\',this.innerText)"' : ''}>${BB_STATE.revision}</span> · ${today.toUpperCase()}</div>
        </div>
      </div>

      <!-- META ROW -->
      <div class="sh-meta-row">
        <span>Author: <strong ${BB_EDITING ? 'contenteditable="true" onblur="bbField(\'author\',this.innerText)"' : ''}>${BB_STATE.author}</strong></span>
        <span>Date: <strong>${today}</strong></span>
        <span>Rev: <strong>${BB_STATE.revision}</strong></span>
        <span>Tiers: <strong>${(BB_STATE.tiers||[]).length + 1}</strong></span>
        <span>Prospects: <strong>${BB_STATE.top.length} + ${BB_STATE.hm.length} HM</strong></span>
      </div>

      <!-- TIER LEGEND -->
      <div class="sh-tier-legend">
        ${renderTierLegend()}
      </div>

      <!-- MAIN TABLE -->
      <div class="sh-table-wrap">
        <table class="sh-table" id="bbTable">
          <thead><tr>
            <th class="sh-th-pick">Pick</th>
            <th class="sh-th-tier">Tier</th>
            <th class="sh-th-name">Name</th>
            <th class="sh-th-pos">Pos</th>
            <th class="sh-th-school">School / Origin</th>
            <th class="sh-th-notes">Field Notes</th>
            ${BB_EDITING ? '<th class="sh-th-actions"></th>' : ''}
          </tr></thead>
          <tbody>
            ${renderTableRows()}
          </tbody>
        </table>
      </div>

      ${(BB_STATE.hm && BB_STATE.hm.length) ? `
      <div class="sh-hm-section">
        <div class="sh-hm-header">
          <span class="sh-hm-label">▪ Honorable Mentions</span>
          <span class="sh-hm-sub">Watch list · Not yet ranked</span>
        </div>
        <div class="sh-hm-grid">${renderHM()}</div>
      </div>` : ''}

      <!-- FOOTER -->
      <div class="sh-footer">
        <span>▪ MFHFBs PRESS · Internal</span>
        <span>Page 1 of 1 · Top-${BB_STATE.top.length}${BB_STATE.hm.length ? ` + ${BB_STATE.hm.length} HM` : ''}</span>
        <span>taco-tuesday-league.com</span>
      </div>
    </div>

    <!-- Scouting Popup -->
    <div id="bbScoutPopup" class="bb-scout-popup" style="display:none;" onclick="bbCloseScout()"></div>
  `;
}

function renderTierLegend() {
  const numTiers = (BB_STATE.tiers || []).length + 1;
  let html = '';
  // Tier 1 = vor dem ersten tier.after
  let prevAfter = -1;
  const tiers = [...(BB_STATE.tiers || [])];
  // Wir bauen alle Tier-Bereiche [start..end] auf
  const ranges = [];
  tiers.forEach(t => {
    ranges.push({ start: prevAfter + 1, end: t.after, label: t.label, name: t.name });
    prevAfter = t.after;
  });
  ranges.push({ start: prevAfter + 1, end: BB_STATE.top.length - 1, label: `T${ranges.length + 1}`, name: 'Rotation' });

  ranges.forEach((r, i) => {
    const color = BB_TIER_COLORS[i % BB_TIER_COLORS.length];
    const count = Math.max(0, r.end - r.start + 1);
    const editable = BB_EDITING ? `contenteditable="true" onblur="bbUpdateTierName(${i}, this.innerText)"` : '';
    html += `<div class="sh-legend-item" style="--c:${color}">
      <span class="sh-legend-pill">${r.label}</span>
      <span class="sh-legend-name" ${editable}>${r.name}</span>
      <span class="sh-legend-count">${count} prospect${count===1?'':'s'}</span>
    </div>`;
  });
  return html;
}

function renderTableRows() {
  let html = '';
  const tiersByAfter = {};
  (BB_STATE.tiers || []).forEach((t, i) => { tiersByAfter[t.after] = { ...t, idx: i }; });

  BB_STATE.top.forEach((item, idx) => {
    const color = bbTierColor(idx);
    const tlab  = bbTierLabel(idx);
    const tierIdx = bbTierIndexAt(idx);

    const draggable = BB_EDITING ? 'draggable="true"' : '';
    const dragHandlers = BB_EDITING
      ? `ondragstart="bbDragStart(event,'top',${idx})" ondragover="bbDragOver(event)" ondrop="bbDrop(event,'top',${idx})" ondragend="bbDragEnd(event)"`
      : '';

    // Klick → Scouting Popup (nur im View-Mode, da Drag im Edit-Mode prio hat)
    const clickHandler = (!BB_EDITING && typeof DRAFT_2026 !== 'undefined' && DRAFT_2026.find(p => p.name === item.name))
      ? `onclick="bbShowScout('${escapeJs(item.name)}')"`
      : '';

    html += `<tr class="sh-row" data-idx="${idx}" ${draggable} ${dragHandlers} ${clickHandler}>
      ${BB_EDITING ? '<td class="sh-handle-cell"><span class="sh-handle">⋮⋮</span></td>' : ''}
      <td class="sh-pick">${(idx+1).toString().padStart(2, '0')}</td>
      <td class="sh-tier"><span class="sh-tier-pill" style="background:${color}">${tlab}</span></td>
      <td class="sh-name" ${BB_EDITING ? `contenteditable="true" onblur="bbUpdateField('top',${idx},'name',this.innerText)"` : ''}>${item.name}</td>
      <td class="sh-pos" ${BB_EDITING ? `contenteditable="true" onblur="bbUpdateField('top',${idx},'pos',this.innerText)"` : ''}>${item.pos}</td>
      <td class="sh-school" ${BB_EDITING ? `contenteditable="true" onblur="bbUpdateField('top',${idx},'school',this.innerText)"` : ''}>${item.school}</td>
      <td class="sh-notes-cell">
        <div class="sh-notes" ${BB_EDITING ? `contenteditable="true" onblur="bbUpdateField('top',${idx},'notes',this.innerText)"` : ''} data-placeholder="…">${item.notes || ''}</div>
      </td>
      ${BB_EDITING ? `<td class="sh-actions">
        <button class="sh-btn-mini" onclick="event.stopPropagation();bbAddTierAfter(${idx})" title="Tier-Break nach diesem Pick">+T</button>
        <button class="sh-btn-mini" onclick="event.stopPropagation();bbDemoteToHM(${idx})" title="Zu Honorable Mentions">↓HM</button>
      </td>` : ''}
    </tr>`;

    // Tier-Break-Zeile nach diesem Spieler
    if (tiersByAfter[idx]) {
      const tier = tiersByAfter[idx];
      const nextTierIdx = tierIdx + 1;
      const nextColor = BB_TIER_COLORS[nextTierIdx % BB_TIER_COLORS.length];
      const colspan = BB_EDITING ? 8 : 6;
      html += `<tr class="sh-tier-row" data-tier-after="${idx}">
        <td colspan="${colspan}" style="--c:${nextColor}">
          <div class="sh-tier-break">
            <span class="sh-tier-break-pill" style="background:${nextColor}">${tier.label}</span>
            <span class="sh-tier-break-name" ${BB_EDITING ? `contenteditable="true" onblur="bbUpdateTierBreakName(${idx},this.innerText)"` : ''}>${tier.name}</span>
            <span class="sh-tier-break-line" style="background:linear-gradient(90deg,${nextColor},transparent)"></span>
            ${BB_EDITING ? `<button class="sh-tier-remove" onclick="bbRemoveTier(${idx})" title="Tier-Break entfernen">×</button>` : ''}
          </div>
        </td>
      </tr>`;
    }
  });
  return html;
}

function renderHM() {
  if (!BB_EDITING) {
    return BB_STATE.hm.map(p => `<div class="sh-hm-item">
      <span class="sh-hm-name">${p.name}</span>
      <span class="sh-hm-meta">${p.pos}${p.pos && p.school ? ' · ' : ''}${p.school}</span>
    </div>`).join('');
  }
  return BB_STATE.hm.map((p, idx) => `<div class="sh-hm-item" data-idx="${idx}" draggable="true" ondragstart="bbDragStart(event,'hm',${idx})" ondragover="bbDragOver(event)" ondrop="bbDrop(event,'hm',${idx})" ondragend="bbDragEnd(event)">
    <span class="sh-hm-handle">⋮</span>
    <span class="sh-hm-name">${p.name}</span>
    <span class="sh-hm-meta">${p.pos}${p.pos && p.school ? ' · ' : ''}${p.school}</span>
    <button class="sh-btn-mini sh-hm-up" onclick="event.stopPropagation();bbPromoteFromHM(${idx})" title="In Top-${BB_MAX_TOP} hochstufen">↑</button>
  </div>`).join('');
}

function escapeJs(s) {
  return String(s).replace(/\\/g, '\\\\').replace(/'/g, "\\'").replace(/"/g, '\\"');
}

// ============================================================
//  SCOUTING POPUP — wenn Spieler in DRAFT_2026 vorhanden
// ============================================================
function bbShowScout(name) {
  const src = (typeof DRAFT_2026 !== 'undefined') ? DRAFT_2026.find(p => p.name === name) : null;
  if (!src) return;
  const pop = document.getElementById('bbScoutPopup');
  pop.innerHTML = `<div class="bb-scout-card" onclick="event.stopPropagation()">
    <button class="bb-scout-close" onclick="bbCloseScout()">×</button>
    <div class="bb-scout-meta-top">▪ Scouting Report · MFHFBs Internal</div>
    <div class="bb-scout-name">${src.name}</div>
    <div class="bb-scout-meta">${src.pos || ''}${src.pos && src.school ? ' · ' : ''}${src.school || ''}${src.tier ? ' · ' + src.tier : ''}</div>
    ${src.stats     ? `<div class="bb-scout-stats">${src.stats}</div>` : ''}
    ${src.fantasy   ? `<div class="bb-scout-fantasy">${src.fantasy}</div>` : ''}
    ${src.scouting  ? `<div class="bb-scout-text">${src.scouting}</div>` : ''}
  </div>`;
  pop.style.display = 'flex';
}

function bbCloseScout() {
  const pop = document.getElementById('bbScoutPopup');
  if (pop) pop.style.display = 'none';
}

// ============================================================
//  EDIT-ACTIONS
// ============================================================
function bbToggleEdit() { BB_EDITING = !BB_EDITING; renderBigBoard(); }

function bbResetState() {
  if (!confirm('Big Board auf Default aus draft2026.js zurücksetzen?\nAlle lokalen Änderungen (Reihenfolge, Notes, Tier-Breaks) gehen verloren.')) return;
  localStorage.removeItem(BB_STORAGE_KEY);
  BB_STATE = bbDefaultState();
  renderBigBoard();
}

function bbField(field, value) {
  BB_STATE[field] = String(value || '').trim();
  bbSave(BB_STATE);
}

function bbUpdateField(list, idx, field, value) {
  const arr = (list === 'top') ? BB_STATE.top : BB_STATE.hm;
  if (!arr[idx]) return;
  arr[idx][field] = String(value || '').trim();
  bbSave(BB_STATE);
}

function bbUpdateTierName(legendIdx, value) {
  // Legend-Index ist die Tier-Position (0-based)
  // Wir mappen das auf BB_STATE.tiers[legendIdx-1] für Tiers nach dem ersten,
  // bzw. der erste Tier hat keinen Eintrag in BB_STATE.tiers (ist implizit)
  // ABER: wir labeln tier 1 als Bereich VOR dem ersten Tier-Break
  // Daher: Tier-Bereich i entspricht Eintrag i in der gerenderten Liste
  // Wenn legendIdx < tiers.length, ist es der Bereich vor dem Break[legendIdx]
  // Wenn legendIdx == tiers.length, ist es der letzte Bereich (kein Eintrag in tiers)
  const tiers = BB_STATE.tiers || [];
  if (legendIdx < tiers.length) {
    // Der Bereich vor Break[legendIdx] — wir labeln im Break selbst NICHT,
    // weil der erste Bereich keinen Break davor hat. Wir speichern in tiers[legendIdx].name
    // ABER nur, wenn legendIdx > 0 — der ERSTE Bereich (T1) hat keinen Break
    // Spezialfall: legendIdx 0 ist "Tier 1" — wir bräuchten ein eigenes Feld
    // Pragmatisch: nur Tier 2+ können hier umbenannt werden via Legend, T1 ist fix.
    // Für T1 müsste ein zusätzliches Feld in BB_STATE her.
    if (legendIdx === 0) {
      // T1 Name in eigenes Feld speichern
      BB_STATE.firstTierName = String(value || '').trim();
      bbSave(BB_STATE);
      return;
    }
    // Tier N (N >= 2) entspricht dem Break davor (tiers[N-1])
    tiers[legendIdx - 1].name = String(value || '').trim();
  } else {
    // Letzter Tier — auch eigenes Feld
    BB_STATE.lastTierName = String(value || '').trim();
  }
  bbSave(BB_STATE);
}

function bbUpdateTierBreakName(afterIdx, value) {
  const t = (BB_STATE.tiers || []).find(x => x.after === afterIdx);
  if (t) { t.name = String(value || '').trim(); bbSave(BB_STATE); }
}

function bbAddTierAfter(idx) {
  if (!BB_STATE.tiers) BB_STATE.tiers = [];
  if (BB_STATE.tiers.length >= BB_MAX_TIERS - 1) {
    alert(`Maximum ${BB_MAX_TIERS} Tiers erreicht.`);
    return;
  }
  if (BB_STATE.tiers.some(t => t.after === idx)) {
    alert('Nach diesem Spieler ist bereits ein Tier-Break.');
    return;
  }
  // Bestimme nächsten freien Tier-Label (T2, T3, T4, ...)
  // Anzahl bestehender Tier-Breaks + 1 = nächster Tier-Index
  // ABER besser dynamisch: nach dem Hinzufügen sortieren und neu vergeben
  const nextNum = BB_STATE.tiers.length + 2;
  const name = prompt(`Name des neuen Tiers:`, `Tier ${nextNum} Name`);
  if (!name) return;
  BB_STATE.tiers.push({ after: idx, label: `T${nextNum}`, name: name.trim() });
  // Sortieren nach `after` und Labels neu vergeben
  BB_STATE.tiers.sort((a, b) => a.after - b.after);
  BB_STATE.tiers.forEach((t, i) => { t.label = `T${i + 2}`; });
  bbSave(BB_STATE);
  renderBigBoard();
}

function bbRemoveTier(afterIdx) {
  BB_STATE.tiers = (BB_STATE.tiers || []).filter(t => t.after !== afterIdx);
  // Labels neu nummerieren
  BB_STATE.tiers.forEach((t, i) => { t.label = `T${i + 2}`; });
  bbSave(BB_STATE);
  renderBigBoard();
}

function bbDemoteToHM(idx) {
  if (BB_STATE.top.length <= 1) return;
  const [item] = BB_STATE.top.splice(idx, 1);
  if (!BB_STATE.hm) BB_STATE.hm = [];
  BB_STATE.hm.unshift(item);
  // Tier-Breaks anpassen — die nach idx waren, rücken um 1 zurück
  BB_STATE.tiers = (BB_STATE.tiers || []).map(t => {
    if (t.after >= idx) return { ...t, after: t.after - 1 };
    return t;
  }).filter(t => t.after >= 0 && t.after < BB_STATE.top.length - 1);
  bbSave(BB_STATE);
  renderBigBoard();
}

function bbPromoteFromHM(idx) {
  if (BB_STATE.top.length >= BB_MAX_TOP) {
    alert(`Top-Liste voll (${BB_MAX_TOP}). Verschiebe erst einen Spieler in HM.`);
    return;
  }
  const [item] = BB_STATE.hm.splice(idx, 1);
  BB_STATE.top.push(item);
  bbSave(BB_STATE);
  renderBigBoard();
}

// ============================================================
//  DRAG & DROP
// ============================================================
function bbDragStart(e, list, idx) {
  if (!BB_EDITING) return;
  BB_DRAG = { list, idx };
  e.dataTransfer.effectAllowed = 'move';
  e.dataTransfer.setData('text/plain', `${list}:${idx}`);
  // Auf der Row selbst die Drag-Class setzen
  const row = e.currentTarget;
  row.classList.add('bb-dragging');
}

function bbDragOver(e) {
  if (!BB_EDITING || !BB_DRAG) return;
  e.preventDefault();
  e.dataTransfer.dropEffect = 'move';
  e.currentTarget.classList.add('bb-drag-over');
}

function bbDrop(e, list, idx) {
  if (!BB_EDITING || !BB_DRAG) return;
  e.preventDefault();
  e.currentTarget.classList.remove('bb-drag-over');

  const { list: srcList, idx: srcIdx } = BB_DRAG;
  BB_DRAG = null;

  if (srcList === list && srcIdx === idx) return;

  const srcArr = (srcList === 'top') ? BB_STATE.top : BB_STATE.hm;
  const dstArr = (list === 'top')    ? BB_STATE.top : BB_STATE.hm;

  if (list === 'top' && srcList === 'hm' && BB_STATE.top.length >= BB_MAX_TOP) {
    alert(`Top-Liste voll (${BB_MAX_TOP}). Verschiebe erst einen Spieler in HM.`);
    return;
  }

  const [item] = srcArr.splice(srcIdx, 1);
  let insertAt = idx;
  if (srcList === list && idx > srcIdx) insertAt = idx - 1;
  dstArr.splice(insertAt, 0, item);

  // Tier-Breaks bereinigen falls Top-Länge geändert
  if (srcList === 'top' || list === 'top') {
    BB_STATE.tiers = (BB_STATE.tiers || []).filter(t => t.after >= 0 && t.after < BB_STATE.top.length - 1);
  }

  bbSave(BB_STATE);
  renderBigBoard();
}

function bbDragEnd(e) {
  document.querySelectorAll('.bb-dragging').forEach(el => el.classList.remove('bb-dragging'));
  document.querySelectorAll('.bb-drag-over').forEach(el => el.classList.remove('bb-drag-over'));
  BB_DRAG = null;
}

// ============================================================
//  EXPORT
// ============================================================
function bbExportJSON() {
  const json = JSON.stringify(BB_STATE, null, 2);
  navigator.clipboard.writeText(json).then(() => {
    alert('Big-Board-JSON in die Zwischenablage kopiert.\n\nZum Festschreiben: in big-board.js als BIG_BOARD_OFFICIAL Constant einfügen.');
  }).catch(() => {
    const w = window.open('', '', 'width=700,height=600');
    w.document.write(`<title>Big Board JSON</title><pre style="font-family:monospace;white-space:pre-wrap;padding:20px;font-size:11px;">${json.replace(/</g, '&lt;')}</pre>`);
    w.document.close();
  });
}

function bbPrintA4() {
  const wasEditing = BB_EDITING;
  if (wasEditing) { BB_EDITING = false; renderBigBoard(); }
  setTimeout(() => {
    window.print();
    if (wasEditing) { BB_EDITING = true; renderBigBoard(); }
  }, 200);
}
