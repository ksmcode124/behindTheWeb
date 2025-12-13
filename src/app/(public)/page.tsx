import Hero from '@/features/home/Hero';
import Origin from '@/features/home/Origin';
import OurPast from '@/components/layout/OurPast';
import Team from '@/features/home/Team';
import { fetchCurrentKepengurusan } from '@/lib/btw/api';

export default async function HOME() {
  const divisi = (await fetchCurrentKepengurusan())?.divisi;

  return (
    <main className="bg-secondary-300 font-display min-h-screen">
      <Hero />
      <Origin />
      <Team divisi={divisi} />
      <OurPast />
    </main>
  );
}
