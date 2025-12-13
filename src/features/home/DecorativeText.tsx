interface DecorativeTextProps {
  text?: string;
  desktopSize?: string;
  mobileSize?: string;
  strokeColor?: string;
}

export default function DecorativeText({
  text = 'THE FIRST COMMIT',
  desktopSize = '8xl',
  mobileSize = '7xl',
  strokeColor = 'var(--color-primary-400)',
}: DecorativeTextProps) {
  const commonStyle = { WebkitTextStroke: `2px ${strokeColor}` };

  return (
    <div className="pointer-events-none absolute inset-7">
      {/* Desktop: left/right at edges */}
      <div className="hidden md:block">
        <div className="absolute top-65 -right-60 rotate-90">
          <p
            className={`text-${desktopSize} leading-none whitespace-nowrap text-transparent`}
            style={commonStyle}
          >
            {text}
          </p>
        </div>
        <div className="absolute bottom-75 -left-60 -rotate-90">
          <p
            className={`text-${desktopSize} leading-none whitespace-nowrap text-transparent`}
            style={commonStyle}
          >
            {text}
          </p>
        </div>
      </div>

      {/* Mobile: top/bottom centered */}
      <div className="flex h-full w-full flex-col justify-between md:hidden">
        <div className="flex justify-center">
          <p
            className={`text-${mobileSize} text-transparent`}
            style={commonStyle}
          >
            {text}
          </p>
        </div>
        <div className="flex justify-center">
          <p
            className={`text-${mobileSize} text-transparent`}
            style={commonStyle}
          >
            {text}
          </p>
        </div>
      </div>
    </div>
  );
}
