import { fail } from '@sveltejs/kit';
import { Resend } from 'resend';
import { env } from '$env/dynamic/private';
import { z } from 'zod';

// Initialize Resend with the API key from our environment variables
const resend = new Resend(env.RESEND_API_KEY);

// Define the data contract for the form using Zod.
// This is the single source of truth for validation.
const ContactFormSchema = z.object({
	name: z.string().trim().min(1, { message: 'Name is required.' }),
	email: z.string().email({ message: 'A valid email address is required.' }),
	message: z.string().trim().min(1, { message: 'Message is required.' })
});

/**
 * A simple utility to escape HTML characters and preserve line breaks.
 * This prevents HTML injection by treating all input as plain text.
 * @param text The raw text input.
 * @returns Sanitized string safe for HTML embedding.
 */
function escapeHtml(text: string): string {
	return text
		.replace(/&/g, '&#38;')
		.replace(/</g, '&#60;')
		.replace(/>/g, '&#62;')
		.replace(/"/g, '&#34;')
		.replace(/'/g, '&#39;')
		.replace(/ /g, '&#32;')
		.replace(/\n/g, '<br>'); // Preserve line breaks
}

export const actions = {
	default: async ({ request }) => {
		const formData = await request.formData();
		const formFields = Object.fromEntries(formData);

		const validationResult = ContactFormSchema.safeParse(formFields);

		if (!validationResult.success) {
			// This failure logic is acceptable.
			const errors = validationResult.error.flatten().fieldErrors;
			return fail(400, {
				error: 'Invalid data provided.',
				errors: {
					name: errors.name?.[0],
					email: errors.email?.[0],
					message: errors.message?.[0]
				},
				name: formFields.name,
				email: formFields.email,
				message: formFields.message
			});
		}

		const { name, email, message } = validationResult.data;

		const sanitizedMessage = escapeHtml(message);
		const sanitizedName = escapeHtml(name);

		try {
			await resend.emails.send({
				from: 'Domain Architect <onboarding@resend.dev>',
				replyTo: email,
				to: env.MY_EMAIL,
				// FIX: Use the sanitized name in the subject line.
				subject: `New Signal from The Synthesis Engine: ${sanitizedName}`,
				html: `
                    <p><strong>From:</strong> ${sanitizedName} (${email})</p>
                    <p><strong>Message:</strong></p>
                    <p>${sanitizedMessage}</p>
                `
			});

			return {
				success: true,
				message: 'Signal Transmitted. The Architect will respond when the network is clear.'
			};
		} catch (error) {
			console.error('Error sending email:', error);
			return fail(500, {
				error: 'Could not transmit the signal. Please try again later.'
			});
		}
	}
};
