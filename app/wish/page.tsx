import { Suspense } from "react";
import WishClient from "@/components/wish/WishClient";

export default function WishPage() {
  return (
    <Suspense
      fallback={
        <main className="shell">
          <div className="frame">
            <div className="topGlow" />
            <div className="bottomGlow" />
            <div className="frameInner">
              <div
                className="title"
                style={{ fontFamily: "var(--font-playfair)" }}
              >
                Saved Wish 💌
              </div>
              <p className="subtitle" style={{ marginTop: 8 }}>
                Loading…
              </p>
            </div>
          </div>
        </main>
      }
    >
      <WishClient />
    </Suspense>
  );
}


