"use client";

import { motion } from "framer-motion";
import { ScanSearch, ShieldCheck, LayoutGrid, Users } from "lucide-react";

const features = [
  {
    icon: ScanSearch,
    title: "Curated, not crawled",
    desc: "Every entry is reviewed by humans, not scraped by bots. Quality over quantity, always.",
  },
  {
    icon: ShieldCheck,
    title: "Safe & verified",
    desc: "Resources are regularly checked to stay active, safe, and trustworthy — no dead links or sketchy redirects.",
  },
  {
    icon: LayoutGrid,
    title: "Organized categories",
    desc: "Streaming, AI, gaming, reading, software, and more — structured so you actually find what you need.",
  },
  {
    icon: Users,
    title: "Community-driven",
    desc: "Built and improved by enthusiasts who genuinely care about the open internet.",
  },
];

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.09,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 14 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.46, ease: [0.25, 0.1, 0.25, 1] },
  },
};

export default function AboutSection() {
  return (
    <section id="about" className="section-py relative overflow-hidden">
      {/* Ambient orbs — toned down */}
      <div
        className="glow-orb w-[520px] h-[520px] -left-24 top-1/4 pointer-events-none"
        style={{ background: "rgba(99,102,241,0.035)" }}
      />
      <div
        className="glow-orb w-[340px] h-[340px] right-0 bottom-1/3 pointer-events-none"
        style={{ background: "rgba(148,163,184,0.025)" }}
      />

      <div className="relative z-10 max-w-[88rem] mx-auto px-4 sm:px-8 lg:px-14">

        {/* ── Header ── */}
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.52, ease: [0.25, 0.1, 0.25, 1] }}
          className="mb-14 sm:mb-18"
        >
          {/* Badge — improved visibility, premium dark-glass */}
          <div className="inline-flex items-center mb-7">
            <span
              className="inline-flex items-center gap-1.5 text-[0.6875rem] font-semibold uppercase px-3 py-[0.35rem] rounded-lg"
              style={{
                color: "rgba(255,255,255,0.72)",
                background:
                  "linear-gradient(135deg, rgba(255,255,255,0.09) 0%, rgba(255,255,255,0.04) 100%)",
                border: "1px solid rgba(255,255,255,0.13)",
                letterSpacing: "0.14em",
                boxShadow:
                  "0 1px 2px rgba(0,0,0,0.25), inset 0 1px 0 rgba(255,255,255,0.06)",
              }}
            >
              <span
                style={{
                  display: "inline-block",
                  width: "5px",
                  height: "5px",
                  borderRadius: "50%",
                  background: "rgba(255,255,255,0.45)",
                  flexShrink: 0,
                }}
              />
              Why Zorth
            </span>
          </div>

          {/* Two-column heading + tagline */}
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_minmax(0,22rem)] lg:items-end gap-5 lg:gap-20">
            <div>
              <h2
                className="text-3xl sm:text-4xl lg:text-[2.875rem] font-bold tracking-tight leading-[1.13]"
                style={{ color: "var(--color-text-white)" }}
              >
                Discovery, done right.
              </h2>
              <p
                className="mt-4 text-[0.9375rem] leading-relaxed max-w-[30rem]"
                style={{
                  color: "var(--color-text-secondary)",
                  lineHeight: "1.7",
                }}
              >
                A curated directory for the open internet — built to help you
                find great resources without the noise.
              </p>
            </div>

            <p
              className="text-[0.8125rem] leading-[1.72] lg:text-right lg:pb-[0.2rem]"
              style={{
                color: "var(--color-text-secondary)",
                opacity: 0.62,
                maxWidth: "20rem",
              }}
            >
              Not another link dump — every resource is hand‑picked,
              verified, and organized so you can trust what you find.
            </p>
          </div>

          {/* Separator */}
          <div
            className="mt-10 h-px w-full"
            style={{
              background:
                "linear-gradient(90deg, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0.04) 55%, transparent 100%)",
            }}
          />
        </motion.div>

        {/* ── Feature cards ── */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-40px" }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5"
        >
          {features.map((feature) => {
            const Icon = feature.icon;
            return (
              <motion.div
                key={feature.title}
                variants={itemVariants}
                className="group relative rounded-2xl p-6 sm:p-7 flex flex-col gap-5 cursor-default"
                style={{
                  background:
                    "linear-gradient(155deg, rgba(255,255,255,0.048) 0%, rgba(255,255,255,0.016) 100%)",
                  border: "1px solid rgba(255,255,255,0.075)",
                  backdropFilter: "blur(12px)",
                  WebkitBackdropFilter: "blur(12px)",
                  transition:
                    "border-color 0.26s ease, box-shadow 0.26s ease, transform 0.26s ease",
                }}
                whileHover={{
                  y: -3,
                  borderColor: "rgba(255,255,255,0.14)",
                  boxShadow:
                    "0 12px 32px -8px rgba(0,0,0,0.5), 0 0 0 1px rgba(255,255,255,0.07)",
                  transition: { duration: 0.22 },
                }}
              >
                {/* Top-edge shimmer */}
                <div
                  className="absolute inset-x-0 top-0 h-px rounded-t-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
                  style={{
                    background:
                      "linear-gradient(90deg, transparent 10%, rgba(255,255,255,0.15) 50%, transparent 90%)",
                  }}
                />

                {/* Icon */}
                <div
                  className="relative w-[2.375rem] h-[2.375rem] rounded-xl flex items-center justify-center flex-shrink-0"
                  style={{
                    background: "rgba(255,255,255,0.065)",
                    border: "1px solid rgba(255,255,255,0.11)",
                  }}
                >
                  <Icon
                    size={16}
                    strokeWidth={1.65}
                    style={{ color: "var(--color-feature-icon)" }}
                  />
                </div>

                {/* Text */}
                <div className="relative flex flex-col gap-2">
                  <h3
                    className="text-[0.9rem] font-semibold leading-snug tracking-[-0.015em]"
                    style={{ color: "var(--color-text-white)" }}
                  >
                    {feature.title}
                  </h3>
                  <p
                    className="text-[0.8125rem] leading-[1.68]"
                    style={{ color: "var(--color-text-secondary)", opacity: 0.82 }}
                  >
                    {feature.desc}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </motion.div>

        {/* ── Closing strip ── */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.55, delay: 0.38, ease: "easeOut" }}
          className="mt-11 sm:mt-14 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
        >
          <p
            className="text-[0.8125rem] leading-relaxed"
            style={{ color: "var(--color-text-secondary)", opacity: 0.6 }}
          >
            Built for people who value{" "}
            <span
              style={{
                color: "var(--color-text-white)",
                fontWeight: 500,
                opacity: 1,
              }}
            >
              quality over quantity.
            </span>
          </p>

          <span
            className="inline-flex items-center gap-1.5 text-[0.625rem] font-semibold uppercase px-3 py-[0.35rem] rounded-lg whitespace-nowrap flex-shrink-0"
            style={{
              color: "rgba(255,255,255,0.5)",
              background: "rgba(255,255,255,0.04)",
              border: "1px solid rgba(255,255,255,0.08)",
              letterSpacing: "0.13em",
            }}
          >
            <svg
              width="8"
              height="8"
              viewBox="0 0 8 8"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              style={{ flexShrink: 0, opacity: 0.55 }}
            >
              <path
                d="M4 0.5C4 0.5 1.5 2.5 1.5 4.5C1.5 5.88 2.62 7 4 7C5.38 7 6.5 5.88 6.5 4.5C6.5 2.5 4 0.5 4 0.5Z"
                fill="currentColor"
              />
            </svg>
            Human Curated
          </span>
        </motion.div>

      </div>
    </section>
  );
}
