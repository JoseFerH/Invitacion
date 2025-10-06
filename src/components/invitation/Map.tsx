
"use client";

import { APIProvider, Map as GoogleMap, Marker } from "@vis.gl/react-google-maps";

type MapProps = {
  center: { lat: number; lng: number };
};

export function Map({ center }: MapProps) {
  const apiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;

  if (!apiKey) {
    return (
      <div className="flex items-center justify-center h-full bg-secondary text-secondary-foreground p-4 text-center">
        <p>No se pudo cargar el mapa. La variable de entorno NEXT_PUBLIC_GOOGLE_MAPS_API_KEY no está configurada. Por favor, revisa tu archivo .env.local.</p>
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
      >
        <Marker position={center} />
      </GoogleMap>
    </APIProvider>
  );
}
