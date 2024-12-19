import { useState, useRef, useEffect } from "react";

export interface HintCircleProps {
  countHints: number;
  pointCordX: number;
  pointCordY: number;
}

export const HintCircle: React.FC<HintCircleProps> = ({
  countHints,
  pointCordX,
  pointCordY,
}) => {
  const [stepSizeCircle] = useState<number>(40);

  const [radiusHintCircle, setRadiusHintCircle] = useState<number>(
    countHints * stepSizeCircle + stepSizeCircle,
  );
  const [posHintCircleX, setPosHintCircleX] = useState<number>(
    pointCordX - radiusHintCircle,
  );

  const [posHintCircleY, setPosHintCircleY] = useState<number>(
    pointCordY - radiusHintCircle,
  );
  const prevCountRef = useRef<number>(countHints);

  const [isShowCircle, setIsShowCircle] = useState<boolean>(false);
  useEffect(() => {
    if (countHints != prevCountRef.current) {
      setIsShowCircle(true);
    }

    setRadiusHintCircle(countHints * stepSizeCircle + stepSizeCircle);

    setPosHintCircleX(pointCordX - radiusHintCircle);
    setPosHintCircleY(pointCordY - radiusHintCircle);

    prevCountRef.current = countHints;
  }, [countHints, pointCordX, pointCordY, radiusHintCircle, stepSizeCircle]);

  return (
    <>
      <img
        src="src/assets/GameScreen/HintCircle.svg"
        style={{
          display: isShowCircle ? "block" : "none",
          position: "absolute",
          top: posHintCircleY,
          left: posHintCircleX,
          width: radiusHintCircle * 2 + "px",
          height: radiusHintCircle * 2 + "px",
        }}
      />
      {/* центер */}
      {/* <div
        className="bg-red-900 w-1 h-1 absolute translate-x-0 "
        style={{
          transform: `translate(${pointCordX}px, ${pointCordY}px)`,
        }}
      ></div> */}
    </>
  );
};
