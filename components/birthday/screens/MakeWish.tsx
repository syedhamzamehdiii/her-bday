"use client";

import { motion } from "framer-motion";
import MotionButton from "@/components/ui/MotionButton";
import Sparkles from "@/components/birthday/ornaments/Sparkles";

export default function MakeWish({ onContinue }: { onContinue: () => void }) {
  return (
    <div style={{ position: "relative" }}>
      <Sparkles />

      <p className="subtitle" style={{ margin: 0 }}>
        Close your eyes… make a wish you’d never be afraid to say out loud.
      </p>

      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
        style={{
          marginTop: 14,
          borderRadius: 18,
          border: "1px solid rgba(42,36,51,.12)",
          background:
            "linear-gradient(135deg, rgba(255,94,168,.12), rgba(179,140,255,.10), rgba(124,199,255,.08))",
          boxShadow: "0 14px 34px rgba(42,36,51,.10)",
          padding: 14,
          position: "relative",
          overflow: "hidden"
        }}
      >
        <motion.div
          aria-hidden="true"
          style={{
            position: "absolute",
            inset: -80,
            background:
              "radial-gradient(circle at 30% 35%, rgba(255,125,184,.35), transparent 60%), radial-gradient(circle at 70% 65%, rgba(179,140,255,.30), transparent 60%)"
          }}
          animate={{ rotate: [0, 6, 0] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        />

        <div style={{ position: "relative" }}>
          <div
            className="title"
            style={{ fontFamily: "var(--font-playfair)", fontSize: 18 }}
          >
            Make a Wish ✨
          </div>
          <div className="subtitle" style={{ marginTop: 8 }}>
            Promise me you’ll be gentle with yourself today. You deserve the kind
            of love that feels like peace.
          </div>
        </div>
      </motion.div>

      <div className="btnRow">
        <MotionButton wide variant="primary" onClick={onContinue}>
          I’ve Made My Wish ✨
        </MotionButton>
      </div>
    </div>
  );
}


