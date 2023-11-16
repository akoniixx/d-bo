import { BASE_URL, httpClient } from '../config/config'
import {
  DetailSummaryListEntity,
  DronerSummaryPointListEntity,
  FarmerSummaryPointListEntity,
  PlanningPointListEntity,
  ReceivePointListEntity,
} from '../entities/PointReceiveEntities'

export class PointReceiveDatasource {
  static getPlanningPoint(
    status: string,
    take?: number,
    page?: number,
    search?: string,
    taskNo?: string,
    startDate?: string,
    endDate?: string,
    typeEstimate?: string,
  ): Promise<PlanningPointListEntity> {
    const params = {
      status: status,
      take: take,
      page: page,
      search: search,
      taskNo: taskNo,
      startDate: startDate,
      endDate: endDate,
      typeEstimate: typeEstimate,
    }
    return httpClient
      .get(BASE_URL + '/tasks/task-estimate-point/task-estimate-point-bo', {
        params,
      })
      .then((response) => {
        return response.data
      })
      .catch((err) => {
        console.log(err, 'err getnewtask')
      })
  }

  static getReceivePoint(
    take?: number,
    page?: number,
    name?: string,
    taskMission?: string,
    startDate?: string,
    endDate?: string,
    type?: string,
  ): Promise<ReceivePointListEntity> {
    const params = {
      take: take,
      page: page,
      name: name,
      taskMission: taskMission,
      startDate: startDate,
      endDate: endDate,
      type: type,
    }
    return httpClient
      .get(BASE_URL + '/promotion/historypoint-quota/getallhistoryincrease', {
        params,
      })
      .then((response) => {
        return response.data
      })
      .catch((err) => {
        console.log(err, 'err get receive point')
      })
  }

  static getFarmerSumPoint(
    take?: number,
    page?: number,
    search?: string,
    sortDirection?: string,
  ): Promise<FarmerSummaryPointListEntity> {
    const params = {
      take: take,
      page: page,
      search: search,
      sortDirection: sortDirection,
    }
    return httpClient
      .get(BASE_URL + '/promotion/historypoint-quota/getIndividualPointFarmer', {
        params,
      })
      .then((response) => {
        return response.data
      })
      .catch((err) => {
        console.log(err, 'err getnewtask')
      })
  }
  static getFarmerSumById(
    id: string,
    action: string,
    take: number,
    page: number,
    startDate?: string,
    endDate?: string,
    sortField?: string,
    sortDirection?: string,
  ): Promise<DetailSummaryListEntity> {
    const params = {
      action: action,
      take: take,
      page: page,
      startDate: startDate,
      endDate: endDate,
      sortField: sortField,
      sortDirection: sortDirection,
    }
    return httpClient
      .get(BASE_URL + `/promotion/historypoint-quota/getIndividualPointDetailFarmer/${id}`, {
        params,
      })
      .then((response) => {
        return response.data
      })
      .catch((err) => {
        console.log(err, 'err get farmer sum')
      })
  }

  static getDronerSumPoint(
    take?: number,
    page?: number,
    search?: string,
    sortDirection?: string,
  ): Promise<DronerSummaryPointListEntity> {
    const params = {
      take: take,
      page: page,
      search: search,
      sortDirection: sortDirection,
    }
    return httpClient
      .get(BASE_URL + '/promotion/historypoint-quota/getIndividualPointDroner', {
        params,
      })
      .then((response) => {
        return response.data
      })
      .catch((err) => {
        console.log(err, 'err getnewtask')
      })
  }

  static getDronerSumById(
    id: string,
    action: string,
    take: number,
    page: number,
    startDate?: string,
    endDate?: string,
    sortField?: string,
    sortDirection?: string,
  ): Promise<DetailSummaryListEntity> {
    const params = {
      action: action,
      take: take,
      page: page,
      startDate: startDate,
      endDate: endDate,
      sortField: sortField,
      sortDirection: sortDirection,
    }
    return httpClient
      .get(BASE_URL + `/promotion/historypoint-quota/getIndividualPointDetailDroner/${id}`, {
        params,
      })
      .then((response) => {
        return response.data
      })
      .catch((err) => {
        console.log(err, 'err get droner sum')
      })
  }
}
