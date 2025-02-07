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
  country_name: string;
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
export interface UpdateProfileData {
  name?: string,
  country?: string ,
  city?: string, 
  date_of_birth?: string
}

export type Coordinates = {
  x: number;
  y: number;
  width: number;
  height: number;
};

export type LevelData = {
  id: number;
  image: string; // Путь к изображению
  coordinates: Coordinates[]; // Массив координат
  created_at: string; // Время создания
  level: number; // Уровень 
};
export type LevelsData = LevelData[];

export type LeaderboardUser = {
  id: number;
  name: string;
  points: number;
  rank: number;
}
export type LeaderboardList = LeaderboardUser[];

export interface UserStats {
  countFindCats: number;
  kisKis: number;
  points: number;
  rank: number;
  rank_name: string;
  
}