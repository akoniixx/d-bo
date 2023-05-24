import { BASE_URL, httpClient } from "../config/develop-config";
import {
  DetailRedeemFermerEntity,
  RedeemFarmerListEntity,
} from "../entities/RedeemEntities";

export class RedeemDatasource {
  static getRedeemFarmer(
    take: number,
    page: number,
    search?: string,
    startDate?: string,
    endDate?: string,
    status?: string
  ): Promise<RedeemFarmerListEntity> {
    const params = {
      page: page,
      take: take,
      search: search,
      startDate: startDate,
      endDate: endDate,
      status: status,
    };
    return httpClient
      .post(BASE_URL + "/tasks/task/get-task-redeem-point", params)
      .then((response) => {
        return response.data;
      })
      .catch((err) => {
        console.log(err, "err getnewtask");
      });
  }
  static getRedeemFarmerById(id: string): Promise<DetailRedeemFermerEntity> {
    return httpClient
      .get(BASE_URL + `/tasks/task/get-task-redeem-point-detail/${id}`)
      .then((response) => {
        return response.data;
      })
      .catch((err) => {
        console.log(err, "err getnewtask");
      });
  }
}
