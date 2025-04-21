import "./GameCardComponent.css"
const unfilledStar = "☆";
const filledStar = "★";
function toStarRating(rating) {
    let starRate = "";

        while (rating > 0) {
            starRate += filledStar;
            rating--;
        }
        while (starRate.length < 5) {
            starRate += unfilledStar;
        }
    return starRate;
}

export default function GameCardComponent({gameCard}){
  return (
    <div class="game-card">
    <h2>{gameCard.name}</h2>
    <img src={`images/game-previews/${gameCard.img}`} class="game-img" />
    <p class="star-rating">{toStarRating(gameCard.rating)}</p>
</div>
); 
}