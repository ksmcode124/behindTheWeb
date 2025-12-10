import Footer from '@/components/sections/Footer';
import Hero from './components/Hero';
import Navbar from '../components/sections/Navigation/Navbar';
import Origin from './components/Origin';
import OurPast from '../components/sections/OurPast';
import Team from './components/Team';
import { apiGet } from '@/lib/btw/api';
import { KepengurusanResponse } from '@/lib/btw/interfaces/btw';

export default async function Index() {
  const res = await apiGet<KepengurusanResponse>('/api/display/btw');
  const data = res.data;

  return (
    <>
      <Navbar />

      <main className="bg-secondary-300 font-display min-h-screen">
        <Hero />
        <Origin />
        <Team divisi={data.divisi} />
        <OurPast />
      </main>

      <Footer />
    </>
  );
}
