import { useEffect, useState } from "react";
import "./App.css";
import { GameCardType } from './types';
import GameCardsComponent from './components/GameCardsComponent/GameCardsComponent';
import GameFilterControls from "./components/GameFilterComponent/GameFilterControls";
import { GamesContext } from "./GamesContext";
import Header from "./Header";
import { fetchGames } from './api/GamesApi';
import LoginComponent from "./components/LoginComponent/LoginComponent";
import { useUser } from "./UserContext";

function App() {
  const [gamesList, setGamesList] = useState<GameCardType[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const { loggedInUser, logout } = useUser();

  useEffect(() => {
    loadGames();
  }, []);

  function loadGames() {
    fetchGames()
      .then(res => res.json())
      .then((data) => {
        setGamesList(data);
      })
      .catch((err) => console.error("Failed to load game data:", err));
  }

  const handleSearch = (query: string) => {
    setSearchQuery(query);
  };

  const resetGames = () => {
    console.log("on reset");
  };

  return (
    <>
      <Header title="GameVault" onLogoClick={resetGames}>
        {loggedInUser ? (
          <div className="user-display">
            <span>Welcome, {loggedInUser}</span>
            <button onClick={logout}>Log out</button>
          </div>
        ) : (
          <>
            <div className="log-in">
              <LoginComponent />
            </div>
            <div className="register">
              <button>Register</button>
            </div>
          </>
        )}
        <GameFilterControls onSearch={handleSearch} onReset={resetGames} />
      </Header>

      <GamesContext.Provider value={{ games: gamesList, loading: false, error: null }}>
        <main className="main-area">
          <div className="main-inner-container">
            <GameCardsComponent queryFilter={searchQuery} />
          </div>
        </main>
      </GamesContext.Provider>
    </>
  );
}

export default App;
