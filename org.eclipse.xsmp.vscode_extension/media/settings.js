// @ts-nocheck

// Script run within the webview itself.
(function () {

    // Get a reference to the VS Code webview api.
    // We use this API to post messages back to our extension.

    const vscode = acquireVsCodeApi();

	const notesContainer = document.querySelector('.notes')

    const saveButtonContainer = document.querySelector('.save-button');

    saveButtonContainer.querySelector('button').addEventListener('click', () => {
        const buildAutomatically = document.getElementById('buildAutomatically').checked;
        const profile = document.getElementById('profile').value;
        //const sourceFolders = document.getElementById('sourceFolders').value;
        //const dependencies = document.getElementById('dependencies').value;
        
		const tools = Array.from(document.querySelectorAll('#tools option:checked'))
  			.map(option => option.value);
        
        vscode.postMessage({
            type: 'save',
            data: {
                build_automatically: buildAutomatically,
                profile: profile,
                sources: [],
                dependencies: [],
                tools: tools
            }
        });
    })
    
	/**
     * Render the document in the webview.
     * @param {string} text 
     */
	function updateContent(text) {
		let json;
		try {
			if (!text) {
				text = '{}';
			}
			json = JSON.parse(text);
		} catch {
			return;
		}
		
		const buildAutomaticallyInput = document.getElementById('buildAutomatically');
        const profileInput = document.getElementById('profile');
        const sourceFoldersInput = document.getElementById('sourceFolders');
        const dependenciesInput = document.getElementById('dependencies');
        const toolsInput = document.getElementById('tools');

        buildAutomaticallyInput.checked = json.build_automatically;
        profileInput.value = json.profile;
        sourceFoldersInput.value = json.sources.join(', ');
        dependenciesInput.value = json.dependencies.join(', ');

        if (toolsInput.multiple) {
            const selectedTools = json.tools;
            for (const element of toolsInput.options) {
                element.selected = selectedTools.includes(element.value);
            }
        } else {
            toolsInput.value = json.tools.join(', ');
        }
        
        notesContainer.appendChild(saveButtonContainer);
	}
    
    window.addEventListener('message', event => {
        const message = event.data;
        switch (message.type) {
            case 'update':
                const text = message.text;

                // Update our webview's content
                updateContent(text);

                // Then persist state information.
                // This state is returned in the call to `vscode.getState` below when a webview is reloaded.
                vscode.setState({ text });

                return;
        }
    });
    
    // Webviews are normally torn down when not visible and re-created when they become visible again.
	// State lets us save information across these re-loads
	const state = vscode.getState();
	if (state) {
		updateContent(state.text);
	}
}());
