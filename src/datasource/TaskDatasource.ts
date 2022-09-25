import { BASE_URL, httpClient } from "../config/develop-config";
import { FarmerEntity } from "../entities/FarmerEntities";
import {
  CreateNewTaskEntity,
  GetNewTaskEntity,
  NewTaskPageEntity,
} from "../entities/NewTaskEntities";
import {
  TaskInprogressEntity,
  TaskInprogressPageEntity,
} from "../entities/TaskInprogress";

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
        return response.data;
      })
      .catch((error) => {
        console.log(error);
      });
  }
  static getNewTaskById(id: string): Promise<GetNewTaskEntity> {
    return httpClient
      .get(BASE_URL + "/tasks/task/" + id)
      .then((response) => {
        return response.data.data;
      })
      .catch((err) => {
        console.log(err, "err getnewtaskbyid");
      });
  }
  static updateNewTask(data: GetNewTaskEntity): Promise<any> {
    delete data["taskDronerTemp"];
    return httpClient
      .patch(BASE_URL + "/tasks/task/" + data.id, data)
      .then((response) => {
        return response.data;
      })
      .catch((error) => {
        console.log(error);
      });
  }
  static deleteTask(id: string): Promise<any> {
    return httpClient
      .delete(BASE_URL + "/tasks/task/" + id)
      .then((response) => {
        return response.data;
      })
      .catch((error) => {
        console.log(error);
      });
  }
  static getInprogressTaskList(
    take: number,
    page: number,
    provinceId?: number,
    districtId?: number,
    subdisId?: number,
    text?: string,
    dateAppointmentStart?: string,
    dateAppointmentEnd?: string
  ): Promise<TaskInprogressPageEntity> {
    const params = {
      take: take,
      page: page,
      provinceId: provinceId,
      districtId: districtId,
      subdistrictId: subdisId,
      searchText: text,
      dateAppointmentStart: dateAppointmentStart,
      dateAppointmentEnd: dateAppointmentEnd,
    };
    return httpClient
      .get(BASE_URL + "/tasks/task-inprogress/get-all-task-wait-start", {
        params,
      })
      .then((response) => {
        return response.data;
      })
      .catch((err) => {
        console.log(err, "err getinprogresstask");
      });
  }
  static getInprogressTaskById(id: string): Promise<TaskInprogressEntity> {
    return httpClient
      .get(BASE_URL + "/tasks/task-inprogress/get-task-detail/" + id)
      .then((response) => {
        return response.data.data;
      })
      .catch((err) => {
        console.log(err, "err getinprogresstaskbyid");
      });
  }
}
