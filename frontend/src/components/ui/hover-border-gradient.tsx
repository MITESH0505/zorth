"use client";

import { useRef, useState } from "react";
import { motion } from "framer-motion";
import { clsx } from "clsx";

interface HoverBorderGradientProps {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
  style?: React.CSSProperties;
}

export default function HoverBorderGradient({
  children,
  className,
  onClick,
  style,
}: HoverBorderGradientProps) {
  const [isHovered, setIsHovered] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 0.5, y: 0.5 });
  const ref = useRef<HTMLButtonElement>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    setMousePos({
      x: (e.clientX - rect.left) / rect.width,
      y: (e.clientY - rect.top) / rect.height,
    });
  };

  return (
    <motion.button
      ref={ref}
      onClick={onClick}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={clsx(
        "relative overflow-hidden rounded-full font-medium text-white cursor-pointer",
        "bg-black/50 backdrop-blur-sm",
        className
      )}
      style={style}
      whileHover={{ scale: 1.02 }}
      transition={{ duration: 0.3, ease: "easeOut" }}
    >
      {/* Subtle static ambient glow (idle) */}
      <span
        className="absolute inset-0 rounded-full pointer-events-none"
        style={{
          background: "radial-gradient(circle at 50% 50%, rgba(180,200,255,0.05) 0%, transparent 70%)",
          opacity: isHovered ? 0 : 1,
          transition: "opacity 0.4s ease",
        }}
      />

      {/* Gradient border ring — visible at low opacity in idle, full + animated on hover */}
      <span
        className="absolute inset-0 rounded-full pointer-events-none"
        style={{
          padding: "1.2px",
          background: "linear-gradient(135deg, rgba(255,255,255,0.35), rgba(180,200,255,0.15), rgba(255,255,255,0.35))",
          backgroundSize: "200% 200%",
          WebkitMask: "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
          WebkitMaskComposite: "xor",
          maskComposite: "exclude",
          opacity: isHovered ? 1 : 0.2,
          transition: "opacity 0.3s ease",
          animation: isHovered ? "borderRotate 2s linear infinite" : "none",
        }}
      />

      {/* Cursor-driven ambient glow (hover only) */}
      <motion.span
        className="absolute inset-0 pointer-events-none rounded-full"
        style={{
          background: `radial-gradient(circle at ${mousePos.x * 100}% ${mousePos.y * 100}%, rgba(180, 200, 255, 0.08) 0%, transparent 60%)`,
        }}
        animate={{ opacity: isHovered ? 1 : 0 }}
        transition={{ duration: 0.4 }}
      />

      <span className="relative z-10">{children}</span>
    </motion.button>
  );
}
