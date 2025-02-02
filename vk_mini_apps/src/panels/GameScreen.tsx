import { FC, useState, useRef, useEffect } from "react";
import { UserInfo } from "@vkontakte/vk-bridge";
import { GameTimer } from "../components/GameScreen/GameTimer";
import { PrestartModal } from "../components/GameScreen/PrestartModal";
import { HintBtn } from "../components/GameScreen/HintBtn";
import { PauseBtn } from "../components/GameScreen/PauseBtn";
import { Onboarding } from "../components/GameScreen/Onboarding";
import { PauseModal } from "../components/GameScreen/Pause";
import { Results } from "../components/GameScreen/Results";
import { HintCircle } from "../components/GameScreen/HintCircle";
import { Win } from "../components/GameScreen/Win";
import {
  Panel,
  NavIdProps,

} from "@vkontakte/vkui";
import { ImgGame } from "../components/GameScreen/Img";
import { useNavigate } from "react-router-dom";
import { useGetLvls } from "@/hooks/game/useGetLvls";

export interface OnboardingProps extends NavIdProps {
  fetchedUser?: UserInfo;
}

export const GameScreen: FC<OnboardingProps> = ({ id }) => {
  type Cat = {
    x: number;
    width: number;
    height: number;
    y: number;
    id: number;
    isFind: boolean;
  };




  const [key, setKey] = useState(0);

  const [countHints, setCountHints] = useState(3);
  const [isOpenOnboarding, setIsOpenOnboarding] = useState<boolean >(
    localStorage.getItem("isOpenOnboarding") === "true"
  );
  const SECONDS_GAME = 30
  const [isOpenPrestartModal, setIsOpenPrestartModal] = useState(false);
  const [isOpenPausetModal, setIsOpenPauseModal] = useState(false);
  const [startSeconds, setStartSeconds] = useState(SECONDS_GAME);
  const [isOpenResults, setIsOpenResults] = useState(false);
  const [countFoundedCats, setCountFindCats] = useState(0);
  const [srcImg, setSrcImg] = useState<string>("");
  const [posHintCircleX, setPosHintCircleX] = useState(20);
  const [posHintCircleY, setPosHintCircleY] = useState(20);
  const [isShowCircle, setIsShowCircle] = useState(false);
  const [curLevel, setCurLevel] = useState(0);
  const [isWin, setIsWin] = useState(false);
  const navigator = useNavigate();
  const [catsCoords, setCatsCoordinates] = useState<Cat[]>([
  ]);
  const { data: levels, isLoading: isGetLvlsLoading } = useGetLvls();

  useEffect(() => {
    if (levels) {
      catsCoords.length = 0;
      for (let i = 0; i < levels[curLevel].coordinates.length; i++) {
        catsCoords.push({
          x: levels[curLevel].coordinates[i].x,
          width: levels[curLevel].coordinates[i].width,
          height: levels[curLevel].coordinates[i].height,
          y: levels[curLevel].coordinates[i].y,
          id: i + 1,
          isFind: false,
          
        });
      }
      setSrcImg(levels[curLevel].image);
    }

  },[levels, curLevel])


  const handleClickHint = () => {
    setIsShowCircle(true);
    catsCoords.map((cat) => {
      if (!cat.isFind) {
        setPosHintCircleX(cat.x + cat.width / 2);
        setPosHintCircleY(cat.y + cat.height / 2);
      }
    })
    
    
    if (countHints >= 1) {
      setCountHints(countHints - 1);
    } else {
      return;
    }
  };
  useEffect(() => {}, [countHints]);

  const [isPause, setIsPause] = useState(false);

  const handleClickPause = () => {
    setIsPause(true);
    setIsOpenPauseModal(true);
  };

  const handleClosePauseModel = () => {
    setIsOpenPauseModal(false);
    setIsOpenPrestartModal(true);
  };

  const handleEndTimer = () => {
    setIsOpenResults(true);
  };

  const onClosePrestartModal = () => {
    setIsPause(false);
    setIsOpenPrestartModal(false);

    setPauseButtonOpacity(1);
    setHintButtonOpacity(1);
    setTimerOpacity(1);
  };


  const resetGame = () => {

    // Сбросить ключ, чтобы вызвать перерисовку компонента
    setKey((prevKey) => prevKey + 1);
  
    // Сбросить состояние
    setCountFindCats(0);  // Сбросить счетчик найденных кошек
    setCountHints(3);  // Сбросить количество подсказок
    setCatsCoordinates([]);  // Очистить текущие координаты кошек
  
    // Переинициализировать координаты кошек и изображение для текущего уровня
    if (levels) {
      const newCatsCoords = levels[curLevel].coordinates.map((coordinate, index) => ({
        x: coordinate.x,
        width: coordinate.width,
        height: coordinate.height,
        y: coordinate.y,
        id: index + 1,
        isFind: false,
      }));
      setCatsCoordinates(newCatsCoords);  // Установить обновленные координаты для текущего уровня
      setSrcImg(levels[curLevel].image);  // Установить изображение для текущего уровня
    }
  
    // Сбросить таймер и другие элементы UI
    setStartSeconds(SECONDS_GAME);  // Сбросить таймер или установить ваше начальное значение
    setIsOpenResults(false);  // Закрыть модальное окно результатов
  };
  

  const timerEL = useRef<HTMLDivElement>(null);

  const [timerOpacity, setTimerOpacity] = useState(1);
  const [hintButtonOpacity, setHintButtonOpacity] = useState(1);
  const [pauseButtonOpacity, setPauseButtonOpacity] = useState(1);

  const handleHighlightChange = (highlighted: string) => {
    if (localStorage.getItem("isOpenOnboarding") === "false") {
      setPauseButtonOpacity(1);
      setHintButtonOpacity(1);
      setTimerOpacity(1);
      return;
    };
    
    switch (highlighted) {
      case "timer":
        setStartSeconds(30);
        setTimerOpacity(1);
        setHintButtonOpacity(0.35);
        setPauseButtonOpacity(0.35);
        break;

      case "timerDangerous":
        setStartSeconds(10);
        setTimerOpacity(1);
        setHintButtonOpacity(0.35);
        setPauseButtonOpacity(0.35);
        break;

      case "hintButton":
        setStartSeconds(30);
        setTimerOpacity(0.35);
        setHintButtonOpacity(1);
        setPauseButtonOpacity(0.35);
        break;

      case "pauseButton":
        setTimerOpacity(0.35);
        setHintButtonOpacity(0.35);
        setPauseButtonOpacity(1);
        break;

      case null:
        setTimerOpacity(0.35);
        setHintButtonOpacity(0.35);
        setPauseButtonOpacity(0.35);
        break;

      default:
        setTimerOpacity(1);
        setHintButtonOpacity(1);
        setPauseButtonOpacity(1);
        break;
    }
  };




  const handleCloseOnboarding = () => {
    setIsOpenOnboarding(false);

    // Сброс прозрачности после закрытия Onboarding
    setTimerOpacity(1);
    setHintButtonOpacity(1);
    setPauseButtonOpacity(1);

    localStorage.setItem("isOpenOnboarding", String(false));
  };


  const onFoundCat = (countFoundedCats: number, isFoundAllCat: boolean, catsCoordinatesProps: Cat[]) => {
    console.log("onFoundCat");
    
    setCatsCoordinates(catsCoordinatesProps);

    if (isFoundAllCat) {
      setIsOpenResults(true);
    } else {
      setCountFindCats(countFoundedCats + 1);
    }
  };

  

  const containerRef = useRef<HTMLDivElement>(null);

  const handleContainerRefReady = (ref: React.RefObject<HTMLDivElement>) => {
    containerRef.current = ref.current;
    
  };
  const handleContinue = () => {
    if (levels?.length === curLevel + 1) {
      setIsWin(true);
      return
    }
    
    setKey((prevKey) => {
      const newKey = prevKey + 1;

      return newKey;
    });
    setIsOpenResults(false);
    console.log("handleContinue");
    
    setCurLevel(curLevel + 1);
  };
  const handleExit = () => {
    console.log("handleExit");
    

    navigator('/home')

  }
  return (
    <Panel key={key} id={id} className=" h-full relative overflow-hidden ">
      <div className="w-full h-screen  bg-gray-950 flex justify-center items-center ">
        <ImgGame onContainerRefReady={handleContainerRefReady} onFoundCat={onFoundCat} catsCoordinatesProps={catsCoords} src={'http://localhost:8000' + srcImg}  />
      </div>
      {isOpenOnboarding && (
        <div className="absolute top-0 left-0 w-screen h-screen bg-black opacity-50"></div>
      )}
      <div>
        {
          isOpenOnboarding === true && (        <Onboarding
            isOpen={isOpenOnboarding}
            onHighlightChange={handleHighlightChange}
            onEnd={handleCloseOnboarding}
          />)
        }

        <PauseModal
          onClose={handleClosePauseModel}
          isOpen={isOpenPausetModal}
          onExit={handleExit}
        />
        <GameTimer
          className="absolute top-9 left-1/2 -translate-x-1/2 duration-300 translate-y-5"
          isPause={isPause || isOpenOnboarding}
          startTime={startSeconds}
          key={startSeconds}
          onEnd={handleEndTimer}
          ref={timerEL}
          style={{ opacity: timerOpacity }} // Используем состояние для opacity
        />
        <div className="w-full flex justify-between items-end absolute bottom-5 left-0 px-6 ">
          <HintBtn
            className="translate-y-[6px] duration-300"
            countHint={countHints}
            onClick={handleClickHint}
            
            style={{ opacity: hintButtonOpacity }} // Используем состояние для opacity
          />
          <PauseBtn
            className="duration-300"
            onClick={handleClickPause}
            style={{ opacity: pauseButtonOpacity }} // Используем состояние для opacity
          />
        </div>

        <PrestartModal
          onClosePrestartModal={onClosePrestartModal}
          isOpen={isOpenPrestartModal}
        />
        <Results
          isOpen={isOpenResults}
          results={{
            amountCat: countFoundedCats,
            timeLeft: timerEL.current?.textContent,
          }}
          onClose={() => setIsOpenResults(false)}
          OnRepeatGame={resetGame}
          onContinue={handleContinue}
        />
      <Win isWin={isWin}/>
      <HintCircle countHints={countHints} pointCordX={posHintCircleX} pointCordY={posHintCircleY} containerRef={containerRef} isVisivle={isShowCircle} />
      </div>
    </Panel>
  );
};
