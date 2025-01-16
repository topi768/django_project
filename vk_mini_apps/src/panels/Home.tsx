import { FC, useEffect , useState} from "react";
import { Panel, NavIdProps } from "@vkontakte/vkui";
import { UserInfo } from "@vkontakte/vk-bridge";
import { useRouteNavigator } from "@vkontakte/vk-mini-apps-router";
import { LargeButton } from "../components/ui/buttons/LargeButton";
import { Header } from "../components/Header";
import { Spacing } from "../components/ui/Spacing";
import { Avatar } from "../components/Avatar";
import { Footer } from "../components/Footer";
import { TimerReverse } from "../components/TimerReverse";
import { ListItem } from "../components/ui/ListItem";
import { useUser } from "../hooks/useUser.ts";
import { useNavigate } from "react-router-dom";
import { useGetUserData } from "@/hooks/useUser"; 
import { useCountryList, useCitiesList } from "../hooks/useCountryList";

export interface HomeProps extends NavIdProps {
  fetchedUser?: UserInfo;
}

export const Home: FC<HomeProps> = ({ id }) => {
  const { data: userData, isLoading, isError, error } = useGetUserData(Number(localStorage.getItem("user_id") ));
  const { data: countryList } = useCountryList();

  useEffect(() => {
    if (userData){
      console.log("userData:", userData); 

    }
  }, [userData]);
  
  function getAgeFromBirthDate(birthDateString: string): number {
    // Преобразуем строку в объект даты
    const birthDate = new Date(birthDateString);
  
    if (isNaN(birthDate.getTime())) {
      throw new Error("Неверный формат даты. Ожидается строка вида 'ГГГГ-ММ-ДД'.");
    }
  
    // Текущая дата
    const today = new Date();
  
    // Вычисляем возраст
    let age = today.getFullYear() - birthDate.getFullYear();
  
    // Проверяем, был ли день рождения в этом году
    const hasHadBirthdayThisYear =
      today.getMonth() > birthDate.getMonth() ||
      (today.getMonth() === birthDate.getMonth() && today.getDate() >= birthDate.getDate());
  
    // Если день рождения ещё не был в этом году, уменьшаем возраст на 1
    if (!hasHadBirthdayThisYear) {
      age--;
    }
  
    return age;
  
  }
  const navigate = useNavigate();
  const routeNavigator = useRouteNavigator();
  const { userResponse } = useUser();
  const [country, setCountry] = useState<string>("");
  useEffect(() => {
    if (countryList) {
      const country = countryList.find((country) => country.country_code === userData?.country)?.country_name;
      if (country) {
        setCountry(country);
        console.log("country:", country);
        
      }
    }
  }, [countryList, userData]);
  const value = {
    score: 0,
    userPosition: 0,
    catsFoundCount: 0,
    achievementsCount: 0,
  };
  const rankingData = [
    {
      iconName: "",
      route: "",
      text: "Страна",
      value: userData?.country ? country : "Не указано",
    },
    {
      iconName: "",
      route: "",
      text: "Город",
      value: userData?.city ? userData.city : "Не указано",
    },
    {
      iconName: "",
      route: "",
      text: "Возраст",
      value: userData?.date_of_birth ? getAgeFromBirthDate(userData.date_of_birth) : "Не указано", 
    },

    {
      iconName: "score",
      route: "",
      text: "Счет",
      value: value?.score,
    },
    {
      iconName: "top",
      route: "",
      text: "Место в рейтинге",
      value: value?.userPosition,
    },
    {
      iconName: "score",
      route: "",
      text: "Найдено котиков",
      value: value?.catsFoundCount,
    },
    {
      iconName: "achievements",
      route: "",
      text: "Открыто достижений",
      value: value?.achievementsCount,
    },
  ];

  return (
    <>
      <Panel id={id}>
        <div className="px-6">
          <Header text="Меню" />

          <div className="">
            <Spacing />
            <div>
              <div className="flex relative my-7 ">
                <Avatar className="mr-6" typeRank={7} />
                <div className="h-full flex flex-col gap-2">
                  <h3 className="text-[1.0625rem] mt-3 font-bold leading-[1.375rem]">
                    {userData?.name}
                  </h3>
                  <p className="text-[#8484f0] leading-[1.125rem]">
                    {"Сержант Кискисенко "}
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
                onClick={() => navigate("/GameScreen")}
              />
              <div className="flex justify-center text-primary">
                <p>или через </p>
                <TimerReverse
                  isPause={false}
                  startTime={86400}
                  onEnd={() => {
                    console.log("onEnd timer");
                  }}
                  className="ml-3"
                />
              </div>
            </div>
          </div>
        </div>
        
        <Footer />
      </Panel>
    </>
  );
};
