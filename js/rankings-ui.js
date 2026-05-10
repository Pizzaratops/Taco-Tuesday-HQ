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
