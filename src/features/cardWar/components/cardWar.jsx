import { useEffect, useState } from "react";
import Deck from "../../../components/deck";
import style from "../styles/cardWar.module.css";
import CardWarDeck from "./cardWarDeck";
import CardWarCard from "./cardWarCard";

const CARD_VALUE_MAP = {
  2: 2,
  3: 3,
  4: 4,
  5: 5,
  6: 6,
  7: 7,
  8: 8,
  9: 9,
  10: 10,
  J: 11,
  Q: 12,
  K: 13,
  A: 14,
};

let stop, roundWinner;

function CardWar() {
  const deck = new Deck();
  deck.shuffle();
  const deckMidPoint = Math.ceil(deck.numberOfCards / 2);
  const playerCardsInit = new Deck(deck.cards.slice(0, deckMidPoint));
  const cpuCardsInit = new Deck(
    deck.cards.slice(deckMidPoint, deck.numberOfCards)
  );
  const [isLoading, setIsLoading] = useState(true);
  const [inRound, setInRound] = useState(false);
  const [message, setMessage] = useState("");
  const [playerDeck, setPlayerDeck] = useState(playerCardsInit.cards);
  const [playerCard, setPlayerCard] = useState();
  const [cpuDeck, setCpuDeck] = useState(cpuCardsInit.cards);
  const [cpuCard, setCpuCard] = useState();

  stop = false;

  useEffect(() => {
    if (isLoading) {
      setTimeout(() => {
        setIsLoading(false);
        return;
      }, 3000);
    }
  }, []);

  useEffect(() => {
    if (inRound) {
      winLogic();
    }
    return;
  }, [inRound]);

  function updateDecks(winner) {
    if (winner === "player") {
      setPlayerDeck((currentPlayerDeck) => {
        const tempArr = [...currentPlayerDeck];
        tempArr.push(playerCard);
        return tempArr;
      });
      setPlayerDeck((currentPlayerDeck) => {
        const tempArr = [...currentPlayerDeck];
        tempArr.push(cpuCard);
        return tempArr;
      });
    } else if (winner === "cpu") {
      setCpuDeck((currentCpuDeck) => {
        const tempArr = [...currentCpuDeck];
        tempArr.push(cpuCard);
        return tempArr;
      });
      setCpuDeck((currentCpuDeck) => {
        const tempArr = [...currentCpuDeck];
        tempArr.push(playerCard);
        return tempArr;
      });
    } else {
      setPlayerDeck((currentPlayerDeck) => {
        const tempArr = [...currentPlayerDeck];
        tempArr.push(playerCard);
        return tempArr;
      });
      setCpuDeck((currentCpuDeck) => {
        const tempArr = [...currentCpuDeck];
        tempArr.push(cpuCard);
        return tempArr;
      });
    }
  }

  function winLogic() {
    if (checkWinner(playerCard.value, cpuCard.value)) {
      setMessage("Win");
      roundWinner = "player";
    } else if (checkWinner(cpuCard.value, playerCard.value)) {
      setMessage("Lose");
      roundWinner = "cpu";
    } else {
      setMessage("Draw");
      roundWinner = "no one";
    }
  }

  function handleCardFlip(e) {
    if (inRound) {
      setInRound(false);

      setPlayerCard();
      setCpuCard();
      setMessage("");
      updateDecks(roundWinner);
    } else {
      setInRound(true);

      setPlayerCard(playerDeck[0]);
      setCpuCard(cpuDeck[0]);
      setPlayerDeck((currentPlayerDeck) => {
        let tempArr = [...currentPlayerDeck];
        return tempArr.slice(1);
      });
      setCpuDeck((currentCpuDeck) => {
        let tempArr = [...currentCpuDeck];
        return tempArr.slice(1);
      });
    }

    if (isGameOver(playerDeck)) {
      setMessage("You Lose!!<br />Refresh Page to play again");
      stop = true;
    } else if (isGameOver(cpuDeck)) {
      setMessage("You Won!!<br />Refresh Page to play again");
      stop = true;
    }
  }

  function isGameOver(deck) {
    return deck.numberOfCards === 0;
  }

  function checkWinner(cardOne, cardTwo) {
    return CARD_VALUE_MAP[cardOne] > CARD_VALUE_MAP[cardTwo];
  }

  return (
    <div id={style.cardWar}>
      {isLoading ? (
        <div className={style.header}>Preparing game...</div>
      ) : (
        <>
          <div className={style.header}>Card-War</div>
          <CardWarDeck player="CPU" deck={cpuDeck} />
          <CardWarCard player="CPU" card={cpuCard} />
          <div className={style.text}>{message}</div>
          <CardWarDeck player="Player" deck={playerDeck} />
          <CardWarCard player="Player" card={playerCard} />
          <button className={style.btn} onClick={() => handleCardFlip()}>
            {inRound ? "Next Round" : "Flip Cards"}
          </button>
        </>
      )}
    </div>
  );
}

export default CardWar;
