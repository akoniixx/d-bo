import { BASE_URL, httpClient } from '../config/config'
import { NewsEntities } from '../entities/NewsEntities'
interface PayloadSearchNews {
  limit?: number
  offset?: number
  application?: string
  status?: string
  sortField?: string
  sortDirection?: string
  search?: string
  pageType?: string
}
interface PayloadPinNews {
  pinAll: {
    newsId: string
    order: number
  }[]
  pinMain: {
    newsId: string
    order: number
  }[]
  deletePinAll: {
    newsId: string
  }[]
  deletePinMain: {
    newsId: string
  }[]
}
export class NewsDatasource {
  static addNews(data: NewsEntities) {
    const formData = new FormData()
    formData.append('file', data.file)
    formData.append('title', data.title)
    formData.append('details', data.details)
    formData.append('status', data.status)
    formData.append('createBy', data.createBy)
    formData.append('application', data.application)
    formData.append('categoryNews', data.categoryNews)
    formData.append('campaignId', data.campaignId)
    formData.append('pinAll', new Boolean(data.pinAll).toString())
    formData.append('pinMain', new Boolean(data.pinMain).toString())
    if (data.status === 'PENDING') {
      formData.append('startDate', data.startDate!)
      if (data.typeLaunch === 'IS_ENDDATE') {
        formData.append('endDate', data.endDate!)
      }
      formData.append('typeLaunch', data.typeLaunch!)
    }
    return httpClient
      .post(BASE_URL + '/promotion/news/upload', formData)
      .then((res) => {
        return res.data
      })
      .catch((err) => console.log(err))
  }
  static getNews(
    limit: number,
    offset: number,
    application: string | undefined,
    status: string | undefined,
    sortField: string | undefined,
    sortDirection: string | undefined,
    search: string | undefined,
    pageType: string | undefined,
  ) {
    return httpClient
      .post(BASE_URL + '/promotion/news/find-all-news', {
        limit: limit,
        offset: offset,
        status: status,
        sortField: sortField,
        sortDirection: sortDirection,
        search: search,
        application: application,
        pageType: pageType,
      })
      .then((res) => {
        return res.data
      })
      .catch((err) => console.log(err))
  }
  static async searchNews({
    limit = 16,
    application,
    offset = 1,
    search,
    sortDirection,
    sortField,
    status = 'ACTIVE',
    pageType,
  }: PayloadSearchNews) {
    return httpClient
      .post(BASE_URL + '/promotion/news/find-all-news', {
        limit: limit,
        offset: offset,
        status: status,
        sortField: sortField,
        sortDirection: sortDirection,
        search: search,
        application: application,
        pageType: pageType,
      })
      .then((res) => {
        return res.data
      })
      .catch((err) => console.log(err))
  }

  static getNewsById(id: string) {
    return httpClient
      .get(BASE_URL + `/promotion/news/${id}`)
      .then((res) => {
        return res.data
      })
      .catch((err) => console.log(err))
  }

  static deleteNews(id: string, path: string) {
    return httpClient
      .delete(BASE_URL + `/promotion/news/delete?id=${id}&path=${path}`)
      .then((res) => {
        return res.data
      })
      .catch((err) => console.log(err))
  }
  static checkCountPoint(app: string) {
    return httpClient
      .get(BASE_URL + `/promotion/news/check-count-pin?application=${app}`)
      .then((res) => {
        return res.data
      })
      .catch((err) => console.log(err))
  }
  static async getPinNews(app: 'DRONER' | 'FARMER' | 'ALL') {
    return httpClient
      .get(BASE_URL + `/promotion/news/find-all-pin?application=${app}`)
      .then((res) => {
        return res.data
      })
      .catch((err) => console.log(err))
  }
  static async postPinNews(payload: PayloadPinNews) {
    return httpClient
      .post(BASE_URL + `/promotion/news/pin-news`, payload)
      .then((res) => {
        return res.data
      })
      .catch((err) => console.log(err))
  }
  static editNews(data: NewsEntities) {
    const formData = new FormData()
    if (!data.file) {
      formData.append('title', data.title)
      formData.append('details', data.details)
      formData.append('status', data.status)
      formData.append('createBy', data.createBy)
      formData.append('application', data.application)
      formData.append('categoryNews', data.categoryNews)
      formData.append('campaignId', data.campaignId)
      formData.append('pinAll', new Boolean(data.pinAll).toString())
      formData.append('pinMain', new Boolean(data.pinMain).toString())
      if (data.status === 'PENDING') {
        formData.append('startDate', data.startDate!)
        if (data.typeLaunch === 'IS_ENDDATE') {
          formData.append('endDate', data.endDate!)
        }
        formData.append('typeLaunch', data.typeLaunch!)
      }
    } else {
      formData.append('file', data.file)
      formData.append('title', data.title)
      formData.append('details', data.details)
      formData.append('status', data.status)
      formData.append('createBy', data.createBy)
      formData.append('application', data.application)
      formData.append('categoryNews', data.categoryNews)
      formData.append('campaignId', data.campaignId)
      formData.append('pinAll', new Boolean(data.pinAll).toString())
      formData.append('pinMain', new Boolean(data.pinMain).toString())
      if (data.status === 'PENDING') {
        formData.append('startDate', data.startDate!)
        if (data.typeLaunch === 'IS_ENDDATE') {
          formData.append('endDate', data.endDate!)
        }
        formData.append('typeLaunch', data.typeLaunch!)
      }
    }
    return httpClient
      .post(BASE_URL + `/promotion/news/update/${data.id}`, formData)
      .then((res) => {
        return res.data
      })
      .catch((err) => console.log(err))
  }

  static uploadNewsImageDescription(file: any) {
    const formData = new FormData()
    formData.append('file', file)
    return httpClient
      .post(BASE_URL + '/promotion/news/upload-news-image-description', formData)
      .then((res) => {
        return res.data
      })
      .catch((err) => console.log(err))
  }
}
