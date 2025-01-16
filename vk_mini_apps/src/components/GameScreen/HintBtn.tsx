import {} from "@vkontakte/icons";
import { forwardRef } from "react";
interface HintBtnProps {
  countHint: number;
  onClick: () => void;
  className?: string;
  style?: React.CSSProperties;
}

export const HintBtn = forwardRef<HTMLDivElement, HintBtnProps>(
  (props, ref) => {
    const { countHint, onClick, className = "", style, ...datum } = props;

    return (
      <>
        <div style={style} className={className} {...datum} ref={ref}>
          <button
            onClick={onClick}
            className=" relative w-16 h-16 rounded-full bg-[#8484f0]"
            style={{
              backgroundImage: "url('/src/assets/GameScreen/HintBtn.svg')",
            }}
          >
            <div className="absolute -top-2 -right-2 flex justify-center items-center w-8 h-8 rounded-full bg-[#FF3347]">
              <p>{countHint}</p>
            </div>
          </button>
        </div>
      </>
    );
    // return (

    //   //
    // );
  },
);
