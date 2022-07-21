import { DronerDroneEntity } from './../entities/DronerDroneEntities';
import { BASE_URL, httpClient } from "../config/develop-config";

export class DronerDroneDatasource {
  static getDronerDrone(
    status: string,
    page: number,
    take: number,
    droneId?: string,
    search?: string
  ): Promise<any> {
    const params = {
    status: status,
      page: page,
      take: take,
      droneId:droneId,
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
  static  createDronerDrone(data: DronerDroneEntity) : Promise<any> {
   delete data.id
    return httpClient
    .get(BASE_URL + "/droner-drone", {data})
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      console.log(error);
    });
  }
  static  updateDronerDrone(data: DronerDroneEntity) : Promise<any> {
    return httpClient
    .patch(BASE_URL + "/droner-drone", data.modalDroneIndex)
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      console.log(error);
    });
  }

 
}
