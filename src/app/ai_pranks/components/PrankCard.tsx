"use client";

import Image from "next/image";
import Link from "next/link";

interface PrankCardProps {
  title: string;
  user: string;
  gradient: string;
  avatar: string;
  images: string[];
  preview?: boolean;
  slideIndex?: number;
  className?: string;
  style?: React.CSSProperties;
  compact?: boolean;
  showBookmark?: boolean;
  id?: string;
}

export default function PrankCard({
  title,
  user,
  gradient,
  avatar,
  images,
  preview = false,
  slideIndex = 0,
  className = "",
  style,
  compact = false,
  showBookmark = true,
  id,
}: PrankCardProps) {
  const Wrapper = id ? Link : "div";
  const wrapperProps = id ? { href: `/ai_pranks/prank/${id}` } : {};

  return (
    <Wrapper
      {...wrapperProps as any}
      className={`relative flex flex-col justify-end overflow-hidden rounded-2xl ${compact ? "p-3" : "p-6"} ${className}`}
      style={{ aspectRatio: "3/4", ...style }}
    >
      {/* Background images with crossfade */}
      {images.map((img, imgIdx) => (
        <Image
          key={imgIdx}
          src={img}
          alt={title}
          fill
          className="object-cover transition-opacity duration-700 will-change-[opacity]"
          style={{
            opacity: preview ? (imgIdx === slideIndex ? 1 : 0) : (imgIdx === 0 ? 1 : 0),
          }}
        />
      ))}

      {/* Gradient overlay */}
      <div
        className={`absolute inset-0 bg-gradient-to-b ${gradient} transition-opacity duration-200`}
        style={{ opacity: preview ? 0 : 0.6 }}
      />

      {/* Preview badge */}
      <div
        className="absolute top-4 left-4 z-10 rounded-full bg-white px-4 py-2 transition-opacity duration-200"
        style={{ opacity: preview ? 1 : 0 }}
      >
        <span className="text-xs font-bold text-black">Preview</span>
      </div>

      {/* Bookmark */}
      {showBookmark && (
        <div
          className={`absolute ${compact ? "top-2 right-2 h-7 w-7" : "top-4 right-4 h-9 w-9"} z-10 flex items-center justify-center rounded-full bg-white/80 transition-opacity duration-200`}
          style={{ opacity: preview ? 0 : 1 }}
        >
          <svg width={compact ? 12 : 16} height={compact ? 12 : 16} viewBox="0 0 24 24" fill="none" stroke="black" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
            <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z" />
          </svg>
        </div>
      )}

      {/* Title */}
      <p
        className={`relative z-10 ${compact ? "mb-2 text-lg" : "mb-4 text-5xl"} leading-tight font-bold tracking-tighter text-black/80 transition-opacity duration-200`}
        style={{ opacity: preview ? 0 : 1 }}
      >
        {title}
      </p>

      {/* User */}
      <div
        className={`relative z-10 flex items-center ${compact ? "gap-2" : "gap-4"} transition-opacity duration-200`}
        style={{ opacity: preview ? 0 : 1 }}
      >
        <Image
          src={avatar}
          alt={user}
          width={compact ? 20 : 28}
          height={compact ? 20 : 28}
          className={`${compact ? "h-5 w-5" : "h-7 w-7"} rounded-full object-cover`}
        />
        <span className={`${compact ? "text-[10px]" : "text-xs"} font-semibold text-black/70`}>{user}</span>
      </div>
    </Wrapper>
  );
}
