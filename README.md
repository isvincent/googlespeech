# Google 中文語音實驗室｜BYOK 單機 / GitHub Pages 版

- 使用者需要時自行輸入 Google Cloud API Key。
- 支援台灣華語 Standard / WaveNet、普通話 Standard / WaveNet、精選 Chirp 3 HD。
- 支援試聽與 MP3 下載。
- `index.html` 可直接部署 GitHub Pages。
- Chirp 3 HD 不支援 speaking rate / pitch，因此頁面會自動停用語速控制。

## 使用前
1. 在 Google Cloud 建立 Project。
2. 啟用 Cloud Text-to-Speech API。
3. 建立 API Key。
4. 建議將 API Key 限制為只允許 Cloud Text-to-Speech API。
5. 部署 GitHub Pages 時，可再視需要設定網站來源限制。

## GitHub Pages
Settings → Pages → Deploy from a branch → main → / (root)

## 安全
此為 BYOK 純前端版本，Key 不會寫入 GitHub，但會存在使用者自己的瀏覽器環境。公用電腦請選「不儲存」。正式公開服務仍建議後端 Proxy / OAuth。
