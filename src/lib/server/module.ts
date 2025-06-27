import { GristClient, gristClient } from './grist';

export enum ModuleName {
  Dora = 'DORA',
  Emplois = 'Emplois',
  Pilotage = 'Pilotage',
  Communaute = 'Communauté',
  RdvInsertion = 'rdv-insertion',
  ImmersionFacilitee = 'Immersion facilitée',
  GPS = 'GPS',
  Marché = 'Marché',
  MonRecap = 'Mon Récap',
}

export class Module {
	id?: string;
	app?: string;
	title?: string;
	baseline?: string;
	website?: string;

	toJSON() {
		return {
		  id: this.id,
		  app: this.app,
		  title: this.title,
		  baseline: this.baseline,
		  website: this.website,
		};
	}
}

export interface ModuleRepository {
	listModules(): Promise<Module[]>;
}

export class ModuleRepositoryGrist implements ModuleRepository {
	constructor(readonly gristClient: GristClient) {}

	async listModules(): Promise<Module[]> {
		const data = await this.gristClient.requestGristTable('GET', 'Modules', `records`);
		const modules: Module[] =
			data.records?.map((record: { id: number; fields: Record<string, unknown> }) => {
				const module = new Module();

				module.id = String(record.id);
				module.app = record.fields['App'] as string;
				module.title = record.fields['Title'] as string;
				module.baseline = record.fields['Baseline'] as string;
				module.website = record.fields['Website'] as string;

				return module;
			}) || [];
		return modules;
	}
}

export const moduleRepository = new ModuleRepositoryGrist(gristClient);
