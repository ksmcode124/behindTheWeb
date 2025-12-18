'use client';
import Image from 'next/image';

import Navbar from '../../components/sections/Navbar';
import Footer from '../../components/sections/Footer';
import OurPast from '../../components/sections/OurPast';

import Wrapper from '../../components/ui/Wrapper';
import Carousel from '../../components/ui/Carousel';
import ShadowedText from '../../components/ui/ShadowedText';
import { SocialMediaLink } from '@/components/ui/SocialMediaLink';
import { SOCIAL_MEDIA } from '../../components/socialMedia';

import InfiniteCarousel, {
  ScrollingBoxes,
} from '../components/InfiniteCarousel';

import { useEffect, useState } from 'react';
import axios from 'axios';
import { Divisi, KepengurusanResponse } from '@/lib/btw/interfaces/btw';

export default function TheTeam() {
  const [data, setData] = useState<KepengurusanResponse | null>(null);

  useEffect(() => {
    let cancelled = false;

    axios.get<KepengurusanResponse>('/api/display/btw').then((res) => {
      if (!cancelled) setData(res.data);
    });

    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <>
      <Navbar />

      <main className="bg-secondary-300 font-display min-h-screen">
        <div className="absolute inset-0 scale-y-[-1] bg-[url('/assets/images/header_meet_team1.webp')] bg-cover bg-center" />
        <section className="text-secondary-400 flex min-h-[85vh] w-full flex-col items-center justify-center gap-10 px-6 py-36">
          {/* Title */}
          <div className="flex flex-col items-center text-right">
            <h1 className="text-secondary-400 -skew-3 text-6xl leading-none md:text-7xl lg:text-[10rem]">
              MEET OUR GREAT!
              <br />
              DEVELOPERS
            </h1>
          </div>
          {/* Subtitle + Social Links */}
          <div className="flex w-full max-w-6xl flex-col items-start justify-center gap-5 pl-10 lg:flex-row lg:items-center lg:pl-0">
            {/* Left: Title + Tagline */}
            <div className="space-y-5 text-left">
              <ShadowedText className="-skew-3 text-5xl lg:text-9xl">
                CODE124
              </ShadowedText>
              <h3 className="-skew-3 text-4xl text-[#e6e6e6] lg:text-7xl">
                #TheFirstCommit
              </h3>
            </div>

            {/* Social + Pixel Art */}
            <div className="flex flex-col items-center gap-y-8">
              <Image
                src="/assets/images/retro_pixel.webp"
                alt="retro pixel art"
                width={320}
                height={42}
                className="hidden -rotate-3 lg:block"
              />

              <div className="border-primary-500 flex max-w-xs -rotate-3 justify-center gap-x-4 border-t-2 pt-5">
                {SOCIAL_MEDIA.map((social) => (
                  <SocialMediaLink
                    key={social.platform}
                    platform={social.platform}
                    href={social.href}
                    iconClassName="h-11 w-11 rounded-full text-black flex items-center justify-center transition-all duration-300 sm:h-12 sm:w-12 md:h-13 md:w-13"
                  />
                ))}
              </div>
            </div>
          </div>
          <section className="mb-[5vh] flex w-full flex-col gap-6 bg-[#27292D] px-4 py-6">
            <ScrollingBoxes speed={45} />
            <InfiniteCarousel
              images={
                data?.data.divisi.map((d: Divisi) => ({
                  src:
                    d.foto_divisi ?? '/assets/images/origin_first_commit.webp',
                  alt: d.nama_divisi,
                })) ?? []
              }
              speed={45}
            />
            <ScrollingBoxes speed={45} />
          </section>
        </section>

        <Wrapper>
          {data?.data.divisi.map(({ nama_divisi, anggota, id }, index) => (
            <div
              key={index}
              className="flex w-full flex-col items-center px-4 py-8 sm:px-6 sm:py-10 md:px-8 md:py-12 lg:py-16"
            >
              <h3 className="text-primary-500 mb-10 -skew-4 text-5xl [-webkit-text-stroke-color:var(--color-secondary-300)] [-webkit-text-stroke-width:2.5px] text-shadow-[5px_4px_0_var(--color-primary-600)] lg:text-7xl">
                {nama_divisi}
              </h3>
              <Carousel anggotaProp={anggota} />
            </div>
          ))}
        </Wrapper>

        <OurPast />
      </main>

      <Footer />
    </>
  );
}
