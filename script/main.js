const gameNameArr = ["Far Cry 3", "Geometry Dash", "Detroit Become Human", "Forager", "Just Cause 3", "The Witness", "Raft", "Cuphead", "Firewatch", "Rust"];
const gameRatingArr = [4,5,4,3,3,5,5,3,4,1];
const unfilledStar = "☆";
const filledStar = "★";
const gameContainer = document.querySelector('.main-inner-container');
const searchButton = document.querySelector('.search-button');
const searchTextArea = document.querySelector('.search-text-area');
const searchSubmitButton = document.querySelector('.search-submit');
const recentButton = document.querySelector('.recent-button');

function toStarRating(arr) {
    let totStarArr = [];
    let arrRate;
    let starRate = "";
    for (let i = 0; i < arr.length; i++) {
        arrRate = arr[i];
        starRate = "";
        while (arrRate > 0) {
            starRate += filledStar;
            arrRate--;
        }
        while (starRate.length < 5) {
            starRate += unfilledStar;
        }
        totStarArr.push(starRate);
    }
    return totStarArr;
}

function renderGames(names, ratings, indexes) {
    gameContainer.innerHTML = '';
    let gameHTML = `<div class="game-flex">`;
    for (let i = 0; i < names.length; i++) {
        const index = indexes[i]; 
        gameHTML += `
            <div class="game-card">
                <h2>${names[i]}</h2>
                <img src="images/game-previews/image${index + 1}.png" alt="${names[i]}" class="game-img">
                <p class="star-rating">${toStarRating([ratings[i]])[0]}</p>
            </div>
        `;
    }
    gameHTML += `</div>`;
    gameContainer.innerHTML += gameHTML;
}

function filterGames(query) {
    const filteredIndices = [];
    const filteredGames = gameNameArr.filter((game, index) => {
        if (game.toLowerCase().includes(query.toLowerCase())) {
            filteredIndices.push(index);
            return true;
        }
        return false;
    });

    const filteredRatings = filteredIndices.map(index => gameRatingArr[index]);
    renderGames(filteredGames, filteredRatings, filteredIndices);
    localStorage.setItem('lastSearch', query); 
}


renderGames(gameNameArr, gameRatingArr, Array.from(gameNameArr.keys()));
document.querySelector('.logo').addEventListener('click',()=>{
    renderGames(gameNameArr, gameRatingArr, Array.from(gameNameArr.keys()));
})
console.log(Array.from(gameNameArr.keys()))

searchButton.addEventListener('click', () => {
    searchTextArea.classList.toggle('hidden');
    searchSubmitButton.classList.toggle('hidden');
});

searchSubmitButton.addEventListener('click', () => {
    const query = searchTextArea.querySelector('input').value.trim();
    if (query) {
        filterGames(query);
    }
});


recentButton.addEventListener('click', () => {
    const lastSearch = localStorage.getItem('lastSearch');
    if (lastSearch) {
        filterGames(lastSearch);
        searchTextArea.querySelector('input').value = lastSearch;  
    }
});
