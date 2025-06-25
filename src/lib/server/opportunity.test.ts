import { describe, it, expect, vi } from 'vitest';
import { GristClient } from './grist';
import { OpportunityRepositoryGrist, Opportunity } from './opportunity';

describe('OpportunityRepositoryGrist', () => {
	it('getOpportunitiesByStructureId should call Grist API', async () => {
		// given
		const requestGristTable = vi.fn(() =>
			Promise.resolve({
				records: [
					{
						id: 1,
						fields: {
							Title: 'Nom'
						}
					}
				]
			})
		);
		const gristClient: GristClient = {
			requestGristTable
		};
		const repository = new OpportunityRepositoryGrist(gristClient);
		const structureId = 'structure_id';

		// when
		await repository.listOpportunitiesByStructureId(structureId);

		// then
		expect(requestGristTable).toHaveBeenCalledWith(
			'GET',
			'Opportunities',
			'records?filter=%7B%22Structure%22%3A%5B%22structure_id%22%5D%7D'
		);
	});

	it('getOpportunityByStructureId should return a list of Opportunities', async () => {
		// given
		const requestGristTable = vi.fn(() =>
			Promise.resolve({
				records: [
					{
						id: 1,
						fields: {
							Title: 'Débroussaillage et taillage de haie',
							Type: 'PROJET D’ACHAT',
							City: 'Grenoble',
							Status: 'OPEN',
						}
					},
					{
						id: 2,
						fields: {
							Title: 'Entretien des espaces verts',
							Type: 'PROJET D’ACHAT',
							City: 'Saint Martin d’Hères',
							Status: 'CLOSED',
						}
					}
				]
			})
		);
		const gristClient: GristClient = {
			requestGristTable
		};
		const repository = new OpportunityRepositoryGrist(gristClient);
		const structureId = 'structure_id';

		// when
		const actual: Opportunity[] = await repository.listOpportunitiesByStructureId(structureId);

		// then
		const opportunity1 = new Opportunity();
		opportunity1.id = '1';
		opportunity1.title = 'Débroussaillage et taillage de haie';
		opportunity1.type = 'PROJET D’ACHAT';
		opportunity1.city = 'Grenoble';
    opportunity1.status = 'OUVERT';

		const opportunity2 = new Opportunity();
		opportunity2.id = '2';
		opportunity2.title = 'Entretien des espaces verts';
    opportunity2.type = 'PROJET D’ACHAT';
		opportunity2.city = 'Saint Martin d’Hères';
		opportunity2.status = 'FERMÉ';

		const expected: Opportunity[] = [opportunity1, opportunity2];
		expect(actual).toEqual(expected);
	});
});

describe('Opportunity', () => {
	it('isActive should return `true` if status is "OUVERT"', () => {
		// given
		const opportunity = new Opportunity();

		// when
		opportunity.status = 'OUVERT';

		// then
		expect(opportunity.isActive).toBe(true);
	});
	it('isActive should return `false` if status is "FERMÉ"', () => {
		// given
		const opportunity = new Opportunity();

		// when
		opportunity.status = 'FERMÉ';

		// then
		expect(opportunity.isActive).toBe(false);
	});
});
