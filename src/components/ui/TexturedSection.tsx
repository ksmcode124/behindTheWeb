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
  const [textureReady, setTextureReady] = useState(false);

  useEffect(() => {
    const img = new Image();
    img.src = texture;
    img.onload = () => setTextureReady(true);
  }, [texture]);

  return (
    <section className="relative isolate">
      {/* BACKGROUND LAYER (non-blocking) */}
      {background && (
        <div
          aria-hidden
          className="absolute inset-0 -z-20 bg-neutral-900 bg-cover bg-center"
          style={{ backgroundImage: `url(${background})` }}
        />
      )}

      {/* TEXTURE LAYER (async) */}
      {textureReady && (
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 -z-10 bg-cover bg-center mix-blend-multiply transition-opacity duration-300"
          style={{
            backgroundImage: `url(${texture})`,
            opacity: textureOpacity,
          }}
        />
      )}

      {/* CONTENT — TIDAK TERGANTUNG STATE */}
      <div className="relative z-10">{children}</div>
    </section>
  );
}
