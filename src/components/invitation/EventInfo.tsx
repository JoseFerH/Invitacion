import { MapPin, Clock, Shirt } from "lucide-react";
import { SectionTitle } from "./SectionTitle";
import { Map } from "./Map";

export function EventInfo() {
  // Coordenadas actualizadas para el lugar del evento.
  const location = { lat: 14.622661818867536, lng: -90.55407579836148 };

  return (
    <section className="py-8 space-y-8">
      <SectionTitle>Celebración</SectionTitle>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
        <div className="flex flex-col items-center p-6 bg-card/50 rounded-xl shadow-lg backdrop-blur-sm">
          <Clock className="w-10 h-10 text-accent mb-3" />
          <h3 className="text-xl font-headline font-bold text-primary">Hora</h3>
          <p className="text-foreground text-2xl font-body">7:30 PM</p>
        </div>
        <div className="flex flex-col items-center p-6 bg-card/50 rounded-xl shadow-lg backdrop-blur-sm">
          <MapPin className="w-10 h-10 text-accent mb-3" />
          <h3 className="text-xl font-headline font-bold text-primary">Lugar</h3>
          <p className="text-foreground text-lg font-body">Hotel Tikal Futura</p>
          <p className="text-foreground/80 font-body">Salón Menta</p>
        </div>
        <div className="flex flex-col items-center p-6 bg-card/50 rounded-xl shadow-lg backdrop-blur-sm">
          <Shirt className="w-10 h-10 text-accent mb-3" />
          <h3 className="text-xl font-headline font-bold text-primary">Dress Code:</h3>
          <p className="text-foreground text-lg font-body">Formal Azul</p>
        </div>
      </div>
      <div className="rounded-lg overflow-hidden border-2 border-accent/20 h-80 shadow-2xl">
        <Map center={location} />
      </div>
    </section>
  );
}
