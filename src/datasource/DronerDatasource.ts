import { DronerEntity, CreateDronerEntity } from './../entities/DronerEntities';
import { BASE_URL, httpClient } from "../config/develop-config";

export class DronerDatasource {
  static getDronerList(
    status: string,
    provinceId : number,
    districtId : number,
    subdistrictId : number,
    page: number,
    take: number,
    sortDirection: string,
    search?: string
  ): Promise<any> {
    const params = {
      status: status,
      provinceId : provinceId,
      districtId : districtId,
      subdistrictId : subdistrictId,
      page: page,
      take: take,
      sortDirection: sortDirection,
      search: search,
    };
    return httpClient
      .get(BASE_URL + "/droner", { params })
      .then((response) => {
        return response.data;
      })
      .catch((error) => {
        console.log(error);
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
