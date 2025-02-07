import { instance } from "../instance";
import { instanceWithJWT } from "../instanceWithJWT";

import { UserDataForToken, RegistrationFormData, UserData, UpdateProfileData } from "@/api/types";
// export const getUserFetcher = async () => {
//   const response = await instance.get(apiUrls.appInfo.user);

//   return response.data;
// };
export const createUserFetcher = async (userData: RegistrationFormData) => {
  const response = await instance.post('/auth/users/', userData);
  
  return response.data;
};
export const authTokenFetcher = async (userData: UserDataForToken) => {
  
  const response = await instance.post('/auth/jwt/create', userData);
  return response.data
  }

export const getUserDataByIdFetcher = async (user_id: number): Promise<UserData>  => {
  const response = await instance.get('api/user-account-info/' + user_id);
  
  return response.data;
}

export const updateUserFetcher = async (profileData: UpdateProfileData) => {
  const response = await instanceWithJWT.patch('api/update-profile/', profileData);
  return response.data;
}

export const loginUserFetcher = async ({email, password}: {email: string, password: string}) => {
  
     const response = await instance.post('auth/jwt/create/', {email, password} ) 
     return response.data
}

export const getMyUserId = async () => {
  const response = await instanceWithJWT.get('auth/users/me/');
  return response.data.id;
}

export const deleteAccountFetcher = async () => {
  const response = await instanceWithJWT.post('api/delete-user-soft/');
  return response.data;
}