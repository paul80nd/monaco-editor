/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/

import { testTokenization } from '../test/testRunner';

testTokenization('rcasm', [
	// Comments
	[
		{
			line: ';',
			tokens: [{ startIndex: 0, type: 'comment.rcasm' }]
		}
	],

	[
		{
			line: '    ; a comment',
			tokens: [
				{ startIndex: 0, type: '' },
				{ startIndex: 4, type: 'comment.rcasm' }
			]
		}
	],

	[
		{
			line: '; a comment',
			tokens: [{ startIndex: 0, type: 'comment.rcasm' }]
		}
	],

	[
		{
			line: ';sticky comment',
			tokens: [{ startIndex: 0, type: 'comment.rcasm' }]
		}
	],

	[
		{
			line: 'mov a,b ; my comment ; is a nice one',
			tokens: [
				{ startIndex: 0, type: 'keyword.mov.rcasm' },
				{ startIndex: 3, type: '' },
				{ startIndex: 4, type: 'type.register.rcasm' },
				{ startIndex: 5, type: 'delimiter.rcasm' },
				{ startIndex: 6, type: 'type.register.rcasm' },
				{ startIndex: 7, type: '' },
				{ startIndex: 8, type: 'comment.rcasm' }
			]
		}
	],

	// Keywords
	[
		{
			line: 'ldi a,-5',
			tokens: [
				{ startIndex: 0, type: 'keyword.ldi.rcasm' },
				{ startIndex: 3, type: '' },
				{ startIndex: 4, type: 'type.register.rcasm' },
				{ startIndex: 5, type: 'delimiter.rcasm' },
				{ startIndex: 6, type: 'number.rcasm' }
			]
		}
	],

	[
		{
			line: '    add    ',
			tokens: [
				{ startIndex: 0, type: '' },
				{ startIndex: 4, type: 'keyword.add.rcasm' },
				{ startIndex: 7, type: '' }
			]
		}
	],

	// Numbers
	[
		{
			line: '0',
			tokens: [{ startIndex: 0, type: 'number.rcasm' }]
		}
	],

	[
		{
			line: ' 0',
			tokens: [
				{ startIndex: 0, type: '' },
				{ startIndex: 1, type: 'number.rcasm' }
			]
		}
	],

	[
		{
			line: ' 0 ',
			tokens: [
				{ startIndex: 0, type: '' },
				{ startIndex: 1, type: 'number.rcasm' },
				{ startIndex: 2, type: '' }
			]
		}
	],

	[
		{
			line: '0 ',
			tokens: [
				{ startIndex: 0, type: 'number.rcasm' },
				{ startIndex: 1, type: '' }
			]
		}
	],

	[
		{
			line: '0b11010',
			tokens: [{ startIndex: 0, type: 'number.binary.rcasm' }]
		}
	],

	[
		{
			line: '01239',
			tokens: [{ startIndex: 0, type: 'number.rcasm' }]
		}
	],

	[
		{
			line: '0x123',
			tokens: [{ startIndex: 0, type: 'number.hex.rcasm' }]
		}
	],

	[
		{
			line: '1,2,3',
			tokens: [
				{ startIndex: 0, type: 'number.rcasm' },
				{ startIndex: 1, type: 'delimiter.rcasm' },
				{ startIndex: 2, type: 'number.rcasm' },
				{ startIndex: 3, type: 'delimiter.rcasm' },
				{ startIndex: 4, type: 'number.rcasm' }
			]
		}
	]
]);
