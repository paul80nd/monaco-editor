// Inspired by: https://github.com/microsoft/monaco-languages/blob/master/src/mips/mips.ts

import type { languages } from '../../fillers/monaco-editor-core';

export const conf: languages.LanguageConfiguration = {
	comments: {
		lineComment: ';'
	}
};

export const language = <languages.IMonarchLanguage>{
	defaultToken: '',
	ignoreCase: true,
	tokenPostfix: '.rcasm',

	keywords: [
		'add',
		'inc',
		'and',
		'orr',
		'eor',
		'not',
		'rol',
		'cmp',
		'mov',
		'clr',
		'ldi',
		'lds',
		'ldr',
		'str',
		'ixy',
		'hlt',
		'hlr',
		'opc',
		'jmp',
		'jsr',
		'rts',
		'bne',
		'beq',
		'bcs',
		'bmi',
		'blt',
		'ble',
		'org',
		'dfb',
		'dfw'
	],

	registers: ['a', 'b', 'c', 'd', 'j', 'j1', 'j2', 'm', 'm1', 'm2', 'x', 'y', 'xy'],

	symbols: /[\.,\:]+/,

	// The main tokenizer for our languages
	tokenizer: {
		root: [
			// identifiers and keywords
			[
				/[.a-zA-Z_]\w*/,
				{
					cases: {
						this: 'variable.predefined',
						'@keywords': { token: 'keyword.$0' },
						'@registers': 'type.register',
						'@default': ''
					}
				}
			],

			// whitespace
			[/[ \t\r\n]+/, ''],

			// Comments
			[/;.*$/, 'comment'],

			// delimiters
			[/@symbols/, 'delimiter'],

			// numbers
			[/0[xX][0-9a-fA-F]+/, 'number.hex'],
			[/[0-1]+b/, 'number.binary'],
			[/[+-]?[0-9]+d?/, 'number'],

			// strings
			[/"([^"\\]|\\.)*$/, 'string.invalid'], // non-teminated string
			[/"/, { token: 'string.quote', bracket: '@open', next: '@string' }]
		],
		string: [
			[/[^\\"]+/, 'string'],
			[/"/, { token: 'string.quote', bracket: '@close', next: '@pop' }]
		]
	}
};
