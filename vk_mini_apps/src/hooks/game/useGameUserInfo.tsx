import { useMutation, useQuery } from  "@tanstack/react-query";
import { getMyAchievementsFetcher, incrementFindCatsFetcher, incrementPointsFetcher } from "../../api/game/gameUserInfo";




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
        console.log(result);
        
        return result; // Возвращаем результат, который станет доступным в `mutateAsync`
        
      } catch (error) {
        console.error(error);
        throw error;
      }
    },
  });
};


import { getAllAchievementsFetcher, Achievement } from "../../api/game/gameUserInfo";

// Хук для получения всех достижений
export const useAchievements = () => {
  return useQuery<Achievement[], Error>({
    queryKey: ["achievements"],
    queryFn: getAllAchievementsFetcher,

  });
};

// Хук для получения достижений конкретного пользователя
export const useUserAchievements = () => {
  return useQuery({
    queryKey: ["userAchievements"],
    queryFn: () => getMyAchievementsFetcher(),
  });
};