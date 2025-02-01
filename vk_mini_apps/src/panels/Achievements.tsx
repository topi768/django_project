import { Panel, NavIdProps, Button } from "@vkontakte/vkui"; 
import { UserInfo } from "@vkontakte/vk-bridge";
import { Header } from "../components/Header";
import { Spacing } from "../components/ui/Spacing";
import { ProgressBar } from "../components/ui/ProgressBar";
import { FC, useEffect, useState } from "react";
import IconCheck from "@/assets/icons/check.svg";
import { Footer } from "../components/Footer";
import { useAchievements } from "@/hooks/game/useGameUserInfo";
import { useUserStats } from "@/hooks/useUser";

export interface AchievementsProps extends NavIdProps {
  fetchedUser?: UserInfo;
}

export const Achievements: FC<AchievementsProps> = ({ id }) => {
  const { data: userStat, refetch: refetchUserStats } = useUserStats(Number(localStorage.getItem("user_id")));
  const { data: achievements } = useAchievements();

  interface AchievementsList {
    name: string;
    subtext: string;
    buttonText: string;
    isDisabled?: boolean;
    isCompleted: boolean;
    current: number;
    max: number;
    id: number;
  }

  const [achievementsList, setAchievementsList] = useState<AchievementsList[]>([]);
  const [completedCount, setCompletedCount] = useState<number>(0);

  useEffect(() => {
    const intervalId = setInterval(() => {
      refetchUserStats(); 
    }, 2000);

    const handleVisibilityChange = () => {
      if (!document.hidden) {
        refetchUserStats();
      }
    };

    document.addEventListener("visibilitychange", handleVisibilityChange);

    return () => {
      clearInterval(intervalId);
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
  }, [refetchUserStats]);

  useEffect(() => {
    if (achievements && userStat) {
      const updatedAchievementsList = achievements.map((item) => ({
        name: item.name,
        subtext: item.description,
        buttonText: "Повысить ранг",
        isCompleted: userStat?.countFindCats >= Number(item.maxProgress),
        isDisabled: false,
        current: userStat?.countFindCats,
        max: Number(item.maxProgress),
        id: item.id,
      }));

      setAchievementsList(updatedAchievementsList);

      const count = updatedAchievementsList.filter((item) => item.isCompleted).length;
      setCompletedCount(count);

      localStorage.setItem("completedAchievements", String(count)); // Сохраняем в localStorage
    }
  }, [achievements, userStat]);

  const handleRankIncrease = (itemId: number) => {
    setAchievementsList(prevList =>
      prevList.map((item) =>
        item.id === itemId
          ? { ...item, isCompleted: false, buttonText: "Ранг повышен", isDisabled: true }
          : item
      )
    );

    const updatedCount = completedCount + 1;
    setCompletedCount(updatedCount);
    localStorage.setItem("completedAchievements", String(updatedCount));
  };

  return (
    <Panel id={id} className="w-full">
      <div className="px-6">
        <Header text="Достижения" />
        <Spacing />
        {achievementsList.map((item) => (
          <div key={item.id} className="w-full h-full py-7">
            <div className="flex justify-between">
              <p className="text-[17px]">{item.name}</p>
              {item.isCompleted ? (
               <div 
               onClick={() => handleRankIncrease(item.id)} 
               className="cursor-pointer bg-primary text-white font-semibold text-xs py-1 px-3 rounded-full hover:bg-secondary transition duration-200"
             >
               {item.buttonText}
             </div>
              ) : (
                <p></p>
              )}
            </div>

            <p className="text-[14px] text-primary mb-2">{item.subtext}</p>

            <ProgressBar current={item.current} max={item.max} />
          </div>
        ))}
      </div>
      <Footer />
    </Panel>
  );
};
