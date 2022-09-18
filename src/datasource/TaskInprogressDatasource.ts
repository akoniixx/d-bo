import { BASE_URL, httpClient } from "../config/develop-config";
import { TaskInprogressEntity, TaskTodayListEntity } from "../entities/TaskInprogressEntities";

export class TaskInprogressDatasource {
  static getAllTaskToday(
    page: number,
    row: number,
    taskStatus?: string,
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
      taskStatus: ["WAIT_START", "IN_PROGRESS"],
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
}
