import { BASE_URL, httpClient } from '../config/config'
import { AllGroupGuruEntities, AllGuruKasetEntities } from '../entities/GuruKasetEntities'

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
}
