import { httpClient } from "../config/develop-config";
import { FarmerPlotEntity } from "../entities/FarmerPlotEntities";
const API_URL = `https://api-dev-dnds.iconkaset.com`;

export class FarmerPlotDatasource {
  static insertFarmerPlot(data: FarmerPlotEntity): Promise<any> {
    delete data.id;
    return httpClient
      .post(API_URL + "/farmer-plot", data)
      .then((response) => {
        return response.data;
      })
      .catch((err) => {
        console.log(err, "err insertFarmerPlot");
      });
  }
  static updateFarmerPlot(data: FarmerPlotEntity): Promise<any> {
    return httpClient
      .patch(API_URL + "/farmer-plot/" + data.id, data)
      .then((response) => {
        return response.data;
      })
      .catch((err) => {
        console.log(err, "err updateFarmerPlot");
      });
  }
  static deleteFarmerPlot(id?: string): Promise<any> {
    return httpClient
      .delete(API_URL + "/farmer-plot/" + id)
      .then((response) => {
        return response.data;
      })
      .catch((err) => {
        console.log(err, "err deleteFarmerPlot");
      });
  }
}
