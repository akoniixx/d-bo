import { DroneListEntity } from './../entities/DroneEntities';
import { DronerEntity, CreateDronerEntity } from './../entities/DronerEntities';
import { BASE_URL, httpClient } from "../config/develop-config";

export class DronerDatasource {
  static getDronerList(
    page: number,
    row: number,
    status?: string,
    provinceId?: number,
    districtId? : number,
    subdistrictId?: number,
    droneBrandId?: string,
    search?: string
  ): Promise<DroneListEntity> {
    const params = {
      status: status,
      page: page,
      take: row,
      provinceId : provinceId,
      districtId : districtId,
      subdistrictId : subdistrictId,
      droneBrandId: droneBrandId,
      search: search,
    };
    return httpClient
      .get(BASE_URL + "/droner", { params })
      .then((response) => {
        return response.data;
      })
      .catch((error) => {
        console.log(error, "err getDroner");
      });
  }
  static getDronerByID(id: string): Promise<any> {
    return httpClient
      .get(BASE_URL+"/droner/" + id)
      .then((res) => {
        return res.data;
      })
      .catch((err) => {
        console.log(err, "err getDronerListById");
      });
  }
  static updateDroner(data: DronerEntity): Promise<any> {
    return httpClient
      .patch(BASE_URL + "/droner/" + data.id , data )
      .then((response) => {
        return response.data;
      })
      .catch((error) => {
        console.log(error);
      });
  }
  static createDronerList(data:CreateDronerEntity): Promise<any> {
    // var id: any = "id"
    // var dronerId: any = "dronerId"
    // delete data.dronerDrone[id];
    // delete data.dronerDrone[dronerId];
    return httpClient
      .post(BASE_URL + "/droner", data)
      .then((response) => {
        return response.data;
      })
      .catch((error) => {
        console.log(error);
      });
  }
  static deleteDronerList(id: string) {
    return httpClient
      .delete(BASE_URL + "/droner" + id)
      .then((response) => {
        return response.data;
      })
      .catch((error) => {
        console.log(error);
      });
  }
}
