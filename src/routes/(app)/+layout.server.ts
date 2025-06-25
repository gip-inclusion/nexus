import { gristClient } from '$lib/server/grist';
import type { Structure } from '$lib/server/structure.js';
import { redirect } from '@sveltejs/kit';

export async function load({ locals }) {
	const user = locals.user;

	if (!user) throw redirect(303, '/login');

	const structureId = user.structureId;
	const filter = encodeURIComponent(JSON.stringify({ id: [structureId] }));
	const res = await gristClient.requestGristTable('GET', 'Structures', `records?filter=${filter}`);

	const structureRecord = res.records?.[0];

	if (!structureRecord) {
		throw new Error('Structure non trouvée');
	}

	const structureRecordFields = structureRecord.fields;

	const structure: Structure = {
		name: structureRecordFields['Name'],
		type: structureRecordFields['Type'],
		siret: structureRecordFields['Siret'],
		address: structureRecordFields['Address'],
		city: structureRecordFields['City'],
		email: structureRecordFields['Email'],
		phone: structureRecordFields['Phone'],
		presentation: structureRecordFields['Presentation'],
		address_supplement: structureRecordFields['Address_Supplement'],
		postal_code: structureRecordFields['Postal_Code'],
		website: structureRecordFields['Website'],
		created_at: structureRecordFields['Created_at'],
		edited_at: structureRecordFields['Edited_at'],
	};

	return {
		user,
		structure
	};
}