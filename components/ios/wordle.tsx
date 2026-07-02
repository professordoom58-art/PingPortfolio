"use client";

import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { motion, AnimatePresence, Variants } from "framer-motion";
import { ChevronLeft, Heart } from "lucide-react";

/* ------------------------------------------------------------------ */
/*  Constants                                                          */
/* ------------------------------------------------------------------ */

const WORD_LENGTH = 5;
const MAX_ATTEMPTS = 6;

const WORDS: string[] = [
  "about", "above", "abuse", "actor", "acute", "admit", "adopt", "adult",
  "after", "again", "agent", "agree", "ahead", "alarm", "album", "alert",
  "alike", "alive", "allow", "alone", "along", "alter", "among", "anger",
  "angle", "angry", "apart", "apple", "apply", "arena", "argue", "arise",
  "array", "aside", "asset", "avoid", "awake", "award", "aware", "badly",
  "baker", "basic", "basis", "beach", "began", "begin", "begun", "being",
  "below", "bench", "birth", "black", "blame", "blank", "blast", "blind",
  "block", "blood", "board", "boost", "booth", "bound", "brain", "brand",
  "brave", "bread", "break", "breed", "brief", "bring", "broad", "broke",
  "brown", "build", "built", "buyer", "cable", "carry", "catch", "cause",
  "chain", "chair", "chaos", "charm", "chart", "chase", "cheap", "check",
  "chest", "chief", "child", "chose", "civil", "claim", "class", "clean",
  "clear", "click", "climb", "clock", "close", "cloud", "coach", "coast",
  "could", "count", "court", "cover", "craft", "crash", "cream", "crime",
  "cross", "crowd", "crown", "crude", "curve", "cycle", "daily", "dance",
  "dated", "dealt", "death", "debut", "delay", "depth", "doing", "doubt",
  "dozen", "draft", "drama", "drawn", "dream", "dress", "drill", "drink",
  "drive", "drove", "dying", "eager", "early", "earth", "eight", "elite",
  "empty", "enemy", "enjoy", "enter", "entry", "equal", "error", "event",
  "every", "exact", "exist", "extra", "faith", "false", "fault", "favor",
  "fence", "fewer", "fiber", "field", "fifth", "fifty", "fight", "final",
  "first", "fixed", "flame", "flash", "fleet", "floor", "fluid", "focus",
  "force", "forth", "forty", "forum", "found", "frame", "frank", "fraud",
  "fresh", "front", "fruit", "fully", "funny", "giant", "given", "glass",
  "globe", "glory", "going", "grace", "grade", "grand", "grant", "grass",
  "great", "green", "greet", "grief", "grind", "gross", "group", "grown",
  "guard", "guess", "guest", "guide", "happy", "harsh", "heart", "heavy",
  "hence", "hobby", "honey", "honor", "horse", "hotel", "house", "human",
  "humor", "ideal", "image", "imply", "index", "inner", "input", "issue",
  "ivory", "joint", "judge", "juice", "jumbo", "karma", "knife", "knock",
  "known", "label", "labor", "large", "laser", "later", "laugh", "layer",
  "learn", "lease", "least", "leave", "legal", "level", "light", "limit",
  "liver", "local", "logic", "loose", "lower", "loyal", "lucky", "lunch",
  "lying", "magic", "major", "maker", "march", "match", "maybe", "meant",
  "medal", "media", "metal", "meter", "might", "minor", "minus", "mixed",
  "model", "money", "month", "moral", "motor", "mount", "mouse", "mouth",
  "moved", "movie", "music", "needs", "never", "newly", "night", "noise",
  "north", "noted", "novel", "nurse", "occur", "ocean", "offer", "often",
  "order", "other", "ought", "outer", "owner", "paint", "panel", "paper",
  "party", "peace", "phase", "phone", "photo", "piano", "piece", "pilot",
  "pitch", "place", "plain", "plane", "plant", "plate", "point", "pound",
  "power", "press", "price", "pride", "prime", "print", "prior", "prize",
  "proof", "proud", "prove", "queen", "query", "quick", "quiet", "quite",
  "radio", "raise", "range", "rapid", "ratio", "reach", "ready", "realm",
  "rebel", "refer", "relax", "reply", "right", "rival", "river", "robot",
  "rough", "round", "route", "royal", "rural", "sadly", "safer", "saint",
  "salad", "sales", "sauce", "scale", "scene", "scope", "score", "sense",
  "serve", "seven", "shade", "shake", "shall", "shape", "share", "sharp",
  "sheet", "shelf", "shell", "shift", "shine", "shirt", "shock", "shoot",
  "shore", "short", "shown", "sight", "since", "sixth", "sixty", "sized",
  "skill", "sleep", "slide", "small", "smart", "smile", "smoke", "snake",
  "solid", "solve", "sorry", "sound", "south", "space", "spare", "speak",
  "speed", "spend", "spent", "split", "spoke", "sport", "staff", "stage",
  "stake", "stand", "start", "state", "steam", "steel", "steep", "stick",
  "still", "stock", "stone", "store", "storm", "story", "strip", "study",
  "stuff", "style", "sugar", "suite", "super", "sweet", "swift", "swing",
  "sword", "table", "taken", "taste", "taxes", "teach", "teeth", "thank",
  "theft", "their", "theme", "there", "these", "thick", "thing", "think",
  "third", "those", "three", "threw", "throw", "thumb", "tight", "timer",
  "times", "tired", "title", "today", "token", "topic", "total", "touch",
  "tough", "tower", "track", "trade", "trail", "train", "treat", "trend",
  "trial", "tribe", "trick", "tried", "tries", "truck", "truly", "trust",
  "truth", "twice", "twist", "uncle", "under", "union", "unity", "until",
  "upper", "upset", "urban", "usage", "usual", "valid", "value", "video",
  "virus", "visit", "vital", "voice", "voter", "wagon", "waste", "watch",
  "water", "wheel", "where", "which", "while", "white", "whole", "whose",
  "woman", "women", "world", "worry", "worse", "worst", "worth", "would",
  "wound", "write", "wrong", "wrote", "yield", "young", "youth",
];

const KEYBOARD_ROWS: string[][] = [
  ["q", "w", "e", "r", "t", "y", "u", "i", "o", "p"],
  ["a", "s", "d", "f", "g", "h", "j", "k", "l"],
  ["enter", "z", "x", "c", "v", "b", "n", "m", "del"],
];

type LetterState = "empty" | "correct" | "present" | "absent";
type GameStatus = "playing" | "won" | "lost";

/* ------------------------------------------------------------------ */
/*  Helpers                                                             */
/* ------------------------------------------------------------------ */

function getRandomWord(): string {
  return WORDS[Math.floor(Math.random() * WORDS.length)];
}

/** Two-pass evaluation so duplicate letters are handled correctly. */
function evaluateGuess(guess: string, answer: string): LetterState[] {
  const result: LetterState[] = new Array(WORD_LENGTH).fill("absent");
  const answerLetters = answer.split("");
  const used = new Array(WORD_LENGTH).fill(false);

  for (let i = 0; i < WORD_LENGTH; i++) {
    if (guess[i] === answerLetters[i]) {
      result[i] = "correct";
      used[i] = true;
    }
  }

  for (let i = 0; i < WORD_LENGTH; i++) {
    if (result[i] === "correct") continue;
    const idx = answerLetters.findIndex(
      (letter, j) => letter === guess[i] && !used[j]
    );
    if (idx !== -1) {
      result[i] = "present";
      used[idx] = true;
    }
  }

  return result;
}

function mergeKeyboardStatus(
  prev: Record<string, LetterState>,
  guess: string,
  evaluation: LetterState[]
): Record<string, LetterState> {
  const rank: Record<LetterState, number> = {
    empty: 0,
    absent: 1,
    present: 2,
    correct: 3,
  };
  const next = { ...prev };
  for (let i = 0; i < guess.length; i++) {
    const letter = guess[i];
    const state = evaluation[i];
    const current = next[letter] ?? "empty";
    if (rank[state] > rank[current]) {
      next[letter] = state;
    }
  }
  return next;
}

/* ------------------------------------------------------------------ */
/*  Visual tokens                                                       */
/* ------------------------------------------------------------------ */

const TILE_COLORS: Record<LetterState, string> = {
  empty: "bg-white/[0.015] border-white/[0.22] text-white",
  absent: "bg-[#3a3a3c] border-[#3a3a3c]/95 text-white",
  present: "bg-[#FFD60A] border-[#FFD60A]/95 text-black",
  correct: "bg-[#34C759] border-[#34C759]/95 text-white",
};

const KEY_COLORS: Record<LetterState, string> = {
  empty: "bg-white/[0.09] text-white",
  absent: "bg-[#3a3a3c]/80 text-white/50",
  present: "bg-[#FFD60A] text-black",
  correct: "bg-[#34C759] text-white",
};

/* ------------------------------------------------------------------ */
/*  Tile                                                                 */
/* ------------------------------------------------------------------ */

interface TileProps {
  letter: string;
  status: LetterState;
  active: boolean;
  flip: boolean;
  flipDelay: number;
  pop: boolean;
  bounce: boolean;
  bounceDelay: number;
  shake: boolean;
}

const Tile = React.memo(function Tile({
  letter,
  status,
  active,
  flip,
  flipDelay,
  pop,
  bounce,
  bounceDelay,
  shake,
}: TileProps) {
  const [visualStatus, setVisualStatus] = useState<LetterState>(status);

  useEffect(() => {
    if (flip && status !== "empty") {
      setVisualStatus("empty");
      const revealTimer = setTimeout(
        () => setVisualStatus(status),
        flipDelay * 1000 + 275
      );

      return () => clearTimeout(revealTimer);
    }

    setVisualStatus(status);
  }, [flip, flipDelay, status]);

  return (
    <motion.div
      className={[
        "relative flex-1 max-w-[52px] aspect-square rounded-[14px] border",
        "flex items-center justify-center select-none",
        "text-[clamp(17px,5.4vw,26px)] font-bold uppercase tracking-wide",
        "shadow-[inset_0_1px_0_rgba(255,255,255,0.08)] will-change-transform",
        active && visualStatus === "empty"
          ? "bg-white/[0.025] border-white/[0.38] text-white"
          : TILE_COLORS[visualStatus],
      ].join(" ")}
      style={{ transformStyle: "preserve-3d" }}
      initial={false}
      animate={
        shake
          ? { x: [0, -8, 8, -8, 8, -4, 4, 0] }
          : bounce
          ? { y: [0, -15, 2, 0] }
          : flip
          ? { rotateX: [0, 90, 0] }
          : pop
          ? { scale: [0.85, 1.06, 1] }
          : { scale: 1, rotateX: 0, y: 0 }
      }
      transition={
        shake
          ? { duration: 0.42, ease: [0.36, 0, 0.66, 1] }
          : bounce
          ? {
              duration: 0.5,
              ease: [0.16, 1, 0.3, 1],
              delay: bounceDelay,
            }
          : flip
          ? {
              duration: 0.55,
              ease: "easeInOut",
              delay: flipDelay,
              times: [0, 0.5, 1],
            }
          : { duration: 0.14, ease: [0.16, 1, 0.3, 1] }
      }
    >
      {letter}
    </motion.div>
  );
});

/* ------------------------------------------------------------------ */
/*  Key                                                                  */
/* ------------------------------------------------------------------ */

interface KeyProps {
  label: string;
  status: LetterState;
  wide?: boolean;
  emphasis?: boolean;
  onPress: (key: string) => void;
}

const Key = React.memo(function Key({
  label,
  status,
  wide,
  emphasis,
  onPress,
}: KeyProps) {
  const isEnter = label === "enter";
  const isDel = label === "del";

  return (
    <motion.button
      type="button"
      onClick={() => onPress(label)}
      whileTap={{ scale: 0.88, opacity: 0.8 }}
      transition={{ duration: 0.08, ease: [0.2, 0, 0, 1] }}
      className={[
        "h-[44px] rounded-[11px] flex items-center justify-center",
        "text-[13px] font-semibold uppercase select-none",
        "transition-colors duration-200 ease-out will-change-transform",
        "shadow-[inset_0_1px_0_rgba(255,255,255,0.08)]",
        wide ? "flex-[1.85]" : "flex-1",
        emphasis ? "bg-white/95 text-black" : KEY_COLORS[status],
      ].join(" ")}
      style={{ WebkitTapHighlightColor: "transparent" }}
      aria-label={isEnter ? "Submit guess" : isDel ? "Delete letter" : label}
    >
      {isEnter ? (
        <span className="text-[12px] tracking-tight">Enter</span>
      ) : isDel ? (
        <img
          src="/backspace.png"
          alt=""
          className="h-[18px] w-auto select-none"
          draggable={false}
        />
      ) : (
        label
      )}
    </motion.button>
  );
});

/* ------------------------------------------------------------------ */
/*  Result modal                                                        */
/* ------------------------------------------------------------------ */

interface ResultCardProps {
  status: GameStatus;
  answer: string;
  attempts: number;
  onNewGame: () => void;
}

const cardVariants: Variants = {
  hidden: { opacity: 0, scale: 0.96, y: 36 },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: { type: "spring", stiffness: 260, damping: 26, mass: 0.8 },
  },
  exit: { opacity: 0, scale: 0.98, y: 18, transition: { duration: 0.16 } },
};

function ResultCard({ status, answer, attempts, onNewGame }: ResultCardProps) {
  const won = status === "won";
  return (
    <motion.div
      className="absolute inset-0 z-20 flex items-end justify-center bg-black/25 px-4 pb-[calc(env(safe-area-inset-bottom)+18px)]"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
    >
      <motion.div
        variants={cardVariants}
        initial="hidden"
        animate="visible"
        exit="exit"
        className="w-full max-w-[320px] rounded-[26px] border border-white/[0.16] bg-[#1c1c1e]/60 px-6 py-7 text-center shadow-[0_24px_70px_rgba(0,0,0,0.5)] backdrop-blur-2xl"
      >
        <div className="text-[34px] leading-none mb-3">
          {won ? "🎉" : "🙈"}
        </div>
        <h2 className="text-white text-[19px] font-semibold tracking-tight mb-1.5">
          {won ? "Congratulations" : "So close!"}
        </h2>
        <p className="text-white/[0.65] text-[14px] leading-snug mb-5">
          {won
            ? `You guessed the word in ${attempts} ${
                attempts === 1 ? "try" : "tries"
              }.`
            : "You guessed the word."}
        </p>
        {!won && (
          <div className="mb-5 flex items-center justify-center gap-1.5">
            {answer.split("").map((letter, i) => (
              <div
                key={i}
                className="w-8 h-8 rounded-[9px] bg-[#34C759] flex items-center justify-center text-white text-[15px] font-bold uppercase"
              >
                {letter}
              </div>
            ))}
          </div>
        )}
        <motion.button
          type="button"
          onClick={onNewGame}
          whileTap={{ scale: 0.95 }}
          transition={{ duration: 0.09, ease: [0.2, 0, 0, 1] }}
          className="w-full h-[43px] rounded-full bg-white/95 text-black text-[15px] font-semibold shadow-[0_1px_0_rgba(255,255,255,0.4)_inset]"
        >
          New Game
        </motion.button>
      </motion.div>
    </motion.div>
  );
}

/* ------------------------------------------------------------------ */
/*  Main component                                                      */
/* ------------------------------------------------------------------ */

interface WordleProps {
  onBack?: () => void;
}

type LoveBurst = {
  id: number;
  x: number;
  y: number;
  rotate: number;
  scale: number;
  delay: number;
};

export default function Wordle({ onBack }: WordleProps) {
  const [answer, setAnswer] = useState<string>(() => getRandomWord());
  const [guesses, setGuesses] = useState<string[]>([]);
  const [evaluations, setEvaluations] = useState<LetterState[][]>([]);
  const [currentGuess, setCurrentGuess] = useState<string>("");
  const [gameStatus, setGameStatus] = useState<GameStatus>("playing");
  const [keyboardStatus, setKeyboardStatus] = useState<
    Record<string, LetterState>
  >({});
  const [flippingRow, setFlippingRow] = useState<number | null>(null);
  const [bouncingRow, setBouncingRow] = useState<number | null>(null);
  const [shakeRow, setShakeRow] = useState<number | null>(null);
  const [isBusy, setIsBusy] = useState(false);
  const [showResult, setShowResult] = useState(false);
  const [popTileIndex, setPopTileIndex] = useState<number | null>(null);
  const [loveBursts, setLoveBursts] = useState<LoveBurst[]>([]);

  const busyTimeouts = useRef<ReturnType<typeof setTimeout>[]>([]);

  const clearTimers = useCallback(() => {
    busyTimeouts.current.forEach(clearTimeout);
    busyTimeouts.current = [];
  }, []);

  useEffect(() => () => clearTimers(), [clearTimers]);

  const resetGame = useCallback(() => {
    clearTimers();
    setAnswer(getRandomWord());
    setGuesses([]);
    setEvaluations([]);
    setCurrentGuess("");
    setGameStatus("playing");
    setKeyboardStatus({});
    setFlippingRow(null);
    setBouncingRow(null);
    setShakeRow(null);
    setIsBusy(false);
    setShowResult(false);
    setPopTileIndex(null);
  }, [clearTimers]);

  const triggerShake = useCallback(
    (row: number) => {
      setShakeRow(row);
      const t = setTimeout(() => setShakeRow(null), 450);
      busyTimeouts.current.push(t);
    },
    []
  );

  const submitGuess = useCallback(() => {
    if (isBusy || gameStatus !== "playing") return;
    if (currentGuess.length !== WORD_LENGTH) {
      triggerShake(guesses.length);
      return;
    }
    const rowIndex = guesses.length;
    const evaluation = evaluateGuess(currentGuess, answer);
    const guessValue = currentGuess;

    setIsBusy(true);
    setGuesses((prev) => [...prev, guessValue]);
    setEvaluations((prev) => [...prev, evaluation]);
    setFlippingRow(rowIndex);
    setCurrentGuess("");

    const flipTotalMs = 550 + (WORD_LENGTH - 1) * 250 + 100;

    const keyboardTimer = setTimeout(() => {
      setKeyboardStatus((prev) =>
        mergeKeyboardStatus(prev, guessValue, evaluation)
      );
    }, flipTotalMs / 2);
    busyTimeouts.current.push(keyboardTimer);

    const afterFlip = setTimeout(() => {
      setFlippingRow(null);

      const won = guessValue === answer;
      const outOfAttempts = rowIndex + 1 >= MAX_ATTEMPTS;

      if (won) {
        setBouncingRow(rowIndex);
        const bounceMs = 220 + (WORD_LENGTH - 1) * 82 + 500;
        const afterBounce = setTimeout(() => {
          setBouncingRow(null);
          setGameStatus("won");
          setShowResult(true);
          setIsBusy(false);
        }, bounceMs);
        busyTimeouts.current.push(afterBounce);
      } else if (outOfAttempts) {
        setShakeRow(rowIndex);
        const afterShake = setTimeout(() => {
          setShakeRow(null);
          setGameStatus("lost");
          setShowResult(true);
          setIsBusy(false);
        }, 500);
        busyTimeouts.current.push(afterShake);
      } else {
        setIsBusy(false);
      }
    }, flipTotalMs);
    busyTimeouts.current.push(afterFlip);
  }, [answer, currentGuess, gameStatus, guesses.length, isBusy, triggerShake]);

  const handleKey = useCallback(
    (key: string) => {
      if (isBusy || gameStatus !== "playing") return;

      if (key === "enter") {
        submitGuess();
        return;
      }
      if (key === "del") {
        setCurrentGuess((prev) => prev.slice(0, -1));
        return;
      }
      if (/^[a-z]$/.test(key)) {
        setCurrentGuess((prev) => {
          if (prev.length >= WORD_LENGTH) return prev;
          const next = prev + key;
          setPopTileIndex(next.length - 1);
          return next;
        });
      }
    },
    [gameStatus, isBusy, submitGuess]
  );

  const showerLove = useCallback(() => {
    const now = Date.now();
    const nextBursts = Array.from({ length: 12 }, (_, index) => {
      const spread = (index - 5.5) * 8 + (Math.random() - 0.5) * 12;

      return {
        id: now + index,
        x: spread,
        y: -34 - Math.random() * 62,
        rotate: -26 + Math.random() * 52,
        scale: 0.75 + Math.random() * 0.45,
        delay: index * 0.018,
      };
    });

    setLoveBursts((prev) => [...prev.slice(-24), ...nextBursts]);
  }, []);

  useEffect(() => {
    function onKeyDown(e: KeyboardEvent) {
      const k = e.key.toLowerCase();
      if (k === "enter") {
        handleKey("enter");
      } else if (k === "backspace") {
        handleKey("del");
      } else if (/^[a-z]$/.test(k)) {
        handleKey(k);
      }
    }
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [handleKey]);

  const attemptsRemaining = MAX_ATTEMPTS - guesses.length;

  const statusLabel = useMemo(() => {
    return `${attemptsRemaining} ${
      attemptsRemaining === 1 ? "attempt" : "attempts"
    } remaining`;
  }, [attemptsRemaining]);

  const rows = useMemo(
    () => Array.from({ length: MAX_ATTEMPTS }, (_, i) => i),
    []
  );

  return (
    <div className="relative w-full h-full flex flex-col bg-black overflow-hidden">
      {onBack && (
        <div className="absolute top-14 left-5 z-50">
          <button
            type="button"
            onClick={onBack}
            className="
flex
items-center
justify-center
w-14
h-14
rounded-full

bg-white/[0.08]

backdrop-blur-2xl

border
border-white/[0.08]

shadow-[0_6px_30px_rgba(0,0,0,.35),inset_0_1px_0_rgba(255,255,255,.08)]

active:scale-95
transition-all
duration-200
"
            aria-label="Back to home"
          >
            <ChevronLeft size={28} strokeWidth={3} />
          </button>
        </div>
      )}

      <div className="absolute top-14 right-5 z-50">
        <AnimatePresence>
          {loveBursts.map((burst) => (
            <motion.span
              key={burst.id}
              className="pointer-events-none absolute left-1/2 top-1/2 z-0 text-[#ff375f]"
              initial={{
                opacity: 0,
                x: -6,
                y: -6,
                scale: 0.35,
                rotate: 0,
              }}
              animate={{
                opacity: [0, 1, 1, 0],
                x: burst.x - 6,
                y: burst.y - 6,
                scale: burst.scale,
                rotate: burst.rotate,
              }}
              exit={{ opacity: 0 }}
              transition={{
                duration: 0.86,
                delay: burst.delay,
                ease: [0.16, 1, 0.3, 1],
                times: [0, 0.18, 0.68, 1],
              }}
              onAnimationComplete={() => {
                setLoveBursts((prev) =>
                  prev.filter((item) => item.id !== burst.id)
                );
              }}
            >
              <Heart size={12} strokeWidth={2.4} fill="currentColor" />
            </motion.span>
          ))}
        </AnimatePresence>

        <motion.button
          type="button"
          onClick={showerLove}
          whileTap={{ scale: 0.92 }}
          transition={{ duration: 0.1, ease: [0.2, 0, 0, 1] }}
          className="
relative
z-10
flex
items-center
justify-center
w-14
h-14
rounded-full

bg-white/[0.08]

backdrop-blur-2xl

border
border-white/[0.08]

shadow-[0_6px_30px_rgba(0,0,0,.35),inset_0_1px_0_rgba(255,255,255,.08)]

active:scale-95
transition-all
duration-200
"
          aria-label="Love Wordle"
        >
          <Heart
            size={25}
            strokeWidth={2.7}
            className="text-[#ff375f]"
            fill="currentColor"
          />
        </motion.button>
      </div>

      {/* Header */}
      <div className="flex flex-col items-center pt-12 pb-3 px-4 shrink-0">
        <h1 className="text-white text-[26px] font-semibold tracking-tight">
          Wordle
        </h1>
        <AnimatePresence mode="wait">
          <motion.p
            key={statusLabel}
            initial={{ opacity: 0, y: -4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 4 }}
            transition={{ duration: 0.18, ease: [0.2, 0, 0, 1] }}
            className={[
              "text-[13px] mt-1.5 font-medium tracking-tight",
              gameStatus === "won"
                ? "text-[#34C759]"
                : gameStatus === "lost"
                ? "text-[#FF453A]"
                : "text-white/50",
            ].join(" ")}
          >
            {statusLabel}
          </motion.p>
        </AnimatePresence>
      </div>

      {/* Board */}
      <div className="flex-1 min-h-0 flex items-start justify-center px-6 pt-3 pb-4">
        <div className="w-full max-w-[306px] flex flex-col gap-2 sm:gap-2.5">
          {rows.map((rowIndex) => {
            const isSubmitted = rowIndex < guesses.length;
            const isCurrent = rowIndex === guesses.length;
            const rowLetters = isSubmitted
              ? guesses[rowIndex].split("")
              : isCurrent
              ? currentGuess
                  .padEnd(WORD_LENGTH, " ")
                  .split("")
              : Array(WORD_LENGTH).fill(" ");
            const rowEval = isSubmitted ? evaluations[rowIndex] : null;

            return (
              <div
                key={rowIndex}
                className="flex gap-2 sm:gap-2.5 justify-center"
              >
                {rowLetters.map((letter, colIndex) => (
                  <Tile
                    key={colIndex}
                    letter={letter.trim()}
                    status={rowEval ? rowEval[colIndex] : "empty"}
                    active={isCurrent}
                    flip={flippingRow === rowIndex}
                    flipDelay={colIndex * 0.25}
                    pop={
                      isCurrent &&
                      popTileIndex === colIndex &&
                      letter.trim() !== ""
                    }
                    bounce={bouncingRow === rowIndex}
                    bounceDelay={colIndex * 0.082}
                    shake={shakeRow === rowIndex}
                  />
                ))}
              </div>
            );
          })}
        </div>
      </div>

      {/* Keyboard */}
      <div className="shrink-0 px-2 pb-[calc(env(safe-area-inset-bottom)+16px)] pt-2">
        <div className="flex flex-col gap-2">
          {KEYBOARD_ROWS.map((row, i) => (
            <div key={i} className="flex gap-1.5 px-1">
              {row.map((key) => (
                <Key
                  key={key}
                  label={key}
                  status={keyboardStatus[key] ?? "empty"}
                  wide={key === "enter" || key === "del"}
                  emphasis={
                    key === "enter" &&
                    currentGuess.length === WORD_LENGTH &&
                    gameStatus === "playing" &&
                    !isBusy
                  }
                  onPress={handleKey}
                />
              ))}
            </div>
          ))}
        </div>
      </div>

      {/* Result overlay */}
      <AnimatePresence>
        {showResult && (
          <ResultCard
            status={gameStatus}
            answer={answer}
            attempts={guesses.length}
            onNewGame={resetGame}
          />
        )}
      </AnimatePresence>
    </div>
  );
}
