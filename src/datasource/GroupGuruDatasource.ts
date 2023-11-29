import { BASE_URL, httpClient } from '../config/config'
import { AllGroupGuruEntities } from '../entities/GuruKasetEntities'

export class GroupGuruDataSource {
  static getAllGroupGuru(
    page: number,
    take: number,
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
}
