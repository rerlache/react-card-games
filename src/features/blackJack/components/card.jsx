import React from "react";
import style from '../styles/blackJack.module.css'

const Card = ({ value, suit, hidden }) => {
  const getColor = () => {
    if (suit === "♠" || suit === "♣") {
      return "black";
    } else {
      return "red";
    }
  };

  const getCard = () => {
    if (hidden) {
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
