import Image from 'next/image';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { Hero } from '@/components/invitation/Hero';
import { InvitationDetails } from '@/components/invitation/InvitationDetails';
import { EventInfo } from '@/components/invitation/EventInfo';
import { RsvpForm } from '@/components/invitation/RsvpForm';
import { SongSuggest } from '@/components/invitation/SongSuggest';
import { PhotoSection } from '@/components/invitation/PhotoSection';

export default function Home() {
  const lavenderTop = PlaceHolderImages.find(img => img.id === 'lavender-corner-top');
  const lavenderBottom = PlaceHolderImages.find(img => img.id === 'lavender-corner-bottom');
  const hydrangea = PlaceHolderImages.find(img => img.id === 'hydrangea-centerpiece');

  return (
    <div className="relative min-h-screen w-full overflow-hidden">
      {lavenderTop && (
        <Image
          src={lavenderTop.imageUrl}
          alt={lavenderTop.description}
          width={200}
          height={400}
          className="absolute top-0 left-0 -translate-x-1/4 -translate-y-1/4 opacity-50 select-none pointer-events-none"
          data-ai-hint={lavenderTop.imageHint}
          priority
        />
      )}
       {lavenderBottom && (
        <Image
          src={lavenderBottom.imageUrl}
          alt={lavenderBottom.description}
          width={200}
          height={400}
          className="absolute bottom-0 right-0 translate-x-1/4 translate-y-1/4 opacity-50 select-none pointer-events-none transform scale-x-[-1]"
          data-ai-hint={lavenderBottom.imageHint}
        />
      )}
      <main className="relative z-10 container mx-auto max-w-2xl p-4 sm:p-8 space-y-12 text-center">
        <Hero />
        <InvitationDetails />
        <EventInfo />
        <RsvpForm />
        <SongSuggest />
        <PhotoSection />
        {hydrangea && (
          <div className="flex justify-center pt-8">
            <Image
              src={hydrangea.imageUrl}
              alt={hydrangea.description}
              width={400}
              height={200}
              className="opacity-70 rounded-lg"
              data-ai-hint={hydrangea.imageHint}
            />
          </div>
        )}
      </main>
    </div>
  );
}
