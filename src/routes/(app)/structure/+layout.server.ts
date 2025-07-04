import { jobRepository } from '$lib/server/job';
import { opportunityRepository } from '$lib/server/opportunity';
import { serviceRepository } from '$lib/server/service';

export async function load({ parent }) {
	const { user, structure } = await parent();
	const structureId = user.structureId;

	const jobs = (await jobRepository.listJobsByStructureId(structureId)).map((job) => job.toJSON());
	const services = (await serviceRepository.listServicesByStructureId(structureId)).map((service) =>
		service.toJSON()
	);
	const opportunities = (
		await opportunityRepository.listOpportunitiesByStructureId(structureId)
	).map((opportunity) => opportunity.toJSON());

	// Calculer les statistiques pour la vue d'ensemble
	const activeJobs = jobs.filter((job) => job.isActive).length;
	const inactiveJobs = jobs.filter((job) => !job.isActive).length;
	const activeServices = services.filter((service) => service.isActive).length;
	const activeOpportunities = opportunities.filter((service) => service.isActive).length;

	return {
		user,
		structure,
		jobs,
		services,
		opportunities,
		stats: {
			activeJobs,
			inactiveJobs,
			activeServices,
			activeOpportunities
		}
	};
}
