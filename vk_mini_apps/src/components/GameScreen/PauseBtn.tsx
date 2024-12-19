import { forwardRef } from "react";

interface PauseBtnProps {
  onClick: () => void;
}

export const PauseBtn = forwardRef<HTMLButtonElement, PauseBtnProps>(
  ({ onClick }, ref) => {
    return (
      <button
        ref={ref} // Добавляем ref в кнопку
        onClick={onClick}
        className="relative w-16 h-16 rounded-full bg-[#8484f0]"
        style={{
          backgroundImage: "url('/src/assets/GameScreen/PauseBtn.svg')",
        }}
      ></button>
    );
  },
);
