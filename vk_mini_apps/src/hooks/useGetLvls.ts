import { useQuery } from "@tanstack/react-query";
import { getLvls } from "../api/admin/gameLvl";

export const useGetLvls = () => {
  return useQuery({
    queryKey: ["rating-top5"],
    queryFn: async () => await getLvls(),
    retry: 3,
    staleTime: 1000 * 60 * 5,
    refetchOnWindowFocus: false,
    refetchOnMount: true,
    refetchOnReconnect: true,
  });
};
