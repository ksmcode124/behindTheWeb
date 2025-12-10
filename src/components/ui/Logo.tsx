import Image from 'next/image';
import Code124Black from '/public/assets/images/logo_black.png';
import Code124White from '/public/assets/images/logo_white.png';

interface LogoProps {
  variant?: 'black' | 'white';
  text?: string;
}

export default function Logo({ variant = 'black', text = 'CODE124' }: LogoProps) {
  const logoConfig = {
    black: Code124Black,
    white: Code124White,
  };

  return (
    <div
      aria-label="Code124 Homepage"
      className="flex items-center justify-center gap-2"
    >
      <Image
        src={logoConfig[variant]}
        alt="Logo Code124"
        width={36}
        height={36}
        className="h-10 w-10"
        priority
      />
      <p
        className={`font-display text-xl font-semibold md:block lg:text-3xl ${variant === 'black' ? 'text-black' : 'text-secondary-400'}`}
      >
        {text}
      </p>
    </div>
  );
}
