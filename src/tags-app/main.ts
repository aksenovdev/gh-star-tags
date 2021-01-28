import App from './src/App.svelte';

const app = new App({
	target: document.querySelector('div'),
	props: {
		name: 'world'
	}
});

export default app;
