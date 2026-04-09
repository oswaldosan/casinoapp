import { describe, it, expect } from "vitest";
import { dealCards, findWinners } from "./cardDeck";

describe("dealCards — distribución de ganadores", () => {
  it("ningún jugador domina en 1000 rondas con 6 jugadores", () => {
    const ROUNDS = 1000;
    const PLAYERS = 6;
    const wins: Record<number, number> = {};

    for (let i = 1; i <= PLAYERS; i++) wins[i] = 0;

    for (let r = 0; r < ROUNDS; r++) {
      const cards = dealCards(PLAYERS);
      const winners = findWinners(cards);
      for (const w of winners) {
        wins[w + 1] += 1 / winners.length; // empates se reparten
      }
    }

    const expected = ROUNDS / PLAYERS; // ~166.7
    console.log("\n📊 Distribución de victorias (1000 rondas, 6 jugadores):");
    console.log("   Esperado por jugador: ~" + expected.toFixed(1));
    console.log("   ─────────────────────────────────");

    for (let i = 1; i <= PLAYERS; i++) {
      const pct = ((wins[i] / ROUNDS) * 100).toFixed(1);
      const bar = "█".repeat(Math.round(wins[i] / 5));
      console.log(`   Jugador ${i}: ${wins[i].toFixed(1).padStart(6)} (${pct}%) ${bar}`);
    }

    // Chi-squared test: cada jugador debería ganar ~1/6 de las veces
    // Con α=0.01 y df=5, el valor crítico es 15.09
    let chiSquared = 0;
    for (let i = 1; i <= PLAYERS; i++) {
      chiSquared += (wins[i] - expected) ** 2 / expected;
    }
    console.log(`\n   χ² = ${chiSquared.toFixed(2)} (crítico α=0.01: 15.09)`);
    console.log(
      chiSquared < 15.09
        ? "   ✅ Distribución uniforme — no hay sesgo detectable"
        : "   ❌ Distribución NO uniforme — posible sesgo"
    );

    expect(chiSquared).toBeLessThan(15.09);
  });

  it("ningún jugador domina en 1000 rondas con 8 jugadores", () => {
    const ROUNDS = 1000;
    const PLAYERS = 8;
    const wins: Record<number, number> = {};

    for (let i = 1; i <= PLAYERS; i++) wins[i] = 0;

    for (let r = 0; r < ROUNDS; r++) {
      const cards = dealCards(PLAYERS);
      const winners = findWinners(cards);
      for (const w of winners) {
        wins[w + 1] += 1 / winners.length;
      }
    }

    const expected = ROUNDS / PLAYERS; // 125
    console.log("\n📊 Distribución de victorias (1000 rondas, 8 jugadores):");
    console.log("   Esperado por jugador: ~" + expected.toFixed(1));
    console.log("   ─────────────────────────────────");

    for (let i = 1; i <= PLAYERS; i++) {
      const pct = ((wins[i] / ROUNDS) * 100).toFixed(1);
      const bar = "█".repeat(Math.round(wins[i] / 5));
      console.log(`   Jugador ${i}: ${wins[i].toFixed(1).padStart(6)} (${pct}%) ${bar}`);
    }

    let chiSquared = 0;
    for (let i = 1; i <= PLAYERS; i++) {
      chiSquared += (wins[i] - expected) ** 2 / expected;
    }
    // df=7, α=0.01 → valor crítico 18.48
    console.log(`\n   χ² = ${chiSquared.toFixed(2)} (crítico α=0.01: 18.48)`);
    console.log(
      chiSquared < 18.48
        ? "   ✅ Distribución uniforme — no hay sesgo detectable"
        : "   ❌ Distribución NO uniforme — posible sesgo"
    );

    expect(chiSquared).toBeLessThan(18.48);
  });

  it("las cartas repartidas no se repiten dentro de una misma ronda", () => {
    for (let r = 0; r < 100; r++) {
      const cards = dealCards(8);
      const keys = cards.map((c) => `${c.rank}-${c.suit}`);
      const unique = new Set(keys);
      expect(unique.size).toBe(keys.length);
    }
  });

  it("distribución de rangos ganadores es variada", () => {
    const ROUNDS = 500;
    const rankWins: Record<string, number> = {};

    for (let r = 0; r < ROUNDS; r++) {
      const cards = dealCards(6);
      const winners = findWinners(cards);
      const winCard = cards[winners[0]];
      rankWins[winCard.rank] = (rankWins[winCard.rank] || 0) + 1;
    }

    console.log("\n📊 Rangos que ganan (500 rondas, 6 jugadores):");
    const sorted = Object.entries(rankWins).sort((a, b) => b[1] - a[1]);
    for (const [rank, count] of sorted) {
      const pct = ((count / ROUNDS) * 100).toFixed(1);
      const bar = "█".repeat(Math.round(count / 3));
      console.log(`   ${rank.padStart(2)}: ${String(count).padStart(4)} (${pct}%) ${bar}`);
    }

    // El rango más ganador no debería superar el 50% de las rondas
    const maxRankPct = sorted[0][1] / ROUNDS;
    expect(maxRankPct).toBeLessThan(0.5);
  });
});
