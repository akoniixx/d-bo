import { BASE_URL, httpClient } from "../config/develop-config";
import { DistrictEntity, ProviceEntity, SubdistrictEntity } from "../entities/LocationEntities";

export class LocationDatasource {
  static getProvince(): Promise<ProviceEntity[]> {
    return httpClient
      .get(BASE_URL + "/location/province")
      .then((response) => {
        return response.data;
      })
      .catch((error) => {
        console.log(error);
      });
  }
  static getDistrict(id: number): Promise<DistrictEntity[]> {

    return httpClient
      .get(BASE_URL + "/location/district/"+id)
      .then((response) => {
        return response.data;
      })
      .catch((error) => {
        console.log(error);
      });
  }
  static getSubdistrict(id: number): Promise<SubdistrictEntity[]> {
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
