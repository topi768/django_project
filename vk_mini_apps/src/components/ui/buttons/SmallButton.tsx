import React from "react";

interface SmallButtonProps {
  text: string;
  onClick?: () => void;
  isDisabled?: boolean;
  isPrimary?: boolean;
  color?: string;
  className?: string;
}

export const SmallButton: React.FC<SmallButtonProps> = ({
  text,
  onClick,
  isDisabled = false,
  isPrimary = true,
  color = "primary",
  className = "",
}) => {
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
        return `border-2 border-${color} text-${color}`;
      }
    }
  };

  return (
    <button
      onClick={onClick}
      className={`inline-flex font-bold cursor-pointer justify-center items-center gap-2.5 pt-[0.1875rem] pb-[0.1875rem] px-4 rounded-full   leading-[1.375rem] ${bgColor()} ${className}`}
    >
      {text}
    </button>
  );
};
