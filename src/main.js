import App from './App.svelte';
if (window) {
	window.VERSION = 'YAHTZEE_VERSION';
	window.COMMIT = 'YAHTZEE_SHA';
}

const isUpdateAvailable = new Promise(resolve => {
  if (!('serviceWorker' in navigator)) {
    resolve(false);
    return;
  }
  navigator.serviceWorker.register('sw.js')
    .then(reg => {
      reg.onupdatefound = () => {
        const installingWorker = reg.installing;
        installingWorker.onstatechange = () => {
          if (installingWorker.state === 'installed') {
            if (navigator.serviceWorker.controller) {
              resolve(true);
            } else {
              resolve(false);
            }
          }
        };
      };
    })
    .catch(err => console.error('[SW ERROR]', err));
});
const app = new App({
	target: document.body,
	props: {
    update: isUpdateAvailable
  },
});

export default app;