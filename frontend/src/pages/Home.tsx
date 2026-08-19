import { useState } from "react";
import type { Word } from "../types/word";
import { getRandomWord } from "../services/wordService";
import Logo from "../components/Logo";
import WordReel from "../components/WordReel";
import DiscoverButton from "../components/DiscoverButton";

export default function Home() {
  const [word, setWord] = useState<Word | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [discovered, setDiscovered] = useState(false);

  async function handleDiscover() {
    if (isLoading) return;
    setIsLoading(true);
    setError(null);
    setDiscovered(false);
    try {
      const next = await getRandomWord();
      setWord(next);
      setDiscovered(true);
    } catch {
      setError("Could not reach the words. Try again.");
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-center px-6">
      <Logo />

      <section className="mt-12 flex w-full flex-col items-center">
        <WordReel word={word} isLoading={isLoading} />

        {discovered && word && (
          <div className="mt-2 flex items-center gap-3 text-xs uppercase tracking-widest text-meraki-secondary">
            <span>{word.language}</span>
            <span className="h-1 w-1 rounded-full bg-meraki-secondary/60" />
            <span>{word.category}</span>
          </div>
        )}

        {error && (
          <p className="mt-4 text-xs tracking-wide text-meraki-secondary">
            Could not reach the words. Try again.
          </p>
        )}
      </section>

      <div className="mt-12">
        <DiscoverButton
          label={discovered ? "Discover Again" : "Discover"}
          disabled={isLoading}
          onClick={handleDiscover}
        />
      </div>
    </main>
  );
}