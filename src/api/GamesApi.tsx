export function fetchGames () {
    console.log('fetching games from server');
    return fetch("/data/gameData.json");
}  
    
