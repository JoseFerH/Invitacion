import { MapPin, Clock, Shirt } from "lucide-react";
import { SectionTitle } from "./SectionTitle";
import { Map } from "./Map";

export function EventInfo() {
  const location = { lat: 14.622661818867536, lng: -90.55407579836148 };

  return (
    <section className="py-8 space-y-8">
      <SectionTitle className="font-dulcinea">Fiesta</SectionTitle>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center text-foreground">
        <div className="flex flex-col items-center p-4">
          <Clock className="w-10 h-10 text-accent mb-3" />
          <h3 className="text-xl font-headline font-semibold">7:30 PM</h3>
        </div>
        <div className="flex flex-col items-center p-4">
          <MapPin className="w-10 h-10 text-accent mb-3" />
          <h3 className="text-xl font-headline font-semibold">Tikal Futura</h3>
          <p className="text-sm text-foreground/80">Salón Menta</p>
        </div>
        <div className="flex flex-col items-center p-4">
          <Shirt className="w-10 h-10 text-accent mb-3" />
          <h3 className="text-xl font-headline font-semibold">Formal</h3>
          <p className="text-sm text-foreground/80">Color azul</p>
        </div>
      </div>
      <div className="rounded-lg overflow-hidden border border-border h-80 shadow-2xl">
        <Map center={location} />
      </div>
    </section>
  );
}
