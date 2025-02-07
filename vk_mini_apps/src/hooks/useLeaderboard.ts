import { getLeaderboardFetcher, getMyPlaceInRankingFetcher } from "@/api/appInfo/rating";
import { useQuery } from "@tanstack/react-query";


export const useGetLeaderboard = () => {
    return useQuery({
        queryKey: ["leaderboard"],
        queryFn: getLeaderboardFetcher,
    });
};
export const useGetMyPlaceInLeaderboard = () => {
    return useQuery({
        queryKey: ["myPlaceInLeaderboard"],
        queryFn: getMyPlaceInRankingFetcher
    })
}