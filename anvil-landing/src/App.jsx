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
      <div className="max-w-3xl">
        {eyebrow && (
          <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-sky-300/80">
            {eyebrow}
          </p>
        )}
        {title && (
          <h2 className="text-3xl md:text-5xl font-semibold leading-tight text-white">
            {title}
          </h2>
        )}
        {subtitle && (
          <p className="mt-4 text-base md:text-lg text-white/70">{subtitle}</p>
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
    "inline-flex items-center justify-center gap-2 rounded-2xl px-5 py-3 text-sm font-semibold transition focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-[#0a0f1a]";
  const styles = {
    primary: `${base} bg-sky-400 text-black hover:bg-sky-300 focus-visible:ring-sky-300`,
    ghost: `${base} bg-white/5 text-white hover:bg-white/10 focus-visible:ring-white/20`,
  };
  return (
    <a href={href} className={`${styles[variant]} ${className}`} {...props}>
      {children}
    </a>
  );
};

const Card = ({ title, icon, children, footer }) => (
  <div className="rounded-2xl bg-white/[0.03] p-6 ring-1 ring-white/10 hover:ring-white/20 transition">
    <div className="mb-4 flex items-center gap-3">
      {icon}
      {title && <h3 className="text-lg font-semibold text-white">{title}</h3>}
    </div>
    <div className="text-white/80 text-sm leading-relaxed">{children}</div>
    {footer && <div className="mt-6">{footer}</div>}
  </div>
);

// ---------- Page ----------
export default function ANVILLanding() {
  // rotating tagline like vana.org
  const words = ["Forge your future", "Forge your finance", "Forge crypto"];
  const [idx, setIdx] = useState(0);
  useEffect(() => {
    const t = setInterval(() => setIdx((i) => (i + 1) % words.length), 1800);
    return () => clearInterval(t);
  }, []);

  return (
    <div className="min-h-screen scroll-smooth bg-[#0a0f1a] text-white selection:bg-sky-400 selection:text-black">
      {/* Backdrop glow */}
      <div aria-hidden className="pointer-events-none fixed inset-0 -z-10">
        <div className="absolute -top-24 left-1/2 h-[50rem] w-[50rem] -translate-x-1/2 rounded-full bg-sky-500/20 blur-3xl" />
      </div>

      {/* NAV */}
      <header className="sticky top-0 z-40 border-b border-white/10 bg-black/30 backdrop-blur supports-[backdrop-filter]:bg-black/30">
        <Container>
          <div className="flex h-16 items-center justify-between">
            <a href="#" className="flex items-center gap-3">
              <div className="grid h-9 w-9 place-items-center rounded-xl bg-sky-500/10 ring-1 ring-sky-400/30">
                {/* Simple anvil mark */}
                <svg viewBox="0 0 64 64" className="h-5 w-5 text-sky-300" fill="currentColor">
                  <path d="M12 24h40v6H38l-4 6H30l-4-6H12zM20 40h24l4 6H16l4-6z" />
                </svg>
              </div>
              <span className="text-lg font-semibold tracking-wide">ANVIL</span>
            </a>
            <nav className="hidden items-center gap-6 md:flex">
              <a href="#capabilities" className="text-sm text-white/80 hover:text-white">
                What you can do
              </a>
              <a href="#steps" className="text-sm text-white/80 hover:text-white">
                Four steps
              </a>
              <a href="#why-now" className="text-sm text-white/80 hover:text-white">
                Why now
              </a>
              <a href="#contact" className="text-sm text-white/80 hover:text-white">
                Waitlist
              </a>
            </nav>
            <Button href="#contact" variant="primary">
              Join waitlist <ArrowRight className="h-4 w-4" />
            </Button>
          </div>
        </Container>
      </header>

      {/* HERO — only text */}
      <section className="relative flex items-center justify-center py-24 md:py-36">
        <Container>
          <div className="mx-auto max-w-4xl text-center">
            <h1 className="text-5xl sm:text-6xl md:text-7xl font-semibold leading-tight">
              Forge your portfolio with <span className="text-sky-300">ANVIL</span>
            </h1>
            <div className="mt-6 h-12 md:h-14 overflow-hidden">
              <AnimatePresence mode="wait">
                <motion.p
                  key={words[idx]}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 0.35 }}
                  className="text-xl md:text-2xl text-white/80"
                >
                  {words[idx]}
                </motion.p>
              </AnimatePresence>
            </div>
          </div>
        </Container>
      </section>

      {/* CAPABILITIES */}
      <Section
        id="capabilities"
        eyebrow="What you can do with ANVIL"
        title="One place to learn, decide and act"
        subtitle="Free beta. No tiers. Route capital with guidance and clear trade offs."
      >
        <div className="grid gap-6 md:grid-cols-3">
          <Card title="Buy and Sell" icon={<ChevronRight className="h-4 w-4 text-sky-300" />}>
            Swap across venues with smart routing, gas and slippage shown upfront.
          </Card>
          <Card title="Stake and Restake" icon={<Sparkles className="h-4 w-4 text-sky-300" />}>
            Compare liquid staking and restaking options and allocate in one confirmation.
          </Card>
          <Card title="Earn on Cash" icon={<BarChart className="h-4 w-4 text-sky-300" />}>
            Send stablecoins to money markets with improvement thresholds to avoid noisy hopping.
          </Card>
          <Card title="High-Yield Vaults" icon={<Rocket className="h-4 w-4 text-sky-300" />}>
            Track maturities and roll positions forward at the best net-yield window.
          </Card>
          <Card title="Liquidity Pools" icon={<LinkIcon className="h-4 w-4 text-sky-300" />}>
            Get pair suggestions with correlation hints and backtests, then execute.
          </Card>
          <Card title="Explain any Position" icon={<MessageSquare className="h-4 w-4 text-sky-300" />}>
            Paste an address or tx and get a plain-English explanation and risks.
          </Card>
        </div>
      </Section>

      {/* FOUR STEPS */}
      <Section
        id="steps"
        eyebrow="Four easy steps"
        title="From intent to action in minutes"
      >
        <ol className="grid gap-6 md:grid-cols-4">
          {[
            {
              t: "Connect",
              d: "Create a wallet or connect yours. Read-only first, action when ready.",
            },
            {
              t: "Profile",
              d: "Set risk and goals. ANVIL adapts venues and defaults to your vibe.",
            },
            {
              t: "Plan",
              d: "See a simple plan with net yield after gas and slippage.",
            },
            {
              t: "Act",
              d: "One confirmation to allocate, rebalance and exit. Alerts keep you in control.",
            },
          ].map((s, i) => (
            <li
              key={i}
              className="relative rounded-2xl bg-white/[0.03] p-6 ring-1 ring-white/10"
            >
              <span className="absolute -top-3 left-4 grid h-8 w-8 place-items-center rounded-full bg-sky-400 text-black text-sm font-bold">
                {i + 1}
              </span>
              <h3 className="mb-2 mt-2 text-base font-semibold text-white">{s.t}</h3>
              <p className="text-sm text-white/80">{s.d}</p>
            </li>
          ))}
        </ol>
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

      {/* WAITLIST */}
      <Section
        id="contact"
        eyebrow="Get early access"
        title="Join the ANVIL waitlist"
        subtitle="Free beta. No tiers. We are focused on trust and real utility."
      >
        <div className="rounded-3xl border border-white/10 bg-white/[0.03] p-6 md:p-8">
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
              className="w-full rounded-2xl border border-white/10 bg-black/40 px-4 py-3 text-sm text-white placeholder:text-white/40 focus:outline-none focus:ring-2 focus:ring-sky-300"
            />
            <Button
              href="#"
              onClick={(e) => e.preventDefault()}
              variant="primary"
              className="justify-center"
            >
              Request invite <ArrowRight className="h-4 w-4" />
            </Button>
          </form>
          <p className="mt-3 text-xs text-white/60">
            By joining you agree to receive product updates. We never sell data.
          </p>
        </div>
      </Section>

      {/* FOOTER */}
      <footer className="border-t border-white/10 py-10">
        <Container className="flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-center">
          <div className="flex items-center gap-3 text-white/80">
            <div className="grid h-8 w-8 place-items-center rounded-lg bg-sky-500/10 ring-1 ring-sky-400/30">
              <svg viewBox="0 0 64 64" className="h-4 w-4 text-sky-300" fill="currentColor">
                <path d="M12 24h40v6H38l-4 6H30l-4-6H12zM20 40h24l4 6H16l4-6z" />
              </svg>
            </div>
            <span className="font-semibold">ANVIL</span>
            <span className="text-white/40">© {new Date().getFullYear()}</span>
          </div>
          <div className="text-xs text-white/50">
            ANVIL is a research and product company. Nothing here is financial advice.
          </div>
        </Container>
      </footer>
    </div>
  );
}
