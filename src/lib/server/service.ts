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

	toJSON() {
		return {
			id: this.id,
			name: this.name,
			status: this.status,
			perimeter: this.perimeter,
			lastUpdate: this.lastUpdate?.toLocaleDateString('fr-FR'),
			synchronized: this.synchronized,
			link: this.link,
			isActive: this.isActive
		};
	}
}

export interface ServiceRepository {
	listServicesByStructureId(structureId: string): Promise<Service[]>;
}

export class ServiceRepositoryGrist implements ServiceRepository {
	constructor(readonly gristClient: GristClient) {}

	async listServicesByStructureId(structureId: string): Promise<Service[]> {
		const filter = encodeURIComponent(JSON.stringify({ Structure: [structureId] }));
		const data = await this.gristClient.requestGristTable(
			'GET',
			'Services',
			`records?filter=${filter}`
		);
		const services: Service[] =
			data.records?.map((record: { id: number; fields: Record<string, unknown> }) => {
				const service = new Service();
				service.id = String(record.id);
				service.name = (record.fields['Name'] as string) || '';
				service.status =
					(record.fields['Status'] as string) === 'PUBLISHED' ? 'PUBLIÉE' : 'BROUILLON';
				service.perimeter = 'France entière';
				service.lastUpdate = new Date(
					(record.fields['Updated_at'] as string) ||
						(record.fields['Created_at'] as string) ||
						Date.now()
				);
				service.synchronized = false;
				service.link = ('https://dora.inclusion.beta.gouv.fr/services/' +
					record.fields['Slug']) as string;
				return service;
			}) || [];

		return services;
	}
}

export const serviceRepository = new ServiceRepositoryGrist(gristClient);
