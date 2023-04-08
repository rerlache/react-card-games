import React, { useState } from "react";
import Hand from "./Hand";
import { shuffleDeck } from "../../../components/global/deck.jsx";

const Blackjack = ({ deck }) => {
  const [dealerHand, setDealerHand] = useState([]);
  const [playerHand, setPlayerHand] = useState([]);

  const [currentDeck, setCurrentDeck] = useState(shuffleDeck(deck));

  // Deal cards to the dealer and player
  const dealCards = () => {
    const newDeck = shuffleDeck([...currentDeck]);

    setCurrentDeck(newDeck);
    setDealerHand([newDeck.pop(), newDeck.pop()]);
    setPlayerHand([newDeck.pop(), newDeck.pop()]);
  };

  return (
    <div>
      <h2>Blackjack</h2>
      <button onClick={dealCards}>Deal Cards</button>
      <Hand cards={dealerHand} />
      <Hand cards={playerHand} />
    </div>
  );
};

export default Blackjack;