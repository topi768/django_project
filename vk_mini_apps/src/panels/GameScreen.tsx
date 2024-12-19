import { FC, useState, useRef, useEffect } from "react";
import { UserInfo } from "@vkontakte/vk-bridge";
import { GameTimer } from "../components/GameScreen/GameTimer";
import { PrestartModal } from "../components/GameScreen/PrestartModal";
// import { HintBtn } from "../components/GameScreen/HintBtn";
import { PauseBtn } from "../components/GameScreen/PauseBtn";
import { Onboarding } from "../components/GameScreen/Onboarding";
import { PauseModal } from "../components/GameScreen/Pause";
import { Results } from "../components/GameScreen/Results";
import { HintCircle } from "../components/GameScreen/HintCircle";
// import { useGetLvls } from "../hooks/useGetLvls";
import {
  Panel,
  NavIdProps,
  ModalRoot,
  ModalPage,
  SplitLayout,
} from "@vkontakte/vkui";
import { ImgGame } from "../components/GameScreen/Img";

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

  const [countHints] = useState(3);
  const [isOpenOnboarding, setIsOpenOnboarding] = useState(
    localStorage.getItem("isOpenOnboarding") ? false : true,
  );
  const [isOpenPrestartModal, setIsOpenPrestartModal] = useState(false);
  const [isOpenPausetModal, setIsOpenPauseModal] = useState(false);
  const [startSeconds, setStartSeconds] = useState(30);
  const [isOpenResults, setIsOpenResults] = useState(false);
  // const [score, setScore] = useState(0);
  const [countFindCast, setCountFindCats] = useState(0);
  const [catsCoords] = useState<Cat[]>([
    {
      x: 16,
      width: 17,
      height: 10,
      y: 81,
      id: 1,
      isFind: false,
    },
    {
      x: 34,
      width: 10,
      height: 10,
      y: 75,
      id: 2,
      isFind: false,
    },
    {
      x: 50,
      width: 10,
      height: 13,
      y: 69,
      id: 3,
      isFind: false,
    },

  ]);
  // const { data } = useGetLvls();
  // console.log(data);

  // const handleClickHint = () => {
  //   if (countHints >= 1) {
  //     setCountHints(countHints - 1);
  //   } else {
  //     return;
  //   }
  // };
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
  };

  const handleCloseOnboarding = () => {
    setIsOpenOnboarding(false);
    localStorage.setItem("isOpenOnboarding", String(false));
  };

  const resetGame = () => {
    setKey((prevKey) => prevKey + 1);
    setIsOpenResults(false);
  };
  const timerEL = useRef<HTMLDivElement>(null);
  const hintButtonEL = useRef<HTMLDivElement>(null);
  const pauseButtonEL = useRef<HTMLButtonElement>(null);

  const handleHighlightChange = (highlighted: string) => {
    switch (highlighted) {
      case "timer":
        setStartSeconds(30);

        if (timerEL.current && hintButtonEL.current && pauseButtonEL.current) {
          timerEL.current.style.zIndex = "0";
          hintButtonEL.current.style.zIndex = "0";
          pauseButtonEL.current.style.zIndex = "0";
        }

        if (timerEL.current) {
          timerEL.current.style.zIndex = "50000";
        }

        break;
      case "timerDangerous":
        setStartSeconds(10);

        if (timerEL.current && hintButtonEL.current && pauseButtonEL.current) {
          timerEL.current.style.zIndex = "0";
          hintButtonEL.current.style.zIndex = "0";
          pauseButtonEL.current.style.zIndex = "0";
        }

        if (timerEL.current) {
          timerEL.current.style.zIndex = "50000";
        }

        break;
      case "hintButton":
        setStartSeconds(30);

        if (timerEL.current && hintButtonEL.current && pauseButtonEL.current) {
          timerEL.current.style.zIndex = "0";
          hintButtonEL.current.style.zIndex = "0";
          pauseButtonEL.current.style.zIndex = "0";
        }

        if (hintButtonEL.current) {
          hintButtonEL.current.style.zIndex = "50000";
        }

        break;
      case "pauseButton":
        if (timerEL.current && hintButtonEL.current && pauseButtonEL.current) {
          timerEL.current.style.zIndex = "0";
          hintButtonEL.current.style.zIndex = "0";
          pauseButtonEL.current.style.zIndex = "0";
        }

        if (pauseButtonEL.current) {
          pauseButtonEL.current.style.zIndex = "50000";
        }

        break;
      default:
        if (timerEL.current && hintButtonEL.current && pauseButtonEL.current) {
          timerEL.current.style.zIndex = "0";
          hintButtonEL.current.style.zIndex = "0";
          pauseButtonEL.current.style.zIndex = "0";
        }

        break;
    }
  };

  const onFoundCat = (countFoundedCats: number, isFoundAllCat: boolean) => {
    if (isFoundAllCat) {
      setIsOpenResults(true);
    } else {
      setCountFindCats(countFoundedCats + 1);
    }
  };
  const ondoarding = (
    <ModalRoot activeModal="ondoarding">
      <ModalPage
        className=" w-full h-full"
        id="ondoarding"
        hideCloseButton
      ></ModalPage>
    </ModalRoot>
  );

  return (
    <Panel key={key} id={id} className=" h-full relative  ">
      <div className="w-full h-screen  bg-gray-950 flex justify-center items-center ">
        <ImgGame onFoundCat={onFoundCat} catsCoordinatesProps={catsCoords} />
      </div>
      <SplitLayout modal={isOpenOnboarding && ondoarding}></SplitLayout>
      <div>
        <Onboarding
          isOpen={isOpenOnboarding}
          onHighlightChange={handleHighlightChange}
          onEnd={handleCloseOnboarding}
        />
        <PauseModal
          onClose={handleClosePauseModel}
          isOpen={isOpenPausetModal}
        />
        <GameTimer
          className="absolute top-9 left-1/2 -translate-x-1/2   translate-y-5"
          isPause={isPause || isOpenOnboarding}
          startTime={startSeconds}
          key={startSeconds}
          onEnd={handleEndTimer}
          ref={timerEL}
        />
        <div className=" w-full flex justify-between items-end absolute bottom-5 left-0 px-6 ">
          {/* <HintBtn
            ref={hintButtonEL}
            className="translate-y-[6px]"
            countHint={countHints}
            onClick={handleClickHint}
          /> */}
          <PauseBtn ref={pauseButtonEL} onClick={handleClickPause} />
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
        <HintCircle countHints={countHints} pointCordX={250} pointCordY={700} />
      </div>
    </Panel>
  );
};
