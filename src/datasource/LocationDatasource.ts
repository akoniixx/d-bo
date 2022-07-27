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
      .get(BASE_URL + "/location/district/" + id)
      .then((response) => {
        return response.data;
      })
      .catch((error) => {
        console.log(error);
      });
  }
  static getSubdistrict(id: number): Promise<any> {
    return httpClient
      .get(BASE_URL + "/location/sub-district/" + id)
      .then((response) => {
        return response.data;
      })
      .catch((error) => {
        console.log(error);
      });
  }
  static getSearchLocation(text?: string): Promise<SubdistrictEntity[]> {
    const param = {
      text: text
    }
    return httpClient
      .post(BASE_URL + "/location/sub-district" , param)
      .then((response) => {
        return response.data;
      })
      .catch((error) => {
        console.log(error);
      });
  }
}
