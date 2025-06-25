import { describe, it, expect, vi } from 'vitest';
import { GristClient } from './grist';
import { StructureRepositoryGrist, Service } from './structure';

describe('StructureRepositoryGrist', () => {
	it('getServiceByStructureId should call Grist API', async () => {
		// given
		const requestGristTable = vi.fn(() =>
			Promise.resolve({
				records: [
					{
						id: 1,
						fields: {
							Name: 'Test Structure Name'
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
		await repository.getServiceByStructureId(structureId);

		// then
		expect(requestGristTable).toHaveBeenCalledWith(
			'GET',
			'Services',
			'records?filter=%7B%22Structure%22%3A%5B%22structure_id%22%5D%7D'
		);
	});

	it('getServiceByStructureId should return a list of Services', async () => {
		// given
		const requestGristTable = vi.fn(() =>
			Promise.resolve({
				records: [
					{
						id: 1,
						fields: {
							Name: 'Les emplois de l’inclusion',
							Status: 'DRAFT',
							Created_at: '2022-09-26T17:49:09.245384+02:00',
							Updated_at: '2025-01-27T16:11:22.091825+01:00',
							Slug: 'plateforme-de-linclu-les-emplois-de-lincl'
						}
					},
					{
						id: 2,
						fields: {
							Name: 'Immersion Facilitée',
							Status: 'PUBLISHED',
							Created_at: '2022-09-26T17:49:09.245384+02:00',
							Updated_at: '2025-01-27T16:11:22.091825+01:00',
							Slug: 'plateforme-de-linclu-immersion-facilitee'
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
		const actual: Service[] = await repository.getServiceByStructureId(structureId);

		// then
		const expected: Service[] = [
			{
				id: '1',
				name: 'Les emplois de l’inclusion',
				status: 'BROUILLON',
				perimeter: 'France entière',
				lastUpdate: new Date('2025-01-27T16:11:22.091825+01:00'),
				synchronized: false,
				link: 'https://dora.inclusion.beta.gouv.fr/services/plateforme-de-linclu-les-emplois-de-lincl'
			},
			{
				id: '2',
				name: 'Immersion Facilitée',
				status: 'PUBLIÉE',
				perimeter: 'France entière',
				lastUpdate: new Date('2025-01-27T16:11:22.091825+01:00'),
				synchronized: false,
				link: 'https://dora.inclusion.beta.gouv.fr/services/plateforme-de-linclu-immersion-facilitee'
			}
		];
		expect(actual).toEqual(expected);
	});
});

describe('Service', () => {
	it('isActive should return `true` if status is "PUBLIÉE"', () => {
	  // given
    const service = new Service();
    
    // when
    service.status = 'PUBLIÉE';
    
    // then
    expect(service.isActive).toBe(true);
	});
	it('isActive should return `true` if status is "PUBLIÉE"', () => {
 // given
    const service = new Service();
    
    // when
    service.status = 'BROUILLON';
    
    // then
    expect(service.isActive).toBe(false);
	
	});
});
