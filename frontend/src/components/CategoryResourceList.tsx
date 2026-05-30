"use client";

/**
 * CategoryResourceList.tsx
 *
 * A fully client-side component that receives the pre-filtered resources
 * (already scoped to the current category slug by the server) and provides:
 *   - A premium debounced search bar (250ms)
 *   - Real-time filtering across title, description, and tags (case-insensitive, partial)
 *   - Framer Motion stagger animations on the results list
 *   - A polished "No results" empty state
 *   - Preserves the existing dark/premium card design 100%
 *
 * NO backend calls, NO new API routes, NO schema changes.
 * Search runs entirely on the already-fetched resources array.
 */

import { useState, useEffect, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, X, SearchX } from "lucide-react";

// ─── Types ────────────────────────────────────────────────────────────────────

interface Resource {
  _id: string;
  title: string;
  description: string;
  url: string;
  rating: number;
  tags: string[];
  category: {
    slug: string;
    name?: string;
  };
}

interface CategoryResourceListProps {
  resources: Resource[];
  slug: string;
}

// ─── Animation variants ───────────────────────────────────────────────────────

/** Container stagger: each child card enters 40ms after the previous. */
const listVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.04,
    },
  },
};

/** Individual card: slides up + fades in. */
const cardVariants = {
  hidden: { opacity: 0, y: 14 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.3, ease: [0.25, 0.1, 0.25, 1] },
  },
  exit: {
    opacity: 0,
    y: -8,
    transition: { duration: 0.18, ease: "easeIn" },
  },
};

/** Empty state enters with a gentle scale + fade. */
const emptyVariants = {
  hidden: { opacity: 0, scale: 0.96 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.35, ease: [0.25, 0.1, 0.25, 1] },
  },
  exit: {
    opacity: 0,
    scale: 0.96,
    transition: { duration: 0.2, ease: "easeIn" },
  },
};

// ─── Helpers ──────────────────────────────────────────────────────────────────

/**
 * useDebounce — returns a debounced copy of `value` after `delay` ms.
 * Keeps search input snappy while the filter computation waits.
 */
function useDebounce<T>(value: T, delay: number): T {
  const [debounced, setDebounced] = useState<T>(value);
  useEffect(() => {
    const id = setTimeout(() => setDebounced(value), delay);
    return () => clearTimeout(id);
  }, [value, delay]);
  return debounced;
}

/**
 * matchesQuery — pure function, no side effects.
 * Returns true when ANY of title / description / tags contains the query
 * as a substring (case-insensitive). Empty query always returns true.
 */
function matchesQuery(resource: Resource, query: string): boolean {
  if (!query) return true;
  const q = query.toLowerCase();
  if (resource.title.toLowerCase().includes(q)) return true;
  if (resource.description.toLowerCase().includes(q)) return true;
  if (resource.tags.some((tag) => tag.toLowerCase().includes(q))) return true;
  return false;
}

// ─── StarRating helper ────────────────────────────────────────────────────────

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex items-center gap-2">
      <div className="text-yellow-400 text-base leading-none">
        {Array.from({ length: 5 }).map((_, i) => (
          <span key={i}>{i + 1 <= Math.floor(rating) ? "★" : "☆"}</span>
        ))}
      </div>
      <span className="text-zinc-400 text-sm">{rating}/5</span>
    </div>
  );
}

// ─── Main component ───────────────────────────────────────────────────────────

export default function CategoryResourceList({
  resources,
  slug,
}: CategoryResourceListProps) {
  // Raw value bound to <input> — updates immediately so the input feels live.
  const [rawQuery, setRawQuery] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);
  const [isFocused, setIsFocused] = useState(false);

  // Debounced query — filter computation waits 250ms after the user stops typing.
  const query = useDebounce(rawQuery, 250);

  // Derive the filtered list. useMemo-equivalent: recomputes only when
  // resources or the debounced query changes. For hundreds of items this
  // is negligibly cheap; no need for useMemo here.
  const filtered = resources.filter((r) => matchesQuery(r, query));

  // Clear search with Escape key when input is focused.
  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent<HTMLInputElement>) => {
      if (e.key === "Escape") {
        setRawQuery("");
        inputRef.current?.blur();
      }
    },
    []
  );

  return (
    <div>
      {/* ── Search bar ─────────────────────────────────────────────────── */}
      <div className="mb-8">
        {/*
         * Gradient border trick:
         *   - Outer div carries the gradient background + rounded corners.
         *   - Inner div has a 1px inset via margin, giving a "gradient border" effect.
         *   - On focus the gradient brightens via the `isFocused` state.
         */}
        <div
          className="relative rounded-xl p-px transition-all duration-300"
          style={{
            background: isFocused
              ? "linear-gradient(135deg, rgba(99,102,241,0.7) 0%, rgba(139,92,246,0.5) 50%, rgba(99,102,241,0.3) 100%)"
              : "linear-gradient(135deg, rgba(63,63,70,0.8) 0%, rgba(39,39,42,0.6) 50%, rgba(63,63,70,0.4) 100%)",
            boxShadow: isFocused
              ? "0 0 0 3px rgba(99,102,241,0.12), 0 4px 24px rgba(99,102,241,0.15)"
              : "0 2px 8px rgba(0,0,0,0.3)",
          }}
        >
          {/* Inner search row */}
          <div className="flex items-center gap-3 bg-zinc-950 rounded-[11px] px-4 py-3.5">
            {/* Search icon — indigo when focused, muted when idle */}
            <Search
              size={17}
              className="shrink-0 transition-colors duration-200"
              style={{
                color: isFocused ? "rgb(129,140,248)" : "rgb(113,113,122)",
              }}
            />

            {/* Input */}
            <input
              ref={inputRef}
              type="text"
              value={rawQuery}
              onChange={(e) => setRawQuery(e.target.value)}
              onFocus={() => setIsFocused(true)}
              onBlur={() => setIsFocused(false)}
              onKeyDown={handleKeyDown}
              placeholder={`Search in ${slug.replace(/-/g, " ")}…`}
              className="
                flex-1 bg-transparent text-sm text-white/85 placeholder-zinc-600
                focus:outline-none tracking-wide caret-indigo-400
              "
              // aria label for screen readers
              aria-label={`Search resources in ${slug}`}
            />

            {/* Live count badge — shows while there is a query */}
            <AnimatePresence mode="wait">
              {rawQuery && (
                <motion.span
                  key="count"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  transition={{ duration: 0.15 }}
                  className="shrink-0 text-[11px] font-medium px-2 py-0.5 rounded-full
                             bg-indigo-500/15 text-indigo-400 border border-indigo-500/20"
                >
                  {filtered.length}
                </motion.span>
              )}
            </AnimatePresence>

            {/* Clear button — only visible when there is input */}
            <AnimatePresence>
              {rawQuery && (
                <motion.button
                  key="clear"
                  initial={{ opacity: 0, scale: 0.7 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.7 }}
                  transition={{ duration: 0.15 }}
                  onClick={() => {
                    setRawQuery("");
                    inputRef.current?.focus();
                  }}
                  className="shrink-0 p-1 rounded-md text-zinc-500 hover:text-zinc-200
                             hover:bg-zinc-800 transition-colors duration-150"
                  aria-label="Clear search"
                >
                  <X size={14} />
                </motion.button>
              )}
            </AnimatePresence>
          </div>
        </div>

        {/* Subtle hint row — only when search is active */}
        <AnimatePresence>
          {rawQuery && (
            <motion.p
              initial={{ opacity: 0, y: -4 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -4 }}
              transition={{ duration: 0.2 }}
              className="mt-2 text-xs text-zinc-600 pl-1"
            >
              {filtered.length === 0
                ? `No matches for "${rawQuery}"`
                : `${filtered.length} result${filtered.length !== 1 ? "s" : ""} for "${rawQuery}"`}
            </motion.p>
          )}
        </AnimatePresence>
      </div>

      {/* ── Resource cards / empty state ───────────────────────────────── */}
      <AnimatePresence mode="wait">
        {filtered.length > 0 ? (
          /*
           * `key` tied to the query so AnimatePresence sees a brand-new list
           * whenever the filtered set changes, triggering the stagger entrance.
           */
          <motion.div
            key={`results-${query}`}
            variants={listVariants}
            initial="hidden"
            animate="visible"
            className="space-y-4"
          >
            {filtered.map((resource) => (
              <motion.a
                key={resource._id}
                variants={cardVariants}
                href={resource.url}
                target="_blank"
                rel="noopener noreferrer"
                /*
                 * Reusing the EXACT same Tailwind classes from the original
                 * page.tsx card — no design drift.
                 */
                className="block border border-zinc-800 rounded-xl p-5 hover:border-indigo-500 transition"
              >
                {/* Title */}
                <h2 className="text-2xl font-semibold">{resource.title}</h2>

                {/* Star rating */}
                <div className="mt-2">
                  <StarRating rating={resource.rating} />
                </div>

                {/* Description */}
                <p className="text-zinc-400 mt-2">{resource.description}</p>

                {/* Tags — same styling as original */}
                <div className="flex gap-2 mt-3 flex-wrap">
                  {resource.tags.map((tag) => (
                    <span
                      key={tag}
                      className="
                        px-3 py-1 rounded-full bg-zinc-800/80 text-zinc-400
                        text-sm font-medium tracking-tight border border-zinc-700/50
                        transition-colors duration-200
                        hover:bg-zinc-700/70 hover:text-zinc-100 hover:border-zinc-500
                        font-sans
                      "
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </motion.a>
            ))}
          </motion.div>
        ) : (
          /* ── Empty state ──────────────────────────────────────────────── */
          <motion.div
            key="empty"
            variants={emptyVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="flex flex-col items-center justify-center py-20 px-6 text-center"
          >
            {/* Icon container with gradient glow ring */}
            <div className="relative mb-6">
              <div
                className="absolute inset-0 rounded-full blur-2xl opacity-30"
                style={{
                  background:
                    "radial-gradient(circle, rgba(99,102,241,0.4) 0%, transparent 70%)",
                  transform: "scale(2)",
                }}
              />
              <div className="relative w-16 h-16 rounded-2xl bg-zinc-900 border border-zinc-800 flex items-center justify-center">
                <SearchX size={28} className="text-zinc-600" />
              </div>
            </div>

            {/* Heading */}
            <h3 className="text-lg font-semibold text-white/80 mb-2">
              No results found
            </h3>

            {/* Dynamic message */}
            <p className="text-zinc-500 text-sm max-w-xs leading-relaxed">
              Nothing matched{" "}
              <span className="text-indigo-400 font-medium">
                &ldquo;{rawQuery}&rdquo;
              </span>{" "}
              in this category. Try a different term or{" "}
              <button
                onClick={() => setRawQuery("")}
                className="text-zinc-400 underline underline-offset-2 hover:text-white transition-colors"
              >
                clear the search
              </button>
              .
            </p>

            {/* Decorative divider */}
            <div className="mt-8 h-px w-16 bg-gradient-to-r from-transparent via-zinc-700 to-transparent" />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
