// ============================================================
//  SCHUTZ GEGEN UNAUFGELOESTE MERGE-KONFLIKTE
// ============================================================
//  Herkunft (16./17.08.2026): ein Commit ("hashtag") landete mit
//  unaufgeloesten Konfliktmarkern (<<<<<<< HEAD / ======= / >>>>>>>) in
//  index.html im Repo. scripts/bump-data-version.js ersetzt dort nur
//  gezielt ?v=-Parameter per Regex und laesst den Rest der Datei unangetastet
//  -- der kaputte Zustand wurde deshalb klaglos jeden Tag weiter mit frischen
//  Hashes versehen und committet. Sichtbar wurde es erst, als die Marker als
//  Text auf der echten Seite auftauchten.
//
//  Ursprünglich lebte dieser Schutz nur lokal in bump-data-version.js und
//  deckte deshalb nur index.html ab. Dieselbe Fehlerklasse trifft aber auch
//  die drei Live-Scores/Boxscores/Aggregate-Konvertierungs-Scripts: die
//  laden ihre bestehende Ausgabedatei per vm.runInContext, und ein
//  Konfliktmarker darin ist ein JS-Syntaxfehler -- ohne diesen Guard fangen
//  sie das nur als generischen Parse-Fehler ab und schreiben die Datei
//  klaglos vollstaendig neu (siehe deren jeweiligen catch-Block), was die
//  komplette bisherige Historie dieser Datei loescht (23.08.2026 als
//  gemeinsames Modul extrahiert, damit alle vier Stellen denselben Schutz
//  nutzen statt vier unabhaengige Kopien zu pflegen).
//
//  Bewusst FATAL (wirft), nicht nur eine Warnung -- ein
//  Datenintegritaetsfehler dieser Art soll den taeglichen Workflow sichtbar
//  rot einfaerben, nicht still durchlaufen oder committete Historie loeschen.
function assertNoConflictMarkers(filePath, content) {
  const markers = [
    { pat: /^<{7} /m, label: '<<<<<<<' },
    { pat: /^>{7} /m, label: '>>>>>>>' },
  ];
  for (const { pat, label } of markers) {
    const m = content.match(pat);
    if (m) {
      const line = content.slice(0, m.index).split('\n').length;
      throw new Error(
        `UNAUFGELOESTER MERGE-KONFLIKT in ${filePath}, Zeile ${line} ` +
        `(Marker "${label}"). Das ist wahrscheinlich beim letzten manuellen Merge liegen ` +
        `geblieben -- bitte von Hand pruefen und auflösen, bevor der Workflow weiterlaeuft.`
      );
    }
  }
}

module.exports = { assertNoConflictMarkers };
