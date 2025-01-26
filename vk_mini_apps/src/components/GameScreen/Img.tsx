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
  onFoundCat: (countFoundedCats: number, isFoundAllCat: boolean, catsCoordinatesProps: Cat[]) => void;
  catsCoordinatesProps: Cat[];
  src: string,
  onContainerRefReady?: (ref: React.RefObject<HTMLDivElement>) => void; // Коллбэк для передачи рефа наверх
}

export const ImgGame: React.FC<ImgGameProps> = ({
  className,
  onFoundCat,
  catsCoordinatesProps,
  src,
  onContainerRefReady
}) => {
  const [catsCoordinates, setCatsCoordinates] =
    useState<Cat[]>(catsCoordinatesProps);
  // const [countCat, setCountCat] = useState<number>(0);
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

  useEffect(() => {
    if (onContainerRefReady) {
      onContainerRefReady(containerRef); // Передаем реф наверх
    }
  }, [onContainerRefReady]);

  const isVisibleOnWindow = useCallback(
    (cat: Cat, xOffsetpx: number, yOffsetpx: number) => {

      return true;
    },
    [],
  );
  // useEffect(() => {
  //   if (catsCoordinates) {
  //     setCountCat(catsCoordinates.length);
      
  //   }
    
  // }, [catsCoordinates]);

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


    onFoundCat(countFoundedCats, isFoundAllCat, catsCoordinates);

    return () => {
      resizeObserverPositions.disconnect();
    };
  }, [updatePositions, countFoundedCats, onFoundCat, isFoundAllCat]);


  const handleCatClick = (index: number) => {
    setCatsCoordinates((prevCats) => {
      // Обновляем массив котов и считаем количество найденных
      const updatedCats = prevCats.map((cat, i) => {
        if (i === index && !cat.isFind) {
          return { ...cat, isFind: true }; // Обновляем кота как найденного
        }
        return cat; // Остальные коты без изменений
      });
  
      // Считаем количество найденных котов
      const foundCount = updatedCats.filter((cat) => cat.isFind).length;
      const countCat = updatedCats.length;
      // Обновляем счетчик найденных котов
      setCountFoundedCats(foundCount);
  
  
      // Проверяем, найдены ли все коты
      if (foundCount === countCat && countCat !== 0) {
        setIsFoundAllCat(true);
      }
      
      return updatedCats;
    });
    
  };

  return (
    <div
      ref={containerRef}
      className={`relative w-full h-full flex justify-center items-center overflow-hidden ${className}`}
    >
      <img
        src={src}
        alt="Cat"
        className="w-full h-full object-cover "
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
            border : "1px solid white",
            zIndex: 1
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
