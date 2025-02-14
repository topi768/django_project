import { FC, useEffect, useState } from "react";
import { Panel, NavIdProps } from "@vkontakte/vkui";
import { UserInfo } from "@vkontakte/vk-bridge";
import { Header } from "../components/Header";
import { Spacing } from "../components/ui/Spacing";
import IconHint from "@/assets/icons/hint.svg";
import { SmallButton } from "../components/ui/buttons/SmallButton";
import { LargeButton } from "../components/ui/buttons/LargeButton";
import { Footer } from "../components/Footer";
import AdVideo from "@/components/AdVideo";
import { useAddKisKis, useGetMyUserId, useGetUserData, useUserStats } from "@/hooks/useUser";

export interface СurrencyPurchaserops extends NavIdProps {
  fetchedUser?: UserInfo;
}

export const СurrencyPurchase: FC<СurrencyPurchaserops> = ({ id }) => {
  const { mutate: addKisKis } = useAddKisKis();
  const [isAdPlays, setIsPlays] = useState(false);
  const { data: userData, refetch: refetchUserData } = useUserStats();
  const [showNotification, setShowNotification] = useState(false);

  const handleOnEndAd = () => {
    setIsPlays(false);
    addKisKis(10, {
      onSuccess: () => {
        refetchUserData(); // Запросим свежие данные только после успешного добавления kisKis
        setShowNotification(true);
        setTimeout(() => {
          setShowNotification(false);
        }, 3000);
      },
    });
  };

  return (
    <Panel id={id} className="w-full h-full relative">
      <div className="w-full h-full px-6">
        <Header text="Кис-Кисы" />

        <Spacing />

        <div className="flex items-center py-4">
          <IconHint />
          <p className="ml-3">{userData?.kisKis ?? 0} Кис-Кисов</p> 
        </div>

        <Spacing />

        {isAdPlays ? (
          <AdVideo onEnd={handleOnEndAd} />
        ) : (
          <LargeButton
            text="Получить бесплатно"
            isWithWatchIcon={true}
            className="mt-4"
            onClick={() => setIsPlays(true)}
          />
        )}
      </div>

      {/* Уведомление об успешном добавлении */}
      <div
        className={`fixed top-5 right-5 bg-green-500 text-white px-4 py-2 rounded shadow-lg transition-all duration-500 ${
          showNotification ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-10"
        }`}
      >
        Кискисы успешно добавились!
      </div>
    </Panel>
  );
};
