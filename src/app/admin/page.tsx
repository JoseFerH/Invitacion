'use client';

import { useMemoFirebase } from '@/firebase/provider';
import { useCollection } from '@/firebase/firestore/use-collection';
import { useFirestore } from '@/firebase';
import { collection, query, orderBy } from 'firebase/firestore';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Download, Users, Music, Loader2 } from 'lucide-react';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import type { FormEvent } from 'react';
import { useMemo, useState } from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

// Define data types for guests and songs
type Guest = {
  name: string;
  attendees: number;
  createdAt: { toDate: () => Date };
};

type SongSuggestion = {
  songName: string;
  artistName: string;
  submittedAt: { toDate: () => Date };
};

const DEFAULT_PASSWORD = process.env.NEXT_PUBLIC_ADMIN_PASSWORD ?? '123';


export default function AdminPage() {
  const firestore = useFirestore();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [inputPassword, setInputPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handlePasswordSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (inputPassword.trim() === DEFAULT_PASSWORD) {
      setIsAuthenticated(true);
      setErrorMessage(null);
      setInputPassword('');
      return;
    }

    setErrorMessage('Contraseña incorrecta. Intenta nuevamente.');
  };

  // Memoize Firestore queries to prevent re-renders
  const guestsQuery = useMemoFirebase(() =>
    firestore && isAuthenticated
      ? query(collection(firestore, 'guests'), orderBy('createdAt', 'desc'))
      : null
  , [firestore, isAuthenticated]);

  const songsQuery = useMemoFirebase(() =>
    firestore && isAuthenticated
      ? query(collection(firestore, 'song_suggestions'), orderBy('submittedAt', 'desc'))
      : null
  , [firestore, isAuthenticated]);

  const { data: guests, isLoading: isLoadingGuests } = useCollection<Guest>(guestsQuery);
  const { data: songs, isLoading: isLoadingSongs } = useCollection<SongSuggestion>(songsQuery);

  const totalAttendees = useMemo(() => {
    return guests?.reduce((sum, guest) => sum + guest.attendees, 0) || 0;
  }, [guests]);

  const handleExportGuestsPDF = () => {
    if (!guests || guests.length === 0) return;
    const doc = new jsPDF();
    
    doc.setFontSize(18);
    doc.text('Lista de Invitados - Gala de Graduación', 14, 22);
    doc.setFontSize(11);
    doc.text(`Total de Asistentes Confirmados: ${totalAttendees}`, 14, 30);

    autoTable(doc, {
      startY: 35,
      head: [['Nombre', 'Asistentes', 'Fecha de Confirmación']],
      body: guests.map(guest => [
        guest.name,
        guest.attendees,
        guest.createdAt?.toDate().toLocaleDateString('es-GT', { timeZone: 'America/Guatemala' }) || 'N/A'
      ]),
      headStyles: { fillColor: [0, 33, 71] }, // Dark blue
    });

    doc.save('reporte_invitados_graduacion.pdf');
  };

  const handleExportSongsPDF = () => {
    if (!songs || songs.length === 0) return;
    const doc = new jsPDF();
    
    doc.setFontSize(18);
    doc.text('Sugerencias de Canciones - Gala de Graduación', 14, 22);

    autoTable(doc, {
      startY: 35,
      head: [['Canción', 'Artista', 'Fecha de Sugerencia']],
      body: songs.map(song => [
        song.songName,
        song.artistName,
        song.submittedAt?.toDate().toLocaleDateString('es-GT', { timeZone: 'America/Guatemala' }) || 'N/A'
      ]),
      headStyles: { fillColor: [0, 33, 71] }, // Dark blue
    });

    doc.save('reporte_canciones_graduacion.pdf');
  };

  const handleExportAllPDF = () => {
    const doc = new jsPDF();
    
    doc.setFontSize(18);
    doc.text('Reporte de Gala de Graduación', 14, 22);
    doc.setFontSize(11);
    doc.text(`Total de Asistentes Confirmados: ${totalAttendees}`, 14, 30);

    // Guests Table
    if (guests && guests.length > 0) {
      autoTable(doc, {
        startY: 35,
        head: [['Nombre', 'Asistentes', 'Fecha de Confirmación']],
        body: guests.map(guest => [
          guest.name,
          guest.attendees,
          guest.createdAt?.toDate().toLocaleDateString('es-GT', { timeZone: 'America/Guatemala' }) || 'N/A'
        ]),
        headStyles: { fillColor: [0, 33, 71] }, // Dark blue
      });
    } else {
      doc.text('No hay invitados confirmados.', 14, 40);
    }

    // Songs Table
    if (songs && songs.length > 0) {
      const lastTable = (doc as any).lastAutoTable;
      const songsTableStartY = lastTable ? lastTable.finalY + 15 : 50;

      doc.setFontSize(16);
      doc.text('Sugerencias de Canciones', 14, songsTableStartY);
      
      autoTable(doc, {
        startY: songsTableStartY + 5,
        head: [['Canción', 'Artista', 'Fecha de Sugerencia']],
        body: songs.map(song => [
          song.songName,
          song.artistName,
          song.submittedAt?.toDate().toLocaleDateString('es-GT', { timeZone: 'America/Guatemala' }) || 'N/A'
        ]),
        headStyles: { fillColor: [0, 33, 71] }, // Dark blue
      });
    }

    doc.save('reporte_completo_graduacion.pdf');
  };

  const isLoading = isAuthenticated && (isLoadingGuests || isLoadingSongs);

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
        <Card className="w-full max-w-sm">
          <CardHeader>
            <CardTitle className="text-2xl font-bold text-gray-800">Acceso restringido</CardTitle>
            <p className="text-sm text-gray-500">Ingresa la contraseña para entrar al panel.</p>
          </CardHeader>
          <CardContent>
            <form className="space-y-4" onSubmit={handlePasswordSubmit}>
              <div className="space-y-2">
                <Label htmlFor="admin-password">Contraseña</Label>
                <Input
                  id="admin-password"
                  type="password"
                  value={inputPassword}
                  autoComplete="current-password"
                  onChange={(event) => setInputPassword(event.target.value)}
                />
                {errorMessage && <p className="text-sm text-destructive">{errorMessage}</p>}
              </div>
              <Button type="submit" className="w-full">
                Ingresar
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 p-4 sm:p-8">
      <div className="max-w-7xl mx-auto">
        <header className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-800">Panel de Administración</h1>
            <p className="text-gray-500">Resumen de confirmaciones y sugerencias.</p>
          </div>
          <Button onClick={handleExportAllPDF} disabled={isLoading || (!guests?.length && !songs?.length)}>
            <Download className="mr-2 h-4 w-4" />
            Exportar Todo a PDF
          </Button>
        </header>

        <main className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
                <div className="flex-grow">
                    <CardTitle className="flex items-center"><Users className="mr-2 text-gray-600"/> Invitados Confirmados</CardTitle>
                    {guests && <p className="text-lg font-bold text-card-foreground">{totalAttendees} Asistentes</p>}
                </div>
                <Button variant="outline" size="icon" onClick={handleExportGuestsPDF} disabled={!guests || guests.length === 0} aria-label="Exportar invitados">
                    <Download className="h-4 w-4" />
                </Button>
            </CardHeader>
            <CardContent>
              <div className="max-h-[60vh] overflow-y-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Nombre</TableHead>
                      <TableHead className="text-center">Asistentes</TableHead>
                      <TableHead className="text-right">Fecha</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {isLoadingGuests ? (
                      <TableRow>
                        <TableCell colSpan={3} className="text-center py-8">
                           <div className="flex justify-center items-center">
                            <Loader2 className="h-8 w-8 animate-spin text-gray-500" />
                          </div>
                        </TableCell>
                      </TableRow>
                    ) : guests && guests.length > 0 ? (
                      guests.map((guest: any) => (
                        <TableRow key={guest.id}>
                          <TableCell className="font-medium">{guest.name}</TableCell>
                          <TableCell className="text-center">{guest.attendees}</TableCell>
                          <TableCell className="text-right text-sm text-gray-500">
                             {guest.createdAt?.toDate().toLocaleDateString('es-GT', { timeZone: 'America/Guatemala' })}
                          </TableCell>
                        </TableRow>
                      ))
                    ) : (
                      <TableRow>
                        <TableCell colSpan={3} className="text-center h-24 text-gray-500">
                          Aún no hay invitados confirmados.
                        </TableCell>
                      </TableRow>
                    )}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle className="flex items-center flex-grow"><Music className="mr-2 text-gray-600"/> Sugerencias de Canciones</CardTitle>
                <Button variant="outline" size="icon" onClick={handleExportSongsPDF} disabled={!songs || songs.length === 0} aria-label="Exportar canciones">
                    <Download className="h-4 w-4" />
                </Button>
            </CardHeader>
            <CardContent>
              <div className="max-h-[60vh] overflow-y-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Canción</TableHead>
                      <TableHead>Artista</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {isLoadingSongs ? (
                      <TableRow>
                        <TableCell colSpan={2} className="text-center py-8">
                           <div className="flex justify-center items-center">
                            <Loader2 className="h-8 w-8 animate-spin text-gray-500" />
                          </div>
                        </TableCell>
                      </TableRow>
                    ) : songs && songs.length > 0 ? (
                      songs.map((song: any) => (
                        <TableRow key={song.id}>
                          <TableCell className="font-medium">{song.songName}</TableCell>
                          <TableCell>{song.artistName}</TableCell>
                        </TableRow>
                      ))
                    ) : (
                      <TableRow>
                        <TableCell colSpan={2} className="text-center h-24 text-gray-500">
                          Aún no hay canciones sugeridas.
                        </TableCell>
                      </TableRow>
                    )}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        </main>
      </div>
    </div>
  );
}
