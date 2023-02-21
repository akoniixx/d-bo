import { BASE_URL, httpClient } from "../config/develop-config";
import axios from 'axios';
import {
  LocationPriceEntity,
  LocationPricePageEntity,
} from "../entities/LocationPrice";

export class LocationPriceDatasource {
  static getLocationPrice(
    proId?: number,
    plant?: string
  ): Promise<LocationPriceEntity> {
    const params = {
      provinceId: proId,
      cropName: plant,
    };
    return httpClient
      .get(BASE_URL + "/tasks/location-price/get-location-price", { params })
      .then((response) => {
        return response.data;
      })
      .catch((error) => {
        console.log(error);
      });
  }
  static async getAllLocationPrice(
    // limit?: number,
    // offset?: number,
    // sortField?: string,
    // sortDirection?: string,
    search?: string,
  ): Promise<any> {
    return axios
      .post(BASE_URL + `/tasks/location-price/get-all-location-price`, {
        // limit: limit,
        // offset: offset,
        // sortField: sortField,
        // sortDirection: sortDirection,
        search: search,
      })
      .then(res => {
        return res.data;
      });
  }

}
