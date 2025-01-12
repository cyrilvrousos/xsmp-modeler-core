/*******************************************************************************
* Copyright (C) 2023 THALES ALENIA SPACE FRANCE.
*
* All rights reserved. This program and the accompanying materials
* are made available under the terms of the Eclipse Public License 2.0
* which accompanies this distribution, and is available at
* https://www.eclipse.org/legal/epl-2.0/
*
* SPDX-License-Identifier: EPL-2.0
******************************************************************************/

import * as path from "path";
import * as vscode from "vscode";
import { ensureDir } from "fs-extra";
import * as utils from "../util";

export class NewProjectPanel {
	public static currentPanel: NewProjectPanel | undefined;

	public static createOrShow(
		extensionPath: string
	) {
		const column = vscode.window.activeTextEditor
			? vscode.window.activeTextEditor.viewColumn
			: vscode.ViewColumn.One;
		if (NewProjectPanel.currentPanel) {
			NewProjectPanel.currentPanel.panel.reveal(column);
		} else {
			NewProjectPanel.currentPanel = new NewProjectPanel(
				extensionPath,
				column
			);
		}
	}

	public static isCreatedAndHidden(): boolean {
		return (
			NewProjectPanel.currentPanel &&
			!NewProjectPanel.currentPanel.panel.visible
		);
	}

	private static readonly viewType = "newProjectWizard";
	private readonly panel: vscode.WebviewPanel;
	private extensionPath: string;
	private _disposables: vscode.Disposable[] = [];

	private constructor(
		extensionPath: string,
		column: vscode.ViewColumn
	) {
		this.extensionPath = extensionPath;

		this.panel = vscode.window.createWebviewPanel(
			NewProjectPanel.viewType,
			"New Project",
			column,
			{
				enableScripts: true,
				retainContextWhenHidden: true
			}
		);

		const scriptPath = this.panel.webview.asWebviewUri(
			vscode.Uri.file(
				path.join(this.extensionPath, "dist", "index.js")
			)
		);
		
		const stylePath = this.panel.webview.asWebviewUri(
			vscode.Uri.file(
				path.join(this.extensionPath, "dist", "index.css")
			)
		);
		this.panel.webview.html = this.createHtml(scriptPath, stylePath);

		const containerPath =
			process.platform === "win32" ? process.env.USERPROFILE : process.env.HOME;

		this.panel.webview.onDidReceiveMessage(async (message) => {
			switch (message.command) {
				case "createProject":
					this.createProject(
						message.containerFolder,
						message.projectName
					)
					break;
				case "openProjectDirectory":
					let selectedProjectDir = await this.openFolder();
					if (selectedProjectDir) {
						this.panel.webview.postMessage({
							command: "setContainerDirectory",
							projectDirectory: selectedProjectDir,
						});
					}
					break;
				case "requestInitValues":
					break;
				default:
					break;
			}
		});

		this.panel.onDidDispose(
			() => {
				NewProjectPanel.currentPanel = undefined;
			},
			null,
			this._disposables
		);
	}

	private async createProject(
		projectName: string,
		projectDirectory: string
	) {
		const newProjectPath = path.join(projectDirectory, projectName);
		let isSkipped = false;
		await vscode.window.withProgress(
			{
				cancellable: true,
				location: vscode.ProgressLocation.Notification,
				title: "XSMP-SDK: Create project"
			},
			async (
				progress: vscode.Progress<{ message: string; increment: number }>,
				token: vscode.CancellationToken
			) => {
				try {
					const projectDirExists = await utils.dirExistPromise(projectDirectory);
					if (!projectDirExists) {
						vscode.window.showInformationMessage(
							"Project directory doesn't exists."
						);
						this.panel.webview.postMessage({
							command: "goToBeginning", // TODO à vérfier
						});
						isSkipped = true;
						return;
					}

					const projectNameExists = await utils.dirExistPromise(newProjectPath);
					if (projectNameExists) {
						const overwriteProject = await vscode.window.showInformationMessage(
							`${newProjectPath} already exists. Overwrite content?`,
							"Yes",
							"No"
						);
						if (
							typeof overwriteProject === "undefined" ||
							overwriteProject === "No"
						) {
							isSkipped = true;
							return;
						}
					}

					await ensureDir(newProjectPath, { mode: 0o775 });
					const boilerplatePath = path.join(
						this.extensionPath,
						"templates",
						"test"
					);
					await utils.copyFromSrcProject(boilerplatePath, vscode.Uri.file(newProjectPath));

					if (isSkipped) {
						return;
					}

					const projectCreatedMsg = `Project ${projectName} has been created. Open project in a new window?`;
					const openProjectChoice = await vscode.window.showInformationMessage(
						projectCreatedMsg,
						"Yes",
						"No"
					);

					if (openProjectChoice && openProjectChoice === "Yes") {
						vscode.commands.executeCommand(
							"vscode.openFolder",
							vscode.Uri.file(newProjectPath),
							true
						);
					}
				} catch (error) {
					// Mettre un logger ?
				}
			}
		)
	}

	private async openFolder() {
		const selectedFolder = await vscode.window.showOpenDialog({
			canSelectFolders: true,
			canSelectFiles: false,
			canSelectMany: false,
		});
		if (selectedFolder && selectedFolder.length > 0) {
			return selectedFolder[0].fsPath;
		}
	}

	private createHtml(scriptPath: vscode.Uri, stylePath: vscode.Uri): string {
		return `<!DOCTYPE html>
      <html lang="en">
        <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>XSMP-SDK Project</title>
          <script type="module" crossorigin src="${scriptPath}"></script>
    	  <link rel="stylesheet" href="${stylePath}">
        </head>
        <body>
          <div id="app"></div>
        </body>
      </html>`;
	}
}