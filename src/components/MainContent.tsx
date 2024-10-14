import { useState } from "react";
import Game from "./Game";
import Heroes from "./Heroes";

interface MainContentProps {
  gold: number;
  setGold: React.Dispatch<React.SetStateAction<number>>;
  health: number;
  currentWave: number;
  currentLevel: number;
  currentWorld: number;
  setHealth: React.Dispatch<React.SetStateAction<number>>;
  setCurrentWave: React.Dispatch<React.SetStateAction<number>>;
  setCurrentLevel: React.Dispatch<React.SetStateAction<number>>;
  setCurrentWorld: React.Dispatch<React.SetStateAction<number>>;
}

export default function MainContent({
  gold,
  setGold,
  health,
  currentWave,
  currentLevel,
  currentWorld,
  setHealth,
  setCurrentWave,
  setCurrentLevel,
  setCurrentWorld,
}: MainContentProps) {
  const [damage, setDamage] = useState(1);
  const [completedWaves, setCompletedWaves] = useState(1);

  return (
    <div className="container-fluid h-100 d-flex">
      <div className="row flex-grow-1">
        <Game
          gold={gold}
          setGold={setGold}
          health={health}
          setHealth={setHealth}
          damage={damage}
          currentWave={currentWave}
          currentLevel={currentLevel}
          currentWorld={currentWorld}
          setCurrentWave={setCurrentWave}
          setCurrentLevel={setCurrentLevel}
          setCurrentWorld={setCurrentWorld}
          completedWaves={completedWaves}
          setCompletedWaves={setCompletedWaves}
        />
        <Heroes
          gold={gold}
          setGold={setGold}
          damage={damage}
          setDamage={setDamage}
        />
      </div>
    </div>
  );
}
