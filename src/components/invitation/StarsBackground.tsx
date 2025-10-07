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
  { asset: 3, top: '1%', left: '8%', size: 90, opacity: 0.8, duration: 5, delay: 0.4 },
  { asset: 0, top: '1%', right: '8%', size: 90, opacity: 0.8, duration: 3, delay: 0.2 },
  { asset: 1, top: '3.8%', left: '25%', size: 20, opacity: 0.8, duration: 4, delay: 0.5 },
  { asset: 4, top: '3.7%', right: '19%', size: 18, opacity: 0.8, duration: 9, delay: 0.9 },
  { asset: 4, top: '9.8%', right: '5.1%', size: 56, opacity: 0.8, duration: 4, delay: 0.3 },
  { asset: 4, top: '15%', left: '5.1%', size: 30, opacity: 0.8, duration: 2, delay: 0.6 },
  { asset: 4, top: '23.8%', left: '24.9%', size: 28, opacity: 0.8, duration: 8, delay: 0.2 },
  { asset: 0, top: '35%', right: '6%', size: 120, opacity: 0.8, duration: 7, delay: 0.7 },
  { asset: 3, top: '52.5%', left: '12%', size: 60, opacity: 0.8, duration: 4, delay: 0.4 },
  { asset: 4, top: '53.5%', right: '12%', size: 25, opacity: 0.8, duration: 2, delay: 0.1 },
  
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
