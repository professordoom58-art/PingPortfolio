"use client";

import { useEffect, useState, useCallback } from "react";

type Position = {
  x: number;
  y: number;
};

const GRID_SIZE = 20;
const CELL_SIZE = 20;

export default function SnakeGame() {
  const [snake, setSnake] = useState<Position[]>([
    { x: 10, y: 10 },
    { x: 9, y: 10 },
  ]);

  const [food, setFood] = useState<Position>({ x: 15, y: 15 });
  const [direction, setDirection] = useState<Position>({ x: 1, y: 0 });
  const [gameOver, setGameOver] = useState(false);
  const [score, setScore] = useState(0);

  const generateFood = useCallback((snakeBody: Position[]) => {
    let newFood: Position;

    do {
      newFood = {
        x: Math.floor(Math.random() * GRID_SIZE),
        y: Math.floor(Math.random() * GRID_SIZE),
      };
    } while (
      snakeBody.some(
        (segment) => segment.x === newFood.x && segment.y === newFood.y
      )
    );

    return newFood;
  }, []);

  const restartGame = () => {
    setSnake([
      { x: 10, y: 10 },
      { x: 9, y: 10 },
    ]);
    setFood({ x: 15, y: 15 });
    setDirection({ x: 1, y: 0 });
    setGameOver(false);
    setScore(0);
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      switch (e.key) {
        case "ArrowUp":
          if (direction.y !== 1) setDirection({ x: 0, y: -1 });
          break;
        case "ArrowDown":
          if (direction.y !== -1) setDirection({ x: 0, y: 1 });
          break;
        case "ArrowLeft":
          if (direction.x !== 1) setDirection({ x: -1, y: 0 });
          break;
        case "ArrowRight":
          if (direction.x !== -1) setDirection({ x: 1, y: 0 });
          break;
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [direction]);

  useEffect(() => {
    if (gameOver) return;

    const interval = setInterval(() => {
      setSnake((prevSnake) => {
        const head = prevSnake[0];

        const newHead = {
          x: head.x + direction.x,
          y: head.y + direction.y,
        };

        // Wall collision
        if (
          newHead.x < 0 ||
          newHead.y < 0 ||
          newHead.x >= GRID_SIZE ||
          newHead.y >= GRID_SIZE
        ) {
          setGameOver(true);
          return prevSnake;
        }

        // Self collision
        if (
          prevSnake.some(
            (segment) =>
              segment.x === newHead.x && segment.y === newHead.y
          )
        ) {
          setGameOver(true);
          return prevSnake;
        }

        const newSnake = [newHead, ...prevSnake];

        // Food collision
        if (newHead.x === food.x && newHead.y === food.y) {
          setScore((s) => s + 1);
          setFood(generateFood(newSnake));
          return newSnake;
        }

        newSnake.pop();
        return newSnake;
      });
    }, 120);

    return () => clearInterval(interval);
  }, [direction, food, gameOver, generateFood]);

  return (
    <div className="flex flex-col items-center gap-4 p-6 text-white">
      <h2 className="text-2xl font-bold">🐍 Snake</h2>

      <div className="text-lg">Score: {score}</div>

      <div
        className="relative border-2 border-zinc-700 bg-black"
        style={{
          width: GRID_SIZE * CELL_SIZE,
          height: GRID_SIZE * CELL_SIZE,
        }}
      >
        {snake.map((segment, index) => (
          <div
            key={index}
            className={`absolute ${
              index === 0 ? "bg-green-400" : "bg-green-600"
            }`}
            style={{
              width: CELL_SIZE,
              height: CELL_SIZE,
              left: segment.x * CELL_SIZE,
              top: segment.y * CELL_SIZE,
            }}
          />
        ))}

        <div
          className="absolute bg-red-500 rounded-full"
          style={{
            width: CELL_SIZE,
            height: CELL_SIZE,
            left: food.x * CELL_SIZE,
            top: food.y * CELL_SIZE,
          }}
        />

        {gameOver && (
          <div className="absolute inset-0 bg-black/80 flex flex-col items-center justify-center gap-4">
            <div className="text-3xl font-bold text-red-500">
              Game Over
            </div>
            <div>Final Score: {score}</div>
            <button
              onClick={restartGame}
              className="px-4 py-2 bg-green-600 rounded hover:bg-green-700"
            >
              Play Again
            </button>
          </div>
        )}
      </div>

      <p className="text-sm text-zinc-400">
        Use Arrow Keys to Move
      </p>
    </div>
  );
}