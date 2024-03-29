import { useEffect, useState } from "react";
import CardDeck from "../components/CardDeck";
import Keyboard from "../components/Keyboard";
import useGetDeck from "../hooks/useGetDeck";
import useGetSolution from "../hooks/useGetSolution";
import Timer from "../components/Timer";
import Winning from "../components/Winning";
import Losing from "../components/Losing";
import Loading from "../components/Loading";
import { useParams } from "react-router-dom";
import Joyride from "react-joyride";
import clickSound from "../audio/punchy-taps-ui-2.mp3";

export default function Play() {
  const [deckValue, setDeckValue] = useState<string[]>([]);
  const [answer, setAnswer] = useState<string[]>([]);
  const [gameState, setGameState] = useState<"playing" | "won" | "lost">(
    "playing"
  );
  const [notification, setNotification] = useState("");

  useEffect(() => {
    let timeoutId: NodeJS.Timeout;

    if (notification !== "") {
      timeoutId = setTimeout(() => {
        setNotification("");
      }, 3000);

      return () => clearTimeout(timeoutId);
    }
  }, [notification]);

  const { cardNumber } = useParams();

  const {
    data: deckData,
    isLoading: deckLoading,
    isSuccess: deckSuccess,
    refetch: refetchDeck,
  } = useGetDeck({
    // card number is either 4 or 6
    cardNumber: Number(
      cardNumber === "4" ? "4" : cardNumber === "6" ? "6" : "4"
    ),
  });

  const { data: solution, isLoading: solutionLoading } = useGetSolution({
    numbers: deckValue,
  });

  const playClickSound = () => {
    const audio = new Audio(clickSound);
    audio.volume = 0.2;

    audio.play();
  };

  const [tourCompleted, setTourCompleted] = useState(() => {
    // Retrieve the tour run status from session storage
    const status = localStorage.getItem("playTourCompleted");
    // Parse the status as boolean (if it exists), default to false if not found
    return status ? JSON.parse(status) : false;
  });

  useEffect(() => {
    // Update local storage when tourCompleted changes
    localStorage.setItem("playTourCompleted", JSON.stringify(tourCompleted));
  }, [tourCompleted]); // Update whenever tourCompleted changes

  // to prevent the card deck being rendered before the solution is found
  const [solutionIsFound, setSolutionIsFound] = useState(false);

  useEffect(() => {
    // If solution.solution is true after 2 seconds
    const timeoutId = setTimeout(() => {
      if (solution?.solution && solutionIsFound === false) {
        setSolutionIsFound(true);
      }
    }, 2000); // 2000 milliseconds = 2 seconds

    // Cleanup function to clear the timeout if the component unmounts or the dependency changes
    return () => clearTimeout(timeoutId);
  }, [solution, solutionIsFound]); // Add solution as a dependency to the useEffect hook

  const steps = [
    {
      disableBeacon: true,
      target: ".timer",
      content:
        "You are given three minutes to solve the solution, when the time runs out and you haven't solved the calculation you lose",
    },
    {
      target: ".reset-button",
      content:
        "When the game gets tough, you can always shuffle the cards in your deck to get a new combination of cards. But remember problems are not always easy to solve",
    },
    {
      target: ".card-to-choose",
      content:
        "Tap the card to input the card value into your calculation solution, the card can only be used once. And you must use all the cards in the calculation.",
    },
    {
      target: ".operation-keyboard",
      content:
        "Use this keyboard key to enter math operations for calculations",
    },
    {
      target: ".give-up-button",
      content:
        "When your time is up and the math is not in your favor, it's okay to give up. You will be given one of the usable solutions. But remember, the cards will be shuffled again.",
    },
  ];

  const convertCardValue = (cardValue: string) => {
    switch (cardValue) {
      case "JACK":
      case "QUEEN":
      case "KING":
        return "10";
      case "ACE":
        return "11";
      default:
        return cardValue;
    }
  };
  useEffect(() => {
    if (deckData) {
      setDeckValue(deckData.map((card) => convertCardValue(card.value)));
      setAnswer([]);
    }
  }, [deckData, setDeckValue, setAnswer]);

  // refetch deck when solution
  // I don't use the refetch deck in the useEffect dependencies because it causes the refetch to happen twice
  useEffect(() => {
    if (solution) {
      if (solution.solution === true) {
        return;
      } else {
        refetchDeck();
      }
    }
  }, [solution]);

  const handleGiveUp = () => {
    setGameState("lost");
  };

  const playAgain = () => {
    setGameState("playing");
    refetchDeck();
    setSolutionIsFound(false);
  };

  const reshuffleDeck = () => {
    playClickSound();
    refetchDeck();
    setSolutionIsFound(false);
  };

  const handleSubmitAnswer = () => {
    playClickSound();

    const numCount = answer.filter((num) => !isNaN(parseFloat(num))).length;
    if (numCount !== deckData?.length) {
      setNotification("Pick all cards");
      return;
    }

    const answerString = answer.join("");

    try {
      const sanitizedExpression = answerString.replace(/[^-()\d/*+.]/g, "");

      const result = eval(sanitizedExpression);

      if (result === 24) {
        setGameState("won");
      }
      if (result !== 24) {
        setNotification("Your solusion is not correct");
      }
    } catch (error) {
      setNotification("Invalid expression");
    }
  };

  if (solutionLoading || deckLoading || !solutionIsFound) {
    return <Loading />;
  }

  if (gameState === "won") {
    return <Winning playAgain={playAgain} />;
  }

  if (gameState === "lost") {
    return <Losing playAgain={playAgain} solution={solution?.equation} />;
  }

  return (
    <>
      <div className="relative gap-2 ">
        <Joyride
          steps={steps}
          run={!tourCompleted}
          continuous
          hideCloseButton
          showProgress
          showSkipButton
          disableOverlayClose
          callback={(data) => {
            // play click sound when tour is updated
            if (data.action === "update") {
              playClickSound();
            }

            // save "playTourCompleted" in session storage when tour is completed
            if (data.status === "finished" || data.status === "skipped")
              setTourCompleted(true);
          }}
          styles={{
            buttonNext: {
              color: "white",
              backgroundColor: "black",
            },
            buttonBack: {
              color: "black",
            },
            buttonSkip: {
              color: "red",
            },
            options: {
              zIndex: 1000,
            },
          }}
        />
        <Timer initialTime={3} onTimerEnd={handleGiveUp} />
        <button
          onClick={reshuffleDeck}
          type="button"
          title="reshuffle"
          className="absolute top-2 -right-7 reset-button"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={2}
            stroke="currentColor"
            className="w-5 h-5"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0 3.181 3.183a8.25 8.25 0 0 0 13.803-3.7M4.031 9.865a8.25 8.25 0 0 1 13.803-3.7l3.181 3.182m0-4.991v4.99"
            />
          </svg>
        </button>
      </div>
      {deckSuccess && deckData && (
        <CardDeck input={answer} setInput={setAnswer} cards={deckData} />
      )}

      <hgroup className="py-2 space-y-0 text-center">
        <p>Your solution</p>
        {!notification && (
          <h3 className="min-h-[30px]">
            {answer.length > 0 ? answer.join(" ") : "_"}
          </h3>
        )}
        {notification && (
          <p className="py-1 mx-auto text-sm text-center text-white bg-red-400 border rounded-lg w-60 min-h-[30px]">
            {notification}
          </p>
        )}
      </hgroup>
      <div className="space-y-3 operation-keyboard">
        <Keyboard
          input={answer}
          setInput={setAnswer}
          onGiveUp={handleGiveUp}
          onSubmit={handleSubmitAnswer}
        />
      </div>
    </>
  );
}
