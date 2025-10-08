"use client";

import { useState, useTransition, useCallback, useEffect } from "react";
import Image from "next/image";
import { searchSongs, submitSongSuggestions, type SpotifySong } from "@/app/actions";
import { useDebounce } from "@/hooks/use-debounce";
import { useToast } from "@/hooks/use-toast";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Music, Search, Trash2, Loader2, PartyPopper, ListMusic } from "lucide-react";
import { Badge } from "@/components/ui/badge";

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

  useEffect(() => {
    handleSearch(debouncedQuery);
  },[debouncedQuery, handleSearch]);

  const addSong = (song: SpotifySong) => {
    if (!selectedSongs.find(s => s.id === song.id) && selectedSongs.length < 10) {
      setSelectedSongs(prev => [...prev, song]);
      setQuery(""); // Limpiar el campo de búsqueda
      setSearchResults([]); // Limpiar resultados
    } else if (selectedSongs.length >= 10) {
      toast({ title: "Límite alcanzado", description: "Puedes sugerir un máximo de 10 canciones.", variant: "destructive"});
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
    <section className="pt-2 font-body text-[#000f31]">
      <p className="text-center text-[#000f31]/80 mb-6 max-w-md mx-auto">Sugiere canciones para que el DJ las ponga en la fiesta.</p>
      
      <div className="flex flex-col md:flex-row gap-6 md:gap-8">
        
        {/* Panel de Búsqueda */}
        <div className="flex-1 space-y-4">
          <h3 className="font-bold text-lg flex items-center"><Search className="mr-2 h-5 w-5"/> Busca canciones</h3>
          <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground text-[#000f31]/70" />
              <Input
                id="song-search"
                type="text"
                placeholder="Busca una canción o artista..."
                value={query}
                onChange={e => setQuery(e.target.value)}
                className="pl-10 bg-white border-[#000f31]/50 text-lg text-[#000f31] placeholder:text-[#000f31]/70"
              />
          </div>
          <ScrollArea className="h-64 rounded-md border border-[#000f31]/30 p-2 bg-transparent">
              {isSearching && <div className="flex justify-center items-center h-full"><Loader2 className="h-8 w-8 animate-spin text-[#000f31]" /></div>}
              {!isSearching && searchResults.length === 0 && (
              <div className="flex flex-col justify-center items-center h-full text-[#000f31]/70 text-center p-4">
                  <Music className="h-8 w-8 mb-2" />
                  <p className="text-sm">Busca y selecciona tus canciones favoritas para añadirlas a la lista.</p>
              </div>
              )}
              <div className="space-y-2">
              {searchResults.map(song => (
              <div key={song.id} onClick={() => addSong(song)} className="flex items-center gap-3 p-2 rounded-md hover:bg-[#000f31]/10 cursor-pointer">
                  <Image src={song.albumArt} alt={song.name} width={40} height={40} className="rounded" />
                  <div className="text-left flex-grow overflow-hidden">
                  <p className="font-semibold truncate text-[#000f31]">{song.name}</p>
                  <p className="text-sm text-[#000f31]/70 truncate">{song.artist}</p>
                  </div>
              </div>
              ))}
              </div>
          </ScrollArea>
        </div>

        {/* Panel de Lista de Sugerencias */}
        <div className="flex-1 space-y-4">
          <h3 className="font-bold text-lg flex items-center">
            <ListMusic className="mr-2 h-5 w-5"/> 
            Tu lista 
            <Badge variant="secondary" className="ml-2 rounded-full">{selectedSongs.length}</Badge>
          </h3>
          <ScrollArea className="h-64 rounded-md border border-[#000f31]/30 p-2 bg-transparent">
              {selectedSongs.length === 0 && (
              <div className="flex flex-col justify-center items-center h-full text-[#000f31]/70 text-center p-4">
                  <PartyPopper className="h-8 w-8 mb-2" />
                  <p className="text-sm">Tus canciones seleccionadas aparecerán aquí. ¡Puedes sugerir hasta 10!</p>
              </div>
              )}
              <div className="space-y-2">
              {selectedSongs.map(song => (
              <div key={song.id} className="flex items-center gap-3 p-2 rounded-md bg-black/5">
                  <Image src={song.albumArt} alt={song.name} width={40} height={40} className="rounded" />
                  <div className="text-left flex-grow overflow-hidden">
                    <p className="font-semibold truncate text-[#000f31]">{song.name}</p>
                    <p className="text-sm text-[#000f31]/70 truncate">{song.artist}</p>
                  </div>
                  <Button variant="ghost" size="icon" onClick={() => removeSong(song.id)} className="text-[#000f31]/70 hover:text-destructive">
                  <Trash2 className="h-4 w-4" />
                  </Button>
              </div>
              ))}
              </div>
          </ScrollArea>
        </div>

      </div>

      <div className="mt-6 text-center">
        <Button onClick={handleSubmit} disabled={isSubmitting || selectedSongs.length === 0} size="lg" className="w-full md:w-auto mx-auto bg-[#000f31] hover:bg-[#002147] text-white hover:text-white font-bold rounded-full px-12">
          {isSubmitting ? <><Loader2 className="mr-2 h-4 w-4 animate-spin"/> Enviando...</> : "Enviar Sugerencias"}
        </Button>
      </div>
    </section>
  );
}
