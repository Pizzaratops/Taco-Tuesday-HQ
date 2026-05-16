// ============================================================
//  MFHFBs BIG BOARD — interaktives Liga-Tool
//  Quelle: data/draft2026.js (DRAFT_2026)
//  Persistenz: localStorage (lokaler Edit-Workflow für Admin)
//  Export: HTML-Print via window.print() mit @media print A4
// ============================================================

const BB_STORAGE_KEY = 'mfhfbs_bigBoard_v1';
const BB_MAX_TOP     = 30;   // Top-30 als Hauptliste
const BB_MAX_HM      = 20;   // bis zu 20 honorable mentions

// Default-State: erste 30 aus DRAFT_2026 in originaler Reihenfolge,
// plus alle restlichen als Honorable Mentions, ohne Tier-Breaks
function bbDefaultState() {
  const src = (typeof DRAFT_2026 !== 'undefined') ? DRAFT_2026 : [];
  const items = src.map(p => ({
    type:   'player',
    pick:   p.pick,
    name:   p.name,
    pos:    p.pos || '',
    school: p.school || '',
  }));
  return {
    title:    'THE BIG BOARD',
    subtitle: 'MFHFBs Official 2026 Mock Draft',
    issue:    `VOL. I · ED. 1 — ${new Date().toLocaleDateString('de-DE', { day: '2-digit', month: 'short', year: 'numeric' }).toUpperCase()}`,
    publisher:'MFHFBs PRESS',
    top:      items.slice(0, BB_MAX_TOP),   // Top-30
    hm:       items.slice(BB_MAX_TOP),       // Rest = honorable mentions
    tiers:    [],  // [{after: index, label: "Tier 1"}, ...]
  };
}

function bbLoad() {
  try {
    const raw = localStorage.getItem(BB_STORAGE_KEY);
    if (!raw) return bbDefaultState();
    const obj = JSON.parse(raw);
    // Wenn DRAFT_2026 sich geändert hat (neue Prospects), wieder Default laden
    // Nur wenn Item-Anzahl gleich ist, lokalen State behalten
    if (typeof DRAFT_2026 !== 'undefined') {
      const expected = DRAFT_2026.length;
      const got      = (obj.top || []).length + (obj.hm || []).length;
      if (Math.abs(expected - got) > 2) {
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
  try {
    localStorage.setItem(BB_STORAGE_KEY, JSON.stringify(state));
  } catch (e) {
    console.error('[Big Board] save failed:', e);
  }
}

// Globaler State
let BB_STATE   = bbLoad();
let BB_DRAG    = null;       // gerade gezogenes Element
let BB_EDITING = true;       // Edit-Mode an/aus

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
  const tiersByIndex = {};
  (BB_STATE.tiers || []).forEach(t => { tiersByIndex[t.after] = t; });

  root.innerHTML = `
    <div class="bb-toolbar">
      <div class="bb-toolbar-left">
        <h2 style="margin:0;font-family:'Playfair Display',serif;">🏀 MFHFBs Big Board</h2>
        <span class="bb-toolbar-hint">Drag & Drop · Klick zum Bearbeiten</span>
      </div>
      <div class="bb-toolbar-right">
        <button class="bb-btn bb-btn-mode ${BB_EDITING ? 'active' : ''}" onclick="bbToggleEdit()">${BB_EDITING ? '✏️ Edit-Mode' : '👁️ View-Mode'}</button>
        <button class="bb-btn" onclick="bbReset()" title="Zurück zur Default-Reihenfolge aus draft2026.js">🔄 Reset</button>
        <button class="bb-btn" onclick="bbExportJSON()" title="Aktuelles Board als JSON exportieren (für Repo)">💾 Export JSON</button>
        <button class="bb-btn bb-btn-primary" onclick="bbPrintA4()" title="Als A4-PDF speichern (über Druckdialog)">🖨️ Als A4 drucken</button>
      </div>
    </div>

    <div class="bb-newspaper ${editClass}" id="bbNewspaper">
      <!-- HEADER -->
      <div class="bb-header">
        <div class="bb-header-line">
          <span class="bb-header-issue" ${BB_EDITING ? 'contenteditable="true" onblur="bbUpdateField(\'issue\',this.innerText)"' : ''}>${BB_STATE.issue}</span>
          <span class="bb-header-publisher" ${BB_EDITING ? 'contenteditable="true" onblur="bbUpdateField(\'publisher\',this.innerText)"' : ''}>— ${BB_STATE.publisher} —</span>
          <span class="bb-header-date">${new Date().toLocaleDateString('de-DE')}</span>
        </div>
        <div class="bb-header-rule"></div>
        <h1 class="bb-title" ${BB_EDITING ? 'contenteditable="true" onblur="bbUpdateField(\'title\',this.innerText)"' : ''}>${BB_STATE.title}</h1>
        <div class="bb-subtitle">— <span ${BB_EDITING ? 'contenteditable="true" onblur="bbUpdateField(\'subtitle\',this.innerText)"' : ''}>${BB_STATE.subtitle}</span> —</div>
        <div class="bb-section-rule">
          <span class="bb-round-label">Round One</span>
          <span class="bb-byline">CURATED BY THE COMMISH</span>
        </div>
      </div>

      <!-- 2-COLUMN GRID -->
      <div class="bb-grid" id="bbGrid">
        ${renderBigBoardItems()}
      </div>

      <!-- HONORABLE MENTIONS -->
      ${(BB_STATE.hm && BB_STATE.hm.length) ? `
      <div class="bb-hm-section">
        <div class="bb-hm-label">Honorable Mentions</div>
        <div class="bb-hm-grid" id="bbHmGrid">${renderBigBoardHM()}</div>
      </div>` : ''}

      <!-- FOOTER -->
      <div class="bb-footer">
        <span class="bb-footer-left">— Tiered Big Board · See full prospect notes at our 2026 Draft Board page —</span>
        <span class="bb-footer-right">▪ MFHFBs</span>
      </div>
    </div>

    <!-- Scouting Popup -->
    <div id="bbScoutPopup" class="bb-scout-popup" style="display:none;" onclick="bbCloseScout()"></div>
  `;

  bbBindDragHandlers();
}

function renderBigBoardItems() {
  const items = BB_STATE.top || [];
  const tiersAfter = {};  // tier.after = N bedeutet Tier-Header KOMMT NACH item index N (also vor index N+1)
  (BB_STATE.tiers || []).forEach(t => { tiersAfter[t.after] = t; });

  let html = '';
  // Tier vor Index 0 (also ganz am Anfang)
  if (tiersAfter[-1]) html += renderTierBreak(tiersAfter[-1], -1);

  items.forEach((it, idx) => {
    html += renderBigBoardItem(it, idx);
    if (tiersAfter[idx]) html += renderTierBreak(tiersAfter[idx], idx);
  });

  // Edit-Mode: Button zum Hinzufügen eines Tier-Breaks ganz am Anfang
  return html;
}

function renderTierBreak(tier, afterIdx) {
  const editable = BB_EDITING ? `contenteditable="true" onblur="bbUpdateTierLabel(${afterIdx}, this.innerText)"` : '';
  return `<div class="bb-tier-break" data-after="${afterIdx}">
    <span class="bb-tier-line"></span>
    <span class="bb-tier-label" ${editable}>${tier.label}</span>
    <span class="bb-tier-line"></span>
    ${BB_EDITING ? `<button class="bb-tier-remove" onclick="bbRemoveTier(${afterIdx})" title="Tier-Break entfernen">×</button>` : ''}
  </div>`;
}

function renderBigBoardItem(item, idx) {
  const pickNo = idx + 1;  // visuelle Pick-Nummer = Position im Big Board, nicht item.pick
  const initial = item.name.split(' ').map(s => s[0] || '').slice(0, 2).join('').toUpperCase();
  // Hole Scouting aus DRAFT_2026 (Fallback wenn nicht vorhanden)
  const src = (typeof DRAFT_2026 !== 'undefined')
              ? DRAFT_2026.find(p => p.name === item.name)
              : null;
  const hasScout = !!(src && (src.scouting || src.fantasy));

  const draggable = BB_EDITING ? 'draggable="true"' : '';
  const dragHandle = BB_EDITING ? '<div class="bb-drag-handle" title="Drag to reorder">⋮⋮</div>' : '';

  const tierBtn = BB_EDITING ? `<button class="bb-add-tier-btn" onclick="bbAddTierAfter(${idx})" title="Tier-Break nach diesem Spieler einfügen">+ Tier</button>` : '';
  const demoteBtn = BB_EDITING ? `<button class="bb-demote-btn" onclick="bbDemoteToHM(${idx})" title="In Honorable Mentions verschieben">↓ HM</button>` : '';

  return `<div class="bb-item" data-idx="${idx}" ${draggable} ondragstart="bbDragStart(event, 'top', ${idx})" ondragover="bbDragOver(event)" ondrop="bbDrop(event, 'top', ${idx})" ondragend="bbDragEnd(event)" ${hasScout ? `onclick="bbShowScout('${escapeJsString(item.name)}')"` : ''}>
    ${dragHandle}
    <span class="bb-pick">${pickNo}.</span>
    <div class="bb-avatar"><span>${initial}</span></div>
    <div class="bb-pdata">
      <div class="bb-pname">${item.name}</div>
      <div class="bb-pmeta">${item.pos}${item.pos && item.school ? ', ' : ''}${item.school}</div>
    </div>
    <div class="bb-item-actions">
      ${tierBtn}
      ${demoteBtn}
    </div>
  </div>`;
}

function renderBigBoardHM() {
  const hm = BB_STATE.hm || [];
  return hm.map((it, idx) => {
    const draggable = BB_EDITING ? 'draggable="true"' : '';
    const promoteBtn = BB_EDITING ? `<button class="bb-promote-btn" onclick="bbPromoteFromHM(${idx})" title="In Top hochstufen">↑</button>` : '';
    return `<div class="bb-hm-item" data-idx="${idx}" ${draggable} ondragstart="bbDragStart(event, 'hm', ${idx})" ondragover="bbDragOver(event)" ondrop="bbDrop(event, 'hm', ${idx})" ondragend="bbDragEnd(event)">
      <span class="bb-hm-name">${it.name}</span>
      <span class="bb-hm-meta">${it.school || ''}${it.pos ? ' · '+it.pos : ''}</span>
      ${promoteBtn}
    </div>`;
  }).join('');
}

// Hilfs-Escape für onclick='...${name}...'
function escapeJsString(s) {
  return String(s).replace(/\\/g, '\\\\').replace(/'/g, "\\'").replace(/"/g, '\\"');
}

// ============================================================
//  SCOUTING POPUP
// ============================================================
function bbShowScout(name) {
  const src = (typeof DRAFT_2026 !== 'undefined') ? DRAFT_2026.find(p => p.name === name) : null;
  if (!src) return;
  const pop = document.getElementById('bbScoutPopup');
  pop.innerHTML = `<div class="bb-scout-card" onclick="event.stopPropagation()">
    <button class="bb-scout-close" onclick="bbCloseScout()">×</button>
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
function bbToggleEdit() {
  BB_EDITING = !BB_EDITING;
  renderBigBoard();
}

function bbReset() {
  if (!confirm('Big Board auf Default aus draft2026.js zurücksetzen? Alle Änderungen gehen verloren.')) return;
  localStorage.removeItem(BB_STORAGE_KEY);
  BB_STATE = bbDefaultState();
  renderBigBoard();
}

function bbUpdateField(field, value) {
  BB_STATE[field] = value.trim();
  bbSave(BB_STATE);
}

function bbAddTierAfter(idx) {
  if (!BB_STATE.tiers) BB_STATE.tiers = [];
  // Max 7 Tiers
  if (BB_STATE.tiers.length >= 7) {
    alert('Maximum 7 Tier-Breaks erlaubt.');
    return;
  }
  // Prüfen, ob schon ein Tier nach dieser Position existiert
  if (BB_STATE.tiers.some(t => t.after === idx)) {
    alert('Nach diesem Spieler ist bereits ein Tier-Break.');
    return;
  }
  const label = prompt('Name des Tier-Breaks:', `Tier ${BB_STATE.tiers.length + 1}`);
  if (!label) return;
  BB_STATE.tiers.push({ after: idx, label: label.trim() });
  bbSave(BB_STATE);
  renderBigBoard();
}

function bbRemoveTier(afterIdx) {
  BB_STATE.tiers = (BB_STATE.tiers || []).filter(t => t.after !== afterIdx);
  bbSave(BB_STATE);
  renderBigBoard();
}

function bbUpdateTierLabel(afterIdx, label) {
  const t = (BB_STATE.tiers || []).find(x => x.after === afterIdx);
  if (t) { t.label = label.trim(); bbSave(BB_STATE); }
}

function bbDemoteToHM(idx) {
  if (BB_STATE.top.length <= 1) return;
  const [item] = BB_STATE.top.splice(idx, 1);
  if (!BB_STATE.hm) BB_STATE.hm = [];
  BB_STATE.hm.unshift(item);
  // Tier-Breaks anpassen: alles nach idx rückt um 1 zurück
  BB_STATE.tiers = (BB_STATE.tiers || []).map(t => {
    if (t.after >= idx) return { ...t, after: t.after - 1 };
    return t;
  }).filter(t => t.after >= -1 && t.after < BB_STATE.top.length);
  bbSave(BB_STATE);
  renderBigBoard();
}

function bbPromoteFromHM(idx) {
  if (BB_STATE.top.length >= BB_MAX_TOP) {
    alert(`Maximum ${BB_MAX_TOP} Spieler in der Top-Liste. Verschiebe erst einen runter.`);
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
  e.currentTarget.classList.add('bb-dragging');
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

  const srcList = BB_DRAG.list;
  const srcIdx  = BB_DRAG.idx;
  const dstList = list;
  const dstIdx  = idx;
  BB_DRAG = null;

  if (srcList === dstList && srcIdx === dstIdx) return;

  // Item aus Quelle entfernen
  const srcArr = (srcList === 'top') ? BB_STATE.top : BB_STATE.hm;
  const dstArr = (dstList === 'top') ? BB_STATE.top : BB_STATE.hm;

  // Wenn Ziel = Top und voll, abbrechen
  if (dstList === 'top' && srcList === 'hm' && BB_STATE.top.length >= BB_MAX_TOP) {
    alert(`Top-Liste ist voll (${BB_MAX_TOP}). Verschiebe erst einen Spieler in HM.`);
    return;
  }

  const [item] = srcArr.splice(srcIdx, 1);
  let insertAt = dstIdx;
  // Wenn innerhalb derselben Liste verschoben wird, und Ziel-Idx > Quell-Idx,
  // muss insertAt um 1 reduziert werden (item wurde ja schon entfernt)
  if (srcList === dstList && dstIdx > srcIdx) insertAt = dstIdx - 1;
  dstArr.splice(insertAt, 0, item);

  // Tier-Breaks adjustieren — nur wenn Top betroffen ist
  if (srcList === 'top' || dstList === 'top') {
    BB_STATE.tiers = (BB_STATE.tiers || []).filter(t => t.after >= -1 && t.after < BB_STATE.top.length);
  }

  bbSave(BB_STATE);
  renderBigBoard();
}

function bbDragEnd(e) {
  document.querySelectorAll('.bb-dragging').forEach(el => el.classList.remove('bb-dragging'));
  document.querySelectorAll('.bb-drag-over').forEach(el => el.classList.remove('bb-drag-over'));
  BB_DRAG = null;
}

function bbBindDragHandlers() {
  // Nichts extra zu tun — handlers sind inline via Attribute
}

// ============================================================
//  EXPORT
// ============================================================
function bbExportJSON() {
  const json = JSON.stringify(BB_STATE, null, 2);
  // Versuche Copy to Clipboard
  navigator.clipboard.writeText(json).then(() => {
    alert('Big-Board-JSON in Zwischenablage kopiert.\n\nZum Commit ins Repo: füge das in js/big-board.js als BIG_BOARD_OFFICIAL Constant ein, oder speichere es in einer separaten Datei.');
  }).catch(() => {
    // Fallback: zeige in einem Textarea-Dialog
    const w = window.open('', '', 'width=600,height=500');
    w.document.write(`<title>Big Board JSON Export</title><pre style="font-family:monospace;white-space:pre-wrap;padding:20px;">${json.replace(/</g, '&lt;')}</pre>`);
    w.document.close();
  });
}

function bbPrintA4() {
  // Kurz Edit-Mode aus für den Druck, danach zurück
  const wasEditing = BB_EDITING;
  if (wasEditing) { BB_EDITING = false; renderBigBoard(); }
  setTimeout(() => {
    window.print();
    if (wasEditing) { BB_EDITING = true; renderBigBoard(); }
  }, 200);
}
