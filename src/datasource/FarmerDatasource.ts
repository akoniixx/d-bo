import { httpClient } from "../config/develop-config";
import { FarmerEntity, FarmerPageEntity } from "../entities/FarmerEntities";
const API_URL = `https://api-dev-dnds.iconkaset.com`;

export class FarmerDatasource {
  static getFarmerList(
    page: number,
    row: number,
    status?: boolean
  ): Promise<FarmerPageEntity> {
    const params = {
      status: status,
      page: page,
      take: row,
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

  static insertFarmer(data: FarmerEntity): Promise<any> {
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
