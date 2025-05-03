import { useEffect, useState, FunctionComponent, PropsWithChildren, useContext } from "react";
import GameCardComponent from "../GameCardComponent/GameCardComponent";
import {GamesContext, GamesFetchType, useGamesContext} from '../../GamesContext';
import { GameCardType } from "../../types";

interface GameCardsProps{
  queryFilter: String
}

const GameCardsComponent: FunctionComponent<GameCardsProps> = ({queryFilter}) => {
  const gamesProviderData: GamesFetchType = useGamesContext();
  const [games, setGames] = useState<GameCardType[]>([]);

  
  useEffect(() => {
    console.log('cards gamesList', gamesProviderData);
    setGames(gamesProviderData.games);
    console.log('games', games);
  }, [gamesProviderData]);

  useEffect(() => {
    console.log("change filter", queryFilter);
    const filteredGames = handleSearch(queryFilter);
    console.log('filtered games', filteredGames)
    setGames(filteredGames);
  }, [queryFilter]);


  const handleSearch = (query: String) => {
    if(!gamesProviderData || !gamesProviderData.games) return [];

    const filtered = (gamesProviderData.games as GameCardType[]).filter((game) =>
      game.name.toLowerCase().includes(query.toLowerCase())
    );
    return filtered;
  };
  
  return (
    <>
          <h1 className="catalogue-title">Catalogue</h1>
          <h2>Loading: {console.log('render gamesList', gamesProviderData, games)}</h2>
          <div className="game-flex">
            {games.map((game, i) => (
              <GameCardComponent key={i} gameCard={game} />
            ))}
          </div>
    </>
  );
}

export default GameCardsComponent;
