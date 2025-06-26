import { describe, it, expect, vi } from 'vitest';
import type { GristClient } from './grist';
import { Module, ModuleRepositoryGrist } from './module';

describe('ModuleReposirotyGrist', () => {
	it('listModules should call Grist API', async () => {
		// given
		const requestGristTable = vi.fn(() =>
			Promise.resolve({
				records: [
					{
						id: 1,
						fields: {
							App: 'DORA',
							Title: 'Services d’insertion',
							Baseline: 'Donnez de la visibilité à votre offre de services',
							Logo: '',
							Website: 'https://dora.inclusion.beta.gouv.fr/'
						}
					}
				]
			})
		);
		const gristClient: GristClient = {
			requestGristTable
		};
		const repository = new ModuleRepositoryGrist(gristClient);

		// when
		await repository.listModules();

		// then
		expect(requestGristTable).toHaveBeenCalledWith('GET', 'Modules', 'records');
	});

	it('listModules should return all the Modules', async () => {
		// given
		const requestGristTable = vi.fn(() =>
			Promise.resolve({
				records: [
					{
						id: 1,
						fields: {
							App: 'DORA',
							Title: 'Services d’insertion',
							Baseline: 'Donnez de la visibilité à votre offre de services',
							Logo: 'https://image.url',
							Website: 'https://dora.inclusion.beta.gouv.fr'
						}
					},
					{
						id: 2,
						fields: {
							App: 'les Emplois',
							Title: 'Offres d’emploi',
							Baseline: 'Faciliter la mise en relation avec les employeurs solidaires',
							Logo: 'https://image.url',
							Website: 'https://emplois.inclusion.beta.gouv.fr'
						}
					}
				]
			})
		);
		const gristClient: GristClient = {
			requestGristTable
		};
		const repository = new ModuleRepositoryGrist(gristClient);

		// when
		const actual: Module[] = await repository.listModules();

		// then
    const module1 = new Module();
    module1.id = '1';
    module1.app = 'DORA';
    module1.title = 'Services d’insertion';
    module1.baseline = 'Donnez de la visibilité à votre offre de services';
    module1.logo = 'https://image.url';
    module1.website = 'https://dora.inclusion.beta.gouv.fr';

    const module2 = new Module();
    module2.id = '2';
    module2.app = 'les Emplois';
    module2.title = 'Offres d’emploi';
    module2.baseline = 'Faciliter la mise en relation avec les employeurs solidaires';
    module2.logo = 'https://image.url';
    module2.website = 'https://emplois.inclusion.beta.gouv.fr';
    
		const expected: Module[] = [module1, module2];
		expect(actual).toEqual(expected);
	});
});
