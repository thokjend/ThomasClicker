import { useNavigate } from "react-router-dom";
interface CreditsProps {
  elapsedTime: number;
  resetGame: () => void;
}

export default function Credits({ elapsedTime, resetGame }: CreditsProps) {
  const navigate = useNavigate();

  const handlePlayAgain = () => {
    resetGame(); // Call resetGame to reset game state
    navigate("/main"); // Navigate to the main page
  };

  return (
    <div className="bg-dark text-white d-flex flex-column justify-content-center align-items-center text-center h-100 w-100 vh-100">
      <div className="credits-container">
        <div className="credits">
          <h2 className="pb-4">ThomasClicker</h2>
          <p>Made by Thomas Kjendlie</p>
          <p>Thanks for playing!</p>
          {elapsedTime > 0 && (
            <p>You completed the game in {elapsedTime} seconds!</p>
          )}
          <button className="btn btn-light mt-2" onClick={handlePlayAgain}>
            Play Again
          </button>
        </div>
      </div>
    </div>
  );
}
