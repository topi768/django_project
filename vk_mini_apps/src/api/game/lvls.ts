import { apiUrls, instance } from "../instance";

export const lvlsFetcher = async () => {
  const response = await instance.get(apiUrls.game.lvls);

  return response.data;
};
