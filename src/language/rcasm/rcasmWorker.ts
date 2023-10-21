import type { worker } from '../../fillers/monaco-editor-core';
import * as rcasmService from '@paul80nd/rcasm-languageservice';

export class RCASMWorker {
	// --- model sync -----------------------

	private _ctx: worker.IWorkerContext;
	private _languageService: rcasmService.LanguageService;
	private _languageId: string;

	constructor(ctx: worker.IWorkerContext, createData: ICreateData) {
		this._ctx = ctx;
		this._languageId = createData.languageId;
		this._languageService = rcasmService.getLanguageService({});
	}

	// --- language service host ---------------

	async doValidation(uri: string): Promise<rcasmService.Diagnostic[]> {
		const document = this._getTextDocument(uri);
		if (document) {
			const diagnostics = this._languageService.doValidation(document);
			return Promise.resolve(diagnostics);
		}
		return Promise.resolve([]);
	}
	async doComplete(
		uri: string,
		position: rcasmService.Position
	): Promise<rcasmService.CompletionList | null> {
		const document = this._getTextDocument(uri);
		if (!document) {
			return null;
		}
		const program = this._languageService.parseProgram(document);
		const completions = this._languageService.doComplete(document, position, program);
		return Promise.resolve(completions);
	}
	async doHover(uri: string, position: rcasmService.Position): Promise<rcasmService.Hover | null> {
		const document = this._getTextDocument(uri);
		if (!document) {
			return null;
		}
		const program = this._languageService.parseProgram(document);
		const hover = this._languageService.doHover(document, position, program);
		return Promise.resolve(hover);
	}
	async findDefinition(
		uri: string,
		position: rcasmService.Position
	): Promise<rcasmService.Location | null> {
		const document = this._getTextDocument(uri);
		if (!document) {
			return null;
		}
		const program = this._languageService.parseProgram(document);
		const definition = this._languageService.findDefinition(document, position, program);
		return Promise.resolve(definition);
	}
	async findReferences(
		uri: string,
		position: rcasmService.Position
	): Promise<rcasmService.Location[]> {
		const document = this._getTextDocument(uri);
		if (!document) {
			return [];
		}
		const program = this._languageService.parseProgram(document);
		const references = this._languageService.findReferences(document, position, program);
		return Promise.resolve(references);
	}
	async findDocumentHighlights(
		uri: string,
		position: rcasmService.Position
	): Promise<rcasmService.DocumentHighlight[]> {
		const document = this._getTextDocument(uri);
		if (!document) {
			return [];
		}
		const program = this._languageService.parseProgram(document);
		const highlights = this._languageService.findDocumentHighlights(document, position, program);
		return Promise.resolve(highlights);
	}
	async findDocumentSymbols(uri: string): Promise<rcasmService.SymbolInformation[]> {
		const document = this._getTextDocument(uri);
		if (!document) {
			return [];
		}
		const program = this._languageService.parseProgram(document);
		const symbols = this._languageService.findDocumentSymbols(document, program);
		return Promise.resolve(symbols);
	}
	private _getTextDocument(uri: string): rcasmService.TextDocument | null {
		const models = this._ctx.getMirrorModels();
		for (const model of models) {
			if (model.uri.toString() === uri) {
				return rcasmService.TextDocument.create(
					uri,
					this._languageId,
					model.version,
					model.getValue()
				);
			}
		}
		return null;
	}
}

export interface ICreateData {
	languageId: string;
}

export function create(ctx: worker.IWorkerContext, createData: ICreateData): RCASMWorker {
	return new RCASMWorker(ctx, createData);
}
