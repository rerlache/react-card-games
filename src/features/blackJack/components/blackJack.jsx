import React, { useEffect, useState } from "react";
import Deck from "../../../components/deck";
import Hand from "./hand";
import '../styles/style.css'

const GAMESTATE = {
  bet: "bet",
  init: "init",
  userTurn: "userTurn",
  dealerTurn: "dealerTurn",
};
const DEAL = {
  user: "user",
  dealer: "dealer",
  hidden: "hidden",
};
const MESSAGE = {
  bet: "Place a bet!",
  hitStand: "Hit or Stand?",
  bust: "Bust!",
  userWin: "You Win!",
  dealerWin: "Dealer Wins!",
  tie: "Tie!",
};
const BlackJack = () => {
  const data = new Deck();
  data.shuffle();
  const [deck, setDeck] = useState(new Deck().shuffle());
  // player States
  const [playerCards, setPlayerCards] = useState([]);
  const [playerScore, setPlayerScore] = useState(0);
  const [playerCount, setPlayerCount] = useState(0);
  // dealer States
  const [dealerCards, setDealerCards] = useState([]);
  const [dealerScore, setDealerScore] = useState();
  const [dealerCount, setDealerCount] = useState(0);
  // game States
  const [gameState, setGameState] = useState(GAMESTATE.init);
  const [message, setMessage] = useState(MESSAGE.bet);
  const [buttonState, setButtonState] = useState({
    hitDisabled: false,
    standDisabled: false,
    resetDisabled: true,
  });

  useEffect(() => {
    if (gameState === GAMESTATE.init) {
      drawCard(DEAL.user);
      drawCard(DEAL.hidden);
      drawCard(DEAL.user);
      drawCard(DEAL.dealer);
      setGameState(GAMESTATE.userTurn);
      setMessage(MESSAGE.hitStand);
    }
  }, [gameState]);

  useEffect(() => {
    calculate(playerCards, setPlayerScore);
    setPlayerCount(playerCount + 1);
  }, [playerCards]);

  useEffect(() => {
    calculate(dealerCards, setDealerScore);
    setDealerCount(dealerCount + 1);
  }, [dealerCards]);

  useEffect(() => {
    if (gameState === GAMESTATE.userTurn) {
      if (playerScore === 21) {
        buttonState.hitDisabled = true;
        setButtonState({ ...buttonState });
      } else if (playerScore > 20) {
        bust();
      }
    }
  }, [playerCount]);

  useEffect(() => {
    if (gameState === GAMESTATE.dealerTurn) {
      if (dealerScore >= 17) {
        checkWin();
      } else {
        drawCard(DEAL.dealer);
      }
    }
  }, [dealerCount]);

  const resetGame = () => {
    console.clear();
    setDeck(data);

    setPlayerCards([]);
    setPlayerScore(0);
    setPlayerCount(0);

    setDealerCards([]);
    setDealerScore(0);
    setDealerCount(0);

    setGameState(GAMESTATE.bet);
    setMessage(MESSAGE.bet);
    setButtonState({
      hitDisabled: false,
      standDisabled: false,
      resetDisabled: true,
    });
  };

  const drawCard = (dealType) => {
    if (data.numberOfCards > 0) {
      const randomIndex = Math.floor(Math.random() * data.numberOfCards);
      const card = data.cards[randomIndex];
      data.cards.splice(randomIndex, 1);
      console.log("remaining cards: ", data.numberOfCards);
      dealCard(dealType, card);
    } else {
      alert("All cards have been drawn!");
    }
  };
  const dealCard = (dealType, card) => {
    switch (dealType) {
      case DEAL.user:
        playerCards.push(card);
        setPlayerCards([...playerCards]);
        break;
      case DEAL.dealer:
        dealerCards.push(card);
        setDealerCards([...dealerCards]);
        break;
      case DEAL.hidden:
        dealerCards.push(card);
        setDealerCards([...dealerCards]);
        break;
    }
  };
  const calculate = (cards, setScore) => {
    let total = 0;
    cards.forEach((card) => {
      if (card.value !== "A") {
        switch (card.value) {
          case "K":
            total += 10;
            break;
          case "Q":
            total += 10;
            break;
          case "J":
            total += 10;
            break;
          default:
            total += Number(card.value);
            break;
        }
      }
    });
    const aces = cards.filter((card) => {
      return card.value === "A";
    });
    aces.forEach((card) => {
      if (card.hidden === false) {
        if (total + 11 > 21) {
          total += 1;
        } else if (total + 11 === 21) {
          if (aces.length > 1) {
            total += 1;
          } else {
            total += 11;
          }
        } else {
          total += 11;
        }
      }
    });
    setScore(total);
  };
  // TODO: implement buttons
  return (
    <>
      <div className="header">BlackJack</div>
      <Hand title={`Dealers Hand (${dealerScore})`} cards={dealerCards} player='dealer' />
      <Hand title={`Your Hand (${playerScore})`} cards={playerCards} player='player' />
      <button>Get Card</button>
      <button>Stay</button>
      <button>Again</button>
    </>
  );
};

export default BlackJack;
