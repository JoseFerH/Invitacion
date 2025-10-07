'use client';

import { cn } from '@/lib/utils';
import Image from 'next/image';

const starAssets = [
  '/assets/star1svg.svg',
  '/assets/star minisvg.svg',
  '/assets/star mini 2svg.svg',
  '/assets/star 2svg.svg',
  '/assets/star medianasvg.svg',
];

// Para añadir una estrella, agrega un nuevo objeto a este array.
// asset: Elige un estilo de estrella del 0 al 4.
// Posición: usa 'top' y 'left' (o 'right') con porcentajes.
// size: Controla el tamaño de la estrella en píxeles (ej. 60 es el tamaño estándar).
// opacity: Transparencia base (0 a 1).
// duration y delay: Controlan la velocidad y el desfase de la animación de titileo.
const stars: {
  asset: number;
  top?: string;
  left?: string;
  right?: string;
  size: number;
  opacity: number;
  duration: number;
  delay: number;
}[] = [
  // Ejemplo de cómo añadir una estrella:
  { asset: 3, top: '1%', left: '8%', size: 110, opacity: 0.8, duration: 4, delay: 0.2 },
  { asset: 0, top: '1%', right: '8%', size: 110, opacity: 0.8, duration: 4, delay: 0.2 },
  { asset: 1, top: '3.8%', left: '25%', size: 20, opacity: 0.8, duration: 4, delay: 0.2 },
  { asset: 4, top: '4.4%', right: '19%', size: 18, opacity: 0.8, duration: 4, delay: 0.2 },
  { asset: 4, top: '9.4%', right: '5.1%', size: 56, opacity: 0.8, duration: 4, delay: 0.2 },
  { asset: 4, top: '15%', left: '5.1%', size: 30, opacity: 0.8, duration: 4, delay: 0.2 },
  { asset: 4, top: '24.8%', left: '26.9%', size: 28, opacity: 0.8, duration: 4, delay: 0.2 },
  { asset: 0, top: '24%', right: '8%', size: 140, opacity: 0.8, duration: 4, delay: 0.2 },

];

export function StarsBackground() {
  return (
    <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
      {stars.map((star, index) => (
        <div
          key={index}
          className="absolute animate-twinkle"
          style={{
            top: star.top,
            left: star.left,
            right: star.right,
            opacity: star.opacity,
            animationDuration: `${star.duration}s`,
            animationDelay: `${star.delay}s`,
          }}
        >
          <Image
            src={starAssets[star.asset]}
            alt="Estrella decorativa"
            width={star.size}
            height={star.size}
            unoptimized
          />
        </div>
      ))}
    </div>
  );
}
