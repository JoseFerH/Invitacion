'use server';

import { z } from 'zod';
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
  console.log(`Searching Spotify for: "${query}"`);
  if (!query) {
    return [];
  }
  // This is mock data. In a real scenario, this would call a Genkit flow
  // that interacts with the Spotify API.
  // const results = await searchSpotifyFlow.run({ query });
  const mockResults: SpotifySong[] = [
    { id: '1', name: 'Blinding Lights', artist: 'The Weeknd', albumArt: 'https://picsum.photos/seed/song1/100/100' },
    { id: '2', name: 'As It Was', artist: 'Harry Styles', albumArt: 'https://picsum.photos/seed/song2/100/100' },
    { id: '3', name: 'Levitating', artist: 'Dua Lipa', albumArt: 'https://picsum.photos/seed/song3/100/100' },
    { id: '4', name: 'Good 4 U', artist: 'Olivia Rodrigo', albumArt: 'https://picsum.photos/seed/song4/100/100' },
    { id: '5', name: 'Peaches', artist: 'Justin Bieber', albumArt: 'https://picsum.photos/seed/song5/100/100' },
  ];
  return mockResults.filter(song => song.name.toLowerCase().includes(query.toLowerCase()) || song.artist.toLowerCase().includes(query.toLowerCase()));
}


export async function submitSongSuggestions(songs: SpotifySong[]): Promise<{ success: boolean; message: string }> {
  if (songs.length === 0) {
    return { success: false, message: 'Por favor, selecciona al menos una canción.' };
  }

  try {
    // In a real scenario, this would save to Firestore.
    // Example of how to get server-side SDKs if needed in the future for other actions:
    // const { firestore, auth } = getSdks();
    //  if (!auth.currentUser) {
    //   await signInAnonymously(auth);
    // }
    const songTitles = songs.map(s => `${s.name} by ${s.artist}`);

    console.log('Submitting song suggestions to Firestore (simulation):', songTitles);
    return { success: true, message: '¡Gracias! Tus sugerencias de canciones han sido enviadas.' };
  } catch (error) {
    console.error('Error submitting song suggestions:', error);
    return { success: false, message: 'Ocurrió un error al enviar tus sugerencias. Intenta de nuevo.' };
  }
}
