"use client";

import Image from "next/image";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { useState, useEffect, useRef } from "react";
import { communityPranks } from "../../data/pranks";

export default function PrankDetail() {
  const { id } = useParams();
  const router = useRouter();
  const prank = communityPranks.find((p) => p.id === id);
  const [slideIndex, setSlideIndex] = useState(0);
  const [liked, setLiked] = useState(false);
  const [bookmarked, setBookmarked] = useState(false);
  const [showSheet, setShowSheet] = useState(false);
  const [generating, setGenerating] = useState(false);
  const [generationDone, setGenerationDone] = useState(false);
  const [statusText, setStatusText] = useState("");
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (!prank) return;
    intervalRef.current = setInterval(() => {
      setSlideIndex((prev) => (prev + 1) % prank.images.length);
    }, 3000);
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [prank]);

  const handleGenerate = () => {
    setShowSheet(false);
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

  if (!prank) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-black font-[family-name:var(--font-cerebri-sans)] text-white">
        <p>Prank not found</p>
      </div>
    );
  }

  if (generating) {
    return (
      <div className="flex min-h-screen flex-col bg-black font-[family-name:var(--font-cerebri-sans)] text-white">
        {/* Back button */}
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
          <h1 className="mb-8 text-2xl font-bold tracking-tighter">{prank.title}</h1>

          {/* Image placeholder / result */}
          <div className="relative w-full max-w-sm overflow-hidden rounded-2xl" style={{ aspectRatio: "3/4" }}>
            {generationDone ? (
              <Image
                src={prank.images[0]}
                alt={prank.title}
                fill
                className="object-cover animate-in fade-in duration-700"
              />
            ) : (
              <div className="flex h-full w-full items-center justify-center bg-white/[0.05]">
                {/* Spinner */}
                <div className="h-10 w-10 animate-spin rounded-full border-3 border-white/10 border-t-white" />
              </div>
            )}
          </div>

          {/* Status text */}
          <p className={`mt-6 text-sm font-semibold transition-colors duration-300 ${generationDone ? "text-green-400" : "text-white/50"}`}>
            {statusText}
          </p>
        </div>

        {/* Action buttons */}
        <div className="flex flex-col gap-3 px-5 pb-10">
          <button
            disabled={!generationDone}
            onClick={handleGenerate}
            className={`w-full rounded-2xl py-4 text-sm font-bold tracking-wide transition-all duration-300 ${
              generationDone
                ? "bg-white/10 text-white"
                : "bg-white/5 text-white/20"
            }`}
          >
            Generate new image
          </button>
          <button
            disabled={!generationDone}
            onClick={() => router.push("/ai_pranks/library")}
            className={`w-full rounded-2xl py-4 text-sm font-bold tracking-wide transition-all duration-300 ${
              generationDone
                ? "bg-white text-black"
                : "bg-white/10 text-white/30"
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
      {/* Back button */}
      <div className="absolute top-4 left-4 z-20">
        <Link
          href="/ai_pranks"
          className="flex h-9 w-9 items-center justify-center rounded-full bg-black/40 backdrop-blur-md"
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M15 18l-6-6 6-6" />
          </svg>
        </Link>
      </div>

      {/* Fullscreen image slideshow */}
      <div className="relative w-full" style={{ aspectRatio: "3/4" }}>
        {prank.images.map((img, i) => (
          <Image
            key={i}
            src={img}
            alt={prank.title}
            fill
            className="object-cover transition-opacity duration-700"
            style={{ opacity: i === slideIndex ? 1 : 0 }}
            priority={i === 0}
          />
        ))}
        <div className={`absolute inset-0 bg-gradient-to-b ${prank.gradient} opacity-30`} />

        {/* Bottom gradient */}
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-black to-transparent" />

        {/* Slide indicators */}
        <div className="absolute bottom-4 left-0 right-0 z-10 flex justify-center gap-1.5">
          {prank.images.map((_, i) => (
            <div
              key={i}
              className="h-1.5 rounded-full transition-all duration-300"
              style={{
                width: i === slideIndex ? 20 : 6,
                backgroundColor: i === slideIndex ? "white" : "rgba(255,255,255,0.4)",
              }}
            />
          ))}
        </div>
      </div>

      {/* Content */}
      <div className="px-5 pt-5 pb-32">
        {/* Title */}
        <h1 className="text-3xl font-bold tracking-tighter">{prank.title}</h1>

        {/* User */}
        <div className="mt-3 flex items-center gap-3">
          <Image
            src={prank.avatar}
            alt={prank.user}
            width={32}
            height={32}
            className="h-8 w-8 rounded-full object-cover"
          />
          <span className="text-sm font-semibold text-white/70">{prank.user}</span>
        </div>

        {/* Prompt */}
        <div className="mt-5 rounded-xl bg-white/[0.07] p-4">
          <p className="mb-2 text-xs font-bold text-white/40">Prompt used</p>
          <p className="text-sm leading-relaxed font-medium text-white/80">{prank.prompt}</p>
        </div>

        {/* Action buttons */}
        <div className="mt-6 flex gap-3">
          <button
            onClick={() => setLiked(!liked)}
            className={`flex flex-1 items-center justify-center gap-2 rounded-xl py-3 text-sm font-bold transition-colors ${
              liked ? "bg-red-500/20 text-red-400" : "bg-white/[0.07] text-white/70"
            }`}
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill={liked ? "currentColor" : "none"} stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
            </svg>
            Like
          </button>
          <button
            onClick={() => setBookmarked(!bookmarked)}
            className={`flex flex-1 items-center justify-center gap-2 rounded-xl py-3 text-sm font-bold transition-colors ${
              bookmarked ? "bg-amber-500/20 text-amber-400" : "bg-white/[0.07] text-white/70"
            }`}
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill={bookmarked ? "currentColor" : "none"} stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z" />
            </svg>
            Save
          </button>
          <button className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-white/[0.07] py-3 text-sm font-bold text-white/70">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="18" cy="5" r="3" />
              <circle cx="6" cy="12" r="3" />
              <circle cx="18" cy="19" r="3" />
              <line x1="8.59" y1="13.51" x2="15.42" y2="17.49" />
              <line x1="15.41" y1="6.51" x2="8.59" y2="10.49" />
            </svg>
            Share
          </button>
        </div>

        {/* Comments */}
        <div className="mt-6">
          <h2 className="mb-3 text-sm font-bold text-white/40">Comments</h2>
          <div className="flex flex-col gap-4">
            <div className="flex gap-3">
              <Image src="/avatar-3.jpg" alt="Alex K." width={32} height={32} className="h-8 w-8 shrink-0 rounded-full object-cover" />
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-xs font-bold text-white">Alex K.</span>
                  <span className="text-[10px] text-white/30">2h ago</span>
                </div>
                <p className="mt-1 text-xs leading-relaxed text-white/60">This is absolutely hilarious, sent it to the whole team</p>
              </div>
            </div>
            <div className="flex gap-3">
              <Image src="/avatar-5.jpg" alt="Oscar T." width={32} height={32} className="h-8 w-8 shrink-0 rounded-full object-cover" />
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-xs font-bold text-white">Oscar T.</span>
                  <span className="text-[10px] text-white/30">5h ago</span>
                </div>
                <p className="mt-1 text-xs leading-relaxed text-white/60">How did you get it to look so realistic?!</p>
              </div>
            </div>
            <div className="flex gap-3">
              <Image src="/avatar-6.jpg" alt="Mia W." width={32} height={32} className="h-8 w-8 shrink-0 rounded-full object-cover" />
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-xs font-bold text-white">Mia W.</span>
                  <span className="text-[10px] text-white/30">1d ago</span>
                </div>
                <p className="mt-1 text-xs leading-relaxed text-white/60">I need to try this with my family photos lol</p>
              </div>
            </div>
          </div>
        </div>

        </div>

      {/* Floating CTA */}
      <div className="fixed bottom-0 left-0 right-0 z-50 px-5 pb-8 pt-4 bg-gradient-to-t from-black via-black/80 to-transparent">
        <button
          onClick={() => setShowSheet(true)}
          className="w-full rounded-2xl bg-white py-4 text-sm font-bold tracking-wide text-black"
        >
          Create this prank
        </button>
      </div>

      {/* Bottom sheet overlay */}
      <div
        className="fixed inset-0 z-[60] bg-black/60 transition-opacity duration-300"
        style={{ opacity: showSheet ? 1 : 0, pointerEvents: showSheet ? "auto" : "none" }}
        onClick={() => setShowSheet(false)}
      />

      {/* Bottom sheet */}
      <div
        className="fixed bottom-0 left-0 right-0 z-[70] rounded-t-3xl bg-[#1c1c1e] px-5 pb-10 pt-3 transition-transform duration-300 ease-out"
        style={{ transform: showSheet ? "translateY(0)" : "translateY(100%)" }}
      >
        {/* Handle */}
        <div className="mx-auto mb-6 h-1 w-10 rounded-full bg-white/20" />

        <h3 className="mb-6 text-center text-lg font-bold">Create this prank</h3>

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
            <p className="mb-2 text-xs font-bold text-white/40">2. Prompt</p>
            <div className="flex items-center gap-3 rounded-2xl bg-white/[0.07] px-5 py-4">
              <p className="flex-1 text-sm leading-relaxed font-medium text-white/80">{prank.prompt}</p>
              <button className="shrink-0 rounded-xl bg-white/10 px-4 py-2 text-xs font-bold text-white/60">
                Edit
              </button>
            </div>
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
