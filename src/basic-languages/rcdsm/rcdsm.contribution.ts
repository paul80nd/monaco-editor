import { registerLanguage } from '../_.contribution';

declare var AMD: any;
declare var require: any;

registerLanguage({
	id: 'rcdsm',
	extensions: ['.rcdsm'],
	aliases: ['RCDSM'],
	mimetypes: ['text/x-rcdsm', 'text/rcdsm', 'text/plaintext'],
	loader: () => import('./rcdsm')
});
