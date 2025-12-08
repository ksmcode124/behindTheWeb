import Footer from '@/components/sections/Footer';
import Hero from './components/Hero';
import Navbar from '../components/sections/Navigation/Navbar';
import Origin from './components/Origin';
import OurPast from '../components/sections/OurPast';
import Team from './components/Team';

export default function Index() {
  return (
    <>
      <Navbar />

      <main className="bg-secondary-300 font-display min-h-screen">
        <Hero />
        <Origin />
        <Team />
        <OurPast />
      </main>

      <Footer />
    </>
  );
}
