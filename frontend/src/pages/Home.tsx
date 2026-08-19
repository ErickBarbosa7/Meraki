import { useCallback, useEffect, useRef, useState } from "react";
import type { Word } from "../types/word";
import { getRandomWord, getAllWords } from "../services/wordService";
import Logo from "../components/Logo";
import WordReel from "../components/WordReel";
import DiscoverButton from "../components/DiscoverButton";
import DarkModeToggle from "../components/DarkModeToggle";
import LottieAnimation from "../components/LottieAnimation";
import creativity from "../assets/Creativity.json";
import plane from "../assets/plane.json";

const GRAIN =
  "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='160' height='160'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.5'/%3E%3C/svg%3E\")";

export default function Home() {
  const [words, setWords] = useState<Word[]>([]);
  const [isWordsLoading, setIsWordsLoading] = useState(true);
  const [word, setWord] = useState<Word | null>(null);
  const [targetWord, setTargetWord] = useState<Word | null>(null);
  const [isFetching, setIsFetching] = useState(false);
  const [isSpinning, setIsSpinning] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [discovered, setDiscovered] = useState(false);
  const [copied, setCopied] = useState(false);
  const copyTimerRef = useRef<number | null>(null);
  const isBusyRef = useRef(false);

  useEffect(() => {
    let active = true;
    getAllWords()
      .then((res) => {
        if (active) setWords(res.words);
      })
      .catch(() => {
        if (active) setError("Could not load the words.");
      })
      .finally(() => {
        if (active) setIsWordsLoading(false);
      });
    return () => {
      active = false;
    };
  }, []);

  useEffect(() => {
    return () => {
      if (copyTimerRef.current !== null) {
        window.clearTimeout(copyTimerRef.current);
      }
    };
  }, []);

  async function handleCopy() {
    if (!word) return;
    try {
      await navigator.clipboard.writeText(word.word);
      setCopied(true);
      if (copyTimerRef.current !== null) {
        window.clearTimeout(copyTimerRef.current);
      }
      copyTimerRef.current = window.setTimeout(() => setCopied(false), 1500);
    } catch {
      setCopied(false);
    }
  }

  const handleSpinComplete = useCallback(() => {
    if (!targetWord) return;
    setWord(targetWord);
    setIsSpinning(false);
    setDiscovered(true);
  }, [targetWord]);

  async function handleDiscover() {
    if (isFetching || isSpinning) return;
    setIsFetching(true);
    setError(null);
    setDiscovered(false);
    try {
      const target = await getRandomWord();
      setTargetWord(target);
      setIsSpinning(true);
    } catch {
      setError("No pudimos conectar. Intenta de nuevo.");
    } finally {
      setIsFetching(false);
    }
  }

  const isBusy = isFetching || isSpinning;

  useEffect(() => {
    isBusyRef.current = isBusy;
  }, [isBusy]);

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.code !== "Space") return;
      const target = e.target as HTMLElement | null;
      if (target && target.closest("button, a, input, [role='button']")) return;
      e.preventDefault();
      if (!isBusyRef.current) void handleDiscover();
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, []);

  return (
    <main className="relative min-h-[100dvh] overflow-x-hidden">
      {/* Textura global de grano de película */}
      <div
        aria-hidden
        className="pointer-events-none fixed inset-0 z-[100] mix-blend-soft-light opacity-[0.04]"
        style={{ backgroundImage: GRAIN }}
      />

      <DarkModeToggle />

      {/* Creatividad: decorativa, solo en pantallas grandes para no robar espacio en móvil */}
      <div className="pointer-events-none absolute left-[6%] top-1/2 hidden w-80 -translate-y-1/2 animate-fade-up lg:block xl:left-[8%] xl:w-96">
        <LottieAnimation data={creativity} className="h-auto w-full" />
      </div>

      {/* Avión (web): decorativo, al lado derecho */}
      <div className="pointer-events-none absolute right-[8%] top-1/2 hidden -translate-y-1/2 animate-fade-up lg:block xl:right-[10%]">
        <LottieAnimation data={plane} className="h-44 w-auto xl:h-52" />
      </div>

      {/* Contenedor principal: mobile-first, con safe-area para notch/gestos */}
      <div
        className="relative mx-auto flex min-h-[100dvh] w-full max-w-2xl flex-col items-center px-5 sm:px-6"
        style={{
          paddingTop: "max(1.5rem, env(safe-area-inset-top))",
          paddingBottom: "max(1.5rem, env(safe-area-inset-bottom))",
        }}
      >
        {/* Avión de papel: decorativo, oculto de lectores de pantalla, oculto en desktop */}
        <div aria-hidden className="pointer-events-none animate-fade-up md:hidden">
          <LottieAnimation data={plane} className="h-32 w-auto sm:h-40" />
        </div>

        <div className="animate-fade-up">
          <Logo />
        </div>

        {/* Zona central: la palabra descubierta, centrada */}
        <section
          className="mt-4 flex w-full flex-1 animate-fade-up flex-col items-center justify-center pb-[18vh]"
          style={{ animationDelay: "120ms" }}
          aria-live="polite"
        >
          <WordReel
            words={words}
            finalWord={targetWord}
            isSpinning={isSpinning}
            isInitialLoading={isWordsLoading}
            onSpinComplete={handleSpinComplete}
            action={
              <button
                type="button"
                onClick={handleCopy}
                aria-label={copied ? "Copied" : "Copy word"}
                disabled={!word}
                className={`rounded-full border p-2.5 transition-all duration-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-oli-accent disabled:cursor-not-allowed disabled:opacity-40 ${
                  copied
                    ? "border-oli-accent/50 text-oli-accent"
                    : "border-oli-primary/30 text-oli-primary hover:border-oli-primary hover:bg-oli-primary hover:text-oli-bg active:scale-95"
                }`}
              >
                {copied ? (
                  <svg
                    className="h-4 w-4"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    aria-hidden
                  >
                    <path d="M4 12.5l5 5L20 6.5" />
                  </svg>
                ) : (
                  <svg
                    className="h-4 w-4"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.6"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    aria-hidden
                  >
                    <rect x="9" y="9" width="11" height="11" rx="2" />
                    <path d="M5 15V5a2 2 0 0 1 2-2h10" />
                  </svg>
                )}
              </button>
            }
          />

          {discovered && word && (
            <div
              className="mt-2 flex animate-fade-up flex-wrap items-center justify-center gap-2 text-ui uppercase tracking-ui text-oli-muted sm:mt-2 sm:gap-3"
              style={{ animationDelay: "100ms" }}
            >
              <span>{word.language}</span>
              <span className="h-1 w-1 rounded-full bg-oli-muted/60" />
              <span className="text-oli-accent">{word.category}</span>
              <button
                type="button"
                onClick={handleCopy}
                className="ml-2 hidden rounded-full border border-oli-primary/30 px-3 py-1 text-caption font-medium uppercase tracking-ui text-oli-primary transition-all duration-300 hover:border-oli-primary hover:bg-oli-primary hover:text-oli-bg focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-oli-accent md:block"
              >
                {copied ? "Copied" : "Copy"}
              </button>
            </div>
          )}

          <div
            className="mt-6 flex w-full animate-fade-up flex-col items-center gap-4 sm:mt-7 sm:gap-5"
            style={{ animationDelay: "240ms" }}
          >
            <DiscoverButton
              label={discovered ? "Discover Again" : "Discover"}
              disabled={isBusy}
              onClick={handleDiscover}
            />
            <p className="hidden text-caption uppercase tracking-ui text-oli-muted/60 md:block">
              Press space to spin
            </p>
          </div>

          {/* Errores: rol alert para lectores de pantalla, altura reservada para evitar layout shift */}
          <div className="mt-3 min-h-[1.25rem]" role="alert">
            {error && (
              <p className="text-center text-xs tracking-wide text-red-500 dark:text-red-400">
                {error}
              </p>
            )}
          </div>
        </section>
      </div>
    </main>
  );
}