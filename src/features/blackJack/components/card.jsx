import React from "react";

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
      return <div className="BJhiddenCard" />;
    } else {
      return (
        <div className={`BJcard ${getColor()}`} data-value={`${value} ${suit}`}>
          {suit}
        </div>
      );
    }
  };
  return <>{getCard()}</>;
};

export default Card;
