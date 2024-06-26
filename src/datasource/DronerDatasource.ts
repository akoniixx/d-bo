import { DronerEntity, CreateDronerEntity, DronerListEntity } from './../entities/DronerEntities'
import { BASE_URL, httpClient } from '../config/config'

export class DronerDatasource {
  static async getDronerList(
    mainStatus: string[],
    waitPendingDate: string[],
    applicationType: string[],
    page: number,
    row: number,
    status?: string[],
    search?: string,
    provinceId?: number,
    districtId?: number,
    subdistrictId?: number,
    documentPersons?: string,
    sortDirection?: string,
    sortField?: string,
  ): Promise<DronerListEntity> {
    const params = {
      mainStatus: mainStatus,
      waitPendingDate: waitPendingDate,
      applicationType: applicationType,
      page: page,
      take: row,
      status: status,
      search: search,
      provinceId: provinceId,
      districtId: districtId,
      subdistrictId: subdistrictId,
      documentPersons: documentPersons,
      sortDirection: sortDirection,
      sortField: sortField,
    }
    return httpClient
      .get(BASE_URL + '/droner', { params })
      .then((response) => {
        return response.data
      })
      .catch((error) => {
        console.log(error)
      })
  }

  static async getDronerByID(id: string): Promise<DronerEntity> {
    return httpClient
      .get(BASE_URL + '/droner/' + id)
      .then((res) => {
        return res.data
      })
      .catch((err) => {
        console.log(err, 'err getDronerListById')
      })
  }

  static updateDroner(data: DronerEntity): Promise<any> {
    delete data['dronerDrone']

    if (data.dronerArea.provinceId == 0) {
      delete data.dronerArea['provinceId']
      delete data.dronerArea['dronerId']
      delete data.dronerArea['districtId']
      delete data.dronerArea['subdistrictId']
      delete data.dronerArea['distance']
    }
    return httpClient
      .patch(BASE_URL + '/droner/' + data.id, data)
      .then((response) => {
        return response.data
      })
      .catch((error) => {
        console.log(error)
      })
  }

  static createDronerList(data: CreateDronerEntity): Promise<any> {
    for (let i = 0; data.dronerDrone.length > i; i++) {
      delete data.dronerDrone[i].droneName
      delete data.dronerDrone[i].id
      delete data.dronerDrone[i].logoImagePath
      delete data.dronerDrone[i].dronerId
      for (let j = 0; data.dronerDrone[i].file.length > j; j++) {
        delete data.dronerDrone[i].file[j]
      }
    }
    if (data.dronerArea.provinceId === 0) {
      delete data.dronerArea['provinceId']
      delete data.dronerArea['dronerId']
      delete data.dronerArea['districtId']
      delete data.dronerArea['subdistrictId']
      delete data.dronerArea['distance']
    }

    return httpClient
      .post(BASE_URL + '/droner', data)
      .then((response) => {
        return response.data
      })
      .catch((error) => {
        console.log(error)
      })
  }

  static deleteDronerList(id: string) {
    return httpClient
      .delete(BASE_URL + '/droner' + id)
      .then((response) => {
        return response.data
      })
      .catch((error) => {
        console.log(error)
      })
  }
}
