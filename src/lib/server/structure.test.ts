import { describe, it, expect, vi } from 'vitest';
import { Structure, StructureRepositoryGrist } from './structure';
import { ModuleName } from '../module';

type GristClient = {
	requestGristTable(method: string, table: string, path: string, body?: unknown): Promise<any>;
};

describe('StructureRepositoryGrist', () => {
	describe('#getStructureById', () => {
		it('should call Grist API', async () => {
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

		it('should return the matching Structure', async () => {
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
			structure.modules = [ModuleName.Dora, ModuleName.Emplois];

			const expected: Structure = structure;
			expect(actual).toEqual(expected);
		});
	});

	describe('#activateModule', () => {
		it('should call Grist API', async () => {
			// given
			const requestGristTable = vi
				.fn()
				.mockResolvedValueOnce({
					records: [
						{
							id: 30,
							fields: {
								Siret: '13003013300016',
								Name: "Plateforme de l'inclusion",
								Modules: ['L', 'Emplois'],
								Created_at: 1749809507.238031,
								Presentation: 'Une structure test',
								Edited_at: 1749809507.238031,
								Address: '6 Boulevard Saint-Denis',
								City: 'Paris',
								Postal_code: '75010',
								Email: 'contact@inclusion.gouv.fr',
								Website: 'https://inclusion.beta.gouv.fr/',
								Phone: '',
								Address_supplement: null
							}
						}
					]
				})
				.mockResolvedValueOnce({
					records: [
						{
							id: 30
						}
					]
				});
			const gristClient: GristClient = {
				requestGristTable
			};
			const repository = new StructureRepositoryGrist(gristClient);
			const structureId = '30';
			const moduleName = ModuleName.Dora;

			// when
			await repository.activateModule(structureId, moduleName);

			// then
			expect(requestGristTable).toHaveBeenCalledTimes(2);
			expect(requestGristTable).toHaveBeenNthCalledWith(
				1,
				'GET',
				'Structures',
				'records?filter=%7B%22id%22%3A%5B%2230%22%5D%7D'
			);
			expect(requestGristTable).toHaveBeenNthCalledWith(2, 'PATCH', 'Structures', 'records', {
				records: [
					{
						id: 30,
						fields: {
							Modules: ['L', 'Emplois', 'DORA']
						}
					}
				]
			});
		});

		it('should not duplicate module when already active', async () => {
			// given
			const requestGristTable = vi.fn().mockResolvedValueOnce({
				records: [
					{
						id: 30,
						fields: {
							Siret: '13003013300016',
							Name: "Plateforme de l'inclusion",
							Modules: ['L', 'DORA', 'Emplois'],
							Created_at: 1749809507.238031,
							Presentation: 'Une structure test',
							Edited_at: 1749809507.238031,
							Address: '6 Boulevard Saint-Denis',
							City: 'Paris',
							Postal_code: '75010',
							Email: 'contact@inclusion.gouv.fr',
							Website: 'https://inclusion.beta.gouv.fr/',
							Phone: '',
							Address_supplement: null
						}
					}
				]
			});
			const gristClient: GristClient = {
				requestGristTable
			};
			const repository = new StructureRepositoryGrist(gristClient);
			const structureId = '30';
			const moduleName = ModuleName.Dora;

			// when
			await repository.activateModule(structureId, moduleName);

			// then
			expect(requestGristTable).toHaveBeenCalledTimes(1);
			expect(requestGristTable).toHaveBeenCalledWith(
				'GET',
				'Structures',
				'records?filter=%7B%22id%22%3A%5B%2230%22%5D%7D'
			);
		});

		it('should throw error when structure does not exist', async () => {
			// given
			const requestGristTable = vi.fn().mockResolvedValueOnce({
				records: []
			});
			const gristClient: GristClient = {
				requestGristTable
			};
			const repository = new StructureRepositoryGrist(gristClient);
			const structureId = '999';
			const moduleName = ModuleName.Dora;

			// when & then
			await expect(repository.activateModule(structureId, moduleName)).rejects.toThrow();
		});
	});
});
