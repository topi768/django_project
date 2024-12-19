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
