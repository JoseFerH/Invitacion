import { Hero } from '@/components/invitation/Hero';
import { InvitationDetails } from '@/components/invitation/InvitationDetails';
import { EventInfo } from '@/components/invitation/EventInfo';
import { RsvpForm } from '@/components/invitation/RsvpForm';
import { SongSuggest } from '@/components/invitation/SongSuggest';
import { PhotoSection } from '@/components/invitation/PhotoSection';

const Decoration = ({ className }: { className?: string }) => (
  <svg
    className={`absolute w-full h-full mix-blend-multiply opacity-30 ${className}`}
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 1440 810"
    preserveAspectRatio="none"
  >
    <path
      d="M-282.2,403.4C-152.4,548-22.3,656.3,126.5,649.3c148.8-7,272.9-124,402.6-268.6c129.7-144.6,265.2-325.2,434-311.9c168.8,13.3,285.4,196.3,374.9,350.2"
      fill="none"
      stroke="hsl(var(--accent))"
      strokeWidth="2"
      strokeMiterlimit="10"
    />
     <path
      d="M1649.3,456.9c-129.8-144.6-265.2-325.2-434-311.9c-168.8,13.3-285.4,196.3-374.9,350.2c-89.5,153.9-191.9,278.4-321.7,268.6C370.1,757,246,640,116.3,495.4"
      fill="none"
      stroke="hsl(var(--accent))"
      strokeWidth="2"
      strokeMiterlimit="10"
    />
  </svg>
);


export default function Home() {
  return (
    <div className="relative min-h-screen w-full overflow-hidden bg-background">
      <div className="absolute inset-0 z-0">
         <div className="absolute -top-1/4 -left-1/4 w-1/2 h-1/2 bg-primary/20 rounded-full filter blur-3xl opacity-50" />
         <div className="absolute -bottom-1/4 -right-1/4 w-1/2 h-1/2 bg-accent/20 rounded-full filter blur-3xl opacity-50" />
         <Decoration className="transform scale-150" />
      </div>

       <div className="absolute top-0 left-0 w-full h-full z-0">
          <svg className="absolute -left-80 -top-80" width="1000" height="1000" viewBox="0 0 1000 1000" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M933 461C933 680.584 753.584 860 534 860C314.416 860 135 680.584 135 461C135 241.416 314.416 62 534 62C753.584 62 933 241.416 933 461Z" stroke="hsl(var(--primary))" strokeOpacity="0.1" strokeWidth="120"/>
          </svg>
      </div>

       <div className="absolute bottom-0 right-0 w-full h-full z-0 overflow-hidden">
          <svg className="absolute -right-80 -bottom-80" width="1000" height="1000" viewBox="0 0 1000 1000" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M933 461C933 680.584 753.584 860 534 860C314.416 860 135 680.584 135 461C135 241.416 314.416 62 534 62C753.584 62 933 241.416 933 461Z" stroke="hsl(var(--accent))" strokeOpacity="0.1" strokeWidth="120"/>
          </svg>
      </div>

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
