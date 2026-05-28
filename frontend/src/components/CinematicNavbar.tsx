"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Search,
  Menu,
  X,
  ChevronDown,
  Tv,
  Film,
  Gamepad2,
  BookOpen,
  Bot,
  Code2,
  Music2,
  GraduationCap,
  Play,
  LogIn,
  LayoutGrid,
} from "lucide-react";

// ─── Category Data ────────────────────────────────────────────────────────────
// Add subcategories[] later without touching any rendering logic.
// The mega-menu grid + mobile list both derive from this array automatically.

type SubCategory = {
  label: string;
  slug: string;
};

type Category = {
  label: string;
  slug: string;
  icon: React.ElementType;
  description: string;
  color: string;
  subcategories?: SubCategory[];
};

const CATEGORIES: Category[] = [
  {
    label: "Streaming",
    slug: "streaming",
    icon: Tv,
    description: "Platforms, live TV & on-demand",
    color: "#e879f9",
  },
  {
    label: "Anime",
    slug: "anime",
    icon: Play,
    description: "Series, films & simulcasts",
    color: "#818cf8",
  },
  {
    label: "Movies / TV",
    slug: "movies",
    icon: Film,
    description: "Films, series & documentaries",
    color: "#fb923c",
  },
  {
    label: "Gaming",
    slug: "gaming",
    icon: Gamepad2,
    description: "Games, reviews & communities",
    color: "#4ade80",
  },
  {
    label: "Reading",
    slug: "reading",
    icon: BookOpen,
    description: "Books, manga & light novels",
    color: "#facc15",
  },
  {
    label: "AI Tools",
    slug: "ai-tools",
    icon: Bot,
    description: "Models, apps & AI resources",
    color: "#38bdf8",
  },
  {
    label: "Software",
    slug: "software",
    icon: Code2,
    description: "Apps, utilities & open-source",
    color: "#a3e635",
  },
  {
    label: "Music",
    slug: "music",
    icon: Music2,
    description: "Artists, albums & playlists",
    color: "#f472b6",
  },
  {
    label: "Educational",
    slug: "educational",
    icon: GraduationCap,
    description: "Courses, tutorials & learning",
    color: "#34d399",
  },
];

// ─── Animation variants ───────────────────────────────────────────────────────

const megaVariants = {
  hidden: { opacity: 0, y: -6, scale: 0.985 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.22, ease: [0.23, 1, 0.32, 1] },
  },
  exit: {
    opacity: 0,
    y: -6,
    scale: 0.985,
    transition: { duration: 0.16, ease: "easeIn" },
  },
};

const categoryItemVariants = {
  hidden: { opacity: 0, y: 4 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.025, duration: 0.2, ease: "easeOut" },
  }),
};

// ─── Props ────────────────────────────────────────────────────────────────────

interface CinematicNavbarProps {
  onSearchOpen: () => void;
}

// ─── Component ────────────────────────────────────────────────────────────────

export default function CinematicNavbar({ onSearchOpen }: CinematicNavbarProps) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [menuMounted, setMenuMounted] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [megaOpen, setMegaOpen] = useState(false);
  const [isMac, setIsMac] = useState(false);
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  /* ── Mobile menu stagger mount ── */
  useEffect(() => {
    if (mobileOpen) {
      const id = requestAnimationFrame(() => setMenuMounted(true));
      return () => cancelAnimationFrame(id);
    } else {
      setMenuMounted(false);
    }
  }, [mobileOpen]);

  /* ── Lock body scroll when mobile menu open ── */
  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  /* ── Platform detection for keyboard shortcut badge ── */
  useEffect(() => {
    setIsMac(navigator.platform.includes("Mac"));
  }, []);

  /* ── Scroll detection for navbar blur ── */
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  /* ── Mega menu hover with debounced close ── */
  const openMega = useCallback(() => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    setMegaOpen(true);
  }, []);

  const closeMega = useCallback(() => {
    closeTimer.current = setTimeout(() => setMegaOpen(false), 130);
  }, []);

  /* ── Category navigation ── */
  const handleCategoryNav = useCallback((slug: string) => {
    setMegaOpen(false);
    setMobileOpen(false);
    const el = document.getElementById(slug);
    if (el) el.scrollIntoView({ behavior: "smooth" });
    window.history.pushState(null, "", `#${slug}`);
  }, []);

  /* ── Scroll to home ── */
  const scrollHome = useCallback((e: React.MouseEvent) => {
    e.preventDefault();
    document.getElementById("home")?.scrollIntoView({ behavior: "smooth" });
  }, []);

  return (
    <>
      {/* ═══════════════════════════════════════════════════════
          Fixed Navbar
      ═══════════════════════════════════════════════════════ */}
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled
            ? "backdrop-blur-md bg-black/65 border-b border-white/[0.07] shadow-[0_1px_24px_rgba(0,0,0,0.35)]"
            : "border-b border-white/[0.04]"
        }`}
        style={{ fontFamily: "'Inter', sans-serif" }}
      >
        <div className="flex items-center justify-between px-4 sm:px-6 md:px-12 py-3 md:py-4">

          {/* ── Logo ── */}
          <a
            href="#home"
            onClick={scrollHome}
            className="text-white font-bold tracking-[0.2em] text-sm sm:text-base h-8 md:h-10 flex items-center animate-blur-fade-up shrink-0 select-none"
            style={{ animationDelay: "0ms" }}
          >
            ZORTH
          </a>

          {/* ── Desktop: Categories trigger (lg+) ── */}
          <div
            className="hidden lg:flex items-center relative"
            onMouseEnter={openMega}
            onMouseLeave={closeMega}
          >
            {/* Trigger button */}
            <button
              className={`flex items-center gap-1.5 px-3.5 py-2 rounded-lg text-sm font-medium
                         transition-all duration-200 animate-blur-fade-up cursor-pointer select-none
                         ${
                           megaOpen
                             ? "text-white bg-white/[0.08] shadow-[inset_0_1px_1px_rgba(255,255,255,0.06)]"
                             : "text-white/55 hover:text-white hover:bg-white/[0.05]"
                         }`}
              style={{ animationDelay: "100ms", letterSpacing: "0.02em" }}
              aria-expanded={megaOpen}
              aria-haspopup="true"
            >
              <LayoutGrid size={14} className="opacity-70 flex-shrink-0" />
              <span>Categories</span>
              <motion.span
                animate={{ rotate: megaOpen ? 180 : 0 }}
                transition={{ duration: 0.22, ease: "easeInOut" }}
                className="flex items-center"
              >
                <ChevronDown size={13} className="opacity-50" />
              </motion.span>
            </button>

            {/* ── Mega Dropdown ── */}
            <AnimatePresence>
              {megaOpen && (
                <motion.div
                  variants={megaVariants}
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                  className="absolute top-full left-1/2 -translate-x-1/2 z-50"
                  style={{ minWidth: "660px", paddingTop: "10px" }}
                  onMouseEnter={openMega}
                  onMouseLeave={closeMega}
                >
                  {/* Panel */}
                  <div
                    className="rounded-2xl border border-white/[0.08] overflow-hidden"
                    style={{
                      background: "rgba(7, 7, 12, 0.94)",
                      backdropFilter: "blur(48px) saturate(180%)",
                      WebkitBackdropFilter: "blur(48px) saturate(180%)",
                      boxShadow:
                        "0 28px 80px rgba(0,0,0,0.65), 0 0 0 1px rgba(255,255,255,0.035), 0 8px 32px rgba(99,102,241,0.07)",
                    }}
                  >
                    {/* Panel header */}
                    <div className="px-5 pt-4 pb-3 border-b border-white/[0.045]">
                      <p
                        className="text-[10px] font-semibold uppercase text-white/20"
                        style={{ letterSpacing: "0.14em" }}
                      >
                        Browse All Categories
                      </p>
                    </div>

                    {/* Category grid — 3 cols; add more cols via class when >12 cats */}
                    <div className="p-3 grid grid-cols-3 gap-0.5">
                      {CATEGORIES.map((cat, i) => {
                        const Icon = cat.icon;
                        return (
                          <motion.button
                            key={cat.slug}
                            custom={i}
                            variants={categoryItemVariants}
                            initial="hidden"
                            animate="visible"
                            onClick={() => handleCategoryNav(cat.slug)}
                            className="group flex items-start gap-3 p-3 rounded-xl text-left
                                       transition-colors duration-150
                                       hover:bg-white/[0.055] cursor-pointer"
                          >
                            {/* Icon chip */}
                            <div
                              className="flex-shrink-0 w-8 h-8 rounded-[9px] flex items-center justify-center mt-0.5
                                         transition-transform duration-200 group-hover:scale-[1.08]"
                              style={{
                                background: `${cat.color}16`,
                                border: `1px solid ${cat.color}26`,
                              }}
                            >
                              <Icon size={14} style={{ color: cat.color }} />
                            </div>

                            {/* Text */}
                            <div className="min-w-0">
                              <p className="text-[13px] font-medium text-white/70 group-hover:text-white
                                            transition-colors duration-150 leading-tight">
                                {cat.label}
                              </p>
                              <p className="text-[11px] text-white/25 mt-[3px] leading-snug">
                                {cat.description}
                              </p>
                            </div>
                          </motion.button>
                        );
                      })}
                    </div>

                    {/* Panel footer */}
                    <div className="px-5 py-2.5 border-t border-white/[0.045] flex items-center justify-between">
                      <p className="text-[10px] text-white/18" style={{ letterSpacing: "0.04em" }}>
                        {CATEGORIES.length} categories — more coming soon
                      </p>
                      <p className="text-[10px] text-white/18" style={{ letterSpacing: "0.04em" }}>
                        hover to explore ↗
                      </p>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* ── Right actions ── */}
          <div className="flex items-center gap-2">

            {/* Search pill — compact floating glass with keyboard shortcut */}
            <button
              onClick={onSearchOpen}
              className="hidden sm:flex items-center gap-2 rounded-full
                         bg-white/[0.04] backdrop-blur-sm
                         text-white/60 hover:text-white
                         border border-white/[0.06] hover:border-white/15
                         px-3.5 py-1.5 text-sm
                         animate-blur-fade-up cursor-pointer transition-all duration-300"
              style={{ animationDelay: "300ms" }}
              aria-label="Search"
            >
              <Search size={14} className="opacity-60" />
              <span className="hidden md:inline text-sm font-medium" style={{ letterSpacing: "0.02em" }}>
                Search
              </span>
              <kbd className="hidden lg:inline-flex items-center gap-0.5 px-1.5 py-0.5 rounded text-[10px] font-medium
                              bg-white/[0.06] text-white/30 border border-white/[0.04]">
                {isMac ? "⌘K" : "Ctrl+K"}
              </kbd>
            </button>

            {/* Login pill */}
            <button
              className="hidden sm:flex items-center gap-1.5 liquid-glass rounded-full
                         text-white/60 hover:text-white
                         px-4 py-1.5 text-sm
                         animate-blur-fade-up cursor-pointer transition-all duration-300"
              style={{ animationDelay: "370ms" }}
              aria-label="Login"
            >
              <LogIn size={15} />
              <span
                className="hidden md:inline text-sm font-medium"
                style={{ letterSpacing: "0.02em" }}
              >
                Login
              </span>
            </button>

            {/* Hamburger — below lg */}
            <button
              onClick={() => setMobileOpen((v) => !v)}
              className="lg:hidden flex items-center justify-center liquid-glass rounded-full w-9 h-9
                         text-white/80 hover:text-white
                         animate-blur-fade-up cursor-pointer transition-all duration-300"
              style={{ animationDelay: "350ms" }}
              aria-label={mobileOpen ? "Close menu" : "Open menu"}
            >
              <span
                className="absolute transition-all duration-500 ease-out"
                style={{
                  opacity: mobileOpen ? 0 : 1,
                  transform: mobileOpen
                    ? "rotate(180deg) scale(0.5)"
                    : "rotate(0deg) scale(1)",
                }}
              >
                <Menu size={18} />
              </span>
              <span
                className="absolute transition-all duration-500 ease-out"
                style={{
                  opacity: mobileOpen ? 1 : 0,
                  transform: mobileOpen
                    ? "rotate(0deg) scale(1)"
                    : "rotate(-180deg) scale(0.5)",
                }}
              >
                <X size={18} />
              </span>
            </button>
          </div>
        </div>

        {/* ═══════════════════════════════════════════════════════
            Mobile Dropdown
        ═══════════════════════════════════════════════════════ */}
        <div
          className="absolute left-0 right-0 lg:hidden"
          style={{ top: "100%", zIndex: 40 }}
        >
          <div
            className="border-t border-b border-white/[0.06] transition-all duration-500 ease-out overflow-y-auto"
            style={{
              background: "rgba(7, 7, 12, 0.97)",
              backdropFilter: "blur(24px) saturate(160%)",
              WebkitBackdropFilter: "blur(24px) saturate(160%)",
              transform: menuMounted ? "translateY(0)" : "translateY(-12px)",
              opacity: menuMounted ? 1 : 0,
              pointerEvents: mobileOpen ? "auto" : "none",
              maxHeight: mobileOpen ? "80vh" : "0px",
            }}
          >
            <div className="px-3 py-3 flex flex-col gap-0.5">

              {/* Section label */}
              <p
                className="text-[10px] font-semibold uppercase text-white/20 px-3 pb-2 pt-1"
                style={{ letterSpacing: "0.14em" }}
              >
                Categories
              </p>

              {/* Category rows */}
              {CATEGORIES.map((cat, i) => {
                const Icon = cat.icon;
                return (
                  <button
                    key={cat.slug}
                    onClick={() => handleCategoryNav(cat.slug)}
                    className="flex items-center gap-3 py-2.5 px-3 rounded-xl
                               text-white/55 hover:text-white hover:bg-white/[0.05]
                               text-sm transition-all duration-200 cursor-pointer text-left w-full"
                    style={{
                      transform: menuMounted
                        ? "translateX(0)"
                        : `translateX(-${10 + i * 3}px)`,
                      opacity: menuMounted ? 1 : 0,
                      transition: `transform 0.38s ease-out ${i * 35}ms,
                                   opacity   0.38s ease-out ${i * 35}ms,
                                   background-color 0.2s`,
                    }}
                  >
                    <div
                      className="w-7 h-7 rounded-lg flex items-center justify-center flex-shrink-0"
                      style={{
                        background: `${cat.color}16`,
                        border: `1px solid ${cat.color}26`,
                      }}
                    >
                      <Icon size={13} style={{ color: cat.color }} />
                    </div>
                    <div className="flex items-baseline gap-2 min-w-0">
                      <span className="font-medium text-[13px]">{cat.label}</span>
                      <span className="text-white/22 text-[11px] truncate hidden sm:block">
                        {cat.description}
                      </span>
                    </div>
                  </button>
                );
              })}

              {/* Search + Login — xs screens only (sm hides them in nav) */}
              <div
                className="sm:hidden flex items-center gap-2.5 pt-3 mt-2 border-t border-white/[0.06]"
                style={{
                  opacity: menuMounted ? 1 : 0,
                  transition: `opacity 0.38s ease-out ${CATEGORIES.length * 35 + 60}ms`,
                }}
              >
                <button
                  onClick={() => {
                    onSearchOpen();
                    setMobileOpen(false);
                  }}
                  className="flex-1 flex items-center justify-center gap-2
                             liquid-glass rounded-full py-2.5
                             text-white/75 text-sm font-medium cursor-pointer"
                >
                  <Search size={15} />
                  Search
                </button>
                <button
                  className="flex items-center gap-1.5
                             liquid-glass rounded-full px-4 py-2.5
                             text-white/65 text-sm font-medium cursor-pointer"
                >
                  <LogIn size={15} />
                  Login
                </button>
              </div>
            </div>
          </div>
        </div>
      </nav>
    </>
  );
}
