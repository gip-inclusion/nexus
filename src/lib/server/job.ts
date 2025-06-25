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

	get isActive(): boolean {
		return this.status === 'OUVERT';
	}

	toJSON() {
		return {
			id: this.id,
			title: this.title,
			location: this.location,
			positions: this.positions,
			status: this.status,
			lastUpdate: this.lastUpdate?.toLocaleDateString('fr-FR'),
			description: this.description,
			requirements: this.requirements,
			isActive: this.isActive
		};
	}
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
			data.records?.map((record: { id: number; fields: Record<string, unknown> }) => {
				const job = new Job();

				job.id = String(record.id);
				job.title = (record.fields['Title'] as string) || '';
				job.location = record.fields['City'] as string;
				job.positions = record.fields['Positions']
					? parseInt(record.fields['Positions'] as string)
					: undefined;
				job.status = (record.fields['Status'] as string) === 'OPEN' ? 'OUVERT' : 'FERMÉ';
				job.lastUpdate = record.fields['Updated_at']
					? new Date(record.fields['Updated_at'] as string)
					: undefined;
				job.description = record.fields['Description'] as string;
				job.requirements = record.fields['Requirements'] as string;

				return job;
			}) || [];
		return jobs;
	}
}

export const jobRepository = new JobRepositoryGrist(gristClient);
