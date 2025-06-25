import nodemailer from 'nodemailer';

import { SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASSWORD } from '$env/static/private';

export interface Mailer {
	sendEmail(to: string, subject: string, text: string): Promise<void>;
}

export class MailerSMTP implements Mailer {
	private _transporter;

	constructor() {
		this._transporter = nodemailer.createTransport({
			host: SMTP_HOST,
			port: parseInt(SMTP_PORT),
			auth: {
				user: SMTP_USER,
				pass: SMTP_PASSWORD
			}
		});
	}
	async sendEmail(to: string, subject: string, text: string) {
		await this._transporter.sendMail({
			from: 'noreply@inclusion.gouv.fr',
			to,
			subject,
			text
		});
	}
}

export const mailer = new MailerSMTP();
