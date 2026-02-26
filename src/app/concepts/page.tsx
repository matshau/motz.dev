"use client";

import { motion } from "framer-motion";
import Link from "next/link";

const concepts = [
  {
    title: "Liquid Glass",
    description: "CSS glassmorphism with backdrop-filter, specular highlights and draggable orb",
    href: "/concepts/liquid-glass",
    color: "from-purple-600/30 to-blue-600/30",
  },
  {
    title: "Canvas",
    description: "Freehand drawing med HTML5 Canvas, fargevelger, penselstørrelser og touch-støtte",
    href: "/concepts/canvas",
    color: "from-amber-600/30 to-rose-600/30",
  },
];

export default function ConceptsPage() {
  return (
    <div className="relative flex min-h-screen flex-col items-center overflow-hidden px-6 py-16 font-[family-name:var(--font-inter)]">
      {/* Dark background */}
      <div className="pointer-events-none fixed inset-0 -z-10 bg-stone-950" />

      <motion.h1
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="font-[family-name:var(--font-playfair)] text-4xl font-bold tracking-tight text-white"
      >
        Concepts
      </motion.h1>

      <motion.p
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="mt-3 text-sm text-stone-400"
      >
        Eksperimenter og prototyper
      </motion.p>

      <div className="mt-12 grid w-full max-w-2xl gap-4 sm:grid-cols-2">
        {concepts.map((concept, i) => (
          <motion.div
            key={concept.href}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15 + i * 0.05 }}
          >
            <Link
              href={concept.href}
              className="group relative block overflow-hidden rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-xl transition-colors hover:bg-white/10"
            >
              <div className={`pointer-events-none absolute -inset-4 bg-gradient-to-br ${concept.color} opacity-50 blur-2xl transition-opacity group-hover:opacity-80`} />
              <h2 className="relative text-lg font-bold text-white">{concept.title}</h2>
              <p className="relative mt-2 text-xs leading-relaxed text-stone-400">
                {concept.description}
              </p>
            </Link>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
