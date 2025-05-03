import { createContext, useContext } from "react";
import {GameCardType} from './types';

export interface GamesFetchType {
    games: GameCardType[];
    loading?: boolean | null;
    error?: string | null;
}
const defVal : GamesFetchType = { games:[], loading:false, error:null};

export const GamesContext = createContext<GamesFetchType>(defVal);

export const useGamesContext = () : GamesFetchType => {
    const context = useContext(GamesContext);
    console.log('gameContext', context);
    if(context === null){
        throw new Error('useGamesContext must be used within an GamesContext.Provider');
    }
    return context;
}