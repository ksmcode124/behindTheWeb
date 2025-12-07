interface WrapperProps {
  children?: React.ReactNode;
}

export default function Wrapper({ children }: WrapperProps) {
  return (
    <div className="border-secondary-400 relative flex flex-col items-center gap-15 rounded-t-[5em] bg-[linear-gradient(to_right,#FFF9E6_0%,#DEBB95_30%,#DEBB95_80%,#FFF9E6_100%)] px-10 py-30">
      <div className="border-secondary-400 absolute -top-3.5 left-0 h-10 w-full rounded-t-[15em] border-x border-t-2"></div>
      {children}
    </div>
  );
}
