import { MapPin, Clock, Shirt } from "lucide-react";
import { SectionTitle } from "./SectionTitle";
import { Map } from "./Map";

export function EventInfo() {
  const location = { lat: 14.622661818867536, lng: -90.55407579836148 };

  return (
    <section className="py-8 space-y-12">
      <SectionTitle className="font-dulcinea">Fiesta</SectionTitle>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="textured-card p-6 rounded-2xl flex flex-col items-center text-center text-[#000f31]">
          <Clock className="w-10 h-10 text-accent mb-3" />
          <h3 className="text-xl font-lato font-bold mb-1">Hora</h3>
          <p className="text-lg font-lato">7:30 PM</p>
        </div>

        <div className="textured-card p-6 rounded-2xl flex flex-col items-center text-center text-[#000f31]">
          <MapPin className="w-10 h-10 text-accent mb-3" />
          <h3 className="text-xl font-lato font-bold mb-1">Lugar</h3>
          <p className="text-lg font-lato">Tikal Futura</p>
          <p className="text-md text-[#000f31]/80">Salón Menta</p>
        </div>

        <div className="textured-card p-6 rounded-2xl flex flex-col items-center text-center text-[#000f31]">
          <Shirt className="w-10 h-10 text-accent mb-3" />
          <h3 className="text-xl font-lato font-bold mb-1">Dress Code</h3>
          <p className="text-lg font-lato">Formal</p>
          <p className="text-md text-[#000f31]/80">Color azul</p>
        </div>
      </div>
      
      <div className="rounded-lg overflow-hidden border border-border h-80 shadow-2xl">
        <Map center={location} />
      </div>
    </section>
  );
}
