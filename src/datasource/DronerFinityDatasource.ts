import { BASE_URL, httpClient } from '../config/config'
import {
  SearchDronerByIdEntity,
  SearchDronerEntity,
  updateStatus,
} from '../entities/DronerFinityEntities'

export class DronerFinityDatasource {
  static getAllDroner(
    status: string,
    search?: string,
    provinceId?: number,
    districtId?: number,
    subdistrictId?: number,
    creditMin?: number | null,
    creditMax?: number | null,
    sortField?: string,
    sortDirection?: string,
    page?: number,
    take?: number,
  ): Promise<any> {
    const adjustedCreditMin = creditMin === 0 ? null : creditMin
    const adjustedCreditMax = creditMax === 0 ? null : creditMax
    const params = {
      status: status,
      search: search,
      provinceId: provinceId,
      districtId: districtId,
      subdistrictId: subdistrictId,
      creditMin: adjustedCreditMin,
      creditMax: adjustedCreditMax,
      sortField: sortField,
      sortDirection: sortDirection,
      page: page,
      take: take,
    }
    return httpClient
      .get(BASE_URL + '/droner-one-finity/find-all-droner-one-finity', { params })
      .then((response) => {
        return response.data
      })
      .catch((error) => {
        console.log(error)
      })
  }
  static getSearchDroner(search: string, page: number, take: number): Promise<SearchDronerEntity> {
    const params = {
      search: search,
      page: page,
      take: take,
    }
    return httpClient
      .get(BASE_URL + '/tasks/droner/search-droner-one-finity', { params })
      .then((response) => {
        return response.data
      })
      .catch((error) => {
        console.log(error)
      })
  }
  static getSearchDronerById(id: string): Promise<SearchDronerByIdEntity> {
    return httpClient
      .get(BASE_URL + `/tasks/droner/droner-one-finity/${id}`)
      .then((response) => {
        return response.data.responseData
      })
      .catch((error) => {
        console.log(error)
      })
  }
  static createUploadFile(dronerId: string, updatedBy: string, file: any): Promise<any> {
    const formData = new FormData()
    formData.append('file', file)
    formData.append('dronerId', dronerId)
    formData.append('updatedBy', updatedBy)
    return httpClient
      .post(BASE_URL + `/droner-one-finity/create-droner-one-finity`, formData)
      .then((response) => {
        return response.data
      })
      .catch((error) => {
        console.log(error)
      })
  }
  static uploadFile(id: string, updatedBy: string, file: any, status?: string): Promise<any> {
    const formData = new FormData()
    formData.append('updatedBy', updatedBy)
    formData.append('file', file)
    if (status) {
      formData.append('status', status)
    }
    return httpClient
      .patch(BASE_URL + `/droner-one-finity/update-droner-one-finity/${id}`, formData)
      .then((response) => {
        return response.data
      })
      .catch((error) => {
        console.log(error)
      })
  }
  static updateStatus(data: updateStatus): Promise<any> {
    return httpClient
      .patch(BASE_URL + `/droner-one-finity/update-droner-one-finity/` + data.id, data)
      .then((response) => {
        return response.data
      })
      .catch((error) => {
        console.log(error)
      })
  }
  static getDronerById(id: string): Promise<any> {
    return httpClient
      .get(BASE_URL + `/droner-one-finity/find-one-droner-one-finity/${id}`)
      .then((response) => {
        return response.data.responseData
      })
      .catch((error) => {
        console.log(error)
      })
  }
}
