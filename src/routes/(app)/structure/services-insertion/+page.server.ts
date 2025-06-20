import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ parent }) => {
	const { services } = await parent();

	// Transform services data for the insertion services page
	const insertionServices = services.map((service: any) => ({
		id: service.id,
		name: service.name,
		status: service.status === 'active' ? 'PUBLIÉE' : 'BROUILLON',
		perimeter: 'France entière', // Default for now, could be from service data
		lastUpdated: service.lastUpdate || '0 jours',
		synchronized: true // Default for now, could be from service data
	}));

	// Add mock data if no services exist
	return {
		services: insertionServices
	};
};
