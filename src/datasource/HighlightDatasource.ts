import { BASE_URL, httpClient } from '../config/config'
import { AddHighlightEntities, AllHighlightEntities } from '../entities/HighlightEntities'

export class HighlightDatasource {
  static getNewsHighlight(
    page: number,
    take: number,
    status: string,
    application: string,
    search?: string,
    sortField?: string,
    sortDirection?: string,
  ): Promise<AllHighlightEntities> {
    const params = {
      page: page,
      take: take,
      status: status,
      application: application,
      search: search,
      sortField: sortField,
      sortDirection: sortDirection,
    }
    return httpClient
      .get(BASE_URL + '/promotion/highlight-news/find-all-highlight-news', {
        params,
      })
      .then((res) => {
        return res.data
      })
      .catch((err) => console.log(err))
  }
  static addNewsHighlight(data: AddHighlightEntities) {
    const formData = new FormData()
    formData.append('name', data.name)
    formData.append('status', data.status)
    formData.append('urlNews', data.urlNews)
    formData.append('application', data.application)
    if (data.status !== 'DRAFTING') {
      formData.append('startDate', data.startDate!)
      formData.append('endDate', data.endDate!)
    }

    formData.append('createBy', data.createBy!)
    formData.append('updateBy', data.updateBy)
    formData.append('file', data.file)
    return httpClient
      .post(BASE_URL + '/promotion/highlight-news/upload', formData)
      .then((res) => {
        return res.data
      })
      .catch((err) => console.log(err))
  }
  static editNewsHighlight(data: AddHighlightEntities) {
    const formData = new FormData()
    formData.append('name', data.name)
    formData.append('status', data.status)
    formData.append('urlNews', data.urlNews)
    formData.append('application', data.application)
    if (data.status === 'ACTIVE' || data.status === 'PENDING') {
      formData.append('startDate', data.startDate!)
      formData.append('endDate', data.endDate!)
    }
    formData.append('updateBy', data.updateBy)
    formData.append('file', data.file)
    return httpClient
      .patch(BASE_URL + `/promotion/highlight-news/update/${data.id}`, formData)
      .then((res) => {
        return res.data
      })
      .catch((err) => console.log(err))
  }
  static checkDuplicate(
    application: string,
    startDate: string,
    endDate: string,
    exceptId?: string,
  ): Promise<any> {
    const params = {
      application: application,
      startDate: startDate,
      endDate: endDate,
      exceptId: exceptId,
    }
    return httpClient
      .get(BASE_URL + '/promotion/highlight-news/check-dupplicate-date', {
        params,
      })
      .then((res) => {
        return res.data
      })
      .catch((err) => console.log(err))
  }
  static getNewsHighlightById(id: string): Promise<any> {
    return httpClient
      .get(BASE_URL + '/promotion/highlight-news/find-one-highlight-news/' + id)
      .then((response) => {
        return response.data
      })
      .catch((err) => {
        console.log(err, 'err getFarmerid')
      })
  }
  static deleteNewsHighlightById(id: string): Promise<any> {
    return httpClient
      .delete(BASE_URL + '/promotion/highlight-news/delete/' + id)
      .then((response) => {
        return response.data
      })
      .catch((err) => {
        console.log(err)
      })
  }
}
