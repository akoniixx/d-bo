import { BASE_URL, httpClient } from '../config/config'
import { FarmerEntity, FarmerPageEntity } from '../entities/FarmerEntities'
import {
  AllTaskListEntity,
  CreateNewTaskEntity,
  GetNewTaskEntity,
  NewTaskPageEntity,
  TaskManageEntity,
  UpdateNewTask,
  UpdateTaskStatus,
} from '../entities/NewTaskEntities'
import {
  GetTaskInprogressEntity,
  TaskInprogressPageEntity,
  UpdateInprogressTaskEntity,
} from '../entities/TaskInprogress'

export class TaskDatasource {
  static getAllTask(search: string, page: number, take: number): Promise<any> {
    const params = {
      search: search,
      page: page,
      take: take,
    }
    return httpClient
      .get(BASE_URL + '/tasks/task/find-all-task', { params })
      .then((response) => {
        return response.data
      })
      .catch((err) => {
        console.log(err, 'err getAlltask')
      })
  }
  static getEstimatePoint(taskId: string): Promise<any> {
    return httpClient
      .get(BASE_URL + `/tasks/task-estimate-point/find-estimate-point/${taskId}`)
      .then((response) => {
        return response.data
      })
      .catch((err) => {
        console.log(err, 'err getEstimatePoint')
      })
  }
  static getNewTaskList(
    take: number,
    page: number,
    status?: string,
    search?: string,
    startDate?: string,
    endDate?: string,
    applicationType?: string[],
    sortDirection?: string,
    sortField?: string,
  ): Promise<NewTaskPageEntity> {
    const params = {
      take: take,
      page: page,
      status: status,
      search: search,
      startDate: startDate,
      endDate: endDate,
      applicationType: applicationType,
      sortDirection: sortDirection,
      sortField: sortField,
    }
    return httpClient
      .get(BASE_URL + '/tasks/task', { params })
      .then((response) => {
        return response.data
      })
      .catch((err) => {
        console.log(err, 'err getnewtask')
      })
  }
  static getFarmerList(text?: string): Promise<FarmerEntity[]> {
    return httpClient
      .get(BASE_URL + '/tasks/farmer?search=' + text)
      .then((response) => {
        return response.data
      })
      .catch((err) => {
        console.log(err, 'err getAdmin')
      })
  }
  static getFarmerListTask(text?: string, page?: number, take?: number): Promise<FarmerPageEntity> {
    return httpClient
      .get(BASE_URL + `/tasks/farmer?search=${text}&page=${page}&take=${take}`)
      .then((response) => {
        return response.data
      })
      .catch((err) => {
        console.log(err, 'err getAdmin')
      })
  }
  static insertNewTask(data: CreateNewTaskEntity): Promise<any> {
    return httpClient
      .post(BASE_URL + '/tasks/task/create-task-bo', data)
      .then((response) => {
        return response.data
      })
      .catch((error) => {
        console.log(error)
      })
  }
  static getNewTaskById(id: string): Promise<GetNewTaskEntity> {
    return httpClient
      .get(BASE_URL + '/tasks/task/' + id)
      .then((response) => {
        return response.data.data
      })
      .catch((err) => {
        console.log(err, 'err getnewtaskbyid')
      })
  }
  static getTaskForCancel(id: string): Promise<TaskManageEntity> {
    return httpClient
      .get(BASE_URL + '/tasks/task/' + id)
      .then((response) => {
        return response.data
      })
      .catch((err) => {
        console.log(err, 'err getnewtaskbyid')
      })
  }
  static updateNewTask(data: UpdateNewTask): Promise<any> {
    return httpClient
      .patch(BASE_URL + '/tasks/task/' + data.id, data)
      .then((response) => {
        return response.data
      })
      .catch((error) => {
        console.log(error)
      })
  }
  static deleteTask(id: string): Promise<any> {
    return httpClient
      .delete(BASE_URL + '/tasks/task/' + id)
      .then((response) => {
        return response.data
      })
      .catch((error) => {
        console.log(error)
      })
  }
  static getInprogressTaskList(
    take: number,
    page: number,
    provinceId?: number,
    districtId?: number,
    subdisId?: number,
    text?: string,
    dateAppointmentStart?: string,
    dateAppointmentEnd?: string,
    problem?: boolean,
    applicationType?: string[],
    sortDirection?: string,
    sortField?: string,
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
      isProblem: problem,
      applicationType: applicationType,
      sortDirection: sortDirection,
      sortField: sortField,
    }
    return httpClient
      .get(BASE_URL + '/tasks/task-inprogress/get-all-task-wait-start', {
        params,
      })
      .then((response) => {
        return response.data
      })
      .catch((err) => {
        console.log(err, 'err getinprogresstask')
      })
  }
  static getInprogressTaskById(id: string): Promise<GetTaskInprogressEntity> {
    return httpClient
      .get(BASE_URL + '/tasks/task-inprogress/get-task-detail/' + id)
      .then((response) => {
        return response.data
      })
      .catch((err) => {
        console.log(err, 'err getinprogresstaskbyid')
      })
  }
  static updateInprogressTask(data: UpdateInprogressTaskEntity): Promise<any> {
    return httpClient
      .patch(BASE_URL + '/tasks/task/' + data.id, data)
      .then((response) => {
        return response.data
      })
      .catch((error) => {
        console.log(error)
      })
  }
  static cancelNewTask(data: UpdateTaskStatus): Promise<any> {
    return httpClient
      .post(BASE_URL + '/tasks/task/update-task-status', data)
      .then((response) => {
        return response.data
      })
      .catch((error) => {
        console.log(error)
      })
  }
  static getAllTaskList(search?: string, page?: number, take?: number): Promise<AllTaskListEntity> {
    const params = {
      searchText: search,
      page: page,
      take: take,
    }
    return httpClient
      .get(BASE_URL + '/tasks/task-manage-area', { params })
      .then((response) => {
        return response.data
      })
      .catch((err) => {
        console.log(err, 'err getnewtask')
      })
  }
  static getManageTaskByTaskId(taskId: string): Promise<TaskManageEntity> {
    return httpClient
      .get(BASE_URL + `/tasks/task-manage-area/${taskId}`)
      .then((response) => {
        return response.data
      })
      .catch((err) => {
        console.log(err, 'err getnewtask')
      })
  }
  static calculateManageTask(
    taskId: string,
    area?: number,
    unitPrice?: number,
    remark?: string,
    updateBy?: string,
  ): Promise<any> {
    const param = {
      taskId: taskId,
      area: area,
      unitPrice: unitPrice,
      remark: remark,
      updateBy: updateBy,
    }
    return httpClient
      .post(BASE_URL + `/tasks/task-manage-area/calculate-change-area`, param)
      .then((response) => {
        return response.data
      })
      .catch((err) => {
        console.log(err, 'err getnewtask')
      })
  }
  static insertManageTask(
    taskId: string,
    area?: number,
    unitPrice?: number,
    remark?: string,
    updateBy?: string,
    status?: string,
    reviewFarmerScore?: number,
    reviewFarmerComment?: string,
  ): Promise<any> {
    const param = {
      taskId: taskId,
      area: area,
      unitPrice: unitPrice,
      remark: remark,
      updateBy: updateBy,
      status: status,
      reviewFarmerScore: reviewFarmerScore,
      reviewFarmerComment: reviewFarmerComment,
    }
    return httpClient
      .post(BASE_URL + `/tasks/task-manage-area/save-change-area`, param)
      .then((response) => {
        return response.data
      })
      .catch((err) => {
        console.log(err, 'err getnewtask')
      })
  }
  static insertManageTaskImg(
    taskId: string,
    updateBy: string,
    remark: string,
    file?: File,
    fileDrug?: File,
  ): Promise<any> {
    const formData = new FormData()
    formData.append('taskId', taskId)
    formData.append('updateBy', updateBy)
    if (remark) {
      formData.append('remark', remark)
    }
    if (file) {
      formData.append('file', file)
    }
    if (fileDrug) {
      formData.append('fileDrug', fileDrug)
    }
    return httpClient
      .patch(BASE_URL + `/tasks/task-manage-area/edit-task-image`, formData)
      .then((response) => {
        return response.data
      })
      .catch((err) => {
        console.log(err, 'err getnewtask')
      })
  }
  static updateImageFinishTask(
    taskId: string,
    dronerId: string,
    updateBy: string,
    file: any,
    remark: string,
  ): Promise<any> {
    const formData = new FormData()
    formData.append('taskId', taskId)
    formData.append('dronerId', dronerId)
    formData.append('updateBy', updateBy)
    formData.append('file', file)
    if (remark) {
      formData.append('remark', remark)
    }
    return httpClient
      .post(BASE_URL + `/tasks/task-image/image-finish-task`, formData)
      .then((response) => {
        return response.data
      })
      .catch((err) => {
        console.log(err, 'err updateImageFinishTask')
      })
  }
  static deleteImageFinishTask(id: string): Promise<any> {
    return httpClient
      .delete(BASE_URL + `/tasks/task-image/delete-task-image/${id}`)
      .then((response) => {
        return response.data
      })
      .catch((err) => {
        console.log(err, 'err deleteImageFinishTask')
      })
  }
}
