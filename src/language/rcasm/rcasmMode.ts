import { WorkerManager } from './workerManager';
import type { RCASMWorker } from './rcasmWorker';
import { LanguageServiceDefaults } from './monaco.contribution';
import * as languageFeatures from '../common/lspLanguageFeatures';
import { Uri, IDisposable, languages } from '../../fillers/monaco-editor-core';

export function setupMode(defaults: LanguageServiceDefaults): IDisposable {
	const disposables: IDisposable[] = [];
	const providers: IDisposable[] = [];

	const client = new WorkerManager(defaults);
	disposables.push(client);

	const worker: languageFeatures.WorkerAccessor<RCASMWorker> = (
		...uris: Uri[]
	): Promise<RCASMWorker> => {
		return client.getLanguageServiceWorker(...uris);
	};

	function registerProviders(): void {
		const { languageId, modeConfiguration } = defaults;

		disposeAll(providers);

		if (modeConfiguration.completionItems) {
			providers.push(
				languages.registerCompletionItemProvider(
					languageId,
					new languageFeatures.CompletionAdapter(worker, ['/', '-', ':'])
				)
			);
		}
		if (modeConfiguration.hovers) {
			providers.push(
				languages.registerHoverProvider(languageId, new languageFeatures.HoverAdapter(worker))
			);
		}
		if (modeConfiguration.documentHighlights) {
			providers.push(
				languages.registerDocumentHighlightProvider(
					languageId,
					new languageFeatures.DocumentHighlightAdapter(worker)
				)
			);
		}
		if (modeConfiguration.definitions) {
			providers.push(
				languages.registerDefinitionProvider(
					languageId,
					new languageFeatures.DefinitionAdapter(worker)
				)
			);
		}
		if (modeConfiguration.references) {
			providers.push(
				languages.registerReferenceProvider(
					languageId,
					new languageFeatures.ReferenceAdapter(worker)
				)
			);
		}
		if (modeConfiguration.documentSymbols) {
			providers.push(
				languages.registerDocumentSymbolProvider(
					languageId,
					new languageFeatures.DocumentSymbolAdapter(worker)
				)
			);
		}
		if (modeConfiguration.diagnostics) {
			providers.push(
				new languageFeatures.DiagnosticsAdapter(languageId, worker, defaults.onDidChange)
			);
		}
	}

	registerProviders();

	disposables.push(asDisposable(providers));

	return asDisposable(disposables);
}

function asDisposable(disposables: IDisposable[]): IDisposable {
	return { dispose: () => disposeAll(disposables) };
}

function disposeAll(disposables: IDisposable[]) {
	while (disposables.length) {
		disposables.pop()!.dispose();
	}
}

export { WorkerManager } from './workerManager';
export * from '../common/lspLanguageFeatures';
