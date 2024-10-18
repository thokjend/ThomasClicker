import Hero from "./Hero";

interface HeroesProps {
  gold: number;
  setGold: React.Dispatch<React.SetStateAction<number>>;
  damage: number;
  setDamage: React.Dispatch<React.SetStateAction<number>>;
  dps: number;
  setDps: React.Dispatch<React.SetStateAction<number>>;
}
export default function Heroes({
  gold,
  setGold,
  damage,
  setDamage,
  dps,
  setDps,
}: HeroesProps) {
  return (
    <div className="col-3 bg-dark text-warning">
      <h3 className="text-center fs-1">Heroes</h3>
      <div className="text-center fs-4 mb-4" style={{ color: "red" }}>
        Damage per click: {Math.round(damage)}
        <br />
        Dps: {Math.floor(dps)}
      </div>
      <div className="menu-container overflow-auto">
        <ul className="list-unstyled">
          <li className="mb-3 m-2">
            <Hero
              initialCost={10}
              damageIncrease={1}
              dpsIncrease={5}
              costIncrease={1.2}
              gold={gold}
              setGold={setGold}
              damage={damage}
              setDamage={setDamage}
              dps={dps}
              setDps={setDps}
              name={"Jonas, The Rocky Boulderfist"}
              imageBase={"/heroes/golem/Golem"}
            ></Hero>
          </li>
          <li className="mb-3 m-2">
            <Hero
              initialCost={150}
              damageIncrease={5}
              dpsIncrease={10}
              costIncrease={1.15}
              gold={gold}
              setGold={setGold}
              damage={damage}
              setDamage={setDamage}
              dps={dps}
              setDps={setDps}
              name={"Frode, The Mighty Moo-Taur"}
              imageBase={"/heroes/minotaur/Minotaur"}
            ></Hero>
          </li>
          <li className="mb-3 m-2">
            <Hero
              initialCost={2500}
              damageIncrease={10}
              dpsIncrease={25}
              costIncrease={1.1}
              gold={gold}
              setGold={setGold}
              damage={damage}
              setDamage={setDamage}
              dps={dps}
              setDps={setDps}
              name={"Trine, The Sassy Satyr"}
              imageBase={"/heroes/satyr/Satyr"}
            ></Hero>
          </li>
          <li className="mb-3 m-2">
            <Hero
              initialCost={10000}
              damageIncrease={50}
              dpsIncrease={50}
              costIncrease={1.09}
              gold={gold}
              setGold={setGold}
              damage={damage}
              setDamage={setDamage}
              dps={dps}
              setDps={setDps}
              name={"Rune, The Shadow Sneaker"}
              imageBase={"/heroes/wraith/Wraith"}
            ></Hero>
          </li>
        </ul>
      </div>
    </div>
  );
}
