import nodemailer, { type Transporter } from 'nodemailer';

import { SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASSWORD } from '$env/static/private';

export interface Mailer {
	sendEmail(to: string, subject: string, text: string): Promise<void>;
}

export class MailerSMTP implements Mailer {
	constructor(readonly transporter: Transporter) {}

	async sendEmail(to: string, subject: string, text: string) {
		await this.transporter.sendMail({
			from: 'noreply@inclusion.gouv.fr',
			to,
			subject,
			text
		});
	}
}

const transporter = nodemailer.createTransport({
	host: SMTP_HOST,
	port: parseInt(SMTP_PORT),
	auth: {
		user: SMTP_USER,
		pass: SMTP_PASSWORD
	}
});

export const mailer = new MailerSMTP(transporter);
