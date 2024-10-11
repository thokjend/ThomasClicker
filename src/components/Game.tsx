import { useEffect, useRef, useState } from "react";
import HealthBar from "./HealthBar";

interface GameProps {
  damage: number;
  health: number;
  setHealth: React.Dispatch<React.SetStateAction<number>>;
  currentWave: number;
  currentLevel: number;
  currentWorld: number;
  setCurrentWave: React.Dispatch<React.SetStateAction<number>>;
  setCurrentLevel: React.Dispatch<React.SetStateAction<number>>;
  setCurrentWorld: React.Dispatch<React.SetStateAction<number>>;
}

export default function Game({
  damage,
  health,
  setHealth,
  currentWave,
  currentLevel,
  currentWorld,
  setCurrentWave,
  setCurrentLevel,
  setCurrentWorld,
}: GameProps) {
  const [sprite, setSprite] = useState(getRandomSprite());
  const healthBarRef = useRef<HealthBar | null>(null); // To persist the HealthBar object

  const healthBarWidth = 500;
  const healthBarHeight = 30;
  const canvasWidth = 650;
  const canvasHeight = 60;
  const x = canvasWidth / 2 - healthBarWidth / 2;
  const y = canvasHeight / 2 - healthBarHeight / 2;

  const update = (damage: number) => {
    const newHealth = Math.max(health - damage, 0);
    if (newHealth <= 0) {
      handleProgression();
    } else {
      setHealth(newHealth);
    }
  };

  function handleProgression() {
    let newWave = currentWave;
    let newLevel = currentLevel;
    let newWorld = currentWorld;

    if (currentWave === 10) {
      newWave = 1; // Reset wave for the new level
      if (currentLevel === 10) {
        newLevel = 1; // Reset level for the new world
        newWorld = currentWorld + 1; // Increment world
      } else {
        newLevel = currentLevel + 1; // Move to the next level
      }
    } else {
      newWave = currentWave + 1; // Move to the next wave
    }

    setCurrentWave(newWave);
    setCurrentLevel(newLevel);
    setCurrentWorld(newWorld);

    // Reset sprite and health for the new wave
    setSprite(getRandomSprite());
    resetHealthAndCanvas();
  }

  function resetHealthAndCanvas() {
    setTimeout(() => {
      updateCanvas();
      setHealth(10); // Reset health
    }, 0);
  }

  function getRandomSprite() {
    const randomNumber = Math.floor(Math.random() * 48) + 1;
    return `/sprites/Icon${randomNumber}.png`;
  }

  function createHealthBar() {
    const canvas = document.getElementById("canvas") as HTMLCanvasElement;
    const context = canvas.getContext("2d");

    if (canvas) {
      canvas.width = canvasWidth;
      canvas.height = canvasHeight;
    }

    if (context && !healthBarRef.current) {
      healthBarRef.current = new HealthBar(
        x,
        y,
        healthBarWidth,
        healthBarHeight,
        health,
        "green"
      );
      healthBarRef.current.show(context);
    }
  }

  function updateCanvas() {
    const canvas = document.getElementById("canvas") as HTMLCanvasElement;
    const context = canvas.getContext("2d");

    if (context && healthBarRef.current) {
      context.clearRect(0, 0, canvas.width, canvas.height);
      healthBarRef.current.updateHealth(health);
      healthBarRef.current.show(context);
    }
  }

  useEffect(() => {
    createHealthBar();
  });

  useEffect(() => {
    updateCanvas();
  }, [health]);

  return (
    <div className="col-9 game-container border d-flex flex-column justify-content-center align-items-center">
      <img
        onClick={() => update(damage)}
        src={sprite}
        alt="Game Sprite"
        className="img-fluid w-25"
      />
      <div className="fs-1 fw-bold text-danger">{health}HP</div>
      <canvas id="canvas" style={{ height: "100px", width: "500px" }}></canvas>
    </div>
  );
}
