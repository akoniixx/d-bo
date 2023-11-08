import { httpClient, BASE_URL } from '../config/config'
import {
  AllDetailSpecialPointEntities,
  AllSpecialListEntities,
  InsertDetailSpecialPointEntities,
  InsertSpecialListEntities,
  ReturnSpecialPoint,
  SpecialListEntities,
} from '../entities/SpecialListEntities'

export class SpecialPointDataSource {
  static getListSpecialPoint(
    page?: number,
    row?: number,
    search?: string,
    sortField?: string,
    sortDirection?: string,
  ): Promise<AllSpecialListEntities> {
    const params = {
      page: page,
      take: row,
      search: search,
      sortField: sortField,
      sortDirection: sortDirection,
    }
    return httpClient
      .get(BASE_URL + '/promotion/specialpoint', { params })
      .then((response) => {
        return response.data
      })
      .catch((err) => {
        console.log(err, 'err specialpoint')
      })
  }
  static getListSpecialPointById(id: any): Promise<SpecialListEntities> {
    return httpClient
      .get(BASE_URL + '/promotion/specialpoint/' + id)
      .then((response) => {
        return response.data
      })
      .catch((err) => {
        console.log(err, 'err specialpointBiId')
      })
  }
  static insertSpecialPoint(data: InsertSpecialListEntities): Promise<any> {
    delete data.id
    return httpClient
      .post(BASE_URL + '/promotion/specialpoint', data)
      .then((response) => {
        return response.data
      })
      .catch((err) => {
        console.log(err, 'err insertSpecialPoint')
      })
  }
  static updateSpecialPoint(data: InsertSpecialListEntities): Promise<any> {
    return httpClient
      .patch(BASE_URL + '/promotion/specialpoint/' + data.id, data)
      .then((response) => {
        return response.data
      })
      .catch((err) => {
        console.log(err, 'err updateSpecialPoint')
      })
  }
  static deleteSpecialPoint(id: any): Promise<any> {
    return httpClient
      .delete(BASE_URL + `/promotion/specialpoint/${id}`)
      .then((response) => {
        return response.data
      })
      .catch((err) => {
        console.log(err, 'err deleteSpecialPoint')
      })
  }
}

export class SpecialPointListDataSource {
  static getSpecialPointList(
    specialPointId: string,
    page: number,
    row: number,
    user: string,
    status: string,
    search?: string,
    sortField?: string,
    sortDirection?: string,
  ): Promise<AllDetailSpecialPointEntities> {
    const params = {
      specialPointId: specialPointId,
      page: page,
      take: row,
      user: user,
      status: status,
      search: search,
      sortField: sortField,
      sortDirection: sortDirection,
    }
    return httpClient
      .get(BASE_URL + '/promotion/specialpointlist', { params })
      .then((response) => {
        return response.data
      })
      .catch((err) => {
        console.log(err, 'err specialpoint')
      })
  }
  static getSpecialPointListById(id: string): Promise<any> {
    return httpClient
      .get(BASE_URL + `/promotion/specialpointlist/${id}`)
      .then((response) => {
        return response.data
      })
      .catch((err) => {
        console.log(err, 'err specialpointById')
      })
  }
  static insertSpecialPointList(data: InsertDetailSpecialPointEntities): Promise<any> {
    delete data.id
    return httpClient
      .post(BASE_URL + '/promotion/specialpointlist', data)
      .then((response) => {
        return response.data
      })
      .catch((err) => {
        console.log(err, 'err insertSpecialPointList')
      })
  }
  static updateSpecialPoint(data: InsertDetailSpecialPointEntities): Promise<any> {
    return httpClient
      .patch(BASE_URL + '/promotion/specialpointlist/' + data.id, data)
      .then((response) => {
        return response.data
      })
      .catch((err) => {
        console.log(err, 'err updateSpecialPointList')
      })
  }
  static updateToSuccess(data: ReturnSpecialPoint): Promise<any> {
    return httpClient
      .patch(BASE_URL + `/promotion/specialpointlist/update-to-success/` + data.id, data)
      .then((response) => {
        return response.data
      })
      .catch((err) => {
        console.log(err, 'err deleteSpecialPointList')
      })
  }
  static returnSpecialPoint(data: ReturnSpecialPoint): Promise<any> {
    return httpClient
      .patch(BASE_URL + `/promotion/specialpointlist/update-to-return/` + data.id, data)
      .then((response) => {
        return response.data
      })
      .catch((err) => {
        console.log(err, 'err deleteSpecialPointList')
      })
  }
  static deleteSpecialPointList(id: any): Promise<any> {
    return httpClient
      .delete(BASE_URL + `/promotion/specialpointlist/${id}`)
      .then((response) => {
        return response.data
      })
      .catch((err) => {
        console.log(err, 'err deleteSpecialPointList')
      })
  }
}
