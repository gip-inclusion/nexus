// See https://svelte.dev/docs/kit/types#app.d.ts
// for information about these interfaces
declare global {
	namespace App {
		// interface Error {}
		// interface Locals {}
		// interface PageData {}
		// interface PageState {}
		// interface Platform {}

		// Ce que vous exposez via event.locals
		interface Locals {
			user: { accountId: number, email: string, token: string, structureId?: number } | null;
		}
	}
}

export { };
