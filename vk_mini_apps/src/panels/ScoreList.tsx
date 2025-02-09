import { FC, useState, useEffect } from "react";
import { Panel, NavIdProps } from "@vkontakte/vkui";
import { UserInfo } from "@vkontakte/vk-bridge";
import { Header } from "../components/Header";
import { Spacing } from "../components/ui/Spacing";
import { Avatar } from "../components/Avatar";
import { Footer } from "../components/Footer";
import { useGetLeaderboard } from "@/hooks/useLeaderboard";
import { LeaderboardList, RanksNumber } from "@/api/types";

// Статичные данные вместо useGetRatingTop5


export interface ScoreListProps extends NavIdProps {
  fetchedUser?: UserInfo;
}

export const ScoreList: FC<ScoreListProps> = ({ id }) => {
  interface Friend {
    name: string;
    avatar: string;
    rank: RanksNumber;
    score: number;
  }
  const {data: leaderboardList} = useGetLeaderboard();
  useEffect(() => {
    if (leaderboardList) {
      console.log(leaderboardList);
      
    }
  }, [leaderboardList])



  const [topList, setTopList] = useState<LeaderboardList>([]);

  useEffect(() => {
    if (leaderboardList) {
      setTopList(leaderboardList)
    }
  })

  function formatScore(score: number) {
    return score.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }




  return (
    <Panel id={id} className="w-full h-full">
      <div className="w-full h-full px-6">
        <Header text="Топ 5 искателей" />
        <Spacing />
        <div className="">
          {topList.length > 0 ? (
            topList.map((friend, index) => (
              <div key={index} className="">
                <div className="flex relative my-3">
                  <Avatar className="mr-6" typeRank={friend.rank} />
                  <div className="h-full flex flex-col gap-2">
                    <h3 className="text-[1.0625rem] mt-3 font-bold leading-[1.375rem]">
                      {friend.name}
                    </h3>
                    <p className="text-[#8484f0] leading-[1.125rem]">
                      {friend.rank}
                    </p>
                  </div>
                  <button className="absolute -translate-y-1/2 top-1/2 right-0 text-black font-['NauryzRedKeds'] text-sm font-bold leading-[1.375rem]">
                    {formatScore(friend.points)}
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
      {/* <Footer /> */}
    </Panel>
  );
};
