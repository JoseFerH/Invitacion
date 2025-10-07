
const DateSeparator = () => (
    <div className="flex items-center justify-center my-2 text-primary/50 text-2xl font-headline tracking-widest">
      <span className="px-4">|</span>
    </div>
)

export function InvitationDetails() {
  return (
    <section className="py-8 space-y-6">
      <div className="flex flex-row flex-wrap items-center justify-center text-center font-dulcinea text-5xl text-primary">
         <p>Sábado</p>
         <DateSeparator />
         <p>08 de noviembre</p>
         <DateSeparator />
         <p>2025</p>
      </div>
      
      <div className="text-center text-foreground/80 text-lg leading-relaxed max-w-prose mx-auto font-body italic">
        <p>
            "Después de años llenos de ideas, colores, trazos y palabras que dieron forma a un sueño, ha llegado el momento de celebrar el resultado de esa dedicación."
        </p>
      </div>
    </section>
  );
}
