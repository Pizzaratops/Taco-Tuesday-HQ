// ============================================================
//  HASHTAG RANKINGS FUNCTIONS
// ============================================================
let hSortCol=0, hSortAsc=true, hCurrentData=[...HASHTAG_RANKINGS];

function renderHashtag(data) {
  const tbody=document.getElementById('hashtagBody');
  const noR=document.getElementById('hashtagNoResults');
  if(!data.length){tbody.innerHTML='';noR.style.display='block';return;}
  noR.style.display='none';
  tbody.innerHTML=data.map(p=>`<tr>
    <td><span class="r-rank ${rankClass(p[0])}">${p[0]}</span></td>
    <td><span class="r-name">${p[1]}</span></td>
    <td><span class="r-team">${p[2]}</span></td>
    <td><span class="r-pos">${p[3]}</span></td>
  </tr>`).join('');
}

function filterHashtag() {
  const q=document.getElementById('hashtagSearch').value.toLowerCase().trim();
  hCurrentData=q?HASHTAG_RANKINGS.filter(p=>p[1].toLowerCase().includes(q)||p[2].toLowerCase().includes(q)||p[3].toLowerCase().includes(q)):[...HASHTAG_RANKINGS];
  renderHashtag(hCurrentData);
}

function sortHashtag(col) {
  if(hSortCol===col) hSortAsc=!hSortAsc; else{hSortCol=col;hSortAsc=true;}
  document.querySelectorAll('#hashtagRankingsPage .rankings-table thead th').forEach((th,i)=>th.classList.toggle('r-sorted',i===col));
  hCurrentData.sort((a,b)=>{const av=a[col],bv=b[col];const c=typeof av==='number'?av-bv:String(av).localeCompare(String(bv));return hSortAsc?c:-c;});
  renderHashtag(hCurrentData);
}

function showHashtagRankings() { renderHashtag(hCurrentData); navigate('hashtagRankingsPage'); }

// ============================================================
//  DYNASTY RANKINGS — showRankings() war nicht definiert
// ============================================================
let rSortCol=0, rSortAsc=true, rCurrentData=[...DYNASTY_PLAYERS];

function renderDynastyRankings(data) {
  const tbody = document.getElementById('rankingsBody');
  const noR   = document.getElementById('rankingsNoResults');
  if (!data.length) { tbody.innerHTML=''; if(noR) noR.style.display='block'; return; }
  if(noR) noR.style.display='none';
  tbody.innerHTML = data.map(p => {
    const mRk = MATT_RANKS[p[1]] || null;
    const hRk = hashtagRank(p[1]);
    const mBadge = mRk
      ? `<span style="font-size:11px;font-weight:800;padding:2px 8px;border-radius:6px;background:${dynastyRankBg(mRk)};color:${dynastyRankColor(mRk)};">#${mRk}</span>`
      : `<span style="color:var(--border);font-size:11px;">—</span>`;
    const hBadge = hRk
      ? `<span style="font-size:11px;font-weight:800;padding:2px 8px;border-radius:6px;background:${dynastyRankBg(hRk)};color:${dynastyRankColor(hRk)};">#${hRk}</span>`
      : `<span style="color:var(--border);font-size:11px;">—</span>`;
    return `<tr>
      <td><span class="r-rank ${rankClass(p[0])}">${p[0]}</span></td>
      <td><span class="r-name">${p[1]}</span></td>
      <td><span class="r-team">${p[2]}</span></td>
      <td><span class="r-pos">${p[3]}</span></td>
      <td style="text-align:center;">${mBadge}</td>
      <td style="text-align:center;">${hBadge}</td>
    </tr>`;
  }).join('');
}

function filterRankings() {
  const q = document.getElementById('rankSearch').value.toLowerCase().trim();
  rCurrentData = q
    ? DYNASTY_PLAYERS.filter(p => p[1].toLowerCase().includes(q) || p[2].toLowerCase().includes(q) || p[3].toLowerCase().includes(q))
    : [...DYNASTY_PLAYERS];
  renderDynastyRankings(rCurrentData);
}

function sortRankings(col) {
  if(rSortCol===col) rSortAsc=!rSortAsc; else{rSortCol=col;rSortAsc=true;}
  document.querySelectorAll('#rankingsPage .rankings-table thead th').forEach((th,i)=>th.classList.toggle('r-sorted',i===col));
  rCurrentData.sort((a,b)=>{const av=a[col],bv=b[col];const c=typeof av==='number'?av-bv:String(av).localeCompare(String(bv));return rSortAsc?c:-c;});
  renderDynastyRankings(rCurrentData);
}

function showRankings() {
  renderDynastyRankings(rCurrentData);
  navigate('rankingsPage');
}
