import { message } from "antd";
import axios from "axios";
import { httpClient, BASE_URL } from "../config/develop-config";

export class AuthDatasource {
  static login(username: string, password: string) {
    return axios
      .post(BASE_URL + "/auth/login-user-staff", {
        username,
        password,
      })
      .then((response) => {
        if (response.data.accessToken) {
          localStorage.setItem("username", JSON.stringify(response.data));
        }
        return response.data;
      });
  }

  static logout() {
    localStorage.removeItem("username");
  }
}
