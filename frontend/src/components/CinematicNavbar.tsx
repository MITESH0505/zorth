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
        backgroundColor: scrolled ? "rgba(8, 7, 9, 0.72)" : "rgba(8, 7, 9, 0)",
        backdropFilter: scrolled ? "blur(20px) saturate(140%)" : "blur(0px)",
        WebkitBackdropFilter: scrolled ? "blur(20px) saturate(140%)" : "blur(0px)",
        borderBottom: scrolled
          ? "1px solid rgba(255, 255, 255, 0.04)"
          : "1px solid rgba(255, 255, 255, 0)",
        boxShadow: scrolled
          ? "0 1px 0 rgba(255,255,255,0.02), 0 12px 32px -16px rgba(0,0,0,0.6)"
          : "none",
        transition:
          "background-color 600ms ease, backdrop-filter 600ms ease, border-color 600ms ease, box-shadow 600ms ease",
      }}
    >
      <div
        className="mx-auto flex items-center justify-between"
        style={{
          maxWidth: "1320px",
          paddingLeft: "clamp(20px, 4vw, 40px)",
          paddingRight: "clamp(20px, 4vw, 40px)",
          paddingTop: scrolled ? "14px" : "22px",
          paddingBottom: scrolled ? "14px" : "22px",
          transition: "padding 600ms ease",
        }}
      >
        {/* ─────────── LEFT — Monogram + Wordmark ─────────── */}
        <a
          href="#home"
          onClick={scrollHome}
          aria-label="Zorth — home"
          className="group flex items-center gap-2.5 shrink-0 select-none"
        >
          <span
            aria-hidden
            className="flex items-center justify-center"
            style={{
              width: 22,
              height: 22,
              borderRadius: 6,
              border: "1px solid rgba(255,255,255,0.12)",
              background:
                "linear-gradient(135deg, rgba(255,255,255,0.04) 0%, rgba(255,255,255,0.01) 100%)",
              color: "rgba(255, 220, 210, 0.78)",
              fontSize: 10.5,
              fontWeight: 600,
              letterSpacing: "0.04em",
              transition: "color 300ms ease, border-color 300ms ease",
            }}
          >
            Z
          </span>
          <span
            className="text-white/85 group-hover:text-white"
            style={{
              fontSize: 13,
              fontWeight: 500,
              letterSpacing: "0.28em",
              transition: "color 300ms ease",
            }}
          >
            ZORTH
          </span>
        </a>

        {/* ─────────── CENTER — Nav Links ─────────── */}
        <div className="hidden lg:flex items-center" style={{ gap: 4 }}>
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
              height: 34,
              paddingLeft: 12,
              paddingRight: 6,
              borderRadius: 8,
              border: "1px solid rgba(255,255,255,0.06)",
              backgroundColor: "rgba(255,255,255,0.018)",
              transition:
                "border-color 220ms ease, background-color 220ms ease",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.borderColor = "rgba(255,255,255,0.11)";
              e.currentTarget.style.backgroundColor = "rgba(255,255,255,0.035)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.borderColor = "rgba(255,255,255,0.06)";
              e.currentTarget.style.backgroundColor = "rgba(255,255,255,0.018)";
            }}
          >
            <Search size={13} className="text-white/35 group-hover:text-white/65 transition-colors duration-200" />
            <span
              className="text-white/40 group-hover:text-white/70 transition-colors duration-200"
              style={{
                fontSize: 12.5,
                fontWeight: 400,
                letterSpacing: "0.01em",
                minWidth: 56,
                textAlign: "left",
              }}
            >
              Search
            </span>
            <kbd
              className="hidden lg:inline-flex items-center justify-center"
              style={{
                height: 22,
                minWidth: 30,
                padding: "0 6px",
                borderRadius: 5,
                border: "1px solid rgba(255,255,255,0.05)",
                backgroundColor: "rgba(255,255,255,0.025)",
                color: "rgba(255,255,255,0.32)",
                fontSize: 10.5,
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
              width: 34,
              height: 34,
              borderRadius: 8,
              border: "1px solid rgba(255,255,255,0.06)",
              backgroundColor: "rgba(255,255,255,0.018)",
              color: "rgba(255,255,255,0.55)",
              transition: "all 200ms ease",
            }}
          >
            <Search size={14} />
          </button>

          {/* Divider */}
          <span
            aria-hidden
            className="hidden md:block"
            style={{
              width: 1,
              height: 18,
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
              height: 34,
              paddingLeft: 16,
              paddingRight: 16,
              borderRadius: 8,
              border: "1px solid rgba(255,255,255,0.10)",
              backgroundColor: "transparent",
              color: "rgba(255,255,255,0.78)",
              fontSize: 12.5,
              fontWeight: 500,
              letterSpacing: "0.015em",
              transition: "all 220ms ease",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.borderColor = "rgba(255,255,255,0.22)";
              e.currentTarget.style.color = "rgba(255,255,255,1)";
              e.currentTarget.style.backgroundColor = "rgba(255,255,255,0.025)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.borderColor = "rgba(255,255,255,0.10)";
              e.currentTarget.style.color = "rgba(255,255,255,0.78)";
              e.currentTarget.style.backgroundColor = "transparent";
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
              width: 34,
              height: 34,
              borderRadius: 8,
              border: "1px solid rgba(255,255,255,0.07)",
              backgroundColor: "rgba(255,255,255,0.018)",
              color: "rgba(255,255,255,0.7)",
              transition: "all 200ms ease",
            }}
          >
            <span
              className="absolute"
              style={{
                opacity: mobileOpen ? 0 : 1,
                transform: mobileOpen ? "scale(0.7)" : "scale(1)",
                transition: "opacity 220ms ease, transform 220ms ease",
              }}
            >
              <Menu size={15} strokeWidth={1.6} />
            </span>
            <span
              className="absolute"
              style={{
                opacity: mobileOpen ? 1 : 0,
                transform: mobileOpen ? "scale(1)" : "scale(0.7)",
                transition: "opacity 220ms ease, transform 220ms ease",
              }}
            >
              <X size={15} strokeWidth={1.6} />
            </span>
          </button>
        </div>
      </div>

      {/* Hairline beneath the row when scrolled — supports hero, no banner feel */}
      <div
        aria-hidden
        style={{
          position: "absolute",
          left: 0,
          right: 0,
          bottom: -1,
          height: 1,
          background:
            "linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.05) 20%, rgba(255,255,255,0.05) 80%, transparent 100%)",
          opacity: scrolled ? 1 : 0,
          transition: "opacity 600ms ease",
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
            "max-height 520ms cubic-bezier(0.16,1,0.3,1), opacity 320ms ease",
        }}
      >
        <div
          style={{
            backgroundColor: "rgba(8, 7, 9, 0.92)",
            backdropFilter: "blur(28px) saturate(150%)",
            WebkitBackdropFilter: "blur(28px) saturate(150%)",
            borderTop: "1px solid rgba(255,255,255,0.04)",
          }}
        >
          <div style={{ padding: "18px clamp(20px, 4vw, 40px) 8px" }}>
            <p
              style={{
                fontSize: 10,
                fontWeight: 500,
                textTransform: "uppercase",
                color: "rgba(255,255,255,0.22)",
                letterSpacing: "0.16em",
                paddingBottom: 14,
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
                    padding: "12px 4px",
                    color: "rgba(255,255,255,0.62)",
                    fontSize: 14,
                    fontWeight: 400,
                    letterSpacing: "0.01em",
                    borderBottom: "1px solid rgba(255,255,255,0.035)",
                    transition: "color 180ms ease",
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.color = "rgba(255,255,255,0.95)")}
                  onMouseLeave={(e) => (e.currentTarget.style.color = "rgba(255,255,255,0.62)")}
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
                border: "1px solid rgba(255,255,255,0.07)",
                backgroundColor: "rgba(255,255,255,0.02)",
                color: "rgba(255,255,255,0.7)",
                fontSize: 13,
                fontWeight: 500,
                letterSpacing: "0.015em",
              }}
            >
              <Search size={13} />
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
                color: "rgba(255,255,255,0.85)",
                fontSize: 13,
                fontWeight: 500,
                letterSpacing: "0.015em",
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
  const [hovered, setHovered] = useState(false);

  return (
    <button
      onClick={onPress}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        position: "relative",
        padding: "8px 14px",
        fontSize: 12.5,
        fontWeight: 400,
        letterSpacing: "0.012em",
        color: hovered ? "rgba(255,255,255,0.92)" : "rgba(255,255,255,0.42)",
        background: "transparent",
        border: "none",
        cursor: "pointer",
        transition: "color 260ms ease",
      }}
    >
      <span
        aria-hidden
        style={{
          position: "absolute",
          inset: 0,
          borderRadius: 7,
          backgroundColor: "rgba(255,255,255,0.025)",
          opacity: hovered ? 1 : 0,
          transition: "opacity 220ms ease",
          pointerEvents: "none",
        }}
      />
      <span style={{ position: "relative" }}>{label}</span>
    </button>
  );
}