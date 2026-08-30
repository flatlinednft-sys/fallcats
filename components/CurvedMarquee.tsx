"use client";

import { useEffect, useRef } from "react";

const NFTS = Array.from({ length: 8 }, (_, i) => ({
  id: i + 1,
  src: `/nfts/nft-${i + 1}.svg`,
  name: `Hanafubuki #${String(i + 1).padStart(3, "0")}`,
}));

const SPEED = 60; // px per second
const ITEM_W = 220; // spacing between items along the track
const ARC_HEIGHT = 90; // how far items rise at the peak of the curve

export default function CurvedMarquee() {
  const trackRef = useRef<HTMLDivElement>(null);
  const itemRefs = useRef<(HTMLDivElement | null)[]>([]);
  const offsetRef = useRef(0);

  useEffect(() => {
    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    let raf = 0;
    let last = performance.now();
    const loopWidth = ITEM_W * NFTS.length;

    function frame(now: number) {
      const dt = (now - last) / 1000;
      last = now;
      if (!reduceMotion) offsetRef.current += SPEED * dt;

      const container = trackRef.current;
      const width = container ? container.clientWidth : 1200;

      itemRefs.current.forEach((el, i) => {
        if (!el) return;
        // base x for this item, wrapped into a continuous conveyor
        let x = (i * ITEM_W + offsetRef.current) % loopWidth;
        if (x < 0) x += loopWidth;
        // shift so items enter from the left edge and exit past the right
        x -= ITEM_W;

        // progress across the visible span, used to bend the path into an arc
        const span = width + ITEM_W * 2;
        const progress = (x + ITEM_W) / span; // 0 -> 1 across full travel
        const arcY = -Math.sin(progress * Math.PI) * ARC_HEIGHT;
        const rotate = Math.cos(progress * Math.PI) * -8;
        const scale = 0.75 + Math.sin(progress * Math.PI) * 0.35;
        const opacity = 0.35 + Math.sin(progress * Math.PI) * 0.65;

        el.style.transform = `translate3d(${x}px, ${arcY}px, 0) rotate(${rotate}deg) scale(${scale})`;
        el.style.opacity = String(Math.max(0.15, opacity));
        el.style.zIndex = String(Math.round(scale * 100));
      });

      raf = requestAnimationFrame(frame);
    }

    raf = requestAnimationFrame(frame);
    return () => cancelAnimationFrame(raf);
  }, []);

  return (
    <section className="relative z-10 w-full overflow-hidden py-20">

      <div
        ref={trackRef}
        className="relative h-[260px] w-full"
        aria-hidden="true"
      >
        {NFTS.map((nft, i) => (
          <div
            key={nft.id}
            ref={(el) => {
              itemRefs.current[i] = el;
            }}
            className="absolute left-0 top-1/2 -mt-16 w-32 will-change-transform"
          >
            <div className="overflow-hidden rounded-2xl border border-sakura-200/20 bg-plum/60 shadow-[0_10px_40px_-10px_rgba(232,84,140,0.5)] backdrop-blur-sm">
              <img
                src={nft.src}
                alt={nft.name}
                className="h-32 w-32 object-cover pixelated"
                draggable={false}
              />
            </div>
          </div>
        ))}
      </div>

      <p className="sr-only">
        Decorative floating showcase of Hanafubuki NFT thumbnails.
      </p>
    </section>
  );
}