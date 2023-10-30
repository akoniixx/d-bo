import { httpClient, BASE_URL } from '../config/config'
import { MaintenanceSystem } from '../entities/MaintenanceSystemEntities'

export class MaintenanceDataSource {
  static getMaintenceSystem(type: string): Promise<any> {
    return httpClient
      .get(BASE_URL + '/ma/system-maintenance/get_notices/?typeService=' + type)
      .then((response) => {
        return response.data
      })
      .catch((err) => {
        console.log(err, 'err getnotice')
      })
  }
}
