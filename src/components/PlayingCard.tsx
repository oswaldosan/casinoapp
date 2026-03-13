"use client";

import Image from "next/image";
import { AnimalCard } from "@/lib/deck";

interface PlayingCardProps {
  card: AnimalCard | null;
  isRevealed: boolean;
  isWinner: boolean;
  onClick: () => void;
  dealDelay?: number;
}

export default function PlayingCard({
  card,
  isRevealed,
  isWinner,
  onClick,
  dealDelay = 0,
}: PlayingCardProps) {
  return (
    <div
      className={`card-container cursor-pointer deal-animation ${isWinner ? "winner-glow" : ""}`}
      style={{
        width: "min(205px, 42vw)",
        height: "min(205px, 42vw)",
        animationDelay: `${dealDelay}ms`,
      }}
      onClick={onClick}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => e.key === "Enter" && onClick()}
      aria-label={
        isRevealed && card
          ? `${card.letter} — ${card.animal}`
          : "Carta oculta — clic para revelar"
      }
    >
      <div className={`card-inner ${isRevealed ? "flipped" : ""}`}>
        {/* Back of card */}
        <div
          className="card-back flex items-center justify-center"
          style={{
            background: "linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%)",
            border: "3px solid #d4af37",
            boxShadow: "0 4px 20px rgba(0,0,0,0.4), inset 0 0 30px rgba(0,0,0,0.2)",
            borderRadius: 16,
          }}
        >
          <div className="relative w-full h-full flex items-center justify-center p-2">
            <Image
              src="/logo.png"
              alt="Logo"
              width={110}
              height={110}
              className="rounded-full object-cover select-none"
              style={{ filter: "drop-shadow(0 2px 8px rgba(212,175,55,0.4))" }}
              draggable={false}
              priority
            />
          </div>
        </div>

        {/* Front of card */}
        <div
          className="card-front flex flex-col items-center justify-center gap-1"
          style={{
            background: card?.bgGradient ?? "#fff",
            border: `3px solid ${isWinner ? "#d4af37" : card?.color ?? "#ccc"}`,
            boxShadow: isWinner
              ? "0 4px 30px rgba(212,175,55,0.5)"
              : "0 4px 15px rgba(0,0,0,0.2)",
            borderRadius: 16,
          }}
        >
          {card && (() => {
            const starCount = Math.ceil((card.value / 26) * 5);
            return (
              <>
                {/* Top-left letter */}
                <div
                  className="absolute top-2 left-2.5 font-extrabold text-xl sm:text-2xl leading-none"
                  style={{ color: card.color }}
                >
                  {card.letter}
                </div>

                {/* Power stars (top-right) */}
                <div className="absolute top-2 right-2.5 flex gap-px">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <span
                      key={i}
                      className="text-[10px] sm:text-xs select-none"
                      style={{ color: card.color, opacity: i < starCount ? 1 : 0.2 }}
                    >
                      ★
                    </span>
                  ))}
                </div>

                {/* Center emoji */}
                <div className="text-5xl sm:text-6xl select-none">
                  {card.emoji}
                </div>

                {/* Animal name */}
                <div
                  className="text-xs sm:text-sm font-bold tracking-wide"
                  style={{ color: card.color }}
                >
                  {card.animal}
                </div>

                {/* Power bar (bottom center) */}
                <div className="flex gap-0.5 mt-0.5">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <span
                      key={i}
                      className="text-xs sm:text-sm select-none"
                    >
                      {i < starCount ? "⭐" : "☆"}
                    </span>
                  ))}
                </div>

                {/* Bottom-right letter */}
                <div
                  className="absolute bottom-2 right-2.5 font-extrabold text-xl sm:text-2xl leading-none rotate-180"
                  style={{ color: card.color }}
                >
                  {card.letter}
                </div>
              </>
            );
          })()}
        </div>
      </div>
    </div>
  );
}
