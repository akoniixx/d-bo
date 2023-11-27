import {
  DronerRankDetailEntity,
  DronerRankListEntity,
  taskDetailEntity,
} from './../entities/DronerRankEntities'
import { BASE_URL, httpClient } from '../config/config'
export class DronerRankDatasource {
  static getDronerRank(
    page: number,
    row: number,
    subdistrictId?: number,
    districtId?: number,
    provinceId?: number,
    ratingMin?: number,
    ratingMax?: number,
    startDate?: number,
    endDate?: number,
    search?: string,
    sortDirection?: string,
    sortField?: string,
  ): Promise<DronerRankListEntity> {
    const params = {
      page: page,
      take: row,
      subdistrictId: subdistrictId,
      districtId: districtId,
      provinceId: provinceId,
      ratingMin: ratingMin,
      ratingMax: ratingMax,
      startDate: startDate,
      endDate: endDate,
      search: search,
      sortDirection: sortDirection,
      sortField: sortField,
    }
    return httpClient
      .get(BASE_URL + '/tasks/droner-ranking/get-all-droner-ranking', {
        params,
      })
      .then((response) => {
        return response.data
      })
      .catch((error) => {
        console.log(error)
      })
  }
  static getDronerRankById(
    id: string,
    page: number,
    row: number,
    sortField?: string,
    sortDirection?: string,
  ): Promise<DronerRankDetailEntity> {
    const params = {
      dronerId: id,
      page: page,
      take: row,
      sortField: sortField,
      sortDirection: sortDirection,
    }
    return httpClient
      .get(BASE_URL + '/tasks/droner-ranking/get-droner-detail', { params })
      .then((response) => {
        return response.data
      })
      .catch((error) => {
        console.log(error)
      })
  }
  static getTaskDetail(id: string): Promise<taskDetailEntity> {
    return httpClient
      .get(BASE_URL + '/tasks/droner-ranking/get-task-detail/' + id)
      .then((response) => {
        return response.data
      })
      .catch((error) => {
        console.log(error)
      })
  }
}
