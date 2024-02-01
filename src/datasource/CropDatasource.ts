import { BASE_URL, httpClient } from '../config/config'
import {
  AllCropListEntity,
  CreateCropEntity,
  CropPurposeSprayEntity,
} from '../entities/CropEntities'

export class CropDatasource {
  static getPurposeByCroupName(name: string): Promise<CropPurposeSprayEntity> {
    return httpClient
      .get(BASE_URL + '/tasks/crop/crop-name?name=' + name)
      .then((response) => {
        return response.data[0]
      })
      .catch((err) => {
        console.log(err, 'err getCropByName')
      })
  }

  static getAllCropPlantName(): Promise<CropPurposeSprayEntity[]> {
    return httpClient
      .get(BASE_URL + '/tasks/crop')
      .then((response) => {
        return response.data
      })
      .catch((err) => {
        console.log(err, 'err getCropPlantName')
      })
  }

  static getCropJustName(): Promise<any> {
    return httpClient
      .get(BASE_URL + '/tasks/crop/crop-name-all')
      .then((response) => {
        return response.data
      })
      .catch((err) => {
        console.log(err, 'err getCropName')
      })
  }

  //master data crop
  static getCropList(
    page: number,
    task: number,
    search?: string,
    sortField?: string,
    sortDirection?: string,
    status?: boolean,
  ): Promise<AllCropListEntity> {
    const params = {
      page: page,
      task: task,
      search: search,
      sortField: sortField,
      sortDirection: sortDirection,
      status: status,
    }
    return httpClient
      .get(BASE_URL + '/tasks/crop/find-all-crop', { params })
      .then((response) => {
        return response.data
      })
      .catch((err) => {
        console.log(err, 'err getCropList')
      })
  }
  static insertCrop(data: CreateCropEntity): Promise<any> {
    delete data.id
    delete data.isActive
    return httpClient
      .post(BASE_URL + '/tasks/crop', data)
      .then((response) => {
        return response.data
      })
      .catch((err) => {
        console.log(err, 'err insert crop')
      })
  }
  static updateCrop(data: CreateCropEntity): Promise<any> {
    return httpClient
      .patch(BASE_URL + '/tasks/crop', data)
      .then((response) => {
        return response.data
      })
      .catch((err) => {
        console.log(err, 'err insert crop')
      })
  }
  static insertMultiPriceCrop(data: any): Promise<any> {
    return httpClient
      .post(BASE_URL + '/tasks/location-price/update-multiple-price-crop', data)
      .then((response) => {
        return response.data
      })
      .catch((err) => {
        console.log(err, 'err insertMultiPriceCrop')
      })
  }
  static getCropById(id: string): Promise<any> {
    return httpClient
      .get(BASE_URL + `/tasks/crop/find-one-crop/${id}`)
      .then((response) => {
        return response.data
      })
      .catch((err) => {
        console.log(err, 'err getCropById')
      })
  }
  static insertEqualPriceCrop(data: any): Promise<any> {
    return httpClient
      .post(BASE_URL + '/tasks/location-price/update-equal-price-crop', data)
      .then((response) => {
        return response.data
      })
      .catch((err) => {
        console.log(err, 'err insertEqualPriceCrop')
      })
  }
  static deletePurpose(id: string): Promise<any> {
    return httpClient
      .delete(BASE_URL + `/tasks/crop/delete-purpose/${id}`)
      .then((response) => {
        return response.data
      })
      .catch((err) => {
        console.log(err, 'err delete purpose')
      })
  }
}
