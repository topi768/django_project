import {} from "@vkontakte/icons";
import { createPortal } from "react-dom";
import { LargeButton } from "../ui/buttons/LargeButton";
import { useRouteNavigator } from "@vkontakte/vk-mini-apps-router";
import { Avatar } from "../Avatar";
import { Spacing } from "../ui/Spacing";
import { ProgressBar } from "../ui/ProgressBar";
import IconSearch from "@/assets/icons/search.svg";
import IconScore from "@/assets/icons/score.svg";
import IconTimer from "@/assets/icons/timerBlack.svg";
import { usePlayerStore } from "../../store";
import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useIncrementFindCats, useIncrementPoints } from "@/hooks/game/useGameUserInfo";
import { useUserStats } from "@/hooks/useUser";

const portal = document.getElementById("portal")!;

interface ResultsProps {
  isOpen: boolean;
  results: {
    amountCat: number;
    timeLeft: string;
  };
  onClose: () => void;
  onContinue: () => void;
  OnRepeatGame: () => void;
}

export const Results: React.FC<ResultsProps> = ({
  isOpen,
  results,
  onClose,
  OnRepeatGame,
  onContinue,
}) => {
  const { mutate: incrementPoints } = useIncrementPoints();
  const { mutate: incrementFindCats } = useIncrementFindCats();
  const navigate = useNavigate();
  const [isFailedeGame, setIsFailedeGame] = useState(false);
  const [points, setPoints] = useState(0);
  const routeNavigator = useRouteNavigator();
  const { data: userStat} = useUserStats();

  // Флаг для того, чтобы вызвать incrementPoints и incrementFindCats только один раз
  const hasIncrementedRef = useRef(false);

  // Флаг для предотвращения повторных обновлений других параметров
  const [hasUpdated, setHasUpdated] = useState(false);

  const onExit = () => {
    navigate("/Home");
    onClose();
  };

  // Эффект для обновления isFailedeGame, выполняется один раз при открытии
  useEffect(() => {
    if (isOpen && results && !hasUpdated) {
      setHasUpdated(true);

      if (results.timeLeft === "0") {
        setIsFailedeGame(true);
      } else {
        setIsFailedeGame(false);
        // console.log(results.timeLeft);
      }
    }
  }, [isOpen, results, hasUpdated]);

  // Эффект для однократного вызова incrementPoints и incrementFindCats при открытии
  useEffect(() => {
    if (isOpen && results && !hasIncrementedRef.current) {
      hasIncrementedRef.current = true; // Устанавливаем флаг, чтобы не повторять вызов

      const calculatedPoints = Number(results.timeLeft) * results.amountCat;
      setPoints(calculatedPoints);
      incrementPoints(calculatedPoints);
      incrementFindCats(results.amountCat);
      // console.log("Calculated Points:", calculatedPoints);
    }
  }, [isOpen, results, incrementPoints, incrementFindCats]);

  if (isOpen) {
    return createPortal(
      <div className="w-full h-full absolute left-0 top-0 px-6 grid place-items-center bg-black z-10">
        <div className="relative w-full h-full flex justify-center max-w-[800px] items-center">
          <div className="text-center font-[18px] bg-white px-7 py-10 rounded-2xl relative w-full">
            <div className="mb-2">
              <Avatar typeRank={userStat?.rank} className="absolute -top-[40px] left-1/2 -translate-x-1/2" />
              <p>Уровень {userStat?.rank}</p>
              <p className="text-primary">{userStat?.rank_name}</p>
              {/* <ProgressBar current={results.amountCat} max={10} /> */}
            </div>

            <Spacing />
            <div>
              <div className="w-full">
                <div
                  className="flex w-full items-center"
                  onClick={() => routeNavigator.push("/Friends")}
                >
                  <IconScore className="text-black mr-4 my-2 w-8 h-8" />
                  <p>Счет</p>
                  <p className="ml-auto">+ {points}</p>
                </div>
              </div>
              <div className="w-full">
                <div
                  className="flex w-full items-center"
                  onClick={() => routeNavigator.push("/Friends")}
                >
                  <IconSearch className="text-black mr-4 my-2 w-8 h-8" />
                  <p>Найдено котиков</p>
                  <p className="ml-auto">{results.amountCat}</p>
                </div>
              </div>
              <div className="w-full">
                <div
                  className="flex w-full items-center"
                  onClick={() => routeNavigator.push("/Friends")}
                >
                  <IconTimer className="text-black mr-4 my-2 w-8 h-8" />
                  <p>Времени осталось</p>
                  <p className="ml-auto">{results.timeLeft}</p>
                </div>
              </div>
            </div>
            <div className="flex justify-center">
              <LargeButton
                onClick={OnRepeatGame}
                className="mt-8 mx-4"
                text="Повторить"
              />
              {!isFailedeGame && (
                <LargeButton
                  onClick={onContinue}
                  className="mt-8 mx-4 text-white"
                  color="#8484f0"
                  text="Продолжаем"
                />
              )}
            </div>
          </div>
        </div>
        <LargeButton
          onClick={onExit}
          className="absolute bottom-12 left-1/2 -translate-x-1/2"
          text="Выйти"
          isPrimary={false}
          color="#FE4202"
        />
      </div>,
      portal
    );
  }

  return null;
};
