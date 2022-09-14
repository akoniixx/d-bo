import {
  DronerDroneEntity,
  DronerDroneListEntity,
  GetDronerDroneEntity,
} from "./../entities/DronerDroneEntities";
import { BASE_URL, httpClient } from "../config/develop-config";

export class DronerDroneDatasource {
  static getDronerDrone(
    page: number,
    row: number,
    status?: string,
    droneId?: string,
    droneBrandId?: string,
    search?: string
  ): Promise<DronerDroneListEntity> {
    const params = {
      page: page,
      take: row,
      status: status,
      droneId: droneId,
      droneBrandId: droneBrandId,
      search: search,
    };
    return httpClient
      .get(BASE_URL + "/droner-drone", { params })
      .then((response) => {
        return response.data;
      })
      .catch((error) => {
        console.log(error);
      });
  }
  static getDronerDroneById(id: string): Promise<GetDronerDroneEntity> {
    return httpClient
      .get(BASE_URL + "/droner-drone/" + id)
      .then((res) => {
        return res.data;
      })
      .catch((err) => {
        console.log(err);
      });
  }
  static createDronerDrone(data: DronerDroneEntity): Promise<any> {
    return httpClient
      .post(BASE_URL + "/droner-drone", { data })
      .then((response) => {
        return response.data;
      })
      .catch((error) => {
        console.log(error);
      });
  }
  static updateDronerDrone(data: DronerDroneEntity): Promise<any> {
    console.log("param", data);
    return httpClient
      .patch(BASE_URL + "/droner-drone/" + data.droneId, data)
      .then((response) => {
        return response.data;
      })
      .catch((error) => {
        console.log(error);
      });
  }
  static updateDroneList(data: GetDronerDroneEntity): Promise<any> {
    return httpClient
      .patch(BASE_URL + "/droner-drone/" + data.id, data)
      .then((response) => {
        return response.data;
      })
      .catch((error) => {
        console.log(error);
      });
  }
}
