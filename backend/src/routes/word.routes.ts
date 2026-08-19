import { Router } from "express";
import {
  getWords,
  getRandom,
  getWordByIdHandler,
} from "../controllers/word.controller.js";

const router = Router();

router.get("/words", getWords);
router.get("/words/random", getRandom);
router.get("/words/:id", getWordByIdHandler);

export default router;