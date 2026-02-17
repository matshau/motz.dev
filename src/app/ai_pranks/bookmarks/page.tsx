import Image from "next/image";
import Link from "next/link";
import { communityPranks } from "../data/pranks";
import PrankCard from "../components/PrankCard";

export default function Bookmarks() {
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

      <section className="mt-6 px-5">
        <h2 className="mb-4 px-3 text-base font-bold tracking-tighter text-white/60">Saved Pranks</h2>
        <div className="grid grid-cols-2 gap-3">
          {communityPranks.map((prank, i) => (
            <PrankCard key={i} {...prank} compact showBookmark={false} />
          ))}
        </div>
      </section>

      {/* Bottom nav */}
      <nav className="fixed bottom-0 left-0 right-0 z-50 flex items-center justify-between bg-black/60 px-6 py-4 pb-8 backdrop-blur-xl">
        <Link href="/ai_pranks/profile">
          <Image
            src="/user-placeholder.jpg"
            alt="Profile"
            width={32}
            height={32}
            className="h-8 w-8 rounded-full object-cover"
          />
        </Link>
        <div className="flex items-center gap-6">
          {/* Bookmark (active) */}
          <button className="flex flex-col items-center gap-1 text-white">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z" />
            </svg>
            <div className="h-1 w-1 rounded-full bg-white" />
          </button>
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
