import { Hero } from '@/components/invitation/Hero';
import { InvitationDetails } from '@/components/invitation/InvitationDetails';
import { EventInfo } from '@/components/invitation/EventInfo';
import { RsvpForm } from '@/components/invitation/RsvpForm';
import { SongSuggest } from '@/components/invitation/SongSuggest';
import { PhotoSection } from '@/components/invitation/PhotoSection';
import { StarsBackground } from '@/components/invitation/StarsBackground';
import { AddToCalendar } from '@/components/invitation/AddToCalendar';


export default function Home() {
  return (
    <div className="relative min-h-screen w-full overflow-x-hidden bg-background">
      <StarsBackground />

      <main className="relative z-10 container mx-auto max-w-2xl p-4 sm:p-8 space-y-16 text-center">
        <Hero />
        
        <div className="space-y-8">
          <InvitationDetails />
          <AddToCalendar />
        </div>

        <EventInfo />

        <div className="textured-card p-6 sm:p-8 rounded-2xl shadow-2xl">
           <RsvpForm />
        </div>
        
        <div className="textured-card p-6 sm:p-8 rounded-2xl shadow-2xl">
          <SongSuggest />
        </div>

        <div className="textured-card p-6 sm:p-8 rounded-2xl shadow-2xl">
          <PhotoSection />
        </div>
        
        <footer className="text-center text-foreground/50 text-sm font-body py-8">
          <p>Diseñado y ahorado por Creati Solutions</p>
        </footer>
      </main>
    </div>
  );
}
