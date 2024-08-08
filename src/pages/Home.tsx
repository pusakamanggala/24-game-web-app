import { useEffect, useState } from "react";
import CardIcon from "../img/cards-icon.svg";
import { Link } from "react-router-dom";
import clickSound from "../audio/punchy-taps-ui-2.mp3";
import Joyride from "react-joyride";
import Leaderboard from "../components/Leaderboard";

export default function Home() {
  const [selectedMode, setSelectedMode] = useState<string>("6");

  const playClickSound = () => {
    const audio = new Audio(clickSound);
    audio.volume = 0.2;

    audio.play();
  };

  const handleSelectMode = (mode: string) => {
    setSelectedMode(mode);
    playClickSound();
  };

  const [tourCompleted, setTourCompleted] = useState(() => {
    // Retrieve the tour run status from session storage
    const status = localStorage.getItem("homeTourCompleted");
    // Parse the status as boolean (if it exists), default to false if not found
    return status ? JSON.parse(status) : false;
  });

  useEffect(() => {
    // Update local storage when tourCompleted changes
    localStorage.setItem("homeTourCompleted", JSON.stringify(tourCompleted));
  }, [tourCompleted]); // Update whenever tourCompleted changes

  const steps = [
    {
      disableBeacon: true,
      target: ".game-mode",
      content:
        "Select game mode, you can choose to use four or six cards in your deck. Both options have different counting strategies and difficulties",
    },
    {
      target: ".play-button",
      content: "Then press start once you have selected the mode",
    },
    {
      target: ".tutorial",
      content:
        "I advise you to check out the tutorial before you start, because someone once said, 'Knowing is half the battle.'",
    },
    {
      target: ".github",
      content: "Dont forget to check out my GitHub",
    },
  ];

  const startTour = () => {
    // delete the tour run status in local storage
    playClickSound();
    localStorage.removeItem("homeTourCompleted");
    localStorage.removeItem("playTourCompleted");

    //reload the page
    window.location.reload();
  };

  return (
    <div className="flex flex-col flex-1">
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

          // save "homeTourCompleted" in session storage when tour is completed
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
      <div className="flex flex-col items-center justify-center flex-1">
        <img src={CardIcon} alt="icon" className="h-32 mb-7 card-icon" />
        <div className="flex flex-col gap-3">
          <div className="grid w-56 grid-cols-2 p-1 font-semibold border rounded-lg border-primary dark:border-secondary game-mode">
            <button
              type="button"
              title="4 Card Mode"
              onClick={() => handleSelectMode("4")}
              className={`rounded-md py-1 ${
                selectedMode === "4"
                  ? "bg-primary text-secondary dark:bg-secondary dark:text-primary"
                  : ""
              }`}
            >
              <p>4 Card</p>
            </button>
            <button
              type="button"
              title="6 Card Mode"
              onClick={() => handleSelectMode("6")}
              className={`rounded-md py-1 ${
                selectedMode === "6"
                  ? "bg-primary text-secondary dark:bg-secondary dark:text-primary "
                  : ""
              }`}
            >
              <p>6 Card</p>
            </button>
          </div>
          <Link
            onClick={playClickSound}
            to={`/play/${selectedMode}`}
            className="!w-56 h-10 keyboard flex items-center justify-center play-button"
          >
            Play
          </Link>
          <Link
            onClick={playClickSound}
            to="/how-to-play"
            className="!w-56 h-10 keyboard flex items-center justify-center tutorial"
          >
            How to play
          </Link>
          <button
            onClick={startTour}
            className="!w-56 h-10 keyboard flex items-center justify-center tutorial"
          >
            Start Tour
          </button>

          <Leaderboard />
        </div>
      </div>

      <p className="mt-5 text-center">
        Made with ❤️ by{" "}
        <a
          href="https://github.com/pusakamanggala"
          target="_blank"
          rel="noreferrer"
          className="hover:underline github"
        >
          Pusaka Manggala
        </a>
      </p>
    </div>
  );
}
