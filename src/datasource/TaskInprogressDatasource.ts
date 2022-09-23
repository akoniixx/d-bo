import { BASE_URL, httpClient } from "../config/develop-config";
import { TaskDetailEntity, TaskTodayListEntity, UpdateTask } from "../entities/TaskInprogressEntities";

export class TaskInprogressDatasource {
  static getAllTaskToday(
    taskStatus: [string],
    page: number,
    row: number,
    searchText?: string,
    statusDelay?: string,
    subdistrictId?: number,
    districtId?: number,
    provinceId?: number,
    isProblem?: boolean,
    isDelay?: boolean,
   
  ): Promise<TaskTodayListEntity> {
    const params = {
      taskStatus: taskStatus,
      page: page,
      take: row,
      searchText: searchText,
      statusDelay: statusDelay,
      subdistrictId: subdistrictId,
      districtId: districtId,
      provinceId: provinceId,
      isProblem: isProblem,
      isDelay: isDelay,
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
  static UpdateTask(data: TaskDetailEntity): Promise<any> {
    const params = {
      id: data.id,
      dateAppointment: data.dateAppointment,
      targetSpray: data.targetSpray,
      preparationBy: data.preparationBy,
      purposeSprayId: data.purposeSprayId,
      status: data.status,
      statusRemark: data.statusRemark,
      updateBy: data.updateBy,
      comment: data.comment,
      isProblem: data.isProblem,
      problemRemark: data.problemRemark,
      isDelay: data.isDelay,
      delayRemark: data.delayRemark,
      dateDelay: data.dateDelay,
    };
    console.log(params)
    return httpClient
      .patch(BASE_URL + "/tasks/task/" + data.id, params)
      .then((response) => { 
        return response.data
      })
      .catch((error) => {
        console.log(error);
      });
      
  }
}
