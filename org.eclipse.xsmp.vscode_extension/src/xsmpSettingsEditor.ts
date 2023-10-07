import * as vscode from 'vscode';
import { getNonce } from './util';

export class XsmpSettingsEditorProvider implements vscode.CustomTextEditorProvider {

    public static register(context: vscode.ExtensionContext): vscode.Disposable {
        const provider = new XsmpSettingsEditorProvider(context);
        const providerRegistration = vscode.window.registerCustomEditorProvider(XsmpSettingsEditorProvider.viewType, provider);
        return providerRegistration;
    }

    private static readonly viewType = 'xsmp.settingsEditor';
    
    public static documentUri = null;

	constructor(
		private readonly context: vscode.ExtensionContext
	) { }

	/**
	 * Called when our custom editor is opened.
	 */
	public async resolveCustomTextEditor(
		document: vscode.TextDocument,
		webviewPanel: vscode.WebviewPanel,
		_token: vscode.CancellationToken
	): Promise<void> {
		XsmpSettingsEditorProvider.documentUri = document.uri;
		
		// Setup initial content for the webview
		webviewPanel.webview.options = {
			enableScripts: true,
		};
		webviewPanel.webview.html = this.getHtmlForWebview(webviewPanel.webview);

		function updateWebview() {
			webviewPanel.webview.postMessage({
				type: 'update',
				text: document.getText(),
			});
		}

		// Hook up event handlers so that we can synchronize the webview with the text document.
		//
		// The text document acts as our model, so we have to sync change in the document to our
		// editor and sync changes in the editor back to the document.
		// 
		// Remember that a single text document can also be shared between multiple custom
		// editors (this happens for example when you split a custom editor)

		const changeDocumentSubscription = vscode.workspace.onDidChangeTextDocument(e => {
			if (e.document.uri.toString() === document.uri.toString()) {
				updateWebview();
			}
		});

		// Make sure we get rid of the listener when our editor is closed.
		webviewPanel.onDidDispose(() => {
			changeDocumentSubscription.dispose();
		});

		// Receive message from the webview.
		webviewPanel.webview.onDidReceiveMessage(e => {
			switch (e.type) {
				case 'save':
					this.save(document, e.data);
					return;
			}
		});

		updateWebview();
	}

	/**
	 * Get the static html used for the editor webviews.
	 */
	private getHtmlForWebview(webview: vscode.Webview): string {
		// Local path to script and css for the webview
		const scriptUri = webview.asWebviewUri(vscode.Uri.joinPath(
			this.context.extensionUri, 'media', 'settings.js'));

		const styleResetUri = webview.asWebviewUri(vscode.Uri.joinPath(
			this.context.extensionUri, 'media', 'reset.css'));

		const styleVSCodeUri = webview.asWebviewUri(vscode.Uri.joinPath(
			this.context.extensionUri, 'media', 'vscode.css'));

		const styleMainUri = webview.asWebviewUri(vscode.Uri.joinPath(
			this.context.extensionUri, 'media', 'catScratch.css'));
			
		const styleUri = webview.asWebviewUri(vscode.Uri.joinPath(
			this.context.extensionUri, 'media', 'style.css'));

		// Use a nonce to whitelist which scripts can be run
		const nonce = getNonce();
				
		const test = XsmpSettingsEditorProvider.documentUri;
		const activeWorkspaceFolder = vscode.workspace.getWorkspaceFolder(test).name;
		
		const folderNames = JSON.stringify(vscode.workspace.workspaceFolders?.map(folder => folder.name) || []);
						
		return `
			<!DOCTYPE html>
			<html lang="en">
			<head>
				<meta charset="UTF-8">
				<meta http-equiv="Content-Security-Policy" content="default-src 'none'; img-src ${webview.cspSource}; style-src ${webview.cspSource}; script-src 'nonce-${nonce}';">
				<meta name="viewport" content="width=device-width, initial-scale=1.0">

				<link href="${styleUri}" rel="stylesheet" />

				<title>XSMP settings</title>
			</head>
			<body>
				<div class="notes">
				<h1>XSMP Settings</h1>
				<form id="configForm">
				    <div>
					    <label for="buildAutomatically">Build Automatically</label>
					    <input type="checkbox" id="buildAutomatically" name="buildAutomatically">
					</div>
			        <div>
			            <label for="profile">Selected Profile</label>
			            <select id="profile" name="profile">
			                <option value="xsmp-sdk">xsmp-sdk</option>
			                <option value="esa-cdk">esa-cdk</option>
			            </select>
			        </div>
			        <div>
			            <label for="sourceFolders">Source Folders</label>
			            <input type="text" id="sourceFolders" name="sourceFolders">
			        </div>
			        <div>
			            <label for="dependencies">Dependencies</label>
			            <select id="selectedFolders" name="selectedFolders" multiple>
                            <script nonce="${nonce}">
                                const folderNames = ${folderNames};
                                folderNames.forEach(folderName => {
                                    const option = document.createElement('option');
                                    option.value = folderName;
                                    option.textContent = folderName;
                                    document.getElementById('selectedFolders').appendChild(option);
                                });
                            </script>
                        </select>
			        </div>
			        <div>
					    <label for="tools">Tools</label>
					    <select id="tools" name="tools" multiple>
					        <option value="smp">smp</option>
					        <option value="python">python</option>
					    </select>
					</div>
				    <div class="save-button">
						<button>Save</button>
					</div>
				</form>
				</div>
				
				<script nonce="${nonce}" src="${scriptUri}"></script>
			</body>
			</html>`;
	}
	
	private save(document: vscode.TextDocument, data: any) {
		return this.updateTextDocument(document, data);
	}

	/**
	 * Write out the json to a given document.
	 */
	private updateTextDocument(document: vscode.TextDocument, json: any) {
		const edit = new vscode.WorkspaceEdit();

		// Just replace the entire document every time for this example extension.
		// A more complete extension should compute minimal edits instead.
		edit.replace(
			document.uri,
			new vscode.Range(0, 0, document.lineCount, 0),
			JSON.stringify(json, null, 2));

		return vscode.workspace.applyEdit(edit);
	}
}