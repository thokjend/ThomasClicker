import { useEffect } from "react";
import HealthBar from "./HealthBar";

export default function Game() {
  let health = 100;
  const healthBarWidth = 600;
  const healthBarHeight = 30;

  const canvasWidth = 650;
  const canvasHeight = 60;

  const x = canvasWidth / 2 - healthBarWidth / 2;
  const y = canvasHeight / 2 - healthBarHeight / 2;

  const healthBar = new HealthBar(
    x,
    y,
    healthBarWidth,
    healthBarHeight,
    health,
    "green"
  );
  useEffect(() => {
    const canvas = document.getElementById("canvas") as HTMLCanvasElement;
    const context = canvas.getContext("2d");

    if (canvas) {
      canvas.width = canvasWidth;
      canvas.height = canvasHeight;
    }

    if (context) {
      // Call the show method to render the health bar
      healthBar.show(context);
    }
  }, [canvasHeight, canvasWidth]);

  return (
    <div className="col-9 game-container border d-flex flex-column justify-content-center align-items-center">
      <img
        src="/sprites/Icon40.png"
        alt="Game Sprite"
        className="img-fluid w-25"
      />

      <canvas id="canvas" style={{ height: "100px", width: "500px" }}></canvas>
    </div>
  );
}
