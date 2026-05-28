"use client";

import { motion } from "framer-motion";
import { Shield, Globe, Sparkles, BookmarkCheck } from "lucide-react";

const features = [
  {
    icon: Globe,
    title: "Curated Directory",
    desc: "Every resource is hand-picked and organized into clean categories for easy discovery.",
  },
  {
    icon: Shield,
    title: "Safe & Verified",
    desc: "We regularly check resources to ensure they are safe, active, and reliable.",
  },
  {
    icon: Sparkles,
    title: "Community Driven",
    desc: "Maintained by a community of enthusiasts who share the best finds from across the web.",
  },
  {
    icon: BookmarkCheck,
    title: "No Hosting",
    desc: "Zorth does not host any copyrighted content. We simply index and organize links.",
  },
];

export default function AboutSection() {
  return (
    <section id="about" className="section-py relative overflow-hidden">
      {/* Ambient orb */}
      <div className="glow-orb w-80 h-80 sm:w-[440px] sm:h-[440px] bg-indigo-500/8 left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.45 }}
          className="mb-7 sm:mb-9 lg:mb-11"
        >
          <h2 className="section-title">About Zorth</h2>
          <p className="section-subtitle">
            Zorth is a curated directory of the best entertainment and internet
            resources. Think of it as a cleaner, more organized{" "}
            <a
              href="https://fmhy.net"
              target="_blank"
              rel="noopener noreferrer"
              className="underline underline-offset-2 transition-colors hover:text-indigo-400"
              style={{ color: "var(--color-badge-text)" }}
            >
              FMHY
            </a>.
          </p>
        </motion.div>

        {/* Feature cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 lg:gap-5">
          {features.map((feature, i) => {
            const Icon = feature.icon;
            return (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.38, delay: i * 0.08, ease: [0.25, 0.1, 0.25, 1] }}
                className="glass-card-hover rounded-xl p-5 sm:p-6"
              >
                {/* Icon box */}
                <div
                  className="w-10 h-10 sm:w-11 sm:h-11 rounded-xl mb-4
                    flex items-center justify-center"
                  style={{
                    background: "linear-gradient(135deg, rgba(99,102,241,0.12), rgba(168,85,247,0.12))",
                    border: "1px solid rgba(99,102,241,0.15)",
                  }}
                >
                  <Icon
                    size={20}
                    style={{ color: "var(--color-feature-icon)" }}
                  />
                </div>
                <h3
                  className="text-sm sm:text-[0.9375rem] font-semibold mb-2"
                  style={{ color: "var(--color-text-white)" }}
                >
                  {feature.title}
                </h3>
                <p
                  className="text-xs sm:text-sm leading-relaxed"
                  style={{ color: "var(--color-text-secondary)" }}
                >
                  {feature.desc}
                </p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
