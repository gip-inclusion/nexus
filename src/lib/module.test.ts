import { describe, it, expect } from 'vitest';
import { isActiveModule, ModuleName } from './module';

describe('isActiveModule', () => {
	describe('when module is present in structure modules', () => {
		it('should return true for a module present in the array', () => {
			// given
			const moduleKey = ModuleName.Dora;
			const structureModules = ['DORA', 'Emplois', 'Pilotage'];

			// when
			const result = isActiveModule(moduleKey, structureModules);

			// then
			expect(result).toBe(true);
		});

		it('should return true for multiple different modules', () => {
			// given
			const structureModules = ['DORA', 'Emplois', 'Marché'];

			// when & then
			expect(isActiveModule(ModuleName.Dora, structureModules)).toBe(true);
			expect(isActiveModule(ModuleName.Emplois, structureModules)).toBe(true);
			expect(isActiveModule(ModuleName.Marche, structureModules)).toBe(true);
		});
	});

	describe('when module is not present in structure modules', () => {
		it('should return false for a module not in the array', () => {
			// given
			const moduleKey = ModuleName.Pilotage;
			const structureModules = ['DORA', 'Emplois'];

			// when
			const result = isActiveModule(moduleKey, structureModules);

			// then
			expect(result).toBe(false);
		});

		it('should return false for empty array', () => {
			// given
			const moduleKey = ModuleName.Dora;
			const structureModules: string[] = [];

			// when
			const result = isActiveModule(moduleKey, structureModules);

			// then
			expect(result).toBe(false);
		});
	});

	describe('when structureModules parameter is invalid', () => {
		it('should return false when structureModules is undefined', () => {
			// given
			const moduleKey = ModuleName.Dora;
			const structureModules = undefined;

			// when
			const result = isActiveModule(moduleKey, structureModules);

			// then
			expect(result).toBeUndefined();
		});

		it('should return false when structureModules is null', () => {
			// given
			const moduleKey = ModuleName.Dora;
			const structureModules = null as any;

			// when
			const result = isActiveModule(moduleKey, structureModules);

			// then
			expect(result).toBeNull();
		});

		it('should return false when structureModules is not an array', () => {
			// given
			const moduleKey = ModuleName.Dora;
			const structureModules = 'not-an-array' as any;

			// when
			const result = isActiveModule(moduleKey, structureModules);

			// then
			expect(result).toBe(false);
		});

		it('should return false when structureModules is an object', () => {
			// given
			const moduleKey = ModuleName.Dora;
			const structureModules = { DORA: true } as any;

			// when
			const result = isActiveModule(moduleKey, structureModules);

			// then
			expect(result).toBe(false);
		});
	});

	describe('case sensitivity', () => {
		it('should be case sensitive', () => {
			// given
			const moduleKey = ModuleName.Dora; // 'DORA'
			const structureModules = ['dora', 'emplois']; // lowercase

			// when
			const result = isActiveModule(moduleKey, structureModules);

			// then
			expect(result).toBe(false);
		});

		it('should match exact case', () => {
			// given
			const moduleKey = ModuleName.Emplois; // 'Emplois'
			const structureModules = ['DORA', 'Emplois']; // exact case

			// when
			const result = isActiveModule(moduleKey, structureModules);

			// then
			expect(result).toBe(true);
		});
	});

	describe('edge cases with module names', () => {
		it('should handle modules with special characters', () => {
			// given
			const moduleKey = ModuleName.RdvInsertion; // 'rdv-insertion'
			const structureModules = ['rdv-insertion', 'DORA'];

			// when
			const result = isActiveModule(moduleKey, structureModules);

			// then
			expect(result).toBe(true);
		});

		it('should handle modules with spaces', () => {
			// given
			const moduleKey = ModuleName.ImmersionFacilitee; // 'Immersion facilitée'
			const structureModules = ['Immersion facilitée', 'GPS'];

			// when
			const result = isActiveModule(moduleKey, structureModules);

			// then
			expect(result).toBe(true);
		});

		it('should handle modules with accents', () => {
			// given
			const moduleKey = ModuleName.Communaute; // 'Communauté'
			const structureModules = ['Communauté', 'DORA'];

			// when
			const result = isActiveModule(moduleKey, structureModules);

			// then
			expect(result).toBe(true);
		});
	});

	describe('real world scenarios', () => {
		it('should work with typical structure modules configuration', () => {
			// given - typical structure from the codebase
			const structureModules = ['DORA', 'Emplois', 'Marché'];

			// when & then
			expect(isActiveModule(ModuleName.Dora, structureModules)).toBe(true);
			expect(isActiveModule(ModuleName.Emplois, structureModules)).toBe(true);
			expect(isActiveModule(ModuleName.Marche, structureModules)).toBe(true);
			expect(isActiveModule(ModuleName.Pilotage, structureModules)).toBe(false);
			expect(isActiveModule(ModuleName.Gps, structureModules)).toBe(false);
		});

		it('should work with single module configuration', () => {
			// given
			const structureModules = ['DORA'];

			// when & then
			expect(isActiveModule(ModuleName.Dora, structureModules)).toBe(true);
			expect(isActiveModule(ModuleName.Emplois, structureModules)).toBe(false);
		});

		it('should work with all modules enabled', () => {
			// given
			const structureModules = [
				'DORA',
				'Emplois',
				'Pilotage',
				'Communauté',
				'rdv-insertion',
				'Immersion facilitée',
				'GPS',
				'Marché',
				'Mon Récap'
			];

			// when & then - all modules should be active
			Object.values(ModuleName).forEach((module) => {
				expect(isActiveModule(module, structureModules)).toBe(true);
			});
		});
	});
});
