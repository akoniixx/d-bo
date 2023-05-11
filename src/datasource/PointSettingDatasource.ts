import { httpClient, BASE_URL } from "../config/develop-config";
import { PointSettingEntities } from '../entities/PointSettingEntities';

export class PointSettingDatasource {
  static createPointSetting (data: PointSettingEntities): Promise<any> {
    return httpClient
      .post(BASE_URL + "/promotion/point/create-point-setting", data)
      .then((response) => {
        return response.data;
      })
      .catch((err) => {
        console.log(err, "err point-setting");
      });
  }
}
