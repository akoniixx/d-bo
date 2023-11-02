import { httpClient, BASE_URL } from '../config/config'
import { AllSpecialListEntities, InsertSpecialListEntities } from '../entities/SpecialListEntities'

export class SpecialPointDataSource {
  static getListSpecialPoint(
    page: number,
    row: number,
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
