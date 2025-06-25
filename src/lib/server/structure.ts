import { GristClient } from './grist';

export class Structure {
	id?: string;
	name?: string;
	siret?: string;
	type?: string;
	created_at?: string;
	edited_at?: string;
	presentation?: string;
	address?: string;
	address_supplement?: string;
	city?: string;
	postal_code?: string;
	email?: string;
	phone?: string;
	website?: string;
}

export class Service {
  id?: string;
  name?: string;
  status?: string;
  perimeter?: string;
  lastUpdate?: Date;
  synchronized: boolean = false;
  link?: string;
  
  get isActive() {
    return this.status === 'PUBLIÉE';
  }
}

export interface StructureRepository {
	getServiceByStructureId(id: string): Promise<Service[]>;
}

export class StructureRepositoryGrist implements StructureRepository {
	constructor(readonly gristClient: GristClient) {}

	async getServiceByStructureId(id: string): Promise<Service[]> {
		const servicesFilter = encodeURIComponent(JSON.stringify({ Structure: [id] }));
		const servicesRes = await this.gristClient.requestGristTable(
			'GET',
			'Services',
			`records?filter=${servicesFilter}`
		);
		const services:Service[] = servicesRes.records?.map((record: { id: number; fields: Record<string, unknown> }) => ({
		id: String(record.id),
			name: (record.fields['Name'] as string) || '',
			status: (record.fields['Status'] as string) === 'PUBLISHED' ? 'PUBLIÉE' : 'BROUILLON',
			perimeter: 'France entière', // Default for now, could be from service data
			lastUpdate: new Date(
				(record.fields['Updated_at'] as string) ||
					(record.fields['Created_at'] as string) ||
					Date.now()
			),
			synchronized: false,
			link: 'https://dora.inclusion.beta.gouv.fr/services/' + record.fields['Slug'] as string
		})) || [];

		return services;
	}
}
