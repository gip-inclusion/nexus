import { describe, it, expect, vi } from 'vitest';
import type { GristClient } from './grist';
import { Structure, StructureRepositoryGrist } from './structure';
import { ModuleName } from './module';

describe('StructureRepositoryGrist', () => {
	it('#getStructureById should call Grist API', async () => {
		// given
		const requestGristTable = vi.fn(() =>
			Promise.resolve({
				records: [
					{
						id: 30,
						fields: {
							Siret: '13003013300016',
							Name: "Plateforme de l'inclusion",
							Memberships: ['L', 32, 38, 41],
							Modules: ['L', 'DORA', 'Emplois'],
							Created_at: 1749809507.238031,
							Presentation:
								'**La Plateforme de l’inclusion** est un Groupement d’Intérêt Public créé par arrêté en avril 2022. Elle développe de nouveaux services publics pour faciliter la vie des personnes en insertion et de celles et ceux qui les accompagnent.',
							Edited_at: 1749809507.238031,
							Address: '6 Boulevard Saint-Denis',
							City: 'Paris',
							Postal_code: '75010',
							Email: 'contact@inclusion.gouv.fr',
							Website: 'https://inclusion.beta.gouv.fr/',
							Jobs: ['L', 1, 2, 3, 4, 5, 6, 7],
							Applications: null,
							Services: ['L', 1, 2],
							Phone: '',
							DORA_slug: 'plateforme-de-linclu',
							Address_supplement: null,
							IF_agencyId: null
						}
					}
				]
			})
		);
		const gristClient: GristClient = {
			requestGristTable
		};
		const repository = new StructureRepositoryGrist(gristClient);
		const structureId = 'structure_id';

		// when
		await repository.getStructureById(structureId);

		// then
		expect(requestGristTable).toHaveBeenCalledWith(
			'GET',
			'Structures',
			'records?filter=%7B%22id%22%3A%5B%22structure_id%22%5D%7D'
		);
	});

	it('#getStructureById should return the matching Structure', async () => {
		// given
		const requestGristTable = vi.fn(() =>
			Promise.resolve({
				records: [
					{
						id: 30,
						fields: {
							Siret: '13003013300016',
							Name: 'Plateforme de l’inclusion',
							Memberships: ['L', 32, 38, 41],
							Modules: ['L', 'DORA', 'Emplois'],
							Created_at: 1749809507.238031,
							Presentation:
								'**La Plateforme de l’inclusion** est un Groupement d’Intérêt Public créé par arrêté en avril 2022. Elle développe de nouveaux services publics pour faciliter la vie des personnes en insertion et de celles et ceux qui les accompagnent.',
							Edited_at: 1749809507.238031,
							Address: '6 Boulevard Saint-Denis',
							City: 'Paris',
							Postal_code: '75010',
							Email: 'contact@inclusion.gouv.fr',
							Website: 'https://inclusion.beta.gouv.fr/',
							Jobs: ['L', 1, 2, 3, 4, 5, 6, 7],
							Applications: null,
							Services: ['L', 1, 2],
							Phone: '',
							DORA_slug: 'plateforme-de-linclu',
							Address_supplement: null,
							IF_agencyId: null
						}
					}
				]
			})
		);
		const gristClient: GristClient = {
			requestGristTable
		};
		const repository = new StructureRepositoryGrist(gristClient);
		const structureId = 'structure_id';

		// when
		const actual: Structure = await repository.getStructureById(structureId);

		// then
		const structure = new Structure();
		structure.id = '30';
		structure.name = 'Plateforme de l’inclusion';
		structure.siret = '13003013300016';
		structure.created_at = new Date(1749809507.238031);
		structure.edited_at = new Date(1749809507.238031);
		structure.presentation =
			'**La Plateforme de l’inclusion** est un Groupement d’Intérêt Public créé par arrêté en avril 2022. Elle développe de nouveaux services publics pour faciliter la vie des personnes en insertion et de celles et ceux qui les accompagnent.';
		structure.address = '6 Boulevard Saint-Denis';
		structure.address_supplement = undefined;
		structure.city = 'Paris';
		structure.postal_code = '75010';
		structure.email = 'contact@inclusion.gouv.fr';
		structure.phone = undefined;
		structure.website = 'https://inclusion.beta.gouv.fr/';
		structure.modules = [ModuleName.Dora, ModuleName.Emplois]

		const expected: Structure = structure;
		expect(actual).toEqual(expected);
	});
});
