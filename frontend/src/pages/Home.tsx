import { useCallback, useEffect, useRef, useState } from "react";
import type { Word } from "../types/word";
import { getRandomWord, getAllWords } from "../services/wordService";
import Logo from "../components/Logo";
import WordReel from "../components/WordReel";
import DiscoverButton from "../components/DiscoverButton";

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
      .catch(() => {})
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
      setError("Could not reach the words. Try again.");
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
    <main className="flex min-h-screen flex-col items-center justify-center px-6">
      <div className="animate-fade-up">
        <Logo />
      </div>

      <section
        className="mt-12 flex w-full animate-fade-up flex-col items-center"
        style={{ animationDelay: "120ms" }}
      >
        <WordReel
          words={words}
          finalWord={targetWord}
          isSpinning={isSpinning}
          isInitialLoading={isWordsLoading}
          onSpinComplete={handleSpinComplete}
        />

        {discovered && word && (
          <div
            className="mt-2 flex animate-fade-up items-center gap-3 text-xs uppercase tracking-widest text-meraki-secondary"
            style={{ animationDelay: "100ms" }}
          >
            <span>{word.language}</span>
            <span className="h-1 w-1 rounded-full bg-meraki-secondary/60" />
            <span>{word.category}</span>
            <button
              type="button"
              onClick={handleCopy}
              className="ml-2 rounded-full border border-meraki-primary/30 px-3 py-1 text-[10px] font-medium uppercase tracking-widest text-meraki-primary transition-all duration-300 hover:border-meraki-primary hover:bg-meraki-primary hover:text-meraki-bg focus-visible:outline focus-visible:outline-1 focus-visible:outline-offset-2 focus-visible:outline-meraki-primary"
            >
              {copied ? "Copied" : "Copy"}
            </button>
          </div>
        )}

        {error && (
          <p className="mt-4 text-xs tracking-wide text-meraki-secondary">
            {error}
          </p>
        )}
      </section>

      <div className="mt-12 animate-fade-up" style={{ animationDelay: "240ms" }}>
        <div className="flex flex-col items-center gap-5">
          <DiscoverButton
            label={discovered ? "Discover Again" : "Discover"}
            disabled={isBusy}
            onClick={handleDiscover}
          />
          <p className="text-[10px] uppercase tracking-widest text-meraki-secondary/50">
            Press space to spin
          </p>
        </div>
      </div>
    </main>
  );
}