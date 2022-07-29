import { BASE_URL, httpClient } from "../config/develop-config";
import { SubdistrictEntity } from "../entities/LocationEntities";

export class LocationDatasource {
  static getProvince(): Promise<any> {
    return httpClient
      .get(BASE_URL + "/location/province")
      .then((response) => {
        return response.data;
      })
      .catch((error) => {
        console.log(error);
      });
  }
  static getDistrict(id: number): Promise<any> {
    return httpClient
      .get(BASE_URL + "/location/district/?proviceId=" + id)
      .then((response) => {
        return response.data;
      })
      .catch((error) => {
        console.log(error);
      });
  }
  static getSubdistrict(
    id?: number,
    text?: string
  ): Promise<SubdistrictEntity[]> {
    let script = null;
    id == 0
      ? (script = "search=" + text)
      : (script = "districtId" + id + "&search=" + text);
    return httpClient
      .get(BASE_URL + "/location/sub-district/?" + script)
      .then((response) => {
        return response.data;
      })
      .catch((error) => {
        console.log(error);
      });
  }
}
