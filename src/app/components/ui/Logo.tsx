import Image from 'next/image';
import Link from 'next/link';
import Code124Black from '/public/assets/images/logo.png';
import Code124White from '/public/assets/images/logo_white.png';

interface LogoProps {
  variant?: 'black' | 'white';
}

export default function Logo({ variant = 'black' }: LogoProps) {
  const logoConfig = {
    black: Code124Black,
    white: Code124White,
  };

  return (
    <div aria-label="Code124 Homepage" className="flex items-center gap-2">
      <Image
        src={logoConfig[variant]}
        alt="Logo Code124"
        width={36}
        height={36}
        className="sm:h-10 sm:w-10 md:h-12 md:w-12"
        priority
      />
      <p
        className={`font-display text-xl font-semibold md:block lg:text-3xl ${variant === 'black' ? 'text-black' : 'text-white'}`}
      >
        CODE124
      </p>
    </div>
  );
}
