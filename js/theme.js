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
  // Eingebettete Projections-Toolkit-Seiten (Iframes: NBA Teams/Draft
  // Board) live auf's gleiche Theme umstellen — nur die, die schon geladen
  // wurden (frame.src gesetzt), sonst laeuft der ?theme=-URL-Parameter beim
  // ersten Laden. "Projections" selbst braucht das seit 2026-08-01 NICHT
  // mehr: echte native TTHQ-Seite (kein Iframe mehr), erbt die CSS-
  // Variablen automatisch ueber die normale DOM-Kaskade.
  const theme = body.classList.contains('light') ? 'light' : 'dark';
  ['projTeamsFrame', 'projDraftFrame'].forEach(id => {
    const frame = document.getElementById(id);
    if (frame && frame.src && frame.contentWindow) {
      // Seit dem Merge des Projections-Toolkits (projections/) ins gleiche
      // Repo ist der Iframe same-origin — targetOrigin daher
      // window.location.origin statt der frueheren externen GitHub-Pages-Domain.
      frame.contentWindow.postMessage({ type: 'mfhfb-theme', theme }, window.location.origin);
    }
  });
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
  // Native Projections-Tabelle neu rendern, falls sichtbar UND schon
  // geladen — Heatmap-Zellfarben sind fixe Inline-Styles, ziehen sonst
  // nicht automatisch nach (siehe js/projections-native.js).
  const liveProjectionsPage = document.getElementById('liveProjectionsPage');
  if (liveProjectionsPage && liveProjectionsPage.classList.contains('active') && typeof window.reRenderLiveProjections === 'function') {
    setTimeout(window.reRenderLiveProjections, 50);
  }
}
if (localStorage.getItem('theme') === 'light') {
  document.body.classList.add('light');
  document.getElementById('themeToggle').textContent = '🌙 Dark';
}
