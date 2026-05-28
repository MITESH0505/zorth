"use client";

import { motion } from "framer-motion";
import { Github, Twitter, MessageCircle, Mail, Heart } from "lucide-react";
import { categories } from "@/data/categories";

/* ─── Static data (unchanged) ────────────────────────────────────── */
const quickLinks = [
  { label: "Home",       href: "#home"       },
  { label: "Categories", href: "#categories" },
  { label: "Trending",   href: "#trending"   },
  { label: "About",      href: "#about"      },
  { label: "Contribute", href: "#contribute" },
];

const socialLinks = [
  { icon: Github,        href: "https://github.com", label: "GitHub"  },
  { icon: Twitter,       href: "#",                  label: "Twitter" },
  { icon: MessageCircle, href: "#",                  label: "Discord" },
  { icon: Mail,          href: "#",                  label: "Email"   },
];

/* ─── Stagger variants for the inner grid columns ────────────────── */
const containerVariants = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.55,
    },
  },
};

const colVariants = {
  hidden: { opacity: 0, y: 18 },
  show:   { opacity: 1, y: 0,  transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] } },
};

/* ─── Component ──────────────────────────────────────────────────── */
export default function Footer() {
  return (
    /**
     * liquid-glass shell — floats above the page background with
     * the frosted-glass border defined in globals.css.
     * All content, links, icons and logic are exactly as before.
     */
    <motion.footer
      className="liquid-glass rounded-3xl mx-4 sm:mx-6 lg:mx-8 mb-8 mt-16 
      shadow-[0_8px_32px_rgba(0,0,0,0.35)]"
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 1, delay: 0.4, ease: "easeOut" }}
    >
      {/* Subtle ambient gradient inside the glass */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 rounded-3xl overflow-hidden"
      >
        <div
          className="absolute -top-32 -left-20 w-72 h-72 rounded-full opacity-[0.06]"
          style={{
            background: "radial-gradient(circle, #6366f1 0%, transparent 70%)",
            filter: "blur(48px)",
          }}
        />
        <div
          className="absolute -bottom-20 right-10 w-56 h-56 rounded-full opacity-[0.05]"
          style={{
            background: "radial-gradient(circle, #a855f7 0%, transparent 70%)",
            filter: "blur(40px)",
          }}
        />
      </div>

      {/* ── Main content ────────────────────────────────────────────── */}
      <motion.div
        className="relative z-10 max-w-7xl mx-auto px-6 sm:px-8 lg:px-10 pt-10 sm:pt-12 lg:pt-14 pb-6"
        variants={containerVariants}
        initial="hidden"
        animate="show"
      >
        {/* ── 4-column grid ─────────────────────────────────────────── */}
        <div className="grid gap-8 sm:gap-10 grid-cols-2 lg:grid-cols-4">

          {/* Brand ── full width on mobile, 1 col on lg */}
          <motion.div className="col-span-2 lg:col-span-1" variants={colVariants}>
            <a href="#home" className="inline-flex items-center gap-2 mb-4 group">
              <div
                className="w-7 h-7 rounded-lg bg-gradient-to-br from-indigo-500 to-purple-600
                  flex items-center justify-center shadow-sm
                  transition-transform duration-200 group-hover:scale-105"
              >
                <span className="text-white font-bold text-xs">Z</span>
              </div>
              <span className="text-base font-bold" style={{ color: "var(--color-text-white)" }}>
                Zorth
              </span>
            </a>

            <p
              className="text-sm leading-relaxed mb-5 max-w-xs"
              style={{ color: "var(--color-text-secondary)" }}
            >
              A curated directory of entertainment and internet resources.
              Organized. Searchable. Community-driven.
            </p>

            {/* Social icons */}
            <div className="flex items-center flex-wrap gap-2">
              {socialLinks.map(({ icon: Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="p-2 rounded-xl transition-all duration-200
                    hover:scale-110 hover:bg-white/10"
                  style={{ color: "var(--color-icon-default)" }}
                >
                  <Icon size={18} />
                </a>
              ))}
            </div>
          </motion.div>

          {/* Quick Links */}
          <motion.div variants={colVariants}>
            <h4
              className="text-[11px] font-bold uppercase tracking-widest mb-4"
              style={{ color: "var(--color-text-white)" }}
            >
              Quick Links
            </h4>
            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="text-sm transition-colors duration-150"
                    style={{ color: "var(--color-text-secondary)" }}
                    onMouseEnter={(e) => (e.currentTarget.style.color = "var(--color-accent)")}
                    onMouseLeave={(e) => (e.currentTarget.style.color = "var(--color-text-secondary)")}
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Categories */}
          <motion.div variants={colVariants}>
            <h4
              className="text-[11px] font-bold uppercase tracking-widest mb-4"
              style={{ color: "var(--color-text-white)" }}
            >
              Categories
            </h4>
            <ul className="space-y-3">
              {categories.slice(0, 6).map((cat) => (
                <li key={cat.id}>
                  <a
                    href={`#${cat.slug}`}
                    className="text-sm transition-colors duration-150"
                    style={{ color: "var(--color-text-secondary)" }}
                    onMouseEnter={(e) => (e.currentTarget.style.color = "var(--color-accent)")}
                    onMouseLeave={(e) => (e.currentTarget.style.color = "var(--color-text-secondary)")}
                  >
                    {cat.name}
                  </a>
                </li>
              ))}
              <li>
                <a
                  href="#categories"
                  className="text-sm font-medium transition-opacity duration-150 hover:opacity-75"
                  style={{ color: "var(--color-link-accent)" }}
                >
                  View all →
                </a>
              </li>
            </ul>
          </motion.div>

          {/* Newsletter + Contribute ── full width on mobile */}
          <motion.div className="col-span-2 lg:col-span-1" variants={colVariants}>
            <h4
              className="text-[11px] font-bold uppercase tracking-widest mb-3.5"
              style={{ color: "var(--color-text-white)" }}
            >
              Stay Updated
            </h4>
            <p className="text-sm mb-4 leading-relaxed" style={{ color: "var(--color-text-secondary)" }}>
              Get notified about new resources and updates.
            </p>

            {/* Newsletter input — glass-compatible surface */}
            <div className="flex gap-2.5">
              <input
                type="email"
                placeholder="your@email.com"
                className="flex-1 min-w-0 px-3.5 py-2.5 rounded-xl text-sm focus:outline-none transition-colors"
                style={{
                  backgroundColor: "rgba(255, 255, 255, 0.06)",
                  border: "1px solid rgba(255, 255, 255, 0.1)",
                  color: "var(--color-text-white)",
                }}
                onFocus={(e) => (e.target.style.borderColor = "rgba(99, 102, 241, 0.45)")}
                onBlur={(e)  => (e.target.style.borderColor = "rgba(255, 255, 255, 0.1)")}
              />
              <button
                type="button"
                aria-label="Subscribe"
                className="shrink-0 w-[2.625rem] h-[2.625rem] rounded-xl text-white flex items-center
                  justify-center bg-gradient-to-br from-indigo-500 to-purple-600
                  hover:opacity-90 transition-opacity shadow-sm"
              >
                <Mail size={16} />
              </button>
            </div>

            {/* Divider — glass-appropriate */}
            <div className="my-5 border-t border-white/[0.08]" />

            {/* Contribute */}
            <h4
              className="text-[11px] font-bold uppercase tracking-widest mb-3"
              style={{ color: "var(--color-text-white)" }}
            >
              Contribute
            </h4>
            <a
              href="https://github.com"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm
                transition-all duration-150 w-full sm:w-auto
                hover:border-indigo-500/30 hover:bg-white/[0.06]"
              style={{
                backgroundColor: "rgba(255, 255, 255, 0.05)",
                border: "1px solid rgba(255, 255, 255, 0.1)",
                color: "var(--color-text-secondary)",
              }}
            >
              <Github size={14} style={{ color: "var(--color-icon-default)" }} />
              Suggest a Resource
            </a>
          </motion.div>
        </div>

        {/* ── Bottom bar ────────────────────────────────────────────── */}
        <motion.div
          className="mt-8 sm:mt-10 pt-5 border-t border-white/[0.08]
            flex flex-col sm:flex-row items-center justify-between gap-4
            text-center sm:text-left"
          variants={colVariants}
        >
          <p className="text-xs leading-relaxed" style={{ color: "var(--color-muted)" }}>
            © {new Date().getFullYear()} Zorth. All rights reserved.
            <span className="hidden sm:inline">
              {" "}— Does not host any copyrighted content.
            </span>
          </p>
          <p className="text-xs flex items-center gap-1.5" style={{ color: "var(--color-muted)" }}>
            Made with <Heart size={10} className="text-red-400" fill="currentColor" /> by the community
          </p>
        </motion.div>
      </motion.div>
    </motion.footer>
  );
}
