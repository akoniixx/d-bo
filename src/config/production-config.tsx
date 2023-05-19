import axios from "axios";

export const BASE_URL = `https://api-dnds.iconkaset.com`;

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
