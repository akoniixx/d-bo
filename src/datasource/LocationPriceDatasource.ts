import { BASE_URL, httpClient } from "../config/develop-config";
import { LocationPriceEntity } from "../entities/LocationPrice";

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
}
