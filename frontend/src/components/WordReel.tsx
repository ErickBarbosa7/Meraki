import type { Word } from "../types/word";

interface WordReelProps {
  word: Word | null;
  isLoading: boolean;
}

export default function WordReel({ word, isLoading }: WordReelProps) {
  if (isLoading) {
    return (
      <div className="flex h-32 items-center justify-center">
        <div className="h-px w-24 animate-pulse bg-meraki-secondary/60" />
      </div>
    );
  }

  return (
    <div className="flex h-32 items-center justify-center overflow-hidden">
      <span className="font-display select-none text-6xl font-medium text-meraki-primary">
        {word ? word.word : ""}
      </span>
    </div>
  );
}