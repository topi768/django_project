import { apiUrls, instance } from "../instance";
import { Country, City } from '../../types';


export const fetchCountryList = async (): Promise<Country[]> => {
  const response = await instance.get('api/countryList');
  // Очищаем пробелы в начале и конце строки для каждой страны
  return response.data.map((country: Country) => ({
    ...country,
    country_name: country.country_name.trim() // Убираем пробелы из имени страны
  }));
};
export const fetchCitiesList = async (country_code: string): Promise<City[]> => {
  const response = await instance.get(`api/cities/${country_code}`)
  return response.data
}