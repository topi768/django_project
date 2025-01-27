import { useMutation, useQuery } from  "@tanstack/react-query";
import { getUserAchievementsFetcher, incrementFindCatsFetcher, incrementPointsFetcher } from "../../api/game/gameUserInfo";




export const useIncrementFindCats = () => {
  return useMutation({
    mutationFn: async (countCat: number) => {
      if (!countCat) {
        throw new Error("No data countCat");
      }

      try {
        const result = await incrementFindCatsFetcher(countCat);
        return result; // Возвращаем результат, который станет доступным в `mutateAsync`
      } catch (error) {
        console.error(error);
        throw error;
      }
    },
    retry: 1,
  });
};


export const useIncrementPoints = () => {
  return useMutation({
    mutationFn: async (points: number) => {
      if (!points) {
        throw new Error("No data points");
      }

      try {
        const result = await incrementPointsFetcher(points);
        return result; // Возвращаем результат, который станет доступным в `mutateAsync`
      } catch (error) {
        console.error(error);
        throw error;
      }
    },
    retry: 1,
  });
};


import { getAllAchievementsFetcher, Achievement } from "../../api/game/gameUserInfo";

// Хук для получения всех достижений
export const useAchievements = () => {
  return useQuery<Achievement[], Error>({
    queryKey: ["achievements"],
    queryFn: getAllAchievementsFetcher,
    onSuccess: (data) => {
      console.log("All achievements loaded:", data);
    },
    onError: (error) => {
      console.error("Error fetching achievements:", error);
    },
  });
};

// Хук для получения достижений конкретного пользователя
export const useUserAchievements = (userId: number) => {
  return useQuery<Achievement[], Error>({
    queryKey: ["userAchievements", userId],
    queryFn: () => getUserAchievementsFetcher(userId),
    onSuccess: (data) => {
      console.log(`Achievements for user ${userId}:`, data);
    },
    onError: (error) => {
      console.error(`Error fetching achievements for user ${userId}:`, error);
    },
  });
};