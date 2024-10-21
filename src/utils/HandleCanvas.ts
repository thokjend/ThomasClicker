import HealthBar from "../utils/HealthBar";

export function resetHealthAndCanvas(
  newHealth: number,
  healthBarRef: React.MutableRefObject<HealthBar | null>,
  updateCanvas: (newHealth: number) => void
) {
  setTimeout(() => {
    // Make sure the health bar's maxHealth is updated
    if (healthBarRef.current) {
      healthBarRef.current.maxHealth = newHealth;
    }
    updateCanvas(newHealth);
  }, 0);
}

export function createHealthBar(
  newHealth: number,
  canvasWidth: number,
  canvasHeight: number,
  healthBarRef: React.MutableRefObject<HealthBar | null>,
  x: number,
  y: number,
  healthBarWidth: number,
  healthBarHeight: number
) {
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

export function updateCanvas(
  newHealth: number,
  healthBarRef: React.MutableRefObject<HealthBar | null>
) {
  const canvas = document.getElementById("canvas") as HTMLCanvasElement;
  const context = canvas.getContext("2d");

  if (context && healthBarRef.current) {
    context.clearRect(0, 0, canvas.width, canvas.height);
    healthBarRef.current.updateHealth(newHealth);
    healthBarRef.current.show(context);
  }
}
