import { useEffect, useState } from "react";
import HealthBar from "./HealthBar";

export default function Game() {
  const [damage, setDamage] = useState(1);

  let sprite = getRandomSprite();
  let health = 10;
  const healthBarWidth = 500;
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

  function getRandomSprite() {
    const randomNumber = Math.floor(Math.random() * 48) + 1;
    return `/sprites/Icon${randomNumber}.png`;
  }

  const update = (damage: number) => {
    health = Math.max(health - damage, 0);

    healthBar.updateHealth(health);

    const canvas = document.getElementById("canvas") as HTMLCanvasElement;
    const context = canvas.getContext("2d");

    if (context) {
      context.clearRect(0, 0, canvas.width, canvas.height);
      healthBar.show(context);
    }
  };

  useEffect(() => {
    const canvas = document.getElementById("canvas") as HTMLCanvasElement;
    const context = canvas.getContext("2d");

    if (canvas) {
      canvas.width = canvasWidth;
      canvas.height = canvasHeight;
    }

    if (context) {
      healthBar.show(context);
    }
  }, [canvasHeight, canvasWidth]);

  return (
    <div className="col-9 game-container border d-flex flex-column justify-content-center align-items-center">
      {
        <img
          onClick={() => update(damage)}
          src={sprite}
          alt="Game Sprite"
          className="img-fluid w-25"
        />
      }

      <canvas id="canvas" style={{ height: "100px", width: "500px" }}></canvas>
    </div>
  );
}
