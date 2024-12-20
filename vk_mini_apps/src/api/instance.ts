import axios from "axios";

export const instance = axios.create({
  baseURL: "http://127.0.0.1:8000/",
  timeout: 3000,
  headers: {
    authorization: `Bearer ${window.location.search?.replace("?", "") || ""}`,
  },
});

export const apiUrls = {
  admin: {
    fileStorage: {
      upload: "/admin/api/filestorage/upload", //post
      delete: "/admin/api/filestorage/file", //delete
    },
    achievements: {
      get: "/admin/api/achievement", //get
    },
    game: {
      lvl: "/admin/api/game-lvl", //post, get, put, delete
    },
  },
  appInfo: {
    user: "/api/findcat/user", //get
    countryList: "/api/countryList", //get
  },
  game: {
    lvls: "/api/findcat/game/lvls", //get
  },

  rating: {
    top5: "/api/findcat/rating/top5", //get
  },
} as const;
