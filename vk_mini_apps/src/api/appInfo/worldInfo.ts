import { apiUrls, instance } from "../instance";
import { Country, City } from '../types';


export const fetchCountryList = async (): Promise<Country[]>  => {
  const response = await instance.get(apiUrls.appInfo.countryList);

  return response.data;
};
export const fetchCitiesList = async (country_code: string): Promise<City[]> => {
  const response = await instance.get(`api/cities/${country_code}`)
  return response.data
}