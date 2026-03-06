"use client";

import { Card, getSuitSymbol, getSuitColor } from "@/lib/deck";

interface PlayingCardProps {
  card: Card | null;
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
        width: "min(187px, 35vw)",
        height: "min(262px, 49vw)",
        animationDelay: `${dealDelay}ms`,
      }}
      onClick={onClick}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => e.key === "Enter" && onClick()}
      aria-label={
        isRevealed && card
          ? `${card.rank} of ${card.suit}`
          : "Face-down card — click to reveal"
      }
    >
      <div className={`card-inner ${isRevealed ? "flipped" : ""}`}>
        {/* Back of card */}
        <div
          className="card-back flex items-center justify-center"
          style={{
            background: "linear-gradient(135deg, #1a3a5c 0%, #0f2440 50%, #1a3a5c 100%)",
            border: "3px solid #d4af37",
            boxShadow: "0 4px 20px rgba(0,0,0,0.4), inset 0 0 30px rgba(0,0,0,0.2)",
          }}
        >
          <div className="relative w-full h-full flex items-center justify-center p-3">
            <div
              className="absolute inset-2 rounded-lg border-2 border-gold/30"
              style={{
                background: `repeating-linear-gradient(
                  45deg,
                  transparent,
                  transparent 5px,
                  rgba(212,175,55,0.08) 5px,
                  rgba(212,175,55,0.08) 10px
                )`,
              }}
            />
            <div className="text-3xl sm:text-4xl z-10 select-none" style={{ color: "#d4af37" }}>
              🎰
            </div>
          </div>
        </div>

        {/* Front of card */}
        <div
          className="card-front flex flex-col"
          style={{
            background: `linear-gradient(145deg, #ffffff 0%, #f8f6f0 50%, #f0ece0 100%)`,
            border: `3px solid ${isWinner ? "#d4af37" : "#ccc"}`,
            boxShadow: isWinner
              ? "0 4px 30px rgba(212,175,55,0.5)"
              : "0 4px 15px rgba(0,0,0,0.3)",
          }}
        >
          {card && (
            <>
              {/* Top-left rank and suit */}
              <div
                className="absolute top-1.5 left-2 flex flex-col items-center leading-none"
                style={{ color: suitColor }}
              >
                <span className="text-lg sm:text-2xl font-extrabold">{card.rank}</span>
                <span className="text-base sm:text-xl -mt-0.5">{suitSymbol}</span>
              </div>

              {/* Center display */}
              <div className="flex-1 flex items-center justify-center">
                {isAce ? (
                  <span className="text-6xl sm:text-7xl select-none" style={{ color: suitColor }}>
                    {suitSymbol}
                  </span>
                ) : isFaceCard ? (
                  <div className="flex flex-col items-center gap-1">
                    <span className="text-4xl sm:text-5xl select-none">
                      {faceCardEmoji[card.rank]}
                    </span>
                    <span
                      className="text-2xl sm:text-3xl font-bold"
                      style={{ color: suitColor }}
                    >
                      {suitSymbol}
                    </span>
                  </div>
                ) : (
                  <span
                    className="text-5xl sm:text-6xl font-extrabold select-none"
                    style={{ color: suitColor }}
                  >
                    {card.rank}
                    <span className="text-3xl sm:text-4xl">{suitSymbol}</span>
                  </span>
                )}
              </div>

              {/* Bottom-right rank and suit (inverted) */}
              <div
                className="absolute bottom-1.5 right-2 flex flex-col items-center leading-none rotate-180"
                style={{ color: suitColor }}
              >
                <span className="text-lg sm:text-2xl font-extrabold">{card.rank}</span>
                <span className="text-base sm:text-xl -mt-0.5">{suitSymbol}</span>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
