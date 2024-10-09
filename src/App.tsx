import { useState } from "react";
import "./App.css";
import Header from "./components/Header";

function App() {
  const [gold, setGold] = useState(0);
  const [currentLevel, setCurrentLevel] = useState(1);
  const [currentWorld, setCurrentWorld] = useState(1);

  return (
    <>
      <Header
        gold={gold}
        currentLevel={currentLevel}
        currentWorld={currentWorld}
      />
    </>
  );
}

export default App;
