import Swal from 'sweetalert2'
import { BASE_URL, httpClient } from '../config/config'
import { AllGroupGuruEntities, insertGroupGuru } from '../entities/GuruKasetEntities'

export class GroupGuruDataSource {
  static getAllGroupGuru(
    page?: number,
    take?: number,
    search?: string,
    sortField?: string,
    sortDirection?: string,
  ): Promise<AllGroupGuruEntities> {
    const params = {
      page: page,
      take: take,
      search: search,
      sortDirection: sortDirection,
      sortField: sortField,
    }
    return httpClient
      .get(BASE_URL + '/guru/group-guru', { params })
      .then((response) => {
        return response.data
      })
      .catch((err) => {
        console.log(err, 'err getGroupGuru')
      })
  }
  static getGroupGuruById(id: string): Promise<any> {
    return httpClient
      .get(BASE_URL + `/guru/group-guru/${id}`)
      .then((response) => {
        return response.data
      })
      .catch((err) => {
        console.log(err, 'err GroupGuruById')
      })
  }
  static addGroupGuru(data: insertGroupGuru): Promise<any> {
    delete data._id
    return httpClient
      .post(BASE_URL + '/guru/group-guru', data)
      .then((response) => {
        return response.data
      })
      .catch((err) => {
        const errorMessage = err.response.data.message || 'เกิดข้อผิดพลาด'
        Swal.fire({
          title: errorMessage,
          icon: 'error',
          timer: 3000,
          showConfirmButton: false,
        })
      })
  }
  static updateGroupGuru(data: insertGroupGuru): Promise<any> {
    return httpClient
      .patch(BASE_URL + '/guru/group-guru/' + data._id, data)
      .then((response) => {
        return response.data
      })
      .catch((err) => {
        console.log(err, 'err updateGroupGuru')
      })
  }
  static deleteGroupGuru(id: string): Promise<any> {
    return httpClient
      .delete(BASE_URL + `/guru/group-guru/${id}`)
      .then((response) => {
        return response.data
      })
      .catch((err) => {
        console.log(err, 'err deleteGroupGuru')
      })
  }
}
