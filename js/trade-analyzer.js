// ============================================================
//  TRADE ANALYZER
// ============================================================

// Trade values from MFHFBs spreadsheet (rank → value lookup).
const TRADE_VALUE_TABLE = {"1": 2107.0, "2": 1873.5, "3": 1857.0, "4": 1792.0, "5": 1564.5, "6": 1555.0, "7": 1517.0, "8": 1492.5, "9": 1486.5, "10": 1435.5, "11": 1416.0, "12": 1409.0, "13": 1397.0, "14": 1376.5, "15": 1370.0, "16": 1358.0, "17": 1338.0, "18": 1324.5, "19": 1287.5, "20": 1274.0, "21": 1258.5, "22": 1222.5, "23": 1193.0, "24": 1182.5, "25": 1164.5, "26": 1156.5, "27": 1146.5, "28": 1135.5, "29": 1118.0, "30": 1099.5, "31": 1089.0, "32": 1078.5, "33": 1063.5, "34": 1048.0, "35": 1038.0, "36": 1025.0, "37": 1015.0, "38": 994.5, "39": 976.0, "40": 966.0, "41": 955.5, "42": 949.0, "43": 930.5, "44": 922.0, "45": 916.0, "46": 904.0, "47": 897.0, "48": 880.0, "49": 878.0, "50": 872.0, "51": 867.5, "52": 865.5, "53": 864.0, "54": 862.0, "55": 844.0, "56": 826.5, "57": 823.0, "58": 813.0, "59": 808.5, "60": 805.5, "61": 803.0, "62": 801.0, "63": 799.0, "64": 793.5, "65": 789.0, "66": 787.5, "67": 782.0, "68": 781.75, "69": 780.5, "70": 772.25, "71": 770.5, "72": 769.75, "73": 768.5, "74": 768.25, "75": 767.5, "76": 766.75, "77": 765.5, "78": 758.25, "79": 757.0, "80": 756.75, "81": 755.0, "82": 751.25, "83": 744.5, "84": 743.25, "85": 742.0, "86": 739.75, "87": 739.0, "88": 736.75, "89": 735.0, "90": 730.75, "91": 723.0, "92": 721.75, "93": 720.0, "94": 719.25, "95": 717.0, "96": 712.75, "97": 711.5, "98": 710.75, "99": 708.5, "100": 707.75, "101": 705.0, "102": 703.25, "103": 702.0, "104": 701.75, "105": 701.5, "106": 700.75, "107": 697.5, "108": 693.25, "109": 691.0, "110": 686.75, "111": 680.5, "112": 680.25, "113": 677.0, "114": 672.25, "115": 670.0, "116": 668.75, "117": 666.5, "118": 665.25, "119": 662.0, "120": 659.75, "124": 652.5, "125": 652.25, "126": 651.0, "129": 644.25, "130": 642.0, "131": 641.75, "132": 641.0, "133": 640.25, "134": 637.0, "135": 636.25, "136": 635.0, "137": 632.75, "138": 630.5, "139": 629.75, "140": 629.5, "141": 628.25, "142": 628.0, "143": 627.75, "144": 627.0, "145": 626.75, "146": 626.5, "147": 625.75, "148": 625.5, "149": 625.25, "150": 625.0, "151": 624.75, "152": 621.0, "153": 620.75, "154": 620.0, "155": 619.75, "156": 619.5, "157": 619.25, "158": 619.0, "159": 618.25, "160": 618.0, "161": 617.25, "162": 617.0, "163": 616.25, "164": 616.0, "165": 615.75, "166": 615.5, "167": 614.75, "168": 614.5, "169": 614.25, "170": 614.0, "171": 613.75, "172": 613.5, "173": 612.75, "174": 612.0, "175": 611.75, "176": 611.5, "177": 611.25, "178": 611.0, "179": 610.75, "180": 610.5, "181": 610.25, "182": 610.0, "183": 609.75, "184": 609.0, "185": 608.75, "186": 608.5, "187": 608.25, "188": 608.0, "189": 607.0, "190": 606.25, "191": 606.0, "192": 605.75, "193": 605.5, "194": 605.25, "195": 605.0, "196": 604.75, "197": 604.5, "198": 603.75, "199": 603.5, "200": 603.25, "201": 603.0, "202": 602.75, "203": 602.5, "204": 602.25, "205": 601.5, "206": 601.25, "207": 601.0, "208": 600.25, "209": 600.0, "210": 599.75, "211": 599.0, "212": 598.75, "213": 598.5, "214": 598.25, "215": 597.5, "216": 597.25, "217": 596.5, "218": 596.25, "219": 596.0, "220": 595.25, "221": 595.0, "222": 594.75, "223": 594.5, "224": 594.25, "225": 592.5, "226": 592.35, "227": 592.2, "228": 592.05, "229": 591.9, "230": 591.25, "231": 591.1, "232": 590.95, "233": 590.3, "234": 590.15, "235": 590.0, "236": 589.35, "237": 588.7, "238": 588.55, "239": 588.4, "240": 586.75, "241": 585.6, "242": 583.95, "243": 583.3, "244": 581.65, "245": 581.5, "246": 579.85, "247": 579.2, "248": 579.05, "249": 578.4, "250": 577.75, "251": 574.1, "252": 573.45, "253": 572.8, "254": 572.15, "255": 572.0, "256": 568.85, "257": 568.7, "258": 567.55, "259": 565.9, "260": 565.75, "261": 564.1, "262": 562.45, "263": 559.8, "264": 558.65, "265": 557.5, "266": 556.85, "267": 554.7, "268": 554.55, "269": 553.9, "270": 553.75, "271": 552.5, "272": 551.9, "273": 550.8, "274": 550.2, "275": 549.6, "276": 549.5, "277": 548.9, "278": 547.8, "279": 546.7, "280": 546.1, "281": 544.5, "282": 543.9, "283": 543.3, "284": 542.7, "285": 542.1, "286": 541.5, "287": 541.4, "288": 539.8, "289": 538.7, "290": 538.6, "291": 538.0, "292": 537.9, "293": 536.8, "294": 536.7, "295": 536.1, "296": 535.0, "297": 534.9, "298": 533.3, "299": 533.2, "300": 531.6, "301": 531.0, "302": 530.4, "303": 530.3, "304": 530.2, "305": 529.6, "306": 529.5, "307": 528.9, "308": 528.8, "309": 527.7, "310": 527.6, "311": 527.5, "312": 527.4, "313": 526.8, "314": 526.2, "315": 526.1, "316": 526.0, "317": 525.4, "318": 525.3, "319": 525.2, "320": 525.1, "321": 525.0, "322": 524.4, "323": 524.3, "324": 524.2, "325": 524.1, "326": 524.0, "327": 523.9, "328": 523.5, "329": 522.95, "330": 522.9, "331": 522.85, "332": 522.8, "333": 522.25, "334": 522.2, "335": 522.15, "336": 522.1, "337": 522.05, "338": 521.5, "339": 521.45, "340": 521.4, "341": 520.85, "342": 520.8, "343": 520.75, "344": 520.2, "345": 520.15, "346": 520.1, "347": 520.05, "348": 520.0, "349": 519.45, "350": 519.4, "351": 519.35, "352": 519.3, "353": 518.75, "354": 518.7, "355": 518.65, "356": 518.6, "357": 518.05, "358": 517.5, "359": 517.45, "360": 516.9, "361": 516.85, "362": 516.8, "363": 516.25, "364": 516.2, "365": 516.15, "366": 516.1, "367": 515.55, "368": 515.5, "369": 514.45, "370": 514.4, "371": 513.85, "372": 513.8, "373": 513.75, "374": 513.5, "375": 513.45, "376": 513.4, "377": 512.85, "378": 512.8, "379": 512.25, "380": 511.2, "381": 511.15, "382": 511.1, "383": 511.05, "384": 510.0, "385": 509.95, "386": 509.9, "387": 508.85, "388": 508.8, "389": 508.75, "390": 508.2, "391": 507.65, "392": 507.1, "393": 507.05, "394": 507.0, "395": 505.95, "396": 505.4, "397": 505.35, "398": 505.3, "399": 504.75, "400": 504.7, "401": 504.65, "402": 503.6, "403": 503.05, "404": 502.5, "405": 502.45, "406": 502.4, "407": 502.35, "408": 501.8, "409": 501.75, "410": 501.2, "411": 501.15, "412": 500.6, "413": 499.5, "414": 499.45, "415": 499.4, "416": 499.35, "417": 499.3, "418": 499.25, "419": 499.2, "420": 498.65, "421": 498.1, "422": 498.05, "423": 498.0, "424": 497.95, "425": 497.9, "426": 497.35, "427": 497.3, "428": 497.25, "429": 496.7, "430": 496.65, "431": 495.6, "432": 494.55, "433": 494.0, "434": 493.45, "435": 492.4, "436": 492.35, "437": 492.3, "438": 491.75, "439": 491.2, "440": 491.15, "441": 489.6, "442": 489.55, "443": 489.0, "444": 487.45, "445": 485.4, "446": 484.35, "447": 483.8, "448": 482.75, "449": 482.2, "450": 482.15, "451": 480.1, "452": 479.55, "453": 477.5, "454": 477.45, "455": 475.9, "456": 475.35, "457": 472.3, "458": 471.75, "459": 471.7, "460": 471.65, "461": 470.1, "462": 469.55, "463": 464.0, "464": 463.45, "465": 462.9, "466": 462.0, "467": 461.45, "468": 460.9, "469": 460.85, "470": 460.3, "471": 460.25, "472": 459.2, "473": 459.15, "474": 458.6, "475": 458.55, "476": 458.5, "477": 457.95, "478": 457.4, "479": 456.85, "480": 455.8, "481": 455.25, "482": 455.2, "483": 453.65, "484": 453.6, "485": 453.05, "486": 453.0, "487": 451.95, "488": 451.9, "489": 451.85, "490": 451.3, "491": 451.25, "492": 451.2, "493": 451.15, "494": 451.1, "495": 451.05, "496": 451.0, "497": 450.45, "498": 449.4, "499": 449.35, "500": 448.8, "501": 448.75, "502": 447.7, "503": 447.65, "504": 447.6, "505": 445.55, "506": 445.5, "507": 445.45, "508": 444.4, "509": 443.85, "510": 443.3, "511": 443.25, "512": 443.2, "513": 442.65, "514": 442.6, "515": 442.05, "516": 442.0, "517": 441.45, "518": 440.9, "519": 440.85, "520": 439.8, "521": 439.75, "522": 439.7, "523": 439.15, "524": 439.1, "525": 438.55, "526": 437.5, "527": 435.95, "528": 435.9, "529": 435.35, "530": 434.8, "531": 433.75, "532": 433.2, "533": 433.15, "534": 433.1, "535": 432.05, "536": 432.0, "537": 429.95, "538": 429.4, "539": 428.35,"540": 427.8,"541": 427.25,"542": 426.7,"543": 426.15,"544": 425.6,"545": 425.05,"546": 424.5,"547": 423.95,"548": 423.4,"549": 422.85,"550": 422.3,"551": 421.75,"552": 421.2,"553": 420.65,"554": 420.1,"555": 419.55,"556": 419.0,"557": 418.45,"558": 417.9,"559": 417.35,"560": 416.8,"561": 416.25,"562": 415.7,"563": 415.15,"564": 414.6,"565": 414.05,"566": 413.5,"567": 412.95,"568": 412.4,"569": 411.85,"570": 411.3,"571": 410.75,"572": 410.2,"573": 409.65,"574": 409.1,"575": 408.55,"576": 408.0,"577": 407.45,"578": 406.9,"579": 406.35,"580": 405.8,"581": 405.25,"582": 404.7,"583": 404.15,"584": 403.6,"585": 403.05,"586": 402.5,"587": 401.95,"588": 401.4,"589": 400.85};

// ============================================================
//  VALUATION MODE  (dynasty | raw | winnow)
// ============================================================
let TRADE_MODE = 'dynasty';

const MODE_DESCRIPTIONS = {
  dynasty: '<strong style="color:var(--text);">Dynasty:</strong> Age-adjusted for long-term value. Young players get a significant boost, veterans are discounted. Best for rebuilding teams.',
  raw:     '<strong style="color:var(--text);">Raw:</strong> Pure rank-based value with no age adjustment. Neutral consensus view — useful as a baseline when both sides disagree.',
  winnow:  '<strong style="color:var(--text);">Win-Now:</strong> Veterans get a bonus, unproven youngsters are discounted. Best for contending teams prioritizing the next 2–3 seasons.'
};

function setTradeMode(mode) {
  TRADE_MODE = mode;
  document.querySelectorAll('.trade-mode-btn').forEach(b => b.classList.remove('active'));
  document.getElementById('modeBtn-' + mode).classList.add('active');
  document.getElementById('tradeModeDesc').innerHTML = MODE_DESCRIPTIONS[mode];
  // Re-render everything so value badges update immediately without re-clicking
  renderTradeList('A');
  renderTradeList('B');
  renderSelectedPills('A');
  renderSelectedPills('B');
  renderTradeResult();
}

// ============================================================
//  AGE CALCULATION
// ============================================================
function playerAgeToday(dobStr) {
  if (!dobStr) return 26; // fallback to neutral age
  const dob = new Date(dobStr);
  const today = new Date();
  let age = today.getFullYear() - dob.getFullYear();
  const m = today.getMonth() - dob.getMonth();
  if (m < 0 || (m === 0 && today.getDate() < dob.getDate())) age--;
  return age;
}

// Age multiplier per mode.
// Dynasty: heavily rewards youth, penalizes age
// Raw: flat 1.0 always
// Win-Now: slight youth penalty, veteran bonus up to ~32, then decline
function ageMultiplier(dobStr, mode) {
  if (mode === 'raw') return 1.0;
  const age = playerAgeToday(dobStr);
  if (mode === 'dynasty') {
    if (age <= 19) return 1.50;
    if (age <= 21) return 1.35;
    if (age <= 23) return 1.20;
    if (age <= 25) return 1.08;
    if (age <= 27) return 1.00;
    if (age <= 29) return 0.82;
    if (age <= 31) return 0.62;
    if (age <= 33) return 0.42;
    if (age <= 35) return 0.22;
    return 0.08;
  }
  if (mode === 'winnow') {
    if (age <= 19) return 0.70;
    if (age <= 21) return 0.82;
    if (age <= 23) return 0.92;
    if (age <= 25) return 1.00;
    if (age <= 27) return 1.10;
    if (age <= 29) return 1.15;
    if (age <= 31) return 1.08;
    if (age <= 33) return 0.88;
    if (age <= 35) return 0.62;
    return 0.30;
  }
  return 1.0;
}

// ============================================================
//  REPLACEMENT FLOOR & CLIFF
// ============================================================
// Dynamic: average raw value of ranks 175–250 from your actual table.
const REPLACEMENT_VALUE = (() => {
  const ranks = [];
  for (let r = 175; r <= 250; r++) {
    const v = TRADE_VALUE_TABLE[String(r)];
    if (v !== undefined) ranks.push(v);
  }
  return ranks.reduce((a, b) => a + b, 0) / ranks.length;
})();


// ============================================================
//  F: Slot-basierte Pick-Werte (early/mid/late für 2026 R1)
// ============================================================
// Für Picks mit explizit gesetztem slot (1-12) wird der Wert
// dynamisch nach Slot-Position berechnet. Für alle anderen Picks
// (ohne slot, z.B. 2026 R2+, 2027+) bleibt "mid" als Standard.
function slotAwarePickValue(pick) {
  if (!pick || !pick.year || !pick.round) return 0;
  const yr = String(pick.year);
  const rd = pick.round;
  // Bestimme Pick-Range basierend auf Slot
  let range = 'mid';
  if (pick.slot != null) {
    if (pick.slot <= 4)       range = 'early';
    else if (pick.slot <= 8)  range = 'mid';
    else                       range = 'late';
  }
  const key = `${yr}_R${rd}_${range}`;
  return (typeof PICK_VALUES !== 'undefined' && PICK_VALUES[key]) || 0;
}

// Cliff multiplier: tuned for a 312-player league.
// Rank 100 is still a real asset; zero past rank 175.
function dynastyCliff(rank) {
  if (rank <= 50)  return 1.00;
  if (rank <= 100) return 0.85;
  if (rank <= 150) return 0.65;
  if (rank <= 175) return 0.35;
  return 0.00;
}

function dynastyValue(rank, dob) {
  let raw;
  if (TRADE_VALUE_TABLE[rank] !== undefined) {
    raw = TRADE_VALUE_TABLE[rank];
  } else {
    const keys = Object.keys(TRADE_VALUE_TABLE).map(Number);
    const maxRank = Math.max(...keys);
    raw = rank > maxRank ? TRADE_VALUE_TABLE[String(maxRank)] : TRADE_VALUE_TABLE['1'];
  }
  // Apply replacement floor + cliff
  const baseValue = Math.max(0, Math.round((raw - REPLACEMENT_VALUE) * dynastyCliff(rank)));
  // Apply age multiplier based on current valuation mode
  return Math.max(0, Math.round(baseValue * ageMultiplier(dob, TRADE_MODE)));
}

// Aggregate trade value with diminishing returns per additional player.
// Because deep prospects are already near-zero after the cliff + replacement floor,
// stacking many fringe players cannot manufacture value equal to one real asset.
function tradeSideValue(players) {
  if (!players.length) return 0;
  const withValues = players
    .map(p => p.isPick ? pickTradeValue(p, TRADE_MODE) : dynastyValue(p.rank, p.dob))
    .sort((a, b) => b - a);
  let total = 0;
  withValues.forEach((val, i) => { total += val * Math.pow(0.80, i); });
  return Math.round(total);
}

const TRADE_STATE = {
  A: { nbaFilter: '', ttFilter: '', search: '', selected: [], showPicks: false },
  B: { nbaFilter: '', ttFilter: '', search: '', selected: [], showPicks: false },
};

// Pre-built lookup maps for Hashtag and Matt rankings
const _hashtagRankMap = (() => {
  const m = {};
  HASHTAG_RANKINGS.forEach(p => { m[p[1].toLowerCase()] = p[0]; });
  return m;
})();

function hashtagRank(name) {
  const canonical = normalizeName(name).toLowerCase()
    .normalize('NFD').replace(/[\u0300-\u036f]/g, '');
  const entry = HASHTAG_RANKINGS.find(p =>
    normalizeName(p[1]).toLowerCase()
      .normalize('NFD').replace(/[\u0300-\u036f]/g, '') === canonical
  );
  return entry ? entry[0] : null;
}

function mattRank(name) {
  const canonical = normalizeName(name);
  return MATT_RANKS[canonical] ?? MATT_RANKS[name] ?? null;
}

function rankBadgeHtml(label, rank, style) {
  if (rank === null) return `<span style="font-size:9px;font-weight:700;color:var(--muted);white-space:nowrap;">${label} —</span>`;
  return `<span style="font-size:9px;font-weight:700;${style}padding:1px 5px;border-radius:3px;white-space:nowrap;">${label} #${rank}</span>`;
}

function rankStyle(rank) {
  if (rank === null) return '';
  const isLight = document.body.classList.contains('light');
  if (rank <= 5)   return isLight ? 'background:rgba(154,110,16,0.18);color:#9a6e10;'  : 'background:rgba(245,200,66,0.18);color:#f5c842;';
  if (rank <= 15)  return isLight ? 'background:rgba(192,98,47,0.18);color:#c0622f;'   : 'background:rgba(108,99,255,0.18);color:#a89bff;';
  if (rank <= 30)  return isLight ? 'background:rgba(61,138,92,0.18);color:#2d7a50;'   : 'background:rgba(76,175,129,0.18);color:#6dddaa;';
  if (rank <= 75)  return isLight ? 'background:rgba(42,122,184,0.15);color:#2a7ab8;'  : 'background:rgba(41,182,246,0.15);color:#4fc3f7;';
  if (rank <= 150) return isLight ? 'background:rgba(180,60,100,0.13);color:#b43c64;'  : 'background:rgba(255,101,132,0.13);color:#ff8fa3;';
  return 'background:rgba(123,127,158,0.13);color:var(--muted);';
}

function buildTradePlayerPool() {
  const ownerMap = buildFantasyOwnerMap();
  const players  = DYNASTY_PLAYERS.map(p => {
    const ownerId = ownerMap[p[1].toLowerCase()] || null;
    const owner   = ownerId ? teamMap[ownerId] : null;
    return { isPick: false, rank: p[0], name: p[1], nba: p[2], pos: p[3], dob: p[4] || null, owner, ownerId };
  });
  return [...players, ...buildPickPool()];
}

function rankBadgeStyle(rank) {
  if (rank === 1)      return 'background:rgba(245,200,66,0.2);color:#f5c842;';
  if (rank <= 5)       return 'background:rgba(108,99,255,0.2);color:#a89bff;';
  if (rank <= 15)      return 'background:rgba(76,175,129,0.2);color:#6dddaa;';
  if (rank <= 30)      return 'background:rgba(41,182,246,0.2);color:#4fc3f7;';
  if (rank <= 75)      return 'background:rgba(255,101,132,0.15);color:#ff8fa3;';
  return 'background:rgba(123,127,158,0.15);color:var(--muted);';
}

function valueBadgeStyle(val) {
  const isLight = document.body.classList.contains('light');
  if (val >= 9000) return isLight ? 'background:rgba(154,110,16,0.2);color:#9a6e10;'  : 'background:rgba(245,200,66,0.2);color:#f5c842;';
  if (val >= 7000) return isLight ? 'background:rgba(192,98,47,0.2);color:#c0622f;'   : 'background:rgba(108,99,255,0.2);color:#a89bff;';
  if (val >= 5000) return isLight ? 'background:rgba(61,138,92,0.2);color:#2d7a50;'   : 'background:rgba(76,175,129,0.2);color:#6dddaa;';
  if (val >= 3000) return isLight ? 'background:rgba(42,122,184,0.2);color:#2a7ab8;'  : 'background:rgba(41,182,246,0.2);color:#4fc3f7;';
  if (val >= 1500) return isLight ? 'background:rgba(180,60,100,0.15);color:#b43c64;' : 'background:rgba(255,101,132,0.15);color:#ff8fa3;';
  return 'background:rgba(123,127,158,0.15);color:var(--muted);';
}

function initTradeDropdowns() {
  const nbaAbbrs = [...new Set(DYNASTY_PLAYERS.map(p => p[2]))].filter(a => a !== 'FA').sort();
  const nbaOpts = nbaAbbrs.map(a => `<option value="${a}">${a} – ${NBA_TEAM_NAMES[a]||a}</option>`).join('');
const ttOpts = `<option value="unowned">👻 Unowned</option>` + TEAMS.map(t => `<option value="${t.id}">${t.name}</option>`).join('');
  ['A','B'].forEach(side => {
    document.getElementById('tradeNbaFilter'+side).innerHTML = `<option value="">🏀 NBA Team</option>${nbaOpts}`;
    document.getElementById('tradeTTFilter'+side).innerHTML = `<option value="">🌮 TT Team</option>${ttOpts}`;
  });
}

function applyTradeDropdown(side) {
  TRADE_STATE[side].nbaFilter = document.getElementById('tradeNbaFilter'+side).value;
  TRADE_STATE[side].ttFilter  = document.getElementById('tradeTTFilter'+side).value;
  // Update visual state on dropdowns
  const nbaEl = document.getElementById('tradeNbaFilter'+side);
  const ttEl  = document.getElementById('tradeTTFilter'+side);
  nbaEl.classList.toggle('has-filter', !!TRADE_STATE[side].nbaFilter);
  ttEl.classList.toggle('has-filter', !!TRADE_STATE[side].ttFilter);
  renderTradeList(side);
}

function filterTradePlayers(side) {
  TRADE_STATE[side].search = document.getElementById('tradeSearch'+side).value;
  renderTradeList(side);
}

function renderTradeList(side) {
  const st   = TRADE_STATE[side];
  const list = document.getElementById('tradeList' + side);

  // ── PICK MODE ──────────────────────────────────────────────
  if (st.showPicks) {
    const ttFilterId = st.ttFilter ? parseInt(st.ttFilter) : null;
    const isLight    = document.body.classList.contains('light');

    // Kein TT-Team gewählt → Hinweis
    if (!ttFilterId) {
      list.innerHTML = `<div style="text-align:center;padding:28px 16px;color:var(--muted);font-size:13px;line-height:1.8;">
        <div style="font-size:28px;margin-bottom:8px;">🌮</div>
        <strong style="color:var(--text);display:block;margin-bottom:4px;">Team wählen</strong>
        Wähle zuerst ein TT-Team im Filter oben,<br>um die gehaltenen Picks zu sehen.
      </div>`;
      return;
    }

    // Alle Picks die dieses Team HÄLT (currentOwner)
    const heldPicks = PICKS.filter(p => p.currentOwner === ttFilterId);

    if (!heldPicks.length) {
      list.innerHTML = '<div class="trade-no-players">Dieses Team besitzt keine Picks.</div>';
      return;
    }

    const q            = (st.search || '').toLowerCase().trim();
    const selectedKeys = st.selected.filter(s => s.isPick).map(s => s.pickKey);

    // Nach Jahr gruppieren
    const byYear = {};
    heldPicks.forEach(p => {
      if (!byYear[p.year]) byYear[p.year] = [];
      byYear[p.year].push(p);
    });

    let html = '';
    Object.keys(byYear).sort().forEach(year => {
      const picks = byYear[year]
        .filter(p => {
          if (!q) return true;
          const orig = teamMap[p.originalOwner];
          return String(p.year).includes(q) ||
                 String(p.round).includes(q) ||
                 orig.name.toLowerCase().includes(q);
        })
        .sort((a, b) => a.round - b.round || a.originalOwner - b.originalOwner);

      if (!picks.length) return;

      html += `<div style="padding:6px 12px 4px;font-size:10px;font-weight:800;letter-spacing:1.5px;text-transform:uppercase;color:var(--muted);background:var(--surface2);border-bottom:1px solid var(--border);">${year}</div>`;

      picks.forEach(p => {
        const orig   = teamMap[p.originalOwner];
        const traded = p.originalOwner !== p.currentOwner;
        const key    = `${p.year}_R${p.round}_T${p.originalOwner}`;
        const isSel  = selectedKeys.includes(key);
        const val    = slotAwarePickValue(p);

        const ownLabel    = 'Eigener Pick';
        const tradedLabel = `→ von ${orig.name}`;
        const statusTxt   = traded ? tradedLabel : ownLabel;

        const statusColor = traded
          ? (isLight ? '#b43c64'   : '#ff8fa3')
          : (isLight ? '#c0622f'   : '#6c63ff');
        const statusBg    = traded
          ? (isLight ? 'rgba(180,60,100,0.1)'  : 'rgba(255,101,132,0.1)')
          : (isLight ? 'rgba(192,98,47,0.1)'   : 'rgba(108,99,255,0.12)');

        html += `<div class="pick-item ${isSel ? 'selected' : ''}"
          onclick="toggleTradePickDirect('${side}','${key}',${p.year},${p.round},${p.originalOwner},${p.currentOwner},${val},'${traded}',${p.slot || 'null'})">
          <div class="tp-check" style="margin-top:2px;flex-shrink:0;">
            ${isSel ? '<svg width="10" height="10" viewBox="0 0 12 12" fill="none"><polyline points="2,6 5,9 10,3" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>' : ''}
          </div>
          <div style="flex:1;min-width:0;">
            <div style="display:flex;align-items:center;gap:6px;flex-wrap:wrap;">
              <span style="font-family:'Playfair Display',serif;font-size:14px;font-weight:800;color:#c58f32;">${year}</span>
              <span class="pick-round-pos">Round ${p.round}</span>
              ${p.slot ? `<span style="font-size:9px;font-weight:800;background:rgba(108,99,255,0.18);color:#6c63ff;padding:1px 6px;border-radius:3px;letter-spacing:0.5px;">Pick #${p.slot}</span>` : ''}
              ${p.note ? `<span style="font-size:9px;background:rgba(245,200,66,0.15);color:#f5c842;padding:1px 5px;border-radius:3px;">${p.note}</span>` : ''}
            </div>
            <div style="margin-top:5px;">
              <span style="font-size:11px;font-weight:700;padding:2px 10px;border-radius:20px;background:${statusBg};color:${statusColor};">${statusTxt}</span>
            </div>
          </div>
          <div style="flex-shrink:0;">
            <span class="pick-value-badge">~${val.toLocaleString()}</span>
          </div>
        </div>`;
      });
    });

    list.innerHTML = html || '<div class="trade-no-players">Keine Picks gefunden.</div>';
    return;
  }

  // ── PLAYER MODE ────────────────────────────────────────────
  const pool = buildTradePlayerPool().filter(p => !p.isPick);
  const q    = st.search.toLowerCase().trim();

  const filtered = pool.filter(p => {
    if (st.nbaFilter && p.nba !== st.nbaFilter) return false;
    if (st.ttFilter === 'unowned' && p.ownerId !== null) return false;
    if (st.ttFilter && st.ttFilter !== 'unowned' && p.ownerId !== parseInt(st.ttFilter)) return false;
    if (q && !(p.name.toLowerCase().includes(q) || p.nba.toLowerCase().includes(q) ||
               (p.owner && p.owner.name.toLowerCase().includes(q)))) return false;
    return true;
  });

  const selectedNames = st.selected.filter(s => !s.isPick).map(s => s.name);
  if (!filtered.length) { list.innerHTML = '<div class="trade-no-players">No players found.</div>'; return; }

  list.innerHTML = filtered.map(p => {
    const isSel       = selectedNames.includes(p.name);
    const ownerLabel  = p.owner ? p.owner.name : 'Unowned';
    const val         = dynastyValue(p.rank, p.dob);
    const mRank       = mattRank(p.name);
    const hRank       = hashtagRank(p.name);
    return `<div class="trade-player-item ${isSel ? 'selected' : ''}" onclick="toggleTradePlayer('${side}', ${p.rank})">
      <div class="tp-check">${isSel ? '<svg width="10" height="10" viewBox="0 0 12 12" fill="none"><polyline points="2,6 5,9 10,3" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>' : ''}</div>
      <div class="tp-name">${p.name}
        <div class="tp-detail" style="font-size:11px;color:var(--muted);font-weight:400;margin-top:1px;">${p.nba} · ${ownerLabel}</div>
        <div style="display:flex;gap:4px;margin-top:4px;flex-wrap:wrap;">
          ${rankBadgeHtml('MFHFBs', p.rank, rankStyle(p.rank))}
          ${rankBadgeHtml('Matt', mRank, rankStyle(mRank))}
          ${rankBadgeHtml('#️⃣', hRank, rankStyle(hRank))}
        </div>
      </div>
      <div style="display:flex;flex-direction:column;align-items:flex-end;gap:3px;">
        <span style="font-size:10px;font-weight:700;${valueBadgeStyle(val)}padding:1px 5px;border-radius:4px;">${val.toLocaleString()}</span>
      </div>
    </div>`;
  }).join('');
}

function toggleTradePlayer(side, rank) {
  const st = TRADE_STATE[side];
  const pool = buildTradePlayerPool();
  const player = pool.find(p => p.rank === rank);
  if (!player) return;
  const idx = st.selected.findIndex(s => s.name === player.name);
  if (idx >= 0) { st.selected.splice(idx, 1); } else { st.selected.push(player); }
  renderTradeList(side);
  renderSelectedPills(side);
  renderTradeResult();
}

function removeTradePlayer(side, name) {
  const st = TRADE_STATE[side];
  st.selected = st.selected.filter(s => s.name !== name);
  renderTradeList(side);
  renderSelectedPills(side);
  renderTradeResult();
}

function renderSelectedPills(side) {
  const st   = TRADE_STATE[side];
  const wrap = document.getElementById('tradeSelected' + side);
  if (!st.selected.length) {
    wrap.innerHTML = '<span style="color:var(--muted);font-size:12px;">None yet</span>';
    return;
  }
  wrap.innerHTML = st.selected.map(item => {
    if (item.isPick) {
      const val = pickTradeValue(item, TRADE_MODE);
      return `<span class="trade-selected-pill" style="background:rgba(197,143,50,0.12);border-color:#c58f3266;color:#c58f32;" onclick="removeTradePick('${side}','${item.pickKey}')">
        📋 ${item.name}${item.slot ? ` #${item.slot}` : ''}&nbsp;<span style="font-size:10px;opacity:0.75;">(${val.toLocaleString()})</span> <span class="pill-x">×</span>
      </span>`;
    }
    return `<span class="trade-selected-pill" onclick="removeTradePlayer('${side}','${item.name.replace(/'/g,"\\'")}')">
      ${item.name} <span class="pill-x">×</span>
    </span>`;
  }).join('');
}

function renderTradeResult() {
  const selA = TRADE_STATE.A.selected;
  const selB = TRADE_STATE.B.selected;
  const wrap = document.getElementById('tradeResult');

  if (!selA.length || !selB.length) {
    wrap.innerHTML = '<div class="trade-empty-state">Select at least one player on each side to analyze the trade.</div>';
    return;
  }

  const valA = tradeSideValue(selA);
  const valB = tradeSideValue(selB);
  const total = valA + valB;
  const pctA = total > 0 ? (valA / total * 100) : 50;
  const pctB = 100 - pctA;
  const diff = Math.abs(pctA - 50); // how far from 50/50

  const aWins = valA > valB;
  let verdict, cls, subtext;

  if (diff < 5) {
    verdict = 'Fair Trade'; cls = 'fair';
    subtext = 'Both sides receive roughly equal dynasty value.';
  } else if (diff < 12) {
    verdict = aWins ? 'Slight Edge: Side A' : 'Slight Edge: Side B';
    cls = 'slight';
    subtext = `Side ${aWins ? 'A' : 'B'} gets the better end, but it's reasonably close.`;
  } else {
    verdict = aWins ? 'Side A Wins Big' : 'Side B Wins Big';
    cls = 'lopsided';
    subtext = `Side ${aWins ? 'A' : 'B'} gets significantly more dynasty value.`;
  }

  function breakdownSide(players, label, sideVal) {
    // Sort by value for display
const sorted = [...players].sort((a, b) => {
  const va = a.isPick ? pickTradeValue(a, TRADE_MODE) : dynastyValue(a.rank, a.dob);
  const vb = b.isPick ? pickTradeValue(b, TRADE_MODE) : dynastyValue(b.rank, b.dob);
  return vb - va;
});   const rows = sorted.map((p, i) => {
      const rawVal       = p.isPick ? pickTradeValue(p, TRADE_MODE) : dynastyValue(p.rank, p.dob);
      const effectiveVal = Math.round(rawVal * Math.pow(0.80, sorted.indexOf(p)));
      const isDiscounted = i > 0;
      const isLight      = document.body.classList.contains('light');

      let rankSection = '';
      if (p.isPick) {
        const ownerChips = (p.owners || []).map(o => {
          if (!o.curr) return '';
          const color = isLight ? o.curr.lightColor : o.curr.color;
          return `<span class="pick-owner-chip ${o.traded ? 'traded' : ''}" style="${o.traded ? '' : `border-color:${color}44;color:${color};`}">${o.traded ? '→ ' : ''}${o.curr.name}${o.note ? ` (${o.note})` : ''}</span>`;
        }).join('');
        rankSection = `<div style="margin-top:5px;">
          <span style="font-size:9px;font-weight:700;background:rgba(197,143,50,0.15);color:#c58f32;padding:1px 5px;border-radius:3px;">📋 ${p.pickRange} · ${p.year}</span>
          <div style="margin-top:3px;">${ownerChips}</div>
        </div>`;
      } else {
        const mRank2    = mattRank(p.name);
        const hRank2    = hashtagRank(p.name);
        const ageMult2  = ageMultiplier(p.dob, TRADE_MODE);
        const pAge2     = p.dob ? playerAgeToday(p.dob) : null;
        const ageStyle2 = ageMult2 >= 1.20 ? 'background:rgba(76,175,129,0.18);color:#6dddaa;' :
                          ageMult2 >= 1.05 ? 'background:rgba(108,99,255,0.15);color:#a89bff;' :
                          ageMult2 <= 0.50 ? 'background:rgba(255,101,132,0.18);color:#ff8fa3;' :
                          ageMult2 <= 0.80 ? 'background:rgba(245,200,66,0.15);color:#f5c842;' :
                          'background:rgba(123,127,158,0.12);color:var(--muted);';
        const ageLabel2 = TRADE_MODE !== 'raw' && pAge2
          ? `<span style="font-size:9px;font-weight:700;${ageStyle2}padding:1px 5px;border-radius:3px;white-space:nowrap;">age ${pAge2} · ${ageMult2 >= 1 ? '+' : ''}${Math.round((ageMult2-1)*100)}%</span>`
          : '';
        rankSection = `<div style="display:flex;gap:4px;margin-top:5px;flex-wrap:wrap;">
          ${rankBadgeHtml('MFHFBs', p.rank, rankStyle(p.rank))}
          ${rankBadgeHtml('Matt',   mRank2, rankStyle(mRank2))}
          ${rankBadgeHtml('#️⃣',   hRank2, rankStyle(hRank2))}
          ${ageLabel2}
        </div>`;
      }

      const ownerLabel = p.isPick
        ? (p.owners || []).map(o => o.curr ? o.curr.name : '').filter(Boolean).join(', ') || '—'
        : (p.owner ? p.owner.name : 'Unowned');

      return `<div class="trade-breakdown-player">
        <div style="flex:1;">
          <div class="tbp-name">${p.name}</div>
          <div class="tbp-detail">${p.isPick ? '📋 Draft Pick' : p.nba} · ${ownerLabel}</div>
          ${rankSection}
        </div>
        <div style="text-align:right;flex-shrink:0;">
          <div style="font-size:11px;font-weight:800;${valueBadgeStyle(rawVal)}padding:2px 5px;border-radius:4px;">${effectiveVal.toLocaleString()}</div>
          ${isDiscounted ? `<div style="font-size:9px;color:var(--muted);margin-top:2px;">–20% depth</div>` : ''}
        </div>
      </div>`;
    }).join('');

    return `<div class="trade-breakdown-side">
      <div class="trade-breakdown-label">${label}</div>
      ${rows}
      <div class="trade-value-row">
        <span class="trade-value-label">Total Value</span>
        <span class="trade-value-val" style="color:var(--accent);">${sideVal.toLocaleString()}</span>
      </div>
    </div>`;
  }

  // Value bar
  const barColor = cls === 'fair' ? '#4caf81' : cls === 'slight' ? '#f5c842' : '#ff6584';
  const barFillPct = aWins ? pctA : pctB;

  wrap.innerHTML = `<div class="trade-result-box ${cls}">
    <div class="trade-verdict ${cls}">${verdict}</div>
    <div class="trade-sub">${subtext}</div>
    <div class="trade-value-bar-wrap">
      <div style="display:flex;justify-content:space-between;font-size:11px;font-weight:700;color:var(--muted);margin-bottom:5px;">
        <span>Side A &nbsp;<strong style="color:var(--text);">${valA.toLocaleString()}</strong></span>
        <span><strong style="color:var(--text);">${valB.toLocaleString()}</strong>&nbsp; Side B</span>
      </div>
      <div class="trade-value-bar-track">
        <div class="trade-value-bar-fill" style="width:${pctA.toFixed(1)}%;background:${aWins ? barColor : 'var(--muted)'};"></div>
      </div>
      <div class="trade-value-bar-labels" style="align-items:center;">
        <span style="${aWins ? `font-weight:800;color:${barColor};` : ''}">${pctA.toFixed(1)}% ${aWins ? '← Side A wins' : ''}</span>
        <span style="${!aWins ? `font-weight:800;color:${barColor};` : ''}">${!aWins ? 'Side B wins →' : ''} ${pctB.toFixed(1)}%</span>
      </div>
    </div>
    <div class="trade-breakdown">
      ${breakdownSide(selA, 'Side A', valA)}
      <div style="display:flex;align-items:center;padding:0 4px;">
        <div style="font-family:'Playfair Display',serif;font-size:20px;font-weight:800;color:var(--muted);">vs</div>
      </div>
      ${breakdownSide(selB, 'Side B', valB)}
    </div>
    <div style="margin-top:16px;padding:10px 14px;background:var(--surface2);border-radius:10px;font-size:11px;color:var(--muted);text-align:left;line-height:1.6;" id="tradeCalcExplainer">

    </div>

  </div>`;
  // Populate dynamic explainer
  const modeLabels = {
    dynasty: 'Dynasty mode',
    raw: 'Raw mode',
    winnow: 'Win-Now mode'
  };
  const ageNote = {
    dynasty: 'Young players (≤21) get up to +50% bonus; veterans 32+ are heavily discounted.',
    raw: 'No age adjustment — pure rank value only.',
    winnow: 'Players aged 25–31 are rewarded; teenagers and players 36+ are discounted.'
  };
  const el = document.getElementById('tradeCalcExplainer');
  if (el) el.innerHTML = `<strong style="color:var(--text);">${modeLabels[TRADE_MODE]} — How value is calculated:</strong> Raw values from MFHFBs' trade sheet minus a dynamic replacement floor (avg. ranks 175–250). Cliff: full value ≤50, 85% at 51–100, 65% at 101–150, 35% at 151–175, zero beyond. ${ageNote[TRADE_MODE]} Each additional packaged player counts at <strong>70%</strong> of their value (diminishing returns).`;
}

function showTrade() {
  TRADE_STATE.A.selected = []; TRADE_STATE.B.selected = [];
  TRADE_STATE.A.showPicks = false;
  TRADE_STATE.B.showPicks = false;
  TRADE_STATE.A.nbaFilter = ''; TRADE_STATE.B.nbaFilter = '';
  TRADE_STATE.A.search    = ''; TRADE_STATE.B.search    = '';

  // Auto-Vorauswahl: wenn ein Team aktiv war, Side A vorfiltern
  const preselectTeam = currentTeamId;
  TRADE_STATE.A.ttFilter = preselectTeam ? String(preselectTeam) : '';
  TRADE_STATE.B.ttFilter = '';

  initTradeDropdowns();

  ['A','B'].forEach(side => {
    document.getElementById('tradeNbaFilter'+side).value = '';
    document.getElementById('tradeTTFilter'+side).value  = TRADE_STATE[side].ttFilter || '';
    document.getElementById('tradeSearch'+side).value    = '';
    document.getElementById('tradeNbaFilter'+side).classList.remove('has-filter');
const pickBtn = document.getElementById('pickBtn' + side);
    if (pickBtn) { pickBtn.classList.remove('active'); pickBtn.textContent = '📋 Picks anzeigen'; }
    const ttEl = document.getElementById('tradeTTFilter'+side);
    ttEl.classList.toggle('has-filter', !!TRADE_STATE[side].ttFilter);
  });

  renderTradeList('A');
  renderTradeList('B');
  renderSelectedPills('A');
  renderSelectedPills('B');
  renderTradeResult();
  navigate('tradePage');

  // Kleiner Hinweis wenn vorausgefüllt
  if (preselectTeam) {
    const team = teamMap[preselectTeam];
    const hint = document.createElement('div');
    hint.style.cssText = 'position:fixed;bottom:24px;left:50%;transform:translateX(-50%);background:var(--surface);border:1px solid var(--accent);border-radius:12px;padding:10px 18px;font-size:12px;font-weight:600;color:var(--accent);z-index:200;box-shadow:0 4px 20px rgba(108,99,255,0.3);animation:modalIn 0.2s ease;pointer-events:none;white-space:nowrap;';
    hint.textContent = `Side A → ${team.name} vorausgewählt`;
    document.body.appendChild(hint);
    setTimeout(() => hint.remove(), 2500);
  }
}

// ============================================================
//  TRADE SHARE MODAL — implementiert die fehlenden Handler
//  für tradeScreenshotBtn, closeShareModal, copyShareBtn, downloadShareBtn
// ============================================================

function closeShareModal() {
  const overlay = document.getElementById('shareModalOverlay');
  if (overlay) overlay.style.display = 'none';
}

function openTradeShareModal() {
  const selA = TRADE_STATE.A.selected || [];
  const selB = TRADE_STATE.B.selected || [];
  if (!selA.length || !selB.length) {
    const hint = document.createElement('div');
    hint.style.cssText = 'position:fixed;bottom:24px;left:50%;transform:translateX(-50%);background:var(--surface);border:1px solid var(--accent2);border-radius:12px;padding:10px 18px;font-size:12px;font-weight:600;color:var(--accent2);z-index:200;box-shadow:0 4px 20px rgba(0,0,0,0.3);pointer-events:none;white-space:nowrap;';
    hint.textContent = 'Wähle Spieler/Picks auf beiden Seiten aus.';
    document.body.appendChild(hint);
    setTimeout(() => hint.remove(), 2200);
    return;
  }

  const isLight = document.body.classList.contains('light');
  const th = isLight ? {
    bg: '#fff5ee', surface: '#ffffff', surface2: '#fdebd8',
    border: '#f0d5bc', text: '#2c1a0e', muted: '#9a7560',
    accentA: '#c0622f', accentB: '#e8975a', divider: '#f0d5bc',
  } : {
    bg: '#0f1117', surface: '#1a1d27', surface2: '#222636',
    border: '#2e3250', text: '#e8eaf6', muted: '#7b7f9e',
    accentA: '#6c63ff', accentB: '#ff6584', divider: '#2e3250',
  };

  // Werte beider Seiten
  const valA = (typeof tradeSideValue === 'function') ? tradeSideValue(selA) : 0;
  const valB = (typeof tradeSideValue === 'function') ? tradeSideValue(selB) : 0;
  const total = valA + valB;
  const pctA = total > 0 ? (valA / total * 100) : 50;
  const pctB = 100 - pctA;
  const diff = Math.abs(pctA - 50);
  const aWins = valA > valB;

  let verdict, cls, verdictColor;
  if (diff < 5)       { verdict = '✅ Fair Trade';                            cls = 'fair';     verdictColor = '#4caf81'; }
  else if (diff < 12) { verdict = aWins ? '🟡 Leichter Edge: Side A' : '🟡 Leichter Edge: Side B'; cls = 'slight'; verdictColor = '#f5c842'; }
  else                { verdict = aWins ? '🔥 Side A gewinnt deutlich' : '🔥 Side B gewinnt deutlich'; cls = 'lopsided'; verdictColor = '#ff6584'; }

  function pillRow(items, label, val) {
    const rows = [...items]
      .sort((a, b) => {
        const va = a.isPick ? (a.baseValue || 0) : (typeof dynastyValue === 'function' ? dynastyValue(a.rank, a.dob) : 0);
        const vb = b.isPick ? (b.baseValue || 0) : (typeof dynastyValue === 'function' ? dynastyValue(b.rank, b.dob) : 0);
        return vb - va;
      })
      .map((p, i) => {
        let line, detail, value;
        if (p.isPick) {
          const slotLabel = p.slot ? ` · Pick #${p.slot}` : '';
          line   = `📋 ${p.year} R${p.round}${slotLabel}`;
          detail = p.orig ? `via ${p.orig.name}` : '';
          value  = (typeof pickTradeValue === 'function') ? pickTradeValue(p, TRADE_MODE) : (p.baseValue || 0);
        } else {
          line   = p.name;
          detail = `${p.nba || ''}${p.owner ? ' · ' + p.owner.name : ''}`;
          value  = (typeof dynastyValue === 'function') ? dynastyValue(p.rank, p.dob) : 0;
        }
        const effective = Math.round(value * Math.pow(0.80, i));
        return `<div style="display:flex;align-items:center;gap:10px;padding:8px 0;border-bottom:1px solid ${th.divider};">
          <div style="width:24px;height:24px;border-radius:6px;background:${th.accentA}22;display:flex;align-items:center;justify-content:center;font-size:10px;font-weight:800;color:${th.accentA};flex-shrink:0;">${i+1}</div>
          <div style="flex:1;min-width:0;">
            <div style="font-weight:700;font-size:13px;color:${th.text};white-space:nowrap;overflow:hidden;text-overflow:ellipsis;">${line}</div>
            <div style="font-size:11px;color:${th.muted};">${detail}</div>
          </div>
          <div style="text-align:right;flex-shrink:0;">
            <div style="font-size:12px;font-weight:800;color:${th.text};">${effective.toLocaleString()}</div>
            ${i > 0 ? `<div style="font-size:9px;color:${th.muted};">×0.8^${i}</div>` : ''}
          </div>
        </div>`;
      }).join('');
    return `<div style="background:${th.surface};border:1px solid ${th.border};border-radius:12px;padding:12px 14px;margin-bottom:10px;">
      <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:6px;">
        <div style="font-size:10px;font-weight:700;letter-spacing:1px;text-transform:uppercase;color:${th.muted};">${label}</div>
        <div style="font-size:13px;font-weight:800;color:${th.accentA};">${val.toLocaleString()}</div>
      </div>
      ${rows}
    </div>`;
  }

  const modeNames = { dynasty: '🏗️ Dynasty', raw: '📊 Raw', winnow: '🏆 Win-Now' };
  const cardHtml = `<div id="shareCardInner" style="
    background:${th.bg};border:2px solid ${th.accentA};border-radius:20px;
    padding:24px 20px 20px;font-family:'DM Sans',system-ui,sans-serif;color:${th.text};
    max-width:480px;margin:0 auto;aspect-ratio:4/5;display:flex;flex-direction:column;justify-content:space-between;">
    <div style="text-align:center;margin-bottom:14px;">
      <div style="font-size:10px;font-weight:700;letter-spacing:2px;color:${th.muted};text-transform:uppercase;margin-bottom:5px;">🌮 Taco Tuesday HQ · Trade Analyzer</div>
      <div style="font-family:'Playfair Display',Georgia,serif;font-size:22px;font-weight:800;color:${th.accentA};">${verdict}</div>
      <div style="font-size:11px;color:${th.muted};margin-top:4px;">${modeNames[TRADE_MODE] || TRADE_MODE}-Bewertung</div>
    </div>
    ${pillRow(selA, 'Side A', valA)}
    <div style="text-align:center;font-family:'Playfair Display',serif;font-size:18px;font-weight:800;color:${th.muted};margin:4px 0;">vs</div>
    ${pillRow(selB, 'Side B', valB)}
    <div style="margin-top:10px;height:8px;background:${th.surface2};border-radius:4px;overflow:hidden;display:flex;">
      <div style="width:${pctA.toFixed(1)}%;background:${aWins ? verdictColor : th.muted};"></div>
      <div style="width:${pctB.toFixed(1)}%;background:${!aWins ? verdictColor : th.muted};"></div>
    </div>
    <div style="display:flex;justify-content:space-between;font-size:10px;font-weight:700;color:${th.muted};margin-top:5px;">
      <span>${pctA.toFixed(1)}%</span>
      <span>${pctB.toFixed(1)}%</span>
    </div>
    <div style="text-align:center;margin-top:14px;font-size:9px;color:${th.muted};letter-spacing:1px;text-transform:uppercase;">taco-tuesday-league.com</div>
  </div>`;

  document.getElementById('shareCardContent').innerHTML = cardHtml;
  document.getElementById('shareModalOverlay').style.display = 'flex';

  // Speichere Plain-Text-Version für Copy
  window._tradeShareText = buildTradeShareText(selA, selB, valA, valB, verdict);
}

function buildTradeShareText(selA, selB, valA, valB, verdict) {
  function fmtSide(items) {
    return items.map(p => {
      if (p.isPick) {
        const slotLabel = p.slot ? ` Pick #${p.slot}` : '';
        const via = p.orig ? ` (via ${p.orig.name})` : '';
        return `  • ${p.year} R${p.round}${slotLabel}${via}`;
      }
      const owner = p.owner ? ` (${p.owner.name})` : '';
      return `  • ${p.name}${owner}`;
    }).join('\n');
  }
  return [
    '🌮 Taco Tuesday HQ · Trade Analyzer',
    verdict.replace(/[^\w\s\-:äöüÄÖÜß]/g, '').trim(),
    '',
    `Side A (${valA.toLocaleString()}):`,
    fmtSide(selA),
    '',
    `Side B (${valB.toLocaleString()}):`,
    fmtSide(selB),
  ].join('\n');
}

function copyTradeShare() {
  let txt = window._tradeShareText || '';
  if (!txt) {
    const card = document.getElementById('shareCardInner');
    if (card) txt = card.innerText.replace(/\n{3,}/g, '\n\n').trim();
  }
  if (!txt) return;
  navigator.clipboard.writeText(txt).then(() => {
    const btn = document.getElementById('copyShareBtn');
    if (btn) {
      const orig = btn.textContent;
      btn.textContent = '✓ Kopiert!';
      setTimeout(() => { btn.textContent = orig; }, 1500);
    }
  }).catch(err => {
    console.error('Copy failed:', err);
    alert('Kopieren fehlgeschlagen. Bitte manuell kopieren.');
  });
}

async function downloadTradeShare() {
  const card = document.getElementById('shareCardInner');
  if (!card) return;
  if (typeof html2canvas !== 'function') {
    alert('html2canvas Library nicht geladen.');
    return;
  }

  const btn = document.getElementById('downloadShareBtn');
  const orig = btn ? btn.textContent : '';
  if (btn) { btn.textContent = '⏳ Erstelle...'; btn.disabled = true; }

  try {
    const isLight = document.body.classList.contains('light');
    const canvas = await html2canvas(card, {
      backgroundColor: isLight ? '#fff5ee' : '#0f1117',
      scale: 2,
      logging: false,
      useCORS: true,
    });
    const link = document.createElement('a');
    link.href = canvas.toDataURL('image/png');
    const stamp = new Date().toISOString().split('T')[0];
    link.download = `taco-trade-${stamp}.png`;
    link.click();
    if (btn) { btn.textContent = '✓ Gespeichert!'; }
    setTimeout(() => { if (btn) { btn.textContent = orig; btn.disabled = false; } }, 1500);
  } catch (err) {
    console.error('Screenshot failed:', err);
    alert('Fehler beim Erstellen: ' + err.message);
    if (btn) { btn.textContent = orig; btn.disabled = false; }
  }
}

// Event-Handler an die existierenden Buttons binden — sobald DOM bereit ist
(function bindTradeShareHandlers() {
  function bind() {
    const shareBtn    = document.getElementById('tradeScreenshotBtn');
    const copyBtn     = document.getElementById('copyShareBtn');
    const downloadBtn = document.getElementById('downloadShareBtn');
    const overlay     = document.getElementById('shareModalOverlay');

    if (shareBtn && !shareBtn._bound)    { shareBtn.addEventListener('click', openTradeShareModal); shareBtn._bound = true; }
    if (copyBtn && !copyBtn._bound)      { copyBtn.addEventListener('click', copyTradeShare);       copyBtn._bound  = true; }
    if (downloadBtn && !downloadBtn._bound) { downloadBtn.addEventListener('click', downloadTradeShare); downloadBtn._bound = true; }
    if (overlay && !overlay._bound) {
      overlay.addEventListener('click', (e) => { if (e.target === overlay) closeShareModal(); });
      overlay._bound = true;
    }
  }
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', bind);
  } else {
    bind();
  }
})();
