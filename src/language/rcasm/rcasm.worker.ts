import * as worker from 'monaco-editor-core/esm/vs/editor/editor.worker';
import { RCASMWorker } from './rcasmWorker';

self.onmessage = () => {
	// ignore the first message
	worker.initialize((ctx, createData) => {
		return new RCASMWorker(ctx, createData);
	});
};
