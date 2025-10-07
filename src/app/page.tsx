

import Image from 'next/image';
import { Hero } from '@/components/invitation/Hero';
import { InvitationDetails } from '@/components/invitation/InvitationDetails';
import { EventInfo } from '@/components/invitation/EventInfo';
import { RsvpForm } from '@/components/invitation/RsvpForm';
import { SongSuggest } from '@/components/invitation/SongSuggest';
import { PhotoSection } from '@/components/invitation/PhotoSection';
import { StarsBackground } from '@/components/invitation/StarsBackground';
import { AddToCalendar } from '@/components/invitation/AddToCalendar';
import { SectionTitle } from '@/components/invitation/SectionTitle';


export default function Home() {
  return (
    <div className="relative min-h-screen w-full overflow-x-hidden bg-gradient-to-r from-[#002147] to-[#000f31]">
      <StarsBackground />

      <main className="relative z-10 container mx-auto max-w-2xl p-4 sm:p-8 space-y-16 text-center">
        <Hero />
        
        <div className="space-y-8">
          <InvitationDetails />
          <AddToCalendar />
        </div>

        <EventInfo />
        
        <section>
          <SectionTitle className="font-dulcinea">Confirmar Asistencia</SectionTitle>
          <div className="textured-card p-6 sm:p-8 rounded-2xl">
            <RsvpForm />
          </div>
        </section>
        
        <section>
          <SectionTitle className="font-dulcinea">¡Ponle ritmo a la fiesta!</SectionTitle>
          <div className="textured-card p-6 sm:p-8 rounded-2xl">
            <SongSuggest />
          </div>
        </section>

        <section>
          <SectionTitle className="font-dulcinea">Recuerdos Compartidos</SectionTitle>
          <div className="textured-card p-6 sm:p-8 rounded-2xl">
            <PhotoSection />
          </div>
        </section>
        
        <footer className="flex justify-end text-right text-foreground/50 text-sm font-body py-8">
          <a href="https://www.instagram.com/creatisolutionsgt?igsh=MWNkb3RrMnIwMGtlaA==" target="_blank" rel="noopener noreferrer" className="flex flex-col items-center hover:text-primary transition-colors">
            <p>Diseñado y elaborado por Creati Solutions</p>
            <Image src="/assets/creatisvg.svg" alt="Creati Solutions Logo" width={96} height={48} className="mt-2" />
          </a>
        </footer>
      </main>
    </div>
  );
}
