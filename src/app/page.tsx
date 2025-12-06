import Footer from './components/sections/Footer/Footer';
import Hero from './components/sections/Hero/Hero';
import Navbar from './components/sections/Navigation/Navbar';
import Origin from './components/sections/Origin/Origin';
import OurPast from './components/sections/OurPast/OurPast';
import Team from './components/sections/Team/Team';

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
