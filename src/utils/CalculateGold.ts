export function calculateGold(completedWaves: number, currentWorld: number) {
  const baseGold = 1;
  const waveMultiplier = Math.log(completedWaves + 1); // Logarithmic growth based on completed waves
  return Math.floor(baseGold * (1 + waveMultiplier) + currentWorld ** 5);
}
