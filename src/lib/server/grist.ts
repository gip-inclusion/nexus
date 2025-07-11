import { GRIST_API_URL, DOC_ID, API_KEY } from '$env/static/private';

export class GristClient {
	async requestGristTable(
		method: string,
		table: string,
		path: string,
		body?: unknown
	): Promise<any> {
		const url = `${GRIST_API_URL}/docs/${DOC_ID}/tables/${table}/${path}`;
		const res = await fetch(url, {
			method,
			headers: {
				Authorization: `Bearer ${API_KEY}`,
				'Content-Type': 'application/json'
			},
			body: body ? JSON.stringify(body) : undefined
		});

		if (!res.ok) {
			const text = await res.text();
			throw new Error(`Erreur Grist ${res.status}: ${text}`);
		}

		return res.json();
	}
}

export const gristClient = new GristClient();
