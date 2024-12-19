import { useState, useEffect } from "react";

interface TimerProps {
  isPause: boolean;
  startTime: number;
  onEnd: () => void;
  className?: string;
  isLeadingZeros?: boolean;
}

export const TimerReverse: React.FC<TimerProps> = ({
  isPause,
  startTime,
  onEnd,
  className = "",
  isLeadingZeros = true,
}) => {
  // const [isPause, setIsPause]= useState(false);

  const [secondsRemaining, setSecondsRemaining] = useState(startTime);
  useEffect(() => {
    let intervalId: NodeJS.Timeout | undefined = undefined;

    const startTimer = (isPause?: boolean) => {
      intervalId = setInterval(() => {
        if (secondsRemaining <= 0 && !isPause) {
          onEnd();
        }

        if (isPause || secondsRemaining <= 0) {
          clearInterval(intervalId);

          return;
        }

        setSecondsRemaining((prevSeconds: number) => prevSeconds - 1);
      }, 1000);
    };

    if (!isPause) {
      startTimer();
    }

    return () => {
      clearInterval(intervalId);
    };
  }, [isPause, onEnd, secondsRemaining]);

  const formatedSeconds = (seconds: number) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secondsLeft = seconds % 60;
    let formatedTime;

    if (isLeadingZeros) {
      formatedTime = `${hours.toString().padStart(2, "0")}:${minutes.toString().padStart(2, "0")}:${secondsLeft.toString().padStart(2, "0")}`;
    } else {
      if (hours > 0) {
        formatedTime = `${hours}:${minutes.toString().padStart(2, "0")}}:${secondsLeft.toString().padStart(2, "0")}`;
      } else if (minutes > 0) {
        formatedTime = `${minutes}:${secondsLeft.toString().padStart(2, "0")}`;
      } else {
        formatedTime = `${secondsLeft}`;
      }
    }

    return formatedTime;
  };

  return <div className={className}>{formatedSeconds(secondsRemaining)}</div>;
};
