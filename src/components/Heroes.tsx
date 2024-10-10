interface HeroesProps {
  gold: number;
  setGold: React.Dispatch<React.SetStateAction<number>>;
  setDamage: React.Dispatch<React.SetStateAction<number>>;
}
export default function Heroes({ gold, setGold, setDamage }: HeroesProps) {
  return (
    <div className="col-3 menu-container border">
      <h3 className="text-center">Heroes</h3>
      <ul className="list-unstyled">
        <li>Option 1</li>
        <li>Option 2</li>
        <li>Option 3</li>
        <li>gold: {gold}</li>
      </ul>
    </div>
  );
}
