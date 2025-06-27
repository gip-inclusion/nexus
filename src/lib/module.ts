export enum ModuleName {
	Dora = 'DORA',
	Emplois = 'Emplois',
	Pilotage = 'Pilotage',
	Communaute = 'Communauté',
	RdvInsertion = 'rdv-insertion',
	ImmersionFacilitee = 'Immersion facilitée',
	Gps = 'GPS',
	Marche = 'Marché',
	MonRecap = 'Mon Récap'
}

export function isActiveModule(moduleKey: string, structureModules?: string[]) {
	return (
		structureModules && Array.isArray(structureModules) && structureModules.includes(moduleKey)
	);
}
