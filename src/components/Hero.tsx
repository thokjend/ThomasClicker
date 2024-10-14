import { useState } from "react";

interface HeroProps {
  initialCost: number;
  damageIncrease: number;
  costIncrease: number;
  gold: number;
  setGold: React.Dispatch<React.SetStateAction<number>>;
  damage: number;
  setDamage: React.Dispatch<React.SetStateAction<number>>;
  name: string;
  imageBase: string;
}

export default function Hero({
  initialCost,
  damageIncrease,
  costIncrease,
  gold,
  setGold,
  damage,
  setDamage,
  name,
  imageBase,
}: HeroProps) {
  const [price, setPrice] = useState(initialCost);
  const [count, setCount] = useState(1);

  const getImagePath = () => {
    if (count < 25) {
      return `${imageBase}1.png`; // First stage
    } else if (count >= 25 && count < 50) {
      return `${imageBase}2.png`; // Second stage at level 25
    } else {
      return `${imageBase}3.png`; // Third stage after level 50
    }
  };

  const getHeroPrice = (initialCost: number, count: number) => {
    return Math.floor(initialCost * (1 + costIncrease * count));
  };

  return (
    <div className="border p-3 rounded">
      <div className="justify-content-around d-flex align-items-center">
        <h5>{name}</h5>
        <img
          style={{ width: "100px", height: "100px" }}
          src={getImagePath()}
          alt={name}
          className="hero-image mb-2"
        />
      </div>
      <button
        onClick={() => {
          setDamage(damage + damageIncrease);
          setGold(gold - price);
          setPrice(getHeroPrice(initialCost, count + 1));
          setCount(count + 1);
          console.log(price);
        }}
        className="w-100 p-3 rounded"
        disabled={gold < price}
      >
        <div className="justify-content-between d-flex fw-bold">
          <div>Cost: {price} gold </div>
          <div>Level: {count}</div>
        </div>
      </button>
    </div>
  );
}
