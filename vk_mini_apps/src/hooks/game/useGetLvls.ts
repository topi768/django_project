import { useQuery } from "@tanstack/react-query";
import { lvlsFetcher } from "../../api/game/lvls";

export const useGetLvls = () => {
  const { data: userResponse } = useQuery({
    queryKey: ["lvls"],
    queryFn: async () => await lvlsFetcher(),
    retry: 3,
    staleTime: 1000 * 60 * 5,
    refetchOnWindowFocus: false,
    refetchOnMount: true,
    refetchOnReconnect: true,
  });

  return {
    userResponse,
  };
};
