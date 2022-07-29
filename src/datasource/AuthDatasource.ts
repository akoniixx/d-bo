import axios from "axios";
const API_URL = "https://api-dev-dnds.iconkaset.com";

export class AuthDatasource {
  static login(username: string, password: string) {
    return axios
      .post(API_URL + "/auth/user-staff/login", {
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
