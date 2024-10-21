export function handleClick(
  damage: number,
  updateHealth: (damage: number) => void
) {
  updateHealth(damage);
}

export function applyDps(
  dps: number,
  health: number,
  updateHealth: (damage: number) => void
) {
  const maxTicksPerSecond = 60;
  const ticksPerSecond = Math.min(dps, maxTicksPerSecond); // Avoid going over 60 ticks per second

  // Ensure ticksPerSecond is greater than 0 to avoid division by zero
  if (ticksPerSecond > 0) {
    const damagePerTick = dps / ticksPerSecond; // Scale the damage to maintain correct DPS
    const tickInterval = 1000 / ticksPerSecond; // Calculate interval between each tick in milliseconds

    // Apply DPS by triggering damage at each tick
    const intervalId = setInterval(() => {
      updateHealth(damagePerTick);
      if (health <= 0) clearInterval(intervalId);
    }, tickInterval);

    return () => clearInterval(intervalId);
  } else {
    // Return a no-op function if dps is 0 to avoid errors
    return () => {};
  }
}
