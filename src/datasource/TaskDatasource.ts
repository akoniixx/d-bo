import { BASE_URL, httpClient } from "../config/develop-config";
import { FarmerEntity } from "../entities/FarmerEntities";
import {
  CreateNewTaskEntity,
  NewTaskPageEntity,
} from "../entities/NewTaskEntities";

export class TaskDatasource {
  static getNewTaskList(
    take: number,
    page: number,
    status?: string,
    search?: string,
    startDate?: string,
    endDate?: string
  ): Promise<NewTaskPageEntity> {
    const params = {
      take: take,
      page: page,
      status: status,
      search: search,
      startDate: startDate,
      endDate: endDate,
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
  static insertNewTask(data: CreateNewTaskEntity): Promise<any> {
    return httpClient
      .post(BASE_URL + "/tasks/task", data)
      .then((response) => {
        console.log("response", response.data);
        return response.data;
      })
      .catch((error) => {
        console.log(error);
      });
  }
}
