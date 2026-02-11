"use client";

import React, { useEffect, useMemo, useState } from "react";

const heroRotating = [
  "create me a new wallet",
  "buy this token",
  "swap my USDC into another coin",
  "help my savings earn more without risk",
  "put my money in a high-yield vault",
  "send money to a friend",
];

type Feature = { title: string; lines: string[] };

const features: Feature[] = [
  { title: "Wallet", lines: ["Create your wallet in minutes.", "Self-custody, ready to use, set up for you."] },
  { title: "Buy / Sell / Swap", lines: ["Buy and sell crypto in an instant.", "Swap between coins without leaving the app."] },
  { title: "Earn / Vaults", lines: ["Make your money earn more, automatically.", "Rampy routes your funds into higher-yield vaults with clear risk controls."] },
  { title: "Send / Receive", lines: ["Send and receive money like it’s cash.", "Pay friends in seconds, without the friction."] },
  { title: "Find opportunities", lines: ["Discover what to buy and execute on it.", "Find assets and act with one confirmation."] },
];

function PillButton({ children }: { children: React.ReactNode }) {
  return (
    <button className="rounded-full px-6 py-3 text-sm font-medium bg-violet-300 text-black hover:bg-violet-200 transition shadow">
      {children}
    </button>
  );
}

function Card({ title, lines }: Feature) {
  return (
    <div className="rounded-3xl bg-zinc-900/70 border border-white/10 p-6 w-[360px]">
      <div className="text-white font-semibold">{title}</div>
      <div className="mt-3 space-y-1 text-white/75 text-sm leading-relaxed">
        {lines.map((l) => (
          <div key={l}>{l}</div>
        ))}
      </div>
    </div>
  );
}

function IntentGraph() {
  return (
    <div className="relative rounded-[44px] bg-zinc-900/70 border border-white/10 p-10 overflow-hidden">
      <div className="absolute -top-24 left-1/2 -translate-x-1/2 w-[520px] h-[520px] rounded-full bg-violet-500/20 blur-3xl" />

      <div className="relative">
        <div className="text-white/80 text-sm">Rampy turns intent into execution.</div>

        <div className="mt-8 grid grid-cols-12 gap-6 items-center">
          {/* Left node */}
          <div className="col-span-3 rounded-3xl bg-black/30 border border-white/10 p-5">
            <div className="text-white font-semibold">Intent</div>
            <div className="mt-2 text-white/70 text-sm">You describe the goal</div>
          </div>

          {/* Center engine */}
          <div className="col-span-6 flex items-center justify-center relative">
            <svg className="absolute inset-0 w-full h-full" viewBox="0 0 600 200" preserveAspectRatio="none">
              {/* connectors */}
              <path d="M120 100 C200 100 200 100 260 100" stroke="rgba(255,255,255,0.25)" strokeWidth="2" fill="none" />
              <path d="M340 60 C420 60 420 60 480 60" stroke="rgba(255,255,255,0.25)" strokeWidth="2" fill="none" />
              <path d="M340 140 C420 140 420 140 480 140" stroke="rgba(255,255,255,0.25)" strokeWidth="2" fill="none" />
              {/* tiny nodes */}
              {[
                [190, 100],
                [230, 100],
                [400, 60],
                [440, 60],
                [400, 140],
                [440, 140],
              ].map(([x, y], i) => (
                <circle key={i} cx={x} cy={y} r="4" fill="rgba(165,140,255,0.9)" />
              ))}
            </svg>

            <div className="w-[180px] h-[180px] rounded-[48px] bg-black/40 border border-white/10 flex flex-col items-center justify-center">
              <div className="text-white font-semibold tracking-wide">RAMPY</div>
              <div className="text-white/60 text-xs mt-1">ENGINE</div>
            </div>
          </div>

          {/* Right side nodes */}
          <div className="col-span-3 space-y-6">
            <div className="rounded-3xl bg-black/30 border border-white/10 p-5">
              <div className="text-white font-semibold">Path</div>
              <div className="mt-2 text-white/70 text-sm">Rampy chooses the path</div>
            </div>
            <div className="rounded-3xl bg-black/30 border border-white/10 p-5">
              <div className="text-white font-semibold">Execution</div>
              <div className="mt-2 text-white/70 text-sm">Your strategy gets done</div>
            </div>
            <div className="rounded-3xl bg-black/30 border border-white/10 p-5">
              <div className="text-white font-semibold">Clarity</div>
              <div className="mt-2 text-white/70 text-sm">Clarity on what happened and why</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function Page() {
  const [heroIdx, setHeroIdx] = useState(0);

  useEffect(() => {
    const t = setInterval(() => setHeroIdx((x) => (x + 1) % heroRotating.length), 2200);
    return () => clearInterval(t);
  }, []);

  const featureWindow = useMemo(() => {
    // 3-visible carousel driven by heroIdx for simplicity
    const start = heroIdx % features.length;
    return [features[start], features[(start + 1) % features.length], features[(start + 2) % features.length]];
  }, [heroIdx]);

  return (
    <main className="min-h-screen bg-[#0F0F14] text-white">
      <div className="mx-auto max-w-6xl px-8 py-16">
        {/* Block 1 */}
        <section className="grid grid-cols-12 gap-10 items-center">
          <div className="col-span-6">
            <div className="text-6xl font-semibold leading-[1.0]">
              <div>Rampy</div>
              <div className="mt-3 text-white/80 text-4xl">{heroRotating[heroIdx]}</div>
            </div>

            <div className="mt-8 text-white/70 text-lg leading-relaxed">
              <div>Rampy the next-generation engine for digital assets.</div>
              <div>Tell Rampy what you want. It executes for you.</div>
            </div>

            <div className="mt-10 flex items-center gap-4">
              <PillButton>Start talking now</PillButton>
              <div className="text-white/50 text-sm">Conversation-first crypto execution</div>
            </div>
          </div>

          <div className="col-span-6">
            <div className="relative rounded-[44px] bg-zinc-900/70 border border-white/10 h-[460px] overflow-hidden flex items-center justify-center">
              <div className="absolute w-[520px] h-[520px] rounded-full bg-violet-500/20 blur-3xl" />
              <div className="relative w-[220px] h-[220px] rounded-[56px] bg-black/40 border border-white/10 flex items-center justify-center">
                <div className="text-white/80 font-semibold">ghost</div>
              </div>
            </div>
          </div>
        </section>

        {/* Block 2 */}
        <section className="py-20 text-center">
          <div className="text-4xl font-semibold text-white/85">
            Making digital assets accessible to everyone through a conversation-first app
          </div>
        </section>

        {/* Block 3 */}
        <section className="py-10">
          <div className="text-2xl font-semibold">What Rampy unlocks</div>
          <div className="mt-2 text-white/65">Everything you can do with one command</div>

          <div className="mt-10 flex gap-6 overflow-hidden">
            {featureWindow.map((f) => (
              <Card key={f.title} {...f} />
            ))}
          </div>
        </section>

        {/* Block 4 */}
        <section className="py-16">
          <IntentGraph />
        </section>

        {/* Block 5 */}
        <section className="py-16 text-center">
          <div className="text-4xl font-semibold">Start now</div>
          <div className="mt-6 flex justify-center">
            <PillButton>Start talking</PillButton>
          </div>
          <div className="mt-3 text-white/55 text-sm">One command. One confirmation.</div>
        </section>
      </div>
    </main>
  );
}
