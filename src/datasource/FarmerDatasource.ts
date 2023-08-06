import { httpClient, BASE_URL } from "../config/config";
import {
  CreateFarmerEntity,
  FarmerPageEntity,
  GetFarmerEntity,
} from "../entities/FarmerEntities";

export class FarmerDatasource {
  static getFarmerList(
    mainStatus: string[],
    waitPendingDate: string[],
    applicationType: string[],
    page: number,
    row: number,
    status?: string[],
    search?: string,
    provinceId?: number,
    districtId?: number,
    subdistrictId?: number,
    sortDirection?: string,
    sortField?: string
  ): Promise<FarmerPageEntity> {
    const params = {
      mainStatus: mainStatus,
      waitPendingDate: waitPendingDate,
      applicationType: applicationType,
      status: status,
      page: page,
      take: row,
      search: search,
      provinceId: provinceId,
      districtId: districtId,
      subdistrictId: subdistrictId,
      sortDirection: sortDirection,
      sortField: sortField,
    };
    return httpClient
      .get(BASE_URL + "/farmer", { params })
      .then((response) => {
        return response.data;
      })
      .catch((err) => {
        console.log(err, "err getFarmer");
      });
  }

  static insertFarmer(data: CreateFarmerEntity): Promise<any> {
    var id: any = "id";
    var farmerId: any = "farmerId";
    delete data.farmerPlot[id];
    delete data.farmerPlot[farmerId];
    return httpClient
      .post(BASE_URL + "/farmer", data)
      .then((response) => {
        return response.data;
      })
      .catch((err) => {
        console.log(err, "err insertFarmer");
      });
  }

  static getFarmerById(id: string): Promise<GetFarmerEntity> {
    return httpClient
      .get(BASE_URL + "/farmer/" + id)
      .then((response) => {
        return response.data;
      })
      .catch((err) => {
        console.log(err, "err getFarmerid");
      });
  }

  static updateFarmer(data: GetFarmerEntity): Promise<any> {
    return httpClient
      .patch(BASE_URL + "/farmer/" + data.id, data)
      .then((response) => {
        return response.data;
      })
      .catch((err) => {
        console.log(err, "err getFarmerid");
      });
  }
}
