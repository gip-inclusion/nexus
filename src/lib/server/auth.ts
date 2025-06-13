import { randomUUID } from 'crypto';
import { sendEmail } from './mailer';
import { requestGristTable } from './grist';

const MAGIC_LINK_EXPIRATION_MINUTES = 60;

export async function generateMagicLink(email: string): Promise<string> {
	const token = randomUUID();

	const filter = encodeURIComponent(JSON.stringify({ Email: [email] }));

	const res = await requestGristTable('GET', 'Accounts', `records?filter=${filter}`);
	const account = res.records?.[0];

	if (!account) {
		throw new Error(`Aucun compte trouvé pour l’email : ${email}`);
	}

	await requestGristTable('POST', 'Magic_links', 'records', {
		records: [
			{
				fields: {
					Account: account.id,
					Token: token
				}
			}
		]
	});

	console.log(token)

	return token;
}

export async function sendMagicEmail(email: string, token: string) {
	const baseUrl = 'http://localhost:5173';
	const magicLink = `${baseUrl}/auth/verify?token=${token}`;
	const subject = 'Votre lien magique de connexion';
	const body = `
Bonjour,

Voici votre lien magique pour vous connecter :

${magicLink}

Ce lien expirera dans ${MAGIC_LINK_EXPIRATION_MINUTES} minutes.

Si vous n'avez pas demandé ce lien, ignorez simplement ce message.
`;

	await sendEmail(email, subject, body);
}
