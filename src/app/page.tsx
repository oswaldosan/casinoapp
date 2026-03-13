import GameBoard from "@/components/GameBoard";

export default function Home() {
  return (
    <main className="min-h-screen flex flex-col items-center relative">
      {/* Game */}
      <GameBoard />

      {/* Footer */}
      <footer
        className="w-full py-4 text-center text-xs relative z-10 mt-auto"
        style={{ color: "rgba(240, 230, 210, 0.3)" }}
      >
        Tiktokero Games &copy; {new Date().getFullYear()} — Solo para entretenimiento
      </footer>
    </main>
  );
}
