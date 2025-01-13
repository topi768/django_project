import { Icon12ChevronLeft } from "@vkontakte/icons";
import { useEffect, useState } from "react";
import { useRouteNavigator, useActiveVkuiLocation} from "@vkontakte/vk-mini-apps-router";

interface HeaderProps {
  className?: string;
  text: string;
}

export const Header: React.FC<HeaderProps> = ({ className, text }) => {
  const routeNavigator = useRouteNavigator();
  console.log(useActiveVkuiLocation().panel);

  
  const [curPanel, setCurPanel] = useState(useActiveVkuiLocation().panel);
  // useEffect(() => {
  //   setCurPanel(useActiveVkuiLocation().panel);
  // }, [useActiveVkuiLocation().panel]);
  console.log(curPanel);
  const onClick = () => {
    routeNavigator.push("/");
  };

  return (
    <>
      <div className={className}>
        <header className="py-3  h-12 w-full flex align-center ">


        {
          curPanel!= 'home' && <button
          onClick={onClick}
          className=" flex absolute justify-center items-center py-1 px-2 w-8 h-8 rounded-full bg-black  "
        >
          
           <Icon12ChevronLeft  className="text-white" />

          
        </button>
        }


          <div className="w-full h-full flex justify-center items-center ">
            <h1 className="font-NauryzRedKeds text-black  text-[1.375rem] font-bold leading-[1.625rem] justify-center ">
              {text}
            </h1>
          </div>
        </header>
      </div>
    </>
  );
};
