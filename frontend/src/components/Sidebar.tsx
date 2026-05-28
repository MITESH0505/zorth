"use client";

import { useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  ChevronLeft, ChevronRight, X,
  Tv, Film, Clapperboard, Gamepad2, BookOpen,
  Sparkles, Terminal, Music, Smartphone, Monitor,
  GraduationCap, Grid3X3,
} from "lucide-react";
import { categories } from "@/data/categories";
import { getCategoryCounts, getTotalResourceCount } from "@/data/category-utils";

const iconMap: Record<string, React.ElementType> = {
  tv: Tv,
  film: Film,
  clapperboard: Clapperboard,
  "gamepad-2": Gamepad2,
  "book-open": BookOpen,
  sparkles: Sparkles,
  terminal: Terminal,
  music: Music,
  smartphone: Smartphone,
  monitor: Monitor,
  "graduation-cap": GraduationCap,
  "grid-3x3": Grid3X3,
};

interface SidebarProps {
  activeCategory: string;
  onCategoryChange: (slug: string) => void;
  isOpen: boolean;
  onToggle: () => void;
}

const TOTAL_RESOURCES = getTotalResourceCount();
const CATEGORY_COUNTS = getCategoryCounts();

/* ─── Item — purely CSS-driven states (hover + active) ─── */
function SidebarItem({
  cat,
  isActive,
  dense,
  onClick,
}: {
  cat: (typeof categories)[0];
  isActive: boolean;
  dense?: boolean;
  onClick: () => void;
}) {
  const Icon = iconMap[cat.icon] || Grid3X3;

  return (
    <button
      onClick={onClick}
      className={`sidebar-item ${dense ? "py-[0.4rem]" : "py-[0.55rem]"} ${isActive ? "active" : ""}`}
      aria-current={isActive ? "true" : undefined}
    >
      {/* Icon wrapper — gets .sidebar-icon class for CSS-driven color */}
      <span className="sidebar-icon shrink-0">
        <Icon size={13} strokeWidth={isActive ? 2.2 : 1.8} />
      </span>

      {/* Label */}
      <span className="truncate flex-1 text-left text-[0.8125rem]">
        {cat.name}
      </span>

      {/* Count badge */}
      <span className="sidebar-count tabular-nums">{CATEGORY_COUNTS[cat.name] || 0}</span>
    </button>
  );
}

/* ─── List wrapper (static vs animated) ─── */
function CategoryList({
  activeCategory,
  onCategoryChange,
  dense,
  animated,
}: {
  activeCategory: string;
  onCategoryChange: (slug: string) => void;
  dense?: boolean;
  animated?: boolean;
}) {
  return (
    <>
      {categories.map((cat, idx) => {
        const item = (
          <SidebarItem
            key={cat.id}
            cat={cat}
            isActive={activeCategory === cat.slug}
            dense={dense}
            onClick={() => onCategoryChange(cat.slug)}
          />
        );

        if (!animated) return item;

        return (
          <motion.div
            key={cat.id}
            initial={{ opacity: 0, x: -8 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{
              duration: 0.22,
              delay: idx * 0.028,
              ease: [0.25, 0.1, 0.25, 1],
            }}
          >
            {item}
          </motion.div>
        );
      })}
    </>
  );
}

/* ─── Collapse / expand toggle button ─── */
function ToggleBtn({
  direction,
  onClick,
  style,
}: {
  direction: "left" | "right";
  onClick: () => void;
  style?: React.CSSProperties;
}) {
  const Icon = direction === "left" ? ChevronLeft : ChevronRight;
  return (
    <button
      onClick={onClick}
      style={style}
      aria-label={direction === "left" ? "Collapse sidebar" : "Expand sidebar"}
      className="flex items-center justify-center w-6 h-6 rounded-full
        transition-all duration-150 hover:scale-110 active:scale-95 focus-visible:outline-none"
    >
      <Icon size={11} />
    </button>
  );
}

export default function Sidebar({
  activeCategory,
  onCategoryChange,
  isOpen,
  onToggle,
}: SidebarProps) {
  /* Lock scroll on mobile when open */
  useEffect(() => {
    const locked =
      typeof window !== "undefined" && window.innerWidth < 1024 && isOpen;
    document.body.style.overflow = locked ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [isOpen]);

  const toggleBtnStyles: React.CSSProperties = {
    backgroundColor: "var(--color-body-bg)",
    border: "1px solid var(--color-border)",
    color: "var(--color-icon-default)",
    boxShadow: "0 2px 8px rgba(0,0,0,0.22)",
  };

  return (
    <>
      {/* ── Desktop sidebar ── */}
      <aside
        className={`
          hidden lg:block fixed left-0 bottom-0 z-30
          transition-[width] duration-300 ease-in-out
          ${isOpen ? "w-56" : "w-0 overflow-hidden"}
        `}
        style={{ top: "var(--nav-h)" }}
      >
        {/* Collapse handle */}
        {isOpen && (
          <div className="absolute -right-3 top-5 z-10">
            <ToggleBtn
              direction="left"
              onClick={onToggle}
              style={toggleBtnStyles}
            />
          </div>
        )}

        {/* Scrollable body */}
        <div
          className="h-full flex flex-col overflow-hidden sidebar-glass border-r"
          style={{ borderColor: "var(--color-border)" }}
        >
          {/* Section label */}
          <div className="px-3 pt-4 pb-1.5">
            <span
              className="text-[9.5px] font-semibold uppercase tracking-[0.12em]"
              style={{ color: "var(--color-muted)" }}
            >
              Categories
            </span>
          </div>
          <div className="sidebar-divider mx-3 my-1.5" />

          {/* List */}
          <div className="flex-1 overflow-y-auto no-scrollbar px-3 pb-3 space-y-px">
            <CategoryList
              activeCategory={activeCategory}
              onCategoryChange={onCategoryChange}
              dense
            />
          </div>

          {/* Footer stat */}
          <div
            className="px-3 py-3 border-t shrink-0"
            style={{ borderColor: "var(--color-border)" }}
          >
            <p
              className="text-[10px] leading-relaxed tabular-nums"
              style={{ color: "var(--color-muted)" }}
            >
              {TOTAL_RESOURCES} resources · {categories.length} categories
            </p>
          </div>
        </div>
      </aside>

      {/* Expand button (desktop, when collapsed) */}
      <div
        className={`hidden lg:flex fixed left-3 z-30
          transition-all duration-300
          ${isOpen ? "opacity-0 pointer-events-none" : "opacity-100"}`}
        style={{ top: "calc(var(--nav-h) + 1.25rem)" }}
      >
        <ToggleBtn
          direction="right"
          onClick={onToggle}
          style={toggleBtnStyles}
        />
      </div>

      {/* ── Mobile overlay ── */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.16 }}
            className="fixed inset-0 z-40 lg:hidden"
          >
            {/* Backdrop */}
            <div
              className="absolute inset-0 bg-black/40 backdrop-blur-[4px]"
              onClick={onToggle}
            />

            {/* Drawer */}
            <motion.div
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ type: "spring", damping: 30, stiffness: 300, mass: 0.75 }}
              className="absolute left-0 top-0 bottom-0 w-72 max-w-[82vw] flex flex-col sidebar-glass"
              style={{ borderRight: "1px solid var(--color-border)" }}
            >
              {/* Mobile header */}
              <div
                className="flex items-center justify-between px-5 py-4 border-b shrink-0"
                style={{ borderColor: "var(--color-border)" }}
              >
                <div className="flex items-center gap-2.5">
                  <div className="w-6 h-6 rounded-lg bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center shadow-sm">
                    <span className="text-white font-bold text-[11px]">Z</span>
                  </div>
                  <span
                    className="text-sm font-semibold"
                    style={{ color: "var(--color-text-white)" }}
                  >
                    Categories
                  </span>
                </div>
                <button
                  onClick={onToggle}
                  className="p-1.5 rounded-lg transition-colors hover:bg-[var(--color-surface-elevated)]"
                  style={{ color: "var(--color-icon-default)" }}
                  aria-label="Close sidebar"
                >
                  <X size={16} />
                </button>
              </div>

              {/* Mobile section label */}
              <div className="px-5 pt-3 pb-1 shrink-0">
                <span
                  className="text-[9.5px] font-semibold uppercase tracking-[0.12em]"
                  style={{ color: "var(--color-muted)" }}
                >
                  Browse
                </span>
              </div>
              <div className="sidebar-divider mx-5 my-1.5" />

              {/* Mobile list */}
              <div className="flex-1 overflow-y-auto px-5 py-1.5 space-y-px">
                <CategoryList
                  activeCategory={activeCategory}
                  onCategoryChange={(slug) => {
                    onCategoryChange(slug);
                    onToggle(); // close drawer after selection on mobile
                  }}
                  animated
                />
              </div>

              {/* Mobile footer */}
              <div
                className="px-5 py-4 border-t shrink-0"
                style={{ borderColor: "var(--color-border)" }}
              >
                <p
                  className="text-[10px] tabular-nums"
                  style={{ color: "var(--color-muted)" }}
                >
                  {TOTAL_RESOURCES} resources · {categories.length} categories
                </p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Desktop spacer */}
      <div
        className={`hidden lg:block shrink-0 transition-[width] duration-300 ease-in-out ${
          isOpen ? "w-56" : "w-0"
        }`}
      />
    </>
  );
}
