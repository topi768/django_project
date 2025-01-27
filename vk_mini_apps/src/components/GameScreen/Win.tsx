import { createPortal } from "react-dom";
import { LargeButton } from "../ui/buttons/LargeButton";
import { useNavigate } from "react-router-dom";
import { Avatar } from "../Avatar";
import { Spacing } from "../ui/Spacing";
import { ProgressBar } from "../ui/ProgressBar";
import { usePlayerStore } from "../../store";
import { useEffect, useState } from "react";

const portal = document.getElementById("portal")!;

interface WinProps {
  isWin: boolean;
}

export const Win: React.FC<WinProps> = ({ isWin }) => {
  const navigate = useNavigate();
  const rang = usePlayerStore((state) => state.rang);
  const [isAnimationComplete, setIsAnimationComplete] = useState(false);

  const onExit = () => {
    navigate("/Home");
  };

  useEffect(() => {
    if (isWin) {
      setTimeout(() => {
        setIsAnimationComplete(true);
      }, 3000); // Задержка для анимации
    }
  }, [isWin]);
  return isWin
  ? createPortal(
      <div className="w-full h-full absolute left-0 top-0 px-6 bg-black z-10 grid place-items-center">
        <div className={`text-center font-[18px] bg-white px-7 py-10 rounded-2xl relative w-full max-w-[500px] ${isAnimationComplete ? 'animate-fadeIn' : 'animate-fadeOut'}`}>
          <div className="mb-2">
            <Avatar className="absolute -top-[40px] left-1/2 -translate-x-1/2" />
            <p>Поздравляем!</p>
            <p className="text-primary">{rang}</p>
            <ProgressBar current={1} max={5} />
          </div>

          <Spacing />
          <div className="text-xl font-bold mb-4">Вы прошли игру!</div>
          <p className="mb-4">Спасибо за игру, продолжайте искать кошек!</p>
          <p className="mb-4">В будущем будут добавлены новые уровни, не пропустите их!</p>
          {/* <div className="flex justify-center">
            <LargeButton
              onClick={() => setIsAnimationComplete(false)}
              className="mt-8 mx-4"
              text={`Завершить игру`}
            />
          </div> */}
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
    )
  : null;
};
