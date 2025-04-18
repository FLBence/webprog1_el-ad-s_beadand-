import { useState } from "react";
import SnakeGame from "./components/SnakeGame";
import StopWatch from "./components/StopWatch";
import "./App.css";

function App() {
  const [activePage, setActivePage] = useState("snake");

  return (
    <div className="App">
      <header>
        <h1>React SPA – Snake & Stopperóra</h1>
        <nav style={{ marginBottom: '1rem' }}>
          <button onClick={() => setActivePage("snake")} className="menu-btn">
            Snake
          </button>
          <button onClick={() => setActivePage("stopwatch")} className="menu-btn">
            Stopperóra
          </button>
        </nav>
      </header>

      <main>
        {activePage === "snake" && <SnakeGame />}
        {activePage === "stopwatch" && <StopWatch />}
      </main>
    </div>
  );
}

export default App;
