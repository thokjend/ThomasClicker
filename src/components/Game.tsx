import { useEffect, useRef, useState } from "react";
import HealthBar from "../utils/HealthBar";

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
}: GameProps) {
  const [health, setHealth] = useState(10);
  const [sprite, setSprite] = useState(getRandomSprite());
  const [completedWaves, setCompletedWaves] = useState(1);
  const [backgroundImg, setbackgroundImg] = useState(1);
  const healthBarRef = useRef<HealthBar | null>(null); // To persist the HealthBar object

  const healthBarWidth = 500;
  const healthBarHeight = 30;
  const canvasWidth = 650;
  const canvasHeight = 60;
  const x = canvasWidth / 2 - healthBarWidth / 2;
  const y = canvasHeight / 2 - healthBarHeight / 2;

  function handleClick() {
    update(damage);
  }

  function applyDps() {
    const maxTicksPerSecond = 60;
    const ticksPerSecond = Math.min(dps, maxTicksPerSecond); // Avoid going over 60 ticks per second

    // Ensure ticksPerSecond is greater than 0 to avoid division by zero
    if (ticksPerSecond > 0) {
      const damagePerTick = dps / ticksPerSecond; // Scale the damage to maintain correct DPS
      const tickInterval = 1000 / ticksPerSecond; // Calculate interval between each tick in milliseconds

      // Apply DPS by triggering damage at each tick
      const intervalId = setInterval(() => {
        update(damagePerTick);
        if (health <= 0) clearInterval(intervalId);
      }, tickInterval);

      return () => clearInterval(intervalId);
    } else {
      // Return a no-op function if dps is 0 to avoid errors
      return () => {};
    }
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
    return Math.floor(baseGold * (1 + waveMultiplier) + currentWorld ** 5);
  }

  function progress() {
    let newWave = currentWave;
    let newLevel = currentLevel;
    let newWorld = currentWorld;
    const newGold = calculateGold();

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

    setCurrentWave(newWave);
    setCurrentLevel(newLevel);
    setCurrentWorld(newWorld);
    setCompletedWaves(completedWaves + 1);
    setGold(gold + newGold);
  }

  function handleProgression() {
    progress();

    // Reset sprite for the new wave
    setSprite(getRandomSprite());

    // Health for Boss Level
    if (currentWave === 9 && currentLevel === 10) {
      const bossHpMultiplier = [1, 2, 3, 4, 5, 10, 25, 50, 100, 1000];
      const baseBossHp = 10000;
      const newHealth = baseBossHp * bossHpMultiplier[currentWorld - 1]; // Set boss health using the multiplier
      setHealth(newHealth);
      resetHealthAndCanvas(newHealth);
    } else {
      // Health for normal wave
      const newHealth = Math.round(
        10 * completedWaves + Math.exp(0.01 * completedWaves)
      );
      setHealth(newHealth);
      resetHealthAndCanvas(newHealth);
    }
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
    const stopDps = applyDps(); // Start applying DPS on mount
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
