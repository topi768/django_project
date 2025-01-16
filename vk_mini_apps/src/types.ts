export interface RatingTop5Item {
  firstName: string;
  lastName: string;
  name: string;
  score: number;
  avatar: string;
  id: number;
  sex: number;
  userId: string;
}

export interface RatingTop5Response {
  data: RatingTop5Item[];
}
export interface Country {
  country_code: string;
  country_name: string;
}
export interface City {
  city_code: string;
  city: string;
}

export interface RegistrationFormData {
  email: string;
  name: string;
  password: string;
  re_password: string;
  country: string;
  city: string;
  phone?: string;
  date_of_birth?: string;
  interests?: string[];
}
export interface UserDataForToken {
  email: string;
  password: string
}
export interface UserData {
  email: string;
  name: string;
  country: string;
  city: string;
  interests?: string | null;
  phone: string;
  date_of_birth: string;
}