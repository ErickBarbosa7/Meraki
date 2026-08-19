export type Difficulty = "easy" | "medium" | "rare";

export interface Word {
  id: number;
  word: string;
  language: string;
  category: string;
  difficulty: Difficulty;
}