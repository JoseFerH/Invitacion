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
import 'jspdf-autotable';
import { useMemo } from 'react';

// Extend jsPDF with the autoTable plugin
interface jsPDFWithAutoTable extends jsPDF {
  autoTable: (options: any) => jsPDF;
}

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


export default function AdminPage() {
  const firestore = useFirestore();

  // Memoize Firestore queries to prevent re-renders
  const guestsQuery = useMemoFirebase(() => 
    firestore ? query(collection(firestore, 'guests'), orderBy('createdAt', 'desc')) : null
  , [firestore]);
  
  const songsQuery = useMemoFirebase(() =>
    firestore ? query(collection(firestore, 'song_suggestions'), orderBy('submittedAt', 'desc')) : null
  , [firestore]);

  const { data: guests, isLoading: isLoadingGuests } = useCollection<Guest>(guestsQuery);
  const { data: songs, isLoading: isLoadingSongs } = useCollection<SongSuggestion>(songsQuery);

  const totalAttendees = useMemo(() => {
    return guests?.reduce((sum, guest) => sum + guest.attendees, 0) || 0;
  }, [guests]);


  const handleExportPDF = () => {
    const doc = new jsPDF() as jsPDFWithAutoTable;
    
    doc.setFontSize(18);
    doc.text('Reporte de Gala de Graduación', 14, 22);
    doc.setFontSize(11);
    doc.text(`Total de Asistentes Confirmados: ${totalAttendees}`, 14, 30);

    // Guests Table
    if (guests && guests.length > 0) {
      doc.autoTable({
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
      doc.autoTable({
        head: [['Canción', 'Artista', 'Fecha de Sugerencia']],
        body: songs.map(song => [
          song.songName,
          song.artistName,
          song.submittedAt?.toDate().toLocaleDateString('es-GT', { timeZone: 'America/Guatemala' }) || 'N/A'
        ]),
        headStyles: { fillColor: [0, 33, 71] }, // Dark blue
        didDrawPage: (data) => {
            // Add a title for the songs table if it's on a new page
             if (data.pageNumber > 1 || !guests || guests.length === 0) {
                doc.setFontSize(16);
                doc.text('Sugerencias de Canciones', 14, 15);
             }
        }
      });
    }

    doc.save('reporte_graduacion_gabriela.pdf');
  };

  const isLoading = isLoadingGuests || isLoadingSongs;

  return (
    <div className="min-h-screen bg-gray-100 p-4 sm:p-8">
      <div className="max-w-7xl mx-auto">
        <header className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-800">Panel de Administración</h1>
            <p className="text-gray-500">Resumen de confirmaciones y sugerencias.</p>
          </div>
          <Button onClick={handleExportPDF} disabled={isLoading || (!guests?.length && !songs?.length)}>
            <Download className="mr-2 h-4 w-4" />
            Exportar a PDF
          </Button>
        </header>

        <main className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle className="flex items-center"><Users className="mr-2 text-gray-600"/> Invitados Confirmados</CardTitle>
              {guests && <span className="text-lg font-bold text-gray-800">{totalAttendees} Asistentes</span>}
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
            <CardHeader>
              <CardTitle className="flex items-center"><Music className="mr-2 text-gray-600"/> Sugerencias de Canciones</CardTitle>
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
