import GameBoard from "@/components/GameBoard";
import Link from "next/link";

export default function LetrasPage() {
  return (
    <main className="min-h-screen flex flex-col items-center relative">
      <div className="w-full max-w-5xl mx-auto px-4 pt-4 pb-2 relative z-10">
        <Link
          href="/"
          className="inline-flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-lg
            bg-black/30 border border-white/10 hover:bg-black/50 transition-all duration-200"
          style={{ color: "rgba(240, 208, 96, 0.8)" }}
        >
          ← Volver al menú
        </Link>
      </div>

      <GameBoard />

      <footer
        className="w-full py-4 text-center text-xs relative z-10 mt-auto"
        style={{ color: "rgba(240, 230, 210, 0.3)" }}
      >
        Tiktokero Games &copy; {new Date().getFullYear()} — Solo para entretenimiento
      </footer>
    </main>
  );
}
