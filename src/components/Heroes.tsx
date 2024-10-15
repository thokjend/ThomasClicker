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
    <div className="col-3 border ">
      <h3 className="text-center fs-1">Heroes</h3>
      <div className="text-center text-danger fs-4 mb-4">
        Damage: {Math.round(damage)}
      </div>
      <div className="menu-container overflow-auto">
        <ul className="list-unstyled">
          <li className="mb-3">
            <Hero
              initialCost={10}
              damageIncrease={1}
              costIncrease={0.5}
              gold={gold}
              setGold={setGold}
              damage={damage}
              setDamage={setDamage}
              name={"Jonas, The Rocky Boulderfist"}
              imageBase={"/heroes/golem/Golem"}
            ></Hero>
          </li>
          <li className="mb-3">
            <Hero
              initialCost={150}
              damageIncrease={5}
              costIncrease={1.5}
              gold={gold}
              setGold={setGold}
              damage={damage}
              setDamage={setDamage}
              name={"Frode, The Mighty Moo-Taur"}
              imageBase={"/heroes/minotaur/Minotaur"}
            ></Hero>
          </li>
          <li className="mb-3">
            <Hero
              initialCost={2500}
              damageIncrease={20}
              costIncrease={0.5}
              gold={gold}
              setGold={setGold}
              damage={damage}
              setDamage={setDamage}
              name={"Trine, The Sassy Satyr"}
              imageBase={"/heroes/satyr/Satyr"}
            ></Hero>
          </li>
          <li className="mb-3">
            <Hero
              initialCost={10000}
              damageIncrease={100}
              costIncrease={0.25}
              gold={gold}
              setGold={setGold}
              damage={damage}
              setDamage={setDamage}
              name={"Rune, The Shadow Sneaker"}
              imageBase={"/heroes/wraith/Wraith"}
            ></Hero>
          </li>
        </ul>
      </div>
    </div>
  );
}
