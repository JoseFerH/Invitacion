'use server';

import { z } from 'zod';
import { searchSpotifyFlow } from '@/ai/flows/search-spotify-flow';
import { collection, addDoc, serverTimestamp, getFirestore } from 'firebase/firestore';
import { getSdks } from '@/firebase/server-sdks';
import { signInAnonymously } from 'firebase/auth';

// The RSVP logic has been moved to the client-side component (RsvpForm.tsx)
// to simplify authentication and ensure reliable writes to Firestore.
// This file is kept for other potential server actions.

// Mocked Spotify song type
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
    const { auth, firestore } = getSdks();
    if (!auth.currentUser) {
     await signInAnonymously(auth);
    }
    const user = auth.currentUser;

    if (!user) {
        throw new Error("Authentication failed.");
    }
    
    // We need a guest ID to associate the songs with.
    // In a real app, you would get this after the user has RSVP'd.
    // For now, we'll assume a guest document exists or we'll create a placeholder.
    // This part of the logic might need to be adjusted based on the final app flow.
    const guestId = user.uid; // Using user's anonymous UID as the guestId

    const suggestionsCollection = collection(firestore, `guests/${guestId}/song_suggestions`);
    
    const batch = songs.map(song => addDoc(suggestionsCollection, {
        guestId: guestId,
        spotifyTrackId: song.id,
        songName: song.name, // Storing extra info for easier display
        artistName: song.artist,
        submittedAt: serverTimestamp(),
    }));

    await Promise.all(batch);

    console.log(`Saved ${songs.length} song suggestions for guest ${guestId}`);
    return { success: true, message: '¡Gracias! Tus sugerencias de canciones han sido enviadas.' };
  } catch (error) {
    console.error('Error submitting song suggestions:', error);
    return { success: false, message: 'Ocurrió un error al enviar tus sugerencias. Intenta de nuevo.' };
  }
}
