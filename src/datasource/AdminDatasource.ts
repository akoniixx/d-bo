import { httpClient } from "../config/develop-config";
import {
  UserStaffEntity,
  UserStaffPageEntity,
} from "../entities/UserStaffEntities";
const API_URL = "https://api-dev-dnds.iconkaset.com";

export class AdminDatasource {
  static getAdminList(
    page: number,
    row: number,
    status?: boolean,
    role?: string
  ): Promise<UserStaffPageEntity> {
    const params = {
      role: role,
      isActive: status,
      page: page,
      limit: row,
    };
    return httpClient
      .get(API_URL + "/user-staff", { params })
      .then((response) => {
        return response.data;
      })
      .catch((err) => {
        console.log(err, "err getAdmin");
      });
  }

  static getAdminById(id: string): Promise<UserStaffEntity> {
    return httpClient
      .get(API_URL + "/user-staff/" + id)
      .then((response) => {
        return response.data;
      })
      .catch((err) => {
        console.log(err, "err getAdminBy" + id);
      });
  }

  static insertAdmin(data: UserStaffEntity): Promise<any> {
    const params = {
      email: data.email,
      username: data.username,
      password: data.password,
      role: data.role,
      firstname: data.firstname,
      lastname: data.lastname,
      isActive: data.isActive,
    };
    return httpClient
      .post(API_URL + "/user-staff", params)
      .then((response) => {
        return response.data;
      })
      .catch((err) => {
        return err.message;
      });
  }

  static updateAdmin(data: UserStaffEntity): Promise<any> {
    const params = {
      email: data.email,
      username: data.username,
      role: data.role,
      firstname: data.firstname,
      lastname: data.lastname,
      isActive: data.isActive,
    };
    return httpClient
      .patch(API_URL + "/user-staff/" + data.id, params)
      .then((response) => {
        return response.data;
      })
      .catch((err) => {
        return err.message;
      });
  }
}
