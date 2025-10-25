'use client'
import { cn } from '@/lib/utils';
import { GlassesIcon } from 'lucide-react'
import { RocketIcon } from 'lucide-react';
import React from 'react'

interface CardProps {
  expanded: boolean;
  onToggle: () => void;
  title: string;
  content: string;
}

export default function Card({ expanded, onToggle, title, content }: CardProps) {

  return (
    <div
      onClick={onToggle}
      className={cn(
        "max-w-[460px] min-w-[228px] bg-black/75 duration-200 flex flex-col transition-all black sm:px-16 sm:py-8 border-2 border-white rounded-[45px] h-[361px] cursor-pointer items-center justify-center sm:justify-around text-justify text-white",
      )}
    >
      <div
        className={cn(
          "header flex items-center justify-center h-auto w-full text-[45px]",
          expanded ? "flex-row gap-4" : "flex-col"
        )}
      >
      {title == "visi" && <GlassesIcon size={cn(expanded ? 45 : 85)} /> }
      {title == "misi" && <RocketIcon size={cn(expanded ? 45 : 85)} />}
        <h1 className="font-semibold capitalize">{title}</h1>
      </div>
      {expanded && (
        <p className="mt-2 text-sm text-white">
          {content}
        </p>
      )}
    </div>
  );
}
