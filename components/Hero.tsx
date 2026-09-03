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
      <div className="relative z-20 mx-auto mt-16 w-full px-6 sm:mt-24 sm:max-w-md sm:px-0">
        <motion.h1
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.15 }}
          className="w-full text-center text-8xl leading-[1.05] font-bold text-[#F3C6A5] sm:text-9xl md:text-[8rem] lg:text-[9rem] font-erica"
        >
          <span className="block">FALL</span>
          <span className="block">CATS</span>
        </motion.h1>
      </div>

      {/* Paragraph — separate wrapper, sized on its own */}
      <div className="relative font-bold z-20 mx-auto mt-5 w-full max-w-[80vw] px-6 sm:max-w-lg sm:px-0">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.35 }}
          className="flex justify-center"
        >
          <a
            href="https://opensea.io/collection/fall-cats"
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-xl border border-[#F3C6A5]/40 bg-[#F3C6A5]/10 px-8 py-3 font-road-rage text-[11px] tracking-widest text-[#F3C6A5] backdrop-blur-sm transition hover:bg-[#F3C6A5]/20"
          >
            MINT ON OPENSEA
          </a>
        </motion.div>
      </div>

    </section>
  );
}