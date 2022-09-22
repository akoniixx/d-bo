import { BASE_URL, httpClient } from "../config/develop-config";
import { TaskDetailEntity, TaskTodayListEntity, UpdateTask } from "../entities/TaskInprogressEntities";

export class TaskInprogressDatasource {
  static getAllTaskToday(
    page: number,
    row: number,
    status?: [string],
    searchText?: string,
    statusDelay?: string,
    subdistrictId?: number,
    districtId?: number,
    provinceId?: number,
    isProblem?: boolean,
    isDelay?: boolean,
   
  ): Promise<TaskTodayListEntity> {
    const params = {
      page: page,
      take: row,
      status: status,
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
      farmerId: data.farmerId,
      farmerPlotId: data.farmerPlotId,
      farmAreaAmount: data.farmAreaAmount,
      dronerId: data.dronerId,
      dateAppointment: data.dateAppointment,
      targetSpray: data.targetSpray,
      preparationBy: data.preparationBy,
      purposeSprayId: data.purposeSprayId,
      status: data.status,
      statusRemark: data.statusRemark,
      updateBy: data.updateBy,
      unitPriceStandard: data.unitPriceStandard,
      priceStandard: data.priceStandard,
      unitPrice: data.unitPrice,
      price: data.price,
      comment: data.comment,
      isProblem: data.isProblem,
      problemRemark: data.problemRemark,
      isDelay: data.isDelay,
      delayRemark: data.delayRemark,
      dateDelay: data.dateDelay,
    };
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
