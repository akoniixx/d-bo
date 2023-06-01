import { BASE_URL, httpClient } from "../config/develop-config";
import { DeliveryListEntity } from "../entities/DeliveryEntities";

export class DeliveryDataSource {
  static getDelivery(
    status?: boolean,
    search?: string
  ): Promise<DeliveryListEntity> {
    const params = {
      search: search,
      isActive: status,
    };
    return httpClient
      .get(BASE_URL + `/delivery`, { params })
      .then((res) => {
        return res.data;
      })
      .catch((err) => console.log(err));
  }
}
