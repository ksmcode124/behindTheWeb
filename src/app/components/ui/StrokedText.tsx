interface StrokedTextProps {
  children: React.ReactNode;
  color?: string;
  strokeColor?: string;
  className?: string;
}

export default function StrokedText({
  children,
  strokeColor = 'black',
  className,
}: StrokedTextProps) {
  return (
    <p
      className={className}
      style={{
        WebkitTextStrokeWidth: '2.87px',
        WebkitTextStrokeColor: strokeColor,
      }}
    >
      {children}
    </p>
  );
}
