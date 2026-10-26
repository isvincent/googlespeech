# 🔊 Google 中文語音實驗室｜BYOK（RWD + PWA 版）

以 **Google Cloud Text-to-Speech** 試聽、比較並下載中文語音 MP3 的純前端工具。
採 **BYOK（Bring Your Own Key）** 架構：使用者需要時才輸入自己的 API Key，Key 不會寫入程式碼或 GitHub。

- ✅ 支援台灣華語 Standard / WaveNet、普通話 Standard / WaveNet、精選 Chirp 3 HD（共 20 種語音）
- ✅ 試聽、MP3 下載、搜尋與分類篩選
- ✅ **RWD 響應式設計**：桌機、平板、手機、橫向手機、iPhone 瀏海安全區
- ✅ **PWA**：可安裝到桌面／主畫面、離線開啟介面、自動更新提示
- ✅ 可直接部署到 **GitHub Pages**

> Chirp 3 HD 不支援 speaking rate / pitch，因此選到 Chirp 3 時頁面會自動停用語速控制。

---

## 📁 專案架構

```
google-chinese-voice-lab/
├── index.html               # 首頁（主程式頁面）
├── manifest.webmanifest     # PWA 設定：名稱、圖示、主題色、啟動方式
├── sw.js                    # Service Worker：快取 App Shell、離線支援
├── .nojekyll                # 讓 GitHub Pages 直接提供靜態檔案
├── .gitignore
├── README.md
├── assets/
│   ├── css/
│   │   └── style.css        # 樣式與 RWD 斷點
│   └── js/
│       ├── app.js           # 語音資料庫與 Text-to-Speech 邏輯
│       └── pwa.js           # SW 註冊、安裝提示、更新提示、離線狀態
└── icons/
    ├── icon.svg             # 向量圖示（favicon / manifest）
    ├── icon-192.png         # PWA 圖示 192×192
    ├── icon-512.png         # PWA 圖示 512×512
    ├── maskable-512.png     # Android 自適應圖示（maskable）
    ├── apple-touch-icon.png # iOS 主畫面圖示 180×180
    └── favicon-32.png       # 瀏覽器分頁圖示
```

---

## 📱 RWD 響應式設計

| 斷點 | 版面 |
|---|---|
| ≥ 1400px | 語音卡片 4 欄 |
| 901–1399px | 卡片 3 欄、設定區 3 欄 |
| 641–900px（平板） | 卡片 2 欄、設定區 2 欄 |
| ≤ 640px（手機） | 全部單欄、按鈕加寬、卡片按鈕平均分配 |
| ≤ 380px（小手機） | 按鈕全寬、縮小邊距 |
| 橫向手機（高度 ≤ 500px） | 壓縮標題區 |

其他細節：

- `viewport-fit=cover` + `env(safe-area-inset-*)`：避開 iPhone 瀏海與底部橫條
- 輸入框、按鈕最小高度 48px，符合觸控目標建議；字級 ≥ 16px，避免 iOS 自動放大
- 浮起動畫只在滑鼠裝置啟用（`@media (hover: hover)`），觸控裝置不會殘留 hover 狀態
- 支援 `prefers-reduced-motion`，尊重使用者的「減少動態效果」設定

---

## 📲 PWA 功能

| 功能 | 說明 |
|---|---|
| 安裝成 App | Chrome / Edge / Android 會出現「安裝」提示；iOS Safari 請用「分享 → 加入主畫面」 |
| 離線開啟 | 介面檔案已快取，離線也能開啟頁面（語音合成仍需網路） |
| 離線提示 | 斷網時右上角顯示「離線中」，合成前也會提示 |
| 自動更新 | 偵測到新版本時顯示「重新載入」按鈕 |
| 安全快取 | Service Worker **只快取本站靜態檔案**，Google API 請求一律不經快取，API Key 與語音內容不會留在快取中 |

### 更新網站後要做的事

修改任何檔案後，請將 `sw.js` 第一行的版本號加一，使用者才會收到新版本：

```js
const CACHE_VERSION = 'v1.0.1';
```

> ⚠️ PWA 與 Service Worker 需在 **HTTPS**（如 GitHub Pages）或 `localhost` 下才會啟用。
> 直接雙擊 `index.html`（`file://`）仍可正常使用語音功能，只是不會啟用 PWA。

---

## 🔑 使用前準備（Google Cloud）

1. 在 [Google Cloud Console](https://console.cloud.google.com/) 建立 Project
2. 啟用 **Cloud Text-to-Speech API**
3. 建立 **API Key**
4. 建議設定 **API 限制**：只允許 Cloud Text-to-Speech API
5. 部署到 GitHub Pages 後，建議再設定 **網站限制（HTTP referrer）**，例如：
   `https://<你的帳號>.github.io/<repo 名稱>/*`

---

## 🚀 上傳 GitHub 並部署 GitHub Pages

### 方法一：網頁上傳（不需安裝 Git）

1. 登入 GitHub → 右上角 **＋ → New repository**，輸入名稱（例如 `google-chinese-voice-lab`），選 **Public** → **Create repository**
2. 點 **uploading an existing file**，把本資料夾內**所有檔案與資料夾**拖曳上傳（保持資料夾結構）
3. 按 **Commit changes**
4. 進入 **Settings → Pages**
5. **Source** 選 **Deploy from a branch**，Branch 選 **main**、資料夾選 **/ (root)** → **Save**
6. 約 1–2 分鐘後，網址為：`https://<你的帳號>.github.io/<repo 名稱>/`

> 💡 `.nojekyll`、`.gitignore` 為隱藏檔，若拖曳時沒有出現，可在 GitHub 上用 **Add file → Create new file** 建立（`.nojekyll` 內容留空即可）。

### 方法二：使用 Git 指令

```bash
git init
git add .
git commit -m "Google 中文語音實驗室：RWD + PWA 版"
git branch -M main
git remote add origin https://github.com/<你的帳號>/<repo 名稱>.git
git push -u origin main
```

推送後依方法一的第 4–6 步開啟 GitHub Pages。

---

## 🧪 本機測試 PWA

PWA 需要 HTTP 伺服器，可在專案資料夾執行其中一種：

```bash
python -m http.server 8000
```

```bash
npx serve .
```

再開啟 `http://localhost:8000`，用 Chrome DevTools → **Application** 檢查 Manifest 與 Service Worker，或執行 **Lighthouse** 檢測。

---

## 🔒 安全說明

- 這是 **BYOK 純前端版本**，API Key 不會寫入 GitHub，但會存在使用者自己的瀏覽器環境（依「儲存方式」選擇）
- 公用電腦請選「**不儲存**」，使用完畢按「清除 Key」
- Service Worker 不會快取任何 Google API 請求
- 正式公開服務仍建議改用 **後端 Proxy / OAuth**，避免 API Key 暴露在前端

---

## 📄 授權

可自由用於教學與非商業用途。Google Cloud Text-to-Speech 的使用費用依您的 Google Cloud 帳戶計費。
