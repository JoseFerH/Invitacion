"use client";

import { useState, useTransition, useCallback } from "react";
import Image from "next/image";
import { searchSongs, submitSongSuggestions, type SpotifySong } from "@/app/actions";
import { useDebounce } from "@/hooks/use-debounce";
import { useToast } from "@/hooks/use-toast";
import { Card, CardContent } from "@/components/ui/card";
import { SectionTitle } from "./SectionTitle";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Music, Search, Trash2, Loader2, PartyPopper } from "lucide-react";

export function SongSuggest() {
  const { toast } = useToast();
  const [query, setQuery] = useState("");
  const debouncedQuery = useDebounce(query, 300);
  const [isSearching, startSearchTransition] = useTransition();
  const [isSubmitting, startSubmitTransition] = useTransition();

  const [searchResults, setSearchResults] = useState<SpotifySong[]>([]);
  const [selectedSongs, setSelectedSongs] = useState<SpotifySong[]>([]);

  const handleSearch = useCallback((searchQuery: string) => {
    if (searchQuery.length < 2) {
      setSearchResults([]);
      return;
    }
    startSearchTransition(async () => {
      const results = await searchSongs(searchQuery);
      setSearchResults(results);
    });
  }, []);

  useState(() => {
    handleSearch(debouncedQuery);
  });

  const addSong = (song: SpotifySong) => {
    if (!selectedSongs.find(s => s.id === song.id)) {
      setSelectedSongs(prev => [...prev, song]);
    }
  };

  const removeSong = (songId: string) => {
    setSelectedSongs(prev => prev.filter(s => s.id !== songId));
  };

  const handleSubmit = () => {
    if (selectedSongs.length === 0) {
        toast({ title: "Sin canciones", description: "Agrega al menos una canción a tu lista.", variant: "destructive"});
        return;
    }
    startSubmitTransition(async () => {
      const result = await submitSongSuggestions(selectedSongs);
      if (result.success) {
        toast({ title: "¡Gracias!", description: result.message, className: "bg-primary text-primary-foreground" });
        setSelectedSongs([]);
      } else {
        toast({ title: "Error", description: result.message, variant: "destructive"});
      }
    });
  };

  return (
    <section>
      <Card className="bg-card/80 backdrop-blur-sm border-accent/20 shadow-lg">
        <CardContent className="p-6 sm:p-8">
          <SectionTitle>¡Ponle ritmo a la fiesta!</SectionTitle>
          <p className="text-center text-foreground/80 -mt-4 mb-6 max-w-md mx-auto">Sugiere canciones para que el DJ las ponga en la fiesta.</p>
          
          <div className="grid md:grid-cols-2 gap-8">
            {/* Search Column */}
            <div className="space-y-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                <Input
                  type="text"
                  placeholder="Busca una canción o artista..."
                  value={query}
                  onChange={e => setQuery(e.target.value)}
                  className="pl-10"
                />
              </div>
              <ScrollArea className="h-64 rounded-md border p-2 bg-secondary/30">
                {isSearching && <div className="flex justify-center items-center h-full"><Loader2 className="h-8 w-8 animate-spin text-primary" /></div>}
                {!isSearching && searchResults.length === 0 && (
                  <div className="flex flex-col justify-center items-center h-full text-muted-foreground">
                    <Music className="h-8 w-8 mb-2" />
                    <p className="text-sm">Resultados de la búsqueda aquí</p>
                  </div>
                )}
                <div className="space-y-2">
                {searchResults.map(song => (
                  <div key={song.id} onClick={() => addSong(song)} className="flex items-center gap-3 p-2 rounded-md hover:bg-accent/20 cursor-pointer">
                    <Image src={song.albumArt} alt={song.name} width={40} height={40} className="rounded" />
                    <div className="text-left flex-grow overflow-hidden">
                      <p className="font-semibold truncate">{song.name}</p>
                      <p className="text-sm text-muted-foreground truncate">{song.artist}</p>
                    </div>
                  </div>
                ))}
                </div>
              </ScrollArea>
            </div>

            {/* Selected Songs Column */}
            <div className="space-y-4">
              <h3 className="font-bold text-lg text-primary text-left">Tu lista de sugerencias</h3>
              <ScrollArea className="h-64 rounded-md border p-2 bg-secondary/30">
                {selectedSongs.length === 0 && (
                  <div className="flex flex-col justify-center items-center h-full text-muted-foreground">
                    <PartyPopper className="h-8 w-8 mb-2" />
                    <p className="text-sm text-center">Tus canciones seleccionadas aparecerán aquí</p>
                  </div>
                )}
                 <div className="space-y-2">
                {selectedSongs.map(song => (
                  <div key={song.id} className="flex items-center gap-3 p-2 rounded-md bg-background/50">
                    <Image src={song.albumArt} alt={song.name} width={40} height={40} className="rounded" />
                     <div className="text-left flex-grow overflow-hidden">
                      <p className="font-semibold truncate">{song.name}</p>
                      <p className="text-sm text-muted-foreground truncate">{song.artist}</p>
                    </div>
                    <Button variant="ghost" size="icon" onClick={() => removeSong(song.id)} className="text-muted-foreground hover:text-destructive">
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                ))}
                </div>
              </ScrollArea>
            </div>
          </div>
           <Button onClick={handleSubmit} disabled={isSubmitting || selectedSongs.length === 0} className="w-full md:w-1/2 mx-auto mt-6">
            {isSubmitting ? <><Loader2 className="mr-2 h-4 w-4 animate-spin"/> Enviando...</> : "Enviar Sugerencias"}
          </Button>
        </CardContent>
      </Card>
    </section>
  );
}
