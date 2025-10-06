import { Card, CardContent } from "@/components/ui/card";
import { Camera } from "lucide-react";
import { SectionTitle } from "./SectionTitle";

export function PhotoSection() {
  return (
    <section>
      <Card className="bg-card/80 backdrop-blur-sm border-accent/20 shadow-lg border-dashed">
        <CardContent className="p-6 sm:p-8">
            <div className="flex flex-col items-center justify-center text-center text-muted-foreground">
                <Camera className="w-12 h-12 mb-4" />
                 <SectionTitle className="text-primary/80 mb-2">Recuerdos Compartidos</SectionTitle>
                 <p className="text-lg font-semibold">
                    AQUÍ PODRÁS SUBIR LAS FOTOS QUE TOMES PARA COMPARTIR TU EXPERIENCIA EN LA FIESTA
                 </p>
                 <p className="mt-2 text-sm">(Función próximamente disponible)</p>
            </div>
        </CardContent>
      </Card>
    </section>
  );
}
