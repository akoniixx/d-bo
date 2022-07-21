import { httpClient } from "../config/develop-config";
import {
  CreateFarmerEntity,
  FarmerPageEntity,
  GetFarmerEntity,
} from "../entities/FarmerEntities";
const API_URL = `https://api-dev-dnds.iconkaset.com`;

export class FarmerDatasource {
  static getFarmerList(
    page: number,
    row: number,
    status?: string,
    search?: string,
    provinceId?: number,
    districtId?: number,
    subdistrictId?: number
  ): Promise<FarmerPageEntity> {
    const params = {
      status: status,
      page: page,
      take: row,
      search: search,
      provinceId: provinceId,
      districtId: districtId,
      subdistrictId: subdistrictId,
    };
    return httpClient
      .get(API_URL + "/farmer", { params })
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
      .post(API_URL + "/farmer", data)
      .then((response) => {
        return response.data;
      })
      .catch((err) => {
        console.log(err, "err insertFarmer");
      });
  }

  static getFarmerById(id: string): Promise<GetFarmerEntity> {
    return httpClient
      .get(API_URL + "/farmer/" + id)
      .then((response) => {
        return response.data;
      })
      .catch((err) => {
        console.log(err, "err getFarmerid");
      });
  }

  static updateFarmer(data: GetFarmerEntity): Promise<any> {
    return httpClient
      .patch(API_URL + "/farmer/" + data.id, data)
      .then((response) => {
        console.log("respo", response);
        return response.data;
      })
      .catch((err) => {
        console.log(err, "err getFarmerid");
      });
  }
}
