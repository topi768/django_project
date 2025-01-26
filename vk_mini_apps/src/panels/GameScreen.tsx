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
import { useGetLvls } from "../hooks/useGetLvls";
import {
  Panel,
  NavIdProps,

} from "@vkontakte/vkui";
import { ImgGame } from "../components/GameScreen/Img";
import { BooleanSupportOption } from "prettier";

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
  const [isOpenPrestartModal, setIsOpenPrestartModal] = useState(false);
  const [isOpenPausetModal, setIsOpenPauseModal] = useState(false);
  const [startSeconds, setStartSeconds] = useState(300000);
  const [isOpenResults, setIsOpenResults] = useState(false);
  const [countFindCast, setCountFindCats] = useState(0);
  const [srcImg, setSrcImg] = useState<string>("");
  const [posHintCircleX, setPosHintCircleX] = useState(20);
  const [posHintCircleY, setPosHintCircleY] = useState(20);
  const [isShowCircle, setIsShowCircle] = useState(false);
  const [catsCoords, setCatsCoordinates] = useState<Cat[]>([
  ]);
  const { data: levels, error, isLoading: isGetLvlsLoading, isError } = useGetLvls();
  useEffect(() => {
    if (levels) {
      catsCoords.length = 0;
      for (let i = 0; i < levels[key].coordinates.length; i++) {
        catsCoords.push({
          x: levels[key].coordinates[i].x,
          width: levels[key].coordinates[i].width,
          height: levels[key].coordinates[i].height,
          y: levels[key].coordinates[i].y,
          id: i + 1,
          isFind: false,
          
        });
      }
      setSrcImg(levels[key].image);
    }

  },[levels])


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
    setKey((prevKey) => prevKey + 1);
    setIsOpenResults(false);
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

  return (
    <Panel key={key} id={id} className=" h-full relative  ">
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
            score: countFindCast * 257,
            amountCat: countFindCast - 1,
            timeLeft: timerEL.current?.textContent,
          }}
          onClose={() => setIsOpenResults(false)}
          OnRepeatGame={resetGame}
        />
        <HintCircle countHints={countHints} pointCordX={posHintCircleX} pointCordY={posHintCircleY} containerRef={containerRef} isVisivle={isShowCircle} />
      </div>
    </Panel>
  );
};
