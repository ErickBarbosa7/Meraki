import type { Word } from "../types/word";

const API_BASE = "/api";

const API_URL = import.meta.env.VITE_API_URL ?? API_BASE;

async function request<T>(path: string): Promise<T> {
  const url = `${API_URL}${path}`;
  let res: Response;
  try {
    res = await fetch(url);
  } catch {
    throw new Error(`Could not reach ${API_URL}`);
  }
  if (!res.ok) {
    throw new Error(`Request failed: ${res.status} ${res.statusText}`);
  }
  const contentType = res.headers.get("content-type") ?? "";
  if (!contentType.includes("application/json")) {
    throw new Error(
      `Unexpected response (${contentType || "no content-type"}) from ${url}`
    );
  }
  return res.json() as Promise<T>;
}

export function getRandomWord(): Promise<Word> {
  return request<Word>("/words/random");
}

export function getAllWords(): Promise<{ total: number; words: Word[] }> {
  return request<{ total: number; words: Word[] }>("/words");
}