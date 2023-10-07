import './assets/main.scss'

import { createApp } from 'vue'
import App from './App.vue'
import store from './store'

createApp(App).use(store).mount('#app')

window.addEventListener("message", (event) => {
	const msg = event.data;
	
	switch (msg.command) {
		case "initialLoad":
			if (msg.projectName) {
				// do something
			}
			break;
		default:
			break;
	}
});