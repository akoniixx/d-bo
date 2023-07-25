import { BASE_URL, httpClient } from "../config/config";
import {
  CreateDronerTempEntity,
  DeletedDronerTemp,
  TaskDronerTempEntity,
} from "../entities/TaskDronerTemp";

export class TaskDronerTempDataSource {
  static getDronerList(taskId: string): Promise<TaskDronerTempEntity[]> {
    return httpClient
      .get(BASE_URL + "/tasks/task-droner-temp/" + taskId)
      .then((response) => {
        return response.data;
      })
      .catch((err) => {
        console.log(err, "err getdronertemp");
      });
  }
  static createDronerTemp(data: CreateDronerTempEntity): Promise<any> {
    return httpClient
      .post(BASE_URL + "/tasks/task-droner-temp/", data)
      .then((response) => {
        return response.data;
      })
      .catch((err) => {
        console.log(err, "err createdronertemp");
      });
  }
  static deleteDronerTemp(data: DeletedDronerTemp): Promise<any> {
    return httpClient
      .delete(BASE_URL + "/tasks/task-droner-temp", { data })
      .then((response) => {
        return response.data;
      })
      .catch((err) => {
        console.log(err, "err deletedronertemp");
      });
  }
}
