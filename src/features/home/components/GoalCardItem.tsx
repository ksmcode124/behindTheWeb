'use client';

import { cn } from '@/lib/utils';
import { GlassesIcon, RocketIcon } from 'lucide-react';
import { motion } from 'framer-motion';
import React, { useEffect, useState } from 'react';

interface CardProps {
  expanded: boolean;
  onToggle: () => void;
  title: string;
  content: string;
  imageMask?: string;
}

export default function GoalCardItem({
  expanded,
  onToggle,
  title,
  content,
  imageMask,
}: CardProps) {
  const [isDesktop, setIsDesktop] = useState(false);

  useEffect(() => {
    const update = () => setIsDesktop(window.innerWidth >= 768);
    update();
    window.addEventListener('resize', update);
    return () => window.removeEventListener('resize', update);
  }, []);

  const iconSize = expanded ? 45 : 85;

  return (
    <motion.div
      onClick={onToggle}
      layout
      animate={{
        width: isDesktop ? (expanded ? 460 : 228) : 228,
      }}
      transition={{ duration: 0.2 }}
      className={cn(
        'text-secondary-400 relative flex h-[361px] cursor-pointer flex-col items-center justify-center overflow-hidden rounded-[45px] border-2 border-white',
      )}
    >
      {/* IMAGE LAYER */}
      <div
        aria-hidden
        className={cn(
          "absolute inset-0 bg-[url('/images/origin_first_commit.webp')] bg-size-[700px] bg-no-repeat",
          title === 'misi' ? 'bg-right' : 'bg-left',
        )}
        style={{
          maskImage: imageMask,
          WebkitMaskImage: imageMask,
        }}
      />

      {/* DARK WASH */}
      <div aria-hidden className="bg-secondary-300/65 absolute inset-0" />

      {/* CONTENT */}
      <div className="relative z-10 flex flex-col items-center justify-center">
        {/* HEADER */}
        <motion.div
          layout
          transition={{ duration: 0.2 }}
          className={cn(
            'flex w-full items-center justify-center text-[45px]',
            expanded ? 'gap-4 md:flex-row' : 'md:flex-col',
          )}
        >
          <motion.div layout transition={{ duration: 0.5, ease: 'easeInOut' }}>
            {title === 'visi' && <GlassesIcon size={iconSize} />}
            {title === 'misi' && <RocketIcon size={iconSize} />}
          </motion.div>

          <motion.h1
            layout
            transition={{ duration: 0.5, ease: 'easeInOut' }}
            className="font-semibold capitalize"
          >
            {title}
          </motion.h1>
        </motion.div>

        {/* CONTENT */}
        {expanded && (
          <motion.p
            className="mt-2 w-[180px] text-sm md:w-[330px]"
            initial={{ x: 200, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: 200, opacity: 0 }}
            transition={{ duration: 0.7, ease: 'easeInOut' }}
          >
            {content}
          </motion.p>
        )}
      </div>
    </motion.div>
  );
}
