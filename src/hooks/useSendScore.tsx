import { useState } from 'react';
import {app} from '../firebaseConfig'
import { getDatabase, ref, set, push } from "firebase/database";

const useSendScore = () => {
  const [isSuccess, setIsSuccess] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  const upload = async (score : number, username : string) => {
    setIsLoading(true);
    setIsError(false);
    setIsSuccess(false);

    console.log(`Uploading score: ${score} for user: ${username}`);

    try {
      // Simulate an API call with a timeout
      const db = getDatabase(app);
      const scoreRef = push(ref(db, 'Leaderboard/Users'));

      await set (scoreRef, {
        username,
        score,
      })

      // After the timeout, set success to true
      setIsSuccess(true);
    } catch (error) {
      setIsError(true);
    } finally {
      setIsLoading(false);
    }
  };

  return { isSuccess, isLoading, isError, upload };
};

export default useSendScore;