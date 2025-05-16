import { getSessionData } from '$lib/server/session';

export async function handle({ event, resolve }) {
    const session = getSessionData(event.cookies.get('session'));
	event.locals.user = session ? session : null;
	return resolve(event);
}