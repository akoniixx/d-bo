import { BASE_URL, httpClient } from "../config/develop-config";

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
      .get(BASE_URL + "/location/district/"+id)
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
}
