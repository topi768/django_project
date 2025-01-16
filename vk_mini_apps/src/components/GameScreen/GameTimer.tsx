import { useState, useEffect, forwardRef } from "react";
import IconTimer from "@/assets/icons/timer.svg";
import { TimerReverse } from "../TimerReverse";

interface TimerProps {
  isPause: boolean;
  startTime: number;
  onEnd: () => void;
  className?: string;
  style?: React.CSSProperties;
}

export const GameTimer = forwardRef<HTMLDivElement, TimerProps>(
  ({ isPause, startTime, onEnd, className = "" , style}, ref) => {
    const [secondsRemaining, setSecondsRemaining] = useState(startTime);

    useEffect(() => {
      let intervalId: NodeJS.Timeout | undefined;

      const startTimer = () => {
        intervalId = setInterval(() => {
          if (secondsRemaining <= 0 && !isPause) {
            onEnd();
          }

          if (isPause || secondsRemaining <= 0) {
            clearInterval(intervalId);

            return;
          }

          setSecondsRemaining((prevSeconds) => prevSeconds - 1);
        }, 1000);
      };

      if (!isPause) {
        startTimer();
      }

      return () => {
        clearInterval(intervalId);
      };
    }, [isPause, onEnd, secondsRemaining]);

    return (
      <div ref={ref} style={style} className={`timer-container ${className}`}>
        <div
          className={`flex justify-center items-center gap-2.5 py-2 px-5 w-[9.625rem] transition-colors duration-300 rounded-full ${
            secondsRemaining < 11 ? "bg-[#FE4202]" : "bg-[#8484f0] "
          }`}
        >
          <IconTimer />
          <div className="__label text-white font-['NauryzRedKeds'] text-2xl font-bold leading-[100%]">
            <TimerReverse
              isPause={isPause}
              startTime={secondsRemaining}
              onEnd={onEnd}
              isLeadingZeros={false}
            />
          </div>
        </div>
      </div>
    );
  },
);
