import { useState } from "react";

interface HeroProps {
  initialCost: number;
  damageIncrease: number;
  costIncrease: number;
  gold: number;
  setGold: React.Dispatch<React.SetStateAction<number>>;
  damage: number;
  setDamage: React.Dispatch<React.SetStateAction<number>>;
}

export default function Hero({
  initialCost,
  damageIncrease,
  costIncrease,
  gold,
  setGold,
  damage,
  setDamage,
}: HeroProps) {
  const [price, setPrice] = useState(initialCost);
  const [count, setCount] = useState(0);
  return (
    <div>
      <button
        onClick={() => {
          setDamage(damage + damageIncrease);
          setGold(gold - initialCost);
          setPrice(price + costIncrease);
          setCount(count + 1);
        }}
        className="btn btn-danger w-100 p-3 rounded"
        disabled={gold < price}
      >
        <div className="justify-content-between d-flex">
          <div>Cost: {price} gold </div>
          <div>Level: {count}</div>
        </div>
      </button>
    </div>
  );
}
