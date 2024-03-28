import { Link } from "react-router-dom";
import useTheme from "../hooks/useTheme";
import CardIcon from "../img/cards-icon.svg";
import clickSound from "../audio/punchy-taps-ui-2.mp3";

export default function Header() {
  const [theme, setTheme] = useTheme();

  const toggleTheme = () => {
    setTheme(theme === "light" ? "dark" : "light");
  };

  const playClickSound = () => {
    const audio = new Audio(clickSound);
    audio.volume = 0.2;

    audio.play();
  };

  return (
    <header className="sticky top-0 z-50 py-3 border-b border-primary dark:border-secondary bg-secondary dark:bg-primary">
      <div className="container flex items-center justify-between mx-auto">
        <Link to={"/"} className="flex gap-2" onClick={playClickSound}>
          <img src={CardIcon} alt="" className="h-8 card-icon" />
          <h2 className="font-bold">24 Game</h2>
        </Link>

        <button onClick={toggleTheme} type="button" title="Toggle Theme">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-6 h-6 duration-300"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d={
                theme === "dark"
                  ? "M12 3v2.25m6.364.386-1.591 1.591M21 12h-2.25m-.386 6.364-1.591-1.591M12 18.75V21m-4.773-4.227-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0Z"
                  : "M21.752 15.002A9.72 9.72 0 0 1 18 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 0 0 3 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 0 0 9.002-5.998Z"
              }
            />
          </svg>
        </button>
      </div>
    </header>
  );
}
