import { json } from '@sveltejs/kit';
import { structureRepository } from '$lib/server/structure.js';
import { ModuleName } from '$lib/module.js';
import type { RequestHandler } from './$types';

export const POST: RequestHandler = async ({ request, locals }) => {
	const user = locals.user;

	if (!user) {
		return json({ error: 'Non autorisé' }, { status: 401 });
	}

	const structureId = user.structureId;

	if (!structureId) {
		return json({ error: 'L’utilisateur n’est associé à aucune structure' }, { status: 400 });
	}

	try {
		const { moduleKey } = await request.json();

		if (!moduleKey) {
			return json({ error: 'Le nom du module est requis' }, { status: 400 });
		}

		// Vérifier que le moduleKey est valide
		const validModuleKeys = Object.values(ModuleName);
		if (!validModuleKeys.includes(moduleKey)) {
			return json({ error: 'Nom de module invalide' }, { status: 400 });
		}

		await structureRepository.activateModule(structureId, moduleKey);

		return json({ success: true, message: `Module ${moduleKey} activé avec succès` });
	} catch (error) {
		console.error('Erreur lors de l\'activation du module:', error);
		return json({ error: 'Erreur serveur lors de l\'activation du module' }, { status: 500 });
	}
};
