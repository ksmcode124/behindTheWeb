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
      <div className="relative z-10 flex justify-center gap-2">
        {kepengurusan?.helper?.years?.map((_, idx) => (
          <button
            key={idx}
            onClick={() => scrollToIndex(idx)}
            className={`h-2 w-2 rounded-full transition-all ${
              idx === currentIndex ? 'bg-secondary-300' : 'bg-secondary-400'
            }`}
            aria-label={`Go to year ${kepengurusan.helper.years[idx]}`}
          />
        ))}
      </div>

      <div className="my-4 flex justify-center gap-4">
        <button
          disabled={currentIndex === 0}
          onClick={() => scrollToIndex(currentIndex - 1)}
          className="bg-primary-500 flex items-center justify-center rounded p-3 transition-all disabled:cursor-not-allowed disabled:opacity-50"
          aria-label="Previous year"
        >
          <svg
            className="h-6 w-6 sm:h-7 sm:w-7 md:h-8 md:w-8"
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path
              fillRule="evenodd"
              d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
              clipRule="evenodd"
            />
          </svg>
        </button>

        <div className="text-secondary-400 text-center text-4xl font-bold sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl">
          <span className="[-webkit-text-stroke-color:var(--color-secondary-300)] [-webkit-text-stroke-width:2px]">
            {kepengurusan?.helper.years[currentIndex]} /{' '}
            {Number(kepengurusan?.helper.years[currentIndex]) + 1}
          </span>
        </div>

        <button
          disabled={currentIndex === total - 1}
          onClick={() => scrollToIndex(currentIndex + 1)}
          className="bg-primary-500 flex items-center justify-center rounded p-3 transition-all disabled:cursor-not-allowed disabled:opacity-50"
          aria-label="Next year"
        >
          <svg
            className="h-6 w-6 sm:h-7 sm:w-7 md:h-8 md:w-8"
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path
              fillRule="evenodd"
              d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
              clipRule="evenodd"
            />
          </svg>
        </button>
      </div>
    </div>
  );
}
