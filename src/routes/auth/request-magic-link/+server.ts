import { json, redirect } from '@sveltejs/kit';
import { generateMagicLink, sendMagicEmail } from '$lib/server/auth';

export async function POST({ request }) {
  const formData = await request.formData();
  const email = formData.get('email')?.toString();

  if (!email) return json({ error: 'Email requis' }, { status: 400 });

  const token = await generateMagicLink(email);
  
  await sendMagicEmail(email, token);

  return redirect(303, '/login/confirmation');
}