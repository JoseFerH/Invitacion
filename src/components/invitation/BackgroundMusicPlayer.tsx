"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";
import { getBackgroundTrack, type SpotifyBackgroundTrack } from "@/app/actions";
import { Button } from "@/components/ui/button";
import { Volume2, VolumeX, Music4, ExternalLink } from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";

const DEFAULT_BACKGROUND_TRACK = process.env.NEXT_PUBLIC_BACKGROUND_SPOTIFY_TRACK_ID ?? "11dFghVXANMlKmJXsNCbNl";

type Status = "idle" | "loading" | "ready" | "error";

export function BackgroundMusicPlayer({
  trackId = DEFAULT_BACKGROUND_TRACK,
  className,
}: {
  trackId?: string;
  className?: string;
}) {
  const [track, setTrack] = useState<SpotifyBackgroundTrack | null>(null);
  const [status, setStatus] = useState<Status>("idle");
  const [autoplayBlocked, setAutoplayBlocked] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    let isMounted = true;

    async function loadTrack() {
      if (!trackId) {
        setStatus("error");
        return;
      }

      setStatus("loading");
      const result = await getBackgroundTrack(trackId);

      if (!isMounted) {
        return;
      }

      if (!result) {
        setStatus("error");
        return;
      }

      setTrack(result);
      setStatus("ready");
    }

    loadTrack();

    return () => {
      isMounted = false;
    };
  }, [trackId]);

  useEffect(() => {
    if (status !== "ready" || !track?.previewUrl) {
      return;
    }

    const audio = audioRef.current;
    if (!audio) {
      return;
    }

    audio.loop = true;
    audio.volume = 0.45;

    const attemptPlay = async () => {
      try {
        await audio.play();
        setAutoplayBlocked(false);
        setIsPlaying(true);
      } catch (error) {
        console.warn("Autoplay blocked:", error);
        setAutoplayBlocked(true);
        setIsPlaying(false);
      }
    };

    attemptPlay();
  }, [status, track?.previewUrl]);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) {
      return;
    }

    const handlePlay = () => setIsPlaying(true);
    const handlePause = () => setIsPlaying(false);

    audio.addEventListener("play", handlePlay);
    audio.addEventListener("pause", handlePause);

    return () => {
      audio.removeEventListener("play", handlePlay);
      audio.removeEventListener("pause", handlePause);
    };
  }, [track?.previewUrl]);

  const isPlayable = status === "ready" && !!track?.previewUrl;

  const togglePlayback = useCallback(async () => {
    const audio = audioRef.current;
    if (!audio) {
      return;
    }

    if (audio.paused) {
      try {
        await audio.play();
        setAutoplayBlocked(false);
        setIsPlaying(true);
      } catch (error) {
        console.error("Error al reproducir la canción de fondo:", error);
        setAutoplayBlocked(true);
        setIsPlaying(false);
      }
    } else {
      audio.pause();
      setIsPlaying(false);
    }
  }, []);

  if (!trackId || status === "idle") {
    return null;
  }

  return (
    <div
      className={cn(
        "pointer-events-auto fixed bottom-6 right-6 z-30 max-w-sm text-left",
        "drop-shadow-lg",
        className,
      )}
    >
      <div className="textured-card overflow-hidden rounded-2xl border border-white/10 bg-white/90 p-4 text-[#000f31] shadow-lg backdrop-blur">
        <div className="flex items-start gap-3">
          <div className="relative h-16 w-16 overflow-hidden rounded-xl bg-[#000f31]/10">
            {track?.albumArt ? (
              <Image src={track.albumArt} alt={track?.name ?? "Canción de fondo"} fill sizes="64px" className="object-cover" />
            ) : (
              <div className="flex h-full w-full items-center justify-center text-[#000f31]/50">
                <Music4 className="h-8 w-8" />
              </div>
            )}
          </div>

          <div className="flex-1 space-y-1">
            <p className="text-xs uppercase tracking-wide text-[#000f31]/60">Canción de fondo</p>
            {status === "loading" && <p className="text-sm text-[#000f31]/70">Cargando canción...</p>}
            {status === "error" && <p className="text-sm text-red-600">No se pudo cargar la canción.</p>}
            {status === "ready" && track && (
              <>
                <p className="font-semibold leading-tight">{track.name}</p>
                <p className="text-sm text-[#000f31]/70">{track.artist}</p>
              </>
            )}

            {track?.externalUrl && (
              <Link
                href={track.externalUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 text-xs font-semibold text-[#000f31]/70 hover:text-[#000f31]"
              >
                Escuchar en Spotify <ExternalLink className="h-3 w-3" />
              </Link>
            )}

            {isPlayable && autoplayBlocked && (
              <p className="text-xs text-[#000f31]/70">Haz clic en reproducir para activar la música.</p>
            )}
            {status === "ready" && !track?.previewUrl && (
              <p className="text-xs text-[#000f31]/70">
                Esta canción no tiene vista previa disponible en Spotify. Elige otra pista con preview para reproducirla aquí.
              </p>
            )}
          </div>
        </div>

        {isPlayable && (
          <div className="mt-3 flex items-center justify-between">
            <Button
              type="button"
              variant="secondary"
              size="sm"
              className="rounded-full bg-[#000f31] text-white hover:bg-[#002147]"
              onClick={togglePlayback}
            >
              {isPlaying ? (
                <>
                  <VolumeX className="mr-2 h-4 w-4" />
                  Pausar
                </>
              ) : (
                <>
                  <Volume2 className="mr-2 h-4 w-4" />
                  Reproducir
                </>
              )}
            </Button>
            <span className="text-xs text-[#000f31]/60">Se reproducirá en bucle</span>
          </div>
        )}
      </div>

      {track?.previewUrl && (
        <audio ref={audioRef} src={track.previewUrl} preload="auto" loop />
      )}
    </div>
  );
}
