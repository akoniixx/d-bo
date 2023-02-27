import { httpClient, BASE_URL } from "../config/develop-config";
import { MaintenanceSystem } from "../entities/MaintenanceSystemEntities";

export class MaintenanceDataSource {
  static getMaintenceSystem(): Promise<MaintenanceSystem> {
    return httpClient
      .get(BASE_URL + "/ma/system-maintenance/get_notices")
      .then((response) => {
        return response.data.responseData;
      })
      .catch((err) => {
        console.log(err, "err getnotice");
      });
  }
}
