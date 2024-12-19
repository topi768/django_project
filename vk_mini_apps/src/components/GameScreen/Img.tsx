import { useState, useRef, useEffect, useCallback } from "react";
import styles from "./Img.module.css"; // импорт CSS Module
type Cat = {
  x: number;
  width: number;
  height: number;
  y: number;
  id: number;
  isFind: boolean;
};
interface ImgGameProps {
  className?: string;
  onFoundCat: (countFoundedCats: number, isFoundAllCat: boolean) => void;
  catsCoordinatesProps: Cat[];
}

export const ImgGame: React.FC<ImgGameProps> = ({
  className,
  onFoundCat,
  catsCoordinatesProps,
}) => {
  const [catsCoordinates, setCatsCoordinates] =
    useState<Cat[]>(catsCoordinatesProps);
  const [countCat] = useState<number>(catsCoordinates?.length);
  const [countFoundedCats, setCountFoundedCats] = useState<number>(0);
  const [isFoundAllCat, setIsFoundAllCat] = useState<boolean>(false);
  type CatDisplay = {
    x: number;
    y: number;
    width: number;
    height: number;
    id: number;
    isVisible: boolean;
    isFind: boolean;
  };
  const [positionsCatsOnDisplay, setPositionsCatsOnDisplay] = useState<
    CatDisplay[]
  >([]);
  const containerRef = useRef<HTMLDivElement>(null);

  const isVisibleOnWindow = useCallback(
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    (cat: Cat, xOffsetpx: number, yOffsetpx: number) => {
      // const windowWidth = window.innerWidth;
      // const windowHeight = window.innerHeight;

      // const xOffset = (xOffsetpx * 100) / windowWidth;
      // const yOffset = (yOffsetpx * 100) / windowHeight;

      // if (xOffset + cat.width + xOffset > 0) {
      //   return false;
      // } else if (yOffset + cat.height > 100) {
      //   return false;
      // } else if (xOffset + cat.width * 2 < 0) {
      //   return false;
      // } else if (yOffset + cat.height * 2 < 0) {
      //   return false;
      // }

      return true;
    },
    [],
  );

  // Функция перерасчета позиций
  const updatePositions = useCallback(() => {
    const container = containerRef.current;
    if (!container) return;

    const { offsetWidth: containerWidth, offsetHeight: containerHeight } =
      container;
    const imgAspectRatio = 1 / 1;
    const containerAspectRatio = containerWidth / containerHeight;

    let imgWidth: number, imgHeight: number;

    if (containerAspectRatio > imgAspectRatio) {
      imgWidth = containerWidth;
      imgHeight = containerWidth / imgAspectRatio;
    } else {
      imgHeight = containerHeight;
      imgWidth = containerHeight * imgAspectRatio;
    }

    const xOffset = (containerWidth - imgWidth) / 2;
    const yOffset = (containerHeight - imgHeight) / 2;

    const newPositions = catsCoordinates.map((cat) => ({
      x: xOffset + (cat.x / 100) * imgWidth,
      y: yOffset + (cat.y / 100) * imgHeight,
      width: (cat.width / 100) * imgWidth,
      height: (cat.height / 100) * imgHeight,
      isFind: cat.isFind,
      id: cat.id,
      isVisible: isVisibleOnWindow(
        cat,
        xOffset + (cat.x / 100) * imgWidth,
        yOffset,
      ),
    }));

    setPositionsCatsOnDisplay(newPositions);
  }, [catsCoordinates, isVisibleOnWindow]);

  useEffect(() => {
    updatePositions();
    const resizeObserverPositions = new ResizeObserver(updatePositions);

    if (containerRef.current) {
      resizeObserverPositions.observe(containerRef.current);
    }

    if (countFoundedCats === countCat) {
      setIsFoundAllCat(true);
    }
    onFoundCat(countFoundedCats, isFoundAllCat);

    return () => {
      resizeObserverPositions.disconnect();
    };
  }, [updatePositions, countFoundedCats, countCat, onFoundCat, isFoundAllCat]);

  const handleCatClick = (index: number) => {
    setCatsCoordinates((prevCats) =>
      prevCats.map((cat, i) => {
        if (i === index && !cat.isFind) {
          setCountFoundedCats((prev) => prev + 1);

          return { ...cat, isFind: true };
        }

        return cat;
      }),
    );
  };

  return (
    <div
      ref={containerRef}
      className={`relative w-full h-full flex justify-center items-center overflow-hidden ${className}`}
    >
      <img
        src="/src/assets/cats.webp"
        // src="/src/assets/cats2.png"
        alt="Cat"
        className="w-full h-full object-cover"
      />

      {positionsCatsOnDisplay.map((cat, index) => (
        <div
          onClick={() => handleCatClick(index)}
          key={index}
          data-cat-index={index}
          className={` absolute border-solid ${cat.isFind ? styles.square : ""}`}
          style={{
            top: `${cat.y}px`,
            left: `${cat.x}px`,
            width: `${cat.width}px`,
            height: `${cat.height}px`,
            // transform: "translate(-50%, -50%)",
          }}
        >
          {cat.isFind && (
            <img
              className={`${styles.imgFind} `}
              src="/src/assets/findEffect.gif"
            />
          )}
        </div>
      ))}
    </div>
  );
};
