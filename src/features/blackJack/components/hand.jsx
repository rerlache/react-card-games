import React from "react";
import Card from "./card";

const Hand = ({ title, cards, player }) => {
  const getTitle = () => {
    if (cards.length > 0) {
      return <h1 className="title">{title}</h1>;
    }
  };
  return (
    <div className={`handContainer ${player}`}>
      {getTitle()}
      <div className="cardContainer">
        {cards.map((card, index) => {
          return (
            <Card
              key={index}
              value={card.value}
              suit={card.suit}
              hidden={card.hidden}
            />
          );
        })}
      </div>
    </div>
  );
};

export default Hand;
