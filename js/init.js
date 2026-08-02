// On load: read hash and navigate to correct page
(function() {
  const initHash = window.location.hash;
  const initPageId = _pageIdFromHash(initHash);
  // Replace current history entry with proper state
  try { history.replaceState({ pageId: initPageId }, '', initHash || '#home'); } catch(e) {}
  renderHome(); // always render home data in background
  // Flow-Diagramm gehoert zur Home-Seite und wird deshalb hier gleich
  // mitgerendert, unabhaengig davon, welche Seite gerade offen ist.
  if (typeof initFlowDiagram === 'function') initFlowDiagram();
  if (initPageId !== 'homePage' && initHash) {
    _applyPage(initPageId);
    // Einziger Ort fuer "welche Seite braucht welche Init-Funktion" ist
    // _rerenderPage() in js/navigation.js -- hier NICHT nochmal eine eigene
    // Kopie der Liste pflegen. Frueher gab's hier eine zweite, eigene Liste,
    // die bei neuen Seiten (z.B. den 3 nativen Projections-Seiten) nicht
    // mitgepflegt wurde: beim direkten Neuladen (F5) auf einer Player-
    // Unterseite wurde die Seite zwar sichtbar (_applyPage), aber nie mit
    // Daten befuellt (das passiert erst in _rerenderPage) -- daher leer,
    // bis man einmal ueber die Navigation geklickt hat.
    _rerenderPage(initPageId);
  }
})();
initEspnSyncBtn();
espnSync(true);

// ============================================================
