import Link from "next/link";

export default function HomePage() {
  return (
    <main className="shell">
      <div className="frame">
        <div className="topGlow" />
        <div className="bottomGlow" />
        <div className="frameInner">
          <div className="title" style={{ fontFamily: "var(--font-playfair)" }}>
            A small surprise 💖
          </div>
          <p className="subtitle" style={{ marginTop: 8 }}>
            If you’re here from the QR code, open the birthday experience below.
          </p>
          <div className="btnRow">
            <Link className="btn btnPrimary btnWide" href="/birthday">
              Open /birthday ✨
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}


