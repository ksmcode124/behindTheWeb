import React, { JSX } from 'react';

interface ShadowedTextProps {
  as?: keyof JSX.IntrinsicElements;
  children: React.ReactNode;
  className?: string;
  textShadow?: string;
}

export default function ShadowedText({
  as: Component = 'h1',
  children,
  className = '',
  textShadow,
}: ShadowedTextProps) {
  return (
    <Component
      className={`text-secondary-400 font-display -rotate-3 ${className} ${
        textShadow
          ? `[text-shadow:${textShadow}]`
          : '[text-shadow:4px_4px_0_#FEB863,6px_6px_0_#F3D199,8px_8px_0_#F2D39C,10px_10px_0_#AEBC8B,12px_12px_0_#5EAA9E]'
      } [-webkit-text-stroke-color:var(--color-primary-500)] [-webkit-text-stroke-width:2.87px]`}
    >
      {children}
    </Component>
  );
}
