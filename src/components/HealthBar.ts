export default class HealthBar {
  x: number;
  y: number;
  w: number;
  h: number;
  maxHealth: number;
  maxWidth: number;
  health: number;
  color: string;

  constructor(
    x: number,
    y: number,
    w: number,
    h: number,
    maxHealth: number,
    color: string
  ) {
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
    this.maxHealth = maxHealth;
    this.maxWidth = w;
    this.health = maxHealth;
    this.color = color;
  }

  show(context: CanvasRenderingContext2D) {
    context.strokeStyle = "#333";
    context.lineWidth = 4;
    context.fillStyle = this.color;

    this.w = Math.max(0, Math.min(this.w, this.maxWidth));

    context.fillRect(this.x, this.y, this.w, this.h);
    context.strokeRect(this.x, this.y, this.maxWidth, this.h);
  }

  updateHealth(val: number) {
    this.health = val;
    this.w = (this.health / this.maxHealth) * this.maxWidth;
    this.w = Math.max(0, Math.min(this.w, this.maxWidth));
  }
}
