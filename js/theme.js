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
  // Eingebettete Projections-Page (Iframe) live auf's gleiche Theme umstellen
  const projectionsFrame = document.getElementById('projectionsFrame');
  if (projectionsFrame && projectionsFrame.contentWindow) {
    const theme = body.classList.contains('light') ? 'light' : 'dark';
    // Seit dem Merge des Projections-Toolkits (projections/) ins gleiche Repo
    // ist der Iframe same-origin — targetOrigin daher window.location.origin
    // statt der frueheren externen GitHub-Pages-Domain.
    projectionsFrame.contentWindow.postMessage({ type: 'mfhfb-theme', theme }, window.location.origin);
  }
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
