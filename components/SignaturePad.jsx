"use client";

import { useEffect, useRef, useState } from "react";

/**
 * SignaturePad: ลายเซ็นสดบน <canvas> (รองรับ mouse + touch + high-DPI)
 * props:
 * - height: ความสูง canvas (px)
 * - penSize: ความหนาปากกา (px)
 * - penColor: สีเส้น
 * - bgColor: พื้นหลัง (null = โปร่งใส)
 * - onSave(blob) => callback เมื่อกด "บันทึก"
 */
export default function SignaturePad({
  height = 160,
  penSize = 2,
  penColor = "#000000",
  bgColor = null,
  onSave,
}) {
  const wrapRef = useRef(null);
  const canvasRef = useRef(null);
  const ctxRef = useRef(null);
  const drawing = useRef(false);
  const lastPt = useRef({ x: 0, y: 0 });
  const [paths, setPaths] = useState([]); // เก็บเส้นสำหรับ Undo
  const [currentPath, setCurrentPath] = useState([]);

  // resize ให้พอดีกับความกว้าง container + รองรับ DPR
  function resizeCanvas() {
    const canvas = canvasRef.current;
    const wrap = wrapRef.current;
    if (!canvas || !wrap) return;

    const dpi = window.devicePixelRatio || 1;
    const cssWidth = wrap.clientWidth;
    const cssHeight = height;

    canvas.width = Math.max(1, Math.floor(cssWidth * dpi));
    canvas.height = Math.max(1, Math.floor(cssHeight * dpi));
    canvas.style.width = cssWidth + "px";
    canvas.style.height = cssHeight + "px";

    const ctx = canvas.getContext("2d");
    ctx.setTransform(dpi, 0, 0, dpi, 0, 0); // scale หนึ่งครั้ง ตาม DPR
    ctx.lineCap = "round";
    ctx.lineJoin = "round";
    ctx.strokeStyle = penColor;
    ctx.lineWidth = penSize;
    ctxRef.current = ctx;

    redrawAll();
  }

  useEffect(() => {
    resizeCanvas();
    const onR = () => resizeCanvas();
    window.addEventListener("resize", onR);
    return () => window.removeEventListener("resize", onR);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [height]);

  useEffect(() => {
    // เปลี่ยนสี/ขนาดปากกาแบบ live
    const ctx = ctxRef.current;
    if (ctx) {
      ctx.strokeStyle = penColor;
      ctx.lineWidth = penSize;
    }
  }, [penColor, penSize]);

  function getXY(e) {
    const canvas = canvasRef.current;
    const rect = canvas.getBoundingClientRect();
    if (e.touches && e.touches[0]) {
      const t = e.touches[0];
      return { x: t.clientX - rect.left, y: t.clientY - rect.top };
    }
    return { x: e.clientX - rect.left, y: e.clientY - rect.top };
  }

  function drawLine(from, to) {
    const ctx = ctxRef.current;
    ctx.beginPath();
    ctx.moveTo(from.x, from.y);
    ctx.lineTo(to.x, to.y);
    ctx.stroke();
  }

  function handleDown(e) {
    e.preventDefault();
    drawing.current = true;
    const p = getXY(e);
    lastPt.current = p;
    setCurrentPath([{ x: p.x, y: p.y }]);
  }
  function handleMove(e) {
    if (!drawing.current) return;
    e.preventDefault();
    const p = getXY(e);
    drawLine(lastPt.current, p);
    lastPt.current = p;
    setCurrentPath((prev) => [...prev, { x: p.x, y: p.y }]);
  }
  function handleUp(e) {
    if (!drawing.current) return;
    e.preventDefault();
    drawing.current = false;
    setPaths((prev) => (currentPath.length ? [...prev, currentPath] : prev));
    setCurrentPath([]);
  }

  function clearAll() {
    setPaths([]);
    setCurrentPath([]);
    const ctx = ctxRef.current;
    const canvas = canvasRef.current;
    if (!ctx || !canvas) return;
    if (bgColor) {
      ctx.save();
      ctx.fillStyle = bgColor;
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      ctx.restore();
    } else {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
    }
  }

  function undoLast() {
    if (!paths.length) return;
    const copy = paths.slice(0, -1);
    setPaths(copy);
    setCurrentPath([]);
    redrawAll(copy);
  }

  function redrawAll(_paths = paths) {
    const ctx = ctxRef.current;
    const canvas = canvasRef.current;
    if (!ctx || !canvas) return;

    if (bgColor) {
      ctx.save();
      ctx.fillStyle = bgColor;
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      ctx.restore();
    } else {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
    }

    ctx.save();
    ctx.strokeStyle = penColor;
    ctx.lineWidth = penSize;
    for (const path of _paths) {
      for (let i = 1; i < path.length; i++) {
        const a = path[i - 1];
        const b = path[i];
        ctx.beginPath();
        ctx.moveTo(a.x, a.y);
        ctx.lineTo(b.x, b.y);
        ctx.stroke();
      }
    }
    ctx.restore();
  }

  async function handleSave() {
    const canvas = canvasRef.current;
    if (!canvas) return;
    // สร้าง PNG โปร่งใส (หรือมี bg ตามที่กำหนด)
    canvas.toBlob((blob) => {
      if (blob && onSave) onSave(blob);
    }, "image/png", 1);
  }

  return (
    <div className="space-y-2">
      <div ref={wrapRef} className="w-full">
        <canvas
          ref={canvasRef}
          className="w-full rounded-md border bg-white touch-none select-none"
          style={{ display: "block", height }}
          onMouseDown={handleDown}
          onMouseMove={handleMove}
          onMouseUp={handleUp}
          onMouseLeave={handleUp}
          onTouchStart={handleDown}
          onTouchMove={handleMove}
          onTouchEnd={handleUp}
        />
      </div>

      <div className="flex items-center gap-2">
        <button type="button" className="px-3 py-1.5 rounded-md border" onClick={clearAll}>
          ล้าง
        </button>
        <button type="button" className="px-3 py-1.5 rounded-md border" onClick={undoLast}>
          ย้อนกลับ
        </button>

        <div className="ml-auto flex items-center gap-2 text-sm">
          <label className="inline-flex items-center gap-1">
            ขนาดเส้น
            <input
              type="range"
              min={1}
              max={6}
              defaultValue={penSize}
              onChange={(e) => {
                const ctx = ctxRef.current;
                if (ctx) ctx.lineWidth = Number(e.target.value) || 2;
              }}
            />
          </label>
          <label className="inline-flex items-center gap-1">
            สี
            <input
              type="color"
              defaultValue={penColor}
              onChange={(e) => {
                const ctx = ctxRef.current;
                if (ctx) ctx.strokeStyle = e.target.value;
              }}
            />
          </label>
          <button type="button" className="px-3 py-1.5 rounded-md border bg-black text-white" onClick={handleSave}>
            บันทึกลายเซ็น
          </button>
        </div>
      </div>
    </div>
  );
}
