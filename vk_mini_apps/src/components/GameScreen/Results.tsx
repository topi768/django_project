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
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const portal = document.getElementById("portal")!;
interface ResultsProps {
  isOpen: boolean;
  results: {
    score: number;
    amountCat: number;
    timeLeft: string | null | undefined;
  };
  onClose: () => void;
  OnRepeatGame: () => void;
}

export const Results: React.FC<ResultsProps> = ({
  isOpen,
  results,
  onClose,
  OnRepeatGame,
}) => {
  const navigate = useNavigate()
  const rang = usePlayerStore((state) => state.rang);

  const routeNavigator = useRouteNavigator();

  const onExit = () => {

    navigate("/");
    onClose();
  };

  useEffect(() => {
    if (isOpen && results) {
      usePlayerStore.getState().incrementScore(results.score);
      usePlayerStore.getState().incrementAmountCat(results.amountCat);
    }
  }, [isOpen, results]);

  if (isOpen) {
    return createPortal(
      <div className={`" w-full h-full absolute left-0 top-0 px-6  bg-black `}>
        <div className="relative w-full h-full flex justify-center items-center ">
          <div className="text-center font-[18px] bg-white px-7 py-10 rounded-2xl relative w-full">
            <div className="mb-2">
              <Avatar className="absolute -top-[40px] left-1/2 -translate-x-1/2" />
              <p>Уровень 1</p>
              <p className="text-primary">{rang}</p>
              <ProgressBar current={1} max={5} />
            </div>

            <Spacing />
            <div>
              <div className="w-full">
                <div
                  className="flex w-full items-center"
                  onClick={() => routeNavigator.push("/Friends")}
                >
                  <IconScore className="text-black mr-4 my-2  w-8 h-8" />
                  <p>Счет</p>
                  <p className="ml-auto">+ {results.score}</p>
                </div>
              </div>
              <div className="w-full">
                <div
                  className="flex w-full items-center"
                  onClick={() => routeNavigator.push("/Friends")}
                >
                  <IconSearch className="text-black mr-4 my-2  w-8 h-8" />
                  <p>Найдено котиков</p>
                  <p className="ml-auto">{results.amountCat}</p>
                </div>
              </div>
              <div className="w-full">
                <div
                  className="flex w-full items-center"
                  onClick={() => routeNavigator.push("/Friends")}
                >
                  <IconTimer className="text-black mr-4 my-2  w-8 h-8" />
                  <p>Времени осталось</p>
                  <p className="ml-auto">{results.timeLeft}</p>
                </div>
              </div>
            </div>
            <LargeButton
              onClick={OnRepeatGame}
              className="mt-8"
              text={`Повторить `}
            />
          </div>
        </div>
        <LargeButton
          onClick={onExit}
          className="absolute  bottom-12 left-1/2 -translate-x-1/2"
          text="Выйти"
          isPrimary={false}
          color="#FE4202"
        />
      </div>,

      portal,
    );
  }
};
