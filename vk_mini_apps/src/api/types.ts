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