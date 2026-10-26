/* PWA：註冊 Service Worker、安裝提示、更新提示、離線狀態 */
(() => {
  const $ = s => document.querySelector(s);
  let deferredPrompt = null;

  /* ---------- 離線狀態 ---------- */
  const updateNet = () => { $('#netBadge').hidden = navigator.onLine; };
  window.addEventListener('online', updateNet);
  window.addEventListener('offline', updateNet);
  document.addEventListener('DOMContentLoaded', updateNet);

  /* ---------- 安裝提示（Chrome / Edge / Android） ---------- */
  const dismissed = () => { try { return localStorage.getItem('pwaInstallDismissed') === '1'; } catch { return false; } };
  window.addEventListener('beforeinstallprompt', e => {
    e.preventDefault();
    deferredPrompt = e;
    if (!dismissed()) $('#installBar').hidden = false;
  });
  document.addEventListener('DOMContentLoaded', () => {
    $('#installBtn').addEventListener('click', async () => {
      $('#installBar').hidden = true;
      if (!deferredPrompt) return;
      deferredPrompt.prompt();
      await deferredPrompt.userChoice;
      deferredPrompt = null;
    });
    $('#installClose').addEventListener('click', () => {
      $('#installBar').hidden = true;
      try { localStorage.setItem('pwaInstallDismissed', '1'); } catch { }
    });
  });
  window.addEventListener('appinstalled', () => { $('#installBar').hidden = true; });

  /* ---------- Service Worker（file:// 單機開啟時不支援，會自動略過） ---------- */
  if (!('serviceWorker' in navigator) || !/^https?:$/.test(location.protocol)) return;

  window.addEventListener('load', async () => {
    try {
      const reg = await navigator.serviceWorker.register('./sw.js', { scope: './' });
      const showUpdate = worker => {
        $('#updateBar').hidden = false;
        $('#updateBtn').onclick = () => worker.postMessage('SKIP_WAITING');
      };
      if (reg.waiting && navigator.serviceWorker.controller) showUpdate(reg.waiting);
      reg.addEventListener('updatefound', () => {
        const nw = reg.installing;
        nw?.addEventListener('statechange', () => {
          if (nw.state === 'installed' && navigator.serviceWorker.controller) showUpdate(nw);
        });
      });
      // 首次安裝時 clients.claim() 也會觸發 controllerchange，此時不需重新載入
      const hadController = !!navigator.serviceWorker.controller;
      let reloaded = false;
      navigator.serviceWorker.addEventListener('controllerchange', () => {
        if (!hadController || reloaded) return;
        reloaded = true;
        location.reload();
      });
    } catch (err) {
      console.warn('Service Worker 註冊失敗：', err);
    }
  });
})();
