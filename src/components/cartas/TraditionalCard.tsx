"use client";

import Image from "next/image";
import { Card, getSuitSymbol, getSuitColor } from "@/lib/cardDeck";

interface TraditionalCardProps {
  card: Card | null;
  isRevealed: boolean;
  isWinner: boolean;
  onClick: () => void;
  dealDelay?: number;
}

export default function TraditionalCard({
  card,
  isRevealed,
  isWinner,
  onClick,
  dealDelay = 0,
}: TraditionalCardProps) {
  const suitSymbol = card ? getSuitSymbol(card.suit) : "";
  const suitColor = card ? getSuitColor(card.suit) : "";

  const isFaceCard = card && ["J", "Q", "K"].includes(card.rank);
  const isAce = card?.rank === "A";

  const faceCardEmoji: Record<string, string> = {
    J: "🃏",
    Q: "👑",
    K: "🤴",
  };

  return (
    <div
      className={`card-container cursor-pointer deal-animation ${isWinner ? "winner-glow" : ""}`}
      style={{
        width: "min(168px, 31vw)",
        height: "min(236px, 44vw)",
        animationDelay: `${dealDelay}ms`,
      }}
      onClick={onClick}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => e.key === "Enter" && onClick()}
      aria-label={
        isRevealed && card
          ? `${card.rank} de ${card.suit}`
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
          className="card-front flex flex-col"
          style={{
            background: "linear-gradient(145deg, #ffffff 0%, #f8f6f0 50%, #f0ece0 100%)",
            border: `3px solid ${isWinner ? "#d4af37" : "#ccc"}`,
            boxShadow: isWinner
              ? "0 4px 30px rgba(212,175,55,0.5)"
              : "0 4px 15px rgba(0,0,0,0.3)",
            borderRadius: 16,
          }}
        >
          {card && (
            <>
              <div
                className="absolute top-1.5 left-2 flex flex-col items-center leading-none"
                style={{ color: suitColor }}
              >
                <span className="text-xl sm:text-3xl font-extrabold">{card.rank}</span>
                <span className="text-lg sm:text-2xl -mt-0.5">{suitSymbol}</span>
              </div>

              <div className="flex-1 flex items-center justify-center">
                {isAce ? (
                  <span className="text-7xl sm:text-8xl select-none" style={{ color: suitColor }}>
                    {suitSymbol}
                  </span>
                ) : isFaceCard ? (
                  <div className="flex flex-col items-center gap-1">
                    <span className="text-5xl sm:text-6xl select-none">
                      {faceCardEmoji[card.rank]}
                    </span>
                    <span
                      className="text-3xl sm:text-4xl font-bold"
                      style={{ color: suitColor }}
                    >
                      {suitSymbol}
                    </span>
                  </div>
                ) : (
                  <span
                    className="text-6xl sm:text-7xl font-extrabold select-none"
                    style={{ color: suitColor }}
                  >
                    {card.rank}
                    <span className="text-4xl sm:text-5xl">{suitSymbol}</span>
                  </span>
                )}
              </div>

              <div
                className="absolute bottom-1.5 right-2 flex flex-col items-center leading-none rotate-180"
                style={{ color: suitColor }}
              >
                <span className="text-xl sm:text-3xl font-extrabold">{card.rank}</span>
                <span className="text-lg sm:text-2xl -mt-0.5">{suitSymbol}</span>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
