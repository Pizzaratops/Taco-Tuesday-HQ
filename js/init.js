// On load: read hash and navigate to correct page
(function() {
  const initHash = window.location.hash;
  const initPageId = _pageIdFromHash(initHash);
  // Replace current history entry with proper state
  try { history.replaceState({ pageId: initPageId }, '', initHash || '#home'); } catch(e) {}
  if (initPageId === 'homePage' || !initHash) {
    renderHome();
  } else {
    renderHome(); // always render home data in background
    _applyPage(initPageId);
    // Run page-specific init
if (initPageId === 'standingsPage')     setTimeout(renderStandingsChart, 50);
    if (initPageId === 'nbaTradesPage')     renderNbaTrades();
    if (initPageId === 'adminSettingsPage') _asInit();
    if (initPageId === 'tradeHistoryPage')  renderTradeHistory();
    if (initPageId === 'draftboardPage')    showDraftboard();
    if (initPageId === 'bestAvailPage')     showBestAvail();
    if (initPageId === 'rankingsPage')      showRankings();
    if (initPageId === 'analyticsPage')     showAnalytics();
  }
})();
initEspnSyncBtn();
espnSync(true);

// ============================================================
