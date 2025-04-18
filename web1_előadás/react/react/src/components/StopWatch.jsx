import React, { useState, useEffect } from "react";

const formatTime = (totalSeconds) => {
  const hours = String(Math.floor(totalSeconds / 3600)).padStart(2, "0");
  const minutes = String(Math.floor((totalSeconds % 3600) / 60)).padStart(2, "0");
  const seconds = String(totalSeconds % 60).padStart(2, "0");
  return `${hours}:${minutes}:${seconds}`;
};

const StopWatch = () => {
  const [seconds, setSeconds] = useState(0);
  const [running, setRunning] = useState(false);

  useEffect(() => {
    let interval;
    if (running) {
      interval = setInterval(() => {
        setSeconds((prev) => prev + 1);
      }, 1000);
    } else {
      clearInterval(interval);
    }

    return () => clearInterval(interval);
  }, [running]);

  const handleReset = () => {
    setSeconds(0);
    setRunning(false);
  };

  return (
    <div className="text-center">
      <h2 className="text-xl font-bold mb-4">Stopperóra</h2>
      <div className="text-3xl font-mono mb-4">{formatTime(seconds)}</div>
      <div className="space-x-4">
        <button
          onClick={() => setRunning((prev) => !prev)}
          className={`px-4 py-2 rounded text-white ${
            running ? "bg-red-500" : "bg-green-500"
          }`}
        >
          {running ? "Szünet" : "Indítás"}
        </button>
        <button
          onClick={handleReset}
          className="px-4 py-2 bg-gray-500 text-white rounded"
        >
          Visszaállítás
        </button>
      </div>
    </div>
  );
};

export default StopWatch;
