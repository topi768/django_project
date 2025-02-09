import { FC } from "react";
import { Panel, NavIdProps } from "@vkontakte/vkui";
import { UserInfo } from "@vkontakte/vk-bridge";
import { Header } from "../components/Header";
import { Spacing } from "../components/ui/Spacing";
import { Avatar } from "../components/Avatar";
import { ListItem } from "../components/ui/ListItem";
import { Footer } from "../components/Footer";

export interface FriendProps extends NavIdProps {
  fetchedUser?: UserInfo;
}

const rankingData = [
  {
    iconName: "score",
    route: "",
    text: "Счет",
    value: "2 205 568",
  },
  {
    iconName: "top",
    route: "",
    text: "Место в рейтинге",
    value: "56",
  },
  {
    iconName: "search",
    route: "",
    text: "Найдено котиков",
    value: "256",
  },
  {
    iconName: "achievements",
    route: "",
    text: "Открыто достижений",
    value: "5",
  },
];

export const Friend: FC<FriendProps> = ({ id }) => {
  return (
    <Panel id={id} className="w-full h-fullx">
      <div className="w-full h-full">
        <div className="px-6">
          <Header text="Друзья в игре" />
          <Spacing />
          <div className="">
            <div className="flex relative my-7 ">
              <Avatar className="mr-6" />
              <div className="h-full flex flex-col  gap-2">
                <h3 className=" text-[1.0625rem] mt-3 font-bold leading-[1.375rem]">
                  {"Владимир Котов"}
                </h3>
                <p className=" text-[#8484f0] leading-[1.125rem]">
                  {"Сержант Кискисенко "}
                </p>
              </div>
            </div>
          </div>
          <Spacing />
          {rankingData.map(({ iconName, route, text, value }) => (
            <ListItem
              key={text}
              iconName={iconName}
              route={route}
              text={text}
              value={value}
            />
          ))}
        </div>
      </div>

      {/* <Footer /> */}
    </Panel>
  );
};
