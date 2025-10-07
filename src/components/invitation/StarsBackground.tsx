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

const stars = [
  // Existing stars
  { asset: 0, top: '10%', left: '15%', scale: 1, opacity: 0.9, duration: 4, delay: 0 },
  { asset: 0, top: '75%', right: '10%', scale: 1.2, opacity: 1, duration: 5, delay: 1 },
  { asset: 1, top: '5%', right: '20%', scale: 0.8, opacity: 0.8, duration: 3, delay: 0.5 },
  { asset: 1, top: '25%', left: '5%', scale: 0.9, opacity: 0.9, duration: 6, delay: 2 },
  { asset: 1, top: '50%', right: '30%', scale: 0.7, opacity: 0.8, duration: 4.5, delay: 1.5 },
  { asset: 1, top: '90%', left: '25%', scale: 1, opacity: 1, duration: 5.5, delay: 3 },
  { asset: 2, top: '20%', right: '5%', scale: 0.6, opacity: 0.7, duration: 3.5, delay: 0.2 },
  { asset: 2, top: '40%', left: '25%', scale: 0.5, opacity: 0.6, duration: 7, delay: 4 },
  { asset: 2, top: '60%', left: '10%', scale: 0.7, opacity: 0.8, duration: 4, delay: 2.5 },
  { asset: 2, top: '80%', right: '25%', scale: 0.6, opacity: 0.7, duration: 5, delay: 1.8 },
  { asset: 2, top: '95%', right: '50%', scale: 0.5, opacity: 0.6, duration: 6, delay: 3.5 },

  // New stars with new assets
  { asset: 3, top: '15%', right: '15%', scale: 0.9, opacity: 0.85, duration: 4.2, delay: 0.8 },
  { asset: 3, top: '85%', left: '5%', scale: 1.1, opacity: 0.95, duration: 5.8, delay: 2.2 },
  { asset: 4, top: '30%', right: '40%', scale: 0.8, opacity: 0.75, duration: 3.8, delay: 1.1 },
  { asset: 4, top: '65%', left: '35%', scale: 0.9, opacity: 0.9, duration: 6.5, delay: 4.5 },
  // Star that was over the text, moved to top-left
  { asset: 0, top: '3%', left: '8%', scale: 0.7, opacity: 0.7, duration: 3.2, delay: 0.1 },
  { asset: 1, top: '98%', left: '80%', scale: 0.8, opacity: 0.8, duration: 5.3, delay: 2.8 },
  { asset: 2, top: '55%', left: '55%', scale: 0.6, opacity: 0.6, duration: 7.5, delay: 5 },
  { asset: 3, top: '45%', right: '5%', scale: 1.0, opacity: 0.9, duration: 4.8, delay: 1.3 },
  { asset: 4, top: '5%', left: '30%', scale: 0.7, opacity: 0.7, duration: 3.6, delay: 0.9 },
  { asset: 1, top: '70%', left: '70%', scale: 0.9, opacity: 0.9, duration: 6.2, delay: 3.8 },
  { asset: 2, top: '35%', left: '15%', scale: 0.5, opacity: 0.5, duration: 8, delay: 6 },
  { asset: 0, top: '88%', right: '35%', scale: 1.1, opacity: 1, duration: 5.1, delay: 2.1 },
  { asset: 3, top: '50%', left: '2%', scale: 0.8, opacity: 0.8, duration: 4.6, delay: 1.7 },
  { asset: 4, top: '22%', right: '28%', scale: 0.9, opacity: 0.85, duration: 6.8, delay: 4.2 },
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
