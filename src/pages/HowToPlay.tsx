import cardBack from "../img/card-back.png";
import aceCard from "../img/card/AS.png";
import kingCard from "../img/card/KS.png";
import jackCard from "../img/card/JS.png";
import queenCard from "../img/card/QS.png";
import twoCard from "../img/card/2S.png";
import tenCard from "../img/card/0S.png";
import sevenCard from "../img/card/7S.png";
import { Link } from "react-router-dom";

export default function HowToPlay() {
  return (
    <div className="max-w-[500px]">
      <div className="space-y-5">
        <h2>How to play</h2>
        <div className="grid grid-cols-2 gap-2 mx-auto w-fit">
          <img
            src={queenCard}
            alt="card-back"
            className="z-20 w-24 aspect-auto"
          />
          <img
            src={twoCard}
            alt="card-back"
            className="z-20 w-24 aspect-auto"
          />
          <img
            src={aceCard}
            alt="card-back"
            className="z-20 w-24 aspect-auto"
          />
          <img
            src={tenCard}
            alt="card-back"
            className="z-20 w-24 aspect-auto"
          />
        </div>
        <p className="font-medium text-center">
          2 x ( ACE + ( QUEEN ÷ 10 ) ) = <strong>24</strong>
        </p>
        <p>
          The rules of the game is simple, you have to use matematical
          calculations based on the value of the cards in your deck. The goal is
          to get the value to 24.
        </p>
        <p>
          You can use simple mathematical operations ( x - + ÷ ), but remember
          to use them according to the rules of mathematical operations.
        </p>
        <div className="grid w-full grid-cols-2 gap-4 md:grid-cols-3 ">
          <div className="flex flex-col items-center">
            <img src={aceCard} alt="card-back" className="w-24 aspect-auto" />
            <p>ACE has a value of 11</p>
          </div>
          <div className="relative flex flex-col items-center">
            <img
              src={kingCard}
              alt="card-back"
              className="absolute z-10 w-24 aspect-auto left-1"
            />
            <img
              src={queenCard}
              alt="card-back"
              className="z-20 w-24 aspect-auto"
            />
            <img
              src={jackCard}
              alt="card-back"
              className="absolute z-30 w-24 aspect-auto right-1"
            />
            <p>KING, JACK, and QUEEN each has a value of 10</p>
          </div>
          <div className="relative flex flex-col items-center">
            <img
              src={twoCard}
              alt="card-back"
              className="absolute z-10 w-24 aspect-auto left-1"
            />
            <img
              src={sevenCard}
              alt="card-back"
              className="z-20 w-24 aspect-auto"
            />
            <img
              src={tenCard}
              alt="card-back"
              className="absolute z-30 w-24 aspect-auto right-1"
            />
            <p>The other cards (2 to 10) have their original values</p>
          </div>
        </div>

        <div className="flex flex-row items-center">
          <div>
            <p>
              once the card has been chosen, the card will be close and you
              won't be able to choose the same card again
            </p>
            <p>
              to submit your solution, you must choose all the cards on your
              deck
            </p>
          </div>
          <img
            src={cardBack}
            alt="card-back"
            className="w-24 aspect-auto card-icon"
          />
        </div>

        <div>
          <iframe
            src="https://www.youtube.com/embed/pxwHfVRxn7I"
            className="w-full rounded-lg aspect-video"
            title="Tutorial Video"
          />
        </div>
      </div>
      <div className="flex w-full my-10">
        <Link
          to={"/"}
          className="mx-auto primary-button"
          type="button"
          title="Im Ready to Play"
        >
          Im Ready to Play
        </Link>
      </div>
    </div>
  );
}
