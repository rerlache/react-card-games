import style from "../styles/cardWar.module.css";

function CardWarDeck({ player, deck }) {
  return (
    <>
      <div
        className={`${
          player === "CPU" ? style.computerdeck : style.playerdeck
        } ${style.deck}`}
        data-value={player}
      >
        {deck.length}
      </div>
    </>
  );
}

export default CardWarDeck;
