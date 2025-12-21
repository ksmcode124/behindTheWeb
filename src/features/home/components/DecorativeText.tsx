interface DecorativeTextProps {
  text?: string;
  strokeColor?: string;
}

export default function DecorativeText({
  text = 'THE FIRST COMMIT',
  strokeColor = 'var(--color-primary-400)',
}: DecorativeTextProps) {
  return (
    <div className="pointer-events-none absolute inset-0 z-0">
      {/* DESKTOP */}
      <div className="hidden lg:block">
        {/* RIGHT BORDER – higher */}
        <div className="absolute top-[35%] right-0 rotate-90">
          <p
            className="leading-none whitespace-nowrap text-transparent"
            style={{
              WebkitTextStroke: `1.5px ${strokeColor}`,
              fontSize: 'clamp(2rem, 3.5vw, 4.25rem)',
            }}
          >
            {text}
          </p>
        </div>

        {/* LEFT BORDER – lower */}
        <div className="absolute top-[65%] left-0 -rotate-90">
          <p
            className="leading-none whitespace-nowrap text-transparent"
            style={{
              WebkitTextStroke: `1.5px ${strokeColor}`,
              fontSize: 'clamp(2rem, 3.5vw, 4.25rem)',
            }}
          >
            {text}
          </p>
        </div>
      </div>

      {/* MOBILE – full screen feel */}
      <div className="flex h-full w-full flex-col justify-between lg:hidden">
        <div className="flex justify-center pt-3">
          <p
            className="leading-none whitespace-nowrap text-transparent"
            style={{
              WebkitTextStroke: `1px ${strokeColor}`,
              fontSize: 'clamp(2.25rem, 11vw, 3.5rem)',
            }}
          >
            {text}
          </p>
        </div>

        <div className="flex justify-center pb-3">
          <p
            className="leading-none whitespace-nowrap text-transparent"
            style={{
              WebkitTextStroke: `1px ${strokeColor}`,
              fontSize: 'clamp(2.25rem, 11vw, 3.5rem)',
            }}
          >
            {text}
          </p>
        </div>
      </div>
    </div>
  );
}
