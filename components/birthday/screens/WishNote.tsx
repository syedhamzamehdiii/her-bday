"use client";

import { motion } from "framer-motion";
import { useEffect, useMemo, useState } from "react";
import MotionButton from "@/components/ui/MotionButton";
import { safeGet, safeSet } from "@/lib/storage";
import { encodeWish } from "@/lib/wishCodec";

const STORAGE_KEY = "herbday_wish_v1";

async function copyToClipboard(text: string) {
  try {
    await navigator.clipboard.writeText(text);
    return true;
  } catch {
    return false;
  }
}

export default function WishNote({ onContinue }: { onContinue: () => void }) {
  const [wish, setWish] = useState("");
  const [savedAt, setSavedAt] = useState<number | null>(null);
  const [copied, setCopied] = useState<string | null>(null);

  useEffect(() => {
    const existing = safeGet(STORAGE_KEY);
    if (existing) setWish(existing);
  }, []);

  const canSave = wish.trim().length > 0;

  const wishLink = useMemo(() => {
    if (!canSave) return "";
    const token = encodeWish(wish.trim());
    if (typeof window === "undefined") return "";
    return `${window.location.origin}/wish?wish=${token}`;
  }, [wish, canSave]);

  async function onSave() {
    safeSet(STORAGE_KEY, wish.trim());
    setSavedAt(Date.now());
  }

  async function onCopyLink() {
    if (!wishLink) return;
    const ok = await copyToClipboard(wishLink);
    setCopied(ok ? "Wish link copied ✅" : "Couldn’t copy (copy manually) 😅");
    window.setTimeout(() => setCopied(null), 1400);
  }

  async function onShare() {
    if (!wishLink) return;
    if ("share" in navigator) {
      try {
        await (navigator as Navigator & { share: (data: { title?: string; text?: string; url?: string }) => Promise<void> }).share({
          title: "My Birthday Wish ✨",
          text: "Here’s my birthday wish… 💗",
          url: wishLink
        });
        return;
      } catch {
        // fall through to copy
      }
    }
    await onCopyLink();
  }

  return (
    <div>
      <p className="subtitle" style={{ margin: 0 }}>
        One more tiny thing… write your wish here so it can be saved (and shared to him).
      </p>

      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
        style={{
          marginTop: 14,
          borderRadius: 18,
          border: "1px solid rgba(42,36,51,.12)",
          background:
            "linear-gradient(180deg, rgba(255,255,255,.82), rgba(255,255,255,.62))",
          boxShadow: "0 16px 40px rgba(42,36,51,.10)",
          padding: 14
        }}
      >
        <div className="title" style={{ fontFamily: "var(--font-playfair)", fontSize: 18 }}>
          Your Wish ✨
        </div>

        <textarea
          value={wish}
          onChange={(e) => setWish(e.target.value)}
          placeholder="Type your wish here… 💗"
          rows={5}
          style={{
            width: "100%",
            marginTop: 10,
            borderRadius: 14,
            border: "1px solid rgba(42,36,51,.14)",
            background: "rgba(255,255,255,.70)",
            padding: 12,
            fontSize: 14,
            lineHeight: 1.5,
            color: "rgba(42,36,51,.92)",
            outline: "none",
            resize: "none"
          }}
        />

        <div style={{ marginTop: 10, display: "flex", gap: 10, flexWrap: "wrap" }}>
          <span className="pill">
            {canSave ? "saved locally when you tap Save" : "write something to enable saving"}
          </span>
          {savedAt ? (
            <span className="pill">Saved 💾</span>
          ) : null}
          {copied ? <span className="pill">{copied}</span> : null}
        </div>

        <div className="btnRow">
          <MotionButton variant="ghost" onClick={onSave} disabled={!canSave} aria-disabled={!canSave}>
            Save 💾
          </MotionButton>
          <MotionButton variant="ghost" onClick={onCopyLink} disabled={!canSave} aria-disabled={!canSave}>
            Copy wish link 🔗
          </MotionButton>
          <MotionButton variant="ghost" onClick={onShare} disabled={!canSave} aria-disabled={!canSave}>
            Share 💌
          </MotionButton>
        </div>
      </motion.div>

      <div className="btnRow">
        <MotionButton wide variant="primary" onClick={() => { if (canSave) void onSave(); onContinue(); }}>
          Continue 💗
        </MotionButton>
      </div>
    </div>
  );
}


