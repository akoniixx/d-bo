import { BASE_URL, httpClient } from "../config/config";
import { CropPurposeSprayEntity } from "../entities/CropEntities";

export class CropDatasource {
  static getPurposeByCroupName(name: string): Promise<CropPurposeSprayEntity> {
    return httpClient
      .get(BASE_URL + "/tasks/crop/crop-name?name=" + name)
      .then((response) => {
        return response.data[0];
      })
      .catch((err) => {
        console.log(err, "err getCropByName");
      });
  }

  static getAllCropPlantName(): Promise<CropPurposeSprayEntity[]> {
    return httpClient
      .get(BASE_URL + "/tasks/crop")
      .then((response) => {
        return response.data;
      })
      .catch((err) => {
        console.log(err, "err getCropPlantName");
      });
  }

  static getCropJustName(): Promise<any> {
    return httpClient
      .get(BASE_URL + "/tasks/crop/crop-name-all")
      .then((response) => {
        return response.data;
      })
      .catch((err) => {
        console.log(err, "err getCropName");
      });
  }
}
