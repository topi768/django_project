import { useQuery } from "@tanstack/react-query";
import { getLvlById } from "../api/admin/gameLvl";

export const useGetLvlById = (id: number) => {
  return useQuery({
    queryKey: ["useGetLvlById"],
    queryFn: async () => await getLvlById(id),
    retry: 3,
    staleTime: 1000 * 60 * 5,
    refetchOnWindowFocus: false,
    refetchOnMount: true,
    refetchOnReconnect: true,
  });
};
