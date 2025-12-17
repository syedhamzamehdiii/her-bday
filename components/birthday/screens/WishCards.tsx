"use client";

import { motion } from "framer-motion";
import { useEffect, useMemo, useRef, useState } from "react";

type Wish = {
  id: string;
  frontTitle: string;
  frontHint: string;
  backTitle: string;
  backText: string;
};

export default function WishCards({
  total,
  onProgress,
  onAllOpened
}: {
  total: number;
  onProgress: (opened: number) => void;
  onAllOpened: () => void;
}) {
  const wishes = useMemo<Wish[]>(
    () => [
      {
        id: "w1",
        frontTitle: "Wish #1",
        frontHint: "Tap to flip 💗",
        backTitle: "Your smile",
        backText:
          "May your smile stay loud, warm, and effortless — the kind that makes the world softer."
      },
      {
        id: "w2",
        frontTitle: "Wish #2",
        frontHint: "Tap to flip ✨",
        backTitle: "Your dreams",
        backText:
          "May every dream you whisper to the night find a way back to you — as something real."
      },
      {
        id: "w3",
        frontTitle: "Wish #3",
        frontHint: "Tap to flip 🌙",
        backTitle: "Your peace",
        backText:
          "May you always feel safe, chosen, and loved — not just today, but in every small moment."
      }
    ],
    []
  );

  const [flipped, setFlipped] = useState<Record<string, boolean>>({});
  const [unlocked, setUnlocked] = useState<Record<string, boolean>>({});
  const [unlockAt, setUnlockAt] = useState<number | null>(null);
  const [remainingSec, setRemainingSec] = useState<number>(0);
  const firedRef = useRef(false);

  const openedCount = Object.values(unlocked).filter(Boolean).length;

  useEffect(() => {
    onProgress(openedCount);
  }, [openedCount, onAllOpened, onProgress, total]);

  // Delay navigation after the final card unlocks so the user can actually read it.
  useEffect(() => {
    const delayMs = 10_000;
    if (openedCount < total) {
      setUnlockAt(null);
      setRemainingSec(0);
      firedRef.current = false;
      return;
    }
    if (!unlockAt) setUnlockAt(Date.now() + delayMs);
  }, [openedCount, total, unlockAt]);

  useEffect(() => {
    if (!unlockAt || firedRef.current) return;
    const tick = window.setInterval(() => {
      const ms = unlockAt - Date.now();
      setRemainingSec(Math.max(0, Math.ceil(ms / 1000)));
    }, 250);

    const t = window.setTimeout(() => {
      firedRef.current = true;
      onAllOpened();
    }, Math.max(0, unlockAt - Date.now()));

    return () => {
      window.clearInterval(tick);
      window.clearTimeout(t);
    };
  }, [unlockAt, onAllOpened]);

  return (
    <div>
      <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
        <p className="subtitle" style={{ margin: 0 }}>
          My wishes for you 💗
        </p>
        <div style={{ marginLeft: "auto" }}>
          <span className="pill">
            {Math.min(openedCount, total)} of {total} wishes unlocked
          </span>
        </div>
      </div>

      {openedCount >= total ? (
        <div style={{ marginTop: 10 }}>
          <span className="pill">
            All unlocked 💖 staying here for {remainingSec || 30}s so you can read…
          </span>
        </div>
      ) : null}

      <div className="cardGrid">
        {wishes.slice(0, total).map((w, idx) => {
          const isFlipped = !!flipped[w.id];
          const isUnlocked = !!unlocked[w.id];
          return (
            <motion.button
              key={w.id}
              type="button"
              className="flipCard"
              onClick={() =>
                setFlipped((prev) => {
                  const next = !prev[w.id];
                  if (next) setUnlocked((u) => ({ ...u, [w.id]: true }));
                  return { ...prev, [w.id]: next };
                })
              }
              whileTap={{ scale: 0.99 }}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.35, delay: 0.05 * idx }}
              style={{ cursor: "pointer", padding: 0, textAlign: "left" }}
              aria-label={`Open ${w.frontTitle}`}
            >
              <motion.div
                className="flipInner"
                initial={false}
                animate={{ rotateY: isFlipped ? 180 : 0 }}
                transition={{ type: "spring", stiffness: 220, damping: 20 }}
              >
                <div className="flipFace">
                  <div className="flipFrontTitle">{w.frontTitle}</div>
                  <div className="flipSmall">{w.frontHint}</div>
                  <div
                    className="pill"
                    style={{ alignSelf: "flex-start", marginTop: 4 }}
                  >
                    {isUnlocked ? "unlocked" : "locked"} {isUnlocked ? "🔓" : "🔒"}
                  </div>
                </div>

                <div className="flipFace flipBack">
                  <div
                    className="title"
                    style={{ fontFamily: "var(--font-playfair)", fontSize: 18 }}
                  >
                    {w.backTitle}
                  </div>
                  <div className="flipSmall" style={{ color: "rgba(42,36,51,.82)" }}>
                    {w.backText}
                  </div>
                </div>
              </motion.div>
            </motion.button>
          );
        })}
      </div>
    </div>
  );
}


