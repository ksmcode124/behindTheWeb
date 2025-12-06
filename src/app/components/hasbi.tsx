'use client'
import { cn } from '@/lib/utils'
import { GlassesIcon, RocketIcon } from 'lucide-react'
import { motion } from 'framer-motion'
import React from 'react'

interface CardProps {
  expanded: boolean
  onToggle: () => void
  title: string
  content: string,
}


export default function Card({ expanded, onToggle, title, content }: CardProps) {
  const iconSize = expanded ? 45 : 85

  return (
    <motion.div
      onClick={onToggle}
      className={cn(
        "bg-[url('/assets/images/photo.svg')] bg-size-[700px] bg-fixed bg-top bg-no-repeat max-w-[460px] min-w-[228px] bg-black/75 duration-200 flex flex-col transition-all sm:px-16 sm:py-8 border-2 border-white rounded-[45px] h-[361px] cursor-pointer items-center justify-center sm:justify-around text-justify text-white overflow-hidden"
      )}
      layout
      animate={{
        width: expanded ? 460 : 228,
      }}
      transition={{
        // stiffness: 131,
        // damping: 50,
        // mass: 1,
        duration: 0.2,
        // ease: "easeInOut", // tanpa percepatan atau perlambatan

      }}

    >
      {/* Header */}
      <motion.div
        layout  // <-- membuat posisi elemen ikut animasi saat berubah
        transition={{
          duration: 0.2, // durasi total animasi
          // ease: "easeInOut", // tanpa percepatan atau perlambatan
        }}
        className={cn(
          "header flex items-center justify-center h-auto w-full text-[45px]",
          expanded ? "flex-row gap-4" : "flex-col"
        )}
      >

        <motion.div
          layout  // <-- ini penting agar icon ikut animasi layout
          transition={{
            duration: 0.5, // durasi total animasi
            ease: "easeInOut", // tanpa percepatan atau perlambatan
          }}
        >
          {title === "visi" && <GlassesIcon size={iconSize} />}
          {title === "misi" && <RocketIcon size={iconSize} />}
        </motion.div>

        <motion.h1
          layout
          transition={{
            duration: 0.5, // durasi total animasi
            ease: "easeInOut", // tanpa percepatan atau perlambatan
          }}
          className="font-semibold capitalize"
        >
          {title}
        </motion.h1>

      </motion.div>

      {expanded && (
        <motion.p
          className="mt-2 text-sm text-white w-[330px]"
          initial={{ x: 200, opacity: 0 }} // dari kanan ke kiri
          animate={{ x: 0, opacity: 8 }}
          exit={{ x: 200, opacity: 0 }}
          transition={{ duration: 0.7, ease: "easeInOut" }}
        >
          {content}
        </motion.p>
      )}
    </motion.div>
  )
}
