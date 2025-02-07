import { instance } from "../instance";
import { instanceWithJWT } from "../instanceWithJWT";
import { LeaderboardList } from "../types";

export const getLeaderboardFetcher = async (): Promise<LeaderboardList> => {
  const response = await instance.get("api/get_leaderboard/");
  return response.data;
};
export const getMyPlaceInRankingFetcher = async(): Promise<number> => {
  const response = await instanceWithJWT.get("api/get-my-place-in-ranking")
  return response.data
}