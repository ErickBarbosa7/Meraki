import { useEffect, useRef, useState } from "react";
import type { ReactNode } from "react";
import type { Word } from "../types/word";

const PLACEHOLDER = "MERAKI";
const ROW = 128;
const WINDOW_SPINNING = ROW * 3;
const WINDOW_IDLE = ROW;
const TICKS = 12;
const BUFFERS = 2;
const BASE_MS = 60;
const GROWTH = 1.35;
const MAX_MS = 380;

function shuffle<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

function buildDelays(): number[] {
  const delays: number[] = [];
  for (let i = 0; i < TICKS - 1; i++) {
    delays.push(Math.min(BASE_MS * Math.pow(GROWTH, i), MAX_MS));
  }
  return delays;
}

interface WordReelProps {
  words: Word[];
  finalWord: Word | null;
  isSpinning: boolean;
  isInitialLoading: boolean;
  onSpinComplete: () => void;
  action?: ReactNode;
}

export default function WordReel({
  words,
  finalWord,
  isSpinning,
  isInitialLoading,
  onSpinComplete,
  action,
}: WordReelProps) {
  const [strip, setStrip] = useState<Word[] | null>(null);
  const [centeredIndex, setCenteredIndex] = useState(BUFFERS - 1);
  const [transitionMs, setTransitionMs] = useState(0);
  const timerRef = useRef<number | null>(null);

  useEffect(() => {
    if (!isSpinning) return;
    const target = finalWord;
    if (!target) return;

    const pool = words.length > 0 ? words : [target];
    const seq = [...shuffle(pool).slice(0, TICKS - 1), target];
    const fillers = shuffle(pool).slice(0, BUFFERS * 2);
    const nextStrip = [...fillers.slice(0, BUFFERS), ...seq, ...fillers.slice(BUFFERS)];
    const delays = buildDelays();

    setStrip(nextStrip);
    setCenteredIndex(BUFFERS - 1);
    setTransitionMs(0);

    let i = 0;
    const step = () => {
      setCenteredIndex(i + BUFFERS);
      setTransitionMs(i < seq.length - 1 ? delays[i] : 350);
      if (i < seq.length - 1) {
        timerRef.current = window.setTimeout(() => {
          i += 1;
          step();
        }, delays[i]);
      } else {
        onSpinComplete();
      }
    };

    step();

    return () => {
      if (timerRef.current !== null) {
        window.clearTimeout(timerRef.current);
      }
    };
  }, [isSpinning, finalWord, words, onSpinComplete]);

  if (isInitialLoading && !strip) {
    return (
      <div className="flex h-32 items-center justify-center">
        <div className="h-px w-24 animate-pulse bg-meraki-secondary/60" />
      </div>
    );
  }

  if (!strip) {
    return (
      <div className="flex h-32 items-center justify-center overflow-hidden">
        <span className="font-display select-none text-reel font-medium tracking-tight text-oli-primary/40">
          {PLACEHOLDER}
        </span>
      </div>
    );
  }

  return (
    <div
      className={`relative overflow-hidden ${
        isSpinning
          ? "blur-[1.5px] [mask-image:linear-gradient(to_bottom,transparent,black_25%,black_75%,transparent)]"
          : ""
      }`}
      style={{
        height: isSpinning ? WINDOW_SPINNING : WINDOW_IDLE,
        transition: "height 500ms cubic-bezier(0.16, 1, 0.3, 1)",
      }}
    >
      <div
        className="flex flex-col"
        style={{
          transform: `translateY(${
            isSpinning ? (1 - centeredIndex) * ROW : -centeredIndex * ROW
          }px)`,
          transition: `transform ${isSpinning ? transitionMs : 500}ms ease-in-out`,
        }}
      >
        {strip.map((w, k) => (
          <div key={k} className="flex h-32 w-full items-center justify-center">
            <span
              className={`font-display select-none text-reel font-medium tracking-tight transition-opacity duration-500 ${
                k === centeredIndex ? "text-oli-primary" : "text-oli-muted/40"
              } ${k !== centeredIndex && !isSpinning ? "opacity-0" : "opacity-100"} ${
                k === centeredIndex && !isSpinning ? "animate-reel-land" : ""
              }`}
            >
              {w.word}
            </span>
            {k === centeredIndex && !isSpinning && action && (
              <span className="ml-4 md:hidden">{action}</span>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}