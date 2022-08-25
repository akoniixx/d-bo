import { BASE_URL, httpClient } from "../config/develop-config";
import { TaskDronerTempEntity } from "../entities/TaskDronerTemp";

export class TaskDronerTempDataSource {
  static getDronerList(taskId: string): Promise<TaskDronerTempEntity[]> {
    return httpClient
      .get(BASE_URL + "/tasks/task-droner-temp/" + taskId)
      .then((response) => {
        return response.data;
      })
      .catch((err) => {
        console.log(err, "err getAdmin");
      });
  }
}
