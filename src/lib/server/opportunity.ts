import { gristClient, GristClient } from './grist';

export class Opportunity {
	id?: string;
	title?: string;
	type?: string;
	city?: string;
	status?: string;

	get isActive() {
		return this.status === 'OUVERT';
	}

	toJSON() {
		return {
			id: this.id,
			title: this.title,
			type: this.type,
			city: this.city,
			status: this.status,
			isActive: this.isActive
		};
	}
}

export interface OpportunityRepository {
	listOpportunitiesByStructureId(structureId: string): Promise<Opportunity[]>;
}

export class OpportunityRepositoryGrist implements OpportunityRepository {
	constructor(readonly gristClient: GristClient) {}

	async listOpportunitiesByStructureId(structureId: string): Promise<Opportunity[]> {
		const filter = encodeURIComponent(JSON.stringify({ Structure: [structureId] }));
		const data = await this.gristClient.requestGristTable(
			'GET',
			'Opportunities',
			`records?filter=${filter}`
		);
		const opportunities: Opportunity[] =
			data.records?.map((record: { id: number; fields: Record<string, unknown> }) => {
				const opportunity = new Opportunity();

				opportunity.id = String(record.id);
				opportunity.title = (record.fields['Title'] as string) || '';
				opportunity.type = record.fields['Type'] as string;
				opportunity.city = record.fields['City'] as string;
				opportunity.status = (record.fields['Status'] as string) === 'OPEN' ? 'OUVERT' : 'FERMÉ';

				return opportunity;
			}) || [];
		return opportunities;
	}
}

export const opportunityRepository = new OpportunityRepositoryGrist(gristClient);
