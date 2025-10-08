
import type { Metadata } from "next";
import { Toaster } from "@/components/ui/toaster";
import "./globals.css";
import { Cinzel, Raleway, Sofia, Great_Vibes } from 'next/font/google';
import { FirebaseClientProvider } from "@/firebase/client-provider";

const cinzel = Cinzel({
  subsets: ['latin'],
  variable: '--font-cinzel',
  display: 'swap',
});

const sofia = Sofia({
  subsets: ['latin'],
  weight: '400',
  variable: '--font-sofia',
  display: 'swap',
});

const raleway = Raleway({
  subsets: ['latin'],
  variable: '--font-raleway',
  display: 'swap',
})

const greatVibes = Great_Vibes({
  subsets: ['latin'],
  weight: '400',
  variable: '--font-great-vibes',
  display: 'swap',
});


export const metadata: Metadata = {
  title: "Gabriela's Graduation Gala",
  description: "Interactive invitation for the graduation of Gabriela Alvarado Durante",
  openGraph: {
    title: "Gabriela's Graduation Gala",
    description: "Te invito a celebrar mi graduación. ¡Será una noche inolvidable!",
    images: [
      {
        url: 'https://storage.googleapis.com/proud-booster-424814-p0.appspot.com/miniatura3_Mesadetrabajo1.jpg',
        width: 1200,
        height: 630,
        alt: "Invitación a la Gala de Graduación de Gabriela",
      },
    ],
    type: 'website',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" className={`${cinzel.variable} ${sofia.variable} ${raleway.variable} ${greatVibes.variable}`}>
      <body className="font-body antialiased">
        <FirebaseClientProvider>
          {children}
          <Toaster />
        </FirebaseClientProvider>
      </body>
    </html>
  );
}
