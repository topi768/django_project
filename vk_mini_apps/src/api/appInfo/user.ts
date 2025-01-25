import { apiUrls, instance } from "../instance";
import { instanceWithJWT } from "../instanceWithJWT";
import { UserDataForToken, RegistrationFormData, UserData, UpdateProfileData } from "@/types";
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
  }

export const getUserDataFetcher = async (user_id: number): Promise<UserData>  => {
  const response = await instance.get('api/user-account-info/' + user_id);
  
  return response.data;
}

export const updateUserFetcher = async (profileData: UpdateProfileData) => {
  const response = await instanceWithJWT.patch('api/update-profile/', profileData);
  return response.data;
}