export type Session = {
    accountId: number,
    email: string
    token: string
    structureId?: string
}

export function createSession(payload: Session): string {
	return JSON.stringify(payload);
}

export function getSessionData(session: string | undefined): Session | null {
	if (!session) return null;

	try {
		return JSON.parse(session);
	} catch {
		return null;
	}
}