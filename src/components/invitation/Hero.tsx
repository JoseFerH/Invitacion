import { GraduationCap } from 'lucide-react';

export function Hero() {
  return (
    <header className="py-12 space-y-6">
       <div className="flex justify-center">
        <div className="relative">
          <GraduationCap className="w-24 h-24 text-primary" strokeWidth={1.5} />
          <div className="absolute top-0 left-0 w-full h-full flex items-center justify-center">
             <span className="text-accent animate-ping absolute inline-flex h-3 w-3 rounded-full bg-accent/75 opacity-75"></span>
             <span className="relative inline-flex rounded-full h-2 w-2 bg-accent"></span>
          </div>
        </div>
       </div>

      <div>
        <p className="text-lg md:text-xl text-foreground/80 font-body">
            Hoy culmino una etapa importante y deseo celebrarla contigo
        </p>
        <h1 className="text-6xl md:text-8xl font-great-vibes text-primary my-4">
            Mi Graduación
        </h1>
      </div>
      
      <div className="max-w-xl mx-auto text-foreground/90 font-body">
        <p className="text-lg md:text-xl">
          Celebrando la graduación de
        </p>
        <p className="text-2xl md:text-3xl font-bold font-headline text-primary mt-2 uppercase tracking-wider">
          GABRIELA ALVARADO DURANTE
        </p>
         <p className="text-lg md:text-xl mt-4">
          de la <span className="font-bold text-accent">Licenciatura en Comunicación y Diseño Gráfico</span>
        </p>
      </div>
    </header>
  );
}
