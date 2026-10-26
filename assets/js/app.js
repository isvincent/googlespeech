/* Google 中文語音實驗室｜BYOK — 主程式 */
const VOICES = [
  { id: "cmn-TW-Standard-A", name: "台灣 Standard A", gender: "女", lang: "cmn-TW", category: "台灣華語", series: "Standard", speed: 1.0, scene: "一般教材、快速測試、成本優先", tone: "清楚、實用", icon: "🇹🇼" },
  { id: "cmn-TW-Standard-B", name: "台灣 Standard B", gender: "男", lang: "cmn-TW", category: "台灣華語", series: "Standard", speed: 1.0, scene: "一般男聲旁白、教材", tone: "穩定、清楚", icon: "🇹🇼" },
  { id: "cmn-TW-Standard-C", name: "台灣 Standard C", gender: "男", lang: "cmn-TW", category: "台灣華語", series: "Standard", speed: 1.0, scene: "正式解說、一般簡報", tone: "沉穩、中性", icon: "🇹🇼" },
  { id: "cmn-TW-Wavenet-A", name: "台灣 WaveNet A", gender: "女", lang: "cmn-TW", category: "台灣華語", series: "WaveNet", speed: 1.02, scene: "高中教材、課程旁白、影片", tone: "自然、柔和", icon: "🎙️" },
  { id: "cmn-TW-Wavenet-B", name: "台灣 WaveNet B", gender: "男", lang: "cmn-TW", category: "台灣華語", series: "WaveNet", speed: 1.02, scene: "正式課程、教師研習、紀錄片", tone: "自然、沉穩", icon: "🎧" },
  { id: "cmn-TW-Wavenet-C", name: "台灣 WaveNet C", gender: "男", lang: "cmn-TW", category: "台灣華語", series: "WaveNet", speed: 1.02, scene: "資訊型影片、正式旁白", tone: "清楚、專業", icon: "📘" },
  { id: "cmn-CN-Standard-A", name: "普通話 Standard A", gender: "女", lang: "cmn-CN", category: "中國普通話", series: "Standard", speed: 1.0, scene: "一般教材、快速測試", tone: "清楚、標準", icon: "🗣️" },
  { id: "cmn-CN-Standard-B", name: "普通話 Standard B", gender: "男", lang: "cmn-CN", category: "中國普通話", series: "Standard", speed: 1.0, scene: "一般男聲教材", tone: "中性、穩定", icon: "🗣️" },
  { id: "cmn-CN-Standard-C", name: "普通話 Standard C", gender: "男", lang: "cmn-CN", category: "中國普通話", series: "Standard", speed: 1.0, scene: "正式簡報、新聞型旁白", tone: "成熟、清楚", icon: "📰" },
  { id: "cmn-CN-Standard-D", name: "普通話 Standard D", gender: "女", lang: "cmn-CN", category: "中國普通話", series: "Standard", speed: 1.0, scene: "生活化教材、女聲解說", tone: "自然、明亮", icon: "🌷" },
  { id: "cmn-CN-Wavenet-A", name: "普通話 WaveNet A", gender: "女", lang: "cmn-CN", category: "中國普通話", series: "WaveNet", speed: 1.03, scene: "知識型影片、教材、AI 助教", tone: "自然、柔和", icon: "✨" },
  { id: "cmn-CN-Wavenet-B", name: "普通話 WaveNet B", gender: "男", lang: "cmn-CN", category: "中國普通話", series: "WaveNet", speed: 1.03, scene: "課程旁白、科技內容", tone: "沉穩、自然", icon: "💻" },
  { id: "cmn-CN-Wavenet-C", name: "普通話 WaveNet C", gender: "男", lang: "cmn-CN", category: "中國普通話", series: "WaveNet", speed: 1.03, scene: "正式旁白、紀錄片", tone: "成熟、專業", icon: "🎞️" },
  { id: "cmn-CN-Wavenet-D", name: "普通話 WaveNet D", gender: "女", lang: "cmn-CN", category: "中國普通話", series: "WaveNet", speed: 1.03, scene: "故事、知識型短影音", tone: "自然、親和", icon: "🌈" },
  { id: "cmn-CN-Chirp3-HD-Aoede", name: "Chirp 3 HD Aoede", gender: "女", lang: "cmn-CN", category: "Chirp 3 HD", series: "Chirp 3 HD", speed: 1.0, scene: "高品質對話、AI Agent、Podcast", tone: "自然、具有情緒層次", icon: "🌟" },
  { id: "cmn-CN-Chirp3-HD-Achernar", name: "Chirp 3 HD Achernar", gender: "女", lang: "cmn-CN", category: "Chirp 3 HD", series: "Chirp 3 HD", speed: 1.0, scene: "高品質旁白、知識內容", tone: "清晰、現代", icon: "🌟" },
  { id: "cmn-CN-Chirp3-HD-Charon", name: "Chirp 3 HD Charon", gender: "男", lang: "cmn-CN", category: "Chirp 3 HD", series: "Chirp 3 HD", speed: 1.0, scene: "正式旁白、Podcast、AI Agent", tone: "低沉、成熟", icon: "🐦" },
  { id: "cmn-CN-Chirp3-HD-Puck", name: "Chirp 3 HD Puck", gender: "男", lang: "cmn-CN", category: "Chirp 3 HD", series: "Chirp 3 HD", speed: 1.0, scene: "互動教材、年輕內容、對話", tone: "活潑、自然", icon: "⚡" },
  { id: "cmn-CN-Chirp3-HD-Kore", name: "Chirp 3 HD Kore", gender: "女", lang: "cmn-CN", category: "Chirp 3 HD", series: "Chirp 3 HD", speed: 1.0, scene: "AI 助教、Podcast、敘事", tone: "清晰、柔和", icon: "🎤" },
  { id: "cmn-CN-Chirp3-HD-Fenrir", name: "Chirp 3 HD Fenrir", gender: "男", lang: "cmn-CN", category: "Chirp 3 HD", series: "Chirp 3 HD", speed: 1.0, scene: "紀錄片、歷史、科技內容", tone: "有力、穩重", icon: "🐺" }
];

const STORAGE_KEY = 'gcpTtsApiKey';
const $ = s => document.querySelector(s);
let currentUrl = null, abortController = null;

function esc(s) {
  return String(s).replace(/[&<>"']/g, m => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[m]));
}
function setStatus(msg, err = false) {
  $('#status').textContent = msg;
  $('#status').style.color = err ? '#991b1b' : '#475569';
}
function setBadge(cls, text) {
  $('#credBadge').className = 'badge ' + cls;
  $('#credBadge').textContent = text;
}
function keyValue() { return $('#apiKey').value.trim(); }
function findVoice(id) { return VOICES.find(v => v.id === id); }
function selectedVoice() { return findVoice($('#voiceSelect').value); }
function isChirp(v) { return v && v.series === 'Chirp 3 HD'; }

/* 瀏覽器儲存可能被封鎖（私密模式等），一律包 try/catch */
function store(type) { try { return window[type]; } catch { return null; } }
function storeGet(type) { try { return store(type)?.getItem(STORAGE_KEY) || ''; } catch { return ''; } }
function storeSet(type, v) { try { store(type)?.setItem(STORAGE_KEY, v); } catch { } }
function storeDel(type) { try { store(type)?.removeItem(STORAGE_KEY); } catch { } }

/* ---------- API Key ---------- */
function loadKey() {
  const l = storeGet('localStorage'), s = storeGet('sessionStorage');
  if (l) { $('#apiKey').value = l; $('#rememberMode').value = 'local'; }
  else if (s) { $('#apiKey').value = s; $('#rememberMode').value = 'session'; }
  if ($('#apiKey').value) setBadge('ok', '● 已載入');
}
function applyKey() {
  const k = keyValue(), m = $('#rememberMode').value;
  if (!k) { setStatus('請輸入 Google Cloud API Key。', true); return; }
  storeDel('sessionStorage');
  storeDel('localStorage');
  if (m === 'session') storeSet('sessionStorage', k);
  if (m === 'local') storeSet('localStorage', k);
  setBadge('ok', '● 已套用');
  setStatus('API Key 已套用。');
}
function clearKey() {
  $('#apiKey').value = '';
  storeDel('sessionStorage');
  storeDel('localStorage');
  setBadge('warn', '● 尚未設定');
  setStatus('已清除這個瀏覽器中的 API Key。');
}

/* ---------- 語速 ---------- */
function setSpeed(v) {
  $('#speed').value = v;
  $('#speedOut').textContent = Number(v).toFixed(2) + '×';
}
function updateRateUI() {
  const v = selectedVoice(), c = isChirp(v);
  $('#speed').disabled = c;
  $('#rateBox').classList.toggle('rate-disabled', c);
  if (c) {
    setSpeed(1);
    $('#rateHint').textContent = 'Chirp 3 HD 不支援 speaking rate / pitch 控制。';
  } else {
    $('#rateHint').textContent = 'Standard / WaveNet 可調整語速。';
  }
}

/* ---------- Text-to-Speech ---------- */
function buildBody(text, v) {
  const audioConfig = { audioEncoding: 'MP3' };
  if (!isChirp(v)) audioConfig.speakingRate = Number($('#speed').value);
  return { input: { text }, voice: { languageCode: v.lang, name: v.id }, audioConfig };
}
function base64ToBlob(b, m = 'audio/mpeg') {
  const bin = atob(b), bytes = new Uint8Array(bin.length);
  for (let i = 0; i < bin.length; i++) bytes[i] = bin.charCodeAt(i);
  return new Blob([bytes], { type: m });
}
async function synthesize(v, text) {
  const key = keyValue();
  if (!key) throw new Error('請先輸入 Google Cloud API Key。');
  if (!text.trim()) throw new Error('請輸入要轉換的文字。');
  if (!navigator.onLine) throw new Error('目前離線，語音合成需要網路連線。');
  abortController = new AbortController();
  const r = await fetch('https://texttospeech.googleapis.com/v1/text:synthesize?key=' + encodeURIComponent(key), {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(buildBody(text, v)),
    signal: abortController.signal,
    cache: 'no-store'
  });
  const data = await r.json().catch(() => ({}));
  if (!r.ok) throw new Error(data?.error?.message || `HTTP ${r.status}`);
  if (!data.audioContent) throw new Error('API 沒有回傳 audioContent。');
  return base64ToBlob(data.audioContent);
}
async function playVoice(id) {
  const v = findVoice(id), text = $('#ttsText').value;
  setStatus('正在連線 Google Cloud Text-to-Speech…');
  $('#status').classList.add('spinner');
  try {
    const blob = await synthesize(v, text);
    if (currentUrl) URL.revokeObjectURL(currentUrl);
    currentUrl = URL.createObjectURL(blob);
    const p = $('#player');
    p.src = currentUrl;
    p.style.display = 'block';
    await p.play();
    setStatus('正在播放：' + v.id);
  } catch (e) {
    if (e.name !== 'AbortError') setStatus('失敗：' + e.message, true);
  } finally {
    $('#status').classList.remove('spinner');
    abortController = null;
  }
}
async function downloadVoice(id) {
  const v = findVoice(id), text = $('#ttsText').value;
  setStatus('正在產生 MP3…');
  $('#status').classList.add('spinner');
  try {
    const blob = await synthesize(v, text), url = URL.createObjectURL(blob), a = document.createElement('a');
    a.href = url;
    a.download = v.id + '.mp3';
    document.body.appendChild(a);
    a.click();
    a.remove();
    setTimeout(() => URL.revokeObjectURL(url), 5000);
    setStatus('MP3 已產生並開始下載。');
  } catch (e) {
    if (e.name !== 'AbortError') setStatus('下載失敗：' + e.message, true);
  } finally {
    $('#status').classList.remove('spinner');
    abortController = null;
  }
}
function stopAudio() {
  $('#player').pause();
  if (abortController) abortController.abort();
  setStatus('已停止播放／取消目前請求。');
}
async function testApi() {
  try {
    await synthesize(findVoice('cmn-TW-Standard-A'), '這是一段 Google Cloud Text-to-Speech API 測試。');
    setBadge('ok', '● API 可用');
    setStatus('Google Cloud Text-to-Speech API 測試成功。');
  } catch (e) {
    setBadge('err', '● API 測試失敗');
    setStatus('API 測試失敗：' + e.message, true);
  }
}

/* ---------- 語音卡片 ---------- */
function filtered() {
  const q = $('#search').value.trim().toLowerCase(), cat = $('#category').value;
  return VOICES.filter(v =>
    (cat === '全部' || v.category === cat || v.series === cat) &&
    (!q || [v.name, v.id, v.scene, v.tone, v.series, v.category].join(' ').toLowerCase().includes(q))
  );
}
function selectVoice(id) {
  $('#voiceSelect').value = id;
  const v = selectedVoice();
  if (v && !isChirp(v)) setSpeed(v.speed);
  updateRateUI();
  $('#ttsText').closest('.panel').scrollIntoView({ behavior: 'smooth', block: 'start' });
}
function render() {
  const list = filtered();
  $('#voiceCount').textContent = `顯示 ${list.length} / ${VOICES.length} 種`;
  if (!list.length) {
    $('#cards').innerHTML = '<p class="empty">找不到符合條件的語音。</p>';
    return;
  }
  $('#cards').innerHTML = list.map(v => `<article class="card">
    <div class="icon" aria-hidden="true">${v.icon}</div>
    <h3>${esc(v.name)}</h3>
    <div class="id">${esc(v.id)}</div>
    <div class="meta">
      <span class="tag">${v.gender}聲</span>
      <span class="tag">${esc(v.category)}</span>
      <span class="tag">${esc(v.series)}</span>
      ${isChirp(v) ? '<span class="tag">固定語速</span>' : `<span class="tag">建議 ${v.speed.toFixed(2)}×</span>`}
    </div>
    <div class="scene"><b>適用：</b>${esc(v.scene)}<br><b>風格：</b>${esc(v.tone)}</div>
    <div class="card-actions">
      <button class="mini play" type="button" data-action="play" data-id="${esc(v.id)}">▶ 試聽</button>
      <button class="mini download" type="button" data-action="download" data-id="${esc(v.id)}">⬇ MP3</button>
      <button class="mini" type="button" data-action="select" data-id="${esc(v.id)}">選用</button>
    </div>
  </article>`).join('');
}

/* ---------- 初始化 ---------- */
document.addEventListener('DOMContentLoaded', () => {
  loadKey();
  const cats = ['全部', ...new Set(VOICES.flatMap(v => [v.category, v.series]))];
  $('#category').innerHTML = cats.map(x => `<option>${esc(x)}</option>`).join('');
  $('#voiceSelect').innerHTML = VOICES.map(v => `<option value="${v.id}">${esc(v.name)}｜${v.id}</option>`).join('');

  $('#voiceSelect').addEventListener('change', () => {
    const v = selectedVoice();
    if (v && !isChirp(v)) setSpeed(v.speed);
    updateRateUI();
  });
  $('#speed').addEventListener('input', () => setSpeed($('#speed').value));
  $('#search').addEventListener('input', render);
  $('#category').addEventListener('change', render);
  $('#toggleKey').addEventListener('click', e => {
    const i = $('#apiKey');
    i.type = i.type === 'password' ? 'text' : 'password';
    e.target.textContent = i.type === 'password' ? '顯示' : '隱藏';
  });
  $('#applyKey').addEventListener('click', applyKey);
  $('#clearKey').addEventListener('click', clearKey);
  $('#testKey').addEventListener('click', testApi);
  $('#playBtn').addEventListener('click', () => playVoice($('#voiceSelect').value));
  $('#downloadBtn').addEventListener('click', () => downloadVoice($('#voiceSelect').value));
  $('#stopBtn').addEventListener('click', stopAudio);
  $('#cards').addEventListener('click', e => {
    const b = e.target.closest('button[data-action]');
    if (!b) return;
    ({ play: playVoice, download: downloadVoice, select: selectVoice })[b.dataset.action](b.dataset.id);
  });

  render();
  updateRateUI();
});
