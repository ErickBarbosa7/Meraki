import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";
import type { Word } from "../types/word.js";

const __dirname = dirname(fileURLToPath(import.meta.url));
const words: Word[] = JSON.parse(
  readFileSync(join(__dirname, "../data/words.json"), "utf-8")
);

export function getAllWords(): Word[] {
  return words;
}

export function getRandomWord(): Word {
  return words[Math.floor(Math.random() * words.length)];
}

export function getWordById(id: number): Word | undefined {
  return words.find((word) => word.id === id);
}

export function getWordCount(): number {
  return words.length;
}