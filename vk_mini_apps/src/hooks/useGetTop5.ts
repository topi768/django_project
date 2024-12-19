import { useQuery } from "@tanstack/react-query";
import { getRatingTop5 } from "../api/appInfo/rating";

export const useGetRatingTop5 = () => {
  return useQuery({
    queryKey: ["rating-top5"],
    queryFn: async () => await getRatingTop5(),
    retry: 3,
    staleTime: 1000 * 60 * 5,
    refetchOnWindowFocus: false,
    refetchOnMount: true,
    refetchOnReconnect: true,
  });
};
