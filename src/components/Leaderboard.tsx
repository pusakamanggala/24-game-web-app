import { getDatabase, ref, get } from "firebase/database";
import { app } from "../firebaseConfig";
import { useState } from "react";

type LeaderboardItem = {
  username: string;
  score: number;
};

const Leaderboard = () => {
  const [leaderboardArray, setLeaderboardArray] = useState<LeaderboardItem[]>(
    []
  );

  const getLeaderboard = async () => {
    const dbleaderboard = getDatabase(app);
    const dbleaderboardref = ref(dbleaderboard, "Leaderboard/Users");
    const snapshot = await get(dbleaderboardref);
    if (snapshot.exists()) {
      setLeaderboardArray(Object.values(snapshot.val()));
    } else {
      alert("No data available");
    }
  };

  return (
    <div>
      <button
        onClick={getLeaderboard}
        className="w-52 border-2 border-black p-2 text-white"
      >
        Leaderboard
      </button>
      <ul>
        {leaderboardArray.map((item, index) => (
          <li key={index}>
            {item.username} : {item.score}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Leaderboard;
