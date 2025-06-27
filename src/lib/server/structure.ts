import { gristClient, type GristClient } from './grist';
import { ModuleName } from '../module';

export class Structure {
	id?: string;
	name?: string;
	siret?: string;
	type?: string;
	created_at?: Date;
	edited_at?: Date;
	presentation?: string;
	address?: string;
	address_supplement?: string;
	city?: string;
	postal_code?: string;
	email?: string;
	phone?: string;
	website?: string;
	modules: ModuleName[] = [];

	toJSON() {
		return {
			id: this.id,
			name: this.name,
			siret: this.siret,
			type: this.type,
			created_at: this.created_at?.toLocaleDateString('fr-FR'),
			edited_at: this.edited_at?.toLocaleDateString('fr-FR'),
			presentation: this.presentation,
			address: this.address,
			address_supplement: this.address_supplement,
			city: this.city,
			postal_code: this.postal_code,
			email: this.email,
			phone: this.phone,
			website: this.website,
			modules: this.modules
		};
	}
}

export interface StructureRepository {
	getStructureById(structureId: string): Promise<Structure>;
}

export class StructureRepositoryGrist implements StructureRepository {
	constructor(readonly gristClient: GristClient) {}

	async getStructureById(structureId: string): Promise<Structure> {
		const filter = encodeURIComponent(JSON.stringify({ id: [structureId] }));
		const data = await this.gristClient.requestGristTable(
			'GET',
			'Structures',
			`records?filter=${filter}`
		);
		const record: { id: number; fields: Record<string, unknown> } = data.records?.[0];

		const structure = new Structure();
		structure.id = String(record.id);
		structure.name = record.fields['Name'] as string;
		structure.siret = record.fields['Siret'] as string;
		structure.created_at = record.fields['Created_at']
			? new Date(record.fields['Created_at'] as string)
			: undefined;
		structure.edited_at = record.fields['Edited_at']
			? new Date(record.fields['Created_at'] as string)
			: undefined;
		structure.presentation = (record.fields['Presentation'] as string) || undefined;
		structure.address = (record.fields['Address'] as string) || undefined;
		structure.address_supplement = (record.fields['Address_supplement'] as string) || undefined;
		structure.city = (record.fields['City'] as string) || undefined;
		structure.postal_code = (record.fields['Postal_code'] as string) || undefined;
		structure.email = (record.fields['Email'] as string) || undefined;
		structure.phone = (record.fields['Phone'] as string) || undefined;
		structure.website = (record.fields['Website'] as string) || undefined;

		if (record.fields['Modules'] && (record.fields['Modules'] as Array<string>)[0] === 'L') {
			const modulesData = record.fields['Modules'] as Array<string>;
			modulesData.shift();
			structure.modules = modulesData.reduce((acc: ModuleName[], moduleString: string) => {
				const moduleNameKey = Object.keys(ModuleName).find(
					(key) => ModuleName[key as keyof typeof ModuleName] === moduleString
				);

				if (moduleNameKey) {
					acc.push(ModuleName[moduleNameKey as keyof typeof ModuleName]);
				} else {
					console.warn(`Invalid ModuleName string encountered: ${moduleString}`);
				}
				return acc;
			}, []);
		}

		return structure;
	}
}

export const structureRepositoryGrist = new StructureRepositoryGrist(gristClient);
