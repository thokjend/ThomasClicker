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

/* function App() {
  const [gold, setGold] = useState(1);
  const [currentWave, setCurrentWave] = useState(1);
  const [currentLevel, setCurrentLevel] = useState(1);
  const [currentWorld, setCurrentWorld] = useState(1);
  const [gameOver, setGameOver] = useState(false);
  const [startTime, setStartTime] = useState(0);
  const [elapsedTime, setElapsedTime] = useState(0);

  // Function to reset the game
  function resetGame() {
    setGold(1);
    setCurrentWave(1);
    setCurrentLevel(1);
    setCurrentWorld(1);
    setGameOver(false);
    setStartTime(Date.now());
    setElapsedTime(0);
  }

  function endGame() {
    setGameOver(true);
    const endTime = Date.now();
    const timeTaken = Math.floor((endTime - startTime) / 1000); // Calculate elapsed time in seconds
    setElapsedTime(timeTaken); // Set elapsed time in state
  }

  useEffect(() => {
    setStartTime(Date.now());
  }, []);

  return (
    <div className="vh-100">
      {gameOver ? (
        <Credits elapsedTime={elapsedTime} resetGame={resetGame} />
      ) : (
        <>
          <Header
            gold={gold}
            currentLevel={currentLevel}
            currentWorld={currentWorld}
            currentWave={currentWave}
          />
          <MainContent
            gold={gold}
            setGold={setGold}
            currentWave={currentWave}
            currentLevel={currentLevel}
            currentWorld={currentWorld}
            setCurrentLevel={setCurrentLevel}
            setCurrentWorld={setCurrentWorld}
            setCurrentWave={setCurrentWave}
            endGame={endGame}
          />
        </>
      )}
    </div>
  );
}

export default App;
 */
