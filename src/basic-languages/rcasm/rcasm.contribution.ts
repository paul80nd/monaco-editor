import { registerLanguage } from '../_.contribution';

declare var AMD: any;
declare var require: any;

registerLanguage({
	id: 'rcasm',
	extensions: ['.rcasm'],
	aliases: ['RCASM'],
	mimetypes: ['text/x-rcasm', 'text/rcasm', 'text/plaintext'],
	loader: () => {
		if (AMD) {
			return new Promise((resolve, reject) => {
				require(['vs/basic-languages/rcasm/rcasm'], resolve, reject);
			});
		} else {
			return import('./rcasm');
		}
	}
});
