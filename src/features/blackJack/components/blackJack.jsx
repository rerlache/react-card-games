import React, { useEffect, useState } from "react";
import Deck from "../../../components/deck";
import Hand from "./hand";
import style from "../styles/blackJack.module.css";

const GAMESTATE = {
  bet: "bet",
  init: "init",
  playerTurn: "playerTurn",
  dealerTurn: "dealerTurn",
  done: "done",
};
const DEAL = {
  player: "player",
  dealer: "dealer",
};
const MESSAGE = {
  bet: "Place a bet!",
  hitStand: "Hit or Stand?",
  bust: "Bust!",
  playerWin: "You Win!",
  dealerWin: "Dealer Wins!",
  tie: "Tie!",
};
const BlackJack = () => {
  let data = new Deck();
  data.shuffle();
  const [deck, setDeck] = useState(data.cards);
  // player States
  const [playerCards, setPlayerCards] = useState([]);
  const [playerScore, setPlayerScore] = useState(0);
  const [playerCount, setPlayerCount] = useState(0);
  // dealer States
  const [dealerCards, setDealerCards] = useState([]);
  const [dealerScore, setDealerScore] = useState();
  const [dealerCount, setDealerCount] = useState(0);
  const [hiddenDealerCard, setHiddenDealerCard] = useState(true);
  // game States
  const [gameState, setGameState] = useState();
  const [message, setMessage] = useState(MESSAGE.bet);
  const [buttonState, setButtonState] = useState({
    hitDisabled: false,
    standDisabled: false,
    resetDisabled: true,
  });

  useEffect(() => {
    if (gameState === GAMESTATE.init) {
      drawCard(DEAL.player);
      drawCard(DEAL.dealer);
      drawCard(DEAL.player);
      drawCard(DEAL.dealer);
      setGameState(GAMESTATE.playerTurn);
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
    if (gameState === GAMESTATE.playerTurn) {
      if (playerScore === 21) {
        buttonState.hitDisabled = true;
        setButtonState({ ...buttonState });
      } else if (playerScore > 20) {
        //bust();
      }
    }
  }, [playerScore]);

  useEffect(() => {
    if (gameState === GAMESTATE.dealerTurn) {
      console.log("dealerturn");
      if (dealerScore >= 17) {
        checkWin();
      } else {
        drawCard(DEAL.dealer);
      }
    }
  }, [dealerCount]);

  function startGame() {
    setGameState(GAMESTATE.init);
  }
  function checkWin() {
    if (playerScore > 21) {
      setMessage(MESSAGE.dealerWin);
    } else if (playerScore === 21) {
      setMessage(MESSAGE.playerWin);
    } else if (playerScore === dealerScore) {
      setMessage(MESSAGE.tie);
    }
    setGameState(GAMESTATE.done);
    setButtonState({
      hitDisabled: true,
      resetDisabled: false,
      standDisabled: true,
    });
  }

  const resetGame = () => {
    console.clear();
    data = new Deck();
    data.shuffle();
    setDeck(data.cards);

    setPlayerCards([]);
    setPlayerScore(0);
    setPlayerCount(0);

    setDealerCards([]);
    setDealerScore(0);
    setDealerCount(0);
    setHiddenDealerCard(true);

    setGameState(GAMESTATE.init);
    setMessage(MESSAGE.bet);
    setButtonState({
      hitDisabled: false,
      standDisabled: false,
      resetDisabled: true,
    });
  };

  const drawCard = (dealType) => {
    if (deck.length > 0) {
      const index = deck.length - 1;
      console.log(index);
      console.log(deck);
      const card = deck.pop();
      //setDeck((prevDeck) => {
      //  let tempDeck = [...prevDeck]
      //  return tempDeck.pop()
      //})
      console.log("remaining cards: ", deck.length);
      dealCard(dealType, card);
    } else {
      alert("All cards have been drawn!");
    }
  };
  const dealCard = (dealType, card) => {
    switch (dealType) {
      case DEAL.player:
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
    });
    setScore(total);
  };

  function handleGetPlayerCard() {
    drawCard(DEAL.player);
    if (playerScore > 21) {
      setMessage(MESSAGE.dealerWin);
      setButtonState({
        hitDisabled: true,
        resetDisabled: false,
        standDisabled: true,
      });
    } else if (playerScore === 21) {
      setMessage(MESSAGE.playerWin);
    } else if (playerScore === dealerScore) {
      setMessage(MESSAGE.tie);
    }
  }
  function handleStay() {
    setGameState(GAMESTATE.dealerTurn);
    setMessage("dealer Turn");
    setHiddenDealerCard(false);
    if (playerScore <= 21) {
      if (playerScore < dealerScore) {
        setMessage(MESSAGE.dealerWin);
        setButtonState({
          hitDisabled: true,
          resetDisabled: false,
          standDisabled: false,
        });
      } else {
        drawCard(DEAL.dealer);
        calculate(dealerCards, setDealerScore);
      }
    } else {
      setMessage(MESSAGE.dealerWin);
      setButtonState({
        hitDisabled: true,
        resetDisabled: false,
        standDisabled: true,
      });
    }
    console.log(dealerScore);
  }
  // TODO: implement buttons
  return (
    <>
      {gameState === undefined ? (
        <div className={style.btncontainer}>
          <button className={style.btn} onClick={() => startGame()}>
            Start Game
          </button>
        </div>
      ) : (
        <div id={style.blackJack}>
          <div className={style.header}>BlackJack</div>
          <Hand
            title={
              gameState === GAMESTATE.done
                ? `Dealers Hand (${dealerScore})`
                : "Dealers Hand"
            }
            cards={dealerCards}
            player="dealer"
            hidden={hiddenDealerCard}
          />
          <Hand
            title={
              gameState === GAMESTATE.done
                ? `Your Hand (${playerScore})`
                : "Your Hand"
            }
            cards={playerCards}
            player="player"
          />
          <div className={style.text}>{message}</div>
          <div className={style.btncontainer}>
            <button
              className={`btn ${style.playbtn}`}
              onClick={() => handleGetPlayerCard()}
              disabled={buttonState.hitDisabled}
            >
              Get Card
            </button>
            <button
              className={`btn ${style.playbtn}`}
              onClick={() => handleStay()}
              disabled={buttonState.standDisabled}
            >
              Stay
            </button>
            <button
              className={`btn ${style.playbtn}`}
              onClick={() => resetGame()}
              disabled={buttonState.resetDisabled}
            >
              Again
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default BlackJack;
