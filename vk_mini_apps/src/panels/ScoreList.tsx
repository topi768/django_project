import { FC, useState, useEffect } from "react";
import { Panel, NavIdProps } from "@vkontakte/vkui";
import { UserInfo } from "@vkontakte/vk-bridge";
import { Header } from "../components/Header";
import { Spacing } from "../components/ui/Spacing";
// import MediumButton from "../components/ui/buttons/MediumButton";
import { useGetRatingTop5 } from "../hooks/useGetTop5";
import { Avatar } from "../components/Avatar";
import { RatingTop5Item } from "../types";
import { Footer } from "../components/Footer";

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
  const [topList, setTopList] = useState<Friend[]>([]);
  const { data, isLoading, error } = useGetRatingTop5();

  useEffect(() => {
    if (data && !isLoading && !error) {
      const players: Friend[] = data.map((player: RatingTop5Item) => ({
        name: player.name,
        avatar: player.avatar,
        rank: "Сержант Кискисенко",
        score: player.score,
      }));

      setTopList(players);
    }
  }, [data, isLoading, error]);

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
    <Panel id={id} className="w-full h-full ">
      <div className="w-full h-full px-6">
        <Header text="Топ 5 искателей" />
        <Spacing />
        <div className="">
          {sortedFriendsList.length > 0 ? (
            sortedFriendsList.map((friend, index) => (
              <div key={index} className="">
                <div className="flex relative my-3 ">
                  <Avatar className="mr-6" srcImage={friend.avatar} />{" "}
                  <div className="h-full flex flex-col  gap-2">
                    <h3 className=" text-[1.0625rem] mt-3 font-bold leading-[1.375rem]">
                      {friend.name}
                    </h3>
                    <p className=" text-[#8484f0] leading-[1.125rem]">
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
                {/* <p className="text-center text-black font-sf text-[1.0625rem] leading-[1.375rem]">
                  Исправим?
                </p>
                <MediumButton className="mt-2" text="Пригласить" /> */}
              </div>
            </div>
          )}
        </div>
      </div>
      <Footer />
    </Panel>
  );
};
