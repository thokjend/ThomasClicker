interface HeaderProps {
  gold: number;
  currentWave: number;
  currentLevel: number;
  currentWorld: number;
}

export default function Header({
  gold,
  currentWave,
  currentLevel,
  currentWorld,
}: HeaderProps) {
  return (
    <div>
      <ul className="d-flex flex-row justify-content-around list-unstyled fs-1 fw-bold">
        <li>Gold: {gold}</li>
        <li>Wave: {currentWave} / 10</li>
        <li>Level: {currentLevel} / 10</li>
        <li>World: {currentWorld}</li>
      </ul>
      <div className="container-fluid border"></div>
    </div>
  );
}
