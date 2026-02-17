"use client";

import Image from "next/image";
import Link from "next/link";
import { communityPranks } from "../data/pranks";

const stats = [
  { label: "Created", value: 12 },
  { label: "Saved", value: 34 },
  { label: "Shared", value: 8 },
];

const menuItems = [
  { label: "Edit profile", icon: "user" },
  { label: "Notifications", icon: "bell" },
  { label: "Privacy", icon: "shield" },
  { label: "Help & Support", icon: "help" },
];

const icons: Record<string, React.ReactNode> = {
  user: (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
      <circle cx="12" cy="7" r="4" />
    </svg>
  ),
  bell: (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" />
      <path d="M13.73 21a2 2 0 0 1-3.46 0" />
    </svg>
  ),
  shield: (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
    </svg>
  ),
  help: (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10" />
      <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3" />
      <line x1="12" y1="17" x2="12.01" y2="17" />
    </svg>
  ),
};

export default function Profile() {
  return (
    <div className="min-h-screen bg-black font-[family-name:var(--font-cerebri-sans)] text-white">
      <header className="flex items-center justify-center gap-2 px-5 pt-4 pb-2">
        <Image
          src="/jester-hat.png"
          alt="AI Pranks"
          width={40}
          height={40}
          className="object-contain"
        />
        <span className="text-base font-medium tracking-wide">AI Pranks</span>
      </header>

      {/* Avatar + name */}
      <div className="mt-8 flex flex-col items-center">
        <Image
          src="/user-placeholder.jpg"
          alt="Profile"
          width={80}
          height={80}
          className="h-20 w-20 rounded-full object-cover"
        />
        <h1 className="mt-4 text-xl font-bold tracking-tighter">You</h1>
        <p className="mt-1 text-sm text-white/40">Prankster since 2025</p>
      </div>

      {/* Stats */}
      <div className="mt-6 flex justify-center gap-8">
        {stats.map((s) => (
          <div key={s.label} className="flex flex-col items-center">
            <span className="text-xl font-bold">{s.value}</span>
            <span className="mt-1 text-xs text-white/40">{s.label}</span>
          </div>
        ))}
      </div>

      {/* Recent pranks */}
      <section className="mt-8 px-5">
        <h2 className="mb-3 px-3 text-sm font-bold text-white/40">Recent pranks</h2>
        <div className="flex gap-3 overflow-x-auto scrollbar-hide">
          {communityPranks.slice(0, 4).map((prank) => (
            <div key={prank.id} className="relative shrink-0 overflow-hidden rounded-xl" style={{ width: 120, aspectRatio: "3/4" }}>
              <Image
                src={prank.images[0]}
                alt={prank.title}
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-2">
                <p className="text-[11px] font-bold leading-tight">{prank.title}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Menu */}
      <section className="mt-8 px-5">
        <div className="flex flex-col gap-1">
          {menuItems.map((item) => (
            <button
              key={item.label}
              className="flex items-center gap-4 rounded-xl px-4 py-3.5 text-white/70 active:bg-white/[0.05]"
            >
              {icons[item.icon]}
              <span className="text-sm font-semibold">{item.label}</span>
              <svg className="ml-auto" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M9 18l6-6-6-6" />
              </svg>
            </button>
          ))}
        </div>
      </section>

      {/* Sign out */}
      <div className="mt-4 px-5 pb-28">
        <button className="w-full rounded-xl py-3.5 text-sm font-semibold text-red-400">
          Sign out
        </button>
      </div>

      {/* Bottom nav */}
      <nav className="fixed bottom-0 left-0 right-0 z-50 flex items-center justify-between bg-black/60 px-6 py-4 pb-8 backdrop-blur-xl">
        <button className="flex flex-col items-center gap-1">
          <Image
            src="/user-placeholder.jpg"
            alt="Profile"
            width={32}
            height={32}
            className="h-8 w-8 rounded-full object-cover ring-2 ring-white"
          />
          <div className="h-1 w-1 rounded-full bg-white" />
        </button>
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
          {/* Prank */}
          <Link href="/ai_pranks">
            <Image
              src="/jester-hat.png"
              alt="Pranks"
              width={22}
              height={22}
              className="object-contain opacity-50"
            />
          </Link>
        </div>
      </nav>

      <div className="h-24" />
    </div>
  );
}
