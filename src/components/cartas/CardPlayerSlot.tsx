"use client";

import { Card, getSuitSymbol } from "@/lib/cardDeck";
import TraditionalCard from "./TraditionalCard";

interface CardPlayerSlotProps {
  playerNumber: number;
  card: Card | null;
  isRevealed: boolean;
  isWinner: boolean;
  onReveal: () => void;
  dealDelay?: number;
}

export default function CardPlayerSlot({
  playerNumber,
  card,
  isRevealed,
  isWinner,
  onReveal,
  dealDelay = 0,
}: CardPlayerSlotProps) {
  return (
    <div className="flex flex-col items-center gap-1">
      <TraditionalCard
        card={card}
        isRevealed={isRevealed}
        isWinner={isWinner}
        onClick={onReveal}
        dealDelay={dealDelay}
      />

      <div
        className={`
          px-3 py-1 rounded-full text-xs sm:text-sm font-bold tracking-wide
          transition-all duration-300
          ${isWinner
            ? "bg-gradient-to-r from-yellow-600 to-yellow-400 text-black shadow-lg shadow-yellow-500/30"
            : "bg-black/30 border border-white/10"
          }
        `}
        style={
          isWinner
            ? {}
            : { color: "rgba(240, 208, 96, 0.8)", borderColor: "rgba(212, 175, 55, 0.2)" }
        }
      >
        {isWinner ? `⭐ Jugador ${playerNumber} ⭐` : `Jugador ${playerNumber}`}
      </div>

      {isRevealed && card && (
        <div
          className="text-xs sm:text-sm font-semibold px-2 py-0.5 rounded bg-black/20"
          style={{ color: isWinner ? "#f0d060" : "rgba(240, 230, 210, 0.7)" }}
        >
          {card.rank} {getSuitSymbol(card.suit)}
        </div>
      )}
    </div>
  );
}
