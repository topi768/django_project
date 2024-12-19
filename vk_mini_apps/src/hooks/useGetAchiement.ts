import { useQuery } from "@tanstack/react-query";
import { getAchiement } from "../api/admin/achievement";

export const useGetAchiement = () => {
  return useQuery({
    queryKey: ["useGetAchiement"],
    queryFn: async () => await getAchiement(),
    retry: 3,
    staleTime: 1000 * 60 * 5,
    refetchOnWindowFocus: false,
    refetchOnMount: true,
    refetchOnReconnect: true,
  });
};
