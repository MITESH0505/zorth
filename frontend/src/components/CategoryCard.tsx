"use client";

import { motion } from "framer-motion";
import {
  Tv, Film, Clapperboard, Gamepad2, BookOpen,
  Sparkles, Terminal, Music, Smartphone, Monitor,
  GraduationCap, Grid3X3, ArrowUpRight,
} from "lucide-react";
import type { Category } from "@/data/categories";
import Link from "next/link";

const iconMap: Record<string, React.ElementType> = {
  tv: Tv, film: Film, clapperboard: Clapperboard, "gamepad-2": Gamepad2,
  "book-open": BookOpen, sparkles: Sparkles, terminal: Terminal,
  music: Music, smartphone: Smartphone, monitor: Monitor,
  "graduation-cap": GraduationCap, "grid-3x3": Grid3X3,
};

interface CategoryCardProps {
  category: Category;
  count: number;
  index: number;
  isActive?: boolean;
}

export default function CategoryCard({ category, count, index, isActive }: CategoryCardProps) {
  const Icon = iconMap[category.icon] || Grid3X3;

  return (
    <Link href={`/categories/${category.slug}`} className="block h-full">
      <motion.div
        id={category.slug}
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-30px" }}
        transition={{
          duration: 0.42,
          delay: Math.min(index * 0.045, 0.32),
          ease: [0.25, 0.1, 0.25, 1],
        }}
        className={`
          group relative w-full h-full overflow-hidden rounded-2xl cursor-pointer
          flex flex-col
          ${isActive ? "ring-2 ring-indigo-500/40" : ""}
        `}
        style={{
          backgroundColor: "var(--color-card-bg)",
          border: "1px solid var(--color-border)",
          boxShadow: "0 2px 8px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.08)",
          transition: "box-shadow 0.28s ease, border-color 0.28s ease, transform 0.28s cubic-bezier(0.22,1,0.36,1)",
          willChange: "transform",
        }}
        whileHover={{
          y: -5,
          transition: { duration: 0.26, ease: [0.22, 1, 0.36, 1] },
        }}
        onMouseEnter={(e) => {
          (e.currentTarget as HTMLElement).style.boxShadow =
            "0 8px 28px rgba(0,0,0,0.18), 0 0 0 1px var(--color-accent-border), 0 20px 48px rgba(99,102,241,0.12)";
          (e.currentTarget as HTMLElement).style.borderColor = "var(--color-accent-border)";
        }}
        onMouseLeave={(e) => {
          (e.currentTarget as HTMLElement).style.boxShadow =
            "0 2px 8px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.08)";
          (e.currentTarget as HTMLElement).style.borderColor = "var(--color-border)";
        }}
      >
        {/* ── Visual header — gradient + giant icon (parallax on hover) ── */}
        <motion.div
          className={`
            relative h-[108px] sm:h-[118px] w-full overflow-hidden shrink-0
            bg-gradient-to-br ${category.color}
          `}
          whileHover={{ scale: 1.06 }}
          transition={{ duration: 0.42, ease: [0.25, 0.1, 0.25, 1] }}
        >
          {/* Noise texture overlay for depth */}
          <div
            className="absolute inset-0 opacity-[0.12]"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='1'/%3E%3C/svg%3E")`,
              backgroundSize: "180px 180px",
            }}
          />

          {/* Subtle radial glow behind icon */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div
              className="absolute w-20 h-20 rounded-full opacity-30 blur-2xl"
              style={{ background: "rgba(255,255,255,0.6)" }}
            />
          </div>

          {/* Large icon — centered */}
          <div className="absolute inset-0 flex items-center justify-center">
            <motion.div
              className="flex items-center justify-center"
              whileHover={{ scale: 1.12, rotate: -4 }}
              transition={{ duration: 0.3, ease: "easeOut" }}
            >
              <Icon
                size={38}
                color="rgba(255,255,255,0.92)"
                strokeWidth={1.6}
                className="drop-shadow-lg"
              />
            </motion.div>
          </div>

          {/* Count chip — top-right */}
          {/* <div className="absolute top-2.5 right-2.5">
            <span
              className="text-[9px] tabular-nums font-semibold px-1.5 py-0.5 rounded-full backdrop-blur-md"
              style={{
                backgroundColor: "rgba(0,0,0,0.35)",
                color: "rgba(255,255,255,0.75)",
                border: "1px solid rgba(255,255,255,0.18)",
              }}
            >
              {count}
            </span>
          </div> */}

          {/* Fade from gradient into card body */}
          <div
            className="absolute bottom-0 left-0 right-0 h-10"
            style={{
              background: "linear-gradient(to bottom, transparent, var(--color-card-bg))",
            }}
          />
        </motion.div>

        {/* ── Content body ── */}
        <div className="flex flex-col flex-1 px-4 pt-2.5 pb-4">

          {/* Title */}
          <h3
            className="text-sm sm:text-[0.88rem] font-semibold leading-snug mb-1.5
              transition-colors duration-150 group-hover:text-indigo-400"
            style={{ color: "var(--color-text-white)" }}
          >
            {category.name}
          </h3>

          {/* Description */}
          <p
            className="text-[0.72rem] sm:text-[0.76rem] leading-relaxed line-clamp-2 flex-1"
            style={{ color: "var(--color-text-secondary)" }}
          >
            {category.description}
          </p>

          {/* CTA footer */}
          <div
            className="flex items-center gap-1 mt-3 text-[0.7rem] font-semibold
              transition-all duration-200 group-hover:gap-2 group-hover:text-indigo-400"
            style={{ color: "var(--color-text-tertiary)" }}
          >
            <span>Browse</span>
            <ArrowUpRight
              size={10}
              className="transition-transform duration-200
                group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
            />
          </div>
        </div>
      </motion.div>
    </Link>
  );
}
