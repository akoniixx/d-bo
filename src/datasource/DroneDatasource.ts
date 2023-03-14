import {
  CreateDroneBrandEntity,
  CreateDroneEntity,
  DroneBrandEntity,
  DroneBrandListEntity,
  UpdateDroneBrand,
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

  static CreateDroneList(data: CreateDroneEntity): Promise<any> {
    delete data.id;
    return httpClient
      .post(BASE_URL + "/drone", data)
      .then((response) => {
        return response.data;
      })
      .catch((error) => {
        console.log(error);
      });
  }

  static UpdateDroneList(data: CreateDroneEntity): Promise<any> {
    return httpClient
      .patch(BASE_URL + "/drone/" + data.id, data)
      .then((response) => {
        return response.data;
      })
      .catch((error) => {
        console.log(error);
      });
  }

  static deleteDroneList(data: CreateDroneEntity) {
    return httpClient
      .delete(BASE_URL + "/drone/" + data.id)
      .then((response) => {
        return response.data;
      })
      .catch((error) => {
        console.log(error);
      });
  }

  //DroneBrand
  static getDroneBrandList(
    search?: string
  ): Promise<DroneBrandListEntity> {
    const params = {
      search: search,
    };
    return httpClient
      .get(BASE_URL + "/drone-brand", { params })
      .then((response) => {
        return response.data;
      })
      .catch((error) => {
        console.log(error);
      });
  }

  static getDrone(
    page: number,
    row: number,
    droneBrandId: string
  ): Promise<any> {
    const params = {
      page: page,
      take: row,
      droneBrandId: droneBrandId,
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
  static addDroneBrand(data: CreateDroneBrandEntity): Promise<any> {
    var id: any = "id";
    var droneBrandId: any = "droneBrandId";
    delete data.drone[id];
    delete data.drone[droneBrandId];
    return httpClient
      .post(BASE_URL + "/drone-brand", data)
      .then((response) => {
        return response.data;
      })
      .catch((error) => {
        console.log(error);
      });
  }
  static deleteDroneBrand(id?: string) {
    return httpClient
      .delete(BASE_URL + "/drone-brand/" + id)
      .then((response) => {
        return response.data;
      })
      .catch((error) => {
        console.log(error);
      });
  }
  static getDroneBrandById(id: string): Promise<DroneBrandEntity> {
    return httpClient
      .get(BASE_URL + "/drone-brand/" + id)
      .then((response) => {
        return response.data;
      })
      .catch((err) => {
        console.log(err);
      });
  }
  static updateDroneBrand(data: DroneBrandEntity): Promise<any> {
    return httpClient
      .patch(BASE_URL + "/drone-brand/" + data.id, data)
      .then((response) => {
        return response.data;
      })
      .catch((err) => {
        console.log(err);
      });
  }
}
