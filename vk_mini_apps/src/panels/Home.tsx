import { FC, useEffect , useState} from "react";
import { Panel, NavIdProps } from "@vkontakte/vkui";
import { UserInfo } from "@vkontakte/vk-bridge";
import { LargeButton } from "../components/ui/buttons/LargeButton";
import { Header } from "../components/Header";
import { Spacing } from "../components/ui/Spacing";
import { Avatar } from "../components/Avatar";
import { Footer } from "../components/Footer";
import { TimerReverse } from "../components/TimerReverse";
import { ListItem } from "../components/ui/ListItem";
import { useNavigate } from "react-router-dom";
import { useAddKisKis, useGetMyUserId, useGetUserData } from "@/hooks/useUser"; 
import { useUserStats } from "../hooks/useUser.ts";
import { useGetMyPlaceInLeaderboard } from "@/hooks/useLeaderboard.ts";
import { RanksNumber } from "@/api/types.ts";
import { useUserAchievements } from "@/hooks/game/useGameUserInfo.tsx";
export interface HomeProps extends NavIdProps {
  fetchedUser?: UserInfo;
}

export const Home: FC<HomeProps> = ({ id }) => {
  const {data: userId} = useGetMyUserId()
  const { mutate: removeKisKis } = useAddKisKis();

  const { data: userData, isLoading, isError, error, refetch: refetchUserData } = useGetUserData(userId);
  const { data: userStat, refetch} = useUserStats();
  const {data: myAchievementList} = useUserAchievements()
  interface RankingDataItem {
    iconName: string;
    route: string;
    text: string;
    value: number;
  }

  const navigate = useNavigate();

  useEffect(() => {
    if (userData) {
      refetchUserData();
      
    }
  }, [userData]);


  const value = {
    score: 0,
    userPosition: 0,
    catsFoundCount: 0,
    achievementsCount: 0,
  };
const [rankingData, setRankingData] = useState<RankingDataItem[]>([]);
const {data: myPlaceInLearedboard} = useGetMyPlaceInLeaderboard()

  useEffect(() => {
    if (userStat) {
      setRankingData(
        [
          {
            iconName: "top",
            route: "",
            text: "Место в рейтинге",
            value: myPlaceInLearedboard ??  0,
          },
          {
            iconName: "score",
            route: "",
            text: "Счет",
            value: userStat.points,
          },

          {
            iconName: "search",
            route: "",
            text: "Найдено котиков",
            value: userStat.countFindCats,
          },
          {
            iconName: "achievements",
            route: "",
            text: "Открыто достижений",
            value: myAchievementList?.length ?? 0,
          }
          
        
        ]
      )
    }
  }, [userStat, myPlaceInLearedboard]);

  useEffect(() => {
    // Обновление данных при монтировании компонента или возврате на страницу
    refetch();
  }, [refetch]);

  const {data: userStats} = useUserStats()
  const [rankNumber, setRankNumber] = useState<RanksNumber>(1)
  useEffect (() => {
    if (userStats) {
      console.log(userStats)
      
      setRankNumber(userStats.rank)
      
    }
  }, [userStats])


  const handleStartGame = () => {
    removeKisKis(-10)
    navigate("/GameScreen")
  }

  return (
    <>
      <Panel id={id}>
        <div className="px-6">
          <Header text="Меню" />

          <div className="">
            <Spacing />
            <div>
              <div className="flex relative my-7 ">
                <Avatar typeBaseAvatar={1} typeRank={rankNumber} className="mr-6"  />
                <div className="h-full flex flex-col gap-2">
                  <h3 className="text-[1.0625rem] mt-3 font-bold leading-[1.375rem]">
                    {userData?.name}
                  </h3>
                  <p className="text-[#8484f0] leading-[1.125rem]">
                    {userStat?.rank_name}
                  </p>
                </div>
              </div>
            </div>

            <Spacing />
            <div>
              {rankingData.map((item, index) => (
                <ListItem
                  key={index}
                  iconName={item.iconName}
                  route={item.route}
                  text={item.text}
                  value={String(item.value)}
                />
              ))}

              <LargeButton
                className=""
                text={"Играть за 10 кис-кисов"}
                onClick={handleStartGame}
              />
              <div className="flex justify-center text-primary">
                {/* <p>или через </p>
                <TimerReverse
                  isPause={false}
                  startTime={86400}
                  onEnd={() => {
                    console.log("onEnd timer");
                  }}
                  className="ml-3"
                /> */}
              </div>
            </div>
          </div>
        </div>
        
        {/* <Footer /> */}
      </Panel>
    </>
  );
};
