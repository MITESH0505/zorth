"use client";

import { motion } from "framer-motion";
import { Github, Upload, MessageCircle, Users } from "lucide-react";

const stats = [
  { label: "Curated Resources", value: "400+" },
  { label: "Categories",        value: "12"   },
  { label: "Monthly Visitors",  value: "50K+" },
  { label: "Contributors",      value: "200+" },
];

export default function CommunitySection() {
  return (
    <section id="contribute" className="section-py relative overflow-hidden">
      <div
        className="glow-orb
          w-80 h-80 sm:w-[440px] sm:h-[440px]
          bg-purple-500/5
          top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
      />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.45 }}
          className="rounded-2xl sm:rounded-3xl p-6 sm:p-8 md:p-10 lg:p-12
            text-center max-w-4xl mx-auto"
          style={{
            backgroundColor: "var(--color-surface-elevated)",
            border: "1px solid var(--color-border)",
            backdropFilter: "blur(24px)",
          }}
        >
          {/* Icon */}
          <div
            className="inline-flex items-center justify-center
              w-12 h-12 sm:w-14 sm:h-14 lg:w-16 lg:h-16
              rounded-2xl mb-4 sm:mb-5 lg:mb-6"
            style={{
              background: "linear-gradient(135deg, rgba(99,102,241,0.18), rgba(168,85,247,0.18))",
            }}
          >
            <Users
              size={22}
              style={{ color: "var(--color-feature-icon)" }}
            />
          </div>

          <h2
            className="font-bold mb-3 sm:mb-4
              text-xl sm:text-2xl lg:text-3xl
              tracking-tight"
            style={{ color: "var(--color-text-white)" }}
          >
            Join the Community
          </h2>

          <p
            className="text-sm sm:text-base max-w-2xl mx-auto
              mb-6 sm:mb-8 lg:mb-10 leading-relaxed"
            style={{ color: "var(--color-text-secondary)" }}
          >
            Zorth is maintained by a community of enthusiasts. Contribute by
            suggesting new resources, reporting broken links, or helping us
            organize the directory better.
          </p>

          {/* Stats — 2 col on mobile, 4 col on sm+ */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-6 mb-8 sm:mb-10 lg:mb-12">
            {stats.map((stat) => (
              <div key={stat.label} className="space-y-1">
                <div className="text-2xl sm:text-3xl lg:text-4xl font-bold gradient-text tabular-nums">
                  {stat.value}
                </div>
                <div
                  className="text-[11px] sm:text-xs leading-snug"
                  style={{ color: "var(--color-text-tertiary)" }}
                >
                  {stat.label}
                </div>
              </div>
            ))}
          </div>

          {/* CTA buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-2.5 sm:gap-3">
            <a
              href="https://github.com"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary w-full sm:w-auto"
            >
              <Github size={15} />
              Contribute on GitHub
            </a>
            <a href="#" className="btn-secondary w-full sm:w-auto">
              <Upload size={15} />
              Suggest a Resource
            </a>
            <a href="#" className="btn-secondary w-full sm:w-auto">
              <MessageCircle size={15} />
              Join Discussion
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
