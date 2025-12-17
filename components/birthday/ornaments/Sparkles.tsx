"use client";

import { motion } from "framer-motion";
import { useMemo } from "react";

type Spark = {
  id: string;
  left: string;
  top: string;
  delay: number;
  duration: number;
  size: number;
  char: string;
  opacity: number;
};

function rand(min: number, max: number) {
  return Math.random() * (max - min) + min;
}

export default function Sparkles() {
  const sparks = useMemo<Spark[]>(() => {
    const chars = ["✨", "✦", "✧", "⋆"];
    return Array.from({ length: 14 }).map((_, i) => ({
      id: `s_${i}`,
      left: `${rand(6, 94)}%`,
      top: `${rand(10, 92)}%`,
      delay: rand(0, 1.8),
      duration: rand(2.8, 4.2),
      size: rand(12, 18),
      char: chars[Math.floor(rand(0, chars.length))]!,
      opacity: rand(0.18, 0.34)
    }));
  }, []);

  return (
    <div className="sparkleLayer" aria-hidden="true">
      {sparks.map((s) => (
        <motion.div
          key={s.id}
          style={{
            position: "absolute",
            left: s.left,
            top: s.top,
            fontSize: s.size,
            opacity: s.opacity
          }}
          animate={{ opacity: [s.opacity, s.opacity + 0.22, s.opacity], scale: [1, 1.18, 1] }}
          transition={{
            duration: s.duration,
            delay: s.delay,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        >
          {s.char}
        </motion.div>
      ))}
    </div>
  );
}


