'use client';

import { useEffect, useState } from 'react';

type Props = {
  texture: string;
  background?: string;
  children: React.ReactNode;
  textureOpacity?: number;
};

export default function TexturedSection({
  texture,
  background,
  children,
  textureOpacity = 0.25,
}: Props) {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const img = new Image();
    img.src = texture;
    img.onload = () => setReady(true);
  }, [texture]);

  return (
    <section
      className="relative isolate"
      style={{
        backgroundImage: background ? `url(${background})` : 'undefined',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      {ready && (
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 z-20 h-full w-screen bg-cover bg-center mix-blend-multiply transition-opacity duration-300"
          style={{
            backgroundImage: `url(${texture})`,
            opacity: textureOpacity,
          }}
        />
      )}

      <div className="relative z-10">{children}</div>
    </section>
  );
}
