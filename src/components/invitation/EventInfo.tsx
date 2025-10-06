import { Card, CardContent } from "@/components/ui/card";
import { MapPin, Clock, Shirt } from "lucide-react";
import { SectionTitle } from "./SectionTitle";
import { Map } from "./Map";

export function EventInfo() {
  const location = { lat: 14.6133, lng: -90.5594 };

  return (
    <section>
      <Card className="bg-card/80 backdrop-blur-sm border-accent/20 shadow-lg">
        <CardContent className="p-6 sm:p-8">
          <SectionTitle>Celebración</SectionTitle>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div className="flex flex-col items-center">
              <Clock className="w-10 h-10 text-accent mb-2" />
              <h3 className="text-xl font-bold text-primary">Hora</h3>
              <p className="text-foreground text-2xl font-headline">7:30 PM</p>
            </div>
            <div className="flex flex-col items-center">
              <MapPin className="w-10 h-10 text-accent mb-2" />
              <h3 className="text-xl font-bold text-primary">Lugar</h3>
              <p className="text-foreground text-lg">HOTEL TIKAL FUTURA</p>
              <p className="text-foreground/80">Salón Menta</p>
            </div>
            <div className="flex flex-col items-center">
              <Shirt className="w-10 h-10 text-accent mb-2" />
              <h3 className="text-xl font-bold text-primary">Código de Vestimenta</h3>
              <p className="text-foreground text-lg">Formal Azul</p>
            </div>
          </div>
          <div className="mt-8 rounded-lg overflow-hidden border-2 border-accent/20 h-80">
            <Map center={location} />
          </div>
        </CardContent>
      </Card>
    </section>
  );
}
