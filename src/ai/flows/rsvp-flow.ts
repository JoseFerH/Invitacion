'use server';
/**
 * @fileOverview A flow to handle RSVP submissions.
 *
 * - rsvpFlow - A function that handles the RSVP submission process.
 * - RsvpInput - The input type for the rsvpFlow function.
 */

import { ai } from '@/ai/genkit';
import { z } from 'genkit';


const RsvpInputSchema = z.object({
  name: z.string().describe('The name of the main guest.'),
  attendees: z.number().describe('The total number of attendees.'),
});
export type RsvpInput = z.infer<typeof RsvpInputSchema>;


export const rsvpFlow = ai.defineFlow(
  {
    name: 'rsvpFlow',
    inputSchema: RsvpInputSchema,
    outputSchema: z.object({ success: z.boolean(), message: z.string() }),
  },
  async (input) => {
    // This flow is now a placeholder and data is being saved directly
    // to Firestore via a server action.
    console.log('RSVP flow invoked, but data is handled by Firestore action.', input);
    return { success: true, message: `RSVP for ${input.name} handled.` };
  }
);
