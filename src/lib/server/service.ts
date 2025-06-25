import { gristClient, GristClient } from './grist';

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

export interface ServiceRepository {
	getServiceByStructureId(id: string): Promise<Service[]>;
}

export class ServiceRepositoryGrist implements ServiceRepository {
	constructor(readonly gristClient: GristClient) {}

	async getServiceByStructureId(structureId: string): Promise<Service[]> {
		const servicesFilter = encodeURIComponent(JSON.stringify({ Structure: [structureId] }));
		const servicesRes = await this.gristClient.requestGristTable(
			'GET',
			'Services',
			`records?filter=${servicesFilter}`
		);
		const services: Service[] =
			servicesRes.records?.map((record: { id: number; fields: Record<string, unknown> }) => ({
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
				link: ('https://dora.inclusion.beta.gouv.fr/services/' + record.fields['Slug']) as string
			})) || [];

		return services;
	}
}

export const serviceRepository = new ServiceRepositoryGrist(gristClient);
