import { CalendarDays, Gift } from 'lucide-react';

export function InvitationDetails() {
  return (
    <section className="py-8">
      <div className="flex flex-col items-center justify-center text-center">
         <CalendarDays className="w-16 h-16 text-accent mb-4" />
         <p className="text-3xl font-bold text-primary font-headline tracking-wider">NOVIEMBRE</p>
         <p className="text-7xl font-extrabold text-primary font-headline my-2">08</p>
         <p className="text-3xl font-bold text-primary font-headline tracking-wider">SÁBADO, 2025</p>
      </div>
      <div className="border-t border-accent/20 my-8"></div>
      <div className="text-center text-foreground/90 text-lg leading-relaxed max-w-prose mx-auto">
        <p className="italic">
            "Después de años llenos de ideas, colores, trazos y palabras que dieron forma a un sueño, ha llegado el momento de celebrar el resultado de esa dedicación."
        </p>
        <p className="mt-6 font-semibold text-primary">
            Celebremos juntos la Graduación de Gabriela Alvarado Durante en Comunicación y Diseño Gráfico.
        </p>
        <p className="mt-4">
            Será una noche especial, donde cada sonrisa será parte del diseño de un recuerdo inolvidable.
        </p>
      </div>
      <div className="flex items-center justify-center mt-8 text-accent">
        <Gift className="w-6 h-6 mr-3" />
        <p className="font-bold text-lg">¡Tu presencia será el mejor regalo!</p>
      </div>
    </section>
  );
}
