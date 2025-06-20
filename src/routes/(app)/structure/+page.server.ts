import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ parent }) => {
	// Les données jobs, services et stats sont maintenant chargées dans le layout
	const data = await parent();
	return data;
};
