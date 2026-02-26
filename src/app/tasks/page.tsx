"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { db } from "@/lib/firebase";
import {
  collection,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
  onSnapshot,
  query,
  orderBy,
} from "firebase/firestore";

type Status = "todo" | "in_progress" | "done";

const statusConfig: Record<Status, { label: string; color: string; bg: string }> = {
  todo: { label: "Ikke startet", color: "text-stone-400", bg: "bg-white/5 backdrop-blur-sm" },
  in_progress: { label: "Pågår", color: "text-amber-400", bg: "bg-amber-500/10 backdrop-blur-sm" },
  done: { label: "Ferdig", color: "text-emerald-400", bg: "bg-emerald-500/10 backdrop-blur-sm" },
};

const statusOrder: Status[] = ["todo", "in_progress", "done"];

interface Task {
  id: string;
  title: string;
  description: string;
  link: string;
  status: Status;
  createdAt: number;
}

const tasksRef = collection(db, "tasks");

export default function TasksPage() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loaded, setLoaded] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [link, setLink] = useState("");

  useEffect(() => {
    const q = query(tasksRef, orderBy("createdAt", "asc"));
    const unsub = onSnapshot(q, (snap) => {
      const items: Task[] = snap.docs.map((d) => ({
        id: d.id,
        ...(d.data() as Omit<Task, "id">),
      }));
      setTasks(items);
      setLoaded(true);
    });
    return unsub;
  }, []);

  if (!loaded) return null;

  async function addTask() {
    const t = title.trim();
    if (!t) return;
    await addDoc(tasksRef, {
      title: t,
      description: description.trim(),
      link: link.trim(),
      status: "todo" as Status,
      createdAt: Date.now(),
    });
    setTitle("");
    setDescription("");
    setLink("");
    setShowForm(false);
  }

  async function cycleStatus(id: string) {
    const task = tasks.find((t) => t.id === id);
    if (!task) return;
    const next = statusOrder[(statusOrder.indexOf(task.status) + 1) % statusOrder.length];
    await updateDoc(doc(db, "tasks", id), { status: next });
  }

  async function removeTask(id: string) {
    await deleteDoc(doc(db, "tasks", id));
  }

  const doneCount = tasks.filter((t) => t.status === "done").length;

  return (
    <div className="relative flex min-h-screen flex-col items-center overflow-hidden px-6 py-16 font-[family-name:var(--font-inter)]">
      {/* Dark gradient background with colorful blobs */}
      <div className="pointer-events-none fixed inset-0 -z-10 bg-gradient-to-br from-stone-950 via-stone-900 to-stone-950">
        <div className="absolute -left-20 -top-20 h-[500px] w-[500px] animate-pulse rounded-full bg-purple-600/30 blur-3xl" />
        <div className="absolute right-0 top-1/4 h-[450px] w-[450px] animate-pulse rounded-full bg-blue-600/25 blur-3xl [animation-delay:1s]" />
        <div className="absolute bottom-0 left-1/4 h-[400px] w-[400px] animate-pulse rounded-full bg-amber-600/20 blur-3xl [animation-delay:2s]" />
        <div className="absolute -right-16 bottom-1/4 h-[350px] w-[350px] animate-pulse rounded-full bg-rose-600/20 blur-3xl [animation-delay:3s]" />
      </div>

      {/* Draggable glass orb */}
      <motion.div
        drag
        dragMomentum={false}
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        whileDrag={{ scale: 1.05 }}
        className="fixed left-1/2 top-1/2 z-50 h-40 w-40 -translate-x-1/2 -translate-y-1/2 cursor-grab rounded-full active:cursor-grabbing"
        style={{ touchAction: "none" }}
      >
        {/* Outer glow */}
        <div className="absolute -inset-2 rounded-full bg-white/5 blur-xl" />

        {/* Main glass body */}
        <div
          className="absolute inset-0 rounded-full border border-white/20"
          style={{
            background: "radial-gradient(ellipse at 30% 20%, rgba(255,255,255,0.08), transparent 60%)",
            backdropFilter: "blur(12px) brightness(1.1) saturate(1.4)",
            WebkitBackdropFilter: "blur(12px) brightness(1.1) saturate(1.4)",
            boxShadow: "inset 0 1px 1px rgba(255,255,255,0.15), inset 0 -4px 12px rgba(0,0,0,0.2), 0 8px 32px rgba(0,0,0,0.3)",
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
            background: "radial-gradient(ellipse at 50% 50%, rgba(255,255,255,0.3), transparent 70%)",
            filter: "blur(4px)",
          }}
        />

        {/* Small sharp specular */}
        <div
          className="absolute left-[22%] top-[18%] h-[12%] w-[20%] rounded-full"
          style={{
            background: "radial-gradient(ellipse, rgba(255,255,255,0.5), transparent 70%)",
            filter: "blur(1px)",
          }}
        />

        {/* Bottom caustic / reflected light */}
        <div
          className="absolute bottom-[8%] left-[20%] h-[15%] w-[60%] rounded-full"
          style={{
            background: "radial-gradient(ellipse, rgba(255,255,255,0.06), transparent 70%)",
            filter: "blur(6px)",
          }}
        />
      </motion.div>

      <motion.h1
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="font-[family-name:var(--font-playfair)] text-4xl font-bold tracking-tight text-white"
      >
        Tasks
      </motion.h1>

      {tasks.length > 0 && (
        <p className="mt-2 text-sm text-stone-400">
          {doneCount} av {tasks.length} ferdig
        </p>
      )}

      <div className="mt-8 w-full max-w-lg">
        <div className="flex flex-col gap-3">
          <AnimatePresence mode="popLayout">
            {tasks.map((task) => {
              const s = statusConfig[task.status];
              return (
                <motion.div
                  key={task.id}
                  layout
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className={`rounded-2xl border border-white/10 bg-white/5 px-5 py-4 shadow-lg shadow-black/20 backdrop-blur-xl ${
                    task.status === "done" ? "opacity-50" : ""
                  }`}
                >
                  <div className="flex items-start gap-3">
                    <div className="flex-1">
                      <h3
                        className={`text-sm font-bold ${
                          task.status === "done"
                            ? "text-stone-500 line-through"
                            : "text-white"
                        }`}
                      >
                        {task.title}
                      </h3>
                      {task.description && (
                        <p className="mt-1 text-xs leading-relaxed text-stone-400">
                          {task.description}
                        </p>
                      )}
                      <div className="mt-2 flex flex-wrap items-center gap-2">
                        <button
                          onClick={() => cycleStatus(task.id)}
                          className={`rounded-full px-3 py-0.5 text-[10px] font-semibold transition-colors ${s.bg} ${s.color}`}
                        >
                          {s.label}
                        </button>
                        {task.link && (
                          <a
                            href={task.link}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-1 rounded-full bg-white/5 px-3 py-0.5 text-[10px] font-medium text-stone-400 backdrop-blur-sm transition-colors hover:text-white"
                          >
                            <svg className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                              <path strokeLinecap="round" strokeLinejoin="round" d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101" />
                              <path strokeLinecap="round" strokeLinejoin="round" d="M10.172 13.828a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.102 1.101" />
                            </svg>
                            Lenke
                          </a>
                        )}
                      </div>
                    </div>
                    <button
                      onClick={() => removeTask(task.id)}
                      className="mt-0.5 text-stone-600 transition-colors hover:text-red-400"
                    >
                      <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </button>
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>

          {tasks.length === 0 && !showForm && (
            <p className="py-8 text-center text-sm text-stone-500">
              Ingen oppgaver enda
            </p>
          )}

          {showForm ? (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex flex-col gap-3 rounded-2xl border border-white/10 bg-white/5 px-5 py-4 shadow-lg shadow-black/20 backdrop-blur-xl"
            >
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Tittel"
                autoFocus
                className="w-full rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-sm text-white outline-none placeholder:text-stone-500 focus:border-white/20"
                onKeyDown={(e) => {
                  if (e.key === "Enter" && !e.shiftKey) addTask();
                  if (e.key === "Escape") setShowForm(false);
                }}
              />
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Beskrivelse (valgfritt)"
                rows={2}
                className="w-full resize-none rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-xs text-stone-300 outline-none placeholder:text-stone-500 focus:border-white/20"
              />
              <input
                type="url"
                value={link}
                onChange={(e) => setLink(e.target.value)}
                placeholder="Lenke (valgfritt)"
                className="w-full rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-xs text-stone-300 outline-none placeholder:text-stone-500 focus:border-white/20"
                onKeyDown={(e) => {
                  if (e.key === "Enter") addTask();
                  if (e.key === "Escape") setShowForm(false);
                }}
              />
              <div className="flex gap-2">
                <button
                  onClick={addTask}
                  className="flex-1 rounded-xl bg-white/10 py-2 text-xs font-bold text-white backdrop-blur-sm transition-colors hover:bg-white/15"
                >
                  Legg til
                </button>
                <button
                  onClick={() => {
                    setShowForm(false);
                    setTitle("");
                    setDescription("");
                    setLink("");
                  }}
                  className="rounded-xl px-4 py-2 text-xs font-medium text-stone-500 transition-colors hover:bg-white/5 hover:text-stone-300"
                >
                  Avbryt
                </button>
              </div>
            </motion.div>
          ) : (
            <button
              onClick={() => setShowForm(true)}
              className="flex items-center justify-center gap-2 rounded-2xl border border-dashed border-white/10 bg-white/[0.02] px-5 py-4 text-sm font-medium text-stone-500 backdrop-blur-lg transition-colors hover:border-white/20 hover:bg-white/5 hover:text-stone-300"
            >
              <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 5v14m7-7H5" />
              </svg>
              Legg til oppgave
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
