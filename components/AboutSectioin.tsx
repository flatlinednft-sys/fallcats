"use client";

import { motion } from "framer-motion";

const OPENSEA_URL = "https://opensea.io/collection/fall-cats"; // swap for real slug

const CARDS = [
  {
    title: "MINT ON OPENSEA",
    body: "Mint FALL CATS on opensea.",
    cta: "MINT NOW",
    href: OPENSEA_URL,
  },
  {
    title: "VIEW COLLECTION",
    body: "Browse our collection.",
    cta: "BROWSE",
    href: OPENSEA_URL,
  },
  {
    title: "JOIN THE PORCH",
    body: "Follow us on Twitter.",
    cta: "JOIN US",
    href: "https://x.com/fallcatsnft",
  },
];

export default function AboutSection() {
  return (
    <section
      id="about"
      className="relative z-10 flex min-h-[90vh] w-full flex-col items-center justify-center px-6 py-24"
    >
      <h2 className="mb-4 text-center font-erica text-sakura-50">
        <span className="block text-[#A94F63] text-7xl font-bold leading-none md:text-9xl">
          ABOUT
        </span>
        <span className="mt-2 block text-3xl text-[#A94F63] md:text-5xl">
          OUR PROJECT 
        </span>
      </h2>

      <p className="mb-14 max-w-lg text-center font-road-rage text-sm text-sakura-100/60">
                  Fall Cats is a collection of 3,333 pixelated cats, each created with a wide variety of hand-drawn traits, colors, accessories, and backgrounds. Inspired by warm autumn tones and falling leaves, the collection combines a cozy atmosphere with a playful pixel-art style. Every cat features its own unique combination of traits, making each piece part of the larger Fall Cats collection.
      </p>

      <div className="grid w-full max-w-4xl grid-cols-1 gap-5 sm:grid-cols-3">
        {CARDS.map((card, i) => (
          <motion.a
            key={card.title}
            href={card.href}
            target="_blank"
            rel="noopener noreferrer"
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.4, delay: i * 0.08 }}
            className="group relative flex flex-col overflow-hidden rounded-3xl border border-sakura-300/25 bg-white/5 p-6 backdrop-blur-sm transition hover:border-sakura-300/50 hover:bg-white/10"
          >
            <div className="pointer-events-none absolute -top-10 -right-10 h-32 w-32 rounded-full bg-sakura-500/20 blur-2xl transition group-hover:bg-sakura-500/30" />

            <p className="relative font-road-rage text-sm font-bold tracking-widest text-sakura-50">
              {card.title}
            </p>
            <p className="relative mt-2 font-road-rage text-sm text-sakura-100/60">
              {card.body}
            </p>
            <span className="relative mt-5 inline-block font-road-rage text-[11px] tracking-widest text-gold">
              {card.cta} →
            </span>
          </motion.a>
        ))}
      </div>
    </section>
  );
}