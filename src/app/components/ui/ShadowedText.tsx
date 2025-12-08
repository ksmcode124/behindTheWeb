import React, { JSX } from 'react';

interface ShadowedTextProps {
  as?: keyof JSX.IntrinsicElements;
  children: React.ReactNode;
  className?: string;
  textShadow?: string;
  textColor?: string;
  /** Custom stroke width (will be responsive automatically) */
  strokeWidth?: string;
}

const DEFAULT_TEXT_SHADOW =
  '4px 4px 0 #FEB863, 6px 6px 0 #F3D199, 8px 8px 0 #F2D39C, 10px 10px 0 #AEBC8B, 12px 12px 0 #5EAA9E';

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
        WebkitTextStroke: `${strokeWidth || '2.87px'} var(--color-primary-500)`,
        textShadow: shadowValue,
        color: colorValue,
      }}
    >
      {children}
    </Component>
  );
}
