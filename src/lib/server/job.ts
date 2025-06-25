import { gristClient, type GristClient } from './grist';

export class Job {
	id?: string;
	title?: string;
	location?: string;
	positions?: number;
	status?: string;
	lastUpdate?: Date;
	description?: string;
	requirements?: string;
}

export interface JobRepository {
	listJobsByStructureId(structureId: string): Promise<Job[]>;
}

export class JobRepositoryGrist implements JobRepository {
	constructor(readonly gristClient: GristClient) {}

	async listJobsByStructureId(structureId: string): Promise<Job[]> {
		const filter = encodeURIComponent(JSON.stringify({ Structure: [structureId] }));
		const data = await this.gristClient.requestGristTable(
			'GET',
			'Jobs',
			`records?filter=${filter}`
		);
		const jobs: Job[] =
			data.records?.map((record: { id: number; fields: Record<string, unknown> }) => ({
				id: String(record.id),
				title: (record.fields['Title'] as string) || '',
				location: record.fields['City'] as string,
				positions: record.fields['Positions'] as string,
				status: (record.fields['Status'] as string) === 'OPEN' ? 'OUVERT' : 'FERMÉ',
				lastUpdate: record.fields['Updated_at'] ? new Date(record.fields['Updated_at'] as string) : undefined,
				description: record.fields['Description'] as string,
				requirements: record.fields['Requirements'] as string
			})) || [];
		return jobs;
	}
}

export const jobRepository = new JobRepositoryGrist(gristClient);