import { FC } from "react";
import { Panel, NavIdProps } from "@vkontakte/vkui";
import { UserInfo } from "@vkontakte/vk-bridge";
import { Header } from "../components/Header";
import { Spacing } from "../components/ui/Spacing";
import IconHint from "@/assets/icons/hint.svg";
import { SmallButton } from "../components/ui/buttons/SmallButton";
import { LargeButton } from "../components/ui/buttons/LargeButton";
import { Footer } from "../components/Footer";

export interface СurrencyPurchaserops extends NavIdProps {
  fetchedUser?: UserInfo;
}

export const СurrencyPurchase: FC<СurrencyPurchaserops> = ({ id }) => {
  return (
    <Panel id={id} className="w-full h-full ">
      <div className="w-full h-full px-6">
        <Header text="Кис-Кисы" />
        <Spacing />
        <div className="flex items-center py-4">
          <IconHint />
          <p className="ml-3">5 Кис-Кисов</p>
        </div>

        <Spacing />
        <div className="flex justify-between my-4 ">
          <p className="font-[400]">5 кис-кисов</p>
          <SmallButton text="7 голосов" />
        </div>
        <div className="flex justify-between my-4 ">
          <p className="font-[400]">10 кис-кисов</p>
          <SmallButton text="14 голосов" />
        </div>
        <div className="flex justify-between my-4 ">
          <p className="font-[400]">15 кис-кисов</p>
          <SmallButton text="21 голосов" />
        </div>
        <div className="flex justify-between my-4 ">
          <p className="font-[400]">20 кис-кисов</p>
          <SmallButton text="28 голосов" />
        </div>
        <LargeButton
          text="Получить бесплатно"
          isWithWatchIcon={true}
          className="mt-4"
        />
        <Footer />
      </div>
    </Panel>
  );
};
