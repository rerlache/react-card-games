import React from "react";
import style from '../styles/blackJack.module.css'

const Card = ({ index, value, suit, player }) => {
  const getColor = () => {
    if (suit === "♠" || suit === "♣") {
      return "black";
    } else {
      return "red";
    }
  };
  const hideCard = player === "dealer" && index === 0

  const getCard = () => {
    if (hideCard) {
      return <div className={style.hiddenCard} />;
    } else {
      return (
        <div className={(`${style.card} ${getColor()}`)} data-value={`${value} ${suit}`}>
          {suit}
        </div>
      );
    }
  };
  return <>{getCard()}</>;
};

export default Card;
