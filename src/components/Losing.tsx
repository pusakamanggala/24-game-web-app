import CardIcon from "../img/cards-icon.svg";
import loseSound from "../audio/violin-lose-1.mp3";
import { useEffect } from "react";

export default function Losing({
  solution,
  playAgain,
}: {
  solution?: string;
  playAgain: () => void;
}) {
  const quotes = [
    {
      quote:
        "Failure is simply the opportunity to begin again, this time more intelligently.",
      author: "Henry Ford",
    },
    {
      quote: "The only real mistake is the one from which we learn nothing.",
      author: "Henry Ford",
    },
    {
      quote: "Don't let what you cannot do interfere with what you can do.",
      author: "John Wooden",
    },
    {
      quote:
        "Success is stumbling from failure to failure with no loss of enthusiasm.",
      author: "Winston Churchill",
    },
  ];

  useEffect(() => {
    const playLoseSound = () => {
      // set volume
      const audio = new Audio(loseSound);
      audio.volume = 0.1;

      // play
      audio.play();
    };

    playLoseSound();
  }, []);

  const randomQuote = Math.floor(Math.random() * quotes.length);

  return (
    <>
      <img src={CardIcon} alt="" className="h-32 card-icon" />
      <h3 className="font-medium">You lost !</h3>
      {solution && (
        <p>
          The solution is <strong>{solution} = 24</strong>
        </p>
      )}
      {/* random quote */}
      <blockquote className="px-5 italic text-center w-96">
        "{quotes[randomQuote].quote}" -{" "}
        <span className="not-italic">{quotes[randomQuote].author}</span>
      </blockquote>
      <button
        className="primary-button"
        onClick={playAgain}
        type="button"
        title="Play Again"
      >
        Play Again
      </button>
    </>
  );
}
