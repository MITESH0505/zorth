"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, X, ExternalLink, TrendingUp } from "lucide-react";
import { categories } from "@/data/categories";
import { trendingResources } from "@/data/resources";

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const overlayVariants = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  exit: { opacity: 0 },
};

const panelVariants = {
  initial: { opacity: 0, scale: 0.94, y: -8 },
  animate: { opacity: 1, scale: 1, y: 0 },
  exit: { opacity: 0, scale: 0.94, y: -8 },
};

export default function SearchModal({ isOpen, onClose }: SearchModalProps) {
  const [query, setQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [activeIndex, setActiveIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const resultsRef = useRef<HTMLDivElement>(null);

  const allItems = [
    ...categories.map((c) => ({
      id: c.id,
      title: c.name,
      description: c.description,
      category: c.name,
      type: "category" as const,
    })),
    ...trendingResources.map((r) => ({
      id: r.id,
      title: r.title,
      description: r.description,
      category: r.category,
      type: "resource" as const,
      url: r.url,
    })),
  ];

  const filtered = allItems.filter((item) => {
    const matchesQuery =
      !query ||
      item.title.toLowerCase().includes(query.toLowerCase()) ||
      item.description.toLowerCase().includes(query.toLowerCase());
    const matchesCategory =
      !selectedCategory || item.category === selectedCategory;
    return matchesQuery && matchesCategory;
  });

  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (!isOpen) return;
      if (e.key === "Escape") { onClose(); return; }
      if (e.key === "ArrowDown") { e.preventDefault(); setActiveIndex((i) => Math.min(i + 1, filtered.length - 1)); }
      if (e.key === "ArrowUp") { e.preventDefault(); setActiveIndex((i) => Math.max(i - 1, 0)); }
      if (e.key === "Enter" && filtered[activeIndex]) {
        const item = filtered[activeIndex];
        if (item.type === "category") {
          const el = document.getElementById(item.title.toLowerCase().replace(/[^a-z0-9]+/g, "-"));
          if (el) el.scrollIntoView({ behavior: "smooth" });
        } else {
          window.open(item.url, "_blank", "noopener");
        }
        onClose();
      }
    },
    [isOpen, filtered, activeIndex, onClose]
  );

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [handleKeyDown]);

  useEffect(() => {
    if (isOpen) {
      setQuery("");
      setSelectedCategory("");
      setActiveIndex(0);
      setTimeout(() => inputRef.current?.focus(), 80);
    }
  }, [isOpen]);

  useEffect(() => { setActiveIndex(0); }, [query, selectedCategory]);

  useEffect(() => {
    if (resultsRef.current && activeIndex >= 0) {
      (resultsRef.current.children[activeIndex] as HTMLElement)?.scrollIntoView({ block: "nearest" });
    }
  }, [activeIndex]);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          variants={overlayVariants}
          initial="initial"
          animate="animate"
          exit="exit"
          transition={{ duration: 0.3, ease: "easeOut" }}
          className="fixed inset-0 z-[60] flex items-start justify-center pt-[10vh] sm:pt-[12vh] px-3 sm:px-4"
        >
          {/* Cinematic dark overlay with warm tint */}
          <div className="absolute inset-0 bg-[#0a080a]/70 backdrop-blur-sm" onClick={onClose} />

          {/* Warm ambient glow behind panel */}
          <div className="absolute top-[8vh] left-1/2 -translate-x-1/2 w-full max-w-2xl pointer-events-none">
            <div
              className="absolute -inset-20 rounded-full"
              style={{
                background:
                  "radial-gradient(ellipse at 50% 20%, rgba(255, 180, 150, 0.06) 0%, rgba(255, 140, 120, 0.03) 30%, transparent 60%)",
              }}
            />
          </div>

          <motion.div
            variants={panelVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="relative w-full max-w-2xl rounded-2xl overflow-hidden shadow-2xl"
            style={{
              backgroundColor: "rgba(12, 9, 11, 0.6)",
              backdropFilter: "blur(32px)",
              WebkitBackdropFilter: "blur(32px)",
              border: "1px solid rgba(255, 200, 180, 0.06)",
              boxShadow:
                "0 24px 80px rgba(0,0,0,0.5), 0 0 0 1px rgba(255,200,180,0.02), 0 8px 32px rgba(255,140,120,0.04)",
            }}
          >
            {/* ── Search Input ── */}
            <div className="flex items-center gap-3 px-4 sm:px-5 py-3.5 border-b border-white/[0.04]">
              <Search size={18} className="text-white/30" />
              <input
                ref={inputRef}
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search resources, categories..."
                className="flex-1 bg-transparent text-sm text-white/80 placeholder-white/25 focus:outline-none tracking-wide"
              />
              {query && (
                <button onClick={() => setQuery("")}
                  className="p-1 rounded-md text-white/30 hover:text-white/60 transition-colors"
                >
                  <X size={14} />
                </button>
              )}
              <kbd className="hidden sm:inline-flex px-1.5 py-0.5 rounded text-[10px] font-medium text-white/25 bg-white/[0.04] border border-white/[0.04]">
                ESC
              </kbd>
            </div>

            {/* ── Category Filters ── */}
            <div className="flex gap-2 px-4 sm:px-5 py-3 overflow-x-auto border-b border-white/[0.04]">
              <button
                onClick={() => setSelectedCategory("")}
                className={`shrink-0 px-3 py-1 rounded-full text-xs font-medium whitespace-nowrap transition-all duration-200 ${
                  !selectedCategory
                    ? "bg-white/[0.07] text-white/90 border border-white/10"
                    : "text-white/35 border border-white/[0.04] hover:text-white/60 hover:border-white/10"
                }`}
              >
                All
              </button>
              {categories.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => setSelectedCategory(selectedCategory === cat.name ? "" : cat.name)}
                  className={`shrink-0 px-3 py-1 rounded-full text-xs font-medium whitespace-nowrap transition-all duration-200 ${
                    selectedCategory === cat.name
                      ? "bg-white/[0.07] text-white/90 border border-white/10"
                      : "text-white/35 border border-white/[0.04] hover:text-white/60 hover:border-white/10"
                  }`}
                >
                  {cat.name}
                </button>
              ))}
            </div>

            {/* ── Results / Suggestions ── */}
            <div className="max-h-72 sm:max-h-80 overflow-y-auto" ref={resultsRef}>
              {!query && !selectedCategory ? (
                /* ── Suggestions: trending categories when idle ── */
                <div>
                  <div className="flex items-center gap-1.5 px-4 sm:px-5 pt-4 pb-2">
                    <TrendingUp size={12} className="text-white/25" />
                    <span className="text-[10px] font-semibold uppercase text-white/20 tracking-wider">
                      Trending Categories
                    </span>
                  </div>
                  <div className="flex flex-wrap gap-1.5 px-4 sm:px-5 pb-4">
                    {categories.slice(0, 5).map((cat) => (
                      <button
                        key={cat.id}
                        onClick={() => setSelectedCategory(cat.name)}
                        className="px-3 py-1.5 rounded-full text-xs font-medium
                                   text-white/50 hover:text-white
                                   bg-white/[0.03] hover:bg-white/[0.07]
                                   border border-white/[0.04] hover:border-white/10
                                   transition-all duration-200"
                      >
                        {cat.name}
                      </button>
                    ))}
                  </div>
                  <div className="border-t border-white/[0.03] px-4 sm:px-5 py-2.5">
                    <p className="text-[10px] text-white/18 tracking-wide">
                      Type to search across {categories.length} categories and {trendingResources.length} resources
                    </p>
                  </div>
                </div>
              ) : filtered.length === 0 ? (
                <div className="flex flex-col items-center py-10 sm:py-12">
                  <Search size={28} className="text-white/15 mb-3" />
                  <p className="text-sm text-white/50">No results found</p>
                  <p className="text-xs mt-1 text-white/25">Try a different search term</p>
                </div>
              ) : (
                filtered.map((item, index) => (
                  <button
                    key={item.id}
                    onClick={() => {
                      if (item.type === "category") {
                        const el = document.getElementById(item.title.toLowerCase().replace(/[^a-z0-9]+/g, "-"));
                        if (el) el.scrollIntoView({ behavior: "smooth" });
                      } else {
                        window.open(item.url, "_blank", "noopener");
                      }
                      onClose();
                    }}
                    className={`w-full flex items-center gap-3 sm:gap-4 px-4 sm:px-5 py-3 sm:py-3.5 text-left transition-all duration-200 ${
                      index === activeIndex
                        ? "bg-white/[0.05]"
                        : "hover:bg-white/[0.02]"
                    }`}
                  >
                    <div
                      className="shrink-0 w-7 h-7 sm:w-8 sm:h-8 rounded-lg flex items-center justify-center text-xs font-medium tracking-wide"
                      style={{
                        background: item.type === "category"
                          ? "linear-gradient(135deg, rgba(255,200,180,0.07), rgba(255,200,180,0.02))"
                          : "linear-gradient(135deg, rgba(255,180,150,0.05), rgba(255,200,180,0.02))",
                        color: "rgba(255, 220, 210, 0.45)",
                      }}
                    >
                      {item.type === "category" ? "C" : "R"}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className="text-sm font-medium truncate text-white/75 tracking-wide">
                          {item.title}
                        </span>
                        <span className="shrink-0 px-1.5 py-0.5 rounded text-[10px] font-medium text-white/35 bg-white/[0.03] border border-white/[0.04]">
                          {item.category}
                        </span>
                      </div>
                      <p className="text-xs truncate mt-0.5 text-white/30 tracking-wide">
                        {item.description}
                      </p>
                    </div>
                    <ExternalLink size={14} className="text-white/15 shrink-0" />
                  </button>
                ))
              )}
            </div>

            {/* ── Footer — Keyboard Shortcuts ── */}
            <div className="hidden sm:flex items-center gap-4 px-5 py-3 border-t border-white/[0.04] text-[11px] text-white/20">
              <span className="flex items-center gap-1">
                <kbd className="px-1 py-0.5 rounded bg-white/[0.04] text-white/35 border border-white/[0.04]">↑↓</kbd> Navigate
              </span>
              <span className="flex items-center gap-1">
                <kbd className="px-1 py-0.5 rounded bg-white/[0.04] text-white/35 border border-white/[0.04]">↵</kbd> Open
              </span>
              <span className="flex items-center gap-1">
                <kbd className="px-1 py-0.5 rounded bg-white/[0.04] text-white/35 border border-white/[0.04]">ESC</kbd> Close
              </span>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
