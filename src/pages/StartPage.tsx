import { useNavigate } from "react-router-dom";
interface StartPageProps {
  resetGame: () => void;
}

export default function StartPage({ resetGame }: StartPageProps) {
  const navigate = useNavigate();
  const startGame = () => {
    resetGame(); // Call resetGame to reset game state
    navigate("/main"); // Navigate to the main page
  };

  return (
    <div className="bg-dark text-white vh-100 d-flex flex-column justify-content-center align-items-center">
      <h1 className="mb-4">ThomasClicker</h1>
      <button
        className="btn btn-primary btn-lg"
        style={{ width: "250px" }}
        onClick={startGame}
      >
        Play
      </button>
    </div>
  );
}
