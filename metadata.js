(function () {

	var METADATA = {
		CORE: {
			paths: {
				src: '/vscode/out/vs',
				'npm/dev': 'node_modules/monaco-editor-core/dev/vs',
				'npm/min': 'node_modules/monaco-editor-core/min/vs',
				built: '/vscode/out-monaco-editor-core/min/vs',
				releaseDev: 'release/dev/vs',
				releaseMin: 'release/min/vs',
			}
		},
		PLUGINS: [
			{
				name: 'monaco-rcasm',
				contrib: 'vs/language/rcasm/monaco.contribution',
				modulePrefix: 'vs/language/rcasm',
				thirdPartyNotices: 'node_modules/@paul80nd/monaco-rcasm/ThirdPartyNotices.txt',
				paths: {
					src: '/monaco-rcasm/release/dev',
					'npm/dev': 'node_modules/@paul80nd/monaco-rcasm/release/dev',
					'npm/min': 'node_modules/@paul80nd/monaco-rcasm/release/min',
					esm: 'node_modules/@paul80nd/monaco-rcasm/release/esm',
				}
			},
			{
				name: 'monaco-languages',
				contrib: 'vs/basic-languages/monaco.contribution',
				modulePrefix: 'vs/basic-languages',
				thirdPartyNotices: 'node_modules/@paul80nd/monaco-languages/ThirdPartyNotices.txt',
				paths: {
					src: '/monaco-languages/release/dev',
					'npm/dev': 'node_modules/@paul80nd/monaco-languages/release/dev',
					'npm/min': 'node_modules/@paul80nd/monaco-languages/release/min',
					esm: 'node_modules/@paul80nd/monaco-languages/release/esm',
				}
			}
		]
	}

	if (typeof exports !== 'undefined') {
		exports.METADATA = METADATA
	} else {
		self.METADATA = METADATA;
	}

})();
