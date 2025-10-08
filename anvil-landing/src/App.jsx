import React from "react";
import { motion } from "framer-motion";
import { ArrowRight, Sparkles, Shield, Cpu, MessageSquare, ChevronRight, Rocket, BarChart, Bot, Link as LinkIcon } from "lucide-react";

// ---------- Base Layout ----------
const Container = ({ children, className = "" }) => (
  <div className={`mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8 ${className}`}>{children}</div>
);

const Section = ({ id, eyebrow, title, subtitle, children, className = "" }) => (
  <section id={id} className={`py-20 md:py-28 ${className}`}>
    <Container>
      <div className="max-w-3xl">
        {eyebrow && (
          <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-sky-300/80">{eyebrow}</p>
        )}
        {title && (
          <h2 className="text-3xl md:text-5xl font-semibold leading-tight text-white">{title}</h2>
        )}
        {subtitle && (
          <p className="mt-4 text-base md:text-lg text-white/70">{subtitle}</p>
        )}
      </div>
      <div className="mt-10">{children}</div>
    </Container>
  </section>
);

const Button = ({ children, href = "#", variant = "primary", className = "", ...props }) => {
  const base = "inline-flex items-center justify-center gap-2 rounded-2xl px-5 py-3 text-sm font-semibold transition focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-[#0a0f1a]";
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
  return (
    <div className="min-h-screen scroll-smooth bg-[#0a0f1a] text-white selection:bg-sky-400 selection:text-black">
      {/* Backdrop gradient */}
      <div aria-hidden className="pointer-events-none fixed inset-0 -z-10">
        <div className="absolute -top-24 left-1/2 h-[50rem] w-[50rem] -translate-x-1/2 rounded-full bg-sky-500/20 blur-3xl" />
      </div>

      {/* NAV */}
      <header className="sticky top-0 z-40 border-b border-white/10 bg-black/30 backdrop-blur supports-[backdrop-filter]:bg-black/30">
        <Container>
          <div className="flex h-16 items-center justify-between">
            <a href="#" className="flex items-center gap-3">
              <div className="grid h-9 w-9 place-items-center rounded-xl bg-sky-500/10 ring-1 ring-sky-400/30">
                {/* Simple Anvil logomark */}
                <svg viewBox="0 0 64 64" className="h-5 w-5 text-sky-300" fill="currentColor">
                  <path d="M12 24h40v6H38l-4 6H30l-4-6H12zM20 40h24l4 6H16l4-6z" />
                </svg>
              </div>
              <span className="text-lg font-semibold tracking-wide">ANVIL</span>
            </a>
            <nav className="hidden items-center gap-6 md:flex">
              <a href="#problem" className="text-sm text-white/80 hover:text-white">Problem</a>
              <a href="#solution" className="text-sm text-white/80 hover:text-white">Solution</a>
              <a href="#how" className="text-sm text-white/80 hover:text-white">How it works</a>
              <a href="#capabilities" className="text-sm text-white/80 hover:text-white">Capabilities</a>
              <a href="#why-now" className="text-sm text-white/80 hover:text-white">Why now</a>
              <a href="#contact" className="text-sm text-white/80 hover:text-white">Waitlist</a>
            </nav>
            <div className="flex items-center gap-3">
              <Button href="#contact" variant="primary">Join waitlist <ArrowRight className="h-4 w-4" /></Button>
            </div>
          </div>
        </Container>
      </header>

      {/* HERO */}
      <section className="relative overflow-hidden pb-16 pt-20 md:pb-24 md:pt-28">
        <Container>
          <div className="grid items-center gap-12 lg:grid-cols-2">
            <div>
              <motion.h1
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="text-4xl leading-tight sm:text-5xl md:text-6xl font-semibold"
              >
                Clarity. Guidance. Action.
                <span className="block text-sky-300">Web3 made usable.</span>
              </motion.h1>
              <p className="mt-6 max-w-xl text-white/70">
                ANVIL is the opportunity layer for Web3. An AI finance agent that connects venues, explains choices in plain language, and executes with one confirmation. One place to learn, decide, and act.
              </p>
              <div className="mt-8 flex flex-wrap items-center gap-3">
                <Button href="#contact" variant="primary">Get early access <Rocket className="h-4 w-4"/></Button>
                <Button href="#solution" variant="ghost">See how it works <ChevronRight className="h-4 w-4"/></Button>
              </div>
              <div className="mt-6 flex flex-wrap gap-2 text-xs text-white/60">
                <span className="inline-flex items-center gap-2 rounded-full bg-white/5 px-3 py-1 ring-1 ring-white/10"><Shield className="h-3 w-3"/> Self-custody by default</span>
                <span className="inline-flex items-center gap-2 rounded-full bg-white/5 px-3 py-1 ring-1 ring-white/10"><Cpu className="h-3 w-3"/> AI guided automation</span>
                <span className="inline-flex items-center gap-2 rounded-full bg-white/5 px-3 py-1 ring-1 ring-white/10"><LinkIcon className="h-3 w-3"/> Multi-venue routing</span>
              </div>
            </div>
            <div className="relative">
              <div className="pointer-events-none absolute -inset-12 -z-10 bg-gradient-to-br from-sky-400/10 via-transparent to-transparent blur-2xl" />
              <div className="rounded-3xl border border-white/10 bg-white/[0.03] p-6 shadow-2xl">
                <div className="grid gap-4 sm:grid-cols-2">
                  <Card title="Explain" icon={<MessageSquare className="h-4 w-4 text-sky-300"/>}>
                    Ask in natural language. ANVIL explains yields, risks and next steps in context.
                  </Card>
                  <Card title="Decide" icon={<BarChart className="h-4 w-4 text-sky-300"/>}>
                    Compare real opportunities side by side with gas and slippage baked in.
                  </Card>
                  <Card title="Execute" icon={<Bot className="h-4 w-4 text-sky-300"/>}>
                    One confirmation to allocate, rebalance and exit across venues.
                  </Card>
                  <Card title="Monitor" icon={<Shield className="h-4 w-4 text-sky-300"/>}>
                    Stay in control with alerts, risk rails and simple performance reports.
                  </Card>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* Problem */}
      <Section
        id="problem"
        eyebrow="The Problem"
        title="Crypto is powerful but painfully complex"
        subtitle="Too many protocols, too many choices, and too much jargon. Most people default to low returns while a small group captures the best DeFi opportunities. Complexity is the real barrier."
      >
        <div className="grid gap-6 md:grid-cols-3">
          <Card title="Overwhelming choice" icon={<Sparkles className="h-4 w-4 text-sky-300"/>}>
            Wallets, bridges, money markets, staking, vaults and LPs. Discovery is fragmented and slow.
          </Card>
          <Card title="Blind execution" icon={<Shield className="h-4 w-4 text-sky-300"/>}>
            Users click buttons without clear trade offs, then pay in gas, slippage and regret.
          </Card>
          <Card title="Missed upside" icon={<BarChart className="h-4 w-4 text-sky-300"/>}>
            Without guidance, newcomers avoid DeFi and leave meaningful yield on the table.
          </Card>
        </div>
      </Section>

      {/* Solution */}
      <Section
        id="solution"
        eyebrow="The Solution"
        title="ANVIL turns complexity into clarity"
        subtitle="A conversational interface that connects Web3 venues, explains options, and executes with one confirmation. Discovery, decision and execution finally live together."
      >
        <div className="grid gap-6 md:grid-cols-3">
          <Card title="One place" icon={<LinkIcon className="h-4 w-4 text-sky-300"/>}>
            Integrations across money markets, staking, restaking, vaults, LPs and RWAs.
          </Card>
          <Card title="Guided decisions" icon={<MessageSquare className="h-4 w-4 text-sky-300"/>}>
            Plain language, transparent trade offs, and risk-aware defaults matched to your profile.
          </Card>
          <Card title="Safe by design" icon={<Shield className="h-4 w-4 text-sky-300"/>}>
            Self-custody, audit-first roadmap, and guardrails like improvement thresholds and windows.
          </Card>
        </div>
      </Section>

      {/* How it works */}
      <Section
        id="how"
        eyebrow="How it works"
        title="Sign in, say what you want, confirm once"
        subtitle="Email, phone, or wallet. ANVIL learns your risk, experience and goals, proposes a plan, then executes and keeps you informed like a personal always-on asset manager you can talk to."
      >
        <ol className="grid gap-6 md:grid-cols-4">
          {[
            {
              t: "Connect",
              d: "Create a wallet or connect yours. Read-only first, action when you are ready.",
            },
            {
              t: "Profile",
              d: "Set risk, time horizon and interests. ANVIL maps venues to your vibe.",
            },
            { t: "Plan", d: "See a simple, plain-English plan with net yield after gas and slippage." },
            { t: "Act", d: "One confirmation to allocate, rebalance and exit. Alerts keep you in control." },
          ].map((item, i) => (
            <li key={i} className="relative rounded-2xl bg-white/[0.03] p-6 ring-1 ring-white/10">
              <span className="absolute -top-3 left-4 grid h-8 w-8 place-items-center rounded-full bg-sky-400 text-black text-sm font-bold">
                {i + 1}
              </span>
              <h3 className="mb-2 mt-2 text-base font-semibold text-white">{item.t}</h3>
              <p className="text-sm text-white/80">{item.d}</p>
            </li>
          ))}
        </ol>
      </Section>

      {/* Capabilities */}
      <Section
        id="capabilities"
        eyebrow="Capabilities"
        title="What you can do with ANVIL"
        subtitle="Everything below is available in the free beta. No tiers, no paywalls. Build trust first."
      >
        <div className="grid gap-6 md:grid-cols-3">
          <Card title="Earn on cash" icon={<BarChart className="h-4 w-4 text-sky-300"/>}>
            Route stablecoins to money markets and staking with improvement thresholds to avoid noisy hopping.
          </Card>
          <Card title="Stake and restake" icon={<Sparkles className="h-4 w-4 text-sky-300"/>}>
            Compare liquid staking and restaking options, then allocate with one confirmation.
          </Card>
          <Card title="High-yield vaults" icon={<Rocket className="h-4 w-4 text-sky-300"/>}>
            Track maturities, see best reinvest windows and roll positions forward in a click.
          </Card>
          <Card title="Liquidity pools (preview)" icon={<LinkIcon className="h-4 w-4 text-sky-300"/>}>
            Get pair suggestions with correlation hints and backtests. Execute when you are ready.
          </Card>
          <Card title="Explain any position" icon={<MessageSquare className="h-4 w-4 text-sky-300"/>}>
            Paste an address or tx and get a human explanation of what it does and the risks.
          </Card>
          <Card title="Alerts and reports" icon={<Shield className="h-4 w-4 text-sky-300"/>}>
            Weekly summary, maturity pings and risk alerts so you always know what is next.
          </Card>
        </div>
      </Section>

      {/* Why now */}
      <Section
        id="why-now"
        eyebrow="Why now"
        title="The shift to programmable finance is underway"
        subtitle="Policy clarity, tokenization of assets, mainstream spot ETFs and AI-native finance are converging. ANVIL turns those forces into simple, trusted action for everyone."
      >
        <div className="grid gap-6 md:grid-cols-4">
          <Card title="Policy clarity">
            Stablecoin and tokenization frameworks reduce uncertainty and open mainstream rails.
          </Card>
          <Card title="Tokenized securities">
            Funds and treasuries move from pilots to production. Collateral and settlement evolve.
          </Card>
          <Card title="Mainstream adoption">
            Flagship assets and their ETFs bring flows, liquidity and advisor-led participation.
          </Card>
          <Card title="AI-native finance">
            Consumers expect guidance they can talk to, not dashboards they must learn.
          </Card>
        </div>
      </Section>

      {/* Partners */}
      <Section
        id="partners"
        eyebrow="For protocols and partners"
        title="Bring your users. We bring clarity and action"
        subtitle="Co-branded funnels, shared performance fees on vaults, and safer defaults that reduce support load."
      >
        <div className="flex flex-wrap gap-3">
          <Button href="#contact" variant="ghost">Partner with us <ArrowRight className="h-4 w-4"/></Button>
          <Button href="#contact" variant="primary">List your venue <ArrowRight className="h-4 w-4"/></Button>
        </div>
      </Section>

      {/* Contact / Waitlist */}
      <Section
        id="contact"
        eyebrow="Get early access"
        title="Join the ANVIL waitlist"
        subtitle="Free beta. No tiers. We are focused on building trust and real utility."
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
            <Button href="#" onClick={(e)=>e.preventDefault()} variant="primary" className="justify-center">Request invite <ArrowRight className="h-4 w-4"/></Button>
          </form>
          <p className="mt-3 text-xs text-white/60">By joining you agree to receive product updates. We never sell data.</p>
        </div>
      </Section>

      {/* Footer */}
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
