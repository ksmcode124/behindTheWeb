'use client';
import Image from 'next/image';

import Wrapper from '@/components/common/Wrapper';
import Carousel from '@/components/common/Carousel';
import ShadowedText from '@/components/ui/ShadowedText';
import { SocialMediaLink } from '@/components/common/SocialMediaLink';
import { FlipCard } from '@/components/common/FlipCard';
import { SOCIAL_MEDIA } from '@/lib/constants';
import { useEffect, useRef, useState } from 'react';
import axios from 'axios';
import { Divisi } from '@/lib/btw/interfaces/btw';

export default function TheTeam() {
  const [kepengurusan, setKepengurusan] = useState<{
    data: {
      tahun_kerja: string;
      nama_kepengurusan: string;
      divisi: Divisi[];
    };
    helper: {
      years: string[];
      index: number;
      prev: string | null;
      next: string | null;
    };
  } | null>(null);

  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    let cancelled = false;

    if (!kepengurusan) {
      axios.get('/api/display/btw').then((res) => {
        setKepengurusan(res.data);
      });
    }

    console.log(
      `/api/display/btw?tahun=${kepengurusan?.helper.years[currentIndex]}`,
    );

    axios
      .get(`/api/display/btw?tahun=${kepengurusan?.helper.years[currentIndex]}`)
      .then((res) => {
        if (cancelled) return;

        const newIndex = res.data.helper.index ?? 0;

        setKepengurusan(res.data);

        if (newIndex !== currentIndex) {
          setCurrentIndex(newIndex);
        }
      });

    return () => {
      cancelled = true;
    };
  }, [currentIndex]);

  const scrollToIndex = (index: number) => {
    if (!kepengurusan) return;

    const max = kepengurusan.helper.years.length - 1;
    const clamped = Math.max(0, Math.min(index, max));

    setCurrentIndex(clamped);
  };

  const carouselRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!carouselRef.current || !kepengurusan?.helper?.years) return;

    const container = carouselRef.current;
    const target = container.children[currentIndex] as HTMLElement;

    if (target) {
      container.scrollTo({
        left: target.offsetLeft,
        behavior: 'smooth',
      });
    }
  }, [currentIndex, kepengurusan?.helper?.years]);

  return (
    <main className="bg-secondary-300 font-display min-h-screen">
      <section className="relative flex min-h-[70vh] w-full flex-col items-center justify-center gap-4 overflow-hidden px-4 py-12 text-white sm:min-h-[75vh] sm:gap-6 sm:py-14 md:min-h-[80vh] md:gap-8 md:py-16 lg:min-h-[85vh] lg:gap-10 lg:py-20">
        {/* Full-section background */}
        <div className="bg-top-[10%] absolute inset-0 z-0 bg-[url('/images/header_meet_team.webp')] bg-cover bg-position-[left_top_15%]" />

        {/* Rotated overlay background */}
        <div className="absolute inset-0 z-0 rotate-180 bg-[url('/images/header_meet_team1.webp')] bg-cover bg-center" />

        {/* TV Image - Progressive sizing from mobile to XL */}
        {/* <div className="fixed top-[20%] right-[1%] z-10 w-[50%] max-w-[300px] sm:top-[18%] sm:right-[4%] sm:w-[52%] sm:max-w-[360px] md:top-[22%] md:right-[8%] md:w-[46%] md:max-w-[400px] lg:top-[28%] lg:right-[10%] lg:w-[42%] lg:max-w-[460px] xl:top-[33%] xl:right-[12%] xl:w-[38%] xl:max-w-[520px]">
            <Image
              src="/images/tv.webp"
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
            className="-skew-1 text-3xl font-bold sm:text-4xl md:-skew-2 md:text-5xl lg:-skew-3 lg:text-7xl xl:text-8xl 2xl:text-9xl"
            strokeWidth="1.5px sm:2px md:2.5px lg:2.87px"
          >
            CODE124
          </ShadowedText>
          <h1 className="text-secondary-400 -skew-1 text-4xl leading-tight sm:text-5xl md:-skew-2 md:text-6xl lg:-skew-3 lg:text-8xl xl:text-[9rem] 2xl:text-[10rem]">
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
                className="-skew-1 text-3xl sm:text-4xl md:-skew-2 md:text-5xl"
                textShadow="2px 2px 0 #FFF9E6"
                textColor="var(--color-primary-500)"
                strokeWidth="1px"
              >
                #TheFirstCommit
              </ShadowedText>
            </div>

            {/* Social Links */}
            <div className="border-primary-500 flex w-full max-w-[300px] -skew-1 flex-wrap justify-center gap-3 border-t-2 pt-3 sm:max-w-[360px] sm:gap-4 sm:pt-4 md:max-w-[420px] md:-skew-2">
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
              src="/images/retro_pixel.webp"
              alt="retro pixel art"
              width={320}
              height={42}
              className="h-auto w-full max-w-[300px] -skew-1 sm:max-w-[360px] md:max-w-[420px] md:-skew-2"
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
                  className="-skew-3 text-4xl whitespace-nowrap xl:text-5xl 2xl:text-6xl"
                  textShadow="3px 3px 0 #FFF9E6"
                  textColor="var(--color-primary-500)"
                  strokeWidth="1.5px"
                >
                  #TheFirstCommit
                </ShadowedText>

                <Image
                  src="/images/retro_pixel.webp"
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
          {kepengurusan?.helper?.years?.map((_, idx) => (
            <button
              key={idx}
              onClick={() => scrollToIndex(idx)}
              className={`h-2 w-2 rounded-full transition-all ${
                idx === currentIndex ? 'bg-secondary-300' : 'bg-secondary-400'
              }`}
              aria-label={`Go to year ${kepengurusan.helper.years[idx]}`}
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
              {kepengurusan?.helper.years[currentIndex]} /{' '}
              {Number(kepengurusan?.helper.years[currentIndex]) + 1}
            </span>
          </div>

          {/* Next Button */}
          <button
            disabled={
              currentIndex === (kepengurusan?.helper.years.length || 0) - 1
            }
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
          ref={carouselRef}
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
          {kepengurusan?.helper.years.map((_, idx) => (
            <div key={idx} className="w-full flex-shrink-0 snap-center">
              {/* Ketua & Wakil Section */}
              <div className="relative z-10 mx-auto flex w-full max-w-6xl flex-wrap justify-center gap-12 px-4">
                {(
                  kepengurusan?.data.divisi.find(
                    (d) => d.nama_divisi === 'INTI',
                  )?.anggota || []
                ).map(
                  ({
                    nama_anggota,
                    foto_anggota,
                    instagram,
                    linkedin,
                    jabatan,
                    id,
                  }) => (
                    <div key={id} className="flex flex-col items-center gap-4">
                      <FlipCard
                        size={1}
                        nama={nama_anggota}
                        role={jabatan}
                        imageSrc={foto_anggota}
                        ig={instagram}
                        linkedIn={linkedin}
                      />
                    </div>
                  ),
                )}
              </div>

              {/* Developer Carousels */}
              {(kepengurusan?.data.divisi || []).map((divisi, index) => (
                <div
                  key={index}
                  className="relative z-10 flex w-full flex-col items-center px-4 py-8 sm:px-6 sm:py-10 md:px-8 md:py-12 lg:py-16"
                >
                  <h3 className="text-primary-500 mb-10 -skew-4 text-5xl [-webkit-text-stroke-color:var(--color-secondary-300)] [-webkit-text-stroke-width:2.5px] text-shadow-[5px_4px_0_var(--color-primary-600)] lg:text-7xl">
                    {divisi.nama_divisi}
                  </h3>
                  <Carousel anggotaProp={divisi.anggota} />
                </div>
              ))}
            </div>
          ))}
        </div>
      </Wrapper>
    </main>
  );
}
