import { useState } from "react";
import "./App.css";
import GameCardComponent from "./GameCardComponent";
import GameFilterControls from "./GameFilterControls";

const gameData = [
  { name: "Far Cry 3", rating: 4, img: "image1.png" },
  { name: "Geometry Dash", rating: 5, img: "image2.png" },
  { name: "Detroit Become Human", rating: 4, img: "image3.png" },
  { name: "Forager", rating: 3, img: "image4.png" },
  { name: "Just Cause 3", rating: 3, img: "image5.png" },
  { name: "The Witness", rating: 5, img: "image6.png" },
  { name: "Raft", rating: 5, img: "image7.png" },
  { name: "Cuphead", rating: 3, img: "image8.png" },
  { name: "Firewatch", rating: 4, img: "image9.png" },
  { name: "Rust", rating: 1, img: "image10.png" }
];

function App() {
  const [games, setGames] = useState(gameData);

  const handleSearch = (query) => {
    const filtered = gameData.filter(game =>
      game.name.toLowerCase().includes(query.toLowerCase())
    );
    setGames(filtered);
  };

  const resetGames = () => {
    setGames(gameData);
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
