import Image from 'next/image';

export function Hero() {
  return (
    <header className="py-12 space-y-6">
       <div className="flex justify-center">
          <Image src="/assets/Sombrerosvg.svg" alt="Gorro de graduación" width={96} height={96} className="text-primary" />
       </div>

      <div>
        <p className="text-lg md:text-xl text-foreground/80 font-body">
            Te invitamos a celebrar la fiesta de graduación de
        </p>
        <h1 className="text-7xl md:text-9xl font-great-vibes text-primary my-4">
            Gabriela
        </h1>
      </div>
      
      <div className="max-w-xl mx-auto text-foreground/90 font-body">
        <p className="text-lg md:text-xl font-semibold text-accent tracking-wider">
          Licenciada en Comunicación y Diseño Gráfico
        </p>
      </div>
    </header>
  );
}
