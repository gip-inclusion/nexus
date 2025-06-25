import type { CommercialOpportunity } from '$lib/types/commercial-opportunity';
import { gristClient } from '$lib/server/grist.js';
import { jobRepository } from '$lib/server/job';
import { serviceRepository } from '$lib/server/service';

export async function load({ parent }) {
	const { user, structure } = await parent();
	const structureId = user.structureId;

	const jobs = (await jobRepository.listJobsByStructureId(structureId)).map(job => job.toJSON());
	const services = (await serviceRepository.listServicesByStructureId(structureId)).map(service => service.toJSON());

	// Récupérer les opportunités commerciales
	const opportunitiesFilter = encodeURIComponent(JSON.stringify({ Structure: [structureId] }));
	const opportunitiesRes = await gristClient.requestGristTable(
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
	const activeJobs = jobs.filter((job) => job.isActive).length;
	const inactiveJobs = jobs.filter((job) => !job.isActive).length;
	const activeServices = services.filter((service) => service.isActive).length;
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
