import { requestGristTable } from '$lib/server/grist';
import type { Job } from '$lib/types/job';
import type { CommercialOpportunity } from '$lib/types/commercial-opportunity';

export async function load({ parent }) {
	const { user, structure } = await parent();
	const structureId = user.structureId;

	// Récupérer les jobs (métiers en recherche d'emploi)
	const jobsFilter = encodeURIComponent(JSON.stringify({ Structure: [structureId] }));
	const jobsRes = await requestGristTable('GET', 'Jobs', `records?filter=${jobsFilter}`);
	const jobs: Job[] =
		jobsRes.records?.map((record: { id: number; fields: Record<string, unknown> }) => ({
			id: record.id,
			title: (record.fields['Title'] as string) || '',
			location: (record.fields['City'] as string) || '',
			positions: (record.fields['Positions'] as number) || 1,
			status: (record.fields['Status'] as string) === 'active' ? 'active' : 'inactive',
			lastUpdate: new Date(
				(record.fields['Updated_at'] as string) ||
					(record.fields['Created_at'] as string) ||
					Date.now()
			).toLocaleDateString('fr-FR'),
			description: record.fields['Description'] as string,
			requirements: record.fields['Requirements'] as string,
			createdAt: record.fields['Created_at'] as string
		})) || [];

	// Récupérer les services d'insertion
	const servicesFilter = encodeURIComponent(JSON.stringify({ Structure: [structureId] }));
	const servicesRes = await requestGristTable(
		'GET',
		'Services',
		`records?filter=${servicesFilter}`
	);
	const services =
		servicesRes.records?.map((record: { id: number; fields: Record<string, unknown> }) => ({
			id: record.id,
			name: (record.fields['Name'] as string) || '',
			status: (record.fields['Status'] as string) === 'published' ? 'PUBLIÉE' : 'BROUILLON',
			perimeter: 'France entière', // Default for now, could be from service data
			lastUpdate: new Date(
				(record.fields['Updated_at'] as string) ||
					(record.fields['Created_at'] as string) ||
					Date.now()
			).toLocaleDateString('fr-FR'),
			synchronized: true // Default for now, could be from service data
		})) || [];

	// Récupérer les opportunités commerciales
	const opportunitiesFilter = encodeURIComponent(JSON.stringify({ Structure: [structureId] }));
	const opportunitiesRes = await requestGristTable(
		'GET',
		'Opportunities',
		`records?filter=${opportunitiesFilter}`
	);
	const commercialOpportunities: CommercialOpportunity[] =
		opportunitiesRes.records?.map((record: { id: number; fields: Record<string, unknown> }) => ({
			id: record.id,
			title: (record.fields['Title'] as string) || '',
			type: ((record.fields['Type'] as string) === 'APPEL_OFFRES'
				? 'APPEL_OFFRES'
				: 'PROJET_ACHAT') as 'PROJET_ACHAT' | 'APPEL_OFFRES',
			status:
				(record.fields['Status'] as string) === 'active'
					? 'active'
					: (record.fields['Status'] as string) === 'closed'
						? 'closed'
						: 'pending',
			location: (record.fields['City'] as string) || '',
			deadline: record.fields['Deadline'] as string,
			lastUpdate: new Date(
				(record.fields['Updated_at'] as string) ||
					(record.fields['Created_at'] as string) ||
					Date.now()
			).toLocaleDateString('fr-FR'),
			description: record.fields['Description'] as string,
			requirements: record.fields['Requirements'] as string,
			createdAt: record.fields['Created_at'] as string
		})) || [];

	// Calculer les statistiques pour la vue d'ensemble
	const activeJobs = jobs.filter((job) => job.status === 'active').length;
	const inactiveJobs = jobs.filter((job) => job.status === 'inactive').length;
	const activeServices = services.filter(
		(service: { id: number; name: string; status: string }) => service.status === 'active'
	).length;
	const activeOpportunities = commercialOpportunities.filter(
		(opp) => opp.status === 'active'
	).length;

	return {
		user,
		structure,
		jobs,
		services,
		commercialOpportunities,
		stats: {
			activeJobs,
			inactiveJobs,
			activeServices,
			activeOpportunities
		}
	};
}
