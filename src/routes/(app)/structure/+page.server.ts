import { requestGristTable } from '$lib/server/grist';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ parent }) => {
	const { user } = await parent();
	const structureId = user.structureId;

	// Récupérer les jobs (métiers en recherche d'emploi)
	const jobsFilter = encodeURIComponent(JSON.stringify({ Structure: [structureId] }));
	const jobsRes = await requestGristTable('GET', 'Jobs', `records?filter=${jobsFilter}`);
	const jobs =
		jobsRes.records?.map((record: any) => ({
			id: record.id,
			title: record.fields['Title'],
			status: record.fields['Status'],
		})) || [];

	// Récupérer les services d'insertion
	const servicesFilter = encodeURIComponent(JSON.stringify({ Structure: [structureId] }));
	const servicesRes = await requestGristTable(
		'GET',
		'Services',
		`records?filter=${servicesFilter}`
	);
	const services =
		servicesRes.records?.map((record: any) => ({
			id: record.id,
			name: record.fields['Name'],
			status: record.fields['Status'],
		})) || [];

	// Calculer les statistiques pour la vue d'ensemble
	const activeJobs = jobs.filter((job) => job.status === 'active').length;
	const inactiveJobs = jobs.filter((job) => job.status === 'inactive').length;
	const activeServices = services.filter((service) => service.status === 'active').length;

	return {
		jobs,
		services,
		stats: {
			activeJobs,
			inactiveJobs,
			activeServices,
		}
	};
};
