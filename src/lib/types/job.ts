export interface Job {
	id: number;
	title: string;
	location: string;
	positions: number;
	status: JobStatus;
	lastUpdate: string;
	description?: string;
	requirements?: string;
	createdAt?: string;
}

export type JobStatus = 'active' | 'inactive';
export type JobAction = 'refresh' | 'delete' | 'edit';

export interface JobsResponse {
	jobs: Job[];
	total: number;
}

export interface JobTableProps {
	jobs: Job[];
	onAction: (action: JobAction, jobId: number) => void;
}

export type JobActionEvent = CustomEvent<{ action: JobAction; jobId: number }>;
