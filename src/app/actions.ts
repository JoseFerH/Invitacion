'use server';

import { z } from 'zod';
import { searchSpotifyFlow } from '@/ai/flows/search-spotify-flow';
import { collection, addDoc, serverTimestamp, writeBatch, doc, getFirestore } from 'firebase/firestore';
import { getSdks } from '@/firebase/server-sdks';
import { signInAnonymously } from 'firebase/auth';

// The RSVP logic has been moved to the client-side component (RsvpForm.tsx)
// to simplify authentication and ensure reliable writes to Firestore.
// This file is kept for other potential server actions.

// Spotify song type from the flow
export type SpotifySong = {
  id: string;
  name: string;
  artist: string;
  albumArt: string;
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
