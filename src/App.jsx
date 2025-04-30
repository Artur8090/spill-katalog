import { useEffect, useState } from "react";
import "./App.css";
import GameCardComponent from "./GameCardComponent";
import GameFilterControls from "./GameFilterControls";

function App() {
  const [games, setGames] = useState([]);
  const [originalGames, setOriginalGames] = useState([]);

  useEffect(() => {
    fetch("/data/gameData.json")
      .then((res) => res.json())
      .then((data) => {
        setGames(data);
        setOriginalGames(data);
      })
      .catch((err) => console.error("Failed to load game data:", err));
  }, []);

  const handleSearch = (query) => {
    const filtered = originalGames.filter((game) =>
      game.name.toLowerCase().includes(query.toLowerCase())
    );
    setGames(filtered);
  };

  const resetGames = () => {
    setGames(originalGames);
  };

  return (
    <>
      <div className="main-header-area">
        <div className="logo-container">
          <div className="logo" onClick={resetGames}>
            <img src="images/logos/logo.png" alt="Logo" />
          </div>
        </div>
        <div className="title-area">
          <div className="title">
            <p>GameVault</p>
          </div>
        </div>
        <div className="buttons-area">
          <div className="log-in"><button>Log in</button></div>
          <div className="register"><button>Register</button></div>
          <GameFilterControls onSearch={handleSearch} onReset={resetGames} />
        </div>
      </div>

      <main className="main-area">
        <div className="main-inner-container">
          <h1 className="catalogue-title">Catalogue</h1>
          <div className="game-flex">
            {games.map((game, i) => (
              <GameCardComponent key={i} gameCard={game} />
            ))}
          </div>
        </div>
      </main>
    </>
  );
}

export default App;
