import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  ArrowRight,
  ArrowUpRight,
  Check,
  Heart,
  Lock,
  Phone,
  Shield,
  UserCheck,
} from 'lucide-react';
import { SEO } from '../components/SEO';

/* ------------------------------ Static data ------------------------------ */

const VERIFIED_PEOPLE = [
  { initial: 'B', name: 'Bhaskar', role: 'Full-stack Engineer', tint: '#5b7fc4', chips: ['Identity', 'References'] },
  { initial: 'A', name: 'Ajay', role: 'Data Engineer', tint: '#c25e3a', chips: ['Identity', 'Employment'] },
  { initial: 'K', name: 'Koushika', role: 'DevOps · AWS', tint: '#5e7d4d', chips: ['Identity', 'Employment'] },
  { initial: 'V', name: 'Virushka', role: 'React Developer', tint: '#7a4fb0', chips: ['Identity', 'References'] },
  { initial: 'V', name: 'Vamiko', role: 'Java Developer', tint: '#b47b30', chips: ['Identity', 'References'] },
  { initial: 'S', name: 'Srinivasulu', role: 'QA Automation', tint: '#3d5c9e', chips: ['Identity', 'Employment'] },
];

const TICKER_ITEMS = [
  '100+ candidates verified by hand, daily',
  'Identity checked',
  'References actually called',
  'Employment confirmed',
  'No AI — humans in the loop',
];

const CANDIDATE_PROMISES = [
  {
    title: 'Verify once, reuse everywhere',
    copy: 'Your identity, work history, and references checked one time, trusted by every employer on the platform.',
  },
  {
    title: 'Real humans call your references',
    copy: 'Not an algorithm scoring keywords. A person, on the phone, vouching that you are who you say you are.',
  },
  {
    title: 'No more black holes',
    copy: 'Watch your application move through every stage. Screening, interview, offer — you always know where you stand.',
  },
];

const RECRUITER_PROMISES = [
  {
    title: 'Stop interviewing strangers',
    copy: 'Every profile is pre-verified before it reaches you. The person in the interview is the person on the résumé.',
  },
  {
    title: 'Shortlists, not piles',
    copy: 'The best 3–5 verified matches per role, hand-delivered. Nobody has time for 200 unread CVs.',
  },
  {
    title: 'One pipeline, whole team',
    copy: 'A live kanban from applied to signed offer. Drag, comment, decide — everyone sees the same truth.',
  },
];

const STEPS = [
  { n: 1, label: 'You tell us', copy: 'A role, the must-haves, the team it joins. Five minutes, no 40-field forms.' },
  { n: 2, label: 'We verify', copy: 'Our team checks identity, employment and references for every match. By hand. Really.' },
  { n: 3, label: 'You meet', copy: 'A shortlist of 3–5 proven people lands in your pipeline, ready to interview.' },
  { n: 4, label: 'You hire', copy: 'Offer, e-signature, done inside the same platform, with the whole story on record.' },
];

const COMPLIANCE = [
  { icon: Shield, label: 'EU-verified employers' },
  { icon: Lock, label: 'Data encrypted at rest' },
  { icon: UserCheck, label: 'Work authorization checked' },
  { icon: Check, label: 'SOC 2 in progress' },
];

const STATS_BIG = [
  { value: '3,854', label: 'candidates verified and counting' },
  { value: '28%', label: 'roles filled' },
  { value: '0.7d', label: 'days to a shortlist' },
  { value: '0', label: 'bots involved' },
];

const TESTIMONIALS = [
  {
    quote:
      'We cut time-to-hire from three weeks to four days. The verification layer alone saves my team six hours per candidate.',
    name: 'Priya Mehta',
    title: 'VP Talent Acquisition, Accelerix',
  },
  {
    quote:
      'We stopped getting ghosted by candidates who weren’t work-authorized. Every profile we open is already real. It’s hiring on easy mode.',
    name: 'David Torres',
    title: 'Head of Recruiting, TL2',
  },
  {
    quote:
      'A candidate moved from interview to managing the team. The client asked what agency we switched to. We just switched tools.',
    name: 'Aisha Kamara',
    title: 'Senior Delivery Manager, CogniSpark',
  },
  {
    quote:
      'Someone finally built the hiring workflow that a platform company would build for themselves. We recommend it now.',
    name: 'Bhaskar Lekkala',
    title: 'Full-stack Engineer',
  },
];

/* --------------------------------- Page --------------------------------- */

export default function HomePage() {
  return (
    <>
      <SEO
        title="Hiring should feel honest"
        description="A verified job board for teams who care. Behind every résumé is someone’s rent, someone’s family, someone’s dream — we put our trust in humans."
      />

      {/* --------------------------- Editorial hero --------------------------- */}
      <section className="relative overflow-hidden">
        <div className="relative mx-auto max-w-6xl px-4 pb-12 pt-16 sm:px-6 sm:pt-24">
          <motion.h1
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="font-display text-center text-[13vw] font-medium leading-[0.9] tracking-[-0.03em] text-[color:var(--color-text)] sm:text-[11vw] md:text-[112px]"
          >
            Hiring should feel
            <br />
            <span className="italic text-[color:var(--color-text)]">honest.</span>
          </motion.h1>

          <div className="mx-auto mt-4 flex max-w-3xl flex-col items-center">
            <SquiggleUnderline />
            <motion.p
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
              className="mt-5 text-center text-[17px] italic leading-[1.55] text-[color:var(--color-text-muted)] sm:text-[18.5px]"
              style={{ fontFamily: 'var(--font-display)' }}
            >
              Behind every résumé is someone’s rent, someone’s family, someone’s
              dream. And behind every bad hire is a team that paid for it.{' '}
              <span className="terra-underline">
                In the era of AI, we put our trust in humans.
              </span>
            </motion.p>
          </div>

          {/* Persona cards */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
            className="mx-auto mt-12 grid max-w-4xl gap-6 md:grid-cols-2"
          >
            <PersonaCard
              to="/jobs"
              variant="cream"
              eyebrow="For candidates"
              title="I’m looking for work"
              copy="10 minutes to register. We take care of the rest until you’re holding an offer."
            />
            <PersonaCard
              to="/post-job"
              variant="ink"
              eyebrow="For recruiters"
              title="I’m hiring talent"
              copy="We verify everything that matters to you, before you meet. A shortlist of 3–5 in days, not 200 CVs."
            />
          </motion.div>

          {/* Trust pill row */}
          <div className="mx-auto mt-8 flex max-w-4xl flex-wrap items-center justify-center gap-2 text-[12.5px] text-[color:var(--color-text-muted)]">
            <TrustPill icon={<Heart size={12} className="text-[color:var(--color-accent)]" fill="currentColor" />}>
              Free for candidates, forever
            </TrustPill>
            <TrustPill icon={<Lock size={12} className="text-[color:var(--color-text-subtle)]" />}>
              Your data stays yours
            </TrustPill>
            <TrustPill icon={<UserCheck size={12} className="text-[color:var(--color-text-subtle)]" />}>
              Every profile reviewed by a human
            </TrustPill>
            <TrustPill icon={<Phone size={12} className="text-[color:var(--color-text-subtle)]" />}>
              We pick up the phone
            </TrustPill>
          </div>
        </div>
      </section>

      {/* --------------------- Verified people row w/ arrow ------------------- */}
      <section className="relative mx-auto max-w-6xl px-4 pt-10 sm:px-6">
        {/* Hand-drawn label + arrow */}
        <div className="mb-4 flex justify-end pr-4">
          <div className="relative">
            <span className="handwritten">real people, actually verified</span>
            <svg
              width="72"
              height="42"
              viewBox="0 0 72 42"
              fill="none"
              aria-hidden="true"
              className="absolute -bottom-8 right-2"
            >
              <path
                d="M4 4 C 20 18, 32 26, 54 34"
                stroke="var(--color-accent)"
                strokeWidth="1.5"
                fill="none"
                strokeLinecap="round"
              />
              <path
                d="M46 34 L 54 34 L 50 26"
                stroke="var(--color-accent)"
                strokeWidth="1.5"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
        </div>

        <div className="scrollbar-none -mx-4 flex gap-4 overflow-x-auto px-4 pb-4 sm:mx-0 sm:px-0">
          {VERIFIED_PEOPLE.map((p) => (
            <VerifiedCard key={p.name} person={p} />
          ))}
        </div>
      </section>

      {/* ----------------------------- Marquee ticker ------------------------- */}
      <section className="mt-10 border-y border-[color:var(--color-ink)] bg-[color:var(--color-ink)] py-4 overflow-hidden">
        <div className="marquee-track flex w-max gap-10 whitespace-nowrap text-[13px] font-medium uppercase tracking-[0.14em] text-white/85">
          {[...TICKER_ITEMS, ...TICKER_ITEMS, ...TICKER_ITEMS, ...TICKER_ITEMS].map(
            (t, i) => (
              <span key={i} className="inline-flex items-center gap-4">
                <span className="text-[color:var(--color-accent)]">✦</span>
                {t}
              </span>
            ),
          )}
        </div>
      </section>

      {/* --------------- Both-ends section w/ circled "both" ------------------ */}
      <section className="mx-auto max-w-4xl px-4 pt-24 text-center sm:px-6">
        <p className="text-[11.5px] font-medium uppercase tracking-[0.24em] text-[color:var(--color-accent)]">
          One bridge, two sides
        </p>
        <h2 className="font-display mt-6 text-[44px] font-medium leading-[1.05] tracking-[-0.02em] text-[color:var(--color-text)] sm:text-[64px]">
          Built for the people on{' '}
          <span className="relative inline-block italic">
            both
            <svg
              className="pointer-events-none absolute -left-3 -top-2"
              width="120"
              height="70"
              viewBox="0 0 120 70"
              aria-hidden="true"
            >
              <ellipse
                cx="60"
                cy="35"
                rx="55"
                ry="26"
                fill="none"
                stroke="var(--color-accent)"
                strokeWidth="2"
                strokeDasharray="2 3"
                transform="rotate(-6 60 35)"
              />
            </svg>
          </span>
          <br />
          ends of the offer letter.
        </h2>
      </section>

      {/* --------------------------- Candidate section ------------------------ */}
      <section className="mx-auto max-w-6xl px-4 pt-24 sm:px-6">
        <div className="grid gap-10 lg:grid-cols-2 lg:items-center">
          <div>
            <p className="text-[11.5px] font-medium uppercase tracking-[0.24em] text-[color:var(--color-accent)]">
              For candidates
            </p>
            <h3 className="font-display mt-4 text-[40px] font-medium leading-[1.05] tracking-[-0.02em] text-[color:var(--color-text)] sm:text-[52px]">
              Your word, finally{' '}
              <em className="italic text-[color:var(--color-text)]">proven.</em>
            </h3>
            <ul className="mt-8 flex flex-col gap-6">
              {CANDIDATE_PROMISES.map((item) => (
                <li key={item.title} className="flex gap-4">
                  <span className="mt-1 inline-flex h-6 w-6 shrink-0 items-center justify-center rounded-full border border-[color:var(--color-text)]/15 bg-[color:var(--color-surface)]">
                    <Check size={12} strokeWidth={2.5} className="text-[color:var(--color-text)]" />
                  </span>
                  <div>
                    <div className="text-[15px] font-semibold text-[color:var(--color-text)]">
                      {item.title}
                    </div>
                    <p className="mt-1 max-w-md text-[14px] leading-relaxed text-[color:var(--color-text-muted)]">
                      {item.copy}
                    </p>
                  </div>
                </li>
              ))}
            </ul>

            <Link
              to="/signup"
              className="mt-9 inline-flex items-center gap-2 text-[14.5px] font-medium text-[color:var(--color-accent-text)] hover:underline"
            >
              Create your free profile
              <ArrowRight size={14} aria-hidden="true" />
            </Link>
          </div>

          {/* Mock verified-profile card */}
          <VerifiedProfileMock />
        </div>
      </section>

      {/* -------------------------- Recruiter section ------------------------- */}
      <section className="mx-auto max-w-6xl px-4 pt-24 sm:px-6">
        <div className="grid gap-10 lg:grid-cols-2 lg:items-center">
          {/* Mock shortlist card */}
          <ShortlistMock />

          <div>
            <p className="text-[11.5px] font-medium uppercase tracking-[0.24em] text-[color:var(--color-accent)]">
              For recruiters
            </p>
            <h3 className="font-display mt-4 text-[40px] font-medium leading-[1.05] tracking-[-0.02em] text-[color:var(--color-text)] sm:text-[52px]">
              Hire people, not{' '}
              <em className="italic text-[color:var(--color-text)]">maybes.</em>
            </h3>
            <ul className="mt-8 flex flex-col gap-6">
              {RECRUITER_PROMISES.map((item) => (
                <li key={item.title} className="flex gap-4">
                  <span className="mt-1 inline-flex h-6 w-6 shrink-0 items-center justify-center rounded-full border border-[color:var(--color-text)]/15 bg-[color:var(--color-surface)]">
                    <Check size={12} strokeWidth={2.5} className="text-[color:var(--color-text)]" />
                  </span>
                  <div>
                    <div className="text-[15px] font-semibold text-[color:var(--color-text)]">
                      {item.title}
                    </div>
                    <p className="mt-1 max-w-md text-[14px] leading-relaxed text-[color:var(--color-text-muted)]">
                      {item.copy}
                    </p>
                  </div>
                </li>
              ))}
            </ul>

            <Link
              to="/post-job"
              className="mt-9 inline-flex items-center gap-2 text-[14.5px] font-medium text-[color:var(--color-accent-text)] hover:underline"
            >
              Start hiring verified talent
              <ArrowRight size={14} aria-hidden="true" />
            </Link>
          </div>
        </div>
      </section>

      {/* ---------------------------- How it works ---------------------------- */}
      <section className="mx-auto max-w-6xl px-4 pt-24 text-center sm:px-6">
        <p className="text-[11.5px] font-medium uppercase tracking-[0.24em] text-[color:var(--color-accent)]">
          How it works
        </p>
        <h2 className="font-display mt-4 text-[40px] font-medium leading-[1.05] tracking-[-0.02em] text-[color:var(--color-text)] sm:text-[52px]">
          The honest version.
        </h2>
        <p className="mx-auto mt-3 max-w-lg text-[14.5px] leading-relaxed text-[color:var(--color-text-muted)]">
          No magic. Just a careful process, done by people who care, faster than
          you’d believe.
        </p>

        <div className="mt-14 grid gap-10 md:grid-cols-4 md:gap-6">
          {STEPS.map((s, i) => (
            <div key={s.n} className="relative flex flex-col items-center">
              {i < STEPS.length - 1 && (
                <div
                  aria-hidden="true"
                  className="absolute left-[calc(50%+28px)] top-6 hidden h-px w-[calc(100%-56px)] bg-[color:var(--color-border-strong)] md:block"
                />
              )}
              <span className="font-display flex h-12 w-12 items-center justify-center rounded-full border border-[color:var(--color-text)] bg-[color:var(--color-canvas)] text-[22px] italic text-[color:var(--color-text)]">
                {s.n}
              </span>
              <div className="mt-4 text-[15px] font-semibold text-[color:var(--color-text)]">
                {s.label}
              </div>
              <p className="mt-2 max-w-[220px] text-center text-[13.5px] leading-relaxed text-[color:var(--color-text-muted)]">
                {s.copy}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* ------------------------ In the era of AI ---------------------------- */}
      <section className="mx-auto max-w-4xl px-4 pt-28 text-center sm:px-6">
        <div className="mb-6 flex justify-center">
          <span className="stamp">100% Human</span>
        </div>
        <h2 className="font-display text-[52px] font-medium leading-[1.02] tracking-[-0.02em] text-[color:var(--color-text)] sm:text-[80px]">
          In the era of AI,
          <br />
          <em className="italic text-[color:var(--color-accent)]">
            we trust humans.
          </em>
        </h2>
        <p className="mx-auto mt-6 max-w-2xl text-[15px] leading-relaxed text-[color:var(--color-text-muted)]">
          Our team verifies{' '}
          <strong className="font-semibold text-[color:var(--color-text)]">
            100+ candidates by hand, every single day
          </strong>{' '}
          — no models, no shortcuts. We check everything that matters to a
          company: identity, employment, references, documents. Then we get out
          of the way.
        </p>
        <p
          className="mx-auto mt-4 max-w-2xl text-[16px] italic leading-relaxed text-[color:var(--color-text-muted)]"
          style={{ fontFamily: 'var(--font-display)' }}
        >
          Just a bridge between the recruiter and the candidate. That’s the
          whole job. That’s the name.
        </p>

        {/* Compliance chips */}
        <div className="mt-10 flex flex-wrap items-center justify-center gap-2">
          {COMPLIANCE.map(({ icon: Icon, label }) => (
            <span
              key={label}
              className="inline-flex items-center gap-2 rounded-full border border-[color:var(--color-border)] bg-[color:var(--color-surface)] px-3.5 py-1.5 text-[12.5px] text-[color:var(--color-text-muted)]"
            >
              <Icon size={12} className="text-[color:var(--color-text-subtle)]" />
              {label}
            </span>
          ))}
        </div>
      </section>

      {/* ------------------------------ Big stats ---------------------------- */}
      <section className="mx-auto max-w-6xl px-4 pt-24 sm:px-6">
        <div className="grid grid-cols-2 gap-y-10 md:grid-cols-4">
          {STATS_BIG.map((s, i) => (
            <div key={s.label} className="flex flex-col items-center text-center">
              <div className="font-display relative text-[64px] font-medium leading-none tracking-[-0.02em] text-[color:var(--color-text)] sm:text-[80px]">
                {s.value}
                {i === 0 && (
                  <span
                    aria-hidden="true"
                    className="absolute -right-3 top-1 h-2 w-2 rounded-full bg-[color:var(--color-accent)] sm:-right-4"
                  />
                )}
              </div>
              <div className="mt-3 max-w-[200px] text-[12.5px] leading-tight text-[color:var(--color-text-muted)]">
                {s.label}
              </div>
            </div>
          ))}
        </div>
        <p
          className="mt-8 text-center text-[13px] italic text-[color:var(--color-text-subtle)]"
          style={{ fontFamily: 'var(--font-display)' }}
        >
          * real numbers from real placements — not projections
        </p>
      </section>

      {/* --------------------------- Testimonials ----------------------------- */}
      <section className="mx-auto max-w-6xl px-4 pt-24 text-center sm:px-6">
        <p className="text-[11.5px] font-medium uppercase tracking-[0.24em] text-[color:var(--color-accent)]">
          Word travels
        </p>
        <h2 className="font-display mt-4 text-[40px] font-medium leading-[1.05] tracking-[-0.02em] text-[color:var(--color-text)] sm:text-[52px]">
          What teams say after the{' '}
          <em className="italic">first hire.</em>
        </h2>

        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {TESTIMONIALS.map((t) => (
            <figure
              key={t.name}
              className="flex h-full flex-col rounded-[var(--radius-lg)] border border-[color:var(--color-border)] bg-[color:var(--color-surface)] p-5"
            >
              <blockquote
                className="text-[14px] italic leading-[1.55] text-[color:var(--color-text)]"
                style={{ fontFamily: 'var(--font-display)' }}
              >
                “{t.quote}”
              </blockquote>
              <figcaption className="mt-4 text-[12px]">
                <div className="font-medium text-[color:var(--color-text)]">
                  {t.name}
                </div>
                <div className="text-[color:var(--color-text-subtle)]">
                  {t.title}
                </div>
              </figcaption>
            </figure>
          ))}
        </div>
      </section>

      {/* ------------------------------ Dark CTA ------------------------------ */}
      <section className="mx-auto max-w-6xl px-4 pb-28 pt-20 sm:px-6">
        <div className="relative overflow-hidden rounded-[var(--radius-xl)] bg-[color:var(--color-ink)] p-10 text-center sm:p-16">
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0"
            style={{
              background:
                'radial-gradient(60% 80% at 20% 10%, rgba(224, 134, 97, 0.20), transparent 70%), radial-gradient(50% 70% at 90% 90%, rgba(224, 134, 97, 0.14), transparent 70%)',
            }}
          />
          <span
            aria-hidden="true"
            className="absolute left-6 top-6 text-[color:var(--color-accent)] sm:left-10 sm:top-10"
          >
            ✦
          </span>
          <div className="relative">
            <h2 className="font-display text-[52px] font-medium leading-[1.02] tracking-[-0.02em] text-white sm:text-[80px]">
              Ready when{' '}
              <em className="italic text-[color:var(--color-accent)]">you</em>{' '}
              are.
            </h2>
            <p className="mx-auto mt-4 max-w-md text-[14.5px] leading-relaxed text-white/70">
              Candidates verify free, forever. Recruiters see their first
              shortlist this week.
            </p>
            <div className="mt-8 flex flex-wrap justify-center gap-3">
              <Link
                to="/jobs"
                className="inline-flex h-12 items-center gap-2 rounded-full bg-[color:var(--color-accent)] px-6 text-[14.5px] font-medium text-white transition hover:bg-[color:var(--color-accent-hover)]"
              >
                Find verified talent
              </Link>
              <Link
                to="/signup"
                className="inline-flex h-12 items-center gap-2 rounded-full border border-white/20 bg-white/5 px-6 text-[14.5px] font-medium text-white transition hover:bg-white/10"
              >
                Build my verified profile
              </Link>
            </div>
            <p
              className="mt-6 text-[13px] italic text-white/50"
              style={{ fontFamily: 'var(--font-display)' }}
            >
              talent asked ‘10 seconds’ ;)
            </p>
          </div>
        </div>
      </section>
    </>
  );
}

/* --------------------------- Small components --------------------------- */

function SquiggleUnderline() {
  return (
    <svg
      width="260"
      height="16"
      viewBox="0 0 260 16"
      fill="none"
      aria-hidden="true"
      className="mx-auto"
    >
      <path
        d="M4 10 C 40 2, 70 14, 108 8 S 180 2, 216 10 S 250 4, 256 8"
        className="squiggle-underline"
      />
    </svg>
  );
}

function TrustPill({ icon, children }) {
  return (
    <span className="inline-flex items-center gap-1.5 rounded-full border border-[color:var(--color-border)] bg-[color:var(--color-surface)] px-3 py-1.5">
      {icon}
      {children}
    </span>
  );
}

function PersonaCard({ to, variant, eyebrow, title, copy }) {
  const isInk = variant === 'ink';
  return (
    <Link
      to={to}
      className={`group relative block rounded-[var(--radius-lg)] p-7 transition-transform duration-300 hover:-translate-y-1 sm:p-8 ${
        isInk
          ? 'bg-[color:var(--color-ink)] text-white shadow-[var(--shadow-elev-3)]'
          : 'bg-white text-[color:var(--color-text)]'
      }`}
      style={
        isInk
          ? undefined
          : {
              boxShadow:
                '0 8px 0 -1px var(--color-accent), 0 24px 40px -12px rgba(26,22,19,0.15)',
            }
      }
    >
      <div className="flex items-start justify-between gap-4">
        <p
          className={`text-[11.5px] font-medium uppercase tracking-[0.18em] ${
            isInk ? 'text-white/55' : 'text-[color:var(--color-text-subtle)]'
          }`}
        >
          {eyebrow}
        </p>
        <ArrowUpRight
          size={22}
          className={`transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 ${
            isInk ? 'text-white' : 'text-[color:var(--color-text)]'
          }`}
          aria-hidden="true"
        />
      </div>

      <h3
        className={`font-display mt-5 text-[26px] font-semibold leading-[1.1] tracking-[-0.01em] sm:text-[30px] ${
          isInk ? 'text-white' : 'text-[color:var(--color-text)]'
        }`}
      >
        {title}
      </h3>

      <p
        className={`mt-3 max-w-sm text-[14px] leading-relaxed ${
          isInk ? 'text-white/70' : 'text-[color:var(--color-text-muted)]'
        }`}
      >
        {copy}
      </p>
    </Link>
  );
}

function VerifiedCard({ person }) {
  return (
    <div className="w-[220px] shrink-0 rounded-[var(--radius-md)] border border-[color:var(--color-border)] bg-[color:var(--color-surface)] p-4 shadow-[var(--shadow-elev-1)]">
      <div className="flex items-start justify-between">
        <div
          className="flex h-11 w-11 items-center justify-center rounded-md text-[15px] font-semibold text-white"
          style={{ backgroundColor: person.tint }}
          aria-hidden="true"
        >
          {person.initial}
        </div>
        <span className="tape" style={{ backgroundColor: person.tint }}>
          <Check size={10} strokeWidth={3} />
          Verified
        </span>
      </div>
      <div className="mt-3 text-[14px] font-semibold text-[color:var(--color-text)]">
        {person.name}
      </div>
      <div className="text-[12px] text-[color:var(--color-text-subtle)]">
        {person.role}
      </div>
      <div className="mt-3 flex flex-wrap gap-1">
        {person.chips.map((c) => (
          <span
            key={c}
            className="inline-flex items-center gap-1 rounded-full border border-[color:var(--color-border)] bg-[color:var(--color-canvas)] px-2 py-0.5 text-[10.5px] text-[color:var(--color-text-muted)]"
          >
            <Check size={9} strokeWidth={3} className="text-[color:var(--color-success)]" />
            {c}
          </span>
        ))}
      </div>
    </div>
  );
}

function VerifiedProfileMock() {
  return (
    <div
      className="relative rounded-[var(--radius-lg)] bg-[color:var(--color-surface)] p-6 shadow-[var(--shadow-elev-3)]"
      style={{ transform: 'rotate(1.4deg)' }}
    >
      <div className="flex items-start justify-between">
        <div className="flex items-center gap-3">
          <div
            className="flex h-11 w-11 items-center justify-center rounded-md text-[15px] font-semibold text-white"
            style={{ backgroundColor: '#c25e3a' }}
            aria-hidden="true"
          >
            AK
          </div>
          <div>
            <div className="text-[15px] font-semibold text-[color:var(--color-text)]">
              Ajay Krishna
            </div>
            <div className="text-[12px] text-[color:var(--color-text-subtle)]">
              Full-stack Engineer · Chennai, IN
            </div>
          </div>
        </div>
        <span className="tape" style={{ backgroundColor: '#5e7d4d' }}>
          <Check size={10} strokeWidth={3} />
          Verified
        </span>
      </div>

      <div className="mt-5 grid grid-cols-1 gap-2 sm:grid-cols-2">
        <MockRow label="Identity verified" />
        <MockRow label="Employment confirmed" />
        <MockRow label="References called" />
        <MockRow label="Documents reviewed" />
      </div>

      <div className="mt-5 rounded-[var(--radius)] border border-dashed border-[color:var(--color-border-strong)] bg-[color:var(--color-canvas)] p-3 text-[12.5px] italic leading-relaxed text-[color:var(--color-text-muted)]">
        “Reference check completed with his former manager at Dataleve. All
        confirmed.”
        <div className="mt-1 not-italic text-[11px] text-[color:var(--color-text-subtle)]">
          — Verification team, Tuesday 11:24 IST
        </div>
      </div>
    </div>
  );
}

function MockRow({ label }) {
  return (
    <div className="flex items-center gap-2 rounded-[var(--radius-sm)] border border-[color:var(--color-border)] bg-[color:var(--color-canvas)] px-2.5 py-2 text-[12.5px] text-[color:var(--color-text)]">
      <span className="flex h-4 w-4 items-center justify-center rounded-full bg-[color:var(--color-success)] text-white">
        <Check size={9} strokeWidth={3.5} />
      </span>
      {label}
    </div>
  );
}

function ShortlistMock() {
  const rows = [
    { name: 'Keerthana Reddy', role: 'Data Engineer', tint: '#c25e3a', badge: 'Strong fit' },
    { name: 'Sarah Mitchell', role: 'Cloud Architect', tint: '#5b7fc4', badge: 'Strong fit' },
    { name: 'Dhanush Kumar', role: 'DevOps · AWS', tint: '#5e7d4d', badge: 'Great fit' },
    { name: 'James Walker', role: 'Java Backend', tint: '#7a4fb0', badge: 'Great fit' },
  ];
  return (
    <div
      className="rounded-[var(--radius-lg)] bg-[color:var(--color-surface)] p-6 shadow-[var(--shadow-elev-3)]"
      style={{ transform: 'rotate(-1.2deg)' }}
    >
      <div className="flex items-center justify-between border-b border-[color:var(--color-border)] pb-3">
        <div>
          <div className="text-[14px] font-semibold text-[color:var(--color-text)]">
            Wednesday’s shortlist
          </div>
          <div className="text-[11.5px] text-[color:var(--color-text-subtle)]">
            4 verified · fresh today
          </div>
        </div>
        <span className="tape" style={{ backgroundColor: 'var(--color-accent)' }}>
          Ready
        </span>
      </div>

      <ul className="mt-3 flex flex-col divide-y divide-[color:var(--color-border)]">
        {rows.map((r) => (
          <li key={r.name} className="flex items-center gap-3 py-2.5">
            <div
              className="flex h-9 w-9 items-center justify-center rounded-full text-[12px] font-semibold text-white"
              style={{ backgroundColor: r.tint }}
              aria-hidden="true"
            >
              {r.name
                .split(' ')
                .map((p) => p[0])
                .join('')
                .slice(0, 2)}
            </div>
            <div className="min-w-0 flex-1">
              <div className="truncate text-[13.5px] font-medium text-[color:var(--color-text)]">
                {r.name}
              </div>
              <div className="truncate text-[11.5px] text-[color:var(--color-text-subtle)]">
                {r.role}
              </div>
            </div>
            <span className="rounded-full border border-[color:var(--color-border)] bg-[color:var(--color-canvas)] px-2 py-0.5 text-[10.5px] font-medium text-[color:var(--color-text-muted)]">
              {r.badge}
            </span>
          </li>
        ))}
      </ul>

      <p
        className="mt-3 text-[12px] italic text-[color:var(--color-text-subtle)]"
        style={{ fontFamily: 'var(--font-display)' }}
      >
        All four ready for interview this week →
      </p>
    </div>
  );
}
