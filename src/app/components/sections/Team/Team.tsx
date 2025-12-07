import Link from 'next/link';
import Image from 'next/image';
import { FlipCard } from '../../ui/FlipCard';
import Wrapper from '../../ui/Wrapper';

const ketua_wakil = [
  {
    nama: 'Barita',
    imageSrc: '/assets/images/logo_black.jpg',
    ig: 'instagram',
    linkedIn: 'linkedIn',
    role: 'Ketua',
  },
  {
    nama: 'Nobel',
    imageSrc: '/assets/images/logo_white.jpeg',
    ig: 'instagram',
    linkedIn: 'linkedIn',
    role: 'Wakil Ketua',
  },
];

const developers = [
  {
    id: 1,
    nama: 'UI/UX DESIGNER',
    caption:
      'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Commodi, mollitia ex, inventore in illo molestiae sunt voluptatum nostrum quasi ipsum, provident rerum aut! Eius, id fuga quam a quidem sequi. Tempore ad maxime error dignissimos illum possimus sapiente, quam esse sed eveniet repudiandae ab pariatur a praesentium eum, saepe, provident consequatur eaque ipsam eligendi officia repellendus officiis aliquid. Quibusdam, iste.',
    imageSrc: '/assets/images/logo_white.png',
  },
  {
    id: 2,
    nama: 'Frontend Developer',
    caption:
      'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Commodi, mollitia ex, inventore in illo molestiae sunt voluptatum nostrum quasi ipsum, provident rerum aut! Eius, id fuga quam a quidem sequi. Tempore ad maxime error dignissimos illum possimus sapiente, quam esse sed eveniet repudiandae ab pariatur a praesentium eum, saepe, provident consequatur eaque ipsam eligendi officia repellendus officiis aliquid. Quibusdam, iste.',
    imageSrc: '/assets/images/logo_black.png',
  },
  {
    id: 3,
    nama: 'Backend Developer',
    caption:
      'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Commodi, mollitia ex, inventore in illo molestiae sunt voluptatum nostrum quasi ipsum, provident rerum aut! Eius, id fuga quam a quidem sequi. Tempore ad maxime error dignissimos illum possimus sapiente, quam esse sed eveniet repudiandae ab pariatur a praesentium eum, saepe, provident consequatur eaque ipsam eligendi officia repellendus officiis aliquid. Quibusdam, iste.',
    imageSrc: '/assets/images/logo_white.png',
  },
];

export default function Team() {
  return (
    <>
      <div className="flex h-[80vh] w-full flex-col items-center justify-center gap-6 px-6 text-white">
        <h2 className="border-b-secondary border-b-2 pb-5 text-5xl">
          MEET OUR TEAM
        </h2>
        <p className="lg:hidden">Click the photo for details</p>
        <div className="gap-x- mx-auto flex w-full max-w-5xl justify-around">
          {ketua_wakil.map(({ nama, imageSrc, ig, linkedIn, role }) => (
            <div key={nama} className="flex flex-col items-center gap-y-3">
              <FlipCard
                size={2}
                imageSrc={imageSrc}
                ig={ig}
                linkedIn={linkedIn}
              />
              <p className="border-b-secondary w-full border-b-2 text-center text-3xl">
                {nama}
              </p>
              <p className="text-center text-xl">{role}</p>
            </div>
          ))}
        </div>
      </div>
      <Wrapper>
        {developers.map(({ nama, caption, imageSrc, id }) => (
          <div key={id} className="flex w-full flex-col items-center">
            <h3 className="text-primary-500 mb-6 -rotate-4 text-5xl [-webkit-text-stroke-color:var(--color-secondary-300)] [-webkit-text-stroke-width:2.5px]">
              {nama}
            </h3>

            <div className="border-secondary-300 relative h-96 w-full max-w-4xl overflow-hidden border-[1.25em]">
              <div className="relative h-80 w-full">
                <Image
                  src={imageSrc}
                  alt={nama}
                  fill
                  className="object-cover"
                />
              </div>

              <div className="absolute inset-0 bg-linear-to-t from-black/70 via-transparent to-transparent" />

              <div className="absolute bottom-0 left-0 flex w-full items-end justify-between">
                <p className="px-5 py-1 text-sm text-white">{caption}</p>
                <Link
                  href="/"
                  className="bg-primary-600 border-secondary-300 pointer-events-auto relative border-[0.4em] px-4 py-1 text-center text-2xl font-bold transition-colors duration-300 hover:bg-white"
                >
                  SELENGKAPNYA
                </Link>
              </div>
            </div>
          </div>
        ))}
      </Wrapper>
    </>
  );
}
