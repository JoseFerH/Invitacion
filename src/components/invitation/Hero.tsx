import Image from 'next/image';

export function Hero() {
  return (
    <header className="py-12 space-y-6">
       <div className="flex justify-center">
          <Image src="/assets/Sombrerosvg.svg" alt="Gorro de graduación" width={154} height={154} className="text-primary" />
       </div>

      <div>
        <p className="text-2xl md:text-2xl text-foreground/80 font-body font-thin">
            Te invitamos a celebrar la fiesta de graduación de
        </p>
        <h1 className="text-9xl md:text-9xl font-great-vibes text-primary my-4">
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
