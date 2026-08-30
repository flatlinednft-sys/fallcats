"use client";

import { motion } from "framer-motion";

export default function Hero() {
  return (
    <section className="relative flex h-[100svh] w-full flex-col items-center justify-center overflow-hidden">
      
      <div
        className="absolute inset-0 bg-cover bg-center pixelated"
        style={{ backgroundImage: "url(/sakura-bg.svg)" }}
      />

      <div className="absolute inset-0 bg-gradient-to-b from-black/10 via-black/20 to-ink" />

      {/* Heading — its own wrapper, its own sizing */}
      <div className="relative z-20 mx-auto mt-16 w-full max-w-[70vw] px-6 sm:mt-24 sm:max-w-md sm:px-0">
        <motion.h1
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.15 }}
          className="text-right text-8xl leading-[1.05] font-bold text-[#F3C6A5] sm:text-9xl md:text-[8rem] lg:text-[9rem] font-erica"
        >
          <span className="block">FALL</span>
          <span className="block">CATS</span>
        </motion.h1>
      </div>

      {/* Paragraph — separate wrapper, sized on its own */}
      <div className="relative z-20 mx-auto mt-5 w-full max-w-[80vw] px-6 sm:max-w-md sm:px-0">
        <p className="text-left text-sm leading-relaxed text-[#F3C6A5] break-words sm:text-base md:text-lg font-[family-name:var(--font-dm-sans)]">
          Fall Cats is a collection of 3,333 pixelated cats, each created with a wide variety of hand-drawn traits, colors, accessories, and backgrounds. Inspired by warm autumn tones and falling leaves, the collection combines a cozy atmosphere with a playful pixel-art style. Every cat features its own unique combination of traits, making each piece part of the larger Fall Cats collection.
        </p>
      </div>

    </section>
  );
}