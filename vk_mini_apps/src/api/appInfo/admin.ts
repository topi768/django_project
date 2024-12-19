import { apiUrls, instance } from "../instance";
import FormData from "form-data";

export const uploadFile = async (file: File): Promise<string> => {
  const formData = new FormData();
  formData.append("file", file, file.name);

  const response = await instance.post(
    apiUrls.admin.fileStorage.upload,
    formData,
    {
      headers: {
        ...instance.defaults.headers.common,
        ...formData.getHeaders(),
      },
    },
  );

  return response.data.token;
};

export const getAchievementFetcher = async () => {
  const response = await instance.get(apiUrls.admin.achievements.get);

  return response.data;
};
