import { GristClient, gristClient } from "./grist";

export class Module {
  id?: string;
  app?: string;
  title?: string;
  baseline?: string;
  logo?: string;
  website?: string;
}

export interface ModuleRepository {
  listModules(): Promise<Module[]>;
  findModulesByStructureId(structureId: string): Promise<Module[]>;
}

export class ModuleRepositoryGrist implements ModuleRepository {
  constructor(readonly gristClient: GristClient) { }

  async listModules(): Promise<Module[]> {
    const data = await this.gristClient.requestGristTable(
			'GET',
			'Modules',
			`records`
		);
    const modules: Module[] =
			data.records?.map((record: { id: number; fields: Record<string, unknown> }) => {
				const module = new Module();
  
				module.id = String(record.id);
        module.app = record.fields['App'] as string;
				module.title = record.fields['Title'] as string;
				module.baseline = record.fields['Baseline'] as string;
				module.logo = record.fields['Logo'] as string;
				module.website = record.fields['Website'] as string;
  
				return module;
			}) || [];
    return modules;
  }

  findModulesByStructureId(structureId: string): Promise<Module[]> {
    throw new Error("Method not implemented.");
  }  
}

export const moduleRepository = new ModuleRepositoryGrist(gristClient);