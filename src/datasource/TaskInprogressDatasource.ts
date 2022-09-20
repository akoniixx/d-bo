import { BASE_URL, httpClient } from "../config/develop-config";
import { TaskDetailEntity, TaskTodayListEntity, UpdateTask } from "../entities/TaskInprogressEntities";

export class TaskInprogressDatasource {
  static getAllTaskToday(
    page: number,
    row: number,
    status?: string[],
    subdistrictId?: number,
    districtId?: number,
    provinceId?: number,
    isProblem?: boolean,
    isDelay?: boolean,
    statusDelay?: string,
    search?: string
  ): Promise<TaskTodayListEntity> {
    const params = {
      page: page,
      take: row,
      status: status,
      subdistrictId: subdistrictId,
      districtId: districtId,
      provinceId: provinceId,
      isProblem: isProblem,
      isDelay: isDelay,
      statusDelay: statusDelay,
      search: search,
    };
    return httpClient
      .get(BASE_URL + "/tasks/task-inprogress/get-all-task-today", { params })
      .then((response) => {
        return response.data;
      })
      .catch((error) => {
        console.log(error);
      });
  }
  static getTaskDetailById(id: string): Promise<TaskDetailEntity> {
    return httpClient
      .get(BASE_URL + "/tasks/task-inprogress/get-task-detail/" + id)
      .then((response) => {
        return response.data;
      })
      .catch((error) => {
        console.log(error);
      });
  }
  static UpdateTask(id: string): Promise<UpdateTask> {
    return httpClient
      .patch(BASE_URL + "/tasks/task/" + id)
      .then((response) => {
        return response.data
      })
      .catch((error) => {
        console.log(error);
      });
      
  }
}
