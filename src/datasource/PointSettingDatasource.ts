import { httpClient, BASE_URL } from '../config/config'
import { PointSettingEntities } from '../entities/PointSettingEntities'

export class PointSettingDatasource {
  static createPointSetting(data: PointSettingEntities): Promise<any> {
    return httpClient
      .post(BASE_URL + '/promotion/point/create-point-setting', data)
      .then((response) => {
        return response.data
      })
      .catch((err) => {
        console.log(err, 'err point-setting')
      })
  }
  static getAllPointSetting(): Promise<any> {
    return httpClient
      .get(BASE_URL + '/promotion/point/')
      .then((response) => {
        return response.data
      })
      .catch((err) => {
        console.log(err, 'err point-setting')
      })
  }
  static getPointSetting(id: string): Promise<any> {
    return httpClient
      .get(BASE_URL + '/promotion/point/' + id)
      .then((response) => {
        return response.data
      })
      .catch((err) => {
        console.log(err, 'err point-setting')
      })
  }
  static getPointSettingApplication(app : string) : Promise<any> {
    return httpClient
      .get(BASE_URL + '/promotion/point/application/' + app)
      .then((response) => {
        return response.data
      })
      .catch((err) => {
        console.log(err, 'err point-setting')
      })
  }
  static editPointSetting(data: PointSettingEntities): Promise<any> {
    return httpClient
      .patch(BASE_URL + `/promotion/point/` + data.id, data)
      .then((response) => {
        return response.data
      })
      .catch((err) => {
        console.log(err, 'err point-setting')
      })
  }
}
