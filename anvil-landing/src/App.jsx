import React, { useEffect, useMemo, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowRight, ArrowLeftRight, Banknote, Landmark, Droplets, FileSearch,
  BellRing, Sparkles, Rocket, Wallet, Bot, BarChart3, ChevronRight,
} from "lucide-react";

/* ---------------- Base UI ---------------- */
const Container = ({ children, className = "" }) => (
  <div className={`mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8 ${className}`}>{children}</div>
);

const Section = ({ id, eyebrow, title, subtitle, children, className = "" }) => (
  <section id={id} className={`py-20 md:py-28 ${className}`}>
    <Container>
      <div className="max-w-4xl">
        {eyebrow && (
          <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-neutral-400">
            {eyebrow}
          </p>
        )}
        {title && (
          <h2 className="text-3xl md:text-5xl font-semibold leading-tight text-white">
            {title}
          </h2>
        )}
        {subtitle && <p className="mt-4 text-base md:text-lg text-neutral-300">{subtitle}</p>}
      </div>
      <div className="mt-10">{children}</div>
    </Container>
  </section>
);

const Button = ({ children, href = "#", variant = "primary", className = "", ...props }) => {
  const base =
    "inline-flex items-center justify-center gap-2 rounded-2xl px-5 py-3 text-sm font-semibold transition focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-black";
  const styles = {
    primary: `${base} bg-white text-black hover:bg-neutral-200 focus-visible:ring-white/40`,
    ghost: `${base} bg-white/5 text-white hover:bg-white/10 focus-visible:ring-white/20`,
    outline: `${base} border border-white/20 text-white hover:bg-white/5`,
  };
  return (
    <a href={href} className={`${styles[variant]} ${className}`} {...props}>
      {children}
    </a>
  );
};

/* OPAQUE card so background doesn’t bleed through */
const Card = ({ title, icon, children, className = "" }) => (
  <div
    className={`h-full min-h-[190px] rounded-2xl bg-neutral-900 p-6 ring-1 ring-white/10 hover:ring-white/20 transition ${className}`}
  >
    <div className="mb-3 flex items-center gap-3">
      {icon}
      {title && <h3 className="text-base md:text-lg font-semibold text-white">{title}</h3>}
    </div>
    <div className="text-neutral-300 text-sm leading-relaxed">{children}</div>
  </div>
);

/* --------- Animated code background (canvas, no images) --------- */
const CodeBackground = () => {
  const ref = useRef(null);
  const settings = useMemo(() => ({ gx: 22, gy: 28, font: 16, speed: 22 }), []);
  useEffect(() => {
    const canvas = ref.current;
    const ctx = canvas.getContext("2d");
    const setSize = () => {
      const dpr = Math.max(1, window.devicePixelRatio || 1);
      canvas.width = Math.floor(window.innerWidth * dpr);
      canvas.height = Math.floor(window.innerHeight * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    setSize();
    window.addEventListener("resize", setSize);

    const cols = () => Math.ceil(window.innerWidth / settings.gx) + 2;
    const rows = () => Math.ceil(window.innerHeight / settings.gy) + 2;
    let grid = [];
    const rebuild = () => {
      grid = Array.from({ length: rows() }, () =>
        Array.from({ length: cols() }, () => (Math.random() < 0.5 ? "0" : "1"))
      );
    };
    rebuild();

    let off = 0, last = performance.now();
    const loop = (t) => {
      const dt = (t - last) / 1000; last = t;
      off = (off + settings.speed * dt) % (settings.gx * 2);

      ctx.fillStyle = "rgb(0,0,0)";
      ctx.fillRect(0, 0, window.innerWidth, window.innerHeight);

      ctx.font = `${settings.font}px ui-monospace, SFMono-Regular, Menlo, monospace`;
      ctx.fillStyle = "rgba(255,255,255,0.14)";
      const r = rows(), c = cols();
      if (!grid.length || grid.length !== r || grid[0].length !== c) rebuild();

      for (let y = 0; y < r; y++) {
        const py = 20 + y * settings.gy;
        for (let x = 0; x < c; x++) {
          const px = ((x * settings.gx - off + window.innerWidth + settings.gx) %
            (window.innerWidth + settings.gx)) - settings.gx;
          ctx.fillText(grid[y][x], px, py);
        }
      }
      const grd = ctx.createLinearGradient(0, 0, 0, window.innerHeight);
      grd.addColorStop(0, "rgba(0,0,0,0.45)");
      grd.addColorStop(1, "rgba(0,0,0,0.25)");
      ctx.fillStyle = grd;
      ctx.fillRect(0, 0, window.innerWidth, window.innerHeight);
      requestAnimationFrame(loop);
    };
    const id = requestAnimationFrame(loop);
    return () => { cancelAnimationFrame(id); window.removeEventListener("resize", setSize); };
  }, [settings]);

  return <canvas ref={ref} className="fixed inset-0 -z-10" />;
};

/* ---------------- Phone mock (steps) ---------------- */
const PhoneMock = () => (
  <div className="mx-auto w-full max-w-sm rounded-[2.2rem] border border-white/10 bg-gradient-to-b from-neutral-900 to-black p-3 shadow-xl">
    <div className="mx-auto mb-3 h-6 w-28 rounded-full bg-neutral-800" />
    <div className="rounded-[1.8rem] border border-white/10 bg-black p-5">
      <div className="mb-4 flex items-center justify-between">
        <div className="h-6 w-24 rounded-md bg-white/10" />
        <div className="h-6 w-10 rounded-md bg-white/10" />
      </div>
      <div className="mb-4 h-28 w-full rounded-lg bg-gradient-to-b from-white/10 to-white/0 p-3">
        <div className="flex h-full items-end gap-1">
          {[12, 24, 18, 34, 28, 40, 22, 36, 30, 44].map((h, i) => (
            <div key={i} className="w-6 rounded bg-white/20" style={{ height: `${h}px` }} />
          ))}
        </div>
      </div>
      <div className="space-y-2">
        {["Stable vault • 8.1% APY", "Restake • 5.3% APY", "LP pair • 12.4% APR"].map((t, i) => (
          <div
            key={i}
            className="flex items-center justify-between rounded-xl border border-white/10 bg-white/[0.03] px-3 py-2 text-xs text-neutral-300"
          >
            <span>{t}</span>
            <span className="text-white">• • •</span>
          </div>
        ))}
      </div>
    </div>
  </div>
);

/* --------------- Ticker (Why now) --------------- */
const Ticker = ({ items, duration = 45 }) => {
  const loop = [...items, ...items];
  return (
    <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-white/[0.04]">
      <motion.div
        className="flex items-center gap-6 whitespace-nowrap py-4"
        animate={{ x: ["0%", "-50%"] }}
        transition={{ duration, ease: "linear", repeat: Infinity }}
      >
        {loop.map((it, i) => (
          <div
            key={i}
            className="mx-1 flex items-center gap-2 rounded-full border border-white/10 bg-black/30 px-3 py-1"
          >
            <span className="grid h-7 w-7 place-items-center rounded-md bg-white/10">{it.icon}</span>
            <span className="text-sm font-semibold text-white">{it.label}</span>
            <span className="text-xs text-neutral-400">• {it.sub}</span>
          </div>
        ))}
      </motion.div>
    </div>
  );
};

/* ---------- Reveal helpers ---------- */
const gridReveal = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, when: "beforeChildren", staggerChildren: 0.06 } },
};
const itemReveal = { hidden: { opacity: 0, y: 14 }, visible: { opacity: 1, y: 0, transition: { duration: 0.4 } } };

/* ---------------- Page ---------------- */
export default function ANVILLanding() {
  const words = ["your future", "your finance", "crypto"];
  const [idx, setIdx] = useState(0);
  useEffect(() => {
    const t = setInterval(() => setIdx((i) => (i + 1) % words.length), 1800);
    return () => clearInterval(t);
  }, []);

  const whyNowItems = [
    { label: "GENIUS Act", sub: "Policy clarity", icon: <Banknote className="h-4 w-4 text-neutral-200" /> },
    { label: "Tokenized Securities", sub: "Pilots → production", icon: <Landmark className="h-4 w-4 text-neutral-200" /> },
    { label: "Spot ETFs", sub: "Flows & advisors", icon: <BarChart3 className="h-4 w-4 text-neutral-200" /> },
    { label: "AI-Native Finance", sub: "Conversational UX", icon: <Bot className="h-4 w-4 text-neutral-200" /> },
  ];

  return (
    <div className="min-h-screen scroll-smooth text-white">
      <CodeBackground />

      {/* NAV */}
      <header className="sticky top-0 z-40 border-b border-white/10 bg-black/40 backdrop-blur">
        <Container>
          <div className="flex h-16 items-center justify-between">
            <a href="#" className="flex items-center gap-3">
              <div className="grid h-9 w-9 place-items-center rounded-xl bg-white/5 ring-1 ring-white/15">
                <svg viewBox="0 0 64 64" className="h-5 w-5 text-white" fill="currentColor">
                  <path d="M12 24h40v6H38l-4 6H30l-4-6H12zM20 40h24l4 6H16l4-6z" />
                </svg>
              </div>
              <span className="text-lg font-semibold tracking-wide">ANVIL</span>
            </a>
            <nav className="hidden items-center gap-6 md:flex">
              <a href="#bundle" className="text-sm text-neutral-300 hover:text-white">Product bundle</a>
              <a href="#miss-out" className="text-sm text-neutral-300 hover:text-white">Why most miss out</a>
              <a href="#get-started" className="text-sm text-neutral-300 hover:text-white">Get started</a>
              <a href="#why-now" className="text-sm text-neutral-300 hover:text-white">Why now</a>
              <a href="#contact" className="text-sm text-neutral-300 hover:text-white">Join us</a>
            </nav>
            <Button href="#contact" variant="primary">Join us <ArrowRight className="h-4 w-4" /></Button>
          </div>
        </Container>
      </header>

      {/* HERO */}
      <section className="relative py-16 md:py-20">
        <Container>
          <div className="max-w-4xl">
            <h1 className="text-6xl md:text-7xl font-semibold tracking-tight">ANVIL</h1>
            <div className="mt-4 flex items-baseline gap-2">
              <span className="text-5xl md:text-6xl font-semibold">Forge</span>
              <div className="ml-2 h-12 md:h-14 overflow-hidden">
                <AnimatePresence mode="wait">
                  <motion.span
                    key={words[idx]}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.35 }}
                    className="block text-3xl md:text-5xl text-neutral-200"
                  >
                    {words[idx]}
                  </motion.span>
                </AnimatePresence>
              </div>
            </div>
            <p className="mt-6 max-w-2xl text-lg text-neutral-200">
              Making Web3 Accessible to Everyone through Conversational Finance.
            </p>
          </div>

          {/* “Clarity over complexity” — visible on load */}
          <div className="mt-28 md:mt-32">
            <h3 className="text-2xl md:text-3xl font-semibold">Clarity over complexity</h3>
            <p className="mt-3 max-w-3xl text-neutral-300">
              One conversational surface that explains, compares and executes—so you can allocate
              with confidence, not guesswork.
            </p>
            <div className="mt-4 flex flex-wrap items-center gap-3 text-xs text-neutral-300">
              <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1">Plain-English explanations</span>
              <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1">Smart venue routing</span>
              <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1">Net-yield after gas</span>
              <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1">Alerts & roll-forwards</span>
            </div>
          </div>
        </Container>
      </section>

      {/* SMALL spacer so cards start right when you scroll */}
      <div aria-hidden className="h-10 md:h-14" />

      {/* PRODUCT BUNDLE — 8 opaque cards; reveal once when scrolling */}
      <Section
        id="bundle"
        eyebrow="The Anvil App"
        title="Product bundle"
        className="pt-0"
      >
        <motion.div
          variants={gridReveal}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.18 }}  /* triggers right after first scroll */
          className="grid items-stretch gap-5 sm:grid-cols-2 lg:grid-cols-4"
        >
          {[
            { t: "Buy & Sell", d: "Smart routing across venues with gas and slippage shown up front.", i: <ArrowLeftRight className="h-4 w-4 text-neutral-200" /> },
            { t: "Stake & Restake", d: "Compare liquid staking and restaking; allocate in one confirmation.", i: <Sparkles className="h-4 w-4 text-neutral-200" /> },
            { t: "Earn on Cash", d: "Send stablecoins to money markets with improvement thresholds.", i: <Banknote className="h-4 w-4 text-neutral-200" /> },
            { t: "High-Yield Vaults", d: "Track maturities and roll positions at the best net-yield window.", i: <Rocket className="h-4 w-4 text-neutral-200" /> },
            { t: "Liquidity Pools", d: "Pair suggestions with correlation hints and backtests.", i: <Droplets className="h-4 w-4 text-neutral-200" /> },
            { t: "RWAs & Treasuries", d: "Explore tokenized funds and treasuries as they move to production.", i: <Landmark className="h-4 w-4 text-neutral-200" /> },
            { t: "Explain Positions", d: "Paste an address or tx; get a plain-English explanation and risks.", i: <FileSearch className="h-4 w-4 text-neutral-200" /> },
            { t: "Alerts & Reports", d: "Weekly summaries, maturity pings and risk alerts.", i: <BellRing className="h-4 w-4 text-neutral-200" /> },
          ].map((c, i) => (
            <motion.div key={i} variants={itemReveal} className="h-full">
              <Card title={c.t} icon={c.i}>{c.d}</Card>
            </motion.div>
          ))}
        </motion.div>
      </Section>

      {/* WHY MOST PEOPLE MISS OUT */}
      <Section
        id="miss-out"
        eyebrow="Why most people miss out"
        title="Too many choices, moving too fast"
        subtitle="Wallets, venues, tokens, gas, yields—most people default to the familiar and miss DeFi’s best opportunities. Anvil turns noise into a clear, guided plan."
      />

      {/* GET STARTED */}
      <Section id="get-started" eyebrow="Getting started" title="Four simple steps">
        <div className="grid gap-10 md:grid-cols-2">
          <ol className="space-y-5">
            {[
              { t: "Connect", d: "Create a wallet or connect yours. Read-only first—act when ready.", i: <Wallet className="h-4 w-4 text-neutral-200" /> },
              { t: "Profile", d: "Set risk and goals. Anvil adapts venues and sensible defaults to your vibe.", i: <Bot className="h-4 w-4 text-neutral-200" /> },
              { t: "Plan", d: "See a clear plan with net yield after gas and slippage. Understand trade-offs.", i: <BarChart3 className="h-4 w-4 text-neutral-200" /> },
              { t: "Act", d: "One confirmation to allocate, rebalance and exit. Alerts keep you in control.", i: <ChevronRight className="h-4 w-4 text-neutral-200" /> },
            ].map((s, i) => (
              <li key={i} className="relative rounded-2xl bg-white/[0.04] p-6 ring-1 ring-white/10">
                <div className="mb-2 flex items-center gap-2 text-white">
                  <span className="grid h-8 w-8 place-items-center rounded-full bg-white text-black text-sm font-bold">
                    {i + 1}
                  </span>
                  {s.i}
                  <h3 className="text-base font-semibold">{s.t}</h3>
                </div>
                <p className="text-sm text-neutral-300">{s.d}</p>
              </li>
            ))}
          </ol>
          <PhoneMock />
        </div>
        <div className="mt-8">
          <Button href="#contact" variant="primary">Get started <ArrowRight className="h-4 w-4" /></Button>
        </div>
      </Section>

      {/* WHY NOW — ticker */}
      <Section
        id="why-now"
        eyebrow="Why now"
        title="Programmable finance is moving mainstream"
        subtitle="Policy clarity, tokenized assets, mainstream spot ETFs and AI-native finance are converging. Anvil turns those forces into simple, trusted action."
      >
        <Ticker items={whyNowItems} duration={45} />
      </Section>

      {/* JOIN US */}
      <Section
        id="contact"
        eyebrow="Join the Anvil community"
        title="Be the first to forge with Anvil"
        subtitle="Free beta. No tiers. We’re focused on trust and real utility."
      >
        <div className="rounded-3xl border border-white/10 bg-white/[0.04] p-6 md:p-8">
          <form
            onSubmit={(e) => { e.preventDefault(); alert("Thanks! We will be in touch soon."); }}
            className="grid gap-3 sm:grid-cols-[1fr_auto]"
          >
            <input
              required type="email" placeholder="you@domain.com"
              className="w-full rounded-2xl border border-white/10 bg-black px-4 py-3 text-sm text-white placeholder:text-neutral-500 focus:outline-none focus:ring-2 focus:ring-white/30"
            />
            <Button href="#" onClick={(e) => e.preventDefault()} variant="primary" className="justify-center">
              Join us <ArrowRight className="h-4 w-4" />
            </Button>
          </form>
          <p className="mt-3 text-xs text-neutral-400">
            By joining you agree to receive product updates. We never sell data.
          </p>
        </div>
      </Section>

      {/* FOOTER */}
      <footer className="border-t border-white/10 py-10">
        <Container className="flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-center">
          <div className="flex items-center gap-3 text-neutral-300">
            <div className="grid h-8 w-8 place-items-center rounded-lg bg-white/5 ring-1 ring-white/10">
              <svg viewBox="0 0 64 64" className="h-4 w-4 text-white" fill="currentColor">
                <path d="M12 24h40v6H38l-4 6H30l-4-6H12zM20 40h24l4 6H16l4-6z" />
              </svg>
            </div>
            <span className="font-semibold text-white">ANVIL</span>
            <span className="text-neutral-500">© {new Date().getFullYear()}</span>
          </div>
          <div className="text-xs text-neutral-500">
            Anvil is a research and product company. Nothing here is financial advice.
          </div>
        </Container>
      </footer>
    </div>
  );
}
