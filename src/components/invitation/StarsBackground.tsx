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
// scale: Controla el tamaño (1 es normal, 2 es el doble).
// opacity: Transparencia base (0 a 1).
// duration y delay: Controlan la velocidad y el desfase de la animación de titileo.
const stars: {
  asset: number;
  top?: string;
  left?: string;
  right?: string;
  scale: number;
  opacity: number;
  duration: number;
  delay: number;
}[] = [
  // Ejemplo de cómo añadir una estrella:
  // { asset: 0, top: '10%', left: '15%', scale: 2, opacity: 0.9, duration: 4, delay: 0 },
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
            transform: `scale(${star.scale})`,
            opacity: star.opacity,
            animationDuration: `${star.duration}s`,
            animationDelay: `${star.delay}s`,
          }}
        >
          <Image
            src={starAssets[star.asset]}
            alt="Estrella decorativa"
            width={60}
            height={60}
            unoptimized
          />
        </div>
      ))}
    </div>
  );
}
