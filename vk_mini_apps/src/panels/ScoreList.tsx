import { FC, useState, useEffect } from "react";
import { Panel, NavIdProps } from "@vkontakte/vkui";
import { UserInfo } from "@vkontakte/vk-bridge";
import { Header } from "../components/Header";
import { Spacing } from "../components/ui/Spacing";
import { Avatar } from "../components/Avatar";
import { Footer } from "../components/Footer";

// Статичные данные вместо useGetRatingTop5
const staticTopList = [
  {
    name: "Иван Петров",
    avatar: "https://randomuser.me/api/portraits/men/32.jpg",
    rank: "Сержант Кискисенко",
    score: 2500,
  },
  {
    name: "Алексей Иванов",
    avatar: "https://randomuser.me/api/portraits/men/45.jpg",
    rank: "Капитан Левицкий",
    score: 3000,
  },
  {
    name: "Мария Смирнова",
    avatar: "https://randomuser.me/api/portraits/women/53.jpg",
    rank: "Майор Зинченко",
    score: 2800,
  },
  {
    name: "Петр Александров",
    avatar: "https://randomuser.me/api/portraits/men/22.jpg",
    rank: "Лейтенант Коробейников",
    score: 3100,
  },
  {
    name: "Елена Петрова",
    avatar: "https://randomuser.me/api/portraits/women/21.jpg",
    rank: "Полковник Степанова",
    score: 3300,
  },
];

export interface ScoreListProps extends NavIdProps {
  fetchedUser?: UserInfo;
}

export const ScoreList: FC<ScoreListProps> = ({ id }) => {
  interface Friend {
    name: string;
    avatar: string;
    rank: string;
    score: number;
  }

  const [topList, setTopList] = useState<Friend[]>(staticTopList);

  function formatScore(score: number) {
    return score.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }

  const [sortedFriendsList, setSortedFriendsList] = useState<Friend[]>([]);

  useEffect(() => {
    if (topList.length > 0) {
      const sortedList = topList.sort((a, b) => b.score - a.score);
      setSortedFriendsList(sortedList);
    }
  }, [topList]);

  return (
    <Panel id={id} className="w-full h-full">
      <div className="w-full h-full px-6">
        <Header text="Топ 5 искателей" />
        <Spacing />
        <div className="">
          {sortedFriendsList.length > 0 ? (
            sortedFriendsList.map((friend, index) => (
              <div key={index} className="">
                <div className="flex relative my-3">
                  <Avatar className="mr-6" srcImage={friend.avatar} />
                  <div className="h-full flex flex-col gap-2">
                    <h3 className="text-[1.0625rem] mt-3 font-bold leading-[1.375rem]">
                      {friend.name}
                    </h3>
                    <p className="text-[#8484f0] leading-[1.125rem]">
                      {friend.rank}
                    </p>
                  </div>
                  <button className="absolute -translate-y-1/2 top-1/2 right-0 text-black font-['NauryzRedKeds'] text-sm font-bold leading-[1.375rem]">
                    {formatScore(friend.score)}
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
              </div>
            </div>
          )}
        </div>
      </div>
      <Footer />
    </Panel>
  );
};
