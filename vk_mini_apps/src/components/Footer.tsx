import IconTop from "@/assets/icons/top.svg";
import IconAchievements from "@/assets/icons/achievements.svg";
import IconBalance from "@/assets/icons/balance.svg";
import IconFriends from "@/assets/icons/friends.svg";
import { useRouteNavigator } from "@vkontakte/vk-mini-apps-router";
import { Avatar } from "../components/Avatar";

interface FooterProps {
  className?: string;
}

export const Footer: React.FC<FooterProps> = ({ className }) => {
  const routeNavigator = useRouteNavigator();

  return (
    <>
      <footer
        className={`px-6 w-full  text-[10px]  md:text-[16px] flex justify-center absolute bottom-4 left-0 ${className}`}
      >
        <nav className="w-full h-full max-w-[500px] flex justify-between items-center">
          <div
            className="relative cursor-pointer"
            onClick={() => routeNavigator.push("/СurrencyPurchase")}
          >
            <IconBalance className=" text-black w-8 h-8 md:w-10 md:h-10" />
            <p className="text-nowrap absolute left-1/2 -translate-x-1/2">
              Кис-Кисы
            </p>
          </div>
          <div
            className="relative cursor-pointer"
            onClick={() => routeNavigator.push("/Achievements")}
          >
            <IconAchievements className="text-black w-8 h-8 md:w-10 md:h-10" />
            <p className="absolute left-1/2 -translate-x-1/2">Достижения</p>
          </div>
          <Avatar className="md:w-12 md:h-12" />
          <div
            className="relative cursor-pointer"
            onClick={() => routeNavigator.push("/Friends")}
          >
            <IconFriends className="text-black w-8 h-8 md:w-10 md:h-10" />
            <p className="absolute left-1/2 -translate-x-1/2">Друзья</p>
          </div>
          <div
            className="relative cursor-pointer"
            onClick={() => routeNavigator.push("/ScoreList")}
          >
            <IconTop className="text-black w-8 h-8 md:w-10 md:h-10" />
            <p className="absolute left-1/2 -translate-x-1/2">Топ</p>
          </div>
        </nav>
      </footer>
    </>
  );
};
