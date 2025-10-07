'use client';

import Image from 'next/image';

const starAssets = [
  '/assets/star1svg.svg',
  '/assets/star minisvg.svg',
  '/assets/star mini 2svg.svg',
];

const stars = [
  // Large stars
  { asset: 0, top: '10%', left: '15%', scale: 1, opacity: 0.9 },
  { asset: 0, top: '75%', right: '10%', scale: 1.2, opacity: 1 },
  
  // Medium stars
  { asset: 1, top: '5%', right: '20%', scale: 0.8, opacity: 0.8 },
  { asset: 1, top: '25%', left: '5%', scale: 0.9, opacity: 0.9 },
  { asset: 1, top: '50%', right: '30%', scale: 0.7, opacity: 0.8 },
  { asset: 1, top: '90%', left: '25%', scale: 1, opacity: 1 },

  // Small stars
  { asset: 2, top: '20%', right: '5%', scale: 0.6, opacity: 0.7 },
  { asset: 2, top: '40%', left: '25%', scale: 0.5, opacity: 0.6 },
  { asset: 2, top: '60%', left: '10%', scale: 0.7, opacity: 0.8 },
  { asset: 2, top: '80%', right: '25%', scale: 0.6, opacity: 0.7 },
  { asset: 2, top: '95%', right: '50%', scale: 0.5, opacity: 0.6 },
];

export function StarsBackground() {
  return (
    <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
      {stars.map((star, index) => (
        <div
          key={index}
          className="absolute"
          style={{
            top: star.top,
            left: star.left,
            right: star.right,
            transform: `scale(${star.scale})`,
            opacity: star.opacity,
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
