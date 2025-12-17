"use client";

import { useMemo } from "react";
import { useSearchParams } from "next/navigation";
import MotionButton from "@/components/ui/MotionButton";
import { decodeWish } from "@/lib/wishCodec";
import Link from "next/link";

export default function WishClient() {
  const sp = useSearchParams();
  const token = sp.get("wish") ?? "";

  const decoded = useMemo(() => {
    if (!token) return null;
    return decodeWish(token);
  }, [token]);

  return (
    <main className="shell">
      <div className="frame">
        <div className="topGlow" />
        <div className="bottomGlow" />
        <div className="frameInner">
          <div className="title" style={{ fontFamily: "var(--font-playfair)" }}>
            Saved Wish 💌
          </div>
          <p className="subtitle" style={{ marginTop: 8 }}>
            This page shows a wish shared via link (no backend).
          </p>

          <div className="letterPaper">
            {decoded ? (
              <>
                <div className="letterText">{decoded.wish}</div>
                <div className="subtitle" style={{ marginTop: 10 }}>
                  Saved: {new Date(decoded.createdAt).toLocaleString()}
                </div>
              </>
            ) : (
              <div className="subtitle">
                No wish found in the link (or it was invalid).
              </div>
            )}
          </div>

          <div className="btnRow">
            <Link className="btn btnPrimary btnWide" href="/birthday">
              Go to /birthday ✨
            </Link>
            <MotionButton
              variant="ghost"
              onClick={() => window.location.reload()}
            >
              Reload ↺
            </MotionButton>
          </div>
        </div>
      </div>
    </main>
  );
}


