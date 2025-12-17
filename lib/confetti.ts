"use client";

import confetti from "canvas-confetti";

export function fireConfettiBurst() {
  const defaults = {
    origin: { y: 0.72 },
    spread: 70,
    ticks: 120,
    gravity: 0.95,
    scalar: 0.9
  };

  void confetti({
    ...defaults,
    particleCount: 90,
    colors: ["#ff5ea8", "#b38cff", "#7cc7ff", "#7de7c8", "#ffd36b", "#ffffff"]
  });

  void confetti({
    ...defaults,
    particleCount: 45,
    spread: 110,
    startVelocity: 38,
    scalar: 0.75
  });
}


