import { useQuery } from "@tanstack/react-query";
import { getUserFetcher } from "../api/appInfo/user";

export const useUser = () => {
  const { data: userResponse } = useQuery({
    queryKey: ["user1"],
    queryFn: async () => await getUserFetcher(),
    retry: 3,
    staleTime: 1000 * 60 * 5,
    // refetchOnWindowFocus: false,
    // refetchOnMount: true,
    // refetchOnReconnect: true,
  });

  return {
    userResponse,
  };
};
