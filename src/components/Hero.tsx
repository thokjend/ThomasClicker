import { useState } from "react";

interface HeroProps {
  initialCost: number;
  damageIncrease: number;
  dpsIncrease: number;
  costIncrease: number;
  gold: number;
  setGold: React.Dispatch<React.SetStateAction<number>>;
  damage: number;
  setDamage: React.Dispatch<React.SetStateAction<number>>;
  dps: number;
  setDps: React.Dispatch<React.SetStateAction<number>>;
  name: string;
  imageBase: string;
}

export default function Hero({
  initialCost,
  damageIncrease,
  dpsIncrease,
  costIncrease,
  gold,
  setGold,
  damage,
  setDamage,
  dps,
  setDps,
  name,
  imageBase,
}: HeroProps) {
  const [price, setPrice] = useState(initialCost);
  const [count, setCount] = useState(1);

  const getImagePath = () => {
    if (count <= 25) {
      return `${imageBase}1.png`; // First stage
    } else if (count > 25 && count <= 50) {
      return `${imageBase}2.png`; // Second stage at level 25
    } else {
      return `${imageBase}3.png`; // Third stage after level 50
    }
  };

  const getHeroPrice = (initialCost: number, count: number) => {
    return Math.floor(initialCost * costIncrease ** count);
  };

  const handleLevelUp = () => {
    // Increase base damage
    let newDamage = damage + damageIncrease;
    let newDps = dps + dpsIncrease;

    // Add bonus at levels 25 and 50
    if (count === 25 || count === 50) {
      newDamage += damage * 0.1; // 10% bonus damage at level 25 and level 50
      newDps += dps * 0.1;
    }

    // Update state
    setDps(newDps);
    setDamage(newDamage);
    setGold(gold - price);
    setPrice(getHeroPrice(initialCost, count + 1));
    setCount(count + 1);
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
        onClick={() => handleLevelUp()}
        className="w-100 p-3 rounded"
        disabled={gold < price}
      >
        <div className="justify-content-between d-flex fw-bold">
          <div>Cost: {price} gold </div>
          <div>Level: {count - 1}</div>
        </div>
      </button>
    </div>
  );
}
