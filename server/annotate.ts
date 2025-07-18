import { AnnotatedTextPart, AnnotatedTextType } from "../interface/annotate";
import { convertToLegalCompanyName } from "../interface/company";
import { Borough, Company, DbContext, Property, Resident } from "./managed/database";

export class Annotator {
	static instance: Annotator;

	companies: Company[];
	residents: Resident[];
	boroughs: Borough[];
	properties: Property[];

	constructor(
		private database: DbContext
	) {
		if (Annotator.instance) {
			throw new Error('Annotator already created');
		}

		Annotator.instance = this;
	}

	async load() {
		this.companies = await this.database.company
			.toArray();

		this.residents = await this.database.resident
			.toArray();

		this.boroughs = await this.database.borough
			.toArray();

		this.properties = await this.database.property
			.where(property => property.name.length().valueOf() > 0)
			.toArray();

		setTimeout(() => this.load(), 1000 * 60 * 5);
	}

	static annotate(source: string) {
		let content: AnnotatedTextPart[] = [source];
		const referencedItems: { id: string }[] = [];

		content = this.annotateType(content, referencedItems, 'company', this.instance.companies, company => [
			convertToLegalCompanyName(company),
			company.name
		], company => `/company-office/company/${company.tag}`);

		content = this.annotateType(content, referencedItems, 'borough', this.instance.boroughs, borough => [
			borough.name
		], borough => `/borough/${borough.tag}`);

		content = this.annotateType(content, referencedItems, 'property', this.instance.properties, property => [
			property.name,
			property.id,
			property.id.split('-')[0]
		], property => `/property/${property.id}`);

		content = this.annotateType(content, referencedItems, 'resident', this.instance.residents, resident => [
			`${resident.givenName} ${resident.familyName}`,
			`${resident.familyName} ${resident.givenName}`
		], resident => `/resident/${resident.tag}`);

		// removes all empty texts
		content = content.filter(part => part.length);

		return {
			source,
			content,
			referencedItems,

			pack() {
				return JSON.stringify(content)
			}
		}
	}

	static annotateType<DataType>(
		source: AnnotatedTextPart[],
		referencedItems: any[],
		type: AnnotatedTextType,
		data: DataType[],
		labels: (item: DataType) => string[],
		linker: (item: DataType) => string
	) {
		const map = new Map<string, DataType>();

		for (let item of data) {
			for (let label of labels(item)) {
				map.set(label, item);
			}
		}

		for (let [label, item] of map) {
			const link = linker(item);
			const parts = [];

			for (let part of source) {
				if (typeof part == 'string') {
					parts.push(...this.annotateItem(part, type, item, label, link, referencedItems));
				} else {
					parts.push(part);
				}
			}

			source = parts;
		}

		return source;
	}

	static annotateItem<DataType>(source: string, type: AnnotatedTextType, item: DataType, label: string, link: string, referencedItems: any[]): AnnotatedTextPart[] {
		const parts = source.split(label);

		if (parts.length == 1) {
			return [source];
		}

		referencedItems.push(item);

		const flattened: AnnotatedTextPart[] = [
			parts[0]
		];

		for (let part of parts.slice(1)) {
			flattened.push(
				[type, label, link] as AnnotatedTextPart,
				part
			);
		}

		return flattened;
	}
}
