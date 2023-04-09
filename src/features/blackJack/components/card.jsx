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
      return <div className="hiddenCard" />;
    } else {
      return (
        <div className={`card ${getColor()}`} data-value={`${value} ${suit}`}>
          {suit}
        </div>
      );
    }
  };
  return <>{getCard()}</>;
};

export default Card;
