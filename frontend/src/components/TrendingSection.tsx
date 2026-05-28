"use client";

import { motion } from "framer-motion";
import { trendingResources } from "@/data/resources";
import TrendingCard from "./TrendingCard";
import { ArrowRight } from "lucide-react";

export default function TrendingSection() {
  return (
    <section id="trending" className="section-py">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.45 }}
          className="flex flex-col sm:flex-row sm:items-end justify-between gap-3 mb-7 sm:mb-9 lg:mb-11"
        >
          <div>
            <h2 className="section-title">Trending Resources</h2>
            <p className="section-subtitle">
              Most popular and highest-rated resources in the community this month.
            </p>
          </div>
          <a
            href="#"
            className="inline-flex items-center gap-1.5 text-sm shrink-0 font-medium
              transition-all duration-150 hover:gap-2.5"
            style={{ color: "var(--color-link-accent)" }}
          >
            View all
            <ArrowRight size={14} />
          </a>
        </motion.div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 sm:gap-4 md:gap-5">
          {trendingResources.map((resource, i) => (
            <TrendingCard key={resource.id} resource={resource} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
