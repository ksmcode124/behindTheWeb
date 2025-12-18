import React, { JSX } from 'react';

interface ShadowedTextProps {
  as?: keyof JSX.IntrinsicElements;
  children: React.ReactNode;
  className?: string;
  textShadow?: string;
  textColor?: string;
  strokeWidth?: string;
}

const DEFAULT_TEXT_SHADOW =
  '0.04em 0.04em 0 #FEB863,0.08em 0.08em 0 #F3D199,0.12em 0.12em 0 #F2D39C,0.18em 0.18em 0 #AEBC8B,0.24em 0.24em 0 #5EAA9E';

const DEFAULT_TEXT_COLOR = 'var(--color-secondary-400)';

export default function ShadowedText({
  as: Component = 'h1',
  children,
  className = '',
  textShadow,
  textColor,
  strokeWidth,
}: ShadowedTextProps) {
  const shadowValue = textShadow ?? DEFAULT_TEXT_SHADOW;
  const colorValue = textColor ?? DEFAULT_TEXT_COLOR;

  return (
    <Component
      className={`font-display ${className}`}
      style={{
        WebkitTextStroke: `${strokeWidth || '0.04em'} var(--color-primary-500)`,
        textShadow: shadowValue,
        color: colorValue,
      }}
    >
      {children}
    </Component>
  );
}
