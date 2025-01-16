import { forwardRef } from "react";

interface PauseBtnProps {
  onClick: () => void;
  className?: string;
  style?: React.CSSProperties;
}

export const PauseBtn = forwardRef<HTMLButtonElement, PauseBtnProps>(
  ({ onClick, className = "", style }, ref) => {
    return (
      <button
        ref={ref} // Добавляем ref в кнопку
        onClick={onClick}
        className={'relative w-16 h-16 rounded-full bg-[#8484f0] ' + className}
        style={{
          backgroundImage: "url('/src/assets/GameScreen/PauseBtn.svg')",
          ...style
        }}
      ></button>
    );
  },
);
