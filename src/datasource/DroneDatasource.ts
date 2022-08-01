import {
  DroneBrandEntity,
  DroneBrandListEntity,
} from "./../entities/DroneBrandEntities";
import { DroneEntity, DroneListEntity } from "./../entities/DroneEntities";
import { BASE_URL, httpClient } from "../config/develop-config";

export class DroneDatasource {
  static getDroneList(
    page: number,
    row: number,
    droneBrandId?: string,
    search?: string
  ): Promise<any> {
    const params = {
      page: page,
      take: row,
      droneBrandId: droneBrandId,
      search: search,
    };
    return httpClient
      .get(BASE_URL + "/drone", { params })
      .then((response) => {
        return response.data;
      })
      .catch((error) => {
        console.log(error);
      });
  }

  static getDroneListByID(id: string): Promise<any> {
    return httpClient
      .get(`${BASE_URL}/drone/${id}`)
      .then((res) => {
        return res.data;
      })
      .catch((err) => {
        console.log(err, "err getDroneListById");
      });
  }

  static CreateDroneList(data: DroneEntity): Promise<any> {
    return httpClient
      .post(BASE_URL + "/drone", { data })
      .then((response) => {
        return response.data;
      })
      .catch((error) => {
        console.log(error);
      });
  }

  static UpdateDroneList(data: any): Promise<any> {
    return httpClient
      .patch(BASE_URL + "/drone", { data })
      .then((response) => {
        return response.data;
      })
      .catch((error) => {
        console.log(error);
      });
  }

  static deleteDroneList(id: string) {
    return httpClient
      .delete(BASE_URL + "/drone" + id)
      .then((response) => {
        return response.data;
      })
      .catch((error) => {
        console.log(error);
      });
  }

  static getDroneBrandList(): Promise<any> {
    return httpClient
      .get(BASE_URL + "/drone-brand")
      .then((response) => {
        return response.data;
      })
      .catch((error) => {
        console.log(error);
      });
  }
}
