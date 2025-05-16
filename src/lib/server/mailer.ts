import nodemailer from 'nodemailer';

import { SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASSWORD } from '$env/static/private';

const transporter = nodemailer.createTransport({
	host: SMTP_HOST,
	port: parseInt(SMTP_PORT),
	auth: {
		user: SMTP_USER,
		pass: SMTP_PASSWORD
	}
});

export async function sendEmail(to: string, subject: string, text: string) {
	await transporter.sendMail({
		from: 'noreply@inclusion.gouv.fr',
		to,
		subject,
		text
	});
}