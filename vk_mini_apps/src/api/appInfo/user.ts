import { apiUrls, instance } from "../instance";
import { UserDataForToken, RegistrationFormData } from "@/types";
export const getUserFetcher = async () => {
  const response = await instance.get(apiUrls.appInfo.user);

  return response.data;
};
export const createUserFetcher = async (userData: RegistrationFormData) => {
  const response = await instance.post('/auth/users/', userData);
  
  return response.data;
};
export const authTokenFetcher = async (userData: UserDataForToken) => {
  
  const response = await instance.post('/auth/jwt/create', userData);
  return response.data
  ;}