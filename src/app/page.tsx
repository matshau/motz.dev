"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { db } from "@/lib/firebase";

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
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");
  const [showContact, setShowContact] = useState(false);

  useEffect(() => {
    if (showContact) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => { document.body.style.overflow = ""; };
  }, [showContact]);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus("sending");
    try {
      await addDoc(collection(db, "contacts"), {
        ...form,
        createdAt: serverTimestamp(),
      });
      setStatus("sent");
      setForm({ name: "", email: "", message: "" });
    } catch {
      setStatus("error");
    }
  }

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
        <motion.button
          custom={3}
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          onClick={() => setShowContact(true)}
          className="rounded-full bg-foreground px-8 py-4 text-sm font-medium uppercase tracking-widest text-background transition-transform hover:scale-105"
        >
          Get in touch
        </motion.button>
      </main>

      {/* Contact Modal */}
      <AnimatePresence>
        {showContact && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm px-4"
            onClick={(e) => { if (e.target === e.currentTarget) setShowContact(false); }}
          >
            <motion.div
              initial={{ opacity: 0, y: 30, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 20, scale: 0.95 }}
              transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
              className="relative w-full max-w-md rounded-2xl bg-background p-8 shadow-2xl border border-neutral-200 dark:border-neutral-800"
            >
              <button
                onClick={() => setShowContact(false)}
                className="absolute top-4 right-4 text-neutral-400 hover:text-foreground transition-colors text-xl leading-none"
                aria-label="Close"
              >
                &times;
              </button>

              <h2 className="mb-6 text-center font-[family-name:var(--font-playfair)] text-3xl font-bold tracking-tight">
                Get in touch
              </h2>

              <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                <input
                  required
                  type="text"
                  placeholder="Name"
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  className="rounded-lg border border-neutral-300 bg-transparent px-4 py-3 text-sm outline-none transition-colors focus:border-foreground dark:border-neutral-700"
                />
                <input
                  required
                  type="email"
                  placeholder="Email"
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  className="rounded-lg border border-neutral-300 bg-transparent px-4 py-3 text-sm outline-none transition-colors focus:border-foreground dark:border-neutral-700"
                />
                <textarea
                  required
                  rows={4}
                  placeholder="Message"
                  value={form.message}
                  onChange={(e) => setForm({ ...form, message: e.target.value })}
                  className="resize-none rounded-lg border border-neutral-300 bg-transparent px-4 py-3 text-sm outline-none transition-colors focus:border-foreground dark:border-neutral-700"
                />
                <button
                  type="submit"
                  disabled={status === "sending"}
                  className="rounded-full bg-foreground px-8 py-4 text-sm font-medium uppercase tracking-widest text-background transition-transform hover:scale-105 disabled:opacity-50"
                >
                  {status === "sending" ? "Sending..." : "Send message"}
                </button>
                {status === "sent" && (
                  <p className="text-center text-sm text-green-600">Message sent! I&apos;ll get back to you soon.</p>
                )}
                {status === "error" && (
                  <p className="text-center text-sm text-red-600">Something went wrong. Please try again.</p>
                )}
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
