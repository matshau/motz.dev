"use client";

import { useState } from "react";
import { motion } from "framer-motion";
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

      {/* Contact */}
      <section id="contact" className="mx-auto max-w-lg px-6 pb-32">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="mb-8 text-center font-[family-name:var(--font-playfair)] text-3xl font-bold tracking-tight"
        >
          Get in touch
        </motion.h2>

        <motion.form
          onSubmit={handleSubmit}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
          className="flex flex-col gap-4"
        >
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
            rows={5}
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
        </motion.form>
      </section>
    </div>
  );
}
