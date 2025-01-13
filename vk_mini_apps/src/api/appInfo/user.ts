import { apiUrls, instance } from "../instance";

export const getUserFetcher = async () => {
  const response = await instance.get(apiUrls.appInfo.user);

  return response.data;
};
export const createUserFetcher = async (userData) => {
  console.log(userData);
  const response = await instance.post('/auth/users/', userData);
  
  return response.data;
};