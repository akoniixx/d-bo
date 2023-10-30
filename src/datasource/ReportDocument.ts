import axios from 'axios'
import { BASE_URL, httpClient } from '../config/config'
import { TaskReportListEntity } from '../entities/TaskFinishEntities'
export class ReportDocDatasource {
  static getAllReportDroner(
    page: number,
    row: number,
    subdistrictId?: number,
    districtId?: number,
    provinceId?: number,
    dateAppointmentStart?: string,
    dateAppointmentEnd?: string,
    status?: string,
    statusPayment?: string,
    statusCancel?: string,
    searchText?: string,
    documentPersons?: string,
    sortDirection?: string,
    sortField?: string,
    applicationType?: string,
  ): Promise<TaskReportListEntity> {
    const params = {
      page: page,
      take: row,
      subdistrictId: subdistrictId,
      districtId: districtId,
      provinceId: provinceId,
      dateAppointmentStart: dateAppointmentStart,
      dateAppointmentEnd: dateAppointmentEnd,
      status: status,
      statusPayment: statusPayment,
      statusCancel: statusCancel,
      searchText: searchText,
      documentPersons: documentPersons,
      sortDirection: sortDirection,
      sortField: sortField,
      applicationType: applicationType,
    }
    return httpClient
      .get(BASE_URL + '/tasks/task-finish/get-all-task-finish-account', {
        params,
      })
      .then((response) => {
        return response.data
      })
      .catch((error) => {
        console.log(error)
      })
  }
  static reportPDF(taskId: string[], downloadBy: string, idFileName: string) {
    const params = {
      taskId: taskId,
      downloadBy: downloadBy,
      idFileName: idFileName,
    }
    return axios
      .post(BASE_URL + `/tasks/report-document/report-pdf`, params, {
        responseType: 'arraybuffer',
      })
      .then((response) => {
        return response.data
      })
  }
  static reportExcel(taskId: string[], downloadBy: string, idFileName: string) {
    const params = {
      taskId: taskId,
      downloadBy: downloadBy,
      idFileName: idFileName,
    }
    return axios
      .post(BASE_URL + `/tasks/report-document/report-excel`, params, {
        responseType: 'arraybuffer',
      })
      .then((response) => {
        return response.data
      })
  }
  static getFileName(type: string, downloadBy: string, taskId?: string[]) {
    const params = {
      type: type,
      downloadBy: downloadBy,
      taskId: taskId,
    }
    return axios
      .post(BASE_URL + `/tasks/report-document/generate-file-name`, params)
      .then((response) => {
        return response.data
      })
  }
}
