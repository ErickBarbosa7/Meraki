import type { Word } from "../types/word";

const API_BASE = "/api";

const API_URL = import.meta.env.VITE_API_URL ?? API_BASE;

async function request<T>(path: string): Promise<T> {
  const res = await fetch(`${API_URL}${path}`);
  if (!res.ok) {
    throw new Error(`Request failed: ${res.status} ${res.statusText}`);
  }
  return res.json() as Promise<T>;
}

export function getRandomWord(): Promise<Word> {
  return request<Word>("/words/random");
}

export function getAllWords(): Promise<{ total: number; words: Word[] }> {
  return request<{ total: number; words: Word[] }>("/words");
}