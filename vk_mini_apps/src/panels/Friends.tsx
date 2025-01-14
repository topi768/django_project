import { FC, useState } from "react";
import { Panel, NavIdProps } from "@vkontakte/vkui";
import { UserInfo } from "@vkontakte/vk-bridge";
import { Header } from "../components/Header";
import { Spacing } from "../components/ui/Spacing";
import MediumButton from "../components/ui/buttons/MediumButton";
import ChevronRight from "@/assets/icons/chevronRight.svg";
import { useRouteNavigator } from "@vkontakte/vk-mini-apps-router";
import { Footer } from "../components/Footer";
import { useNavigate } from "react-router-dom";
export interface FriendsProps extends NavIdProps {
  fetchedUser?: UserInfo;
}

export const Friends: FC<FriendsProps> = ({ id }) => {
  interface Friend {
    name: string;
    avatar: string;
    rank: string;
    id: number;
  }
  const navigate = useNavigate();
  const [friendsList] = useState<Friend[]>([
    {
      name: "Владимир Котов",
      avatar: "src/assets/base/avatar.svg",
      rank: "Сержант Кискисенко",
      id: 1,
    },
    {
      name: "Владимир Котов",
      avatar: "src/assets/base/avatar.svg",
      rank: "Сержант Кискисенко",
      id: 2,
    },
    {
      name: "Владимир Котов",
      avatar: "src/assets/base/avatar.svg",
      rank: "Сержант Кискисенко",
      id: 3,
    },
  ]);

  const openFriend = (id: number) => {
    navigate(`/friend/${id}`);
  };

  return (
    <Panel id={id} className="w-full h-full ">
      <div className="w-full h-full ">
        <div className="px-6">
          <Header text="Друзья в игре" />
          <Spacing />
          {friendsList.length > 0 ? (
            friendsList.map((friend, index) => (
              <div key={index}>
                <div className="flex relative my-3 ">
                  <img className="mr-2" src={friend.avatar} alt="" />
                  <div className="h-full flex flex-col  gap-2">
                    <h3 className=" text-[1.0625rem] mt-3 font-bold leading-[1.375rem]">
                      {friend.name}
                    </h3>
                    <p className=" text-[#8484f0] leading-[1.125rem]">
                      {friend.rank}
                    </p>
                  </div>
                  <button
                    onClick={() => openFriend(friend.id)}
                    className="absolute -translate-y-1/2 top-1/2 right-0"
                  >
                    <ChevronRight />
                  </button>
                </div>
              </div>
            ))
          ) : (
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
              <div>
                <p className="text-center text-black font-sf text-[1.0625rem] leading-[1.375rem]">
                  Ваши друзья не в тусовке.
                </p>
                <p className="text-center text-black font-sf text-[1.0625rem] leading-[1.375rem]">
                  Исправим?
                </p>
                <MediumButton className="mt-2" text="Пригласить" />
              </div>
            </div>
          )}
        </div>
      </div>
      <Footer />
    </Panel>
  );
};
