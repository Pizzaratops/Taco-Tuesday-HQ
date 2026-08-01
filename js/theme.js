// ============================================================
//  THEME
// ============================================================
function toggleTheme() {
  const body = document.body;
  const btn = document.getElementById('themeToggle');
  if (body.classList.contains('light')) {
    body.classList.remove('light'); btn.textContent = '☀️ Light'; localStorage.setItem('theme','dark');
  } else {
    body.classList.add('light'); btn.textContent = '🌙 Dark'; localStorage.setItem('theme','light');
  }
  // Alle 3 Projections-Toolkit-Seiten sind seit 2026-08-01 native TTHQ-
  // Seiten — kein Iframe-/postMessage-Theme-Sync mehr noetig, die CSS-
  // Variablen greifen automatisch. Nur die als Inline-Styles gerenderten
  // Heatmap-/Statusfarben brauchen ein explizites Re-Render (unten).
  // Re-render standings chart if visible so legend/axis colors update
  const standingsPage = document.getElementById('standingsPage');
  if (standingsPage && standingsPage.classList.contains('active')) {
    setTimeout(renderStandingsChart, 50);
  }
  // Re-render trade analyzer if visible so rank badges & value colors update
  const tradePage = document.getElementById('tradePage');
  if (tradePage && tradePage.classList.contains('active')) {
    setTimeout(() => {
      renderTradeList('A');
      renderTradeList('B');
      renderTradeResult();
    }, 50);
  }
  // Re-render home team grid so team colors update
  const homePage = document.getElementById('homePage');
  if (homePage && homePage.classList.contains('active')) {
    setTimeout(renderHome, 50);
  }
  // Native Projections-/NBA-Teams-Tabellen neu rendern, falls sichtbar UND
  // schon geladen — Heatmap-Zellfarben sind fixe Inline-Styles, ziehen
  // sonst nicht automatisch nach (siehe js/projections-native.js bzw.
  // js/projections-teams-native.js).
  const liveProjectionsPage = document.getElementById('liveProjectionsPage');
  if (liveProjectionsPage && liveProjectionsPage.classList.contains('active') && typeof window.reRenderLiveProjections === 'function') {
    setTimeout(window.reRenderLiveProjections, 50);
  }
  const liveProjTeamsPage = document.getElementById('liveProjTeamsPage');
  if (liveProjTeamsPage && liveProjTeamsPage.classList.contains('active') && typeof window.reRenderLiveProjTeams === 'function') {
    setTimeout(window.reRenderLiveProjTeams, 50);
  }
  const liveProjDraftPage = document.getElementById('liveProjDraftPage');
  if (liveProjDraftPage && liveProjDraftPage.classList.contains('active') && typeof window.reRenderLiveProjDraft === 'function') {
    setTimeout(window.reRenderLiveProjDraft, 50);
  }
}
if (localStorage.getItem('theme') === 'light') {
  document.body.classList.add('light');
  document.getElementById('themeToggle').textContent = '🌙 Dark';
}
