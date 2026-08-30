"use client";

import { useEffect, useRef } from "react";

interface Petal {
  x: number;
  y: number;
  size: number;
  speedY: number;
  speedX: number;
  sway: number;
  phase: number;
  rotation: number;
  rotationSpeed: number;
  wobble: number;
  wobblePhase: number;
  color: string;
  opacity: number;
}

const COLORS = [
  "#F6A6B8", // soft sakura
  "#F28FA8", // warm pink
  "#FFC1CC", // light blossom
  "#E88998", // strawberry pink
  "#FFD1D8", // pale pink
];

export default function SakuraPetals() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let width = window.innerWidth;
    let height = window.innerHeight;
    let dpr = Math.min(window.devicePixelRatio || 1, 2);

    const resize = () => {
      width = window.innerWidth;
      height = window.innerHeight;

      dpr = Math.min(window.devicePixelRatio || 1, 2);

      canvas.width = width * dpr;
      canvas.height = height * dpr;

      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;

      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    resize();
    window.addEventListener("resize", resize);

    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    const COUNT = reduceMotion
      ? 0
      : Math.min(55, Math.max(25, Math.floor(width / 28)));

    function spawnPetal(randomY = false): Petal {
      return {
        x: Math.random() * width,
        y: randomY
          ? Math.random() * height
          : -30 - Math.random() * 100,

        size: 5 + Math.random() * 10,

        speedY: 0.35 + Math.random() * 1.1,
        speedX: -0.2 + Math.random() * 0.4,

        sway: 0.5 + Math.random() * 1.5,
        phase: Math.random() * Math.PI * 2,

        rotation: Math.random() * Math.PI * 2,

        rotationSpeed:
          (Math.random() - 0.5) * 0.035,

        wobble: 0.02 + Math.random() * 0.04,
        wobblePhase: Math.random() * Math.PI * 2,

        color:
          COLORS[Math.floor(Math.random() * COLORS.length)],

        opacity: 0.55 + Math.random() * 0.45,
      };
    }

    const petals: Petal[] = Array.from(
      { length: COUNT },
      () => spawnPetal(true)
    );

    function drawPetal(p: Petal) {
      const s = p.size;

      ctx.save();

      ctx.globalAlpha = p.opacity;

      ctx.translate(p.x, p.y);
      ctx.rotate(p.rotation);

      /*
        Organic sakura petal shape.
        Slightly heart-like with a small indentation
        at the top, instead of a perfect oval.
      */

      ctx.beginPath();

      ctx.moveTo(0, -s * 0.45);

      // left upper curve
      ctx.bezierCurveTo(
        -s * 0.7,
        -s * 0.75,
        -s * 0.95,
        -s * 0.05,
        -s * 0.55,
        s * 0.45
      );

      // bottom tip
      ctx.bezierCurveTo(
        -s * 0.3,
        s * 0.85,
        s * 0.3,
        s * 0.85,
        s * 0.55,
        s * 0.45
      );

      // right side
      ctx.bezierCurveTo(
        s * 0.95,
        -s * 0.05,
        s * 0.7,
        -s * 0.75,
        0,
        -s * 0.45
      );

      ctx.closePath();

      ctx.fillStyle = p.color;
      ctx.fill();

      /*
        Tiny subtle center variation.
        Makes petals feel less like flat SVG shapes.
      */

      ctx.globalAlpha = p.opacity * 0.18;

      ctx.beginPath();

      ctx.ellipse(
        0,
        s * 0.15,
        s * 0.25,
        s * 0.45,
        0,
        0,
        Math.PI * 2
      );

      ctx.fillStyle = "#ffffff";
      ctx.fill();

      ctx.restore();
    }

    let animationFrame = 0;
    let time = 0;

    function animate() {
      time += 0.015;

      ctx.clearRect(0, 0, width, height);

      for (const p of petals) {
        // Falling
        p.y += p.speedY;

        // Wind drifting
        p.x +=
          p.speedX +
          Math.sin(time + p.phase) *
            p.sway *
            0.7;

        // Gentle flutter rotation
        p.rotation +=
          p.rotationSpeed +
          Math.sin(time * 2 + p.wobblePhase) *
            p.wobble;

        // Respawn
        if (
          p.y > height + 40 ||
          p.x < -50 ||
          p.x > width + 50
        ) {
          Object.assign(p, spawnPetal(false));
        }

        drawPetal(p);
      }

      animationFrame =
        requestAnimationFrame(animate);
    }

    if (!reduceMotion) {
      animationFrame =
        requestAnimationFrame(animate);
    }

    return () => {
      cancelAnimationFrame(animationFrame);
      window.removeEventListener(
        "resize",
        resize
      );
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-30"
    />
  );
}