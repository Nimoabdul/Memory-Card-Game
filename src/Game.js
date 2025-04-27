import { useState, useEffect } from 'react';
import Card from './Card';

// Import your fronts
import frontClub from './img/frontclub.jpg';
import frontDiamond from './img/frontdiamond.png';
import frontHeart from './img/frontheart.png';
import frontClover from './img/frontclover.jpg';

// Import your backs
import backBlue50 from './img/backblue50.png';
import backBlue51 from './img/backblue51.png';
import backBrown11 from './img/backbrown11.png';
import backBrownNut from './img/backbrownnut.png';
import backGreenNut from './img/backgreennut.png';
import backRed49 from './img/backred49.png';
import backRed51 from './img/backred51.png';
import backBlue from './img/backblue.png'; 

const frontImages = [
  frontClub,
  frontDiamond,
  frontHeart,
  frontClover,
];

const backImages = [
  backBlue50,
  backBlue51,
  backBrown11,
  backBrownNut,
  backGreenNut,
  backRed49,
  backRed51,
  backBlue,
];

function Game() {
  const [cards, setCards] = useState([]);
  const [turns, setTurns] = useState(0);
  const [choiceOne, setChoiceOne] = useState(null);
  const [choiceTwo, setChoiceTwo] = useState(null);
  const [disabled, setDisabled] = useState(false);

  const [time, setTime] = useState(0);
  const [timerRunning, setTimerRunning] = useState(false);

  const [showWinner, setShowWinner] = useState(false);

  const shuffleCards = () => {
    let doubledFronts = [...frontImages, ...frontImages]; // duplicate fronts

    // shuffle fronts
    doubledFronts = doubledFronts.sort(() => Math.random() - 0.5);

    // clone backImages so we can pick without repeating
    let availableBacks = [...backImages];

    const shuffledCards = doubledFronts.map(front => {
      const randomIndex = Math.floor(Math.random() * availableBacks.length);
      const selectedBack = availableBacks[randomIndex];
      availableBacks.splice(randomIndex, 1); // remove this back so it cannot repeat

      return { src: front, back: selectedBack, matched: false, id: Math.random() };
    });

    setChoiceOne(null);
    setChoiceTwo(null);
    setCards(shuffledCards);
    setTurns(0);
    setTime(0);
    setTimerRunning(true);
    setShowWinner(false); 
  };

  const handleChoice = (card) => {
    if (!disabled) {
      choiceOne ? setChoiceTwo(card) : setChoiceOne(card);
    }
  };

  useEffect(() => {
    if (choiceOne && choiceTwo) {
      setDisabled(true);
      if (choiceOne.src === choiceTwo.src) {
        setCards(prevCards => {
          return prevCards.map(card => {
            if (card.src === choiceOne.src) {
              return { ...card, matched: true };
            } else {
              return card;
            }
          });
        });
        resetTurn();
      } else {
        setTimeout(() => resetTurn(), 1000);
      }
    }
  }, [choiceOne, choiceTwo]);

  const resetTurn = () => {
    setChoiceOne(null);
    setChoiceTwo(null);
    setTurns(prevTurns => prevTurns + 1);
    setDisabled(false);
  };

  // Timer logic
  useEffect(() => {
    let interval;
    if (timerRunning) {
      interval = setInterval(() => {
        setTime(prevTime => prevTime + 1);
      }, 1000);
    } else {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [timerRunning]);

  // Winner detection
  useEffect(() => {
    if (cards.length > 0 && cards.every(card => card.matched)) {
      setTimerRunning(false);
      setTimeout(() => {
        setShowWinner(true);
      }, 500);
    }
  }, [cards]);

  useEffect(() => {
    shuffleCards();
  }, []);

  const handleNewGame = () => {
    shuffleCards();
  };

  return (
    <div className="Game">
      <h1>Memory Card Game</h1>
      <button onClick={handleNewGame}>New Game</button>
      
      <div className="card-grid">
        {cards.map(card => (
          <Card 
            key={card.id}
            card={card}
            handleChoice={handleChoice}
            flipped={card === choiceOne || card === choiceTwo || card.matched}
            disabled={disabled}
          />
        ))}
      </div>

      <p>Turns: {turns}</p>
      <p>Time: {time} seconds</p>

      {showWinner && (
        <div className="winner-popup">
          <h2> You Win! </h2>
          <p>Finished in {time} seconds</p>
          <p>Turns taken: {turns}</p>
          <button onClick={handleNewGame}>Play Again</button>
        </div>
      )}
      <footer className="footer">
  <p>Made with ❤️ by Nimo Abdul © 2025</p>
</footer>

    </div>
    
  );

}

export default Game;
