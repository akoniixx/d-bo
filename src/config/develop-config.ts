import axios from "axios";

export const BASE_URL = `https://api-dev-dnds.iconkaset.com`;

// const token = JSON.parse(localStorage.getItem("token") || "{  }");
// axios.interceptors.request.use(async (config: any) => {
//   config.headers["Authorization"] = `Bearer ${token}`;
//   return config;
// });
// export const httpClient = axios;
export const intanceAuth = axios.create({
  baseURL: BASE_URL,
});
