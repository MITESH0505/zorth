"use client";

import { Star, Clock, Calendar, Play} from "lucide-react";
import HoverBorderGradient from "@/components/ui/hover-border-gradient";

const VIDEO_URL =
  "https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260406_094145_4a271a6c-3869-4f1c-8aa7-aeb0cb227994.mp4";

interface CinematicHeroProps {
  onSearchOpen?: () => void;
}

export default function CinematicHero({ onSearchOpen }: CinematicHeroProps) {
  return (
    <section
      id="home"
      className="relative w-full overflow-hidden"
      style={{ height: "100svh", minHeight: "600px" }}
    >
      {/* ── Background video ── */}
      <video
        src={VIDEO_URL}
        autoPlay
        loop
        muted
        playsInline
        className="absolute inset-0 w-full h-full object-cover"
        style={{ zIndex: 0 }}
      />

      {/* ── Dark vignette — keeps text readable without gradient ── */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          zIndex: 1,
          background: "linear-gradient(to top, rgba(0,0,0,0.72) 0%, rgba(0,0,0,0.18) 40%, rgba(0,0,0,0.05) 100%)",
        }}
      />

      {/* ── Bottom blur overlay (mask: visible at bottom, fades upward) ── */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          zIndex: 2,
          backdropFilter: "blur(20px)",
          WebkitBackdropFilter: "blur(20px)",
          maskImage: "linear-gradient(to top, black 0%, transparent 45%)",
          WebkitMaskImage: "linear-gradient(to top, black 0%, transparent 45%)",
        }}
      />

      {/* ── Hero content — anchored to bottom ── */}
      <div
        className="absolute inset-0 flex flex-col justify-end"
        style={{ zIndex: 10 }}
      >
        <div className="px-4 sm:px-6 md:px-12 pb-8 md:pb-16">
          <div className="flex flex-col md:flex-row md:items-end gap-8">

            {/* ── Left: Copy ── */}
            <div className="flex-1">

              {/* Metadata row */}
              <div
                className="flex flex-wrap items-center gap-3 sm:gap-6 mb-6 md:mb-8 text-white animate-blur-fade-up"
                style={{ animationDelay: "300ms", fontSize: "0.75rem" }}
              >
                <span className="flex items-center gap-1.5 font-medium">
                  <Star
                    size={16}
                    className="fill-white sm:w-5 sm:h-5"
                    style={{ flexShrink: 0 }}
                  />
                  <span className="text-xs sm:text-sm">400+ Resources</span>
                </span>
                <span className="flex items-center gap-1.5 text-white/70">
                  <Clock size={16} style={{ flexShrink: 0 }} />
                  <span className="text-xs sm:text-sm">12 Categories</span>
                </span>
                <span className="flex items-center gap-1.5 text-white/70">
                  <Calendar size={16} style={{ flexShrink: 0 }} />
                  <span className="text-xs sm:text-sm">Always Free</span>
                </span>
              </div>

              {/* Title */}
              <h1
                className="text-white font-normal mb-4 md:mb-6 animate-blur-fade-up"
                style={{
                  fontSize: "clamp(2rem, 6vw, 5rem)",
                  letterSpacing: "-0.04em",
                  lineHeight: 1.05,
                  animationDelay: "400ms",
                }}
              >
                Discover Beyond Algorithms.
              </h1>

              {/* Description */}
              <p
                className="text-gray-400 mb-6 md:mb-12 max-w-2xl animate-blur-fade-up"
                style={{
                  fontSize: "clamp(1rem, 1.5vw, 1.25rem)",
                  animationDelay: "500ms",
                }}
              >
                A premium discovery platform for streaming, AI tools, software,
                knowledge, and digital culture — curated, not algorithmic.
              </p>

              {/* CTA buttons */}
              <div className="flex flex-wrap items-center gap-3 sm:gap-4">
                <button
                  onClick={onSearchOpen}
                  className="flex items-center gap-2 bg-white text-black rounded-full font-medium px-6 sm:px-8 py-2.5 sm:py-3 hover:bg-gray-200 transition-colors duration-200 animate-blur-fade-up cursor-pointer"
                  style={{ animationDelay: "600ms" }}
                >
                  <Play size={18} className="fill-black" />
                  Explore Now
                </button>
                <HoverBorderGradient
                  onClick={() =>
                    document.getElementById("categories")?.scrollIntoView({ behavior: "smooth" })
                  }
                  className="px-6 sm:px-8 py-2.5 sm:py-3 animate-blur-fade-up"
                  style={{ animationDelay: "700ms" }}
                >
                  Browse Categories
                </HoverBorderGradient>
              </div>
            </div>

            {/* ── Right: Prev / Next arrows ── */}
            {/* <div
              className="flex items-center gap-3 md:flex-col md:gap-3 md:items-end"
            >
              <button
                className=" liquid-glass rounded-full text-white flex items-center gap-2 px-4 sm:px-6 py-2.5 sm:py-3 animate-blur-fade-up cursor-pointer"
                style={{ animationDelay: "800ms" }}
                aria-label="Previous"
              >
                <ChevronLeft size={18} />
                <span className="hidden sm:inline text-sm font-medium">Previous</span>
              </button>
              <button
                className=" liquid-glass rounded-full text-white flex items-center gap-2 px-4 sm:px-6 py-2.5 sm:py-3 animate-blur-fade-up cursor-pointer"
                style={{ animationDelay: "900ms" }}
                aria-label="Next"
              >
                <span className="hidden sm:inline text-sm font-medium">Next</span>
                <ChevronRight size={18} />
              </button>
            </div> */}

          </div>
        </div>
      </div>
    </section>
  );
}
