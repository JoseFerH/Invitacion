'use server';

import { searchSpotifyFlow } from '@/ai/flows/search-spotify-flow';
import { collection, serverTimestamp, writeBatch, doc } from 'firebase/firestore';
import { getSdks } from '@/firebase/server-sdks';
import { getSpotifyToken } from '@/lib/spotify-auth';

// The RSVP logic has been moved to the client-side component (RsvpForm.tsx)
// to simplify authentication and ensure reliable writes to Firestore.
// This file is kept for other potential server actions.

// Spotify song type from the flow
export type SpotifySong = {
  id: string;
  name: string;
  artist: string;
  albumArt: string;
  previewUrl?: string | null;
};

export type SpotifyBackgroundTrack = {
  id: string;
  name: string;
  artist: string;
  albumArt: string;
  previewUrl: string | null;
  externalUrl: string;
};

export async function searchSongs(query: string): Promise<SpotifySong[]> {
  if (!query) {
    return [];
  }
  // This now calls the real Genkit flow which interacts with the Spotify API.
  try {
    const results = await searchSpotifyFlow({ query });
    return results;
  } catch(e) {
    console.error(e);
    return [];
  }
}


export async function getBackgroundTrack(trackId: string): Promise<SpotifyBackgroundTrack | null> {
  if (!trackId) {
    return null;
  }

  try {
    const token = await getSpotifyToken();
    const response = await fetch(`https://api.spotify.com/v1/tracks/${trackId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      console.error('Spotify track lookup error:', await response.text());
      return null;
    }

    const data = await response.json();

    return {
      id: data.id,
      name: data.name,
      artist: data.artists?.map((artist: { name: string }) => artist.name).join(', ') ?? 'Artista desconocido',
      albumArt:
        data.album?.images?.[1]?.url ??
        data.album?.images?.[0]?.url ??
        'https://picsum.photos/seed/background-song/200/200',
      previewUrl: data.preview_url ?? null,
      externalUrl: data.external_urls?.spotify ?? `https://open.spotify.com/track/${trackId}`,
    };
  } catch (error) {
    console.error('Error fetching Spotify background track:', error);
    return null;
  }
}


export async function submitSongSuggestions(songs: SpotifySong[]): Promise<{ success: boolean; message: string }> {
  if (songs.length === 0) {
    return { success: false, message: 'Por favor, selecciona al menos una canción.' };
  }

  try {
    const { firestore } = getSdks();
    
    const suggestionsCollection = collection(firestore, 'song_suggestions');
    const batch = writeBatch(firestore);
    
    songs.forEach(song => {
        const newSuggestionRef = doc(suggestionsCollection); // Create a new doc reference
        batch.set(newSuggestionRef, {
            spotifyTrackId: song.id,
            songName: song.name,
            artistName: song.artist,
            albumArt: song.albumArt,
            submittedAt: serverTimestamp(),
        });
    });

    await batch.commit();

    console.log(`Saved ${songs.length} song suggestions`);
    return { success: true, message: '¡Gracias! Tus sugerencias de canciones han sido enviadas.' };
  } catch (error) {
    console.error('Error submitting song suggestions:', error);
    const errorMessage = error instanceof Error ? error.message : 'Ocurrió un error desconocido.';
    return { success: false, message: `Ocurrió un error al enviar tus sugerencias. ${errorMessage}` };
  }
}
