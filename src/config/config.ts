import axios from "axios";
import moment from "moment";
import { convertBuddhistYear } from "../utilities/ConvertToBuddhistYear";

const DEV_URL = "https://api-dnds-dev.iconkaset.com";
// const PROD_URL = "https://api-dnds.iconkaset.com";
export const BASE_URL =
  process.env.NODE_ENV === "development"
    ? DEV_URL
    : process.env.REACT_APP_URL_HOST;

const token = JSON.parse(localStorage.getItem("token") || "{  }");

axios.interceptors.request.use(async (config: any) => {
  const start: any = localStorage.getItem("MA1");
  const end: any = localStorage.getItem("MA2");

  const dateNow = convertBuddhistYear.toBuddhistYear(
    moment(new Date()),
    "DD MMMM YYYY ช่วงเวลา HH:mm  "
  );

  if (dateNow >= start && dateNow <= end) {
    localStorage.clear();
    sessionStorage.clear();
    window.location.href = "/";
  }
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
