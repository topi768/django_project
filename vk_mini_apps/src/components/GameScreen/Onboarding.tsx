import { useEffect } from "react";
import { createPortal } from "react-dom";
import { Avatar } from "../../components/Avatar";
import { useState } from "react";
import { SmallButton } from "../ui/buttons/SmallButton";
import { LargeButton } from "../ui/buttons/LargeButton";

const portal = document.getElementById("portal")!;

interface OnboardingProps {
  isOpen: boolean;
  onHighlightChange: (highlightedElement: string) => void;
  onEnd: () => void;
}

type Dialogs = {
  text: string;
  highlightedElement: string | null;
  coordY: string;
};

const dialogs: Dialogs[] = [
  {
    text: "Привет, рядовой! Помоги мне найти сбежавших котиков. ",
    highlightedElement: null,
    coordY: "74%",
  },
  {
    text: "Найди как можно больше ушастых, пока все не разбежались.",
    highlightedElement: "timer",
    coordY: "15%",
  },
  {
    text: "Если время выйдет, придётся начинать всё сначала.",
    highlightedElement: "timerDangerous",
    coordY: "15%",
  },
  {
    text: "Если усатый хорошо спрятался, скажи “кис-кис”, чтобы сузить круг поисков. ",
    highlightedElement: "hintButton",
    coordY: "74%",
  },
  {
    text: "Если нужен перерыв, нажми “пауза”. Мы продолжим с того же места.",
    highlightedElement: "pauseButton",
    coordY: "74%",
  },
  {
    text: "Ну, как-то так. Не будем терять время - на поиски! ",
    highlightedElement: null,
    coordY: "40%",
  },
];

export const Onboarding: React.FC<OnboardingProps> = ({
  isOpen,
  onHighlightChange,
  onEnd,
}) => {
  const [currentDialog, setCurrentDialog] = useState(0);

  const incrementCurrentDialog = () => {
    setCurrentDialog(currentDialog + 1);
  };

  const decrementCurrentDialog = () => {
    setCurrentDialog(currentDialog - 1);
  };

  useEffect(() => {
    onHighlightChange(dialogs[currentDialog].highlightedElement);
  }, [currentDialog, onHighlightChange]);

  // Эффект для блокировки скроллинга
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden"; // Запрещаем прокрутку
    } else {
      document.body.style.overflow = "auto"; // Разрешаем прокрутку
    }

    // Возвращаем прокрутку по умолчанию при размонтировании компонента
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isOpen]);

  if (isOpen) {
    return createPortal(
      <div
        className={`w-full h-full absolute left-0 top-0 px-6 z-50`}
        style={{ transition: "top 0.5s ease-in-out", top: dialogs[currentDialog].coordY }}
      >
        <div className="flex">
          <Avatar className="mr-4" />
          <div>
            <p className="rounded-2xl p-2 bg-white text-center">
              {dialogs[currentDialog].text}
            </p>
            <div className="flex justify-end items-center mt-3">
              {currentDialog > 0 && (
                <SmallButton
                  onClick={decrementCurrentDialog}
                  text={"Назад"}
                  color="white"
                  isPrimary={false}
                />
              )}
              <p className="mx-3">
                {currentDialog + 1} / {dialogs.length}
              </p>
              {!(currentDialog >= dialogs.length - 1) && (
                <SmallButton
                  onClick={incrementCurrentDialog}
                  text={"Дальше"}
                  isPrimary={true}
                />
              )}
            </div>
          </div>
        </div>
        {currentDialog === dialogs.length - 1 && (
          <LargeButton onClick={onEnd} text="Играть" className="mt-3" />
        )}
      </div>,
      portal
    );
  }

  return null;
};
