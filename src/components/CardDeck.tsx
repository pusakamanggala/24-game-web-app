import React, { useEffect, useState } from "react";
import { CardDeckType } from "../types/cardDeck";
import cardFlip from "../audio/paper-collect.mp3";
import cardBack from "../img/card-back.png";
import ReactCardFlip from "react-card-flip";

export default function CardDeck({
  cards,
  input,
  setInput,
}: {
  cards: CardDeckType[];
  input: string[];
  setInput: React.Dispatch<React.SetStateAction<string[]>>;
}) {
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

  const [selectedCardCode, setSelectedCardCode] = useState<string[]>([]);
  const [selectedCardValue, setSelectedCardValue] = useState<string[]>([]);

  const playCardFlipSound = () => {
    new Audio(cardFlip).play();
  };

  const handleInput = (value: string, code: string) => {
    if (selectedCardCode.includes(code)) return;

    if (
      input.length > 0 &&
      !isNaN(parseInt(input[input.length - 1])) &&
      !isNaN(parseInt(value))
    )
      return;

    playCardFlipSound();
    setInput([...input, value]);
    setSelectedCardCode([...selectedCardCode, code]);
    setSelectedCardValue([...selectedCardValue, value]);
  };

  useEffect(() => {
    const filteredInput = input.filter((item) => !isNaN(parseInt(item)));

    if (
      selectedCardCode.length !== filteredInput.length ||
      selectedCardValue.length !== filteredInput.length
    ) {
      setSelectedCardCode(selectedCardCode.slice(0, -1));
      setSelectedCardValue(selectedCardValue.slice(0, -1));
    }
  }, [selectedCardCode, selectedCardValue, input]);

  useEffect(() => {
    if (input.length === 0) setSelectedCardCode([]);
  }, [input, setSelectedCardCode]);

  return (
    <div
      className={`grid card-to-choose grid-cols-${
        cards.length / 2
      } gap-2 mx-auto md:gap-3 w-fit `}
    >
      {cards.map((card) => (
        <ReactCardFlip isFlipped={selectedCardCode.includes(card.code)}>
          <img
            onClick={() => handleInput(convertCardValue(card.value), card.code)}
            src={`${card.image}?${card.code}`}
            alt={card.code}
            key={card.code}
            className={`2xl:w-[128px] shadow-lg 2xl:h-[178px] md:w-[100px] md:h-[140px] w-[80px] h-[120px] rounded-lg overflow-visible cursor-pointer`}
            loading="lazy"
          />
          <img
            src={cardBack}
            alt={card.code + "back"}
            key={card.code + "back"}
            className={`2xl:w-[128px] shadow-lg 2xl:h-[178px] md:w-[100px] md:h-[140px] w-[80px] h-[120px] rounded-lg overflow-visible card-icon`}
            loading="lazy"
          />
        </ReactCardFlip>
      ))}
    </div>
  );
}
