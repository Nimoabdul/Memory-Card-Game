function Card({ card, handleChoice, flipped, disabled }) {
  
    const handleClick = () => {
      if (!disabled) {
        handleChoice(card);
      }
    };
  
    return (
      <div className="card" onClick={handleClick}>
        <div className={`card-inner ${flipped ? "flipped" : ""}`}>
          <div className="card-front">
            <img src={card.src} alt="card front" />
          </div>
          <div className="card-back">
            <img src={card.back} alt="card back" />
          </div>
        </div>
      </div>
    );
  }
  
  export default Card;
  