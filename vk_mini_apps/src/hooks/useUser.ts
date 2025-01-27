import { useQuery, useMutation, UseMutationResult  } from "@tanstack/react-query";
import { getUserFetcher,getUserDataFetcher, createUserFetcher, authTokenFetcher, updateUserFetcher } from "../api/appInfo/user";
import {RegistrationFormData, UserDataForToken, UserData, UpdateProfileData} from "@/types";
import { useState } from "react";
import { getUserStatsFetcher } from "@/api/game/gameUserInfo";

export const useUser = () => {
  const { data: userResponse } = useQuery({
    queryKey: ["user1"],
    queryFn: async () => await getUserFetcher(),
    retry: 3,
    staleTime: 1000 * 60 * 5,
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
        const result = await createUserFetcher(formData); // Предполагается, что этот фетчер возвращает данные о созданном пользователе
        return result;
      } catch (error: any) {
        if (error.response) {
          console.error("Response error:", error.response.data);
          // Устанавливаем ошибку в локальное состояние
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
    retry: 1, // Ограничение на количество повторных попыток
  });

  // Возвращаем мутацию вместе с состоянием ошибки
  return {
    ...mutation,
    errorMessage,
  };
};

// Хук для создания токена
export const useCreateUserToken = () => {
  return useMutation({
    mutationFn: async (userData: UserDataForToken) => {
      if (!userData) {
        throw new Error("No data provided");
      }

      try {
        const result = await authTokenFetcher(userData);
        return result; // Возвращаем результат, который станет доступным в `mutateAsync`
      } catch (error) {
        console.error(error);
        throw error;
      }
    },
    retry: 3,
  });
};

export const useGetUserData = (user_id: number) => {
  return useQuery<UserData, Error>({
    queryKey: ["userData"],
    queryFn: async () => await getUserDataFetcher(user_id),
    retry: 3,
    staleTime: 1000 * 60 * 5,
  });
};

export const useUpdateUserProfile = (): UseMutationResult<
  UpdateProfileData, 
  Error, 
  UpdateProfileData
> => {
  return useMutation({
    mutationFn: (formData: UpdateProfileData) => updateUserFetcher(formData),
    onSuccess: (data) => {
      console.log('Profile updated successfully:', data);
    },
    onError: (error) => {
      console.error('Failed to update profile:', error);
    },
  });
};


export const useUserStats = (userId: number) => {
  return useQuery({
    queryKey: ["userStats", userId],
    queryFn: () => getUserStatsFetcher(userId),
    retry: 3,
    staleTime: 1000 * 60 * 5,
    refetchOnWindowFocus: false,
    refetchOnMount: true,
    refetchOnReconnect: true,
  });
};