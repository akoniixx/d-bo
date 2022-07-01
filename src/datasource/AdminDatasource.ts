import { httpClient } from "../config/develop-config";
import { UserStaffCreate } from "../entities/UserStaffEntities";
const API_URL = "https://api-dev-dnds.iconkaset.com";

export class AdminDatasource {
  static getAdminList(): Promise<UserStaffCreate[]> {
    return httpClient
      .get(API_URL + "/user-staff")
      .then((response) => {
        return response.data;
      })
      .catch((err) => {
        console.log(err, "err getAdmin");
      });
  }
  static insertAdmin(params : UserStaffCreate): Promise<UserStaffCreate> {
    return httpClient
      .post(API_URL + "/user-staff",{params})
      .then((response) => {
        return response.data;
      })
      .catch((err) => {
        console.log(err, "err getAdmin");
      });
  }
}
