"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";

export default function LiquidGlassPage() {
  const [blur, setBlur] = useState(12);
  const [brightness, setBrightness] = useState(1.1);
  const [saturation, setSaturation] = useState(1.4);
  const [specular, setSpecular] = useState(0.3);
  const [orbSize, setOrbSize] = useState(160);

  return (
    <div className="relative flex min-h-screen flex-col items-center overflow-hidden px-6 py-16 font-[family-name:var(--font-inter)]">
      {/* Dark gradient background with colorful blobs */}
      <div className="pointer-events-none fixed inset-0 -z-10 bg-gradient-to-br from-stone-950 via-stone-900 to-stone-950">
        <div className="absolute -left-20 -top-20 h-[500px] w-[500px] animate-pulse rounded-full bg-purple-600/30 blur-3xl" />
        <div className="absolute right-0 top-1/4 h-[450px] w-[450px] animate-pulse rounded-full bg-blue-600/25 blur-3xl [animation-delay:1s]" />
        <div className="absolute bottom-0 left-1/4 h-[400px] w-[400px] animate-pulse rounded-full bg-amber-600/20 blur-3xl [animation-delay:2s]" />
        <div className="absolute -right-16 bottom-1/4 h-[350px] w-[350px] animate-pulse rounded-full bg-rose-600/20 blur-3xl [animation-delay:3s]" />
        <div className="absolute left-1/2 top-1/2 h-[300px] w-[300px] -translate-x-1/2 -translate-y-1/2 animate-pulse rounded-full bg-cyan-500/20 blur-3xl [animation-delay:0.5s]" />
      </div>

      {/* Back link */}
      <Link
        href="/concepts"
        className="fixed left-6 top-6 z-50 text-xs text-stone-500 transition-colors hover:text-white"
      >
        &larr; Concepts
      </Link>

      {/* Draggable glass orb */}
      <motion.div
        drag
        dragMomentum={false}
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        whileDrag={{ scale: 1.05 }}
        className="fixed left-1/2 top-1/2 z-40 -translate-x-1/2 -translate-y-1/2 cursor-grab rounded-full active:cursor-grabbing"
        style={{ touchAction: "none", width: orbSize, height: orbSize }}
      >
        {/* Outer glow */}
        <div className="absolute -inset-3 rounded-full bg-white/5 blur-xl" />

        {/* Main glass body */}
        <div
          className="absolute inset-0 rounded-full border border-white/20"
          style={{
            background: `radial-gradient(ellipse at 30% 20%, rgba(255,255,255,0.08), transparent 60%)`,
            backdropFilter: `blur(${blur}px) brightness(${brightness}) saturate(${saturation})`,
            WebkitBackdropFilter: `blur(${blur}px) brightness(${brightness}) saturate(${saturation})`,
            boxShadow:
              "inset 0 1px 1px rgba(255,255,255,0.15), inset 0 -4px 12px rgba(0,0,0,0.2), 0 8px 32px rgba(0,0,0,0.3)",
          }}
        />

        {/* Rim light — top edge */}
        <div
          className="absolute inset-[1px] rounded-full"
          style={{
            background: "linear-gradient(170deg, rgba(255,255,255,0.25) 0%, transparent 40%)",
          }}
        />

        {/* Specular highlight — main shine */}
        <div
          className="absolute left-[15%] top-[10%] h-[40%] w-[50%] rounded-full"
          style={{
            background: `radial-gradient(ellipse at 50% 50%, rgba(255,255,255,${specular}), transparent 70%)`,
            filter: "blur(4px)",
          }}
        />

        {/* Small sharp specular */}
        <div
          className="absolute left-[22%] top-[18%] h-[12%] w-[20%] rounded-full"
          style={{
            background: `radial-gradient(ellipse, rgba(255,255,255,${Math.min(specular + 0.2, 1)}), transparent 70%)`,
            filter: "blur(1px)",
          }}
        />

        {/* Bottom caustic */}
        <div
          className="absolute bottom-[8%] left-[20%] h-[15%] w-[60%] rounded-full"
          style={{
            background: "radial-gradient(ellipse, rgba(255,255,255,0.06), transparent 70%)",
            filter: "blur(6px)",
          }}
        />
      </motion.div>

      {/* Title */}
      <motion.h1
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="font-[family-name:var(--font-playfair)] text-4xl font-bold tracking-tight text-white"
      >
        Liquid Glass
      </motion.h1>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.1 }}
        className="mt-3 text-center text-sm text-stone-400"
      >
        Dra glass-kulen rundt for å se effekten
      </motion.p>

      {/* Controls panel */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="mt-12 w-full max-w-sm rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-xl"
      >
        <h2 className="mb-4 text-xs font-bold uppercase tracking-widest text-stone-400">
          Parametre
        </h2>
        <div className="flex flex-col gap-5">
          <SliderControl label="Blur" value={blur} min={0} max={40} step={1} unit="px" onChange={setBlur} />
          <SliderControl label="Brightness" value={brightness} min={0.5} max={2} step={0.05} onChange={setBrightness} />
          <SliderControl label="Saturation" value={saturation} min={0} max={3} step={0.1} onChange={setSaturation} />
          <SliderControl label="Specular" value={specular} min={0} max={1} step={0.05} onChange={setSpecular} />
          <SliderControl label="Size" value={orbSize} min={60} max={400} step={10} unit="px" onChange={setOrbSize} />
        </div>
      </motion.div>
    </div>
  );
}

function SliderControl({
  label,
  value,
  min,
  max,
  step,
  unit,
  onChange,
}: {
  label: string;
  value: number;
  min: number;
  max: number;
  step: number;
  unit?: string;
  onChange: (v: number) => void;
}) {
  return (
    <div>
      <div className="mb-1.5 flex items-center justify-between">
        <span className="text-xs font-medium text-stone-300">{label}</span>
        <span className="text-xs tabular-nums text-stone-500">
          {Number.isInteger(step) ? value : value.toFixed(2)}
          {unit ?? ""}
        </span>
      </div>
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(e) => onChange(parseFloat(e.target.value))}
        className="h-1 w-full cursor-pointer appearance-none rounded-full bg-white/10 accent-white [&::-webkit-slider-thumb]:h-3 [&::-webkit-slider-thumb]:w-3 [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-white"
      />
    </div>
  );
}
