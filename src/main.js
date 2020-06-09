import App from './App.svelte';
if (window) {
	window.VERSION = 'YAHTZEE_VERSION';
	window.COMMIT = 'YAHTZEE_SHA';
}
const app = new App({
	target: document.body,
});

export default app;