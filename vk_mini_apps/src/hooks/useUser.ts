import { useQuery, useMutation } from "@tanstack/react-query";
import { getUserFetcher, createUserFetcher } from "../api/appInfo/user";
import {RegistrationFormData} from "@/types";
import { useState } from "react";

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
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const mutation = useMutation({
    mutationFn: async (formData: RegistrationFormData) => {
      try {
        const result = await createUserFetcher(formData);
        return result;
      } catch (error: any) {
        if (error.response) {
          console.error("Response error:", error.response.data);
          // Устанавливаем ошибку в состояние
          setErrorMessage(error.response.data || 'Unknown error');
          throw {
            message: error.message,
            response: error.response.data,
          };
        } else {
          console.error("Request error:", error.message);
          setErrorMessage(error.message || 'Unknown error');
          throw error;
        }
      }
    },
    retry: 1,
  });

  return {
    ...mutation,
    errorMessage,
  };
};