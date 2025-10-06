import { Camera } from "lucide-react";
import { SectionTitle } from "./SectionTitle";

export function PhotoSection() {
  return (
    <section className="py-8 text-center">
        <SectionTitle>Recuerdos Compartidos</SectionTitle>
        <div className="flex flex-col items-center justify-center text-foreground/80">
            <p className="max-w-md mx-auto">
              Aquí podrás subir las fotos que tomes en la fiesta, para compartir los recuerdos
            </p>
            <p className="mt-2 text-sm font-bold">(Función próximamente disponible)</p>
        </div>
    </section>
  );
}
