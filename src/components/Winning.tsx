import CardIcon from "../img/cards-icon.svg";
import winSound from "../audio/violin-win-1.mp3";
import { useEffect } from "react";

export default function Winning({ playAgain }: { playAgain: () => void }) {
  const quotes = [
    {
      quote:
        "Success is the sum of small efforts, repeated day in and day out.",
      author: "Robert Collier",
    },
    {
      quote:
        "In mathematics, the art of asking the right questions is more important than solving problems.",
      author: "Georg Cantor",
    },
    {
      quote:
        "The joy of discovery is certainly the liveliest that the mind of man can ever feel.",
      author: "Claude Bernard",
    },
    {
      quote: "Mathematics is the music of reason.",
      author: "James Joseph Sylvester",
    },
  ];

  useEffect(() => {
    const playWinSound = () => {
      // set volume
      const audio = new Audio(winSound);
      audio.volume = 0.1;

      // play
      audio.play();
    };

    playWinSound();
  }, []);

  const randomQuote = Math.floor(Math.random() * quotes.length);

  return (
    <>
      <img src={CardIcon} alt="" className="h-32 card-icon" />
      <p className="font-medium">You won !</p>
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
