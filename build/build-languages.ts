/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/

import glob from 'glob';
import { runTsc, massageAndCopyDts, buildESM, buildAMD } from './utils';
import { copyFile, removeDir } from './fs';

removeDir(`out/languages`);

runTsc(`src/tsconfig.json`);

//#region Type Defintion

massageAndCopyDts(
	`out/languages/amd-tsc/language/rcasm/monaco.contribution.d.ts`,
	`out/languages/bundled/rcasm.d.ts`,
	'monaco.languages.rcasm'
);

//#endregion

//#region rcasm

buildESM({
	base: 'language/rcasm',
	entryPoints: [
		'src/language/rcasm/monaco.contribution.ts',
		'src/language/rcasm/rcasmMode.ts',
		'src/language/rcasm/rcasm.worker.ts'
	],
	external: ['monaco-editor-core', '*/rcasmMode', '*/monaco.contribution']
});
buildAMD({
	base: 'language/rcasm',
	entryPoint: 'src/language/rcasm/monaco.contribution.ts',
	amdModuleId: 'vs/language/rcasm/monaco.contribution',
	amdDependencies: ['vs/editor/editor.api']
});
buildAMD({
	base: 'language/rcasm',
	entryPoint: 'src/language/rcasm/rcasmMode.ts',
	amdModuleId: 'vs/language/rcasm/rcasmMode',
	external: ['*/monaco.contribution']
});
buildAMD({
	base: 'language/rcasm',
	entryPoint: 'src/language/rcasm/rcasmWorker.ts',
	amdModuleId: 'vs/language/rcasm/rcasmWorker'
});

//#endregion

//#region basic-languages

glob('../src/basic-languages/*/*.contribution.ts', { cwd: __dirname }, function (err, files) {
	if (err) {
		console.error(err);
		return;
	}

	const languages = files
		.map((file) => file.split('/')[3])
		.filter((file) => file === 'mips' || file === 'rcasm' || file === 'rcdsm');

	// ESM
	{
		/** @type {string[]} */
		const entryPoints = [
			'src/basic-languages/monaco.contribution.ts',
			'src/basic-languages/_.contribution.ts'
		];
		const external = ['monaco-editor-core', '*/_.contribution'];
		for (const language of languages) {
			entryPoints.push(`src/basic-languages/${language}/${language}.contribution.ts`);
			entryPoints.push(`src/basic-languages/${language}/${language}.ts`);
			external.push(`*/${language}.contribution`);
			external.push(`*/${language}`);
		}
		buildESM({
			base: 'basic-languages',
			entryPoints,
			external
		});
	}

	// AMD
	{
		buildAMD({
			base: 'basic-languages',
			entryPoint: 'src/basic-languages/monaco.contribution.ts',
			amdModuleId: 'vs/basic-languages/monaco.contribution',
			amdDependencies: ['vs/editor/editor.api']
		});
		for (const language of languages) {
			buildAMD({
				base: 'basic-languages',
				entryPoint: `src/basic-languages/${language}/${language}.ts`,
				amdModuleId: `vs/basic-languages/${language}/${language}`
			});
		}
	}
});

//#endregion
