import { useEffect, useState } from "react";

interface ITimer {
  time: number;
  setTime: React.Dispatch<React.SetStateAction<number>>;
  setIsStarted: React.Dispatch<React.SetStateAction<boolean>>;
}

export const useTimer = (): ITimer => {
  const [time, setTime] = useState(30);
  const [isStarted, setIsStarted] = useState(false);

  useEffect(() => {
    let timer: NodeJS.Timeout | undefined;

    if (isStarted) {
      timer = setInterval(() => {
        setTime((prevTime) => prevTime - 1);
      }, 1000);
    }

    if (time <= 0 && timer != null) {
      clearInterval(timer);
      setIsStarted(false);
    }

    return () => {
      if (timer != null) {
        clearInterval(timer);
      }
    };
  }, [isStarted, time]);

  return { time, setTime, setIsStarted };
};
