import { LevelsData } from "@/types";
import { apiUrls, instance } from "../instance";

export const lvlsFetcher = async (): Promise<LevelsData> => {
  const response = await instance.get('api/get-levels');

  return response.data;
};
