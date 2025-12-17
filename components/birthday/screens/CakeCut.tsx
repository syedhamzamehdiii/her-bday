"use client";

import { motion } from "framer-motion";
import { useEffect, useMemo, useRef, useState } from "react";
import MotionButton from "@/components/ui/MotionButton";
import { fireConfettiBurst } from "@/lib/confetti";
import type { PointerEvent as ReactPointerEvent } from "react";

type Pt = { x: number; y: number; t: number };

function dist(a: Pt, b: Pt) {
  const dx = a.x - b.x;
  const dy = a.y - b.y;
  return Math.hypot(dx, dy);
}

export default function CakeCut({ onContinue }: { onContinue: () => void }) {
  const stageRef = useRef<HTMLDivElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const ctxRef = useRef<CanvasRenderingContext2D | null>(null);

  const [drawing, setDrawing] = useState(false);
  const [done, setDone] = useState(false);
  const [points, setPoints] = useState<Pt[]>([]);

  const hint = useMemo(() => (done ? "Perfect Cut 🎉" : "Draw a clean cut across the cake…"), [done]);

  function resizeCanvas() {
    const canvas = canvasRef.current;
    const stage = stageRef.current;
    if (!canvas || !stage) return;
    const rect = stage.getBoundingClientRect();
    const dpr = Math.max(1, window.devicePixelRatio || 1);
    canvas.width = Math.floor(rect.width * dpr);
    canvas.height = Math.floor(rect.height * dpr);
    canvas.style.width = `${rect.width}px`;
    canvas.style.height = `${rect.height}px`;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    ctx.lineCap = "round";
    ctx.lineJoin = "round";
    ctxRef.current = ctx;
    clearCanvas();
  }

  function clearCanvas() {
    const stage = stageRef.current;
    const ctx = ctxRef.current;
    if (!ctx || !stage) return;
    const rect = stage.getBoundingClientRect();
    ctx.clearRect(0, 0, rect.width, rect.height);
  }

  useEffect(() => {
    resizeCanvas();
    const onR = () => resizeCanvas();
    window.addEventListener("resize", onR);
    return () => window.removeEventListener("resize", onR);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function toLocal(e: ReactPointerEvent) {
    const stage = stageRef.current;
    if (!stage) return { x: 0, y: 0 };
    const r = stage.getBoundingClientRect();
    return { x: e.clientX - r.left, y: e.clientY - r.top };
  }

  function drawStroke(newPts: Pt[]) {
    const ctx = ctxRef.current;
    if (!ctx) return;
    if (newPts.length < 2) return;
    const a = newPts[newPts.length - 2]!;
    const b = newPts[newPts.length - 1]!;
    const grad = ctx.createLinearGradient(a.x, a.y, b.x, b.y);
    grad.addColorStop(0, "rgba(255,94,168,.95)");
    grad.addColorStop(1, "rgba(179,140,255,.92)");
    ctx.strokeStyle = grad;
    ctx.lineWidth = 5;
    ctx.beginPath();
    ctx.moveTo(a.x, a.y);
    ctx.lineTo(b.x, b.y);
    ctx.stroke();
  }

  function evaluateCut(allPts: Pt[]) {
    const stage = stageRef.current;
    if (!stage) return false;
    const r = stage.getBoundingClientRect();
    const w = r.width;
    const h = r.height;

    // define a "cake band" region where cuts count (center-ish)
    const y0 = h * 0.28;
    const y1 = h * 0.78;
    const inBand = allPts.filter((p) => p.y >= y0 && p.y <= y1);
    if (inBand.length < 14) return false;

    let minX = Infinity;
    let maxX = -Infinity;
    let length = 0;
    for (let i = 0; i < inBand.length; i++) {
      const p = inBand[i]!;
      minX = Math.min(minX, p.x);
      maxX = Math.max(maxX, p.x);
      if (i > 0) length += dist(inBand[i - 1]!, p);
    }

    const span = maxX - minX;
    const crosses = minX <= w * 0.18 && maxX >= w * 0.82;
    const longEnough = length >= w * 0.9;
    return crosses && longEnough;
  }

  function onPointerDown(e: ReactPointerEvent<HTMLCanvasElement>) {
    if (done) return;
    e.currentTarget.setPointerCapture(e.pointerId);
    const p = toLocal(e);
    const pt: Pt = { x: p.x, y: p.y, t: performance.now() };
    setPoints([pt]);
    setDrawing(true);
  }

  function onPointerMove(e: ReactPointerEvent<HTMLCanvasElement>) {
    if (!drawing || done) return;
    const p = toLocal(e);
    const pt: Pt = { x: p.x, y: p.y, t: performance.now() };
    setPoints((prev) => {
      const next = [...prev, pt];
      drawStroke(next);
      return next;
    });
  }

  function onPointerUp() {
    if (!drawing || done) return;
    setDrawing(false);
    setPoints((prev) => {
      const ok = evaluateCut(prev);
      if (ok) {
        setDone(true);
        fireConfettiBurst();
      }
      return prev;
    });
  }

  function reset() {
    setDone(false);
    setDrawing(false);
    setPoints([]);
    clearCanvas();
  }

  return (
    <div>
      <p className="subtitle" style={{ margin: 0 }}>
        Imagine you are cutting the cake with me ..
      </p>

      <div className="cakeWrap">
        <div className="cakeStage" ref={stageRef}>
          {/* cake art (purely visual, canvas sits above for drawing) */}
          <div className="cakeArt" aria-hidden="true">
            <div className="cakePlate" />

            <div className="cakeBase">
              <div className="cakeSide" />
              <div className="cakeTop" />
              <div className="cakeDrip" />
              <div className="cakeDeco">
                <div className="rosette" />
                <div className="rosette" />
                <div className="rosette" />
                <div className="rosette" />
                <div className="rosette" />
                <div className="rosette" />
              </div>
              <div className="sprinkles" />
            </div>

            <div className="candles">
              <div className="candle">
                <div className="flame" />
              </div>
              <div className="candle candleTall">
                <div className="flame" />
              </div>
              <div className="candle">
                <div className="flame" />
              </div>
            </div>
          </div>

          {!done ? (
            <motion.div
              aria-hidden="true"
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.35 }}
              style={{
                position: "absolute",
                left: 20,
                right: 20,
                top: "52%",
                borderTop: "2px dashed rgba(42,36,51,.18)",
                opacity: 0.55
              }}
            />
          ) : null}

          <canvas
            ref={canvasRef}
            className="cakeCanvas"
            onPointerDown={onPointerDown}
            onPointerMove={onPointerMove}
            onPointerUp={onPointerUp}
            onPointerCancel={onPointerUp}
          />

          <div className="cakeHint">
            <span className="pill">{hint}</span>
          </div>

          {done ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ type: "spring", stiffness: 210, damping: 16 }}
              style={{
                position: "absolute",
                inset: 0,
                display: "grid",
                placeItems: "center",
                pointerEvents: "none"
              }}
            >
              <div
                style={{
                  padding: "10px 12px",
                  borderRadius: 999,
                  background:
                    "linear-gradient(135deg, rgba(255,94,168,.92), rgba(179,140,255,.86))",
                  border: "1px solid rgba(255,255,255,.55)",
                  color: "white",
                  fontWeight: 900,
                  boxShadow: "0 16px 40px rgba(255,94,168,.18)"
                }}
              >
                Perfect Cut 🎉
              </div>
            </motion.div>
          ) : null}
        </div>
      </div>

      <div className="btnRow">
        {!done ? (
          <MotionButton variant="ghost" onClick={reset}>
            Clear line ↺
          </MotionButton>
        ) : (
          <MotionButton variant="ghost" onClick={reset}>
            Cut again 🎂
          </MotionButton>
        )}
        <MotionButton
          wide
          variant="primary"
          onClick={onContinue}
          disabled={!done}
          aria-disabled={!done}
          style={{
            opacity: done ? 1 : 0.55,
            cursor: done ? "pointer" : "not-allowed"
          }}
        >
          Continue ✨
        </MotionButton>
      </div>
    </div>
  );
}


