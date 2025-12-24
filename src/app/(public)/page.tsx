import { useEffect, useState } from 'react';
import OurPastSection from '@/components/layout/OurPastSection';
import { fetchCurrentKepengurusan } from '@/lib/btw/api';
import { HeroSection, DivisionsSection, OriginSection } from '@/features/home';
import { IMAGES, TEXTURES } from '@/lib/constants';
import TexturedSection from '@/components/ui/TexturedSection';
import { DivisiIntiListSkeleton } from '@/features/home/components/DivisiIntiList';
import { DivisiCardSkeleton } from '@/features/home/sections/DivisionsSection';

export default function HomePage() {
  return (
    <main className="font-display relative min-h-screen">
      <TexturedSection background={IMAGES.HERO_BG} texture={TEXTURES.TEXTURE1}>
        <HeroSection />
      </TexturedSection>
      <OriginSection />
      <DivisionsBlock />
      <OurPastSection />
    </main>
  );
}

// Async component for divisions
function DivisionsBlock() {
  return <DivisionsSection />;
}
