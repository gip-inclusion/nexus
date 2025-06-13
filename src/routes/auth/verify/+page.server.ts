import { redirect, error } from '@sveltejs/kit';
import { requestGristTable } from '$lib/server/grist';
import { createSession } from '$lib/server/session';

export async function load({ url, cookies }) {
    const token = url.searchParams.get('token');
    if (!token) throw error(400, 'Token manquant');

    // TODO : que faire si une session active et valide existait déjà ?

    // 1. Vérifier qu'un lien magique existe bien
    const filterToken = encodeURIComponent(JSON.stringify({ Token: [token] }));
    const resToken = await requestGristTable('GET', 'Magic_links', `records?filter=${filterToken}`);
    const tokenRecord = resToken.records?.[0];

    if (!tokenRecord || !!tokenRecord.fields.activated_at || new Date(tokenRecord.fields.expires_at) < new Date()) {
        throw error(400, 'Lien invalide ou expiré');
    }

    // 2. Marquer le lien magique comme utilisé
    const now = new Date();
    await requestGristTable('PATCH', 'Magic_links', `records`, {
        records: [
            {
                id: tokenRecord['id'],
                fields: {
                    Activated_at: now,
                    Deprecated_at: new Date(now.getTime() + 14 * 24 * 60 * 60 * 1000) //  14 jours
                }
            }
        ]
    });

    // 📧 3. Récupérer l'email depuis le champ "account" (référence)
    const accountId = tokenRecord.fields['Account'];
    const filterAccounts = encodeURIComponent(JSON.stringify({ id: [accountId] }));
    const resAccounts = await requestGristTable('GET', 'Accounts', `records?filter=${filterAccounts}`);
    const accountRecord = resAccounts.records?.[0];

    // 🧾 5. Memberships du compte
    const filterMemberships = encodeURIComponent(JSON.stringify({ Account: [tokenRecord.fields['Account']] }));
    const resMemberships = await requestGristTable('GET', 'Memberships', `records?filter=${filterMemberships}`);
    const memberships = resMemberships.records ?? [];

    if (memberships.length === 0) {
        throw error(403, 'Aucune structure associée');
    }

    const firstStructureId = resMemberships.records[0].fields['Structure'];

    // Créer le cookie de session
    const serializedSession = await createSession({
        accountId: accountRecord['id'],
        email: accountRecord['Email'], 
        token: tokenRecord.fields['Token'], 
        structureId: firstStructureId
    });

    cookies.set('session', serializedSession, {
        path: '/',
        httpOnly: true,
        sameSite: 'lax',
        secure: true,
        maxAge: 60 * 60 * 24 * 14 // 14 jours
    });

    throw redirect(303, '/structure');
}