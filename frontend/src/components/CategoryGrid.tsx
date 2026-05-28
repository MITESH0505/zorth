"use client";

import { motion } from "framer-motion";
import { categories } from "@/data/categories";
import { getCategoryCounts } from "@/data/category-utils";
import CategoryCard from "./CategoryCard";

interface CategoryGridProps {
  activeCategory?: string;
}

const CATEGORY_COUNTS = getCategoryCounts();

export default function CategoryGrid({ activeCategory = "" }: CategoryGridProps) {
  return (
    <section id="categories" className="section-py">
      <div className="max-w-7xl 2xl:max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 2xl:px-12">

        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.42 }}
          className="mb-7 sm:mb-9 lg:mb-11"
        >
          <h2 className="section-title">Browse Categories</h2>
          <p className="section-subtitle">
            Carefully organized categories spanning entertainment,
            technology, and internet resources — all curated for quality.
          </p>
        </motion.div>

        {/* Grid — adaptive on ultra-wide to prevent overstretched cards */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-[repeat(auto-fit,minmax(250px,1fr))] gap-4 sm:gap-5 lg:gap-6 2xl:gap-8">
          {categories.map((cat, i) => (
            <CategoryCard
              key={cat.id}
              category={cat}
              count={CATEGORY_COUNTS[cat.name] || 0}
              index={i}
              isActive={activeCategory === cat.slug}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
