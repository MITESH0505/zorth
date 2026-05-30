"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import CinematicNavbar from "@/components/CinematicNavbar";
import CinematicHero from "@/components/CinematicHero";
import SearchModal from "@/components/SearchModal";
// import Sidebar from "@/components/Sidebar";
import CategoryGrid from "@/components/CategoryGrid";
import TrendingSection from "@/components/TrendingSection";
import AboutSection from "@/components/AboutSection";
// import CommunitySection from "@/components/CommunitySection";
import Footer from "@/components/Footer";

const sectionIds = ["home", "categories", "trending", "about", "contribute"];

export default function Home() {
  const [searchOpen,     setSearchOpen]     = useState(false);
  const [activeCategory, setActiveCategory] = useState("");
  // const [sidebarOpen,    setSidebarOpen]    = useState(true);
  const categoriesSectionRef = useRef<HTMLDivElement>(null);

  const scrollToSection = useCallback((id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
  }, []);

  /* ── Auto-clear active category when #categories section leaves viewport ── */
  useEffect(() => {
    const el = document.getElementById("categories");
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) {
          setActiveCategory("");
        }
      },
      {
        threshold: 0,
        rootMargin: "0px 0px -80px 0px",
      }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const hash = window.location.hash.replace("#", "");
    if (hash && sectionIds.includes(hash)) {
      setTimeout(() => scrollToSection(hash), 100);
    }
  }, [scrollToSection]);

  useEffect(() => {
    const handleGlobalKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        setSearchOpen((v) => !v);
      }
    };
    window.addEventListener("keydown", handleGlobalKeyDown);
    return () => window.removeEventListener("keydown", handleGlobalKeyDown);
  }, []);

  const handleCategoryChange = useCallback(
    (slug: string) => {
      setActiveCategory(slug);
      const catSection = document.getElementById("categories");
      const catCard    = document.getElementById(slug);

      if (catCard) {
        catCard.scrollIntoView({ behavior: "smooth", block: "center" });
      } else if (catSection) {
        catSection.scrollIntoView({ behavior: "smooth", block: "start" });
      }

      window.history.pushState(null, "", `#${slug}`);
    },
    []
  );

  return (
    <>
      {/* ── Cinematic header (full-width, above sidebar layout) ── */}
      <CinematicNavbar onSearchOpen={() => setSearchOpen(true)} />
      <CinematicHero onSearchOpen={() => setSearchOpen(true)} />

      {/* ── Existing discovery platform content ── */}
      <div className="flex w-full overflow-x-hidden">
        {/* <Sidebar
          activeCategory={activeCategory}
          onCategoryChange={handleCategoryChange}
          isOpen={sidebarOpen}
          onToggle={() => setSidebarOpen((p) => !p)}
        /> */}

        <main className="flex-1 min-w-0 w-full overflow-x-hidden">
          {/* Wrapper div lets IntersectionObserver target the categories section */}
          <div ref={categoriesSectionRef}>
            <CategoryGrid activeCategory={activeCategory} />
          </div>

          <TrendingSection />
          <AboutSection />
          {/* <CommunitySection /> */}
          <Footer />
        </main>
      </div>

      <SearchModal isOpen={searchOpen} onClose={() => setSearchOpen(false)} />
    </>
  );
}
