import React, { useRef, useEffect } from "react";
import IconWatch from "@/assets/icons/watch.svg";
interface LargeButtonProps {
  text: string;
  onClick?: () => void;
  isDisabled?: boolean;
  isPrimary?: boolean;
  color?: string;
  className?: string;
  isWithWatchIcon?: boolean;
}

export const LargeButton: React.FC<LargeButtonProps> = ({
  text,
  onClick,
  isDisabled = false,
  isPrimary = true,
  color = "primary",
  className = "",
  isWithWatchIcon = false,
}) => {
  // Создаем реф для кнопки
  const buttonRef = useRef<HTMLButtonElement>(null);

  // Используем useEffect для изменения стилей через ref
  useEffect(() => {
    if (buttonRef.current && !isPrimary && !isDisabled && color) {
      // Устанавливаем цвет текста и границы через ref
      buttonRef.current.style.borderColor = color;
      buttonRef.current.style.color = color;
    }
  }, [isPrimary, isDisabled, color]); // Следим за изменениями color, isPrimary, isDisabled

  const bgColor = () => {
    if (isPrimary) {
      if (isDisabled) {
        return "bg-btnDisabled text-white";
      } else {
        return "bg-primary text-white";
      }
    }

    if (!isPrimary) {
      if (isDisabled) {
        return "border-2 border-btnDisabled text-btnDisabled";
      } else {
        // Возвращаем класс только для базовых стилей без цвета
        return "border-2";
      }
    }
  };

  return (
    <div className="w-full flex justify-center max-sm: " >
      <button
        ref={buttonRef} // Присваиваем реф кнопке
        onClick={onClick}
        className={`inline-flex font-bold cursor-pointer justify-center items-center rounded-full w-4/5 md:w-2/5 px-3 py-2 ${bgColor()} ${className}`}
        disabled={isDisabled} // Делаем кнопку неактивной, если передан флаг isDisabled
      >
        {isWithWatchIcon ? <IconWatch className="mr-2" /> : null}
        {text}
      </button>
    </div>
  );
};
