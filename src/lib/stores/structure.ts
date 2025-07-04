import { writable } from 'svelte/store';
import type { Structure } from '$lib/server/structure';

export interface StructureStore {
	structure: Structure | null;
	isLoading: boolean;
	error: string | null;
}

const initialState: StructureStore = {
	structure: null,
	isLoading: false,
	error: null
};

function createStructureStore() {
	const { subscribe, set, update } = writable<StructureStore>(initialState);

	return {
		subscribe,

		// Initialiser avec les données du serveur
		init: (structure: Structure) => {
			set({ structure, isLoading: false, error: null });
		},

		// Recharger les données de structure
		reload: async () => {
			update(state => ({ ...state, isLoading: true, error: null }));

			try {
				const response = await fetch('/api/structures');

				if (!response.ok) {
					const error = await response.json();
					throw new Error(error.error || 'Erreur lors du rechargement');
				}

				const { structure } = await response.json();
				set({ structure, isLoading: false, error: null });

				return structure;
			} catch (error) {
				const errorMessage = error instanceof Error ? error.message : 'Erreur inconnue';
				update(state => ({ ...state, isLoading: false, error: errorMessage }));
				throw error;
			}
		},

		// Activer un module
		activateModule: async (moduleKey: string) => {
			update(state => ({ ...state, isLoading: true, error: null }));

			try {
				const response = await fetch('/api/structures/modules', {
					method: 'POST',
					headers: {
						'Content-Type': 'application/json'
					},
					body: JSON.stringify({ moduleKey })
				});

				if (!response.ok) {
					const error = await response.json();
					throw new Error(error.error || "Erreur lors de l'activation du module");
				}

				// Recharger les données après activation
				await structureStore.reload();

				return true;
			} catch (error) {
				const errorMessage = error instanceof Error ? error.message : 'Erreur inconnue';
				update(state => ({ ...state, isLoading: false, error: errorMessage }));
				throw error;
			}
		},

		// Réinitialiser le store
		reset: () => {
			set(initialState);
		}
	};
}

export const structureStore = createStructureStore();
