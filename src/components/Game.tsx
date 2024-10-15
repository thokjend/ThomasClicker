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
  completedWaves: number;
  setCompletedWaves: React.Dispatch<React.SetStateAction<number>>;
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
  completedWaves,
  setCompletedWaves,
}: GameProps) {
  const [sprite, setSprite] = useState(getRandomSprite());
  const healthBarRef = useRef<HealthBar | null>(null); // To persist the HealthBar object
  const [backgroundImg, setbackgroundImg] = useState(1);

  const healthBarWidth = 500;
  const healthBarHeight = 30;
  const canvasWidth = 650;
  const canvasHeight = 60;
  const x = canvasWidth / 2 - healthBarWidth / 2;
  const y = canvasHeight / 2 - healthBarHeight / 2;

  const dps = 10;

  function handleClick() {
    update(damage);
  }

  function applyDps() {
    update(dps);
  }

  function update(damage: number) {
    const newHealth = Math.max(health - damage, 0);
    if (newHealth <= 0) {
      handleProgression();
    } else {
      setHealth(newHealth);
    }
  }

  function calculateGold() {
    const baseGold = 1;
    const waveMultiplier = Math.log(completedWaves + 1); // Logarithmic growth based on completed waves
    return Math.floor(
      baseGold * (1 + waveMultiplier) + currentLevel + currentWorld ** 4
    );
  }

  function handleProgression() {
    let newWave = currentWave;
    let newLevel = currentLevel;
    let newWorld = currentWorld;

    if (currentWave === 10) {
      newWave = 1; // Reset wave for the new level
      if (currentLevel === 10) {
        newLevel = 1; // Reset level for the new world
        newWorld = currentWorld + 1; // Increment world
        setbackgroundImg(backgroundImg + 1);
      } else {
        newLevel = currentLevel + 1; // Move to the next level
      }
    } else {
      newWave = currentWave + 1; // Move to the next wave
    }

    setCompletedWaves(completedWaves + 1);
    const newGold = calculateGold();
    setGold(gold + newGold);
    setCurrentWave(newWave);
    setCurrentLevel(newLevel);
    setCurrentWorld(newWorld);

    // Reset sprite and health for the new wave
    setSprite(getRandomSprite());
    const newHealth = Math.round(
      completedWaves + Math.exp(0.01 * completedWaves)
    );
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

  useEffect(() => {
    const dpsInterval = setInterval(() => {
      if (health > 0) {
        applyDps();
      }
    }, 1000);

    return () => clearInterval(dpsInterval); // Cleanup on component unmount
  }, [health]);

  return (
    <div
      className="col-9 game-container border d-flex flex-column justify-content-center align-items-center"
      style={{
        backgroundImage: `url(/backgrounds/world${backgroundImg}.png)`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      <img
        onClick={() => handleClick()}
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
