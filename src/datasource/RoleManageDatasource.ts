import { BASE_URL, httpClient } from '../config/config'
import { RoleAllEntity, RoleEntity } from '../entities/RoleEntities'

export class RoleManage {
  static getAllRole(
    page: number,
    take: number,
    search?: string,
    sortBy?: string,
    sortDirection?: string,
  ): Promise<RoleAllEntity> {
    const params = {
      page: page,
      take: take,
      search: search,
      sortBy: sortBy,
      sortDirection: sortDirection,
    }
    return httpClient
      .get(BASE_URL + '/role-management', { params })
      .then((response) => {
        return response.data
      })
      .catch((err) => {
        console.log(err, 'err role')
      })
  }
  static getRoleById(id: string): Promise<any> {
    return httpClient
      .get(BASE_URL + `/role-management/${id}`)
      .then((response) => {
        return response.data
      })
      .catch((err) => {
        console.log(err, 'err roleById')
      })
  }
  static deleteRole(id: string): Promise<any> {
    return httpClient
      .delete(BASE_URL + `/role-management/${id}`)
      .then((response) => {
        return response.data
      })
      .catch((err) => {
        console.log(err, 'err delete role')
      })
  }
  static updateRole(data: RoleEntity): Promise<any> {
    return httpClient
      .patch(BASE_URL + `/role-management/`+ data.id, data)
      .then((response) => {
        return response.data
      })
      .catch((err) => {
        console.log(err, 'err update role')
      })
  }
}
