<script lang="ts">
	import type { Job } from '$lib/types/job';
	import type { Service } from '$lib/types/service';
	import type { Structure } from '$lib/server/structure';

	export let data: {
		jobs: Job[];
		services: Service[];
		stats: {
			activeJobs: number;
			inactiveJobs: number;
			activeServices: number;
		};
		user: {
			accountId: number;
			email: string;
			token: string;
			structureId?: string;
		};
		structure: Structure;
	};

	const jobs: Job[] = data.jobs;

	function toggleApplications() {
		// Logic to block/unblock applications
		console.log('Toggle applications');
	}

	function createNewJob() {
		// Logic to create new job posting
		console.log('Create new job');
	}

	function refreshJob(jobId: number) {
		// Logic to refresh job posting
		console.log('Refresh job:', jobId);
	}

	function deleteJob(jobId: number) {
		// Logic to delete job posting
		console.log('Delete job:', jobId);
	}
</script>

<div class="job-listings">
	<div class="header">
		<h1>Offres d'emplois</h1>
		<div class="header-actions">
			<button class="btn-secondary" on:click={toggleApplications}>
				<svg
					width="16"
					height="16"
					viewBox="0 0 24 24"
					fill="none"
					stroke="currentColor"
					stroke-width="2"
				>
					<rect x="3" y="11" width="18" height="10" rx="2" ry="2"></rect>
					<circle cx="12" cy="16" r="1"></circle>
					<path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
				</svg>
				Bloquer l'envoi de candidatures
			</button>
			<button class="btn-primary" on:click={createNewJob}>
				<svg
					width="16"
					height="16"
					viewBox="0 0 24 24"
					fill="none"
					stroke="currentColor"
					stroke-width="2"
				>
					<line x1="12" y1="5" x2="12" y2="19"></line>
					<line x1="5" y1="12" x2="19" y2="12"></line>
				</svg>
				Créer une nouvelle fiche de poste
			</button>
		</div>
	</div>

	<div class="table-container">
		<table class="jobs-table">
			<thead>
				<tr>
					<th>HEADER</th>
					<th>LOCALISATION</th>
					<th>NBRE DE POSTES</th>
					<th>STATUT</th>
					<th>DERNIÈRE MISE À JOUR</th>
					<th></th>
				</tr>
			</thead>
			<tbody>
				{#each jobs as job (job.id)}
					<tr>
						<td>
							<a href="/structure/offres-emplois/{job.id}" class="job-title">
								{job.title}
							</a>
						</td>
						<td>
							<div class="location">
								<svg
									width="16"
									height="16"
									viewBox="0 0 24 24"
									fill="none"
									stroke="currentColor"
									stroke-width="2"
								>
									<path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
									<circle cx="12" cy="10" r="3"></circle>
								</svg>
								{job.location}
							</div>
						</td>
						<td>{job.positions}</td>
						<td>
							<div class="status-toggle">
								<label class="toggle-switch">
									<input
										type="checkbox"
										checked={job.status === 'active'}
										on:change={() => (job.status = job.status === 'active' ? 'inactive' : 'active')}
									/>
									<span class="slider"></span>
								</label>
								<span class="status-text">
									{job.status === 'active' ? 'Ouvert' : 'Fermé'}
								</span>
							</div>
						</td>
						<td>{job.lastUpdate}</td>
						<td>
							<div class="actions">
								<button
									class="action-btn"
									on:click={() => refreshJob(job.id)}
									title="Actualiser"
									aria-label="Actualiser"
								>
									<svg
										width="16"
										height="16"
										viewBox="0 0 24 24"
										fill="none"
										stroke="currentColor"
										stroke-width="2"
									>
										<polyline points="1 4 1 10 7 10"></polyline>
										<polyline points="23 20 23 14 17 14"></polyline>
										<path d="M20.49 9A9 9 0 0 0 5.64 5.64L1 10m22 4l-4.64 4.36A9 9 0 0 1 3.51 15"
										></path>
									</svg>
								</button>
								<button
									class="action-btn delete"
									on:click={() => deleteJob(job.id)}
									title="Supprimer"
									aria-label="Supprimer"
								>
									<svg
										width="16"
										height="16"
										viewBox="0 0 24 24"
										fill="none"
										stroke="currentColor"
										stroke-width="2"
									>
										<polyline points="3,6 5,6 21,6"></polyline>
										<path
											d="M19,6V20a2,2,0,0,1-2,2H7a2,2,0,0,1-2-2V6M8,6V4a2,2,0,0,1,2-2h4a2,2,0,0,1,2,2V6"
										></path>
									</svg>
								</button>
							</div>
						</td>
					</tr>
				{/each}
			</tbody>
		</table>
	</div>
</div>

<style>
	.job-listings {
		padding: 2rem;
		max-width: 1400px;
		margin: 0 auto;
	}

	.header {
		display: flex;
		justify-content: space-between;
		align-items: center;
		margin-bottom: 2rem;
	}

	h1 {
		font-size: 2rem;
		font-weight: 600;
		color: #1a1a1a;
		margin: 0;
	}

	.header-actions {
		display: flex;
		gap: 1rem;
	}

	.btn-primary,
	.btn-secondary {
		display: flex;
		align-items: center;
		gap: 0.5rem;
		padding: 0.75rem 1.5rem;
		border-radius: 8px;
		font-weight: 500;
		font-size: 0.875rem;
		cursor: pointer;
		transition: all 0.2s ease;
		border: none;
	}

	.btn-primary {
		background-color: #1e1e9e;
		color: white;
	}

	.btn-primary:hover {
		background-color: #1a1a8a;
	}

	.btn-secondary {
		background-color: white;
		color: #374151;
		border: 1px solid #d1d5db;
	}

	.btn-secondary:hover {
		background-color: #f9fafb;
	}

	.table-container {
		background: white;
		border-radius: 12px;
		border: 1px solid #e5e7eb;
		overflow: hidden;
		box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.1);
	}

	.jobs-table {
		width: 100%;
		border-collapse: collapse;
	}

	.jobs-table th {
		background-color: #f9fafb;
		padding: 1rem;
		text-align: left;
		font-weight: 600;
		font-size: 0.75rem;
		text-transform: uppercase;
		letter-spacing: 0.05em;
		color: #6b7280;
		border-bottom: 1px solid #e5e7eb;
	}

	.jobs-table td {
		padding: 1rem;
		border-bottom: 1px solid #f3f4f6;
		vertical-align: middle;
	}

	.jobs-table tr:last-child td {
		border-bottom: none;
	}

	.job-title {
		color: #1e1e9e;
		text-decoration: none;
		font-weight: 500;
		font-size: 0.875rem;
	}

	.job-title:hover {
		text-decoration: underline;
	}

	.location {
		display: flex;
		align-items: center;
		gap: 0.5rem;
		color: #6b7280;
		font-size: 0.875rem;
	}

	.location svg {
		color: #9ca3af;
	}

	.status-toggle {
		display: flex;
		align-items: center;
		gap: 0.75rem;
	}

	.toggle-switch {
		position: relative;
		display: inline-block;
		width: 44px;
		height: 24px;
	}

	.toggle-switch input {
		opacity: 0;
		width: 0;
		height: 0;
	}

	.slider {
		position: absolute;
		cursor: pointer;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
		background-color: #ccc;
		transition: 0.2s;
		border-radius: 24px;
	}

	.slider:before {
		position: absolute;
		content: '';
		height: 18px;
		width: 18px;
		left: 3px;
		bottom: 3px;
		background-color: white;
		transition: 0.2s;
		border-radius: 50%;
	}

	input:checked + .slider {
		background-color: #1e1e9e;
	}

	input:checked + .slider:before {
		transform: translateX(20px);
	}

	.status-text {
		font-size: 0.875rem;
		font-weight: 500;
	}

	.actions {
		display: flex;
		gap: 0.5rem;
	}

	.action-btn {
		padding: 0.5rem;
		border: none;
		background: none;
		cursor: pointer;
		border-radius: 6px;
		color: #6b7280;
		transition: all 0.2s ease;
	}

	.action-btn:hover {
		background-color: #f3f4f6;
		color: #374151;
	}

	.action-btn.delete:hover {
		background-color: #fef2f2;
		color: #dc2626;
	}

	@media (max-width: 1024px) {
		.job-listings {
			padding: 1rem;
		}

		.header {
			flex-direction: column;
			align-items: stretch;
			gap: 1rem;
		}

		.header-actions {
			flex-direction: column;
		}

		.jobs-table {
			font-size: 0.75rem;
		}

		.jobs-table th,
		.jobs-table td {
			padding: 0.75rem 0.5rem;
		}
	}
</style>
