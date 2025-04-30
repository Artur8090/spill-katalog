import React from "react";
import "./GameCardComponent.css";

const unfilledStar = "☆";
const filledStar = "★";

function toStarRating(rating: number): string {
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

interface GameCardProps {
  gameCard: {
    name: string;
    rating: number;
    img: string;
  };
}

class GameCardComponent extends React.Component<GameCardProps> {
  render() {
    const { name, rating, img } = this.props.gameCard;

    return (
      <div className="game-card">
        <h2>{name}</h2>
        <img src={`images/game-previews/${img}`} className="game-img" alt={name} />
        <p className="star-rating">{toStarRating(rating)}</p>
      </div>
    );
  }
}

export default GameCardComponent;
