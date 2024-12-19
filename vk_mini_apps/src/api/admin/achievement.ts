import { apiUrls, instance } from "../instance";

export const getAchiement = async () => {
  const response = await instance.get(apiUrls.admin.achievements.get);

  return response.data;
};
