import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowRight,
  ChevronRight,
  BarChart,
  Bot,
  Link as LinkIcon,
  MessageSquare,
  Shield,
  Sparkles,
  Rocket,
  Wallet,
  Coins,
} from "lucide-react";

// ---------- Base UI ----------
const Container = ({ children, className = "" }) => (
  <div className={`mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8 ${className}`}>
    {children}
  </div>
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
        {subtitle && (
          <p className="mt-4 text-base md:text-lg text-neutral-300">{subtitle}</p>
        )}
      </div>
      <div className="mt-10">{children}</div>
    </Container>
  </section>
);

const Button = ({
  children,
  href = "#",
  variant = "primary",
  className = "",
  ...props
}) => {
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

const Card = ({ title, icon, children, footer }) => (
  <div className="rounded-2xl bg-white/[0.04] p-6 ring-1 ring-white/10 hover:ring-white/20 transition">
    <div className="mb-3 flex items-center gap-3">
      {icon}
      {title && <h3 className="text-base md:text-lg font-semibold text-white">{title}</h3>}
    </div>
    <div className="text-neutral-300 text-sm leading-relaxed">{children}</div>
    {footer && <div className="mt-5">{footer}</div>}
  </div>
);

// ---------- Page ----------
export default function ANVILLanding() {
  // rotating tagline: "Forge " + (your future | your finance | crypto)
  const words = ["your future", "your finance", "crypto"];
  const [idx, setIdx] = useState(0);
  useEffect(() => {
    const t = setInterval(() => setIdx((i) => (i + 1) % words.length), 1800);
    return () => clearInterval(t);
  }, []);

  return (
    <div className="min-h-screen scroll-smooth bg-gradient-to-b from-black via-neutral-950 to-black text-white selection:bg-white selection:text-black">
      {/* Subtle background glow */}
      <div aria-hidden className="pointer-events-none fixed inset-0 -z-10">
        <div className="absolute -top-24 left-1/4 h-[38rem] w-[38rem] rounded-full bg-white/5 blur-3xl" />
      </div>

      {/* NAV */}
      <header className="sticky top-0 z-40 border-b border-white/10 bg-black/40 backdrop-blur supports-[backdrop-filter]:bg-black/40">
        <Container>
          <div className="flex h-16 items-center justify-between">
            <a href="#" className="flex items-center gap-3">
              <div className="grid h-9 w-9 place-items-center rounded-xl bg-white/5 ring-1 ring-white/15">
                {/* Simple anvil mark */}
                <svg viewBox="0 0 64 64" className="h-5 w-5 text-white" fill="currentColor">
                  <path d="M12 24h40v6H38l-4 6H30l-4-6H12zM20 40h24l4 6H16l4-6z" />
                </svg>
              </div>
              <span className="text-lg font-semibold tracking-wide">ANVIL</span>
            </a>
            <nav className="hidden items-center gap-6 md:flex">
              <a href="#capabilities" className="text-sm text-neutral-300 hover:text-white">
                What you can do
              </a>
              <a href="#get-started" className="text-sm text-neutral-300 hover:text-white">
                Get started
              </a>
              <a href="#why-now" className="text-sm text-neutral-300 hover:text-white">
                Why now
              </a>
              <a href="#contact" className="text-sm text-neutral-300 hover:text-white">
                Join us
              </a>
            </nav>
            <Button href="#contact" variant="primary">
              Join us <ArrowRight className="h-4 w-4" />
            </Button>
          </div>
        </Container>
      </header>

      {/* HERO — left-aligned, ANVIL on top, Forge fixed + rotating words */}
      <section className="relative py-20 md:py-28">
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
          </div>
        </Container>
      </section>

      {/* WHAT YOU CAN DO — 8 compact cards */}
      <Section
        id="capabilities"
        eyebrow="What you can do"
        title="One place to learn, decide and act"
        subtitle="Free beta. No tiers. Route capital with guidance and clear trade-offs."
      >
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          <Card title="Buy & Sell" icon={<ChevronRight className="h-4 w-4 text-neutral-200" />}>
            Smart routing across venues with gas and slippage shown up front.
          </Card>
          <Card title="Stake & Restake" icon={<Sparkles className="h-4 w-4 text-neutral-200" />}>
            Compare liquid staking and restaking options and allocate in one confirmation.
          </Card>
          <Card title="Earn on Cash" icon={<BarChart className="h-4 w-4 text-neutral-200" />}>
            Send stablecoins to money markets with improvement thresholds (no noisy hopping).
          </Card>
          <Card title="High-Yield Vaults" icon={<Rocket className="h-4 w-4 text-neutral-200" />}>
            Track maturities and roll positions forward at the best net-yield window.
          </Card>
          <Card title="Liquidity Pools" icon={<LinkIcon className="h-4 w-4 text-neutral-200" />}>
            Pair suggestions with correlation hints and backtests before you commit.
          </Card>
          <Card title="RWAs & Treasuries" icon={<Coins className="h-4 w-4 text-neutral-200" />}>
            Explore tokenized funds/treasuries as they move from pilots to production.
          </Card>
          <Card title="Explain Positions" icon={<MessageSquare className="h-4 w-4 text-neutral-200" />}>
            Paste an address or tx; get a plain-English explanation and risks.
          </Card>
          <Card title="Alerts & Reports" icon={<Shield className="h-4 w-4 text-neutral-200" />}>
            Weekly summaries, maturity pings, risk alerts—always know what’s next.
          </Card>
        </div>
      </Section>

      {/* GET STARTED — marketing headline + four steps */}
      <Section
        id="get-started"
        eyebrow="Get started"
        title="Connect with ANVIL in four easy steps"
      >
        <ol className="grid gap-6 md:grid-cols-4">
          {[
            {
              t: "Connect",
              d: "Create a wallet or connect yours. Read-only first, action when ready.",
              i: <Wallet className="h-4 w-4 text-neutral-200" />,
            },
            {
              t: "Profile",
              d: "Set risk and goals. ANVIL adapts venues and defaults to your vibe.",
              i: <Bot className="h-4 w-4 text-neutral-200" />,
            },
            {
              t: "Plan",
              d: "See a simple plan with net yield after gas and slippage.",
              i: <BarChart className="h-4 w-4 text-neutral-200" />,
            },
            {
              t: "Act",
              d: "One confirmation to allocate, rebalance and exit. Alerts keep you in control.",
              i: <ChevronRight className="h-4 w-4 text-neutral-200" />,
            },
          ].map((s, i) => (
            <li
              key={i}
              className="relative rounded-2xl bg-white/[0.04] p-6 ring-1 ring-white/10"
            >
              <span className="absolute -top-3 left-4 grid h-8 w-8 place-items-center rounded-full bg-white text-black text-sm font-bold">
                {i + 1}
              </span>
              <div className="mb-2 flex items-center gap-2 text-white">
                {s.i}
                <h3 className="text-base font-semibold">{s.t}</h3>
              </div>
              <p className="text-sm text-neutral-300">{s.d}</p>
            </li>
          ))}
        </ol>
        <div className="mt-8">
          <Button href="#contact" variant="primary">
            Get started <ArrowRight className="h-4 w-4" />
          </Button>
        </div>
      </Section>

      {/* WHY NOW */}
      <Section
        id="why-now"
        eyebrow="Why now"
        title="Programmable finance is moving mainstream"
        subtitle="Policy clarity, tokenized assets, mainstream spot ETFs and AI-native finance are converging. ANVIL turns those forces into simple, trusted action."
      >
        <div className="grid gap-6 md:grid-cols-4">
          <Card title="Policy clarity">
            Stablecoin and tokenization frameworks reduce uncertainty and open rails.
          </Card>
          <Card title="Tokenized securities">
            Funds and treasuries move from pilots to production. Collateral and settlement evolve.
          </Card>
          <Card title="Mainstream adoption">
            Flagship assets and their ETFs bring flows and advisor-led participation.
          </Card>
          <Card title="AI-native finance">
            People expect guidance they can talk to, not dashboards they must learn.
          </Card>
        </div>
      </Section>

      {/* JOIN US */}
      <Section
        id="contact"
        eyebrow="Join the Anvil community"
        title="Be the first to forge with ANVIL"
        subtitle="Free beta. No tiers. We’re focused on trust and real utility."
      >
        <div className="rounded-3xl border border-white/10 bg-white/[0.04] p-6 md:p-8">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              alert("Thanks! We will be in touch soon.");
            }}
            className="grid gap-3 sm:grid-cols-[1fr_auto]"
          >
            <input
              required
              type="email"
              placeholder="you@domain.com"
              className="w-full rounded-2xl border border-white/10 bg-black px-4 py-3 text-sm text-white placeholder:text-neutral-500 focus:outline-none focus:ring-2 focus:ring-white/30"
            />
            <Button
              href="#"
              onClick={(e) => e.preventDefault()}
              variant="primary"
              className="justify-center"
            >
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
            ANVIL is a research and product company. Nothing here is financial advice.
          </div>
        </Container>
      </footer>
    </div>
  );
}
