"use client";

import Image from "next/image";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { useState } from "react";
import { templates } from "../../data/templates";

export default function TemplateDetail() {
  const { id } = useParams();
  const router = useRouter();
  const template = templates.find((t) => t.id === id);
  const [generating, setGenerating] = useState(false);
  const [generationDone, setGenerationDone] = useState(false);
  const [statusText, setStatusText] = useState("");
  const [showSheet, setShowSheet] = useState(false);

  const handleGenerate = () => {
    setShowSheet(false);
    setGenerating(true);
    setGenerationDone(false);
    setStatusText("Analyzing photo...");

    setTimeout(() => setStatusText("Applying template..."), 1500);
    setTimeout(() => setStatusText("Generating image..."), 3500);
    setTimeout(() => setStatusText("Finalizing..."), 5500);
    setTimeout(() => {
      setStatusText("Done!");
      setGenerationDone(true);
    }, 7000);
  };

  if (!template) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-black font-[family-name:var(--font-cerebri-sans)] text-white">
        <p>Template not found</p>
      </div>
    );
  }

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
          <h1 className="mb-8 text-2xl font-bold tracking-tighter">{template.name}</h1>

          <div className="relative w-full max-w-sm overflow-hidden rounded-2xl" style={{ aspectRatio: "3/4" }}>
            {generationDone ? (
              <Image
                src={template.image}
                alt={template.name}
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

      {/* Hero image */}
      <div className="relative w-full" style={{ aspectRatio: "1" }}>
        <Image
          src={template.image}
          alt={template.name}
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-black/40" />
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-black to-transparent" />
      </div>

      {/* Content */}
      <div className="px-5 pt-5 pb-32">
        <h1 className="text-3xl font-bold tracking-tighter">{template.name}</h1>
        <p className="mt-2 text-sm font-medium text-white/50">{template.description}</p>

        {/* Prompt */}
        <div className="mt-5 rounded-xl bg-white/[0.07] p-4">
          <p className="mb-2 text-xs font-bold text-white/40">Template prompt</p>
          <p className="text-sm leading-relaxed font-medium text-white/80">{template.prompt}</p>
        </div>

        {/* How it works */}
        <div className="mt-6">
          <h2 className="mb-3 text-sm font-bold text-white/40">How it works</h2>
          <div className="flex flex-col gap-3">
            <div className="flex items-center gap-3 rounded-xl bg-white/[0.04] px-4 py-3">
              <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-white/10 text-xs font-bold">1</span>
              <span className="text-sm text-white/70">Upload or take a photo</span>
            </div>
            <div className="flex items-center gap-3 rounded-xl bg-white/[0.04] px-4 py-3">
              <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-white/10 text-xs font-bold">2</span>
              <span className="text-sm text-white/70">AI applies the template to your photo</span>
            </div>
            <div className="flex items-center gap-3 rounded-xl bg-white/[0.04] px-4 py-3">
              <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-white/10 text-xs font-bold">3</span>
              <span className="text-sm text-white/70">Save and share with friends</span>
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
          Use this template
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
        <div className="mx-auto mb-6 h-1 w-10 rounded-full bg-white/20" />

        <h3 className="mb-6 text-center text-lg font-bold">{template.name}</h3>

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
              <p className="flex-1 text-sm leading-relaxed font-medium text-white/80">{template.prompt}</p>
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
