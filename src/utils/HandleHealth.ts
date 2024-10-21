export function setHealthForWavesAndBosses(
  currentWave: number,
  currentLevel: number,
  currentWorld: number,
  completedWaves: number,
  setHealth: React.Dispatch<React.SetStateAction<number>>,
  resetHealthAndCanvas: (health: number) => void
) {
  if (currentWave === 9 && currentLevel === 10) {
    const bossHpMultiplier = [1, 2, 3, 4, 5, 10, 25, 50, 100, 1000];
    const baseBossHp = 10000;
    const newHealth = baseBossHp * bossHpMultiplier[currentWorld - 1];
    setHealth(newHealth);
    resetHealthAndCanvas(newHealth);
  } else {
    const newHealth = Math.round(
      10 * completedWaves + Math.exp(0.01 * completedWaves)
    );
    setHealth(newHealth);
    resetHealthAndCanvas(newHealth);
  }
}

export function updateHealth(
  currentHealth: number,
  damage: number,
  handleProgression: () => void,
  setHealth: (health: number) => void
) {
  const newHealth = Math.max(currentHealth - damage, 0);
  if (newHealth <= 0) {
    handleProgression();
  } else {
    setHealth(newHealth);
  }
}
