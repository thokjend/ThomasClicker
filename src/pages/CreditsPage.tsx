import Credits from "../components/Credits";

interface CreditsPageProps {
  elapsedTime: number;
  resetGame: () => void;
}

export default function CreditsPage({
  elapsedTime,
  resetGame,
}: CreditsPageProps) {
  return <Credits elapsedTime={elapsedTime} resetGame={resetGame} />;
}
