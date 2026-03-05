import GameBoard from "@/components/GameBoard";

export default function Home() {
  return (
    <main className="min-h-screen flex flex-col items-center relative">
      {/* Header */}
      <header className="w-full py-6 sm:py-8 text-center relative z-10">
        <div className="flex justify-center items-center gap-3 mb-2">
          <span className="text-3xl sm:text-4xl select-none">🎰</span>
          <h1 className="title-shimmer text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight">
            El Casino del Tío Tiktokero
          </h1>
          <span className="text-3xl sm:text-4xl select-none">🎰</span>
        </div>
        <div
          className="w-32 sm:w-48 h-0.5 mx-auto mt-3 rounded-full"
          style={{
            background: "linear-gradient(90deg, transparent, #d4af37, transparent)",
          }}
        />
      </header>

      {/* Game title */}
      <section className="relative z-10 mb-6 sm:mb-8 text-center">
        <h2
          className="text-lg sm:text-2xl font-bold tracking-wide"
          style={{ color: "rgba(240, 208, 96, 0.9)" }}
        >
          🃏 Banquito
        </h2>
        <p className="text-xs sm:text-sm mt-1" style={{ color: "rgba(240, 230, 210, 0.5)" }}>
          La carta más alta se lleva la ronda
        </p>
      </section>

      {/* Game */}
      <GameBoard />

      {/* Footer */}
      <footer
        className="w-full py-4 text-center text-xs relative z-10 mt-auto"
        style={{ color: "rgba(240, 230, 210, 0.3)" }}
      >
        El Casino del Tío Tiktokero &copy; {new Date().getFullYear()} — Solo para entretenimiento
      </footer>
    </main>
  );
}
