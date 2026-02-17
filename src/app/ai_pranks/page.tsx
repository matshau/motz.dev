"use client";

import Image from "next/image";
import { useRef, useState, useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";
import Pressable from "./components/Pressable";
import PrankCard from "./components/PrankCard";
import Link from "next/link";
import { communityPranks } from "./data/pranks";
import { templates } from "./data/templates";

const topPrompts = [
  { prompt: "Put a tiny hat on everyone in the photo", category: "Photo Edit" },
  { prompt: "Make it look like the person is riding a dinosaur", category: "Scene Swap" },
  { prompt: "Replace the background with outer space", category: "Background" },
  { prompt: "Add a UFO abducting someone in the scene", category: "Scene Swap" },
  { prompt: "Turn everyone into medieval knights", category: "Costume" },
  { prompt: "Make it look like they're underwater", category: "Background" },
  { prompt: "Add a giant cat sleeping in the background", category: "Photo Edit" },
  { prompt: "Put sunglasses and a gold chain on the pet", category: "Pet Prank" },
  { prompt: "Make the food on the plate look alive and angry", category: "Food Prank" },
  { prompt: "Replace all faces with Nicolas Cage", category: "Face Swap" },
];

export default function AiPranks() {
  const router = useRouter();
  const scrollRef = useRef<HTMLDivElement>(null);
  const [scrollX, setScrollX] = useState(0);
  const [activeCard, setActiveCard] = useState<number | null>(null);
  const [slideIndex, setSlideIndex] = useState(0);
  const [showCreateSheet, setShowCreateSheet] = useState(false);
  const [customPrompt, setCustomPrompt] = useState("");
  const [generating, setGenerating] = useState(false);
  const [generationDone, setGenerationDone] = useState(false);
  const [statusText, setStatusText] = useState("");
  const previewTimeout = useRef<NodeJS.Timeout | null>(null);
  const slideInterval = useRef<NodeJS.Timeout | null>(null);
  const focusedCard = useRef<number>(0);

  const cardWidth = typeof window !== "undefined" ? window.innerWidth * 0.7 : 300;
  const gap = 16;

  const stopSlideshow = useCallback(() => {
    if (slideInterval.current) {
      clearInterval(slideInterval.current);
      slideInterval.current = null;
    }
  }, []);

  const startSlideshow = useCallback(() => {
    stopSlideshow();
    setSlideIndex(0);
    slideInterval.current = setInterval(() => {
      setSlideIndex((prev) => (prev + 1) % 3);
    }, 2000);
  }, [stopSlideshow]);

  const startPreviewTimer = useCallback((cardIndex: number) => {
    if (previewTimeout.current) clearTimeout(previewTimeout.current);
    stopSlideshow();
    setActiveCard(null);
    setSlideIndex(0);
    focusedCard.current = cardIndex;
    previewTimeout.current = setTimeout(() => {
      setActiveCard(cardIndex);
      startSlideshow();
    }, 2000);
  }, [stopSlideshow, startSlideshow]);

  const handleScroll = useCallback(() => {
    if (!scrollRef.current) return;
    const scroll = scrollRef.current.scrollLeft;
    setScrollX(scroll);

    const closestCard = Math.round(scroll / (cardWidth + gap));
    if (closestCard !== focusedCard.current) {
      startPreviewTimer(closestCard);
    }
  }, [cardWidth, gap, startPreviewTimer]);

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    el.addEventListener("scroll", handleScroll, { passive: true });
    return () => el.removeEventListener("scroll", handleScroll);
  }, [handleScroll]);

  useEffect(() => {
    startPreviewTimer(0);
    return () => {
      if (previewTimeout.current) clearTimeout(previewTimeout.current);
      stopSlideshow();
    };
  }, [startPreviewTimer]);

  const handleGenerate = () => {
    setShowCreateSheet(false);
    setGenerating(true);
    setGenerationDone(false);
    setStatusText("Analyzing photo...");

    setTimeout(() => setStatusText("Applying prompt..."), 1500);
    setTimeout(() => setStatusText("Generating image..."), 3500);
    setTimeout(() => setStatusText("Finalizing..."), 5500);
    setTimeout(() => {
      setStatusText("Done!");
      setGenerationDone(true);
    }, 7000);
  };

  if (generating) {
    return (
      <div className="flex min-h-screen flex-col bg-black font-[family-name:var(--font-cerebri-sans)] text-white">
        <div className="absolute top-4 left-4 z-20">
          <button
            onClick={() => { setGenerating(false); setGenerationDone(false); }}
            className="flex h-9 w-9 items-center justify-center rounded-full bg-white/10 backdrop-blur-md"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M15 18l-6-6 6-6" />
            </svg>
          </button>
        </div>

        <div className="flex flex-1 flex-col items-center justify-center px-5">
          <h1 className="mb-8 text-2xl font-bold tracking-tighter">New Prank</h1>

          <div className="relative w-full max-w-sm overflow-hidden rounded-2xl" style={{ aspectRatio: "3/4" }}>
            {generationDone ? (
              <Image
                src="/prank-1.jpg"
                alt="Generated prank"
                fill
                className="object-cover animate-in fade-in duration-700"
              />
            ) : (
              <div className="flex h-full w-full items-center justify-center bg-white/[0.05]">
                <div className="h-10 w-10 animate-spin rounded-full border-3 border-white/10 border-t-white" />
              </div>
            )}
          </div>

          <p className={`mt-6 text-sm font-semibold transition-colors duration-300 ${generationDone ? "text-green-400" : "text-white/50"}`}>
            {statusText}
          </p>
        </div>

        <div className="flex flex-col gap-3 px-5 pb-10">
          <button
            disabled={!generationDone}
            onClick={handleGenerate}
            className={`w-full rounded-2xl py-4 text-sm font-bold tracking-wide transition-all duration-300 ${
              generationDone ? "bg-white/10 text-white" : "bg-white/5 text-white/20"
            }`}
          >
            Generate new image
          </button>
          <button
            disabled={!generationDone}
            onClick={() => router.push("/ai_pranks/library")}
            className={`w-full rounded-2xl py-4 text-sm font-bold tracking-wide transition-all duration-300 ${
              generationDone ? "bg-white text-black" : "bg-white/10 text-white/30"
            }`}
          >
            Save to library
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black font-[family-name:var(--font-cerebri-sans)] text-white">
      <header className="flex items-center justify-between px-5 pt-4 pb-2">
        <div className="w-8" />
        <div className="flex items-center gap-2">
          <Image
            src="/jester-hat.png"
            alt="AI Pranks"
            width={40}
            height={40}
            className="object-contain"
          />
          <span className="text-base font-medium tracking-wide">AI Pranks</span>
        </div>
        <button
          onClick={() => setShowCreateSheet(true)}
          className="flex h-8 w-8 items-center justify-center rounded-full border border-white/30"
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M12 5v14M5 12h14" />
          </svg>
        </button>
      </header>

      <section className="mt-6">
        <h2 className="mb-3 px-8 text-sm font-bold tracking-tighter text-white/60">Top Prank Prompts</h2>
        <div className="scrollbar-hide flex gap-3 overflow-x-auto px-5">
          {topPrompts.map((item, i) => (
            <div
              key={i}
              className="flex shrink-0 flex-col justify-between rounded-xl bg-white/[0.07] px-5 py-4"
              style={{ maxWidth: 200, minHeight: 120 }}
            >
              <p className="text-sm font-semibold text-white">{item.prompt}</p>
              <p className="mt-2 text-xs font-bold text-white/40">{item.category}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="mt-8">
        <h2 className="mb-3 px-8 text-base font-bold tracking-tighter text-white/60">Made by the community</h2>
        <div
          ref={scrollRef}
          className="scrollbar-hide flex snap-x snap-mandatory gap-4 overflow-x-auto px-5 scroll-pl-5"
        >
          {communityPranks.map((prank, i) => {
            const cardStart = i * (cardWidth + gap);
            const distance = Math.abs(scrollX - cardStart);
            const progress = Math.min(distance / (cardWidth + gap), 1);
            const scale = 1 - progress * 0.1;
            const opacity = 1 - progress * 0.4;
            const translateX = -progress * 20;

            return (
              <PrankCard
                key={i}
                {...prank}
                preview={activeCard === i}
                slideIndex={slideIndex}
                className="shrink-0 snap-start"
                style={{
                  width: "70vw",
                  transform: `scale(${scale}) translateX(${translateX}px)`,
                  opacity,
                  transition: "transform 0.15s ease-out, opacity 0.15s ease-out",
                  transformOrigin: "center center",
                }}
              />
            );
          })}
        </div>
      </section>

      {/* Templates - Option 1: Grid */}
      <section className="mt-8">
        <h2 className="mb-3 px-8 text-base font-bold tracking-tighter text-white/60">Templates by AI Pranks</h2>
        <div className="grid grid-cols-2 gap-3 px-5">
          {templates.map((t) => (
            <Link key={t.id} href={`/ai_pranks/template/${t.id}`} className="relative overflow-hidden rounded-xl" style={{ aspectRatio: "1" }}>
              <Image
                src={t.image}
                alt={t.name}
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-black/50" />
              <div className="relative z-10 flex h-full flex-col justify-end p-4">
                <p className="text-sm font-bold text-white">{t.name}</p>
                <p className="mt-1 text-xs text-white/50">{t.description}</p>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Bottom nav */}
      <nav className="fixed bottom-0 left-0 right-0 z-50 flex items-center justify-between bg-black/60 px-6 py-4 pb-8 backdrop-blur-xl">
        <Link href="/ai_pranks/profile">
          <Image
            src="/user-placeholder.jpg"
            alt="Profile"
            width={32}
            height={32}
            className="h-8 w-8 rounded-full object-cover"
          />
        </Link>
        <div className="flex items-center gap-6">
          {/* Bookmark */}
          <Link href="/ai_pranks/bookmarks" className="text-white/50">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z" />
            </svg>
          </Link>
          {/* Library */}
          <Link href="/ai_pranks/library" className="text-white/50">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <rect x="3" y="3" width="7" height="7" />
              <rect x="14" y="3" width="7" height="7" />
              <rect x="14" y="14" width="7" height="7" />
              <rect x="3" y="14" width="7" height="7" />
            </svg>
          </Link>
          {/* Prank (active) */}
          <button className="flex flex-col items-center gap-1">
            <Image
              src="/jester-hat.png"
              alt="Pranks"
              width={22}
              height={22}
              className="object-contain"
            />
            <div className="h-1 w-1 rounded-full bg-white" />
          </button>
        </div>
      </nav>

      {/* Spacer for bottom nav */}
      <div className="h-24" />

      {/* Create sheet overlay */}
      <div
        className="fixed inset-0 z-[60] bg-black/60 transition-opacity duration-300"
        style={{ opacity: showCreateSheet ? 1 : 0, pointerEvents: showCreateSheet ? "auto" : "none" }}
        onClick={() => setShowCreateSheet(false)}
      />

      {/* Create sheet */}
      <div
        className="fixed bottom-0 left-0 right-0 z-[70] rounded-t-3xl bg-[#1c1c1e] px-5 pb-10 pt-3 transition-transform duration-300 ease-out"
        style={{ transform: showCreateSheet ? "translateY(0)" : "translateY(100%)" }}
      >
        <div className="mx-auto mb-6 h-1 w-10 rounded-full bg-white/20" />

        <h3 className="mb-6 text-center text-lg font-bold">New Prank</h3>

        <div className="flex flex-col gap-4">
          {/* Step 1 — Photo */}
          <div>
            <p className="mb-2 text-xs font-bold text-white/40">1. Choose a photo</p>
            <div className="flex gap-3">
              <button className="flex flex-1 items-center justify-center gap-3 rounded-2xl bg-white/[0.07] px-4 py-4">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z" />
                  <circle cx="12" cy="13" r="4" />
                </svg>
                <span className="text-sm font-semibold">Take photo</span>
              </button>
              <button className="flex flex-1 items-center justify-center gap-3 rounded-2xl bg-white/[0.07] px-4 py-4">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
                  <circle cx="8.5" cy="8.5" r="1.5" />
                  <polyline points="21 15 16 10 5 21" />
                </svg>
                <span className="text-sm font-semibold">Library</span>
              </button>
            </div>
          </div>

          {/* Step 2 — Prompt */}
          <div>
            <p className="mb-2 text-xs font-bold text-white/40">2. Describe your prank</p>
            <textarea
              value={customPrompt}
              onChange={(e) => setCustomPrompt(e.target.value)}
              placeholder="e.g. Make my friend ride a dinosaur through the office..."
              className="w-full rounded-2xl bg-white/[0.07] px-5 py-4 text-sm leading-relaxed font-medium text-white/80 placeholder-white/30 outline-none resize-none"
              rows={3}
            />
          </div>
        </div>

        <button
          onClick={handleGenerate}
          className="mt-6 w-full rounded-2xl bg-white py-4 text-sm font-bold tracking-wide text-black"
        >
          Generate prank
        </button>
      </div>
    </div>
  );
}
