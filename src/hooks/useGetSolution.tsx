import { useState, useEffect, useCallback } from "react";

type ResponseType = {
  solution: boolean;
  equation: string;
};

const useGetSolution = ({ numbers }: { numbers: string[] }) => {
  const [data, setData] = useState<ResponseType | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isSuccess, setIsSuccess] = useState<boolean>(false);

  const fetchSolution = useCallback(async () => {
    setIsLoading(true);
    try {
      const response = await fetch(
        `${
          import.meta.env.VITE_24_SOLVER_API_BASE_URL
        }/game?numbers=${numbers.join(",")}`
      );
      if (!response.ok) {
        throw new Error("Failed to fetch");
      }
      const solution: ResponseType = await response.json();
      setData(solution);
      setIsSuccess(true);
    } catch (error) {
      console.error("Error fetching solution:", error);
      setIsSuccess(false);
    } finally {
      setIsLoading(false);
    }
  }, [numbers]);

  useEffect(() => {
    if (numbers.length > 0) {
      fetchSolution();
    }
  }, [numbers, fetchSolution]);

  const refetch = () => {
    fetchSolution();
  };

  return { data, isLoading, isSuccess, refetch };
};

export default useGetSolution;
