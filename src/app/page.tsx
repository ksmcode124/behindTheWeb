import Footer from './components/sections/Footer/Footer';
import Hero from './components/sections/Hero/Hero';
import Navbar from './components/sections/Navigation/Navbar';
import Origin from './components/sections/Origin/Origin';
import Team from './components/sections/Team/Team';

export default function Index() {
  return (
    <>
      <header>
        <Navbar />
      </header>

      <main className="bg-secondary-300 min-h-screen">
        <Hero />
        <Origin />
        <Team />
      </main>

      <footer>
        <Footer />
      </footer>
    </>
  );
}
