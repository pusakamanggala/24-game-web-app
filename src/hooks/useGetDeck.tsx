import { useState, useEffect, useCallback } from "react";
import { CardDeckType } from "../types/cardDeck";

type ResponseType = {
  success: boolean;
  deck_id: string;
  cards: CardDeckType[];
};

const useGetDeck = ({ cardNumber }: { cardNumber: number }) => {
  const [data, setData] = useState<CardDeckType[] | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isSuccess, setIsSuccess] = useState<boolean>(false);

  const fetchDeck = useCallback(async () => {
    setIsLoading(true);
    try {
      const response = await fetch(
        `${
          import.meta.env.VITE_DECK_CARD_API_BASE_URL
        }/api/deck/new/draw/?count=${cardNumber}`
      );
      if (!response.ok) {
        throw new Error("Failed to fetch");
      }
      const deckData: ResponseType = await response.json();
      setData(deckData.cards);
      setIsSuccess(true);
    } catch (error) {
      console.error("Error fetching deck:", error);
      setIsSuccess(false);
    } finally {
      setIsLoading(false);
    }
  }, [cardNumber]);

  useEffect(() => {
    if (cardNumber !== null) {
      fetchDeck();
    }
  }, [cardNumber, fetchDeck]);

  const refetch = () => {
    fetchDeck();
  };

  return { data, isLoading, isSuccess, refetch };
};

export default useGetDeck;
