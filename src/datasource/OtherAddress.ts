import { BASE_URL, httpClient } from "../config/develop-config";
import { AddressEntity, CreateAddressEntity } from "../entities/AddressEntities";
import { DronerByAddressEntity } from "../entities/DronerEntities";

export class OtherAddressDatasource {
  static async getDronerAddressByID(
    id: string
  ): Promise<DronerByAddressEntity> {
    return httpClient
      .get(BASE_URL + "/droner/droner-address/" + id)
      .then((res) => {
        return res.data;
      })
      .catch((err) => {
        console.log(err, "err getDronerAddressById");
      });
  }
  static async addOtherAddress(id: string, data: CreateAddressEntity): Promise<any> {
    return httpClient
      .post(BASE_URL + "/droner/add-other-address/" + id, data)
      .then((res) => {
        return res.data;
      })
      .catch((err) => {
        console.log(err, "err addDronerAddressById");
      });
  }
  static async updateOtherAddress(data: AddressEntity): Promise<any> {
    return httpClient
      .patch(BASE_URL + "/droner/update-other-address/" + data.id, data)
      .then((res) => {
        return res.data;
      })
      .catch((err) => {
        console.log(err, "err addDronerAddressById");
      });
  }
}
