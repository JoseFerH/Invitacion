'use client';

import Image from 'next/image';

const Star = ({ style }: { style: React.CSSProperties }) => (
    <div className="absolute" style={style}>
        <svg width="60" height="60" viewBox="0 0 60 60" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M30 0L36.7368 23.2632L60 30L36.7368 36.7368L30 60L23.2632 36.7368L0 30L23.2632 23.2632L30 0Z" fill="url(#paint0_linear_1_2)"/>
            <defs>
                <linearGradient id="paint0_linear_1_2" x1="30" y1="0" x2="30" y2="60" gradientUnits="userSpaceOnUse">
                    <stop stopColor="white" stopOpacity="0"/>
                    <stop offset="0.5" stopColor="white"/>
                    <stop offset="1" stopColor="white" stopOpacity="0"/>
                </linearGradient>
            </defs>
        </svg>
    </div>
);

export function StarsBackground() {
  return (
    <>
      {/* GIF de estrellas de fondo */}
      <div className="absolute inset-0 z-0 opacity-50">
        <Image
          src="/stars.gif"
          alt="Falling stars background"
          layout="fill"
          objectFit="cover"
          unoptimized
        />
      </div>
      
      {/* Estrellas estáticas para decorar */}
      <div className="absolute inset-0 z-10 overflow-hidden pointer-events-none">
        <Star style={{ top: '5%', left: '10%', transform: 'scale(0.5)', opacity: 0.8 }} />
        <Star style={{ top: '15%', right: '15%', transform: 'scale(0.8)', opacity: 0.9 }} />
        <Star style={{ top: '25%', left: '20%', transform: 'scale(0.4)', opacity: 0.7 }} />
        <Star style={{ top: '40%', right: '5%', transform: 'scale(0.6)', opacity: 0.8 }} />
        <Star style={{ top: '55%', left: '5%', transform: 'scale(0.7)', opacity: 0.9 }} />
        <Star style={{ top: '70%', right: '20%', transform: 'scale(0.5)', opacity: 0.8 }} />
        <Star style={{ top: '85%', left: '15%', transform: 'scale(0.9)', opacity: 1 }} />
        <Star style={{ top: '95%', right: '10%', transform: 'scale(0.4)', opacity: 0.7 }} />
      </div>
    </>
  );
}
