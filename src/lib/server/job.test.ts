import { describe, it, expect, vi } from 'vitest';
import { GristClient } from './grist';
import { JobRepositoryGrist, Job } from './job';

describe('JobRepositoryGrist', () => {
	it('getJobsByStructureId should call Grist API', async () => {
		// given
		const requestGristTable = vi.fn(() =>
			Promise.resolve({
				records: [
					{
						id: 1,
						fields: {
							Name: 'Nom du métier'
						}
					}
				]
			})
		);
		const gristClient: GristClient = {
			requestGristTable
		};
		const repository = new JobRepositoryGrist(gristClient);
		const structureId = 'structure_id';

		// when
		await repository.listJobsByStructureId(structureId);

		// then
		expect(requestGristTable).toHaveBeenCalledWith(
			'GET',
			'Jobs',
			'records?filter=%7B%22Structure%22%3A%5B%22structure_id%22%5D%7D'
		);
	});

	it('getJobByStructureId should return a list of Jobs', async () => {
		// given
		const requestGristTable = vi.fn(() =>
			Promise.resolve({
				records: [
					{
						id: 1,
						fields: {
							Title: 'Chef / Cheffe de garage',
							Status: 'OPEN',
							City: 'Grenoble',
							Positions: 1,
							Updated_at: '2025-01-27T16:11:22.091825+01:00',
							Description:
								'Ce poste implique la gestion d’une équipe de mécaniciens, la planification des interventions, le suivi des réparations et l’assurance de la qualité du service.',
							Requirements:
								'Expérience confirmée en mécanique automobile, compétences managériales, sens des responsabilités et permis B.'
						}
					},
					{
						id: 2,
						fields: {
							Title: 'Mécanicien / Mécanicienne de garage',
							Status: 'CLOSED',
							City: 'Saint Martin d’Hères',
							Positions: 3,
							Updated_at: '2025-04-27T17:11:22.091825+01:00',
							Description:
								'Ce poste consiste à diagnostiquer les pannes, effectuer les réparations et l’entretien courant des véhicules, ainsi qu’à conseiller les clients sur les travaux à prévoir.',
							Requirements:
								'CAP ou BEP en mécanique automobile, rigueur, autonomie et esprit d’équipe.'
						}
					}
				]
			})
		);
		const gristClient: GristClient = {
			requestGristTable
		};
		const repository = new JobRepositoryGrist(gristClient);
		const structureId = 'structure_id';

		// when
		const actual: Job[] = await repository.listJobsByStructureId(structureId);

		// then
		const job1 = new Job();
		job1.id = '1';
		job1.title = 'Chef / Cheffe de garage';
		job1.location = 'Grenoble';
		job1.positions = 1;
		job1.status = 'OUVERT';
		job1.lastUpdate = new Date('2025-01-27T16:11:22.091825+01:00');
		job1.description =
			'Ce poste implique la gestion d’une équipe de mécaniciens, la planification des interventions, le suivi des réparations et l’assurance de la qualité du service.';
		job1.requirements =
			'Expérience confirmée en mécanique automobile, compétences managériales, sens des responsabilités et permis B.';

		const job2 = new Job();
		job2.id = '2';
		job2.title = 'Mécanicien / Mécanicienne de garage';
		job2.location = 'Saint Martin d’Hères';
		job2.positions = 3;
		job2.status = 'FERMÉ';
		job2.lastUpdate = new Date('2025-04-27T17:11:22.091825+01:00');
		job2.description =
			'Ce poste consiste à diagnostiquer les pannes, effectuer les réparations et l’entretien courant des véhicules, ainsi qu’à conseiller les clients sur les travaux à prévoir.';
		job2.requirements =
			'CAP ou BEP en mécanique automobile, rigueur, autonomie et esprit d’équipe.';

		const expected: Job[] = [job1, job2];
		expect(actual).toEqual(expected);
	});
});

describe('Job', () => {
	it('isActive should return `true` if status is "OUVERT"', () => {
		// given
		const job = new Job();

		// when
		job.status = 'OUVERT';

		// then
		expect(job.isActive).toBe(true);
	});
	it('isActive should return `false` if status is "FERMÉ"', () => {
		// given
		const job = new Job();

		// when
		job.status = 'FERMÉ';

		// then
		expect(job.isActive).toBe(false);
	});
});
