"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useMemo, useState } from "react";
import ChatIntro from "@/components/birthday/screens/ChatIntro";
import EnvelopeReveal from "@/components/birthday/screens/EnvelopeReveal";
import CakeCut from "@/components/birthday/screens/CakeCut";
import MakeWish from "@/components/birthday/screens/MakeWish";
import WishNote from "@/components/birthday/screens/WishNote";
import WishCards from "@/components/birthday/screens/WishCards";
import AllUnlocked from "@/components/birthday/screens/AllUnlocked";
import FinalLetter from "@/components/birthday/screens/FinalLetter";
import FloatingHearts from "@/components/birthday/ornaments/FloatingHearts";

type Step =
  | "chat"
  | "envelope"
  | "cake"
  | "wish"
  | "wishNote"
  | "cards"
  | "unlocked"
  | "final";

const pageVariants = {
  initial: { opacity: 0, y: 14, scale: 0.995, filter: "blur(2px)" },
  animate: { opacity: 1, y: 0, scale: 1, filter: "blur(0px)" },
  exit: { opacity: 0, y: -12, scale: 0.995, filter: "blur(2px)" }
};

export default function BirthdayExperience() {
  const [step, setStep] = useState<Step>("chat");
  const [cardsOpened, setCardsOpened] = useState<number>(0);
  const [sealed, setSealed] = useState(false);

  const totalCards = 3;

  const title = useMemo(() => {
    switch (step) {
      case "chat":
        return "Messages 💬";
      case "envelope":
        return "A little envelope ✉️";
      case "cake":
        return "Cake time 🎂";
      case "wish":
        return "Make a wish ✨";
      case "wishNote":
        return "Your wish 💗";
      case "cards":
        return "Birthday wishes 💗";
      case "unlocked":
        return "Unlocked 🎁";
      case "final":
        return sealed ? "Sealed with love 💖" : "Final letter 💌";
      default:
        return "Birthday";
    }
  }, [step, sealed]);

  function go(next: Step) {
    setStep(next);
  }

  function restart() {
    setSealed(false);
    setCardsOpened(0);
    setStep("chat");
  }

  return (
    <main className="shell">
      <div className="frame">
        <div className="topGlow" />
        <div className="bottomGlow" />
        <FloatingHearts />
        <div className="frameInner">
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <div
              className="title"
              style={{ fontFamily: "var(--font-playfair)" }}
            >
              {title}
            </div>
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={step}
              variants={pageVariants}
              initial="initial"
              animate="animate"
              exit="exit"
              transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
              style={{ marginTop: 12 }}
            >
              {step === "chat" && <ChatIntro onContinue={() => go("envelope")} />}
              {step === "envelope" && (
                <EnvelopeReveal onContinue={() => go("cake")} />
              )}
              {step === "cake" && <CakeCut onContinue={() => go("wish")} />}
              {step === "wish" && <MakeWish onContinue={() => go("wishNote")} />}
              {step === "wishNote" && <WishNote onContinue={() => go("cards")} />}
              {step === "cards" && (
                <WishCards
                  total={totalCards}
                  onProgress={(n) => setCardsOpened(n)}
                  onAllOpened={() => go("unlocked")}
                />
              )}
              {step === "unlocked" && (
                <AllUnlocked
                  opened={cardsOpened}
                  total={totalCards}
                  onContinue={() => go("final")}
                />
              )}
              {step === "final" && (
                <FinalLetter
                  sealed={sealed}
                  onSeal={() => setSealed(true)}
                  onRestart={restart}
                />
              )}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </main>
  );
}


