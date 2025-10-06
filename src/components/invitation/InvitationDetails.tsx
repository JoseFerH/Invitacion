import { Gift } from 'lucide-react';

const DateSeparator = () => (
    <div className="flex items-center justify-center my-4">
      <div className="h-px w-16 bg-accent/30"></div>
      <div className="h-1 w-1 bg-accent/50 rounded-full mx-2"></div>
      <div className="h-px w-16 bg-accent/30"></div>
    </div>
)

export function InvitationDetails() {
  return (
    <section className="py-8 bg-card/30 backdrop-blur-sm rounded-2xl shadow-lg border border-accent/10 p-8 space-y-6">
      <div className="flex flex-col items-center justify-center text-center">
         <p className="text-3xl font-headline tracking-wider text-primary">SÁBADO</p>
         <DateSeparator />
         <p className="text-8xl font-bold text-accent font-headline -my-4">08</p>
         <DateSeparator />
         <p className="text-3xl font-headline tracking-wider text-primary">NOVIEMBRE 2025</p>
      </div>
      
      <div className="text-center text-foreground/90 text-lg leading-relaxed max-w-prose mx-auto font-body">
        <p className="italic">
            "Después de años llenos de ideas, colores, trazos y palabras que dieron forma a un sueño, ha llegado el momento de celebrar el resultado de esa dedicación."
        </p>
        <p className="mt-6 font-semibold text-primary">
            ¡Acompáñame a celebrar! Será una noche especial, donde cada sonrisa será parte del diseño de un recuerdo inolvidable.
        </p>
      </div>

      <div className="flex items-center justify-center text-accent/80 font-body">
        <Gift className="w-6 h-6 mr-3" />
        <p className="font-bold text-lg">Tu presencia será el mejor regalo</p>
      </div>
    </section>
  );
}
