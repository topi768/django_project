import { useQuery } from "@tanstack/react-query";
import { lvlsFetcher } from "../../api/game/lvls";

export const useGetLvls = () => {
  return useQuery({
    queryKey: ["lvls"],
    queryFn: async () => await lvlsFetcher(),

  });


};
