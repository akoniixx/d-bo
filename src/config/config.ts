import axios from "axios";

const DEV_URL = 'https://api-dnds-dev.iconkaset.com'
const PROD_URL = 'https://api-dnds.iconkaset.com'

export const BASE_URL = process.env.NODE_ENV === "development" ? DEV_URL : PROD_URL;

const token = JSON.parse(localStorage.getItem("token") || "{  }");

axios.interceptors.request.use(async (config: any) => {
  const token = JSON.parse(localStorage.getItem("token") || "{  }");
  config.headers["Authorization"] = `Bearer ${token}`;
  return config;
});

axios.interceptors.response.use(
  async function (response) {
    return response;
  },
  async function (error) {
    if (401 === error.response.status) {
      localStorage.clear();
      sessionStorage.clear();
      window.location.href = "/";
    }

    return Promise.reject(error);
  }
);

export const httpClient = axios;
export const intanceAuth = axios.create({
  baseURL: BASE_URL,
});

export const axiosFormBo = axios.create({
  headers: {
    "Content-Type": "multipart/form-data",
    Accept: "application/json",
  },
});
