'use server';
/**
 * @fileOverview A Genkit flow for searching songs on Spotify.
 *
 * - searchSpotifyFlow - A function that searches for tracks on Spotify.
 * - searchSongs - A wrapper for the searchSpotifyFlow.
 */

import { ai } from '@/ai/genkit';
import { z } from 'genkit';
import { getSpotifyToken } from '@/lib/spotify-auth';

// Define the schema for a Spotify track, matching what the frontend expects.
const SpotifyTrackSchema = z.object({
  id: z.string(),
  name: z.string(),
  artist: z.string(),
  albumArt: z.string(),
});

type SpotifyTrack = z.infer<typeof SpotifyTrackSchema>;

// Define the main flow for searching Spotify.
export const searchSpotifyFlow = ai.defineFlow(
  {
    name: 'searchSpotifyFlow',
    inputSchema: z.object({ query: z.string() }),
    outputSchema: z.array(SpotifyTrackSchema),
  },
  async ({ query }) => {
    if (!query) {
      return [];
    }

    const token = await getSpotifyToken();
    const searchUrl = new URL('https://api.spotify.com/v1/search');
    searchUrl.searchParams.append('q', query);
    searchUrl.searchParams.append('type', 'track');
    searchUrl.searchParams.append('limit', '10'); // Limit results to 10

    const response = await fetch(searchUrl.toString(), {
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      console.error('Spotify API Error:', await response.text());
      throw new Error(`Failed to search Spotify: ${response.statusText}`);
    }

    const data = await response.json();

    // Map the Spotify API response to our simplified SpotifyTrack schema.
    const tracks: SpotifyTrack[] = data.tracks.items.map((item: any) => ({
      id: item.id,
      name: item.name,
      artist: item.artists.map((artist: any) => artist.name).join(', '),
      albumArt: item.album.images?.[2]?.url || item.album.images?.[1]?.url || 'https://picsum.photos/seed/placeholder/100/100', // Use a placeholder if no image
    }));

    return tracks;
  }
);

export async function searchSongs(query: string): Promise<SpotifyTrack[]> {
    return await searchSpotifyFlow({query});
}
