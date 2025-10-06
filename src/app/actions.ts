'use server';

import { z } from 'zod';
import { collection, addDoc } from 'firebase/firestore';
import { getSdks } from '@/firebase/server-sdks';
import { signInAnonymously } from 'firebase/auth';

const RsvpSchema = z.object({
  name: z.string().min(2, { message: 'Tu nombre es requerido.' }),
  attendees: z.coerce.number().min(1, { message: 'Debes seleccionar al menos un asistente.' }),
});

export type RsvpState = {
  message?: string;
  errors?: {
    name?: string[];
    attendees?: string[];
  };
  success: boolean;
};

export async function submitRsvp(prevState: RsvpState, formData: FormData): Promise<RsvpState> {
  const validatedFields = RsvpSchema.safeParse({
    name: formData.get('name'),
    attendees: formData.get('attendees'),
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: 'Faltan campos. No se pudo registrar la asistencia.',
      success: false,
    };
  }

  const { name, attendees } = validatedFields.data;

  try {
    const { firestore, auth } = getSdks();
    
    // Asegura que tengamos un usuario autenticado (anónimo en este caso)
    if (!auth.currentUser) {
      await signInAnonymously(auth);
    }
    
    const guestsCollection = collection(firestore, 'guests');
    await addDoc(guestsCollection, {
      name: name,
      attendees: attendees,
      createdAt: new Date(),
    });

    return { message: `¡Gracias por confirmar, ${name}! Tu asistencia ha sido registrada.`, success: true };
  } catch (error) {
    console.error('Error submitting RSVP to Firestore:', error);
    return { message: 'Ocurrió un error al registrar tu asistencia. Por favor, intenta de nuevo.', success: false };
  }
}

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
    const { firestore, auth } = getSdks();
     if (!auth.currentUser) {
      await signInAnonymously(auth);
    }
    const suggestionsCollection = collection(firestore, 'song_suggestions');
    const songTitles = songs.map(s => `${s.name} by ${s.artist}`);

    await addDoc(suggestionsCollection, {
        suggestions: songTitles,
        createdAt: new Date()
    });

    console.log('Submitting song suggestions:', songTitles);
    return { success: true, message: '¡Gracias! Tus sugerencias de canciones han sido enviadas.' };
  } catch (error) {
    console.error('Error submitting song suggestions:', error);
    return { success: false, message: 'Ocurrió un error al enviar tus sugerencias. Intenta de nuevo.' };
  }
}
