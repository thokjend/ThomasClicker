import Game from "./Game";
import Heroes from "./Heroes";

export default function MainContent() {
  return (
    <div className="container-fluid mt-3">
      <div className="row " style={{ height: "85vh" }}>
        <Game />
        <Heroes />
      </div>
    </div>
  );
}
