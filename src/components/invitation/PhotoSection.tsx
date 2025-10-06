import { Camera } from "lucide-react";
import { SectionTitle } from "./SectionTitle";

export function PhotoSection() {
  return (
    <section className="py-8">
      <div className="text-center p-8 border-2 border-dashed border-accent/20 rounded-lg bg-card/50 backdrop-blur-sm shadow-lg">
        <div className="flex flex-col items-center justify-center text-muted-foreground">
            <Camera className="w-12 h-12 mb-4" />
              <SectionTitle className="text-primary/80 mb-2">Recuerdos Compartidos</SectionTitle>
              <p className="text-lg font-semibold">
                AQUÍ PODRÁS SUBIR LAS FOTOS QUE TOMES PARA COMPARTIR TU EXPERIENCIA EN LA FIESTA
              </p>
              <p className="mt-2 text-sm">(Función próximamente disponible)</p>
        </div>
      </div>
    </section>
  );
}
