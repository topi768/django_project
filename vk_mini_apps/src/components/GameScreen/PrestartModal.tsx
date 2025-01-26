import { Div } from "@vkontakte/vkui";

import {} from "@vkontakte/icons";
import { GameTimer } from "./GameTimer";
import { createPortal } from "react-dom";
const portal = document.getElementById("portal")!;

interface PrestartModalProps {
  isOpen: boolean;
  onClosePrestartModal: () => void;
}

export const PrestartModal: React.FC<PrestartModalProps> = ({
  isOpen,
  onClosePrestartModal,
}) => {
  const handleEndTimer = () => {
    onClosePrestartModal();
  };

  if (isOpen) {
    return createPortal(
      <Div className="absolute inset-0 bg-black/50 flex items-center justify-center z-30">
        <Div className="flex flex-col justify-center items-center font-inter italic font-bold text-6xl leading-11 text-center text-white">
          <p>СТАРТ ЧЕРЕЗ</p>
          <GameTimer isPause={false} startTime={3} onEnd={handleEndTimer} />
        </Div>
      </Div>,

      portal,
    );
  }

  // return (

  //   //
  // );
};
