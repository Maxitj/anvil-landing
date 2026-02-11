import React, { useEffect, useMemo, useRef, useState } from "react";

const HERO_ROTATING = [
  "create me a new wallet.",
  "buy this token.",
  "swap my USDC into another coin.",
  "help my savings earn more without risk.",
  "put my money in a high-yield vault.",
  "send money to a friend.",
];

const FEATURES = [
  {
    title: "Wallet",
    lines: [
      "Create your wallet in minutes.",
      "Self-custody, ready to use, set up for you.",
    ],
  },
  {
    title: "Buy / Sell / Swap",
    lines: [
      "Buy and sell crypto in an instant.",
      "Swap between coins without leaving the app.",
    ],
  },
  {
    title: "Earn / Vaults",
    lines: [
      "Make your money earn more, automatically.",
      "Rampy routes your funds into higher-yield vaults with clear risk controls.",
    ],
  },
  {
    title: "Send / Receive",
    lines: [
      "Send and receive money like it’s cash.",
      "Pay friends in seconds, without the friction.",
    ],
  },
  {
    title: "Find opportunities",
    lines: [
      "Find what to buy and execute on it.",
      "Discover assets and beyond, then act with one confirmation.",
    ],
  },
];

function PrimaryButton({ children }) {
  return (
    <button className="rounded-full px-6 py-3 text-sm font-medium bg-violet-300 text-black hover:bg-violet-200 transition shadow-[0_10px_30px_rgba(165,140,255,0.25)]">
      {children}
    </button>
  );
}

function Card({ title, lines, tone = "dark" }) {
  const base =
    "rounded-[32px] border p-6 w-[360px] sm:w-[380px] shrink-0";
  const styles =
    tone === "purple"
      ? "bg-violet-200 text-black border-black/10"
      : "bg-zinc-900/70 text-white border-white/10";

  return (
    <div className={`${base} ${styles}`}>
      <div className="font-semibold">{title}</div>
      <div className="mt-3 space-y-1 text-sm leading-relaxed opacity-80">
        {lines.map((l) => (
          <div key={l}>{l}</div>
        ))}
      </div>
      <div className="mt-6 h-[120px] rounded-[24px] bg-black/10 border border-black/5 opacity-70" />
    </div>
  );
}

function RotatingLine({ items, intervalMs = 2300 }) {
  const [idx, setIdx] = useState(0);
  const [phase, setPhase] = useState("in"); // "in" | "out"
  const timeoutRef = useRef(null);

  const maxLen = useMemo(
    () => items.reduce((m, s) => Math.max(m, s.length), 0),
    [items]
  );

  useEffect(() => {
    const tick = () => {
      setPhase("out");
      timeoutRef.current = setTimeout(() => {
        setIdx((x) => (x + 1) % items.length);
        setPhase("in");
      }, 220);
    };

    const id = setInterval(tick, intervalMs);
    return () => {
      clearInterval(id);
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, [items.length, intervalMs]);

  return (
    <span
      className="inline-block align-baseline"
      style={{ width: `${maxLen}ch` }}
    >
      <span
        className={`inline-block ${
          phase === "in" ? "anim-in" : "anim-out"
        }`}
      >
        {items[idx]}
      </span>
    </span>
  );
}

function Block4Engine() {
  return (
    <div className="relative rounded-[44px] bg-zinc-900/70 border border-white/10 p-10 overflow-hidden">
      {/* Glow */}
      <div className="pointer-events-none absolute -top-32 left-1/2 -translate-x-1/2 w-[680px] h-[680px] rounded-full bg-violet-500/20 blur-3xl" />
      <div className="pointer-events-none absolute bottom-[-220px] left-[10%] w-[520px] h-[520px] rounded-full bg-violet-500/10 blur-3xl" />

      <div className="relative">
        <div className="text-white/85 text-sm">
          Rampy turns intent into execution:
        </div>

        <div className="mt-2 text-white/60 text-sm">
          you describe the goal, Rampy chooses the path, and your strategy gets done
          with clarity on what happened and why.
        </div>

        <div className="mt-10 grid grid-cols-12 gap-6 items-center">
          {/* Left: Intent */}
          <div className="col-span-12 lg:col-span-3 rounded-3xl bg-black/30 border border-white/10 p-5">
            <div className="text-white font-semibold">Intent</div>
            <div className="mt-2 text-white/70 text-sm">
              You describe the goal
            </div>
          </div>

          {/* Center: Engine + SVG connectors */}
          <div className="col-span-12 lg:col-span-6 relative flex items-center justify-center py-6">
            <svg
              className="absolute inset-0 w-full h-full"
              viewBox="0 0 800 260"
              preserveAspectRatio="none"
            >
              {/* Left to engine */}
              <path
                d="M140 130 C250 130 250 130 340 130"
                stroke="rgba(255,255,255,0.22)"
                strokeWidth="2"
                fill="none"
              />

              {/* Engine to right nodes */}
              <path
                d="M460 80 C560 80 560 80 660 80"
                stroke="rgba(255,255,255,0.22)"
                strokeWidth="2"
                fill="none"
              />
              <path
                d="M460 130 C560 130 560 130 660 130"
                stroke="rgba(255,255,255,0.22)"
                strokeWidth="2"
                fill="none"
              />
              <path
                d="M460 180 C560 180 560 180 660 180"
                stroke="rgba(255,255,255,0.22)"
                strokeWidth="2"
                fill="none"
              />

              {/* Small routing nodes */}
              {[
                [240, 130],
                [290, 130],
                [520, 80],
                [580, 80],
                [520, 130],
                [580, 130],
                [520, 180],
                [580, 180],
              ].map(([x, y], i) => (
                <circle
                  key={i}
                  cx={x}
                  cy={y}
                  r="5"
                  fill="rgba(165,140,255,0.9)"
                />
              ))}

              {/* Extra tiny nodes around engine for "graph" feel */}
              {[
                [400, 45],
                [430, 55],
                [380, 205],
                [420, 215],
              ].map(([x, y], i) => (
                <circle
                  key={`tiny-${i}`}
                  cx={x}
                  cy={y}
                  r="3.5"
                  fill="rgba(255,255,255,0.25)"
                />
              ))}
            </svg>

            <div className="relative w-[190px] h-[190px] rounded-[56px] bg-black/35 border border-white/10 flex flex-col items-center justify-center">
              <div className="absolute inset-0 rounded-[56px] ring-1 ring-white/10" />
              <div className="w-12 h-12 rounded-2xl bg-violet-300/90 flex items-center justify-center text-black font-semibold">
                R
              </div>
              <div className="mt-4 text-white font-semibold tracking-wide">
                RAMPY
              </div>
              <div className="text-white/55 text-xs mt-1">ENGINE</div>
            </div>
          </div>

          {/* Right: Path / Execution / Clarity */
