"use client";
import React, { useRef, useEffect, useState } from "react";
import { motion } from "motion/react";


export const TextHoverEffect = ({
  text,
  duration,
  className,
}: {
  text: string;
  duration?: number;
  automatic?: boolean;
  className?: string;
}) => {
  const svgRef = useRef<SVGSVGElement>(null);
  const [cursor, setCursor] = useState({ x: 0, y: 0 });
  const [hovered, setHovered] = useState(false);
  const [maskPosition, setMaskPosition] = useState({ cx: "50%", cy: "50%" });

  useEffect(() => {
    if (svgRef.current && cursor.x !== null && cursor.y !== null) {
      const svgRect = svgRef.current.getBoundingClientRect();
      const cxPercentage = ((cursor.x - svgRect.left) / svgRect.width) * 100;
      const cyPercentage = ((cursor.y - svgRect.top) / svgRect.height) * 100;
      setMaskPosition({
        cx: `${cxPercentage}%`,
        cy: `${cyPercentage}%`,
      });
    }
  }, [cursor]);

  return (
    <svg
      ref={svgRef}
      width="100%"
      height="100%"
      viewBox="0 0 300 100"
      xmlns="http://www.w3.org/2000/svg"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onMouseMove={(e) => setCursor({ x: e.clientX, y: e.clientY })}
      className={"select-none uppercase cursor-pointer " + (className || "")}
    >
      <defs>
        {/* Soft monochrome white → warm gray gradient (strictly no blue) */}
        <linearGradient
          id="zorthTextGradient"
          gradientUnits="userSpaceOnUse"
          cx="50%"
          cy="50%"
          r="25%"
        >
          {hovered && (
            <>
              <stop offset="0%"   stopColor="#ffffff" />
              <stop offset="25%"  stopColor="#f5f5f5" />
              <stop offset="50%"  stopColor="#e5e5e5" />
              <stop offset="75%"  stopColor="#c4c4c4" />
              <stop offset="100%" stopColor="#a3a3a3" />
            </>
          )}
        </linearGradient>

        {/* Reveal mask — slightly wider radius for a softer falloff */}
        <motion.radialGradient
          id="zorthRevealMask"
          gradientUnits="userSpaceOnUse"
          r="22%"
          initial={{ cx: "50%", cy: "50%" }}
          animate={maskPosition}
          transition={{ duration: duration ?? 0, ease: "easeOut" }}
        >
          <stop offset="0%"   stopColor="white" />
          <stop offset="100%" stopColor="black" />
        </motion.radialGradient>

        <mask id="zorthTextMask">
          <rect
            x="0"
            y="0"
            width="100%"
            height="100%"
            fill="url(#zorthRevealMask)"
          />
        </mask>

        {/* Soft white glow filter — used to give the stroke a premium halo */}
        <filter id="zorthSoftGlow" x="-20%" y="-20%" width="140%" height="140%">
          <feGaussianBlur stdDeviation="0.9" result="softBlur" />
          <feMerge>
            <feMergeNode in="softBlur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>

        {/* Cursor-following radial spotlight — subtle, monochrome */}
        <motion.radialGradient
          id="zorthSpotlight"
          gradientUnits="userSpaceOnUse"
          r="35%"
          initial={{ cx: "50%", cy: "50%" }}
          animate={maskPosition}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          <stop offset="0%"   stopColor="rgba(255,255,255,0.18)" />
          <stop offset="60%"  stopColor="rgba(255,255,255,0.04)" />
          <stop offset="100%" stopColor="rgba(255,255,255,0)" />
        </motion.radialGradient>
      </defs>

      {/* Cursor spotlight wash (only visible while hovering) */}
      <rect
        x="0"
        y="0"
        width="100%"
        height="100%"
        fill="url(#zorthSpotlight)"
        style={{
          opacity: hovered ? 1 : 0,
          transition: "opacity 700ms cubic-bezier(0.22,1,0.36,1)",
          pointerEvents: "none",
        }}
      />

      {/* Faint outline layer — visible only on hover, gives the type body */}
      <text
        x="50%"
        y="50%"
        textAnchor="middle"
        dominantBaseline="middle"
        strokeWidth="0.3"
        className="fill-transparent stroke-neutral-700 font-[helvetica] text-7xl font-bold dark:stroke-neutral-800"
        style={{
          opacity: hovered ? 0.55 : 0,
          transition: "opacity 500ms cubic-bezier(0.22,1,0.36,1)",
        }}
      >
        {text}
      </text>

      {/* Animated draw-on stroke with soft white glow halo */}
      <motion.text
        x="50%"
        y="50%"
        textAnchor="middle"
        dominantBaseline="middle"
        strokeWidth="0.3"
        filter="url(#zorthSoftGlow)"
        className="fill-transparent font-[helvetica] text-7xl font-bold"
        style={{ stroke: "rgba(255,255,255,0.38)" }}
        initial={{ strokeDashoffset: 1000, strokeDasharray: 1000, opacity: 0 }}
        animate={{
          strokeDashoffset: 0,
          strokeDasharray: 1000,
          opacity: 1,
        }}
        transition={{
          strokeDashoffset: { duration: 4.5, ease: [0.22, 1, 0.36, 1] },
          opacity: { duration: 1.2, ease: "easeOut" },
        }}
      >
        {text}
      </motion.text>

      {/* Gradient reveal layer on hover (soft white wash following cursor) */}
      <text
        x="50%"
        y="50%"
        textAnchor="middle"
        dominantBaseline="middle"
        stroke="url(#zorthTextGradient)"
        strokeWidth="0.3"
        mask="url(#zorthTextMask)"
        className="fill-transparent font-[helvetica] text-7xl font-bold"
      >
        {text}
      </text>
    </svg>
  );
};

export const FooterBackgroundGradient = () => {
  return (
    <div
      className="absolute inset-0 z-0 pointer-events-none"
      style={{
        background:
          "radial-gradient(125% 125% at 50% 10%, rgba(10,10,14,0.92) 50%, rgba(255,255,255,0.05) 100%)",
      }}
    />
  );
};
