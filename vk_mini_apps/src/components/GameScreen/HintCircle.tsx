import { useState, useEffect } from "react";

export interface HintCircleProps {
  countHints: number;
  pointCordX: number; // Координата X в процентах от исходного размера
  pointCordY: number; // Координата Y в процентах от исходного размера
  containerRef: React.RefObject<HTMLDivElement>;
}

export const HintCircle: React.FC<HintCircleProps> = ({
  countHints,
  pointCordX,
  pointCordY,
  containerRef,
}) => {
  const [stepSizeCircle] = useState<number>(40);
  const [radiusHintCircle, setRadiusHintCircle] = useState<number>(
    countHints * stepSizeCircle + stepSizeCircle
  );
  const [posHintCircleX, setPosHintCircleX] = useState<number>(0);
  const [posHintCircleY, setPosHintCircleY] = useState<number>(0);
  const [centerX, setCenterX] = useState<number>(0);
  const [centerY, setCenterY] = useState<number>(0);
  const [isShowCircle, setIsShowCircle] = useState<boolean>(false);

  const calculatePosition = () => {
    if (containerRef.current) {
      const container = containerRef.current;
      const image = container.querySelector("img");

      if (image) {
        const containerRect = container.getBoundingClientRect();
        const containerWidth = containerRect.width;
        const containerHeight = containerRect.height;

        const naturalWidth = image.naturalWidth;
        const naturalHeight = image.naturalHeight;

        const containerAspect = containerWidth / containerHeight;
        const imageAspect = naturalWidth / naturalHeight;

        let renderedWidth, renderedHeight, offsetX, offsetY;

        if (imageAspect > containerAspect) {
          renderedWidth = containerHeight * imageAspect;
          renderedHeight = containerHeight;
          offsetX = (containerWidth - renderedWidth) / 2;
          offsetY = 0;
        } else {
          renderedWidth = containerWidth;
          renderedHeight = containerWidth / imageAspect;
          offsetX = 0;
          offsetY = (containerHeight - renderedHeight) / 2;
        }

        const adjustedX = (pointCordX / 100) * renderedWidth;
        const adjustedY = (pointCordY / 100) * renderedHeight;

        setCenterX(adjustedX + offsetX);
        setCenterY(adjustedY + offsetY);

        // Учитываем радиус для корректного смещения относительно центра
        setPosHintCircleX(adjustedX + offsetX - radiusHintCircle);
        setPosHintCircleY(adjustedY + offsetY - radiusHintCircle);
      }
    }
  };

  useEffect(() => {
    calculatePosition();
    window.addEventListener("resize", calculatePosition);
    return () => window.removeEventListener("resize", calculatePosition);
  }, [containerRef, pointCordX, pointCordY, radiusHintCircle]);

  useEffect(() => {
    setRadiusHintCircle(countHints * stepSizeCircle + stepSizeCircle);
    setIsShowCircle(true);
  }, [countHints, stepSizeCircle]);

  return (
    <>
      {/* Круг */}
      <img
        src="src/assets/GameScreen/HintCircle.svg"
        style={{
          display: isShowCircle ? "block" : "none",
          position: "absolute",
          top: posHintCircleY,
          left: posHintCircleX,
          width: radiusHintCircle * 2 + "px",
          height: radiusHintCircle * 2 + "px",
          zIndex: 0
        }}
      />

      {/* Точка в центре круга */}
      <div
        style={{
          position: "absolute",
          top: centerY - 2 + "px",
          left: centerX - 2 + "px",
          width: "4px",
          height: "4px",
          borderRadius: "50%",
          backgroundColor: "red",
          zIndex: 10,
        }}
      />
    </>
  );
};
