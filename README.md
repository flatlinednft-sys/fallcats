# Hanafubuki — Sakura Mint

Single-page Next.js 15 (App Router) mint site: sakura hero → eligibility
checker → curved NFT marquee, with a page-wide pixelated falling-petal
animation on canvas.

## Run it

```bash
npm install
npm run dev
```

Open http://localhost:3000. (Couldn't run `npm install` here since this
sandbox has no network access — do it locally.)

## Swap in your own art

- `public/sakura-bg.svg` — hero background. Replace with your own image/photo
  (jpg/png/webp all fine, just update the path in `components/Hero.tsx`).
- `public/nfts/nft-1.svg` … `nft-8.svg` — marquee thumbnails. Replace with
  your real NFT renders, same filenames or update `CurvedMarquee.tsx`.

Everything currently in `public/` is placeholder pixel-art generated for
this scaffold — built to be thrown away.

## Where things live

- `components/SakuraPetals.tsx` — the fixed, page-wide canvas animation.
  Pixelated on purpose (`ctx.imageSmoothingEnabled = false` + a chunky sprite
  grid instead of soft circles). Respects `prefers-reduced-motion`.
- `components/Hero.tsx` — section 01, the bg + headline + scroll cue.
- `components/EligibilityForm.tsx` — section 02. `fakeEligibilityCheck()`
  is a deterministic stand-in — swap it for a real allowlist lookup
  (contract read via wagmi/viem, or a call to your API).
- `components/CurvedMarquee.tsx` — section 03. Items are driven by
  `requestAnimationFrame`, positioned along a sine-wave arc as they travel
  left → right, looping. Tune `SPEED`, `ITEM_W`, `ARC_HEIGHT` at the top of
  the file.

## Stack

Next.js 15 · React 19 · TypeScript · Tailwind CSS · Framer Motion
