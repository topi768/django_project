import React from "react";

interface MediumButtonProps {
  text: string;
  onClick?: () => void;
  className?: string;
  disabled?: boolean;
}
const MediumButton: React.FC<MediumButtonProps> = ({
  text,
  onClick,
  disabled = false,
  className = "",
}) => (
  <div className={className}>
    <button
      onClick={onClick}
      className={`w-full inline-flex justify-center items-center gap-2.5 pl-[1.875rem] pr-[1.875rem] p-2 rounded-full text-white text-[1.0625rem] font-medium leading-[1.375rem] ${disabled ? "bg-btnDisabled" : "bg-primary"}`}
    >
      {text}
    </button>
  </div>
);

export default MediumButton;
