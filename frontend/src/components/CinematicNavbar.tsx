"use client";

import { useState, useEffect, useCallback } from "react";
import { Search, Menu, X } from "lucide-react";

type NavLink = { label: string; slug: string };

const NAV_LINKS: NavLink[] = [
  { label: "Anime",       slug: "anime"    },
  { label: "Movies / TV", slug: "movies"   },
  { label: "Gaming",      slug: "gaming"   },
  { label: "Reading",     slug: "reading"  },
  { label: "AI",          slug: "ai-tools" },
  { label: "Software",    slug: "software" },
];

interface CinematicNavbarProps {
  onSearchOpen: () => void;
}

export default function CinematicNavbar({ onSearchOpen }: CinematicNavbarProps) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled]     = useState(false);
  const [isMac, setIsMac]           = useState(false);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [mobileOpen]);

  useEffect(() => {
    setIsMac(navigator.platform.includes("Mac"));
  }, []);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const handleNav = useCallback((slug: string) => {
    setMobileOpen(false);
    const el = document.getElementById(slug);
    if (el) el.scrollIntoView({ behavior: "smooth" });
    window.history.pushState(null, "", `#${slug}`);
  }, []);

  const scrollHome = useCallback((e: React.MouseEvent) => {
    e.preventDefault();
    document.getElementById("home")?.scrollIntoView({ behavior: "smooth" });
  }, []);

  return (
    <nav
      className="fixed top-0 left-0 right-0 z-50"
      style={{
        fontFamily: "'Inter', sans-serif",
        backgroundColor: scrolled ? "rgba(8, 7, 9, 0.66)" : "rgba(8, 7, 9, 0)",
        backdropFilter: scrolled ? "blur(16px) saturate(135%)" : "blur(0px)",
        WebkitBackdropFilter: scrolled ? "blur(16px) saturate(135%)" : "blur(0px)",
        borderBottom: scrolled
          ? "1px solid rgba(255, 255, 255, 0.04)"
          : "1px solid rgba(255, 255, 255, 0)",
        boxShadow: scrolled
          ? "0 8px 28px -18px rgba(0,0,0,0.55)"
          : "none",
        transition:
          "background-color 420ms ease, backdrop-filter 420ms ease, border-color 420ms ease, box-shadow 420ms ease",
      }}
    >
      <div
        className="mx-auto flex items-center justify-between"
        style={{
          maxWidth: "1320px",
          paddingLeft: "clamp(20px, 4vw, 40px)",
          paddingRight: "clamp(20px, 4vw, 40px)",
          paddingTop: scrolled ? 14 : 20,
          paddingBottom: scrolled ? 14 : 20,
          transition: "padding 420ms ease",
        }}
      >
        {/* ─────────── LEFT — Monogram + Wordmark ─────────── */}
        <a
          href="#home"
          onClick={scrollHome}
          aria-label="Zorth — home"
          className="group flex items-center shrink-0 select-none"
          style={{ gap: 10 }}
        >
          <span
            aria-hidden
            className="flex items-center justify-center"
            style={{
              width: 22,
              height: 22,
              borderRadius: 6,
              border: "1px solid rgba(255,255,255,0.10)",
              backgroundColor: "rgba(255,255,255,0.02)",
              color: "rgba(255, 220, 210, 0.82)",
              fontSize: 10.5,
              fontWeight: 600,
              letterSpacing: "0.02em",
              transition: "color 280ms ease, border-color 280ms ease, background-color 280ms ease",
            }}
          >
            Z
          </span>
          <span
            className="text-white/85 group-hover:text-white"
            style={{
              fontSize: 12.5,
              fontWeight: 500,
              letterSpacing: "0.22em",
              transition: "color 280ms ease",
            }}
          >
            ZORTH
          </span>
        </a>

        {/* ─────────── CENTER — Nav Links ─────────── */}
        <div
          className="hidden lg:flex items-center"
          style={{ gap: 2 }}
        >
          {NAV_LINKS.map((link) => (
            <NavItem
              key={link.slug}
              label={link.label}
              onPress={() => handleNav(link.slug)}
            />
          ))}
        </div>

        {/* ─────────── RIGHT — Search + Sign In ─────────── */}
        <div className="flex items-center" style={{ gap: 8 }}>
          {/* Inline search — desktop */}
          <button
            onClick={onSearchOpen}
            aria-label="Search Zorth"
            className="hidden md:flex items-center group"
            style={{
              gap: 10,
              height: 32,
              paddingLeft: 11,
              paddingRight: 5,
              borderRadius: 8,
              border: "1px solid rgba(255,255,255,0.045)",
              backgroundColor: "rgba(255,255,255,0.012)",
              transition:
                "border-color 220ms ease, background-color 220ms ease",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.borderColor = "rgba(255,255,255,0.10)";
              e.currentTarget.style.backgroundColor = "rgba(255,255,255,0.03)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.borderColor = "rgba(255,255,255,0.045)";
              e.currentTarget.style.backgroundColor = "rgba(255,255,255,0.012)";
            }}
          >
            <Search
              size={12.5}
              className="text-white/30 group-hover:text-white/65 transition-colors duration-200"
              strokeWidth={1.75}
            />
            <span
              className="text-white/35 group-hover:text-white/70 transition-colors duration-200"
              style={{
                fontSize: 12,
                fontWeight: 400,
                letterSpacing: "0.005em",
                minWidth: 52,
                textAlign: "left",
              }}
            >
              Search
            </span>
            <kbd
              className="hidden lg:inline-flex items-center justify-center"
              style={{
                height: 20,
                minWidth: 28,
                padding: "0 5px",
                borderRadius: 4,
                backgroundColor: "rgba(255,255,255,0.03)",
                color: "rgba(255,255,255,0.32)",
                fontSize: 10,
                fontWeight: 500,
                letterSpacing: "0.04em",
                fontFamily:
                  "ui-monospace, SFMono-Regular, 'SF Mono', Menlo, monospace",
              }}
            >
              {isMac ? "⌘K" : "Ctrl K"}
            </kbd>
          </button>

          {/* Compact search — small screens */}
          <button
            onClick={onSearchOpen}
            aria-label="Search"
            className="md:hidden flex items-center justify-center"
            style={{
              width: 32,
              height: 32,
              borderRadius: 8,
              border: "1px solid rgba(255,255,255,0.045)",
              backgroundColor: "rgba(255,255,255,0.012)",
              color: "rgba(255,255,255,0.55)",
              transition: "all 200ms ease",
            }}
          >
            <Search size={13.5} strokeWidth={1.75} />
          </button>

          {/* Divider */}
          <span
            aria-hidden
            className="hidden md:block"
            style={{
              width: 1,
              height: 14,
              backgroundColor: "rgba(255,255,255,0.06)",
              marginLeft: 4,
              marginRight: 4,
            }}
          />

          {/* Sign In — ghost */}
          <button
            aria-label="Sign in"
            className="hidden sm:flex items-center justify-center"
            style={{
              height: 32,
              paddingLeft: 14,
              paddingRight: 14,
              borderRadius: 8,
              border: "1px solid rgba(255,255,255,0.10)",
              backgroundColor: "transparent",
              color: "rgba(255,255,255,0.80)",
              fontSize: 12,
              fontWeight: 500,
              letterSpacing: "0.01em",
              transition: "all 220ms ease",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.borderColor = "rgba(255,255,255,0.22)";
              e.currentTarget.style.color = "rgba(255,255,255,1)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.borderColor = "rgba(255,255,255,0.10)";
              e.currentTarget.style.color = "rgba(255,255,255,0.80)";
            }}
          >
            Sign in
          </button>

          {/* Hamburger — below lg */}
          <button
            onClick={() => setMobileOpen((v) => !v)}
            aria-label={mobileOpen ? "Close menu" : "Open menu"}
            className="lg:hidden relative flex items-center justify-center"
            style={{
              width: 32,
              height: 32,
              borderRadius: 8,
              border: "1px solid rgba(255,255,255,0.06)",
              backgroundColor: "rgba(255,255,255,0.012)",
              color: "rgba(255,255,255,0.70)",
              transition: "all 200ms ease",
            }}
          >
            <span
              className="absolute"
              style={{
                opacity: mobileOpen ? 0 : 1,
                transition: "opacity 180ms ease",
              }}
            >
              <Menu size={14} strokeWidth={1.6} />
            </span>
            <span
              className="absolute"
              style={{
                opacity: mobileOpen ? 1 : 0,
                transition: "opacity 180ms ease",
              }}
            >
              <X size={14} strokeWidth={1.6} />
            </span>
          </button>
        </div>
      </div>

      {/* Hairline beneath the row when scrolled */}
      <div
        aria-hidden
        style={{
          position: "absolute",
          left: 0,
          right: 0,
          bottom: -1,
          height: 1,
          background:
            "linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.05) 22%, rgba(255,255,255,0.05) 78%, transparent 100%)",
          opacity: scrolled ? 1 : 0,
          transition: "opacity 420ms ease",
        }}
      />

      {/* ─────────── Mobile Menu ─────────── */}
      <div
        className="lg:hidden absolute left-0 right-0 overflow-hidden"
        style={{
          top: "100%",
          maxHeight: mobileOpen ? 520 : 0,
          opacity: mobileOpen ? 1 : 0,
          pointerEvents: mobileOpen ? "auto" : "none",
          transition:
            "max-height 480ms cubic-bezier(0.16,1,0.3,1), opacity 280ms ease",
        }}
      >
        <div
          style={{
            backgroundColor: "rgba(8, 7, 9, 0.88)",
            backdropFilter: "blur(22px) saturate(140%)",
            WebkitBackdropFilter: "blur(22px) saturate(140%)",
            borderTop: "1px solid rgba(255,255,255,0.04)",
          }}
        >
          <div style={{ padding: "18px clamp(20px, 4vw, 40px) 6px" }}>
            <p
              style={{
                fontSize: 9.5,
                fontWeight: 500,
                textTransform: "uppercase",
                color: "rgba(255,255,255,0.22)",
                letterSpacing: "0.18em",
                paddingBottom: 12,
              }}
            >
              Browse
            </p>
            <div className="flex flex-col">
              {NAV_LINKS.map((link) => (
                <button
                  key={link.slug}
                  onClick={() => handleNav(link.slug)}
                  className="text-left"
                  style={{
                    padding: "13px 2px",
                    color: "rgba(255,255,255,0.66)",
                    fontSize: 14,
                    fontWeight: 400,
                    letterSpacing: "0.005em",
                    borderBottom: "1px solid rgba(255,255,255,0.035)",
                    transition: "color 180ms ease",
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.color = "rgba(255,255,255,0.95)")}
                  onMouseLeave={(e) => (e.currentTarget.style.color = "rgba(255,255,255,0.66)")}
                >
                  {link.label}
                </button>
              ))}
            </div>
          </div>

          <div
            className="flex items-center"
            style={{
              gap: 8,
              padding: "16px clamp(20px, 4vw, 40px) 22px",
            }}
          >
            <button
              onClick={() => { onSearchOpen(); setMobileOpen(false); }}
              className="flex-1 flex items-center justify-center"
              style={{
                gap: 8,
                height: 38,
                borderRadius: 8,
                border: "1px solid rgba(255,255,255,0.06)",
                backgroundColor: "rgba(255,255,255,0.015)",
                color: "rgba(255,255,255,0.72)",
                fontSize: 12.5,
                fontWeight: 500,
                letterSpacing: "0.01em",
              }}
            >
              <Search size={13} strokeWidth={1.75} />
              Search
            </button>
            <button
              style={{
                height: 38,
                paddingLeft: 18,
                paddingRight: 18,
                borderRadius: 8,
                border: "1px solid rgba(255,255,255,0.12)",
                backgroundColor: "transparent",
                color: "rgba(255,255,255,0.88)",
                fontSize: 12.5,
                fontWeight: 500,
                letterSpacing: "0.01em",
              }}
            >
              Sign in
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}

interface NavItemProps {
  label: string;
  onPress: () => void;
}

function NavItem({ label, onPress }: NavItemProps) {
  return (
    <button
      onClick={onPress}
      className="relative text-white/45 hover:text-white/95"
      style={{
        padding: "8px 12px",
        fontSize: 12.5,
        fontWeight: 400,
        letterSpacing: "0.005em",
        background: "transparent",
        border: "none",
        cursor: "pointer",
        transition: "color 240ms ease",
      }}
    >
      {label}
    </button>
  );
}
