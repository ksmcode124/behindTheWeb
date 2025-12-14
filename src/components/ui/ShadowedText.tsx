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
  '7px 7px 0 #FEB863, 12px 12px 0 #F3D199, 14px 14px 0 #F2D39C, 16px 16px 0 #AEBC8B, 18px 18px 0 #5EAA9E';

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
        WebkitTextStroke: `${strokeWidth || '2px'} var(--color-primary-500)`,
        textShadow: shadowValue,
        color: colorValue,
      }}
    >
      {children}
    </Component>
  );
}
