"use client";

import { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";

function Card({
  imageSrc,
  title,
  description,
  color = "#B5D1E2",
  active,
  onClick,
}: {
  imageSrc: string;
  title: string;
  description: string;
  color?: string;
  active: boolean;
  onClick: () => void;
}) {
  return (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      whileHover={{ y: -4, transition: { duration: 0.2, ease: "easeOut", delay: 0 } }}
      onClick={onClick}
      className="relative cursor-pointer overflow-hidden rounded-2xl bg-white shadow-[0_20px_60px_-15px_rgba(0,0,0,0.6)]"
    >
      {/* Gradient overlay */}
      <div
        className="pointer-events-none absolute inset-x-0 bottom-0 z-10 h-1/2"
        style={{ background: `linear-gradient(to top, ${color}, ${color}00)` }}
      />

      <motion.div
        animate={{
          width: active ? 120 + 32 + 200 : 220,
          height: active ? 120 + 32 : 220,
          padding: active ? 16 : 0,
        }}
        transition={{ duration: 0.5, ease: [0.4, 0, 0.2, 1] }}
        className="flex gap-4"
      >
        <motion.div
          animate={{
            width: active ? 120 : 220,
            height: active ? 120 : 220,
          }}
          transition={{ duration: 0.5, ease: [0.4, 0, 0.2, 1] }}
          className="relative shrink-0 overflow-hidden rounded-xl"
        >
          <Image
            src={imageSrc}
            alt={title}
            width={400}
            height={400}
            className="h-full w-full object-cover"
          />
        </motion.div>

        {/* State 2: text beside image */}
        <motion.div
          animate={{ opacity: active ? 1 : 0 }}
          transition={{ duration: active ? 0.3 : 0.15, delay: active ? 0.3 : 0 }}
          className="flex flex-col justify-center"
        >
          <h3 className="text-lg font-bold text-stone-900">{title}</h3>
          <p className="mt-1 text-xs leading-relaxed text-stone-500">{description}</p>
        </motion.div>
      </motion.div>

      {/* State 1: title over gradient */}
      <motion.div
        animate={{ opacity: active ? 0 : 1 }}
        transition={{ duration: active ? 0.15 : 0.3, delay: active ? 0 : 0.3 }}
        className="pointer-events-none absolute inset-x-0 bottom-0 z-20 bg-gradient-to-t from-black/70 to-transparent px-5 pb-5 pt-16"
      >
        <h3 className="text-xl font-extrabold text-white">{title}</h3>
      </motion.div>
    </motion.div>
  );
}

function TextCard({
  title,
  description,
  active,
  onClick,
}: {
  title: string;
  description: string;
  active: boolean;
  onClick: () => void;
}) {
  return (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      whileHover={{ y: -4, transition: { duration: 0.2, ease: "easeOut", delay: 0 } }}
      onClick={onClick}
      className="flex h-[100px] w-[100px] cursor-pointer items-center justify-center rounded-xl bg-white p-3 shadow-[0_10px_30px_-10px_rgba(0,0,0,0.4)]"
    >
      <AnimatePresence mode="wait">
        {active ? (
          <motion.p
            key="description"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="text-center text-[10px] leading-relaxed text-stone-600"
          >
            {description}
          </motion.p>
        ) : (
          <motion.h3
            key="title"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="text-center text-xs font-extrabold text-stone-900"
          >
            {title}
          </motion.h3>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

const cards = [
  {
    id: "sommerferie",
    imageSrc: "https://images.unsplash.com/photo-1534430480872-3498386e7856?w=400&h=400&fit=crop",
    title: "Sommerferie",
    description: "Roadtrip med campingvogn gjennom Sverige og Danmark. 6.–17. juli.",
    color: "#B5D1E2",
  },
  {
    id: "middager",
    imageSrc: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=400&h=400&fit=crop",
    title: "Middager",
    description: "Ukens middager og matinspirasjon for hele familien.",
    color: "#FDF3F5",
  },
];

export default function CanvasPage() {
  const [activeId, setActiveId] = useState<string | null>(null);

  return (
    <div className="relative flex min-h-screen flex-col items-center justify-center bg-stone-100 font-[family-name:var(--font-open-sans)]">
      {/* Main cards */}
      <div className="flex gap-6">
        <AnimatePresence mode="popLayout">
          {cards
            .filter((c) => activeId === null || c.id === activeId)
            .map((c) => (
              <Card
                key={c.id}
                imageSrc={c.imageSrc}
                title={c.title}
                description={c.description}
                color={c.color}
                active={activeId === c.id}
                onClick={() => setActiveId(activeId === c.id ? null : c.id)}
              />
            ))}
        </AnimatePresence>
      </div>

      {/* Small cards */}
      <div className="mt-8">
        <AnimatePresence mode="popLayout">
          {(activeId === null || activeId === "barnehage") && (
            <TextCard
              title="Barnehage, påske?"
              description="Skal vi sende jentene i barnehagen i påska?"
              active={activeId === "barnehage"}
              onClick={() => setActiveId(activeId === "barnehage" ? null : "barnehage")}
            />
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
