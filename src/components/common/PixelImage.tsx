import Image from 'next/image';
interface Props {
  className?: string;
}

export default function PixelImage({ className }: Props) {
  return (
    <Image
      src="/images/retro_pixel.webp"
      alt="Decorative Pixel Art"
      width={320}
      height={42}
      className={`h-auto w-full max-w-[180px] -skew-3 sm:max-w-[360px] md:max-w-[420px] ${className}`}
      sizes="(max-width: 640px) 300px, (max-width: 768px) 360px, 420px"
    />
  );
}
