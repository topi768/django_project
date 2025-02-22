// DynamicRankIcon.tsx
import { RanksNumber } from "@/api/types";
import {
  IconRanksGerland1,
  IconRanksGerland2,
  IconRanksGerland3,
  IconRanksGerland4,
  IconRanksGerland5,
  IconRanksGerland6,
  IconRanksGerland7,
} from "../../assets/icons/baseAvatar/ranksGerland/index";

interface GerlandProps {
  rank: RanksNumber;
  className: string;
}

const Gerland: React.FC<GerlandProps> = ({ rank, className = "" }) => {
  let IconComponent;

  switch (rank) {

    case 1:
      IconComponent = IconRanksGerland1;
      break;
    case 2:
      IconComponent = IconRanksGerland2;
      break;
    case 3:
      IconComponent = IconRanksGerland3;
      break;
    case 4:
      IconComponent = IconRanksGerland4;
      break;
    case 5:
      IconComponent = IconRanksGerland5;
      break;
    case 6:
      
      IconComponent = IconRanksGerland6;
      break;
    case 7:
      
      IconComponent = IconRanksGerland7;
      break;
    default:
      // console.warn(`Invalid rank value: ${rank}`);
      IconComponent = IconRanksGerland1;
      // return null;
      break;
  }

  return <IconComponent className={className} />;
};

export default Gerland;
