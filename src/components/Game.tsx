import { useEffect, useRef, useState } from "react";
import HealthBar from "./HealthBar";

interface GameProps {
  gold: number;
  setGold: React.Dispatch<React.SetStateAction<number>>;
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
  gold,
  setGold,
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

    setGold(gold + 1);
    setCurrentWave(newWave);
    setCurrentLevel(newLevel);
    setCurrentWorld(newWorld);

    // Reset sprite and health for the new wave
    setSprite(getRandomSprite());
    const newHealth = 10 * newWave * newLevel * newWorld;
    setHealth(newHealth);
    resetHealthAndCanvas(newHealth);
  }

  function resetHealthAndCanvas(newHealth: number) {
    setTimeout(() => {
      // Make sure the health bar's maxHealth is updated
      if (healthBarRef.current) {
        healthBarRef.current.maxHealth = newHealth;
      }
      updateCanvas(newHealth);
    }, 0);
  }

  function getRandomSprite() {
    const randomNumber = Math.floor(Math.random() * 48) + 1;
    return `/sprites/Icon${randomNumber}.png`;
  }

  function createHealthBar(newHealth: number) {
    const canvas = document.getElementById("canvas") as HTMLCanvasElement;
    const context = canvas.getContext("2d");

    if (canvas) {
      canvas.width = canvasWidth;
      canvas.height = canvasHeight;
    }

    if (context) {
      // Update the health bar maxHealth when new health is set for a new wave
      if (healthBarRef.current) {
        healthBarRef.current.maxHealth = newHealth; // Update the max health
        healthBarRef.current.health = newHealth; // Reset the health to full
      } else {
        healthBarRef.current = new HealthBar(
          x,
          y,
          healthBarWidth,
          healthBarHeight,
          newHealth, // Initial max health
          "green"
        );
      }
      healthBarRef.current.show(context);
    }
  }

  function updateCanvas(newHealth: number) {
    const canvas = document.getElementById("canvas") as HTMLCanvasElement;
    const context = canvas.getContext("2d");

    if (context && healthBarRef.current) {
      context.clearRect(0, 0, canvas.width, canvas.height);
      healthBarRef.current.updateHealth(newHealth);
      healthBarRef.current.show(context);
    }
  }

  useEffect(() => {
    createHealthBar(health);
  }, []);

  useEffect(() => {
    updateCanvas(health);
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
