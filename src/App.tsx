import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import StartPage from "./pages/StartPage";
import MainPage from "./pages/MainPage";
import CreditsPage from "./pages/CreditsPage";

import { useState } from "react";
import "./App.css";

export default function App() {
  const [gold, setGold] = useState(1);
  const [currentWave, setCurrentWave] = useState(1);
  const [currentLevel, setCurrentLevel] = useState(1);
  const [currentWorld, setCurrentWorld] = useState(1);
  const [startTime, setStartTime] = useState(0);
  const [elapsedTime, setElapsedTime] = useState(0);

  function resetGame() {
    setGold(1);
    setCurrentWave(1);
    setCurrentLevel(1);
    setCurrentWorld(1);
    setStartTime(Date.now());
    setElapsedTime(0);
  }

  function endGame() {
    const endTime = Date.now();
    const timeTaken = Math.floor((endTime - startTime) / 1000); // Calculate elapsed time in seconds
    setElapsedTime(timeTaken); // Set elapsed time in state
  }

  return (
    <Router>
      <Routes>
        <Route path="/" element={<StartPage resetGame={resetGame} />} />
        <Route
          path="/main"
          element={
            <MainPage
              gold={gold}
              setGold={setGold}
              currentWave={currentWave}
              setCurrentWave={setCurrentWave}
              currentLevel={currentLevel}
              setCurrentLevel={setCurrentLevel}
              currentWorld={currentWorld}
              setCurrentWorld={setCurrentWorld}
              endGame={endGame}
              setStartTime={setStartTime}
            />
          }
        />
        <Route
          path="/credits"
          element={
            <CreditsPage elapsedTime={elapsedTime} resetGame={resetGame} />
          }
        />
      </Routes>
    </Router>
  );
}
