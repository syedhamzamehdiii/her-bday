"use client";

import { motion } from "framer-motion";
import { useMemo } from "react";

type Heart = {
  id: string;
  left: string;
  top: string;
  size: number;
  delay: number;
  duration: number;
  opacity: number;
};

function rand(min: number, max: number) {
  return Math.random() * (max - min) + min;
}

export default function FloatingHearts() {
  const hearts = useMemo<Heart[]>(() => {
    const n = 10;
    return Array.from({ length: n }).map((_, i) => {
      const size = rand(10, 18);
      return {
        id: `h_${i}`,
        left: `${rand(6, 94)}%`,
        top: `${rand(8, 88)}%`,
        size,
        delay: rand(0, 1.4),
        duration: rand(6.8, 10.5),
        opacity: rand(0.12, 0.22)
      };
    });
  }, []);

  return (
    <div className="sparkleLayer" aria-hidden="true">
      {hearts.map((h) => (
        <motion.div
          key={h.id}
          style={{
            position: "absolute",
            left: h.left,
            top: h.top,
            fontSize: h.size,
            opacity: h.opacity,
            filter: "blur(0px)"
          }}
          animate={{
            y: [0, -14, 0],
            x: [0, 6, 0],
            rotate: [0, 6, -6, 0]
          }}
          transition={{
            duration: h.duration,
            delay: h.delay,
            ease: "easeInOut",
            repeat: Infinity
          }}
        >
          💗
        </motion.div>
      ))}
    </div>
  );
}


