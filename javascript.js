const TYPE_KEYS = ['S','N','B','BOOL','NULL','M','L','SS','NS','BS'];

const mascotReactions = [
  {
    eyes: '<ellipse cx="38" cy="47" rx="3" ry="5" fill="var(--ink)"/><ellipse cx="62" cy="47" rx="3" ry="5" fill="var(--ink)"/>',
    mouth: 'M44 60 Q47 64 50 60 Q53 64 56 60',
    msg: '喵!我是蘇打 [Soda],幫你秤 item 有多重。'
  },
  {
    eyes: '<ellipse cx="38" cy="47" rx="3" ry="5" fill="var(--ink)"/><path d="M58 47 q4 -3 8 0" stroke="var(--ink)" stroke-width="2" fill="none" stroke-linecap="round"/>',
    mouth: 'M44 61 Q47 64 50 61 Q53 64 56 61',
    msg: '喵~ 換算中,稍等一下。'
  },
  {
    eyes: '<ellipse cx="38" cy="47" rx="4" ry="6" fill="var(--ink)"/><ellipse cx="62" cy="47" rx="4" ry="6" fill="var(--ink)"/>',
    mouth: 'M46 58 Q50 68 54 58 Q50 64 46 58 Z',
    msg: '哇!這個 item 有點大隻喔。'
  },
  {
    eyes: '<path d="M33 47 q5 -6 10 0" stroke="var(--ink)" stroke-width="2" fill="none" stroke-linecap="round"/><path d="M57 47 q5 -6 10 0" stroke="var(--ink)" stroke-width="2" fill="none" stroke-linecap="round"/>',
    mouth: 'M40 58 Q50 70 60 58',
    msg: '算完啦!去看看要開幾片 shard 吧。'
  },
  {
    eyes: '<path d="M34 42 L42 50 M42 42 L34 50" stroke="var(--ink)" stroke-width="2" stroke-linecap="round"/><path d="M58 42 L66 50 M66 42 L58 50" stroke="var(--ink)" stroke-width="2" stroke-linecap="round"/>',
    mouth: 'M42 62 Q46 58 50 62 Q54 66 58 62',
    msg: 'GSI 加太多,我要暈了……WCU 一直疊加!'
  },
  {
    eyes: '<ellipse cx="38" cy="47" rx="3" ry="5" fill="var(--ink)"/><ellipse cx="62" cy="47" rx="3" ry="5" fill="var(--ink)"/>',
    mouth: 'M42 62 Q50 58 58 62',
    msg: '400KB 是 DynamoDB item 的天花板哦喵。'
  }
];
let mascotIndex = 0;
let mascotBubbleTimer = null;
let mascotActionTimer = null;

function showMascotBubble(msg, duration) {
  const bubble = document.getElementById('mascotBubble');
  bubble.textContent = msg;
  bubble.classList.add('show');
  if (mascotBubbleTimer) clearTimeout(mascotBubbleTimer);
  mascotBubbleTimer = setTimeout(() => bubble.classList.remove('show'), duration);
}

function reactMascot() {
  const reaction = mascotReactions[mascotIndex % mascotReactions.length];
  mascotIndex++;

  document.getElementById('mascotEyes').innerHTML = reaction.eyes;
  document.getElementById('mascotMouth').setAttribute('d', reaction.mouth);

  const svg = document.getElementById('mascotSvg');
  svg.classList.remove('bounce');
  void svg.offsetWidth; // restart animation
  svg.classList.add('bounce');

  showMascotBubble(reaction.msg, 2600);
}

const idleFace = {
  eyes: '<ellipse cx="38" cy="47" rx="3" ry="5" fill="var(--ink)"/><ellipse cx="62" cy="47" rx="3" ry="5" fill="var(--ink)"/>',
  mouth: 'M44 60 Q47 64 50 60 Q53 64 56 60'
};

const catActions = {
  knead: {
    label: '草地踏踏',
    duration: 3200,
    msg: '踏踏踏踏……在草地上踏踏最舒服了。',
    eyes: '<path d="M33 47 q5 -6 10 0" stroke="var(--ink)" stroke-width="2" fill="none" stroke-linecap="round"/><path d="M57 47 q5 -6 10 0" stroke="var(--ink)" stroke-width="2" fill="none" stroke-linecap="round"/>',
    mouth: 'M42 60 Q50 65 58 60'
  },
  litter: {
    label: '上廁所',
    duration: 3200,
    msg: '噓——別看我,人家在忙!',
    eyes: '<path d="M35 47 L41 47" stroke="var(--ink)" stroke-width="2" stroke-linecap="round"/><path d="M59 47 L65 47" stroke="var(--ink)" stroke-width="2" stroke-linecap="round"/>',
    mouth: 'M45 61 Q50 63 55 61'
  },
  fortune: {
    label: '肉泥運勢',
    duration: 4200,
    eyes: '<path d="M33 47 q5 -6 10 0" stroke="var(--ink)" stroke-width="2" fill="none" stroke-linecap="round"/><path d="M57 47 q5 -6 10 0" stroke="var(--ink)" stroke-width="2" fill="none" stroke-linecap="round"/>',
    mouth: 'M43 58 Q50 67 57 58'
  },
  eat: {
    label: '吃飼料',
    duration: 3200,
    msg: '喀滋喀滋,肚子餓餓,先吃再說。',
    eyes: '<path d="M33 47 q5 -6 10 0" stroke="var(--ink)" stroke-width="2" fill="none" stroke-linecap="round"/><path d="M57 47 q5 -6 10 0" stroke="var(--ink)" stroke-width="2" fill="none" stroke-linecap="round"/>',
    mouth: 'M43 59 Q50 66 57 59'
  },
  wand: {
    label: '逗貓棒',
    duration: 3200,
    msg: '咻咻咻!獵物出現了,絕對不能放過!',
    eyes: '<ellipse cx="38" cy="47" rx="4" ry="6" fill="var(--ink)"/><ellipse cx="62" cy="47" rx="4" ry="6" fill="var(--ink)"/>',
    mouth: 'M43 59 Q50 65 57 59'
  },
  kuaikuai: {
    label: '乖乖傳說',
    duration: 3600,
    msg: '有乖乖鎮著,系統今晚不會半夜出包!',
    eyes: '<path d="M33 47 q5 -6 10 0" stroke="var(--ink)" stroke-width="2" fill="none" stroke-linecap="round"/><path d="M57 47 q5 -6 10 0" stroke="var(--ink)" stroke-width="2" fill="none" stroke-linecap="round"/>',
    mouth: 'M43 58 Q50 66 57 58'
  }
};

const fortuneResults = [
  { level: '大吉', text: '今天貼的 JSON 一次就對,連 GSI 都不用改。' },
  { level: '大吉', text: 'shard 數字剛剛好,不多也不少。' },
  { level: '大吉', text: '肉泥好吃,今天運勢也跟肉泥一樣香。' },
  { level: '中吉', text: 'WCU 稍微高一點,但撐得住,別擔心。' },
  { level: '中吉', text: '今天適合重新算一次容量,會有新發現。' },
  { level: '中吉', text: '匯率剛好抓對,月費算得很準。' },
  { level: '小吉', text: '平常心,item 大小普普通通的一天。' },
  { level: '小吉', text: '今天沒什麼特別的,適合休息踏踏。' },
  { level: '凶', text: '小心!GSI 加太多,WCU 要爆了。' },
  { level: '凶', text: '今天不適合手動改匯率,會算錯。' }
];

const treatColorPalette = [
  { body: '#B9A6E0', stroke: '#8A72B8', cap: '#E86FA0' },
  { body: '#FFD166', stroke: '#D9A23D', cap: '#EF6F6C' },
  { body: '#8FD3C1', stroke: '#4FA894', cap: '#F4A261' },
  { body: '#A7C7E7', stroke: '#5A8FC0', cap: '#F7B267' },
  { body: '#F6C6EA', stroke: '#C97FB5', cap: '#7FD8BE' },
  { body: '#D8D8D8', stroke: '#9A9A9A', cap: '#F2843C' }
];

function randomizeTreatColors() {
  const c = treatColorPalette[Math.floor(Math.random() * treatColorPalette.length)];
  document.getElementById('treatBody').setAttribute('fill', c.body);
  document.getElementById('treatBody').setAttribute('stroke', c.stroke);
  document.getElementById('treatCap').setAttribute('fill', c.cap);
  document.getElementById('treatCap').setAttribute('stroke', c.stroke);
  document.getElementById('treatTip').setAttribute('fill', c.stroke);
  document.getElementById('treatLine1').setAttribute('stroke', c.stroke);
  document.getElementById('treatLine2').setAttribute('stroke', c.stroke);
}

function showActionMenu() {
  document.getElementById('mascotMenu').classList.add('show');
}
function hideActionMenu() {
  document.getElementById('mascotMenu').classList.remove('show');
}

function runCatAction(key) {
  const cfg = catActions[key];
  if (!cfg) return;
  hideActionMenu();

  const wrap = document.getElementById('mascotWrap');
  wrap.classList.remove('act-knead', 'act-litter', 'act-fortune', 'act-eat', 'act-wand', 'act-kuaikuai');
  void wrap.offsetWidth; // restart animation cleanly if the same action is picked twice
  wrap.classList.add('act-' + key);

  document.getElementById('mascotEyes').innerHTML = cfg.eyes;
  document.getElementById('mascotMouth').setAttribute('d', cfg.mouth);

  const svg = document.getElementById('mascotSvg');
  svg.classList.remove('bounce');
  void svg.offsetWidth;
  svg.classList.add('bounce');

  let msg = cfg.msg;
  if (key === 'fortune') {
    randomizeTreatColors();
    const draw = fortuneResults[Math.floor(Math.random() * fortuneResults.length)];
    msg = `【${draw.level}】${draw.text}`;
  }
  showMascotBubble(msg, cfg.duration - 200);

  if (mascotActionTimer) clearTimeout(mascotActionTimer);
  mascotActionTimer = setTimeout(() => {
    wrap.classList.remove('act-' + key);
    document.getElementById('mascotEyes').innerHTML = idleFace.eyes;
    document.getElementById('mascotMouth').setAttribute('d', idleFace.mouth);
  }, cfg.duration);
}

function initMascotInteractions() {
  const wrap = document.getElementById('mascotWrap');
  const menu = document.getElementById('mascotMenu');
  let pressTimer = null;
  let longPressFired = false;
  const LONG_PRESS_MS = 450;

  function startPress() {
    longPressFired = false;
    clearTimeout(pressTimer);
    pressTimer = setTimeout(() => {
      longPressFired = true;
      showActionMenu();
    }, LONG_PRESS_MS);
  }
  function endPress() {
    clearTimeout(pressTimer);
  }

  wrap.addEventListener('mousedown', startPress);
  wrap.addEventListener('touchstart', startPress, { passive: true });
  wrap.addEventListener('mouseup', endPress);
  wrap.addEventListener('mouseleave', endPress);
  wrap.addEventListener('touchend', endPress);
  wrap.addEventListener('touchcancel', endPress);

  wrap.addEventListener('click', () => {
    if (longPressFired) {
      longPressFired = false;
      return; // suppress the normal tap-reaction right after a long press
    }
    if (menu.classList.contains('show')) {
      hideActionMenu();
      return;
    }
    reactMascot();
  });

  menu.querySelectorAll('button').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      runCatAction(btn.dataset.action);
    });
  });

  document.addEventListener('click', (e) => {
    if (!wrap.contains(e.target)) hideActionMenu();
  });
}

function utf8Len(str) {
  return new TextEncoder().encode(str).length;
}

function numberSize(numStr) {
  let s = String(numStr).trim();
  s = s.replace('-', '').replace('+', '');
  let [intPart, decPart] = s.split('.');
  decPart = decPart || '';
  intPart = intPart.replace(/^0+(?=\d)/, '');
  decPart = decPart.replace(/0+$/, '');
  let digits = intPart.length + decPart.length;
  if (digits === 0) digits = 1;
  return Math.ceil(digits / 2) + 1;
}

function base64ByteLength(b64) {
  try {
    const clean = b64.replace(/=+$/, '');
    return Math.floor((clean.length * 3) / 4);
  } catch (e) { return 0; }
}

function isTypedWrapper(node) {
  if (node === null || typeof node !== 'object' || Array.isArray(node)) return false;
  const keys = Object.keys(node);
  return keys.length === 1 && TYPE_KEYS.includes(keys[0]);
}

// Returns {bytes, type}
function sizeOfValue(node) {
  if (isTypedWrapper(node)) {
    const type = Object.keys(node)[0];
    const val = node[type];
    switch (type) {
      case 'S': return { bytes: utf8Len(val), type: 'S' };
      case 'N': return { bytes: numberSize(val), type: 'N' };
      case 'B': return { bytes: base64ByteLength(val), type: 'B' };
      case 'BOOL': return { bytes: 1, type: 'BOOL' };
      case 'NULL': return { bytes: 1, type: 'NULL' };
      case 'M': {
        let total = 3;
        for (const k in val) total += utf8Len(k) + sizeOfValue(val[k]).bytes;
        return { bytes: total, type: 'M' };
      }
      case 'L': {
        let total = 3;
        for (const item of val) total += sizeOfValue(item).bytes;
        return { bytes: total, type: 'L' };
      }
      case 'SS': {
        let total = 3;
        for (const s of val) total += utf8Len(s);
        return { bytes: total, type: 'SS' };
      }
      case 'NS': {
        let total = 3;
        for (const n of val) total += numberSize(n);
        return { bytes: total, type: 'NS' };
      }
      case 'BS': {
        let total = 3;
        for (const b of val) total += base64ByteLength(b);
        return { bytes: total, type: 'BS' };
      }
    }
  }
  // plain JSON inference
  if (node === null) return { bytes: 1, type: 'NULL' };
  if (typeof node === 'string') return { bytes: utf8Len(node), type: 'S' };
  if (typeof node === 'number') return { bytes: numberSize(String(node)), type: 'N' };
  if (typeof node === 'boolean') return { bytes: 1, type: 'BOOL' };
  if (Array.isArray(node)) {
    let total = 3;
    for (const item of node) total += sizeOfValue(item).bytes;
    return { bytes: total, type: 'L' };
  }
  if (typeof node === 'object') {
    let total = 3;
    for (const k in node) total += utf8Len(k) + sizeOfValue(node[k]).bytes;
    return { bytes: total, type: 'M' };
  }
  return { bytes: 0, type: '?' };
}

let lastMeasuredSize = null;
let lastMeasuredRows = [];
let gsiRowCounter = 0;

function calcWcu(bytes) {
  return Math.max(1, Math.ceil(bytes / 1024));
}
function calcRcu(bytes) {
  const strong = Math.max(1, Math.ceil(bytes / 4096));
  const eventual = Math.max(0.5, Math.ceil(strong / 2 * 10) / 10);
  return { strong, eventual };
}

function prettifyDdbInput() {
  const el = document.getElementById('ddbInput');
  const errEl = document.getElementById('ddbErr');
  try {
    const parsed = JSON.parse(el.value);
    el.value = JSON.stringify(parsed, null, 2);
    errEl.style.display = 'none';
  } catch (e) {
    errEl.textContent = '格式化失敗,這不是合法的 JSON:' + e.message;
    errEl.style.display = 'block';
  }
}

function calcItemSize() {
  const errEl = document.getElementById('ddbErr');
  const resEl = document.getElementById('ddbResult');
  errEl.style.display = 'none';
  resEl.style.display = 'none';

  let parsed;
  try {
    parsed = JSON.parse(document.getElementById('ddbInput').value);
  } catch (e) {
    errEl.textContent = '這不是合法的 JSON:' + e.message;
    errEl.style.display = 'block';
    return;
  }
  if (typeof parsed !== 'object' || parsed === null || Array.isArray(parsed)) {
    errEl.textContent = '請貼一個 item(最外層應該是一個物件,key 是屬性名稱)。';
    errEl.style.display = 'block';
    return;
  }

  let total = 0;
  const rows = [];
  for (const key in parsed) {
    const nameBytes = utf8Len(key);
    const { bytes, type } = sizeOfValue(parsed[key]);
    total += nameBytes + bytes;
    rows.push({ key, type, bytes: nameBytes + bytes });
  }

  lastMeasuredSize = total;
  lastMeasuredRows = rows;

  const wcu = calcWcu(total);
  const rcu = calcRcu(total);
  document.getElementById('ddbBytes').textContent = total.toLocaleString();
  document.getElementById('ddbBytesReadable').textContent = '≈ ' + fmtBytes(total);
  document.getElementById('wcuOut').textContent = wcu;
  document.getElementById('rcuStrongOut').textContent = rcu.strong;
  document.getElementById('rcuEventualOut').textContent = rcu.eventual;

  const tbody = document.getElementById('breakdownBody');
  tbody.innerHTML = '';
  rows.sort((a, b) => b.bytes - a.bytes);
  for (const r of rows) {
    const tr = document.createElement('tr');
    tr.innerHTML = `<td class="name">${escapeHtml(r.key)}</td><td class="type">${r.type}</td><td class="bytes">${r.bytes.toLocaleString()}</td>`;
    tbody.appendChild(tr);
  }

  resEl.style.display = 'block';

  refreshGsiKeyOptions();
  recalcGsi();
}

function escapeHtml(s) {
  return String(s).replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
}

function keyDisplayOrder(a, b) {
  const aUpper = /^[A-Z]/.test(a);
  const bUpper = /^[A-Z]/.test(b);
  if (aUpper !== bUpper) return aUpper ? -1 : 1;
  return a < b ? -1 : a > b ? 1 : 0;
}

function optionsHtml(selected) {
  let html = '<option value="">(無)</option>';
  const sortedRows = [...lastMeasuredRows].sort((a, b) => keyDisplayOrder(a.key, b.key));
  for (const r of sortedRows) {
    html += `<option value="${escapeHtml(r.key)}" ${r.key === selected ? 'selected' : ''}>${escapeHtml(r.key)}</option>`;
  }
  return html;
}

function refreshGsiKeyOptions() {
  const tablePk = document.getElementById('tablePk');
  const tableSk = document.getElementById('tableSk');
  const prevPk = tablePk.value, prevSk = tableSk.value;
  tablePk.innerHTML = optionsHtml(prevPk);
  tableSk.innerHTML = optionsHtml(prevSk);

  document.querySelectorAll('.gsi-row').forEach(row => {
    const pkSel = row.querySelector('.gsiPk');
    const skSel = row.querySelector('.gsiSk');
    const incSel = row.querySelector('.gsiInclude');
    const prevPkV = pkSel.value, prevSkV = skSel.value;
    const prevInc = Array.from(incSel.selectedOptions).map(o => o.value);
    pkSel.innerHTML = optionsHtml(prevPkV);
    skSel.innerHTML = optionsHtml(prevSkV);
    incSel.innerHTML = lastMeasuredRows
      .map(r => `<option value="${escapeHtml(r.key)}" ${prevInc.includes(r.key) ? 'selected' : ''}>${escapeHtml(r.key)}</option>`)
      .join('');
  });
}

function addGsiRow(initial) {
  initial = initial || {};
  gsiRowCounter++;
  const id = gsiRowCounter;
  const div = document.createElement('div');
  div.className = 'gsi-row';
  div.dataset.id = id;
  const projection = initial.projection || 'INCLUDE';
  const includeOptions = lastMeasuredRows.map(r =>
    `<option value="${escapeHtml(r.key)}" ${(initial.include || []).includes(r.key) ? 'selected' : ''}>${escapeHtml(r.key)}</option>`
  ).join('');

  div.innerHTML = `
    <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:10px;">
      <strong style="font-size:13px;">GSI</strong>
      <button class="ghost" type="button" onclick="removeGsiRow(${id})">移除</button>
    </div>
    <div class="grid3">
      <div class="field"><label>Partition Key</label><select class="gsiPk" onchange="recalcGsi()">${optionsHtml(initial.pk || '')}</select></div>
      <div class="field"><label>Sort Key(可選)</label><select class="gsiSk" onchange="recalcGsi()">${optionsHtml(initial.sk || '')}</select></div>
      <div class="field"><label>投影方式</label>
        <select class="gsiProjection" onchange="toggleIncludeBox(this); recalcGsi();">
          <option value="ALL" ${projection === 'ALL' ? 'selected' : ''}>ALL(完整複製)</option>
          <option value="KEYS_ONLY" ${projection === 'KEYS_ONLY' ? 'selected' : ''}>KEYS_ONLY(只放鍵)</option>
          <option value="INCLUDE" ${projection === 'INCLUDE' ? 'selected' : ''}>INCLUDE(自選屬性)</option>
        </select>
      </div>
    </div>
    <div class="field gsiIncludeBox" style="display:${projection === 'INCLUDE' ? 'block' : 'none'};">
      <label>額外投影屬性(可多選,Ctrl/Cmd 點選多個)</label>
      <select class="gsiInclude" multiple size="4" onchange="recalcGsi()">${includeOptions}</select>
    </div>
  `;
  document.getElementById('gsiRows').appendChild(div);
}

function removeGsiRow(id) {
  const row = document.querySelector(`.gsi-row[data-id="${id}"]`);
  if (row) row.remove();
  recalcGsi();
}

function toggleIncludeBox(selectEl) {
  const row = selectEl.closest('.gsi-row');
  row.querySelector('.gsiIncludeBox').style.display = selectEl.value === 'INCLUDE' ? 'block' : 'none';
}

function recalcGsi() {
  if (!lastMeasuredRows.length) return;
  const rowByKey = {};
  for (const r of lastMeasuredRows) rowByKey[r.key] = r.bytes;

  const tablePk = document.getElementById('tablePk').value;
  const tableSk = document.getElementById('tableSk').value;

  const results = [];
  const baseWcu = calcWcu(lastMeasuredSize);
  const baseRcu = calcRcu(lastMeasuredSize);
  results.push({ source: '基本表', projection: '完整 item', size: lastMeasuredSize, wcu: baseWcu, rcuEventual: baseRcu.eventual });

  let combinedWcu = baseWcu;
  let gsiIndex = 0;

  document.querySelectorAll('.gsi-row').forEach(row => {
    gsiIndex++;
    const pk = row.querySelector('.gsiPk').value;
    const sk = row.querySelector('.gsiSk').value;
    const projection = row.querySelector('.gsiProjection').value;
    const includeSel = row.querySelector('.gsiInclude');
    const includeAttrs = Array.from(includeSel.selectedOptions).map(o => o.value);

    let size, projLabel;
    if (projection === 'ALL') {
      size = lastMeasuredSize;
      projLabel = 'ALL';
    } else {
      const attrsSet = new Set();
      if (tablePk) attrsSet.add(tablePk);
      if (tableSk) attrsSet.add(tableSk);
      if (pk) attrsSet.add(pk);
      if (sk) attrsSet.add(sk);
      if (projection === 'INCLUDE') {
        includeAttrs.forEach(a => attrsSet.add(a));
        projLabel = 'INCLUDE';
      } else {
        projLabel = 'KEYS_ONLY';
      }
      size = 0;
      attrsSet.forEach(a => { size += rowByKey[a] || 0; });
    }

    const wcu = calcWcu(size);
    const rcu = calcRcu(size);
    combinedWcu += wcu;
    results.push({ source: `GSI ${gsiIndex}`, projection: projLabel, size, wcu, rcuEventual: rcu.eventual });
  });

  document.getElementById('combinedWcuOut').textContent = combinedWcu;
  const tbody = document.getElementById('gsiTableBody');
  tbody.innerHTML = '';
  for (const r of results) {
    const tr = document.createElement('tr');
    tr.innerHTML = `<td class="name">${escapeHtml(r.source)}</td><td class="type">${r.projection}</td><td class="bytes">${r.size.toLocaleString()} B</td><td class="bytes">${r.wcu}</td><td class="bytes">${r.rcuEventual}</td>`;
    tbody.appendChild(tr);
  }
  document.getElementById('gsiResult').style.display = 'block';
}

function useMeasuredSize() {
  if (lastMeasuredSize === null) {
    calcItemSize();
  }
  if (lastMeasuredSize !== null) {
    document.getElementById('avgSize').value = lastMeasuredSize;
  }
}

function fmtBytes(bytes) {
  const units = ['B', 'KB', 'MB', 'GB', 'TB', 'PB'];
  let i = 0;
  let v = bytes;
  while (v >= 1024 && i < units.length - 1) { v /= 1024; i++; }
  return v.toFixed(v < 10 && i > 0 ? 2 : 1) + ' ' + units[i];
}

function fmtUsd(n) {
  return '$' + n.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 });
}
function fmtTwd(n) {
  return 'NT$' + n.toLocaleString(undefined, { minimumFractionDigits: 0, maximumFractionDigits: 0 });
}

function calcShards() {
  const avgSize = parseFloat(document.getElementById('avgSize').value) || 0;
  const itemCount = parseFloat(document.getElementById('itemCount').value) || 0;
  const replicas = Math.max(0, parseFloat(document.getElementById('replicas').value) || 0);
  const overhead = parseFloat(document.getElementById('overhead').value) || 1;
  const targetShardGB = parseFloat(document.getElementById('targetShardGB').value) || 30;
  const heapRatio = parseFloat(document.getElementById('heapRatio').value) || 20;
  const [priceStr, ramStr] = document.getElementById('instanceType').value.split('|');
  const hourlyPrice = parseFloat(priceStr);
  const ramGB = parseFloat(ramStr);

  const rawBytes = avgSize * itemCount;
  const indexedBytes = rawBytes * overhead;
  const totalWithReplicas = indexedBytes * (1 + replicas);

  const targetShardBytes = targetShardGB * 1024 * 1024 * 1024;
  const primaryShards = Math.max(1, Math.ceil(indexedBytes / targetShardBytes));
  const totalShards = primaryShards * (1 + replicas);

  const heapNeededGB = totalShards / heapRatio;
  const heapPerNode = Math.min(ramGB / 2, 32);
  const nodesByHeap = Math.max(1, Math.ceil(heapNeededGB / heapPerNode));

  const totalGB = totalWithReplicas / (1024 * 1024 * 1024);
  const ebsPerNode = totalGB / nodesByHeap;

  const instanceCost = nodesByHeap * hourlyPrice * 730;
  const ebsCost = totalGB * 0.122;
  const monthlyCost = instanceCost + ebsCost;
  const fxRate = parseFloat(document.getElementById('fxRate').value) || 32.4;
  const monthlyCostTwd = monthlyCost * fxRate;

  document.getElementById('shardOut').textContent = primaryShards.toLocaleString();
  document.getElementById('totalShardOut').textContent = totalShards.toLocaleString();
  document.getElementById('rawSizeOut').textContent = fmtBytes(rawBytes);
  document.getElementById('indexedSizeOut').textContent = fmtBytes(indexedBytes);
  document.getElementById('totalSizeOut').textContent = fmtBytes(totalWithReplicas);
  document.getElementById('heapOut').textContent = heapNeededGB.toFixed(1) + ' GB';
  document.getElementById('nodeOut').textContent = nodesByHeap;
  document.getElementById('nodeOutInline').textContent = nodesByHeap;
  document.getElementById('ebsPerNodeOut').textContent = fmtBytes(ebsPerNode * 1024 * 1024 * 1024);
  document.getElementById('instanceCostOut').textContent = fmtUsd(instanceCost) + ' /月';
  document.getElementById('ebsCostOut').textContent = fmtUsd(ebsCost) + ' /月';
  document.getElementById('monthlyCostOut').textContent = fmtUsd(monthlyCost) + ' /月';
  document.getElementById('monthlyCostTwdOut').textContent = fmtTwd(monthlyCostTwd) + ' /月';

  document.getElementById('osResult').style.display = 'block';
}

// Run once on load for a live starting example
window.addEventListener('DOMContentLoaded', () => {
  calcItemSize();
  document.getElementById('tablePk').value = 'userId';
  addGsiRow({ pk: 'isActive', sk: 'createdAt', projection: 'INCLUDE', include: ['profile'] });
  recalcGsi();
  calcShards();
  initMascotInteractions();
});
