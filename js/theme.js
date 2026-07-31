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
  // Eingebettete Projections-Toolkit-Seiten (3 Iframes: Projections/NBA
  // Teams/Draft Board, seit 2026-07-31 eigene Nav-Eintraege) live auf's
  // gleiche Theme umstellen — nur die, die schon geladen wurden (frame.src
  // gesetzt), sonst laeuft der ?theme=-URL-Parameter beim ersten Laden.
  const theme = body.classList.contains('light') ? 'light' : 'dark';
  ['projectionsFrame', 'projTeamsFrame', 'projDraftFrame'].forEach(id => {
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
}
if (localStorage.getItem('theme') === 'light') {
  document.body.classList.add('light');
  document.getElementById('themeToggle').textContent = '🌙 Dark';
}
