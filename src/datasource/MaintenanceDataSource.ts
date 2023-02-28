import { httpClient, BASE_URL } from "../config/develop-config";
import { MaintenanceSystem } from "../entities/MaintenanceSystemEntities";

export class MaintenanceDataSource {
  static getMaintenceSystem(type: string): Promise<MaintenanceSystem> {
    return httpClient
      .get(BASE_URL + "/ma/system-maintenance/get_notices/?typeService=" + type )
      .then((response) => {
        return response.data.responseData;
      })
      .catch((err) => {
        console.log(err, "err getnotice");
      });
  }
}
