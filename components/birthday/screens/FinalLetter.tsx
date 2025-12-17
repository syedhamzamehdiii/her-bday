"use client";

import { AnimatePresence, motion } from "framer-motion";
import MotionButton from "@/components/ui/MotionButton";
import Sparkles from "@/components/birthday/ornaments/Sparkles";

const LETTER = `Happy Birthday, my Madam Maham Saeeeed sahibaaaa ❤️

This year didn’t go exactly the way I dreamed it would. There were so many things I wanted to do for you, so many plans in my heart that stayed unfinished. But even in the middle of all that, one thing never changed — how deeply grateful I am for you. Your presence, your patience, your care, and the quiet way you stay… that means more to me than words can ever fully explain.

You bring comfort where there is chaos, light where things feel heavy, and calm when my world feels unsure. I know this birthday may not look grand or perfect, but please know this: my feelings for you are real, steady, and growing stronger every day. This little surprise is a small gift from my heart — a reminder that even when I can’t do much, I still choose you, always.

I promise you this — next year, I will plan everything better. I will make up for every missed moment, every unspoken celebration, and every quiet wish. You deserve happiness that overflows, love that never feels uncertain, and days that smile back at you just the way you make others smile.

May this new year of your life bring you peace, laughter, and everything your heart silently wishes for. And may you always know how special you are to me — today, tomorrow, and always.

Happy Birthday once again, my Madam Maham Saeeeed sahibaaaa 💖🎂`;

export default function FinalLetter({
  sealed,
  onSeal,
  onRestart
}: {
  sealed: boolean;
  onSeal: () => void;
  onRestart: () => void;
}) {
  return (
    <div style={{ position: "relative" }}>
      <Sparkles />

      <p className="subtitle" style={{ margin: 0 }}>
        Take your time. This one is meant to be read slowly.
      </p>

      <div className="letterPaper" style={{ position: "relative" }}>
        <AnimatePresence mode="wait">
          {!sealed ? (
            <motion.div
              key="open"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
            >
              <div
                className="title"
                style={{
                  fontFamily: "var(--font-playfair)",
                  fontSize: 19,
                  marginBottom: 10
                }}
              >
                For the one last time 💌
              </div>
              <div className="letterText">{LETTER}</div>
              <div className="sig">—With all my love. 
                <p>Your Panda 🐼</p>
                <p>XX</p>
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="sealed"
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ type: "spring", stiffness: 240, damping: 20 }}
              style={{ textAlign: "center", padding: "18px 8px" }}
            >
              <div
                className="title"
                style={{ fontFamily: "var(--font-playfair)", fontSize: 20 }}
              >
                Sealed with love 💖
              </div>
              <p className="subtitle" style={{ marginTop: 8 }}>
                Keep this close. Whenever you need it, open it again in your heart.
              </p>

              <motion.div
                aria-hidden="true"
                animate={{ y: [0, -6, 0], rotate: [0, 4, -4, 0] }}
                transition={{ duration: 3.6, repeat: Infinity, ease: "easeInOut" }}
                style={{ fontSize: 46, marginTop: 10 }}
              >
                💌
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {!sealed ? (
          <motion.div
            aria-hidden="true"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.15 }}
            style={{
              position: "absolute",
              right: 10,
              top: 10,
              padding: "6px 10px",
              borderRadius: 999,
              border: "1px solid rgba(42,36,51,.10)",
              background: "rgba(255,255,255,.55)",
              fontSize: 12,
              color: "rgba(42,36,51,.7)",
              fontWeight: 750
            }}
          >
          </motion.div>
        ) : null}
      </div>

      <div className="btnRow">
        {!sealed ? (
          <MotionButton wide variant="primary" onClick={onSeal}>
            Seal the Letter 💖
          </MotionButton>
        ) : (
          <MotionButton wide variant="primary" onClick={onRestart}>
            Experience Again ✨
          </MotionButton>
        )}

        <MotionButton variant="ghost" onClick={onRestart}>
          Start over ↺
        </MotionButton>
      </div>
    </div>
  );
}


