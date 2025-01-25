import { useQuery } from "@tanstack/react-query";
import { fetchCountryList, fetchCitiesList} from "../api/appInfo/worldInfo";

export const useCountryList = () => {
  return useQuery({
    queryKey: ["useCountryList"],
    queryFn: async () => await fetchCountryList(),
    retry: 3,
    staleTime: 1000 * 60 * 5,
    refetchOnWindowFocus: false,
    refetchOnMount: true,
    refetchOnReconnect: true,
  });
};

export const useCitiesList = (country_code: string) => {
    return useQuery(
        {
      queryKey: ["useCitiesList", country_code],
      queryFn: async () => await fetchCitiesList(country_code),
      enabled: !!country_code,
      retry: 3,
      staleTime: 1000 * 60 * 5,
      refetchOnWindowFocus: false,
      refetchOnMount: true,
      refetchOnReconnect: true,
    });
  };
  