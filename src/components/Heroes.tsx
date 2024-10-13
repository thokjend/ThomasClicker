import Hero from "./Hero";

interface HeroesProps {
  gold: number;
  setGold: React.Dispatch<React.SetStateAction<number>>;
  damage: number;
  setDamage: React.Dispatch<React.SetStateAction<number>>;
}
export default function Heroes({
  gold,
  setGold,
  damage,
  setDamage,
}: HeroesProps) {
  return (
    <div className="col-3 menu-container border">
      <h3 className="text-center fs-1">Heroes</h3>
      <div className="text-center text-danger fs-4 mb-4">Damage: {damage}</div>
      <ul className="list-unstyled">
        <li className="mb-3">
          <Hero
            initialCost={10}
            damageIncrease={1}
            costIncrease={2}
            gold={gold}
            setGold={setGold}
            damage={damage}
            setDamage={setDamage}
          ></Hero>
        </li>
        <li className="mb-3">
          <button className="btn btn-danger w-100 p-3 rounded">hero 2</button>
        </li>
        <li className="mb-3">
          <button className="btn btn-danger w-100 p-3 rounded">hero 3</button>
        </li>
      </ul>
    </div>
  );
}
