"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useMemo, useState } from "react";
import MotionButton from "@/components/ui/MotionButton";

type Msg = {
  id: string;
  text: string;
  fromMe?: boolean;
  hint?: string;
};

export default function ChatIntro({ onContinue }: { onContinue: () => void }) {
  const messages = useMemo<Msg[]>(
    () => [
      { id: "m1", text: "I have something special for you ❤️", fromMe: true },
      { id: "m2", text: "Close your eyes for a second… and breathe.", fromMe: true },
      { id: "m3", text: "Okay… open them 🥺", fromMe: true, hint: "tap continue when you’re ready" },
      { id: "m4", text: "Check this ✨", fromMe: true }
    ],
    []
  );

  const [shown, setShown] = useState(0);

  useEffect(() => {
    if (shown >= messages.length) return;
    const t = window.setTimeout(() => setShown((n) => n + 1), shown === 0 ? 650 : 900);
    return () => window.clearTimeout(t);
  }, [shown, messages.length]);

  const visible = messages.slice(0, shown);
  const ready = shown >= messages.length;

  return (
    <div>
      <p className="subtitle" style={{ margin: 0 }}>
        A tiny chat… before the surprise.
      </p>

      <div className="chat" style={{ marginTop: 12 }}>
        <AnimatePresence initial={false}>
          {visible.map((m) => (
            <motion.div
              key={m.id}
              initial={{ opacity: 0, y: 10, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
              className={`bubble ${m.fromMe ? "bubbleMe" : ""}`}
            >
              <div>{m.text}</div>
              {m.hint ? <div className="bubbleHint" style={{ marginTop: 6 }}>{m.hint}</div> : null}
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      <div className="btnRow">
        <MotionButton
          wide
          variant="primary"
          onClick={onContinue}
          disabled={!ready}
          aria-disabled={!ready}
          style={{
            opacity: ready ? 1 : 0.55,
            cursor: ready ? "pointer" : "not-allowed"
          }}
        >
          Continue 💗
        </MotionButton>
      </div>
    </div>
  );
}


