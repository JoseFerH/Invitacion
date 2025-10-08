import Image from 'next/image';

export function Hero() {
  return (
    <header className="py-12 space-y-10">
      <div className="flex justify-center">
        <Image
          src="/assets/Sombrerosvg.svg"
          alt="Gorro de graduación"
          width={154}
          height={154}
          className="text-primary"
        />
      </div>

      <div>
        <p className="text-2xl md:text-2xl text-foreground/80 font-lato font-light mt-20">
          Te invitamos a celebrar la fiesta de graduación de
        </p>
        <div className="flex justify-center my-12">
            <Image
                src="/assets/Recurso 4svg.svg"
                alt="Gabriela"
                width={500}
                height={200}
                className="w-full max-w-lg"
            />
        </div>
      </div>

      {/* <div className="max-w-xl mx-auto text-foreground/90 font-body">
        <p className="text-lg md:text-xl font-semibold text-accent tracking-wider">
          
        </p>
      </div> */}
    </header>
  );
}
