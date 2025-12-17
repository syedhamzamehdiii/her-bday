"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import MotionButton from "@/components/ui/MotionButton";

export default function EnvelopeReveal({ onContinue }: { onContinue: () => void }) {
  const [open, setOpen] = useState(false);

  return (
    <div>
      <p className="subtitle" style={{ margin: 0 }}>
        Tap the envelope to open it… there’s a soft little letter inside.
      </p>

      <div className="envelopeWrap">
        <motion.button
          type="button"
          onClick={() => setOpen(true)}
          className="envelope"
          aria-label="Open envelope"
          style={{ cursor: open ? "default" : "pointer", padding: 0 }}
          whileTap={!open ? { scale: 0.99 } : undefined}
        >
          <div className="envBody" />

          {/* letter */}
          <motion.div
            className="letter"
            initial={false}
            animate={{
              y: open ? -56 : 0,
              opacity: 1
            }}
            transition={{ type: "spring", stiffness: 180, damping: 18 }}
          >
            <div className="letterLines" />
            <motion.div
              initial={false}
              animate={{ opacity: open ? 1 : 0, y: open ? 0 : 8 }}
              transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1], delay: open ? 0.12 : 0 }}
              style={{
                position: "absolute",
                inset: 12,
                display: "grid",
                placeItems: "center",
                textAlign: "center",
                color: "rgba(42,36,51,.92)",
                fontFamily: "var(--font-playfair)",
                fontWeight: 800,
                fontSize: 16,
                lineHeight: 1.25,
                textShadow: "0 10px 30px rgba(42,36,51,.12)"
              }}
            >
              Happy Birthday My Princess. 👸🏻🫀
            </motion.div>
          </motion.div>

          {/* flap */}
          <motion.div
            className="envFlap"
            initial={false}
            animate={{ rotateX: open ? 160 : 0 }}
            transition={{ type: "spring", stiffness: 190, damping: 16 }}
            style={{
              boxShadow: open ? "0 18px 30px rgba(42,36,51,.08)" : "none"
            }}
          />

          <div className="envBottom" />

          {/* seal */}
          <motion.div
            initial={false}
            animate={{
              scale: open ? 0.86 : 1,
              opacity: open ? 0 : 1
            }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            style={{
              position: "absolute",
              left: "50%",
              top: "54%",
              transform: "translate(-50%, -50%)",
              width: 44,
              height: 44,
              borderRadius: 999,
              background:
                "linear-gradient(135deg, rgba(255,94,168,.95), rgba(179,140,255,.92))",
              boxShadow: "0 12px 26px rgba(255,94,168,.22)",
              border: "1px solid rgba(255,255,255,.55)",
              display: "grid",
              placeItems: "center",
              color: "white",
              fontWeight: 900
            }}
          >
            ❤
          </motion.div>
        </motion.button>
      </div>

      <div className="btnRow">
        <MotionButton
          wide
          variant="primary"
          onClick={onContinue}
          disabled={!open}
          aria-disabled={!open}
          style={{
            opacity: open ? 1 : 0.55,
            cursor: open ? "pointer" : "not-allowed"
          }}
        >
          Read the next surprise 💌
        </MotionButton>
      </div>
    </div>
  );
}


