import Image from 'next/image';
import Code124 from '/public/logo.png';
import Link from 'next/link';

export default function Logo() {
  return (
    <Link
      href="/behind-the-web"
      className="bg-primary-500 flex items-center gap-2 border px-2 py-1 shadow hover:bg-white"
      aria-label="Code124 Homepage"
    >
      <Image
        src={Code124}
        alt="Logo Code124"
        width={36}
        height={36}
        className="sm:h-10 sm:w-10 md:h-12 md:w-12"
        priority
      />
      <p className="font-display text-xl font-semibold md:block lg:text-3xl">
        CODE124
      </p>
    </Link>
  );
}
