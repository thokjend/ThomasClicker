interface HeaderProps {
  gold: number;
  currentLevel: number;
  currentWorld: number;
}

export default function Header({
  gold,
  currentLevel,
  currentWorld,
}: HeaderProps) {
  return (
    <div>
      <ul className="d-flex flex-row justify-content-around list-unstyled fs-1 fw-bold">
        <li>Gold:{gold}</li>
        <li>Level:{currentLevel}</li>
        <li>World:{currentWorld}</li>
      </ul>
    </div>
  );
}
