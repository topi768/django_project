import { useQuery } from "@tanstack/react-query";
import { lvlsFetcher } from "@/api/game/lvls";
import { LevelsData } from "@/types";
export const useGetLvls = () => {
  return useQuery<LevelsData>({
    queryKey: ["lvls"],
    queryFn: async () => await lvlsFetcher(),
    retry: 3,
    staleTime: 1000 * 60 * 5,
    refetchOnWindowFocus: false,
    refetchOnMount: true,
    refetchOnReconnect: true,
  });
};
