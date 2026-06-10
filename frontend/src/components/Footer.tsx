"use client";

import { motion } from "motion/react";
import {
  Github,
  Twitter,
  MessageCircle,
  ArrowRight,
  Heart,
} from "lucide-react";
import {
  TextHoverEffect,
  FooterBackgroundGradient,
} from "@/components/ui/hover-footer";

/* ─── Static data ─────────────────────────────────────────────────── */
const quickLinks = [
  { label: "Home",       href: "#home"       },
  { label: "Categories", href: "#categories" },
  { label: "Trending",   href: "#trending"   },
  { label: "About",      href: "#about"      },
  { label: "Contribute", href: "#contribute" },
];

const categoryLinks = [
  { label: "Anime",       href: "#anime"      },
  { label: "Movies / TV", href: "#movies-tv"  },
  { label: "Gaming",      href: "#gaming"     },
  { label: "Reading",     href: "#reading"    },
  { label: "AI",          href: "#ai"         },
  { label: "Software",    href: "#software"   },
];

const communityLinks = [
  { icon: Github,        href: "https://github.com", label: "GitHub"  },
  { icon: MessageCircle, href: "#",                  label: "Discord" },
  { icon: Twitter,       href: "#",                  label: "Twitter" },
];

/* ─── Shared easing curves ────────────────────────────────────────── */
const EASE_OUT_QUART: [number, number, number, number] = [0.22, 1, 0.36, 1];

/* ─── Animation variants ──────────────────────────────────────────── */
const containerVariants = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.07,
      delayChildren: 0.15,
    },
  },
};

const colVariants = {
  hidden: { opacity: 0, y: 12 },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.65,
      ease: EASE_OUT_QUART,
    },
  },
};

/* ─── Reusable link row (subtle underline + translate on hover) ───── */
function FooterLink({ href, label }: { href: string; label: string }) {
  return (
    <a
      href={href}
      className="group inline-flex items-center text-[13.5px] text-white/60
        hover:text-white transition-colors duration-300 ease-out"
    >
      <span
        className="relative inline-block transition-transform duration-500
          [transition-timing-function:cubic-bezier(0.22,1,0.36,1)]
          group-hover:translate-x-[3px]"
      >
        {label}
        <span
          aria-hidden="true"
          className="absolute left-0 -bottom-0.5 h-px w-0 bg-white/80
            transition-[width] duration-500
            [transition-timing-function:cubic-bezier(0.22,1,0.36,1)]
            group-hover:w-full"
        />
      </span>
    </a>
  );
}

/* ─── Component ──────────────────────────────────────────────────── */
export default function Footer() {
  return (
    <motion.footer
      className="relative mt-24 mx-3 sm:mx-5 lg:mx-8 mb-0 overflow-hidden
        rounded-t-3xl border border-b-0 border-white/10
        bg-[rgba(7,7,10,0.94)] backdrop-blur-2xl
        shadow-[0_-1px_0_0_rgba(255,255,255,0.07)_inset,0_-40px_80px_-40px_rgba(0,0,0,0.75)]"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.9, ease: EASE_OUT_QUART }}
    >
      {/* Existing base background gradient util */}
      <FooterBackgroundGradient />

      {/* Top hairline highlight */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 h-px
          bg-gradient-to-r from-transparent via-white/25 to-transparent"
      />

      {/* Secondary top glow line — adds cinematic depth */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 h-[3px]
          bg-gradient-to-r from-transparent via-white/[0.05] to-transparent
          blur-[3px]"
      />

      {/* Ambient washes (strictly monochrome, no blue) */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 rounded-t-3xl overflow-hidden"
      >
        {/* Central wash behind the giant ZORTH */}
        <div
          className="absolute bottom-[18%] left-1/2 -translate-x-1/2
            w-[60rem] h-[36rem] rounded-full opacity-[0.07]"
          style={{
            background:
              "radial-gradient(ellipse at center, rgba(255,255,255,0.7) 0%, transparent 65%)",
            filter: "blur(70px)",
          }}
        />
        {/* Soft top wash */}
        <div
          className="absolute -top-44 left-1/2 -translate-x-1/2 w-[48rem] h-[48rem]
            rounded-full opacity-[0.05]"
          style={{
            background:
              "radial-gradient(circle, rgba(255,255,255,0.6) 0%, transparent 70%)",
            filter: "blur(80px)",
          }}
        />
        {/* Two corner ambient glows */}
        <div
          className="absolute -bottom-40 -left-20 w-[30rem] h-[30rem]
            rounded-full opacity-[0.04]"
          style={{
            background:
              "radial-gradient(circle, rgba(255,255,255,0.55) 0%, transparent 70%)",
            filter: "blur(70px)",
          }}
        />
        <div
          className="absolute -bottom-40 -right-20 w-[30rem] h-[30rem]
            rounded-full opacity-[0.04]"
          style={{
            background:
              "radial-gradient(circle, rgba(255,255,255,0.55) 0%, transparent 70%)",
            filter: "blur(70px)",
          }}
        />
      </div>

      {/* Fractal noise texture overlay (pure SVG, no asset import) */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 rounded-t-3xl
          opacity-[0.03] mix-blend-overlay"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='180' height='180'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2' stitchTiles='stitch'/><feColorMatrix values='0 0 0 0 1  0 0 0 0 1  0 0 0 0 1  0 0 0 0.6 0'/></filter><rect width='100%' height='100%' filter='url(%23n)'/></svg>\")",
          backgroundSize: "180px 180px",
        }}
      />

      {/* ── TOP SECTION ─ 4 columns ─────────────────────────────────── */}
      <motion.div
        className="relative z-10 max-w-7xl mx-auto px-6 sm:px-8 lg:px-12
          pt-14 sm:pt-16 lg:pt-20 pb-8"
        variants={containerVariants}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "-60px" }}
      >
        <div
          className="grid gap-y-10 gap-x-8 sm:gap-x-10 lg:gap-x-12
            grid-cols-1 sm:grid-cols-2 lg:grid-cols-12"
        >
          {/* ── 1. Brand ── */}
          <motion.div className="lg:col-span-4" variants={colVariants}>
            <a
              href="#home"
              className="inline-flex items-center gap-2.5 mb-5 group"
            >
              <div
                className="w-9 h-9 rounded-xl flex items-center justify-center
                  bg-gradient-to-b from-white/[0.10] to-white/[0.04]
                  border border-white/15 backdrop-blur-md
                  shadow-[inset_0_1px_0_0_rgba(255,255,255,0.10)]
                  transition-all duration-500
                  [transition-timing-function:cubic-bezier(0.22,1,0.36,1)]
                  group-hover:from-white/[0.16] group-hover:to-white/[0.07]
                  group-hover:border-white/25
                  group-hover:shadow-[inset_0_1px_0_0_rgba(255,255,255,0.14),0_0_24px_-4px_rgba(255,255,255,0.18)]"
              >
                <span
                  className="text-[14px] font-semibold tracking-wide"
                  style={{ color: "#f5f5f5" }}
                >
                  Z
                </span>
              </div>
              <span
                className="text-[15px] font-semibold tracking-[0.22em]"
                style={{ color: "#f5f5f5" }}
              >
                ZORTH
              </span>
            </a>

            <p
              className="text-[13.5px] leading-relaxed text-white/55 max-w-[20rem]"
            >
              A curated directory of entertainment and internet resources.
              Organized, searchable, and shaped by a community that values
              taste over noise.
            </p>
          </motion.div>

          {/* ── 2. Quick Links ── */}
          <motion.div className="lg:col-span-2" variants={colVariants}>
            <h4
              className="text-[11px] font-medium uppercase tracking-[0.24em]
                text-white/40 mb-5"
            >
              Quick Links
            </h4>
            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <li key={link.label}>
                  <FooterLink href={link.href} label={link.label} />
                </li>
              ))}
            </ul>
          </motion.div>

          {/* ── 3. Categories ── */}
          <motion.div className="lg:col-span-2" variants={colVariants}>
            <h4
              className="text-[11px] font-medium uppercase tracking-[0.24em]
                text-white/40 mb-5"
            >
              Categories
            </h4>
            <ul className="space-y-3">
              {categoryLinks.map((cat) => (
                <li key={cat.label}>
                  <FooterLink href={cat.href} label={cat.label} />
                </li>
              ))}
            </ul>
          </motion.div>

          {/* ── 4. Community + Newsletter ── */}
          <motion.div className="lg:col-span-4" variants={colVariants}>
            <h4
              className="text-[11px] font-medium uppercase tracking-[0.24em]
                text-white/40 mb-3"
            >
              Stay In The Loop
            </h4>
            <p className="text-[13px] leading-relaxed text-white/55 mb-4 max-w-sm">
              Quiet updates on new resources. No spam, no marketing — just
              signal.
            </p>

            <form
              onSubmit={(e) => e.preventDefault()}
              className="group/form flex items-center gap-2 p-1.5
                rounded-2xl bg-white/[0.035] border border-white/[0.09]
                backdrop-blur-xl
                transition-all duration-500
                [transition-timing-function:cubic-bezier(0.22,1,0.36,1)]
                hover:bg-white/[0.055] hover:border-white/[0.18]
                focus-within:bg-white/[0.06] focus-within:border-white/25
                focus-within:shadow-[0_0_0_4px_rgba(255,255,255,0.04),inset_0_1px_0_0_rgba(255,255,255,0.07)]
                shadow-[inset_0_1px_0_0_rgba(255,255,255,0.05)]"
            >
              <input
                type="email"
                placeholder="your@email.com"
                aria-label="Email address"
                className="flex-1 min-w-0 bg-transparent px-3 py-2 text-[13px]
                  text-white placeholder:text-white/35
                  focus:outline-none"
              />
              <motion.button
                type="submit"
                aria-label="Subscribe"
                whileHover={{ scale: 1.06 }}
                whileTap={{ scale: 0.96 }}
                transition={{ duration: 0.35, ease: EASE_OUT_QUART }}
                className="shrink-0 inline-flex items-center justify-center
                  h-9 w-9 rounded-xl
                  bg-white/[0.08] border border-white/15
                  text-white/85
                  transition-[background-color,border-color,color,box-shadow]
                  duration-300 ease-out
                  hover:bg-white/[0.16] hover:border-white/30 hover:text-white
                  hover:shadow-[0_4px_20px_-6px_rgba(255,255,255,0.18),inset_0_1px_0_0_rgba(255,255,255,0.12)]"
              >
                <ArrowRight size={15} strokeWidth={1.8} />
              </motion.button>
            </form>

            {/* Inline divider */}
            <div className="my-6 h-px bg-gradient-to-r from-transparent via-white/[0.10] to-transparent" />

            {/* Community */}
            <h4
              className="text-[11px] font-medium uppercase tracking-[0.24em]
                text-white/40 mb-4"
            >
              Community
            </h4>

            {/* Glass pill */}
            <div
              className="inline-flex items-center gap-1 p-1.5
                rounded-2xl bg-white/[0.04] border border-white/[0.09]
                backdrop-blur-xl
                transition-all duration-500
                [transition-timing-function:cubic-bezier(0.22,1,0.36,1)]
                hover:border-white/[0.18] hover:bg-white/[0.065]
                shadow-[inset_0_1px_0_0_rgba(255,255,255,0.06)]"
            >
              {communityLinks.map(({ icon: Icon, href, label }) => (
                <motion.a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  whileHover={{ y: -3, scale: 1.05 }}
                  whileTap={{ scale: 0.96 }}
                  transition={{ duration: 0.45, ease: EASE_OUT_QUART }}
                  className="group/icon relative inline-flex items-center justify-center
                    h-9 w-9 rounded-xl text-white/60
                    transition-[background-color,color,box-shadow,filter]
                    duration-500
                    [transition-timing-function:cubic-bezier(0.22,1,0.36,1)]
                    hover:text-white hover:bg-white/[0.10]
                    hover:brightness-125
                    hover:shadow-[0_6px_18px_-6px_rgba(255,255,255,0.22),inset_0_1px_0_0_rgba(255,255,255,0.10)]"
                >
                  <Icon size={16} strokeWidth={1.8} />
                </motion.a>
              ))}
            </div>
          </motion.div>
        </div>
      </motion.div>

      {/* ── MIDDLE DIVIDER + TAGLINE ────────────────────────────────── */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        <div className="relative flex items-center justify-center py-1">
          {/* Refined luxurious divider — layered hairline + soft glow */}
          <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 h-px bg-gradient-to-r from-transparent via-white/[0.12] to-transparent" />
          <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 h-[2px] bg-gradient-to-r from-transparent via-white/[0.04] to-transparent blur-[2px]" />
          <motion.span
            initial={{ opacity: 0, letterSpacing: "0.24em" }}
            whileInView={{ opacity: 0.35, letterSpacing: "0.34em" }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 1.1, ease: EASE_OUT_QUART, delay: 0.1 }}
            className="relative px-5 text-[10.5px] font-medium uppercase
              text-white whitespace-nowrap
              bg-[rgba(7,7,10,0.94)]"
          >
            Built for people who value quality over quantity
          </motion.span>
        </div>
      </div>

      {/* ── SIGNATURE GIANT ZORTH ───────────────────────────────────── */}
      <div
        className="relative z-10 max-w-[100rem] mx-auto px-2 sm:px-4 lg:px-6
          mt-3 sm:mt-4"
      >
        {/* Soft radial wash directly behind the wordmark */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-0 top-1/2 -translate-y-1/2
            h-[80%] opacity-60"
          style={{
            background:
              "radial-gradient(ellipse at center, rgba(255,255,255,0.06) 0%, transparent 60%)",
            filter: "blur(40px)",
          }}
        />

        <motion.div
          aria-hidden="true"
          initial={{ opacity: 0, scale: 0.985, y: 6 }}
          whileInView={{ opacity: 0.1, scale: 1, y: 0 }}
          whileHover={{ opacity: 0.18, scale: 1.03 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{
            opacity: { duration: 1.4, ease: EASE_OUT_QUART, delay: 0.15 },
            scale:   { duration: 1.4, ease: EASE_OUT_QUART },
            y:       { duration: 1.4, ease: EASE_OUT_QUART },
          }}
          style={{
            filter:
              "grayscale(1) brightness(1.6) drop-shadow(0 0 24px rgba(255,255,255,0.08))",
            transformOrigin: "center",
          }}
          className="select-none cursor-default
            h-[11rem] sm:h-[15rem] md:h-[19rem] lg:h-[23rem]
            will-change-[opacity,transform]"
        >
          <TextHoverEffect text="ZORTH" duration={0} />
        </motion.div>
      </div>

      {/* ── BOTTOM ROW ──────────────────────────────────────────────── */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-40px" }}
        transition={{ duration: 0.7, ease: EASE_OUT_QUART, delay: 0.2 }}
        className="relative z-10 max-w-7xl mx-auto px-6 sm:px-8 lg:px-12
          pb-7 sm:pb-8 -mt-1"
      >
        <div className="pt-5 border-t border-white/[0.07]">
          <div
            className="flex flex-col sm:flex-row items-center justify-center
              gap-2 sm:gap-0 text-center"
          >
            <p className="text-[12px] text-white/45 tracking-[0.02em]">
              © 2026 Zorth
            </p>
            <span
              aria-hidden="true"
              className="hidden sm:inline-block mx-4 h-3 w-px bg-white/15"
            />
            <p className="text-[12px] text-white/40 tracking-[0.02em] italic">
              Curated with care
            </p>
            <span
              aria-hidden="true"
              className="hidden sm:inline-block mx-4 h-3 w-px bg-white/15"
            />
            <p className="text-[12px] text-white/45 inline-flex items-center gap-1.5 tracking-[0.02em]">
              Made with
              <Heart
                size={11}
                className="text-white/75"
                fill="currentColor"
                aria-hidden="true"
              />
              by the community
            </p>
          </div>
        </div>
      </motion.div>
    </motion.footer>
  );
}
