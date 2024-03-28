import React, { useState, useEffect } from "react";

interface TimerProps {
  initialTime: number; // Initial time in minutes
  onTimerEnd: () => void;
}

const Timer: React.FC<TimerProps> = ({ initialTime, onTimerEnd }) => {
  const [remainingTime, setRemainingTime] = useState<number>(initialTime * 60);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setRemainingTime((prevTime) => {
        if (prevTime <= 0) {
          clearInterval(intervalId);
          // Trigger alert when remaining time reaches 0
          onTimerEnd();
          return 0;
        }
        return prevTime - 1;
      });
    }, 1000); // Update timer every second (1000 milliseconds)

    return () => {
      clearInterval(intervalId);
    };
  }, [onTimerEnd]);

  const formatTime = (time: number): string => {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;

    return `${minutes.toString().padStart(2, "0")}:${seconds
      .toString()
      .padStart(2, "0")}`;
  };

  return <h2 className="timer">{formatTime(remainingTime)}</h2>;
};

export default Timer;
