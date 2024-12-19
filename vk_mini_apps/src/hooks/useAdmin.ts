import { useQuery } from "@tanstack/react-query";
import { getAchievementFetcher } from "../api/appInfo/admin.ts";

export const useAdmin = () => {
  const { data: achievement } = useQuery({
    queryKey: ["admin-achievement"],
    queryFn: async () => await getAchievementFetcher(),
    retry: 3,
    staleTime: 1000 * 60 * 5,
    refetchOnWindowFocus: false,
    refetchOnMount: true,
    refetchOnReconnect: true,
  });

  return {
    achievement,
  };
};
