"use client";

import { motion } from "framer-motion";

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.15,
      duration: 0.6,
      ease: [0.22, 1, 0.36, 1] as const,
    },
  }),
};

export default function Home() {
  return (
    <div className="relative min-h-screen font-[family-name:var(--font-inter)]">
      {/* Logo */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="px-8 py-6 md:px-16"
      >
        <span className="text-lg font-semibold tracking-tight">mOtz.dev</span>
      </motion.div>

      {/* Hero */}
      <main className="flex flex-col items-center px-6 pt-20 pb-32 text-center md:pt-28">
        {/* Greeting */}
        <motion.p
          custom={0}
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          className="mb-4 text-lg text-neutral-500"
        >
          Hi, I&apos;m Mats
        </motion.p>

        {/* Headline */}
        <motion.h1
          custom={1}
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          className="mb-6 max-w-2xl font-[family-name:var(--font-playfair)] text-5xl leading-tight font-bold tracking-tight md:text-6xl md:leading-tight"
        >
          Crafting digital experiences with precision and feel.
        </motion.h1>

        {/* Description */}
        <motion.p
          custom={2}
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          className="mb-12 max-w-md text-lg leading-relaxed text-neutral-500"
        >
          a <span className="font-semibold text-foreground">Fullstack Developer</span> with
          a passion for <span className="font-semibold text-foreground">Frontend</span>,{" "}
          <span className="font-semibold text-foreground">UX</span>, and crafting
          smooth animations with a premium feel.
        </motion.p>

        {/* CTA */}
        <motion.a
          custom={3}
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          href="#contact"
          className="rounded-full bg-foreground px-8 py-4 text-sm font-medium uppercase tracking-widest text-background transition-transform hover:scale-105"
        >
          Get in touch
        </motion.a>
      </main>
    </div>
  );
}
