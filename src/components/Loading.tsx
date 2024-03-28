import CardIcon from "../img/cards-icon.svg";
import cleaningSound from "../audio/book-foley-finger-slide-2.mp3";
import { useEffect } from "react";

export default function Loading() {
  useEffect(() => {
    const playCleanSound = () => {
      const audio = new Audio(cleaningSound);
      audio.volume = 0.2;

      audio.play();
    };

    playCleanSound();
  });

  return (
    <>
      <img src={CardIcon} alt="icon" className="h-32 card-icon animate-pulse" />
      <p className="font-medium animate-pulse">Shuffling...</p>
    </>
  );
}
