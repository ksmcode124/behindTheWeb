'use client';
import Image from 'next/image';

import Navbar from '@/components/sections/Navigation/Navbar';
import Footer from '@/components/sections/Footer';
import OurPast from '@/components/sections/OurPast';

import Wrapper from '@/components/ui/Wrapper';
import Carousel from '@/components/ui/Carousel';
import ShadowedText from '@/components/ui/ShadowedText';
import { SocialMediaLink } from '@/components/ui/SocialMediaLink';
import { TEAM, BOARD } from '../components/data/team';
import { FlipCard } from '@/components/ui/FlipCard';
import { SOCIAL_MEDIA } from '@/components/socialMedia';
import { useEffect, useMemo, useState } from 'react';

export default function TheTeam() {
  // Data untuk setiap tahun - bisa diganti dengan data real
  const yearData = useMemo(
    () => [
      { year: '2021', board: BOARD, team: TEAM },
      { year: '2022', board: BOARD, team: TEAM },
      { year: '2023', board: BOARD, team: TEAM },
      { year: '2024', board: BOARD, team: TEAM },
    ],
    [],
  );

  const [currentIndex, setCurrentIndex] = useState(4);

  useEffect(() => {
    const container = document.getElementById('carousel-container');
    if (!container) return;

    function handleScroll() {
      const sectionWidth = container.offsetWidth;
      const index = Math.round(container.scrollLeft / sectionWidth);
      setCurrentIndex(index);
    }

    container.addEventListener('scroll', handleScroll);
    handleScroll();

    return () => container.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToIndex = (index: number) => {
    const container = document.getElementById('carousel-container');
    if (!container) return;
    const sectionWidth = container.offsetWidth;
    container.scrollTo({ left: sectionWidth * index, behavior: 'smooth' });
  };

  return (
    <>
      <Navbar />

      <main className="bg-secondary-300 font-display min-h-screen">
        <section className="relative flex min-h-[70vh] w-full flex-col items-center justify-center gap-4 overflow-hidden px-4 py-12 text-white sm:min-h-[75vh] sm:gap-6 sm:py-14 md:min-h-[80vh] md:gap-8 md:py-16 lg:min-h-[85vh] lg:gap-10 lg:py-20">
          {/* Background Images - Responsive positioning to match TV */}
          <div
            className="absolute inset-0 bg-[url('/assets/images/header_meet_team.webp')] bg-no-repeat"
            style={{
              backgroundPosition: 'right 1% top 20%',
              backgroundSize: 'auto 100%',
              zIndex: 0,
            }}
          />

          <div
            className="absolute inset-0 rotate-180 bg-[url('/assets/images/header_meet_team1.webp')] bg-cover bg-no-repeat"
            style={{
              backgroundPosition: 'center top 30%',
              zIndex: 0,
            }}
          />

          {/* Add media query styles for responsive background */}
          <style jsx>{`
            @media (min-width: 640px) {
              .bg-responsive-wave {
                background-position: right 4% top 18% !important;
              }
            }
            @media (min-width: 768px) {
              .bg-responsive-wave {
                background-position: right 8% top 22% !important;
              }
            }
            @media (min-width: 1024px) {
              .bg-responsive-wave {
                background-position: right 10% top 28% !important;
              }
            }
            @media (min-width: 1280px) {
              .bg-responsive-wave {
                background-position: right 12% top 33% !important;
              }
            }
          `}</style>

          <div
            className="bg-responsive-wave absolute inset-0 bg-[url('/assets/images/header_meet_team.webp')] bg-no-repeat"
            style={{
              backgroundPosition: 'right 1% top 20%',
              backgroundSize: 'contain',
              zIndex: 0,
            }}
          />

          {/* TV Image - Progressive sizing from mobile to XL */}
          {/* <div className="fixed top-[20%] right-[1%] z-10 w-[50%] max-w-[300px] sm:top-[18%] sm:right-[4%] sm:w-[52%] sm:max-w-[360px] md:top-[22%] md:right-[8%] md:w-[46%] md:max-w-[400px] lg:top-[28%] lg:right-[10%] lg:w-[42%] lg:max-w-[460px] xl:top-[33%] xl:right-[12%] xl:w-[38%] xl:max-w-[520px]">
            <Image
              src="/assets/images/tv.webp"
              alt="TV"
              width={500}
              height={500}
              className="h-auto w-full -rotate-12 drop-shadow-2xl sm:-rotate-11 md:-rotate-13 lg:-rotate-[18deg] xl:-rotate-[25deg]"
              sizes="(max-width: 640px) 50vw, (max-width: 768px) 52vw, (max-width: 1024px) 46vw, (max-width: 1280px) 42vw, 38vw"
              priority
            />
          </div> */}

          {/* Title Section */}
          <div className="relative z-20 flex w-full max-w-7xl flex-col gap-2 px-4 text-center sm:gap-3 md:gap-4 lg:items-start lg:px-8 lg:text-left xl:px-12">
            <ShadowedText
              className="-rotate-1 text-3xl font-bold sm:text-4xl md:-rotate-2 md:text-5xl lg:-rotate-3 lg:text-7xl xl:text-8xl 2xl:text-9xl"
              strokeWidth="1.5px sm:2px md:2.5px lg:2.87px"
            >
              Code124
            </ShadowedText>
            <h1 className="text-secondary-400 -rotate-1 text-4xl leading-tight sm:text-5xl md:-rotate-2 md:text-6xl lg:-rotate-3 lg:text-8xl xl:text-[9rem] 2xl:text-[10rem]">
              PREVIOUS MEMBER
            </h1>
          </div>

          {/* Subtitle + Social + Pixel Section */}
          <div className="relative z-20 flex w-full max-w-7xl flex-col items-center justify-center gap-6 px-4 sm:gap-7 md:gap-8 lg:flex-row lg:justify-between lg:px-8 xl:px-12">
            {/* MOBILE LAYOUT (< lg) */}
            <div className="flex w-full flex-col items-center gap-4 sm:gap-5 md:gap-6 lg:hidden">
              {/* Subtitle - Much more readable on mobile */}
              <div className="w-full text-center">
                <ShadowedText
                  as="h2"
                  className="-rotate-1 text-3xl font-bold sm:text-4xl md:-rotate-2 md:text-5xl"
                  textShadow="2px 2px 0 #FFF9E6"
                  textColor="var(--color-primary-500)"
                  strokeWidth="1px"
                >
                  #TheFirstCommit
                </ShadowedText>
              </div>

              {/* Social Links */}
              <div className="border-primary-500 flex w-full max-w-[300px] -rotate-1 flex-wrap justify-center gap-3 border-t-2 pt-3 sm:max-w-[360px] sm:gap-4 sm:pt-4 md:max-w-[420px] md:-rotate-2">
                {SOCIAL_MEDIA.map((social) => (
                  <SocialMediaLink
                    key={social.platform}
                    platform={social.platform}
                    href={social.href}
                    iconClassName="h-11 w-11 bg-primary-600 text-xl text-black shadow-[3px_3px_0px_#393C45] transition-all duration-200 hover:translate-y-[-2px] hover:shadow-[5px_5px_0px_#393C45] sm:h-12 sm:w-12 sm:text-2xl md:h-13 md:w-13"
                  />
                ))}
              </div>

              {/* Pixel Art */}
              <Image
                src="/assets/images/retro_pixel.webp"
                alt="retro pixel art"
                width={320}
                height={42}
                className="h-auto w-full max-w-[300px] -rotate-1 sm:max-w-[360px] md:max-w-[420px] md:-rotate-2"
                sizes="(max-width: 640px) 300px, (max-width: 768px) 360px, 420px"
              />
            </div>

            {/* DESKTOP LAYOUT (lg+) */}
            <div className="hidden w-full flex-col items-start gap-4 lg:flex lg:flex-row lg:justify-between xl:gap-6">
              <div className="flex w-full max-w-5xl flex-col items-start gap-4 xl:gap-5">
                {/* Subtitle + Pixel Art in one row */}
                <div className="flex w-full items-center justify-between gap-6">
                  <ShadowedText
                    as="h2"
                    className="-rotate-3 text-4xl font-bold whitespace-nowrap xl:text-5xl 2xl:text-6xl"
                    textShadow="3px 3px 0 #FFF9E6"
                    textColor="var(--color-primary-500)"
                    strokeWidth="1.5px"
                  >
                    #TheFirstCommit
                  </ShadowedText>

                  <Image
                    src="/assets/images/retro_pixel.webp"
                    alt="retro pixel art"
                    width={320}
                    height={42}
                    className="h-auto w-full max-w-[350px] -rotate-3 xl:max-w-[400px]"
                    sizes="(max-width: 1280px) 350px, 400px"
                  />
                </div>

                {/* Social Links */}
                <div className="border-primary-500 flex w-full -rotate-3 flex-wrap gap-4 border-t-2 pt-4">
                  {SOCIAL_MEDIA.map((social) => (
                    <SocialMediaLink
                      key={social.platform}
                      platform={social.platform}
                      href={social.href}
                      iconClassName="h-12 w-12 bg-primary-600 text-2xl text-black shadow-[4px_4px_0px_#393C45] transition-all duration-200 hover:translate-y-[-2px] hover:shadow-[6px_6px_0px_#393C45] xl:h-14 xl:w-14"
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Carousel Sections with Year Pagination */}
        <Wrapper>
          {/* Dots Indicator */}
          <div className="relative z-10 flex justify-center gap-2">
            {yearData.map((_, index) => (
              <button
                key={index}
                onClick={() => scrollToIndex(index)}
                className={`h-2 w-2 rounded-full transition-all ${
                  index === currentIndex
                    ? 'bg-secondary-300'
                    : 'bg-secondary-400'
                }`}
                aria-label={`Go to year ${yearData[index].year}`}
              />
            ))}
          </div>

          {/* Carousel Navigation */}
          <div className="my-4 flex justify-center gap-4">
            {/* Previous Button */}
            <button
              disabled={currentIndex === 0}
              onClick={() => scrollToIndex(currentIndex - 1)}
              className="bg-primary-500 flex items-center justify-center rounded p-3 transition-all disabled:cursor-not-allowed disabled:opacity-50"
              aria-label="Previous year"
            >
              <svg
                className="h-6 w-6 sm:h-7 sm:w-7 md:h-8 md:w-8"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
                  clipRule="evenodd"
                />
              </svg>
            </button>

            {/* Year Indicator */}
            <div className="text-secondary-400 text-center text-4xl font-bold sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl">
              <span className="[-webkit-text-stroke-color:var(--color-secondary-300)] [-webkit-text-stroke-width:2px]">
                {Number(yearData[currentIndex].year)} /{' '}
                {Number(yearData[currentIndex].year) + 1}
              </span>
            </div>

            {/* Next Button */}
            <button
              disabled={currentIndex === yearData.length - 1}
              onClick={() => scrollToIndex(currentIndex + 1)}
              className="bg-primary-500 flex items-center justify-center rounded p-3 transition-all disabled:cursor-not-allowed disabled:opacity-50"
              aria-label="Next year"
            >
              <svg
                className="h-6 w-6 sm:h-7 sm:w-7 md:h-8 md:w-8"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                  clipRule="evenodd"
                />
              </svg>
            </button>
          </div>

          {/* Scrollable Container - Each year is a page */}
          <div
            id="carousel-container"
            className="relative z-10 flex w-full snap-x snap-mandatory overflow-x-auto scroll-smooth"
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
          >
            <style jsx>{`
              #carousel-container::-webkit-scrollbar {
                display: none;
              }
            `}</style>

            {/* Map through each year */}
            {yearData.map((data, yearIndex) => (
              <div key={yearIndex} className="w-full flex-shrink-0 snap-center">
                {/* Ketua & Wakil Section */}
                <div className="relative z-10 mx-auto flex w-full max-w-6xl flex-wrap justify-center gap-12 px-4">
                  {data.board.map(({ nama, image, ig, linkedIn, role }) => (
                    <div
                      key={nama}
                      className="flex flex-col items-center gap-4"
                    >
                      <FlipCard
                        size={1}
                        nama={nama}
                        role={role}
                        imageSrc={image}
                        ig={ig}
                        linkedIn={linkedIn}
                      />
                    </div>
                  ))}
                </div>

                {/* Developer Carousels */}
                {[
                  { title: 'UI/UX Designer', members: data.team },
                  { title: 'Frontend Developer', members: data.team },
                  { title: 'Backend Developer', members: data.team },
                ].map((section, index) => (
                  <div
                    key={index}
                    className="relative z-10 flex w-full flex-col items-center px-4 py-8 sm:px-6 sm:py-10 md:px-8 md:py-12 lg:py-16"
                  >
                    <h3 className="text-primary-500 mb-4 -rotate-3 text-3xl [-webkit-text-stroke-color:var(--color-secondary-300)] [-webkit-text-stroke-width:1.5px] sm:mb-5 sm:text-4xl sm:[-webkit-text-stroke-width:2px] md:mb-6 md:text-5xl md:[-webkit-text-stroke-width:2.5px] lg:text-6xl xl:text-7xl">
                      {section.title}
                    </h3>
                    <Carousel members={section.members} />
                  </div>
                ))}
              </div>
            ))}
          </div>
        </Wrapper>

        <OurPast />
      </main>

      <Footer />
    </>
  );
}
