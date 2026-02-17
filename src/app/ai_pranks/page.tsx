"use client";

import Image from "next/image";
import { useRef, useState, useEffect, useCallback } from "react";
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
  const scrollRef = useRef<HTMLDivElement>(null);
  const [scrollX, setScrollX] = useState(0);
  const [activeCard, setActiveCard] = useState<number | null>(null);
  const [slideIndex, setSlideIndex] = useState(0);
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
        <div className="flex h-8 w-8 items-center justify-center rounded-full border border-white/30">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M12 5v14M5 12h14" />
          </svg>
        </div>
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
    </div>
  );
}
