import { useQuery, useMutation, UseMutationResult, useQueryClient   } from "@tanstack/react-query";
import { getUserDataByIdFetcher, createUserFetcher, authTokenFetcher, updateUserFetcher, getMyUserId, deleteAccountFetcher, addKisKisFetcher } from "../api/appInfo/user";
import {RegistrationFormData, UserDataForToken, UserData, UpdateProfileData} from "@/api/types";
import { useState } from "react";
import { getUserStatsFetcher } from "@/api/game/gameUserInfo";
import {loginUserFetcher} from "@/api/appInfo/user"

// export const useUser = () => {
//   const { data: userResponse } = useQuery({
//     queryKey: ["user1"],
//     queryFn: async () => await getUserFetcher(),

//   });

//   return {
//     userResponse,
//   };
// };
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
  });
};

export const useGetUserData = (user_id: number) => {
  return useQuery<UserData, Error>({
    queryKey: ["userData", user_id],
    queryFn: () => getUserDataByIdFetcher(user_id),
    enabled: !!user_id, // Не запрашивать, если user_id = 0 или undefined

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


export const useUserStats = () => {
  return useQuery({
    queryKey: ["userStats"],
    queryFn: () => getUserStatsFetcher(),
  });
};

export const useLogin = () => {
  return useMutation({
    mutationFn: async ({email, password}: {email :string, password: string}) => {
      const data = await loginUserFetcher({email, password})
      return data
    },

      onSuccess: (data) => {
      console.log('Profile login successfully:', data);
    },
    onError: (error) => {
      console.error('Failed to update profile:', error);
    },
  })
}

export const useGetMyUserId = () => {
  return useQuery({
    queryKey: ["user_id"],
    queryFn: () => getMyUserId(),
  });
};
export const useDeleteAccount = () => {
  const queryClient = useQueryClient(); 

  return useMutation({
    mutationFn: () => deleteAccountFetcher(),
    onSuccess: () => {
      queryClient.clear(); // Очищает весь кэш (все данные)
      localStorage.clear(); // Удаляет все данные из localStorage
      sessionStorage.clear(); // Очищает sessionStorage, где хранятся токены
    },
  });
}

export const useAddKisKis = () => {
  return useMutation({
    mutationFn: (incrementCount: number) => addKisKisFetcher(incrementCount),
  });
}