import React from "react";
import { useRouteNavigator } from "@vkontakte/vk-mini-apps-router";

interface RankingItemProps {
  iconName: string;
  route: string;
  text: string;
  value: string | number;
}

export const ListItem: React.FC<RankingItemProps> = ({
  iconName,
  route,
  text,
  value,
}) => {
  const routeNavigator = useRouteNavigator();

  return (
    <div
      className="flex min-h-[48px] relative items-center md:justify-between md:p-4 md:border-b md:border-gray-300 md:cursor-pointer md:hover:bg-gray-100"
      onClick={route != "" ? () => routeNavigator.push(route) : () => {}}
    >


      
      <div className="flex items-center">
        {
          iconName && (
            <img
            className=" text-black mr-4 my-2 w-8 h-8 md:w-10 md:h-10 md:mr-6"
            src={`/src/assets/icons/${iconName}.svg`}
            alt={text}
          />
          )
        }

        <p className="text-base md:text-[16px] md:font-medium">{text}</p>
      </div >
      <p className="text-sm md:text-lg absolute right-3 md:font-semibold md:text-gray-800">
        {value}
      </p>
    </div>
  );
};
