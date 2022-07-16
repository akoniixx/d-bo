import { httpClient } from "../config/develop-config";
import {
  CreateFarmerEntity,
  FarmerPageEntity,
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
    console.log(data);
    return httpClient
      .post(API_URL + "/farmer", data)
      .then((response) => {
        return response.data;
      })
      .catch((err) => {
        console.log(err, "err insertFarmer");
      });
  }
}
