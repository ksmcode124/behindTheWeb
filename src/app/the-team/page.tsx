import Footer from '../components/sections/Footer/Footer';
import Navbar from '../components/sections/Navigation/Navbar';
import Wrapper from '../components/ui/Wrapper';
import Image from 'next/image';

export default function TheTeam() {
  return (
    <>
      <Navbar />

      <main className="bg-secondary-300 font-display min-h-screen">
        {/* Slicing untuk Section dan Carousel */}
        {/* Section */}
        <div className="flex h-[80vh] w-full flex-col items-center justify-center gap-6 bg-[url('/assets/images/header_meet_team1.webp')] bg-cover bg-center px-6 text-white"></div>

        {/* Carousel */}
        <Wrapper>
          <div className="flex w-full flex-col items-center">
            <h3 className="text-primary-500 mb-6 -rotate-4 text-5xl [-webkit-text-stroke-color:var(--color-secondary-300)] [-webkit-text-stroke-width:2.5px]">
              UI/UX Designer
            </h3>
          </div>
        </Wrapper>
      </main>

      <Footer />
    </>
  );
}
