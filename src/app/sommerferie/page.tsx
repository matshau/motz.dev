"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import dynamic from "next/dynamic";
import { motion } from "framer-motion";

const RouteMap = dynamic(() => import("./components/RouteMap"), { ssr: false });
import type { Camper, MeetUp } from "./data/itinerary";
import {
  days,
  campers as initialCampers,
  meetUps as initialMeetUps,
  todoList,
  packingList,
  familyMembers,
  departureDate,
  returnDate,
  ACCESS_PIN,
} from "./data/itinerary";

function useCountdown(target: Date) {
  const [days, setDays] = useState<number | null>(null);

  useEffect(() => {
    function calc() {
      const now = new Date();
      const diff = target.getTime() - now.getTime();
      setDays(Math.max(0, Math.ceil(diff / (1000 * 60 * 60 * 24))));
    }
    calc();
    const id = setInterval(calc, 60_000);
    return () => clearInterval(id);
  }, [target]);

  return days;
}

const STORAGE_KEY = "sommerferie-unlocked";

function PinGate({ onUnlock }: { onUnlock: () => void }) {
  const [pin, setPin] = useState("");
  const [error, setError] = useState(false);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (pin.trim().toLowerCase() === ACCESS_PIN) {
      localStorage.setItem(STORAGE_KEY, "1");
      onUnlock();
    } else {
      setError(true);
      setPin("");
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-b from-sky-200 via-amber-100 to-amber-50 px-6 font-[family-name:var(--font-inter)]">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="flex w-full max-w-xs flex-col items-center rounded-3xl bg-white/80 p-8 shadow-lg backdrop-blur-sm"
      >
        <span className="text-5xl">🔒</span>
        <h1 className="mt-4 font-[family-name:var(--font-playfair)] text-2xl font-bold text-sky-900">
          Sommerferie 2026
        </h1>
        <p className="mt-2 text-center text-sm text-sky-600">
          Skriv inn koden for å se reiseplanen
        </p>
        <form onSubmit={handleSubmit} className="mt-6 flex w-full flex-col gap-3">
          <input
            type="text"
            value={pin}
            onChange={(e) => {
              setPin(e.target.value);
              setError(false);
            }}
            placeholder="Kode"
            autoFocus
            className={`w-full rounded-xl border-2 bg-white px-4 py-3 text-center text-lg tracking-widest outline-none transition-colors ${
              error ? "border-red-400" : "border-sky-200 focus:border-sky-400"
            }`}
          />
          {error && (
            <p className="text-center text-xs text-red-500">Feil kode, prøv igjen</p>
          )}
          <button
            type="submit"
            className="rounded-xl bg-sky-500 py-3 text-sm font-bold text-white transition-colors hover:bg-sky-600"
          >
            Lås opp
          </button>
        </form>
      </motion.div>
    </div>
  );
}

export default function SommerferiePage() {
  const [unlocked, setUnlocked] = useState(false);
  const [loaded, setLoaded] = useState(false);
  const daysLeft = useCountdown(departureDate);
  const [checked, setChecked] = useState<Set<string>>(new Set());
  const [camperList, setCamperList] = useState<Camper[]>(initialCampers);
  const [showCamperForm, setShowCamperForm] = useState(false);
  const [camperName, setCamperName] = useState("");
  const [camperWeight, setCamperWeight] = useState("");
  const [camperSleeps, setCamperSleeps] = useState("");
  const [camperDesc, setCamperDesc] = useState("");
  const [camperLink, setCamperLink] = useState("");
  const [todoDone, setTodoDone] = useState<Set<string>>(new Set());
  const [meetUpList, setMeetUpList] = useState<MeetUp[]>(initialMeetUps);
  const [showMeetUpForm, setShowMeetUpForm] = useState(false);
  const [meetUpName, setMeetUpName] = useState("");
  const [meetUpNote, setMeetUpNote] = useState("");

  useEffect(() => {
    setUnlocked(localStorage.getItem(STORAGE_KEY) === "1");
    setLoaded(true);
  }, []);

  if (!loaded) return null;
  if (!unlocked) return <PinGate onUnlock={() => setUnlocked(true)} />;

  function toggle(id: string) {
    setChecked((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  }

  function addCamper() {
    const name = camperName.trim();
    if (!name) return;
    const camper: Camper = {
      id: `c-${Date.now()}`,
      name,
      weight: camperWeight.trim(),
      sleeps: Number(camperSleeps) || 0,
      description: camperDesc.trim(),
      link: camperLink.trim() || undefined,
    };
    setCamperList((prev) => [...prev, camper]);
    setCamperName("");
    setCamperWeight("");
    setCamperSleeps("");
    setCamperDesc("");
    setCamperLink("");
    setShowCamperForm(false);
  }

  function toggleTodo(id: string) {
    setTodoDone((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  }

  function addMeetUp() {
    const name = meetUpName.trim();
    if (!name) return;
    setMeetUpList((prev) => [
      ...prev,
      { id: `m-${Date.now()}`, name, note: meetUpNote.trim() },
    ]);
    setMeetUpName("");
    setMeetUpNote("");
    setShowMeetUpForm(false);
  }

  const categories = [...new Set(packingList.map((i) => i.category))];

  return (
    <div className="min-h-screen bg-amber-50 font-[family-name:var(--font-inter)]">
      {/* Hero */}
      <section className="relative flex min-h-[70vh] flex-col items-center justify-center overflow-hidden px-6 text-center">
        {/* Background gradient */}
        <div className="absolute inset-0 bg-gradient-to-b from-sky-200 via-amber-100 to-amber-50" />

        {/* Decorative sun */}
        <div className="absolute top-8 right-12 h-28 w-28 rounded-full bg-yellow-300 opacity-60 blur-sm" />

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="relative z-10 font-[family-name:var(--font-playfair)] text-5xl leading-tight font-bold tracking-tight text-sky-900 sm:text-7xl"
        >
          Sommerferie 2026
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="relative z-10 mt-4 text-lg font-medium text-sky-700 sm:text-xl"
        >
          Danmark med campingvogn
        </motion.p>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="relative z-10 mt-6 text-4xl"
        >
          🚗🏕️
        </motion.div>
      </section>

      {/* Dates & Countdown */}
      <section className="flex justify-center px-6 py-12">
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          whileInView={{ scale: 1, opacity: 1 }}
          viewport={{ once: true }}
          className="flex items-center gap-6 rounded-3xl bg-white/70 px-8 py-6 shadow-sm backdrop-blur-sm sm:gap-10 sm:px-12"
        >
          <div className="flex flex-col items-center">
            <span className="text-[10px] font-semibold tracking-widest text-sky-500 uppercase">Avreise</span>
            <span className="mt-1 font-[family-name:var(--font-playfair)] text-lg font-bold text-sky-900 sm:text-xl">
              {departureDate.toLocaleDateString("nb-NO", { day: "numeric", month: "short" })}
            </span>
          </div>

          <div className="flex flex-col items-center">
            <span className="font-[family-name:var(--font-playfair)] text-4xl font-bold text-orange-500 sm:text-5xl">
              {daysLeft !== null ? daysLeft : "–"}
            </span>
            <span className="mt-2 text-xs text-sky-600">
              {daysLeft === 1 ? "dag igjen" : "dager igjen"}
            </span>
          </div>

          <div className="flex flex-col items-center">
            <span className="text-[10px] font-semibold tracking-widest text-sky-500 uppercase">Hjemkomst</span>
            <span className="mt-1 font-[family-name:var(--font-playfair)] text-lg font-bold text-sky-900 sm:text-xl">
              {returnDate.toLocaleDateString("nb-NO", { day: "numeric", month: "short" })}
            </span>
          </div>
        </motion.div>
      </section>

      {/* Reiserute */}
      <section className="mx-auto max-w-2xl px-6 py-12">
        <h2 className="mb-10 text-center font-[family-name:var(--font-playfair)] text-3xl font-bold text-sky-900 sm:text-4xl">
          Reiserute
        </h2>

        <div className="mb-10">
          <RouteMap />
          <p className="mt-2 text-center text-xs text-sky-500">
            Stiplet linje = ferge Hirtshals–Larvik
          </p>
        </div>

        <div className="flex flex-col gap-3">
          {days.map((d, i) => (
            <motion.div
              key={d.day}
              initial={{ opacity: 0, x: -10 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.3, delay: i * 0.03 }}
              className="flex items-center gap-4 rounded-2xl bg-white px-5 py-4 shadow-sm"
            >
              <div className="flex flex-col items-center">
                <span className="text-[10px] font-bold tracking-wider text-sky-400 uppercase">Dag</span>
                <span className="font-[family-name:var(--font-playfair)] text-xl font-bold text-sky-900">{d.day}</span>
              </div>
              <span className="self-center text-2xl leading-none">{d.emoji}</span>
              <div className="flex-1">
                <h3 className="text-sm font-bold text-sky-900">
                  {d.title}
                </h3>
                <p className="mt-0.5 text-xs leading-relaxed text-sky-600/80">
                  {d.description}
                </p>
              </div>
              {d.tag && (
                <span className="mt-1 shrink-0 rounded-full bg-sky-100 px-3 py-1 text-[10px] font-semibold text-sky-600">
                  {d.tag}
                </span>
              )}
            </motion.div>
          ))}
        </div>
      </section>

      {/* Campingvogn */}
      <section className="mx-auto max-w-2xl px-6 py-12">
        <h2 className="mb-8 text-center font-[family-name:var(--font-playfair)] text-3xl font-bold text-sky-900 sm:text-4xl">
          Campingvogn
        </h2>

        {camperList.length === 0 && !showCamperForm && (
          <p className="mb-4 text-center text-sm text-sky-500">
            Ingen campingvogner lagt til enda
          </p>
        )}

        <div className="flex flex-col gap-3">
          {camperList.map((c) => (
            <motion.div
              key={c.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="rounded-2xl bg-white px-5 py-4 shadow-sm"
            >
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-bold text-sky-900">{c.name}</h3>
                {c.link && (
                  <a
                    href={c.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs font-medium text-sky-500 hover:text-sky-700"
                  >
                    Lenke
                  </a>
                )}
              </div>
              {c.description && (
                <p className="mt-1 text-xs text-sky-600/80">{c.description}</p>
              )}
              <div className="mt-2 flex gap-3">
                {c.weight && (
                  <span className="rounded-full bg-amber-100 px-3 py-0.5 text-[10px] font-semibold text-amber-700">
                    {c.weight}
                  </span>
                )}
                {c.sleeps > 0 && (
                  <span className="rounded-full bg-sky-100 px-3 py-0.5 text-[10px] font-semibold text-sky-600">
                    {c.sleeps} soveplasser
                  </span>
                )}
              </div>
            </motion.div>
          ))}

          {showCamperForm ? (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex flex-col gap-3 rounded-2xl bg-white px-5 py-4 shadow-sm"
            >
              <input
                type="text"
                value={camperName}
                onChange={(e) => setCamperName(e.target.value)}
                placeholder="Navn / modell"
                autoFocus
                className="w-full rounded-xl border-2 border-sky-200 bg-transparent px-3 py-2 text-sm text-sky-900 outline-none placeholder:text-sky-300 focus:border-sky-400"
                onKeyDown={(e) => e.key === "Escape" && setShowCamperForm(false)}
              />
              <div className="flex gap-3">
                <input
                  type="text"
                  value={camperWeight}
                  onChange={(e) => setCamperWeight(e.target.value)}
                  placeholder="Vekt (f.eks. 750 kg)"
                  className="flex-1 rounded-xl border-2 border-sky-200 bg-transparent px-3 py-2 text-xs text-sky-700 outline-none placeholder:text-sky-300 focus:border-sky-400"
                />
                <input
                  type="number"
                  value={camperSleeps}
                  onChange={(e) => setCamperSleeps(e.target.value)}
                  placeholder="Soveplasser"
                  className="w-28 rounded-xl border-2 border-sky-200 bg-transparent px-3 py-2 text-xs text-sky-700 outline-none placeholder:text-sky-300 focus:border-sky-400"
                />
              </div>
              <input
                type="text"
                value={camperDesc}
                onChange={(e) => setCamperDesc(e.target.value)}
                placeholder="Beskrivelse (valgfritt)"
                className="w-full rounded-xl border-2 border-sky-200 bg-transparent px-3 py-2 text-xs text-sky-700 outline-none placeholder:text-sky-300 focus:border-sky-400"
              />
              <input
                type="url"
                value={camperLink}
                onChange={(e) => setCamperLink(e.target.value)}
                placeholder="Lenke (valgfritt)"
                className="w-full rounded-xl border-2 border-sky-200 bg-transparent px-3 py-2 text-xs text-sky-700 outline-none placeholder:text-sky-300 focus:border-sky-400"
              />
              <div className="flex gap-2">
                <button
                  onClick={addCamper}
                  className="flex-1 rounded-xl bg-sky-500 py-2 text-xs font-bold text-white transition-colors hover:bg-sky-600"
                >
                  Legg til
                </button>
                <button
                  onClick={() => setShowCamperForm(false)}
                  className="rounded-xl px-4 py-2 text-xs font-medium text-sky-500 transition-colors hover:bg-sky-50"
                >
                  Avbryt
                </button>
              </div>
            </motion.div>
          ) : (
            <button
              onClick={() => setShowCamperForm(true)}
              className="flex items-center justify-center gap-2 rounded-2xl border-2 border-dashed border-sky-200 px-5 py-4 text-sm font-medium text-sky-400 transition-colors hover:border-sky-400 hover:text-sky-600"
            >
              <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 5v14m7-7H5" />
              </svg>
              Legg til campingvogn
            </button>
          )}
        </div>
      </section>

      {/* Hvem skal vi treffe? */}
      <section className="mx-auto max-w-2xl px-6 py-12">
        <h2 className="mb-2 text-center font-[family-name:var(--font-playfair)] text-3xl font-bold text-sky-900 sm:text-4xl">
          Hvem skal vi treffe?
        </h2>
        <p className="mb-8 text-center text-sm text-sky-500">
          Noen som vil bli med på tur, eller treffe oss underveis?
        </p>

        {meetUpList.length === 0 && !showMeetUpForm && (
          <p className="mb-4 text-center text-sm text-sky-400">
            Ingen lagt til enda
          </p>
        )}

        <div className="flex flex-col gap-3">
          {meetUpList.map((m) => (
            <motion.div
              key={m.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex items-center gap-4 rounded-2xl bg-white px-5 py-4 shadow-sm"
            >
              <span className="text-2xl">👋</span>
              <div className="flex-1">
                <h3 className="text-sm font-bold text-sky-900">{m.name}</h3>
                {m.note && (
                  <p className="mt-0.5 text-xs text-sky-600/80">{m.note}</p>
                )}
              </div>
            </motion.div>
          ))}

          {showMeetUpForm ? (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex flex-col gap-3 rounded-2xl bg-white px-5 py-4 shadow-sm"
            >
              <input
                type="text"
                value={meetUpName}
                onChange={(e) => setMeetUpName(e.target.value)}
                placeholder="Navn"
                autoFocus
                className="w-full rounded-xl border-2 border-sky-200 bg-transparent px-3 py-2 text-sm text-sky-900 outline-none placeholder:text-sky-300 focus:border-sky-400"
                onKeyDown={(e) => {
                  if (e.key === "Enter") addMeetUp();
                  if (e.key === "Escape") setShowMeetUpForm(false);
                }}
              />
              <input
                type="text"
                value={meetUpNote}
                onChange={(e) => setMeetUpNote(e.target.value)}
                placeholder="Hvor / når / kommentar (valgfritt)"
                className="w-full rounded-xl border-2 border-sky-200 bg-transparent px-3 py-2 text-xs text-sky-700 outline-none placeholder:text-sky-300 focus:border-sky-400"
                onKeyDown={(e) => {
                  if (e.key === "Enter") addMeetUp();
                  if (e.key === "Escape") setShowMeetUpForm(false);
                }}
              />
              <div className="flex gap-2">
                <button
                  onClick={addMeetUp}
                  className="flex-1 rounded-xl bg-sky-500 py-2 text-xs font-bold text-white transition-colors hover:bg-sky-600"
                >
                  Legg til
                </button>
                <button
                  onClick={() => setShowMeetUpForm(false)}
                  className="rounded-xl px-4 py-2 text-xs font-medium text-sky-500 transition-colors hover:bg-sky-50"
                >
                  Avbryt
                </button>
              </div>
            </motion.div>
          ) : (
            <button
              onClick={() => setShowMeetUpForm(true)}
              className="flex items-center justify-center gap-2 rounded-2xl border-2 border-dashed border-sky-200 px-5 py-4 text-sm font-medium text-sky-400 transition-colors hover:border-sky-400 hover:text-sky-600"
            >
              <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 5v14m7-7H5" />
              </svg>
              Legg til person
            </button>
          )}
        </div>
      </section>

      {/* Pakkelist */}
      <section className="mx-auto max-w-2xl px-6 py-12">
        <h2 className="mb-8 text-center font-[family-name:var(--font-playfair)] text-3xl font-bold text-sky-900 sm:text-4xl">
          Pakkeliste
        </h2>
        <p className="mb-6 text-center text-sm text-sky-600">
          {checked.size} av {packingList.length} pakket
        </p>

        <div className="flex flex-col gap-6">
          {categories.map((cat) => (
            <div key={cat}>
              <h3 className="mb-3 text-xs font-bold tracking-widest text-orange-500 uppercase">
                {cat}
              </h3>
              <div className="flex flex-col gap-2">
                {packingList
                  .filter((item) => item.category === cat)
                  .map((item) => (
                    <button
                      key={item.id}
                      onClick={() => toggle(item.id)}
                      className="flex items-center gap-3 rounded-xl bg-white px-4 py-3 text-left shadow-sm transition-colors hover:bg-sky-50"
                    >
                      <div
                        className={`flex h-5 w-5 shrink-0 items-center justify-center rounded-md border-2 transition-colors ${
                          checked.has(item.id)
                            ? "border-green-500 bg-green-500"
                            : "border-sky-300"
                        }`}
                      >
                        {checked.has(item.id) && (
                          <svg
                            className="h-3 w-3 text-white"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                            strokeWidth={3}
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="M5 13l4 4L19 7"
                            />
                          </svg>
                        )}
                      </div>
                      <span
                        className={`text-sm ${
                          checked.has(item.id)
                            ? "text-sky-400 line-through"
                            : "text-sky-800"
                        }`}
                      >
                        {item.label}
                      </span>
                    </button>
                  ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Familieinfo */}
      <section className="mx-auto max-w-2xl px-6 py-12">
        <h2 className="mb-8 text-center font-[family-name:var(--font-playfair)] text-3xl font-bold text-sky-900 sm:text-4xl">
          Hvem reiser?
        </h2>

        <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
          {familyMembers.map((member, i) => (
            <motion.div
              key={member.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="flex flex-col items-center rounded-2xl bg-white p-5 shadow-sm"
            >
              <div className="relative h-16 w-16 overflow-hidden rounded-full">
                <Image
                  src={member.avatar}
                  alt={member.name}
                  fill
                  className="object-cover"
                />
              </div>
              <h3 className="mt-3 text-sm font-bold text-sky-900">
                {member.name}
              </h3>
              <p className="mt-1 text-center text-xs text-sky-600">
                {member.role}
              </p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Må fikses */}
      <section className="mx-auto max-w-2xl px-6 py-12 pb-20">
        <h2 className="mb-2 text-center font-[family-name:var(--font-playfair)] text-3xl font-bold text-sky-900 sm:text-4xl">
          Må fikses
        </h2>
        <p className="mb-8 text-center text-sm text-sky-500">
          {todoDone.size} av {todoList.length} ferdig
        </p>

        <div className="flex flex-col gap-2">
          {todoList.map((item, i) => {
            const done = todoDone.has(item.id);
            return (
              <motion.button
                key={item.id}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.03 }}
                onClick={() => toggleTodo(item.id)}
                className="flex items-center gap-3 rounded-xl bg-white px-4 py-3 text-left shadow-sm transition-colors hover:bg-sky-50"
              >
                <div
                  className={`flex h-5 w-5 shrink-0 items-center justify-center rounded-md border-2 transition-colors ${
                    done ? "border-green-500 bg-green-500" : "border-sky-300"
                  }`}
                >
                  {done && (
                    <svg
                      className="h-3 w-3 text-white"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={3}
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                    </svg>
                  )}
                </div>
                <span
                  className={`text-sm ${
                    done ? "text-sky-400 line-through" : "text-sky-800"
                  }`}
                >
                  {item.label}
                </span>
              </motion.button>
            );
          })}
        </div>
      </section>
    </div>
  );
}
