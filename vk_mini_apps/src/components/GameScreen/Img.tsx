import { useState, useRef, useEffect, useCallback } from "react";
import styles from "./Img.module.css"; // импорт CSS Module

type Cat = {
  x: number;
  width: number;
  height: number;
  y: number;
  id: number;
  isFind: boolean;
  isVisible?: boolean;
};

interface ImgGameProps {
  className?: string;
  onFoundCat: (countFoundedCats: number, isFoundAllCat: boolean, catsCoordinatesProps: Cat[]) => void;
  catsCoordinatesProps: Cat[];
  src: string;
  onContainerRefReady?: (ref: React.RefObject<HTMLDivElement>) => void; // Коллбэк для передачи рефа наверх
}

export const ImgGame: React.FC<ImgGameProps> = ({
  className,
  onFoundCat,
  catsCoordinatesProps,
  src,
  onContainerRefReady,
}) => {

  const [catsCoordinates, setCatsCoordinates] = useState<Cat[]>(catsCoordinatesProps);
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

  const [positionsCatsOnDisplay, setPositionsCatsOnDisplay] = useState<CatDisplay[]>([]);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (onContainerRefReady) {
      onContainerRefReady(containerRef); // Передаем реф наверх
    }
  }, [onContainerRefReady]);

  // Проверяет, находится ли кот в пределах видимой области
  const isVisibleOnWindow = useCallback((cat: CatDisplay) => {
    const container = containerRef.current;
    if (!container) return false;
  
    const containerRect = container.getBoundingClientRect();
  
    // Отступ в 5% от ширины и высоты контейнера
    const marginX = containerRect.width * 0.15;
    const marginY = containerRect.height * 0.15;
  
    // Видимая область контейнера с учетом отступов
    const visibleRect = {
      left: marginX,
      top: marginY,
      right: containerRect.width - marginX,
      bottom: containerRect.height - marginY,
    };
  
    // Координаты кота
    const catRect = {
      left: cat.x,
      top: cat.y,
      right: cat.x + cat.width,
      bottom: cat.y + cat.height,
    };
  
    // Проверяем, находится ли кот в пределах видимой области
    return (
      catRect.right >= visibleRect.left &&
      catRect.left <= visibleRect.right &&
      catRect.bottom >= visibleRect.top &&
      catRect.top <= visibleRect.bottom
    );
  }, []);
  

  // Функция перерасчета позиций
  const updatePositions = useCallback(() => {
    const container = containerRef.current;
    if (!container) return;
  
    const { offsetWidth: containerWidth, offsetHeight: containerHeight } = container;
    const imgAspectRatio = 1 / 1; // Пример: заменить на реальный аспект изображения
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
  
    const newPositions = catsCoordinates.map((cat) => {
      const catDisplay = {
        x: xOffset + (cat.x / 100) * imgWidth,
        y: yOffset + (cat.y / 100) * imgHeight,
        width: (cat.width / 100) * imgWidth,
        height: (cat.height / 100) * imgHeight,
        id: cat.id,
        isFind: cat.isFind,
        isVisible: false, // Видимость вычисляем ниже
      };
  
      catDisplay.isVisible = isVisibleOnWindow(catDisplay); // Определяем видимость кота
  
      return catDisplay;
    });
  
    setPositionsCatsOnDisplay(newPositions);
  }, [catsCoordinates, isVisibleOnWindow]);
  

  useEffect(() => {
    updatePositions();
    const resizeObserverPositions = new ResizeObserver(updatePositions);

    if (containerRef.current) {
      resizeObserverPositions.observe(containerRef.current);
    }


    return () => {
      resizeObserverPositions.disconnect();
    };
  }, [updatePositions, countFoundedCats, onFoundCat, isFoundAllCat]);

  useEffect(() => {
    // Вызываем onFoundCat только если количество найденных котов или состояние "все коты найдены" изменилось
    if (countFoundedCats > 0 || isFoundAllCat) {
      onFoundCat(countFoundedCats, isFoundAllCat, catsCoordinates);
    }
  }, [countFoundedCats, isFoundAllCat, catsCoordinates, onFoundCat]);


  const handleCatClick = (index: number) => {
    setCatsCoordinates((prevCats) => {
      const updatedCats = prevCats.map((cat, i) => {
        if (i === index && !cat.isFind) {
          return { ...cat, isFind: true };
        }
        return cat;
      });

      const foundCount = updatedCats.filter((cat) => cat.isFind).length;
      const countCat = updatedCats.length; //???
      
      const visibleCat = positionsCatsOnDisplay.filter((cat) => cat.isVisible).length ;
      
      
      setCountFoundedCats(foundCount);
      
      if (foundCount >=  visibleCat && countCat !== 0) {
        setIsFoundAllCat(true);
      }

      return updatedCats;
    });
  };

  return (
    <div
      ref={containerRef}
      className={`relative w-full h-full flex justify-center items-center overflow-hidden  ${className}`}
    >
      <img src={src} alt="Cat" className="w-full h-full object-cover " />

      {positionsCatsOnDisplay.map((cat, index) => (
        <div
          onClick={() => handleCatClick(index)}
          key={index}
          data-cat-index={index}
          className={`absolute border-solid ${cat.isFind ? styles.square : ""}`}
          style={{
            top: `${cat.y}px`,
            left: `${cat.x}px`,
            width: `${cat.width}px`,
            height: `${cat.height}px`,
            // border: "1px solid white",
            zIndex: 1,
          }}
        >
          {cat.isFind && <img className={`${styles.imgFind} `} src="/src/assets/findEffect.gif" />}
        </div>
      ))}
    </div>
  );
};
