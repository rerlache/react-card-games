import style from "../styles/cardWar.module.css";

function CardWarCard({ player, card }) {
  if (card !== undefined) {
    const color = card.suit === "♥" || card.suit === "♦" ? "red" : "black";
    return (
      <>
        <div
          className={`${
            player === "CPU"
              ? style.computercardslot
              : style.playercardslot
          } ${style.cardslot}`}
        >
          {card !== null ? (
            <div
              className={`${style.card} ${color}`}
              data-value={`${card.value} ${card.suit}`}
            >
              {card.suit}
            </div>
          ) : (
            <></>
          )}
        </div>
      </>
    );
  } else {
    return <></>;
  }
}
export default CardWarCard;
