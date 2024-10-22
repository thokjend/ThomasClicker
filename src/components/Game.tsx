import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import HealthBar from "../utils/HealthBar";
import { handleClick, applyDps } from "../utils/HandleDamage";
import { calculateGold } from "../utils/CalculateGold";
import {
  setHealthForWavesAndBosses,
  updateHealth,
} from "../utils/HandleHealth";
import {
  resetHealthAndCanvas,
  createHealthBar,
  updateCanvas,
} from "../utils/HandleCanvas";

interface GameProps {
  gold: number;
  setGold: React.Dispatch<React.SetStateAction<number>>;
  damage: number;
  dps: number;
  currentWave: number;
  currentLevel: number;
  currentWorld: number;
  setCurrentWave: React.Dispatch<React.SetStateAction<number>>;
  setCurrentLevel: React.Dispatch<React.SetStateAction<number>>;
  setCurrentWorld: React.Dispatch<React.SetStateAction<number>>;
  endGame: () => void;
}

export default function Game({
  gold,
  setGold,
  damage,
  dps,
  currentWave,
  currentLevel,
  currentWorld,
  setCurrentWave,
  setCurrentLevel,
  setCurrentWorld,
  endGame,
}: GameProps) {
  const [health, setHealth] = useState(10);
  const [sprite, setSprite] = useState(getRandomSprite());
  const [completedWaves, setCompletedWaves] = useState(1);
  const [backgroundImg, setBackgroundImg] = useState(1);
  const healthBarRef = useRef<HealthBar | null>(null); // To persist the HealthBar object

  const healthBarWidth = 500;
  const healthBarHeight = 30;
  const canvasWidth = 650;
  const canvasHeight = 60;
  const x = canvasWidth / 2 - healthBarWidth / 2;
  const y = canvasHeight / 2 - healthBarHeight / 2;

  const navigate = useNavigate();

  function handleProgression() {
    progress();
    setSprite(getRandomSprite());
    setHealthForWavesAndBosses(
      currentWave,
      currentLevel,
      currentWorld,
      completedWaves,
      setHealth,
      (newHealth) =>
        resetHealthAndCanvas(newHealth, healthBarRef, (health) =>
          updateCanvas(health, healthBarRef)
        )
    );
  }

  function progress() {
    const { newWave, newLevel, newWorld } = calculateNext();
    setCurrentWave(newWave);
    setCurrentLevel(newLevel);
    setCurrentWorld(newWorld);
    setCompletedWaves(completedWaves + 1);
    setGold(gold + calculateGold(completedWaves, currentWorld));
  }

  // Function to calculate next wave, level, and world
  function calculateNext() {
    let newWave = currentWave;
    let newLevel = currentLevel;
    let newWorld = currentWorld;

    if (currentWave === 10 && currentLevel === 10 && currentWorld === 10) {
      endGame();
      navigate("/credits");
    }

    if (currentWave === 10) {
      newWave = 1; // Reset wave for the new level
      if (currentLevel === 10) {
        newLevel = 1; // Reset level for the new world
        newWorld = currentWorld + 1; // Increment world
        setBackgroundImg(backgroundImg + 1);
      } else {
        newLevel = currentLevel + 1; // Move to the next level
      }
    } else {
      newWave = currentWave + 1; // Move to the next wave
    }

    return { newWave, newLevel, newWorld };
  }

  function getRandomSprite() {
    const randomNumber = Math.floor(Math.random() * 48) + 1;
    return `/sprites/Icon${randomNumber}.png`;
  }

  useEffect(() => {
    createHealthBar(
      health,
      canvasWidth,
      canvasHeight,
      healthBarRef,
      x,
      y,
      healthBarWidth,
      healthBarHeight
    );
  }, []);

  useEffect(() => {
    updateCanvas(health, healthBarRef);
  }, [health]);

  useEffect(() => {
    const stopDps = applyDps(dps, health, (damage) =>
      updateHealth(health, damage, handleProgression, setHealth)
    ); // Start applying DPS on mount
    return () => stopDps(); // Cleanup the interval on unmount
  }, [dps, health, currentWave, currentLevel, currentWorld]);

  return (
    <div
      className="col-9 game-container d-flex flex-column justify-content-center align-items-center"
      style={{
        backgroundImage: `url(/backgrounds/world${backgroundImg}.png)`,
        backgroundSize: "cover",
        backgroundPosition: "center center",
        backgroundRepeat: "no-repeat",
      }}
    >
      <img
        onClick={() =>
          handleClick(damage, (damage) =>
            updateHealth(health, damage, handleProgression, setHealth)
          )
        }
        src={sprite}
        alt="Game Sprite"
        className="img-fluid w-25 pointer"
      />
      <div className="fs-1 fw-bold" style={{ color: "red" }}>
        {Math.round(health)}HP
      </div>
      <canvas id="canvas" style={{ height: "100px", width: "500px" }}></canvas>
    </div>
  );
}
