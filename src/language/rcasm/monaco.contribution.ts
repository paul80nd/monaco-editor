import * as mode from './rcasmMode';
import { languages, Emitter, IEvent } from '../../fillers/monaco-editor-core';

export interface ModeConfiguration {
	/**
	 * Defines whether the built-in completionItemProvider is enabled.
	 */
	readonly completionItems?: boolean;

	/**
	 * Defines whether the built-in hoverProvider is enabled.
	 */
	readonly hovers?: boolean;

	/**
	 * Defines whether the built-in documentSymbolProvider is enabled.
	 */
	readonly documentSymbols?: boolean;

	/**
	 * Defines whether the built-in definitions provider is enabled.
	 */
	readonly definitions?: boolean;

	/**
	 * Defines whether the built-in references provider is enabled.
	 */
	readonly references?: boolean;

	/**
	 * Defines whether the built-in references provider is enabled.
	 */
	readonly documentHighlights?: boolean;

	/**
	 * Defines whether the built-in color provider is enabled.
	 */
	readonly colors?: boolean;

	/**
	 * Defines whether the built-in diagnostic provider is enabled.
	 */
	readonly diagnostics?: boolean;
}

export interface LanguageServiceDefaults {
	readonly languageId: string;
	readonly onDidChange: IEvent<LanguageServiceDefaults>;

	readonly modeConfiguration: ModeConfiguration;
	setModeConfiguration(modeConfiguration: ModeConfiguration): void;
}

// --- RCASM configuration and defaults ---------

class LanguageServiceDefaultsImpl implements LanguageServiceDefaults {
	private _onDidChange = new Emitter<LanguageServiceDefaults>();
	private _modeConfiguration!: ModeConfiguration;
	private _languageId: string;

	constructor(languageId: string, modeConfiguration: ModeConfiguration) {
		this._languageId = languageId;
		this.setModeConfiguration(modeConfiguration);
	}

	get onDidChange(): IEvent<LanguageServiceDefaults> {
		return this._onDidChange.event;
	}

	get languageId(): string {
		return this._languageId;
	}

	get modeConfiguration(): ModeConfiguration {
		return this._modeConfiguration;
	}

	setModeConfiguration(modeConfiguration: ModeConfiguration): void {
		this._modeConfiguration = modeConfiguration || Object.create(null);
		this._onDidChange.fire(this);
	}
}

const modeConfigurationDefault: Required<ModeConfiguration> = {
	completionItems: true,
	hovers: true,
	documentSymbols: true,
	definitions: true,
	references: true,
	documentHighlights: true,
	colors: true,
	diagnostics: true
};

export const rcasmDefaults: LanguageServiceDefaults = new LanguageServiceDefaultsImpl(
	'rcasm',
	modeConfigurationDefault
);

// export to the global based API
(<any>languages).rcasm = { rcasmDefaults };

// --- Registration to monaco editor ---

declare var AMD: any;
declare var require: any;

function getMode(): Promise<typeof mode> {
	if (AMD) {
		return new Promise((resolve, reject) => {
			require(['vs/language/rcasm/rcasmMode'], resolve, reject);
		});
	} else {
		return import('./rcasmMode');
	}
}

languages.onLanguage('rcasm', () => {
	getMode().then((mode) => mode.setupMode(rcasmDefaults));
});
