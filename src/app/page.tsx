import Link from "next/link";
import Image from "next/image";

export default function Home() {
  return (
    <main className="min-h-screen flex flex-col items-center relative">
      <div className="flex-1 flex flex-col items-center justify-center gap-10 px-4 py-12 relative z-10 w-full max-w-3xl mx-auto">
        {/* Logo & Title */}
        <div className="flex flex-col items-center gap-4">
          <Image
            src="/logo.png"
            alt="Tiktokero Games"
            width={120}
            height={120}
            className="rounded-full object-cover select-none"
            style={{ filter: "drop-shadow(0 4px 20px rgba(212,175,55,0.5))" }}
            draggable={false}
            priority
          />
          <h1
            className="title-shimmer text-3xl sm:text-5xl font-extrabold tracking-tight text-center"
          >
            Tiktokero Games
          </h1>
          <p className="text-sm sm:text-base text-center" style={{ color: "rgba(240, 230, 210, 0.5)" }}>
            Elige un juego para comenzar
          </p>
        </div>

        {/* Game Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 w-full">
          <Link
            href="/cartas"
            className="group relative flex flex-col items-center gap-4 p-8 rounded-2xl
              bg-black/30 border border-white/10 hover:border-yellow-500/50
              hover:bg-black/40 transition-all duration-300
              hover:shadow-lg hover:shadow-yellow-500/10 hover:scale-[1.02]"
          >
            <div className="text-6xl sm:text-7xl select-none group-hover:scale-110 transition-transform duration-300">
              🃏
            </div>
            <div className="text-center">
              <h2 className="text-xl sm:text-2xl font-extrabold mb-1" style={{ color: "rgba(240, 208, 96, 0.95)" }}>
                Cartas
              </h2>
              <p className="text-xs sm:text-sm" style={{ color: "rgba(240, 230, 210, 0.5)" }}>
                Baraja clásica — La carta más alta gana
              </p>
            </div>
            <div
              className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
              style={{
                background: "radial-gradient(ellipse at center, rgba(212, 175, 55, 0.08) 0%, transparent 70%)",
              }}
            />
          </Link>

          <Link
            href="/letras"
            className="group relative flex flex-col items-center gap-4 p-8 rounded-2xl
              bg-black/30 border border-white/10 hover:border-emerald-500/50
              hover:bg-black/40 transition-all duration-300
              hover:shadow-lg hover:shadow-emerald-500/10 hover:scale-[1.02]"
          >
            <div className="text-6xl sm:text-7xl select-none group-hover:scale-110 transition-transform duration-300">
              🦁
            </div>
            <div className="text-center">
              <h2 className="text-xl sm:text-2xl font-extrabold mb-1" style={{ color: "rgba(110, 231, 183, 0.95)" }}>
                Letras
              </h2>
              <p className="text-xs sm:text-sm" style={{ color: "rgba(240, 230, 210, 0.5)" }}>
                Animales A-Z — La letra más alta gana
              </p>
            </div>
            <div
              className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
              style={{
                background: "radial-gradient(ellipse at center, rgba(110, 231, 183, 0.08) 0%, transparent 70%)",
              }}
            />
          </Link>
        </div>
      </div>

      <footer
        className="w-full py-4 text-center text-xs relative z-10 mt-auto"
        style={{ color: "rgba(240, 230, 210, 0.3)" }}
      >
        Tiktokero Games &copy; {new Date().getFullYear()} — Solo para entretenimiento
      </footer>
    </main>
  );
}
