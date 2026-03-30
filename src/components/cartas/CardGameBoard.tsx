"use client";

import { useState, useCallback, useEffect, useRef } from "react";
import { Card, dealCards, findWinners, getSuitSymbol } from "@/lib/cardDeck";
import CardPlayerSlot from "./CardPlayerSlot";
import confetti from "canvas-confetti";

interface RoundResult {
  round: number;
  winner: number | null;
  tiedPlayers: number[];
  card: Card;
  isTie: boolean;
}

export default function CardGameBoard() {
  const [playerCount, setPlayerCount] = useState(6);
  const [cards, setCards] = useState<(Card | null)[]>([]);
  const [revealed, setRevealed] = useState<boolean[]>([]);
  const [winners, setWinners] = useState<number[]>([]);
  const [isTie, setIsTie] = useState(false);
  const [isDealt, setIsDealt] = useState(false);
  const [history, setHistory] = useState<RoundResult[]>([]);
  const [roundNumber, setRoundNumber] = useState(0);
  const [dealKey, setDealKey] = useState(0);
  const [showPopup, setShowPopup] = useState(false);
  const [isShuffling, setIsShuffling] = useState(false);
  const confettiFired = useRef(false);

  const allRevealed = revealed.length > 0 && revealed.every(Boolean);

  useEffect(() => {
    if (!allRevealed || confettiFired.current) return;

    const winnerIndices = findWinners(cards);
    if (winnerIndices.length === 0) return;

    const tie = winnerIndices.length > 1;
    setWinners(winnerIndices);
    setIsTie(tie);
    setShowPopup(true);
    confettiFired.current = true;

    const topCard = cards[winnerIndices[0]];
    if (topCard) {
      setHistory((prev) => [
        {
          round: roundNumber,
          winner: tie ? null : winnerIndices[0] + 1,
          tiedPlayers: tie ? winnerIndices.map((i) => i + 1) : [],
          card: topCard,
          isTie: tie,
        },
        ...prev,
      ].slice(0, 20));
    }

    if (!tie) {
      const duration = 2000;
      const end = Date.now() + duration;
      const frame = () => {
        confetti({
          particleCount: 3,
          angle: 60,
          spread: 55,
          origin: { x: 0, y: 0.7 },
          colors: ["#d4af37", "#f0d060", "#fff", "#39ff14"],
        });
        confetti({
          particleCount: 3,
          angle: 120,
          spread: 55,
          origin: { x: 1, y: 0.7 },
          colors: ["#d4af37", "#f0d060", "#fff", "#39ff14"],
        });
        if (Date.now() < end) requestAnimationFrame(frame);
      };
      frame();
    }
  }, [allRevealed, cards, roundNumber]);

  const handleDeal = useCallback(() => {
    if (isShuffling) return;

    setIsShuffling(true);
    setIsDealt(false);
    setWinners([]);
    setIsTie(false);
    setShowPopup(false);
    confettiFired.current = false;

    setTimeout(() => {
      const dealt = dealCards(playerCount);
      setCards(dealt);
      setRevealed(new Array(playerCount).fill(false));
      setIsDealt(true);
      setIsShuffling(false);
      setRoundNumber((prev) => prev + 1);
      setDealKey((prev) => prev + 1);
    }, 1200);
  }, [playerCount, isShuffling]);

  const handleReveal = useCallback(
    (index: number) => {
      if (revealed[index]) return;
      setRevealed((prev) => {
        const next = [...prev];
        next[index] = true;
        return next;
      });
    },
    [revealed]
  );

  const handleRevealAll = useCallback(() => {
    setRevealed(new Array(playerCount).fill(true));
  }, [playerCount]);

  const handlePlayerCountChange = useCallback((count: number) => {
    setPlayerCount(count);
    setCards([]);
    setRevealed([]);
    setWinners([]);
    setIsTie(false);
    setIsDealt(false);
    confettiFired.current = false;
  }, []);

  const gridCols =
    playerCount <= 2
      ? "grid-cols-2"
      : playerCount <= 4
        ? "grid-cols-2 sm:grid-cols-4"
        : playerCount <= 6
          ? "grid-cols-2 sm:grid-cols-3"
          : "grid-cols-2 sm:grid-cols-4";

  const getCardDisplay = (card: Card | null) => {
    if (!card) return "";
    return `${card.rank} ${getSuitSymbol(card.suit)}`;
  };

  return (
    <div className="w-full max-w-5xl mx-auto px-4 pb-12 relative z-10">
      <div className="flex flex-col md:flex-row gap-6 items-start">

        {/* Controls - panel izquierdo */}
        <div className="flex flex-col items-center gap-2 shrink-0 md:pt-4">
          <label
            className="text-xs font-semibold uppercase tracking-widest mb-1"
            style={{ color: "rgba(240, 208, 96, 0.7)" }}
          >
            J
          </label>
          {[2, 3, 4, 5, 6, 7, 8].map((n) => (
            <button
              key={n}
              onClick={() => handlePlayerCountChange(n)}
              className={`
                w-9 h-9 rounded-lg text-sm font-bold transition-all duration-200
                ${playerCount === n
                  ? "bg-gradient-to-b from-yellow-500 to-yellow-700 text-black shadow-lg scale-110"
                  : "bg-black/30 text-white/70 hover:bg-black/50 hover:text-white border border-white/10"
                }
              `}
            >
              {n}
            </button>
          ))}

          <div className="w-px h-3 bg-white/10 my-1" />

          <button
            onClick={handleDeal}
            disabled={isShuffling}
            title={isShuffling ? "Barajeando..." : "Repartir"}
            className={`btn-pulse w-9 h-9 rounded-lg font-bold text-base
              shadow-lg active:scale-95 transition-all duration-200 border
              ${isShuffling
                ? "bg-gradient-to-b from-gray-500 to-gray-600 text-gray-300 border-gray-400/50 cursor-not-allowed"
                : "bg-gradient-to-b from-yellow-500 via-yellow-600 to-yellow-700 text-black hover:from-yellow-400 hover:to-yellow-600 border-yellow-400/50"
              }`}
          >
            🎴
          </button>

          {isDealt && !allRevealed && (
            <button
              onClick={handleRevealAll}
              title="Revelar Todas"
              className="w-9 h-9 rounded-lg font-bold text-base
                bg-gradient-to-b from-emerald-600 to-emerald-800
                text-white shadow-lg hover:from-emerald-500 hover:to-emerald-700
                active:scale-95 transition-all duration-200
                border border-emerald-400/30"
            >
              👁
            </button>
          )}
        </div>

      {/* Winner / Tie popup overlay */}
      {showPopup && winners.length > 0 && allRevealed && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center"
          onClick={() => setShowPopup(false)}
        >
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" />
          <div
            className="winner-banner relative z-10 text-center px-8 sm:px-12 py-8 sm:py-10 rounded-3xl shadow-2xl max-w-md mx-4"
            style={{
              background: isTie
                ? "linear-gradient(145deg, #374151, #1f2937)"
                : "linear-gradient(145deg, #92700a, #5a4106)",
              border: isTie ? "2px solid #6b7280" : "2px solid #d4af37",
            }}
            onClick={(e) => e.stopPropagation()}
          >
            {isTie ? (
              <>
                <div className="text-5xl sm:text-6xl mb-3">🤝</div>
                <div className="text-2xl sm:text-3xl font-extrabold text-white mb-2">
                  ¡Empate!
                </div>
                <p className="text-sm sm:text-base" style={{ color: "rgba(240, 208, 96, 0.8)" }}>
                  Jugadores {winners.map((i) => i + 1).join(", ")} empataron con{" "}
                  {getCardDisplay(cards[winners[0]])}
                </p>
              </>
            ) : (
              <>
                <div className="text-5xl sm:text-6xl mb-3">🏆</div>
                <div className="text-2xl sm:text-3xl font-extrabold text-white mb-2">
                  ¡Jugador {winners[0] + 1} Gana!
                </div>
                <p className="text-sm sm:text-base" style={{ color: "rgba(240, 208, 96, 0.8)" }}>
                  con {getCardDisplay(cards[winners[0]])}
                </p>
              </>
            )}
            <button
              onClick={() => setShowPopup(false)}
              className="mt-5 px-6 py-2 rounded-xl font-bold text-sm
                bg-white/20 text-white hover:bg-white/30
                active:scale-95 transition-all duration-200 border border-white/20"
            >
              Cerrar
            </button>
          </div>
        </div>
      )}

        {/* Game area - panel derecho */}
        <div className="flex-1 min-w-0">

      {/* Shuffling animation */}
      {isShuffling && (
        <div className="flex flex-col items-center justify-center py-12 sm:py-20 gap-5">
          <div className="shuffle-deck relative" style={{ width: 120, height: 168 }}>
            {[...Array(5)].map((_, i) => (
              <div
                key={i}
                className={`absolute ${
                  i % 3 === 0
                    ? "shuffle-card-a"
                    : i % 3 === 1
                      ? "shuffle-card-b"
                      : "shuffle-card-c"
                }`}
                style={{
                  width: 100,
                  height: 140,
                  left: 10 + i * 2,
                  top: i * 2,
                  background: "linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%)",
                  border: "2px solid #d4af37",
                  borderRadius: 16,
                  boxShadow: `0 ${2 + i}px ${8 + i * 2}px rgba(0,0,0,0.4)`,
                  zIndex: i,
                  animationDelay: `${i * 70}ms`,
                }}
              />
            ))}
          </div>
          <p
            className="text-lg sm:text-xl font-bold tracking-wide animate-pulse"
            style={{ color: "rgba(240, 208, 96, 0.9)" }}
          >
            Barajeando...
          </p>
        </div>
      )}

      {/* Game area */}
      {!isShuffling && !isDealt ? (
        <div className="flex flex-col items-center justify-center py-16 sm:py-24 gap-4">
          <div className="text-6xl sm:text-8xl mb-2 select-none">🃏</div>
          <p className="text-lg sm:text-xl font-semibold" style={{ color: "rgba(240, 208, 96, 0.8)" }}>
            Selecciona jugadores y haz clic en Repartir
          </p>
          <p className="text-sm" style={{ color: "rgba(240, 230, 210, 0.5)" }}>
            La carta más alta gana la ronda
          </p>
        </div>
      ) : isDealt ? (
        <div
          key={dealKey}
          className={`grid ${gridCols} gap-3 justify-items-center max-w-4xl mx-auto`}
        >
          {cards.map((card, index) => (
            <CardPlayerSlot
              key={`${dealKey}-${index}`}
              playerNumber={index + 1}
              card={card}
              isRevealed={revealed[index]}
              isWinner={!isTie && winners.includes(index) && allRevealed}
              onReveal={() => handleReveal(index)}
              dealDelay={index * 80}
            />
          ))}
        </div>
      ) : null}

        </div>{/* end game area */}
      </div>{/* end flex row */}

      {/* Round history */}
      {history.length > 0 && (
        <div className="mt-10 sm:mt-14">
          <h3
            className="text-center text-sm font-bold uppercase tracking-widest mb-4"
            style={{ color: "rgba(212, 175, 55, 0.6)" }}
          >
            Historial de Rondas
          </h3>
          <div className="flex flex-wrap justify-center gap-2">
            {history.map((result, i) => (
              <div
                key={i}
                className="px-3 py-1.5 rounded-lg text-xs font-medium bg-black/25 border border-white/5
                  flex items-center gap-2"
                style={{ color: "rgba(240, 230, 210, 0.6)" }}
              >
                <span className="opacity-50">R{result.round}</span>
                <span style={{ color: result.isTie ? "rgba(180, 180, 180, 0.9)" : "rgba(240, 208, 96, 0.9)" }}>
                  {result.isTie
                    ? `Empate (${result.tiedPlayers.join(", ")})`
                    : `Jugador ${result.winner}`}
                </span>
                <span>{getCardDisplay(result.card)}</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
