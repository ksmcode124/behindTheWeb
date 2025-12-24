import OurPastSection from '@/components/layout/OurPastSection';
import { HeroSection, DivisionsSection, OriginSection } from '@/features/home';
import { IMAGES, TEXTURES } from '@/lib/constants';
import TexturedSection from '@/components/ui/TexturedSection';

export default function HomePage() {
  return (
    <main className="font-display relative min-h-screen">
      <TexturedSection background={IMAGES.HERO_BG} texture={TEXTURES.TEXTURE1}>
        <HeroSection />
      </TexturedSection>
      <OriginSection />
      <DivisionsSection />
      <OurPastSection />
    </main>
  );
}
