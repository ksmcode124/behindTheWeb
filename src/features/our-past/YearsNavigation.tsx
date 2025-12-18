type Props = {
  kepengurusan: any;
  currentIndex: number;
  scrollToIndex: (index: number) => void;
};

export default function YearNavigation({
  kepengurusan,
  currentIndex,
  scrollToIndex,
}: Props) {
  const total = kepengurusan?.helper?.years.length || 0;

  return (
    <div>
      <div className="relative z-10 flex items-center justify-center gap-2">
        {kepengurusan?.helper?.years?.map((_: number, idx: number) => (
          <div
            key={idx}
            className={`h-2 w-2 rounded-full transition-all ${
              idx === currentIndex ? 'bg-secondary-300' : 'bg-secondary-400'
            }`}
            aria-label={`Go to year ${kepengurusan.helper.years[idx]}`}
          />
        ))}
      </div>

      <div className="my-4 flex items-center justify-center gap-4">
        <button
          disabled={currentIndex === 0}
          onClick={() => scrollToIndex(currentIndex - 1)}
          className="bg-primary-500 border-secondary-400 flex items-center justify-center rounded border p-2 transition-all disabled:cursor-not-allowed disabled:opacity-50"
          aria-label="Previous year"
        >
          <svg
            className="h-6 w-6 sm:h-7 sm:w-7 md:h-8 md:w-8"
            fill="currentColor"
            viewBox="0 0 24 24"
          >
            <path d="M20 2L4 12l16 10z" />
          </svg>
        </button>

        <div className="text-secondary-300 text-center text-4xl font-bold sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl">
          <span className="[-webkit-text-stroke-color:var(--color-secondary-400)] [-webkit-text-stroke-width:0.1px]">
            {kepengurusan?.helper.years[currentIndex]} /{' '}
            {Number(kepengurusan?.helper.years[currentIndex]) + 1}
          </span>
        </div>

        <button
          disabled={currentIndex === total - 1}
          onClick={() => scrollToIndex(currentIndex + 1)}
          className="bg-primary-500 border-secondary-400 flex items-center justify-center rounded border p-2 transition-all disabled:cursor-not-allowed disabled:opacity-50"
          aria-label="Next year"
        >
          <svg
            className="h-6 w-6 sm:h-7 sm:w-7 md:h-8 md:w-8"
            fill="currentColor"
            viewBox="0 0 24 24"
          >
            <path d="M4 2l16 10-16 10z" />
          </svg>
        </button>
      </div>
    </div>
  );
}
