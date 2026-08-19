import type { Request, Response } from "express";
import {
  getAllWords,
  getRandomWord,
  getWordById,
  getWordCount,
} from "../services/word.service.js";

export function getWords(_req: Request, res: Response): void {
  res.json({ total: getWordCount(), words: getAllWords() });
}

export function getRandom(_req: Request, res: Response): void {
  res.json(getRandomWord());
}

export function getWordByIdHandler(req: Request, res: Response): void {
  const id = Number(req.params.id);
  if (!Number.isInteger(id) || id <= 0) {
    res.status(400).json({ error: "Invalid id" });
    return;
  }

  const word = getWordById(id);
  if (!word) {
    res.status(404).json({ error: "Word not found" });
    return;
  }

  res.json(word);
}