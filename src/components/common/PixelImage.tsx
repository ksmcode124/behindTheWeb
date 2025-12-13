import Image from 'next/image';
export default function PixelImage() {
  return (
    <Image
      src="/images/retro_pixel.webp"
      alt="Decorative pixel art"
      width={320}
      height={42}
      className="-rotate-3"
      priority
    />
  );
}
