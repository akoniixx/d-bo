import { BASE_URL, httpClient } from "../config/develop-config";
import { FarmerEntity } from "../entities/FarmerEntities";
import { NewTaskPageEntity } from "../entities/NewTaskEntities";

export class TaskDatasource {
  static getNewTaskList(
    take: number,
    page: number
  ): Promise<NewTaskPageEntity> {
    const params = {
      take: take,
      page: page,
    };
    return httpClient
      .get(BASE_URL + "/tasks/task", { params })
      .then((response) => {
        return response.data;
      })
      .catch((err) => {
        console.log(err, "err getnewtask");
      });
  }
  static getFarmerList(text?: string): Promise<FarmerEntity[]> {
    return httpClient
      .get(BASE_URL + "/tasks/farmer?search=" + text)
      .then((response) => {
        return response.data;
      })
      .catch((err) => {
        console.log(err, "err getAdmin");
      });
  }
}
