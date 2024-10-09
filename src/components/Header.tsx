interface HeaderProps {
  gold: number;
  currnetLevel: number;
  currentWorld: number;
}

export default function Header({
  gold,
  currnetLevel,
  currentWorld,
}: HeaderProps) {
  return (
    <div>
      <ul>
        <li>Gold:{gold}</li>
        <li>Level:{currnetLevel}</li>
        <li>World:{currentWorld}</li>
      </ul>
    </div>
  );
}
