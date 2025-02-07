import { instance } from "../instance";
import { instanceWithJWT } from "../instanceWithJWT";
import { UserStats } from "../types";


export const incrementFindCatsFetcher = async (incrementCats: number): Promise<any> => {
  const response = await instanceWithJWT.post(`/add-findcats/`, {
    increment: incrementCats, 
  });
  console.log(incrementCats);
  
  return response.data;
};

export const incrementPointsFetcher = async (incrementPoints: number): Promise<any> => {
  console.log(incrementPoints);

  // Отправляем данные в теле запроса, правильно указывая параметр 'increment'
  const response = await instanceWithJWT.post(`/add-points/`, {
    increment: incrementPoints,  // Передаем данные как объект с ключом 'increment'
  });

  return response.data;
};

export interface Achievement {
  id: number;
  name: string;
  description: string;
  maxProgress: number;
}
export interface  MyAchievement extends Achievement {
  currentProgress: number;
}
// Фетчер для получения всех достижений
export const getAllAchievementsFetcher = async (): Promise<Achievement[]> => {
  const response = await instance.get("/achievements/");
  return response.data;
};

export const getMyAchievementsFetcher = async (): Promise<MyAchievement[]> => {
  const response = await instanceWithJWT.get("api/my-achievements/");
  return response.data
}



export const getUserStatsFetcher = async (): Promise<UserStats> => {
  try {
    const response = await instanceWithJWT.get(`/get-user-stats/`); // URL для получения статистики
    
    return response.data; // Возвращаем данные статистики
  } catch (error) {
    console.error("Ошибка при получении статистики пользователя", error);
    throw new Error("Не удалось загрузить статистику пользователя");
  }
};