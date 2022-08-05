import { httpClient } from "../config/develop-config";
import { FarmerEntity } from "../entities/FarmerEntities";
const API_URL = "https://api-dev-dnds.iconkaset.com";

export class TaskDatasource {
  static getFarmerList(text? : string): Promise<FarmerEntity[]> {
    return httpClient
      .get(API_URL + "/tasks/farmer?search=" + text)
      .then((response) => {
        return response.data;
      })
      .catch((err) => {
        console.log(err, "err getAdmin");
      });
  }
}
