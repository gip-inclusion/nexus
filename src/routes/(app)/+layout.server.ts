import { structureRepository } from '$lib/server/structure.js';
import { redirect } from '@sveltejs/kit';

export async function load({ locals }) {
	const user = locals.user;

	if (!user) throw redirect(303, '/login');

	const structureId = user.structureId;

	if (!structureId) {
		throw new Error('L’utilisateur n’est associé à aucune structure');
	}

	const structure = await structureRepository.getStructureById(structureId);
	if (!structure) {
	  throw new Error('La structure associée à l’utilisateur n’a pas été trouvée');
	}

	return {
		user,
		structure: structure.toJSON(),
	};
}
