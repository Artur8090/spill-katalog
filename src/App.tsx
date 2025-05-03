import { useEffect, useState } from "react";
import "./App.css";
import {GameCardType} from './types';
import GameCardsComponent from './components/GameCardsComponent/GameCardsComponent';
import GameFilterControls from "./components/GameFilterComponent/GameFilterControls";
import {GamesContext, GamesFetchType} from "./GamesContext";
import Header from "./Header";
import {fetchGames} from './api/GamesApi';


function App() {
  const[gamesList, setGamesList] = useState<GameCardType[]>([]);
  const [searchQuery, setSearchQuery] = useState("");

  console.log('app games', gamesList);

  
    useEffect(() => {
      console.log('load games');
      loadGames();
    }, []);

    function loadGames(){
        console.log('getGames use effect');
        fetchGames()
          .then(res => res.json() )
          .then((data) => {
              setGamesList(data); 
              console.log('finish loading', gamesList)
            }
           )
          .catch((err) => console.error("Failed to load game data:", err));
    }

    const handleSearch = (query: string) => {
      console.log("handle search", query, gamesList);
      setSearchQuery(query);
      console.log("games status", gamesList);

  };

  const resetGames = () => {
    //games = getGames().games;
    console.log("on reset");
  };

  return (
    <>
    <Header title="GameVault" onLogoClick={resetGames}>
      <div className="log-in"><button>Log in</button></div>
      <div className="register"><button>Register</button></div>
      <GameFilterControls onSearch={handleSearch} onReset={resetGames} />
    </Header>

    <GamesContext.Provider value={ {games:gamesList, loading: false, error: null} } >
      <main className="main-area">
        <div className="main-inner-container">
          <GameCardsComponent queryFilter={searchQuery}></GameCardsComponent>
        </div>
      </main>
    </GamesContext.Provider>
    </>
  );
}

export default App;
