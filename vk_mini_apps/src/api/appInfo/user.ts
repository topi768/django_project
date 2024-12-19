import { apiUrls, instance } from "../instance";

export const getUserFetcher = async () => {
  const response = await instance.get(apiUrls.appInfo.user);

  return response.data;
};
