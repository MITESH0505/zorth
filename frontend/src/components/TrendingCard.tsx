"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { ExternalLink, Bookmark, Star } from "lucide-react";
import type { Resource } from "@/data/resources";

interface TrendingCardProps {
  resource: Resource;
  index: number;
}

export default function TrendingCard({ resource, index }: TrendingCardProps) {
  const [bookmarked, setBookmarked] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{
        duration: 0.38,
        delay: Math.min(index * 0.05, 0.28),
        ease: [0.25, 0.1, 0.25, 1],
      }}
      className="group glass-card-hover rounded-xl p-4 sm:p-5"
    >
      {/* Header */}
      <div className="flex items-start justify-between gap-2 mb-2.5">
        <div className="flex items-center gap-2.5 min-w-0">
          {/* Avatar */}
          <div
            className="shrink-0 w-9 h-9 rounded-xl flex items-center justify-center"
            style={{
              background: "linear-gradient(135deg, rgba(99,102,241,0.14), rgba(168,85,247,0.14))",
              border: "1px solid rgba(99,102,241,0.14)",
            }}
          >
            <span
              className="text-xs font-bold"
              style={{ color: "var(--color-feature-icon)" }}
            >
              {resource.title.charAt(0)}
            </span>
          </div>

          <div className="min-w-0">
            <h3
              className="text-sm font-semibold truncate leading-snug"
              style={{ color: "var(--color-text-white)" }}
            >
              {resource.title}
            </h3>
            <span className="tag mt-0.5 inline-block">{resource.category}</span>
          </div>
        </div>

        {/* Bookmark */}
        <button
          onClick={(e) => { e.preventDefault(); setBookmarked(!bookmarked); }}
          className="shrink-0 p-1.5 rounded-lg transition-all duration-150 hover:scale-110"
          style={
            bookmarked
              ? { backgroundColor: "var(--color-accent-muted)", color: "var(--color-icon-active)" }
              : { color: "var(--color-icon-default)" }
          }
          aria-label={bookmarked ? "Remove bookmark" : "Add bookmark"}
        >
          <Bookmark size={13} fill={bookmarked ? "currentColor" : "none"} />
        </button>
      </div>

      {/* Description */}
      <p
        className="text-xs sm:text-[0.8125rem] leading-relaxed line-clamp-2 mb-3"
        style={{ color: "var(--color-text-secondary)" }}
      >
        {resource.description}
      </p>

      {/* Footer */}
      <div className="flex items-center justify-between gap-2">
        {/* Rating */}
        <div className="flex items-center gap-1 text-xs" style={{ color: "var(--color-text-tertiary)" }}>
          <Star size={11} className="text-amber-400" fill="currentColor" />
          <span className="tabular-nums font-medium">{resource.rating}</span>
        </div>

        {/* Tags + external link */}
        <div className="flex items-center gap-1.5 min-w-0">
          {resource.tags.slice(0, 2).map((tag) => (
            <span
              key={tag}
              className="text-[10px] px-2 py-0.5 rounded-full truncate hidden sm:inline-block"
              style={{
                backgroundColor: "var(--color-surface)",
                color: "var(--color-text-tertiary)",
                border: "1px solid var(--color-border)",
              }}
            >
              {tag}
            </span>
          ))}
          <a
            href={resource.url}
            target="_blank"
            rel="noopener noreferrer"
            className="shrink-0 p-1.5 rounded-lg transition-all duration-150
              hover:scale-110 hover:text-indigo-400"
            style={{ color: "var(--color-icon-default)" }}
            aria-label={`Visit ${resource.title}`}
          >
            <ExternalLink size={12} />
          </a>
        </div>
      </div>
    </motion.div>
  );
}
