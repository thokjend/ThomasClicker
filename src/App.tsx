import { useState } from "react";
import "./App.css";
import Header from "./components/Header";
import MainContent from "./components/MainContent";

function App() {
  const [gold, setGold] = useState(1);
  const [currentWave, setCurrentWave] = useState(1);
  const [currentLevel, setCurrentLevel] = useState(1);
  const [currentWorld, setCurrentWorld] = useState(1);

  return (
    <div className="vh-100">
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
      />
    </div>
  );
}

export default App;
