import { Panel, NavIdProps } from "@vkontakte/vkui";
import { UserInfo } from "@vkontakte/vk-bridge";
import { Header } from "../components/Header";
import { Spacing } from "../components/ui/Spacing";
import { SmallButton } from "../components/ui/buttons/SmallButton";
import { ProgressBar } from "../components/ui/ProgressBar";
import { FC, useEffect, useState } from "react";
import IconCheck from "@/assets/icons/check.svg";
import { Footer } from "../components/Footer";
import { useAchievements } from "@/hooks/game/useGameUserInfo";

export interface AchievementsProps extends NavIdProps {
  fetchedUser?: UserInfo;
}

export const Achievements: FC<AchievementsProps> = ({ id }) => {
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
    const { data: achievements, isLoading, isError, error } = useAchievements();

  const [achievementsList, setAchievementsList] = useState<AchievementsList[]>([

  ]);
  useEffect(() => {
    if (achievements) {
      setAchievementsList(
        achievements.map((item) => ({
          name: item.name,
          subtext: item.description,
          buttonText: "2 кис-кис",
          isCompleted:false,
          isDisabled: true,
          current: 0,
          max: 5,
          id: item.id
        }))
      );
      }
  })
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
                <IconCheck />
              ) : (
                <SmallButton
                  text={item.buttonText}
                  isDisabled={item.isDisabled}
                  className=""
                />
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
