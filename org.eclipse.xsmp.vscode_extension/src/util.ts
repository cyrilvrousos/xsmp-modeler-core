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

import * as fs from "fs";
import * as vscode from "vscode";
import * as path from "path";
import {
	copy,
	ensureDir,
	pathExists,
	readdir
} from "fs-extra";

export function getNonce() {
	let text = '';
	const possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
	for (let i = 0; i < 32; i++) {
		text += possible.charAt(Math.floor(Math.random() * possible.length));
	}
	return text;
}

export function dirExistPromise(dirPath) {
	return new Promise<boolean>((resolve, reject) => {
		if (!dirPath) {
			return resolve(false);
		}
		fs.stat(dirPath, (err, stats) => {
			if (err) {
				return resolve(false);
			} else {
				if (stats.isDirectory()) {
					return resolve(true);
				}
				return resolve(false);
			}
		});
	});
}


export async function copyFromSrcProject(
	srcDirPath: string,
	destinationDir: vscode.Uri
) {
	await createVscodeFolder(destinationDir);
	await copy(srcDirPath, destinationDir.fsPath);
}

export async function createVscodeFolder(curWorkspaceFsPath: vscode.Uri) {
	const settingsDir = path.join(curWorkspaceFsPath.fsPath, ".vscode");
	const vscodeTemplateFolder = path.join("", ".vscode"); // template dir
	await ensureDir(settingsDir);

	const files = await readdir(vscodeTemplateFolder);

	for (const f of files) {
		const fPath = path.join(settingsDir, f);
		const fSrcPath = path.join(vscodeTemplateFolder, f);
		const fExists = await pathExists(fPath);
		if (!fExists) {
			await copy(fSrcPath, fPath);
		}
	}
}