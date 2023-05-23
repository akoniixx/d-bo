import { BASE_URL, httpClient } from "../config/develop-config";
import {
  PlanningPointListEntity,
  ReceivePointListEntity,
} from "../entities/PointReceiveEntities";

export class PointReceiveDatasource {
  static getPlanningPoint(
    status: string,
    take?: number,
    page?: number,
    search?: string,
    taskNo?: string,
    startDate?: string,
    endDate?: string
  ): Promise<PlanningPointListEntity> {
    const params = {
      status: status,
      take: take,
      page: page,
      search: search,
      taskNo: taskNo,
      startDate: startDate,
      endDate: endDate,
    };
    return httpClient
      .get(BASE_URL + "/tasks/task-estimate-point/task-estimate-point-bo", {
        params,
      })
      .then((response) => {
        return response.data;
      })
      .catch((err) => {
        console.log(err, "err getnewtask");
      });
  }

  static getReceivePoint(
    take?: number,
    page?: number
  ): Promise<ReceivePointListEntity> {
    const params = {
      take: take,
      page: page,
    };
    return httpClient
      .get(BASE_URL + "/promotion/historypoint-quota/getallhistory", { params })
      .then((response) => {
        return response.data;
      })
      .catch((err) => {
        console.log(err, "err getCoupon");
      });
  }
}
