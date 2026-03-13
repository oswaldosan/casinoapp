export type Letter =
  "A"|"B"|"C"|"D"|"E"|"F"|"G"|"H"|"I"|"J"|"K"|"L"|"M"|
  "N"|"O"|"P"|"Q"|"R"|"S"|"T"|"U"|"V"|"W"|"X"|"Y"|"Z";

export interface AnimalCard {
  letter: Letter;
  animal: string;
  emoji: string;
  value: number;
  color: string;
  bgGradient: string;
}

const ANIMAL_CARDS: AnimalCard[] = [
  { letter: "A", animal: "Águila",       emoji: "🦅", value: 1,  color: "#b91c1c", bgGradient: "linear-gradient(135deg, #fecaca, #fca5a5)" },
  { letter: "B", animal: "Búfalo",       emoji: "🦬", value: 2,  color: "#92400e", bgGradient: "linear-gradient(135deg, #fde68a, #fbbf24)" },
  { letter: "C", animal: "Cocodrilo",    emoji: "🐊", value: 3,  color: "#166534", bgGradient: "linear-gradient(135deg, #bbf7d0, #86efac)" },
  { letter: "D", animal: "Delfín",       emoji: "🐬", value: 4,  color: "#1e40af", bgGradient: "linear-gradient(135deg, #bfdbfe, #93c5fd)" },
  { letter: "E", animal: "Elefante",     emoji: "🐘", value: 5,  color: "#6b21a8", bgGradient: "linear-gradient(135deg, #e9d5ff, #c4b5fd)" },
  { letter: "F", animal: "Foca",         emoji: "🦭", value: 6,  color: "#0e7490", bgGradient: "linear-gradient(135deg, #a5f3fc, #67e8f9)" },
  { letter: "G", animal: "Gorila",       emoji: "🦍", value: 7,  color: "#ea580c", bgGradient: "linear-gradient(135deg, #fed7aa, #fdba74)" },
  { letter: "H", animal: "Hipopótamo",   emoji: "🦛", value: 8,  color: "#be185d", bgGradient: "linear-gradient(135deg, #fbcfe8, #f9a8d4)" },
  { letter: "I", animal: "Iguana",       emoji: "🦎", value: 9,  color: "#4d7c0f", bgGradient: "linear-gradient(135deg, #d9f99d, #bef264)" },
  { letter: "J", animal: "Jaguar",       emoji: "🐆", value: 10, color: "#a16207", bgGradient: "linear-gradient(135deg, #fef08a, #facc15)" },
  { letter: "K", animal: "Koala",        emoji: "🐨", value: 11, color: "#64748b", bgGradient: "linear-gradient(135deg, #e2e8f0, #cbd5e1)" },
  { letter: "L", animal: "León",         emoji: "🦁", value: 12, color: "#c2410c", bgGradient: "linear-gradient(135deg, #ffedd5, #fdba74)" },
  { letter: "M", animal: "Mono",         emoji: "🐒", value: 13, color: "#854d0e", bgGradient: "linear-gradient(135deg, #fef3c7, #fde68a)" },
  { letter: "N", animal: "Narval",       emoji: "🐋", value: 14, color: "#1d4ed8", bgGradient: "linear-gradient(135deg, #dbeafe, #93c5fd)" },
  { letter: "O", animal: "Oso",          emoji: "🐻", value: 15, color: "#78350f", bgGradient: "linear-gradient(135deg, #fde68a, #d97706)" },
  { letter: "P", animal: "Panda",        emoji: "🐼", value: 16, color: "#1e293b", bgGradient: "linear-gradient(135deg, #f1f5f9, #e2e8f0)" },
  { letter: "Q", animal: "Quetzal",      emoji: "🦜", value: 17, color: "#059669", bgGradient: "linear-gradient(135deg, #a7f3d0, #6ee7b7)" },
  { letter: "R", animal: "Rinoceronte",  emoji: "🦏", value: 18, color: "#475569", bgGradient: "linear-gradient(135deg, #e2e8f0, #94a3b8)" },
  { letter: "S", animal: "Serpiente",    emoji: "🐍", value: 19, color: "#15803d", bgGradient: "linear-gradient(135deg, #bbf7d0, #4ade80)" },
  { letter: "T", animal: "Tigre",        emoji: "🐯", value: 20, color: "#ea580c", bgGradient: "linear-gradient(135deg, #ffedd5, #fb923c)" },
  { letter: "U", animal: "Unicornio",    emoji: "🦄", value: 21, color: "#a21caf", bgGradient: "linear-gradient(135deg, #f5d0fe, #e879f9)" },
  { letter: "V", animal: "Venado",       emoji: "🦌", value: 22, color: "#7c2d12", bgGradient: "linear-gradient(135deg, #fed7aa, #ea580c)" },
  { letter: "W", animal: "Wombat",       emoji: "🐻‍❄️", value: 23, color: "#334155", bgGradient: "linear-gradient(135deg, #f8fafc, #cbd5e1)" },
  { letter: "X", animal: "Xoloitzcuintle", emoji: "🐕", value: 24, color: "#9f1239", bgGradient: "linear-gradient(135deg, #ffe4e6, #fda4af)" },
  { letter: "Y", animal: "Yak",          emoji: "🐃", value: 25, color: "#5b21b6", bgGradient: "linear-gradient(135deg, #ede9fe, #c4b5fd)" },
  { letter: "Z", animal: "Zorro",        emoji: "🦊", value: 26, color: "#dc2626", bgGradient: "linear-gradient(135deg, #fecaca, #f87171)" },
];

function shuffleArray<T>(arr: T[]): T[] {
  const shuffled = [...arr];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

export function dealCards(count: number): AnimalCard[] {
  const doublePool = [...ANIMAL_CARDS, ...ANIMAL_CARDS];
  const shuffled = shuffleArray(doublePool);
  return shuffled.slice(0, count);
}

export function findWinners(cards: (AnimalCard | null)[]): number[] {
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
