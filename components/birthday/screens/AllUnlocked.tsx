"use client";

import { motion } from "framer-motion";
import MotionButton from "@/components/ui/MotionButton";

export default function AllUnlocked({
  opened,
  total,
  onContinue
}: {
  opened: number;
  total: number;
  onContinue: () => void;
}) {
  return (
    <div>
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
        style={{
          marginTop: 6,
          borderRadius: 18,
          border: "1px solid rgba(42,36,51,.12)",
          background:
            "linear-gradient(135deg, rgba(255,94,168,.14), rgba(179,140,255,.12), rgba(124,199,255,.10))",
          boxShadow: "0 16px 40px rgba(42,36,51,.10)",
          padding: 14
        }}
      >
        <div className="title" style={{ fontFamily: "var(--font-playfair)" }}>
          All Birthday Wishes Unlocked 🎉
        </div>
        <p className="subtitle" style={{ marginTop: 8 }}>
          You opened <b>{Math.min(opened, total)}</b> of <b>{total}</b> wishes. Now… there’s one
          last thing waiting for you.
        </p>
      </motion.div>

      <div className="btnRow">
        <MotionButton wide variant="primary" onClick={onContinue}>
          Open Final Birthday Letter 💌
        </MotionButton>
      </div>
    </div>
  );
}


