import IconBaseAvatar1 from "@/assets/icons/baseAvatar/avatar/1.svg";
import IconBaseAvatar2 from "@/assets/icons/baseAvatar/avatar/2.svg";
import IconBaseAvatar3 from "@/assets/icons/baseAvatar/avatar/3.svg";
import { useNavigate } from "react-router-dom";
import Gerland from "./ui/Gerland";
import { useUserStats } from "@/hooks/useUser";
import { useEffect, useState } from "react";
import { RanksNumber } from "@/api/types";
interface AvatarProps {
  srcImage?: string;
  className?: string;
  typeBaseAvatar?: number;
  typeRank: RanksNumber;
  link?: string;
  onClick?: () => void;
}

export const Avatar: React.FC<AvatarProps> = ({
  srcImage = "",
  className,
  typeBaseAvatar = 1,
  typeRank,
  link = "",
  onClick,
}) => {
  const navigate = useNavigate();

  let BaseAvatar;

  switch (typeBaseAvatar) {
    case 1:
      BaseAvatar = IconBaseAvatar1;
      break;
    case 2:
      BaseAvatar = IconBaseAvatar2;
      break;
    case 3:
      BaseAvatar = IconBaseAvatar3;
      break;
    default:
      return null;
      break;
  }

  return (
    <>
      <div className={className} onClick={onClick}>
        <div className="relative">
          {srcImage == "" ? (
            <div>{<BaseAvatar />}</div>
          ) : (
            <img
              className="w-[72px] h-[72px] object-cover rounded-full"
              src={srcImage}
              alt=""
            />
          )}

          <Gerland
            className="absolute bottom-[-7px] -translate-x-[1px]"
            rank={typeRank}
          />
        </div>
      </div>
    </>
  );
};
