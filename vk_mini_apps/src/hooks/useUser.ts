import { useQuery, useMutation } from "@tanstack/react-query";
import { getUserFetcher, createUserFetcher } from "../api/appInfo/user";

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
export const useCreateUser = () => {
  return useMutation({
    mutationFn: async (formData) => {
      

      try {
        const result = await createUserFetcher(formData);

        return result;
      } catch (error) {
        console.error("Error:", error);
        throw error;
      }
    },
    retry: 3,
  });
};
