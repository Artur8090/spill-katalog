import { useEffect, useState } from "react";
import "./App.css";
import { GameCardType } from './types';
import GameCardsComponent from './components/GameCardsComponent/GameCardsComponent';
import GameFilterControls from "./components/GameFilterComponent/GameFilterControls";
import { GamesContext } from "./GamesContext";
import Header from "./Header";
import { fetchGames } from './api/GamesApi';

function App() {
  const [gamesList, setGamesList] = useState<GameCardType[]>([]);
  const [searchQuery, setSearchQuery] = useState("");

  // Login-related state
  const [loggedInUser, setLoggedInUser] = useState<string | null>(null);
  const [isLoggingIn, setIsLoggingIn] = useState(false);
  const [usernameInput, setUsernameInput] = useState("");
  const [passwordInput, setPasswordInput] = useState("");

  // Test credentials
  const testUser = {
    username: "testuser",
    password: "password123"
  };

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

  const handleLoginSubmit = () => {
    if (
      usernameInput === testUser.username &&
      passwordInput === testUser.password
    ) {
      setLoggedInUser(usernameInput);
      setUsernameInput("");
      setPasswordInput("");
      setIsLoggingIn(false);
    } else {
      alert("Invalid username or password");
    }
  };

  const handleLogout = () => {
    setLoggedInUser(null);
  };

  return (
    <>
      <Header title="GameVault" onLogoClick={resetGames}>
        {loggedInUser ? (
          <div className="user-display">
            <span>Welcome, {loggedInUser}</span>
            <button onClick={handleLogout}>Log out</button>
          </div>
        ) : (
          <>
            {isLoggingIn ? (
              <div className="login-form">
                <input
                  type="text"
                  placeholder="Username"
                  value={usernameInput}
                  onChange={(e) => setUsernameInput(e.target.value)}
                />
                <input
                  type="password"
                  placeholder="Password"
                  value={passwordInput}
                  onChange={(e) => setPasswordInput(e.target.value)}
                />
                <button onClick={handleLoginSubmit}>Submit</button>
                <button onClick={() => setIsLoggingIn(false)}>Cancel</button>
              </div>
            ) : (
              <>
                <div className="log-in">
                  <button onClick={() => setIsLoggingIn(true)}>Log in</button>
                </div>
                <div className="register">
                  <button>Register</button>
                </div>
              </>
            )}
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
