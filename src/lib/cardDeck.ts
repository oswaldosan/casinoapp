export type Suit = "hearts" | "diamonds" | "clubs" | "spades";
export type Rank = "2" | "3" | "4" | "5" | "6" | "7" | "8" | "9" | "10" | "J" | "Q" | "K" | "A";

export interface Card {
  suit: Suit;
  rank: Rank;
  value: number;
}

const SUITS: Suit[] = ["hearts", "diamonds", "clubs", "spades"];
const RANKS: Rank[] = ["2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K", "A"];

const RANK_VALUES: Record<Rank, number> = {
  "2": 2, "3": 3, "4": 4, "5": 5, "6": 6, "7": 7,
  "8": 8, "9": 9, "10": 10, "J": 11, "Q": 12, "K": 13, "A": 14,
};

const SHOE_DECKS = 6; // 312 cartas por shoe
const RESHUFFLE_THRESHOLD = 24;

let shoe: Card[] = [];

function createDeck(): Card[] {
  const deck: Card[] = [];
  for (const suit of SUITS) {
    for (const rank of RANKS) {
      deck.push({ suit, rank, value: RANK_VALUES[rank] });
    }
  }
  return deck;
}

// Entero aleatorio en [0, max) sin sesgo modular.
// Usa rejection sampling: descarta valores que caerían en la zona
// donde 2^32 mod max != 0, eliminando el sesgo por completo.
function cryptoRandomInt(max: number): number {
  if (max <= 1) return 0;
  const buf = new Uint32Array(1);
  // Mayor múltiplo de max que cabe en 2^32
  const maxValid = Math.floor(4294967296 / max) * max;
  let r: number;
  do {
    crypto.getRandomValues(buf);
    r = buf[0];
  } while (r >= maxValid);
  return r % max;
}

// Fisher-Yates shuffle — una sola pasada es matemáticamente suficiente
// para generar cualquier permutación con probabilidad uniforme 1/n!
function shuffle<T>(arr: T[]): T[] {
  const result = [...arr];
  for (let i = result.length - 1; i > 0; i--) {
    const j = cryptoRandomInt(i + 1);
    [result[i], result[j]] = [result[j], result[i]];
  }
  return result;
}

function buildShoe(): Card[] {
  const allCards: Card[] = [];
  for (let i = 0; i < SHOE_DECKS; i++) {
    allCards.push(...createDeck());
  }
  return shuffle(allCards);
}

function getOrRebuildShoe(needed: number): void {
  if (shoe.length < Math.max(needed, RESHUFFLE_THRESHOLD)) {
    shoe = buildShoe();
  }
}

// Reparte cartas del shoe garantizando que no se repita la misma carta
// (rank+suit) en una misma ronda. Duplicados del multi-deck se descartan.
// Las cartas se barajan antes de asignar para romper correlación posicional.
export function dealCards(count: number): Card[] {
  getOrRebuildShoe(count * 2); // margen para posibles duplicados descartados
  const dealt: Card[] = [];
  const seen = new Set<string>();

  while (dealt.length < count && shoe.length > 0) {
    const card = shoe.shift()!;
    const key = `${card.rank}-${card.suit}`;
    if (!seen.has(key)) {
      seen.add(key);
      dealt.push(card);
    }
  }

  return shuffle(dealt);
}

export function getSuitSymbol(suit: Suit): string {
  const symbols: Record<Suit, string> = {
    hearts: "♥",
    diamonds: "♦",
    clubs: "♣",
    spades: "♠",
  };
  return symbols[suit];
}

export function getSuitColor(suit: Suit): string {
  return suit === "hearts" || suit === "diamonds" ? "#dc2626" : "#1a1a2e";
}

export function findWinners(cards: (Card | null)[]): number[] {
  let maxValue = -1;
  cards.forEach((card) => {
    if (card && card.value > maxValue) {
      maxValue = card.value;
    }
  });
  if (maxValue === -1) return [];
  const indices: number[] = [];
  cards.forEach((card, index) => {
    if (card && card.value === maxValue) {
      indices.push(index);
    }
  });
  return indices;
}
