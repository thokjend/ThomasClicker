interface CreditsProps {
  elapsedTime: number;
  resetGame: () => void;
}

export default function Credits({ elapsedTime, resetGame }: CreditsProps) {
  return (
    <div className="bg-dark text-white d-flex flex-column justify-content-center align-items-center text-center h-100 w-100">
      <div className="credits-container">
        <div className="credits">
          <h2 className="pb-4">ThomasClicker</h2>
          <p>Made by Thomas Kjendlie</p>
          <p>Thanks for playing!</p>
          {elapsedTime > 0 && (
            <p>You completed the game in {elapsedTime} seconds!</p>
          )}
          <button className="btn btn-light mt-2" onClick={resetGame}>
            Play Again
          </button>
        </div>
      </div>
    </div>
  );
}
