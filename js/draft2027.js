// ============================================================
//  2027 DRAFT BOARD DATA — leer, zum Befüllen
// ============================================================
//  Gleiche Struktur wie DRAFT_2026 (siehe data/draft2026.js):
//  { pick, name, pos, school, tier, scouting }
//  tier ist eine von: 'Tier 1','Tier 1.5','Tier 2','Tier 3','Tier 4','Tier 5','Tier 6','Mystery'
//  Einfach neue Einträge unten ins Array pushen.
// ============================================================
const DRAFT_2027 = [
  // {pick:1, name:"Beispiel Spieler", pos:"PF", school:"Beispiel University", tier:"Tier 1",
  //  scouting:"Scouting-Report-Text hier."},
];

// Nutzt posColor / pickNumClass / TIER_ORDER / TIER_STYLE_DARK / TIER_STYLE_LIGHT
// aus data/draft2026.js (davor geladen, gleicher globaler Scope).

let d27CurrentData = [...DRAFT_2027];

function renderDraft27(data) {
  const grid = document.getElementById('draft27Grid');
  const noR  = document.getElementById('draft27NoResults');
  if (!data.length) { grid.innerHTML = ''; noR.style.display = 'block'; return; }
  noR.style.display = 'none';

  const isFiltering = document.getElementById('draft27Search').value.trim() !== '';
  const isLight = document.body.classList.contains('light');
  const ts = isLight ? TIER_STYLE_LIGHT : TIER_STYLE_DARK;

  let html = '<div class="draft26-grid">';
  if (isFiltering) {
    data.forEach(p => { html += draft27Card(p); });
  } else {
    TIER_ORDER.forEach(tier => {
      const picks = data.filter(p => p.tier === tier);
      if (!picks.length) return;
      const s = ts[tier] || ts['Tier 6'];
      html += `<div class="draft26-tier-label" style="color:${s.label};border-color:${s.dot}22;">
        <span style="display:inline-block;width:8px;height:8px;border-radius:50%;background:${s.dot};margin-right:8px;vertical-align:middle;"></span>${tier}
      </div>`;
      picks.forEach(p => { html += draft27Card(p); });
    });
  }
  html += '</div>';
  grid.innerHTML = html;
}

function draft27Card(p) {
  const c = posColor(p.pos);
  const idx = DRAFT_2027.indexOf(p);
  return `<div class="draft26-card-wrap">
    <div class="draft26-card" onclick="openScoutModal27(${idx})" title="Klicken für Scouting Report">
      <div class="draft26-pick-num ${pickNumClass(p.pick, p.tier)}">${p.pick}</div>
      <div class="draft26-info">
        <div class="draft26-name">${p.name}</div>
        <div class="draft26-meta">
          <span class="draft26-pos" style="background:${c.bg};color:${c.txt};">${p.pos}</span>
          ${p.school ? `<span class="draft26-school">${p.school}</span>` : ''}
        </div>
        ${p.scouting ? `<div class="draft26-scout-preview">${p.scouting}</div>` : ''}
      </div>
      <div class="draft26-open-hint">🔍 öffnen</div>
    </div>
  </div>`;
}

function openScoutModal27(idx) {
  const p = DRAFT_2027[idx];
  const c = posColor(p.pos);
  const isLight = document.body.classList.contains('light');
  const ts = isLight ? TIER_STYLE_LIGHT : TIER_STYLE_DARK;
  const s = ts[p.tier] || ts['Tier 6'];
  document.getElementById('modalPick').textContent = `Pick #${p.pick} · ${p.tier}`;
  document.getElementById('modalName').textContent = p.name;
  document.getElementById('modalMeta').innerHTML = `
    <span class="draft26-pos" style="background:${c.bg};color:${c.txt};font-size:12px;font-weight:800;padding:3px 9px;border-radius:6px;">${p.pos}</span>
    ${p.school ? `<span class="scout-modal-tier">${p.school}</span>` : ''}
    <span class="scout-modal-tier" style="color:${s.label};border-color:${s.dot}44;">${p.tier}</span>
  `;
  document.getElementById('modalScouting').textContent = p.scouting || 'Kein Scouting Report verfügbar.';
  document.getElementById('scoutModal').classList.add('open');
  document.body.style.overflow = 'hidden';
}

function filterDraft27() {
  const q = document.getElementById('draft27Search').value.toLowerCase().trim();
  d27CurrentData = q
    ? DRAFT_2027.filter(p =>
        p.name.toLowerCase().includes(q) ||
        p.pos.toLowerCase().includes(q) ||
        (p.school || '').toLowerCase().includes(q))
    : [...DRAFT_2027];
  renderDraft27(d27CurrentData);
}

function showDraft27() {
  renderDraft27(d27CurrentData);
  navigate('draft27Page');
}
