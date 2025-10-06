import { Hero } from '@/components/invitation/Hero';
import { InvitationDetails } from '@/components/invitation/InvitationDetails';
import { EventInfo } from '@/components/invitation/EventInfo';
import { RsvpForm } from '@/components/invitation/RsvpForm';
import { SongSuggest } from '@/components/invitation/SongSuggest';
import { PhotoSection } from '@/components/invitation/PhotoSection';

export default function Home() {
  return (
    <div className="relative min-h-screen w-full overflow-hidden">
      <main className="relative z-10 container mx-auto max-w-2xl p-4 sm:p-8 space-y-12 text-center">
        <Hero />
        <InvitationDetails />
        <EventInfo />
        <RsvpForm />
        <SongSuggest />
        <PhotoSection />
      </main>
    </div>
  );
}
