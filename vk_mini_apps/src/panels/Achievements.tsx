import { Panel, NavIdProps, Button } from "@vkontakte/vkui"; 
import { UserInfo } from "@vkontakte/vk-bridge";
import { Header } from "../components/Header";
import { Spacing } from "../components/ui/Spacing";
import { ProgressBar } from "../components/ui/ProgressBar";
import { FC, useEffect, useState } from "react";
import IconCheck from "@/assets/icons/check.svg";
import { Footer } from "../components/Footer";
import { useAchievements, useUserAchievements } from "@/hooks/game/useGameUserInfo";
import { useUserStats } from "@/hooks/useUser";
import { Achievement } from "@/api/game/gameUserInfo";

export interface AchievementsProps extends NavIdProps {
  fetchedUser?: UserInfo;
}

export const Achievements: FC<AchievementsProps> = ({ id }) => {

  interface UIAchievement {
    id: number;
    name: string;
    subtext: string;
    buttonText: string;
    isDisabled?: boolean;
    isCompleted: boolean;
    current: number;
    max: number;
    
  }
  const {data: achievementsList} = useAchievements()
  const {data: myAchievementList} = useUserAchievements()
  const [currentFindCats, setCurrentFindCats] = useState(0);

  const [UIachievements, setUIAchievements] = useState<UIAchievement[]>([]);
  
  const {data: userStats} = useUserStats()

  useEffect(() => {
    if (userStats) {
      setCurrentFindCats(userStats.countFindCats);
      
    }
  }, [userStats]);
  useEffect(() => {
    if (achievementsList && myAchievementList) {
      // Преобразуем достижения, которые уже есть у пользователя
      const transformedMyAchievements: UIAchievement[] = myAchievementList.map((ach) => ({
        id: ach.id,
        name: ach.name,
        subtext: ach.description,
        buttonText: "1",
        isDisabled: false,
        isCompleted: false,
        current:  ach.maxProgress, // или другое значение
        max: ach.maxProgress,
      }));
  
      // Выбираем достижения, которых нет у пользователя (уникальные)
      const uniqueAchievements = achievementsList.filter(
        (achievement) => !myAchievementList.some((myAch) => myAch.id === achievement.id)
      );
  
      const transformedUniqueAchievements: UIAchievement[] = uniqueAchievements.map((ach) => ({
        id: ach.id,
        name: ach.name,
        subtext: ach.description,
        buttonText: "1",
        isDisabled: false,
        isCompleted: false,
        current: currentFindCats,
        max: ach.maxProgress,
      }));
  
      // Объединяем оба массива
      const finalAchievements = [...transformedMyAchievements, ...transformedUniqueAchievements];
  
      // Устанавливаем итоговый массив достижений
      setUIAchievements(finalAchievements);
    }
  }, [achievementsList, myAchievementList, currentFindCats]);
  


  const handleRankIncrease = (itemId: number) => {

  };

  return (
    <Panel id={id} className="w-full">
      <div className="px-6">
        <Header text="Достижения" />
        
          
        <Spacing />
        {UIachievements?.map((item) => (
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
      {/* <Footer /> */}
    </Panel>
  );
};
