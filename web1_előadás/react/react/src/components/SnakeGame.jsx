import React, { useState, useEffect, useRef } from "react";
import "../App.css";

const BOARD_SIZE = 10;
const INITIAL_SNAKE = [[0, 0]];
const INITIAL_DIRECTION = [0, 1]; // jobbra

function SnakeGame() {
  const [snake, setSnake] = useState(INITIAL_SNAKE);
  const [direction, setDirection] = useState(INITIAL_DIRECTION);
  const [food, setFood] = useState([3, 3]);
  const [gameOver, setGameOver] = useState(false);
  const [isRunning, setIsRunning] = useState(false);

  const boardRef = useRef(null);

  // véletlenszerű pozíció a kajának
  const getRandomPosition = () => {
    let position;
    do {
      position = [
        Math.floor(Math.random() * BOARD_SIZE),
        Math.floor(Math.random() * BOARD_SIZE),
      ];
    } while (snake.some(([x, y]) => x === position[0] && y === position[1]));
    return position;
  };

  // mozgás
  useEffect(() => {
    if (gameOver || !isRunning) return;

    const interval = setInterval(() => {
      setSnake((prevSnake) => {
        const head = prevSnake[prevSnake.length - 1];
        const newHead = [head[0] + direction[0], head[1] + direction[1]];

        // fal vagy saját magába ütközés
        if (
          newHead[0] < 0 ||
          newHead[0] >= BOARD_SIZE ||
          newHead[1] < 0 ||
          newHead[1] >= BOARD_SIZE ||
          prevSnake.some((segment) => segment[0] === newHead[0] && segment[1] === newHead[1])
        ) {
          setGameOver(true);
          setIsRunning(false);
          return prevSnake;
        }

        const newSnake = [...prevSnake, newHead];

        if (newHead[0] === food[0] && newHead[1] === food[1]) {
          setFood(getRandomPosition());
        } else {
          newSnake.shift(); // nem nő, csak halad
        }

        return newSnake;
      });
    }, 300);

    return () => clearInterval(interval);
  }, [direction, food, gameOver, isRunning]);

  // billentyűkezelés
  useEffect(() => {
    const handleKeyDown = (e) => {
      switch (e.key) {
        case " ":
          if (!isRunning && !gameOver) {
            setIsRunning(true);
          }
          break;
        case "ArrowUp":
          if (direction[0] !== 1) setDirection([-1, 0]);
          break;
        case "ArrowDown":
          if (direction[0] !== -1) setDirection([1, 0]);
          break;
        case "ArrowLeft":
          if (direction[1] !== 1) setDirection([0, -1]);
          break;
        case "ArrowRight":
          if (direction[1] !== -1) setDirection([0, 1]);
          break;
        default:
          break;
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [direction, isRunning, gameOver]);

  const restartGame = () => {
    setSnake(INITIAL_SNAKE);
    setDirection(INITIAL_DIRECTION);
    setFood(getRandomPosition());
    setGameOver(false);
    setIsRunning(false); // újra csak Space-re indul
  };

  return (
    <div className="text-center">
      <h2 className="text-xl font-bold mb-2">Snake Game</h2>
      <div
        ref={boardRef}
        className="inline-grid border"
        style={{
          gridTemplateColumns: `repeat(${BOARD_SIZE}, 40px)`,
          gridTemplateRows: `repeat(${BOARD_SIZE}, 40px)`,
        }}
      >
        {[...Array(BOARD_SIZE)].map((_, row) =>
          [...Array(BOARD_SIZE)].map((_, col) => {
            const isSnake = snake.some(([x, y]) => x === row && y === col);
            const isFood = food[0] === row && food[1] === col;
            return (
              <div
                key={`${row}-${col}`}
                className={`w-10 h-10 border border-gray-300 ${
                  isSnake ? "bg-green-600" : isFood ? "bg-red-500" : ""
                }`}
              />
            );
          })
        )}
      </div>

      {!isRunning && !gameOver && (
        <p className="mt-3 text-gray-600 italic">Nyomj meg [Space]-t a kezdéshez!</p>
      )}

      {gameOver && (
        <div className="mt-3">
          <p className="text-red-600 font-bold">Game Over!</p>
          <button
            onClick={restartGame}
            className="mt-2 px-4 py-1 bg-blue-500 text-white rounded"
          >
            Újraindítás
          </button>
        </div>
      )}
    </div>
  );
}

export default SnakeGame;
