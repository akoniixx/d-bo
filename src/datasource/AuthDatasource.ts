import axios from "axios";
const API_URL = "https://api-dev-dnds.iconkaset.com";

class AuthDatasource {
  login(username: string, password: string) {
    return axios
      .post(API_URL + "/auth/login-user-staff", {
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
  logout() {
    localStorage.removeItem("username");
  }
}
export default new AuthDatasource();
