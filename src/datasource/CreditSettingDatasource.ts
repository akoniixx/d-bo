import { httpClient, BASE_URL } from '../config/config'
import { CreditSettingEntity } from '../entities/CreditSettingEntities'
import { PointSettingEntities } from '../entities/PointSettingEntities'

export class CreditSettingDatasource {
  static getCreditSetting(
    isActive: boolean,
    applicationType: string,
  ): Promise<CreditSettingEntity> {
    const params = {
      isActive: isActive,
      applicationType: applicationType,
    }
    return httpClient
      .get(BASE_URL + '/credit-setting/find-credit-setting', { params })
      .then((response) => {
        return response.data.responseData
      })
      .catch((err) => {
        console.log(err, 'err credit-setting')
      })
  }
  static updateCreditSetting(data: CreditSettingEntity): Promise<any> {
    return httpClient
      .patch(BASE_URL + `/credit-setting/update-credit-setting/` + data.id, data)
      .then((response) => {
        return response.data
      })
      .catch((err) => {
        console.log(err, 'err credit-setting')
      })
  }
  static createCreditSetting(data: CreditSettingEntity): Promise<any> {
    return httpClient
      .post(BASE_URL + '/credit-setting/create-credit-setting/', data)
      .then((response) => {
        return response.data
      })
      .catch((err) => {
        console.log(err, 'err credit-setting')
      })
  }
}
