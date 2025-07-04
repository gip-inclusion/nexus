import { structureRepositoryGrist } from '$lib/server/structure.js';
import { redirect } from '@sveltejs/kit';

export async function load({ locals }) {
	const user = locals.user;

	if (!user) throw redirect(303, '/login');

	const structureId = user.structureId;

	if (!structureId) {
		throw new Error('L’utilisateur n’est associé à aucune structure');
	}
	
	depends('structure:data');

	const structure = await structureRepositoryGrist.getStructureById(structureId);
	if (!structure) {
	  throw new Error('La structure associée à l’utilisateur n’a pas été trouvée');
	}
	
	return {
		user,
		structure: structure.toJSON(),
	};
}
function depends(arg0: string) {
    throw new Error('Function not implemented.');
}

