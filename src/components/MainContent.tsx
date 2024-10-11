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
  const [damage, setDamage] = useState(5);

  return (
    <div className="container-fluid mt-3">
      <div className="row " style={{ height: "85vh" }}>
        <Game
          health={health}
          setHealth={setHealth}
          damage={damage}
          currentWave={currentWave}
          currentLevel={currentLevel}
          currentWorld={currentWorld}
          setCurrentWave={setCurrentWave}
          setCurrentLevel={setCurrentLevel}
          setCurrentWorld={setCurrentWorld}
        />
        <Heroes gold={gold} setGold={setGold} setDamage={setDamage} />
      </div>
    </div>
  );
}
