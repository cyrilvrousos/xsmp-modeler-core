import { createStore } from 'vuex'

let vscode;
try {
	vscode = acquireVsCodeApi();
} catch (error) {
	console.error(error);
}

export default createStore({
	mutations: {
		setContainerDirectory(state, containerDir) {
			state.containerDirectory = containerDir;
		}
	},
	actions: {
		openProjectDirectory(context) {
			vscode.postMessage({
				command: "openProjectDirectory",
			});
		}
	}
})