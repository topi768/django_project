import React, { useState, useEffect } from "react";

interface ProgressBarProps {
  current: number;
  max: number;
  duration?: number;
}

export const ProgressBar: React.FC<ProgressBarProps> = ({
  current,
  max,
  duration = 1000,
}) => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const progressPercentage = (current / max) * 100;

    const timeout = setTimeout(() => {
      setProgress(progressPercentage);
    }, 100);

    return () => clearTimeout(timeout);
  }, [current, max]);

  return (
    <div className="w-full bg-grey02 rounded-full h-4 overflow-hidden relative">
      <div
        className="bg-primary h-full transition-all ease-out"
        style={{
          width: `${progress}%`,
          transitionDuration: `${duration}ms`,
        }}
      />
      <p className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-center">
        {current} / {max}
      </p>
    </div>
  );
};
