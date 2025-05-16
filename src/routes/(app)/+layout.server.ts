import { requestGristTable } from '$lib/server/grist';
import { redirect } from '@sveltejs/kit';

export async function load({ locals }) {
	const user = locals.user;

	if (!user) throw redirect(303, '/login');

	const structureId = user.structureId;
	const filter = encodeURIComponent(JSON.stringify({ id: [Number(structureId)] }));
	const res = await requestGristTable('GET', 'Structures', `records?filter=${filter}`);
	const structure = res.records?.[0]?.fields ?? null;	

	return {
		user,
		structure
	};
}