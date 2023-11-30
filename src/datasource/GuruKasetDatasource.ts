import { BASE_URL, httpClient } from '../config/config'
import { AddGuruKasetEntities, AllGuruKasetEntities } from '../entities/GuruKasetEntities'

export class GuruKasetDataSource {
  static getAllGuruKaset(
    page: number,
    limit: number,
    type: string,
    status: string,
    application: string,
    search?: string,
    sortBy?: string,
    sortDirection?: string,
    startDate?: any,
    endDate?: any
  ): Promise<AllGuruKasetEntities> {
    const params = {
      page: page,
      limit: limit,
      type: type,
      status: status,
      application: application,
      search: search,
      sortDirection: sortDirection,
      sortBy: sortBy,
      startDate: startDate,
      endDate: endDate
    }
    return httpClient
      .get(BASE_URL + '/guru/guru', { params })
      .then((response) => {
        return response.data
      })
      .catch((err) => {
        console.log(err, 'err getGuru')
      })
  }
  static getAllGuruKasetById(id: string): Promise<any> {
    return httpClient
      .get(BASE_URL + '/guru/guru/' + id)
      .then((response) => {
        return response.data
      })
      .catch((err) => {
        console.log(err, 'err getGuruById')
      })
  }
  static addGuruKaset(data: AddGuruKasetEntities) {
    const formData = new FormData()
    formData.append('name', data.name)
    formData.append('description', data.description)
    formData.append('type', data.type)
    formData.append('createBy', data.createBy)
    formData.append('updateBy', data.updateBy)
    formData.append('application', data.application)
    formData.append('status', data.status)
    if (data.status === 'PENDING') {
      formData.append('startDate', data.startDate!)
    }
    formData.append('groupingId', data.groupingId)
    formData.append('file', data.file)

    return httpClient
      .post(BASE_URL + '/guru/guru', formData)
      .then((res) => {
        return res.data
      })
      .catch((err) => console.log(err))
  }
  static editGuruKaset(data: AddGuruKasetEntities) {
    const formData = new FormData()
    formData.append('name', data.name)
    formData.append('description', data.description)
    formData.append('type', data.type)
    formData.append('createBy', data.createBy)
    formData.append('updateBy', data.updateBy)
    formData.append('application', data.application)
    formData.append('status', data.status)
    if (data.status === 'PENDING') {
      formData.append('startDate', data.startDate!)
    }
    formData.append('groupingId', data.groupingId)
    if (data.file) {
      formData.append('file', data.file)
    }
    return httpClient
      .patch(BASE_URL + `/guru/guru/${data.id}`, formData)
      .then((res) => {
        return res.data
      })
      .catch((err) => console.log(err))
  }
  static uploadImageDescription(file: any) {
    const formData = new FormData()
    formData.append('file', file)
    return httpClient
      .post(BASE_URL + '/guru/guru/upload-guru-image-description', formData)
      .then((res) => {
        return res.data
      })
      .catch((err) => console.log(err))
  }
  static deleteGuru(id: string): Promise<any> {
    return httpClient
      .delete(BASE_URL + `/guru/guru/${id}`)
      .then((response) => {
        return response.data
      })
      .catch((err) => {
        console.log(err, 'err deleteGuru')
      })
  }
}
