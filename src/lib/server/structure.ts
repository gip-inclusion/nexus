import { gristClient, type GristClient } from './grist';

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
}

export interface StructureRepository {
	getStructureById(structureId: string): Promise<Structure>;
}

export class StructureRepositoryGrist implements StructureRepository {
	constructor(readonly gristClient: GristClient) {}

	async getStructureById(structureId: string): Promise<Structure> {
		const filter = encodeURIComponent(JSON.stringify({ Structure: [structureId] }));
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
		structure.created_at = record.fields['Created_at'] ? new Date(record.fields['Created_at'] as string) : undefined;
		structure.edited_at = record.fields['Edited_at'] ? new Date(record.fields['Created_at'] as string) : undefined;
		structure.presentation = (record.fields['Presentation'] as string) || undefined;
		structure.address = (record.fields['Address'] as string) || undefined;
		structure.address_supplement = (record.fields['Address_supplement'] as string) || undefined;
		structure.city = (record.fields['City'] as string) || undefined;
		structure.postal_code = (record.fields['Postal_code'] as string) || undefined;
		structure.email = (record.fields['Email'] as string) || undefined;
		structure.phone = (record.fields['Phone'] as string) || undefined;
		structure.website = (record.fields['Website'] as string) || undefined;

		return structure;
	}
}

export const structureRepositoryGrist = new StructureRepositoryGrist(gristClient);
