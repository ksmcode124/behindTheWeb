import Footer from './components/sections/Footer/Footer';
import Navbar from './components/sections/Navigation/Navbar';

export default function Index() {
  return (
    <>
      <header>
        <Navbar />
      </header>

      <main className="bg-secondary-300 min-h-screen"></main>

      <footer>
        <Footer />
      </footer>
    </>
  );
}
