
"use client";

import { APIProvider, Map as GoogleMap, Marker } from "@vis.gl/react-google-maps";

type MapProps = {
  center: { lat: number; lng: number };
};

// Estilo oscuro para el mapa de Google, inspirado en el tema del sitio.
const mapStyles: google.maps.MapTypeStyle[] = [
  { elementType: "geometry", stylers: [{ color: "#1d2c4d" }] },
  { elementType: "labels.text.fill", stylers: [{ color: "#8ec3b9" }] },
  { elementType: "labels.text.stroke", stylers: [{ color: "#1a3646" }] },
  {
    featureType: "administrative.country",
    elementType: "geometry.stroke",
    stylers: [{ color: "#4b6878" }],
  },
  {
    featureType: "administrative.land_parcel",
    elementType: "labels.text.fill",
    stylers: [{ color: "#64779e" }],
  },
  {
    featureType: "administrative.province",
    elementType: "geometry.stroke",
    stylers: [{ color: "#4b6878" }],
  },
  {
    featureType: "landscape.man_made",
    elementType: "geometry.stroke",
    stylers: [{ color: "#334e87" }],
  },
  {
    featureType: "landscape.natural",
    elementType: "geometry",
    stylers: [{ color: "#023e58" }],
  },
  { featureType: "poi", elementType: "geometry", stylers: [{ color: "#283d6a" }] },
  {
    featureType: "poi",
    elementType: "labels.text.fill",
    stylers: [{ color: "#6f9ba5" }],
  },
  {
    featureType: "poi",
    elementType: "labels.text.stroke",
    stylers: [{ color: "#1d2c4d" }],
  },
  {
    featureType: "poi.park",
    elementType: "geometry.fill",
    stylers: [{ color: "#023e58" }],
  },
  {
    featureType: "poi.park",
    elementType: "labels.text.fill",
    stylers: [{ color: "#3C7680" }],
  },
  { featureType: "road", elementType: "geometry", stylers: [{ color: "#304a7d" }] },
  {
    featureType: "road",
    elementType: "labels.text.fill",
    stylers: [{ color: "#98a5be" }],
  },
  {
    featureType: "road",
    elementType: "labels.text.stroke",
    stylers: [{ color: "#1d2c4d" }],
  },
  {
    featureType: "road.highway",
    elementType: "geometry",
    stylers: [{ color: "#2c6675" }],
  },
  {
    featureType: "road.highway",
    elementType: "geometry.stroke",
    stylers: [{ color: "#255763" }],
  },
  {
    featureType: "road.highway",
    elementType: "labels.text.fill",
    stylers: [{ color: "#b0d5ce" }],
  },
  {
    featureType: "road.highway",
    elementType: "labels.text.stroke",
    stylers: [{ color: "#023e58" }],
  },
  {
    featureType: "transit",
    elementType: "labels.text.fill",
    stylers: [{ color: "#98a5be" }],
  },
  {
    featureType: "transit",
    elementType: "labels.text.stroke",
    stylers: [{ color: "#1d2c4d" }],
  },
  {
    featureType: "transit.line",
    elementType: "geometry.fill",
    stylers: [{ color: "#283d6a" }],
  },
  {
    featureType: "transit.station",
    elementType: "geometry",
    stylers: [{ color: "#3a4762" }],
  },
  { featureType: "water", elementType: "geometry", stylers: [{ color: "#0e1626" }] },
  {
    featureType: "water",
    elementType: "labels.text.fill",
    stylers: [{ color: "#4e6d70" }],
  },
];


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
        styles={mapStyles}
        style={{ borderRadius: 'inherit' }}
      >
        <Marker position={center} />
      </GoogleMap>
    </APIProvider>
  );
}
