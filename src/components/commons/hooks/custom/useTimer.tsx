import { useEffect, useState } from "react";

export const useTimer = () => {
  const [time, setTime] = useState(30);
  const [isStarted, setIsStarted] = useState(false);

  useEffect(() => {
    let timer;

    if (isStarted) {
      timer = setInterval(() => {
        setTime((prevTime) => prevTime - 1);
      }, 1000);
    }

    if (time <= 0) {
      clearInterval(timer);
      setIsStarted(false);
    }

    return () => clearInterval(timer);
  }, [isStarted, time]);

  return { time, setTime, setIsStarted };
};
