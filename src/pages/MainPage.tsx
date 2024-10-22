import { useEffect } from "react";
import Header from "../components/Header";
import MainContent from "../components/MainContent";

interface MainPageProps {
  gold: number;
  currentWave: number;
  currentLevel: number;
  currentWorld: number;
  setGold: React.Dispatch<React.SetStateAction<number>>;
  setCurrentWave: React.Dispatch<React.SetStateAction<number>>;
  setCurrentLevel: React.Dispatch<React.SetStateAction<number>>;
  setCurrentWorld: React.Dispatch<React.SetStateAction<number>>;
  setStartTime: React.Dispatch<React.SetStateAction<number>>;
  endGame: () => void;
}

export default function MainPage({
  gold,
  currentWave,
  currentLevel,
  currentWorld,
  setGold,
  setCurrentWave,
  setCurrentLevel,
  setCurrentWorld,
  endGame,
  setStartTime,
}: MainPageProps) {
  useEffect(() => {
    setStartTime(Date.now());
  }, []);

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
        endGame={endGame}
      />
    </div>
  );
}
