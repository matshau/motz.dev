"use client";

import { type ReactNode } from "react";

interface PressableProps {
  children: ReactNode;
  className?: string;
  style?: React.CSSProperties;
  onPressIn?: () => void;
  onPressOut?: () => void;
}

export default function Pressable({
  children,
  className,
  style,
  onPressIn,
  onPressOut,
}: PressableProps) {
  return (
    <div
      className={className}
      style={{ ...style, cursor: "pointer" }}
      onMouseDown={onPressIn}
      onMouseUp={onPressOut}
      onMouseLeave={onPressOut}
      onTouchStart={onPressIn}
      onTouchEnd={onPressOut}
    >
      {children}
    </div>
  );
}
