
"use client";

import { APIProvider, Map as GoogleMap, Marker } from "@vis.gl/react-google-maps";

type MapProps = {
  center: { lat: number; lng: number };
};

export function Map({ center }: MapProps) {
  const apiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;

  if (!apiKey) {
    return (
      <div className="flex items-center justify-center h-full bg-destructive/10 text-destructive p-4 text-center border border-destructive/50 rounded-lg">
        <div>
          <p className="font-bold">Error de Configuración del Mapa</p>
          <p className="text-sm">La variable de entorno `NEXT_PUBLIC_GOOGLE_MAPS_API_KEY` no está configurada en tu archivo `.env`. Por favor, añade la clave para que el mapa pueda cargarse.</p>
        </div>
      </div>
    );
  }

  return (
    <APIProvider apiKey={apiKey}>
      <GoogleMap
        defaultCenter={center}
        defaultZoom={15}
        mapId="gala-map"
        gestureHandling="cooperative"
        style={{ borderRadius: 'inherit' }}
      >
        <Marker position={center} />
      </GoogleMap>
    </APIProvider>
  );
}
