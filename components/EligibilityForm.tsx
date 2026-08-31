"use client";

import { useState, FormEvent, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

type Status = "idle" | "checking" | "both" | "gtd" | "fcfs" | "not-found" | "invalid" | "error";

const COPY: Record<Exclude<Status, "idle" | "checking">, { title: string; body: string; tone: string }> = {
  both: {
    title: "You're Guaranteed AND on FCFS",
    body: "This wallet is on both lists. Your GTD spot is guaranteed — the FCFS entry just gives you a second shot if you want more than one.",
    tone: "border-sakura-300/60 bg-sakura-500/10 text-sakura-50",
  },
  gtd: {
    title: "You're Guaranteed",
    body: "This wallet is on the GTD list. Mint opens at the marked hour — 1 per wallet, no gas war needed.",
    tone: "border-sakura-300/60 bg-sakura-500/10 text-sakura-50",
  },
  fcfs: {
    title: "You're in for FCFS",
    body: "This wallet is on the FCFS list. No guaranteed spot — be online when the window opens, it's first come, first served.",
    tone: "border-gold/50 bg-gold/10 text-sakura-50",
  },
  "not-found": {
    title: "No record on this branch",
    body: "We couldn't match this address to GTD or FCFS. Double-check it, or follow us for public mint details.",
    tone: "border-white/20 bg-white/5 text-sakura-100",
  },
  invalid: {
    title: "That doesn't look like a wallet",
    body: "Double-check the address — it should be a full 0x… address, 42 characters long.",
    tone: "border-white/20 bg-white/5 text-sakura-100",
  },
  error: {
    title: "The branch is shaking",
    body: "Something went wrong on our end checking that address. Try again in a moment.",
    tone: "border-white/20 bg-white/5 text-sakura-100",
  },
};

export default function EligibilityForm() {
  const [address, setAddress] = useState("");
  const [status, setStatus] = useState<Status>("idle");
  const [checkedAddress, setCheckedAddress] = useState("");
  const requestIdRef = useRef(0);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    const trimmed = address.trim();
    if (!trimmed) return;

    // Bump the request id and remember it — if a slower, older request
    // resolves after a newer one, we ignore it instead of letting it
    // overwrite the correct, more recent result.
    const thisRequestId = ++requestIdRef.current;

    setStatus("checking");

    try {
      const res = await fetch("/api/check-eligibility", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ address: trimmed }),
      });
      const data = await res.json();

      if (thisRequestId !== requestIdRef.current) return; // a newer check superseded this one

      setStatus((data.status as Status) ?? "error");
      setCheckedAddress(trimmed);
    } catch {
      if (thisRequestId !== requestIdRef.current) return;
      setStatus("error");
      setCheckedAddress(trimmed);
    }
  }

  return (
    <section
      id="eligibility"
      className="relative z-10 flex min-h-[90vh] w-full flex-col items-center justify-center px-6 py-24"
    >

      <h2 className="mb-4 text-center font-erica text-sakura-50">
        <span className="block text-[#A94F63] text-7xl font-bold leading-none md:text-9xl">
          CHECK
        </span>
        <span className="mt-2 block text-3xl text-[#A94F63] md:text-5xl">
          YOUR ELIGIBILITY
        </span>
      </h2>

      <p className="mb-10 max-w-sm text-center font-road-rage text-sm text-sakura-100/60">
        Paste your wallet address to check allowlist status ahead of mint.
      </p>

      <form
        onSubmit={handleSubmit}
        className="flex w-full max-w-md flex-col gap-3 sm:flex-row"
      >
        <input
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          placeholder="0x..."
          spellCheck={false}
          className="w-full flex-1 rounded-xl border border-sakura-300/25 bg-white/5 px-4 py-3 font-road-rage text-sm text-sakura-50 placeholder:text-sakura-100/30 outline-none backdrop-blur-sm transition focus:border-sakura-300/70 focus:bg-white/10"
        />
        <button
          type="submit"
          disabled={status === "checking"}
          className="shrink-0 rounded-xl bg-sakura-500 px-6 py-3 font-road-rage text-[11px] tracking-widest text-ink transition hover:bg-sakura-400 disabled:opacity-60"
        >
          {status === "checking" ? "CHECKING…" : "CHECK"}
        </button>
      </form>

      <div className="mt-6 w-full max-w-md">
        <AnimatePresence mode="wait">
          {status !== "idle" && status !== "checking" && (
            <motion.div
              key={`${status}-${checkedAddress}`}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.3 }}
              className={`rounded-xl border px-5 py-4 ${COPY[status].tone}`}
            >
              <p className="font-road-rage text-lg font-bold">{COPY[status].title}</p>
              <p className="mt-1 font-road-rage text-sm opacity-80">{COPY[status].body}</p>
            </motion.div>
          )}
          {status === "checking" && (
            <motion.div
              key="checking"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="flex items-center justify-center gap-2 py-4 font-road-rage text-[11px] tracking-widest text-sakura-100/60"
            >
              <span className="inline-block h-2 w-2 animate-ping rounded-full bg-sakura-300" />
              READING THE WIND
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}