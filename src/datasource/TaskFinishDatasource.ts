import { TaskFinishListEntity, TaskReportListEntity } from './../entities/TaskFinishEntities'
import { BASE_URL, httpClient } from '../config/config'

export class TaskFinishedDatasource {
  static getTaskFinishList(
    page: number,
    row: number,
    status?: string,
    searchText?: string,
    subdistrictId?: number,
    districtId?: number,
    provinceId?: number,
    dateAppointmentStart?: string,
    dateAppointmentEnd?: string,
    applicationType?: string[],
    sortDirection?: string,
    sortField?: string,
    documentPersons?: string[],
  ): Promise<TaskFinishListEntity> {
    const params = {
      page: page,
      take: row,
      status: status,
      searchText: searchText,
      subdistrictId: subdistrictId,
      districtId: districtId,
      provinceId: provinceId,
      dateAppointmentStart: dateAppointmentStart,
      dateAppointmentEnd: dateAppointmentEnd,
      applicationType: applicationType,
      sortDirection: sortDirection,
      sortField: sortField,
      documentPersons: documentPersons,
    }
    return httpClient
      .get(BASE_URL + '/tasks/task-finish/get-all-task-finish', { params })
      .then((response) => {
        return response.data
      })
      .catch((error) => {
        console.log(error)
      })
  }
  static getDetailFinishTaskById(id: string): Promise<any> {
    return httpClient
      .get(`${BASE_URL}/tasks/task-finish/get-task-detail/${id}`)
      .then((res) => {
        return res.data
      })
      .catch((err) => {
        console.log(err)
      })
  }
  static getTaskManual(
    resultId: string,
    applicationType: string,
    page: number,
    take: number,
  ): Promise<any> {
    const params = {
      resultId: resultId,
      applicationType: applicationType,
      page: page,
      take: take,
    }
    return httpClient
      .get(BASE_URL + '/tasks/task-finish/task-finish-manual', { params })
      .then((response) => {
        return response.data
      })
      .catch((error) => {
        console.log(error)
      })
  }
}
