import { BASE_URL, httpClient } from '../config/config'

export class TargetSpray {
  static getAllTargetSprayOnTask(): Promise<any> {
    return httpClient
      .get(BASE_URL + '/tasks/target-spray/find-target-spray-on-task')
      .then((response) => {
        return response.data
      })
      .catch((err) => {
        console.log(err, 'err getTargetSpray')
      })
  }
  static getAllTargetSpray(
    page?: number,
    take?: number,
    search?: string,
    sortField?: string,
    sortDirection?: string,
  ): Promise<any> {
    const params = {
      page: page,
      take: take,
      search: search,
      sortField: sortField,
      sortDirection: sortDirection,
    }
    return httpClient
      .get(BASE_URL + '/tasks/target-spray/find-all-target-spray', { params })
      .then((response) => {
        return response.data
      })
      .catch((err) => {
        console.log(err, 'err getTargetSpray')
      })
  }
  static getTargetSprayById(id: string): Promise<any> {
    return httpClient
      .get(BASE_URL + `/tasks/target-spray/find-one-target-spray/${id}`)
      .then((response) => {
        return response.data.responseData
      })
      .catch((err) => {
        console.log(err, 'err getTargetSprayById')
      })
  }
  static insertTargetSpray(name: string, isActive: boolean): Promise<any> {
    const params = {
      name: name,
      isActive: isActive,
    }
    return httpClient
      .post(BASE_URL + `/tasks/target-spray/create-target-spray`, params)
      .then((response) => {
        return response.data
      })
      .catch((err) => {
        console.log(err, 'err insert target')
      })
  }
  static updateTargetSpray(id: string, name: string, isActive: boolean): Promise<any> {
    const params = {
      name: name,
      isActive: isActive,
    }
    return httpClient
      .patch(BASE_URL + `/tasks/target-spray/update-target-spray/${id}`, params)
      .then((response) => {
        return response.data
      })
      .catch((err) => {
        console.log(err, 'err update target')
      })
  }
  static deleteTargetSpray(id: string): Promise<any> {
    return httpClient
      .delete(BASE_URL + `/tasks/target-spray/delete-target-spray/${id}`)
      .then((response) => {
        return response.data
      })
      .catch((err) => {
        console.log(err, 'err update target')
      })
  }
  static updateOrderTarget(data: any): Promise<any> {
    return httpClient
      .post(BASE_URL + `/tasks/target-spray/update-target-spray-order`, data)
      .then((response) => {
        return response.data
      })
      .catch((err) => {
        console.log(err, 'err update target')
      })
  }
}
