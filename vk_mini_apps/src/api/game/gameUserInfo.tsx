import { instance } from "../instance";


export const incrementFindCatsFetcher = async (incrementCats: number): Promise<any> => {
  console.log("incrementFindCatsFetcher: ", incrementCats);

  const userId = localStorage.getItem("user_id");
  if (!userId) {
    throw new Error("User ID not found in localStorage.");
  }

  // Отправляем данные в теле запроса, правильно указывая параметр 'increment'
  const response = await instance.post(`/add-findcats/${userId}/`, {
    increment: incrementCats,  // Передаем данные как объект с ключом 'increment'
  });

  return response.data;
};

export const incrementPointsFetcher = async (incrementPoints: number): Promise<any> => {
  console.log("incrementFindCatsFetcher");

  const userId = localStorage.getItem("user_id");
  if (!userId) {
    throw new Error("User ID not found in localStorage.");
  }

  // Отправляем данные в теле запроса, правильно указывая параметр 'increment'
  const response = await instance.post(`/add-points/${userId}/`, {
    increment: incrementPoints,  // Передаем данные как объект с ключом 'increment'
  });

  return response.data;
};

export interface Achievement {
  id: number;
  name: string;
  description: string;
}

// Фетчер для получения всех достижений
export const getAllAchievementsFetcher = async (): Promise<Achievement[]> => {
  const response = await instance.get("/achievements/");
  return response.data;
};

// Фетчер для получения достижений пользователя
export const getUserAchievementsFetcher = async (userId: number): Promise<Achievement[]> => {
  const response = await instance.get(`/user/${userId}/achievements/`);
  return response.data;
};
interface UserStats {
  countFindCats: number;
  points: number;
  achievements: string[];  // Массив названий достижений пользователя
}
export const getUserStatsFetcher = async (userId: number): Promise<UserStats> => {
  try {
    const response = await instance.get(`/get-user-stats/${userId}`); // URL для получения статистики
    return response.data; // Возвращаем данные статистики
  } catch (error) {
    console.error("Ошибка при получении статистики пользователя", error);
    throw new Error("Не удалось загрузить статистику пользователя");
  }
};