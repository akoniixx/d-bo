import { BASE_URL, httpClient } from "../config/develop-config";
import axios from "axios";
import {
  LocationPriceEntity, UpdateLocationPrice,
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
    search?: string,
    searchPlant?: string,
  ): Promise<any> {
    return axios
      .post(BASE_URL + `/tasks/location-price/get-all-location-price`, {
        search: search,
        searchPlant:searchPlant
      })
      .then((res) => {
        return res.data;
      });
  }
  static updateLocationPrice(data: any): Promise<any> {
    return httpClient
      .post(BASE_URL + '/tasks/location-price/update-multiple-price' , data)
      .then((response) => {
        return response.data;
      })
      .catch((err) => {
        console.log(err);
      });
  }
}
