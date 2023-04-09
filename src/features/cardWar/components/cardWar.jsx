import Deck from "../../../components/deck";
import '../styles/style.css'

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

const computerDeckElement = document.querySelector(".CWcomputer-deck");
const playerDeckElement = document.querySelector(".CWplayer-deck");
const computerCardSlotElement = document.querySelector(".CWcomputer-card-slot");
const playerCardSlotElement = document.querySelector(".CWplayer-card-slot");
const text = document.querySelector(".CWtext");

let playerDeck, computerDeck, inRound, stop;

document.addEventListener("click", () => {
  if (stop) {
    startGame();
    return;
  }

  if (inRound) {
    cleanBeforeRound();
  } else {
    flipCards();
  }
});

startGame();
function startGame() {
  const deck = new Deck();
  deck.shuffle();

  const deckMidpoint = Math.ceil(deck.numberOfCards / 2);
  playerDeck = new Deck(deck.cards.slice(0, deckMidpoint));
  computerDeck = new Deck(deck.cards.slice(deckMidpoint, deck.numberOfCards));
  inRound = false;
  stop = false;

  cleanBeforeRound();
}

function cleanBeforeRound() {
  inRound = false;
  computerCardSlotElement.innerHTML = "";
  playerCardSlotElement.innerHTML = "";
  text.innerText = "";

  updateDeckCount();
}

function flipCards() {
  inRound = true;

  const playerCard = playerDeck.pop();
  const computerCard = computerDeck.pop();

  playerCardSlotElement.appendChild(playerCard.getHTML());
  computerCardSlotElement.appendChild(computerCard.getHTML());

  updateDeckCount();

  if (isRoundWinner(playerCard, computerCard)) {
    text.innerText = "Win";
    playerDeck.push(playerCard);
    playerDeck.push(computerCard);
  } else if (isRoundWinner(computerCard, playerCard)) {
    text.innerText = "Lose";
    computerDeck.push(computerCard);
    computerDeck.push(playerCard);
  } else {
    text.innerText = "Draw";
    playerDeck.push(playerCard);
    computerDeck.push(computerCard);
  }

  if (isGameOver(playerDeck)) {
    text.innerText = "You Lose!!";
    stop = true;
  } else if (isGameOver(computerDeck)) {
    text.innerText = "You Won!!";
    stop = true;
  }
}

function updateDeckCount() {
  computerDeckElement.innerText = computerDeck.numberOfCards;
  playerDeckElement.innerText = playerDeck.numberOfCards;
}

function isRoundWinner(cardOne, cardTwo) {
  return CARD_VALUE_MAP[cardOne.value] > CARD_VALUE_MAP[cardTwo.value];
}

function isGameOver(deck) {
  return deck.numberOfCards === 0;
}
